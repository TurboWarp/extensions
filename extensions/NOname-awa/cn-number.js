(function (Scratch) {
  "use strict";

  let i, N_Z, o, j, After_decimal_point, unit, k, C_Number, m, n;

  class CNNUMBER {
    getInfo() {
      return {
        id: "nonameawacnnumber",
        name: Scratch.translate("Chinese Numbers"),
        color1: "#cb0000",
        color2: "#a20000",
        color3: "#a20000",
        blocks: [
          {
            opcode: "CN_number",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            text: Scratch.translate(
              "convert [a] to chinese number using [u] numerals"
            ),
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2020",
              },
              u: {
                type: Scratch.ArgumentType.STRING,
                menu: "uppercase",
              },
            },
          },
        ],
        menus: {
          uppercase: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("standard"),
                value: "0",
              },
              {
                text: Scratch.translate("financial"),
                value: "1",
              },
            ],
          },
        },
      };
    }
    CN_number(args) {
      if (isNaN(args.a)) {
        return "";
      }
      return CN_NUMBER(args.a, args.u);
    }
  }

  const main = (Number2, null2, units) => {
    if (Number2 == 0) {
      return null2 ? "零" : "";
    }
    i = "";
    let j_start = String(Number2).length;
    let j_inc = 1;
    if (j_start > 1) {
      j_inc = -j_inc;
    }
    for (j = j_start; j_inc >= 0 ? j <= 1 : j >= 1; j += j_inc) {
      if (units) {
        k = String(Number2).charAt(String(Number2).length - (j - 1) - 1);
        if (Number2 >= 10000) {
          return "";
        }
        i =
          String(i) +
          String(
            String(Number2).slice(-j).charAt(0) == "2" && j >= 3
              ? "两"
              : k == "0"
                ? j == 1
                  ? ""
                  : i.slice(-1) == "零"
                    ? ""
                    : String(Number2).slice(-1) == "0" &&
                        (j != 3 || String(Number2).charAt(2) == "0")
                      ? " "
                      : "零"
                : C_Number[k - 1]
          );
        i =
          String(i) +
          String(
            i.slice(-1) == "零" || i.slice(-1) == " "
              ? ""
              : unit[j - 1] == "个"
                ? ""
                : unit[j - 1]
          );
      } else {
        if (j != 1) {
          k = String(Number2)
            .slice(-(j - 1))
            .charAt(0);
          i =
            String(i) +
            String(
              k == 0
                ? "零"
                : C_Number[
                    [k].reduce(function (x, y) {
                      return x + y;
                    }) - 1
                  ]
            );
        }
      }
    }
    if (Number2 >= 10 && Number2 < 20) {
      return i.trim().slice(1, 3);
    }
    return i.trim();
  };

  const CN_NUMBER = (Number_in, uppercase) => {
    if (
      String(
        Math.abs(Number_in >= 0 ? Math.floor(Number_in) : Math.ceil(Number_in))
      ).length > 20
    ) {
      return "";
    }
    N_Z = Math.abs(
      Number_in >= 0 ? Math.floor(Number_in) : Math.ceil(Number_in)
    );
    After_decimal_point = "." + String(String(Number_in).split(".")[1]);
    unit = (
      uppercase
        ? "个、拾、佰、仟、万、亿、兆、京"
        : "个、十、百、千、万、亿、兆、京"
    ).split("、");
    C_Number = (
      uppercase
        ? "壹、贰、叁、肆、伍、陆、柒、捌、玖、拾"
        : "一、二、三、四、五、六、七、八、九、十"
    ).split("、");
    m = "";
    o = "";
    let n_end = String(N_Z).length;
    let n_inc = 1;
    if (1 > n_end) {
      n_inc = -n_inc;
    }
    for (n = 1; n_inc >= 0 ? n <= n_end : n >= n_end; n += n_inc) {
      m = [n % 4 == 0 ? " " : "", String(N_Z).slice(-n).charAt(0), m].join("");
    }
    m = m.trim().split(" ");
    let n_end2 = m.length;
    let n_inc2 = 1;
    if (1 > n_end2) {
      n_inc2 = -n_inc2;
    }
    for (n = 1; n_inc2 >= 0 ? n <= n_end2 : n >= n_end2; n += n_inc2) {
      o = [
        m.length == n ? "" : unit[n + 4 - 1],
        main(m.slice(-n)[0], m.length == n, true),
        o,
      ].join("");
    }
    return [
      Number_in < 0 ? "负" : "",
      o,
      Number_in % 1 != 0
        ? "点" + String(main(After_decimal_point, false, false))
        : "",
    ].join("");
  };

  Scratch.extensions.register(new CNNUMBER());
})(Scratch);
