# CI Guidelines

## Workflows that hold secrets

The deploy workflow (`.github/workflows/deploy.yml`) holds root SSH access to the production server
and the registry password, and the repository is public. Anything that runs in that job can read
what the job is given.

- Pin every third-party action to a full commit SHA, with the version as a comment. A tag can be
  moved by the action's owner and would swap the code that runs next to the secrets.
- Pass secrets only to the steps that use them (`env:` on the step), never on the workflow or the
  job, so third-party actions never see them. An action that needs a secret gets it as its own input.
- Run deploys on GitHub-hosted runners, never on a self-hosted one: a pull request from a fork must
  not get a way to run code on the server.
- Trigger deploys only by `push` to `main` and `workflow_dispatch`, never by `pull_request` or
  `pull_request_target`.

✅ DO

```yaml
- uses: webfactory/ssh-agent@dc588b651fe13675774614f8e6a936a468676387 # v0.9.0
  with:
    ssh-private-key: ${{ secrets.KAMAL_SSH_KEY }}
- name: Deploy
  env:
    KAMAL_REGISTRY_PASSWORD: ${{ secrets.KAMAL_REGISTRY_PASSWORD }}
  run: kamal deploy -c .kamal/deploy.yml
```

❌ DON'T

```yaml
env:
  KAMAL_REGISTRY_PASSWORD: ${{ secrets.KAMAL_REGISTRY_PASSWORD }} # every step and action sees it
jobs:
  deploy:
    steps:
      - uses: webfactory/ssh-agent@v0.9.0 # a moved tag runs new code
```
