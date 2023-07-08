const path = require('path');
const MarkdownIt = require('markdown-it');
const renderTemplate = require('./render-template');

const md = new MarkdownIt({
  html: true,
  linkify: true
});

md.renderer.rules.fence = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  if (token.info === 'scratch') {
    // Don't put scratchblocks in a <code> or <pre>
    return `<div class="render-scratchblocks">${md.utils.escapeHtml(token.content)}</div>`;
  }
  // By default markdown-it will use a strange combination of <code> and <pre>; we'd rather it
  // just use <pre>
  return `<pre class="language-${md.utils.escapeHtml(token.info)}">${md.utils.escapeHtml(token.content)}</pre>`;
};

/**
 * @param {string} markdownSource Markdown code
 * @returns {string} HTML source code
 */
const renderDocs = (markdownSource) => {
  const tokens = md.parse(markdownSource, {});

  // Extract the header
  let headerHTML = '## file did not contain header ##';
  let headerText = headerHTML;
  const headerStart = tokens.findIndex((token) => token.type === 'heading_open' && token.tag === 'h1');
  const headerEnd = tokens.findIndex((token) => token.type === 'heading_close' && token.tag === 'h1');
  if (headerStart !== -1 && headerEnd !== -1) {
    const headerTokens = tokens.splice(headerStart, headerEnd - headerStart + 1);

    // Discard the header tokens themselves, but render the HTML title with any formatting
    headerTokens.shift();
    headerTokens.pop();
    headerHTML = md.renderer.render(headerTokens, md.options, {});

    // We also need a no-formatting page
    const justTextTokens = headerTokens.filter(token => token.type === 'inline');
    headerText = md.renderer.render(justTextTokens, md.options, {});
  }

  const bodyHTML = md.renderer.render(tokens, md.options, {});
  return renderTemplate(path.join(__dirname, 'docs-template.ejs'), {
    headerHTML,
    headerText,
    bodyHTML
  });
};

module.exports = renderDocs;
