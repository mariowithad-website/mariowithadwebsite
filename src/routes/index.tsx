import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import warmStudio from "@/assets/MariowithaD_Warm_Header_3360x1440.jpg.asset.json";
import { releases, CATEGORY_LABELS, soundcloudEmbed, type ReleaseCategory, type Release } from "@/data/releases";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "mariowithaD — producer, london" },
      { name: "description", content: "Jazz, hip hop, house, funk and soul-rooted productions by mariowithaD. Listen to The More You Know and Hug Yah." },
      { property: "og:title", content: "mariowithaD — producer, london" },
      { property: "og:description", content: "Records dug, sound run, beats refined. Now it's time to release." },
      { property: "og:type", content: "music.musician" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["home", "home"],
  ["releases", "releases"],
  ["about", "about"],
  ["mixes", "mixes"],
  ["contact", "contact"],
] as const;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#home" className="font-mono text-sm tracking-tight text-silver">
          mariowitha<span className="text-amber">D</span>
        </a>
        <button
          className="label md:hidden"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "close" : "menu"}
        </button>
        <ul
          id="nav-menu"
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-1 border-b border-border bg-background px-5 py-4 md:static md:flex md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0`}
        >
          {NAV.map(([id, label], i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                aria-current={active === id ? "location" : undefined}
                className={`nav-link group block py-2 font-mono text-xs lowercase tracking-widest transition-colors hover:text-foreground focus-visible:text-foreground md:py-1 ${active === id ? "is-active text-foreground" : "text-muted-foreground"}`}
              >
                <span className="mr-1 text-amber/70">0{i + 1}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        if (img.current) img.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.06)`;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section id="home" className="grain relative flex min-h-[100svh] items-end overflow-hidden">
      <img ref={img} src={warmStudio.url} alt="The warm cinematic music studio with vinyl records, keyboards and recording equipment" width={3360} height={1440} className="hero-img absolute inset-0 h-full w-full object-cover object-center will-change-transform" />
      <div className="absolute inset-0 bg-hero-grade" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-fade-bottom" />
      <div className="hero-intro relative mx-auto w-full max-w-6xl px-5 pb-20">
        <p className="label mb-4">side a — london — est. 2020</p>
        <h1 className="font-mono text-[clamp(2.75rem,9vw,6.5rem)] font-normal leading-none tracking-tighter text-silver">
          mariowitha<span className="text-amber">D</span>
        </h1>
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">
          jazz · hip hop · house · funk · soul. productions from the basement up.
        </p>
        <div className="mt-8 flex gap-6 font-mono text-xs lowercase tracking-widest">
          <a href="#releases" className="btn-micro border-b border-amber pb-1 text-foreground transition-colors hover:text-amber">listen →</a>
          <a href="#about" className="pb-1 text-muted-foreground transition-colors hover:text-foreground">about</a>
        </div>
      </div>
    </section>
  );
}

function Sleeve({ r, index }: { r: Release; index: number }) {
  return (
    <div className="relative aspect-square overflow-visible">
      {/* vinyl peeking out */}
      <div
        aria-hidden
        className="vinyl-spin absolute inset-[4%] rounded-full bg-[radial-gradient(circle,var(--amber)_0_9%,var(--background)_9.5%_12%,oklch(0.12_0_0)_12.5%,oklch(0.2_0_0)_40%,oklch(0.1_0_0)_70%)] group-hover:translate-x-[22%] group-hover:rotate-45 motion-reduce:group-hover:translate-x-0"
      />
      <div
        className="relative h-full w-full overflow-hidden border border-border bg-card shadow-2xl transition-transform duration-500 group-hover:-translate-x-[4%]"
        style={
          r.artwork
            ? undefined
            : { backgroundImage: `linear-gradient(140deg, oklch(0.3 0.06 ${r.hue}) 0%, oklch(0.16 0.02 ${r.hue}) 70%)` }
        }
      >
        {r.artwork ? (
          <img src={r.artwork} alt={`${r.title} cover art`} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col justify-between p-5">
            <span className="label">mwd—00{index + 1}</span>
            <div>
              <p className="font-mono text-lg lowercase leading-tight text-silver">{r.title}</p>
              <p className="label mt-1">mariowithad</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Releases() {
  const [filter, setFilter] = useState<"all" | ReleaseCategory>("all");
  const [playing, setPlaying] = useState<string | null>(null);
  const list = filter === "all" ? releases : releases.filter((r) => r.category === filter);
  const filters = ["all", ...Object.keys(CATEGORY_LABELS)] as ("all" | ReleaseCategory)[];

  return (
    <section id="releases" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead n="02" title="releases" />
      <div role="group" aria-label="Filter releases" className="reveal mb-12 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`btn-micro border px-3 py-1.5 font-mono text-xs lowercase tracking-wider transition-colors ${
              filter === f ? "border-amber text-amber" : "border-border text-muted-foreground hover:border-silver hover:text-foreground"
            }`}
          >
            {f === "all" ? "all" : CATEGORY_LABELS[f]}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="reveal is-visible border border-dashed border-border p-10 text-center font-mono text-sm text-muted-foreground">
          nothing in this crate yet — coming soon.
        </p>
      ) : (
        <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <article key={r.url} className="reveal is-visible group">
              <div tabIndex={0} aria-label={`${r.title} artwork`} className="lift relative block rounded-sm">
                <Sleeve r={r} index={releases.indexOf(r)} />
                <div className="overlay absolute inset-0 flex flex-col justify-end gap-3 bg-background/75 p-5 backdrop-blur-[2px]">
                  <p className="font-mono text-base lowercase text-silver">{r.title}</p>
                  <p className="label">mariowithad · {CATEGORY_LABELS[r.category]}</p>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`Listen to ${r.title} on SoundCloud`} className="btn-micro self-start border border-amber px-4 py-2 font-mono text-xs lowercase tracking-widest text-amber hover:bg-amber hover:text-background">
                    listen ↗
                  </a>
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-mono text-sm lowercase text-foreground">{r.title}</h3>
                <span className="label">{CATEGORY_LABELS[r.category]}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3 font-mono text-xs lowercase tracking-wider">
                <button
                  onClick={() => setPlaying(playing === r.url ? null : r.url)}
                  aria-expanded={playing === r.url}
                  className="btn-micro text-amber transition-opacity hover:opacity-70"
                >
                  {playing === r.url ? "hide player" : "load player"}
                </button>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  soundcloud ↗
                </a>
                {r.bandcampUrl && <a href={r.bandcampUrl} target="_blank" rel="noopener noreferrer" className="text-amber hover:text-foreground">buy on bandcamp ↗</a>}
                {r.traxsourceUrl && <a href={r.traxsourceUrl} target="_blank" rel="noopener noreferrer" className="text-amber hover:text-foreground">buy on traxsource ↗</a>}
                {r.spotifyUrl && <a href={r.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">spotify ↗</a>}
                {r.appleMusicUrl && <a href={r.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">apple music ↗</a>}
              </div>
              {playing === r.url && (
                <iframe
                  title={`${r.title} SoundCloud player`}
                  className="mt-4 w-full border-0"
                  height={120}
                  allow="autoplay"
                  loading="lazy"
                  src={soundcloudEmbed(r.url)}
                />
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="reveal mb-10 flex items-baseline gap-4 border-b border-border pb-4">
      <span className="font-mono text-xs text-amber">{n}</span>
      <h2 className="font-mono text-xl lowercase tracking-tight text-silver">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-card/40 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead n="03" title="about" />
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <figure className="reveal">
            <div className="grain lift overflow-hidden border border-border">
              <img
                src="/helmet-portrait.png"
                onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = warmStudio.url; }}
                alt="MariowithaD wearing the green helmet with red visor in the studio"
                width={3360}
                height={1440}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-center"
              />
            </div>
            <figcaption className="label mt-3 normal-case">Most of this music was built in this room</figcaption>
          </figure>
          <div>
            <p className="reveal text-xl leading-relaxed text-foreground md:text-2xl">
              A lifelong music head shaped by jazz, hip hop, house, funk and soul. From digging records at 18 to running live sound in London, the foundation was built early. Production started in 2020 — years spent experimenting and refining. Now at 31, it’s time to release.
            </p>
            <ul className="reveal mt-10 space-y-2 border-t border-border pt-6 font-mono text-xs lowercase text-muted-foreground">
              <li>18 — digging records</li>
              <li>london — live sound</li>
              <li>2020 — production starts</li>
              <li className="text-amber">31 — time to release</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Add each mix's real URL when uploaded; unpublished mixes never show a fake player.
const MIXES: { title: string; soundcloudUrl?: string; bandcampUrl?: string; traxsourceUrl?: string }[] = [
  { title: "coming soon" },
  { title: "coming soon" },
  { title: "coming soon" },
];

const MIX_ART = [
  "radial-gradient(circle at 30% 30%, oklch(0.45 0.09 255) 0%, transparent 55%), radial-gradient(circle at 75% 80%, oklch(0.5 0.12 65 / 0.6) 0%, transparent 40%), linear-gradient(160deg, oklch(0.2 0.03 255), oklch(0.1 0.01 255))",
  "repeating-radial-gradient(circle at 50% 120%, oklch(0.25 0.03 250) 0 2px, oklch(0.14 0.01 255) 2px 9px), linear-gradient(0deg, oklch(0.4 0.1 160 / 0.45), transparent)",
  "conic-gradient(from 210deg at 65% 40%, oklch(0.16 0.01 255), oklch(0.38 0.07 230), oklch(0.62 0.12 65 / 0.7), oklch(0.16 0.01 255) 70%)",
];

function Mixes() {
  const [open, setOpen] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);
  return (
    <section id="mixes" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead n="04" title="mixes" />
      <div className="grid gap-6 md:grid-cols-3">
        {MIX_ART.map((art, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            aria-haspopup="dialog"
            aria-label={`Mix 0${i + 1}: ${MIXES[i].title} details`}
            className="reveal lift group border border-border text-left transition-colors hover:border-steel"
          >
            <div className="grain aspect-[4/3] w-full overflow-hidden">
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105 group-focus-visible:scale-105" style={{ backgroundImage: art }} />
            </div>
            <div className="flex items-center justify-between p-5">
              <div>
                <span className="label">mix 0{i + 1}</span>
                <p className="mt-1 font-mono text-base lowercase text-silver">{MIXES[i].title}</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-amber/60 transition-colors group-hover:bg-amber" aria-hidden />
            </div>
          </button>
        ))}
      </div>
      <dialog
        ref={dlg}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        aria-labelledby="mix-title"
        className="mix-dialog m-auto w-[min(92vw,640px)] border border-border bg-card p-0 text-foreground backdrop:bg-background/80 backdrop:backdrop-blur-sm"
      >
        {open !== null && (
          <div>
            <div className="grain aspect-video w-full" style={{ backgroundImage: MIX_ART[open] }} />
            <div className="p-6">
              <p className="label">mix 0{open + 1}</p>
              <h3 id="mix-title" className="mt-1 font-mono text-xl lowercase text-silver">{MIXES[open].title}</h3>
              {MIXES[open].soundcloudUrl ? (
                <iframe title={`${MIXES[open].title} SoundCloud mix player`} src={soundcloudEmbed(MIXES[open].soundcloudUrl)} className="mt-5 w-full border-0" height={150} loading="lazy" allow="autoplay" />
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">This mix is recorded; streaming will be available here when the upload link is ready.</p>
              )}
              <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs lowercase tracking-widest">
                {MIXES[open].soundcloudUrl && <a href={MIXES[open].soundcloudUrl} target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-foreground hover:text-amber">soundcloud ↗</a>}
                {MIXES[open].bandcampUrl && <a href={MIXES[open].bandcampUrl} target="_blank" rel="noopener noreferrer" className="border border-amber px-4 py-2 text-amber">bandcamp ↗</a>}
                {MIXES[open].traxsourceUrl && <a href={MIXES[open].traxsourceUrl} target="_blank" rel="noopener noreferrer" className="border border-amber px-4 py-2 text-amber">traxsource ↗</a>}
                {!MIXES[open].soundcloudUrl && <span className="border border-dashed border-border px-4 py-2 text-muted-foreground">mix link — coming soon</span>}
                <button autoFocus onClick={() => setOpen(null)} className="btn-micro border border-amber px-4 py-2 text-amber hover:bg-amber hover:text-background">close</button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

const SOCIALS: { label: string; href: string | null }[] = [
  { label: "soundcloud", href: "https://soundcloud.com/mariowithad" },
  { label: "instagram", href: null },
  { label: "spotify", href: null },
  { label: "bandcamp", href: null },
];

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead n="05" title="contact" />
      <div className="grid gap-12 md:grid-cols-2">
        <div className="reveal">
          <p className="label mb-4">collaborations · bookings · sound</p>
          <p className="text-lg text-foreground">Open to collaborations, remixes and live sound work.</p>
          <span className="mt-6 inline-block border border-dashed border-border px-4 py-2 font-mono text-xs text-muted-foreground">
            email — coming soon
          </span>
        </div>
        <ul className="reveal divide-y divide-border border-y border-border">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              {s.href ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex justify-between py-4 font-mono text-sm lowercase text-foreground hover:text-amber">
                  {s.label}
                  <span className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
              ) : (
                <span className="flex justify-between py-4 font-mono text-sm lowercase text-muted-foreground">
                  {s.label}
                  <span className="label">soon</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <footer className="mt-28 flex justify-between border-t border-border pt-6 label">
        <span>© {new Date().getFullYear()} mariowithad</span>
        <a href="#home" className="hover:text-foreground">back to top ↑</a>
      </footer>
    </section>
  );
}

function Index() {
  useReveal();
  return (
    <>
      <a href="#releases" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:p-2">
        skip to releases
      </a>
      <Nav />
      <main>
        <Hero />
        <Releases />
        <About />
        <Mixes />
        <Contact />
      </main>
    </>
  );
}