import { useEffect } from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import { Kontakt } from "@/pages/Kontakt"
import { Impressum, Datenschutz } from "@/pages/Legal"
import { CookieBanner } from "@/components/CookieBanner"

// ponytail: HashRouter frisst fragment-links (#leistungen wird als Route /leistungen
// interpretiert -> schwarzer Screen). Ein globaler Handler fängt reine In-Page-Anker
// ab und scrollt zum Element, statt den Router-Hash zu ändern.
function useAnchorScroll() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute("href")!.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: "smooth" })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])
}

export default function App() {
  useAnchorScroll()
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
      <CookieBanner />
    </HashRouter>
  )
}
