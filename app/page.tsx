import Image from "next/image";
import Nav from "@/app/components/Nav";
import Reveal from "@/app/components/Reveal";

const guarantees = [
  {
    src: "/img/cap-shadows.jpg",
    alt: "Soft branch shadows moving across weathered concrete steps",
    title: "Durable execution",
    body: "Checkpoints, retries, and exactly-once semantics. A run that dies at step nine resumes at step nine, not from the top.",
  },
  {
    src: "/img/cap-sunlight.jpg",
    alt: "Golden hour sunlight on a building facade behind a dark foreground",
    title: "Fleet observability",
    body: "Every step is a trace, and every trace is queryable: latency, tokens, tool calls, and cost, per agent and per run.",
  },
  {
    src: "/img/cap-arch.jpg",
    alt: "Weathered brick arches reflected in mist over a river",
    title: "Policy & audit",
    body: "Scopes, budgets, and approval gates enforced at the runtime. Every action is attributable, replayable, and exportable.",
  },
];

/* PLACEHOLDER METRICS — replace with real customer figures before launch. */
const metrics = [
  { value: "99.95%", label: "Fleet uptime, trailing 90 days" },
  { value: "180ms", label: "p95 time to first step" },
  { value: "100%", label: "Runs with a complete trace" },
];

const routes = [
  {
    step: "01",
    title: "Ship",
    body: "Deploy an agent from the CLI, a manifest, or the API. Bridge provisions the runtime, the queue, and the secrets so there is nothing else to stand up.",
  },
  {
    step: "02",
    title: "Observe",
    body: "Traces, logs, and cost land in one place from the first run. No dashboard to build before you can tell whether the thing works.",
  },
  {
    step: "03",
    title: "Govern",
    body: "Attach scopes, budgets, and approval gates. An agent that tries to spend past its budget stops, and a human decides what happens next.",
  },
  {
    step: "04",
    title: "Prove",
    body: "Export an audit trail for every action any agent took, signed and ordered. Defensible to a regulator without a week of archaeology.",
  },
];

const footerColumns = [
  { title: "Platform", links: ["Runtime", "Observability", "Governance", "Changelog"] },
  { title: "Developers", links: ["Documentation", "CLI reference", "API", "Status"] },
  { title: "Company", links: ["About", "Careers", "Security", "Contact"] },
];

function SectionLabel({
  index,
  name,
  onDark = false,
}: {
  index: string;
  name: string;
  onDark?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] ${
        onDark ? "text-paper/60" : "text-ink-soft"
      }`}
    >
      <span className={onDark ? "text-ember" : "text-amber"}>{index}</span>
      <span aria-hidden className={`h-px w-8 ${onDark ? "bg-paper/30" : "bg-line"}`} />
      <span>{name}</span>
    </p>
  );
}

export default function Page() {
  return (
    <>
      <Nav />

      {/* Hero — full-bleed photograph, giant serif wordmark. */}
      <section
        id="top"
        className="relative isolate flex min-h-svh flex-col overflow-hidden bg-night"
      >
        <Image
          src="/img/hero.jpg"
          alt="Warm late-afternoon sunlight raking across monumental concrete fins with dark foliage"
          fill
          priority
          sizes="100vw"
          className="object-cover [filter:brightness(1.15)_saturate(1.12)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/65 via-night/25 to-night/85" />
        <div className="grain absolute inset-0" />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-36 pb-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.34em] text-paper/70">
            Agent infrastructure
          </p>

          <h1 className="mt-8 font-display text-[clamp(2.75rem,24vw,21rem)] font-medium uppercase leading-[0.82] tracking-[-0.02em] text-paper">
            <span className="sr-only">Bridge AI OS — </span>
            Bridge
          </h1>

          <p className="mt-10 max-w-xl text-[15px] leading-relaxed text-pretty text-paper/85 md:text-lg">
            One control plane to run, schedule, observe, and govern every agent your team
            puts into production.
          </p>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {["Durable execution", "Fleet observability", "Policy & audit"].map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-paper/40 px-4 py-1.5 text-[12px] tracking-wide text-paper/90 backdrop-blur-sm"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 pb-8 lg:px-10">
          <span className="text-[11px] uppercase tracking-[0.28em] text-paper/60">
            Scroll to explore
          </span>
          <span aria-hidden className="h-px w-16 bg-paper/25" />
        </div>
      </section>

      {/* 01 — Intro */}
      <section id="intro" className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-40">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-20">
            <SectionLabel index="01" name="Intro" />

            <div>
              <Reveal>
                <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.1] tracking-[-0.015em] text-balance">
                  Your agents are already running. They just aren&rsquo;t running as
                  infrastructure.
                </h2>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-10 grid gap-8 text-[15px] leading-relaxed text-ink-soft sm:grid-cols-2">
                  <p>
                    Most teams arrive at agents sideways. A script here, a cron job there, a
                    queue someone set up on a Friday and has not touched since. Each one works
                    until it doesn&rsquo;t, and nothing tells you which.
                  </p>
                  <p>
                    Bridge gives every agent a runtime that survives restarts, a schedule that
                    holds under load, a trace you can actually read, and a policy boundary it
                    cannot step outside. Deploy once. Govern it from a single place.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Platform, full-bleed */}
      <section
        id="platform"
        className="relative isolate flex min-h-[86svh] items-center overflow-hidden bg-night"
      >
        <Image
          src="/img/crossing.jpg"
          alt="An ancient stone arch bridge rising from low mist over still water"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-night/55" />
        <div className="grain absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-32 text-center lg:px-10">
          <Reveal>
            <div className="flex justify-center">
              <SectionLabel index="02" name="Platform" onDark />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mx-auto mt-12 max-w-4xl font-display text-[clamp(2.1rem,6.4vw,5.25rem)] leading-[1.03] tracking-[-0.02em] text-balance text-paper">
              Every agent crosses the same bridge.
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <p className="mx-auto mt-8 max-w-lg text-[15px] leading-relaxed text-pretty text-paper/75">
              One span between a prompt somebody wrote and a job you can defend in production.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 03 — Runtime */}
      <section id="runtime" className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-40">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <div>
              <SectionLabel index="03" name="Runtime" />
              <Reveal delay={80}>
                <h2 className="mt-9 max-w-2xl font-display text-[clamp(2rem,5vw,4.25rem)] leading-[1.06] tracking-[-0.02em] text-balance">
                  Three guarantees, not three promises.
                </h2>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <p className="max-w-xs text-[15px] leading-relaxed text-ink-soft">
                Everything below is enforced by the runtime itself, not by convention or by
                whoever is on call.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {guarantees.map((item, index) => (
              <Reveal key={item.title} delay={index * 110}>
                <article>
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-2xl tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Observability */}
      <section id="observability" className="bg-night text-paper">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-40">
          <SectionLabel index="04" name="Observability" onDark />

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-24">
            <Reveal>
              <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,4.25rem)] leading-[1.06] tracking-[-0.02em] text-balance">
                Watch the whole fleet at once.
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="max-w-lg text-[15px] leading-relaxed text-paper/70 lg:pt-2">
                One query across every agent you run. Follow a single decision from the
                prompt that caused it to the tool call it made, see the cost of each step,
                and know which agent is quietly burning money before the invoice arrives.
              </p>
            </Reveal>
          </div>

          {/* PLACEHOLDER METRICS */}
          <Reveal delay={220}>
            <ul className="mt-16 grid gap-y-10 sm:grid-cols-3 sm:gap-x-8">
              {metrics.map((metric) => (
                <li key={metric.label} className="border-t border-paper/15 pt-7">
                  <p className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none tracking-tight">
                    {metric.value}
                  </p>
                  <p className="mt-4 max-w-[13rem] text-[13px] leading-snug tracking-wide text-paper/60">
                    {metric.label}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 05 — Governance */}
      <section id="governance" className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-40">
          <SectionLabel index="05" name="Governance" />

          <Reveal>
            <h2 className="mt-10 max-w-3xl font-display text-[clamp(2rem,5vw,4.25rem)] leading-[1.06] tracking-[-0.02em] text-balance">
              The route to production.
            </h2>
          </Reveal>

          <ol className="mt-16 border-t border-line">
            {routes.map((route, index) => (
              <Reveal key={route.step} as="li" delay={index * 90}>
                <div className="grid gap-4 border-b border-line py-9 md:grid-cols-[5rem_minmax(0,13rem)_minmax(0,1fr)] md:items-baseline md:gap-8 md:py-11">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-amber">
                    {route.step}
                  </span>
                  <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                    {route.title}
                  </h3>
                  <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
                    {route.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Pull quote — PLACEHOLDER customer attribution. */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-3xl px-6 py-28 text-center lg:py-40">
          <Reveal>
            <blockquote className="font-display text-[clamp(1.6rem,3.6vw,3rem)] italic leading-[1.22] tracking-[-0.015em] text-balance">
              &ldquo;We stopped maintaining four schedulers and started shipping agents.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-9 text-[11px] uppercase tracking-[0.28em] text-ink-soft">
              Placeholder — head of platform engineering
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="bg-paper">
        <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-10 lg:py-40">
          <div className="border border-line bg-paper-deep px-6 py-20 text-center sm:px-12 lg:py-28">
            <Reveal>
              <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.2rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-balance">
                Bring your agents to the bridge.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-pretty text-ink-soft">
                Thirty minutes, no slides. We point Bridge at one of your real workloads and
                you can judge it on the traces.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#"
                  className="rounded-full bg-ink px-8 py-3.5 text-sm tracking-wide text-paper transition-colors hover:bg-night"
                >
                  Book a demo
                </a>
                <a
                  href="#platform"
                  className="rounded-full border border-ink/25 px-8 py-3.5 text-sm tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  Read the docs
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1600px] px-6 py-16 lg:px-10">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
            <div>
              <p className="font-display text-xl tracking-tight">Bridge AI OS</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
                The control plane for AI agent fleets.
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">
                  {column.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-ink/80 transition-colors hover:text-ink"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[12px] text-ink-soft">
            <p>&copy; {new Date().getFullYear()} Bridge AI OS</p>
            <p>Photography via Unsplash</p>
          </div>
        </div>
      </footer>
    </>
  );
}