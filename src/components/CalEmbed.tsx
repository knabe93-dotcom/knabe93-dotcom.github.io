import { useEffect } from "react"

// ponytail: Cal.com Inline-Embed über den offiziellen Vanilla-Loader – keine
// npm-Abhängigkeit, kein Version-Lock. Cal.com erzeugt den Zoom-Link und
// verschickt die Buchungs-Mail selbst; hier wird nur der Kalender gerendert.
export function CalEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    const w = window as unknown as { Cal?: (...args: unknown[]) => void }
    if (!w.Cal) {
      // Offizieller Cal.com Loader (queued Stub, bis embed.js geladen ist)
      ;((C: Record<string, unknown>, A: string, L: string) => {
        const p = (a: { q: unknown[] }, ar: unknown) => a.q.push(ar)
        const d = C.document as Document
        const cal = function (...args: unknown[]) {
          const self = cal as unknown as { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] }
          if (!self.loaded) {
            self.ns = {}
            self.q = self.q || []
            d.head.appendChild(d.createElement("script")).setAttribute("src", A)
            self.loaded = true
          }
          if (args[0] === L) {
            const api = function (...a: unknown[]) {
              p(api as unknown as { q: unknown[] }, a)
            }
            ;(api as unknown as { q: unknown[] }).q = []
            const namespace = args[1]
            if (typeof namespace === "string") {
              self.ns![namespace] = self.ns![namespace] || api
              p(self.ns![namespace] as { q: unknown[] }, args)
              p(self as unknown as { q: unknown[] }, ["initNamespace", namespace])
            } else p(self as unknown as { q: unknown[] }, args)
            return
          }
          p(self as unknown as { q: unknown[] }, args)
        }
        C.Cal = cal
      })(w as unknown as Record<string, unknown>, "https://app.cal.com/embed/embed.js", "init")
    }
    const Cal = (window as unknown as { Cal: (...a: unknown[]) => void }).Cal
    Cal("init", { origin: "https://cal.com" })
    Cal("inline", {
      elementOrSelector: "#cal-inline",
      calLink,
      config: { theme: "dark", layout: "month_view" },
    })
    Cal("ui", {
      theme: "dark",
      hideEventTypeDetails: false,
      cssVarsPerTheme: { dark: { "cal-brand": "#4d6bff" } },
    })
  }, [calLink])

  return <div id="cal-inline" className="min-h-[560px] w-full overflow-hidden rounded-2xl" />
}
