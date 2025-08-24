// ../../node_modules/.pnpm/@shikijs+compat@2.5.0/node_modules/@shikijs/compat/dist/index.mjs
import fs from "node:fs";
import fsp from "node:fs/promises";

// ../../node_modules/.pnpm/@shikijs+types@2.5.0/node_modules/@shikijs/types/dist/index.mjs
var ShikiError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
};

// ../../node_modules/.pnpm/@shikijs+transformers@2.5.0/node_modules/@shikijs/transformers/dist/index.mjs
function transformerCompactLineOptions(lineOptions = []) {
  return {
    name: "@shikijs/transformers:compact-line-options",
    line(node, line) {
      const lineOption = lineOptions.find((o) => o.line === line);
      if (lineOption?.classes)
        this.addClassToHast(node, lineOption.classes);
      return node;
    }
  };
}
var symbol = Symbol("highlighted-lines");

// ../../node_modules/.pnpm/@shikijs+compat@2.5.0/node_modules/@shikijs/compat/dist/index.mjs
import { bundledLanguages, bundledThemes, warnDeprecated, createHighlighter, normalizeTheme, tokenizeAnsiWithTheme } from "shiki";
import { normalizeTheme as normalizeTheme2, normalizeTheme as normalizeTheme3 } from "shiki";
var ShikiCompatError = class extends ShikiError {
  constructor(message) {
    super(message);
    this.name = "ShikiCompatError";
  }
};
var _warned = /* @__PURE__ */ new Set();
function warnOnce(message) {
  if (!_warned.has(message)) {
    console.warn(`[shiki-compat]: ${message}`);
    _warned.add(message);
  }
}
function stubFunction(name) {
  return () => {
    warnOnce(`\`${name}\` is a stub function in \`shiki-compat\` and does nothing.`);
  };
}
var setCDN = stubFunction("setCDN");
var setOnigasmWASM = stubFunction("setOnigasmWASM");
var setWasm = stubFunction("setWasm");
var setColorReplacements = stubFunction("setColorReplacements");
async function getHighlighter(options = {}) {
  warnDeprecated(`@shikijs/compat is deprecated and will be removed in v3, please migrate to the main shiki package`);
  const themes = options.themes || [];
  const langs = options.langs || [];
  if (options.theme)
    themes.unshift(options.theme);
  if (!themes.length)
    themes.push("nord");
  if (!langs.length)
    langs.push(...Object.keys(bundledLanguages));
  const shiki = await createHighlighter({
    ...options,
    themes,
    langs
  });
  const defaultTheme = shiki.getLoadedThemes()[0];
  function codeToTokensBase(code, lang, theme, options2) {
    const tokens = shiki.codeToTokensBase(code, {
      includeExplanation: true,
      lang,
      theme: theme || defaultTheme,
      ...options2
    });
    tokens.forEach((line) => {
      line.forEach((token) => {
        token.explanation || (token.explanation = []);
        delete token.offset;
      });
    });
    return tokens;
  }
  function codeToHtml(code, arg1, arg2, options2) {
    const options3 = (typeof arg1 === "string" ? options2 : arg1) || {};
    if (typeof arg1 === "string")
      options3.lang || (options3.lang = arg1);
    if (!("themes" in options3)) {
      options3.theme = "theme" in options3 ? options3.theme || defaultTheme : arg2 || defaultTheme;
    }
    if (options3.lineOptions) {
      options3.transformers || (options3.transformers = []);
      options3.transformers.push(transformerCompactLineOptions(options3.lineOptions));
    }
    return shiki.codeToHtml(code, options3);
  }
  function ansiToThemedTokens(ansi, options2 = {}) {
    const theme = shiki.getTheme(options2.theme || shiki.getLoadedThemes()[0]);
    return tokenizeAnsiWithTheme(theme, ansi);
  }
  return {
    ...shiki,
    ansiToThemedTokens,
    codeToTokensBase,
    codeToThemedTokens: codeToTokensBase,
    codeToHtml,
    ansiToHtml(code, options2) {
      return shiki.codeToHtml(code, {
        lang: "ansi",
        ...options2,
        theme: options2?.theme || defaultTheme
      });
    },
    getBackgroundColor(theme) {
      return shiki.getTheme(theme).bg;
    },
    getForegroundColor(theme) {
      return shiki.getTheme(theme).fg;
    },
    /**
     * @deprecated Not supported by Shiki
     */
    setColorReplacements(..._args) {
      throw new ShikiCompatError("`setColorReplacements` is not supported by @shikijs/compat");
    }
  };
}

// contentlayer.config.ts
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath.replace(/\(.*?\)\//g, "")}`
    // Removes any folder wrapped in parentheses
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/\(.*?\)\//g, "").split("/").slice(1).join("/")
  }
};
var LinkItem = defineNestedType(() => ({
  name: "LinkItem",
  fields: {
    label: {
      type: "string",
      description: "The label for the link",
      required: true
    },
    url: {
      type: "string",
      description: "The URL for the link",
      required: true
    }
  }
}));
var Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    published: {
      type: "boolean",
      default: true
    },
    links: {
      type: "list",
      of: LinkItem,
      description: "A list of related links",
      required: false
    },
    featured: {
      type: "boolean",
      default: false,
      required: false
    },
    component: {
      type: "boolean",
      default: false,
      required: false
    },
    toc: {
      type: "boolean",
      default: true,
      required: false
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeSlug,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;
            if (codeEl.tagName !== "code") {
              return;
            }
            if (codeEl.data?.meta) {
              const regex = /event="([^"]*)"/;
              const match = codeEl.data?.meta.match(regex);
              if (match) {
                node.__event__ = match ? match[1] : null;
                codeEl.data.meta = codeEl.data.meta.replace(regex, "");
              }
            }
            node.__rawString__ = codeEl.children?.[0].value;
            node.__src__ = node.properties?.__src__;
            node.__style__ = node.properties?.__style__;
          }
        });
      },
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          getHighlighter,
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return;
            }
            const preElement = node.children.at(-1);
            if (preElement.tagName !== "pre") {
              return;
            }
            preElement.properties["__withMeta__"] = node.children.at(0).tagName === "div";
            preElement.properties["__rawString__"] = node.__rawString__;
            if (node.__src__) {
              preElement.properties["__src__"] = node.__src__;
            }
            if (node.__event__) {
              preElement.properties["__event__"] = node.__event__;
            }
            if (node.__style__) {
              preElement.properties["__style__"] = node.__style__;
            }
          }
        });
      },
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["heading"],
            ariaLabel: "Link to section"
          },
          content: (node) => {
            if (node.tagName === "h2" || node.tagName === "h3") {
              return [
                {
                  type: "element",
                  tagName: "svg",
                  properties: {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "lucide lucide-hash heading-icon"
                  },
                  children: [
                    {
                      type: "element",
                      tagName: "line",
                      properties: { x1: "4", y1: "9", x2: "20", y2: "9" }
                    },
                    {
                      type: "element",
                      tagName: "line",
                      properties: { x1: "4", y1: "15", x2: "20", y2: "15" }
                    },
                    {
                      type: "element",
                      tagName: "line",
                      properties: { x1: "10", y1: "3", x2: "8", y2: "21" }
                    },
                    {
                      type: "element",
                      tagName: "line",
                      properties: { x1: "16", y1: "3", x2: "14", y2: "21" }
                    }
                  ]
                }
              ];
            }
            return [];
          }
        }
      ]
    ]
  }
});
export {
  Doc,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-W5G6Q4RY.mjs.map
