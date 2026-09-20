# Architecture

Foreign Trade Agent OS separates orchestration policy from model and tool implementations. A workflow is a data contract between specialized agents, not a prompt chain.

```text
Request / schedule
       │
       ▼
Orchestrator ───────► Checkpoint store ───────► Audit log
       │                        │
       ├──► Research / browser adapters
       ├──► Enrichment / scoring adapters
       ├──► Sales / marketing work queues
       ├──► SEO/GEO / website-audit adapters
       └──► Knowledge capture / reporting
                                  │
                                  ▼
                    Independent review gate
                                  │
                         human approval required
                                  │
                                  ▼
                         allowed external action
```

## Control plane

The orchestrator assigns a bounded task and declares inputs, constraints, required evidence, retry policy, fallback, and approval requirements. It does not grant a model permission to perform an external action.

## Data plane

Agents exchange a handoff envelope containing an identifier, task, source agent, destination agent, evidence IDs, assumptions, constraints, output location, and next state. Evidence metadata must include a stable ID, source URL or reference, capture time, and type.

## Reliability plane

1. Save a checkpoint before an expensive or irreversible boundary.
2. Retry only bounded, diagnosed transient failures.
3. Select a declared fallback after the retry budget.
4. Open a circuit breaker after repeated dependency failures and route to a manual queue or safe alternative.
5. Add each transition to the audit log.

## Assurance plane

The generating agent cannot approve its own work. An independent reviewer evaluates the artifact against specified criteria and evidence. A pass is still not authorization: a named human approver must approve tasks that produce external effects, alter customer data, create public content, or make material decisions.

## Provider adapters

Adapters implement provider calls behind stable interfaces. They must not place keys in workflow files or logs. The framework supports local, hosted, deterministic, manual-queue, and mock adapters on equal terms.
