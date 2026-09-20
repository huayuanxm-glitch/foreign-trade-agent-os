# Security policy

## Reporting a vulnerability

Do **not** open a public issue for a suspected vulnerability, leaked credential, or exposed private data. Use the repository's private security advisory flow when it is enabled, or contact the maintainers through the contact route listed in the repository settings.

Please include a minimal reproducible description, impact, affected version, and a safe proof of concept. Do not transmit secrets or real customer data.

## Secure operation

- Store provider keys only in a secret manager or local environment; never in workflow files, logs, fixtures, or issues.
- Run networked adapters with least privilege and explicit allowlists.
- Treat external web content and model output as untrusted input.
- Require human approval before irreversible, external, financial, legal, or customer-facing actions.
- Preserve audit records without storing raw secrets or unnecessary personal data.
