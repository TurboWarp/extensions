const enableColor = !process.env.NO_COLOR;
const color = (i) => (enableColor ? i : "");

export const RESET = color("\x1b[0m");
export const BOLD = color("\x1b[1m");
export const RED = color("\x1b[31m");
export const GREEN = color("\x1b[32m");
