import { FullSlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

export const Robots: QuartzEmitterPlugin = () => {
  return {
    name: "Robots",
    async *emit(ctx) {
      const cfg = ctx.cfg.configuration
      const base = cfg.baseUrl ?? "example.com"

      const robotsTxt = `# robots.txt for ${base}

User-agent: *
Allow: /

# Sitemaps
Sitemap: https://${base}/sitemap.xml

# Crawl-delay (optional, adjust if needed)
# Crawl-delay: 1

# Block access to specific directories (if needed)
# Disallow: /private/
`

      yield write({
        ctx,
        content: robotsTxt,
        slug: "robots" as FullSlug,
        ext: ".txt",
      })
    },
    async *partialEmit() {},
  }
}
