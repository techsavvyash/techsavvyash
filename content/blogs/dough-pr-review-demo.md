---
title: Demoing the dough PR-reviewer
draft: false
date: 2026-06-15
tags:
  - dough
  - agents
  - infra
---

This post exists to prove the dough PR-reviewer agent works end-to-end on
this repo. When this PR was opened the gateway routed the `pull_request`
webhook into a Firecracker microVM running on a laptop client, the agent
cloned the branch, ran `git diff`, and posted a single review.

## What was wired up

The path the PR took:

1. **GitHub** → webhook → `api.try-dough.com/webhooks/github`
2. **dough-gateway** verified the HMAC, looked up the repo's installation,
   created a `pr-reviewer` task, and called `POST /v1/workloads` on
   dough-server (now hosted on Railway).
3. **dough-server** translated the spec into a Nomad job and pushed it to
   the Railway-hosted Nomad server. Nomad scheduled the job to the
   laptop's `dough-fc` task driver.
4. The driver fetched the worker rootfs+kernel manifest, booted a
   firecracker microVM, attached the per-task workspace blob (this is the
   new piece — staged from a content-addressed URI via
   `workspaces.Fetcher`, mounted as a second virtio-block drive at boot),
   and exposed `/dev/vdb` to the guest at `/workspace`.
5. The worker inside the VM hit
   `GET /v1/worker-callbacks/<task>/bootstrap`, picked up the Anthropic
   key from per-user Vault, cloned the repo with a short-lived
   installation token, and invoked the Claude Agent SDK with the
   pr-reviewer system prompt.
6. The agent inspected `git diff base..HEAD`, formed findings, and
   POSTed a single `pulls/{pr}/reviews` with `event=COMMENT` via
   `gh api`.
7. The worker callback wrote the result back; the gateway updated the
   acknowledgement comment to `✅ completed`.

If you're reading this and there's a review on the PR — the loop closed.

## What's still on the roadmap

The clanker + APISIX path runs the egress through a named-upstream proxy
so per-user credentials never enter the VM, and replaces the
`@anthropic-ai/claude-agent-sdk` direct call with a `@thatflywheel/clanker`
runtime that opens an AgentFS SQLite file for the workspace. The
infrastructure is up (Garage on Railway, APISIX standalone behind
`forward-auth`), but the worker rootfs hasn't been rebuilt with the
runner+shim yet. Next iteration.

<!-- bump for fresh sha -->
<!-- bump 2 -->
<!-- egress open -->
<!-- bump3 cmdline net fix -->
