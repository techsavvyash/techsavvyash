---
title: (Opus or Codex) vs (Opus and Codex)
description: Should you use opus? or codex? or maybe, both?
---

Now that people have started to embrace coding agents—instead of looking down on those who use them to ship software like they did back in July 2025—they’re coming to the exact same people asking what subscription to get, at least in my office. Sure, some still judge, but they're in the minority now.

For the most part, when these conversations were happening, I hadn’t even used Codex myself. Claude Code had great rate limits, and I was getting the hang of shipping with it, so I wasn't experimenting much. But right around that time, [Amp](https://ampcode.com) launched their [deep mode](https://ampcode.com/news/deep-mode), powered by GPT-5.2-Codex. 

I’ve been a long-standing fan of Amp. In my opinion, it’s the best agentic tool out there in the market right now. It's just expensive to use since the Amp team can't really provide us with heavy subsidies like Anthropic and OpenAI (which even they are working toward rescinding now). Because of that, it sees a much smaller footfall compared to Claude Code or Codex, at least in the Indian ecosystem.

![[../images/opus-v-codex.svg]]

When they released it, the Amp team made a great comparison: Opus is an eager "doer" model that just wants to get to work, whereas Codex likes to go deep (hence the name). Codex prefers to read the code, figure out a plan of action, and then make small, surgical edits. 

When I heard this and tried Deep Mode myself, it clicked. Even though these are products from two arch-rivals (so much so that their CEOs can't even touch each other—[ref](https://youtube.com/shorts/vS68BsFWIqY?si=uLSvCnqwRFJlJNqY)), these models are actually incredibly complementary. 

Ever since then, I’ve been using Deep Mode to handle the task planning. It grounds Opus's over-the-top eagerness, helps me remove code duplication suggestions, and keeps the overall design sane. 

So, my simple workflow now looks like this: jam with Claude Code on a feature, scope it out, and get it to spit out a design doc. Then, feed that doc into Amp's Deep Mode to ground it, turn it into an implementation plan, and sort out the verification criteria for each phase. Next, hand that document back to Claude Code to actually implement. Once that's done, I ask the Deep Mode thread to verify the implementation and fix whatever bugs Claude created.

![[../images/coding-workflow.svg]]

This has grounded my implementations so much. I recently vibe-coded a fairly complex system involving Firecracker VMs and remote agent orchestration completely without ever reading the code myself. It reliably works every single time on my Tailscale network. 

Simply put, these models are pretty good at complementing each other's shortcomings. It makes me think the answer isn't Opus *or* Codex—it's Opus *and* Codex.
