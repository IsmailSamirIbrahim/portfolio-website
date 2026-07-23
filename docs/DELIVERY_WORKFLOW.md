# Source Control and Delivery Workflow

This repository uses a verified, one-task-at-a-time workflow that publishes
directly to `main`. Pull requests are not created unless the owner explicitly
changes this policy.

## Repository conventions

- Default and delivery branch: `main`.
- Commit format: `<type>(PORT-<id>): <imperative summary>`.
- One tracker task per commit whenever practical.
- Never force-push `main`.
- Preserve unrelated local changes and stop if they overlap the active task.
- A Notion task moves from Backlog/Ready to In Progress, then to Done only
  after its remote commit is verified.
- Deployments and releases require their own tracked task; a source push does
  not authorize a production deployment.

## Local setup

Use Node.js 24.13.0 and npm 11.10.0. The versions are recorded in `.nvmrc`,
`package.json`, and `package-lock.json`.

```powershell
npm.cmd ci
npm.cmd run verify
```

`npm ci` installs the exact dependency graph from the lockfile and fails if the
manifest and lockfile disagree.

## Required pre-publication checks

Run:

```powershell
npm.cmd run verify
git diff --check
git status --short
```

The aggregate verification command performs:

1. tracked-file secret and private-key scanning;
2. approved design contrast checks;
3. TypeScript and Vue type checking;
4. a Vite production build.

Add focused tests, browser checks, accessibility checks, and at least two
comparison rounds when the active task changes behavior or visuals.

## Secret handling

- Local environment files are ignored with `.env*`.
- Safe templates may be committed as `.env.example` or `.env.sample`.
- Never store credentials, tokens, private keys, personal access tokens, or
  production environment values in source control.
- Browser-visible Vite variables are not secrets, including variables prefixed
  with `VITE_`.
- Store deployment secrets in the selected hosting platform or CI secret
  manager when those services are configured.
- Rotate a credential immediately if it is ever committed; deleting it in a
  later commit is not sufficient.

## Direct-main publication

Before publishing:

1. Fetch `origin/main` and confirm the task started from the current remote
   commit.
2. Confirm the final diff contains only the active task.
3. Run all required checks and map acceptance criteria to evidence.
4. Commit once with the task ID.
5. Push as a non-force fast-forward to `origin/main`.

If the GitHub connector is used instead of Git credentials, upload each tested
blob, verify every blob SHA, construct a tree from the current remote tree,
confirm that tree equals the tested local commit tree, create one commit with
the current remote commit as its parent, then update `main` without force.
Abort if the remote parent changes at any point.

After publication, fetch `origin/main` and confirm:

```powershell
git rev-parse HEAD
git rev-parse origin/main
git status --short --branch
```

The two SHAs must match and the worktree must be clean before the tracker task
is marked Done or another task begins.
