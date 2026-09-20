# Agent operating guide

## Non-negotiable boundaries

- Never add real company data, customer or prospect data, API keys, access tokens, internal knowledge bases, private prompts, or private endpoints to this repository.
- Use synthetic test data only. `example.test` is the preferred sample domain.
- Do not treat an agent's output as authorization. Human approval is required for external side effects.

## Development conventions

- Preserve model-agnostic interfaces; provider-specific code belongs behind an adapter.
- Emit evidence IDs and provenance metadata at handoff boundaries.
- Add checkpoints before expensive or irreversible transitions.
- Configure a bounded retry plus fallback and circuit-breaker policy for remote dependencies.
- Keep generators and independent reviewers separated. Reviewers see artifacts, evidence, and criteria—not hidden reasoning.
- Add a test and a changelog entry for behavior changes.
