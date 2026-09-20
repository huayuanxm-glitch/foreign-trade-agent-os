# Adapters

Adapters connect a workflow to a model, search provider, browser executor, CRM, or storage layer. Keep all concrete integrations optional and use explicit capabilities such as `research`, `extract`, `classify`, `review`, or `queue` rather than naming a model in the workflow contract.

Every adapter must define timeout, retry budget, safe fallback, data retention boundary, and a test double. Keys belong in the runtime environment or a secret manager—never in source or examples.
