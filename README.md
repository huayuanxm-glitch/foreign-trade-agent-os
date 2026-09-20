# Foreign Trade Agent OS

**Foreign Trade Agent OS** is an open-source, model-agnostic multi-agent orchestration framework for foreign-trade operations. It helps teams compose traceable workflows without binding their business to a particular model provider, CRM, browser tool, or knowledge system.

> This repository is intentionally generic. It contains no real company name, customer record, API key, internal knowledge base, or sensitive business data.

## What it orchestrates

```text
Market research → Customer discovery → Company enrichment → Lead scoring
      → Sales enablement → Marketing → SEO/GEO → Website audit
      → Knowledge capture → Decision-ready reports
```

The loop is designed around eight operating controls:

- **Evidence tracking** — every important claim can point to a source and collection time.
- **Agent handoff** — a structured envelope moves task, evidence, limits, and next actions between agents.
- **Checkpoint and resume** — a long workflow can persist a safe recovery point.
- **Fallback** — switch to a declared alternative provider, tool, or manual queue after a bounded failure.
- **Circuit breaker** — prevent repeated calls to a failing dependency.
- **Independent review gate** — keep generation and review separate; reviewers receive evidence rather than hidden chain-of-thought.
- **Human approval** — outbound actions and high-impact decisions stay blocked until an authorized approver accepts them.
- **Audit log** — append meaningful state transitions, approvals, and review decisions.

## Quick start

Requires Node.js 20 or later. There are no runtime dependencies.

```bash
git clone https://github.com/huayuanxm-glitch/foreign-trade-agent-os.git
cd foreign-trade-agent-os
npm test
npm run example
```

The example executes a synthetic market-research handoff, stores a checkpoint, routes evidence to an independent review gate, and demonstrates that a human-approved action is the only action that becomes executable. See [docs/quickstart.md](docs/quickstart.md).

## Minimal API

```js
const { WorkflowRun, ReviewGate } = require('./src');

const run = new WorkflowRun({ id: 'demo-001', workflow: 'market-research' });
run.handoff({
  from: 'research-agent',
  to: 'scoring-agent',
  task: 'Score a synthetic prospect',
  evidence: [{ id: 'ev-001', url: 'https://example.test/source', capturedAt: '2026-01-01T00:00:00Z' }],
});
run.checkpoint('research-complete');

const gate = new ReviewGate();
gate.submit({ artifactId: 'lead-001', evidenceIds: ['ev-001'], risk: 'medium' });
gate.review({ artifactId: 'lead-001', decision: 'pass', reviewer: 'independent-review-agent' });
gate.approve({ artifactId: 'lead-001', approver: 'human@example.test' });
```

## Repository map

| Path | Purpose |
| --- | --- |
| `docs/` | Architecture, quick start, routing, and review-gate design |
| `workflows/` | Reference flow definitions for lead generation, enrichment, research, SEO/GEO, and website audits |
| `schemas/` | Portable JSON schemas for workflow contracts |
| `adapters/` | Provider-neutral adapter boundary |
| `benchmarks/` | Repeatable evaluation scaffolding |
| `examples/` | Safe, synthetic runnable examples |
| `tests/` | Basic behavioral tests |

## Safety and scope

- Use synthetic or redacted fixtures in public issues, tests, and examples.
- Never commit credentials, customer data, internal URLs, proprietary prompts, or private knowledge bases.
- This framework records **evidence metadata**, not passwords or raw secrets.
- It does not bypass website controls, make purchases, send messages, or perform outreach by default.
- Treat all model output as untrusted until an independent gate and, where required, a human approval have passed.

## Contributing

Contributions are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md), read [SECURITY.md](SECURITY.md), and follow [AGENTS.md](AGENTS.md) for repository automation conventions.

## License

Apache-2.0. See [LICENSE](LICENSE).
