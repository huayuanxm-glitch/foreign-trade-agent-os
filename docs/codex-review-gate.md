# Independent review gate

The review gate is a provider-neutral pattern. It can be implemented by Codex, another model, a deterministic validator, or a human reviewer, provided it remains independent from the generating step.

## Inputs

- Artifact ID and immutable artifact reference
- Evidence IDs and provenance metadata
- Explicit acceptance criteria
- Risk classification and required approvals

## Decisions

| Decision | Result |
| --- | --- |
| `pass` | Artifact may move to human approval if required. |
| `revise` | Return a scoped defect list to the generating agent. |
| `reject` | Close the path; do not retry without a changed input or policy. |

## Codex integration guidance

Use a review prompt that asks for evidence coverage, unsupported claims, policy violations, and actionable defects. Do not ask the reviewer to reveal private reasoning or submit raw credentials. Log the decision, criteria version, reviewer identity, and evidence IDs. A positive model review never replaces a human approval for an external action.
