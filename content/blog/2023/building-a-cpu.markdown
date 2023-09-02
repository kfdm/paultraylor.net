---
title: "Building a CPU"
date: 2023-09-02
summary: But how does a CPU work?
---

In university, I had a class "Computer Organization and Assembly Language" where we had to write programs in 8086 assembler.
I'm sure I also had a lesson or two somewhere on basic logic gates, but I still had a big gap in knowledge.
Recently I was curious and decided to learn, how does a CPU actually work?
How does an op code in assembler language translate to physical bits in the system?

Finding videos like [How TRANSISTORS do MATH](https://www.youtube.com/watch?v=VBDoT8o4q00) was helpful in understanding how some logic gates where made out of transistors.
[How a CPU Works](https://www.youtube.com/watch?v=cNN_tTXABUA) was another great video, introducing me to the "Scott CPU".
The series [Exploring How Computers Work](https://www.youtube.com/watch?v=QZwneRb-zqA) was also excelent and I originally tried to use their [Digital Logic Sim](https://sebastian.itch.io/digital-logic-sim) to try to build my test CPU before _quickly_ hitting limits.

I ended up buying the book [But How Do It Know](http://www.buthowdoitknow.com).
Reading through the book, I started using the circuit verse [simulator] to build up my own CPU model to match the [model] on the book's website.
The two largest things that helped a CPU finally click for me, was understanding how the **stepper** and how the **selectors** worked.

# Stepper

<iframe src="https://circuitverse.org/simulator/embed/scott-cpu-stepper"   scrolling="no" height="200" width="100%"></iframe>

[Alternate Link](https://circuitverse.org/users/189236/projects/scott-cpu-stepper)

The stepper reads from the clock and decides what "step" the CPU is currently on.
Many CPUs use a fetch-execute loop, so in this model CPU, the first 3 steps are used to fetch an instruction and the next 3 steps are used to execute an instruction.

# Selector

<iframe src="https://circuitverse.org/simulator/embed/scott-cpu-selector"   scrolling="no" height="200" width="100%"></iframe>

[Alternate Link](https://circuitverse.org/users/189236/projects/scott-cpu-selector)

The selector is hooked up to various bits of the instruction register.
Depending on which bits are on, this might trigger an ALU instruction or select a specific register.

# Full Simulator

<iframe src="https://circuitverse.org/simulator/embed/scott-cpu-full"   scrolling="no" height="500" width="100%"></iframe>

[Alternate Link](https://circuitverse.org/users/189236/projects/scott-cpu-full)

While reading through the book, I attempted to build my own CPU to match the [model] on the website.
I think I'm near the limits of what the online simulator can easily handle, so my CPU does not _quite_ work, but while building it I was able to better understand how everything fits together.

# Next?

More modern CPUs are a **lot** more complicated, supporting larger addresses and interupt systems.
For the purpose of learning how a CPU works, I think this is a good stopping point.
Next I'm curious to revisit how an OS works.
I recently read that the original Linux kernel is _only_ about 10,000 lines of code.

[simulator]: https://circuitverse.org/users/189236/projects/scott-cpu-full
[model]: http://www.buthowdoitknow.com/but_how_do_it_know_cpu_model.html
[stepper]: https://circuitverse.org/users/189236/projects/scott-cpu-stepper
[selector]: https://circuitverse.org/users/189236/projects/scott-cpu-selector
