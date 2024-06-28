const enableColor = !process.env.NO_COLOR;
const color = (i) => (enableColor ? i : "");

const RESET = color("\x1b[0m");
const BOLD = color("\x1b[1m");
const RED = color("\x1b[31m");
const GREEN = color("\x1b[32m");

export { RESET, BOLD, RED, GREEN };
