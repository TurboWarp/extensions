import pathUtil from "node:path";

/**
 * @fileoverview Various utilities related to integrating with CI.
 */

// https://github.com/actions/toolkit/blob/main/docs/problem-matchers.md#limitations
export const MAX_ANNOTATIONS_PER_TYPE_PER_STEP = 10;
export const MAX_ANNOTATIONS_PER_JOB = 50;

/**
 * @returns {boolean} true if running in CI (GitHub Actions, etc.)
 */
export const isCI = () => !!process.env.CI;

/**
 * Note: PR may have changed between when this CI job was queued and when this job runs.
 * So, don't use this for security-critical things where accuracy is a must.
 * @returns {Promise<Set<string>>} List of paths (relative to root without leading / or ./) changed by this PR.
 */
export const getChangedFiles = async () => {
  if (!isCI()) {
    return [];
  }

  const prNumber = +process.env.PR_NUMBER;
  if (!prNumber) {
    throw new Error("Missing PR_NUMBER");
  }

  const repo = process.env.GH_REPO;
  if (typeof repo !== "string" || !repo.includes("/")) {
    throw new Error("Missing GH_REPO");
  }

  const diffResponse = await fetch(
    `https://patch-diff.githubusercontent.com/raw/${repo}/pull/${prNumber}.diff`
  );
  const diffText = await diffResponse.text();
  const fileMatches = [
    ...diffText.matchAll(/^(?:---|\+\+\+) [ab]\/(.+)$/gm),
  ].map((match) => match[1]);

  return new Set(fileMatches);
};

/**
 * @typedef Annotation
 * @property {'notice'|'warning'|'error'} type
 * @property {string} file Absolute path to file or relative from repository root
 * @property {string} title
 * @property {string} message
 * @property {number} [line] 1-indexed
 * @property {number} [col] 1-indexed
 * @property {number} [endLine] 1-indexed
 * @property {number} [endCol] 1-indexed
 */

/**
 * @param {Annotation} annotation
 */
export const createAnnotation = (annotation) => {
  const rootDir = pathUtil.join(import.meta.dirname, "..");
  const relativeFileName = pathUtil.relative(rootDir, annotation.file);

  // https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands

  let output = "";
  output += `::${annotation.type} `;
  output += `file=${relativeFileName}`;

  // Documentation says line number is not required, but in practice that gets interpreted as
  // line 0 and ends up not showing up. So, we'll default to line 1.
  if (typeof annotation.line === "number") {
    output += `,line=${annotation.line}`;
  } else {
    output += ",line=1";
  }

  // These are all actually optional.
  if (typeof annotation.col === "number") {
    output += `,col=${annotation.col}`;
  }
  if (typeof annotation.endLine === "number") {
    output += `,endLine=${annotation.endLine}`;
  }
  if (typeof annotation.endCol === "number") {
    output += `,endCol=${annotation.endCol}`;
  }

  output += `,title=${annotation.title}::`;
  output += annotation.message;

  console.log(output);
};
