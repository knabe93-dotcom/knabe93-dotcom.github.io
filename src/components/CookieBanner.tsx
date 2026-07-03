import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

const KEY = "kk-cookie-ack"

// ponytail: reiner Info-Hinweis, kein Consent-Manager – die Seite setzt nur
// technisch notwendige Speicherung (kein Tracking/Marketing), also gibt es
// nichts zu opt-in-gaten. Kommt Analytics dazu, muss hier echtes Opt-in rein.
export function CookieBanner() {
  const [open, setOpen] = useState(() => {
    try {
      return !localStorage.getItem(KEY)
    } catch {
      return false
    }
  })

  function dismiss() {
    try {
      localStorage.setItem(KEY, "1")
    } catch {
      /* private mode: dann eben pro Sitzung */
    }
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Hinweis zu Cookies"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[540px] rounded-2xl border border-line-strong bg-elevated/95 p-5 shadow-2xl ring-1 ring-white/5 backdrop-blur-md sm:inset-x-auto sm:bottom-5 sm:right-5"
        >
          <p className="font-display text-base font-semibold">Nur das Nötigste</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            Diese Website verwendet ausschließlich technisch notwendige Speicherung –
            kein Tracking und keine Marketing-Cookies. Mehr dazu im{" "}
            <Link to="/datenschutz" className="text-gold-light underline underline-offset-2 hover:text-gold">
              Datenschutz
            </Link>
            .
          </p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={dismiss}
              className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-light"
            >
              Verstanden
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
