
"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#111111] text-[#F5F1E8]">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-12">
        <a href="#" className="text-2xl font-semibold tracking-[0.2em]">
          AHSARO<span className="text-[#B89B68]">.</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#services" className="hover:text-[#B89B68]">Services</a>
          <a href="#work" className="hover:text-[#B89B68]">Our work</a>
          <a href="#about" className="hover:text-[#B89B68]">About</a>
        </nav>

        <a
          href="mailto:hello@ahsaro.com"
          className="hidden border border-[#B89B68]/60 px-5 py-3 text-xs tracking-wider hover:bg-[#B89B68] hover:text-black md:block"
        >
          LET&apos;S TALK ↗
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-sm md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </header>

      {menuOpen && (
        <nav className="flex flex-col gap-5 border-b border-white/10 px-6 py-6 text-sm md:hidden">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Our work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="mailto:hello@ahsaro.com">Contact us ↗</a>
        </nav>
      )}

      <section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-36">
        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#B89B68]/10 blur-[100px]" />

        <p className="mb-8 text-xs tracking-[0.3em] text-[#B89B68]">
          INDEPENDENT DIGITAL STUDIO
        </p>

        <h1 className="max-w-5xl text-5xl font-light leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
          Digital experiences,
          <br />
          <span className="font-serif italic text-[#B89B68]">
            elevated.
          </span>
        </h1>

        <div className="mt-10 flex max-w-3xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-md text-base leading-7 text-white/60">
            We create thoughtful websites and digital experiences that help
            ambitious businesses stand apart.
          </p>

          <a
            href="mailto:hello@ahsaro.com"
            className="inline-flex w-fit items-center gap-5 border-b border-[#B89B68] pb-3 text-sm hover:text-[#B89B68]"
          >
            START A PROJECT <span className="text-[#B89B68]">↗</span>
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-white/10 pt-6 md:grid-cols-3">
          <div>
            <p className="text-xs tracking-widest text-white/40">01 / DESIGN</p>
            <p className="mt-3 text-sm">Distinctive visual identities</p>
          </div>
          <div>
            <p className="text-xs tracking-widest text-white/40">02 / BUILD</p>
            <p className="mt-3 text-sm">Modern, responsive websites</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-xs tracking-widest text-white/40">03 / GROW</p>
            <p className="mt-3 text-sm">Digital experiences built to evolve</p>
          </div>
        </div>
      </section>

      <section id="services" className="border-t border-white/10 px-6 py-20 md:px-12 md:py-28">
        <p className="text-xs tracking-[0.3em] text-[#B89B68]">WHAT WE DO</p>
        <h2 className="mt-5 max-w-2xl text-4xl font-light md:text-6xl">
          Thoughtful work.
          <br />
          <span className="text-white/40">Measurable purpose.</span>
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Website Design",
              description: "Clear layouts and distinctive visual direction for your brand.",
            },
            {
              number: "02",
              title: "Web Development",
              description: "Responsive, modern websites designed for real people.",
            },
            {
              number: "03",
              title: "Website Care",
              description: "Ongoing improvements, maintenance and support.",
            },
          ].map((service) => (
            <article
              key={service.number}
              className="border border-white/10 p-7 transition-colors hover:border-[#B89B68]/60"
            >
              <p className="text-xs text-[#B89B68]">{service.number}</p>
              <h3 className="mt-10 text-xl">{service.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/50">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="border-t border-white/10 px-6 py-20 md:px-12 md:py-28">
        <p className="text-xs tracking-[0.3em] text-[#B89B68]">SELECTED WORK</p>
        <h2 className="mt-5 text-4xl font-light md:text-6xl">
          A preview of what&apos;s possible.
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <article className="flex min-h-64 flex-col justify-between bg-[#1B1B19] p-8">
            <span className="text-xs tracking-widest text-[#B89B68]">CONCEPT 01</span>
            <div>
              <h3 className="text-3xl font-light">The Modern Atelier</h3>
              <p className="mt-3 text-sm text-white/50">Fashion & lifestyle concept</p>
            </div>
          </article>
          <article className="flex min-h-64 flex-col justify-between bg-[#24211C] p-8">
            <span className="text-xs tracking-widest text-[#B89B68]">CONCEPT 02</span>
            <div>
              <h3 className="text-3xl font-light">Forma Living</h3>
              <p className="mt-3 text-sm text-white/50">Architecture & interiors concept</p>
            </div>
          </article>
        </div>

        <p className="mt-5 text-xs leading-5 text-white/40">
          These are concept directions, not completed client projects.
        </p>
      </section>

      <section id="about" className="border-t border-white/10 px-6 py-20 md:px-12 md:py-28">
        <p className="text-xs tracking-[0.3em] text-[#B89B68]">A DIFFERENT APPROACH</p>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <h2 className="text-4xl font-light leading-tight md:text-6xl">
            Good digital work
            <br />
            should feel
            <br />
            <span className="font-serif italic text-[#B89B68]">effortless.</span>
          </h2>
          <p className="max-w-lg self-end text-base leading-8 text-white/60">
            AHSARO is an independent digital studio focused on thoughtful
            design, purposeful development and details that make a difference.
            We believe a great website should look considered, work beautifully
            and make the next step clear.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 md:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <a href="#" className="text-xl tracking-[0.2em]">
              AHSARO<span className="text-[#B89B68]">.</span>
            </a>
            <p className="mt-3 text-sm text-white/40">Digital, Elevated.</p>
          </div>
          <div className="text-sm text-white/40">
            Independent by design.
            <p className="mt-2">© 2026 AHSARO Studio</p>
          </div>
        </div>
      </footer>
    </main>
  );
}