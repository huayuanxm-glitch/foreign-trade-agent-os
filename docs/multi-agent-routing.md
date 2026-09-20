# Multi-agent routing

## Handoff contract

```json
{
  "id": "handoff-001",
  "from": "research-agent",
  "to": "lead-scoring-agent",
  "task": "Evaluate a synthetic company profile",
  "evidenceIds": ["ev-001"],
  "constraints": ["No outreach", "Synthetic inputs only"],
  "checkpoint": "research-complete"
}
```

## Routing rules

1. Use the smallest capable role for each bounded task.
2. Preserve evidence references and constraints across every handoff.
3. Do not transfer secrets or raw private data through the handoff envelope.
4. Persist a checkpoint before a high-cost boundary.
5. Route retryable failures through a bounded retry policy; route repeated failures to a fallback or manual queue.
6. Send generated business artifacts to an independent review role before approval.
7. A human approval is an explicit event, never inferred from silence or a model result.
