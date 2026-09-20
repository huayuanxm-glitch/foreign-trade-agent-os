# Quick start

## 1. Run the safe example

```bash
npm test
npm run example
```

Expected output includes `"executable": true`. This does **not** send a message, contact a lead, or call a model; it only proves the orchestration controls using synthetic data.

## 2. Define a workflow contract

Start from `schemas/workflow.schema.json`. Give the workflow a name, agent steps, evidence requirement, checkpoint boundaries, fallback, and approval policy.

## 3. Add adapters deliberately

Implement a provider adapter in `adapters/`. Keep the API key outside the repository and use a mock adapter in tests. Do not make an outbound tool available unless the workflow's approval policy permits it.

## 4. Add a gate

Every workflow that generates customer-facing content, updates a CRM, or calls external services should include:

- Evidence requirements
- Independent reviewer criteria
- A human approval boundary
- Audit events for pass, revise, reject, and approval

## 5. Prove it with a synthetic test

Test success, retry, fallback, open circuit, rejected review, and unapproved action paths before using any non-synthetic data.
