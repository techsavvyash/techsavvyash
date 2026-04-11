---
title: Agent Harness 
---

Some days back, the creator of Python put up a tweet checking whether his understanding of agents was correct. Andrej Karpathy put up a reply under that tweet, comparing traditional engineering concepts to the agentic ecosystem.

![[Screenshot 2026-04-04 at 7.03.55 PM.png]]

The original tweet from Guido van Rossum can be found [here](https://x.com/gvanrossum/status/2039045160156426463?s=46&t=SpGulJ9nlM3Fv26dxWW1dw) and Karpathy's reply is [here](https://x.com/karpathy/status/2039054981719089202?s=46&t=SpGulJ9nlM3Fv26dxWW1dw).

This reply made me curious as to where the _Harness_ would sit in this entire stack. Harness has been a buzzword for quite some time now and different people have different definitions for it. A simple Google search returns some blogs, but I don't think there are a lot of write-ups or any universally accepted definition for it right now. Some of the blogs I liked and resonated with are linked at the end of this post.

According to me, the third component in the above comparison should be the Operating System itself, and it equates to the *Harness*, which makes the updated list look something like this:

```
- LLM = CPU (data: tokens not bytes, dynamics: statistical and vague not deterministic and precise)

- Agent = operating system kernel

- Harness = operating system
```

<svg width="100%" viewBox="0 0 680 300" role="img">
  <title>Traditional computing vs agentic ecosystem stack comparison</title>
  <desc>Side-by-side table showing CPU maps to LLM, OS kernel maps to Agent, and Operating System maps to Harness</desc>
  <defs>
    <marker id="a1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <text class="th" x="150" y="32" text-anchor="middle">Traditional computing</text>
  <text class="th" x="530" y="32" text-anchor="middle">Agentic ecosystem</text>
  <line x1="40" y1="44" x2="640" y2="44" stroke="var(--b)" stroke-width="0.5" opacity="0.35"/>
  <g class="node c-purple">
    <rect x="40" y="60" width="220" height="56" rx="6" stroke-width="0.5"/>
    <text class="th" x="150" y="80" text-anchor="middle" dominant-baseline="central">CPU</text>
    <text class="ts" x="150" y="98" text-anchor="middle" dominant-baseline="central">bytes · deterministic</text>
  </g>
  <text class="th" x="340" y="88" text-anchor="middle" dominant-baseline="central">≡</text>
  <g class="node c-purple">
    <rect x="420" y="60" width="220" height="56" rx="6" stroke-width="0.5"/>
    <text class="th" x="530" y="80" text-anchor="middle" dominant-baseline="central">LLM</text>
    <text class="ts" x="530" y="98" text-anchor="middle" dominant-baseline="central">tokens · probabilistic</text>
  </g>
  <g class="node c-teal">
    <rect x="40" y="136" width="220" height="56" rx="6" stroke-width="0.5"/>
    <text class="th" x="150" y="156" text-anchor="middle" dominant-baseline="central">OS kernel</text>
    <text class="ts" x="150" y="174" text-anchor="middle" dominant-baseline="central">orchestrates system calls</text>
  </g>
  <text class="th" x="340" y="164" text-anchor="middle" dominant-baseline="central">≡</text>
  <g class="node c-teal">
    <rect x="420" y="136" width="220" height="56" rx="6" stroke-width="0.5"/>
    <text class="th" x="530" y="156" text-anchor="middle" dominant-baseline="central">Agent</text>
    <text class="ts" x="530" y="174" text-anchor="middle" dominant-baseline="central">orchestrates tool calls</text>
  </g>
  <g class="node c-blue">
    <rect x="40" y="212" width="220" height="56" rx="6" stroke-width="0.5"/>
    <text class="th" x="150" y="232" text-anchor="middle" dominant-baseline="central">Operating system</text>
    <text class="ts" x="150" y="250" text-anchor="middle" dominant-baseline="central">system API surface</text>
  </g>
  <text class="th" x="340" y="240" text-anchor="middle" dominant-baseline="central">≡</text>
  <g class="node c-blue">
    <rect x="420" y="212" width="220" height="56" rx="6" stroke-width="0.5"/>
    <text class="th" x="530" y="232" text-anchor="middle" dominant-baseline="central">Harness</text>
    <text class="ts" x="530" y="250" text-anchor="middle" dominant-baseline="central">agent API surface</text>
  </g>
</svg>

Equating the CPU and LLM makes sense — those are the actual *brains* or processors of the information. That is where information goes to be processed and a result is returned. An *Agent* in my opinion is simply an LLM call wrapped in an infinite loop with the capability to act on different directives we call *tools*. Now if we are comparing the primitives, the tool calls become your CPU's instruction set.

<svg width="100%" viewBox="0 0 680 400" role="img">
  <title>Instruction set and system calls: traditional vs agentic call stack</title>
  <desc>Two-column diagram comparing call stacks. Left: Application, System calls, Kernel, Instruction set (ADD SUB MOV JMP LOAD CALL), CPU. Right: Task, Tool calls, Agent, Tool set (search write exec read query fetch), LLM.</desc>
  <defs>
    <marker id="a3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <line x1="340" y1="16" x2="340" y2="386" stroke="var(--b)" stroke-width="0.5" stroke-dasharray="4 4" opacity="0.35"/>
  <text class="th" x="175" y="30" text-anchor="middle">Traditional</text>
  <text class="th" x="505" y="30" text-anchor="middle">Agentic</text>
  <g class="node box">
    <rect x="80" y="48" width="190" height="40" rx="6" stroke-width="0.5"/>
    <text class="th" x="175" y="64" text-anchor="middle" dominant-baseline="central">Application</text>
    <text class="ts" x="175" y="80" text-anchor="middle" dominant-baseline="central">calls system functions</text>
  </g>
  <line x1="175" y1="90" x2="175" y2="112" class="arr" marker-end="url(#a3)"/>
  <g class="node c-amber">
    <rect x="80" y="116" width="190" height="40" rx="6" stroke-width="0.5"/>
    <text class="th" x="175" y="132" text-anchor="middle" dominant-baseline="central">System calls</text>
    <text class="ts" x="175" y="148" text-anchor="middle" dominant-baseline="central">read(), write(), fork()</text>
  </g>
  <line x1="175" y1="158" x2="175" y2="178" class="arr" marker-end="url(#a3)"/>
  <g class="node c-teal">
    <rect x="80" y="182" width="190" height="40" rx="6" stroke-width="0.5"/>
    <text class="th" x="175" y="198" text-anchor="middle" dominant-baseline="central">OS kernel</text>
    <text class="ts" x="175" y="214" text-anchor="middle" dominant-baseline="central">routes instructions</text>
  </g>
  <line x1="175" y1="224" x2="175" y2="248" class="arr" marker-end="url(#a3)"/>
  <g class="c-coral"><rect x="80" y="252" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="105" y="266" text-anchor="middle" dominant-baseline="central">ADD</text></g>
  <g class="c-coral"><rect x="140" y="252" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="165" y="266" text-anchor="middle" dominant-baseline="central">SUB</text></g>
  <g class="c-coral"><rect x="200" y="252" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="225" y="266" text-anchor="middle" dominant-baseline="central">MOV</text></g>
  <g class="c-coral"><rect x="80" y="288" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="105" y="302" text-anchor="middle" dominant-baseline="central">JMP</text></g>
  <g class="c-coral"><rect x="140" y="288" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="165" y="302" text-anchor="middle" dominant-baseline="central">LOAD</text></g>
  <g class="c-coral"><rect x="200" y="288" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="225" y="302" text-anchor="middle" dominant-baseline="central">CALL</text></g>
  <line x1="175" y1="318" x2="175" y2="338" class="arr" marker-end="url(#a3)"/>
  <g class="node c-purple">
    <rect x="80" y="342" width="190" height="40" rx="6" stroke-width="0.5"/>
    <text class="th" x="175" y="358" text-anchor="middle" dominant-baseline="central">CPU</text>
    <text class="ts" x="175" y="374" text-anchor="middle" dominant-baseline="central">processes bytes</text>
  </g>
  <g class="node box">
    <rect x="420" y="48" width="190" height="40" rx="6" stroke-width="0.5"/>
    <text class="th" x="515" y="64" text-anchor="middle" dominant-baseline="central">Task</text>
    <text class="ts" x="515" y="80" text-anchor="middle" dominant-baseline="central">calls tool functions</text>
  </g>
  <line x1="515" y1="90" x2="515" y2="112" class="arr" marker-end="url(#a3)"/>
  <g class="node c-amber">
    <rect x="420" y="116" width="190" height="40" rx="6" stroke-width="0.5"/>
    <text class="th" x="515" y="132" text-anchor="middle" dominant-baseline="central">Tool calls</text>
    <text class="ts" x="515" y="148" text-anchor="middle" dominant-baseline="central">search(), write(), exec()</text>
  </g>
  <line x1="515" y1="158" x2="515" y2="178" class="arr" marker-end="url(#a3)"/>
  <g class="node c-teal">
    <rect x="420" y="182" width="190" height="40" rx="6" stroke-width="0.5"/>
    <text class="th" x="515" y="198" text-anchor="middle" dominant-baseline="central">Agent</text>
    <text class="ts" x="515" y="214" text-anchor="middle" dominant-baseline="central">routes tool calls</text>
  </g>
  <line x1="515" y1="224" x2="515" y2="248" class="arr" marker-end="url(#a3)"/>
  <g class="c-coral"><rect x="420" y="252" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="445" y="266" text-anchor="middle" dominant-baseline="central">search</text></g>
  <g class="c-coral"><rect x="480" y="252" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="505" y="266" text-anchor="middle" dominant-baseline="central">write</text></g>
  <g class="c-coral"><rect x="540" y="252" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="565" y="266" text-anchor="middle" dominant-baseline="central">exec</text></g>
  <g class="c-coral"><rect x="420" y="288" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="445" y="302" text-anchor="middle" dominant-baseline="central">read</text></g>
  <g class="c-coral"><rect x="480" y="288" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="505" y="302" text-anchor="middle" dominant-baseline="central">query</text></g>
  <g class="c-coral"><rect x="540" y="288" width="50" height="28" rx="4" stroke-width="0.5"/><text class="ts" x="565" y="302" text-anchor="middle" dominant-baseline="central">fetch</text></g>
  <line x1="515" y1="318" x2="515" y2="338" class="arr" marker-end="url(#a3)"/>
  <g class="node c-purple">
    <rect x="420" y="342" width="190" height="40" rx="6" stroke-width="0.5"/>
    <text class="th" x="515" y="358" text-anchor="middle" dominant-baseline="central">LLM</text>
    <text class="ts" x="515" y="374" text-anchor="middle" dominant-baseline="central">processes tokens</text>
  </g>
</svg>

Now, similar to how an operating system kernel like Linux wraps this instruction set and implements the logic for OS booting, orchestrating instructions to enable common operations like connecting to a network, using I/O devices, and manipulating storage via system calls — the agent, with its system prompt and tool configuration, exposes different sets of functionality. This is what we may call a *Harness*.

<svg width="100%" viewBox="0 0 680 360" role="img">
  <title>Agentic stack as nested containment layers</title>
  <desc>Three nested boxes showing Harness containing Agent containing LLM, with annotations equating them to Operating System, OS kernel, and CPU respectively</desc>
  <defs>
    <marker id="a2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <g class="c-blue">
    <rect x="40" y="50" width="420" height="280" rx="16" stroke-width="0.5"/>
    <text class="th" x="250" y="78" text-anchor="middle">Harness</text>
    <text class="ts" x="250" y="96" text-anchor="middle">system prompt + tool configuration</text>
  </g>
  <g class="c-teal">
    <rect x="80" y="124" width="340" height="156" rx="12" stroke-width="0.5"/>
    <text class="th" x="250" y="148" text-anchor="middle">Agent</text>
    <text class="ts" x="250" y="165" text-anchor="middle">LLM call loop + tool dispatch</text>
  </g>
  <g class="c-purple">
    <rect x="120" y="194" width="260" height="66" rx="8" stroke-width="0.5"/>
    <text class="th" x="250" y="220" text-anchor="middle" dominant-baseline="central">LLM</text>
    <text class="ts" x="250" y="240" text-anchor="middle" dominant-baseline="central">token → token</text>
  </g>
  <line x1="460" y1="78" x2="478" y2="78" stroke="var(--t)" stroke-width="0.5" stroke-dasharray="3 3"/>
  <circle cx="460" cy="78" r="2" fill="var(--t)" opacity="0.5"/>
  <text class="ts" x="484" y="82">≡ operating system</text>
  <line x1="420" y1="148" x2="478" y2="148" stroke="var(--t)" stroke-width="0.5" stroke-dasharray="3 3"/>
  <circle cx="420" cy="148" r="2" fill="var(--t)" opacity="0.5"/>
  <text class="ts" x="484" y="152">≡ OS kernel</text>
  <line x1="380" y1="224" x2="478" y2="224" stroke="var(--t)" stroke-width="0.5" stroke-dasharray="3 3"/>
  <circle cx="380" cy="224" r="2" fill="var(--t)" opacity="0.5"/>
  <text class="ts" x="484" y="228">≡ CPU</text>
</svg>

Obviously it's not exactly a 1:1 mapping and there are grey areas where the above explanation also falls short or becomes ambiguous, but this is my mental model at the moment.

<svg width="100%" viewBox="0 0 680 290" role="img">
  <title>Transformation from traditional computing concepts to agentic equivalents</title>
  <desc>Three rows. CPU becomes LLM via bytes-to-tokens shift. OS kernel becomes Agent via syscalls-to-tool-calls shift. Operating System becomes Harness via hardware-API-to-model-API shift.</desc>
  <defs>
    <marker id="a4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <text class="th" x="118" y="30" text-anchor="middle">Traditional</text>
  <text class="th" x="552" y="30" text-anchor="middle">Agentic</text>
  <line x1="40" y1="42" x2="640" y2="42" stroke="var(--b)" stroke-width="0.5" opacity="0.2"/>
  <g class="node c-purple">
    <rect x="40" y="54" width="155" height="50" rx="6" stroke-width="0.5"/>
    <text class="th" x="118" y="74" text-anchor="middle" dominant-baseline="central">CPU</text>
    <text class="ts" x="118" y="92" text-anchor="middle" dominant-baseline="central">processes bytes</text>
  </g>
  <line x1="198" y1="79" x2="215" y2="79" class="arr" marker-end="url(#a4)"/>
  <g class="c-gray">
    <rect x="218" y="59" width="234" height="40" rx="8" stroke-width="0.5"/>
    <text class="th" x="335" y="74" text-anchor="middle" dominant-baseline="central">bytes → tokens</text>
    <text class="ts" x="335" y="91" text-anchor="middle" dominant-baseline="central">deterministic → statistical</text>
  </g>
  <line x1="455" y1="79" x2="472" y2="79" class="arr" marker-end="url(#a4)"/>
  <g class="node c-purple">
    <rect x="475" y="54" width="155" height="50" rx="6" stroke-width="0.5"/>
    <text class="th" x="553" y="74" text-anchor="middle" dominant-baseline="central">LLM</text>
    <text class="ts" x="553" y="92" text-anchor="middle" dominant-baseline="central">processes tokens</text>
  </g>
  <line x1="40" y1="120" x2="640" y2="120" stroke="var(--b)" stroke-width="0.5" opacity="0.15"/>
  <g class="node c-teal">
    <rect x="40" y="132" width="155" height="50" rx="6" stroke-width="0.5"/>
    <text class="th" x="118" y="152" text-anchor="middle" dominant-baseline="central">OS kernel</text>
    <text class="ts" x="118" y="170" text-anchor="middle" dominant-baseline="central">routes instructions</text>
  </g>
  <line x1="198" y1="157" x2="215" y2="157" class="arr" marker-end="url(#a4)"/>
  <g class="c-gray">
    <rect x="218" y="137" width="234" height="40" rx="8" stroke-width="0.5"/>
    <text class="th" x="335" y="152" text-anchor="middle" dominant-baseline="central">syscalls → tool calls</text>
    <text class="ts" x="335" y="169" text-anchor="middle" dominant-baseline="central">fixed ISA → extensible tools</text>
  </g>
  <line x1="455" y1="157" x2="472" y2="157" class="arr" marker-end="url(#a4)"/>
  <g class="node c-teal">
    <rect x="475" y="132" width="155" height="50" rx="6" stroke-width="0.5"/>
    <text class="th" x="553" y="152" text-anchor="middle" dominant-baseline="central">Agent</text>
    <text class="ts" x="553" y="170" text-anchor="middle" dominant-baseline="central">routes tool calls</text>
  </g>
  <line x1="40" y1="198" x2="640" y2="198" stroke="var(--b)" stroke-width="0.5" opacity="0.15"/>
  <g class="node c-blue">
    <rect x="40" y="210" width="155" height="50" rx="6" stroke-width="0.5"/>
    <text class="th" x="118" y="230" text-anchor="middle" dominant-baseline="central">Operating system</text>
    <text class="ts" x="118" y="248" text-anchor="middle" dominant-baseline="central">hardware interface</text>
  </g>
  <line x1="198" y1="235" x2="215" y2="235" class="arr" marker-end="url(#a4)"/>
  <g class="c-gray">
    <rect x="218" y="215" width="234" height="40" rx="8" stroke-width="0.5"/>
    <text class="th" x="335" y="230" text-anchor="middle" dominant-baseline="central">HW API → model API</text>
    <text class="ts" x="335" y="247" text-anchor="middle" dominant-baseline="central">binary config → language config</text>
  </g>
  <line x1="455" y1="235" x2="472" y2="235" class="arr" marker-end="url(#a4)"/>
  <g class="node c-blue">
    <rect x="475" y="210" width="155" height="50" rx="6" stroke-width="0.5"/>
    <text class="th" x="553" y="230" text-anchor="middle" dominant-baseline="central">Harness</text>
    <text class="ts" x="553" y="248" text-anchor="middle" dominant-baseline="central">model interface</text>
  </g>
</svg>


## Reading/References

A list of some other opinions and writing I liked and found interesting.

1. [OpenAI - Harness Engineering](https://openai.com/index/harness-engineering/)
2. [Anthropic - Harness design for long running agents](https://www.anthropic.com/engineering/harness-design-long-running-apps)
3. [Anthropic - Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)