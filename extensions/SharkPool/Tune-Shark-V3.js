// Name: Tune Shark V3
// ID: SPtuneShark3
// Description: Advanced Audio Engine, giving Complex Sound Control
// By: SharkPool
// License: MIT AND LGPL-3.0

// Version V.3.2.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Tune Shark V3 must be run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const scratchAudio = runtime.audioEngine;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMDIuMTg1MTgiIGhlaWdodD0iMTAyLjE4NTE4IiB2aWV3Qm94PSIwLDAsMTAyLjE4NTE4LDEwMi4xODUxOCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4OC45MDc0MSwtMTI4LjkwNzQxKSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTg4LjkwNzQxLDE4MGMwLC0yOC4yMTc2NiAyMi44NzQ5MywtNTEuMDkyNTkgNTEuMDkyNTksLTUxLjA5MjU5YzI4LjIxNzY2LDAgNTEuMDkyNTksMjIuODc0OTMgNTEuMDkyNTksNTEuMDkyNTljMCwyOC4yMTc2NiAtMjIuODc0OTMsNTEuMDkyNTkgLTUxLjA5MjU5LDUxLjA5MjU5Yy0yOC4yMTc2NiwwIC01MS4wOTI1OSwtMjIuODc0OTMgLTUxLjA5MjU5LC01MS4wOTI1OXoiIGZpbGw9IiM0MDQwNDAiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTE5My43Njc0NCwxODBjMCwtMjUuNTMzNTQgMjAuNjk5MDIsLTQ2LjIzMjU2IDQ2LjIzMjU2LC00Ni4yMzI1NmMyNS41MzM1NCwwIDQ2LjIzMjU2LDIwLjY5OTAyIDQ2LjIzMjU2LDQ2LjIzMjU2YzAsMjUuNTMzNTQgLTIwLjY5OTAyLDQ2LjIzMjU2IC00Ni4yMzI1Niw0Ni4yMzI1NmMtMjUuNTMzNTQsMCAtNDYuMjMyNTYsLTIwLjY5OTAyIC00Ni4yMzI1NiwtNDYuMjMyNTZ6IiBmaWxsPSIjNjY2NjY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0yNjEuNzQzNjIsMjE1LjU0OTY4bC0wLjAwMDQ2LC0wLjAwMjJjLTEuMjUyOTUsMi41MzUzOSAtNC42NjcsMy45MzQxMiAtOC4yNjMsMy4xOTY5OWMtNC4xMTgxNiwtMC44NDQ1NSAtNi45MTQ5NCwtNC4xNzAzNiAtNi4yNDY0NiwtNy40Mjg3OGMwLjY2ODI1LC0zLjI1OTA0IDQuNTQ4MDQsLTUuMjE1MzYgOC42NjYyMiwtNC4zNzA4MWMxLjg3NTMyLDAuMzg0MzggMy40NzQ0NSwxLjI4Mzk1IDQuNTk5MjYsMi40NTY2M2w2LjY4MzUzLC0xNC4xNzcwNGMtMTAuNTY1MzEsLTQuMTM1MDUgLTE5Ljc2MDIsLTUuMDk2NjQgLTE5Ljc2MDIsLTUuMDk2NjRsLTguOTg2MTEsMTkuMDYxMjRjLTAuOTY2NjUsMi45MjY5MiAtNC42MzY2MSw0LjYyMTY4IC04LjUxOTY3LDMuODI1ODJjLTQuMTE3NzUsLTAuODQ0MzYgLTYuOTE0MzMsLTQuMTcwNTcgLTYuMjQ2MjcsLTcuNDI5MTljMC42NjgwNiwtMy4yNTg2MyA0LjU0Nzg1LC01LjIxNDk2IDguNjY2MjIsLTQuMzcwODFjMS45MTAyOSwwLjM5MTQyIDMuNTM2MTksMS4zMTc1MyA0LjY2NDE1LDIuNTIyNTNsMTIuMDM0OCwtMjUuNTA3MDJjMCwwIDEzLjUzMjg1LDAuMjM1NiAyNi45NDc4Niw3LjExMzc5eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTIxNy4yMTYyNSwxNTkuNzM4MzJsNC4wNDI1NiwyMy42ODM0NyIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0yMjIuOTM5OTYsMTg0LjEyNTU1YzEuMzgwOTIsMi42MDY0NiAtMC43NzE4NCw2LjA0MDQ2IC00LjgwODMzLDcuNjcwMDVjLTQuMDM2NDksMS42Mjk1OSAtOC40MjgxNywwLjgzNzY2IC05LjgwOTEsLTEuNzY4OGMtMS4zODA5MiwtMi42MDY0NiAwLjc3MTg0LC02LjA0MDQ2IDQuODA4MzMsLTcuNjcwMDVjNC4wMzY0OSwtMS42Mjk1OSA4LjQyODE3LC0wLjgzNzY2IDkuODA5MSwxLjc2ODh6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTIxNC45ODk2MywxNTcuMDU4NGMwLDAgOS43MDU4LC0xLjcwNDcyIDEyLjM2MjkxLDIuNzY5OTdjMi4zNzUxMiw0LjAwMDA4IDAuMDcxNTUsOC42OTQxOCAwLjIxMjA5LDEwLjEyNzMxYzAuMTQwNTQsMS40MzMxMyAyLjE3NTAzLDEuMTA4OTYgMi4xNzUwMywxLjEwODk2bC0wLjAxMzI2LDEuNjc0MTFjMCwwIC0yLjg2NDQ3LDAuNjY5MDIgLTMuNDExOTksLTEuMzE5MTVjLTAuNTQ3NTMsLTEuOTg4MTYgLTAuNTU5NTIsLTUuOTc4MjkgLTIuODIzNTQsLTguMjI3NzdjLTIuMjY0NjYsLTIuMjQ5MjcgLTcuNTM2ODcsLTAuNzU4NjkgLTcuNTM2ODcsLTAuNzU4NjkiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTI0OS4zNDMxMywxNjQuMjc4MDdjLTAuMzMzNTEsMi4xMTc2MSAtMi4zNTI4NywzLjMwODgxIC00LjE4OTA2LDQuMDAxNThjLTEuNjQ5NzQsMC43MjYxIC0zLjU0OTg5LDEuMDA4MDIgLTUuMjc1NjUsMC4zNjk5Yy0xLjYzMTksLTAuMzgwOTkgLTMuMTg4MjEsLTEuODA2NzYgLTIuOTk0NiwtMy41OTczM2MwLjE1NDQzLC0yLjA4NTA5IDEuODk2NTksLTMuODIyNDMgMy44NDIzOCwtNC40MDQ5OGMxLjkzOTE1LC0wLjc5OTIyIDQuMjUyODcsLTAuNzMwNDYgNi4xMDQ2MSwwLjI1ODgzYzAuOTEyNywwLjQyMjE4IDIuMTg5MDgsLTE0LjE0MDYzIDMuMDM1MDksLTIwLjU4MTk4YzAuMTAwNDksLTAuNjQxOCAyLjU4Mzk4LC0wLjQ3MDkzIDIuNTEyOTMsMC4xNTEwNWMwLDAgLTEuODUzNTQsMTUuNTIyMyAtMy4wMzU3MSwyMy44MDI5MnoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvZz48L2c+PC9zdmc+";
  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OC45NzQwMSIgaGVpZ2h0PSI3OC45NzQwMSIgdmlld0JveD0iMCwwLDc4Ljk3NDAxLDc4Ljk3NDAxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAwLjUxMjk5LC0xNDAuNTEyOTkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIwMC41MTMsMjE5LjQ4NzAxdi03OC45NzQwMWg3OC45NzQwMXY3OC45NzQwMXoiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNjEuNzE1MiwxOTQuMzQ4NjZsLTAuMDAxNzcsLTAuMDAyMzZjLTAuMDY4NDQsMy43MDkzNSAtMy4zMzcwNiw3LjI3ODg3IC04LjAxNjM4LDguNDE1ODFjLTUuMzU5LDEuMzAxNTUgLTEwLjUzODA1LC0xLjA4MDMgLTExLjU2NzYxLC01LjMyMDY1Yy0xLjAzMDE1LC00LjI0MDk1IDIuNDc5MTksLTguNzMyNjQgNy44MzgyLC0xMC4wMzQxOWMyLjQ0MDI1LC0wLjU5Mjk1IDQuODQwOTgsLTAuNDIwMDggNi44MzE2NSwwLjM0MjJ2LTIwLjU2MTAzYy0xNC44NDk4LDEuMDAzNiAtMjYuMjk4MjMsNS4wMDYxOCAtMjYuMjk4MjMsNS4wMDYxOHYyNy42NDQ2MmMwLjQ5MDI5LDQuMDEzNzkgLTIuOTE2MzksOC4wNzc3NCAtNy45NjkxOCw5LjMwNTU0Yy01LjM1ODQxLDEuMzAxNTUgLTEwLjUzNzQ2LC0xLjA4MDg5IC0xMS41Njc2MSwtNS4zMjEyNGMtMS4wMzAxNSwtNC4yNDAzNiAyLjQ3OTE5LC04LjczMjA1IDcuODM4MiwtMTAuMDM0MTljMi40ODU2OCwtMC42MDQxNiA0LjkzMzAyLC0wLjQxNDc3IDYuOTQ1NTIsMC4zODQwOWwwLjAxMTgsLTM2Ljk5ODUzYzAsMCAxNi4xODk3LC03LjI5MDY3IDM1Ljk1NTQxLC02LjYzMzQxeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+";

  const settingsIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OC45NzQwMSIgaGVpZ2h0PSI3OC45NzQwMSIgdmlld0JveD0iMCwwLDc4Ljk3NDAxLDc4Ljk3NDAxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAwLjUxMjk5LC0xNDAuNTEyOTgpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjY1LjA0NTY5LDE4My4xMjI3MWwyLjA0MiwwLjg1NTIxYzIuNTU3MTgsMS4wNzA5NyAzLjc2MTk4LDQuMDEyMTggMi42OTEwMSw2LjU2OTM2bC0xLjM3MTM0LDMuMjc0MzhjLTEuMDcwOTcsMi41NTcxOCAtNC4wMTIxOCwzLjc2MiAtNi41NjkzNiwyLjY5MTAzbC0yLjA0MiwtMC44NTUyMWMtMS4yNjc5NiwxLjYwNDkgLTIuNzEzMzcsMy4wMzAxMiAtNC4yOTQ4Nyw0LjI1ODcxbDAuODM5OTUsMi4wNTA1MmMxLjA1MDkxLDIuNTY1NDkgLTAuMTc2OSw1LjQ5NzE2IC0yLjc0MjQsNi41NDgwN2wtMy4yODUwMywxLjM0NTY1Yy0yLjU2NTQ5LDEuMDUwOTEgLTUuNDk3MTYsLTAuMTc2OSAtNi41NDgwNywtMi43NDIzOWwtMC44Mzk5NiwtMi4wNTA1MmMtMS45ODg5MiwwLjIzMzk4IC00LjAxODgxLDAuMjMyMzYgLTYuMDQ4MzEsLTAuMDIxODFsLTAuODU1MiwyLjA0MTk5Yy0xLjA3MDk3LDIuNTU3MTggLTQuMDEyMTgsMy43NjE5OCAtNi41NjkzNiwyLjY5MTAxbC0zLjI3NDM4LC0xLjM3MTM0Yy0yLjU1NzE4LC0xLjA3MDk3IC0zLjc2MiwtNC4wMTIxNyAtMi42OTEwMywtNi41NjkzNWwwLjg1NTIxLC0yLjA0MTk5Yy0xLjYwNDksLTEuMjY3OTYgLTMuMDMwMTMsLTIuNzEzMzcgLTQuMjU4NzEsLTQuMjk0ODdsLTIuMDUwNTIsMC44Mzk5NWMtMi41NjU0OSwxLjA1MDkxIC01LjQ5NzE2LC0wLjE3NjkgLTYuNTQ4MDcsLTIuNzQyMzlsLTEuMzQ1NjYsLTMuMjg1MDNjLTEuMDUwOTEsLTIuNTY1NDkgMC4xNzY5LC01LjQ5NzE3IDIuNzQyNCwtNi41NDgwOGwyLjA1MDUyLC0wLjgzOTk2Yy0wLjIzMzk3LC0xLjk4ODkyIC0wLjIzMjM2LC00LjAxODggMC4wMjE4MSwtNi4wNDgzbC0yLjA0MiwtMC44NTUyMWMtMi41NTcxOCwtMS4wNzA5NyAtMy43NjE5OCwtNC4wMTIxOCAtMi42OTEwMSwtNi41NjkzNmwxLjM3MTM1LC0zLjI3NDM4YzEuMDcwOTcsLTIuNTU3MTggNC4wMTIxNywtMy43NjIgNi41NjkzNSwtMi42OTEwM2wyLjA0MiwwLjg1NTIxYzEuMjY3OTYsLTEuNjA0OSAyLjcxMzM4LC0zLjAzMDEyIDQuMjk0ODgsLTQuMjU4NzFsLTAuODM5OTYsLTIuMDUwNTJjLTEuMDUwOTEsLTIuNTY1NDkgMC4xNzY5LC01LjQ5NzE2IDIuNzQyNCwtNi41NDgwN2wzLjI4NTAzLC0xLjM0NTY1YzIuNTY1NDksLTEuMDUwOTEgNS40OTcxNiwwLjE3NjkgNi41NDgwNywyLjc0MjM5bDAuODM5OTYsMi4wNTA1MmMxLjk4ODkyLC0wLjIzMzk3IDQuMDE4ODEsLTAuMjMyMzYgNi4wNDgzMSwwLjAyMTgxbDAuODU1MjEsLTIuMDQyYzEuMDcwOTcsLTIuNTU3MTggNC4wMTIxOCwtMy43NjE5OCA2LjU2OTM2LC0yLjY5MTAxbDMuMjc0MzgsMS4zNzEzNGMyLjU1NzE4LDEuMDcwOTcgMy43NjIsNC4wMTIxNyAyLjY5MTAzLDYuNTY5MzVsLTAuODU1MjEsMi4wNDJjMS42MDQ5LDEuMjY3OTYgMy4wMzAxMywyLjcxMzM3IDQuMjU4NzEsNC4yOTQ4N2wyLjA1MDUyLC0wLjgzOTk1YzIuNTY1NDksLTEuMDUwOTEgNS40OTcxNywwLjE3NjkgNi41NDgwOCwyLjc0MjM5bDEuMzQ1NjUsMy4yODUwM2MxLjA1MDkxLDIuNTY1NDkgLTAuMTc2OSw1LjQ5NzE2IC0yLjc0MjQsNi41NDgwN2wtMi4wNTA1MiwwLjgzOTk2YzAuMjMzOTcsMS45ODg5MiAwLjIzMjM2LDQuMDE4OCAtMC4wMjE4MSw2LjA0ODN6TTIyNy41NDgyMiwxNzQuNzg1MDdjLTIuODgwMTMsNi44NzY5NSAwLjM1OTkyLDE0Ljc4NjYyIDcuMjM2ODYsMTcuNjY2NzVjNi44NzY5NSwyLjg4MDEzIDE0Ljc4NjYyLC0wLjM1OTkyIDE3LjY2Njc1LC03LjIzNjg2YzIuODgwMTMsLTYuODc2OTUgLTAuMzU5OTIsLTE0Ljc4NjYyIC03LjIzNjg2LC0xNy42NjY3NWMtNi44NzY5NSwtMi44ODAxMyAtMTQuNzg2NjIsMC4zNTk5MiAtMTcuNjY2NzUsNy4yMzY4NnoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMjAwLjUxMywyMTkuNDg3di03OC45NzQwMWg3OC45NzQwMXY3OC45NzQwMXoiIGZpbGw9Im5vbmUiLz48L2c+PC9nPjwvc3ZnPg==";
  const nobIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OC45NzQwMSIgaGVpZ2h0PSI3OC45NzQwMSIgdmlld0JveD0iMCwwLDc4Ljk3NDAxLDc4Ljk3NDAxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAwLjUxMjk5LC0xNDAuNTEyOTkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjAwLjUxMywyMTkuNDg3MDF2LTc4Ljk3NDAxaDc4Ljk3NDAxdjc4Ljk3NDAxeiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0yMzguNDc0MjEsMTUxLjM2MDY3Yy0xLjE2MjMxLDAgLTIuMTA0NTQsLTAuOTQyMjQgLTIuMTA0NTQsLTIuMTA0NTR2LTMuMDUxNTljMCwtMS4xNjIzMSAwLjk0MjI0LC0yLjEwNDU1IDIuMTA0NTQsLTIuMTA0NTVoMy4wNTE1OWMxLjE2MjMxLDAgMi4xMDQ1NCwwLjk0MjI0IDIuMTA0NTQsMi4xMDQ1NXYzLjA1MTU5YzAsMS4xNjIzMSAtMC45NDIyNCwyLjEwNDU0IC0yLjEwNDU0LDIuMTA0NTR6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTIzOC40NzQyMSwyMTUuOWMtMS4xNjIzMSwwIC0yLjEwNDU0LC0wLjk0MjI0IC0yLjEwNDU0LC0yLjEwNDU0di0zLjA1MTU5YzAsLTEuMTYyMzEgMC45NDIyNCwtMi4xMDQ1NCAyLjEwNDU0LC0yLjEwNDU0aDMuMDUxNTljMS4xNjIzMSwwIDIuMTA0NTQsMC45NDIyMyAyLjEwNDU0LDIuMTA0NTR2My4wNTE1OWMwLDEuMTYyMzEgLTAuOTQyMjQsMi4xMDQ1NCAtMi4xMDQ1NCwyLjEwNDU0eiIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0yNTkuMTcyMTYsMTU4LjY3MDA0Yy0wLjgyMTg3LC0wLjgyMTg4IC0wLjgyMTg3LC0yLjE1NDM5IDAsLTIuOTc2MjdsMi4xNTc4LC0yLjE1NzhjMC44MjE4NywtMC44MjE4OCAyLjE1NDM5LC0wLjgyMTg4IDIuOTc2MjcsMGwyLjE1NzgsMi4xNTc4YzAuODIxODcsMC44MjE4OCAwLjgyMTg3LDIuMTU0MzkgMCwyLjk3NjI3bC0yLjE1NzgsMi4xNTc4Yy0wLjgyMTg3LDAuODIxODggLTIuMTU0MzksMC44MjE4OCAtMi45NzYyNywweiIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0yMTMuNTM1OTcsMjA0LjMwNjIzYy0wLjgyMTg4LC0wLjgyMTg4IC0wLjgyMTg4LC0yLjE1NDM5IDAsLTIuOTc2MjdsMi4xNTc4LC0yLjE1NzhjMC44MjE4OCwtMC44MjE4OCAyLjE1NDM5LC0wLjgyMTg4IDIuOTc2MjcsMGwyLjE1NzgsMi4xNTc4YzAuODIxODgsMC44MjE4OCAwLjgyMTg4LDIuMTU0MzkgMCwyLjk3NjI3bC0yLjE1NzgsMi4xNTc4Yy0wLjgyMTg4LDAuODIxODggLTIuMTU0MzksMC44MjE4OCAtMi45NzYyNywweiIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0yNjguNjM5MzMsMTc4LjQ3NDJjMCwtMS4xNjIzMSAwLjk0MjI0LC0yLjEwNDUzIDIuMTA0NTQsLTIuMTA0NTNoMy4wNTE1OWMxLjE2MjMxLDAgMi4xMDQ1NCwwLjk0MjIzIDIuMTA0NTQsMi4xMDQ1M3YzLjA1MTZjMCwxLjE2MjMxIC0wLjk0MjIzLDIuMTA0NTMgLTIuMTA0NTQsMi4xMDQ1M2gtMy4wNTE1OWMtMS4xNjIzMSwwIC0yLjEwNDU0LC0wLjk0MjIzIC0yLjEwNDU0LC0yLjEwNDUzeiIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0yMDQuMSwxNzguNDc0MmMwLC0xLjE2MjMxIDAuOTQyMjQsLTIuMTA0NTMgMi4xMDQ1NCwtMi4xMDQ1M2gzLjA1MTU5YzEuMTYyMzEsMCAyLjEwNDU0LDAuOTQyMjMgMi4xMDQ1NCwyLjEwNDUzdjMuMDUxNmMwLDEuMTYyMzEgLTAuOTQyMjMsMi4xMDQ1MyAtMi4xMDQ1NCwyLjEwNDUzaC0zLjA1MTU5Yy0xLjE2MjMxLDAgLTIuMTA0NTQsLTAuOTQyMjMgLTIuMTA0NTQsLTIuMTA0NTN6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTI2MS4zMjk5NywxOTkuMTcyMTZjMC44MjE4NywtMC44MjE4OCAyLjE1NDM5LC0wLjgyMTg4IDIuOTc2MjcsMGwyLjE1NzgsMi4xNTc4YzAuODIxODcsMC44MjE4OCAwLjgyMTg3LDIuMTU0MzkgMCwyLjk3NjI3bC0yLjE1NzgsMi4xNTc4Yy0wLjgyMTg3LDAuODIxODggLTIuMTU0MzksMC44MjE4OCAtMi45NzYyNywwbC0yLjE1NzgsLTIuMTU3OGMtMC44MjE4NywtMC44MjE4OCAtMC44MjE4NywtMi4xNTQzOSAwLC0yLjk3NjI3eiIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0yMTUuNjkzNzcsMTUzLjUzNTk3YzAuODIxODgsLTAuODIxODggMi4xNTQzOSwtMC44MjE4OCAyLjk3NjI3LDBsMi4xNTc4LDIuMTU3OGMwLjgyMTg4LDAuODIxODggMC44MjE4OCwyLjE1NDM5IDAsMi45NzYyN2wtMi4xNTc4LDIuMTU3OGMtMC44MjE4OCwwLjgyMTg4IC0yLjE1NDM5LDAuODIxODggLTIuOTc2MjcsMGwtMi4xNTc4LC0yLjE1NzhjLTAuODIxODgsLTAuODIxODggLTAuODIxODgsLTIuMTU0MzkgMCwtMi45NzYyN3oiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMjI0LjEwOTEyLDE2My45NjYyMmM3LjU0NzAyLC03LjU0NzAyIDE5LjA2NTQyLC04LjcwMjI0IDI3LjgyODIzLC0zLjQ2NTYzYy0wLjEyNTAxLDAuMDkwMSAtMTMuMjY0MjYsMTcuODcyNDcgLTEyLjEzMzc5LDE5LjAwMjkzbDEuMDM3OTIsMS4wMzc5MmMxLjEzMDQ3LDEuMTMwNDcgMTguOTEyODMsLTEyLjAwODc4IDE5LjAwMjkzLC0xMi4xMzM3OWM1LjIzNjYxLDguNzYyODEgNC4wODE0LDIwLjI4MTIgLTMuNDY1NjMsMjcuODI4MjNjLTguOTExMDIsOC45MTEwMiAtMjMuMzU4NjUsOC45MTEwMiAtMzIuMjY5NjcsMGMtOC45MTEwMiwtOC45MTEwMiAtOC45MTEwMiwtMjMuMzU4NjQgMCwtMzIuMjY5NjZ6IiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvZz48L3N2Zz4=";

  const stopSign =
"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNCAxNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTQgMTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRUM1OTU5O3N0cm9rZTojQjg0ODQ4O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9Cjwvc3R5bGU+Cjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNC4zLDAuNSA5LjcsMC41IDEzLjUsNC4zIDEzLjUsOS43IDkuNywxMy41IDQuMywxMy41IDAuNSw5LjcgMC41LDQuMyAiLz4KPC9zdmc+Cg==";
  const startFlag =
"data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNi42MyAxNy41Ij48ZGVmcz48c3R5bGU+LmNscy0xLC5jbHMtMntmaWxsOiM0Y2JmNTY7c3Ryb2tlOiM0NTk5M2Q7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30uY2xzLTJ7c3Ryb2tlLXdpZHRoOjEuNXB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tZ3JlZW4tZmxhZzwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNLjc1LDJBNi40NCw2LjQ0LDAsMCwxLDguNDQsMmgwYTYuNDQsNi40NCwwLDAsMCw3LjY5LDBWMTIuNGE2LjQ0LDYuNDQsMCwwLDEtNy42OSwwaDBhNi40NCw2LjQ0LDAsMCwwLTcuNjksMCIvPjxsaW5lIGNsYXNzPSJjbHMtMiIgeDE9IjAuNzUiIHkxPSIxNi43NSIgeDI9IjAuNzUiIHkyPSIwLjc1Ii8+PC9zdmc+";

  // Modified Pizzicato Library (Web Audio API, but with Premade Effects and Stuff)
  // uses MIT License
  const scriptElement = document.createElement("script");
  scriptElement.textContent = 
`!function(e){"use strict";var t={},i=t,n="object"==typeof module&&module.exports,o="function"==typeof define&&define.amd;n?module.exports=t:o?define([],t):e.Pizzicato=e.Pz=t;var s=e.AudioContext||e.webkitAudioContext;if(!s){console.error("No AudioContext found in this environment. Please ensure your window or global object contains a working AudioContext constructor function.");return}t.context=new s;var a=t.context.createGain();a.connect(t.context.destination),t.Util={isString:function(e){return"[object String]"===toString.call(e)},isObject:function(e){return"[object Object]"===toString.call(e)},isFunction:function(e){return"[object Function]"===toString.call(e)},isNumber:function(e){return"[object Number]"===toString.call(e)&&e===+e},isArray:function(e){return"[object Array]"===toString.call(e)},isInRange:function(e,t,n){return!!(i.Util.isNumber(e)&&i.Util.isNumber(t)&&i.Util.isNumber(n))&&e>=t&&e<=n},isBool:function(e){return"boolean"==typeof e},isOscillator:function(e){return e&&"[object OscillatorNode]"===e.toString()},isAudioBufferSourceNode:function(e){return e&&"[object AudioBufferSourceNode]"===e.toString()},isSound:function(e){return e instanceof i.Sound},isEffect:function(e){for(var i in t.Effects)if(e instanceof t.Effects[i])return!0;return!1},normalize:function(e,t,n){if(i.Util.isNumber(e)&&i.Util.isNumber(t)&&i.Util.isNumber(n))return(n-t)*e/1+t},getDryLevel:function(e){return!i.Util.isNumber(e)||e>1||e<0?0:e<=.5?1:1-(e-.5)*2},getWetLevel:function(e){return!i.Util.isNumber(e)||e>1||e<0?0:e>=.5?1:1-(.5-e)*2}};var r=Object.getPrototypeOf(Object.getPrototypeOf(t.context.createGain())),c=r.connect;r.connect=function(e){var t=i.Util.isEffect(e)?e.inputNode:e;return c.call(this,t),e},Object.defineProperty(t,"volume",{enumerable:!0,get:function(){return a.gain.value},set:function(e){i.Util.isInRange(e,0,1)&&a&&(a.gain.value=e)}}),Object.defineProperty(t,"masterGainNode",{enumerable:!1,get:function(){return a},set:function(e){console.error("Can't set the master gain node")}}),t.Events={on:function(e,t,i){e&&t&&(this._events=this._events||{},(this._events[e]||(this._events[e]=[])).push({callback:t,context:i||this,handler:this}))},trigger:function(e){var t,i,n,o;if(e){for(this._events=this._events||{},t=this._events[e]||(this._events[e]=[]),o=0,i=Math.max(0,arguments.length-1),n=[];o<i;o++)n[o]=arguments[o+1];for(o=0;o<t.length;o++)t[o].callback.apply(t[o].context,n)}},off:function(e){e?this._events[e]=void 0:this._events={}}},t.Sound=function(e,n){var o=this,s=t.Util,a=function e(t){if(t&&!s.isFunction(t)&&!s.isString(t)&&!s.isObject(t))return"Description type not supported. Initialize a sound using an object, a function or a string.";if(s.isObject(t)){if(!s.isString(t.source)||-1===["wave","file","input","script","sound"].indexOf(t.source))return"Specified source not supported. Sources can be wave, file, input or script";if("file"===t.source&&(!t.options||!t.options.path))return"A path is needed for sounds with a file source";if("script"===t.source&&(!t.options||!t.options.audioFunction))return"An audio function is needed for sounds with a script source"}}(e),r=s.isObject(e)&&s.isObject(e.options);if(a)throw console.error(a),Error("Error initializing Pizzicato Sound: "+a);function c(e,n){e=e||{},this.getRawSourceNode=function(){var i=this.sourceNode?this.sourceNode.frequency.value:e.frequency,n=t.context.createOscillator();return n.type=e.type||"sine",n.frequency.value=i||440,n},this.sourceNode=this.getRawSourceNode(),this.sourceNode.gainSuccessor=i.context.createGain(),this.sourceNode.connect(this.sourceNode.gainSuccessor),s.isFunction(n)&&n()}function h(e,i){e=s.isArray(e)?e:[e];var n=new XMLHttpRequest;n.open("GET",e[0],!0),n.responseType="arraybuffer",n.onload=function(n){t.context.decodeAudioData(n.target.response,(function(e){o.getRawSourceNode=function(){var i=t.context.createBufferSource();return i.loop=this.loop,i.buffer=e,i},s.isFunction(i)&&i()}).bind(o),(function(t){if(console.error("Error decoding audio file "+e[0]),e.length>1){e.shift(),h(e,i);return}t=t||Error("Error decoding audio file "+e[0]),s.isFunction(i)&&i(t)}).bind(o))},n.onreadystatechange=function(t){4===n.readyState&&200!==n.status&&console.error("Error while fetching "+e[0]+". "+n.statusText)},n.send()}function u(e,i){var n=s.isFunction(e)?e:e.audioFunction,o=s.isObject(e)&&e.bufferSize?e.bufferSize:null;if(!o)try{t.context.createScriptProcessor()}catch(a){o=2048}this.getRawSourceNode=function(){var e=t.context.createScriptProcessor(o,1,1);return e.onaudioprocess=n,e}}this.detached=r&&e.options.detached,this.masterVolume=t.context.createGain(),this.fadeNode=t.context.createGain(),this.fadeNode.gain.value=0,this.detached||this.masterVolume.connect(t.masterGainNode),this.lastTimePlayed=0,this.effects=[],this.effectConnectors=[],this.playing=this.paused=!1,this.loop=r&&e.options.loop,this.attack=r&&s.isNumber(e.options.attack)?e.options.attack:.04,this.volume=r&&s.isNumber(e.options.volume)?e.options.volume:1,r&&s.isNumber(e.options.release)?this.release=e.options.release:r&&s.isNumber(e.options.sustain)?(console.warn("'sustain' is deprecated. Use 'release' instead."),this.release=e.options.sustain):this.release=.04,e?s.isString(e)?h.bind(this)(e,n):s.isFunction(e)?u.bind(this)(e,n):"file"===e.source?h.bind(this)(e.options.path,n):"wave"===e.source?c.bind(this)(e.options,n):"input"===e.source?(function e(i,n){if(navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,!navigator.getUserMedia&&(!navigator.mediaDevices||navigator.mediaDevices.getUserMedia)){console.error("Your browser does not support getUserMedia. Note that the current document must be loaded securely for this to work");return}var a=(function(e){o.getRawSourceNode=function(){return t.context.createMediaStreamSource(e)},s.isFunction(n)&&n()}).bind(o),r=function(e){s.isFunction(n)&&n(e)};navigator.mediaDevices.getUserMedia?navigator.mediaDevices.getUserMedia({audio:!0}).then(a).catch(r):navigator.getUserMedia({audio:!0},a,r)}).bind(this)(e,n):"script"===e.source?u.bind(this)(e.options,n):"sound"===e.source&&(function e(t,n){this.getRawSourceNode=t.sound.getRawSourceNode,t.sound.sourceNode&&i.Util.isOscillator(t.sound.sourceNode)&&(this.sourceNode=this.getRawSourceNode(),this.frequency=t.sound.frequency)}).bind(this)(e.options,n):c.bind(this)({},n)},t.Sound.prototype=Object.create(t.Events,{play:{enumerable:!0,value:function(e,n){this.playing||(i.Util.isNumber(n)||(n=this.offsetTime||0),i.Util.isNumber(e)||(e=0),this.playing=!0,this.paused=!1,this.sourceNode=this.getSourceNode(),this.applyAttack(),i.Util.isFunction(this.sourceNode.start)&&(this.lastTimePlayed=t.context.currentTime-n,this.sourceNode.start(i.context.currentTime+e,n)),this.trigger("play"))}},stop:{enumerable:!0,value:function(){(this.paused||this.playing)&&(this.paused=this.playing=!1,this.stopWithRelease(),this.offsetTime=0,this.trigger("stop"))}},pause:{enumerable:!0,value:function(){if(!this.paused&&this.playing){this.paused=!0,this.playing=!1,this.stopWithRelease();var e=i.context.currentTime-this.lastTimePlayed;this.sourceNode.buffer?this.offsetTime=e%(this.sourceNode.buffer.length/i.context.sampleRate):this.offsetTime=e,this.trigger("pause")}}},clone:{enumerable:!0,value:function(){for(var e=new t.Sound({source:"sound",options:{loop:this.loop,attack:this.attack,release:this.release,volume:this.volume,sound:this}}),i=0;i<this.effects.length;i++)e.addEffect(this.effects[i]);return e}},onEnded:{enumerable:!0,value:function(e){return function(){this.sourceNode&&this.sourceNode!==e||(this.playing&&this.stop(),this.paused||this.trigger("end"))}}},addEffect:{enumerable:!0,value:function(e){if(!i.Util.isEffect(e))return console.error("The object provided is not a Pizzicato effect."),this;this.effects.push(e);var t=this.effectConnectors.length>0?this.effectConnectors[this.effectConnectors.length-1]:this.fadeNode;t.disconnect(),t.connect(e);var n=i.context.createGain();return this.effectConnectors.push(n),e.connect(n),n.connect(this.masterVolume),this}},removeEffect:{enumerable:!0,value:function(e){var t,i=this.effects.indexOf(e);if(-1===i)return console.warn("Cannot remove effect that is not applied to this sound."),this;var n=this.playing;n&&this.pause();var o=0===i?this.fadeNode:this.effectConnectors[i-1];o.disconnect();var s=this.effectConnectors[i];return s.disconnect(),e.disconnect(s),this.effectConnectors.splice(i,1),this.effects.splice(i,1),t=i>this.effects.length-1||0===this.effects.length?this.masterVolume:this.effects[i],o.connect(t),n&&this.play(),this}},connect:{enumerable:!0,value:function(e){return this.masterVolume.connect(e),this}},disconnect:{enumerable:!0,value:function(e){return this.masterVolume.disconnect(e),this}},connectEffects:{enumerable:!0,value:function(){for(var e=[],t=0;t<this.effects.length;t++){var n=t===this.effects.length-1?this.masterVolume:this.effects[t+1].inputNode;e[t]=i.context.createGain(),this.effects[t].outputNode.disconnect(this.effectConnectors[t]),this.effects[t].outputNode.connect(n)}}},volume:{enumerable:!0,get:function(){if(this.masterVolume)return this.masterVolume.gain.value},set:function(e){i.Util.isInRange(e,0,1)&&this.masterVolume&&(this.masterVolume.gain.value=e)}},frequency:{enumerable:!0,get:function(){return this.sourceNode&&i.Util.isOscillator(this.sourceNode)?this.sourceNode.frequency.value:null},set:function(e){this.sourceNode&&i.Util.isOscillator(this.sourceNode)&&(this.sourceNode.frequency.value=e)}},sustain:{enumerable:!0,get:function(){return console.warn("'sustain' is deprecated. Use 'release' instead."),this.release},set:function(e){console.warn("'sustain' is deprecated. Use 'release' instead."),i.Util.isInRange(e,0,10)&&(this.release=e)}},getSourceNode:{enumerable:!0,value:function(){if(this.sourceNode){var e=this.sourceNode;e.gainSuccessor.gain.setValueAtTime(e.gainSuccessor.gain.value,i.context.currentTime),e.gainSuccessor.gain.linearRampToValueAtTime(1e-4,i.context.currentTime+.2),setTimeout(function(){e.disconnect(),e.gainSuccessor.disconnect()},200)}var t=this.getRawSourceNode();return t.gainSuccessor=i.context.createGain(),t.connect(t.gainSuccessor),t.gainSuccessor.connect(this.fadeNode),this.fadeNode.connect(this.getInputNode()),i.Util.isAudioBufferSourceNode(t)&&(t.onended=this.onEnded(t).bind(this)),t}},getInputNode:{enumerable:!0,value:function(){return this.effects.length>0?this.effects[0].inputNode:this.masterVolume}},applyAttack:{enumerable:!1,value:function(){if(this.fadeNode.gain.value,this.fadeNode.gain.cancelScheduledValues(i.context.currentTime),!this.attack){this.fadeNode.gain.setTargetAtTime(1,i.context.currentTime,.001);return}var e=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,t=this.attack;e||(t=(1-this.fadeNode.gain.value)*this.attack),this.fadeNode.gain.setTargetAtTime(1,i.context.currentTime,2*t)}},stopWithRelease:{enumerable:!1,value:function(e){var t=this.sourceNode,n=function(){return i.Util.isFunction(t.stop)?t.stop(0):t.disconnect()};if(this.fadeNode.gain.value,this.fadeNode.gain.cancelScheduledValues(i.context.currentTime),!this.release){this.fadeNode.gain.setTargetAtTime(0,i.context.currentTime,.001),n();return}var o=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,s=this.release;o||(s=this.fadeNode.gain.value*this.release),this.fadeNode.gain.setTargetAtTime(1e-5,i.context.currentTime,s/5),window.setTimeout(function(){n()},1e3*s)}}}),t.Group=function(e){e=e||[],this.mergeGainNode=i.context.createGain(),this.masterVolume=i.context.createGain(),this.sounds=[],this.effects=[],this.effectConnectors=[],this.mergeGainNode.connect(this.masterVolume),this.masterVolume.connect(i.masterGainNode);for(var t=0;t<e.length;t++)this.addSound(e[t])},t.Group.prototype=Object.create(i.Events,{connect:{enumerable:!0,value:function(e){return this.masterVolume.connect(e),this}},disconnect:{enumerable:!0,value:function(e){return this.masterVolume.disconnect(e),this}},addSound:{enumerable:!0,value:function(e){if(!i.Util.isSound(e)){console.error("You can only add Pizzicato.Sound objects");return}if(this.sounds.indexOf(e)>-1){console.warn("The Pizzicato.Sound object was already added to this group");return}if(e.detached){console.warn("Groups do not support detached sounds. You can manually create an audio graph to group detached sounds together.");return}e.disconnect(i.masterGainNode),e.connect(this.mergeGainNode),this.sounds.push(e)}},removeSound:{enumerable:!0,value:function(e){var t=this.sounds.indexOf(e);if(-1===t){console.warn("Cannot remove a sound that is not part of this group.");return}e.disconnect(this.mergeGainNode),e.connect(i.masterGainNode),this.sounds.splice(t,1)}},volume:{enumerable:!0,get:function(){if(this.masterVolume)return this.masterVolume.gain.value},set:function(e){i.Util.isInRange(e,0,1)&&(this.masterVolume.gain.value=e)}},play:{enumerable:!0,value:function(){for(var e=0;e<this.sounds.length;e++)this.sounds[e].play();this.trigger("play")}},stop:{enumerable:!0,value:function(){for(var e=0;e<this.sounds.length;e++)this.sounds[e].stop();this.trigger("stop")}},pause:{enumerable:!0,value:function(){for(var e=0;e<this.sounds.length;e++)this.sounds[e].pause();this.trigger("pause")}},addEffect:{enumerable:!0,value:function(e){if(!i.Util.isEffect(e))return console.error("The object provided is not a Pizzicato effect."),this;this.effects.push(e);var t=this.effectConnectors.length>0?this.effectConnectors[this.effectConnectors.length-1]:this.mergeGainNode;t.disconnect(),t.connect(e);var n=i.context.createGain();return this.effectConnectors.push(n),e.connect(n),n.connect(this.masterVolume),this}},removeEffect:{enumerable:!0,value:function(e){var t,i=this.effects.indexOf(e);if(-1===i)return console.warn("Cannot remove effect that is not applied to this group."),this;var n=0===i?this.mergeGainNode:this.effectConnectors[i-1];n.disconnect();var o=this.effectConnectors[i];return o.disconnect(),e.disconnect(o),this.effectConnectors.splice(i,1),this.effects.splice(i,1),t=i>this.effects.length-1||0===this.effects.length?this.masterVolume:this.effects[i],n.connect(t),this}}}),t.Effects={};var h=Object.create(null,{connect:{enumerable:!0,value:function(e){return this.outputNode.connect(e),this}},disconnect:{enumerable:!0,value:function(e){return this.outputNode.disconnect(e),this}}});function u(e,n){this.options={},e=e||this.options;var o={frequency:350,peak:1};for(var s in this.inputNode=this.filterNode=i.context.createBiquadFilter(),this.filterNode.type=n,this.outputNode=t.context.createGain(),this.filterNode.connect(this.outputNode),o)this[s]=e[s],this[s]=void 0===this[s]||null===this[s]?o[s]:this[s]}t.Effects.Delay=function(e){this.options={},e=e||this.options;var i={feedback:.5,time:.3,mix:.5};for(var n in this.inputNode=t.context.createGain(),this.outputNode=t.context.createGain(),this.dryGainNode=t.context.createGain(),this.wetGainNode=t.context.createGain(),this.feedbackGainNode=t.context.createGain(),this.delayNode=t.context.createDelay(),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.delayNode.connect(this.feedbackGainNode),this.feedbackGainNode.connect(this.delayNode),this.inputNode.connect(this.delayNode),this.delayNode.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},t.Effects.Delay.prototype=Object.create(h,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=t.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=t.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){i.Util.isInRange(e,0,180)&&(this.options.time=e,this.delayNode.delayTime.value=e)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.feedback=parseFloat(e,10),this.feedbackGainNode.gain.value=this.feedback)}}}),t.Effects.Compressor=function(e){this.options={},e=e||this.options;var i={threshold:-24,knee:30,attack:.003,release:.25,ratio:12};for(var n in this.inputNode=this.compressorNode=t.context.createDynamicsCompressor(),this.outputNode=t.context.createGain(),this.compressorNode.connect(this.outputNode),i)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},t.Effects.Compressor.prototype=Object.create(h,{threshold:{enumerable:!0,get:function(){return this.compressorNode.threshold.value},set:function(e){t.Util.isInRange(e,-100,0)&&(this.compressorNode.threshold.value=e)}},knee:{enumerable:!0,get:function(){return this.compressorNode.knee.value},set:function(e){t.Util.isInRange(e,0,40)&&(this.compressorNode.knee.value=e)}},attack:{enumerable:!0,get:function(){return this.compressorNode.attack.value},set:function(e){t.Util.isInRange(e,0,1)&&(this.compressorNode.attack.value=e)}},release:{enumerable:!0,get:function(){return this.compressorNode.release.value},set:function(e){t.Util.isInRange(e,0,1)&&(this.compressorNode.release.value=e)}},ratio:{enumerable:!0,get:function(){return this.compressorNode.ratio.value},set:function(e){t.Util.isInRange(e,1,20)&&(this.compressorNode.ratio.value=e)}},getCurrentGainReduction:function(){return this.compressorNode.reduction}}),t.Effects.LowPassFilter=function(e){u.call(this,e,"lowpass")},t.Effects.HighPassFilter=function(e){u.call(this,e,"highpass")};var d=Object.create(h,{frequency:{enumerable:!0,get:function(){return this.filterNode.frequency.value},set:function(e){t.Util.isInRange(e,10,22050)&&(this.filterNode.frequency.value=e)}},peak:{enumerable:!0,get:function(){return this.filterNode.Q.value},set:function(e){t.Util.isInRange(e,1e-4,1e3)&&(this.filterNode.Q.value=e)}}});function l(){var e,n,o=i.context.sampleRate*this.time,s=t.context.createBuffer(2,o,i.context.sampleRate),a=s.getChannelData(0),r=s.getChannelData(1);for(n=0;n<o;n++)e=this.reverse?o-n:n,a[n]=(2*Math.random()-1)*Math.pow(1-e/o,this.decay),r[n]=(2*Math.random()-1)*Math.pow(1-e/o,this.decay);this.reverbNode.buffer&&(this.inputNode.disconnect(this.reverbNode),this.reverbNode.disconnect(this.wetGainNode),this.reverbNode=t.context.createConvolver(),this.inputNode.connect(this.reverbNode),this.reverbNode.connect(this.wetGainNode)),this.reverbNode.buffer=s}function f(e){this.options={},e=e||this.options;var t={cutoff_frequency_low:100,cutoff_frequency_high:8e3,low_band_gain:1,mid_band_gain:1,high_band_gain:1,low_peak:1,mid_peak:1,high_peak:1};for(var n in this.inputNode=i.context.createGain(),this.outputNode=i.context.createGain(),this.lowFilterNode=i.context.createBiquadFilter(),this.lowFilterNode.type="lowpass",this.inputNode.connect(this.lowFilterNode),this.lowGainNode=i.context.createGain(),this.lowFilterNode.connect(this.lowGainNode),this.midFilterNode=i.context.createBiquadFilter(),this.midFilterNode.type="bandpass",this.inputNode.connect(this.midFilterNode),this.midGainNode=i.context.createGain(),this.midFilterNode.connect(this.midGainNode),this.highFilterNode=i.context.createBiquadFilter(),this.highFilterNode.type="highpass",this.inputNode.connect(this.highFilterNode),this.highGainNode=i.context.createGain(),this.highFilterNode.connect(this.highGainNode),this.analyserNode=i.context.createAnalyser(),this.lowGainNode.connect(this.analyserNode),this.midGainNode.connect(this.analyserNode),this.highGainNode.connect(this.analyserNode),this.analyserNode.connect(this.outputNode),this.analyserNode.minDecibels=-90,this.analyserNode.maxDecibels=15,this.analyserNode.smoothingTimeConstant=.85,this.analyserNode.fftSize=256,this.options.cutoff_frequency_low=t.cutoff_frequency_low,this.options.cutoff_frequency_high=t.cutoff_frequency_high,t)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?t[n]:this[n]}t.Effects.LowPassFilter.prototype=d,t.Effects.HighPassFilter.prototype=d,t.Effects.Distortion=function(e){this.options={},e=e||this.options;var i={gain:.5};for(var n in this.waveShaperNode=t.context.createWaveShaper(),this.inputNode=this.outputNode=this.waveShaperNode,i)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},t.Effects.Distortion.prototype=Object.create(h,{gain:{enumerable:!0,get:function(){return this.options.gain},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.gain=e,this.adjustGain())}},adjustGain:{writable:!1,configurable:!1,enumerable:!1,value:function(){for(var e,t=i.Util.isNumber(this.options.gain)?parseInt(100*this.options.gain,10):50,n=new Float32Array(44100),o=Math.PI/180,s=0;s<44100;++s)e=2*s/44100-1,n[s]=(3+t)*e*20*o/(Math.PI+t*Math.abs(e));this.waveShaperNode.curve=n}}}),t.Effects.Flanger=function(e){this.options={},e=e||this.options;var i={time:.45,speed:.2,depth:.1,feedback:.1,mix:.5};for(var n in this.inputNode=t.context.createGain(),this.outputNode=t.context.createGain(),this.inputFeedbackNode=t.context.createGain(),this.wetGainNode=t.context.createGain(),this.dryGainNode=t.context.createGain(),this.delayNode=t.context.createDelay(),this.oscillatorNode=t.context.createOscillator(),this.gainNode=t.context.createGain(),this.feedbackNode=t.context.createGain(),this.oscillatorNode.type="sine",this.inputNode.connect(this.inputFeedbackNode),this.inputNode.connect(this.dryGainNode),this.inputFeedbackNode.connect(this.delayNode),this.inputFeedbackNode.connect(this.wetGainNode),this.delayNode.connect(this.wetGainNode),this.delayNode.connect(this.feedbackNode),this.feedbackNode.connect(this.inputFeedbackNode),this.oscillatorNode.connect(this.gainNode),this.gainNode.connect(this.delayNode.delayTime),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode),this.oscillatorNode.start(0),i)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},t.Effects.Flanger.prototype=Object.create(h,{time:{enumberable:!0,get:function(){return this.options.time},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.time=e,this.delayNode.delayTime.value=i.Util.normalize(e,.001,.02))}},speed:{enumberable:!0,get:function(){return this.options.speed},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.speed=e,this.oscillatorNode.frequency.value=i.Util.normalize(e,.5,5))}},depth:{enumberable:!0,get:function(){return this.options.depth},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.depth=e,this.gainNode.gain.value=i.Util.normalize(e,5e-4,.005))}},feedback:{enumberable:!0,get:function(){return this.options.feedback},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.feedback=e,this.feedbackNode.gain.value=i.Util.normalize(e,0,.8))}},mix:{enumberable:!0,get:function(){return this.options.mix},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=t.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=t.Util.getWetLevel(this.mix))}}}),t.Effects.StereoPanner=function(e){this.options={},e=e||this.options;var i={pan:0};for(var n in this.inputNode=t.context.createGain(),this.outputNode=t.context.createGain(),t.context.createStereoPanner?(this.pannerNode=t.context.createStereoPanner(),this.inputNode.connect(this.pannerNode),this.pannerNode.connect(this.outputNode)):t.context.createPanner?(console.warn("Your browser does not support the StereoPannerNode. Will use PannerNode instead."),this.pannerNode=t.context.createPanner(),this.pannerNode.type="equalpower",this.inputNode.connect(this.pannerNode),this.pannerNode.connect(this.outputNode)):(console.warn("Your browser does not support the Panner effect."),this.inputNode.connect(this.outputNode)),i)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},t.Effects.StereoPanner.prototype=Object.create(h,{pan:{enumerable:!0,get:function(){return this.options.pan},set:function(e){i.Util.isInRange(e,-1,1)&&(this.options.pan=e,this.pannerNode&&(this.pannerNode.toString().indexOf("StereoPannerNode")>-1?this.pannerNode.pan.value=e:this.pannerNode.setPosition(e,0,1-Math.abs(e))))}}}),t.Effects.Convolver=function(e,n){this.options={},e=e||this.options;var o=this,s=new XMLHttpRequest,a={mix:.5};for(var r in this.callback=n,this.inputNode=t.context.createGain(),this.convolverNode=t.context.createConvolver(),this.outputNode=t.context.createGain(),this.wetGainNode=t.context.createGain(),this.dryGainNode=t.context.createGain(),this.inputNode.connect(this.convolverNode),this.convolverNode.connect(this.wetGainNode),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode),a)this[r]=e[r],this[r]=void 0===this[r]||null===this[r]?a[r]:this[r];if(!e.impulse){console.error("No impulse file specified.");return}s.open("GET",e.impulse,!0),s.responseType="arraybuffer",s.onload=function(e){var n=e.target.response;t.context.decodeAudioData(n,function(e){o.convolverNode.buffer=e,o.callback&&i.Util.isFunction(o.callback)&&o.callback()},function(e){e=e||Error("Error decoding impulse file"),o.callback&&i.Util.isFunction(o.callback)&&o.callback(e)})},s.onreadystatechange=function(t){4===s.readyState&&200!==s.status&&console.error("Error while fetching "+e.impulse+". "+s.statusText)},s.send()},t.Effects.Convolver.prototype=Object.create(h,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=t.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=t.Util.getWetLevel(this.mix))}}}),t.Effects.PingPongDelay=function(e){this.options={},e=e||this.options;var i={feedback:.5,time:.3,mix:.5};for(var n in this.inputNode=t.context.createGain(),this.outputNode=t.context.createGain(),this.delayNodeLeft=t.context.createDelay(),this.delayNodeRight=t.context.createDelay(),this.dryGainNode=t.context.createGain(),this.wetGainNode=t.context.createGain(),this.feedbackGainNode=t.context.createGain(),this.channelMerger=t.context.createChannelMerger(2),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.delayNodeLeft.connect(this.channelMerger,0,0),this.delayNodeRight.connect(this.channelMerger,0,1),this.delayNodeLeft.connect(this.delayNodeRight),this.feedbackGainNode.connect(this.delayNodeLeft),this.delayNodeRight.connect(this.feedbackGainNode),this.inputNode.connect(this.feedbackGainNode),this.channelMerger.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},t.Effects.PingPongDelay.prototype=Object.create(h,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=t.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=t.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){i.Util.isInRange(e,0,180)&&(this.options.time=e,this.delayNodeLeft.delayTime.value=e,this.delayNodeRight.delayTime.value=e)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.feedback=parseFloat(e,10),this.feedbackGainNode.gain.value=this.feedback)}}}),t.Effects.Reverb=function(e){this.options={},e=e||this.options;var i={mix:.5,time:.01,decay:.01,reverse:!1};for(var n in this.inputNode=t.context.createGain(),this.reverbNode=t.context.createConvolver(),this.outputNode=t.context.createGain(),this.wetGainNode=t.context.createGain(),this.dryGainNode=t.context.createGain(),this.inputNode.connect(this.reverbNode),this.reverbNode.connect(this.wetGainNode),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode),i)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n];l.bind(this)()},t.Effects.Reverb.prototype=Object.create(h,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=t.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=t.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){i.Util.isInRange(e,1e-4,10)&&(this.options.time=e,l.bind(this)())}},decay:{enumerable:!0,get:function(){return this.options.decay},set:function(e){i.Util.isInRange(e,1e-4,10)&&(this.options.decay=e,l.bind(this)())}},reverse:{enumerable:!0,get:function(){return this.options.reverse},set:function(e){i.Util.isBool(e)&&(this.options.reverse=e,l.bind(this)())}}}),t.Effects.Bitcrusher=function(e){this.inputNode=i.context.createGain(),this.outputNode=i.context.createGain(),this.bits=e.bits||4,this.frequency=e.frequency||44100,this.crusherNode=i.context.createScriptProcessor(4096,1,1);var t=this;this.crusherNode.onaudioprocess=function(e){for(var n=e.inputBuffer,o=e.outputBuffer,s=0;s<o.numberOfChannels;s++)for(var a=n.getChannelData(s),r=o.getChannelData(s),c=Math.pow(.5,t.bits-1),h=t.frequency/i.context.sampleRate,u=0;u<n.length;u++)u%h==0?r[u]=Math.floor(a[u]/c)*c:r[u]=r[u-1]},this.inputNode.connect(this.crusherNode),this.crusherNode.connect(this.outputNode),this.connect=function(e){this.outputNode.connect(e)},this.disconnect=function(){this.outputNode.disconnect()}},t.Effects.Bitcrusher.prototype={constructor:t.Effects.Bitcrusher,setBits:function(e){e>=1&&e<=16&&(this.bits=e)},getBits:function(){return this.bits},setFrequency:function(e){e>0&&(this.frequency=e)},getFrequency:function(){return this.frequency}},t.Effects.ThreeBandEqualizer=function(e){f.call(this,e)};var p=Object.create(h,{cutoff_frequency_low:{enumerable:!0,get:function(){return this.options.cutoff_frequency_low},set:function(e){t.Util.isInRange(e,10,22050)&&(this.options.cutoff_frequency_low=e,this.lowFilterNode.frequency.value=e,this.midFilterNode.frequency.value=.707*(this.options.cutoff_frequency_low+this.options.cutoff_frequency_high))}},cutoff_frequency_high:{enumerable:!0,get:function(){return this.options.cutoff_frequency_high},set:function(e){t.Util.isInRange(e,10,22050)&&(this.options.cutoff_frequency_high=e,this.highFilterNode.frequency.value=e,this.midFilterNode.frequency.value=.707*(this.options.cutoff_frequency_low+this.options.cutoff_frequency_high))}},low_band_gain:{enumerable:!0,get:function(){return this.options.low_band_gain},set:function(e){t.Util.isInRange(e,-40,15)&&(this.options.low_band_gain=e,this.lowGainNode.gain.value=Math.pow(10,e/20))}},mid_band_gain:{enumerable:!0,get:function(){return this.options.mid_band_gain},set:function(e){t.Util.isInRange(e,-40,15)&&(this.options.mid_band_gain=e,this.midGainNode.gain.value=Math.pow(10,e/20))}},high_band_gain:{enumerable:!0,get:function(){return this.options.high_band_gain},set:function(e){t.Util.isInRange(e,-40,15)&&(this.options.high_band_gain=e,this.highGainNode.gain.value=Math.pow(10,e/20))}},low_peak:{enumerable:!0,get:function(){return this.lowFilterNode.Q.value},set:function(e){t.Util.isInRange(e,1e-4,100)&&(this.lowFilterNode.Q.value=e)}},mid_peak:{enumerable:!0,get:function(){return this.midFilterNode.Q.value},set:function(e){t.Util.isInRange(e,1e-4,100)&&(this.midFilterNode.Q.value=e)}},high_peak:{enumerable:!0,get:function(){return this.highFilterNode.Q.value},set:function(e){t.Util.isInRange(e,1e-4,1e3)&&(this.highFilterNode.Q.value=e)}},visualizerBinCount:{enumerable:!0,get:function(){return this.analyserNode.frequencyBinCount},set:function(e){t.Util.isInRange(e,16,1024)&&(this.analyzerNode.fftSize=e)}},analyser:{enumerable:!0,get:function(){return this.analyserNode}},frequencyData:{enumerable:!0,get:function(){return void 0===this.byteFrequencyData&&(this.byteFrequencyData=new Uint8Array(this.analyserNode.frequencyBinCount.value)),this.analyserNode.getByteFrequencyData(this.FrequencyData),this.byteFrequencyData}}});t.Effects.ThreeBandEqualizer.prototype=p,t.Effects.Tremolo=function(e){this.options={},e=e||this.options;var i={speed:4,depth:1,mix:.8};for(var n in this.inputNode=t.context.createGain(),this.outputNode=t.context.createGain(),this.dryGainNode=t.context.createGain(),this.wetGainNode=t.context.createGain(),this.tremoloGainNode=t.context.createGain(),this.tremoloGainNode.gain.value=0,this.lfoNode=t.context.createOscillator(),this.shaperNode=t.context.createWaveShaper(),this.shaperNode.curve=new Float32Array([0,1]),this.shaperNode.connect(this.tremoloGainNode.gain),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.lfoNode.connect(this.shaperNode),this.lfoNode.type="sine",this.lfoNode.start(0),this.inputNode.connect(this.tremoloGainNode),this.tremoloGainNode.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},t.Effects.Tremolo.prototype=Object.create(h,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=t.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=t.Util.getWetLevel(this.mix))}},speed:{enumerable:!0,get:function(){return this.options.speed},set:function(e){i.Util.isInRange(e,0,20)&&(this.options.speed=e,this.lfoNode.frequency.value=e)}},depth:{enumerable:!0,get:function(){return this.options.depth},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.depth=e,this.shaperNode.curve=new Float32Array([1-e,1]))}}}),t.Effects.DubDelay=function(e){this.options={},e=e||this.options;var i={feedback:.6,time:.7,mix:.5,cutoff:700};for(var n in this.inputNode=t.context.createGain(),this.outputNode=t.context.createGain(),this.dryGainNode=t.context.createGain(),this.wetGainNode=t.context.createGain(),this.feedbackGainNode=t.context.createGain(),this.delayNode=t.context.createDelay(),this.bqFilterNode=t.context.createBiquadFilter(),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.inputNode.connect(this.wetGainNode),this.inputNode.connect(this.feedbackGainNode),this.feedbackGainNode.connect(this.bqFilterNode),this.bqFilterNode.connect(this.delayNode),this.delayNode.connect(this.feedbackGainNode),this.delayNode.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]},t.Effects.DubDelay.prototype=Object.create(h,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=t.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=t.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(e){i.Util.isInRange(e,0,180)&&(this.options.time=e,this.delayNode.delayTime.value=e)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.feedback=parseFloat(e,10),this.feedbackGainNode.gain.value=this.feedback)}},cutoff:{enumerable:!0,get:function(){return this.options.cutoff},set:function(e){i.Util.isInRange(e,0,4e3)&&(this.options.cutoff=e,this.bqFilterNode.frequency.value=this.cutoff)}}}),t.Effects.RingModulator=function(e){this.options={},e=e||this.options;var i={speed:30,distortion:1,mix:.5};for(var n in this.inputNode=t.context.createGain(),this.outputNode=t.context.createGain(),this.dryGainNode=t.context.createGain(),this.wetGainNode=t.context.createGain(),this.vIn=t.context.createOscillator(),this.vIn.start(0),this.vInGain=t.context.createGain(),this.vInGain.gain.value=.5,this.vInInverter1=t.context.createGain(),this.vInInverter1.gain.value=-1,this.vInInverter2=t.context.createGain(),this.vInInverter2.gain.value=-1,this.vInDiode1=new N(t.context),this.vInDiode2=new N(t.context),this.vInInverter3=t.context.createGain(),this.vInInverter3.gain.value=-1,this.vcInverter1=t.context.createGain(),this.vcInverter1.gain.value=-1,this.vcDiode3=new N(t.context),this.vcDiode4=new N(t.context),this.outGain=t.context.createGain(),this.outGain.gain.value=3,this.compressor=t.context.createDynamicsCompressor(),this.compressor.threshold.value=-24,this.compressor.ratio.value=16,this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.inputNode.connect(this.vcInverter1),this.inputNode.connect(this.vcDiode4.node),this.vcInverter1.connect(this.vcDiode3.node),this.vIn.connect(this.vInGain),this.vInGain.connect(this.vInInverter1),this.vInGain.connect(this.vcInverter1),this.vInGain.connect(this.vcDiode4.node),this.vInInverter1.connect(this.vInInverter2),this.vInInverter1.connect(this.vInDiode2.node),this.vInInverter2.connect(this.vInDiode1.node),this.vInDiode1.connect(this.vInInverter3),this.vInDiode2.connect(this.vInInverter3),this.vInInverter3.connect(this.compressor),this.vcDiode3.connect(this.compressor),this.vcDiode4.connect(this.compressor),this.compressor.connect(this.outGain),this.outGain.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode),i)this[n]=e[n],this[n]=void 0===this[n]||null===this[n]?i[n]:this[n]};var N=function(e){this.context=e,this.node=this.context.createWaveShaper(),this.vb=.2,this.vl=.4,this.h=1,this.setCurve()};function v(e){for(var t=i.context.sampleRate,n=new Float32Array(t),o=Math.PI/180,s=0;s<t;s++){var a=2*s/t-1;n[s]=(3+e)*a*20*o/(Math.PI+e*Math.abs(a))}return n}N.prototype.setDistortion=function(e){return this.h=e,this.setCurve()},N.prototype.setCurve=function(){var e,t,i,n,o,s,a,r;for(t=1024,o=new Float32Array(t),e=s=0,a=o.length;0<=a?s<a:s>a;e=0<=a?++s:--s)n=(i=Math.abs(i=(e-t/2)/(t/2)))<=this.vb?0:this.vb<i&&i<=this.vl?this.h*(Math.pow(i-this.vb,2)/(2*this.vl-2*this.vb)):this.h*i-this.h*this.vl+this.h*(Math.pow(this.vl-this.vb,2)/(2*this.vl-2*this.vb)),o[e]=n;return this.node.curve=o},N.prototype.connect=function(e){return this.node.connect(e)},t.Effects.RingModulator.prototype=Object.create(h,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.mix=e,this.dryGainNode.gain.value=t.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=t.Util.getWetLevel(this.mix))}},speed:{enumerable:!0,get:function(){return this.options.speed},set:function(e){i.Util.isInRange(e,0,2e3)&&(this.options.speed=e,this.vIn.frequency.value=e)}},distortion:{enumerable:!0,get:function(){return this.options.distortion},set:function(e){if(i.Util.isInRange(e,.2,50)){this.options.distortion=parseFloat(e,10);for(var t=[this.vInDiode1,this.vInDiode2,this.vcDiode3,this.vcDiode4],n=0,o=t.length;n<o;n++)t[n].setDistortion(e)}}}}),t.Effects.Quadrafuzz=function(e){this.options={},e=e||this.options;var t={lowGain:.6,midLowGain:.8,midHighGain:.5,highGain:.6};this.inputNode=i.context.createGain(),this.outputNode=i.context.createGain(),this.dryGainNode=i.context.createGain(),this.wetGainNode=i.context.createGain(),this.lowpassLeft=i.context.createBiquadFilter(),this.lowpassLeft.type="lowpass",this.lowpassLeft.frequency.value=147,this.lowpassLeft.Q.value=.7071,this.bandpass1Left=i.context.createBiquadFilter(),this.bandpass1Left.type="bandpass",this.bandpass1Left.frequency.value=587,this.bandpass1Left.Q.value=.7071,this.bandpass2Left=i.context.createBiquadFilter(),this.bandpass2Left.type="bandpass",this.bandpass2Left.frequency.value=2490,this.bandpass2Left.Q.value=.7071,this.highpassLeft=i.context.createBiquadFilter(),this.highpassLeft.type="highpass",this.highpassLeft.frequency.value=4980,this.highpassLeft.Q.value=.7071,this.overdrives=[];for(var n=0;n<4;n++)this.overdrives[n]=i.context.createWaveShaper(),this.overdrives[n].curve=v();this.inputNode.connect(this.wetGainNode),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode);var o=[this.lowpassLeft,this.bandpass1Left,this.bandpass2Left,this.highpassLeft];for(n=0;n<o.length;n++)this.wetGainNode.connect(o[n]),o[n].connect(this.overdrives[n]),this.overdrives[n].connect(this.outputNode);for(var s in t)this[s]=e[s],this[s]=void 0===this[s]||null===this[s]?t[s]:this[s]},t.Effects.Quadrafuzz.prototype=Object.create(h,{lowGain:{enumerable:!0,get:function(){return this.options.lowGain},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.lowGain=e,this.overdrives[0].curve=v(i.Util.normalize(this.lowGain,0,150)))}},midLowGain:{enumerable:!0,get:function(){return this.options.midLowGain},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.midLowGain=e,this.overdrives[1].curve=v(i.Util.normalize(this.midLowGain,0,150)))}},midHighGain:{enumerable:!0,get:function(){return this.options.midHighGain},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.midHighGain=e,this.overdrives[2].curve=v(i.Util.normalize(this.midHighGain,0,150)))}},highGain:{enumerable:!0,get:function(){return this.options.highGain},set:function(e){i.Util.isInRange(e,0,1)&&(this.options.highGain=e,this.overdrives[3].curve=v(i.Util.normalize(this.highGain,0,150)))}}})}("undefined"!=typeof window?window:global);`;
  document.body.appendChild(scriptElement);
  /* global Pizzicato */

  // Create an Event for when Pause Project is Activated
  // Save original function if it exists
  let ogPauseFunc = Object.getOwnPropertyDescriptor(runtime.ioDevices.clock, "_paused")?.set;
  Object.defineProperty(runtime.ioDevices.clock, "_paused", {
    set: function(value) {
      this._pausedValue = value;
      runtime.emit("SP_TUNE3_PROJECT_PAUSE", value);
      if (ogPauseFunc) ogPauseFunc.call(this, value);
    },
    get: function() { return this._pausedValue }
  });

  let soundBank = {};
  let settings = { flagCtrl : false, canSave : false };
  const load = (storage) => {
    if (storage === undefined) return;
    settings = storage.settings;
    soundBank = storage.bank;
    for (const item in soundBank) {
      soundBank[item].loaded = false;
      const engine = new Pizzicato.Sound(soundBank[item].src, () => {
        engine.sourceNode = engine.getSourceNode();
        soundBank[item].context = engine;
        soundBank[item].loaded = true;
      });
    }
  };
  load(runtime.extensionStorage["SPtuneShark3"]);

  class SPtuneShark3 {
    constructor() {
      runtime.on("PROJECT_START", () => {
        if (settings.flagCtrl) this.ctrlSounds({ CONTROL : "stop" });
      });
      runtime.on("PROJECT_STOP_ALL", () => {
        if (settings.flagCtrl) this.ctrlSounds({ CONTROL : "stop" });
      });
      runtime.on("BEFORE_EXECUTE", () => {
        const projectVal = scratchAudio.inputNode.gain.value;
        Object.keys(soundBank).forEach(key => {
          const bank = soundBank[key];
          if (bank.loaded) {
            const sound = bank.context;
            // Clamp Volume to Project Volume
            const curVol = Math.min(100, Math.max(0, bank.vol)) / 100;
            sound.volume = curVol * projectVal;

            // Apply Speed Changes
            if (bank.speed !== 1 && sound.playing) {
              const lastplay = sound.lastTimePlayed;
              const time = Math.abs(lastplay - sound.sourceNode.context.currentTime);
              sound.stop();
              sound.play(0, time * bank.speed);
              sound.lastTimePlayed = lastplay;
              this.patchLinks(sound.sourceNode, bank);
            }
          }
        });
      });
      runtime.on("SP_TUNE3_PROJECT_PAUSE", () => {
        if (runtime.ioDevices.clock._paused) Object.keys(soundBank).forEach(key => { soundBank[key].context.pause() });
        else {
          Object.keys(soundBank).forEach(key => {
            const thisSound = soundBank[key].context;
            if (thisSound.paused) {
              thisSound.play();
              this.patchLinks(thisSound.sourceNode, soundBank[key]);
            }
          });
        }
      });
    }
    getInfo() {
      return {
        id: "SPtuneShark3",
        name: "Tune Shark V3",
        color1: "#666666",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "importURL",
            blockType: Scratch.BlockType.COMMAND,
            text: "import sound from URL [URL] named [NAME]",
            blockIconURI: settingsIconURI,
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://extensions.turbowarp.org/meow.mp3" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" }
            },
          },
          {
            opcode: "importMenu",
            blockType: Scratch.BlockType.COMMAND,
            text: "import sound [SOUND] named [NAME]",
            blockIconURI: settingsIconURI,
            arguments: {
              SOUND: { type: Scratch.ArgumentType.SOUND },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" }
            },
          },
          {
            opcode: "convertSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "convert sound [NAME1] from URL to URI and save to [NAME2]",
            blockIconURI: settingsIconURI,
            arguments: {
              NAME1: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              NAME2: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound2" }
            },
          },
          {
            opcode: "bindSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "[TYPE] sound [NAME2] and sound [NAME]",
            blockIconURI: settingsIconURI,
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "bindMenu" },
              NAME2: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound2" }
            },
          },
          {
            opcode: "save2Project",
            blockType: Scratch.BlockType.COMMAND,
            text: "[SAVE] all sounds to project",
            blockIconURI: settingsIconURI,
            arguments: {
              SAVE: { type: Scratch.ArgumentType.STRING, menu: "saveMenu" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Audio Playback" },
          {
            opcode: "startSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "start sound [NAME]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" }
            },
          },
          {
            opcode: "startSoundAt",
            blockType: Scratch.BlockType.COMMAND,
            text: "start sound [NAME] at time [TIME]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            },
          },
          {
            opcode: "playAndStop",
            blockType: Scratch.BlockType.COMMAND,
            text: "start sound [NAME] at time [TIME] and stop at [MAX] seconds",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
            },
          },
          {
            opcode: "stopSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop sound [NAME]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" }
            },
          },
          {
            opcode: "pauseSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "[UN_PAUSE] sound [NAME]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              UN_PAUSE: { type: Scratch.ArgumentType.STRING, menu: "un_pauseMenu" }
            },
          },
          "---",
          {
            opcode: "ctrlSounds",
            blockType: Scratch.BlockType.COMMAND,
            text: "[CONTROL] all sounds",
            arguments: {
              CONTROL: { type: Scratch.ArgumentType.STRING, menu: "playMenu" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Audio Operations" },
          {
            opcode: "enableControl",
            blockType: Scratch.BlockType.COMMAND,
            text: "toggle sound link to [GO] [STOP] [ON_OFF]",
            blockIconURI: settingsIconURI,
            arguments: {
              GO: { type: Scratch.ArgumentType.IMAGE, dataURI: startFlag },
              STOP: { type: Scratch.ArgumentType.IMAGE, dataURI: stopSign },
              ON_OFF: { type: Scratch.ArgumentType.STRING, menu: "toggleMenu" }
            }
          },
          {
            opcode: "toggleOverlap",
            blockType: Scratch.BlockType.COMMAND,
            text: "toggle sound [NAME] overlapping [TYPE]",
            blockIconURI: settingsIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "toggleMenu" }
            },
          },
          {
            opcode: "toggleLoop",
            blockType: Scratch.BlockType.COMMAND,
            text: "toggle sound [NAME] looping [TYPE]",
            blockIconURI: settingsIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "toggleMenu" }
            },
          },
          {
            opcode: "toggleReverse",
            blockType: Scratch.BlockType.COMMAND,
            text: "toggle sound [NAME] reverse mode [TYPE]",
            blockIconURI: settingsIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "toggleMenu" }
            },
          },
          {
            opcode: "loopParams",
            blockType: Scratch.BlockType.COMMAND,
            text: "sound [NAME] loop start [START] end [END]",
            blockIconURI: settingsIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              START: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              END: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
            },
          },
          "---",
          {
            opcode: "deleteSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete sound [NAME]",
            blockIconURI: settingsIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" }
            },
          },
          {
            opcode: "deleteAllSounds",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all sounds",
            blockIconURI: settingsIconURI
          },
          {
            opcode: "allSounds",
            blockType: Scratch.BlockType.REPORTER,
            text: "all sounds",
            blockIconURI: settingsIconURI
          },
          {
            opcode: "allPlaySounds",
            blockType: Scratch.BlockType.REPORTER,
            text: "all playing sounds",
            blockIconURI: settingsIconURI
          },
          "---",
          {
            opcode: "soundCheck",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "sound [NAME] [CONTROL] ?",
            blockIconURI: settingsIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              CONTROL: { type: Scratch.ArgumentType.STRING, menu: "soundBools" }
            },
          },
          {
            opcode: "soundProperty",
            blockType: Scratch.BlockType.REPORTER,
            text: "[PROP] of sound [NAME]",
            blockIconURI: settingsIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              PROP: { type: Scratch.ArgumentType.STRING, menu: "soundProps" }
            },
          },
          {
            opcode: "getLoudTime",
            blockType: Scratch.BlockType.REPORTER,
            text: "[TYPE] of sound [NAME] at time [TIME]",
            blockIconURI: settingsIconURI,
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "loudProps" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Audio Effects" },
          {
            opcode: "setVol",
            blockType: Scratch.BlockType.COMMAND,
            text: "set volume of sound [NAME] to [NUM]",
            blockIconURI: nobIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            },
          },
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset [EFFECT] of sound [NAME]",
            blockIconURI: nobIconURI,
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "effectMenu" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" }
            },
          },
          "---",
          {
            opcode: "setThing",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [TYPE] of sound [NAME] to [VALUE]",
            blockIconURI: nobIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "singleEffects" },
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "setReverb",
            blockType: Scratch.BlockType.COMMAND,
            text: "set reverb of sound [NAME] to time [TIME] decay [DECAY] mix [MIX]",
            blockIconURI: nobIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              DECAY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              MIX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            },
          },
          {
            opcode: "setDelay",
            blockType: Scratch.BlockType.COMMAND,
            text: "set delay of sound [NAME] to time [TIME] feedback [FEED] mix [MIX]",
            blockIconURI: nobIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              FEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              MIX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            },
          },
          {
            opcode: "setTremolo",
            blockType: Scratch.BlockType.COMMAND,
            text: "set tremolo of sound [NAME] to speed [SPEED] depth [DEPTH] mix [MIX]",
            blockIconURI: nobIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              SPEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 35 },
              DEPTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 80 },
              MIX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            },
          },
          "---",
          {
            opcode: "setFuzz",
            blockType: Scratch.BlockType.COMMAND,
            text: "set fuzz of sound [NAME] to low [LOW] med-low [MED1] med-high [MED2] high [HIGH] mix [MIX]",
            blockIconURI: nobIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              LOW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 },
              MED1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 80 },
              MED2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              HIGH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60 },
              MIX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            },
          },
          {
            opcode: "setBitcrush",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bitcrush of sound [NAME] bits [BITS] freq [FREQ]",
            blockIconURI: nobIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              BITS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              FREQ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 60000 }
            },
          },
          {
            opcode: "setPass",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [TYPE] of sound [NAME] to frequency [FREQ] peak [PEAK]",
            blockIconURI: nobIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "typePass" },
              FREQ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 400 },
              PEAK: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            },
          },
          {
            opcode: "setFlanger",
            blockType: Scratch.BlockType.COMMAND,
            text: "set flanger of sound [NAME] to time [TIME] speed [SPEED] depth [DEPTH] feed [FEED] mix [MIX]",
            blockIconURI: nobIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 45 },
              SPEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              DEPTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              FEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              MIX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            },
          },
          {
            opcode: "setCompress",
            blockType: Scratch.BlockType.COMMAND,
            text: "set compressor of sound [NAME] to threshold [THRESH] knee [KNEE] attack [ATTACK] release [RELEASE] ratio [RATIO]",
            blockIconURI: nobIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              THRESH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              KNEE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              ATTACK: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              RELEASE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              RATIO: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            },
          },
          {
            opcode: "setEqualize",
            blockType: Scratch.BlockType.COMMAND,
            text: "set equalizer of sound [NAME] to gain low [LOW] mid [MID] high [HIGH] cutoff low [CUT_LOW] cutoff high [CUT_HIGH]",
            blockIconURI: nobIconURI,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "MySound" },
              LOW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              MID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              HIGH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              CUT_LOW: { type: Scratch.ArgumentType.NUMBER, defaultValue: -50 },
              CUT_HIGH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            },
          }
        ],
        menus: {
          saveMenu: ["save", "dont save"],
          un_pauseMenu: ["pause", "unpause"],
          playMenu: ["start", "stop", "pause", "unpause"],
          toggleMenu: ["on", "off"],
          bindMenu: ["bind", "unBind"],
          loudProps: ["loudness", "raw noise"],
          typePass: ["highpass", "lowpass"],
          singleEffects: ["pitch", "detune", "speed", "pan", "gain", "distortion"],
          soundProps: {
            acceptReporters: true,
            items: [
              "length", "current time", "source", "binds", "volume", "pitch", "detune",
              "speed", "pan", "gain", "distortion", "reverb", "delay", "tremolo", "fuzz",
              "bitcrush", "highpass", "lowpass", "flanger", "compressor", "equalizer"
            ]
          },
          soundBools: {
            acceptReporters: true,
            items: ["exists", "playing", "paused", "looped", "overlaped", "reversed", "binded"]
          },
          effectMenu: {
            acceptReporters: true,
            items: [
              "all effects", "pitch", "detune", "speed", "pan", "gain", "distortion",
              "reverb", "delay", "tremolo", "fuzz", "bitcrush", "highpass", "lowpass",
              "flanger", "compressor", "equalizer"
            ]
          }
        },
      };
    }

    // Helper Funcs
    getSoundIndex(name, target) {
      const sounds = target.sounds;
      return sounds.indexOf(sounds.filter((sound) => { return sound.name === name })[0]);
    }

    calcTime(leng, start, currentT, sound) {
      leng = this.modTime(leng, sound);
      const loopStart = sound.loopParm[0];
      let time = Math.abs(start - currentT);
      if (sound.context.loop) return (Math.max(0, time % (leng - loopStart)) + loopStart);
      return Math.min(leng, Math.max(0, time));
    }

    modTime(number, opts) {
      return number / (opts.pitch * opts.speed * ((opts.detune / 1000) + 1));
    }

    updateEffect(effect, sound, name, args) {
      delete args.NAME;
      delete args.TYPE;
      effect.arguments = args; // Match Original Values, not Converted
      if (sound.effects[name] === undefined) {
        effect.id = name;
        sound.context.addEffect(effect);
        sound.effects[name] = effect;
      } else {
        // Dont Remove the Effect (Causes Glitches in Forever Loops), simply change each value
        // We use args just in case some Effects dont store them in the audio context
        const options = effect.options;
        const thisEffect = sound.context.effects.find(effect => effect.id === name);
        thisEffect.arguments = effect.arguments;
        thisEffect.options = options;
        switch (name) {
          case "PAN": {
            thisEffect.pannerNode.pan.value = options.pan;
            thisEffect.pan = options.pan;
            return;
          }
          case "DISTORTION": { return thisEffect.gain = options.gain }
          case "BITCRUSH": {
            thisEffect.frequency = Math.max(30000, Scratch.Cast.toNumber(args.FREQ));
            thisEffect.bits = Math.max(10, Scratch.Cast.toNumber(args.BITS)) / 10;
            return;
          }
          case "LOWPASS":
          case "HIGHPASS": {
            const freq = Scratch.Cast.toNumber(args.FREQ);
            const peak = Scratch.Cast.toNumber(args.PEAK) / 5;
            thisEffect.filterNode.frequency.value = freq;
            thisEffect.inputNode.frequency.value = freq;
            thisEffect.frequency = freq;
            thisEffect.filterNode.Q.value = peak;
            thisEffect.inputNode.Q.value = peak;
            thisEffect.peak = peak;
            return;
          }
          case "COMPRESSOR": {
            const node = thisEffect.compressorNode;
            const values = {
              threshold: Math.min(0, Math.max(-100, Scratch.Cast.toNumber(args.THRESH) * -1)),
              ratio: Scratch.Cast.toNumber(args.RATIO) / 5, attack: Math.min(0, Math.max(1, Scratch.Cast.toNumber(args.ATTACK) / 100)),
              release: Math.min(0, Math.max(1, Scratch.Cast.toNumber(args.RELEASE) / 100)), knee: Scratch.Cast.toNumber(args.KNEE) / 2.5
            };
            Object.keys(values).forEach(key => { node[key].value = values[key] });
            return;
          }
        }
        Object.keys(options).forEach(key => { thisEffect[key] = options[key] });
      }
    }

    play(sound, atTime, con) {
      try {
        if (sound.playing && con.overlap) {
          const clone = sound.clone(); // Clone context to Menu for Control Purposes
          const newName = `${con.name}_COPY_${Math.random()}`;
          soundBank[newName] = {
            ...sound,
            context: clone, name: newName, loopParm: [0, 0], overlap: false,
            overlays: [], isBind: false, binds: {}
          };
          clone.play();
          clone.sourceNode.playbackRate.value = con.pitch;
          clone.sourceNode.gainSuccessor.gain.value = con.gain;
          con.overlays.push(clone);
          clone.on("end", function() { delete soundBank[newName] });
        } else {
          sound.play(0, sound.loop ? con.loopParm[0] : atTime);
          const srcNode = sound.sourceNode;
          this.patchLinks(srcNode, con);
          if (Object.keys(con.binds).length > 0) {
            Object.keys(con.binds).forEach(key => {
              const thisSound = con.binds[key];
              const context = thisSound.context;
              context.play(0, atTime);
              this.patchLinks(context.sourceNode, thisSound);
            });
          }
          if (sound.loop) this.loopParams({ NAME : con.name , START : con.loopParm[0], END : con.loopParm[1] });
        }
      } catch {
        console.warn("Audio has not Loaded Yet, Ignore Next Error");
        sound.stop(); // Reset
      }
    }

    typeOverlay(sound, type) {
      if (type === "stop") {
        sound.context.stop();
        for (let i = 0; i < sound.overlays.length; i++) { sound.overlays[i].stop() }
      } else if (type === "pause") {
        sound.context.pause();
        for (let i = 0; i < sound.overlays.length; i++) { sound.overlays[i].pause() }
      } else if (type === "play") {
        sound.context.play();
        this.patchLinks(sound.context.sourceNode, sound);
        for (let i = 0; i < sound.overlays.length; i++) {
          sound.overlays[i].play();
          this.patchLinks(sound.overlays[i].sourceNode, sound);
        }
      }
    }

    patchLinks(src, sound) {
      src.playbackRate.value = sound.pitch;
      src.detune.value = sound.detune;
      src.gainSuccessor.gain.value = sound.gain;
      if (src.loop) this.loopParams({ NAME : sound.name , START : sound.loopParm[0], END : sound.loopParm[1] });
    }

    // Block Funcs
    importURL(args, util) {
      return new Promise((resolve) => {
        this.deleteSound(args);
        if (!args.URL) return resolve();
        const engine = new Pizzicato.Sound(args.URL, () => {
          try {
            engine.sourceNode = engine.getSourceNode();
            engine.attack = 0;
            soundBank[args.NAME] = {
              context: engine, name: args.NAME, src: args.URL, effects: {},
              loaded: true, reversed: false, vol: 100, gain: 1, pitch: 1, detune: 0, speed: 1, 
              loopParm: [0, 0], overlap: false, overlays: [], isBind: false, binds: {}
            };
            resolve();
          } catch {
            // File is Corrupted / Doesnt Exist / is a unedited Scratch Sound
            alert("Tune Shark V3 Cant Import this Sound, File may be Corrupted or Non-Existent");
            resolve();
          }
        });
      });
    }

    async importMenu(args, util) {
      const target = util.target.sprite;
      const index = this.getSoundIndex(args.SOUND, target);
      if (index < 0) return;
      if (runtime.isPackaged) {
        alert(`For "Import Scratch Sound" (Tune Shark) to Work, Disable "Remove raw asset data after loading to save RAM" under advanced settings in the packager.`);
        return;
      }
      const sound = target.sounds[index].asset.encodeDataURI();
      await this.importURL({ ...args, URL: sound }, util);
    }

    async convertSound(args, util) {
      const sound = soundBank[args.NAME1];
      if (sound === undefined) return;
      try {
        const response = await Scratch.fetch(sound.src);
        const audioBlob = await response.blob();
        const audioDataURL = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(audioBlob);
        });
        await this.importURL({ NAME: args.NAME2, URL: audioDataURL }, util);
      } catch (error) { console.error(error.message) }
    }

    bindSound(args) {
      const sound1 = soundBank[args.NAME];
      const sound2 = soundBank[args.NAME2];
      if (sound1 === undefined || sound2 === undefined) return;
      const shouldBind = args.TYPE === "bind";
      sound1.isBind = shouldBind;
      sound2.isBind = shouldBind;
      if (shouldBind) {
        if (sound1.binds[sound2.name]) this.typeOverlay(sound1.binds[sound2.name], "stop");
        if (sound2.binds[sound1.name]) this.typeOverlay(sound2.binds[sound1.name], "stop");
        sound1.binds[sound2.name] = sound2;
        sound2.binds[sound1.name] = sound1;
      } else {
        delete sound1.binds[sound2.name];
        delete sound2.binds[sound1.name];
      }
    }

    startSound(args) {
      const sound = soundBank[args.NAME];
      if (sound !== undefined) this.play(sound.context, 0, sound);
    }

    startSoundAt(args) {
      const sound = soundBank[args.NAME];
      const time = Scratch.Cast.toNumber(args.TIME);
      if (sound !== undefined) this.play(sound.context, time, sound);
    }

    async playAndStop(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const time = Scratch.Cast.toNumber(args.TIME);
      const max = Scratch.Cast.toNumber(args.MAX);
      this.play(sound.context, time, sound);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          this.typeOverlay(sound, "stop");
          resolve();
        }, (max - time) * 1000);
      });
    }

    stopSound(args) {
      const sound = soundBank[args.NAME];
      if (sound !== undefined) this.typeOverlay(sound, "stop");
    }

    pauseSound(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      if (args.UN_PAUSE === "pause") this.typeOverlay(sound, "pause");
      else this.typeOverlay(sound, "play");
    }

    ctrlSounds(args) {
      if (args.CONTROL === "start") Object.keys(soundBank).forEach(key => { this.play(soundBank[key].context, 0, soundBank[key]) });
      else if (args.CONTROL === "stop") Object.keys(soundBank).forEach(key => { soundBank[key].context.stop() });
      else if (args.CONTROL === "pause") Object.keys(soundBank).forEach(key => { soundBank[key].context.pause() });
      else {
        Object.keys(soundBank).forEach(key => {
          soundBank[key].context.play();
          this.patchLinks(soundBank[key].context.sourceNode, soundBank[key]);
        });
      }
    }

    enableControl(args) { settings.flagCtrl = args.ON_OFF === "on" }

    toggleOverlap(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      sound.overlap = args.TYPE === "on";
    }

    toggleLoop(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      sound.context.loop = args.TYPE === "on";
      if (args.TYPE === "off") this.typeOverlay(sound, "stop");
    }

    toggleReverse(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      if (sound.reversed === (args.TYPE === "on")) return;
      sound.reversed = args.TYPE === "on";
      this.typeOverlay(sound, "stop");
      const node = sound.context.sourceNode;
      const reverseBuffer = (audioBuffer) => {
        for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
          audioBuffer.getChannelData(i).reverse();
        }
        return audioBuffer;
      }
      const bufferSource = node.context.createBufferSource();
      bufferSource.buffer = reverseBuffer(node.buffer);
      bufferSource.connect(node.context.destination);
    }

    loopParams(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      sound.context.loop = true; // Auto-turn it on
      const srcNode = sound.context.sourceNode;
      srcNode.loopStart = Scratch.Cast.toNumber(args.START);
      srcNode.loopEnd = Scratch.Cast.toNumber(args.END);
      sound.loopParm = [srcNode.loopStart, srcNode.loopEnd];
    }

    deleteSound(args) {
      this.stopSound(args);
      delete soundBank[args.NAME];
    }

    deleteAllSounds() {
      this.ctrlSounds({ CONTROL: "stop" });  
      soundBank = {};
    }

    allSounds() { return JSON.stringify(Object.keys(soundBank)) }

    allPlaySounds() {
      const players = [];
      Object.entries(soundBank).forEach(([key, innerSrc]) => {
        if (innerSrc.context.playing) players.push(key);
      });
      return JSON.stringify(players);
    }

    soundCheck(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return false;
      switch (args.CONTROL) {
        case "exists": return sound.loaded;
        case "playing": return sound.context.playing;
        case "paused": return sound.context.paused;
        case "looped": return sound.context.loop;
        case "overlaped": return sound.overlap;
        case "reversed": return sound.reversed;
        case "binded": return sound.isBind;
        default: return false;
      }
    }

    soundProperty(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return 0;
      const src = sound.context.sourceNode;
      switch (args.PROP) {
        case "length": return this.modTime(src.buffer.duration, sound);
        case "current time": return !sound.context.playing ? 0 : 
          this.calcTime(
            sound.context.loop && sound.loopParm[1] ? sound.loopParm[1] : src.buffer.duration,
            sound.context.lastTimePlayed, src.context.currentTime, sound
          );
        case "source": return sound.src;
        case "binds": return JSON.stringify(Object.keys(sound.binds));
        case "volume": return sound.vol;
        case "pitch": return Math.round((sound.pitch - 1) * 100);
        case "detune": return sound.detune / 10;
        case "speed": return sound.speed * 100;
        case "gain": return sound.gain * 100;
        case "pan": return sound.effects[args.PROP.toUpperCase()]?.options.pan * 100 || 0;
        case "distortion": return sound.effects[args.PROP.toUpperCase()]?.options.gain * 100 || 0;
        default: {
          const effect = sound.effects[args.PROP.toUpperCase()];
          if (effect === undefined) return "";
          return JSON.stringify(effect.arguments);
        }
      }
    }

    getLoudTime(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return 0;
      const time = Scratch.Cast.toNumber(args.TIME);
      const duration = sound.context.sourceNode.buffer.duration;
      if (time < 0 || time > duration) return 0;
      const audioBuffer = sound.context.sourceNode.buffer;
      const sampleRate = audioBuffer.sampleRate;
      const channelData = audioBuffer.getChannelData(0);
      const sampleIndex = Math.floor(sampleRate * time);

      const windowSize = sampleRate * 0.1;
      const startSample = Math.max(0, sampleIndex - windowSize / 2);
      const endSample = Math.min(channelData.length, sampleIndex + windowSize / 2);

      let sample = 0;
      if (args.TYPE === "raw noise") sample = channelData[endSample];
      else {
        for (let i = startSample; i < endSample; i++) {
          sample += channelData[i] * channelData[i];
        }
        const rms = Math.sqrt(sample / (endSample - startSample));
        const dB = 20 * Math.log10(rms);
        sample = Math.min(Math.max((dB + 50) / 50, 0), 1) * 100;
      }
      return isNaN(sample) ? 0 : sample * sound.gain;
    }

    setVol(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      sound.vol = Math.max(0, Scratch.Cast.toNumber(args.NUM));
    }

    resetEffect(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      if (args.EFFECT === "all effects") {
        const effects = sound.effects;
        Object.keys(effects).forEach(key => { sound.context.removeEffect(effects[key]) });
        sound.effects = {};
      }
      if (args.EFFECT === "all effects" || args.EFFECT === "pitch") sound.pitch = 1;
      if (args.EFFECT === "all effects" || args.EFFECT === "detune") sound.detune = 0;
      if (args.EFFECT === "all effects" || args.EFFECT === "speed") sound.speed = 1;
      if (args.EFFECT === "all effects" || args.EFFECT === "gain") sound.gain = 1;
      const name = args.EFFECT.toUpperCase();
      if (sound.effects[name] !== undefined) {
        sound.context.removeEffect(sound.effects[name]);
        delete sound.effects[name];
      }
      this.patchLinks(sound.context.sourceNode, sound);
    }

    setThing(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const value = Scratch.Cast.toNumber(args.VALUE) / 100;
      if (args.TYPE === "pitch") sound.pitch = Math.max(0, value + 1);
      else if (args.TYPE === "detune") sound.detune = value * 1000;
      else if (args.TYPE === "speed") sound.speed = Math.max(0, value);
      else if (args.TYPE === "gain") sound.gain = value;
      else if (args.TYPE === "pan") {
        const pan = new Pizzicato.Effects.StereoPanner({ pan: Math.max(-1, Math.min(1, value)) });
        return this.updateEffect(pan, sound, "PAN", args);
      } else {
        const distort = new Pizzicato.Effects.Distortion({ gain: value });
        return this.updateEffect(distort, sound, "DISTORTION", args);
      }
      this.patchLinks(sound.context.sourceNode, sound);
    }

    setReverb(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const reverb = new Pizzicato.Effects.Reverb({
        time: Scratch.Cast.toNumber(args.TIME) / 10, decay: Scratch.Cast.toNumber(args.DECAY) / 10,
        mix: Scratch.Cast.toNumber(args.MIX) / 100,
      });
      this.updateEffect(reverb, sound, "REVERB", args);
    }

    setDelay(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const delay = new Pizzicato.Effects.Delay({
        time: Math.min(1, Math.max(0, Scratch.Cast.toNumber(args.TIME) / 100)),
        decay: Scratch.Cast.toNumber(args.FEED) / 100, mix: Scratch.Cast.toNumber(args.MIX) / 100,
      });
      this.updateEffect(delay, sound, "DELAY", args);
    }

    setFuzz(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const fuzz = new Pizzicato.Effects.Quadrafuzz({
        lowGain: Math.min(1, Math.max(0, Scratch.Cast.toNumber(args.LOW) / 100)),
        midLowGain: Math.min(1, Math.max(0, Scratch.Cast.toNumber(args.MED1) / 100)),
        midHighGain: Math.min(1, Math.max(0, Scratch.Cast.toNumber(args.MED2) / 100)),
        highGain: Math.min(1, Math.max(0, Scratch.Cast.toNumber(args.HIGH) / 100)),
        mix: Scratch.Cast.toNumber(args.MIX) / 100
      });
      this.updateEffect(fuzz, sound, "FUZZ", args);
    }

    setBitcrush(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      /* NOTE: Bitcrusher uses "ScriptProcessorNode" wich is deprecated.
        From what Ive tested and read online, ending support for this doesnt seem to be 
        going anywhere. If a problem emerges we need to try and find a way to
        use "AudioWorkletNodes" instead which is more complicated to use.
      */
      const bitcrush = new Pizzicato.Effects.Bitcrusher({
        bits: Math.max(10, Scratch.Cast.toNumber(args.BITS)) / 10,
        frequency : Math.max(30000, Scratch.Cast.toNumber(args.FREQ))
      });
      this.updateEffect(bitcrush, sound, "BITCRUSH", args);
    }

    setTremolo(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const distort = new Pizzicato.Effects.Tremolo({
        speed: Scratch.Cast.toNumber(args.SPEED) / 5,
        depth: Scratch.Cast.toNumber(args.DEPTH) / 100,
        mix: Scratch.Cast.toNumber(args.MIX) / 100
      });
      this.updateEffect(distort, sound, "TREMOLO", args);
    }

    setPass(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      if (args.TYPE === "highpass") {
        const highpass = new Pizzicato.Effects.LowPassFilter({
          frequency: Scratch.Cast.toNumber(args.FREQ), peak:Scratch.Cast.toNumber(args.PEAK) / 5
        });
        this.updateEffect(highpass, sound, "HIGHPASS", args);
      } else {
        const lowpass = new Pizzicato.Effects.LowPassFilter({
          frequency: Scratch.Cast.toNumber(args.FREQ), peak: Scratch.Cast.toNumber(args.PEAK) / 5
        });
        this.updateEffect(lowpass, sound, "LOWPASS", args);
      }
    }

    setFlanger(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const flang = new Pizzicato.Effects.Flanger({
        time: Scratch.Cast.toNumber(args.TIME) / 100, speed: Scratch.Cast.toNumber(args.SPEED) / 100,
        depth: Scratch.Cast.toNumber(args.DEPTH) / 100, feedback: Scratch.Cast.toNumber(args.FEED) / 100,
        mix: Scratch.Cast.toNumber(args.MIX) / 100
      });
      this.updateEffect(flang, sound, "FLANGER", args);
    }

    setCompress(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const compress = new Pizzicato.Effects.Compressor({
        threshold: Math.min(0, Math.max(-100, Scratch.Cast.toNumber(args.THRESH) * -1)),
        ratio: Scratch.Cast.toNumber(args.RATIO) / 5, attack: Math.min(0, Math.max(1, Scratch.Cast.toNumber(args.ATTACK) / 100)),
        release: Math.min(0, Math.max(1, Scratch.Cast.toNumber(args.RELEASE) / 100)), knee: Scratch.Cast.toNumber(args.KNEE) / 2.5
      });
      this.updateEffect(compress, sound, "COMPRESSOR", args);
    }

    setEqualize(args) {
      const sound = soundBank[args.NAME];
      if (sound === undefined) return;
      const equalizer = new Pizzicato.Effects.ThreeBandEqualizer({
        cutoff_frequency_high: 12000 + (Scratch.Cast.toNumber(args.CUT_HIGH) * 120),
        cutoff_frequency_low: 12000 + (Scratch.Cast.toNumber(args.CUT_LOW) * 120),
        low_band_gain: Scratch.Cast.toNumber(args.LOW) / 10,
        mid_band_gain: Scratch.Cast.toNumber(args.MID) / 10,
        high_band_gain: Scratch.Cast.toNumber(args.HIGH) / 10
      });
      this.updateEffect(equalizer, sound, "EQUALIZER", args);
    }

    save2Project(args) {
      settings.canSave = args.SAVE === "save";
      if (!Scratch.extensions.isPenguinMod) {
        if (settings.canSave) {
          const convertBank = JSON.parse(JSON.stringify(soundBank));
          Object.values(convertBank).forEach(item => delete item.context);
          runtime.extensionStorage["SPtuneShark3"] = { bank : convertBank, settings };
        } else { runtime.extensionStorage["SPtuneShark3"] = undefined }
      }
    }
  }

  Scratch.extensions.register(new SPtuneShark3());
})(Scratch);
