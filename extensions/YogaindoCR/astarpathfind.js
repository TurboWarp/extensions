// Name: A* Pathfinder
// ID: yogaindocrastarpathfind
// Description: A* Pathfinder With Diagonal Movement.
// By: YogaindoCR <https://scratch.mit.edu/users/YogaindoCR/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  /* Code Transparancy
   * A* Star Pathfinder was created with the help of AI
   * Version V.1.4.2
   */

  if (!Scratch.extensions.unsandboxed)
    throw new Error("A* Pathfinder must run unsandboxed");

  const menuIconURI =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAADXUAAA11AFeZeUIAAAGaUlEQVR4nO2aX2gURxzHP5ZCxV7vguFSG7ygzT+umEsNVGvTUuKfCjaXQn1QpA8iOf/0oQ9JEAsGwRSaoobSh6QYHyzSQl+k3hVBChWxplZoNCmtJFar0do0QRoP8XX7MNmb3bud2d3LnZSyHxhuLr+5+e18/c38ZmaFgICAgICAgICAgICA4kgBhkvZXkJ/VUA3UKOw9wENJfSnxcvgSyVCBEha+nMSoc9i70OIVTZSgNGZxDBG9GXbhgWLUIU5sMqowZ4ug+pYvghi8PsPG6ystwrfvKBRajDAffDGCMZgT+5hhorwIwYfChtsajeYNkTZ0Wn2mUIM0iCekPb9h4VYZRKhBjBiVd4EMEYwohU5EfyEpRh8ZVQOzFpCYasIQpT8NvGEVoSnihSgGaC53vsPXqyWVR9+ZoANPJiFresLrQ1xs3acUBgGhu32Q91wfRygBxhzclCsAFsAtqzz/oPWhKz69PU9sJtL56ErZbdsfFvWpRiCk0Pw5QmAz4ETPn1qiQBGeIn38DcLcmHy48v8HCIUNugftIe4Oc/z/y4WSQN7pojkOygmAuIA8RXOxtTH6h/G5OxX5XArEWAOSCNC+CyPsnDkkL1Vy1qojsHOffJv6xrg/l2ADmAzYvE1gOfJE6EYAZoAmmqdjReuQvqis82yZritymLwoTCI3H8QIQQ8mBUDNHkvBa+8Jr9vXQ9/3DC/pYHjwF4AQuEJ8kRY5PIgThgAxojiyTdCZwcc+6DQNnQa3j8KiHm5r7CF3QfTBpxLw69jcPWKGPz0ffGv27IWzl62/6orBV+dgMoohCugrhGiyyDRIiJkXYMpTiMwCfC0j4HDfOjGFIls6DRkH8PkXWf7vnfhwCBkH7MXOAA8dPW4uUOUfE46bCmW1wjRfOB3CmjT3+iE+Jy4o+5gxQuy6tO3nZ0OAdTV67sbvxGgTX83/xSfN+6pO1jzEozfFFUUuVnLQB/cm4LZaTiVsdv2bIdnnxORUIQYbrimv1iVTHWDPc5tznySa5PW+OoGxJ5/U7vYzcltrSjWXd8XZ8Rn/6C9TWVUnAs2tYv2IjWm8JaFCmgGjEStpzxvbNvgSSjdg3TbBmMt+WeCd7Y5nRGcSsHg/UyBNSBC2PFpP8tVe4Cj12+rO6pbDndnRBWYUjQ7Nv85aWlzjXjCHvo/XoDsnPw+MCymx3ffgtgHTCBW/WXAuXx/fhbBJEDydWfj1UlZBbj9l7qjthZZdfF5DMgA/wDXqI7BecuycS4t0tqDWbE2mJzKiDQpptnS+T6GUYvtiuvpLy+s+wDjcGdJtsURIE0oLOe6WVrbZD8tawtPgs7bYRteI6AOROiqmA9pECpfAbhyXd0+IXeSbrvCfiDJwf7C/cDYz7I+6eBsdEpsiuAOimO4VwHawBa6NvLmP4h5p90PWM4ScXUrIsAooTCMj9otXSl4lAXYDezmUbbwtDjQB88sBvgIWKzxo8U1/bW15MLZemjX3hh5TIemf3HhsbJeTgN57dUwX8TfzLQoL0L6KDLtmbimP8ttT0HRrQM+bomkCGYaFPWkpU0yz+Zp8F6mgDb9pS/C7JyzDfTrgI9booeIVbwRyFhSnHUrmAE65m0Z4GWgF5eV38s+QJv+Ot5QnwzdaE3AT7+JKnBZ3xoQe4KO+WfKONgzFAqjxe04XAPciVXB1Ddeu/THInmUL+ZovmDcpoBr+lso9bLvJ/Y2x4qbANr0VwpaGmW1fF7U6ASIAAfDS6B3V/ke4M3Vslo+L2p0864ZuJaohbFTzg3SF2HYLYsDy5bC8Idqe2SjuEkCKvByS1RCdFlAe/sL8OnXcH5UbTcJL9ELEF+RywZxvGWDkqETYAfAjrfUDX6XNz8Ol3Y5tmQfs3fotLgTdKKpNidAE09YANUUqAL+jlbAzFnNj72lsCSQbm+FzJEF91VyVIvgKoBVmv2ZwwFIxRjA2A19I58vTUqGSoDVAKs1mfnSuKy6+JgC23HZEcteo86lv5KiEuAoOL/cMLl1X1Y9+OkBW9QU4OOWqKQ4CdAMtguLAiwHoAziFbYbl8AWNQX07hLZAvEarOAlZrlwEsA1/WV+kFWPfm6BLWocKdlLEx84CeCa/n65Kase/cwAmdk59YtTsB2513jst2ykcf9fX6+Wqd+U8tdPGN3DFjN4L/3+ZwYfEBAQEBAQEBAQ8D/nX9S6p97jRTZ9AAAAAElFTkSuQmCC";

  class PriorityQueue {
    constructor() {
      this.heap = [];
      this.map = new Map();
    }

    push(item) {
      this.heap.push(item);
      this.map.set(`${item.node.x},${item.node.y}`, item);
      this.bubbleUp(this.heap.length - 1);
    }

    pop() {
      if (this.heap.length === 0) return undefined;
      const top = this.heap[0];
      const last = this.heap.pop();
      this.map.delete(`${top.node.x},${top.node.y}`);
      if (this.heap.length > 0) {
        this.heap[0] = last;
        this.bubbleDown(0);
      }
      return top;
    }

    bubbleUp(index) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (parentIndex >= 0 && this.heap[index].f < this.heap[parentIndex].f) {
        this.swap(index, parentIndex);
        this.bubbleUp(parentIndex);
      }
    }

    bubbleDown(index) {
      let smallestIndex = index;
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;

      if (
        leftIndex < this.heap.length &&
        this.heap[leftIndex].f < this.heap[smallestIndex].f
      ) {
        smallestIndex = leftIndex;
      }

      if (
        rightIndex < this.heap.length &&
        rightIndex < this.heap.length &&
        this.heap[rightIndex].f < this.heap[smallestIndex].f
      ) {
        //Fixed Bug
        smallestIndex = rightIndex;
      }

      if (smallestIndex !== index) {
        this.swap(index, smallestIndex);
        this.bubbleDown(smallestIndex);
      }
    }

    swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
      this.map.set(
        `${this.heap[i].node.x},${this.heap[i].node.y}`,
        this.heap[i]
      );
      this.map.set(
        `${this.heap[j].node.x},${this.heap[j].node.y}`,
        this.heap[j]
      );
    }

    isEmpty() {
      return this.heap.length === 0;
    }

    has(node) {
      return this.map.has(`${node.x},${node.y}`);
    }

    getG(node) {
      return this.map.get(`${node.x},${node.y}`).g;
    }

    update(node, g, h, path) {
      for (let i = 0; i < this.heap.length; i++) {
        if (this.heap[i].node.x === node.x && this.heap[i].node.y === node.y) {
          this.heap[i].g = g;
          this.heap[i].h = h;
          this.heap[i].f = g + h;
          this.heap[i].path = path;
          this.map.set(`${node.x},${node.y}`, this.heap[i]);
          this.bubbleUp(i);
          this.bubbleDown(i);
          return;
        }
      }
    }
  }

  class AStarExtension {
    getInfo() {
      return {
        id: "yogaindocrastarpathfind",
        name: "A* Pathfinder",
        color1: "#43d3dd",
        color2: "#2b5a68",
        menuIconURI,
        blocks: [
          {
            opcode: "findPath",
            blockType: Scratch.BlockType.REPORTER,
            text: "Find path in [GRID] from [START] to [END] with diagonals [DIAGONALS]",
            arguments: {
              GRID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1 1 0 1 1 1 0 1 1",
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8,
              },
              DIAGONALS: {
                type: Scratch.ArgumentType.STRING,
                menu: "diagonals",
                defaultValue: "true",
              },
            },
          },
          {
            opcode: "findWeightedPath",
            blockType: Scratch.BlockType.REPORTER,
            text: "Find weighted path in [GRID] weights [WEIGHTS] from [START] to [END] with diagonals [DIAGONALS]",
            arguments: {
              GRID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1 1 0 1 1 1 0 1 1",
              },
              WEIGHTS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1 5 0 1 3 2 0 4 1",
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8,
              },
              DIAGONALS: {
                type: Scratch.ArgumentType.STRING,
                menu: "diagonals",
                defaultValue: "true",
              },
            },
          },
        ],
        menus: {
          diagonals: ["true", "false"],
        },
      };
    }

    findPath(args) {
      return this.findPathInternal(args, null);
    }

    findWeightedPath(args) {
      try {
        const weightsString = args.WEIGHTS;
        const gridString = args.GRID;
        const weights = weightsString.split(" ").map(Number);
        const grid = gridString.split(" ").map(Number);

        if (weights.some(isNaN)) {
          throw new Error("Weights must be numbers separated by spaces.");
        }
        if (grid.some(isNaN)) {
          throw new Error("Grid must be numbers separated by spaces.");
        }

        if (weights.length !== grid.length) {
          throw new Error("Weights length must be equal to grid length.");
        }
        return this.findPathInternal(args, weights);
      } catch (error) {
        return "Error: " + error.message;
      }
    }

    cross(a, b, c) {
      return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    }

    findPathInternal(args, weights) {
      try {
        const gridString = args.GRID;
        const grid1D = gridString.split(" ").map(Number);
        const start = Number(args.START);
        const end = Number(args.END);
        const allowDiagonals = args.DIAGONALS === "true";

        if (grid1D.some(isNaN)) {
          throw new Error("Grid must be numbers separated by spaces.");
        }

        if (grid1D[start] === 0) {
          return "";
        }
        if (grid1D[end] === 0) {
          return "";
        }

        const gridSize = Math.sqrt(grid1D.length);
        if (!Number.isInteger(gridSize)) {
          throw new Error("Grid length must be a perfect square.");
        }

        if (
          start < 0 ||
          start >= grid1D.length ||
          end < 0 ||
          end >= grid1D.length
        ) {
          throw new Error("Start and end indices are out of bounds.");
        }

        const grid2D = this.convertTo2D(grid1D, gridSize);
        const start2D = this.indexToCoords(start, gridSize);
        const end2D = this.indexToCoords(end, gridSize);

        const openSet = new PriorityQueue();
        openSet.push({
          node: start2D,
          g: 0,
          h: this.heuristic(start2D, end2D),
          f: this.heuristic(start2D, end2D),
          path: [],
        });
        const closedSet = new Set();

        while (!openSet.isEmpty()) {
          const current = openSet.pop();

          if (current.node.x === end2D.x && current.node.y === end2D.y) {
            return current.path
              .map((coord) => this.coordsToIndex(coord, gridSize))
              .concat(end)
              .join(" ");
          }

          closedSet.add(this.coordsToIndex(current.node, gridSize));

          const neighbors = this.getNeighbors(
            grid2D,
            current.node,
            gridSize,
            allowDiagonals
          );
          for (const neighbor of neighbors) {
            let nextNode = null;
            let cost = 1;

            if (allowDiagonals) {
              nextNode = this.jump(grid2D, current.node, neighbor, gridSize);
              if (nextNode && this.isDiagonal(current.node, nextNode)) {
                cost = 1.414;
              }
            } else {
              nextNode = this.jumpNonDiagonal(
                grid2D,
                current.node,
                neighbor,
                gridSize
              );
            }

            if (!nextNode) continue;

            const neighborIndex = this.coordsToIndex(nextNode, gridSize);

            if (closedSet.has(neighborIndex)) continue;

            let g = current.g + cost;
            if (weights) {
              g += weights[neighborIndex] - 1;
            }

            if (
              !openSet.has(nextNode) ||
              g < openSet.getG(nextNode) ||
              (g === openSet.getG(nextNode) &&
                this.cross(start2D, nextNode, end2D) <
                  this.cross(
                    start2D,
                    openSet.map.get(`${nextNode.x},${nextNode.y}`).node,
                    end2D
                  ))
            ) {
              const h = this.heuristic(nextNode, end2D);
              const path = current.path.concat(current.node);
              openSet.update(nextNode, g, h, path);
              if (!openSet.has(nextNode)) {
                openSet.push({
                  node: nextNode,
                  g,
                  h,
                  f: g + h,
                  path,
                });
              }
            }
          }
        }

        return ""; //No path found
      } catch (error) {
        return "Error: " + error.message;
      }
    }

    convertTo2D(grid1D, gridSize) {
      const grid2D = [];
      for (let y = 0; y < gridSize; y++) {
        grid2D[y] = [];
        for (let x = 0; x < gridSize; x++) {
          grid2D[y][x] = grid1D[y * gridSize + x];
        }
      }
      return grid2D;
    }

    indexToCoords(index, gridSize) {
      return {
        x: index % gridSize,
        y: Math.floor(index / gridSize),
      };
    }

    coordsToIndex(coords, gridSize) {
      return coords.y * gridSize + coords.x;
    }

    heuristic(a, b) {
      return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    }

    isDiagonal(a, b) {
      return Math.abs(a.x - b.x) === 1 && Math.abs(a.y - b.y) === 1;
    }

    getNeighbors(grid, node, gridSize, allowDiagonals) {
      const neighbors = [];
      const x = node.x;
      const y = node.y;

      const possibleNeighbors = [
        {
          x: x - 1,
          y: y,
        },
        {
          x: x + 1,
          y: y,
        },
        {
          x: x,
          y: y - 1,
        },
        {
          x: x,
          y: y + 1,
        },
      ];

      if (allowDiagonals) {
        possibleNeighbors.push(
          {
            x: x - 1,
            y: y - 1,
          },
          {
            x: x - 1,
            y: y + 1,
          },
          {
            x: x + 1,
            y: y - 1,
          },
          {
            x: x + 1,
            y: y + 1,
          }
        );
      }

      for (const neighbor of possibleNeighbors) {
        if (
          neighbor.x >= 0 &&
          neighbor.x < gridSize &&
          neighbor.y >= 0 &&
          neighbor.y < gridSize
        ) {
          neighbors.push({
            x: neighbor.x,
            y: neighbor.y,
          });
        }
      }
      return neighbors;
    }

    //JPS optimization
    jump(grid, current, neighbor, gridSize) {
      let dx = neighbor.x - current.x;
      let dy = neighbor.y - current.y;
      let x = current.x;
      let y = current.y;

      while (true) {
        x += dx;
        y += dy;

        if (
          x < 0 ||
          x >= gridSize ||
          y < 0 ||
          y >= gridSize ||
          grid[y][x] === 0
        ) {
          return null;
        }

        if (x === neighbor.x && y === neighbor.y) {
          return neighbor;
        }

        if (dx !== 0) {
          if (
            (y > 0 && grid[y - 1][x] === 0 && grid[y - 1][x - dx] !== 0) ||
            (y < gridSize - 1 &&
              grid[y + 1][x] === 0 &&
              grid[y + 1][x - dx] !== 0)
          ) {
            return {
              x,
              y,
            };
          }
        } else {
          if (
            (x > 0 && grid[y][x - 1] === 0 && grid[y - dy][x - 1] !== 0) ||
            (x < gridSize - 1 &&
              grid[y][x + 1] === 0 &&
              grid[y - dy][x + 1] !== 0)
          ) {
            return {
              x,
              y,
            };
          }
        }
      }
    }

    jumpNonDiagonal(grid, current, neighbor, gridSize) {
      let dx = neighbor.x - current.x;
      let dy = neighbor.y - current.y;
      let x = current.x;
      let y = current.y;

      while (true) {
        x += dx;
        y += dy;

        if (
          x < 0 ||
          x >= gridSize ||
          y < 0 ||
          y >= gridSize ||
          grid[y][x] === 0
        ) {
          return null;
        }

        if (x === neighbor.x && y === neighbor.y) {
          return neighbor;
        }

        if (dx !== 0) {
          if (
            (y > 0 && grid[y - 1][x] === 0 && grid[y - 1][x + dx] !== 0) ||
            (y < gridSize - 1 &&
              grid[y + 1][x] === 0 &&
              grid[y + 1][x + dx] !== 0)
          ) {
            return {
              x,
              y,
            };
          }
        } else {
          if (
            (x > 0 && grid[y][x - 1] === 0 && grid[y + dy][x - 1] !== 0) ||
            (x < gridSize - 1 &&
              grid[y][x + 1] === 0 &&
              grid[y + dy][x + 1] !== 0)
          ) {
            return {
              x,
              y,
            };
          }
        }
      }
    }
  }

  Scratch.extensions.register(new AStarExtension());
})(Scratch);
