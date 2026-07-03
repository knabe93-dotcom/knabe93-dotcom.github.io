import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/Magnetic"

const links = [
  ["#leistungen", "Leistungen"],
  ["#projekte", "Referenzen"],
  ["#ablauf", "Ablauf"],
  ["#faq", "FAQ"],
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-[clamp(1.1rem,4vw,2.2rem)]">
        <a href="#hero" aria-label="Startseite">
          <img src="/assets/logo-kk.webp" alt="Kevin Knabe" className="h-9 w-auto" />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="text-[0.95rem] text-ink-soft transition-colors hover:text-ink">
              {label}
            </a>
          ))}
          <Link to="/kontakt" className="text-[0.95rem] text-ink-soft transition-colors hover:text-ink">
            Kontakt
          </Link>
        </nav>
        <Magnetic>
          <Link to="/kontakt">
            <Button size="sm">Projekt anfragen</Button>
          </Link>
        </Magnetic>
      </div>
    </header>
  )
}
