import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Yash Mittal",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "vercel",
    },
    locale: "en-US",
    baseUrl: "techsavvyash.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Caveat", // Handwritten-style font for headers
        body: "Merriweather", // Classic, readable serif font for notebook feel
        code: "Courier Prime", // Typewriter-style monospace font
      },
      colors: {
        lightMode: {
          light: "#fffef9", // Warm paper white
          lightgray: "#e8dcc8", // Soft beige for ruled lines
          gray: "#b8a894", // Muted brown-gray
          darkgray: "#5a4a3a", // Warm dark gray (ink color)
          dark: "#2c3e50", // Deep blue-black (like pen ink)
          secondary: "#e76f51", // Warm coral-orange (highlighter)
          tertiary: "#f4a261", // Soft orange (accent)
          highlight: "rgba(244, 162, 97, 0.15)", // Soft orange highlight
          textHighlight: "#fffacd88", // Yellow highlighter effect
        },
        darkMode: {
          light: "#1a1a1a", // Dark notebook cover
          lightgray: "#3a3a3a", // Dark ruled lines
          gray: "#6a6a6a", // Medium gray
          darkgray: "#d4c5b0", // Cream text
          dark: "#f5f5dc", // Beige text (like cream paper)
          secondary: "#e76f51", // Keep warm coral
          tertiary: "#f4a261", // Keep soft orange
          highlight: "rgba(244, 162, 97, 0.15)",
          textHighlight: "#fffacd44", // Dimmed highlighter for dark mode
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
