const enableColor = !process.env.NO_COLOR;
const color = (i) => (enableColor ? i : "");

module.exports = {
  RESET: color("\x1b[0m"),
  BOLD: color("\x1b[1m"),
  RED: color("\x1b[31m"),
  GREEN: color("\x1b[32m"),
};
