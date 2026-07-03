import { lazy, Suspense, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { Intro } from "@/components/Intro"

const Scene3D = lazy(() => import("@/three/Scene3D"))
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Section } from "@/components/Section"
import { Reveal } from "@/components/Reveal"
import { Eyebrow } from "@/components/Eyebrow"
import { Magnetic } from "@/components/Magnetic"
import { Button } from "@/components/ui/button"

const card = "rounded-2xl border border-line bg-surface/80 p-7 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:border-accent/60"
const title = "font-display font-bold tracking-tight text-[clamp(1.9rem,4vw,2.8rem)]"
const lead = "mx-auto max-w-[640px] text-lg text-ink-soft"

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  // ponytail: sanfte Parallax + Lift/Fade beim Scrollen, rein mit framer-motion (kein GSAP).
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 55])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -55])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section ref={ref} id="hero" className="relative flex min-h-[92vh] items-end overflow-hidden pb-[clamp(2.5rem,7vh,5rem)]">
      <motion.video
        style={{ y: bgY }}
        className="absolute -top-[8%] left-0 z-0 h-[116%] w-full object-cover opacity-45"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        src="/assets/projekte/backround.mp4"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-background via-background/65 to-background/25" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-1/3 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 mx-auto w-full max-w-[1120px] px-[clamp(1.1rem,4vw,2.2rem)]">
        <div className="max-w-[900px]">
          <h1 className="font-display text-[clamp(2.8rem,7vw,5rem)] font-bold leading-[1.03] tracking-tight">
            <em className="italic text-gold-light">Verkaufsstarke Websites</em>{" "}
            <span className="block text-ink">für Unternehmen von heute.</span>
          </h1>
          <p className="mt-6 max-w-[600px] text-xl text-ink-soft">
            Moderne, schnelle Websites für Unternehmen aus der Region Karlsruhe – du zahlst erst,
            wenn deine Seite fertig ist und dir gefällt.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Magnetic>
              <Link
                to="/kontakt"
                className="group inline-flex items-center gap-3 rounded-full bg-accent py-1.5 pl-6 pr-1.5 font-medium text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-light"
              >
                Los geht’s
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-lg text-accent transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </Magnetic>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[
                  { ini: "K", cls: "bg-gradient-to-br from-accent to-accent-light text-white" },
                  { ini: "S", cls: "bg-gradient-to-br from-gold to-gold-light text-background" },
                  { ini: "M", cls: "bg-gradient-to-br from-accent-light to-accent text-white" },
                ].map((a) => (
                  <span key={a.ini} className={`grid h-10 w-10 place-items-center rounded-full border-2 border-background font-mono text-sm font-semibold ${a.cls}`}>
                    {a.ini}
                  </span>
                ))}
              </div>
              <div className="leading-tight">
                <div className="font-display text-lg font-semibold text-ink">50+</div>
                <div className="text-sm text-ink-soft">Zufriedene Kunden</div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {[["30", "Umgesetzte Projekte"], ["100%", "Kundenzufriedenheit"]].map(([num, label], i) => (
              <div key={num} className="relative w-[190px] rounded-2xl border border-line bg-surface/40 p-5 backdrop-blur-md">
                <span className="absolute right-4 top-4 text-lg text-accent-light">✳</span>
                <div className="font-display text-[2.6rem] font-bold leading-none">{num}</div>
                <div className="mt-3 font-mono text-[0.68rem] uppercase tracking-wider text-accent-light/70">no.{i + 1}</div>
                <div className="text-sm text-ink-soft">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

const marqueeWords = ["Webdesign", "Website-Relaunch", "E-Commerce", "SEO-Grundlagen", "Mobil-optimiert", "Erst die Website, dann die Bezahlung"]
function Marquee() {
  const row = [...marqueeWords, ...marqueeWords]
  return (
    <div className="overflow-hidden border-y border-line bg-elevated/60 py-4">
      <div className="animate-marquee flex w-max items-center gap-6 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="font-display text-lg italic text-ink">
            {w} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Statement() {
  const em = "font-display font-semibold not-italic text-ink"
  return (
    <Section>
      <Reveal>
        <p className="mx-auto max-w-[900px] text-center font-sans text-[clamp(1.5rem,3.4vw,2.4rem)] font-light leading-[1.35] text-ink-soft">
          Ich verbinde <em className={em}>durchdachtes Design</em>, <em className={em}>sauberen Code</em> und{" "}
          <em className="font-display italic text-accent-light">ehrliche Beratung</em> – für Unternehmen aus der Region
          Karlsruhe, die online endlich modern auftreten wollen. Gebaut mit <em className={em}>Sorgfalt</em> und Blick
          fürs Detail.
        </p>
      </Reveal>
    </Section>
  )
}

const problems = [
  {
    h: "Nicht mobilfreundlich",
    p: "Auf dem Handy muss man zoomen und schieben. Genau dort sind aber die meisten Kunden.",
    icon: (
      <>
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    h: "Zu langsam",
    p: "Jede Sekunde Ladezeit kostet Besucher. Alte Seiten brauchen oft ein Vielfaches.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    h: "Bei Google unsichtbar",
    p: "Ohne moderne Grundlagen taucht deine Seite in der Suche kaum auf.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
]
function Problem() {
  return (
    <Section alt>
      <Reveal><Eyebrow center>Das Problem</Eyebrow></Reveal>
      <Reveal><h2 className={`${title} mt-4 text-center`}>Eine veraltete Website kostet dich Kunden</h2></Reveal>
      <Reveal><p className={`${lead} mt-4 text-center`}>Über die Hälfte aller Besucher kommt vom Smartphone. Ist deine Seite langsam oder von gestern, sind sie weg, bevor sie dein Angebot gesehen haben.</p></Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal key={p.h} delay={i * 0.1} className={card}>
            <div className="relative grid h-14 w-14 place-items-center">
              <span className="absolute inset-0 rounded-full border border-accent/40" />
              <span className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
              <svg {...svgProps} className="relative h-6 w-6 text-accent-light">{p.icon}</svg>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{p.h}</h3>
            <p className="mt-2 text-ink-soft">{p.p}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

const stats = [
  ["Mehr Conversion", "+7 %", "mehr Conversion bei schnellerer Ladezeit"],
  ["Weniger Absprünge", "53 %", "verlassen die Website nach 3 s"],
  ["Mobile Aufrufe", "60 %+", "des Traffics kommen über das Handy"],
]
const bars = [32, 46, 38, 56, 50, 66, 60, 82, 74, 96]
function Stats() {
  return (
    <Section>
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <Reveal><Eyebrow>Zahlen</Eyebrow></Reveal>
          <Reveal><h2 className={`${title} mt-4`}>Was eine moderne Website bringt</h2></Reveal>
        </div>
        <Reveal><p className="text-lg text-ink-soft">Eine schnelle, moderne Seite ist kein Kostenfaktor – sie bringt messbar mehr Conversion, Sichtbarkeit und Anfragen.</p></Reveal>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {stats.map(([label, num, sub]) => (
          <Reveal key={label} className={card}>
            <span className="font-mono text-[0.74rem] uppercase tracking-[0.12em] text-ink-soft">{label}</span>
            <div className="mt-1 font-display text-[clamp(2.5rem,6vw,3.4rem)] font-bold leading-none">{num}</div>
            <p className="mt-1 text-ink-soft">{sub}</p>
            <div className="mt-5 flex h-16 items-end gap-1.5">
              {bars.map((h, i) => (
                <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-accent/25 to-accent" style={{ height: `${h}%` }} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center font-mono text-xs text-ink-soft">Allgemeine Branchenwerte (u. a. Google) – keine garantierten Einzelergebnisse.</p>
    </Section>
  )
}

const services = [
  {
    h: "Website-Relaunch",
    p: "Aus deinem alten Auftritt wird eine moderne, schnelle Seite – mobilfreundlich und bei Google auffindbar.",
    icon: (
      <>
        <path d="M21 12a9 9 0 1 1-2.64-6.36" />
        <path d="M21 3v6h-6" />
      </>
    ),
  },
  {
    h: "Neue Website",
    p: "Noch keine Seite? Ich baue von Grund auf eine, die zu deinem Betrieb passt – inklusive Kontakt & Anfahrt.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M7.5 6.5h.01M10.5 6.5h.01" />
      </>
    ),
  },
  {
    h: "Wartung & Pflege",
    p: "Updates, Änderungen und technische Betreuung, damit deine Seite sicher und aktuell bleibt.",
    icon: (
      <>
        <path d="M12 8.5V4M12 20v-3.5" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M18.9 9.2 15.8 11M8.2 13l-3.1 1.8M5.1 9.2 8.2 11M15.8 13l3.1 1.8" />
      </>
    ),
  },
]
function Services() {
  return (
    <Section id="leistungen" alt>
      <Reveal><Eyebrow>Leistungen</Eyebrow></Reveal>
      <Reveal><h2 className={`${title} mt-4`}>Was ich für dich mache</h2></Reveal>
      <Reveal><span className="mt-4 block h-px w-24 bg-gradient-to-r from-gold to-transparent" /></Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal
            key={s.h}
            delay={i * 0.1}
            className={`relative flex flex-col overflow-hidden rounded-2xl border bg-surface/70 p-7 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-accent ${i === 1 ? "border-accent/60 ring-1 ring-accent/40" : "border-line hover:border-accent/60"}`}
          >
            <div className="relative grid h-16 w-16 place-items-center">
              <span className="absolute inset-0 rounded-full border border-accent/40" />
              <span className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
              <svg {...svgProps} className="relative h-7 w-7 text-accent-light">{s.icon}</svg>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{s.h}</h3>
            <p className="mt-2 flex-1 text-ink-soft">{s.p}</p>
            <Link to="/kontakt" className="mt-5 inline-flex w-fit items-center gap-1.5 font-mono text-sm text-gold-light transition-colors hover:text-gold">
              mehr erfahren <span aria-hidden>→</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Compare() {
  return (
    <Section id="referenzen">
      <Reveal><Eyebrow center>Vorher / Nachher</Eyebrow></Reveal>
      <Reveal><h2 className={`${title} mt-4 text-center`}>Von Grund auf professionell gecodet</h2></Reveal>
      <Reveal><p className={`${lead} mt-4 text-center`}>Kein Baukasten, kein Template von der Stange – jede Website schreibe ich von Hand. So sieht der Unterschied aus:</p></Reveal>
      <Reveal className="relative mx-auto mt-12 max-w-[1000px]">
        <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-r from-accent/25 via-transparent to-gold/20 blur-3xl" />
        <div className="group overflow-hidden rounded-2xl border border-line-strong shadow-2xl ring-1 ring-white/5">
          <img
            src="/assets/projekte/vorhernachher.webp"
            alt="Vorher/Nachher-Vergleich: von Skizze &amp; Code zur fertigen Website"
            loading="lazy"
            className="block w-full transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </Reveal>
    </Section>
  )
}

const projects = [
  ["ref-velocraft.webp", "Velocraft Bikes – E-Commerce-Website für eine Fahrradmarke"],
  ["ref-lindner.webp", "Dr. Lindner & Partner – Website für eine Kanzlei"],
  ["ref-aura.webp", "Aura Cosmetics – Beauty- & Wellness-Website"],
  ["ref-montague.webp", "The Montague Suites – Website für ein Hotel"],
]
function Projects() {
  return (
    <Section id="projekte" alt>
      <Reveal><Eyebrow center>Referenzen</Eyebrow></Reveal>
      <Reveal><h2 className={`${title} mt-4 text-center`}>Branchen, für die ich Websites baue</h2></Reveal>
      <div className="mx-auto mt-12 grid max-w-[980px] gap-6 sm:grid-cols-2">
        {projects.map(([img, alt], i) => (
          <Reveal key={img} delay={i * 0.08} className="group overflow-hidden rounded-2xl border border-line shadow-xl transition-colors hover:border-accent/60">
            <img src={`/assets/projekte/${img}`} alt={alt} loading="lazy" className="block w-full transition-transform duration-500 group-hover:scale-[1.03]" />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

const avatarIcon = (
  <>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </>
)
function Testimonials() {
  return (
    <Section alt>
      <Reveal><Eyebrow>Kundenstimmen</Eyebrow></Reveal>
      <Reveal><h2 className={`${title} mt-4`}>Was Kunden sagen</h2></Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Reveal className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-accent/30 bg-surface/70 p-8 shadow-2xl ring-1 ring-accent/15 backdrop-blur-sm">
          <div>
            <div className="tracking-[4px] text-gold-light">★★★★★</div>
            <p className="mt-5 font-display text-[clamp(1.4rem,2.6vw,2rem)] italic leading-snug text-ink">
              „Hier erscheint bald eine echte Kundenstimme – ausführlich, ehrlich und mit dem Namen der Person und ihres Betriebs."
            </p>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent-light">
              <svg {...svgProps} className="h-6 w-6">{avatarIcon}</svg>
            </span>
            <span className="leading-tight">
              <strong className="block text-ink">Name folgt</strong>
              <span className="text-sm text-ink-soft">Rolle · Firma</span>
            </span>
          </div>
        </Reveal>
        <div className="flex flex-col gap-6">
          {[0, 1].map((i) => (
            <Reveal key={i} delay={0.08 * (i + 1)} className="flex flex-1 flex-col justify-between rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur-sm">
              <div>
                <div className="tracking-[3px] text-gold-light">★★★★★</div>
                <p className="mt-3 text-ink">„Bald steht hier eine echte, kurze Kundenstimme."</p>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent-light">
                  <svg {...svgProps} className="h-5 w-5">{avatarIcon}</svg>
                </span>
                <span className="text-sm leading-tight">
                  <strong className="block text-ink">Name folgt</strong>
                  <span className="text-ink-soft">Rolle · Firma</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <p className="mt-6 font-mono text-xs text-ink-soft">Platzhalter – echte Kundenstimmen folgen.</p>
    </Section>
  )
}

const standards = ["Mobil-optimiert", "Schnelle Ladezeit", "DSGVO-konform", "SEO-Grundlagen", "Barrierearm", "Kontaktformular", "SSL-Verschlüsselung", "Sauberer Code"]
function Standards() {
  return (
    <Section>
      <Reveal><Eyebrow center>Standards</Eyebrow></Reveal>
      <Reveal><h2 className={`${title} mt-4 text-center`}>In jeder Website inklusive</h2></Reveal>
      <ul className="mx-auto mt-12 grid max-w-[880px] grid-cols-2 gap-3 md:grid-cols-4">
        {standards.map((s, i) => (
          <Reveal key={s} delay={i * 0.05}>
            <li className="flex items-center gap-2.5 rounded-xl border border-line bg-surface/70 px-4 py-4 font-medium transition-colors hover:border-accent/60">
              <svg {...svgProps} className="h-4 w-4 shrink-0 text-accent-light"><path d="M20 6 9 17l-5-5" /></svg>
              {s}
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const
const steps = [
  {
    n: "01",
    h: "Kostenloses Erstgespräch",
    p: "Wir klären unverbindlich, was du brauchst und was deine Website leisten soll.",
    icon: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />,
  },
  {
    n: "02",
    h: "Konzept & Muster",
    p: "Du bekommst zuerst ein kostenloses Muster deiner Website. Erst wenn es dir gefällt, bezahlst du dafür – keine Vorkasse.",
    icon: (
      <>
        <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
        <path d="m15 5 4 4" />
      </>
    ),
  },
  {
    n: "03",
    h: "Ich baue deine Seite",
    p: "Du lehnst dich zurück und bekommst regelmäßig Zwischenstände zu sehen.",
    icon: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
  {
    n: "04",
    h: "Live-Gang & Übergabe",
    p: "Deine Website geht online. Auf Wunsch kümmere ich mich auch danach um die Pflege.",
    icon: (
      <>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </>
    ),
  },
]
function Process() {
  return (
    <Section id="ablauf" alt>
      <Reveal><Eyebrow center>Ablauf</Eyebrow></Reveal>
      <Reveal><h2 className={`${title} mt-4 text-center`}>In 4 Schritten zur neuen Website</h2></Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08} className="relative">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:border-accent/60">
              {/* Radial-Glow + verblasster Konzentrik-Ring wie im Referenz-Layout */}
              <span aria-hidden className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full bg-accent/15 blur-2xl" />
              <span aria-hidden className="pointer-events-none absolute -left-4 top-10 h-28 w-28 rounded-full border border-accent/10" />
              {/* Große verblasste Schrittnummer */}
              <span aria-hidden className="pointer-events-none absolute -bottom-2 right-3 font-display text-[5rem] font-bold leading-none text-accent/[0.07]">{s.n}</span>

              <span className="relative w-fit rounded-full bg-accent px-2.5 py-0.5 font-mono text-xs font-semibold text-white shadow-lg shadow-accent/30">{s.n}</span>

              <div className="relative mt-6 grid h-16 w-16 place-items-center">
                <span className="absolute inset-0 rounded-full border border-accent/40" />
                <span className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
                <svg {...svgProps} className="relative h-7 w-7 text-accent-light">{s.icon}</svg>
              </div>

              <h3 className="relative mt-5 font-display text-lg font-semibold">{s.h}</h3>
              <p className="relative mt-1.5 text-sm text-ink-soft">{s.p}</p>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden className="absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 translate-x-full border-t border-dashed border-accent/50 md:block" />
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Guarantee() {
  return (
    <Section>
      <Reveal className="mx-auto max-w-[680px] rounded-2xl border border-accent bg-gradient-to-b from-surface to-elevated p-[clamp(2rem,5vw,3rem)] text-center shadow-2xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-2xl font-bold text-white">✓</div>
        <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.1rem)] font-bold">Erst die Website, dann die Bezahlung</h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-ink-soft">Du gehst mit keinem Cent in Vorleistung. Wir bauen deine Website, du siehst das Ergebnis – und bezahlt wird erst, wenn du wirklich zufrieden bist.</p>
        <Link to="/kontakt" className="mt-6 inline-block"><Button size="lg">Unverbindlich anfragen</Button></Link>
      </Reveal>
    </Section>
  )
}

const faqs = [
  ["Was kostet eine Website?", "Das hängt vom Umfang ab. Nach dem kostenlosen Erstgespräch bekommst du einen klaren Festpreis – ohne versteckte Kosten."],
  ["Wie lange dauert es?", "Eine typische Unternehmensseite ist meist in wenigen Wochen fertig – je nachdem, wie schnell Texte und Bilder vorliegen."],
  ["Brauche ich technisches Wissen?", "Nein. Ich kümmere mich um die Technik und erkläre dir alles verständlich."],
  ["Kümmerst du dich um Pflege?", "Auf Wunsch ja. Ich biete laufende Wartung an, damit deine Seite sicher und aktuell bleibt."],
  ["Ist die Seite DSGVO-konform?", "Ja. Datenschutz und ein rechtskonformes Impressum gehören für mich zu jeder geschäftlichen Website dazu."],
]
function Faq() {
  return (
    <Section id="faq" alt>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
          <Reveal><h2 className={`${title} mt-4`}>Häufige Fragen</h2></Reveal>
          <Reveal><p className="mt-4 max-w-[38ch] text-ink-soft">Noch etwas offen? Ich beantworte deine Fragen gern persönlich – unverbindlich.</p></Reveal>
          <Reveal>
            <Link to="/kontakt" className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-gold-light transition-colors hover:text-gold">
              Frag mich direkt <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
        <div>
          {faqs.map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.06}>
              <details className="group mb-3 rounded-xl border border-line bg-surface/70 px-5 transition-colors hover:border-accent/50 open:border-accent/60 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between gap-4 py-4 font-display text-lg font-semibold marker:content-none">
                  {q}
                  <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-lg text-accent-light transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 text-ink-soft">{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

function ClosingCta() {
  return (
    <section className="relative flex min-h-[68vh] items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-35"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        src="/assets/projekte/backround.mp4"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/85 via-background/70 to-background" aria-hidden="true" />
      <Reveal className="relative z-10 mx-auto max-w-[820px] px-[clamp(1.1rem,4vw,2.2rem)] text-center">
        <h2 className="font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-bold leading-[1.08] tracking-tight">
          Bereit für einen Auftritt, der Kunden <em className="italic text-gold-light">gewinnt</em>?
        </h2>
        <div className="mt-8 flex justify-center">
          <Magnetic>
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-3 rounded-full bg-accent py-2 pl-7 pr-2 text-lg font-medium text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-light"
            >
              Projekt anfragen
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-lg text-accent transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </Magnetic>
        </div>
        <p className="mt-6 font-mono text-sm text-ink-soft">Antwort innerhalb von 24 Stunden · Du zahlst erst bei Zufriedenheit</p>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Suspense fallback={null}><Scene3D /></Suspense>
      <Intro />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <Problem />
        <Stats />
        <Services />
        <Compare />
        <Projects />
        <Testimonials />
        <Standards />
        <Process />
        <Guarantee />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  )
}
