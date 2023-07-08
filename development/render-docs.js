const path = require('path');
const MarkdownIt = require('markdown-it');
const renderTemplate = require('./render-template');

const md = new MarkdownIt({
  html: true,
  linkify: true
});

/**
 * @param {string} markdownSource Markdown code
 * @returns {string} HTML source code
 */
const renderDocs = (markdownSource) => {
  const generatedHTML = md.render(markdownSource);
  return renderTemplate(path.join(__dirname, 'docs-template.ejs'), {
    generatedHTML
  });
};

module.exports = renderDocs;
