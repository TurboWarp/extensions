// Name: FirebaseDB
// ID: firebasedb
// Description: Extension for online, password-protected Firebase database storage.
// By: Logise <https://scratch.mit.edu/users/Logise/>
// Original: FirebaseDB
// License: MPL-2.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed)
    throw new Error("FirebaseDB must run unsandboxed");
  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMDguMDY5MzUiIGhlaWdodD0iMjA4LjA2OTM1IiB2aWV3Qm94PSIwLDAsMjA4LjA2OTM1LDIwOC4wNjkzNSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNS45NjUzMiwtNzUuOTY1MzMpIj48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTIxNS45NjUzMywxODBjMCwtNTcuNDU2NzYgNDYuNTc3OTEsLTEwNC4wMzQ2NyAxMDQuMDM0NjgsLTEwNC4wMzQ2N2M1Ny40NTY3NywwIDEwNC4wMzQ2OCw0Ni41Nzc5MSAxMDQuMDM0NjgsMTA0LjAzNDY4YzAsNTcuNDU2NzYgLTQ2LjU3NzkxLDEwNC4wMzQ2OCAtMTA0LjAzNDY3LDEwNC4wMzQ2OGMtNTcuNDU2NzcsMCAtMTA0LjAzNDY3LC00Ni41Nzc5MSAtMTA0LjAzNDY3LC0xMDQuMDM0Njd6IiBmaWxsPSIjZmVhNjMxIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjc1LjE0NjI0LDE4Ni4yMDEwNGMwLjE3ODQ3LC0wLjAwMDUgMC4zNTY5NCwtMC4wMDA5OCAwLjU0MDgyLC0wLjAwMTQ5YzAuNTk4NDYsLTAuMDAxMzYgMS4xOTY5MiwtMC4wMDEwMSAxLjc5NTM4LC0wLjAwMDY3YzAuNDMzMjYsLTAuMDAwNjIgMC44NjY1MiwtMC4wMDEzNCAxLjI5OTc4LC0wLjAwMjE2YzEuMTkxMDMsLTAuMDAxOTQgMi4zODIwNSwtMC4wMDIzNyAzLjU3MzA4LC0wLjAwMjU1YzEuMjg0NDIsLTAuMDAwNDUgMi41Njg4NSwtMC4wMDIyNiAzLjg1MzI4LC0wLjAwMzg4YzIuODA4OTYsLTAuMDAzMjYgNS42MTc5MiwtMC4wMDQ3MSA4LjQyNjg4LC0wLjAwNTc3YzEuNzU0MywtMC4wMDA2NiAzLjUwODYsLTAuMDAxNjkgNS4yNjI5LC0wLjAwMjc3YzQuODU4MDcsLTAuMDAyOTMgOS43MTYxNCwtMC4wMDU0MSAxNC41NzQyMSwtMC4wMDYyMmMwLjMxMDkyLC0wLjAwMDA2IDAuNjIxODUsLTAuMDAwMSAwLjk0MjE5LC0wLjAwMDE2YzAuMzExNjcsLTAuMDAwMDYgMC42MjMzMywtMC4wMDAxIDAuOTQ0NDQsLTAuMDAwMTZjMC42MzE1NCwtMC4wMDAxIDEuMjYzMDgsLTAuMDAwMjEgMS44OTQ2MiwtMC4wMDAzMmMwLjMxMzI3LC0wLjAwMDA2IDAuNjI2NTMsLTAuMDAwMSAwLjk0OTI5LC0wLjAwMDE2YzUuMDc0MzQsLTAuMDAwOTUgMTAuMTQ4NjYsLTAuMDA1MTUgMTUuMjIzLC0wLjAxMDc1YzUuMjEwOTgsLTAuMDA1NzEgMTAuNDIxOTQsLTAuMDA4NjkgMTUuNjMyOTMsLTAuMDA4OTdjMi45MjUyNSwtMC4wMDAyMiA1Ljg1MDUsLTAuMDAxNiA4Ljc3NTc2LC0wLjAwNTk3YzIuNDkxMzMsLTAuMDAzNyA0Ljk4MjY0LC0wLjAwNDkzIDcuNDczOTcsLTAuMDAyOTVjMS4yNzA0NywwLjAwMDk0IDIuNTQwOTMsMC4wMDA3MiAzLjgxMTQsLTAuMDAyNjZjMS4xNjQ2OSwtMC4wMDMwNyAyLjMyOTMxLC0wLjAwMjc3IDMuNDk0LDAuMDAwMTRjMC40MTk3NSwwLjAwMDQ3IDAuODM5NSwtMC4wMDAyNiAxLjI1OTI1LC0wLjAwMjM2YzQuNjU3MjYsLTAuMDIxODUgOC44OTI1NiwwLjY5Mzc4IDEyLjM4ODc4LDQuMDY5MjNjMi4yOTkzNiwyLjU4MjY3IDMuMDM5OTUsNC45ODc0MyAzLjAyNzY2LDguMzc0MThjMC4wMDEzNywwLjMyMjEzIDAuMDAzMDUsMC42NDQyNSAwLjAwNSwwLjk2NjM4YzAuMDA0MywwLjg3MDQ4IDAuMDA0MDMsMS43NDA5IDAuMDAyNjYsMi42MTEzOWMtMC4wMDA3NCwwLjcyOTQ4IDAuMDAwNzIsMS40NTg5NCAwLjAwMjE3LDIuMTg4NDFjMC4wMDMzNywxLjcyMzE1IDAuMDAzMDEsMy40NDYyOCAwLjAwMDI3LDUuMTY5NDNjLTAuMDAyNzUsMS43NzA0MyAwLjAwMDYxLDMuNTQwNzcgMC4wMDcwNyw1LjMxMTE5YzAuMDA1MzUsMS41MjU5IDAuMDA2OTEsMy4wNTE3NyAwLjAwNTUxLDQuNTc3NjljLTAuMDAwODEsMC45MDg3MiAtMC4wMDAyNiwxLjgxNzM3IDAuMDAzOTEsMi43MjYwOGMwLjAwMzc2LDAuODU2MDIgMC4wMDI3MiwxLjcxMTkxIC0wLjAwMTc2LDIuNTY3OTFjLTAuMDAxMjksMC40NTg1NiAwLjAwMjEsMC45MTcxMyAwLjAwNTcsMS4zNzU2N2MtMC4wMzE3MiwzLjc2NTQxIC0xLjMwNDM4LDcuMTM1MDYgLTMuODk4ODIsOS44NjYyOGMtMy4zMzE5MSwzLjI0MjAxIC03LjA3ODEsMy43NDA2NiAtMTEuNTMxMzYsMy43MzM3NGMtMC40MzQ1MywwLjAwMTA3IC0wLjg2OTA3LDAuMDAyMzUgLTEuMzAzNiwwLjAwMzgyYy0xLjE5MTIxLDAuMDAzNCAtMi4zODI0MSwwLjAwMzggLTMuNTczNjMsMC4wMDM3Yy0xLjI4NTksMC4wMDAzOSAtMi41NzE4LDAuMDAzNTQgLTMuODU3NjksMC4wMDYzYy0yLjgxMDQ0LDAuMDA1NDkgLTUuNjIwODgsMC4wMDc0IC04LjQzMTMyLDAuMDA4NjFjLTEuNzU1OCwwLjAwMDc5IC0zLjUxMTU5LDAuMDAyMzUgLTUuMjY3MzksMC4wMDQwOWMtNC44NjQwOCwwLjAwNDcxIC05LjcyODE2LDAuMDA4NjUgLTE0LjU5MjI1LDAuMDA5MzRjLTAuNDY2NywwLjAwMDA3IC0wLjQ2NjY5LDAuMDAwMDcgLTAuOTQyODEsMC4wMDAxNGMtMC42MzA3LDAuMDAwMDkgLTEuMjYxNCwwLjAwMDE4IC0xLjg5MjEsMC4wMDAyN2MtMC40Njk2LDAuMDAwMDcgLTAuNDY5NiwwLjAwMDA3IC0wLjk0ODY5LDAuMDAwMTRjLTAuNDcwMTcsMC4wMDAwNyAtMC40NzAxOCwwLjAwMDA3IC0wLjk0OTg1LDAuMDAwMTNjLTUuMDc3ODYsMC4wMDA4NSAtMTAuMTU1NywwLjAwNzM1IC0xNS4yMzM1NSwwLjAxNjM0Yy01LjIxNjk4LDAuMDA5MTYgLTEwLjQzMzk0LDAuMDEzODEgLTE1LjY1MDkzLDAuMDEzODhjLTIuOTI3NjksMC4wMDAxNCAtNS44NTUzNCwwLjAwMjE3IC04Ljc4MzAzLDAuMDA5MTRjLTIuNDkzMTUsMC4wMDU5IC00Ljk4NjI3LDAuMDA3NjQgLTcuNDc5NDIsMC4wMDQwM2MtMS4yNzEwNSwtMC4wMDE3MiAtMi41NDIwMSwtMC4wMDE1MyAtMy44MTMwNSwwLjAwMzk0Yy0xLjE2NTc1LDAuMDA0OTggLTIuMzMxMzYsMC4wMDQzMSAtMy40OTcxLC0wLjAwMDY5Yy0wLjQxOTU4LC0wLjAwMDgzIC0wLjgzOTE3LDAuMDAwMzIgLTEuMjU4NzQsMC4wMDM3N2MtNC4xODkxNCwwLjAzMjI2IC03LjY3MzUxLC0wLjc2MzE1IC0xMC44MTgxMSwtMy43MzcxYy0yLjY5NDQzLC0yLjg1ODQ0IC0zLjQ3MzgsLTYuMjA4NjkgLTMuNDU5NzEsLTEwLjAyOThjLTAuMDAxNjUsLTAuMzE2NjcgLTAuMDAzMywtMC42MzMzNCAtMC4wMDUsLTAuOTU5NmMtMC4wMDQyOCwtMC44NjEgLTAuMDA0MDQsLTEuNzIxOTQgLTAuMDAyNjYsLTIuNTgyOTRjMC4wMDA3NSwtMC43MjIzNCAtMC4wMDA3MywtMS40NDQ2NyAtMC4wMDIxOCwtMi4xNjcwMWMtMC4wMDMzNiwtMS43MDU5OCAtMC4wMDMwMSwtMy40MTE5NCAtMC4wMDAyNiwtNS4xMTc5M2MwLjAwMjc2LC0xLjc1MiAtMC4wMDA2MywtMy41MDM5MiAtMC4wMDcwNywtNS4yNTU5MmMtMC4wMDUzNSwtMS41MTE2MiAtMC4wMDY5MiwtMy4wMjMyMiAtMC4wMDU1MiwtNC41MzQ4NWMwLjAwMDgxLC0wLjg5OTU2IDAuMDAwMjcsLTEuNzk5MDcgLTAuMDAzOSwtMi42OTg2M2MtMC4wMDM3NiwtMC44NDY3NSAtMC4wMDI3MywtMS42OTMzNyAwLjAwMTc2LC0yLjU0MDEyYzAuMDAxMjksLTAuNDUzMzkgLTAuMDAyMDksLTAuOTA2NzkgLTAuMDA1NywtMS4zNjAxNmMwLjAzMDMzLC0zLjU2MDggMS4yMTk2NSwtNi44NTEyMSAzLjczNDQ1LC05LjQyMzE2YzIuNTI0MjYsLTIuMDQ2OTQgNS4wNDYzOCwtMy4xNjU5MiA4LjMwNTA5LC0zLjE1NzQ3eiIgZmlsbD0iI2E0NGMxNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTMwNi4wNzk4MSwxMTguMDE5NTljMC41NTM5OSwwLjQ0Njg1IDEuMDk4MTIsMC45MDM4OCAxLjYzODA3LDEuMzY3NTdjMC4xMzQyMSwwLjExNTA0IDAuMjY4NDMsMC4yMzAwNiAwLjQwNjcxLDAuMzQ4NThjNC4yODA5NiwzLjcxMzU1IDcuNjIxOTEsOC4zMDUwNCAxMC4xNzMxNiwxMy4zNTcxNWMwLDAuMTU4NyAwLDAuMzE3NCAwLDAuNDgwOWMwLjI2OTYxLC0wLjAwMDY2IDAuNTM5MjMsLTAuMDAxMzMgMC44MTcwMiwtMC4wMDIwMmM2LjU2MDI5LC0wLjAxNjAyIDEzLjEyMDU5LC0wLjAyNzg3IDE5LjY4MDksLTAuMDM1MzZjMy4xNzI1MSwtMC4wMDM3MiA2LjM0NTAyLC0wLjAwODc5IDkuNTE3NTMsLTAuMDE3MDRjMi43NjUxNSwtMC4wMDcxOSA1LjUzMDI5LC0wLjAxMTg0IDguMjk1NDUsLTAuMDEzNDVjMS40NjQxMywtMC4wMDA5NCAyLjkyODI1LC0wLjAwMzE1IDQuMzkyMzcsLTAuMDA4NGMxLjM3ODM1LC0wLjAwNDkgMi43NTY2NywtMC4wMDY0IDQuMTM1MDQsLTAuMDA1MzJjMC41MDU1OCwtMC4wMDAyIDEuMDExMTcsLTAuMDAxNjMgMS41MTY3NCwtMC4wMDQ0YzAuNjkxMTYsLTAuMDAzNTkgMS4zODIxOCwtMC4wMDI3MiAyLjA3MzM1LC0wLjAwMDc1YzAuMTk5MjksLTAuMDAyMSAwLjM5ODU4LC0wLjAwNDIxIDAuNjAzOTEsLTAuMDA2MzdjMy42MDI5NCwwLjAyNzY0IDUuODI4MzUsMi41NzExOSA4LjI4ODc0LDQuODgzMzVjMC41OTUxNSwwLjU1ODY4IDEuMTk3MjMsMS4xMDY2MyAxLjgxMzcyLDEuNjQxODRjMC4xNDM4MiwwLjEyNTUzIDAuMjg3NjQsMC4yNTEwNiAwLjQzNTgyLDAuMzgwNGMwLjM1Nzk0LDAuMzA4MTUgMC43MTkyOCwwLjYxMjM3IDEuMDgyMDMsMC45MTQ4NWMxLjQzNDg3LDEuMjI4NCAyLjUyNzU2LDIuMjQyNTkgMi44NDY5LDQuMTUyNDhjMC4xMDAyMSwxLjU4Mzg3IC0wLjMzMTY2LDIuNzQyOTQgLTEuMjk5LDMuOTg5OTljLTAuNDYzOSwwLjQ1NjI4IC0wLjk0NDA3LDAuODY5NDQgLTEuNDQ5MjksMS4yNzkyOGMtMC40NTU0NywwLjM4NzgyIC0wLjgxODM1LDAuNzgyOCAtMS4xOTU2OCwxLjI0NTQ2Yy0wLjYyMjA3LDAuNzUyNzggLTEuMzA0MDksMS4zNTkxNyAtMi4wNDg1NCwxLjk4ODQyYy0wLjk2MjIyLDAuODY1MjQgLTEuODU4NjYsMS43OTczNCAtMi43NTc2NywyLjcyNzY4Yy0xLjY2NzU3LDEuNzAxIC0zLjE2MTgyLDIuMjY1MzUgLTUuNTE4MTgsMi40NTIzNmMtMy42MDM4NywtMC4xNDI0NSAtNS44MjA2NSwtMi42OTA4MSAtOC4xODAwNCwtNS4xMzAyNmMtMC4xNjIxMSwtMC4xNTY4NCAtMC4zMjQyMiwtMC4zMTM2OCAtMC40OTEyNCwtMC40NzUyN2MtMC4xNDM4MiwtMC4xNDM4MiAtMC4yODc2NCwtMC4yODc2NCAtMC40MzU4MiwtMC40MzU4MmMtMC44MDAwNSwtMC40MzQzMSAtMS4zMzgwMywtMC4yNDYyNSAtMi4yMDkxNSwtMC4wNDUwOWMtMC42MzQ4NiwwLjQ0NTkyIC0wLjYzNDg2LDAuNDQ1OTMgLTEuMTc0MDgsMS4wNTAxYy0wLjIwNjEyLDAuMjEyOTQgLTAuNDEyMjQsMC40MjU4NyAtMC42MjQ2MSwwLjY0NTI3Yy0wLjIwOTg0LDAuMjI0MSAtMC40MTk2OCwwLjQ0ODIgLTAuNjM1ODgsMC42NzkwOWMtMC40MjAzMiwwLjQ0MTI1IC0wLjg0MTcsMC44ODE0OSAtMS4yNjQyNSwxLjMyMDYxYy0wLjE4NDQ2LDAuMTk2MTcgLTAuMzY4OTIsMC4zOTIzMiAtMC41NTg5OCwwLjU5NDQ0Yy0xLjU3MjA0LDEuNDgxNjQgLTMuMjMzNjIsMS44MzAxNCAtNS4zMzk2LDEuNzc4MTRjLTMuMTA1ODgsLTAuMjM1ODkgLTQuNzQxMzcsLTEuOTgzOTMgLTYuNjk5ODgsLTQuMjQ5NGMtMC4zNjg0MiwtMC40MzIzMyAtMC43MzI2MiwtMC44Njc4OSAtMS4wOTYsLTEuMzA0NDZjLTAuNTA3NzksLTAuNjAzNDEgLTEuMDA5MTUsLTEuMTkzNTggLTEuNjAyMzgsLTEuNzE2MDNjLTAuNjA2OTcsLTAuMDU1MzEgLTAuNjA2OTgsLTAuMDU1MzEgLTEuMjAyMjYsMC4yNDA0NWMtMC40MTA2NCwwLjM5MzY4IC0wLjgwNjYxLDAuNzkzOTUgLTEuMjAyMjUsMS4yMDIyNmMtMC4yOTg3NiwwLjI5NzA1IC0wLjU5ODEyLDAuNTkzNSAtMC44OTc5NCwwLjg4OTQ4Yy0wLjMyMTg3LDAuMzE5NjUgLTAuNjQzNzIsMC42MzkzMiAtMC45NjU1NiwwLjk1ODk5Yy0wLjE2NDU4LDAuMTYyNTggLTAuMzI5MTcsMC4zMjUxNCAtMC40OTg3NCwwLjQ5MjY0Yy0wLjE1NjUzLDAuMTU1NzUgLTAuMzEzMDYsMC4zMTE1IC0wLjQ3NDMzLDAuNDcxOThjLTAuMTQyMTksMC4xNDA5NCAtMC4yODQzOSwwLjI4MTg3IC0wLjQzMDg5LDAuNDI3MDhjLTAuMzYyOTUsMC4zNTc5IC0wLjE3Mzg3LDAuMTg3MiAtMS4zMDExMSwxLjU2ODg2Yy0xLjU1NzYzLDAuOTMzODMgLTMuMTc3NDMsMS4xMDU5MyAtNC45NTM2NywxLjEwODMzYy0wLjIzMTQzLDAuMDAzOTcgLTAuNDYyODYsMC4wMDc5NSAtMC43MDEzLDAuMDEyMDVjLTAuNzI5OTQsMC4wMTE1NiAtMS40NTk3NSwwLjAxNjc4IC0yLjE4OTc1LDAuMDIxNzdjLTAuNDk4NzYsMC4wMDY3OCAtMC45OTc1MSwwLjAxMzk4IC0xLjQ5NjI1LDAuMDIxNmMtMS4yMTQ0NSwwLjAxNzY3IC0yLjQyODg1LDAuMDI5NjUgLTMuNjQzNCwwLjAzODUxYy0wLjA3NzM0LDAuMTUyNDIgLTAuMTU0NjcsMC4zMDQ4NCAtMC4yMzQzNSwwLjQ2MTg4Yy0xLjk1MjU0LDMuODM0MDUgLTMuOTIwMDgsNy4zMjQ1NCAtNi43Mzg3NCwxMC41OTg4OGMtMC4xOTA5NCwwLjIyMzQ4IC0wLjM4MTg3LDAuNDQ2OTYgLTAuNTc4NTksMC42NzcyMWMtNi40Njg5Niw3LjM1OTQ3IC0xNS40MjU2OCwxMS4wNjQ4OCAtMjUuMDQxMTEsMTEuNzg4NThjLTkuMjI4ODYsMC41OTAwMSAtMTguNjIyMjMsLTEuOTY3MzggLTI1LjYzNDk1LC04LjA3Mjg1Yy0wLjcyNzAzLC0wLjY0NDY0IC0xLjQyODY3LC0xLjMxMTI4IC0yLjEyNTU2LC0xLjk4ODQyYy0wLjE3OTE1LC0wLjE3Mjk2IC0wLjM1ODMxLC0wLjM0NTkxIC0wLjU0Mjg5LC0wLjUyNDFjLTYuMzUyNCwtNi41ODY4IC05Ljg0MjA4LC0xNS40ODQwNSAtOS44NDEwNywtMjQuNTI5NTZjLTAuMDAwNTMsLTAuNTIxNzMgLTAuMDA0OTEsLTEuMDQzMzQgLTAuMDA5NDYsLTEuNTY1MDVjLTAuMDA4MTIsLTEuOTkxNCAwLjEzMjM1LC0zLjg4NjY0IDAuNTM0OTEsLTUuODQyMjJjMC4wMzI1NywtMC4xODA0NyAwLjA2NTEzLC0wLjM2MDk1IDAuMDk4NjgsLTAuNTQ2ODljMS4zMTQ0NCwtNy4yNzgxNiA0Ljk1Mzk1LC0xNC4xNDYxIDEwLjY2MzQsLTE4Ljk0NDdjMC41MjczMywtMC40NTU2NiAxLjAyODUxLC0wLjkzMzIyIDEuNTMxMDYsLTEuNDE1ODJjMTEuNzIzOTcsLTExLjEzNDI1IDMyLjIzNjE2LC0xMS4xNzI5OSA0NC43Mzg5MiwtMS4zNzk0MnoiIGZpbGw9IiNhNDRjMTUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yODEuODY5MzYsMTM4LjYwOTE4YzIuMzU5MTksMi4wMTg2NSA0LjE1NSw0LjU2NzIgNC41MDI4Myw3LjcyMTY5YzAuMTI3MDUsMy4xNTMwMyAtMC45ODc3MSw1Ljg0MDE2IC0yLjk4NDk4LDguMjA3MjhjLTIuMjAwMzUsMi4zNDIxOSAtNC43Mjg2NywzLjMwNzcxIC03Ljg5OTg1LDMuNDE3OThjLTEuOTMxNDksMC4wMjY5NCAtMy41NzgwOSwtMC4wNTU2NSAtNS4yNzk4OSwtMS4wNTg1NWMtMC4xODA3LC0wLjA5OTE5IC0wLjM2MTQxLC0wLjE5ODM3IC0wLjU0NzU5LC0wLjMwMDU3Yy0yLjcyMDU5LC0xLjYzNyAtNC4xNzE5NCwtMy45MTU4MiAtNS4xMjgzOCwtNi44ODM4NmMtMC42MjQwOCwtMy4zNTUyMSAwLjE5NzM4LC02LjIyOCAyLjA3NDg0LC05LjAyODJjMS42NjIyMSwtMi4xNjQ4MiAzLjk0NTUsLTMuNjY1MzUgNi42NDYyMiwtNC4xNTgxMmMzLjA0NDg5LC0wLjM2NjYxIDYuMTYwNiwwLjE3NDk1IDguNjE2OCwyLjA4MjM1eiIgZmlsbD0iI2ZlYTYzMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTMzMC44MTM5LDIwNy44MTEwNGMwLjIzNDA2LC0wLjAwMDg0IDAuNDY4MTIsLTAuMDAxNjggMC43MDkyOCwtMC4wMDI1NWMwLjc2ODc2LC0wLjAwMjExIDEuNTM3NDcsLTAuMDAwNzIgMi4zMDYyMywwLjAwMDkxYzAuNTM3MTMsLTAuMDAwMzMgMS4wNzQyNiwtMC4wMDA3OSAxLjYxMTM5LC0wLjAwMTRjMS4xMjM3NiwtMC4wMDA3MSAyLjI0NzUyLDAuMDAwMzIgMy4zNzEyOCwwLjAwMjU3YzEuNDM3NTQsMC4wMDI3NCAyLjg3NTAyLDAuMDAxMTYgNC4zMTI1NSwtMC4wMDE3MmMxLjEwODU2LC0wLjAwMTc0IDIuMjE3MTIsLTAuMDAxMTkgMy4zMjU2OCwwLjAwMDA2YzAuNTI5OTQsMC4wMDAzMiAxLjA1OTg3LC0wLjAwMDA3IDEuNTg5ODEsLTAuMDAxMTljMC43NDE2OSwtMC4wMDEyMyAxLjQ4MzMxLDAuMDAwNjUgMi4yMjQ5OSwwLjAwMzMyYzAuMjE3MTUsLTAuMDAwOTggMC40MzQzLC0wLjAwMTk0IDAuNjU4MDMsLTAuMDAyOTVjMi4wNzQ5OCwwLjAxMzc4IDMuNjU2ODYsMC4yOTc2OCA1LjE5NzgsMS43NjljMS4wNTExOCwxLjE4NDEgMS4yNTYwMywyLjQwNTA1IDEuMTk1NjgsMy45MzQ1N2MtMC4yMDIyNywxLjg4NjkxIC0wLjc3MTExLDIuOTM5MTkgLTIuMjQ0ODQsNC4xNDQ5N2MtMC43NTQ3NSwwLjUxMTI4IC0xLjM4NzgzLDAuNTg2OTIgLTIuMjc0MjksMC41OTMwNWMtMC4yMjI3OCwwLjAwMjA3IC0wLjQ0NTU4LDAuMDA0MTMgLTAuNjc1MTEsMC4wMDYyNmMtMC4zNjU5MywwLjAwMTUzIC0wLjM2NTkzLDAuMDAxNTQgLTAuNzM5MjYsMC4wMDMxMWMtMC4yNTczNCwwLjAwMTk3IC0wLjUxNDY4LDAuMDAzOTMgLTAuNzc5ODEsMC4wMDU5NmMtMC44NTMzNCwwLjAwNTk4IC0xLjcwNjY3LDAuMDA5OTUgLTIuNTYwMDMsMC4wMTM0MWMtMC4yOTE0LDAuMDAxMjggLTAuNTgyOCwwLjAwMjU2IC0wLjg4MzAzLDAuMDAzODhjLTEuNTQyNTcsMC4wMDY0MyAtMy4wODUxMiwwLjAxMTA5IC00LjYyNzY5LDAuMDE0NTZjLTEuNTkyNiwwLjAwNCAtMy4xODUwNywwLjAxNDc3IC00Ljc3NzYzLDAuMDI3MDJjLTEuMjI1MSwwLjAwODA5IC0yLjQ1MDE4LDAuMDEwODcgLTMuNjc1MywwLjAxMjIzYy0wLjU4Njk5LDAuMDAxNjEgLTEuMTczOTgsMC4wMDUyNyAtMS43NjA5NSwwLjAxMTAzYy0wLjgyMjUxLDAuMDA3NjEgLTEuNjQ0NywwLjAwNzYxIC0yLjQ2NzIzLDAuMDA1ODNjLTAuMjQxNTMsMC4wMDM5NCAtMC40ODMwNSwwLjAwNzg5IC0wLjczMTg5LDAuMDExOTZjLTEuNTg2NjgsLTAuMDE0MDMgLTIuNjE2MzksLTAuMzQwNDEgLTMuODQ4NzIsLTEuMzU0NTFjLTEuMTgyOTEsLTEuMjE0MDMgLTEuNDcwNjcsLTIuMzk4MiAtMS41NDc5LC00LjA1NzYxYzAuMDMwNzgsLTEuNjU2MjQgMC41NTI1OCwtMi41NjQ5NSAxLjY0MDg5LC0zLjc2MzYzYzEuNTA3ODYsLTEuNDI1MjMgMy41MDMyMiwtMS4zODY4NiA1LjQ1MDA4LC0xLjM3ODEzeiIgZmlsbD0iI2ZlYTczMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTMwOC43MDk3NSwyMTguOTc5MTFjMS4xOTU4MSwxLjAzMjYgMS44MzMwNywyLjYzMTY5IDEuOTY4Nyw0LjE3Nzg1Yy0wLjAzMDE3LDEuNDkyMzEgLTAuNDkxNDMsMi44NjQ1MiAtMS40OTUzMSwzLjk4MTUzYy0xLjc1ODczLDEuNTc4MjYgLTMuMTc2NjUsMS44MjQ3OCAtNS40OTkzOSwxLjc1OTI0Yy0xLjM0NzYyLC0wLjA5NTA5IC0yLjI1NjEzLC0wLjU2MDE3IC0zLjE3OTQsLTEuNTQ3OWMtMS4zNTM5OSwtMS43NDUwNyAtMS42NzIzOSwtMy4zMzc3MyAtMS40NDI3MSwtNS41MzAzOGMwLjQ2NjQ1LC0xLjU2MjgzIDEuMjU5OTUsLTIuNjc5MjkgMi42MjE0OSwtMy41Nzc2NWMyLjQyMDYzLC0xLjI5MzcgNC44NDk4MSwtMC43ODY0NiA3LjAyNjYzLDAuNzM3MzJ6IiBmaWxsPSIjZmRhNzMxIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMzA3LjYxMjY5LDE5OC44NzEzN2MxLjIwMzEzLDAuNzM2NTYgMi4yNDYyLDEuOTA4NDcgMi43NTAxNiwzLjIzMTA3YzAuMTg4NDIsMS44MzI2NCAwLjM3NTQxLDMuODU1OTEgLTAuODA5NjQsNS4zODI5MmMtMS42NTkxMywxLjYzOTI5IC0yLjkxMzgyLDIuMTQyMjMgLTUuMjU2OTQsMi4xNDcyN2MtMS41MjkyLC0wLjAyOTg5IC0yLjU4NDExLC0wLjMyMDQ3IC0zLjY3NTQ1LC0xLjM5Nzc0Yy0xLjM0NzYzLC0xLjU1Mjg3IC0xLjYzNzY4LC0yLjc5MDY1IC0xLjYxMDg0LC00Ljc5NDk0YzAuMTA2NTEsLTEuMjcwMzYgMC40OTcyMiwtMi4yMDA5MyAxLjI5OSwtMy4xODU5OGMwLjIyMzE3LC0wLjE4MzQ5IDAuNDQ2MzQsLTAuMzY2OTkgMC42NzYyNywtMC41NTYwNWMwLjEyNDkxLC0wLjExMjIgMC4yNDk4MiwtMC4yMjQ0MSAwLjM3ODUyLC0wLjM0MDAxYzEuNjk0ODUsLTEuMzE2MTcgNC4zMTY3OCwtMS4zNDI3OCA2LjI0ODkyLC0wLjQ4NjU0eiIgZmlsbD0iI2ZlYTczMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L3N2Zz4=";

  class FirebaseDB {
    constructor() {
      this.api =
        "https://guessthepin-2fe64-default-rtdb.europe-west1.firebasedatabase.app";
    }

    getInfo() {
      return {
        id: "FirebaseDB",
        name: "Firebase DB",
        color1: "#fea631",
        menuIconURI: icon,
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Made by @logise on Discord",
          },
          {
            opcode: "setKey",
            blockType: Scratch.BlockType.COMMAND,
            text: "set key [KEY] to value [VALUE]",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "key" },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value",
              },
            },
          },
          {
            opcode: "getKey",
            blockType: Scratch.BlockType.REPORTER,
            text: "get key [KEY]",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "key" },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Password Blocks:" },
          {
            opcode: "setKeyWithPassword",
            blockType: Scratch.BlockType.COMMAND,
            text: "set key [KEY] to value [VALUE] with password [PASSWORD]",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "key" },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value",
              },
              PASSWORD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "password",
              },
            },
          },
          {
            opcode: "getKeyWithPassword",
            blockType: Scratch.BlockType.REPORTER,
            text: "get key [KEY] with password [PASSWORD]",
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "key" },
              PASSWORD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "password",
              },
            },
          },
          {
            opcode: "checkPassword",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "check if password [PASSWORD] is valid for key [KEY]",
            arguments: {
              PASSWORD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "password",
              },
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: "key" },
            },
          },
        ],
      };
    }

    async delay() {
      const d = Math.random() * 500;
      return new Promise((r) => setTimeout(r, d));
    }

    async setKey(args) {
      await this.delay();
      const { KEY, VALUE } = args;
      if (VALUE.length > 8000) return;
      await fetch(`${this.api}/pin/${encodeURIComponent(KEY)}.json`, {
        method: "PUT",
        body: JSON.stringify(VALUE),
      });
    }

    async getKey(args) {
      await this.delay();
      const { KEY } = args;
      const res = await fetch(
        `${this.api}/pin/${encodeURIComponent(KEY)}.json`
      );
      const data = await res.json();
      return data ?? "";
    }

    async deriveKey(password, salt) {
      const enc = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
      );
      return await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 100000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
      );
    }

    async setKeyWithPassword(args) {
      await this.delay();
      const { KEY, VALUE, PASSWORD } = args;
      if (VALUE.length > 8000) return;

      const enc = new TextEncoder();
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const key = await this.deriveKey(PASSWORD, salt);
      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        enc.encode(VALUE)
      );

      const fullPackage = {
        iv: Array.from(iv),
        salt: Array.from(salt),
        data: Array.from(new Uint8Array(encrypted)),
      };

      await fetch(`${this.api}/cypher/${encodeURIComponent(KEY)}.json`, {
        method: "PUT",
        body: JSON.stringify(fullPackage),
      });
    }

    async getKeyWithPassword(args) {
      await this.delay();
      const { KEY, PASSWORD } = args;

      const res = await fetch(
        `${this.api}/cypher/${encodeURIComponent(KEY)}.json`
      );
      const encryptedPackage = await res.json();
      if (
        !encryptedPackage ||
        !encryptedPackage.data ||
        !encryptedPackage.iv ||
        !encryptedPackage.salt
      )
        return "";

      try {
        const iv = new Uint8Array(encryptedPackage.iv);
        const salt = new Uint8Array(encryptedPackage.salt);
        const data = new Uint8Array(encryptedPackage.data);
        const key = await this.deriveKey(PASSWORD, salt);
        const decrypted = await crypto.subtle.decrypt(
          { name: "AES-GCM", iv },
          key,
          data
        );
        return new TextDecoder().decode(decrypted);
      } catch (e) {
        return "";
      }
    }

    async checkPassword(args) {
      await this.delay();
      const { KEY, PASSWORD } = args;

      const res = await fetch(
        `${this.api}/cypher/${encodeURIComponent(KEY)}.json`
      );
      const encryptedPackage = await res.json();
      if (
        !encryptedPackage ||
        !encryptedPackage.data ||
        !encryptedPackage.iv ||
        !encryptedPackage.salt
      )
        return false;

      try {
        const iv = new Uint8Array(encryptedPackage.iv);
        const salt = new Uint8Array(encryptedPackage.salt);
        const data = new Uint8Array(encryptedPackage.data);
        const key = await this.deriveKey(PASSWORD, salt);
        await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
        return true;
      } catch (e) {
        return false;
      }
    }
  }

  Scratch.extensions.register(new FirebaseDB());
})(Scratch);
