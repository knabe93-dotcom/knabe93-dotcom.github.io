import { useEffect, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

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
    <div className="relative z-10 mx-auto max-w-[640px] px-[clamp(1.1rem,4vw,2.2rem)] py-16">
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
        Schreib mir kurz, worum es geht – ich melde mich innerhalb von 24 Stunden. Du zahlst
        erst, wenn dir dein fertiges Muster gefällt.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
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
  )
}
