//This is made by obviousAlexC and yes the account that made this pull request is his school account!
//Please give credit before using.

(function(Scratch) {
    'use strict';
    class Cookie {
    
        getInfo() {
            return {
                "id": "cookie",
                "name": "Scratch Cookies",
                "color1":'#755848',
                "color2":'#5c473b',
                "color3":'#1c1612',
                "blockIconURI": "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNTkuMTY2NjciIGhlaWdodD0iMTU5LjE2NjY3IiB2aWV3Qm94PSIwLDAsMTU5LjE2NjY3LDE1OS4xNjY2NyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE2MC40MTY2NywtMTAwLjQxNjY3KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTYzLjY2NjY3LDE4MGMwLC00Mi4xNTc3NCAzNC4xNzU2LC03Ni4zMzMzMyA3Ni4zMzMzMywtNzYuMzMzMzNjNDIuMTU3NzQsMCA3Ni4zMzMzMywzNC4xNzU2IDc2LjMzMzMzLDc2LjMzMzMzYzAsNDIuMTU3NzQgLTM0LjE3NTYsNzYuMzMzMzMgLTc2LjMzMzMzLDc2LjMzMzMzYy00Mi4xNTc3NCwwIC03Ni4zMzMzMywtMzQuMTc1NiAtNzYuMzMzMzMsLTc2LjMzMzMzeiIgZmlsbD0iIzliNzc2MiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjYuNSIvPjxwYXRoIGQ9Ik0yMjAuODE4MjEsMTM5LjA3MDdjLTIuMTAxMDksLTUuMDMzODYgLTkuMTE0MjQsLTYuODk4MyAtMTUuNjY0MzIsLTQuMTY0MzZjLTYuNTUwMDgsMi43MzM5NCAtMTAuMTU2Nyw5LjAzMDk5IC04LjA1NTYxLDE0LjA2NDg1YzEuMzQzMjksMy4yMTgyOSAzLjYxNTMsNi44ODA5NiA3LjU2OTQ5LDcuMTM0ODljMi4yMzA3MSwwLjE0MzI1IDUuNzMyNDIsLTEuOTg0NDcgOC4wOTQ4NCwtMi45NzA1M2M2LjU1MDA4LC0yLjczMzk0IDEwLjE1NjcsLTkuMDMwOTkgOC4wNTU2MSwtMTQuMDY0ODV6IiBmaWxsPSIjMzgzMjMwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNjkuNTQyNDgsMTUxLjUxNDEyYzUuMDcyNjMsLTIuMDA1NjYgNy4wNjkxNywtOC45ODIzNyA0LjQ1OTM5LC0xNS41ODI5Yy0yLjYwOTc4LC02LjYwMDUzIC04LjgzNzYxLC0xMC4zMjU0MSAtMTMuOTEwMjQsLTguMzE5NzVjLTMuMjQzMDgsMS4yODIyOCAtNi45NDgsMy40ODQ3MyAtNy4yNzY1NCw3LjQzMzQyYy0wLjE4NTM0LDIuMjI3NjEgMS44NzU4OCw1Ljc2ODg2IDIuODE3MTUsOC4xNDk0OGMyLjYwOTc4LDYuNjAwNTMgOC44Mzc2MSwxMC4zMjU0MSAxMy45MTAyNCw4LjMxOTc1eiIgZmlsbD0iIzM4MzIzMCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjM0LjQzMTYzLDE4Ni45ODk1MmM1LjM2OTc1LDAuOTU5MiAxMC43MzQ2LC0zLjkyNzQyIDExLjk4MjcxLC0xMC45MTQ1NmMxLjI0ODEyLC02Ljk4NzE1IC0yLjA5MzEzLC0xMy40Mjg5MyAtNy40NjI4OCwtMTQuMzg4MTNjLTMuNDMzMDQsLTAuNjEzMjUgLTcuNzQyNTUsLTAuNjg2MyAtMTAuMDk3MDcsMi41MDA2Yy0xLjMyODI4LDEuNzk3ODUgLTEuNDM1NDksNS44OTM5IC0xLjg4NTY0LDguNDEzOTZjLTEuMjQ4MTIsNi45ODcxNSAyLjA5MzEzLDEzLjQyODk0IDcuNDYyODgsMTQuMzg4MTR6IiBmaWxsPSIjMzgzMjMwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yODQuNTkxNjgsMTc0LjgwODU1Yy0zLjgyMTA0LC0zLjg5MjgxIC0xMS4wMjQ4OCwtMy4wMTc5OSAtMTYuMDkwMjIsMS45NTM5N2MtNS4wNjUzNCw0Ljk3MTk1IC02LjA3NDA0LDEyLjE1ODI2IC0yLjI1MzAxLDE2LjA1MTA3YzIuNDQyOSwyLjQ4ODc5IDUuOTEzMTYsNS4wNDUwNiA5LjY3ODYxLDMuODExNmMyLjEyNDI0LC0wLjY5NTg0IDQuNTg0NjksLTMuOTcyMzMgNi40MTE2LC01Ljc2NTU2YzUuMDY1MzQsLTQuOTcxOTUgNi4wNzQwNSwtMTIuMTU4MjYgMi4yNTMwMSwtMTYuMDUxMDd6IiBmaWxsPSIjMzgzMjMwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNzcuMjEwNjIsMjIwLjY4NDk4YzAuMTIwNDcsLTUuNDUzNDIgLTUuNTM0MzIsLTEwLjAwMTM4IC0xMi42MzAzMywtMTAuMTU4MTRjLTcuMDk2MDIsLTAuMTU2NzYgLTEyLjk0NjE0LDQuMTM3MDIgLTEzLjA2NjYxLDkuNTkwNDRjLTAuMDc3MDIsMy40ODY1MyAwLjUxNDcyLDcuNzU1ODUgNC4wMjYzMiw5LjU5MTI4YzEuOTgxMDMsMS4wMzU0NCA2LjA0NDY5LDAuNTEwMzIgOC42MDQwMSwwLjU2Njg2YzcuMDk2MDIsMC4xNTY3NiAxMi45NDYxNCwtNC4xMzcwMiAxMy4wNjY2MSwtOS41OTA0NHoiIGZpbGw9IiMzODMyMzAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIyNy42MDk3OSwyMzAuNTA2MjNjNC45ODU4NywtMi4yMTI1NiA2LjY5Mzg1LC05LjI2NTQ2IDMuODE0ODYsLTE1Ljc1MzA5Yy0yLjg3ODk4LC02LjQ4NzY0IC05LjI1NDcxLC05Ljk1MzI4IC0xNC4yNDA1OCwtNy43NDA3MmMtMy4xODc2MSwxLjQxNDU1IC02Ljc5ODg0LDMuNzY3NDkgLTYuOTY0NzMsNy43MjYzNGMtMC4wOTM1OSwyLjIzMzM1IDIuMTExNTEsNS42ODY4NSAzLjE0OTg3LDguMDI2NzVjMi44Nzg5OCw2LjQ4NzY0IDkuMjU0Nyw5Ljk1MzI4IDE0LjI0MDU3LDcuNzQwNzJ6IiBmaWxsPSIjMzgzMjMwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0xNzcuMDIwNDgsMTg0LjY1MDQ2YzEuMDA2MzMsNS4zNjExMiA3LjQ3NzIyLDguNjQ1NjYgMTQuNDUzMTQsNy4zMzYyMWM2Ljk3NTkxLC0xLjMwOTQ0IDExLjgxNTIxLC02LjcxNyAxMC44MDg4OCwtMTIuMDc4MTJjLTAuNjQzMzgsLTMuNDI3NTIgLTIuMTAyNTQsLTcuNDgzMTUgLTUuOTE3MDcsLTguNTU1MjRjLTIuMTUxOTMsLTAuNjA0ODEgLTYuMDIwMDYsMC43NDY3NSAtOC41MzYwNiwxLjIxOTAzYy02Ljk3NTkxLDEuMzA5NDQgLTExLjgxNTIxLDYuNzE2OTkgLTEwLjgwODg4LDEyLjA3ODExeiIgZmlsbD0iIzM4MzIzMCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo3OS41ODMzMzMzMzMzMzMzNDo3OS41ODMzMzMzMzMzMzMzNC0tPg==",
                "blocks": [
                        {
                            "opcode": "makecookie",
                            "blockType": "command",
                            "text": "Make cookie of name [b] with value of [v] and an expiration date of [e] (in UTC time)",
                            "arguments": {
                                "b": {
                                    "type": "string",
                                    "defaultValue": "Cookie Name"
                                },
                                "v": {
                                    "type": "string",
                                    "defaultValue": "Cookie Value"
                                },
                                "e": {
                                    "type": "string",
                                    "defaultValue": "Expiration date"
                                }
                            }                 
                        },
                        {
                            "opcode": "makecookiepath",
                            "blockType": "command",
                            "text": "Make cookie of name [b] with value of [v] and an expiration date of [e] (in UTC time) and a path of [p]",
                            "arguments": {
                                "b": {
                                    "type": "string",
                                    "defaultValue": "Cookie Name"
                                },
                                "v": {
                                    "type": "string",
                                    "defaultValue": "Cookie Value"
                                },
                                "e": {
                                    "type": "string",
                                    "defaultValue": "Expiration date"
                                },
                                "p": {
                                    "type": "string",
                                    "defaultValue": "path"
                                }
                            }                  
                        },
                        {
                            "opcode": "readcookieofname",
                            "blockType": "reporter",
                            "text": "read cookie by the name of [c]",
                            "arguments": {
                                "c": {
                                    "type": "string",
                                    "defaultValue": "Cookie Name"
                                }
                            }                  
                        },
                        {
                            "opcode": "doescookieexist",
                            "blockType": "Boolean",
                            "text": "does cookie by the name of [c] exist?",
                            "arguments": {
                                "c": {
                                    "type": "string",
                                    "defaultValue": "Cookie Name"
                                }
                            }                  
                        },
                        {
                            "opcode": "delcookie",
                            "blockType": "command",
                            "text": "Delete cookie of name [b] and the path of [p]",
                            "arguments": {
                                "b": {
                                    "type": "string",
                                    "defaultValue": "Cookie Name"
                                },
                                "p": {
                                    "type": "string",
                                    "defaultValue": "Cookie Path"
                                }
                            }                 
                        }       
                ],           
            };
        }
        
        makecookie({b,v,e}) {
            return document.cookie = "CookieExtensionScratch"+b + "=" + v + "; expires=" + e;
        }
    
        makecookiepath({b,v,e,p}) {
            return document.cookie = "CookieExtensionScratch"+b + "=" + v + "; expires=" + e + "; path=/" + p;
        }
    
        readcookieofname({c}) {
            let name = "CookieExtensionScratch"+c + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let ck = ca[i];
                while (ck.charAt(0) == ' ') {
                ck = ck.substring(1);
                }
                if (ck.indexOf(name) == 0) {
                return ck.substring(name.length, ck.length);
                }
            }
            return "Cookie not found";
        }
    
        doescookieexist({c}) {
            let name = "CookieExtensionScratch"+c + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let ck = ca[i];
                while (ck.charAt(0) == ' ') {
                ck = ck.substring(1);
                }
                if (ck.indexOf(name) == 0) {
                return "true"
                }
            }
            return "false"
        }
        delcookie({b,p}) {
            return document.cookie = "CookieExtensionScratch"+b + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/" + p;
        }
    }

    class LocalStorageEX {
    
        getInfo() {
            return {
                "id": "localstore",
                "name": "Local Storage",
                "color1":'#5cc4ba',
                "color2":'#4da39b',
                "color3":'#3d8079',
                "blockIconURI": "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1NS4wMjg1OCIgaGVpZ2h0PSI0Ni40NTg4NiIgdmlld0JveD0iMCwwLDU1LjAyODU4LDQ2LjQ1ODg2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjEyLjQ4NTcxLC0xNTYuNzcwNTcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48Zz48cGF0aCBkPSJNMjEyLjc2MjA3LDE4NC44NjMwMWMwLC0zLjE0NzIzIDAsLTguNDMzODcgMCwtMTAuMTUyNzJjMCwtMS4wNjU5MSAxLjE3OTc1LC0yLjI3OTM3IDIuNTkzMDUsLTIuMjc5MzdjMy45MTkwOSwwIDQ2Ljk0NDI5LDAgNDkuNjI3NjEsMGMxLjU0OTIyLDAgMi40Mzk0NCwxLjQ3OTg5IDIuNDM5NDQsMi43MDUzNmMwLDEuNzU5NjkgMCw2LjcxMzYxIDAsOS43MjY3M2MwLDEuNDM0OTMgLTAuOTE3NDQsMi40Mjk3MSAtMi41MTA0NCwyLjQyOTcxYy05LjY1NDIxLDAgLTQ0LjEyMDU2LDAgLTQ5LjU1NjYxLDBjLTEuNDEzMywwIC0yLjU5MzA1LC0wLjk5MTQ2IC0yLjU5MzA1LC0yLjQyOTcxek0yNTkuODY5MzIsMTg2LjA2ODU2YzMuNDIwMjksMCA2LjE5Mjk4LC0yLjc3MjY5IDYuMTkyOTgsLTYuMTkyOThjMCwtMy40MjAyOSAtMi43NzI2OSwtNi4xOTI5OCAtNi4xOTI5OCwtNi4xOTI5OGMtMy40MjAyOSwwIC02LjE5Mjk4LDIuNzcyNjkgLTYuMTkyOTgsNi4xOTI5OGMwLDMuNDIwMjkgMi43NzI2OSw2LjE5Mjk4IDYuMTkyOTgsNi4xOTI5OHpNMjQ2LjYwNDA4LDE4Ni4wNjg1NmMzLjQyMDI5LDAgNi4xOTI5OCwtMi43NzI2OSA2LjE5Mjk4LC02LjE5Mjk4YzAsLTMuNDIwMjkgLTIuNzcyNjksLTYuMTkyOTggLTYuMTkyOTgsLTYuMTkyOThjLTMuNDIwMjksMCAtNi4xOTI5OCwyLjc3MjY5IC02LjE5Mjk4LDYuMTkyOThjMCwzLjQyMDI5IDIuNzcyNjksNi4xOTI5OCA2LjE5Mjk4LDYuMTkyOTh6Ii8+PHBhdGggZD0iTTIxMi44NTQxOSwyMDAuNzk5NzJjMCwtMy4xNDcyMyAwLC04LjQzMzg3IDAsLTEwLjE1MjcyYzAsLTEuMDY1OSAxLjE3OTc1LC0yLjI3OTM3IDIuNTkzMDYsLTIuMjc5MzdjMy45MTkwOSwwIDQ2Ljk0NDI5LDAgNDkuNjI3NjEsMGMxLjU0OTIyLDAgMi40Mzk0NCwxLjQ3OTg5IDIuNDM5NDQsMi43MDUzNmMwLDEuNzU5NjkgMCw2LjcxMzYxIDAsOS43MjY3M2MwLDEuNDM0OTMgLTAuOTE3NDQsMi40Mjk3MSAtMi41MTA0NCwyLjQyOTcxYy05LjY1NDIxLDAgLTQ0LjEyMDU2LDAgLTQ5LjU1NjYxLDBjLTEuNDEzMzEsMCAtMi41OTMwNiwtMC45OTE0NiAtMi41OTMwNiwtMi40Mjk3MXpNMjU5Ljk2MTQ0LDIwMi4wMDUyN2MzLjQyMDI5LDAgNi4xOTI5OCwtMi43NzI2OSA2LjE5Mjk4LC02LjE5Mjk4YzAsLTMuNDIwMjkgLTIuNzcyNjksLTYuMTkyOTggLTYuMTkyOTgsLTYuMTkyOThjLTMuNDIwMjksMCAtNi4xOTI5OCwyLjc3MjY5IC02LjE5Mjk4LDYuMTkyOThjMCwzLjQyMDI5IDIuNzcyNjksNi4xOTI5OCA2LjE5Mjk4LDYuMTkyOTh6Ii8+PHBhdGggZD0iTTIxMi40ODU3MSwxNjkuMjAyNjZjMCwtMy4xNDcyMyAwLC04LjQzMzg3IDAsLTEwLjE1MjcyYzAsLTEuMDY1OSAxLjE3OTc1LC0yLjI3OTM3IDIuNTkzMDYsLTIuMjc5MzdjMy45MTkwOSwwIDQ2Ljk0NDI5LDAgNDkuNjI3NjEsMGMxLjU0OTIyLDAgMi40Mzk0NCwxLjQ3OTg5IDIuNDM5NDQsMi43MDUzNmMwLDEuNzU5NjkgMCw2LjcxMzYxIDAsOS43MjY3M2MwLDEuNDM0OTMgLTAuOTE3NDQsMi40Mjk3MSAtMi41MTA0NCwyLjQyOTcxYy05LjY1NDIxLDAgLTQ0LjEyMDU2LDAgLTQ5LjU1NjYxLDBjLTEuNDEzMzEsMCAtMi41OTMwNiwtMC45OTE0NiAtMi41OTMwNiwtMi40Mjk3MXpNMjMyLjk3MDM2LDE3MC44Njg4YzMuNDIwMjksMCA2LjE5Mjk4LC0yLjc3MjY5IDYuMTkyOTgsLTYuMTkyOThjMCwtMy40MjAyOSAtMi43NzI2OSwtNi4xOTI5OCAtNi4xOTI5OCwtNi4xOTI5OGMtMy40MjAyOSwwIC02LjE5Mjk4LDIuNzcyNjkgLTYuMTkyOTgsNi4xOTI5OGMwLDMuNDIwMjkgMi43NzI2OSw2LjE5Mjk4IDYuMTkyOTgsNi4xOTI5OHpNMjQ2LjMyNzcyLDE3MC40MDgyMWMzLjQyMDI5LDAgNi4xOTI5OCwtMi43NzI2OSA2LjE5Mjk4LC02LjE5Mjk4YzAsLTMuNDIwMjkgLTIuNzcyNjksLTYuMTkyOTggLTYuMTkyOTgsLTYuMTkyOThjLTMuNDIwMjksMCAtNi4xOTI5OCwyLjc3MjY5IC02LjE5Mjk4LDYuMTkyOThjMCwzLjQyMDI5IDIuNzcyNjksNi4xOTI5OCA2LjE5Mjk4LDYuMTkyOTh6TTI1OS41OTI5NiwxNzAuNDA4MjFjMy40MjAyOSwwIDYuMTkyOTgsLTIuNzcyNjkgNi4xOTI5OCwtNi4xOTI5OGMwLC0zLjQyMDI5IC0yLjc3MjY5LC02LjE5Mjk4IC02LjE5Mjk4LC02LjE5Mjk4Yy0zLjQyMDI5LDAgLTYuMTkyOTgsMi43NzI2OSAtNi4xOTI5OCw2LjE5Mjk4YzAsMy40MjAyOSAyLjc3MjY5LDYuMTkyOTggNi4xOTI5OCw2LjE5Mjk4eiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==",
                "blocks": [
                        {
                            "opcode": "lssetitem",
                            "blockType": "command",
                            "text": "Local storage set item of name [i] to [v]",
                            "arguments": {
                                "i": {
                                    "type": "string",
                                    "defaultValue": "Item Name"
                                },
                                "v": {
                                    "type": "string",
                                    "defaultValue": "Item Value"
                                }
                            }                 
                        },
                        {
                            "opcode": "lsgetitem",
                            "blockType": "reporter",
                            "text": "Local Storage get item of name [n]",
                            "arguments": {
                                "n": {
                                    "type": "string",
                                    "defaultValue": "Item Name"
                                }
                            }                  
                        },
                        {
                            "opcode": "lsdoesitemexist",
                            "blockType": "Boolean",
                            "text": "does item [i] exist in the Local Storage?",
                            "arguments": {
                                "i": {
                                    "type": "string",
                                    "defaultValue": "Item Name"
                                }
                            }                  
                        },
                        {
                            "opcode": "lsremoveitem",
                            "blockType": "command",
                            "text": "Local Storage remove item [i]",
                            "arguments": {
                                "i": {
                                    "type": "string",
                                    "defaultValue": "Item Name"
                                }
                            }                  
                        },
                        {
                            "opcode": "lslength",
                            "blockType": "reporter",
                            "text": "Length of Local Storage",
                            "arguments": {
                            }                  
                        }
                ],           
            };
        }
        //Local Storage Update :)
        lssetitem({i,v}) {
            return localStorage.setItem("LocalStorageExtension-Scratch-"+i, v);
        }
        lsgetitem({n}) {
            return localStorage.getItem("LocalStorageExtension-Scratch-"+n)
        }
        lsremoveitem({i}) {
            return localStorage.removeItem("LocalStorageExtension-Scratch-"+i);
        }
        lsdoesitemexist({i}) {
            let name = localStorage.getItem("LocalStorageExtension-Scratch-"+i);
    
            if(name){
                return true;
            }else{
                return false;
            }
        }
        lslength({}) {
            return localStorage.length;
        }
    }


    Scratch.extensions.register(new Cookie());
    Scratch.extensions.register(new LocalStorageEX());
  })(Scratch);
