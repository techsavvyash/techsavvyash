---
title: "A directory you can check: our DeDi node, explained"
description: An open, self-hostable implementation of the Decentralized Directory (DeDi) protocol, where every answer can be checked, with a demo and two systems running on it.
---

Most of the infrastructure that decides who to trust online is a directory: a
list of participants and their public keys, a register of licensed
organisations, a revocation list. And most of those directories are
databases you simply have to believe. If an entry changes, you usually can't
tell what it said yesterday, or whether it was quietly rewritten.

We've built an implementation of **DeDi**, the Decentralized Directory protocol
from LF Decentralized Trust, that takes a different approach: every answer it
gives can be checked, by anyone, without trusting the server that gave it.
This post covers what DeDi is, what we've built, how we know it follows the
standard, and two real systems running on it. We'd love your feedback.

![](https://youtu.be/-JLo6ep4x_Q)

## What DeDi is

DeDi is an open standard for publishing **public directories** (participant
registries, public keys, revocation lists, membership rolls) so that anyone can
discover them and verify what they say.

It has two halves. There's **one convention for publishing**: a publisher
signs its directory files and lists them in a signed manifest at a well-known
address on its own domain. And there's **one API for reading**: `lookup` (fetch
a record), `query` (list and filter) and `versions` (a record's history). DeDi
servers index and serve that data, but the standard is explicit that servers
are caches, not authorities: the publisher's signature is what counts.

## What we've built

Our DeDi node is a single Go service that runs as **one container plus a
Postgres database**, published on Docker Hub as
[`flywheelai/dedi-node`](https://hub.docker.com/r/flywheelai/dedi-node).

- **The standard's full read API.** All 8 read endpoints, including history:
  you can ask for a record as it was at a given version or on a given date.
- **Signed DeDi file publication**, so the node is also a DeDi publisher in
  the standard's sense.
- **A signed write plane.** Publishers write with Ed25519-signed requests, and
  each key may write to only one namespace. Updates carry a version tag, so
  two people editing the same record can't silently overwrite each other.
- **A web UI on every node** to browse the directory, check records, and see
  who is watching whom, with the cryptographic checks run in your browser, not
  on the server.

What makes it interesting is underneath.

### Every answer is provable: a Merkle log

Every change the node accepts is appended to a **Merkle tree**: the same kind of
append-only transparency log behind Certificate Transparency (which keeps web
certificate authorities honest) and the Go checksum database.

Periodically the node signs a small **checkpoint**: the size of the log and
the root hash of the tree. That gives you two kinds of proof:

- An **inclusion proof** shows that a particular record is in the tree the node
  signed. Ask for any record with `?proof=inclusion`, and you get the record, a
  short list of hashes, and the signed checkpoint. Your browser (or any script)
  can recompute the root and check the signature itself.
- A **consistency proof** shows that a newer checkpoint *extends* an older one:
  nothing in between was rewritten or removed.

Because the log only ever grows, history can't be quietly edited. Revoking a
record appends a new "revoked" version; the old versions stay readable, so you
can still check a signature that was valid at the time.

### It is not a blockchain

There's no token, no mining, and no global consensus among strangers. Each log
has one writer that signs its own checkpoints. Trust comes from something
cheaper: **public verifiability**. Anyone can check the proofs, and
independent parties can watch the log for misbehaviour.

### Witnessing: other nodes keep each node honest

A single signed log could still lie by showing different histories to
different people, or by rewriting its past. That's what **witnesses** are for.

On our public network, three independently operated nodes watch each other in
a ring. Every minute, each one fetches the next node's signed checkpoint, asks
for a consistency proof from the last checkpoint it saw, and verifies that the
new tree extends the old one. Each verdict is recorded in the witness's *own*
log, so the evidence outlives any incident. A rewrite or a fork raises an alarm
immediately; routine passing checks are recorded at most once an hour, which
keeps watchers from flooding each other's logs.

We're explicit about the limits. A witness records verdicts, but it doesn't
co-sign the checkpoint it checked, and a node that shows the witness one
history and you another is caught only by comparing the two. Both are open
questions we'd value input on (see below).

### Decentralized by design

The nodes are run by separate operators, each with its own identity key,
database and log. A node can also **delegate a namespace** to another
operator, who runs their own node and holds their own keys; the parent records
the grant and watches the child. A node can also mirror another publisher's
signed DeDi files after verifying their signatures.

### Replication for availability

Decentralization is about trust; availability is a separate problem. For that,
a node can run as a **replicated cluster using Raft consensus**: one leader
writes, followers serve reads and redirect writes to the leader, and a new
leader is elected if one fails. This protects against crashed machines, not
lying ones: three replicas run by one operator still agree with that operator.
That's why witnessing and replication are separate features.

## How we know it follows the standard

We wrote an independent, black-box **conformance suite** and published it
separately: [`flywheelai/dedi-conformance`](https://hub.docker.com/r/flywheelai/dedi-conformance)
([source](https://github.com/theflywheel/dedi-conformance)). It reads the
standard's own API definition and tests a live node from the outside, across
four profiles: the core read API, versioning and history, signed file
publication, and the Beckn profile.

Against our public node it passes **22 of 22** checks (core 8, versioning 5,
publication 7, Beckn 2). Its core, versioning and Beckn checks also run in our
CI on every change. And because a test suite that always passes proves little,
the suite's own tests feed it deliberately broken servers and require each
fault to be caught by the check meant for it.

You can run it against any DeDi server:

```sh
docker run --rm -v "$PWD:/work" flywheelai/dedi-conformance:v0.0.1 \
  --manifest /work/dedi-conformance.json
```

The manifest names the records the suite should test on your server; the
[conformance docs](https://dedi.beckn.try-dough.com/docs/conformance) show how
to write one.

## Two systems built on it

### 1. A participant registry for a Beckn network

[Beckn](https://becknprotocol.io) is an open protocol for networks of buyers and
sellers. Every message between participants is signed, so each side needs a
trusted way to look up the other's public key. That's a directory.

In our deployment, that directory is a DeDi node. The Beckn ONIX adapters on
both sides of a transaction resolve each participant's endpoint and signing key
from the node (caching them briefly) and verify every message's signature
against it. We run a real discovery flow end to end: a buyer app sends a signed
search, it's routed to a provider, and a catalog comes back, with every
signature checked against keys held in DeDi. Revoking a participant in DeDi
takes them off the network, while the log keeps the record of what their key
was. [How it works](https://dedi.beckn.try-dough.com/docs/beckn-demo).

### 2. CREST: verifiable credentials for real work

[CREST](https://github.com/theflywheel/CREST) issues verifiable credentials for
work people have done. The things a credential depends on (the organisations,
the terms they agreed to, and the definition of the work itself) are published
as signed records on CREST's own DeDi node, which is watched by a second,
independent node.

When a verifier checks a credential, its trust chain points back to **specific
versions** of those DeDi records, each with an inclusion proof. So a verifier
can confirm that the work definition the credential was issued under really
was published, and see exactly what it said at the time, even if it has
changed since. [How CREST uses DeDi](https://dedi.beckn.try-dough.com/docs/crest).

## Try it

You need Docker. This starts a node and fetches its first signed checkpoint:

```sh
docker network create dedi-net
docker run -d --name dedi-pg --network dedi-net \
  -e POSTGRES_USER=dedi -e POSTGRES_PASSWORD=dedi -e POSTGRES_DB=dedi postgres:16-alpine
until docker exec dedi-pg pg_isready -h 127.0.0.1 -U dedi -q; do sleep 1; done
docker run -d --name dedi-node --network dedi-net -p 8080:8080 \
  -e DATABASE_URL='postgres://dedi:dedi@dedi-pg:5432/dedi?sslmode=disable' \
  -e DEDI_ORIGIN=localhost/log flywheelai/dedi-node:latest
until curl -sf localhost:8080/healthz >/dev/null; do sleep 1; done
curl -s localhost:8080/dedi/log/checkpoint
```

Then open `http://localhost:8080/` for the node's own pages. The
[quickstart](https://dedi.beckn.try-dough.com/docs/quickstart) continues from
there to your first signed write and a record with its proof.

Or explore the live network: [dedi.beckn.try-dough.com](https://dedi.beckn.try-dough.com)
([overview](https://dedi.beckn.try-dough.com/docs/overview) ·
[architecture](https://dedi.beckn.try-dough.com/docs/architecture)).

## We'd love your feedback

We'd really appreciate feedback on how to make this better. For instance:
should Beckn compatibility be a first-class part of the node, or should the
node stay a standalone DeDi implementation, with protocol-specific
compatibility living in the clients that need it? What would it take for
network operators and registry owners to adopt something like this? And if you
run a directory that ought to be checkable, or you see something we should do
differently, we'd like to hear from you.

## Links

- Node: [hub.docker.com/r/flywheelai/dedi-node](https://hub.docker.com/r/flywheelai/dedi-node)
- Conformance suite: [hub.docker.com/r/flywheelai/dedi-conformance](https://hub.docker.com/r/flywheelai/dedi-conformance) · [source](https://github.com/theflywheel/dedi-conformance)
- Live node and documentation: [dedi.beckn.try-dough.com](https://dedi.beckn.try-dough.com/docs/overview)
- CREST: [github.com/theflywheel/CREST](https://github.com/theflywheel/CREST)
- The DeDi standard: [LF Decentralized Trust, decentralized-directory-protocol](https://github.com/LF-Decentralized-Trust-labs/decentralized-directory-protocol)
