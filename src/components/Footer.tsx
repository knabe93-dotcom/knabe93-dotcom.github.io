import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t border-line bg-elevated/60">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-[clamp(1.1rem,4vw,2.2rem)] py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <img src="/assets/logo-kk.webp" alt="Kevin Knabe" className="h-9 w-auto" />
          <p className="mt-4 max-w-[40ch] text-ink-soft">
            Moderne, handgeschriebene Websites für Unternehmen aus der Region Karlsruhe.
            Erst die Website, dann die Bezahlung.
          </p>
          <Link to="/kontakt" className="mt-5 inline-block">
            <Button size="sm">Projekt anfragen →</Button>
          </Link>
        </div>
        <div>
          <p className="mb-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-light">Navigation</p>
          <nav className="flex flex-col gap-2.5 text-ink-soft">
            <a href="#leistungen" className="hover:text-accent">Leistungen</a>
            <a href="#projekte" className="hover:text-accent">Referenzen</a>
            <a href="#ablauf" className="hover:text-accent">Ablauf</a>
            <a href="#faq" className="hover:text-accent">FAQ</a>
            <Link to="/kontakt" className="hover:text-accent">Kontakt</Link>
          </nav>
        </div>
        <div>
          <p className="mb-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-light">Kontakt</p>
          <div className="flex flex-col gap-2.5 text-ink-soft">
            <a href="mailto:Knabe93@gmail.com" className="hover:text-accent">Knabe93@gmail.com</a>
            <span>76344 Karlsruhe</span>
            <a href="https://www.linkedin.com/in/kevin-knabe-2bb692262/" target="_blank" rel="noopener" className="hover:text-accent">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 border-t border-line px-[clamp(1.1rem,4vw,2.2rem)] py-6 font-mono text-[0.85rem] text-ink-soft">
        <span>© {new Date().getFullYear()} Kevin Knabe</span>
        <span className="flex gap-4">
          <Link to="/impressum" className="hover:text-accent">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-accent">Datenschutz</Link>
        </span>
      </div>
    </footer>
  )
}
