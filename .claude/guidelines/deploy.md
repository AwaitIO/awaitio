# Deploy Guidelines

awaitio.com and demo.awaitio.com run on the Droplet with Kamal, from one config (`.kamal/deploy.yml`)
and one image (`.kamal/Dockerfile`). The record of the server and why it is set up this way is in the
private infra repo (`inventory/projects/awaitio.yml`, `inventory/workstations.yml`); how Kamal is
used across projects is in the global `kamal` skill.

## Deploys run by hand on the deploying machine, never from CI

There is no deploy workflow. A deploy is `kamal deploy` on the deploying machine, from a clean
checkout of `main`. The image is built on the Droplet (remote builder); the deploying machine only
sends the build context.

**Why**: the repository is public, and a CI deploy needs root SSH to the production server and the
registry password stored in GitHub. Deploying by hand keeps both off GitHub, and the site only
changes with a release anyway (`apps/site/out/` is committed by `/prepare-release`).

✅ DO

```bash
git switch main && git pull && git status      # clean: the version is the commit SHA
kamal deploy -c .kamal/deploy.yml              # everything
kamal deploy -c .kamal/deploy.yml -r demo      # one role only
```

❌ DON'T: add a GitHub workflow that deploys, or put an SSH key or the registry password into GitHub
Secrets.

## Claude deploys only when asked

A deploy changes the production site. Claude runs `kamal deploy` only when the user asks for it in
the current conversation, and never from a worktree with uncommitted changes unless the user asks
for exactly that (the version then ends in `_uncommitted_<hash>`).

## What the deploying machine needs

- `kamal` (the version in the infra `inventory/workstations.yml`, where each machine's setup is recorded).
- SSH as `root` to the Droplet with the machine's own key.
- The registry password: `.kamal/secrets` reads the macOS Keychain (`kamal-registry`), else
  `~/.config/kamal/registry-password` (mode 600).
- One `docker login` to the registry, because the remote builder pushes with the deploying
  machine's credentials (without it the push fails with `401 Unauthorized`).

Run the deploy on that machine itself, never over SSH from another one: a macOS login Keychain does
not answer an SSH session ("User interaction is not allowed"), so `.kamal/secrets` gets no password
and Docker Desktop cannot push the image.

## Roll back by hand when a deploy fails

Kamal rolls the roles one after another; a failed role leaves its old container serving but does not
roll back the roles already deployed. Nothing rolls back automatically.

```bash
kamal app containers -c .kamal/deploy.yml        # kept versions
kamal rollback <version> -c .kamal/deploy.yml    # every role back to that version
kamal lock release -c .kamal/deploy.yml          # after an interrupted deploy
```

## Deploy after a release

The site's export lands on `main` with the release, and pushing does not deploy. Deploy after
`pnpm release`, so awaitio.com shows the release. A demo-only change can be deployed any time with
`-r demo`.
