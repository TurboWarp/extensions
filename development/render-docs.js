const path = require("path");
const MarkdownIt = require("markdown-it");
const renderTemplate = require("./render-template");

// From GitHub's markdown alert SVG icons: https://github.com/primer/octicons
const blockIcons = {
  note: `<svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" fill="#4493f8"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`,
  tip: `<svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" fill="#3fb950"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>`,
  important: `<svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" fill="#ab7df8"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,
  warning: `<svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" fill="#d29922"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`,
  caution: `<svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" fill="#f85149"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`,
};

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
});

md.renderer.rules.fence = function (tokens, idx, options, env, self) {
  const token = tokens[idx];

  if (token.info === "scratch") {
    env.usesScratchBlocks = true;
    return `<div class="render-scratchblocks">${md.utils.escapeHtml(
      token.content
    )}</div>`;
  }

  // By default markdown-it will use a strange combination of <code> and <pre>; we'd rather it
  // just use <pre>
  return `<pre class="language-${md.utils.escapeHtml(
    token.info
  )}">${md.utils.escapeHtml(token.content)}</pre>`;
};

md.block.ruler.before(
  "blockquote",
  "custom_blockquote",
  function (state, startLine, endLine, silent) {
    const marker = state.src.slice(
      state.bMarks[startLine],
      state.eMarks[startLine]
    );

    const match = marker.match(/^\s*>\s*\[!([A-Z]+)]\s*(.*)/);
    if (!match) return false;

    const type = match[1].toLowerCase();
    if (!blockIcons[type]) {
      throw new TypeError(`Invalid alert type: ${match[1]}`);
    }
    const icon = blockIcons[type];

    if (silent) return true;

    // Open alert div
    const tokenOpen = state.push("html_block", "", 0);
    tokenOpen.content = `<div class="alert alert-${type}">`;

    // Render title with Markdown support
    state.push("paragraph_open", "p", 1);
    const tokenTitle = state.push("inline", "", 0);
    tokenTitle.content = `${icon} **${type.charAt(0).toUpperCase() + type.slice(1)}**`;
    tokenTitle.children = [];
    state.push("paragraph_close", "p", -1);

    // Process all lines inside the blockquote
    let nextLine = startLine + 1;
    while (nextLine < endLine) {
      const nextMarker = state.src.slice(
        state.bMarks[nextLine],
        state.eMarks[nextLine]
      );

      if (/^\s*>/.test(nextMarker)) {
        const lineContent = nextMarker.replace(/^\s*>?\s*/, "").trim();

        if (lineContent === "") {
          state.push("paragraph_open", "p", 1);
          state.push("paragraph_close", "p", -1);
        } else {
          state.push("paragraph_open", "p", 1);
          const token = state.push("inline", "", 0);
          token.content = lineContent;
          token.children = [];
          state.push("paragraph_close", "p", -1);
        }

        nextLine++;
      } else {
        break;
      }
    }

    // Close alert div
    const tokenClose = state.push("html_block", "", 0);
    tokenClose.content = `</div>`;

    state.line = nextLine;
    return true;
  }
);

/**
 * @param {string} markdownSource Markdown code
 * @param {string} slug Path slug like 'TestMuffin/fetch'
 * @returns {string} HTML source code
 */
const renderDocs = (markdownSource, slug) => {
  const env = {};
  const tokens = md.parse(markdownSource, env);

  // Extract the header
  let headerHTML = "## file did not contain header ##";
  let headerText = headerHTML;
  const headerStart = tokens.findIndex(
    (token) => token.type === "heading_open" && token.tag === "h1"
  );
  const headerEnd = tokens.findIndex(
    (token) => token.type === "heading_close" && token.tag === "h1"
  );
  if (headerStart !== -1 && headerEnd !== -1) {
    const headerTokens = tokens.splice(
      headerStart,
      headerEnd - headerStart + 1
    );

    // Discard the header tokens themselves, but render the HTML title with any formatting
    headerTokens.shift();
    headerTokens.pop();
    headerHTML = md.renderer.render(headerTokens, md.options, env);

    // We also need a no-formatting version for the title
    const justTextTokens = headerTokens.filter(
      (token) => token.type === "inline"
    );
    headerText = md.renderer.render(justTextTokens, md.options, env);
  }

  const bodyHTML = md.renderer.render(tokens, md.options, env);

  return renderTemplate(path.join(__dirname, "docs-template.ejs"), {
    slug,
    headerHTML,
    headerText,
    bodyHTML,
    usesScratchBlocks: !!env.usesScratchBlocks,
  });
};

module.exports = renderDocs;
