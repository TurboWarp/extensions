(function (Scratch) {
    "use strict";
    if (!Scratch.extensions.unsandboxed) {
        throw new Error("不行，必须跑非沙盒。");
    }
    const SHANGCLOUD_ORIGIN = "https://api.yearnstudio.cn";
    let client_id = "";
    let client_id_verified = false;
    let accessToken = "";
    let refreshToken = "";
    let uid = 0;
    let nickname = "";
    class ShangCloudExtension {
        getInfo() {
            return {
                id: "shangcloud",
                name: "ShangCloud 云变量",
                color1: "#4CAF50",
                color2: "#388E3C",
                blocks: [
                    {
                        opcode: "setClientID",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "设置应用ID [CLIENT_ID]",
                        arguments: {
                            CLIENT_ID: { type: Scratch.ArgumentType.STRING, default: "" },
                        },
                    },
                    {
                        opcode: "verifyClientID",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "应用ID是否正确",
                        arguments: {},
                    },
                    {
                        opcode: "tryLogin",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "尝试获取用户授权并等待",
                        arguments: {
                            CLIENT_ID: { type: Scratch.ArgumentType.STRING, default: "" },
                        },
                    },
                    {
                        opcode: "loginStatusBool",
                        blockType: Scratch.BlockType.BOOLEAN,
                        disableMonitor: true,
                        text: "用户是否授权",
                    },
                    {
                        opcode: "isTokenValid",
                        blockType: Scratch.BlockType.BOOLEAN,
                        disableMonitor: true,
                        text: "登录令牌是否在有效期内？",
                        arguments: {},
                    },
                    {
                        opcode: "refreshToken",
                        blockType: Scratch.BlockType.BOOLEAN,
                        disableMonitor: true,
                        text: "刷新登录令牌",
                        arguments: {},
                    },

                    "---",

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "快速获取用户信息"
                    },
                    {
                        opcode: "getUserInfo",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "获取访问用户信息",
                        arguments: {
                            CLIENT_ID: { type: Scratch.ArgumentType.STRING, default: "" },
                        },
                    },
                    {
                        opcode: "userUid",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "访问用户ID",
                    },
                    {
                        opcode: "userNickname",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "访问用户昵称",
                    },

                    "---",

                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "云变量操作"
                    },
                    {
                        opcode: "writeVar",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "给云变量 [KEY] 赋值 [VALUE]",
                        arguments: {
                            KEY: { type: Scratch.ArgumentType.STRING, default: "temp" },
                            VALUE: { type: Scratch.ArgumentType.STRING, default: "1" },
                        },
                    },
                    {
                        opcode: "getVar",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "读取云变量 [KEY] 的值",
                        arguments: {
                            KEY: { type: Scratch.ArgumentType.STRING, default: "temp" },
                        },
                    },
                    {
                        opcode: "delVar",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "删除云变量 [KEY]",
                        arguments: {
                            KEY: { type: Scratch.ArgumentType.STRING, default: "temp" },
                        },
                    },
                ],
            };
        }
        loginStatusBool() {
            return accessToken ? true : false;
        }
        userUid() {
            return uid || "";
        }
        userNickname() {
            return nickname || "";
        }
        async isTokenValid() {
            if (!client_id_verified) {
                return false;
            }
            if (!accessToken) return false;
            try {
                const res = await fetch(SHANGCLOUD_ORIGIN + "/api/token/test", {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                });
                if (res.status === 200) {
                    const data = await res.json();
                    if (data.msg === "ok" || data.msg === "OK") {
                        return true;
                    }
                }
                return false;
            } catch (error) {
                return false;
            }
        }
        async delVar(args) {
            if (!accessToken) return;
            const key = args.KEY;
            await fetch(SHANGCLOUD_ORIGIN + "/api/var/" + key, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
        async getVar(args) {
            if (!accessToken) return;
            const key = args.KEY;
            const res = await fetch(SHANGCLOUD_ORIGIN + "/api/var/" + key, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            const data = await res.json();
            if (data.msg === "success") {
                return data.data.value;
            }
            return "";
        }
        async writeVar(args) {
            if (!accessToken) return;
            const key = args.KEY;
            const value = args.VALUE;
            const params = new URLSearchParams();
            params.append("value", value);
            await fetch(SHANGCLOUD_ORIGIN + "/api/var/" + key, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Bearer " + accessToken,
                },
                body: params,
            });
        }
        async setClientID(args) {
            let temp_client_id = args.CLIENT_ID;
            if (Scratch.vm.runtime.scratchblocks) {
                client_id = temp_client_id;
                return true;
            }
            let params = new URLSearchParams();
            params.append("client_id", temp_client_id);
            const res = await fetch(SHANGCLOUD_ORIGIN + "/api/verify/client_id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: params,
                credentials: "include",
            });
            const data = await res.json();
            if (data.code === 200) {
                client_id_verified = true;
                client_id = temp_client_id;
                return true;
            }
            return false;
        }
        tryLogin() {
            return new Promise(resolve => {
                if (!client_id) {
                    alert("请先填写应用ID");
                    return;
                }
                const loginWindow = window.open(
                    SHANGCLOUD_ORIGIN +
                    "/auth/window?ui=1&client_id=" +
                    encodeURIComponent(client_id) +
                    "&origin=" +
                    encodeURIComponent(location.origin) +
                    "&scope=user:basic%20var:io",
                    "loginWindow",
                    "width=600,height=400"
                );
                window.addEventListener("message", function (event) {
                    if (event.origin !== SHANGCLOUD_ORIGIN) {
                        return resolve(false);
                    }
                    if (event.data.type === "login-success") {
                        const { token } = event.data.payload;
                        let token_json = JSON.parse(token);
                        if (token_json) {
                            accessToken = token_json.access_token;
                        }
                        if (token_json.refresh_token) {
                            refreshToken = token_json.refresh_token;
                        }
                        loginWindow.close();
                        resolve(true);
                    }
                });
            });
        }
        async refreshToken() {
            if (!refreshToken) return false;
            let param = new URLSearchParams();
            param.append("client_id", client_id);
            param.append("refresh_token", refreshToken);
            const res = await fetch(SHANGCLOUD_ORIGIN + "/oauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: param,
                credentials: "include",
            });
            const data = await res.json();
            if (data) {
                accessToken = data.access_token;
                refreshToken = data.refresh_token;
                return true;
            }
            return false;
        }
        async getUserInfo() {
            const res = await fetch(SHANGCLOUD_ORIGIN + "/api/info/me", { method: "POST", credentials: "include" });
            const data = await res.json();
            if (!data.data) {
                return;
            }
            uid = data.data.uid;
            nickname = data.data.nickname;
        }
        verifyClientID() {
            return !!client_id;
        }
    }
    Scratch.extensions.register(new ShangCloudExtension());
})(Scratch); //eslint-disable-line
