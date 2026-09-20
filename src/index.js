'use strict';

class WorkflowRun {
  constructor({ id, workflow, now = () => new Date().toISOString() }) {
    if (!id || !workflow) throw new Error('WorkflowRun requires id and workflow');
    this.id = id;
    this.workflow = workflow;
    this.now = now;
    this.evidence = new Map();
    this.checkpoints = [];
    this.auditLog = [];
    this.circuit = { failures: 0, state: 'closed' };
  }

  audit(event, details = {}) {
    const entry = { at: this.now(), event, ...details };
    this.auditLog.push(entry);
    return entry;
  }

  handoff({ from, to, task, evidence = [], constraints = [] }) {
    if (!from || !to || !task) throw new Error('A handoff requires from, to, and task');
    for (const item of evidence) {
      if (!item.id || !item.url || !item.capturedAt) throw new Error('Evidence requires id, url, and capturedAt');
      this.evidence.set(item.id, { ...item });
    }
    return this.audit('agent_handoff', { from, to, task, evidenceIds: evidence.map((item) => item.id), constraints });
  }

  checkpoint(name, state = {}) {
    if (!name) throw new Error('Checkpoint requires a name');
    const point = { name, state: structuredClone(state), at: this.now() };
    this.checkpoints.push(point);
    this.audit('checkpoint_saved', { name });
    return point;
  }

  recordFailure({ dependency, retryable = true, fallback }) {
    this.circuit.failures += 1;
    if (this.circuit.failures >= 3) this.circuit.state = 'open';
    const next = this.circuit.state === 'open' && fallback ? { mode: 'fallback', target: fallback } : { mode: retryable ? 'retry' : 'stop' };
    this.audit('dependency_failure', { dependency, retryable, circuit: this.circuit.state, next });
    return next;
  }
}

class ReviewGate {
  constructor() { this.artifacts = new Map(); }

  submit({ artifactId, evidenceIds = [], risk = 'low' }) {
    if (!artifactId) throw new Error('Review submission requires artifactId');
    const item = { artifactId, evidenceIds, risk, review: null, approval: null };
    this.artifacts.set(artifactId, item);
    return item;
  }

  review({ artifactId, decision, reviewer, rationale = '' }) {
    const item = this.#item(artifactId);
    if (!['pass', 'revise', 'reject'].includes(decision) || !reviewer) throw new Error('A review requires a valid decision and reviewer');
    item.review = { decision, reviewer, rationale };
    return item;
  }

  approve({ artifactId, approver }) {
    const item = this.#item(artifactId);
    if (item.review?.decision !== 'pass') throw new Error('Only independently passed artifacts can be approved');
    if (!approver) throw new Error('Human approver is required');
    item.approval = { approver, approvedAt: new Date().toISOString() };
    return item;
  }

  executable(artifactId) {
    const item = this.#item(artifactId);
    return item.review?.decision === 'pass' && Boolean(item.approval);
  }

  #item(artifactId) {
    const item = this.artifacts.get(artifactId);
    if (!item) throw new Error(`Unknown artifact: ${artifactId}`);
    return item;
  }
}

module.exports = { WorkflowRun, ReviewGate };
