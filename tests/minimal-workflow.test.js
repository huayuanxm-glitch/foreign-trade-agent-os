'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { WorkflowRun, ReviewGate } = require('../src');

test('handoff preserves evidence and writes a checkpoint audit event', () => {
  const run = new WorkflowRun({ id: 'run-1', workflow: 'lead-generation', now: () => '2026-01-01T00:00:00Z' });
  run.handoff({ from: 'research', to: 'scoring', task: 'score', evidence: [{ id: 'e1', url: 'https://example.test', capturedAt: '2026-01-01T00:00:00Z' }] });
  run.checkpoint('scored', { score: 80 });
  assert.equal(run.evidence.get('e1').url, 'https://example.test');
  assert.deepEqual(run.auditLog.map((entry) => entry.event), ['agent_handoff', 'checkpoint_saved']);
});

test('circuit opens after bounded failures and activates fallback', () => {
  const run = new WorkflowRun({ id: 'run-2', workflow: 'market-research' });
  run.recordFailure({ dependency: 'provider', fallback: 'manual-queue' });
  run.recordFailure({ dependency: 'provider', fallback: 'manual-queue' });
  assert.deepEqual(run.recordFailure({ dependency: 'provider', fallback: 'manual-queue' }), { mode: 'fallback', target: 'manual-queue' });
  assert.equal(run.circuit.state, 'open');
});

test('only independently passed and human-approved work is executable', () => {
  const gate = new ReviewGate();
  gate.submit({ artifactId: 'a1', evidenceIds: ['e1'], risk: 'high' });
  assert.equal(gate.executable('a1'), false);
  gate.review({ artifactId: 'a1', decision: 'pass', reviewer: 'reviewer' });
  assert.equal(gate.executable('a1'), false);
  gate.approve({ artifactId: 'a1', approver: 'human@example.test' });
  assert.equal(gate.executable('a1'), true);
});
