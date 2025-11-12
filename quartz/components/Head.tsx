import { i18n } from "../i18n"
import { FullSlug, getFileExtension, joinSegments, pathToRoot } from "../util/path"
import { CSSResourceToStyleElement, JSResourceToScriptElement } from "../util/resources"
import { googleFontHref, googleFontSubsetHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { unescapeHTML } from "../util/escape"
import { CustomOgImagesEmitterName } from "../plugins/emitters/ogImage"
export default (() => {
  const Head: QuartzComponent = ({
    cfg,
    fileData,
    externalResources,
    ctx,
  }: QuartzComponentProps) => {
    const titleSuffix = cfg.pageTitleSuffix ?? ""
    const title =
      (fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title) + titleSuffix
    const description =
      fileData.frontmatter?.socialDescription ??
      fileData.frontmatter?.description ??
      unescapeHTML(fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description)

    const { css, js, additionalHead } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)
    const iconPath = joinSegments(baseDir, "static/icon.png")

    // Url of current page
    const socialUrl =
      fileData.slug === "404" ? url.toString() : joinSegments(url.toString(), fileData.slug!)

    const usesCustomOgImage = ctx.cfg.plugins.emitters.some(
      (e) => e.name === CustomOgImagesEmitterName,
    )
    const ogImageDefaultPath = `https://${cfg.baseUrl}/static/og-image.png`

    // Keywords support
    const keywords = fileData.frontmatter?.keywords
      ? Array.isArray(fileData.frontmatter.keywords)
        ? fileData.frontmatter.keywords.join(", ")
        : fileData.frontmatter.keywords
      : undefined

    // JSON-LD Structured Data
    const generateJsonLd = () => {
      const schemas: any[] = []

      // Website Schema
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: cfg.pageTitle,
        url: `https://${cfg.baseUrl}`,
        description: description,
      })

      // Person Schema (for homepage/about)
      if (fileData.slug === "index" || fileData.slug === "about") {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Person",
          name: cfg.pageTitle,
          url: `https://${cfg.baseUrl}`,
          description: description,
        })
      }

      // Article Schema (for content pages)
      if (fileData.slug !== "index" && fileData.slug !== "404") {
        const articleSchema: any = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: description,
          url: socialUrl,
          author: {
            "@type": "Person",
            name: cfg.pageTitle,
          },
        }

        if (fileData.dates?.created) {
          articleSchema.datePublished = new Date(fileData.dates.created).toISOString()
        }
        if (fileData.dates?.modified) {
          articleSchema.dateModified = new Date(fileData.dates.modified).toISOString()
        }

        schemas.push(articleSchema)
      }

      // BreadcrumbList Schema
      if (fileData.slug && fileData.slug !== "index" && fileData.slug !== "404") {
        const pathSegments = fileData.slug.split("/").filter(Boolean)
        const breadcrumbItems = [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `https://${cfg.baseUrl}`,
          },
        ]

        let currentPath = ""
        pathSegments.forEach((segment, index) => {
          currentPath += `/${segment}`
          breadcrumbItems.push({
            "@type": "ListItem",
            position: index + 2,
            name: segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            item: `https://${cfg.baseUrl}${currentPath}`,
          })
        })

        if (breadcrumbItems.length > 1) {
          schemas.push({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems,
          })
        }
      }

      return schemas
    }

    const jsonLdSchemas = generateJsonLd()

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
            {cfg.theme.typography.title && (
              <link rel="stylesheet" href={googleFontSubsetHref(cfg.theme, cfg.pageTitle)} />
            )}
          </>
        )}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="og:site_name" content={cfg.pageTitle}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image:alt" content={description} />

        {!usesCustomOgImage && (
          <>
            <meta property="og:image" content={ogImageDefaultPath} />
            <meta property="og:image:url" content={ogImageDefaultPath} />
            <meta name="twitter:image" content={ogImageDefaultPath} />
            <meta
              property="og:image:type"
              content={`image/${getFileExtension(ogImageDefaultPath) ?? "png"}`}
            />
          </>
        )}

        {cfg.baseUrl && (
          <>
            <meta property="twitter:domain" content={cfg.baseUrl}></meta>
            <meta property="og:url" content={socialUrl}></meta>
            <meta property="twitter:url" content={socialUrl}></meta>
          </>
        )}

        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />
        {keywords && <meta name="keywords" content={keywords} />}

        {/* JSON-LD Structured Data */}
        {jsonLdSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {css.map((resource) => CSSResourceToStyleElement(resource, true))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
        {additionalHead.map((resource) => {
          if (typeof resource === "function") {
            return resource(fileData)
          } else {
            return resource
          }
        })}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
