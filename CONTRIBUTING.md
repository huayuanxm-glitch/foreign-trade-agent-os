# Contributing

Thanks for contributing. This project accepts portable workflow patterns, provider-neutral adapters, test fixtures, documentation, and benchmark cases.

## Before opening a pull request

1. Do not include customer records, names of private companies, credentials, private URLs, screenshots containing personal data, or proprietary prompts.
2. Use synthetic `*.test` domains and fictional identifiers in examples.
3. Run `npm test` and update documentation for behavior changes.
4. Keep model adapters provider-neutral. A concrete integration must be optional, isolated, and documented with environment-variable names only.
5. Describe evidence inputs, review criteria, fallback behavior, and human-approval boundaries for a new workflow.

## Commit and review expectations

- Keep one concern per pull request where practical.
- Add or update tests for executable behavior.
- Do not merge a workflow that performs outbound communication without a clear human approval checkpoint.
- Maintainers may request an independent review when a change affects security, auditability, or external side effects.
