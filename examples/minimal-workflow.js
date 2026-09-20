'use strict';

const { WorkflowRun, ReviewGate } = require('../src');

const run = new WorkflowRun({ id: 'synthetic-research-001', workflow: 'market-research' });
run.handoff({
  from: 'research-agent',
  to: 'lead-scoring-agent',
  task: 'Score a synthetic company profile for relevance.',
  evidence: [{ id: 'ev-synthetic-001', url: 'https://example.test/company', capturedAt: '2026-01-01T00:00:00Z', type: 'synthetic-web-page' }],
  constraints: ['No outreach', 'Synthetic data only'],
});
run.checkpoint('research-complete', { evidenceCount: 1 });

const gate = new ReviewGate();
gate.submit({ artifactId: 'lead-synthetic-001', evidenceIds: ['ev-synthetic-001'], risk: 'medium' });
gate.review({ artifactId: 'lead-synthetic-001', decision: 'pass', reviewer: 'independent-review-agent', rationale: 'Evidence reference is present.' });
gate.approve({ artifactId: 'lead-synthetic-001', approver: 'human@example.test' });

console.log(JSON.stringify({ executable: gate.executable('lead-synthetic-001'), auditEvents: run.auditLog.map(({ event }) => event) }, null, 2));
