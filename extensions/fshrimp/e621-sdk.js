(function (Scratch) {
  "use strict";
  const baseUrl = "https://e621.net";
  const translate = (/** @type {string} */ id) =>
    Scratch.translate({
      id,
      default: id,
      description: `Translation text of ${id}`,
    });
  console.log(Scratch);
  class E621SDK {
    getInfo() {
      return {
        id: "esixtwoonesdk",
        name: translate("e621-sdk.name"),
        blocks: [
          {
            opcode: "toQuery",
            blockType: Scratch.BlockType.REPORTER,
            text: translate("e621-sdk.toQuery"),
            arguments: {
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"tags":"von_lycaon"}',
              },
            },
          },
          {
            opcode: "toTag",
            blockType: Scratch.BlockType.REPORTER,
            text: translate("e621-sdk.toTag"),
            arguments: {
              keywords: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["Von lycaon","Death (puss in boots)"]',
              },
            },
          },
          {
            opcode: "useApi",
            blockType: Scratch.BlockType.REPORTER,
            text: translate("e621-sdk.useApi"),
            arguments: {
              path: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "posts",
              },
              params: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "list",
            blockType: Scratch.BlockType.REPORTER,
            text: translate("e621-sdk.list"),
            arguments: {
              keywords: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["Von lycaon","Death (puss in boots)"]',
              },
              limit: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
              page: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "fetchPost",
            blockType: Scratch.BlockType.REPORTER,
            text: translate("e621-sdk.fetchPost"),
            arguments: {
              id: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 114514,
              },
            },
          },
          {
            opcode: "randomPost",
            blockType: Scratch.BlockType.REPORTER,
            text: translate("e621-sdk.randomPost"),
            arguments: {
              keywords: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["Von lycaon","Death (puss in boots)"]',
              },
            },
          },
        ],
      };
    }
    /**
     *
     * @param {{data:string}} param0
     * @returns {string}
     */
    toQuery({ data }) {
      data = JSON.parse(data);
      return Object.keys(data)
        .map((key) => `${key}=${data[key]}`)
        .join("&");
    }
    /**
     *
     * @param {{keywords:string}} param0
     * @returns {string}
     */
    toTag({ keywords }) {
      return JSON.parse(keywords)
        .map((keyword) =>
          encodeURIComponent(keyword.replaceAll(" ", "_").toLowerCase())
        )
        .join("+");
    }
    /**
     *
     * @param {{path:string,params?:string}} param0
     * @returns {string}
     */
    useApi({ path, params }) {
      return `${baseUrl}/${path}.json${params ? "?" + this.toQuery({ data: params }) : ""}`;
    }
    /**
     *
     * @param {{keywords:string,limit?:number,page?:number}} param0
     * @returns {Promise<string>}
     */
    async list({ keywords, limit, page }) {
      let url = this.useApi({
        path: "posts",
        params: JSON.stringify({
          tags: this.toTag({ keywords }),
          limit: limit?.toString(),
          page: page?.toString(),
        }),
      });
      let res = await Scratch.fetch(url);
      let data = await res.json();
      return JSON.stringify(data.posts);
    }
    /**
     *
     * @param {{id:number}} param0
     * @returns {Promise<string>}
     */
    async fetchPost({ id }) {
      let url = this.useApi({ path: `posts/${id}` });
      let res = await Scratch.fetch(url);
      let data = await res.json();
      return JSON.stringify(data.post);
    }
    /**
     *
     * @param {{keywords:string}} param0
     * @returns {Promise<string>}
     */
    async randomPost({ keywords }) {
      let url = this.useApi({
        path: "posts/random",
        params: JSON.stringify({ tags: this.toTag({ keywords }) }),
      });
      let res = await Scratch.fetch(url);
      let data = await res.json();
      return JSON.stringify(data.post);
    }
  }
  Scratch.extensions.register(new E621SDK());
})(Scratch);
