import { useEffect, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CalEmbed } from "@/components/CalEmbed"

// Cal.com-Buchungslink (EU-Instanz: https://cal.eu/kevin-k/30min)
const CAL_LINK = "kevin-k/30min"

// ponytail: mailto-Form – null Backend, öffnet das Mailprogramm des Besuchers.
// Upgrade-Pfad, wenn Anfragen serverseitig ankommen sollen (ohne Mailclient):
// onSubmit gegen einen Form-Dienst wie Web3Forms/Formspree tauschen (Access-Key).
export function Kontakt() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const input =
    "w-full rounded-xl border border-line bg-surface/70 px-4 py-3 text-ink outline-none transition-colors focus:border-accent"

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get("name") || "")
    const email = String(f.get("email") || "")
    const msg = String(f.get("message") || "")
    const body = `Name: ${name}\nE-Mail: ${email}\n\n${msg}`
    window.location.href = `mailto:Knabe93@gmail.com?subject=${encodeURIComponent(
      "Anfrage über die Website",
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="relative z-10 mx-auto max-w-[1000px] px-[clamp(1.1rem,4vw,2.2rem)] py-16">
      <div className="max-w-[640px]">
        <Link to="/" className="font-mono text-sm text-accent-light hover:text-accent">
          ← Zurück zur Startseite
        </Link>
        <img
          src="/assets/projekte/kevin.jpg"
          alt="Kevin Knabe"
          className="mt-8 h-24 w-24 rounded-full object-cover shadow-2xl ring-1 ring-line-strong"
        />
        <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">
          Projekt anfragen
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Buch dir direkt ein kostenloses <strong className="text-ink">30-Minuten-Gespräch über Zoom</strong> –
          wähl einfach Tag und Uhrzeit. Du bekommst den Zoom-Link automatisch per E-Mail. Lieber schreiben?
          Nutz das Formular weiter unten.
        </p>
      </div>

      <div className="mt-10">
        <span className="font-mono text-[0.78rem] uppercase tracking-wide text-gold-light">
          Termin buchen
        </span>
        <div className="mt-3">
          <CalEmbed calLink={CAL_LINK} />
        </div>
      </div>

      <div className="max-w-[640px]">
      <div className="my-12 flex items-center gap-4 text-ink-soft">
        <span className="h-px flex-1 bg-line" />
        <span className="font-mono text-sm">oder schreib mir</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.78rem] uppercase tracking-wide text-ink-soft">Name</span>
          <input name="name" required autoComplete="name" className={input} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.78rem] uppercase tracking-wide text-ink-soft">E-Mail</span>
          <input name="email" type="email" required autoComplete="email" className={input} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[0.78rem] uppercase tracking-wide text-ink-soft">Nachricht</span>
          <textarea name="message" required rows={6} className={input} />
        </label>
        <Button type="submit" size="lg" className="mt-2 self-start">
          Anfrage senden
        </Button>
      </form>

      <p className="mt-8 font-mono text-sm text-ink-soft">
        Oder direkt:{" "}
        <a href="mailto:Knabe93@gmail.com" className="text-accent-light hover:text-accent">
          Knabe93@gmail.com
        </a>{" "}
        · 76344 Karlsruhe
      </p>
      </div>
    </div>
  )
}
