---
title: Promises
---

- Think of programs as "chunks" - one of these chunks execute "right now" and others execute "later".
- Simplest "chunk" can be a `function`
- Until ES6 JS had no internal notion of asynchrony
	- JS Engine runs on a "hosting env"
	- The hosting env has the "event loop"
	- For example: in case of AJAX requests, it is the 'browser' who listens for the response of the network call

- event loops thinks and talks in terms of "tasks"
### Difference between asynchrony 
- Event loop is pretty different from 
- `Run To Completion` - JavaScript has "run to completion" behaviour, which means that if one function starts executing, then only it's code will run to completion before anything else runs
- Event loop might introduce non-determinism in the code but due to "event" ordering (this is due to the single threaded) nature of things and not because of "inter-leaving" of statements.
	- This is what a simple "race condition" is.
- If the processes are "non-interacting" then non-determinism is perfectly acceptable
	- Cafeteria student example

### Jobs
- "Job Queue" on top of event loop -- used to schedule async tasks inside async tasks - but why?? because these task are a part of the current async task (do later task) but they still need to be finished before other do later tasks 
- "Job Queue" hangs off of each item in the event loop -- i.e. each item in the event loop has a job queue associated to it
- Always remember that the "job queue" is associated with the current task of the event loop

### Key terms to note
- tick (of an event loop) -  Each iteration of the event loop is a tick
- process
- task
- event - async function invocations
- "latch" conditions


## Chapter-2: Callbacks

- Event Loop aligns well with how humans think of things
- Callback hell
- Lack of sequentiality and alignment with human mental model
- Lack of trust -- specially with "inversion of control" involving external parties

### key terms
- Zalgo effects

## Chapter-3: Promises

- Promises help prevent "inversion of control"
- Because Promises encapsulate the time-dependent state—waiting on the fulfillment or rejection of the underlying value—from the out‐ side, the Promise itself is time-independent, and thus Promises can be composed (combined) in predictable ways regardless of the tim‐ ing or outcome underneath.
- Resolved promises are immutable
- Promises are identified using _thenable duck typing_
	- _thenable_: is anything that has a "then" property on it which is a function
	- _duck typing_: is The general term for type checks that make assumptions about a value’s type based on its shape (what properties are present) 
- !!!! Very Important to Node !!! `then(...)` calls themselves return promises
### Trust with Promises
- They prevent the _zalgo_ effect inherently.
- "Jobs" (queues hanging off of tasks in the event loop) are at the core of Promises making them more predictable especially in terms of early or late firing of callbacks passed to "then" or "catch"
- _"race"_ can be used to define that a promise is not getting resolved or has hanged
### key terms
- _thenable_
- _duck typing_