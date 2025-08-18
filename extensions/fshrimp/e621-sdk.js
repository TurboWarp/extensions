// Name: e621 SDK
// ID: esixtwoonesdk
// Description: Interact with e621 API. List, fetch and random.
// By: FallingShrimp
// License: MPL-2.0

(function (Scratch) {
    "use strict";
    const baseUrl = "https://e621.net";
    const translate = (
    /** @type {string} */ id,
    /** @type {string?} */ defaultText
    ) =>
        Scratch.translate({
            id,
            default: defaultText,
            description: `Translation text of ${id}`,
        });
    console.log(Scratch);
    class E621SDK {
        getInfo() {
            return {
                id: "esixtwoonesdk",
                name: translate("name", "e621 SDK"),
                color1: "#ff9300",
                color2: "#d17900",
                color3: "#9e5b00",
                menuIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgY2xhc3M9ImVzaXgtbG9nbyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNjAwMDA7c3RvcC1vcGFjaXR5OjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMTY3IiBzdHlsZT0ic3RvcC1jb2xvcjojZTYwMDAwO3N0b3Atb3BhY2l0eToxIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjE2NyIgc3R5bGU9InN0b3AtY29sb3I6I2ZmOGUwMDtzdG9wLW9wYWNpdHk6MSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4zMzMiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZjhlMDA7c3RvcC1vcGFjaXR5OjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMzMzIiBzdHlsZT0ic3RvcC1jb2xvcjojZmZlZjAwO3N0b3Atb3BhY2l0eToxIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmVmMDA7c3RvcC1vcGFjaXR5OjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNSIgc3R5bGU9InN0b3AtY29sb3I6IzAwODIxYjtzdG9wLW9wYWNpdHk6MSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii42NjciIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDgyMWI7c3RvcC1vcGFjaXR5OjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNjY3IiBzdHlsZT0ic3RvcC1jb2xvcjojMDA0YmZmO3N0b3Atb3BhY2l0eToxIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjgzMyIgc3R5bGU9InN0b3AtY29sb3I6IzAwNGJmZjtzdG9wLW9wYWNpdHk6MSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii44MzMiIHN0eWxlPSJzdG9wLWNvbG9yOiM3ODAwODk7c3RvcC1vcGFjaXR5OjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojNzgwMDg5O3N0b3Atb3BhY2l0eToxIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IHhsaW5rOmhyZWY9IiNhIiBpZD0iYiIgeDE9IjY1IiB4Mj0iMTU1IiB5MT0iNzAiIHkyPSIyMjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIi8+CiAgICA8ZmlsdGVyIGlkPSJjIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiB4PSItLjUiIHk9Ii0uNSIgc3R5bGU9ImNvbG9yLWludGVycG9sYXRpb24tZmlsdGVyczpzUkdCIj4KICAgICAgPGZlRmxvb2QgZmxvb2QtY29sb3I9IiMwMDAiIGZsb29kLW9wYWNpdHk9Ii40OTgwNCIgcmVzdWx0PSJmbG9vZCIvPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHJlc3VsdD0iYmx1ciIgc3RkRGV2aWF0aW9uPSIxNSIvPgogICAgICA8ZmVPZmZzZXQgaW49ImJsdXIiIHJlc3VsdD0ib2Zmc2V0Ii8+CiAgICAgIDxmZUNvbXBvc2l0ZSBpbj0iZmxvb2QiIGluMj0ib2Zmc2V0IiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iY29tcDEiLz4KICAgICAgPGZlQ29tcG9zaXRlIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImNvbXAxIiByZXN1bHQ9ImZiU291cmNlR3JhcGhpYyIvPgogICAgICA8ZmVDb2xvck1hdHJpeCBpbj0iZmJTb3VyY2VHcmFwaGljIiByZXN1bHQ9ImZiU291cmNlR3JhcGhpY0FscGhhIiB2YWx1ZXM9IjAgMCAwIC0xIDAgMCAwIDAgLTEgMCAwIDAgMCAtMSAwIDAgMCAwIDEgMCIvPgogICAgICA8ZmVGbG9vZCBmbG9vZC1jb2xvcj0iIzAwMCIgZmxvb2Qtb3BhY2l0eT0iLjQ5ODA0IiByZXN1bHQ9ImZsb29kIi8+CiAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0iZmJTb3VyY2VHcmFwaGljIiByZXN1bHQ9ImJsdXIiIHN0ZERldmlhdGlvbj0iMiIvPgogICAgICA8ZmVPZmZzZXQgaW49ImJsdXIiIHJlc3VsdD0ib2Zmc2V0Ii8+CiAgICAgIDxmZUNvbXBvc2l0ZSBpbj0iZmxvb2QiIGluMj0ib2Zmc2V0IiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iY29tcDEiLz4KICAgICAgPGZlQ29tcG9zaXRlIGluPSJmYlNvdXJjZUdyYXBoaWMiIGluMj0iY29tcDEiIHJlc3VsdD0iY29tcDIiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cGF0aCBmaWxsPSIjMDE1NDlkIiBkPSJNNjUuNiA3MC40aDg4LjJjMTQuMiAyNC4yIDI4IDU0LjEgNDIuMSA3OC4zLTE0IDI0LjUtMjguNCA0OC43LTQyLjcgNzNINjUuOEM1MiAxOTYuMSAzNi41IDE3MS40IDIyLjcgMTQ2YzcuNy0xNS4zIDM1LjgtNjEuMyA0Mi45LTc1LjZ6IiBjbGFzcz0iZXNpeC1sb2dvLWJnIiBzdHlsZT0iZmlsbC1vcGFjaXR5OjE7ZmlsbDp1cmwoI2IpO29wYWNpdHk6MSIvPgogIDxnIGZpbGw9IiNmZGZlZmEiIGNsYXNzPSJlc2l4LWxvZ28tZWFyLWJvdHRvbSI+CiAgICA8cGF0aCBkPSJNMTEwLjYgMjkuMWE0Ni42IDQ2LjYgMCAwIDEgMTQuOCA2LjZjNS40IDMuNiA5LjYgOSAxNS41IDExLjguMiA0LjQuMyA4LjcuMiAxMy4xLTQuNS0xLTkuMS0xLjgtMTMuOC0yLjYtLjUtNC40LS41LTkuMy0zLTEzLjItMS4yLTItNC4xLTEuOC01LjgtLjUtNC4zIDMtNyA3LjYtMTAgMTEuOS00LjYuMy05LjIgMS4yLTEzLjkgMS40IDQuOC05LjggMTAtMTkuNCAxNi0yOC41ek0xNzYgODRjOS41LTMuMiAxOS4yLTUuNSAyOS4yLTYuNiAzIDQuMyA2LjggOC41IDguMyAxMy43LjggNC42LjUgOS41LTEuMiAxNC0xLjIgMy42LTMgOC0uNiAxMS42LTIuNCAyLjMtNSA0LjUtNy43IDYuNi0yLjItNC40LTQuNi04LjctNy0xMyAzLjQtMy4yIDcuMi02LjUgOC4yLTExLjIuMi0yLjQtMi00LTQtNC42LTUtMS42LTEwLjUtMS0xNS43LS45LTMuMi0zLjEtNi43LTYtOS41LTkuNnoiLz4KICA8L2c+CiAgPGcgZmlsbD0iI2ZjYmYzMSIgY2xhc3M9ImVzaXgtbG9nby1lYXItdG9wIj4KICAgIDxwYXRoIGQ9Ik0xMjYuNiAxMi42YzQuMS0xLjYgOCAxLjYgOS41IDUuNGE4MS44IDgxLjggMCAwIDEgNC44IDI5LjVjLTYtMi45LTEwLTguMi0xNS41LTExLjgtNC4zLTMuMy05LjYtNS0xNC44LTYuNiA0LjMtNi4zIDguOC0xMy4xIDE2LTE2LjV6TTIwNS4yIDc3LjRjOC4xLTEgMTYuOC0xLjUgMjQuNSAxLjkgNC42IDEuOSA1LjggNy43IDMuNyAxMi00LjcgMTAuMi0xMy40IDE4LTIxLjYgMjUuNXYtLjFjLTIuNS0zLjYtLjctOCAuNS0xMS43IDEuNy00LjQgMi05LjMgMS4yLTE0LTEuNS01LjEtNS4yLTkuMy04LjMtMTMuNnoiLz4KICA8L2c+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTExMi42IDg3LjRjLTExLS4xLTIyLjEgNC4zLTI5LjQgMTIuN2E0MS4zIDQxLjMgMCAwIDAtMSA1NC44IDM3IDM3IDAgMCAwIDMwIDEyLjkgMzkgMzkgMCAwIDAgMjgtMTMuM2MtNC0zLjYtNy43LTcuNC0xMS44LTEwLjctNSA1LjctMTIuOCA4LjgtMjAuNCA3LjctOC40LS45LTE1LjItNy0xOC41LTE0LjVsNjAuNS0zLjVhMzkuNSAzOS41IDAgMCAwLTE2LjItMzkuMyAzNiAzNiAwIDAgMC0yMS4yLTYuOHptLS42IDE2YzkuMiAwIDE3LjggNi40IDIxLjIgMTQuOC0xNC44IDEtMjkuNSAxLjgtNDQuMyAyLjYgMy04LjggMTAuNy0xNi4zIDIwLjMtMTcuMSAxLS4yIDEuOS0uMiAyLjgtLjJ6IiBjbGFzcz0iZXNpeC1sb2dvLWxldHRlciIgc3R5bGU9ImZpbHRlcjp1cmwoI2MpIi8+CiAgPGcgZmlsbD0iI2ZmZiIgY2xhc3M9ImVzaXgtbG9nby1udW1iZXJzIiBzdHlsZT0iZmlsdGVyOnVybCgjYykiPgogICAgPHBhdGggZD0iTTEwMS43IDE4Ni4xYy4yLTQuMyA0LjMtNy41IDguNC03LjUgNC41LS4yIDguOSAzLjcgOC44IDguM3YyN2wtMTAuOS4ydjcuNGwuMiA3LjhoNC4xVjIxOGg2LjZ2MTcuM2gtMTcuM1YyMDhoMTAuOHYtMjMuNWgtNC4yYy0uMyA2LjQtLjEgMTIuOC0uMiAxOS4zbC02LjQtLjFjMC01LjktLjItMTEuOCAwLTE3Ljd6TTEyMy44IDE4NS40YzEuNy4xIDMuNS4yIDUuMi41IDMuNCAxIDUuNyA0LjYgNS42IDh2NDguM2gtNi41di01MC43aC00LjN2LTZ6TTg1LjMgMTg2LjZjNC43LTEuOCAxMSAuNyAxMS43IDYuMnYxOC40aC02LjZWMTkySDg2djQ1aDQuMmwuMS0xNS4zaC00LjZsLS4xLTYuMiAxMS4yLjF2Ni42Yy0uMyA1IC43IDEwLjQtLjYgMTUuNC0yLjMgNi44LTEzIDcuMS0xNiAuNS0xLjMtMi0uNy0xMC43LS44LTE2di0yNy43YzAtMy41IDIuNC02LjggNS44LTcuOHoiLz4KICA8L2c+Cjwvc3ZnPgo=",
                blocks: [
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: translate("label.converters", "Convert tools")
                    },
                    {
                        opcode: "toQuery",
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate("toQuery", "Convert [data] to query string"),
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
                        text: translate("toTag", "Convert [keywords] to tag string"),
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
                        text: translate("useApi", "Compose API path [path] with params [params]"),
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
                        blockType: Scratch.BlockType.LABEL,
                        text: translate("label.requesters", "Request SDK")
                    },
                    {
                        opcode: "list",
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate("list", "List posts with [keywords], [limit] per page, returns page [page]"),
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
                        text: translate("fetchPost", "Fetch post [id]"),
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
                        text: translate("randomPost", "Get a random post with [keywords]"),
                        arguments: {
                            keywords: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '["Von lycaon","Death (puss in boots)"]',
                            },
                        },
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: translate("label.parsers", "Parse utils")
                    },
                    {
                        opcode: "parsePostField",
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate("parsePostField", "Get [field] of (post) [data]"),
                        arguments: {
                            field: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "postFields"
                            },
                            data: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
                        }
                    },
                    {
                        opcode: "parseFileField",
                        blockType: Scratch.BlockType.REPORTER,
                        text: translate("parseFileField", "Get [field] of (file) [data]"),
                        arguments: {
                            field: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "fileFields"
                            },
                            data: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
                        }
                    }
                ],
                menus: {
                    postFields: {
                        acceptReporters: true,
                        items: [
                            {
                                text: translate("postFields.id", "ID"),
                                value: "id"
                            },
                            {
                                text: translate("postFields.create", "Create time"),
                                value: "created_at"
                            },
                            {
                                text: translate("postFields.update", "Update time"),
                                value: "updated_at"
                            },
                            {
                                text: translate("postFields.file", "File metadata"),
                                value: "file"
                            },
                            {
                                text: translate("postFields.preview", "Preview metadata"),
                                value: "preview"
                            },
                            {
                                text: translate("postFields.sample", "Sample metadata"),
                                value: "sample"
                            },
                            {
                                text: translate("postFields.score", "Score track"),
                                value: "score"
                            },
                            {
                                text: translate("postFields.tags", "Tags"),
                                value: "tags"
                            },
                            {
                                text: translate("postFields.lockedTags", "Locked tags"),
                                value: "locked_tags"
                            },
                            {
                                text: translate("postFields.change_seq", "Modify times"),
                                value: "change_seq"
                            },
                            {
                                text: translate("postFields.flags", "Flags"),
                                value: "flags"
                            },
                            {
                                text: translate("postFields.rating", "Safe level"),
                                value: "rating"
                            },
                            {
                                text: translate("postFields.fav", "Favorite count"),
                                value: "fav_count"
                            },
                            {
                                text: translate("postFields.sources", "Sources"),
                                value: "sources"
                            },
                            {
                                text: translate("postFields.pools", "Pools"),
                                value: "pools"
                            },
                            {
                                text: translate("postFields.rels", "Relationships"),
                                value: "relationships"
                            },
                            {
                                text: translate("postFields.approver", "Approver"),
                                value: "approver_id"
                            },
                            {
                                text: translate("postFields.uploader", "Uploader"),
                                value: "uploader_id"
                            },
                            {
                                text: translate("postFields.des", "Description"),
                                value: "description"
                            },
                            {
                                text: translate("postFields.commentCount", "Comment count"),
                                value: "comment_count"
                            },
                        ]
                    },
                    fileFields: {
                        acceptReporters: true,
                        items: [
                            {
                                text: translate("fileFields.width", "Width"),
                                value: "width"
                            },
                            {
                                text: translate("fileFields.height", "Height"),
                                value: "height"
                            },
                            {
                                text: translate("fileFields.ext", "Suffix"),
                                value: "ext"
                            },
                            {
                                text: translate("fileFields.size", "Size"),
                                value: "size"
                            },
                            {
                                text: translate("fileFields.mdfive", "MD5"),
                                value: "md5"
                            },
                            {
                                text: translate("fileFields.url", "URL"),
                                value: "url"
                            },
                        ]
                    }
                }
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
        /**
         * 
         * @param {{field:string,data:string}} param0 
         * @returns {string}
         */
        parsePostField({ field, data }) {
            return JSON.stringify(JSON.parse(data)[field]);
        }
        /**
         * 
         * @param {{field:string,data:string}} param0 
         */
        parseFileField({ field, data }) {
            return JSON.stringify(JSON.parse(data)[field]);
        }
    }
    Scratch.extensions.register(new E621SDK());
})(Scratch);
