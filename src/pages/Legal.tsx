import type { ReactNode } from "react"
import { Link } from "react-router-dom"

function Layout({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[780px] px-[clamp(1.1rem,4vw,2.2rem)] py-16">
      <Link to="/" className="font-mono text-sm text-accent-light hover:text-accent">← Zurück zur Startseite</Link>
      <h1 className="mt-6 font-display text-4xl font-bold">{heading}</h1>
      <div className="mt-8 space-y-6 [&_a]:text-accent-light [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_p]:text-ink-soft">
        {children}
      </div>
    </div>
  )
}

export function Impressum() {
  return (
    <Layout heading="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>Kevin Knabe<br />Hauptstraße 72<br />76344 Karlsruhe<br />Deutschland</p>
      <h2>Kontakt</h2>
      <p>E-Mail: <a href="mailto:Knabe93@gmail.com">Knabe93@gmail.com</a></p>
      <h2>Verantwortlich nach § 18 Abs. 2 MStV</h2>
      <p>Kevin Knabe, Anschrift wie oben.</p>
      <h2>Haftung für Inhalte & Links</h2>
      <p>Für eigene Inhalte bin ich nach den allgemeinen Gesetzen verantwortlich. Für Inhalte externer, verlinkter Seiten ist stets deren Betreiber verantwortlich.</p>
    </Layout>
  )
}

export function Datenschutz() {
  return (
    <Layout heading="Datenschutzerklärung">
      <p className="font-mono text-xs">Vorlage – bitte vor dem Live-Marketing rechtlich prüfen lassen.</p>
      <h2>1. Verantwortlicher</h2>
      <p>Kevin Knabe, Hauptstraße 72, 76344 Karlsruhe. E-Mail: <a href="mailto:Knabe93@gmail.com">Knabe93@gmail.com</a></p>
      <h2>2. Hosting</h2>
      <p>Diese Website wird bei einem externen Anbieter gehostet. Beim Aufruf werden technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt) in Server-Logfiles verarbeitet (Art. 6 Abs. 1 lit. f DSGVO).</p>
      <h2>3. Cookies</h2>
      <p>Diese Seite setzt keine eigenen Cookies und nutzt kein Tracking.</p>
      <h2>4. Kontaktaufnahme</h2>
      <p>Bei einer E-Mail werden deine Angaben zur Bearbeitung der Anfrage gespeichert (Art. 6 Abs. 1 lit. b DSGVO).</p>
      <h2>5. Deine Rechte</h2>
      <p>Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch nach Art. 15–21 DSGVO sowie ein Beschwerderecht bei der Aufsichtsbehörde.</p>
    </Layout>
  )
}
