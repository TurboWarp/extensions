// Name: MIDI Synthesizer
// ID: midisynth
// Description: A MIDI synthesizer for TurboWarp.
// By: samuellouf <https://github.com/samuellouf>

(function (Scratch) {
  "use strict";

  const iconURI = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwLDAsNTAwLDUwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSItMjAuNTEwNTIiIHkxPSIzMi45NDc0NiIgeDI9IjQ4MC45OTEiIHkyPSIzMi45NDc0NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM5ZTkyODYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNhZWFiYTYiLz48L2xpbmVhckdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBjeD0iOTIuNTEzNzEiIGN5PSIxMjQuNjU3MzQiIHI9IjY0LjMwODY4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTIiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzIyMWQxYSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzA4MDgwOCIvPjwvcmFkaWFsR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGN4PSIxNjcuMDA0NiIgY3k9IjEzMC45OTg4OSIgcj0iNjcuNzkyMDciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMyI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjIxZDFhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgwODA4Ii8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgY3g9IjI2Mi45OTg5NyIgY3k9IjEyMC45ODk1MSIgcj0iNjcuNzkyMDciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItNCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjIxZDFhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgwODA4Ii8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgY3g9IjM2Ni40MjgwOCIgY3k9IjEwNC43NDIyMSIgcj0iNjcuNzkyMDciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItNSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjIxZDFhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgwODA4Ii8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgY3g9IjMxMS44ODAyOCIgY3k9IjExNS45ODI2OSIgcj0iNjcuNzkyMDciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItNiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjIxZDFhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgwODA4Ii8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgY3g9IjQxNC40MjQ2MiIgY3k9IjEwNy4zNDAxMiIgcj0iNjcuNzkyMDciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItNyI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjIxZDFhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgwODA4Ii8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgY3g9IjQ4NS41Njc5NCIgY3k9IjEwNS44MDc4NyIgcj0iNjcuNzkyMDciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItOCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjIxZDFhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgwODA4Ii8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgY3g9IjQ0OS42MTIxOSIgY3k9IjEwMi4zMzQ3NiIgcj0iNjcuNzkyMDciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItOSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjIxZDFhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgwODA4Ii8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgY3g9IjU0NS45MDQ4MSIgY3k9IjEwMi4xMDk0IiByPSI2Ny43OTIwNyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjIxZDFhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDgwODA4Ii8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgY3g9IjUxMi4zMDI0NyIgY3k9IjEwMi4zNDA5OSIgcj0iNjcuNzkyMDciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMTEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzIyMWQxYSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzA4MDgwOCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkuODY4NTYsNjkuNzY3NzYpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0tOS44Njg1Niw0MjkuNzY3ODF2LTQ5OS41MzU1N2g0OTkuNzM3MTF2NDk5LjUzNTU3eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9Ik5hTiIvPjxwYXRoIGQ9Ik0wLjUxMDUyLDM1OS41MjQwNGwtMS41MDE1LC0yODMuNzgzNzhsNDgxLjk4MTk4LC0zLjAwM2wtOS4wMDkwMSwxOTUuMTk1MmwtMjk3LjcwMDE1LDk0Ljc1NTkxeiIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNLTEuMzA5NjQsNzkuNzA4ODNsLTAuNTM1OTEsLTc4LjYxMzk4bDQ4MS4zMzUwMywyLjU3MzMxbDEuNTAxNSw3Ni41NzY1OHoiIGZpbGw9InVybCgjY29sb3ItMSkiIHN0cm9rZT0iIzA4MDgwOCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTS0yLjQ5MjQ4LDM2MS42ODE2OWwtMC43NTAxOSwtMjgwLjc4MzAzbDMzLjc4MDk3LC0wLjc1MDE5bC0xLjUwMDM3LDI4MS41MzMyMnoiIGZpbGw9IiNlNmU2ZTYiIHN0cm9rZT0iIzA4MDgwOCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cGF0aCBkPSJNMzYuNTQ2NTYsMzYxLjY5MDcxbC0yLjI1MDU2LC0yODEuNTM3NzNsMzAuMDQyNDIsLTAuNzUwMThsMTguMTM3NjgsMTM5LjExNjQxbDI5LjUwMDA2LC01LjA5MzVsMzUuMjU3OTksMTQ3LjUxNDgxeiIgZmlsbD0iI2U2ZTZlNiIgc3Ryb2tlPSIjMDgwODA4IiBzdHJva2Utd2lkdGg9IjIuNSIvPjxwYXRoIGQ9Ik0xNTIuOTAyMzYsMzYxLjI3NDY0bC0zNi40MTc0NywtMTQ3LjEyODM2bDEyLjYyMTcxLC0yLjk3NzI2bC0zNC45MjE1NCwtMTMzLjA4OTk2bDI4LjkzNjI5LC0xLjEyNTI5bDUxLjMzNjY1LDEyNi43NzY1OGwxMS42MjM1NCwwLjg2OTc0bDYxLjIzMzAyLDEzNS40OTcxN3oiIGZpbGw9IiNlNmU2ZTYiIHN0cm9rZT0iIzA4MDgwOCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cGF0aCBkPSJNMjQ4Ljc4NDUyLDMzOC4xNTQ5NWwtNjAuNDcwNTEsLTEzNS4xMzM4NGwyMC44MzE0MiwtMi41NDIyN2MwLDAgLTUuNTkyODMsLTM5LjA2NDQzIC0xMC4yMzczMiwtNDcuOTkwNDNjLTEwLjc4NjI2LC0yMC43Mjk1MyAtNDQuNDQyOTgsLTc2LjQ4Nzg5IC00NC40NDI5OCwtNzYuNDg3ODloMTkuODc2NzlsMTQ3LjM3NDA2LDIzNy41MDI3OHoiIGZpbGw9IiNlNmU2ZTYiIHN0cm9rZT0iIzA4MDgwOCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cGF0aCBkPSJNMzI1LjQ1NzY2LDMwOC4yNDU2MmwtMTQ3LjkwOTk2LC0yMzEuNDQzNjZsMTguMzU1OTcsLTEuMDcxODFsODEuMjQ5MDMsMTA4Ljg1NjRsMjQuNDY3NywwLjM5MzA1bDgyLjM4NjE3LDEwNi42NTI5NnoiIGZpbGw9IiNlNmU2ZTYiIHN0cm9rZT0iIzA4MDgwOCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cGF0aCBkPSJNNDM3LjAxMTQsMjcwLjYwOTRsLTg3LjQzMzQyLC05NC40MTM5N2MwLDAgMTAuMDQ1NCwtMi4xNDQyMyAxMC45OTYxOCwtMy4yMjIwOGMwLjk1NzU3LC0xLjA4NTU0IC01LjI3MDk4LC0zLjI2ODI1IC01LjI3MDk4LC0zLjI2ODI1bC0yLjI1ODMsLTI3LjU1ODk1bDI5Ljg3MTY0LDI1Ljk2NzU2bDUuNDc0MjEsMS4wNzE5MWMwLDAgMzQuMDY1MzMsMzQuMzUyMzUgNDcuNzgyMTEsNDYuOTM0MDVjMTUuMDMzNDEsMTMuNzg5MzcgNDEuNzMwNDEsMzkuMzQwMzYgNDEuNzMwNDEsMzkuMzQwMzZ6IiBmaWxsPSIjZTZlNmU2IiBzdHJva2U9IiMwODA4MDgiIHN0cm9rZS13aWR0aD0iMi41Ii8+PHBhdGggZD0iTTM4Ni44MTI2MywyODkuNzU5NTRsLTg0LjIxOTE1LC0xMDQuODYyNDNsNS4xMTkyNCwtMy45MjkzMWwtMy4zNzA5MiwtNC42NjIyNmwtNS44MDM5NiwtMzEuOTcwMDRsLTY2LjY5NDMxLC03MS42OTE4OWw0LjA5MDA0LDAuNDIzMDFsMTAwLjU3ODA2LDEwMy4xODk1bDExLjM5NjU1LDAuMDMxMjJsODYuOTQ3NjcsOTYuMzIzMjJ6IiBmaWxsPSIjZTZlNmU2IiBzdHJva2U9IiMwODA4MDgiIHN0cm9rZS13aWR0aD0iMi41Ii8+PHBhdGggZD0iTTQwMS42MDQ5MSwxNjYuMDY2NGwtMS43NjUyMiwtMTguMTA5NDZsNzcuOTUwOTUsNjQuNDQ3NGMwLDAgMC4xNzQzNSw2Ljk2MzY5IDAuMjk1NTcsMTEuODA1MzdjMC4xOTM3OSw3Ljc0MDI1IDAuNzU1NCwzMC4xNzE1MyAwLjc1NTQsMzAuMTcxNTNsLTg4LjUwMzY0LC04NC40NzkzOXoiIGZpbGw9IiNlNmU2ZTYiIHN0cm9rZT0iIzA4MDgwOCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cGF0aCBkPSJNNDc5LjQ3NzIxLDIxMy4wMjA3NWwtNzguMzQzMSwtNjYuMzU3M2wtMy44MjY2MiwtMTIuNTA5NzhsLTc4LjgxMjU0LC02MC44NDQyNGwxMi41NjA5OSwxLjM2NDI2bDEwNy40NTI0NSw4Ni40Nzk3OGwxMy45ODU1LC0wLjE5NDUxbDI4LjM4NjA3LDIwLjk3NzA5eiIgZmlsbD0iI2U2ZTZlNiIgc3Ryb2tlPSIjMDgwODA4IiBzdHJva2Utd2lkdGg9IjIuNSIvPjxwYXRoIGQ9Ik00NTUuMzkyMTksMTYwLjM1MzUxbC0wLjMyNjE1LC0xNy44ODI4NmwxOS4xODc0OCwxMy4zNzI0N2w1LjQ3NzMzLDAuODIxMDRsMS4zNzE5OCwyMy41ODQ5OHoiIGZpbGw9IiNlNmU2ZTYiIHN0cm9rZT0iIzA4MDgwOCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cGF0aCBkPSJNMjcxLjExOTg0LDM1OS41MjQwNGwtMTEyLjUyODEzLDAuNzMzMjlsMzE5LjM1MTIyLC0xMDMuOTMxMjRsMS42ODU0NiwyMC4wODI2NXoiIGZpbGw9IiNjOWM5YzkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTgzLjkzOTIyLDIxNi4yOTcyMWwtMjAuOTAwMzIsLTE1NS45NDg1NWwyNi43OTUyOCwtMS4wNzE4MWwzOC41ODUyMSwxNTEuNjYxMzF6IiBmaWxsPSJ1cmwoI2NvbG9yLTIpIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0xMjguOTU1Myw1OC45MTk1N2wxNi4wNzcxNywwLjUzNTlsNTYuMjcwMSw5Ni40NjMwMmw3LjUwMjY4LDQyLjg3MjQ2bC0zNC4zMjY4Myw0LjE0NDIxbC01MC4xOTYxNSwtMTI1LjY1MDUzeiIgZmlsbD0idXJsKCNjb2xvci0zKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjA0LjY0OTU4LDYxLjI2Njc3bDE1LjYzNTg2LC0xLjIyOTMybDc3LjQ1MjgsODMuMjIzODNsNy41MDI2OCwzOS4zNDIwMWwtMjcuMjY1OTMsMy43MDI5bC04MC42NDYyOSwtMTA5Ljc2MzV6IiBmaWxsPSJ1cmwoI2NvbG9yLTQpIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yODguMjUwMTYsNjEuNjMyNTVsMTIuNDIwNDIsLTAuNjkzNDFsOTcuMjgxMzIsNzIuNTA1NzJsMy4yMTU0NCwzMi4zNzUyM2wtMTQuNDA0Miw1LjMxMDYybC0xMDQuMjI2MTMsLTk0LjIyMjI0eiIgZmlsbD0idXJsKCNjb2xvci01KSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjQ5Ljc3OTk1LDYxLjUxMTI2bDExLjEzNDczLC0xLjIyOTMybDkyLjQ1NjU2LDc2Ljg0NzI0bDUuMjUyMTIsMzcuMDkxNDRsLTIxLjYzOTUyLDIuNTc3NjJsLTk1LjY1MDA0LC0xMDAuMzg2MTZ6IiBmaWxsPSJ1cmwoI2NvbG9yLTYpIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0zNDAuNTMzOTcsNjQuMjMwNDZsOS4yMDQ5OSwtMi44MzcwM2wxMDMuNzEyMTgsNjcuNjgyNTdsMS4wNzE4MSwzMS4zMDM0MmwtMTQuNDA0MiwwLjQ4NzQ3bC0xMDUuODMzODUsLTg0LjU3NTk0eiIgZmlsbD0idXJsKCNjb2xvci03KSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNNDEyLjIxMzE5LDY1LjkxMzY0bDguNjY5MDgsLTEuMjI5MzJsNTkuMjMyMDEsMzIuMzEyNzl2MjUuOTQ0MzdsLTc3LjM2NTU5LC00Ni4wMzkxN3oiIGZpbGw9InVybCgjY29sb3ItOCkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTM3MS40MzQyOSw2NS4xMjAwNWwxMy40OTIyMywtMC42OTM0Mmw5NS42NzM2LDU2Ljk2NDQ2bDAuNTM1OTEsMzMuNDQ3MDRsLTUuODI5NywxLjAyMzM3bC0xMDYuOTA1NjYsLTgyLjQzMjMxeiIgZmlsbD0idXJsKCNjb2xvci05KSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNNDU3LjM4NTUsNjYuNTAxNTlsNi4yMDQyNCwtMC45NjE1NmwxNi41MjE5OCw4LjQxMTcybC0wLjgwMzY2LDExLjc5ODU0bC0yMy42NzA1LC0xNS40NDAyOHoiIGZpbGw9InVybCgjY29sb3ItMTApIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik00MzYuNzgxMDIsNjUuMTAyMTRsNy45MDAzNiwtMC4yMjc3N2wzNS44NzEzNSwxOC40MzI3M2wtMC4yODYwNywxNS4xMjQzbC00OC4xMDM5MSwtMjcuMTM5NjF6IiBmaWxsPSJ1cmwoI2NvbG9yLTExKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==";
  
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed");
  }

  var SpessaSynth_core = (() => {
    //#region src/utils/byte_functions/big_endian.ts
    /**
    * Reads number as Big endian.
    * @param dataArray the array to read from.
    * @param bytesAmount the number of bytes to read.
    * @param offset the offset to start reading from.
    * @returns the number.
    */
    function readBigEndian(dataArray, bytesAmount, offset = 0) {
      let out = 0;
      for (let i = 0; i < bytesAmount; i++) out = out << 8 | dataArray[offset + i];
      return out >>> 0;
    }
    /**
    * Reads number as Big endian from an IndexedByteArray.
    * @param dataArray the array to read from.
    * @param bytesAmount the number of bytes to read.
    * @returns the number.
    */
    function readBigEndianIndexed(dataArray, bytesAmount) {
      const res = readBigEndian(dataArray, bytesAmount, dataArray.currentIndex);
      dataArray.currentIndex += bytesAmount;
      return res;
    }
    /**
    * Writes a number as Big endian.
    * @param number the number to write.
    * @param bytesAmount the amount of bytes to use. Excess bytes will be set to zero.
    * @returns the Big endian representation of the number.
    */
    function writeBigEndian(number, bytesAmount) {
      const bytes = new Array(bytesAmount).fill(0);
      for (let i = bytesAmount - 1; i >= 0; i--) {
        bytes[i] = number & 255;
        number >>= 8;
      }
      return bytes;
    }
    //#endregion
    //#region src/utils/byte_functions/little_endian.ts
    /**
    * Reads the number as little endian from an IndexedByteArray.
    * @param dataArray the array to read from.
    * @param bytesAmount the number of bytes to read.
    * @returns the number.
    */
    function readLittleEndianIndexed(dataArray, bytesAmount) {
      const res = readLittleEndian(dataArray, bytesAmount, dataArray.currentIndex);
      dataArray.currentIndex += bytesAmount;
      return res;
    }
    /**
    * Reads the number as little endian.
    * @param dataArray the array to read from.
    * @param bytesAmount the number of bytes to read.
    * @param offset the offset to start reading at.
    * @returns the number.
    */
    function readLittleEndian(dataArray, bytesAmount, offset = 0) {
      let out = 0;
      for (let i = 0; i < bytesAmount; i++) out |= dataArray[offset + i] << i * 8;
      return out >>> 0;
    }
    /**
    * Writes a number as little endian seems to also work for negative numbers so yay?
    * @param dataArray the IndexedByteArray to write to.
    * @param number the number to write.
    * @param byteTarget the amount of bytes to use. Excess bytes will be set to zero.
    * @returns the Big endian representation of the number.
    */
    function writeLittleEndianIndexed(dataArray, number, byteTarget) {
      for (let i = 0; i < byteTarget; i++) dataArray[dataArray.currentIndex++] = number >> i * 8 & 255;
    }
    /**
    * Writes a WORD (SHORT)
    */
    function writeWord(dataArray, word) {
      dataArray[dataArray.currentIndex++] = word & 255;
      dataArray[dataArray.currentIndex++] = word >> 8;
    }
    /**
    * Writes a DWORD (INT)
    */
    function writeDword(dataArray, dword) {
      writeLittleEndianIndexed(dataArray, dword, 4);
    }
    /**
    * Reads two bytes as a signed short.
    */
    function signedInt16(byte1, byte2) {
      const val = byte2 << 8 | byte1;
      if (val > 32767) return val - 65536;
      return val;
    }
    /**
    * Reads a byte as a signed char.
    */
    function signedInt8(byte) {
      if (byte > 127) return byte - 256;
      return byte;
    }
    //#endregion
    //#region src/utils/indexed_array.ts
    /**
    * Indexed_array.ts
    * purpose: extends Uint8Array with a currentIndex property.
    */
    var IndexedByteArray = class extends Uint8Array {
      /**
      * The current index of the array.
      */
      currentIndex = 0;
      /**
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
      */
      slice(start, end) {
        const a = super.slice(start, end);
        a.currentIndex = 0;
        return a;
      }
    };
    //#endregion
    //#region src/utils/byte_functions/string.ts
    /**
    * Reads bytes as an ASCII string. This version works with any numeric array.
    * @param dataArray the array to read from.
    * @param bytes the amount of bytes to read.
    * @param offset the offset in the array to start reading from.
    * @returns the string.
    */
    function readBinaryString(dataArray, bytes = dataArray.length, offset = 0) {
      let string = "";
      for (let i = 0; i < bytes; i++) {
        const byte = dataArray[offset + i];
        if (byte === 0) return string;
        string += String.fromCharCode(byte);
      }
      return string;
    }
    /**
    * Reads bytes as an ASCII string from an IndexedByteArray.
    * @param dataArray the IndexedByteArray to read from.
    * @param bytes the amount of bytes to read.
    * @returns the string.
    */
    function readBinaryStringIndexed(dataArray, bytes) {
      const startIndex = dataArray.currentIndex;
      dataArray.currentIndex += bytes;
      return readBinaryString(dataArray, bytes, startIndex);
    }
    /**
    * Gets ASCII bytes from string.
    * @param string the string.
    * @param addZero adds a zero terminator at the end.
    * @param ensureEven ensures even byte count.
    * @returns the binary data.
    */
    function getStringBytes(string, addZero = false, ensureEven = false) {
      let len = string.length;
      if (addZero) len++;
      if (ensureEven && len % 2 !== 0) len++;
      const arr = new IndexedByteArray(len);
      writeBinaryStringIndexed(arr, string);
      return arr;
    }
    /**
    * Writes ASCII bytes into a specified array.
    * @param string the string.
    * @param outArray the target array
    * @param padLength pad with zeros if the string is shorter
    * @returns modified _in-place_
    */
    function writeBinaryStringIndexed(outArray, string, padLength = 0) {
      if (padLength > 0 && string.length > padLength) string = string.slice(0, padLength);
      for (let i = 0; i < string.length; i++) outArray[outArray.currentIndex++] = string.charCodeAt(i);
      if (padLength > string.length) for (let i = 0; i < padLength - string.length; i++) outArray[outArray.currentIndex++] = 0;
      return outArray;
    }
    //#endregion
    //#region src/utils/byte_functions/variable_length_quantity.ts
    /**
    * Reads VLQ from a MIDI byte array.
    * @param MIDIbyteArray the array to read from.
    * @returns the number.
    */
    function readVariableLengthQuantity(MIDIbyteArray) {
      let out = 0;
      while (MIDIbyteArray) {
        const byte = MIDIbyteArray[MIDIbyteArray.currentIndex++];
        out = out << 7 | byte & 127;
        if (byte >> 7 !== 1) break;
      }
      return out;
    }
    /**
    * Writes a VLQ from a number to a byte array.
    * @param number the number to write.
    * @returns the VLQ representation of the number.
    */
    function writeVariableLengthQuantity(number) {
      const bytes = [number & 127];
      number >>= 7;
      while (number > 0) {
        bytes.unshift(number & 127 | 128);
        number >>= 7;
      }
      return bytes;
    }
    //#endregion
    //#region src/utils/other.ts
    /**
    * Other.ts
    * purpose: contains some useful functions that don't belong in any specific category
    */
    /**
    * Formats the given seconds to nice readable time
    * @param totalSeconds time in seconds
    */
    function formatTime(totalSeconds) {
      totalSeconds = Math.floor(totalSeconds);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.round(totalSeconds - minutes * 60);
      return {
        minutes,
        seconds,
        time: `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      };
    }
    /**
    * Does what it says
    */
    function arrayToHexString(arr) {
      let hexString = "";
      for (const i of arr) {
        const hex = i.toString(16).padStart(2, "0").toUpperCase();
        hexString += hex;
        hexString += " ";
      }
      return hexString;
    }
    const consoleColors = {
      warn: "color: orange;",
      unrecognized: "color: red;",
      info: "color: aqua;",
      recognized: "color: lime",
      value: "color: yellow; background-color: black;"
    };
    //#endregion
    //#region src/externals/fflate/fflate.min.js
    let tr;
    (() => {
      var l = Uint8Array, T = Uint16Array, ur = Int32Array, W = new l([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        0,
        0,
        0,
        0
      ]), X = new l([
        0,
        0,
        0,
        0,
        1,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        8,
        8,
        9,
        9,
        10,
        10,
        11,
        11,
        12,
        12,
        13,
        13,
        0,
        0
      ]), wr = new l([
        16,
        17,
        18,
        0,
        8,
        7,
        9,
        6,
        10,
        5,
        11,
        4,
        12,
        3,
        13,
        2,
        14,
        1,
        15
      ]), Y = function(r, a) {
        for (var e = new T(31), f = 0; f < 31; ++f) e[f] = a += 1 << r[f - 1];
        for (var v = new ur(e[30]), f = 1; f < 30; ++f) for (var g = e[f]; g < e[f + 1]; ++g) v[g] = g - e[f] << 5 | f;
        return {
          b: e,
          r: v
        };
      }, Z = Y(W, 2), $ = Z.b, cr = Z.r;
      $[28] = 258, cr[258] = 28;
      var j = Y(X, 0), hr = j.b;
      j.r;
      var _ = new T(32768);
      for (i = 0; i < 32768; ++i) c = (i & 43690) >> 1 | (i & 21845) << 1, c = (c & 52428) >> 2 | (c & 13107) << 2, c = (c & 61680) >> 4 | (c & 3855) << 4, _[i] = ((c & 65280) >> 8 | (c & 255) << 8) >> 1;
      var c, i, A = function(r, a, e) {
        for (var f = r.length, v = 0, g = new T(a); v < f; ++v) r[v] && ++g[r[v] - 1];
        var k = new T(a);
        for (v = 1; v < a; ++v) k[v] = k[v - 1] + g[v - 1] << 1;
        var b;
        if (e) {
          b = new T(1 << a);
          var m = 15 - a;
          for (v = 0; v < f; ++v) if (r[v]) for (var U = v << 4 | r[v], x = a - r[v], n = k[r[v] - 1]++ << x, o = n | (1 << x) - 1; n <= o; ++n) b[_[n] >> m] = U;
        } else for (b = new T(f), v = 0; v < f; ++v) r[v] && (b[v] = _[k[r[v] - 1]++] >> 15 - r[v]);
        return b;
      }, M = new l(288);
      for (i = 0; i < 144; ++i) M[i] = 8;
      var i;
      for (i = 144; i < 256; ++i) M[i] = 9;
      var i;
      for (i = 256; i < 280; ++i) M[i] = 7;
      var i;
      for (i = 280; i < 288; ++i) M[i] = 8;
      var i, L = new l(32);
      for (i = 0; i < 32; ++i) L[i] = 5;
      var i, gr = A(M, 9, 1), br = A(L, 5, 1), q = function(r) {
        for (var a = r[0], e = 1; e < r.length; ++e) r[e] > a && (a = r[e]);
        return a;
      }, u = function(r, a, e) {
        var f = a / 8 | 0;
        return (r[f] | r[f + 1] << 8) >> (a & 7) & e;
      }, C = function(r, a) {
        var e = a / 8 | 0;
        return (r[e] | r[e + 1] << 8 | r[e + 2] << 16) >> (a & 7);
      }, kr = function(r) {
        return (r + 7) / 8 | 0;
      }, xr = function(r, a, e) {
        return (a == null || a < 0) && (a = 0), (e == null || e > r.length) && (e = r.length), new l(r.subarray(a, e));
      }, yr = [
        "unexpected EOF",
        "invalid block type",
        "invalid length/literal",
        "invalid distance",
        "stream finished",
        "no stream handler",
        ,
        "no callback",
        "invalid UTF-8 data",
        "extra field too long",
        "date not in range 1980-2099",
        "filename too long",
        "stream finishing",
        "invalid zip data"
      ], h = function(r, a, e) {
        var f = new Error(a || yr[r]);
        if (f.code = r, Error.captureStackTrace && Error.captureStackTrace(f, h), !e) throw f;
        return f;
      }, Sr = function(r, a, e, f) {
        var v = r.length, g = f ? f.length : 0;
        if (!v || a.f && !a.l) return e || new l(0);
        var k = !e, b = k || a.i != 2, m = a.i;
        k && (e = new l(v * 3));
        var U = function(fr) {
          var or = e.length;
          if (fr > or) {
            var lr = new l(Math.max(or * 2, fr));
            lr.set(e), e = lr;
          }
        }, x = a.f || 0, n = a.p || 0, o = a.b || 0, S = a.l, I = a.d, z = a.m, D = a.n, G = v * 8;
        do {
          if (!S) {
            x = u(r, n, 1);
            var H = u(r, n + 1, 3);
            if (n += 3, H) if (H == 1) S = gr, I = br, z = 9, D = 5;
            else if (H == 2) {
              var N = u(r, n, 31) + 257, s = u(r, n + 10, 15) + 4, d = N + u(r, n + 5, 31) + 1;
              n += 14;
              for (var F = new l(d), P = new l(19), t = 0; t < s; ++t) P[wr[t]] = u(r, n + t * 3, 7);
              n += s * 3;
              for (var rr = q(P), Ar = (1 << rr) - 1, Mr = A(P, rr, 1), t = 0; t < d;) {
                var ar = Mr[u(r, n, Ar)];
                n += ar & 15;
                var w = ar >> 4;
                if (w < 16) F[t++] = w;
                else {
                  var E = 0, O = 0;
                  for (w == 16 ? (O = 3 + u(r, n, 3), n += 2, E = F[t - 1]) : w == 17 ? (O = 3 + u(r, n, 7), n += 3) : w == 18 && (O = 11 + u(r, n, 127), n += 7); O--;) F[t++] = E;
                }
              }
              var er = F.subarray(0, N), y = F.subarray(N);
              z = q(er), D = q(y), S = A(er, z, 1), I = A(y, D, 1);
            } else h(1);
            else {
              var w = kr(n) + 4, J = r[w - 4] | r[w - 3] << 8, K = w + J;
              if (K > v) {
                m && h(0);
                break;
              }
              b && U(o + J), e.set(r.subarray(w, K), o), a.b = o += J, a.p = n = K * 8, a.f = x;
              continue;
            }
            if (n > G) {
              m && h(0);
              break;
            }
          }
          b && U(o + 131072);
          for (var Ur = (1 << z) - 1, zr = (1 << D) - 1, Q = n;; Q = n) {
            var E = S[C(r, n) & Ur], p = E >> 4;
            if (n += E & 15, n > G) {
              m && h(0);
              break;
            }
            if (E || h(2), p < 256) e[o++] = p;
            else if (p == 256) {
              Q = n, S = null;
              break;
            } else {
              var nr = p - 254;
              if (p > 264) {
                var t = p - 257, B = W[t];
                nr = u(r, n, (1 << B) - 1) + $[t], n += B;
              }
              var R = I[C(r, n) & zr], V = R >> 4;
              R || h(3), n += R & 15;
              var y = hr[V];
              if (V > 3) {
                var B = X[V];
                y += C(r, n) & (1 << B) - 1, n += B;
              }
              if (n > G) {
                m && h(0);
                break;
              }
              b && U(o + 131072);
              var vr = o + nr;
              if (o < y) {
                var ir = g - y, Dr = Math.min(y, vr);
                for (ir + o < 0 && h(3); o < Dr; ++o) e[o] = f[ir + o];
              }
              for (; o < vr; ++o) e[o] = e[o - y];
            }
          }
          a.l = S, a.p = Q, a.b = o, a.f = x, S && (x = 1, a.m = z, a.d = I, a.n = D);
        } while (!x);
        return o != e.length && k ? xr(e, 0, o) : e.subarray(0, o);
      }, Tr = new l(0);
      function mr(r, a) {
        return Sr(r, { i: 2 }, a && a.out, a && a.dictionary);
      }
      var Er = typeof TextDecoder < "u" && new TextDecoder();
      try {
        Er.decode(Tr, { stream: !0 });
      } catch {}
      tr = mr;
    })();
    //#endregion
    //#region src/externals/fflate/fflate_wrapper.ts
    const inf = tr;
    //#endregion
    //#region src/utils/loggin.ts
    let ENABLE_INFO = false;
    let ENABLE_WARN = true;
    let ENABLE_GROUP = false;
    /**
    * Enables or disables logging.
    * @param enableInfo enables info.
    * @param enableWarn enables warning.
    * @param enableGroup enables groups.
    */
    function SpessaSynthLogging(enableInfo, enableWarn, enableGroup) {
      ENABLE_INFO = enableInfo;
      ENABLE_WARN = enableWarn;
      ENABLE_GROUP = enableGroup;
    }
    function SpessaSynthInfo(...message) {
      if (ENABLE_INFO) console.info(...message);
    }
    function SpessaSynthWarn(...message) {
      if (ENABLE_WARN) console.warn(...message);
    }
    function SpessaSynthGroup(...message) {
      if (ENABLE_GROUP) console.group(...message);
    }
    function SpessaSynthGroupCollapsed(...message) {
      if (ENABLE_GROUP) console.groupCollapsed(...message);
    }
    function SpessaSynthGroupEnd() {
      if (ENABLE_GROUP) console.groupEnd();
    }
    //#endregion
    //#region src/utils/riff_chunk.ts
    /**
    * Riff_chunk.ts
    * reads a riff chunk and stores it as a class
    */
    var RIFFChunk = class RIFFChunk {
      /**
      * The chunks FourCC code.
      */
      header;
      /**
      * Chunk's size, in bytes.
      */
      size;
      /**
      * Chunk's binary data. Note that this will have a length of 0 if "readData" was set to false.
      */
      data;
      /**
      * Creates a new RIFF chunk.
      */
      constructor(header, size, data) {
        this.header = header;
        this.size = size;
        this.data = data;
      }
      /**
      * Reads a RIFF chunk from an array.
      * @param dataArray the array to read from.
      * @param readData if the data should be read as well.
      * @param forceShift if the index should be shifted to the end of the chunk even if the data has not been read.
      */
      static read(dataArray, readData = true, forceShift = false) {
        const header = readBinaryStringIndexed(dataArray, 4);
        let size = readLittleEndianIndexed(dataArray, 4);
        if (header === "") size = 0;
        const chunkData = readData ? dataArray.slice(dataArray.currentIndex, dataArray.currentIndex + size) : new IndexedByteArray(0);
        if (readData || forceShift) {
          dataArray.currentIndex += size;
          if (size % 2 !== 0) dataArray.currentIndex++;
        }
        return new RIFFChunk(header, size, chunkData);
      }
      /**
      * Writes a RIFF chunk correctly.
      * @param header the fourCC code of the header.
      * @param data the binary chunk data.
      * @param addZeroByte if a zero byte should be at the end of the chunk's data.
      * @param isList if a "LIST" should be set as the chunk type and the actual type should be written at the start of the data.
      * @returns the binary data.
      */
      static write(header, data, addZeroByte = false, isList = false) {
        if (header.length !== 4) throw new Error(`Invalid header length: ${header}`);
        let dataStartOffset = 8;
        let headerWritten = header;
        let dataLength = data.length;
        if (addZeroByte) dataLength++;
        let writtenSize = dataLength;
        if (isList) {
          dataStartOffset += 4;
          writtenSize += 4;
          headerWritten = "LIST";
        }
        let finalSize = dataStartOffset + dataLength;
        if (finalSize % 2 !== 0) finalSize++;
        const outArray = new IndexedByteArray(finalSize);
        writeBinaryStringIndexed(outArray, headerWritten);
        writeDword(outArray, writtenSize);
        if (isList) writeBinaryStringIndexed(outArray, header);
        outArray.set(data, dataStartOffset);
        return outArray;
      }
      /**
      * Writes RIFF chunk given binary blobs.
      * @param header  the fourCC code of the header.
      * @param chunks binary chunk data parts, will be combined in order.
      * @param isList if a "LIST" should be set as the chunk type and the actual type should be written at the start of the data.
      * @returns the binary data
      */
      static writeParts(header, chunks, isList = false) {
        let dataOffset = 8;
        let headerWritten = header;
        const dataLength = chunks.reduce((len, c) => c.length + len, 0);
        let writtenSize = dataLength;
        if (isList) {
          dataOffset += 4;
          writtenSize += 4;
          headerWritten = "LIST";
        }
        let finalSize = dataOffset + dataLength;
        if (finalSize % 2 !== 0) finalSize++;
        const outArray = new IndexedByteArray(finalSize);
        writeBinaryStringIndexed(outArray, headerWritten);
        writeDword(outArray, writtenSize);
        if (isList) writeBinaryStringIndexed(outArray, header);
        for (const c of chunks) {
          outArray.set(c, dataOffset);
          dataOffset += c.length;
        }
        return outArray;
      }
      /**
      * Finds a given type in a list.
      * @remarks
      * Also skips the current index to after the list FourCC.
      */
      static findListType(collection, type) {
        return collection.find((c) => {
          if (c.header !== "LIST") return false;
          c.data.currentIndex = 4;
          return readBinaryString(c.data, 4) === type;
        });
      }
    };
    //#endregion
    //#region src/utils/fill_with_defaults.ts
    /**
    * Fills the object with default values.
    * @param obj object to fill.
    * @param defObj object to fill with.
    */
    function fillWithDefaults(obj, defObj) {
      return {
        ...defObj,
        ...obj
      };
    }
    //#endregion
    //#region src/utils/write_wav.ts
    /**
    * Writes an audio into a valid WAV file.
    * @param audioData the audio data channels.
    * @param sampleRate the sample rate, in Hertz.
    * @param options Additional options for writing the file.
    * @returns the binary file.
    */
    function audioToWav(audioData, sampleRate, options = DEFAULT_WAV_WRITE_OPTIONS) {
      const length = audioData[0].length;
      const numChannels = audioData.length;
      const bytesPerSample = 2;
      const fullOptions = fillWithDefaults(options, DEFAULT_WAV_WRITE_OPTIONS);
      const loop = fullOptions.loop;
      const metadata = fullOptions.metadata;
      let infoChunk = new IndexedByteArray(0);
      const infoOn = Object.keys(metadata).length > 0;
      if (infoOn) {
        const encoder = new TextEncoder();
        const infoChunks = [RIFFChunk.write("ICMT", encoder.encode("Created with SpessaSynth"), true)];
        if (metadata.artist) infoChunks.push(RIFFChunk.write("IART", encoder.encode(metadata.artist), true));
        if (metadata.album) infoChunks.push(RIFFChunk.write("IPRD", encoder.encode(metadata.album), true));
        if (metadata.genre) infoChunks.push(RIFFChunk.write("IGNR", encoder.encode(metadata.genre), true));
        if (metadata.title) infoChunks.push(RIFFChunk.write("INAM", encoder.encode(metadata.title), true));
        infoChunk = RIFFChunk.writeParts("INFO", infoChunks, true);
      }
      let cueChunk = new IndexedByteArray(0);
      const cueOn = loop?.end !== void 0 && loop?.start !== void 0;
      if (cueOn) {
        const loopStartSamples = Math.floor(loop.start * sampleRate);
        const loopEndSamples = Math.floor(loop.end * sampleRate);
        const cueStart = new IndexedByteArray(24);
        writeLittleEndianIndexed(cueStart, 0, 4);
        writeLittleEndianIndexed(cueStart, 0, 4);
        writeBinaryStringIndexed(cueStart, "data");
        writeLittleEndianIndexed(cueStart, 0, 4);
        writeLittleEndianIndexed(cueStart, 0, 4);
        writeLittleEndianIndexed(cueStart, loopStartSamples, 4);
        const cueEnd = new IndexedByteArray(24);
        writeLittleEndianIndexed(cueEnd, 1, 4);
        writeLittleEndianIndexed(cueEnd, 0, 4);
        writeBinaryStringIndexed(cueEnd, "data");
        writeLittleEndianIndexed(cueEnd, 0, 4);
        writeLittleEndianIndexed(cueEnd, 0, 4);
        writeLittleEndianIndexed(cueEnd, loopEndSamples, 4);
        cueChunk = RIFFChunk.writeParts("cue ", [
          new IndexedByteArray([
            2,
            0,
            0,
            0
          ]),
          cueStart,
          cueEnd
        ]);
      }
      const headerSize = 44;
      const dataSize = length * numChannels * bytesPerSample;
      const fileSize = headerSize + dataSize + infoChunk.length + cueChunk.length - 8;
      const header = new Uint8Array(headerSize);
      header.set([
        82,
        73,
        70,
        70
      ], 0);
      header.set(new Uint8Array([
        fileSize & 255,
        fileSize >> 8 & 255,
        fileSize >> 16 & 255,
        fileSize >> 24 & 255
      ]), 4);
      header.set([
        87,
        65,
        86,
        69
      ], 8);
      header.set([
        102,
        109,
        116,
        32
      ], 12);
      header.set([
        16,
        0,
        0,
        0
      ], 16);
      header.set([1, 0], 20);
      header.set([numChannels & 255, numChannels >> 8], 22);
      header.set(new Uint8Array([
        sampleRate & 255,
        sampleRate >> 8 & 255,
        sampleRate >> 16 & 255,
        sampleRate >> 24 & 255
      ]), 24);
      const byteRate = sampleRate * numChannels * bytesPerSample;
      header.set(new Uint8Array([
        byteRate & 255,
        byteRate >> 8 & 255,
        byteRate >> 16 & 255,
        byteRate >> 24 & 255
      ]), 28);
      header.set([numChannels * bytesPerSample, 0], 32);
      header.set([16, 0], 34);
      header.set([
        100,
        97,
        116,
        97
      ], 36);
      header.set(new Uint8Array([
        dataSize & 255,
        dataSize >> 8 & 255,
        dataSize >> 16 & 255,
        dataSize >> 24 & 255
      ]), 40);
      const wavData = new Uint8Array(fileSize + 8);
      let offset = headerSize;
      wavData.set(header, 0);
      let multiplier = 32767;
      if (fullOptions.normalizeAudio) {
        const numSamples = audioData[0].length;
        let maxAbsValue = 0;
        for (let ch = 0; ch < numChannels; ch++) {
          const data = audioData[ch];
          for (let i = 0; i < numSamples; i++) {
            const sample = Math.abs(data[i]);
            if (sample > maxAbsValue) maxAbsValue = sample;
          }
        }
        multiplier = maxAbsValue > 0 ? 32767 / maxAbsValue : 1;
      }
      for (let i = 0; i < length; i++) for (const d of audioData) {
        const sample = Math.min(32767, Math.max(-32768, d[i] * multiplier));
        wavData[offset++] = sample & 255;
        wavData[offset++] = sample >> 8 & 255;
      }
      if (infoOn) {
        wavData.set(infoChunk, offset);
        offset += infoChunk.length;
      }
      if (cueOn) wavData.set(cueChunk, offset);
      return wavData.buffer;
    }
    //#endregion
    //#region src/utils/exports.ts
    const SpessaSynthCoreUtils = {
      consoleColors,
      SpessaSynthInfo,
      SpessaSynthWarn,
      SpessaSynthGroupCollapsed,
      SpessaSynthGroup,
      SpessaSynthGroupEnd,
      readBytesAsUintBigEndian: readBigEndian,
      readLittleEndian: readLittleEndianIndexed,
      readBytesAsString: readBinaryStringIndexed,
      readVariableLengthQuantity,
      inflateSync: inf
    };
    const DEFAULT_WAV_WRITE_OPTIONS = {
      normalizeAudio: true,
      loop: void 0,
      metadata: {}
    };
    //#endregion
    //#region src/midi/enums.ts
    const midiMessageTypes = {
      noteOff: 128,
      noteOn: 144,
      polyPressure: 160,
      controllerChange: 176,
      programChange: 192,
      channelPressure: 208,
      pitchWheel: 224,
      systemExclusive: 240,
      timecode: 241,
      songPosition: 242,
      songSelect: 243,
      tuneRequest: 246,
      clock: 248,
      start: 250,
      continue: 251,
      stop: 252,
      activeSensing: 254,
      reset: 255,
      sequenceNumber: 0,
      text: 1,
      copyright: 2,
      trackName: 3,
      instrumentName: 4,
      lyric: 5,
      marker: 6,
      cuePoint: 7,
      programName: 8,
      midiChannelPrefix: 32,
      midiPort: 33,
      endOfTrack: 47,
      setTempo: 81,
      smpteOffset: 84,
      timeSignature: 88,
      keySignature: 89,
      sequenceSpecific: 127
    };
    const midiControllers = {
      bankSelect: 0,
      modulationWheel: 1,
      breathController: 2,
      undefinedCC3: 3,
      footController: 4,
      portamentoTime: 5,
      dataEntryMSB: 6,
      mainVolume: 7,
      balance: 8,
      undefinedCC9: 9,
      pan: 10,
      expressionController: 11,
      effectControl1: 12,
      effectControl2: 13,
      undefinedCC14: 14,
      undefinedCC15: 15,
      generalPurposeController1: 16,
      generalPurposeController2: 17,
      generalPurposeController3: 18,
      generalPurposeController4: 19,
      undefinedCC20: 20,
      undefinedCC21: 21,
      undefinedCC22: 22,
      undefinedCC23: 23,
      undefinedCC24: 24,
      undefinedCC25: 25,
      undefinedCC26: 26,
      undefinedCC27: 27,
      undefinedCC28: 28,
      undefinedCC29: 29,
      undefinedCC30: 30,
      undefinedCC31: 31,
      bankSelectLSB: 32,
      modulationWheelLSB: 33,
      breathControllerLSB: 34,
      undefinedCC3LSB: 35,
      footControllerLSB: 36,
      portamentoTimeLSB: 37,
      dataEntryLSB: 38,
      mainVolumeLSB: 39,
      balanceLSB: 40,
      undefinedCC9LSB: 41,
      panLSB: 42,
      expressionControllerLSB: 43,
      effectControl1LSB: 44,
      effectControl2LSB: 45,
      undefinedCC14LSB: 46,
      undefinedCC15LSB: 47,
      undefinedCC16LSB: 48,
      undefinedCC17LSB: 49,
      undefinedCC18LSB: 50,
      undefinedCC19LSB: 51,
      undefinedCC20LSB: 52,
      undefinedCC21LSB: 53,
      undefinedCC22LSB: 54,
      undefinedCC23LSB: 55,
      undefinedCC24LSB: 56,
      undefinedCC25LSB: 57,
      undefinedCC26LSB: 58,
      undefinedCC27LSB: 59,
      undefinedCC28LSB: 60,
      undefinedCC29LSB: 61,
      undefinedCC30LSB: 62,
      undefinedCC31LSB: 63,
      sustainPedal: 64,
      portamentoOnOff: 65,
      sostenutoPedal: 66,
      softPedal: 67,
      legatoFootswitch: 68,
      hold2Pedal: 69,
      soundVariation: 70,
      filterResonance: 71,
      releaseTime: 72,
      attackTime: 73,
      brightness: 74,
      decayTime: 75,
      vibratoRate: 76,
      vibratoDepth: 77,
      vibratoDelay: 78,
      soundController10: 79,
      generalPurposeController5: 80,
      generalPurposeController6: 81,
      generalPurposeController7: 82,
      generalPurposeController8: 83,
      portamentoControl: 84,
      undefinedCC85: 85,
      undefinedCC86: 86,
      undefinedCC87: 87,
      undefinedCC88: 88,
      undefinedCC89: 89,
      undefinedCC90: 90,
      reverbDepth: 91,
      tremoloDepth: 92,
      chorusDepth: 93,
      variationDepth: 94,
      phaserDepth: 95,
      dataIncrement: 96,
      dataDecrement: 97,
      nonRegisteredParameterLSB: 98,
      nonRegisteredParameterMSB: 99,
      registeredParameterLSB: 100,
      registeredParameterMSB: 101,
      undefinedCC102LSB: 102,
      undefinedCC103LSB: 103,
      undefinedCC104LSB: 104,
      undefinedCC105LSB: 105,
      undefinedCC106LSB: 106,
      undefinedCC107LSB: 107,
      undefinedCC108LSB: 108,
      undefinedCC109LSB: 109,
      undefinedCC110LSB: 110,
      undefinedCC111LSB: 111,
      undefinedCC112LSB: 112,
      undefinedCC113LSB: 113,
      undefinedCC114LSB: 114,
      undefinedCC115LSB: 115,
      undefinedCC116LSB: 116,
      undefinedCC117LSB: 117,
      undefinedCC118LSB: 118,
      undefinedCC119LSB: 119,
      allSoundOff: 120,
      resetAllControllers: 121,
      localControlOnOff: 122,
      allNotesOff: 123,
      omniModeOff: 124,
      omniModeOn: 125,
      monoModeOn: 126,
      polyModeOn: 127
    };
    //#endregion
    //#region src/midi/midi_message.ts
    var MIDIMessage = class {
      /**
      * Absolute number of MIDI ticks from the start of the track.
      */
      ticks;
      /**
      * The MIDI message status byte. Note that for meta events, it is the second byte. (not 0xFF)
      */
      statusByte;
      /**
      * Message's binary data
      */
      data;
      /**
      * Creates a new MIDI message
      * @param ticks time of this message in absolute MIDI ticks
      * @param byte the message status byte
      * @param data the message's binary data
      */
      constructor(ticks, byte, data) {
        this.ticks = ticks;
        this.statusByte = byte;
        this.data = data;
      }
    };
    /**
    * Gets the status byte's channel
    * @param statusByte the MIDI status byte
    * @returns channel is -1 for system messages -2 for meta and -3 for sysex
    */
    function getChannel(statusByte) {
      const eventType = statusByte & 240;
      const channel = statusByte & 15;
      let resultChannel = channel;
      switch (eventType) {
        case 128:
        case 144:
        case 160:
        case 176:
        case 192:
        case 208:
        case 224: break;
        case 240:
          switch (channel) {
            case 0:
              resultChannel = -3;
              break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
              resultChannel = -1;
              break;
            case 15:
              resultChannel = -2;
              break;
          }
          break;
        default: resultChannel = -1;
      }
      return resultChannel;
    }
    /**
    * Gets the event's status and channel from the status byte
    * @param statusByte the status byte
    * @returns channel will be -1 for sysex and meta
    */
    function getEvent(statusByte) {
      const status = statusByte & 240;
      const channel = statusByte & 15;
      let eventChannel = -1;
      let eventStatus = statusByte;
      if (status >= 128 && status <= 224) {
        eventChannel = channel;
        eventStatus = status;
      }
      return {
        status: eventStatus,
        channel: eventChannel
      };
    }
    const dataBytesAmount = {
      8: 2,
      9: 2,
      10: 2,
      11: 2,
      12: 1,
      13: 1,
      14: 2
    };
    //#endregion
    //#region src/midi/midi_tools/midi_writer.ts
    const writeText = (text, arr) => {
      for (let i = 0; i < text.length; i++) arr.push(text.charCodeAt(i));
    };
    /**
    * Exports the midi as a standard MIDI file
    * @param midi the MIDI to write
    */
    function writeMIDIInternal(midi) {
      if (!midi.tracks) throw new Error("MIDI has no tracks!");
      const binaryTrackData = [];
      for (const track of midi.tracks) {
        const binaryTrack = [];
        let currentTick = 0;
        let runningByte = void 0;
        for (const event of track.events) {
          const deltaTicks = Math.max(0, event.ticks - currentTick);
          if (event.statusByte === midiMessageTypes.endOfTrack) {
            currentTick += deltaTicks;
            continue;
          }
          let messageData;
          if (event.statusByte <= midiMessageTypes.sequenceSpecific) {
            messageData = [
              255,
              event.statusByte,
              ...writeVariableLengthQuantity(event.data.length),
              ...event.data
            ];
            runningByte = void 0;
          } else if (event.statusByte === midiMessageTypes.systemExclusive) {
            messageData = [
              240,
              ...writeVariableLengthQuantity(event.data.length),
              ...event.data
            ];
            runningByte = void 0;
          } else {
            messageData = [];
            if (runningByte !== event.statusByte) {
              runningByte = event.statusByte;
              messageData.push(event.statusByte);
            }
            messageData.push(...event.data);
          }
          binaryTrack.push(...writeVariableLengthQuantity(deltaTicks), ...messageData);
          currentTick += deltaTicks;
        }
        binaryTrack.push(0, 255, midiMessageTypes.endOfTrack, 0);
        binaryTrackData.push(new Uint8Array(binaryTrack));
      }
      const binaryData = [];
      writeText("MThd", binaryData);
      binaryData.push(...writeBigEndian(6, 4), 0, midi.format, ...writeBigEndian(midi.tracks.length, 2), ...writeBigEndian(midi.timeDivision, 2));
      for (const track of binaryTrackData) {
        writeText("MTrk", binaryData);
        binaryData.push(...writeBigEndian(track.length, 4), ...track);
      }
      return new Uint8Array(binaryData).buffer;
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/synth_constants.ts
    /**
    * Default MIDI drum channel.
    */
    const DEFAULT_PERCUSSION = 9;
    const ALL_CHANNELS_OR_DIFFERENT_ACTION = -1;
    const EMBEDDED_SOUND_BANK_ID = `SPESSASYNTH_EMBEDDED_BANK_${Math.random()}_DO_NOT_DELETE`;
    const GENERATOR_OVERRIDE_NO_CHANGE_VALUE = 32767;
    const DEFAULT_SYNTH_METHOD_OPTIONS = { time: 0 };
    const MIN_NOTE_LENGTH = .03;
    const MIN_EXCLUSIVE_LENGTH = .07;
    /**
    * This is needed because effects (regular ones) are send straight from the mono signal, whereas
    * insertion effects receive the panned audio (twice), which reduces gain by a factor of cos(pi/4) * cos(pi/4) (master pan + voice pan).
    * This reverses it.
    */
    const EFX_SENDS_GAIN_CORRECTION = 1 / Math.cos(Math.PI / 4) ** 2;
    const GM2_DEFAULT_BANK = 121;
    /**
    * A class for handling various ways of selecting patches (GS, XG, GM2)
    */
    var BankSelectHacks = class {
      /**
      * GM2 has a different default bank number
      */
      static getDefaultBank(sys) {
        return sys === "gm2" ? GM2_DEFAULT_BANK : 0;
      }
      static getDrumBank(sys) {
        switch (sys) {
          default: throw new Error(`${sys} doesn't have a bank MSB for drums.`);
          case "gm2": return 120;
          case "xg": return 127;
        }
      }
      /**
      * Checks if this bank number is XG drums.
      */
      static isXGDrums(bankMSB) {
        return bankMSB === 120 || bankMSB === 127;
      }
      /**
      * Checks if this MSB is a valid XG MSB
      */
      static isValidXGMSB(bankMSB) {
        return this.isXGDrums(bankMSB) || bankMSB === 64 || bankMSB === GM2_DEFAULT_BANK;
      }
      static isSystemXG(system) {
        return system === "gm2" || system === "xg";
      }
      static addBankOffset(bankMSB, bankOffset, xgDrums = true) {
        if (this.isXGDrums(bankMSB) && xgDrums) return bankMSB;
        return Math.min(bankMSB + bankOffset, 127);
      }
      static subtractBankOffset(bankMSB, bankOffset, xgDrums = true) {
        if (this.isXGDrums(bankMSB) && xgDrums) return bankMSB;
        return Math.max(0, bankMSB - bankOffset);
      }
    };
    //#endregion
    //#region src/utils/sysex_detector.ts
    /**
    * Checks if this is a XG ON system exclusive
    */
    function isXGOn(e) {
      return e.data[0] === 67 && e.data[2] === 76 && e.data[5] === 126 && e.data[6] === 0;
    }
    /**
    * Checks if this is a GS Drum part system exclusive
    */
    function isGSDrumsOn(e) {
      return e.data[0] === 65 && e.data[2] === 66 && e.data[3] === 18 && e.data[4] === 64 && (e.data[5] & 16) !== 0 && e.data[6] === 21;
    }
    /**
    * Checks if this is a GS ON system exclusive
    */
    function isGSOn(e) {
      return e.data[0] === 65 && e.data[2] === 66 && e.data[5] === 0 && e.data[6] === 127;
    }
    /**
    * Checks if this is a GM ON system exclusive
    */
    function isGMOn(e) {
      return e.data[0] === 126 && e.data[2] === 9 && e.data[3] === 1;
    }
    /**
    * Checks if this is a GM2 ON system exclusive
    */
    function isGM2On(e) {
      return e.data[0] === 126 && e.data[2] === 9 && e.data[3] === 3;
    }
    function isDrumEdit(syx) {
      return syx[0] === 65 && syx[2] === 66 && syx[3] === 18 && syx[4] === 65 || syx[0] === 67 && syx[2] === 76 && syx[3] >> 4 === 3;
    }
    /**
    * -1 if not change, otherwise channel number
    * @param syx
    */
    function isProgramChange(syx) {
      if (syx[0] === 67 && syx[2] === 76 && syx[3] === 8 && (syx[5] === 3 || syx[5] === 1 || syx[5] === 2)) return syx[4];
      else if (syx[0] === 65 && syx[2] === 66 && syx[3] === 18 && syx[4] === 64 && (syx[5] & 240) === 16 && syx[6] === 0) return syxToChannel(syx[5] & 15);
      else return -1;
    }
    function isGSReverb(syx) {
      return syx[0] === 65 && syx[2] === 66 && syx[3] === 18 && syx[4] === 64 && syx[5] === 1 && syx[6] >= 48 && syx[6] <= 55;
    }
    function isGSChorus(syx) {
      return syx[0] === 65 && syx[2] === 66 && syx[3] === 18 && syx[4] === 64 && syx[5] === 1 && syx[6] >= 56 && syx[6] <= 64;
    }
    function isGSDelay(syx) {
      return syx[0] === 65 && syx[2] === 66 && syx[3] === 18 && syx[4] === 64 && syx[5] === 1 && syx[6] >= 80 && syx[6] <= 90;
    }
    function isGSInsertion(syx) {
      return syx[0] === 65 && syx[2] === 66 && syx[3] === 18 && syx[4] === 64 && (syx[5] === 3 || syx[5] >> 4 === 4 && syx[6] === 34);
    }
    /**
    * GS/XG "part number" to channel number.
    * @param part
    */
    function syxToChannel(part) {
      return [
        9,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        10,
        11,
        12,
        13,
        14,
        15
      ][part % 16];
    }
    /**
    * Channel number to GS/XG "part number"
    * @param channel
    */
    function channelToSyx(channel) {
      return [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        10,
        11,
        12,
        13,
        14,
        15
      ][channel % 16];
    }
    //#endregion
    //#region src/midi/midi_tools/get_gs_on.ts
    function getGsOn(ticks) {
      return new MIDIMessage(ticks, midiMessageTypes.systemExclusive, new IndexedByteArray([
        65,
        16,
        66,
        18,
        64,
        0,
        127,
        0,
        65,
        247
      ]));
    }
    //#endregion
    //#region src/soundbank/basic_soundbank/midi_patch.ts
    var MIDIPatchTools = class MIDIPatchTools {
      /**
      * Converts a MIDI patch to a string.
      */
      static toMIDIString(patch) {
        if (patch.isGMGSDrum) return `DRUM:${patch.program}`;
        return `${patch.bankLSB}:${patch.bankMSB}:${patch.program}`;
      }
      /**
      * Gets a MIDI patch from a string.
      * @param string
      */
      static fromMIDIString(string) {
        const parts = string.split(":");
        if (parts.length > 3 || parts.length < 2) throw new Error("Invalid MIDI string:");
        return string.startsWith("DRUM") ? {
          bankMSB: 0,
          bankLSB: 0,
          program: Number.parseInt(parts[1]),
          isGMGSDrum: true
        } : {
          bankLSB: Number.parseInt(parts[0]),
          bankMSB: Number.parseInt(parts[1]),
          program: Number.parseInt(parts[2]),
          isGMGSDrum: false
        };
      }
      /**
      * Converts a named MIDI patch to string.
      * @param patch
      */
      static toNamedMIDIString(patch) {
        return `${MIDIPatchTools.toMIDIString(patch)} ${patch.name}`;
      }
      /**
      * Checks if two MIDI patches match.
      * @param patch1
      * @param patch2
      */
      static matches(patch1, patch2) {
        if (patch1.isGMGSDrum || patch2.isGMGSDrum) return patch1.isGMGSDrum === patch2.isGMGSDrum && patch1.program === patch2.program;
        return patch1.program === patch2.program && patch1.bankLSB === patch2.bankLSB && patch1.bankMSB === patch2.bankMSB;
      }
      /**
      * Gets a named MIDI patch from a string.
      * @param string
      */
      static fromNamedMIDIString(string) {
        const firstSpace = string.indexOf(" ");
        if (firstSpace === -1) throw new Error(`Invalid named MIDI string: ${string}`);
        const patch = this.fromMIDIString(string.slice(0, Math.max(0, firstSpace)));
        const name = string.slice(Math.max(0, firstSpace + 1));
        return {
          ...patch,
          name
        };
      }
      static sorter(a, b) {
        if (a.program !== b.program) return a.program - b.program;
        if (a.isGMGSDrum && !b.isGMGSDrum) return 1;
        if (!a.isGMGSDrum && b.isGMGSDrum) return -1;
        if (a.bankMSB !== b.bankMSB) return a.bankMSB - b.bankMSB;
        return a.bankLSB - b.bankLSB;
      }
    };
    //#endregion
    //#region src/midi/midi_tools/rmidi_writer.ts
    const DEFAULT_COPYRIGHT = "Created using SpessaSynth";
    function correctBankOffsetInternal(mid, bankOffset, soundBank) {
      let system = "gm";
      /**
      * The unwanted system messages such as gm on
      */
      const unwantedSystems = [];
      const ports = new Array(mid.tracks.length).fill(0);
      const channelsAmount = 16 + Math.max(...mid.portChannelOffsetMap);
      const channelsInfo = [];
      for (let i = 0; i < channelsAmount; i++) channelsInfo.push({
        program: 0,
        drums: i % 16 === 9,
        lastBank: void 0,
        lastBankLSB: void 0,
        hasBankSelect: false
      });
      mid.iterate((e, trackNum) => {
        const portOffset = mid.portChannelOffsetMap[ports[trackNum]];
        if (e.statusByte === midiMessageTypes.midiPort) {
          ports[trackNum] = e.data[0];
          return;
        }
        const status = e.statusByte & 240;
        if (status !== midiMessageTypes.controllerChange && status !== midiMessageTypes.programChange && status !== midiMessageTypes.systemExclusive) return;
        if (status === midiMessageTypes.systemExclusive) {
          if (!isGSDrumsOn(e)) {
            if (isXGOn(e)) system = "xg";
            else if (isGSOn(e)) system = "gs";
            else if (isGMOn(e)) {
              system = "gm";
              unwantedSystems.push({
                tNum: trackNum,
                e
              });
            } else if (isGM2On(e)) system = "gm2";
            return;
          }
          const sysexChannel = syxToChannel(e.data[5] & 15) + portOffset;
          channelsInfo[sysexChannel].drums = !!(e.data[7] > 0 && e.data[5] >> 4);
          return;
        }
        const chNum = (e.statusByte & 15) + portOffset;
        const channel = channelsInfo[chNum];
        if (status === midiMessageTypes.programChange) {
          const patch = {
            program: e.data[0],
            bankLSB: channel.lastBankLSB?.data?.[1] ?? 0,
            bankMSB: BankSelectHacks.subtractBankOffset(channel.lastBank?.data?.[1] ?? 0, mid.bankOffset),
            isGMGSDrum: channel.drums
          };
          const targetPreset = soundBank.getPreset(patch, system);
          SpessaSynthInfo(`%cInput patch: %c${MIDIPatchTools.toMIDIString(patch)}%c. Channel %c${chNum}%c. Changing patch to ${targetPreset.toString()}.`, consoleColors.info, consoleColors.unrecognized, consoleColors.info, consoleColors.recognized, consoleColors.info);
          e.data[0] = targetPreset.program;
          if (targetPreset.isGMGSDrum && BankSelectHacks.isSystemXG(system)) return;
          if (channel.lastBank === void 0) return;
          channel.lastBank.data[1] = BankSelectHacks.addBankOffset(targetPreset.bankMSB, bankOffset, targetPreset.isXGDrums);
          if (channel.lastBankLSB === void 0) return;
          channel.lastBankLSB.data[1] = targetPreset.bankLSB;
          return;
        }
        const isLSB = e.data[0] === midiControllers.bankSelectLSB;
        if (e.data[0] !== midiControllers.bankSelect && !isLSB) return;
        channel.hasBankSelect = true;
        if (isLSB) channel.lastBankLSB = e;
        else channel.lastBank = e;
      });
      for (const [ch, has] of channelsInfo.entries()) {
        if (has.hasBankSelect) continue;
        const midiChannel = ch % 16;
        const status = midiMessageTypes.programChange | midiChannel;
        const portOffset = Math.floor(ch / 16) * 16;
        const port = mid.portChannelOffsetMap.indexOf(portOffset);
        const track = mid.tracks.find((t) => t.port === port && t.channels.has(midiChannel));
        if (track === void 0) continue;
        let indexToAdd = track.events.findIndex((e) => e.statusByte === status);
        if (indexToAdd === -1) {
          const programIndex = track.events.findIndex((e) => e.statusByte > 128 && e.statusByte < 240 && (e.statusByte & 15) === midiChannel);
          if (programIndex === -1) continue;
          const programTicks = track.events[programIndex].ticks;
          const targetProgram = soundBank.getPreset({
            bankMSB: 0,
            bankLSB: 0,
            program: 0,
            isGMGSDrum: false
          }, system).program;
          track.addEvents(programIndex, new MIDIMessage(programTicks, midiMessageTypes.programChange | midiChannel, new IndexedByteArray([targetProgram])));
          indexToAdd = programIndex;
        }
        SpessaSynthInfo(`%cAdding bank select for %c${ch}`, consoleColors.info, consoleColors.recognized);
        const ticks = track.events[indexToAdd].ticks;
        const targetPreset = soundBank.getPreset({
          bankLSB: 0,
          bankMSB: 0,
          program: has.program,
          isGMGSDrum: has.drums
        }, system);
        const targetBank = BankSelectHacks.addBankOffset(targetPreset.bankMSB, bankOffset, targetPreset.isXGDrums);
        track.addEvents(indexToAdd, new MIDIMessage(ticks, midiMessageTypes.controllerChange | midiChannel, new IndexedByteArray([midiControllers.bankSelect, targetBank])));
      }
      if (system === "gm" && !BankSelectHacks.isSystemXG(system)) {
        for (const m of unwantedSystems) {
          const track = mid.tracks[m.tNum];
          track.deleteEvent(track.events.indexOf(m.e));
        }
        let index = 0;
        if (mid.tracks[0].events[0].statusByte === midiMessageTypes.trackName) index++;
        mid.tracks[0].addEvents(index, getGsOn(0));
      }
    }
    const DEFAULT_RMIDI_WRITE_OPTIONS = {
      bankOffset: 0,
      metadata: {},
      correctBankOffset: true,
      soundBank: void 0
    };
    /**
    * Writes an RMIDI file. Note that this method modifies the MIDI file in-place.
    * @param mid MIDI to modify.
    * @param soundBankBinary The binary sound bank to embed into the file.
    * @param options Extra options for writing the file.
    * @returns the binary data
    */
    function writeRMIDIInternal(mid, soundBankBinary, options) {
      const metadata = options.metadata;
      SpessaSynthGroup("%cWriting the RMIDI File...", consoleColors.info);
      SpessaSynthInfo("metadata", metadata);
      SpessaSynthInfo("Initial bank offset", mid.bankOffset);
      if (options.correctBankOffset) {
        if (!options.soundBank) throw new Error("Sound bank must be provided if correcting bank offset.");
        correctBankOffsetInternal(mid, options.bankOffset, options.soundBank);
      }
      const newMid = new IndexedByteArray(mid.writeMIDI());
      metadata.name ??= mid.getName();
      metadata.creationDate ??= /* @__PURE__ */ new Date();
      metadata.copyright ??= DEFAULT_COPYRIGHT;
      metadata.software ??= "SpessaSynth";
      Object.entries(metadata).forEach((v) => {
        const val = v;
        if (val[1]) mid.setRMIDInfo(val[0], val[1]);
      });
      const infoContent = [];
      const writeInfo = (type, data) => {
        infoContent.push(RIFFChunk.write(type, data));
      };
      for (const v of Object.entries(mid.rmidiInfo)) {
        const type = v[0];
        const data = v[1];
        switch (type) {
          case "album":
            writeInfo("IALB", data);
            writeInfo("IPRD", data);
            break;
          case "software":
            writeInfo("ISFT", data);
            break;
          case "infoEncoding":
            writeInfo("IENC", data);
            break;
          case "creationDate":
            writeInfo("ICRD", data);
            break;
          case "picture":
            writeInfo("IPIC", data);
            break;
          case "name":
            writeInfo("INAM", data);
            break;
          case "artist":
            writeInfo("IART", data);
            break;
          case "genre":
            writeInfo("IGNR", data);
            break;
          case "copyright":
            writeInfo("ICOP", data);
            break;
          case "comment":
            writeInfo("ICMT", data);
            break;
          case "engineer":
            writeInfo("IENG", data);
            break;
          case "subject":
            writeInfo("ISBJ", data);
            break;
          case "midiEncoding":
            writeInfo("MENC", data);
            break;
        }
      }
      const DBNK = new IndexedByteArray(2);
      writeLittleEndianIndexed(DBNK, options.bankOffset, 2);
      infoContent.push(RIFFChunk.write("DBNK", DBNK));
      SpessaSynthInfo("%cFinished!", consoleColors.info);
      SpessaSynthGroupEnd();
      return RIFFChunk.writeParts("RIFF", [
        getStringBytes("RMID"),
        RIFFChunk.write("data", newMid),
        RIFFChunk.writeParts("INFO", infoContent, true),
        new IndexedByteArray(soundBankBinary)
      ]).buffer;
    }
    //#endregion
    //#region src/midi/midi_tools/used_keys_loaded.ts
    /**
    * Gets the used programs and keys for this MIDI file with a given sound bank.
    * @param mid
    * @param soundBank  the sound bank.
    * @returns  Map<patch, Set<key-velocity>>.
    */
    function getUsedProgramsAndKeys(mid, soundBank) {
      SpessaSynthGroupCollapsed("%cSearching for all used programs and keys...", consoleColors.info);
      const channelsAmount = 16 + Math.max(...mid.portChannelOffsetMap);
      const channelPresets = [];
      let system = "gs";
      for (let i = 0; i < channelsAmount; i++) {
        const isDrum = i % 16 === 9;
        channelPresets.push({
          preset: soundBank.getPreset({
            bankLSB: 0,
            bankMSB: 0,
            isGMGSDrum: isDrum,
            program: 0
          }, system),
          bankMSB: 0,
          bankLSB: 0,
          isDrum
        });
      }
      /**
      * Find all programs used and key-velocity combos in them
      * bank:program each has a set of midiNote-velocity
      */
      const usedProgramsAndKeys = /* @__PURE__ */ new Map();
      const ports = mid.tracks.map((t) => t.port);
      mid.iterate((event, trackNum) => {
        if (event.statusByte === midiMessageTypes.midiPort && mid.tracks[trackNum].channels.size > 0) {
          let port = event.data[0];
          if (mid.portChannelOffsetMap[port] === void 0) {
            SpessaSynthWarn(`Invalid port ${port} on track ${trackNum}. (No offset found in the MIDI map.`);
            port = 0;
          }
          ports[trackNum] = port;
          return;
        }
        const status = event.statusByte & 240;
        if (status !== midiMessageTypes.noteOn && status !== midiMessageTypes.controllerChange && status !== midiMessageTypes.programChange && status !== midiMessageTypes.systemExclusive) return;
        let ch = channelPresets[(event.statusByte & 15) + mid.portChannelOffsetMap[ports[trackNum]] || 0];
        switch (status) {
          case midiMessageTypes.programChange:
            ch.preset = soundBank.getPreset({
              bankMSB: ch.bankMSB,
              bankLSB: ch.bankLSB,
              program: event.data[0],
              isGMGSDrum: ch.isDrum
            }, system);
            break;
          case midiMessageTypes.controllerChange:
            switch (event.data[0]) {
              default: return;
              case midiControllers.bankSelectLSB:
                ch.bankLSB = event.data[1];
                break;
              case midiControllers.bankSelect: ch.bankMSB = event.data[1];
            }
            break;
          case midiMessageTypes.noteOn: {
            if (event.data[1] === 0) return;
            if (!ch.preset) return;
            let combos = usedProgramsAndKeys.get(ch.preset);
            if (!combos) {
              combos = /* @__PURE__ */ new Set();
              usedProgramsAndKeys.set(ch.preset, combos);
            }
            combos.add(`${event.data[0]}-${event.data[1]}`);
            break;
          }
          case midiMessageTypes.systemExclusive:
            {
              if (!isGSDrumsOn(event)) {
                if (isXGOn(event)) {
                  system = "xg";
                  SpessaSynthInfo("%cXG on detected!", consoleColors.recognized);
                } else if (isGM2On(event)) {
                  system = "gm2";
                  SpessaSynthInfo("%cGM2 on detected!", consoleColors.recognized);
                } else if (isGMOn(event)) {
                  system = "gm";
                  SpessaSynthInfo("%cGM on detected!", consoleColors.recognized);
                } else if (isGSOn(event)) {
                  system = "gs";
                  SpessaSynthInfo("%cGS on detected!", consoleColors.recognized);
                }
                return;
              }
              const sysexChannel = syxToChannel(event.data[5] & 15) + mid.portChannelOffsetMap[ports[trackNum]];
              const isDrum = !!(event.data[7] > 0 && event.data[5] >> 4);
              ch = channelPresets[sysexChannel];
              ch.isDrum = isDrum;
            }
            break;
        }
      });
      for (const [preset, combos] of usedProgramsAndKeys.entries()) if (combos.size === 0) {
        SpessaSynthInfo(`%cDetected change but no keys for %c${preset.name}`, consoleColors.info, consoleColors.value);
        usedProgramsAndKeys.delete(preset);
      }
      SpessaSynthGroupEnd();
      return usedProgramsAndKeys;
    }
    //#endregion
    //#region src/midi/midi_tools/get_note_times.ts
    /**
    * Gets tempo from the midi message
    * @param event the midi event
    * @return the tempo in bpm
    */
    const getTempo = (event) => {
      event.data = new IndexedByteArray(event.data.buffer);
      return 6e7 / readBigEndian(event.data, 3);
    };
    /**
    * Calculates all note times in seconds.
    * @param midi the midi to use
    * @param minDrumLength the shortest a drum note (channel 10) can be, in seconds.
    * @returns an array of 16 channels, each channel containing its notes,
    * with their key number, velocity, absolute start time and length in seconds.
    */
    function getNoteTimesInternal(midi, minDrumLength = 0) {
      /**
      * An array of 16 arrays (channels)
      */
      const noteTimes = [];
      const events = midi.tracks.map((t) => t.events).flat();
      events.sort((e1, e2) => e1.ticks - e2.ticks);
      for (let i = 0; i < 16; i++) noteTimes.push([]);
      let elapsedTime = 0;
      let oneTickToSeconds = 60 / (120 * midi.timeDivision);
      let eventIndex = 0;
      let unfinished = 0;
      const unfinishedNotes = [];
      for (let i = 0; i < 16; i++) unfinishedNotes.push([]);
      const noteOff = (midiNote, channel) => {
        const noteIndex = unfinishedNotes[channel].findIndex((n) => n.midiNote === midiNote);
        const note = unfinishedNotes[channel][noteIndex];
        if (note) {
          const time = elapsedTime - note.start;
          note.length = time;
          if (channel === 9) note.length = Math.max(time, minDrumLength);
          unfinishedNotes[channel].splice(noteIndex, 1);
        }
        unfinished--;
      };
      while (eventIndex < events.length) {
        const event = events[eventIndex];
        const status = event.statusByte >> 4;
        const channel = event.statusByte & 15;
        if (status === 8) noteOff(event.data[0], channel);
        else if (status === 9) if (event.data[1] === 0) noteOff(event.data[0], channel);
        else {
          noteOff(event.data[0], channel);
          const noteTime = {
            midiNote: event.data[0],
            start: elapsedTime,
            length: -1,
            velocity: event.data[1] / 127
          };
          noteTimes[channel].push(noteTime);
          unfinishedNotes[channel].push(noteTime);
          unfinished++;
        }
        else if (event.statusByte === 81) oneTickToSeconds = 60 / (getTempo(event) * midi.timeDivision);
        if (++eventIndex >= events.length) break;
        elapsedTime += oneTickToSeconds * (events[eventIndex].ticks - event.ticks);
      }
      if (unfinished > 0) for (const [channel, channelNotes] of unfinishedNotes.entries()) for (const note of channelNotes) {
        const time = elapsedTime - note.start;
        note.length = time;
        if (channel === 9) note.length = Math.max(time, minDrumLength);
      }
      return noteTimes;
    }
    //#endregion
    //#region src/synthesizer/enums.ts
    const interpolationTypes = {
      linear: 0,
      nearestNeighbor: 1,
      hermite: 2
    };
    const dataEntryStates = {
      Idle: 0,
      RPCoarse: 1,
      RPFine: 2,
      NRPCoarse: 3,
      NRPFine: 4,
      DataCoarse: 5,
      DataFine: 6
    };
    const customControllers = {
      /**
      * Cents, RPN for fine-tuning
      */
      channelTuning: 0,
      /**
      * Cents, only the decimal tuning, (e.g., transpose is 4.5,
      * Then shift by 4 keys + tune by 50 cents)
      */
      channelTransposeFine: 1,
      /**
      * The MIDI specification assumes the default modulation depth is 50 cents,
      * but it may vary for different sound banks.
      * For example, if you want a modulation depth of 100 cents,
      * the multiplier will be 2,
      * which, for a preset with a depth of 50,
      * will create a total modulation depth of 100 cents.
      */
      modulationMultiplier: 2,
      /**
      * Cents, set by system exclusive
      */
      masterTuning: 3,
      /**
      * Semitones, for RPN coarse tuning
      */
      channelTuningSemitones: 4,
      /**
      * Key shift: for system exclusive
      */
      channelKeyShift: 5,
      /**
      * Sf2 NPRN LSB for selecting a generator value
      */
      sf2NPRNGeneratorLSB: 6
    };
    //#endregion
    //#region src/midi/midi_tools/midi_editor.ts
    const reverbAddressMap = {
      character: 49,
      preLowpass: 50,
      level: 51,
      time: 52,
      delayFeedback: 53,
      preDelayTime: 55
    };
    const chorusAddressMap = {
      preLowpass: 57,
      level: 58,
      feedback: 59,
      delay: 60,
      rate: 61,
      depth: 62,
      sendLevelToReverb: 63,
      sendLevelToDelay: 64
    };
    const delayAddressMap = {
      preLowpass: 81,
      timeCenter: 82,
      timeRatioLeft: 83,
      timeRatioRight: 84,
      levelCenter: 85,
      levelLeft: 86,
      levelRight: 87,
      level: 88,
      feedback: 89,
      sendLevelToReverb: 90
    };
    function getControllerChange(channel, cc, value, ticks) {
      return new MIDIMessage(ticks, midiMessageTypes.controllerChange | channel % 16, new IndexedByteArray([cc, value]));
    }
    function sendAddress$1(ticks, a1, a2, a3, data) {
      const checksum = 128 - (a1 + a2 + a3 + data.reduce((sum, cur) => sum + cur, 0)) % 128 & 127;
      return new MIDIMessage(ticks, midiMessageTypes.systemExclusive, new Uint8Array([
        65,
        16,
        66,
        18,
        a1,
        a2,
        a3,
        ...data,
        checksum,
        247
      ]));
    }
    function getDrumChange(channel, ticks) {
      return sendAddress$1(ticks, 40, 16 | channelToSyx(channel), 21, [1]);
    }
    /**
    * Allows easy editing of the file by removing channels, changing programs,
    * changing controllers and transposing channels. Note that this modifies the MIDI in-place.
    *
    * @param midi the midi to change
    * @param programChanges - The programs to set on given channels.
    * @param controllerChanges - The controllers to set on given channels.
    * @param channelsToClear - The channels to remove from the sequence.
    * @param channelTransposes - The channels to transpose.
    * @param clearDrumParams - If the drum editing parameters should be cleared.
    * @param reverbParams - The desired GS reverb params, leave undefined for no change.
    * @param chorusParams - The desired GS chorus params, leave undefined for no change.
    * @param delayParams - The desired GS delay params, leave undefined for no change.
    * @param insertionParams - The insertion effect params, leave undefined for no change.
    */
    function modifyMIDIInternal(midi, { programChanges = [], controllerChanges = [], channelsToClear = [], channelsToTranspose = [], clearDrumParams = false, reverbParams, chorusParams, delayParams, insertionParams }) {
      SpessaSynthGroupCollapsed("%cApplying changes to the MIDI file...", consoleColors.info);
      SpessaSynthInfo("Desired program changes:", programChanges);
      SpessaSynthInfo("Desired CC changes:", controllerChanges);
      SpessaSynthInfo("Desired channels to clear:", channelsToClear);
      SpessaSynthInfo("Desired channels to transpose:", channelsToTranspose);
      SpessaSynthInfo("Desired reverb parameters", reverbParams);
      SpessaSynthInfo("Desired chorus parameters", chorusParams);
      SpessaSynthInfo("Desired delay parameters", delayParams);
      SpessaSynthInfo("Desired insertion parameters", insertionParams);
      const channelsToChangeProgram = /* @__PURE__ */ new Set();
      for (const c of programChanges) channelsToChangeProgram.add(c.channel);
      let system = "gs";
      let addedGs = false;
      /**
      * Midi port number for the corresponding track
      */
      const midiPorts = midi.tracks.map((t) => t.port);
      /**
      * Midi port: channel offset
      */
      const midiPortChannelOffsets = {};
      let midiPortChannelOffset = 0;
      const assignMIDIPort = (trackNum, port) => {
        if (midi.tracks[trackNum].channels.size === 0) return;
        if (midiPortChannelOffset === 0) {
          midiPortChannelOffset += 16;
          midiPortChannelOffsets[port] = 0;
        }
        if (midiPortChannelOffsets[port] === void 0) {
          midiPortChannelOffsets[port] = midiPortChannelOffset;
          midiPortChannelOffset += 16;
        }
        midiPorts[trackNum] = port;
      };
      for (const [i, track] of midi.tracks.entries()) assignMIDIPort(i, track.port);
      const channelsAmount = midiPortChannelOffset;
      /**
      * Tracks if the channel already had its first note on
      */
      const isFirstNoteOn = new Array(channelsAmount).fill(true);
      /**
      * MIDI key transpose
      */
      const coarseTranspose = new Array(channelsAmount).fill(0);
      /**
      * RPN fine transpose
      */
      const fineTranspose = new Array(channelsAmount).fill(0);
      for (const transpose of channelsToTranspose) {
        const coarse = Math.trunc(transpose.keyShift);
        const fine = transpose.keyShift - coarse;
        coarseTranspose[transpose.channel] = coarse;
        fineTranspose[transpose.channel] = fine;
      }
      let lastNrpnMsb = -1;
      let lastNrpnMsbTrack = 0;
      let lastNrpnLsb = -1;
      let lastNrpnLsbTrack = 0;
      let isNrpnMode = false;
      midi.iterate((e, trackNum, eventIndexes) => {
        const track = midi.tracks[trackNum];
        const index = eventIndexes[trackNum];
        const deleteThisEvent = () => {
          track.deleteEvent(index);
          eventIndexes[trackNum]--;
        };
        const addEventBefore = (e, offset = 0) => {
          track.addEvents(index + offset, e);
          eventIndexes[trackNum]++;
        };
        const portOffset = midiPortChannelOffsets[midiPorts[trackNum]] || 0;
        if (e.statusByte === midiMessageTypes.midiPort) {
          assignMIDIPort(trackNum, e.data[0]);
          return;
        }
        if (e.statusByte <= midiMessageTypes.sequenceSpecific && e.statusByte >= midiMessageTypes.sequenceNumber) return;
        const status = e.statusByte & 240;
        const midiChannel = e.statusByte & 15;
        const channel = midiChannel + portOffset;
        if (e.statusByte !== midiMessageTypes.systemExclusive && channelsToClear.includes(channel)) {
          deleteThisEvent();
          return;
        }
        switch (status) {
          case midiMessageTypes.noteOn:
            if (isFirstNoteOn[channel]) {
              isFirstNoteOn[channel] = false;
              for (const change of controllerChanges.filter((c) => c.channel === channel)) addEventBefore(getControllerChange(midiChannel, change.controllerNumber, change.controllerValue, e.ticks));
              const fineTune = fineTranspose[channel];
              if (fineTune !== 0) {
                const centsCoarse = fineTune * 64 + 64;
                const rpnCoarse = getControllerChange(midiChannel, midiControllers.registeredParameterMSB, 0, e.ticks);
                const rpnFine = getControllerChange(midiChannel, midiControllers.registeredParameterLSB, 1, e.ticks);
                const dataEntryCoarse = getControllerChange(channel, midiControllers.dataEntryMSB, centsCoarse, e.ticks);
                addEventBefore(getControllerChange(midiChannel, midiControllers.dataEntryLSB, 0, e.ticks));
                addEventBefore(dataEntryCoarse);
                addEventBefore(rpnFine);
                addEventBefore(rpnCoarse);
              }
              if (channelsToChangeProgram.has(channel)) {
                const change = programChanges.find((c) => c.channel === channel);
                if (!change) return;
                SpessaSynthInfo(`%cSetting %c${change.channel}%c to %c${MIDIPatchTools.toMIDIString(change)}%c. Track num: %c${trackNum}`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized);
                let desiredBankMSB = change.bankMSB;
                let desiredBankLSB = change.bankLSB;
                const desiredProgram = change.program;
                addEventBefore(new MIDIMessage(e.ticks, midiMessageTypes.programChange | midiChannel, new IndexedByteArray([desiredProgram])));
                const addBank = (isLSB, v) => {
                  addEventBefore(getControllerChange(midiChannel, isLSB ? midiControllers.bankSelectLSB : midiControllers.bankSelect, v, e.ticks));
                };
                if (BankSelectHacks.isSystemXG(system) && change.isGMGSDrum) {
                  SpessaSynthInfo(`%cAdding XG Drum change on track %c${trackNum}`, consoleColors.recognized, consoleColors.value);
                  desiredBankMSB = BankSelectHacks.getDrumBank(system);
                  desiredBankLSB = 0;
                }
                addBank(false, desiredBankMSB);
                addBank(true, desiredBankLSB);
                if (change.isGMGSDrum && !BankSelectHacks.isSystemXG(system) && midiChannel !== 9) {
                  SpessaSynthInfo(`%cAdding GS Drum change on track %c${trackNum}`, consoleColors.recognized, consoleColors.value);
                  addEventBefore(getDrumChange(midiChannel, e.ticks));
                }
              }
            }
            e.data[0] += coarseTranspose[channel];
            break;
          case midiMessageTypes.noteOff:
            e.data[0] += coarseTranspose[channel];
            break;
          case midiMessageTypes.programChange:
            if (channelsToChangeProgram.has(channel)) {
              deleteThisEvent();
              return;
            }
            break;
          case midiMessageTypes.controllerChange: {
            const ccNum = e.data[0];
            if (controllerChanges.find((c) => c.channel === channel && ccNum === c.controllerNumber) !== void 0) {
              deleteThisEvent();
              return;
            }
            switch (ccNum) {
              case midiControllers.bankSelect:
              case midiControllers.bankSelectLSB:
                if (channelsToChangeProgram.has(channel)) deleteThisEvent();
                return;
              case midiControllers.registeredParameterLSB:
              case midiControllers.registeredParameterMSB:
                isNrpnMode = false;
                return;
              case midiControllers.nonRegisteredParameterMSB:
                lastNrpnMsb = eventIndexes[trackNum];
                lastNrpnMsbTrack = trackNum;
                isNrpnMode = true;
                return;
              case midiControllers.nonRegisteredParameterLSB:
                lastNrpnLsb = eventIndexes[trackNum];
                lastNrpnLsbTrack = trackNum;
                isNrpnMode = true;
                return;
              case midiControllers.dataEntryMSB:
                if (lastNrpnLsb && lastNrpnMsb && isNrpnMode && clearDrumParams) {
                  const msb = midi.tracks[lastNrpnMsbTrack].events[lastNrpnMsb].data[1];
                  if (msb >= 24 && msb <= 31) {
                    deleteThisEvent();
                    const lsbTrack = midi.tracks[lastNrpnLsbTrack];
                    const msbTrack = midi.tracks[lastNrpnMsbTrack];
                    lsbTrack.deleteEvent(lastNrpnLsb);
                    eventIndexes[lastNrpnLsbTrack]--;
                    msbTrack.deleteEvent(lastNrpnMsb);
                    eventIndexes[lastNrpnMsbTrack]--;
                  }
                }
                return;
              default: return;
            }
          }
          case midiMessageTypes.systemExclusive: {
            if (isXGOn(e)) {
              SpessaSynthInfo("%cXG system on detected", consoleColors.info);
              system = "xg";
              addedGs = true;
              return;
            }
            if (isGM2On(e)) {
              SpessaSynthInfo("%cGM2 system on detected", consoleColors.info);
              system = "gm2";
              addedGs = true;
              return;
            }
            if (isGSOn(e)) {
              addedGs = true;
              SpessaSynthInfo("%cGS on detected!", consoleColors.recognized);
              return;
            }
            if (isGMOn(e)) {
              SpessaSynthInfo("%cGM on detected, removing!", consoleColors.info);
              deleteThisEvent();
              addedGs = false;
              return;
            }
            if (clearDrumParams && isDrumEdit(e.data)) {
              deleteThisEvent();
              return;
            }
            if (reverbParams && isGSReverb(e.data)) {
              deleteThisEvent();
              return;
            }
            if (chorusParams && isGSChorus(e.data)) {
              deleteThisEvent();
              return;
            }
            if (delayParams && isGSDelay(e.data)) {
              deleteThisEvent();
              return;
            }
            if (insertionParams && isGSInsertion(e.data)) {
              deleteThisEvent();
              return;
            }
            const prog = isProgramChange(e.data);
            if (prog !== -1) {
              if (channelsToChangeProgram.has(prog + portOffset)) deleteThisEvent();
              return;
            }
          }
        }
      });
      const targetTicks = Math.max(0, midi.firstNoteOn - 10);
      const targetTrack = midi.tracks[0];
      const targetIndex = Math.max(0, targetTrack.events.findIndex((m) => m.ticks >= targetTicks) - 1);
      if (reverbParams) {
        const m = reverbAddressMap;
        const p = reverbParams;
        targetTrack.addEvents(targetIndex, sendAddress$1(targetTicks, 64, 1, m.level, [p.level]), sendAddress$1(targetTicks, 64, 1, m.preLowpass, [p.preLowpass]), sendAddress$1(targetTicks, 64, 1, m.character, [p.character]), sendAddress$1(targetTicks, 64, 1, m.time, [p.time]), sendAddress$1(targetTicks, 64, 1, m.delayFeedback, [p.delayFeedback]), sendAddress$1(targetTicks, 64, 1, m.preDelayTime, [p.preDelayTime]));
      }
      if (chorusParams) {
        const m = chorusAddressMap;
        const p = chorusParams;
        targetTrack.addEvents(targetIndex, sendAddress$1(targetTicks, 64, 1, m.level, [p.level]), sendAddress$1(targetTicks, 64, 1, m.preLowpass, [p.preLowpass]), sendAddress$1(targetTicks, 64, 1, m.feedback, [p.feedback]), sendAddress$1(targetTicks, 64, 1, m.delay, [p.delay]), sendAddress$1(targetTicks, 64, 1, m.rate, [p.rate]), sendAddress$1(targetTicks, 64, 1, m.depth, [p.depth]), sendAddress$1(targetTicks, 64, 1, m.sendLevelToReverb, [p.sendLevelToReverb]), sendAddress$1(targetTicks, 64, 1, m.sendLevelToDelay, [p.sendLevelToDelay]));
      }
      if (delayParams) {
        const m = delayAddressMap;
        const p = delayParams;
        targetTrack.addEvents(targetIndex, sendAddress$1(targetTicks, 64, 1, m.level, [p.level]), sendAddress$1(targetTicks, 64, 1, m.preLowpass, [p.preLowpass]), sendAddress$1(targetTicks, 64, 1, m.timeCenter, [p.timeCenter]), sendAddress$1(targetTicks, 64, 1, m.timeRatioLeft, [p.timeRatioLeft]), sendAddress$1(targetTicks, 64, 1, m.timeRatioRight, [p.timeRatioRight]), sendAddress$1(targetTicks, 64, 1, m.levelCenter, [p.levelCenter]), sendAddress$1(targetTicks, 64, 1, m.levelLeft, [p.levelLeft]), sendAddress$1(targetTicks, 64, 1, m.levelRight, [p.levelRight]), sendAddress$1(targetTicks, 64, 1, m.feedback, [p.feedback]), sendAddress$1(targetTicks, 64, 1, m.sendLevelToReverb, [p.sendLevelToReverb]));
      }
      if (insertionParams) {
        const p = insertionParams;
        for (let channel = 0; channel < p.channels.length; channel++) if (p.channels[channel]) targetTrack.addEvents(targetTicks, sendAddress$1(targetTicks, 64, 64 | channelToSyx(channel), 34, [1]));
        for (let param = 0; param < p.params.length; param++) {
          const value = p.params[param];
          if (value === 255) continue;
          targetTrack.addEvents(targetIndex, sendAddress$1(targetTicks, 64, 3, param + 3, [value]));
        }
        targetTrack.addEvents(targetIndex, sendAddress$1(targetTicks, 64, 3, 0, [p.type >> 8, p.type & 127]));
      }
      if (!addedGs && programChanges.length > 0) {
        let index = 0;
        if (midi.tracks[0].events[0].statusByte === midiMessageTypes.trackName) index++;
        midi.tracks[0].addEvents(index, getGsOn(0));
        SpessaSynthInfo("%cGS on not detected. Adding it.", consoleColors.info);
      }
      midi.flush();
      SpessaSynthGroupEnd();
    }
    /**
    * Modifies the sequence according to the locked presets and controllers in the given snapshot
    */
    function applySnapshotInternal(midi, snapshot) {
      const channelsToTranspose = [];
      const channelsToClear = [];
      const programChanges = [];
      const controllerChanges = [];
      for (const [channelNumber, channel] of snapshot.channelSnapshots.entries()) {
        if (channel.isMuted) {
          channelsToClear.push(channelNumber);
          continue;
        }
        const transposeFloat = channel.keyShift + channel.customControllers[customControllers.channelTransposeFine] / 100;
        if (transposeFloat !== 0) channelsToTranspose.push({
          channel: channelNumber,
          keyShift: transposeFloat
        });
        if (channel.lockPreset) programChanges.push({
          channel: channelNumber,
          ...channel.patch
        });
        for (const [ccNumber, l] of channel.lockedControllers.entries()) {
          if (!l || ccNumber > 127 || ccNumber === midiControllers.bankSelect) continue;
          const targetValue = channel.midiControllers[ccNumber] >> 7;
          controllerChanges.push({
            channel: channelNumber,
            controllerNumber: ccNumber,
            controllerValue: targetValue
          });
        }
      }
      midi.modify({
        programChanges,
        controllerChanges,
        channelsToClear,
        channelsToTranspose,
        clearDrumParams: snapshot.masterParameters.drumLock,
        reverbParams: snapshot.masterParameters.reverbLock ? snapshot.reverbSnapshot : void 0,
        chorusParams: snapshot.masterParameters.chorusLock ? snapshot.chorusSnapshot : void 0,
        delayParams: snapshot.masterParameters.delayLock ? snapshot.delaySnapshot : void 0,
        insertionParams: snapshot.masterParameters.insertionEffectLock ? snapshot.insertionSnapshot : void 0
      });
    }
    //#endregion
    //#region src/midi/xmf_loader.ts
    const metadataTypes = {
      XMFFileType: 0,
      nodeName: 1,
      nodeIDNumber: 2,
      resourceFormat: 3,
      filenameOnDisk: 4,
      filenameExtensionOnDisk: 5,
      macOSFileTypeAndCreator: 6,
      mimeType: 7,
      title: 8,
      copyrightNotice: 9,
      comment: 10,
      autoStart: 11,
      preload: 12,
      contentDescription: 13,
      ID3Metadata: 14
    };
    const referenceTypeIds = {
      inLineResource: 1,
      inFileResource: 2,
      inFileNode: 3,
      externalFile: 4,
      externalXMF: 5,
      XMFFileURIandNodeID: 6
    };
    const resourceFormatIDs = {
      StandardMIDIFile: 0,
      StandardMIDIFileType1: 1,
      DLS1: 2,
      DLS2: 3,
      DLS22: 4,
      mobileDLS: 5,
      unknown: -1,
      folder: -2
    };
    const formatTypeIDs = {
      standard: 0,
      MMA: 1,
      registered: 2,
      nonRegistered: 3
    };
    const unpackerIDs = {
      none: 0,
      MMAUnpacker: 1,
      registered: 2,
      nonRegistered: 3
    };
    var XMFNode = class XMFNode {
      length;
      /**
      * 0 means it's a file node
      */
      itemCount;
      metadataLength;
      metadata = {};
      nodeData;
      innerNodes = [];
      packedContent = false;
      nodeUnpackers = [];
      resourceFormat = "unknown";
      referenceTypeID;
      constructor(binaryData) {
        const nodeStartIndex = binaryData.currentIndex;
        this.length = readVariableLengthQuantity(binaryData);
        this.itemCount = readVariableLengthQuantity(binaryData);
        const headerLength = readVariableLengthQuantity(binaryData);
        const remainingHeader = headerLength - (binaryData.currentIndex - nodeStartIndex);
        const headerData = binaryData.slice(binaryData.currentIndex, binaryData.currentIndex + remainingHeader);
        binaryData.currentIndex += remainingHeader;
        this.metadataLength = readVariableLengthQuantity(headerData);
        const metadataChunk = headerData.slice(headerData.currentIndex, headerData.currentIndex + this.metadataLength);
        headerData.currentIndex += this.metadataLength;
        let fieldSpecifier;
        let key;
        while (metadataChunk.currentIndex < metadataChunk.length) {
          if (metadataChunk[metadataChunk.currentIndex] === 0) {
            metadataChunk.currentIndex++;
            fieldSpecifier = readVariableLengthQuantity(metadataChunk);
            if (Object.values(metadataTypes).includes(fieldSpecifier)) key = Object.keys(metadataTypes).find((k) => metadataTypes[k] === fieldSpecifier) ?? "";
            else {
              SpessaSynthInfo(`Unknown field specifier: ${fieldSpecifier}`);
              key = `unknown_${fieldSpecifier}`;
            }
          } else {
            fieldSpecifier = readBinaryStringIndexed(metadataChunk, readVariableLengthQuantity(metadataChunk));
            key = fieldSpecifier;
          }
          const numberOfVersions = readVariableLengthQuantity(metadataChunk);
          if (numberOfVersions === 0) {
            const dataLength = readVariableLengthQuantity(metadataChunk);
            const contentsChunk = metadataChunk.slice(metadataChunk.currentIndex, metadataChunk.currentIndex + dataLength);
            metadataChunk.currentIndex += dataLength;
            const formatID = readVariableLengthQuantity(contentsChunk);
            this.metadata[key] = formatID < 4 ? readBinaryStringIndexed(contentsChunk, dataLength - 1) : contentsChunk.slice(contentsChunk.currentIndex);
          } else {
            SpessaSynthInfo(`International content: ${numberOfVersions}`);
            metadataChunk.currentIndex += readVariableLengthQuantity(metadataChunk);
          }
        }
        const unpackersStart = headerData.currentIndex;
        const unpackersLength = readVariableLengthQuantity(headerData);
        const unpackersData = headerData.slice(headerData.currentIndex, unpackersStart + unpackersLength);
        headerData.currentIndex = unpackersStart + unpackersLength;
        if (unpackersLength > 0) {
          this.packedContent = true;
          while (unpackersData.currentIndex < unpackersLength) {
            const unpacker = { id: readVariableLengthQuantity(unpackersData) };
            switch (unpacker.id) {
              case unpackerIDs.nonRegistered:
              case unpackerIDs.registered:
                SpessaSynthGroupEnd();
                throw new Error(`Unsupported unpacker ID: ${unpacker.id}`);
              default:
                SpessaSynthGroupEnd();
                throw new Error(`Unknown unpacker ID: ${unpacker.id}`);
              case unpackerIDs.none:
                unpacker.standardID = readVariableLengthQuantity(unpackersData);
                break;
              case unpackerIDs.MMAUnpacker:
                {
                  let manufacturerID = unpackersData[unpackersData.currentIndex++];
                  if (manufacturerID === 0) {
                    manufacturerID <<= 8;
                    manufacturerID |= unpackersData[unpackersData.currentIndex++];
                    manufacturerID <<= 8;
                    manufacturerID |= unpackersData[unpackersData.currentIndex++];
                  }
                  const manufacturerInternalID = readVariableLengthQuantity(unpackersData);
                  unpacker.manufacturerID = manufacturerID;
                  unpacker.manufacturerInternalID = manufacturerInternalID;
                }
                break;
            }
            unpacker.decodedSize = readVariableLengthQuantity(unpackersData);
            this.nodeUnpackers.push(unpacker);
          }
        }
        binaryData.currentIndex = nodeStartIndex + headerLength;
        this.referenceTypeID = readVariableLengthQuantity(binaryData);
        this.nodeData = binaryData.slice(binaryData.currentIndex, nodeStartIndex + this.length);
        binaryData.currentIndex = nodeStartIndex + this.length;
        switch (this.referenceTypeID) {
          case referenceTypeIds.inLineResource: break;
          case referenceTypeIds.externalXMF:
          case referenceTypeIds.inFileNode:
          case referenceTypeIds.XMFFileURIandNodeID:
          case referenceTypeIds.externalFile:
          case referenceTypeIds.inFileResource:
            SpessaSynthGroupEnd();
            throw new Error(`Unsupported reference type: ${this.referenceTypeID}`);
          default:
            SpessaSynthGroupEnd();
            throw new Error(`Unknown reference type: ${this.referenceTypeID}`);
        }
        if (this.isFile) {
          if (this.packedContent) {
            const compressed = this.nodeData.slice(2);
            SpessaSynthInfo(`%cPacked content. Attempting to deflate. Target size: %c${this.nodeUnpackers[0].decodedSize}`, consoleColors.warn, consoleColors.value);
            try {
              this.nodeData = new IndexedByteArray(inf(compressed).buffer);
            } catch (error) {
              SpessaSynthGroupEnd();
              if (error instanceof Error) throw new Error(`Error unpacking XMF file contents: ${error.message}.`, { cause: error });
            }
          }
          /**
          * Interpret the content
          */
          const resourceFormat = this.metadata.resourceFormat;
          if (resourceFormat === void 0) SpessaSynthWarn("No resource format for this file node!");
          else {
            if (resourceFormat[0] !== formatTypeIDs.standard) {
              SpessaSynthInfo(`Non-standard formatTypeID: ${resourceFormat.toString()}`);
              this.resourceFormat = resourceFormat.toString();
            }
            const resourceFormatID = resourceFormat[1];
            if (Object.values(resourceFormatIDs).includes(resourceFormatID)) this.resourceFormat = Object.keys(resourceFormatIDs).find((k) => resourceFormatIDs[k] === resourceFormatID);
            else SpessaSynthInfo(`Unrecognized resource format: ${resourceFormatID}`);
          }
        } else {
          this.resourceFormat = "folder";
          while (this.nodeData.currentIndex < this.nodeData.length) {
            const nodeStartIndex = this.nodeData.currentIndex;
            const nodeLength = readVariableLengthQuantity(this.nodeData);
            const nodeData = this.nodeData.slice(nodeStartIndex, nodeStartIndex + nodeLength);
            this.nodeData.currentIndex = nodeStartIndex + nodeLength;
            this.innerNodes.push(new XMFNode(nodeData));
          }
        }
      }
      get isFile() {
        return this.itemCount === 0;
      }
    };
    /**
    * Parses an XMF file
    * @param midi {BasicMIDI}
    * @param binaryData {IndexedByteArray}
    * @returns {IndexedByteArray} the file byte array
    */
    function loadXMF(midi, binaryData) {
      midi.bankOffset = 0;
      const sanityCheck = readBinaryStringIndexed(binaryData, 4);
      if (sanityCheck !== "XMF_") {
        SpessaSynthGroupEnd();
        throw new SyntaxError(`Invalid XMF Header! Expected "_XMF", got "${sanityCheck}"`);
      }
      SpessaSynthGroup("%cParsing XMF file...", consoleColors.info);
      const version = readBinaryStringIndexed(binaryData, 4);
      SpessaSynthInfo(`%cXMF version: %c${version}`, consoleColors.info, consoleColors.recognized);
      if (version === "2.00") SpessaSynthInfo(`%cFile Type ID: %c${readBigEndianIndexed(binaryData, 4)}%c, File Type Revision ID: %c${readBigEndianIndexed(binaryData, 4)}`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized);
      readVariableLengthQuantity(binaryData);
      const metadataTableLength = readVariableLengthQuantity(binaryData);
      binaryData.currentIndex += metadataTableLength;
      binaryData.currentIndex = readVariableLengthQuantity(binaryData);
      const rootNode = new XMFNode(binaryData);
      let midiArray = void 0;
      /**
      * Find the stuff we care about
      */
      const searchNode = (node) => {
        const checkMeta = (xmf, rmid) => {
          if (node.metadata[xmf] !== void 0 && typeof node.metadata[xmf] === "string") midi.rmidiInfo[rmid] = getStringBytes(node.metadata[xmf]);
        };
        checkMeta("nodeName", "name");
        checkMeta("title", "name");
        checkMeta("copyrightNotice", "copyright");
        checkMeta("comment", "comment");
        if (node.isFile) switch (node.resourceFormat) {
          default: return;
          case "DLS1":
          case "DLS2":
          case "DLS22":
          case "mobileDLS":
            SpessaSynthInfo("%cFound embedded DLS!", consoleColors.recognized);
            midi.embeddedSoundBank = node.nodeData.buffer;
            break;
          case "StandardMIDIFile":
          case "StandardMIDIFileType1":
            SpessaSynthInfo("%cFound embedded MIDI!", consoleColors.recognized);
            midiArray = node.nodeData;
            break;
        }
        else for (const n of node.innerNodes) searchNode(n);
      };
      searchNode(rootNode);
      SpessaSynthGroupEnd();
      if (!midiArray) throw new Error("No MIDI data in the XMF file!");
      return midiArray;
    }
    //#endregion
    //#region src/midi/midi_track.ts
    var MIDITrack = class MIDITrack {
      /**
      * The name of this track.
      */
      name = "";
      /**
      * The MIDI port number used by the track.
      */
      port = 0;
      /**
      * A set that contains the MIDI channels used by the track in the sequence.
      */
      channels = /* @__PURE__ */ new Set();
      /**
      * All the MIDI messages of this track.
      */
      events = [];
      static copyFrom(track) {
        const t = new MIDITrack();
        t.copyFrom(track);
        return t;
      }
      copyFrom(track) {
        this.name = track.name;
        this.port = track.port;
        this.channels = new Set(track.channels);
        this.events = track.events.map((e) => new MIDIMessage(e.ticks, e.statusByte, new IndexedByteArray(e.data)));
      }
      /**
      * Adds an event to the track.
      * @param event The event to add.
      * @param index The index at which to add this event.
      * @deprecated Use addEvents instead
      */
      addEvent(event, index) {
        this.events.splice(index, 0, event);
      }
      /**
      * Adds events to the track.
      * @param index The index at which to add these event.
      * @param events The events to add.
      */
      addEvents(index, ...events) {
        this.events.splice(index, 0, ...events);
      }
      /**
      * Removes an event from the track.
      * @param index The index of the event to remove.
      */
      deleteEvent(index) {
        this.events.splice(index, 1);
      }
      /**
      * Appends an event to the end of the track.
      * @param event The event to add.
      */
      pushEvent(event) {
        this.events.push(event);
      }
    };
    //#endregion
    //#region src/midi/midi_loader.ts
    /**
    * Loads a MIDI file (SMF, RMIDI, XMF) from a given ArrayBuffer.
    * @param outputMIDI The BasicMIDI instance to populate with the parsed MIDI data.
    * @param arrayBuffer The ArrayBuffer containing the binary file data.
    * @param fileName The optional name of the file, will be used if the MIDI file does not have a name.
    * @remarks
    * This function reads the MIDI file format, extracts the header and track chunks,
    * and populates the BasicMIDI instance with the parsed data.
    * It supports Standard MIDI Files (SMF), RIFF MIDI (RMIDI), and Extensible Music Format (XMF).
    * It also handles embedded soundbanks in RMIDI files.
    * If the file is an RMIDI file, it will extract the embedded soundbank and store
    * it in the `embeddedSoundFont` property of the BasicMIDI instance.
    * If the file is an XMF file, it will parse the XMF structure and extract the MIDI data.
    */
    function loadMIDIFromArrayBufferInternal(outputMIDI, arrayBuffer, fileName) {
      SpessaSynthGroupCollapsed(`%cParsing MIDI File...`, consoleColors.info);
      outputMIDI.fileName = fileName;
      const binaryData = new IndexedByteArray(arrayBuffer);
      let smfFileBinary;
      const readMIDIChunk = (fileByteArray) => {
        const type = readBinaryStringIndexed(fileByteArray, 4);
        const size = readBigEndianIndexed(fileByteArray, 4);
        const chunk = {
          type,
          size,
          data: new IndexedByteArray(size)
        };
        const dataSlice = fileByteArray.slice(fileByteArray.currentIndex, fileByteArray.currentIndex + chunk.size);
        chunk.data.set(dataSlice, 0);
        fileByteArray.currentIndex += chunk.size;
        return chunk;
      };
      const initialString = readBinaryString(binaryData, 4);
      if (initialString === "RIFF") {
        binaryData.currentIndex += 8;
        const rmid = readBinaryStringIndexed(binaryData, 4);
        if (rmid !== "RMID") {
          SpessaSynthGroupEnd();
          throw new SyntaxError(`Invalid RMIDI Header! Expected "RMID", got "${rmid}"`);
        }
        const riff = RIFFChunk.read(binaryData);
        if (riff.header !== "data") {
          SpessaSynthGroupEnd();
          throw new SyntaxError(`Invalid RMIDI Chunk header! Expected "data", got "${riff.header}"`);
        }
        smfFileBinary = riff.data;
        let isSF2RMIDI = false;
        let foundDbnk = false;
        while (binaryData.currentIndex < binaryData.length) {
          const startIndex = binaryData.currentIndex;
          const currentChunk = RIFFChunk.read(binaryData, true);
          if (currentChunk.header === "RIFF") {
            const type = readBinaryStringIndexed(currentChunk.data, 4).toLowerCase();
            if (type === "sfbk" || type === "sfpk" || type === "dls ") {
              SpessaSynthInfo("%cFound embedded soundbank!", consoleColors.recognized);
              outputMIDI.embeddedSoundBank = binaryData.slice(startIndex, startIndex + currentChunk.size).buffer;
            } else SpessaSynthWarn(`Unknown RIFF chunk: "${type}"`);
            if (type === "dls ") outputMIDI.isDLSRMIDI = true;
            else isSF2RMIDI = true;
          } else if (currentChunk.header === "LIST") {
            if (readBinaryStringIndexed(currentChunk.data, 4) === "INFO") {
              SpessaSynthInfo("%cFound RMIDI INFO chunk!", consoleColors.recognized);
              while (currentChunk.data.currentIndex < currentChunk.size) {
                const infoChunk = RIFFChunk.read(currentChunk.data, true);
                const headerTyped = infoChunk.header;
                const infoData = infoChunk.data;
                switch (headerTyped) {
                  default:
                    SpessaSynthWarn(`Unknown RMIDI Info: ${headerTyped}`);
                    break;
                  case "INAM":
                    outputMIDI.rmidiInfo.name = infoData;
                    break;
                  case "IALB":
                  case "IPRD":
                    outputMIDI.rmidiInfo.album = infoData;
                    break;
                  case "ICRT":
                  case "ICRD":
                    outputMIDI.rmidiInfo.creationDate = infoData;
                    break;
                  case "IART":
                    outputMIDI.rmidiInfo.artist = infoData;
                    break;
                  case "IGNR":
                    outputMIDI.rmidiInfo.genre = infoData;
                    break;
                  case "IPIC":
                    outputMIDI.rmidiInfo.picture = infoData;
                    break;
                  case "ICOP":
                    outputMIDI.rmidiInfo.copyright = infoData;
                    break;
                  case "ICMT":
                    outputMIDI.rmidiInfo.comment = infoData;
                    break;
                  case "IENG":
                    outputMIDI.rmidiInfo.engineer = infoData;
                    break;
                  case "ISFT":
                    outputMIDI.rmidiInfo.software = infoData;
                    break;
                  case "ISBJ":
                    outputMIDI.rmidiInfo.subject = infoData;
                    break;
                  case "IENC":
                    outputMIDI.rmidiInfo.infoEncoding = infoData;
                    break;
                  case "MENC":
                    outputMIDI.rmidiInfo.midiEncoding = infoData;
                    break;
                  case "DBNK":
                    outputMIDI.bankOffset = readLittleEndian(infoData, 2);
                    foundDbnk = true;
                    break;
                }
              }
            }
          }
        }
        if (isSF2RMIDI && !foundDbnk) outputMIDI.bankOffset = 1;
        if (outputMIDI.isDLSRMIDI) outputMIDI.bankOffset = 0;
        if (outputMIDI.embeddedSoundBank === void 0) outputMIDI.bankOffset = 0;
      } else if (initialString === "XMF_") smfFileBinary = loadXMF(outputMIDI, binaryData);
      else smfFileBinary = binaryData;
      const headerChunk = readMIDIChunk(smfFileBinary);
      if (headerChunk.type !== "MThd") {
        SpessaSynthGroupEnd();
        throw new SyntaxError(`Invalid MIDI Header! Expected "MThd", got "${headerChunk.type}"`);
      }
      if (headerChunk.size !== 6) {
        SpessaSynthGroupEnd();
        throw new RangeError(`Invalid MIDI header chunk size! Expected 6, got ${headerChunk.size}`);
      }
      outputMIDI.format = readBigEndianIndexed(headerChunk.data, 2);
      const trackCount = readBigEndianIndexed(headerChunk.data, 2);
      outputMIDI.timeDivision = readBigEndianIndexed(headerChunk.data, 2);
      for (let i = 0; i < trackCount; i++) {
        const track = new MIDITrack();
        const trackChunk = readMIDIChunk(smfFileBinary);
        if (trackChunk.type !== "MTrk") {
          SpessaSynthGroupEnd();
          throw new SyntaxError(`Invalid track header! Expected "MTrk" got "${trackChunk.type}"`);
        }
        /**
        * MIDI running byte
        */
        let runningByte;
        let totalTicks = 0;
        if (outputMIDI.format === 2 && i > 0) totalTicks += outputMIDI.tracks[i - 1].events[outputMIDI.tracks[i - 1].events.length - 1].ticks;
        while (trackChunk.data.currentIndex < trackChunk.size) {
          totalTicks += readVariableLengthQuantity(trackChunk.data);
          const statusByteCheck = trackChunk.data[trackChunk.data.currentIndex];
          let statusByte;
          if (runningByte !== void 0 && statusByteCheck < 128) statusByte = runningByte;
          else if (statusByteCheck < 128) {
            SpessaSynthGroupEnd();
            throw new SyntaxError(`Unexpected byte with no running byte. (${statusByteCheck})`);
          } else statusByte = trackChunk.data[trackChunk.data.currentIndex++];
          const statusByteChannel = getChannel(statusByte);
          let eventDataLength;
          switch (statusByteChannel) {
            case -1:
              eventDataLength = 0;
              break;
            case -2:
              statusByte = trackChunk.data[trackChunk.data.currentIndex++];
              eventDataLength = readVariableLengthQuantity(trackChunk.data);
              break;
            case -3:
              eventDataLength = readVariableLengthQuantity(trackChunk.data);
              break;
            default:
              eventDataLength = dataBytesAmount[statusByte >> 4];
              runningByte = statusByte;
              break;
          }
          const eventData = new IndexedByteArray(eventDataLength);
          eventData.set(trackChunk.data.slice(trackChunk.data.currentIndex, trackChunk.data.currentIndex + eventDataLength), 0);
          const event = new MIDIMessage(totalTicks, statusByte, eventData);
          track.pushEvent(event);
          trackChunk.data.currentIndex += eventDataLength;
        }
        outputMIDI.tracks.push(track);
        SpessaSynthInfo(`%cParsed %c${outputMIDI.tracks.length}%c / %c${outputMIDI.tracks.length}`, consoleColors.info, consoleColors.value, consoleColors.info, consoleColors.value);
      }
      SpessaSynthInfo(`%cAll tracks parsed correctly!`, consoleColors.recognized);
      outputMIDI.flush(false);
      SpessaSynthGroupEnd();
    }
    //#endregion
    //#region src/utils/date.ts
    function toISODateString(date) {
      return date.toISOString().split(".")[0] + "Z";
    }
    const translations = [new Map([
      ["domingo", "Sunday"],
      ["segunda-feira", "Monday"],
      ["terça-feira", "Tuesday"],
      ["quarta-feira", "Wednesday"],
      ["quinta-feira", "Thursday"],
      ["sexta-feira", "Friday"],
      ["sábado", "Saturday"],
      ["janeiro", "January"],
      ["fevereiro", "February"],
      ["março", "March"],
      ["abril", "April"],
      ["maio", "May"],
      ["junho", "June"],
      ["julho", "July"],
      ["agosto", "August"],
      ["setembro", "September"],
      ["outubro", "October"],
      ["novembro", "November"],
      ["dezembro", "December"]
    ])];
    function tryTranslate(dateString) {
      for (const translation of translations) {
        let translated = dateString;
        for (const [pt, english] of translation.entries()) {
          const regex = new RegExp(pt, "gi");
          translated = translated.replace(regex, english);
        }
        const date = new Date(translated);
        if (!Number.isNaN(date.getTime())) return date;
      }
    }
    function tryDotted(dateString) {
      const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(dateString);
      if (match) {
        const day = Number.parseInt(match[1]);
        const month = Number.parseInt(match[2]) - 1;
        const year = Number.parseInt(match[3]);
        const date = new Date(year, month, day);
        if (!Number.isNaN(date.getTime())) return date;
      }
    }
    function tryAWE(dateString) {
      const match = /^(\d{1,2})\s{1,2}(\d{1,2})\s{1,2}(\d{2})$/.exec(dateString);
      if (match) {
        const day = match[1];
        const month = (Number.parseInt(match[2]) + 1).toString();
        const year = match[3];
        const date = /* @__PURE__ */ new Date(`${month}/${day}/${year}`);
        if (!Number.isNaN(date.getTime())) return date;
      }
    }
    function tryYear(dateString) {
      const match = /\b\d{4}\b/.exec(dateString);
      return match ? new Date(match[0]) : void 0;
    }
    function parseDateString(dateString) {
      dateString = dateString.trim();
      if (dateString.length === 0) return /* @__PURE__ */ new Date();
      const filtered = dateString.replaceAll(/\b(\d+)(st|nd|rd|th)\b/g, "$1").replace(/\s+at\s+/i, " ");
      const date = new Date(filtered);
      if (Number.isNaN(date.getTime())) {
        const translated = tryTranslate(dateString);
        if (translated) return translated;
        const dotted = tryDotted(dateString);
        if (dotted) return dotted;
        const awe = tryAWE(dateString);
        if (awe) return awe;
        const year = tryYear(dateString);
        if (year) return year;
        SpessaSynthWarn(`Invalid date: "${dateString}". Replacing with the current date!`);
        return /* @__PURE__ */ new Date();
      }
      return date;
    }
    //#endregion
    //#region src/midi/basic_midi.ts
    /**
    * BasicMIDI is the base of a complete MIDI file.
    */
    var BasicMIDI = class BasicMIDI {
      /**
      * The tracks in the sequence.
      */
      tracks = [];
      /**
      * The time division of the sequence, representing the number of MIDI ticks per beat.
      */
      timeDivision = 480;
      /**
      * The duration of the sequence, in seconds.
      */
      duration = 0;
      /**
      * The tempo changes in the sequence, ordered from the last change to the first.
      * Each change is represented by an object with a MIDI tick position and a tempo value in beats per minute.
      */
      tempoChanges = [{
        ticks: 0,
        tempo: 120
      }];
      /**
      * Any extra metadata found in the file.
      * These messages were deemed "interesting" by the parsing algorithm
      */
      extraMetadata = [];
      /**
      * An array containing the lyrics of the sequence.
      */
      lyrics = [];
      /**
      * The tick position of the first note-on event in the MIDI sequence.
      */
      firstNoteOn = 0;
      /**
      * The MIDI key range used in the sequence, represented by a minimum and maximum note value.
      */
      keyRange = {
        min: 0,
        max: 127
      };
      /**
      * The tick position of the last voice event (such as note-on, note-off, or control change) in the sequence.
      */
      lastVoiceEventTick = 0;
      /**
      * An array of channel offsets for each MIDI port, using the SpessaSynth method.
      * The index is the port number and the value is the channel offset.
      */
      portChannelOffsetMap = [0];
      /**
      * The loop points (in ticks) of the sequence, including both start and end points.
      */
      loop = {
        start: 0,
        end: 0,
        type: "hard"
      };
      /**
      * The file name of the MIDI sequence, if provided during parsing.
      */
      fileName;
      /**
      * The format of the MIDI file, which can be 0, 1, or 2, indicating the type of the MIDI file.
      */
      format = 0;
      /**
      * The RMID (Resource-Interchangeable MIDI) info data, if the file is RMID formatted.
      * Otherwise, this object is empty.
      * Info type: Chunk data as a binary array.
      * Note that text chunks contain a terminal zero byte.
      */
      rmidiInfo = {};
      /**
      * The bank offset used for RMID files.
      */
      bankOffset = 0;
      /**
      * If the MIDI file is a Soft Karaoke file (.kar), this is set to true.
      * https://www.mixagesoftware.com/en/midikit/help/HTML/karaoke_formats.html
      */
      isKaraokeFile = false;
      /**
      * Indicates if this file is a Multi-Port MIDI file.
      */
      isMultiPort = false;
      /**
      * If the MIDI file is a DLS RMIDI file.
      */
      isDLSRMIDI = false;
      /**
      * The embedded sound bank in the MIDI file, represented as an ArrayBuffer, if available.
      */
      embeddedSoundBank;
      /**
      * The raw, encoded MIDI name, represented as a Uint8Array.
      * Useful when the MIDI file uses a different code page.
      * Undefined if no MIDI name could be found.
      */
      binaryName;
      /**
      * The encoding of the RMIDI info in file, if specified.
      */
      get infoEncoding() {
        const encodingInfo = this.rmidiInfo.infoEncoding;
        if (!encodingInfo) return;
        let lengthToRead = encodingInfo.byteLength;
        if (encodingInfo[encodingInfo.byteLength - 1] === 0) lengthToRead--;
        return readBinaryString(encodingInfo, lengthToRead);
      }
      /**
      * Loads a MIDI file (SMF, RMIDI, XMF) from a given ArrayBuffer.
      * @param arrayBuffer The ArrayBuffer containing the binary file data.
      * @param fileName The optional name of the file, will be used if the MIDI file does not have a name.
      */
      static fromArrayBuffer(arrayBuffer, fileName = "") {
        const mid = new BasicMIDI();
        loadMIDIFromArrayBufferInternal(mid, arrayBuffer, fileName);
        return mid;
      }
      /**
      * Loads a MIDI file (SMF, RMIDI, XMF) from a given file.
      * @param file The file to load.
      */
      static async fromFile(file) {
        const mid = new BasicMIDI();
        loadMIDIFromArrayBufferInternal(mid, await file.arrayBuffer(), file.name);
        return mid;
      }
      /**
      * Copies a MIDI.
      * @param mid The MIDI to copy.
      * @returns The copied MIDI.
      */
      static copyFrom(mid) {
        const m = new BasicMIDI();
        m.copyFrom(mid);
        return m;
      }
      /**
      * Copies a MIDI.
      * @param mid The MIDI to copy.
      */
      copyFrom(mid) {
        this.copyMetadataFrom(mid);
        this.embeddedSoundBank = mid?.embeddedSoundBank?.slice(0) ?? void 0;
        this.tracks = mid.tracks.map((track) => MIDITrack.copyFrom(track));
      }
      /**
      * Converts MIDI ticks to time in seconds.
      * @param ticks The time in MIDI ticks.
      * @returns The time in seconds.
      */
      midiTicksToSeconds(ticks) {
        ticks = Math.max(ticks, 0);
        if (this.tempoChanges.length === 0) throw new Error("There are no tempo changes in the sequence. At least one is needed.");
        if (this.tempoChanges[this.tempoChanges.length - 1].ticks !== 0) throw new Error(`The last tempo change is not at 0 ticks. Got ${this.tempoChanges[this.tempoChanges.length - 1].ticks} ticks.`);
        let tempoIndex = this.tempoChanges.findIndex((v) => v.ticks <= ticks);
        let totalSeconds = 0;
        while (tempoIndex < this.tempoChanges.length) {
          const tempo = this.tempoChanges[tempoIndex++];
          const ticksSinceLastTempo = ticks - tempo.ticks;
          totalSeconds += ticksSinceLastTempo * 60 / (tempo.tempo * this.timeDivision);
          ticks = tempo.ticks;
        }
        return totalSeconds;
      }
      /**
      * Converts seconds to time in MIDI ticks.
      * @param seconds The time in seconds.
      * @returns The time in MIDI ticks.
      */
      secondsToMIDITicks(seconds) {
        seconds = Math.max(seconds, 0);
        if (seconds === 0) return 0;
        if (this.tempoChanges.length === 0) throw new Error("There are no tempo changes in the sequence. At least one is needed.");
        if (this.tempoChanges[this.tempoChanges.length - 1].ticks !== 0) throw new Error(`The last tempo change is not at 0 ticks. Got ${this.tempoChanges[this.tempoChanges.length - 1].ticks} ticks.`);
        let remainingSeconds = seconds;
        let totalTicks = 0;
        for (let i = this.tempoChanges.length - 1; i >= 0; i--) {
          const currentTempo = this.tempoChanges[i];
          const next = this.tempoChanges[i - 1];
          const ticksToNextTempo = next ? next.ticks - currentTempo.ticks : Infinity;
          const oneTickToSeconds = 60 / (currentTempo.tempo * this.timeDivision);
          const secondsToNextTempo = ticksToNextTempo * oneTickToSeconds;
          if (remainingSeconds <= secondsToNextTempo) {
            totalTicks += Math.round(remainingSeconds / oneTickToSeconds);
            return totalTicks;
          }
          totalTicks += ticksToNextTempo;
          remainingSeconds -= secondsToNextTempo;
        }
        return totalTicks;
      }
      /**
      * Gets the used programs and keys for this MIDI file with a given sound bank.
      * @param soundbank the sound bank.
      * @returns The output data is a key-value pair: preset -> Set<"key-velocity">
      */
      getUsedProgramsAndKeys(soundbank) {
        return getUsedProgramsAndKeys(this, soundbank);
      }
      /**
      * Preloads all voices for this sequence in a given synth.
      * This caches all the needed voices for playing back this sequencer, resulting in a smooth playback.
      * The sequencer calls this function by default when loading the songs.
      * @param synth
      */
      preloadSynth(synth) {
        SpessaSynthGroupCollapsed(`%cPreloading samples...`, consoleColors.info);
        const used = this.getUsedProgramsAndKeys(synth.soundBankManager);
        for (const [preset, combos] of used.entries()) {
          SpessaSynthInfo(`%cPreloading used samples on %c${preset.name}%c...`, consoleColors.info, consoleColors.recognized, consoleColors.info);
          for (const combo of combos) {
            const [midiNote, velocity] = combo.split("-").map(Number);
            synth.getVoicesForPreset(preset, midiNote, velocity);
          }
        }
        SpessaSynthGroupEnd();
      }
      /**
      * Updates all internal values of the MIDI.
      * @param sortEvents if the events should be sorted by ticks. Recommended to be true.
      */
      flush(sortEvents = true) {
        if (sortEvents) for (const t of this.tracks) t.events.sort((e1, e2) => e1.ticks - e2.ticks);
        this.parseInternal();
      }
      /**
      * Calculates all note times in seconds.
      * @param minDrumLength the shortest a drum note (channel 10) can be, in seconds.
      * @returns an array of 16 channels, each channel containing its notes,
      * with their key number, velocity, absolute start time and length in seconds.
      */
      getNoteTimes(minDrumLength = 0) {
        return getNoteTimesInternal(this, minDrumLength);
      }
      /**
      * Exports the midi as a standard MIDI file.
      * @returns the binary file data.
      */
      writeMIDI() {
        return writeMIDIInternal(this);
      }
      /**
      * Writes an RMIDI file. Note that this method modifies the MIDI file in-place.
      * @param soundBankBinary the binary sound bank to embed into the file.
      * @param configuration Extra options for writing the file.
      * @returns the binary file data.
      */
      writeRMIDI(soundBankBinary, configuration = DEFAULT_RMIDI_WRITE_OPTIONS) {
        return writeRMIDIInternal(this, soundBankBinary, fillWithDefaults(configuration, DEFAULT_RMIDI_WRITE_OPTIONS));
      }
      /**
      * Allows easy editing of the file by removing channels, changing programs,
      * changing controllers and transposing channels. Note that this modifies the MIDI *in-place*.
      * @param desiredProgramChanges - The programs to set on given channels.
      * @param controllerChanges - The controllers to set on given channels.
      * @param channelsToClear - The channels to remove from the sequence.
      * @param channelsToTranspose - The channels to transpose.
      * @param clearDrumParams - If the drum parameters should be cleared.
      * @param reverbParams - The desired GS reverb params, leave undefined for no change.
      * @param chorusParams - The desired GS chorus params, leave undefined for no change.
      * @param delayParams - The desired GS delay params, leave undefined for no change.
      */
      modify({ programChanges = [], controllerChanges = [], channelsToClear = [], channelsToTranspose = [], clearDrumParams = false, reverbParams, chorusParams, delayParams, insertionParams }) {
        modifyMIDIInternal(this, {
          programChanges,
          controllerChanges,
          channelsToClear,
          channelsToTranspose,
          clearDrumParams,
          reverbParams,
          chorusParams,
          delayParams,
          insertionParams
        });
      }
      /**
      * Modifies the sequence *in-place* according to the locked presets and controllers in the given snapshot.
      * @param snapshot the snapshot to apply.
      */
      applySnapshot(snapshot) {
        applySnapshotInternal(this, snapshot);
      }
      /**
      * Gets the MIDI's decoded name.
      * @param encoding The encoding to use if the MIDI uses an extended code page.
      * @remarks
      * Do not call in audioWorkletGlobalScope as it uses TextDecoder.
      * RMIDI encoding overrides the provided encoding.
      */
      getName(encoding = "Shift_JIS") {
        let rawName = "";
        const n = this.getRMIDInfo("name");
        if (n) return n.trim();
        if (this.binaryName) {
          encoding = this.getRMIDInfo("midiEncoding") ?? encoding;
          try {
            rawName = new TextDecoder(encoding).decode(this.binaryName).trim();
          } catch (error) {
            SpessaSynthWarn(`Failed to decode MIDI name: ${error}`);
          }
        }
        return rawName || this.fileName;
      }
      /**
      * Gets the decoded extra metadata as text and removes any unneeded characters (such as "@T" for karaoke files)
      * @param encoding The encoding to use if the MIDI uses an extended code page.
      * @remarks
      * Do not call in audioWorkletGlobalScope as it uses TextDecoder.
      * RMIDI encoding overrides the provided encoding.
      */
      getExtraMetadata(encoding = "Shift_JIS") {
        encoding = this.infoEncoding ?? encoding;
        const decoder = new TextDecoder(encoding);
        return this.extraMetadata.map((d) => {
          return decoder.decode(d.data).replaceAll(/@T|@A/g, "").trim();
        });
      }
      /**
      * Sets a given RMIDI info value.
      * @param infoType The type to set.
      * @param infoData The value to set it to.
      * @remarks
      * This sets the Info encoding to utf-8.
      */
      setRMIDInfo(infoType, infoData) {
        this.rmidiInfo.infoEncoding = getStringBytes("utf-8", true);
        if (infoType === "picture") this.rmidiInfo.picture = new Uint8Array(infoData);
        else if (infoType === "creationDate") this.rmidiInfo.creationDate = getStringBytes(toISODateString(infoData), true);
        else {
          const encoded = new TextEncoder().encode(infoData);
          this.rmidiInfo[infoType] = new Uint8Array([...encoded, 0]);
        }
      }
      /**
      * Gets a given chunk from the RMIDI information, undefined if it does not exist.
      * @param infoType The metadata type.
      * @returns String, Date, ArrayBuffer or undefined.
      */
      getRMIDInfo(infoType) {
        if (!this.rmidiInfo[infoType]) return;
        const encoding = this.infoEncoding ?? "UTF-8";
        if (infoType === "picture") return this.rmidiInfo[infoType].buffer;
        else if (infoType === "creationDate") return parseDateString(readBinaryString(this.rmidiInfo[infoType]));
        try {
          const decoder = new TextDecoder(encoding);
          let infoBuffer = this.rmidiInfo[infoType];
          if (infoBuffer[infoBuffer.length - 1] === 0) infoBuffer = infoBuffer?.slice(0, -1);
          return decoder.decode(infoBuffer.buffer).trim();
        } catch (error) {
          SpessaSynthWarn(`Failed to decode ${infoType} name: ${error}`);
          return;
        }
      }
      /**
      * Iterates over the MIDI file, ordered by the time the events happen.
      * @param callback The callback function to process each event.
      */
      iterate(callback) {
        /**
        * Indexes for tracks
        */
        const eventIndexes = new Array(this.tracks.length).fill(0);
        let remainingTracks = this.tracks.length;
        const findFirstEventIndex = () => {
          let index = 0;
          let ticks = Infinity;
          for (const [i, { events: track }] of this.tracks.entries()) {
            if (eventIndexes[i] >= track.length) continue;
            if (track[eventIndexes[i]].ticks < ticks) {
              index = i;
              ticks = track[eventIndexes[i]].ticks;
            }
          }
          return index;
        };
        while (remainingTracks > 0) {
          const trackNum = findFirstEventIndex();
          const track = this.tracks[trackNum].events;
          if (eventIndexes[trackNum] >= track.length) {
            remainingTracks--;
            continue;
          }
          const event = track[eventIndexes[trackNum]];
          callback(event, trackNum, eventIndexes);
          eventIndexes[trackNum]++;
        }
      }
      /**
      * INTERNAL USE ONLY!
      */
      copyMetadataFrom(mid) {
        this.fileName = mid.fileName;
        this.timeDivision = mid.timeDivision;
        this.duration = mid.duration;
        this.firstNoteOn = mid.firstNoteOn;
        this.lastVoiceEventTick = mid.lastVoiceEventTick;
        this.format = mid.format;
        this.bankOffset = mid.bankOffset;
        this.isKaraokeFile = mid.isKaraokeFile;
        this.isMultiPort = mid.isMultiPort;
        this.isDLSRMIDI = mid.isDLSRMIDI;
        this.isDLSRMIDI = mid.isDLSRMIDI;
        this.tempoChanges = [...mid.tempoChanges];
        this.extraMetadata = mid.extraMetadata.map((m) => new MIDIMessage(m.ticks, m.statusByte, new IndexedByteArray(m.data)));
        this.lyrics = mid.lyrics.map((arr) => new MIDIMessage(arr.ticks, arr.statusByte, new IndexedByteArray(arr.data)));
        this.portChannelOffsetMap = [...mid.portChannelOffsetMap];
        this.binaryName = mid?.binaryName?.slice();
        this.loop = { ...mid.loop };
        this.keyRange = { ...mid.keyRange };
        this.rmidiInfo = {};
        for (const v of Object.entries(mid.rmidiInfo)) {
          const key = v[0];
          const value = v[1];
          this.rmidiInfo[key] = new Uint8Array(value);
        }
      }
      /**
      * Parses internal MIDI values
      */
      parseInternal() {
        SpessaSynthGroup("%cInterpreting MIDI events...", consoleColors.info);
        /**
        * For karaoke files, text events starting with @T are considered titles,
        * usually the first one is the title, and the latter is things such as "sequenced by" etc.
        */
        let karaokeHasTitle = false;
        this.tempoChanges = [{
          ticks: 0,
          tempo: 120
        }];
        this.extraMetadata = [];
        this.lyrics = [];
        this.firstNoteOn = 0;
        this.keyRange = {
          max: 0,
          min: 127
        };
        this.lastVoiceEventTick = 0;
        this.portChannelOffsetMap = [0];
        this.loop = {
          start: 0,
          end: 0,
          type: "hard"
        };
        this.isKaraokeFile = false;
        this.isMultiPort = false;
        let nameDetected = false;
        if (this.rmidiInfo.name !== void 0) nameDetected = true;
        let loopStart = null;
        let loopEnd = null;
        let loopType = "hard";
        for (const track of this.tracks) {
          const usedChannels = /* @__PURE__ */ new Set();
          let trackHasVoiceMessages = false;
          for (let i = 0; i < track.events.length; i++) {
            const e = track.events[i];
            if (e.statusByte >= 128 && e.statusByte < 240) {
              trackHasVoiceMessages = true;
              if (e.ticks > this.lastVoiceEventTick) this.lastVoiceEventTick = e.ticks;
              switch (e.statusByte & 240) {
                case midiMessageTypes.controllerChange:
                  switch (e.data[0]) {
                    case 2:
                    case 111:
                    case 116:
                      loopStart = e.ticks;
                      break;
                    case 4:
                    case 117:
                      if (loopEnd === null) {
                        loopType = "soft";
                        loopEnd = e.ticks;
                      } else loopEnd = 0;
                      break;
                    case 0: if (this.isDLSRMIDI && e.data[1] !== 0 && e.data[1] !== 127) {
                      SpessaSynthInfo("%cDLS RMIDI with offset 1 detected!", consoleColors.recognized);
                      this.bankOffset = 1;
                    }
                  }
                  break;
                case midiMessageTypes.noteOn: {
                  usedChannels.add(e.statusByte & 15);
                  const note = e.data[0];
                  this.keyRange.min = Math.min(this.keyRange.min, note);
                  this.keyRange.max = Math.max(this.keyRange.max, note);
                  break;
                }
              }
            }
            const eventText = readBinaryString(e.data);
            switch (e.statusByte) {
              case midiMessageTypes.endOfTrack:
                if (i !== track.events.length - 1) {
                  track.deleteEvent(i);
                  i--;
                  SpessaSynthWarn("Unexpected EndOfTrack. Removing!");
                }
                break;
              case midiMessageTypes.setTempo:
                this.tempoChanges.push({
                  ticks: e.ticks,
                  tempo: 6e7 / readBigEndian(e.data, 3)
                });
                break;
              case midiMessageTypes.marker:
                switch (eventText.trim().toLowerCase()) {
                  default: break;
                  case "start":
                  case "loopstart":
                    loopStart = e.ticks;
                    break;
                  case "loopend": loopEnd = e.ticks;
                }
                break;
              case midiMessageTypes.copyright:
                this.extraMetadata.push(e);
                break;
              case midiMessageTypes.lyric:
                if (eventText.trim().startsWith("@KMIDI KARAOKE FILE")) {
                  this.isKaraokeFile = true;
                  SpessaSynthInfo("%cKaraoke MIDI detected!", consoleColors.recognized);
                }
                if (this.isKaraokeFile) e.statusByte = midiMessageTypes.text;
                else this.lyrics.push(e);
              case midiMessageTypes.text: {
                const checkedText = eventText.trim();
                if (checkedText.startsWith("@KMIDI KARAOKE FILE")) {
                  this.isKaraokeFile = true;
                  SpessaSynthInfo("%cKaraoke MIDI detected!", consoleColors.recognized);
                } else if (this.isKaraokeFile) {
                  if (checkedText.startsWith("@T") || checkedText.startsWith("@A")) if (karaokeHasTitle) this.extraMetadata.push(e);
                  else {
                    this.binaryName = e.data.slice(2);
                    karaokeHasTitle = true;
                    nameDetected = true;
                  }
                  else if (!checkedText.startsWith("@")) this.lyrics.push(e);
                }
                break;
              }
            }
          }
          track.channels = usedChannels;
          track.name = "";
          const trackName = track.events.find((e) => e.statusByte === midiMessageTypes.trackName);
          if (trackName && this.tracks.indexOf(track) > 0) {
            track.name = readBinaryString(trackName.data);
            if (!trackHasVoiceMessages && !track.name.toLowerCase().includes("setup")) this.extraMetadata.push(trackName);
          }
        }
        this.tempoChanges.reverse();
        SpessaSynthInfo(`%cCorrecting loops, ports and detecting notes...`, consoleColors.info);
        const firstNoteOns = [];
        for (const t of this.tracks) {
          const firstNoteOn = t.events.find((e) => (e.statusByte & 240) === midiMessageTypes.noteOn);
          if (firstNoteOn) firstNoteOns.push(firstNoteOn.ticks);
        }
        this.firstNoteOn = Math.min(...firstNoteOns);
        SpessaSynthInfo(`%cFirst note-on detected at: %c${this.firstNoteOn}%c ticks!`, consoleColors.info, consoleColors.recognized, consoleColors.info);
        loopStart ??= this.firstNoteOn;
        if (loopEnd === null || loopEnd === 0) loopEnd = this.lastVoiceEventTick;
        this.loop = {
          start: loopStart,
          end: loopEnd,
          type: loopType
        };
        this.lastVoiceEventTick = Math.max(this.lastVoiceEventTick, this.loop.end);
        SpessaSynthInfo(`%cLoop points: start: %c${this.loop.start}%c end: %c${this.loop.end}`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized);
        let portOffset = 0;
        this.portChannelOffsetMap = [];
        for (const track of this.tracks) {
          track.port = -1;
          if (track.channels.size === 0) continue;
          for (const e of track.events) {
            if (e.statusByte !== midiMessageTypes.midiPort) continue;
            const port = e.data[0];
            track.port = port;
            if (this.portChannelOffsetMap[port] === void 0) {
              this.portChannelOffsetMap[port] = portOffset;
              portOffset += 16;
            }
          }
        }
        this.portChannelOffsetMap = [...this.portChannelOffsetMap].map((o) => o ?? 0);
        let defaultPort = Infinity;
        for (const track of this.tracks) if (track.port !== -1 && defaultPort > track.port) defaultPort = track.port;
        if (defaultPort === Infinity) defaultPort = 0;
        for (const track of this.tracks) if (track.port === -1 || track.port === void 0) track.port = defaultPort;
        if (this.portChannelOffsetMap.length === 0) this.portChannelOffsetMap = [0];
        if (this.portChannelOffsetMap.length < 2) SpessaSynthInfo(`%cNo additional MIDI Ports detected.`, consoleColors.info);
        else {
          this.isMultiPort = true;
          SpessaSynthInfo(`%cMIDI Ports detected!`, consoleColors.recognized);
        }
        if (!nameDetected) if (this.tracks.length > 1) {
          if (!this.tracks[0].events.some((message) => message.statusByte >= midiMessageTypes.noteOn && message.statusByte < midiMessageTypes.polyPressure)) {
            const name = this.tracks[0].events.find((message) => message.statusByte === midiMessageTypes.trackName);
            if (name) this.binaryName = name.data;
          }
        } else {
          const name = this.tracks[0].events.find((message) => message.statusByte === midiMessageTypes.trackName);
          if (name) this.binaryName = name.data;
        }
        this.extraMetadata = this.extraMetadata.filter((c) => c.data.length > 0);
        this.lyrics.sort((a, b) => a.ticks - b.ticks);
        if (!this.tracks.some((t) => t.events[0].ticks === 0)) {
          const track = this.tracks[0];
          let b = this?.binaryName?.buffer;
          if (!b) b = new Uint8Array(0).buffer;
          track.events.unshift(new MIDIMessage(0, midiMessageTypes.trackName, new IndexedByteArray(b)));
        }
        this.duration = this.midiTicksToSeconds(this.lastVoiceEventTick);
        if (this.binaryName?.length === 0) this.binaryName = void 0;
        SpessaSynthInfo(`%cMIDI file parsed. Total tick time: %c${this.lastVoiceEventTick}%c, total seconds time: %c${formatTime(Math.ceil(this.duration)).time}`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized);
        SpessaSynthGroupEnd();
      }
    };
    //#endregion
    //#region src/midi/midi_tools/midi_builder.ts
    const DEFAULT_MIDI_BUILDER_OPTIONS = {
      name: "Untitled song",
      timeDivision: 480,
      initialTempo: 120,
      format: 0
    };
    /**
    * A class that helps to build a MIDI file from scratch.
    */
    var MIDIBuilder = class extends BasicMIDI {
      encoder = new TextEncoder();
      /**
      * Creates a new MIDI file.
      * @param options The options for writing the file.
      */
      constructor(options = DEFAULT_MIDI_BUILDER_OPTIONS) {
        super();
        this.setRMIDInfo("midiEncoding", "utf-8");
        const fullOptions = fillWithDefaults(options, DEFAULT_MIDI_BUILDER_OPTIONS);
        if (fullOptions.format === 2) throw new Error("MIDI format 2 is not supported in the MIDI builder. Consider using format 1.");
        this.format = fullOptions.format;
        this.timeDivision = fullOptions.timeDivision;
        this.binaryName = this.encoder.encode(fullOptions.name);
        this.addNewTrack(fullOptions.name);
        this.addSetTempo(0, fullOptions.initialTempo);
      }
      /**
      * Adds a new Set Tempo event.
      * @param ticks the tick number of the event.
      * @param tempo the tempo in beats per minute (BPM).
      */
      addSetTempo(ticks, tempo) {
        const array = new IndexedByteArray(3);
        tempo = 6e7 / tempo;
        array[0] = tempo >> 16 & 255;
        array[1] = tempo >> 8 & 255;
        array[2] = tempo & 255;
        this.addEvent(ticks, 0, midiMessageTypes.setTempo, array);
      }
      /**
      * Adds a new MIDI track.
      * @param name the new track's name.
      * @param port the new track's port.
      */
      addNewTrack(name, port = 0) {
        if (this.format === 0 && this.tracks.length > 0) throw new Error("Can't add more tracks to MIDI format 0. Consider using format 1.");
        const track = new MIDITrack();
        track.name = name;
        track.port = port;
        this.tracks.push(track);
        this.addEvent(0, this.tracks.length - 1, midiMessageTypes.trackName, this.encoder.encode(name));
        this.addEvent(0, this.tracks.length - 1, midiMessageTypes.midiPort, [port]);
      }
      /**
      * Adds a new MIDI Event.
      * @param ticks the tick time of the event (absolute).
      * @param track the track number to use.
      * @param event the MIDI event number.
      * @param eventData {Uint8Array|Iterable<number>} the raw event data.
      */
      addEvent(ticks, track, event, eventData) {
        if (!this.tracks[track]) throw new Error(`Track ${track} does not exist. Add it via addTrack method.`);
        if (event >= midiMessageTypes.noteOff && this.format === 1 && track === 0) throw new Error("Can't add voice messages to the conductor track (0) in format 1. Consider using format 0 using a different track.");
        this.tracks[track].pushEvent(new MIDIMessage(ticks, event, new IndexedByteArray(eventData)));
      }
      /**
      * Adds a new Note On event.
      * @param ticks the tick time of the event.
      * @param track the track number to use.
      * @param channel the channel to use.
      * @param midiNote the midi note of the keypress.
      * @param velocity the velocity of the keypress.
      */
      addNoteOn(ticks, track, channel, midiNote, velocity) {
        channel %= 16;
        midiNote %= 128;
        velocity %= 128;
        this.addEvent(ticks, track, midiMessageTypes.noteOn | channel, [midiNote, velocity]);
      }
      /**
      * Adds a new Note Off event.
      * @param ticks the tick time of the event.
      * @param track the track number to use.
      * @param channel the channel to use.
      * @param midiNote the midi note of the key release.
      * @param velocity optional and unsupported by spessasynth.
      */
      addNoteOff(ticks, track, channel, midiNote, velocity = 64) {
        channel %= 16;
        midiNote %= 128;
        this.addEvent(ticks, track, midiMessageTypes.noteOff | channel, [midiNote, velocity]);
      }
      /**
      * Adds a new Program Change event.
      * @param ticks the tick time of the event.
      * @param track the track number to use.
      * @param channel the channel to use.
      * @param programNumber the MIDI program to use.
      */
      addProgramChange(ticks, track, channel, programNumber) {
        channel %= 16;
        programNumber %= 128;
        this.addEvent(ticks, track, midiMessageTypes.programChange | channel, [programNumber]);
      }
      /**
      * Adds a new Controller Change event.
      * @param ticks the tick time of the event.
      * @param track the track number to use.
      * @param channel the channel to use.
      * @param controllerNumber the MIDI CC to use.
      * @param controllerValue the new CC value.
      */
      addControllerChange(ticks, track, channel, controllerNumber, controllerValue) {
        channel %= 16;
        controllerNumber %= 128;
        controllerValue %= 128;
        this.addEvent(ticks, track, midiMessageTypes.controllerChange | channel, [controllerNumber, controllerValue]);
      }
      /**
      * Adds a new Pitch Wheel event.
      * @param ticks the tick time of the event.
      * @param track the track to use.
      * @param channel the channel to use.
      * @param MSB SECOND byte of the MIDI pitchWheel message.
      * @param LSB FIRST byte of the MIDI pitchWheel message.
      */
      addPitchWheel(ticks, track, channel, MSB, LSB) {
        channel %= 16;
        MSB %= 128;
        LSB %= 128;
        this.addEvent(ticks, track, midiMessageTypes.pitchWheel | channel, [LSB, MSB]);
      }
    };
    //#endregion
    //#region src/sequencer/process_event.ts
    /**
    * Processes a MIDI event.
    * @param event The MIDI event to process.
    * @param trackIndex The index of the track the event belongs to.
    */
    function processEventInternal(event, trackIndex) {
      if (this.externalMIDIPlayback && event.statusByte >= 128) {
        this.sendMIDIMessage([event.statusByte, ...event.data]);
        return;
      }
      const track = this._midiData.tracks[trackIndex];
      const statusByteData = getEvent(event.statusByte);
      const offset = this.midiPortChannelOffsets[this.currentMIDIPorts[trackIndex]] || 0;
      statusByteData.channel += offset;
      switch (statusByteData.status) {
        case midiMessageTypes.noteOn: {
          const velocity = event.data[1];
          if (velocity > 0) {
            this.synth.noteOn(statusByteData.channel, event.data[0], velocity);
            this.playingNotes.push({
              midiNote: event.data[0],
              channel: statusByteData.channel,
              velocity
            });
          } else {
            this.synth.noteOff(statusByteData.channel, event.data[0]);
            const toDelete = this.playingNotes.findIndex((n) => n.midiNote === event.data[0] && n.channel === statusByteData.channel);
            if (toDelete !== -1) this.playingNotes.splice(toDelete, 1);
          }
          break;
        }
        case midiMessageTypes.noteOff: {
          this.synth.noteOff(statusByteData.channel, event.data[0]);
          const toDelete = this.playingNotes.findIndex((n) => n.midiNote === event.data[0] && n.channel === statusByteData.channel);
          if (toDelete !== -1) this.playingNotes.splice(toDelete, 1);
          break;
        }
        case midiMessageTypes.pitchWheel:
          this.synth.pitchWheel(statusByteData.channel, event.data[1] << 7 | event.data[0]);
          break;
        case midiMessageTypes.controllerChange:
          if (this._midiData.isMultiPort && track.channels.size === 0) return;
          this.synth.controllerChange(statusByteData.channel, event.data[0], event.data[1]);
          break;
        case midiMessageTypes.programChange:
          if (this._midiData.isMultiPort && track.channels.size === 0) return;
          this.synth.programChange(statusByteData.channel, event.data[0]);
          break;
        case midiMessageTypes.polyPressure:
          this.synth.polyPressure(statusByteData.channel, event.data[0], event.data[1]);
          break;
        case midiMessageTypes.channelPressure:
          this.synth.channelPressure(statusByteData.channel, event.data[0]);
          break;
        case midiMessageTypes.systemExclusive:
          this.synth.systemExclusive(event.data, offset);
          break;
        case midiMessageTypes.setTempo: {
          const tempoBPM = 6e7 / readBigEndian(event.data, 3);
          this.oneTickToSeconds = 60 / (tempoBPM * this._midiData.timeDivision);
          if (this.oneTickToSeconds === 0) {
            this.oneTickToSeconds = 60 / (120 * this._midiData.timeDivision);
            SpessaSynthInfo("invalid tempo! falling back to 120 BPM");
          }
          break;
        }
        case midiMessageTypes.timeSignature:
        case midiMessageTypes.endOfTrack:
        case midiMessageTypes.midiChannelPrefix:
        case midiMessageTypes.songPosition:
        case midiMessageTypes.activeSensing:
        case midiMessageTypes.keySignature:
        case midiMessageTypes.sequenceNumber:
        case midiMessageTypes.sequenceSpecific:
        case midiMessageTypes.text:
        case midiMessageTypes.lyric:
        case midiMessageTypes.copyright:
        case midiMessageTypes.trackName:
        case midiMessageTypes.marker:
        case midiMessageTypes.cuePoint:
        case midiMessageTypes.instrumentName:
        case midiMessageTypes.programName: break;
        case midiMessageTypes.midiPort:
          this.assignMIDIPort(trackIndex, event.data[0]);
          break;
        case midiMessageTypes.reset:
          this.synth.stopAllChannels();
          this.synth.resetAllControllers();
          break;
        default:
          SpessaSynthInfo(`%cUnrecognized Event: %c${event.statusByte}%c status byte: %c${Object.keys(midiMessageTypes).find((k) => midiMessageTypes[k] === statusByteData.status)}`, consoleColors.warn, consoleColors.unrecognized, consoleColors.warn, consoleColors.value);
          break;
      }
      if (statusByteData.status >= 0 && statusByteData.status < 128) this.callEvent("metaEvent", {
        event,
        trackIndex
      });
    }
    //#endregion
    //#region src/sequencer/process_tick.ts
    /**
    * Processes a single MIDI tick.
    * Call this every rendering quantum to process the sequencer events in real-time.
    */
    function processTick() {
      if (this.paused || !this._midiData) return;
      const currentTime = this.currentTime;
      while (this.playedTime < currentTime) {
        const trackIndex = this.findFirstEventIndex();
        const event = this._midiData.tracks[trackIndex].events[this.eventIndexes[trackIndex]++];
        this.processEvent(event, trackIndex);
        const nextTrackIndex = this.findFirstEventIndex();
        const nextTrack = this._midiData.tracks[nextTrackIndex];
        if (this.loopCount > 0 && this._midiData.loop.end <= event.ticks) {
          if (this.loopCount !== Infinity) {
            this.loopCount--;
            this.callEvent("loopCountChange", { newCount: this.loopCount });
          }
          if (this._midiData.loop.type === "soft") this.jumpToTick(this._midiData.loop.start);
          else this.setTimeTicks(this._midiData.loop.start);
          return;
        }
        if (nextTrack.events.length <= this.eventIndexes[nextTrackIndex] || event.ticks >= this._midiData.lastVoiceEventTick) {
          this.songIsFinished();
          return;
        }
        const eventNext = nextTrack.events[this.eventIndexes[nextTrackIndex]];
        this.playedTime += this.oneTickToSeconds * (eventNext.ticks - event.ticks);
      }
    }
    //#endregion
    //#region src/sequencer/song_control.ts
    /**
    * Assigns a MIDI port channel offset to a track.
    * @param trackNum The track number to assign the port to.
    * @param port The MIDI port number to assign.
    */
    function assignMIDIPortInternal(trackNum, port) {
      if (this._midiData.tracks[trackNum].channels.size === 0) return;
      if (this.midiPortChannelOffset === 0) {
        this.midiPortChannelOffset += 16;
        this.midiPortChannelOffsets[port] = 0;
      }
      if (this.midiPortChannelOffsets[port] === void 0) {
        if (this.synth.midiChannels.length < this.midiPortChannelOffset + 15) this.addNewMIDIPort();
        this.midiPortChannelOffsets[port] = this.midiPortChannelOffset;
        this.midiPortChannelOffset += 16;
      }
      this.currentMIDIPorts[trackNum] = port;
    }
    /**
    * Loads a new sequence internally.
    * @param parsedMidi The parsed MIDI data to load.
    */
    function loadNewSequenceInternal(parsedMidi) {
      if (!parsedMidi.tracks) throw new Error("This MIDI has no tracks!");
      if (parsedMidi.duration === 0) {
        SpessaSynthWarn("This MIDI file has a duration of exactly 0 seconds.");
        this.pausedTime = 0;
        this.isFinished = true;
        return;
      }
      this.oneTickToSeconds = 60 / (120 * parsedMidi.timeDivision);
      this._midiData = parsedMidi;
      this.isFinished = false;
      this.synth.clearEmbeddedBank();
      if (this._midiData.embeddedSoundBank !== void 0) {
        SpessaSynthInfo("%cEmbedded soundbank detected! Using it.", consoleColors.recognized);
        this.synth.setEmbeddedSoundBank(this._midiData.embeddedSoundBank, this._midiData.bankOffset);
        if (this.preload) this._midiData.preloadSynth(this.synth);
      }
      this.currentMIDIPorts = this._midiData.tracks.map((t) => t.port);
      this.midiPortChannelOffset = 0;
      this.midiPortChannelOffsets = {};
      for (const [trackIndex, track] of this._midiData.tracks.entries()) this.assignMIDIPort(trackIndex, track.port);
      this.firstNoteTime = this._midiData.midiTicksToSeconds(this._midiData.firstNoteOn);
      SpessaSynthInfo(`%cTotal song time: ${formatTime(Math.ceil(this._midiData.duration)).time}`, consoleColors.recognized);
      this.callEvent("songChange", { songIndex: this._songIndex });
      if (this._midiData.duration <= .2) {
        SpessaSynthWarn(`%cVery short song: (${formatTime(Math.round(this._midiData.duration)).time}). Disabling loop!`, consoleColors.warn);
        this.loopCount = 0;
      }
      this.currentTime = 0;
    }
    //#endregion
    //#region src/soundbank/basic_soundbank/generator_types.ts
    /**
    * All SoundFont2 Generator enumerations.
    */
    const generatorTypes = Object.freeze({
      INVALID: -1,
      startAddrsOffset: 0,
      endAddrOffset: 1,
      startloopAddrsOffset: 2,
      endloopAddrsOffset: 3,
      startAddrsCoarseOffset: 4,
      modLfoToPitch: 5,
      vibLfoToPitch: 6,
      modEnvToPitch: 7,
      initialFilterFc: 8,
      initialFilterQ: 9,
      modLfoToFilterFc: 10,
      modEnvToFilterFc: 11,
      endAddrsCoarseOffset: 12,
      modLfoToVolume: 13,
      unused1: 14,
      chorusEffectsSend: 15,
      reverbEffectsSend: 16,
      pan: 17,
      unused2: 18,
      unused3: 19,
      unused4: 20,
      delayModLFO: 21,
      freqModLFO: 22,
      delayVibLFO: 23,
      freqVibLFO: 24,
      delayModEnv: 25,
      attackModEnv: 26,
      holdModEnv: 27,
      decayModEnv: 28,
      sustainModEnv: 29,
      releaseModEnv: 30,
      keyNumToModEnvHold: 31,
      keyNumToModEnvDecay: 32,
      delayVolEnv: 33,
      attackVolEnv: 34,
      holdVolEnv: 35,
      decayVolEnv: 36,
      sustainVolEnv: 37,
      releaseVolEnv: 38,
      keyNumToVolEnvHold: 39,
      keyNumToVolEnvDecay: 40,
      instrument: 41,
      reserved1: 42,
      keyRange: 43,
      velRange: 44,
      startloopAddrsCoarseOffset: 45,
      keyNum: 46,
      velocity: 47,
      initialAttenuation: 48,
      reserved2: 49,
      endloopAddrsCoarseOffset: 50,
      coarseTune: 51,
      fineTune: 52,
      sampleID: 53,
      sampleModes: 54,
      reserved3: 55,
      scaleTuning: 56,
      exclusiveClass: 57,
      overridingRootKey: 58,
      unused5: 59,
      endOper: 60,
      amplitude: 61,
      vibLfoRate: 62,
      vibLfoAmplitudeDepth: 63,
      vibLfoToFilterFc: 64,
      modLfoRate: 65,
      modLfoAmplitudeDepth: 66
    });
    const GENERATORS_AMOUNT = Object.keys(generatorTypes).length;
    const MAX_GENERATOR = Math.max(...Object.values(generatorTypes));
    /**
    * Min: minimum value, max: maximum value, def: default value, nrpn: nrpn scale
    */
    const generatorLimits = Object.freeze({
      [generatorTypes.startAddrsOffset]: {
        min: 0,
        max: 32768,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.endAddrOffset]: {
        min: -32768,
        max: 32768,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.startloopAddrsOffset]: {
        min: -32768,
        max: 32768,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.endloopAddrsOffset]: {
        min: -32768,
        max: 32768,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.startAddrsCoarseOffset]: {
        min: 0,
        max: 32768,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.modLfoToPitch]: {
        min: -12e3,
        max: 12e3,
        def: 0,
        nrpn: 2
      },
      [generatorTypes.vibLfoToPitch]: {
        min: -12e3,
        max: 12e3,
        def: 0,
        nrpn: 2
      },
      [generatorTypes.modEnvToPitch]: {
        min: -12e3,
        max: 12e3,
        def: 0,
        nrpn: 2
      },
      [generatorTypes.initialFilterFc]: {
        min: 1500,
        max: 13500,
        def: 13500,
        nrpn: 2
      },
      [generatorTypes.initialFilterQ]: {
        min: 0,
        max: 960,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.modLfoToFilterFc]: {
        min: -12e3,
        max: 12e3,
        def: 0,
        nrpn: 2
      },
      [generatorTypes.modEnvToFilterFc]: {
        min: -12e3,
        max: 12e3,
        def: 0,
        nrpn: 2
      },
      [generatorTypes.endAddrsCoarseOffset]: {
        min: -32768,
        max: 32768,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.modLfoToVolume]: {
        min: -960,
        max: 960,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.chorusEffectsSend]: {
        min: 0,
        max: 1e3,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.reverbEffectsSend]: {
        min: 0,
        max: 1e3,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.pan]: {
        min: -500,
        max: 500,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.delayModLFO]: {
        min: -12e3,
        max: 5e3,
        def: -12e3,
        nrpn: 2
      },
      [generatorTypes.freqModLFO]: {
        min: -16e3,
        max: 4500,
        def: 0,
        nrpn: 4
      },
      [generatorTypes.delayVibLFO]: {
        min: -12e3,
        max: 5e3,
        def: -12e3,
        nrpn: 2
      },
      [generatorTypes.freqVibLFO]: {
        min: -16e3,
        max: 4500,
        def: 0,
        nrpn: 4
      },
      [generatorTypes.delayModEnv]: {
        min: -32768,
        max: 5e3,
        def: -32768,
        nrpn: 2
      },
      [generatorTypes.attackModEnv]: {
        min: -32768,
        max: 8e3,
        def: -32768,
        nrpn: 2
      },
      [generatorTypes.holdModEnv]: {
        min: -12e3,
        max: 5e3,
        def: -12e3,
        nrpn: 2
      },
      [generatorTypes.decayModEnv]: {
        min: -12e3,
        max: 8e3,
        def: -12e3,
        nrpn: 2
      },
      [generatorTypes.sustainModEnv]: {
        min: 0,
        max: 1e3,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.releaseModEnv]: {
        min: -12e3,
        max: 8e3,
        def: -12e3,
        nrpn: 2
      },
      [generatorTypes.keyNumToModEnvHold]: {
        min: -1200,
        max: 1200,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.keyNumToModEnvDecay]: {
        min: -1200,
        max: 1200,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.delayVolEnv]: {
        min: -12e3,
        max: 5e3,
        def: -12e3,
        nrpn: 2
      },
      [generatorTypes.attackVolEnv]: {
        min: -12e3,
        max: 8e3,
        def: -12e3,
        nrpn: 2
      },
      [generatorTypes.holdVolEnv]: {
        min: -12e3,
        max: 5e3,
        def: -12e3,
        nrpn: 2
      },
      [generatorTypes.decayVolEnv]: {
        min: -12e3,
        max: 8e3,
        def: -12e3,
        nrpn: 2
      },
      [generatorTypes.sustainVolEnv]: {
        min: 0,
        max: 1440,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.releaseVolEnv]: {
        min: -12e3,
        max: 8e3,
        def: -12e3,
        nrpn: 2
      },
      [generatorTypes.keyNumToVolEnvHold]: {
        min: -1200,
        max: 1200,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.keyNumToVolEnvDecay]: {
        min: -1200,
        max: 1200,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.startloopAddrsCoarseOffset]: {
        min: -32768,
        max: 32768,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.keyNum]: {
        min: -1,
        max: 127,
        def: -1,
        nrpn: 1
      },
      [generatorTypes.velocity]: {
        min: -1,
        max: 127,
        def: -1,
        nrpn: 1
      },
      [generatorTypes.initialAttenuation]: {
        min: 0,
        max: 1440,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.endloopAddrsCoarseOffset]: {
        min: -32768,
        max: 32768,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.coarseTune]: {
        min: -120,
        max: 120,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.fineTune]: {
        min: -12700,
        max: 12700,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.scaleTuning]: {
        min: 0,
        max: 1200,
        def: 100,
        nrpn: 1
      },
      [generatorTypes.exclusiveClass]: {
        min: 0,
        max: 99999,
        def: 0,
        nrpn: 0
      },
      [generatorTypes.overridingRootKey]: {
        min: -1,
        max: 127,
        def: -1,
        nrpn: 0
      },
      [generatorTypes.sampleModes]: {
        min: 0,
        max: 3,
        def: 0,
        nrpn: 0
      },
      [generatorTypes.amplitude]: {
        min: -1e3,
        max: 1e3,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.vibLfoRate]: {
        min: -1e3,
        max: 1e3,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.vibLfoToFilterFc]: {
        min: -12e3,
        max: 12e3,
        def: 0,
        nrpn: 2
      },
      [generatorTypes.vibLfoAmplitudeDepth]: {
        min: 0,
        max: 1e3,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.modLfoRate]: {
        min: -1e3,
        max: 1e3,
        def: 0,
        nrpn: 1
      },
      [generatorTypes.modLfoAmplitudeDepth]: {
        min: 0,
        max: 1e3,
        def: 0,
        nrpn: 1
      }
    });
    const defaultGeneratorValues = new Int16Array(GENERATORS_AMOUNT);
    for (let i = 0; i < defaultGeneratorValues.length; i++) if (generatorLimits[i]) defaultGeneratorValues[i] = generatorLimits[i].def;
    //#endregion
    //#region src/soundbank/enums.ts
    const sampleTypes = {
      monoSample: 1,
      rightSample: 2,
      leftSample: 4,
      linkedSample: 8,
      romMonoSample: 32769,
      romRightSample: 32770,
      romLeftSample: 32772,
      romLinkedSample: 32776
    };
    const modulatorSources = {
      noController: 0,
      noteOnVelocity: 2,
      noteOnKeyNum: 3,
      polyPressure: 10,
      channelPressure: 13,
      pitchWheel: 14,
      pitchWheelRange: 16,
      link: 127
    };
    const modulatorCurveTypes = {
      linear: 0,
      concave: 1,
      convex: 2,
      switch: 3
    };
    const modulatorTransformTypes = {
      linear: 0,
      absolute: 2
    };
    const dlsSources = {
      none: 0,
      modLfo: 1,
      velocity: 2,
      keyNum: 3,
      volEnv: 4,
      modEnv: 5,
      pitchWheel: 6,
      polyPressure: 7,
      channelPressure: 8,
      vibratoLfo: 9,
      modulationWheel: 129,
      volume: 135,
      pan: 138,
      expression: 139,
      chorus: 221,
      reverb: 219,
      pitchWheelRange: 256,
      fineTune: 257,
      coarseTune: 258
    };
    const dlsDestinations = {
      none: 0,
      gain: 1,
      reserved: 2,
      pitch: 3,
      pan: 4,
      keyNum: 5,
      chorusSend: 128,
      reverbSend: 129,
      modLfoFreq: 260,
      modLfoDelay: 261,
      vibLfoFreq: 276,
      vibLfoDelay: 277,
      volEnvAttack: 518,
      volEnvDecay: 519,
      reservedEG1: 520,
      volEnvRelease: 521,
      volEnvSustain: 522,
      volEnvDelay: 523,
      volEnvHold: 524,
      modEnvAttack: 778,
      modEnvDecay: 779,
      reservedEG2: 780,
      modEnvRelease: 781,
      modEnvSustain: 782,
      modEnvDelay: 783,
      modEnvHold: 784,
      filterCutoff: 1280,
      filterQ: 1281
    };
    const DLSLoopTypes = {
      forward: 0,
      loopAndRelease: 1
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/controller_tables.ts
    const NON_CC_INDEX_OFFSET = 128;
    const CONTROLLER_TABLE_SIZE = 147;
    /**
    * An array with the default MIDI controller values. Note that these are 14-bit, not 7-bit.
    */
    const defaultMIDIControllerValues = new Int16Array(147).fill(0);
    const setResetValue = (i, v) => defaultMIDIControllerValues[i] = v << 7;
    setResetValue(midiControllers.mainVolume, 100);
    setResetValue(midiControllers.balance, 64);
    setResetValue(midiControllers.expressionController, 127);
    setResetValue(midiControllers.pan, 64);
    setResetValue(midiControllers.portamentoOnOff, 127);
    setResetValue(midiControllers.filterResonance, 64);
    setResetValue(midiControllers.releaseTime, 64);
    setResetValue(midiControllers.attackTime, 64);
    setResetValue(midiControllers.brightness, 64);
    setResetValue(midiControllers.decayTime, 64);
    setResetValue(midiControllers.vibratoRate, 64);
    setResetValue(midiControllers.vibratoDepth, 64);
    setResetValue(midiControllers.vibratoDelay, 64);
    setResetValue(midiControllers.generalPurposeController6, 64);
    setResetValue(midiControllers.generalPurposeController8, 64);
    setResetValue(midiControllers.registeredParameterLSB, 127);
    setResetValue(midiControllers.registeredParameterMSB, 127);
    setResetValue(midiControllers.nonRegisteredParameterLSB, 127);
    setResetValue(midiControllers.nonRegisteredParameterMSB, 127);
    setResetValue(128 + modulatorSources.pitchWheel, 64);
    setResetValue(128 + modulatorSources.pitchWheelRange, 2);
    const CUSTOM_CONTROLLER_TABLE_SIZE = Object.keys(customControllers).length;
    const customResetArray = new Float32Array(CUSTOM_CONTROLLER_TABLE_SIZE);
    customResetArray[customControllers.modulationMultiplier] = 1;
    const drumReverbResetArray = new Int8Array(128).fill(127);
    drumReverbResetArray[35] = 0;
    drumReverbResetArray[36] = 0;
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/controller_control/reset_controllers.ts
    function resetPortamento(sendCC) {
      if (this.lockedControllers[midiControllers.portamentoControl]) return;
      if (this.channelSystem === "xg") this.controllerChange(midiControllers.portamentoControl, 60, sendCC);
      else this.controllerChange(midiControllers.portamentoControl, 0, sendCC);
    }
    /**
    * Reset all controllers for channel.
    * This will reset all controllers to their default values,
    * except for the locked controllers.
    */
    function resetControllers(sendCCEvents = true) {
      for (const [cc, resetValue] of defaultMIDIControllerValues.entries()) {
        if (this.lockedControllers[cc]) continue;
        if (this.midiControllers[cc] !== resetValue && cc < 127) {
          if (cc !== midiControllers.portamentoControl && cc !== midiControllers.dataEntryMSB && cc !== midiControllers.registeredParameterMSB && cc !== midiControllers.registeredParameterLSB && cc !== midiControllers.nonRegisteredParameterMSB && cc !== midiControllers.nonRegisteredParameterLSB) this.controllerChange(cc, resetValue >> 7, sendCCEvents);
        } else this.midiControllers[cc] = resetValue;
      }
      this.octaveTuning.fill(0);
      resetPortamento.call(this, sendCCEvents);
      this.rxChannel = this.channel;
      this.assignMode = 2;
      this.randomPan = false;
      if (this.insertionEnabled && !this.synthCore.masterParameters.insertionEffectLock) {
        this.synthCore.callEvent("effectChange", {
          effect: "insertion",
          parameter: -2,
          value: this.channel
        });
        this.insertionEnabled = false;
      }
      this.cc1 = 16;
      this.cc2 = 17;
      this.drumMap = this.channel % 16 === 9 ? 1 : 0;
      this.resetDrumParams();
      this.resetVibratoParams();
      if (!this.lockedControllers[midiControllers.monoModeOn] && !this.lockedControllers[midiControllers.polyModeOn]) this.polyMode = true;
      this.perNotePitch = false;
      this.pitchWheel(8192);
      this.sysExModulators.resetModulators();
      const transpose = this.customControllers[customControllers.channelTransposeFine];
      this.customControllers.set(customResetArray);
      this.setCustomController(customControllers.channelTransposeFine, transpose);
      this.resetParameters();
    }
    function resetPreset() {
      this.setBankMSB(BankSelectHacks.getDefaultBank(this.channelSystem));
      this.setBankLSB(0);
      this.setGSDrums(false);
      this.setDrums(this.channel % 16 === 9);
      this.programChange(0);
    }
    const nonResettableCCs = new Set([
      midiControllers.bankSelect,
      midiControllers.bankSelectLSB,
      midiControllers.mainVolume,
      midiControllers.mainVolumeLSB,
      midiControllers.pan,
      midiControllers.panLSB,
      midiControllers.reverbDepth,
      midiControllers.tremoloDepth,
      midiControllers.chorusDepth,
      midiControllers.variationDepth,
      midiControllers.phaserDepth,
      midiControllers.soundVariation,
      midiControllers.filterResonance,
      midiControllers.releaseTime,
      midiControllers.attackTime,
      midiControllers.brightness,
      midiControllers.decayTime,
      midiControllers.vibratoRate,
      midiControllers.vibratoDepth,
      midiControllers.vibratoDelay,
      midiControllers.soundController10,
      midiControllers.polyModeOn,
      midiControllers.monoModeOn,
      midiControllers.omniModeOn,
      midiControllers.omniModeOff,
      midiControllers.dataEntryMSB,
      midiControllers.dataEntryLSB,
      midiControllers.nonRegisteredParameterLSB,
      midiControllers.nonRegisteredParameterMSB,
      midiControllers.registeredParameterLSB,
      midiControllers.registeredParameterMSB
    ]);
    /**
    * https://amei.or.jp/midistandardcommittee/Recommended_Practice/e/rp15.pdf
    * Reset controllers according to RP-15 Recommended Practice.
    */
    function resetControllersRP15Compliant() {
      this.perNotePitch = false;
      this.pitchWheel(8192);
      for (let i = 0; i < 128; i++) {
        const resetValue = defaultMIDIControllerValues[i];
        if (!nonResettableCCs.has(i) && resetValue !== this.midiControllers[i] && i !== midiControllers.portamentoControl) this.controllerChange(i, resetValue >> 7);
      }
      this.resetGeneratorOverrides();
      this.resetGeneratorOffsets();
    }
    /**
    * Reset all parameters to their default values.
    * This includes NRPN and RPN controllers, data entry state,
    * and generator overrides and offsets.
    */
    function resetParameters() {
      /**
      * Reset the state machine to idle
      */
      this.dataEntryState = dataEntryStates.Idle;
      this.midiControllers[midiControllers.nonRegisteredParameterLSB] = 16256;
      this.midiControllers[midiControllers.nonRegisteredParameterMSB] = 16256;
      this.midiControllers[midiControllers.registeredParameterLSB] = 16256;
      this.midiControllers[midiControllers.registeredParameterMSB] = 16256;
      this.resetGeneratorOverrides();
      this.resetGeneratorOffsets();
    }
    //#endregion
    //#region src/sequencer/play.ts
    const defaultControllerArray = defaultMIDIControllerValues.slice(0, 128);
    const nonSkippableCCs = new Set([
      midiControllers.dataDecrement,
      midiControllers.dataIncrement,
      midiControllers.dataEntryMSB,
      midiControllers.dataEntryLSB,
      midiControllers.registeredParameterLSB,
      midiControllers.registeredParameterMSB,
      midiControllers.nonRegisteredParameterLSB,
      midiControllers.nonRegisteredParameterMSB,
      midiControllers.bankSelect,
      midiControllers.bankSelectLSB,
      midiControllers.resetAllControllers,
      midiControllers.monoModeOn,
      midiControllers.polyModeOn
    ]);
    const isCCNonSkippable = (cc) => nonSkippableCCs.has(cc);
    /**
    * Plays the MIDI file to a specific time or ticks.
    * @param time in seconds.
    * @param ticks optional MIDI ticks, when given is used instead of time.
    * @returns true if the MIDI file is not finished.
    */
    function setTimeToInternal(time, ticks = void 0) {
      if (!this._midiData) return false;
      this.oneTickToSeconds = 60 / (120 * this._midiData.timeDivision);
      this.sendMIDIReset();
      this.playedTime = 0;
      this.eventIndexes = new Array(this._midiData.tracks.length).fill(0);
      const channelsToSave = this.synth.midiChannels.length;
      /**
      * Save pitch wheels here and send them only after
      */
      const pitchWheels = new Array(channelsToSave).fill(8192);
      /**
      * Save controllers here and send them only after
      */
      const savedControllers = [];
      for (let i = 0; i < channelsToSave; i++) savedControllers.push([...defaultControllerArray]);
      let savedTempo = void 0;
      let savedTempoTrack = 0;
      /**
      * RP-15 compliant reset
      * https://amei.or.jp/midistandardcommittee/Recommended_Practice/e/rp15.pdf
      */
      function resetAllControllers(chan) {
        pitchWheels[chan] = 8192;
        if (savedControllers?.[chan] === void 0) return;
        for (const [i, element] of defaultControllerArray.entries()) if (!nonResettableCCs.has(i)) savedControllers[chan][i] = element;
      }
      while (true) {
        let trackIndex = this.findFirstEventIndex();
        const track = this._midiData.tracks[trackIndex];
        const event = track.events[this.eventIndexes[trackIndex]];
        if (ticks === void 0) {
          if (this.playedTime >= time) break;
        } else if (event.ticks >= ticks) break;
        const info = getEvent(event.statusByte);
        const channel = info.channel + (this.midiPortChannelOffsets[track.port] || 0);
        switch (info.status) {
          case midiMessageTypes.noteOn:
            savedControllers[channel] ??= [...defaultControllerArray];
            savedControllers[channel][midiControllers.portamentoControl] = event.data[0];
            break;
          case midiMessageTypes.noteOff: break;
          case midiMessageTypes.pitchWheel:
            pitchWheels[channel] = event.data[1] << 7 | event.data[0];
            break;
          case midiMessageTypes.controllerChange: {
            if (this._midiData.isMultiPort && track.channels.size === 0) break;
            const controllerNumber = event.data[0];
            if (isCCNonSkippable(controllerNumber)) {
              const ccV = event.data[1];
              if (controllerNumber === midiControllers.resetAllControllers) resetAllControllers(channel);
              this.sendMIDICC(channel, controllerNumber, ccV);
            } else {
              savedControllers[channel] ??= [...defaultControllerArray];
              savedControllers[channel][controllerNumber] = event.data[1];
            }
            break;
          }
          case midiMessageTypes.setTempo: {
            const tempoBPM = 6e7 / readBigEndian(event.data, 3);
            this.oneTickToSeconds = 60 / (tempoBPM * this._midiData.timeDivision);
            savedTempo = event;
            savedTempoTrack = trackIndex;
            break;
          }
          default:
            this.processEvent(event, trackIndex);
            break;
        }
        this.eventIndexes[trackIndex]++;
        trackIndex = this.findFirstEventIndex();
        const nextEvent = this._midiData.tracks[trackIndex].events[this.eventIndexes[trackIndex]];
        if (nextEvent === void 0) {
          this.stop();
          return false;
        }
        this.playedTime += this.oneTickToSeconds * (nextEvent.ticks - event.ticks);
      }
      for (let channel = 0; channel < channelsToSave; channel++) {
        if (pitchWheels[channel] !== void 0) this.sendMIDIPitchWheel(channel, pitchWheels[channel]);
        if (savedControllers[channel] !== void 0) {
          for (const [index, value] of savedControllers[channel].entries()) if (value !== defaultControllerArray[index] && !isCCNonSkippable(index)) this.sendMIDICC(channel, index, value);
        }
      }
      if (savedTempo) this.callEvent("metaEvent", {
        event: savedTempo,
        trackIndex: savedTempoTrack
      });
      if (this.paused) this.pausedTime = this.playedTime;
      return true;
    }
    //#endregion
    //#region src/sequencer/sequencer.ts
    var SpessaSynthSequencer = class {
      /**
      * Sequencer's song list.
      */
      songs = [];
      /**
      * The shuffled song indexes.
      * This is used when shuffle mode is enabled.
      */
      shuffledSongIndexes = [];
      /**
      * The synthesizer connected to the sequencer.
      */
      synth;
      /**
      * If the MIDI messages should be sent to an event instead of the synth.
      * This is used by spessasynth_lib to pass them over to Web MIDI API.
      */
      externalMIDIPlayback = false;
      /**
      * If the notes that were playing when the sequencer was paused should be re-triggered.
      * Defaults to true.
      */
      retriggerPausedNotes = true;
      /**
      * The loop count of the sequencer.
      * If set to Infinity, it will loop forever.
      * If set to zero, the loop is disabled.
      */
      loopCount = 0;
      /**
      * Indicates if the sequencer should skip to the first note on event.
      * Defaults to true.
      */
      skipToFirstNoteOn = true;
      /**
      * Indicates if the sequencer has finished playing.
      */
      isFinished = false;
      /**
      * Indicates if the synthesizer should preload the voices for the newly loaded sequence.
      * Recommended.
      */
      preload = true;
      /**
      * Called when the sequencer calls an event.
      * @param event The event
      */
      onEventCall;
      /**
      * Processes a single MIDI tick.
      * You should call this every rendering quantum to process the sequencer events in real-time.
      */
      processTick = processTick.bind(this);
      /**
      * The time of the first note in seconds.
      */
      firstNoteTime = 0;
      /**
      * How long a single MIDI tick currently lasts in seconds.
      */
      oneTickToSeconds = 0;
      /**
      * The current event index for each track.
      * This is used to track which event is currently being processed for each track.
      */
      eventIndexes = [];
      /**
      * The time that has already been played in the current song.
      */
      playedTime = 0;
      /**
      * The paused time of the sequencer.
      * If the sequencer is not paused, this is undefined.
      */
      pausedTime = -1;
      /**
      * Absolute time of the sequencer when it started playing.
      * It is based on the synth's current time.
      */
      absoluteStartTime = 0;
      /**
      * Currently playing notes (for pausing and resuming)
      */
      playingNotes = [];
      /**
      * MIDI Port number for each of the MIDI tracks in the current sequence.
      */
      currentMIDIPorts = [];
      /**
      * This is used to assign new MIDI port offsets to new ports.
      */
      midiPortChannelOffset = 0;
      /**
      * Channel offsets for each MIDI port.
      * Stored as:
      * Record<midi port, channel offset>
      */
      midiPortChannelOffsets = {};
      assignMIDIPort = assignMIDIPortInternal.bind(this);
      loadNewSequence = loadNewSequenceInternal.bind(this);
      processEvent = processEventInternal.bind(this);
      setTimeTo = setTimeToInternal.bind(this);
      /**
      * Initializes a new Sequencer without any songs loaded.
      * @param spessasynthProcessor the synthesizer processor to use with this sequencer.
      */
      constructor(spessasynthProcessor) {
        this.synth = spessasynthProcessor;
        this.absoluteStartTime = this.synth.currentSynthTime;
      }
      _midiData;
      /**
      * The currently loaded MIDI data.
      */
      get midiData() {
        return this._midiData;
      }
      /**
      * The length of the current sequence in seconds.
      */
      get duration() {
        return this._midiData?.duration ?? 0;
      }
      _songIndex = 0;
      /**
      * The current song index in the song list.
      * If shuffle mode is enabled, this is the index of the shuffled song list.
      */
      get songIndex() {
        return this._songIndex;
      }
      /**
      * The current song index in the song list.
      * If shuffle mode is enabled, this is the index of the shuffled song list.
      */
      set songIndex(value) {
        this._songIndex = value;
        this._songIndex = Math.max(0, value % this.songs.length);
        this.loadCurrentSong();
      }
      _shuffleMode = false;
      /**
      * Controls if the sequencer should shuffle the songs in the song list.
      * If true, the sequencer will play the songs in a random order.
      * Songs are shuffled on a `loadNewSongList` call.
      */
      get shuffleMode() {
        return this._shuffleMode;
      }
      /**
      * Controls if the sequencer should shuffle the songs in the song list.
      * If true, the sequencer will play the songs in a random order.
      * Songs are shuffled on a `loadNewSongList` call.
      */
      set shuffleMode(on) {
        this._shuffleMode = on;
      }
      /**
      * Internal playback rate.
      */
      _playbackRate = 1;
      /**
      * The sequencer's playback rate.
      * This is the rate at which the sequencer plays back the MIDI data.
      */
      get playbackRate() {
        return this._playbackRate;
      }
      /**
      * The sequencer's playback rate.
      * This is the rate at which the sequencer plays back the MIDI data.
      * @param value the playback rate to set.
      */
      set playbackRate(value) {
        const t = this.currentTime;
        this._playbackRate = value;
        this.recalculateStartTime(t);
      }
      /**
      * The current time of the sequencer.
      * This is the time in seconds since the sequencer started playing.
      */
      get currentTime() {
        if (this.pausedTime !== void 0) return this.pausedTime;
        return (this.synth.currentSynthTime - this.absoluteStartTime) * this._playbackRate;
      }
      /**
      * The current time of the sequencer.
      * This is the time in seconds since the sequencer started playing.
      * @param time the time to set in seconds.
      */
      set currentTime(time) {
        if (!this._midiData) return;
        if (this.paused) this.pausedTime = time;
        if (time > this._midiData.duration || time < 0) if (this.skipToFirstNoteOn) this.setTimeTicks(this._midiData.firstNoteOn - 1);
        else this.setTimeTicks(0);
        else if (this.skipToFirstNoteOn && time < this.firstNoteTime) {
          this.setTimeTicks(this._midiData.firstNoteOn - 1);
          return;
        } else {
          this.playingNotes = [];
          this.callEvent("timeChange", { newTime: time });
          this.setTimeTo(time);
          this.recalculateStartTime(time);
        }
      }
      /**
      * True if paused, false if playing or stopped
      */
      get paused() {
        return this.pausedTime !== void 0;
      }
      /**
      * Starts or resumes the playback of the sequencer.
      * If the sequencer is paused, it will resume from the paused time.
      */
      play() {
        if (!this._midiData) {
          SpessaSynthWarn("No songs loaded in the sequencer. Ignoring the play call.");
          return;
        }
        if (this.currentTime >= this._midiData.duration) this.currentTime = 0;
        if (this.paused) this.recalculateStartTime(this.pausedTime ?? 0);
        if (this.retriggerPausedNotes) for (const n of this.playingNotes) this.sendMIDINoteOn(n.channel, n.midiNote, n.velocity);
        this.pausedTime = void 0;
      }
      /**
      * Pauses the playback.
      */
      pause() {
        this.pauseInternal(false);
      }
      /**
      * Loads a new song list into the sequencer.
      * @param midiBuffers the list of songs to load.
      */
      loadNewSongList(midiBuffers) {
        /**
        * Parse the MIDIs (only the array buffers, MIDI is unchanged)
        */
        this.songs = midiBuffers;
        if (this.songs.length === 0) return;
        this._songIndex = 0;
        this.shuffleSongIndexes();
        this.callEvent("songListChange", { newSongList: [...this.songs] });
        if (this.preload) {
          SpessaSynthGroup("%cPreloading all songs...", consoleColors.info);
          for (const song of this.songs) if (song.embeddedSoundBank === void 0) song.preloadSynth(this.synth);
          SpessaSynthGroupEnd();
        }
        this.loadCurrentSong();
      }
      callEvent(type, data) {
        this?.onEventCall?.({
          type,
          data
        });
      }
      pauseInternal(isFinished) {
        if (this.paused) return;
        this.stop();
        this.callEvent("pause", { isFinished });
        if (isFinished) this.callEvent("songEnded", {});
      }
      songIsFinished() {
        this.isFinished = true;
        if (this.songs.length === 1) {
          this.pauseInternal(true);
          return;
        }
        this._songIndex++;
        this._songIndex %= this.songs.length;
        this.loadCurrentSong();
      }
      /**
      * Stops the playback
      */
      stop() {
        this.pausedTime = this.currentTime;
        this.sendMIDIAllOff();
      }
      /**
      * @returns The track number of the next closest event, based on eventIndexes.
      */
      findFirstEventIndex() {
        let index = 0;
        let ticks = Infinity;
        const tLen = this._midiData.tracks.length;
        for (let i = 0; i < tLen; i++) {
          const track = this._midiData.tracks[i];
          if (this.eventIndexes[i] >= track.events.length) continue;
          const event = track.events[this.eventIndexes[i]];
          if (event.ticks < ticks) {
            index = i;
            ticks = event.ticks;
          }
        }
        return index;
      }
      /**
      * Adds a new port (16 channels) to the synth.
      */
      addNewMIDIPort() {
        for (let i = 0; i < 16; i++) this.synth.createMIDIChannel();
      }
      sendMIDIMessage(message) {
        if (!this.externalMIDIPlayback) {
          SpessaSynthWarn(`Attempting to send ${arrayToHexString(message)} to the synthesizer via sendMIDIMessage. This shouldn't happen!`);
          return;
        }
        this.callEvent("midiMessage", {
          message,
          time: this.synth.currentSynthTime
        });
      }
      sendMIDIAllOff() {
        for (let i = 0; i < 16; i++) this.sendMIDICC(i, midiControllers.sustainPedal, 0);
        if (!this.externalMIDIPlayback) {
          this.synth.stopAllChannels();
          return;
        }
        for (const note of this.playingNotes) this.sendMIDINoteOff(note.channel, note.midiNote);
        for (let c = 0; c < 16; c++) {
          this.sendMIDICC(c, midiControllers.allNotesOff, 0);
          this.sendMIDICC(c, midiControllers.allSoundOff, 0);
        }
      }
      sendMIDIReset() {
        this.sendMIDIAllOff();
        if (!this.externalMIDIPlayback) {
          this.synth.resetAllControllers();
          return;
        }
        this.sendMIDIMessage([midiMessageTypes.reset]);
      }
      loadCurrentSong() {
        let index = this._songIndex;
        if (this._shuffleMode) index = this.shuffledSongIndexes[this._songIndex];
        this.loadNewSequence(this.songs[index]);
      }
      shuffleSongIndexes() {
        const indexes = this.songs.map((_, i) => i);
        this.shuffledSongIndexes.length = 0;
        while (indexes.length > 0) {
          const index = indexes[Math.floor(Math.random() * indexes.length)];
          this.shuffledSongIndexes.push(index);
          indexes.splice(indexes.indexOf(index), 1);
        }
      }
      /**
      * Sets the time in MIDI ticks.
      * @param ticks the MIDI ticks to set the time to.
      */
      setTimeTicks(ticks) {
        if (!this._midiData) return;
        this.playingNotes = [];
        const seconds = this._midiData.midiTicksToSeconds(ticks);
        this.callEvent("timeChange", { newTime: seconds });
        const isNotFinished = this.setTimeTo(0, ticks);
        this.recalculateStartTime(this.playedTime);
        if (!isNotFinished) return;
      }
      /**
      * Recalculates the absolute start time of the sequencer.
      * @param time the time in seconds to recalculate the start time for.
      */
      recalculateStartTime(time) {
        this.absoluteStartTime = this.synth.currentSynthTime - time / this._playbackRate;
      }
      /**
      * Jumps to a MIDI tick without any further processing.
      * @param targetTicks The MIDI tick to jump to.
      * @protected
      */
      jumpToTick(targetTicks) {
        if (!this._midiData) return;
        this.sendMIDIAllOff();
        const seconds = this._midiData.midiTicksToSeconds(targetTicks);
        this.callEvent("timeChange", { newTime: seconds });
        this.recalculateStartTime(seconds);
        this.playedTime = seconds;
        this.eventIndexes.length = 0;
        for (const track of this._midiData.tracks) {
          const idx = track.events.findIndex((e) => e.ticks >= targetTicks);
          this.eventIndexes.push(idx === -1 ? track.events.length : idx);
        }
        const targetTempo = this._midiData.tempoChanges.find((t) => t.ticks <= targetTicks);
        this.oneTickToSeconds = 60 / (targetTempo.tempo * this._midiData.timeDivision);
      }
      sendMIDINoteOn(channel, midiNote, velocity) {
        if (!this.externalMIDIPlayback) {
          this.synth.noteOn(channel, midiNote, velocity);
          return;
        }
        channel %= 16;
        this.sendMIDIMessage([
          midiMessageTypes.noteOn | channel,
          midiNote,
          velocity
        ]);
      }
      sendMIDINoteOff(channel, midiNote) {
        if (!this.externalMIDIPlayback) {
          this.synth.noteOff(channel, midiNote);
          return;
        }
        channel %= 16;
        this.sendMIDIMessage([
          midiMessageTypes.noteOff | channel,
          midiNote,
          64
        ]);
      }
      sendMIDICC(channel, type, value) {
        if (!this.externalMIDIPlayback) {
          this.synth.controllerChange(channel, type, value);
          return;
        }
        channel %= 16;
        this.sendMIDIMessage([
          midiMessageTypes.controllerChange | channel,
          type,
          value
        ]);
      }
      /**
      * Sets the pitch of the given channel
      * @param channel usually 0-15: the channel to change pitch
      * @param pitch the 14-bit pitch value
      */
      sendMIDIPitchWheel(channel, pitch) {
        if (!this.externalMIDIPlayback) {
          this.synth.pitchWheel(channel, pitch);
          return;
        }
        channel %= 16;
        this.sendMIDIMessage([
          midiMessageTypes.pitchWheel | channel,
          pitch & 127,
          pitch >> 7
        ]);
      }
    };
    //#endregion
    //#region src/externals/stbvorbis_sync/stbvorbis_sync.min.js
    var stbvorbis = void 0 !== stbvorbis ? stbvorbis : {};
    let isReady = !1, readySolver;
    stbvorbis.isInitialized = new Promise((A) => readySolver = A);
    var atob = function(A) {
      var I, g, B, E, Q, C, i, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", o = "", G = 0;
      A = A.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      do
        E = h.indexOf(A.charAt(G++)), Q = h.indexOf(A.charAt(G++)), C = h.indexOf(A.charAt(G++)), i = h.indexOf(A.charAt(G++)), I = E << 2 | Q >> 4, g = (15 & Q) << 4 | C >> 2, B = (3 & C) << 6 | i, o += String.fromCharCode(I), 64 !== C && (o += String.fromCharCode(g)), 64 !== i && (o += String.fromCharCode(B));
      while (G < A.length);
      return o;
    };
    (function() {
      var A, I, g, B, E, Q, h, a, S, s, w, y, c, $ = void 0 !== $ ? $ : {};
      $.wasmBinary = Uint8Array.from(atob("AGFzbQEAAAABpQEYYAJ/fwF/YAF/AGAAAX9gBH9/f38AYAAAYAN/f38Bf2ABfwF/YAJ/fwBgBn9/f39/fwF/YAR/f39/AX9gBX9/f39/AX9gB39/f39/f38Bf2AGf39/f39/AGAIf39/f39/f38Bf2AFf39/f38AYAd/f39/f39/AGADf39/AGABfwF9YAF9AX1gAnx/AXxgAnx/AX9gA3x8fwF8YAJ8fAF8YAF8AXwCngIPA2VudgZtZW1vcnkCAIACA2VudgV0YWJsZQFwAQQEA2Vudgl0YWJsZUJhc2UDfwADZW52DkRZTkFNSUNUT1BfUFRSA38AA2VudghTVEFDS1RPUAN/AANlbnYJU1RBQ0tfTUFYA38ABmdsb2JhbAhJbmZpbml0eQN8AANlbnYFYWJvcnQAAQNlbnYNZW5sYXJnZU1lbW9yeQACA2Vudg5nZXRUb3RhbE1lbW9yeQACA2VudhdhYm9ydE9uQ2Fubm90R3Jvd01lbW9yeQACA2Vudg5fX19hc3NlcnRfZmFpbAADA2VudgtfX19zZXRFcnJObwABA2VudgZfYWJvcnQABANlbnYWX2Vtc2NyaXB0ZW5fbWVtY3B5X2JpZwAFA3d2BgYCAQcHAQIBAQcBCAcFAAkGCQoHBgYGBgEFBgIBBgYKAAgLAAYGBgYGBgYBAAoMDAMGBQANCAoJAAwODA8OAQAGBgcEABAJEAERAAADBQwAAAMHBxIGAQAABwIFEwMOBw8HBgYQFAoVExYXFxcXFgQFBQYFAAYkB38BIwELfwEjAgt/ASMDC38BQQALfwFBAAt8ASMEC38BQQALB9MCFRBfX2dyb3dXYXNtTWVtb3J5AAgRX19fZXJybm9fbG9jYXRpb24AYwVfZnJlZQBfB19tYWxsb2MAXgdfbWVtY3B5AHkHX21lbXNldAB6BV9zYnJrAHsXX3N0Yl92b3JiaXNfanNfY2hhbm5lbHMAJhRfc3RiX3ZvcmJpc19qc19jbG9zZQAlFV9zdGJfdm9yYmlzX2pzX2RlY29kZQAoE19zdGJfdm9yYmlzX2pzX29wZW4AJBpfc3RiX3ZvcmJpc19qc19zYW1wbGVfcmF0ZQAnC2R5bkNhbGxfaWlpAHwTZXN0YWJsaXNoU3RhY2tTcGFjZQAMC2dldFRlbXBSZXQwAA8LcnVuUG9zdFNldHMAeAtzZXRUZW1wUmV0MAAOCHNldFRocmV3AA0Kc3RhY2tBbGxvYwAJDHN0YWNrUmVzdG9yZQALCXN0YWNrU2F2ZQAKCQoBACMACwR9VFl9Csb2A3YGACAAQAALGwEBfyMGIQEjBiAAaiQGIwZBD2pBcHEkBiABCwQAIwYLBgAgACQGCwoAIAAkBiABJAcLEAAjCEUEQCAAJAggASQJCwsGACAAJAsLBAAjCwsRACAABEAgABARIAAgABASCwvvBwEKfyAAQYADaiEHIAcoAgAhBQJAIAUEQCAAQfwBaiEEIAQoAgAhASABQQBKBEAgAEHwAGohCANAIAUgAkEYbGpBEGohCSAJKAIAIQEgAQRAIAgoAgAhAyAFIAJBGGxqQQ1qIQogCi0AACEGIAZB/wFxIQYgAyAGQbAQbGpBBGohAyADKAIAIQMgA0EASgRAQQAhAwNAIAEgA0ECdGohASABKAIAIQEgACABEBIgA0EBaiEDIAgoAgAhASAKLQAAIQYgBkH/AXEhBiABIAZBsBBsakEEaiEBIAEoAgAhBiAJKAIAIQEgAyAGSA0ACwsgACABEBILIAUgAkEYbGpBFGohASABKAIAIQEgACABEBIgAkEBaiECIAQoAgAhASACIAFODQMgBygCACEFDAAACwALCwsgAEHwAGohAyADKAIAIQEgAQRAIABB7ABqIQUgBSgCACECIAJBAEoEQEEAIQIDQAJAIAEgAkGwEGxqQQhqIQQgBCgCACEEIAAgBBASIAEgAkGwEGxqQRxqIQQgBCgCACEEIAAgBBASIAEgAkGwEGxqQSBqIQQgBCgCACEEIAAgBBASIAEgAkGwEGxqQaQQaiEEIAQoAgAhBCAAIAQQEiABIAJBsBBsakGoEGohASABKAIAIQEgAUUhBCABQXxqIQFBACABIAQbIQEgACABEBIgAkEBaiECIAUoAgAhASACIAFODQAgAygCACEBDAELCyADKAIAIQELIAAgARASCyAAQfgBaiEBIAEoAgAhASAAIAEQEiAHKAIAIQEgACABEBIgAEGIA2ohAyADKAIAIQEgAQRAIABBhANqIQUgBSgCACECIAJBAEoEQEEAIQIDQCABIAJBKGxqQQRqIQEgASgCACEBIAAgARASIAJBAWohAiAFKAIAIQcgAygCACEBIAIgB0gNAAsLIAAgARASCyAAQQRqIQIgAigCACEBIAFBAEoEQEEAIQEDQCAAQZQGaiABQQJ0aiEDIAMoAgAhAyAAIAMQEiAAQZQHaiABQQJ0aiEDIAMoAgAhAyAAIAMQEiAAQdgHaiABQQJ0aiEDIAMoAgAhAyAAIAMQEiABQQFqIQEgAigCACEDIAEgA0ghAyABQRBJIQUgBSADcQ0ACwtBACEBA0AgAEGgCGogAUECdGohAiACKAIAIQIgACACEBIgAEGoCGogAUECdGohAiACKAIAIQIgACACEBIgAEGwCGogAUECdGohAiACKAIAIQIgACACEBIgAEG4CGogAUECdGohAiACKAIAIQIgACACEBIgAEHACGogAUECdGohAiACKAIAIQIgACACEBIgAUEBaiEBIAFBAkcNAAsLGwAgAEHEAGohACAAKAIAIQAgAEUEQCABEF8LC3wBAX8gAEHUB2ohASABQQA2AgAgAEGAC2ohASABQQA2AgAgAEH4CmohASABQQA2AgAgAEGcCGohASABQQA2AgAgAEHVCmohASABQQA6AAAgAEH8CmohASABQQA2AgAgAEHUC2ohASABQQA2AgAgAEHYC2ohACAAQQA2AgAL8AQBB38jBiELIwZBEGokBiALQQhqIQcgC0EEaiEKIAshCCAAQSRqIQYgBiwAACEGAn8gBgR/IABBgAtqIQYgBigCACEGIAZBf0oEQCAFQQA2AgAgACABIAIQFgwCCyAAQRRqIQYgBiABNgIAIAEgAmohAiAAQRxqIQkgCSACNgIAIABB2ABqIQIgAkEANgIAIABBABAXIQkgCUUEQCAFQQA2AgBBAAwCCyAAIAcgCCAKEBghCSAJBEAgBygCACECIAgoAgAhCSAKKAIAIQggACACIAkgCBAaIQogByAKNgIAIABBBGohAiACKAIAIQggCEEASgRAQQAhAgNAIABBlAZqIAJBAnRqIQcgBygCACEHIAcgCUECdGohByAAQdQGaiACQQJ0aiEMIAwgBzYCACACQQFqIQIgAiAISA0ACwsgAwRAIAMgCDYCAAsgBSAKNgIAIABB1AZqIQAgBCAANgIAIAYoAgAhACAAIAFrDAILAkACQAJAAkACQCACKAIAIgNBIGsOBAECAgACCyACQQA2AgAgAEHUAGohAiAAEBkhAwJAIANBf0cEQANAIAIoAgAhAyADDQIgABAZIQMgA0F/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ACECIABBmAhqIQYgBigCACEHIAUgA2shCSAJIAdqIQkgAiAJSSEJIAIgB0khDSACIAdrIQJBACACIA0bIQIgAiADaiECIAIgBUohByAFIAIgBxshAiAJBEAgASACNgIAIAYoAgAhACAAIAJqIQAgBiAANgIAQQEMBgsLCyAAQfQKaiECIAIoAgAhAiADIB9rIQYgBiACaiEGIABBmAhqIQIgAiAGNgIAIAhBATYCAAwBBSAAQZgIaiECIAYNAQsMAQsgBCADayEDIAIoAgAhBCADIARqIQMgAiADNgIACyATKAIAIQIgAgRAIABByABqIQIgAigCACECIABB0ABqIQAgACgCACEAIAIgAEcEQEHTE0HEE0HkGkHnFBAECwsgASAFNgIAQQELIQAgHCQGIAALqAIBBX8gAEHoCmohBSAFKAIAIQICQCACQQBIBEBBACEABSACIAFIBEAgAUEYSgRAIABBGBAsIQIgAUFoaiEBIAAgARAsIQAgAEEYdCEAIAAgAmohACAADwsgAkUEQCAAQeQKaiECIAJBADYCAAsgAEHkCmohAwJAAkACQANAIAAQLiECIAJBf0YNASAFKAIAIQQgAiAEdCECIAMoAgAhBiAGIAJqIQIgAyACNgIAIAUgBEEIaiICNgIAIAIgAUgNAAwCAAsACyAFQX82AgBBACEADAQLIARBeEgEQEEAIQAMBAsLCyAAQeQKaiEEIAQoAgAhA0EBIAF0IQAgAEF/aiEAIAMgAHEhACADIAF2IQMgBCADNgIAIAIgAWshASAFIAE2AgALCyAAC40CAAJAIABBAEgEf0EABSAAQYCAAUgEQCAAQRBIBEAgAEGACGohACAALAAAIQAMAwsgAEGABEgEQCAAQQV2IQAgAEGACGohACAALAAAIQAgAEEFaiEABSAAQQp2IQAgAEGACGohACAALAAAIQAgAEEKaiEACwwCCyAAQYCAgAhIBH8gAEGAgCBIBH8gAEEPdiEAIABBgAhqIQAgACwAACEAIABBD2oFIABBFHYhACAAQYAIaiEAIAAsAAAhACAAQRRqCwUgAEGAgICAAkgEfyAAQRl2IQAgAEGACGohACAALAAAIQAgAEEZagUgAEEediEAIABBgAhqIQAgACwAACEAIABBHmoLCwshAAsgAAuiAQEDfyAAQdQKaiECIAIsAAAhAQJAAkAgAQ0AIABB3ApqIQEgASgCACEBIAEEQEF/IQMFIAAQLyEBIAEEQCACLAAAIQEgAQ0CQaEUQcQTQfYLQbUUEAQFQX8hAwsLDAELIAFBf2pBGHRBGHUhASACIAE6AAAgAEHsCmohASABKAIAIQIgAkEBaiECIAEgAjYCACAAEDAhACAAQf8BcSEDCyADC6wCAQd/IABB3ApqIQIgAigCACEBAkAgAUUEQCAAQdgKaiEEIAQoAgAhASABQX9GBEAgAEHQCGohASABKAIAIQEgAUF/aiEBIABB4ApqIQMgAyABNgIAIAAQMSEBIAFFBEAgAkEBNgIADAMLIABB0wpqIQEgASwAACEBIAFBAXEhASABBH8gBCgCAAUgAEEgEBUMAwshAQsgAUEBaiEHIAQgBzYCACAAQdQIaiABaiEDIAMsAAAhBiAGQf8BcSEDIAZBf0cEQCACQQE2AgAgAEHgCmohAiACIAE2AgALIABB0AhqIQEgASgCACEBIAcgAU4EQCAEQX82AgALIABB1ApqIQAgACwAACEBIAEEQEHFFEHEE0HoC0HaFBAEBSAAIAY6AAAgAyEFCwsLIAULUQEDfyAAQRRqIQMgAygCACEBIABBHGohAiACKAIAIQIgASACSQR/IAFBAWohACADIAA2AgAgASwAAAUgAEHUAGohACAAQQE2AgBBAAshACAACyABAX8gABAyIQEgAQR/IAAQMwUgAEEeEBVBAAshACAAC2ABAX8gABAwIQEgAUH/AXFBzwBGBEAgABAwIQEgAUH/AXFB5wBGBEAgABAwIQEgAUH/AXFB5wBGBEAgABAwIQAgAEH/AXFB0wBGIQAFQQAhAAsFQQAhAAsFQQAhAAsgAAvZAwEGfyAAEDAhAQJ/IAFB/wFxBH8gAEEfEBVBAAUgABAwIQEgAEHTCmohAiACIAE6AAAgABAjIQUgABAjIQIgABAjGiAAECMhASAAQcwIaiEDIAMgATYCACAAECMaIAAQMCEBIAFB/wFxIQEgAEHQCGohAyADIAE2AgAgAEHUCGohBCAAIAQgARAiIQEgAUUEQCAAQQoQFUEADAILIABB8ApqIQQgBEF+NgIAIAIgBXEhAQJAIAFBf0cEQCADKAIAIQEgAUEASgRAA0ACQCABQX9qIQIgAEHUCGogAmohBiAGLAAAIQYgBkF/Rw0AIAFBAUwNBCACIQEMAQsLIAQgAjYCACAAQfQKaiEBIAEgBTYCAAsLCyAAQdUKaiEBIAEsAAAhASABBEAgAygCACEDIANBAEoEf0EAIQJBACEBA0AgAEHUCGogAWohBCAELQAAIQQgBEH/AXEhBCACIARqIQIgAUEBaiEBIAEgA0gNAAsgAkEbagVBGwshASAAQShqIQIgAigCACECIAEgA2ohASABIAJqIQEgAEEsaiEDIAMgAjYCACAAQTBqIQIgAiABNgIAIABBNGohASABIAU2AgALIABB2ApqIQAgAEEANgIAQQELCyEAIAALowEBB38gAEHoCmohAyADKAIAIQECQCABQRlIBEAgAEHkCmohBCABRQRAIARBADYCAAsgAEHUCmohBSAAQdwKaiEGA0AgBigCACEBIAEEQCAFLAAAIQEgAUUNAwsgABAuIQIgAkF/Rg0CIAMoAgAhASACIAF0IQIgBCgCACEHIAcgAmohAiAEIAI2AgAgAUEIaiECIAMgAjYCACABQRFIDQALCwsLrQUBCX8gABA0IAFBIGohAiACKAIAIQUCQAJAIAVFIgNFDQAgAUGkEGohAiACKAIAIQIgAg0AQX8hAQwBCyABQQRqIQIgAigCACECAkACQCACQQhKBEAgAUGkEGohAyADKAIAIQMgAw0BBSADDQELDAELIABB5ApqIQggCCgCACEJIAkQOiEHIAFBrBBqIQIgAigCACECIAJBAUoEQCABQaQQaigCACEKQQAhAwNAIAJBAXYhBSAFIANqIQQgCiAEQQJ0aiEGIAYoAgAhBiAGIAdLIQYgAiAFayECIAMgBCAGGyEDIAUgAiAGGyECIAJBAUoNAAsFQQAhAwsgAUEXaiECIAIsAAAhAiACRQRAIAFBqBBqIQIgAigCACECIAIgA0ECdGohAiACKAIAIQMLIAFBCGohASABKAIAIQEgASADaiEBIAEtAAAhASABQf8BcSEBIABB6ApqIQIgAigCACEAIAAgAUgEf0EAIQBBfwUgACABayEAIAkgAXYhASAIIAE2AgAgAwshASACIAA2AgAMAQsgAUEXaiEDIAMsAAAhAyADBEBBgRVBxBNB6gxBjBUQBAsCQCACQQBKBEAgASgCCCEIIABB5ApqIQlBACEBA0ACQCAIIAFqIQMgAywAACEEIARB/wFxIQMgBEF/RwRAIAUgAUECdGoh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IwZBEGokBiACIQECfCAAvUIgiKdB/////wdxIgNB/MOk/wNJBHwgA0GewZryA0kEfEQAAAAAAADwPwUgAEQAAAAAAAAAABByCwUgACAAoSADQf//v/8HSw0BGgJAAkACQAJAIAAgARBuQQNxDgMAAQIDCyABKwMAIAErAwgQcgwECyABKwMAIAErAwhBARBwmgwDCyABKwMAIAErAwgQcpoMAgsgASsDACABKwMIQQEQcAsLIQAgAiQGIAALywEBA38jBiECIwZBEGokBiACIQECQCAAvUIgiKdB/////wdxIgNB/MOk/wNJBEAgA0GAgMDyA08EQCAARAAAAAAAAAAAQQAQcCEACwUgA0H//7//B0sEQCAAIAChIQAMAgsCQAJAAkACQAJAIAAgARBuQQNxDgMAAQIDCyABKwMAIAErAwhBARBwIQAMBQsgASsDACABKwMIEHIhAAwECyABKwMAIAErAwhBARBwmiEADAMLIAErAwAgASsDCBBymiEACwsLIAIkBiAAC5sDAwJ/AX4CfCAAvSIDQj+IpyEBAnwCfwJAIANCIIinQf////8HcSICQarGmIQESwR8IANC////////////AINCgICAgICAgPj/AFYEQCAADwsgAETvOfr+Qi6GQGQEQCAARAAAAAAAAOB/og8FIABE0rx63SsjhsBjIABEUTAt1RBJh8BjcUUNAkQAAAAAAAAAACIADwsABSACQcLc2P4DSwRAIAJBscXC/wNLDQIgAUEBcyABawwDCyACQYCAwPEDSwR8QQAhASAABSAARAAAAAAAAPA/oA8LCwwCCyAARP6CK2VHFfc/oiABQQN0QYATaisDAKCqCyEBIAAgAbciBEQAAOD+Qi7mP6KhIgAgBER2PHk17znqPaIiBaELIQQgACAEIAQgBCAEoiIAIAAgACAAIABE0KS+cmk3Zj6iRPFr0sVBvbu+oKJELN4lr2pWET+gokSTvb4WbMFmv6CiRD5VVVVVVcU/oKKhIgCiRAAAAAAAAABAIAChoyAFoaBEAAAAAAAA8D+gIQAgAUUEQCAADwsgACABEGULnwMDAn8BfgV8IAC9IgNCIIinIQECfyADQgBTIgIgAUGAgMAASXIEfyADQv///////////wCDQgBRBEBEAAAAAAAA8L8gACAAoqMPCyACRQRAIABEAAAAAAAAUEOivSIDQiCIpyEBIANC/////w+DIQNBy3cMAgsgACAAoUQAAAAAAAAAAKMPBSABQf//v/8HSwRAIAAPCyADQv////8PgyIDQgBRIAFBgIDA/wNGcQR/RAAAAAAAAAAADwVBgXgLCwshAiABQeK+JWoiAUH//z9xQZ7Bmv8Daq1CIIYgA4S/RAAAAAAAAPC/oCIFIAVEAAAAAAAA4D+ioiEGIAUgBUQAAAAAAAAAQKCjIgcgB6IiCCAIoiEEIAIgAUEUdmq3IgBEAADg/kIu5j+iIAUgAER2PHk17znqPaIgByAGIAQgBCAERJ/GeNAJmsM/okSveI4dxXHMP6CiRAT6l5mZmdk/oKIgCCAEIAQgBEREUj7fEvHCP6JE3gPLlmRGxz+gokRZkyKUJEnSP6CiRJNVVVVVVeU/oKKgoKKgIAahoKAL8Q8DC38Cfgh8AkACQAJAIAG9Ig1CIIinIgVB/////wdxIgMgDaciBnJFBEBEAAAAAAAA8D8PCyAAvSIOQiCIpyEHIA6nIghFIgogB0GAgMD/A0ZxBEBEAAAAAAAA8D8PCyAHQf////8HcSIEQYCAwP8HTQRAIAhBAEcgBEGAgMD/B0ZxIANBgIDA/wdLckUEQCAGQQBHIANBgIDA/wdGIgtxRQRAAkACQAJAIAdBAEgiCUUNACADQf///5kESwR/QQIhAgwBBSADQf//v/8DSwR/IANBFHYhAiADQf///4kESwRAQQIgBkGzCCACayICdiIMQQFxa0EAIAwgAnQgBkYbIQIMAwsgBgR/QQAFQQIgA0GTCCACayICdiIGQQFxa0EAIAYgAnQgA0YbIQIMBAsFDAILCyECDAILIAZFDQAMAQsgCwRAIARBgIDAgHxqIAhyRQRARAAAAAAAAPA/DwsgBUF/SiECIARB//+//wNLBEAgAUQAAAAAAAAAACACGw8FRAAAAAAAAAAAIAGaIAIbDwsACyADQYCAwP8DRgRAIABEAAAAAAAA8D8gAKMgBUF/ShsPCyAFQYCAgIAERgRAIAAgAKIPCyAHQX9KIAVBgICA/wNGcQRAIACfDwsLIACZIQ8gCgRAIARFIARBgICAgARyQYCAwP8HRnIEQEQAAAAAAADwPyAPoyAPIAVBAEgbIQAgCUUEQCAADwsgAiAEQYCAwIB8anIEQCAAmiAAIAJBAUYbDwsMBQsLAnwgCQR8AkACQAJAIAIOAgABAgsMBwtEAAAAAAAA8L8MAgtEAAAAAAAA8D8MAQVEAAAAAAAA8D8LCyERAnwgA0GAgICPBEsEfCADQYCAwJ8ESwRAIARBgIDA/wNJBEAjCkQAAAAAAAAAACAFQQBIGw8FIwpEAAAAAAAAAAAgBUEAShsPCwALIARB//+//wNJBEAgEUScdQCIPOQ3fqJEnHUAiDzkN36iIBFEWfP4wh9upQGiRFnz+MIfbqUBoiAFQQBIGw8LIARBgIDA/wNNBEAgD0QAAAAAAADwv6AiAEQAAABgRxX3P6IiECAARETfXfgLrlQ+oiAAIACiRAAAAAAAAOA/IABEVVVVVVVV1T8gAEQAAAAAAADQP6KhoqGiRP6CK2VHFfc/oqEiAKC9QoCAgIBwg78iEiEPIBIgEKEMAgsgEUScdQCIPOQ3fqJEnHUAiDzkN36iIBFEWfP4wh9upQGiRFnz+MIfbqUBoiAFQQBKGw8FIA9EAAAAAAAAQEOiIgC9QiCIpyAEIARBgIDAAEkiBRshAkHMd0GBeCAFGyACQRR1aiEDIAJB//8/cSIEQYCAwP8DciECIARBj7EOSQRAQQAhBAUgBEH67C5JIgYhBCADIAZBAXNBAXFqIQMgAiACQYCAQGogBhshAgsgBEEDdEGwE2orAwAiFCACrUIghiAAIA8gBRu9Qv////8Pg4S/IhAgBEEDdEGQE2orAwAiEqEiE0QAAAAAAADwPyASIBCgoyIVoiIPvUKAgICAcIO/IgAgACAAoiIWRAAAAAAAAAhAoCAPIACgIBUgEyACQQF1QYCAgIACckGAgCBqIARBEnRqrUIghr8iEyAAoqEgECATIBKhoSAAoqGiIhCiIA8gD6IiACAAoiAAIAAgACAAIABE705FSih+yj+iRGXbyZNKhs0/oKJEAUEdqWB00T+gokRNJo9RVVXVP6CiRP+rb9u2bds/oKJEAzMzMzMz4z+goqAiEqC9QoCAgIBwg78iAKIiEyAQIACiIA8gEiAARAAAAAAAAAjAoCAWoaGioCIPoL1CgICAgHCDvyIARAAAAOAJx+4/oiIQIARBA3RBoBNqKwMAIA8gACAToaFE/QM63AnH7j+iIABE9QFbFOAvPj6ioaAiAKCgIAO3IhKgvUKAgICAcIO/IhMhDyATIBKhIBShIBChCwshECAAIBChIAGiIAEgDUKAgICAcIO/IgChIA+ioCEBIA8gAKIiACABoCIPvSINQiCIpyECIA2nIQMgAkH//7+EBEoEQCACQYCAwPt7aiADciABRP6CK2VHFZc8oCAPIAChZHINBgUgAkGA+P//B3FB/5fDhARLBEAgAkGA6Lz7A2ogA3IgASAPIAChZXINBgsLIBEgAkH/////B3EiA0GAgID/A0sEfyAAQYCAQEGAgMAAIANBFHZBgnhqdiACaiIDQRR2Qf8PcSIEQYF4anUgA3GtQiCGv6EiDyEAIAEgD6C9IQ1BACADQf//P3FBgIDAAHJBkwggBGt2IgNrIAMgAkEASBsFQQALIgJBFHREAAAAAAAA8D8gDUKAgICAcIO/Ig9EAAAAAEMu5j+iIhAgASAPIAChoUTvOfr+Qi7mP6IgD0Q5bKgMYVwgPqKhIg+gIgAgACAAIACiIgEgASABIAEgAUTQpL5yaTdmPqJE8WvSxUG9u76gokQs3iWvalYRP6CiRJO9vhZswWa/oKJEPlVVVVVVxT+goqEiAaIgAUQAAAAAAAAAwKCjIA8gACAQoaEiASAAIAGioKEgAKGhIgC9Ig1CIIinaiIDQYCAwABIBHwgACACEGUFIAOtQiCGIA1C/////w+DhL8LIgCiDwsLCyAAIAGgDwsgACAAoSIAIACjDwsgEURZ8/jCH26lAaJEWfP4wh9upQGiDwsgEUScdQCIPOQ3fqJEnHUAiDzkN36iCwMAAQvDAwEDfyACQYDAAE4EQCAAIAEgAhAHDwsgACEEIAAgAmohAyAAQQNxIAFBA3FGBEADQCAAQQNxBEAgAkUEQCAEDwsgACABLAAAOgAAIABBAWohACABQQFqIQEgAkEBayECDAELCyADQXxxIgJBQGohBQNAIAAgBUwEQCAAIAEoAgA2AgAgACABKAIENgIEIAAgASgCCDYCCCAAIAEoAgw2AgwgACABKAIQNgIQIAAgASgCFDYCFCAAIAEoAhg2AhggACABKAIcNgIcIAAgASgCIDYCICAAIAEoAiQ2AiQgACABKAIoNgIoIAAgASgCLDYCLCAAIAEoAjA2AjAgACABKAI0NgI0IAAgASgCODYCOCAAIAEoAjw2AjwgAEFAayEAIAFBQGshAQwBCwsDQCAAIAJIBEAgACABKAIANgIAIABBBGohACABQQRqIQEMAQsLBSADQQRrIQIDQCAAIAJIBEAgACABLAAAOgAAIAAgASwAAToAASAAIAEsAAI6AAIgACABLAADOgADIABBBGohACABQQRqIQEMAQsLCwNAIAAgA0gEQCAAIAEsAAA6AAAgAEEBaiEAIAFBAWohAQwBCwsgBAuYAgEEfyAAIAJqIQQgAUH/AXEhASACQcMATgRAA0AgAEEDcQRAIAAgAToAACAAQQFqIQAMAQsLIARBfHEiBUFAaiEGIAEgAUEIdHIgAUEQdHIgAUEYdHIhAwNAIAAgBkwEQCAAIAM2AgAgACADNgIEIAAgAzYCCCAAIAM2AgwgACADNgIQIAAgAzYCFCAAIAM2AhggACADNgIcIAAgAzYCICAAIAM2AiQgACADNgIoIAAgAzYCLCAAIAM2AjAgACADNgI0IAAgAzYCOCAAIAM2AjwgAEFAayEADAELCwNAIAAgBUgEQCAAIAM2AgAgAEEEaiEADAELCwsDQCAAIARIBEAgACABOgAAIABBAWohAAwBCwsgBCACawtVAQJ/IABBAEojBSgCACIBIABqIgAgAUhxIABBAEhyBEAQAxpBDBAFQX8PCyMFIAA2AgAQAiECIAAgAkoEQBABRQRAIwUgATYCAEEMEAVBfw8LCyABCw4AIAEgAiAAQQNxEQAACwgAQQAQAEEACwvAEQQAQYEIC7YKAQICAwMDAwQEBAQEBAQEAAEAAIAAAABWAAAAQAAAAD605DMJkfMzi7IBNDwgCjQjGhM0YKkcNKfXJjRLrzE0UDs9NHCHSTQjoFY0uJJkNFVtczSIn4E0/AuKNJMEkzRpkpw0Mr+mND+VsTSTH7005GnJNK2A1jQ2ceQ0pknzNIiMATXA9wk1Bu8SNXZ7HDXApiY1N3sxNdoDPTVeTEk1O2FWNblPZDX8JXM1inmBNYbjiTV82ZI1hWScNVKOpjUzYbE1Jei8NdwuyTXOQdY1QS7kNVcC8zWPZgE2T88JNvXDEjaYTRw26HUmNjJHMTZ0zDw2XhFJNmUiVjbODGQ2uN5yNpdTgTYcu4k2cq6SNq82nDaBXaY2NS2xNsewvDbk88g2AQPWNmDr4zYeu/I2okABN+umCTfxmBI3yR8cNx5FJjc9EzE3HpU8N2/WSDei41U398ljN4mXcjevLYE3vpKJN3SDkjfmCJw3viymN0f5sDd5ebw3/rjIN0fE1TeSqOM3+HPyN8AaATiTfgk4+W0SOAbyGzhiFCY4Vt8wONhdPDiSm0g48qRVODOHYzhuUHI40weBOGtqiTiCWJI4KtubOAn8pThoxbA4O0K8OCl+yDighdU42WXjOOgs8jjp9AA5RlYJOQ5DEjlRxBs5teMlOX+rMDmiJjw5xWBIOVNmVTmDRGM5aAlyOQHigDkkQok5nS2SOXutmzljy6U5mZGwOQ0LvDlmQ8g5C0fVOTIj4znt5fE5Hc8AOgUuCTowGBI6qZYbOhWzJTq3dzA6fO87OgomSDrHJ1U65gFjOnjCcTo7vIA66RmJOsYCkjrbf5s6y5qlOthdsDrv07s6swjIOogI1Tqf4OI6B5/xOlypADvQBQk7Xu0ROw9pGzuEgiU7/UMwO2e4Ozth60c7TelUO12/Yjuce3E7f5aAO7rxiDv515E7R1KbO0FqpTsnKrA74py7OxLOxzsXytQ7IJ7iOzVY8TumgwA8p90IPJjCETyCOxs8AVIlPFQQMDxhgTs8yLBHPOWqVDzofGI81DRxPM9wgDyWyYg8Oq2RPMAkmzzFOaU8hfavPOVluzyCk8c8uYvUPLRb4jx5EfE8+10APYm1CD3flxE9Ag4bPY0hJT253C89bUo7PUB2Rz2RbFQ9hTpiPSLucD0qS4A9f6GIPYiCkT1I95o9WAmlPfLCrz34Lrs9A1nHPW1N1D1cGeI90crwPVs4AD53jQg+M20RPpDgGj4n8SQ+LqkvPocTOz7KO0c+TS5UPjf4YT6Ep3A+jyWAPnN5iD7iV5E+3MmaPvnYpD5tj68+G/i6PpUexz4zD9Q+F9fhPj2E8D7GEgA/cmUIP5NCET8rsxo/zsAkP7F1Lz+y3Do/ZQFHPx3wUz/7tWE/+2BwPwAAgD8DAAAABAAAAAQAAAAGAAAAg/miAERObgD8KRUA0VcnAN009QBi28AAPJmVAEGQQwBjUf4Au96rALdhxQA6biQA0k1CAEkG4AAJ6i4AHJLRAOsd/gApsRwA6D6nAPU1ggBEuy4AnOmEALQmcABBfl8A1pE5AFODOQCc9DkAi1+EACj5vQD4HzsA3v+XAA+YBQARL+8AClqLAG0fbQDPfjYACcsnAEZPtwCeZj8ALepfALondQDl68cAPXvxAPc5BwCSUooA+2vqAB+xXwAIXY0AMANWAHv8RgDwq2sAILzPADb0mgDjqR0AXmGRAAgb5gCFmWUAoBRfAI1AaACA2P8AJ3NNAAYGMQDKVhUAyahzAHviYABrjMAAQcMSC11A+yH5PwAAAAAtRHQ+AAAAgJhG+DwAAABgUcx4OwAAAICDG/A5AAAAQCAlejgAAACAIoLjNgAAAAAd82k1AAAAAAAA4D8AAAAAAADgvwAAAAAAAPA/AAAAAAAA+D8AQagTCwgG0M9D6/1MPgBBuxMLigZAA7jiP09nZ1MuL3N0Yl92b3JiaXMuYwBmLT5hbGxvYy5hbGxvY19idWZmZXJfbGVuZ3RoX2luX2J5dGVzID09IGYtPnRlbXBfb2Zmc2V0AHZvcmJpc19kZWNvZGVfaW5pdGlhbABmLT5ieXRlc19pbl9zZWcgPiAwAGdldDhfcGFja2V0X3JhdwBmLT5ieXRlc19pbl9zZWcgPT0gMABuZXh0X3NlZ21lbnQAdm9yYmlzX2RlY29kZV9wYWNrZXRfcmVzdAAhYy0+c3BhcnNlAGNvZGVib29rX2RlY29kZV9zY2FsYXJfcmF3ACFjLT5zcGFyc2UgfHwgeiA8IGMtPnNvcnRlZF9lbnRyaWVzAGNvZGVib29rX2RlY29kZV9kZWludGVybGVhdmVfcmVwZWF0AHogPCBjLT5zb3J0ZWRfZW50cmllcwBjb2RlYm9va19kZWNvZGVfc3RhcnQAKG4gJiAzKSA9PSAwAGltZGN0X3N0ZXAzX2l0ZXIwX2xvb3AAMABnZXRfd2luZG93AGYtPnRlbXBfb2Zmc2V0ID09IGYtPmFsbG9jLmFsbG9jX2J1ZmZlcl9sZW5ndGhfaW5fYnl0ZXMAc3RhcnRfZGVjb2RlcgB2b3JiaXNjLT5zb3J0ZWRfZW50cmllcyA9PSAwAGNvbXB1dGVfY29kZXdvcmRzAHogPj0gMCAmJiB6IDwgMzIAbGVuW2ldID49IDAgJiYgbGVuW2ldIDwgMzIAYXZhaWxhYmxlW3ldID09IDAAayA9PSBjLT5zb3J0ZWRfZW50cmllcwBjb21wdXRlX3NvcnRlZF9odWZmbWFuAGMtPnNvcnRlZF9jb2Rld29yZHNbeF0gPT0gY29kZQBsZW4gIT0gTk9fQ09ERQBpbmNsdWRlX2luX3NvcnQAcG93KChmbG9hdCkgcisxLCBkaW0pID4gZW50cmllcwBsb29rdXAxX3ZhbHVlcwAoaW50KSBmbG9vcihwb3coKGZsb2F0KSByLCBkaW0pKSA8PSBlbnRyaWVzAOoPBG5hbWUB4g9+AAVhYm9ydAENZW5sYXJnZU1lbW9yeQIOZ2V0VG90YWxNZW1vcnkDF2Fib3J0T25DYW5ub3RHcm93TWVtb3J5BA5fX19hc3NlcnRfZmFpbAULX19fc2V0RXJyTm8GBl9hYm9ydAcWX2Vtc2NyaXB0ZW5fbWVtY3B5X2JpZwgQX19ncm93V2FzbU1lbW9yeQkKc3RhY2tBbGxvYwoJc3RhY2tTYXZlCwxzdGFja1Jlc3RvcmUME2VzdGFibGlzaFN0YWNrU3BhY2UNCHNldFRocmV3DgtzZXRUZW1wUmV0MA8LZ2V0VGVtcFJldDAQEV9zdGJfdm9yYmlzX2Nsb3NlEQ5fdm9yYmlzX2RlaW5pdBILX3NldHVwX2ZyZWUTGl9zdGJfdm9yYmlzX2ZsdXNoX3B1c2hkYXRhFCFfc3RiX3ZvcmJpc19kZWNvZGVfZnJhbWVfcHVzaGRhdGEVBl9lcnJvchYgX3ZvcmJpc19zZWFyY2hfZm9yX3BhZ2VfcHVzaGRhdGEXGF9pc193aG9sZV9wYWNrZXRfcHJlc2VudBgVX3ZvcmJpc19kZWNvZGVfcGFja2V0GQxfZ2V0OF9wYWNrZXQaFF92b3JiaXNfZmluaXNoX2ZyYW1lGxlfc3RiX3ZvcmJpc19vcGVuX3B1c2hkYXRhHAxfdm9yYmlzX2luaXQdDl9zdGFydF9kZWNvZGVyHg1fdm9yYmlzX2FsbG9jHxtfc3RiX3ZvcmJpc19nZXRfZmlsZV9vZmZzZXQgE19tYXliZV9zdGFydF9wYWNrZXQhDV9mbHVzaF9wYWNrZXQiBV9nZXRuIwZfZ2V0MzIkE19zdGJfdm9yYmlzX2pzX29wZW4lFF9zdGJfdm9yYmlzX2pzX2Nsb3NlJhdfc3RiX3ZvcmJpc19qc19jaGFubmVscycaX3N0Yl92b3JiaXNfanNfc2FtcGxlX3JhdGUoFV9zdGJfdm9yYmlzX2pzX2RlY29kZSkNX2NyYzMyX3VwZGF0ZSoWX3ZvcmJpc19kZWNvZGVfaW5pdGlhbCsaX3ZvcmJpc19kZWNvZGVfcGFja2V0X3Jlc3QsCV9nZXRfYml0cy0FX2lsb2cuEF9nZXQ4X3BhY2tldF9yYXcvDV9uZXh0X3NlZ21lbnQwBV9nZXQ4MQtfc3RhcnRfcGFnZTIQX2NhcHR1cmVfcGF0dGVybjMdX3N0YXJ0X3BhZ2Vfbm9fY2FwdHVyZXBhdHRlcm40DV9wcmVwX2h1ZmZtYW41G19jb2RlYm9va19kZWNvZGVfc2NhbGFyX3JhdzYOX3ByZWRpY3RfcG9pbnQ3D19kZWNvZGVfcmVzaWR1ZTgJX2RvX2Zsb29yOQ1faW52ZXJzZV9tZGN0OgxfYml0X3JldmVyc2U7EV9tYWtlX2Jsb2NrX2FycmF5PBJfc2V0dXBfdGVtcF9tYWxsb2M9JF9jb2RlYm9va19kZWNvZGVfZGVpbnRlcmxlYXZlX3JlcGVhdD4PX3Jlc2lkdWVfZGVjb2RlPxVfY29kZWJvb2tfZGVjb2RlX3N0ZXBAEF9jb2RlYm9va19kZWNvZGVBFl9jb2RlYm9va19kZWNvZGVfc3RhcnRCCl9kcmF3X2xpbmVDF19pbWRjdF9zdGVwM19pdGVyMF9sb29wRBlfaW1kY3Rfc3RlcDNfaW5uZXJfcl9sb29wRRlfaW1kY3Rfc3RlcDNfaW5uZXJfc19sb29wRh9faW1kY3Rfc3RlcDNfaW5uZXJfc19sb29wX2xkNjU0RwhfaXRlcl81NEgLX2dldF93aW5kb3dJEF92b3JiaXNfdmFsaWRhdGVKDV9zdGFydF9wYWNrZXRLBV9za2lwTAtfY3JjMzJfaW5pdE0NX3NldHVwX21hbGxvY04QX3NldHVwX3RlbXBfZnJlZU8SX2NvbXB1dGVfY29kZXdvcmRzUBdfY29tcHV0ZV9zb3J0ZWRfaHVmZm1hblEcX2NvbXB1dGVfYWNjZWxlcmF0ZWRfaHVmZm1hblIPX2Zsb2F0MzJfdW5wYWNrUw9fbG9va3VwMV92YWx1ZXNUDl9wb2ludF9jb21wYXJlVQpfbmVpZ2hib3JzVg9faW5pdF9ibG9ja3NpemVXCl9hZGRfZW50cnlYEF9pbmNsdWRlX2luX3NvcnRZD191aW50MzJfY29tcGFyZVoYX2NvbXB1dGVfdHdpZGRsZV9mYWN0b3JzWw9fY29tcHV0ZV93aW5kb3dcE19jb21wdXRlX2JpdHJldmVyc2VdB19zcXVhcmVeB19tYWxsb2NfBV9mcmVlYAhfcmVhbGxvY2ESX3RyeV9yZWFsbG9jX2NodW5rYg5fZGlzcG9zZV9jaHVua2MRX19fZXJybm9fbG9jYXRpb25kB19tZW1jbXBlB19zY2FsYm5mBl9xc29ydGcFX3NpZnRoBF9zaHJpCF90cmlua2xlagRfc2hsawVfcG50emwIX2FfY3R6X2xtBl9jeWNsZW4LX19fcmVtX3BpbzJvEV9fX3JlbV9waW8yX2xhcmdlcAZfX19zaW5xBl9sZGV4cHIGX19fY29zcwRfY29zdARfc2ludQRfZXhwdgRfbG9ndwRfcG93eAtydW5Qb3N0U2V0c3kHX21lbWNweXoHX21lbXNldHsFX3Nicmt8C2R5bkNhbGxfaWlpfQJiMA=="), function(A) {
        return A.charCodeAt(0);
      });
      var $ = void 0 !== $ ? $ : {}, e = {};
      for (A in $) $.hasOwnProperty(A) && (e[A] = $[A]);
      $.arguments = [], $.thisProgram = "./this.program", $.quit = function(A, I) {
        throw I;
      }, $.preRun = [], $.postRun = [];
      var t = !1, k = !1, N = !1, r = !1;
      t = "object" == typeof window, k = "function" == typeof importScripts, N = "object" == typeof process && "function" == typeof aaa && !t && !k, r = !t && !N && !k;
      var Y = "";
      function J(A) {
        return $.locateFile ? $.locateFile(A, Y) : Y + A;
      }
      N ? (Y = "/", $.read = function A(B, E) {
        var Q;
        return I || (I = void 0), g || (g = void 0), B = g.normalize(B), Q = I.readFileSync(B), E ? Q : Q.toString();
      }, $.readBinary = function A(I) {
        var g = $.read(I, !0);
        return g.buffer || (g = new Uint8Array(g)), _(g.buffer), g;
      }, process.argv.length > 1 && ($.thisProgram = process.argv[1].replace(/\\/g, "/")), $.arguments = process.argv.slice(2), process.on("uncaughtException", function(A) {
        if (!(A instanceof II)) throw A;
      }), process.on("unhandledRejection", function(A, I) {
        process.exit(1);
      }), $.quit = function(A) {
        process.exit(A);
      }, $.inspect = function() {
        return "[Emscripten Module object]";
      }) : r ? ("undefined" != typeof read && ($.read = function A(I) {
        return read(I);
      }), $.readBinary = function A(I) {
        var g;
        return "function" == typeof readbuffer ? new Uint8Array(readbuffer(I)) : (_("object" == typeof (g = read(I, "binary"))), g);
      }, "undefined" != typeof scriptArgs ? $.arguments = scriptArgs : "undefined" != typeof arguments && ($.arguments = arguments), "function" == typeof quit && ($.quit = function(A) {
        quit(A);
      })) : (t || k) && (t ? document.currentScript && (Y = document.currentScript.src) : Y = self.location.href, Y = 0 !== Y.indexOf("blob:") ? Y.split("/").slice(0, -1).join("/") + "/" : "", $.read = function A(I) {
        var g = new XMLHttpRequest();
        return g.open("GET", I, !1), g.send(null), g.responseText;
      }, k && ($.readBinary = function A(I) {
        var g = new XMLHttpRequest();
        return g.open("GET", I, !1), g.responseType = "arraybuffer", g.send(null), new Uint8Array(g.response);
      }), $.readAsync = function A(I, g, B) {
        var E = new XMLHttpRequest();
        E.open("GET", I, !0), E.responseType = "arraybuffer", E.onload = function A() {
          if (200 == E.status || 0 == E.status && E.response) {
            g(E.response);
            return;
          }
          B();
        }, E.onerror = B, E.send(null);
      }, $.setWindowTitle = function(A) {
        document.title = A;
      });
      var f = $.print || ("undefined" != typeof console ? console.log.bind(console) : "undefined" != typeof print ? print : null), H = $.printErr || ("undefined" != typeof printErr ? printErr : "undefined" != typeof console && console.warn.bind(console) || f);
      for (A in e) e.hasOwnProperty(A) && ($[A] = e[A]);
      function L(A) {
        var I = S;
        return S = S + A + 15 & -16, I;
      }
      function d(A, I) {
        return I || (I = 16), A = Math.ceil(A / I) * I;
      }
      function K(A) {
        K.shown || (K.shown = {}), K.shown[A] || (K.shown[A] = 1, H(A));
      }
      e = void 0;
      var l = {
        "f64-rem": function(A, I) {
          return A % I;
        },
        debugger: function() {}
      }, p = 0;
      function _(A, I) {
        A || IE("Assertion failed: " + I);
      }
      function T(A) {
        var I = $["_" + A];
        return _(I, "Cannot call unknown function " + A + ", make sure it is exported"), I;
      }
      var v = {
        stackSave: function() {
          IA();
        },
        stackRestore: function() {
          A9();
        },
        arrayToC: function(A) {
          var I, g, B = A5(A.length);
          return I = A, g = B, E.set(I, g), B;
        },
        stringToC: function(A) {
          var I = 0;
          if (null != A && 0 !== A) {
            var g = (A.length << 2) + 1;
            I = A5(g), Ai(A, I, g);
          }
          return I;
        }
      }, O = {
        string: v.stringToC,
        array: v.arrayToC
      };
      function j(A, I, g, B, E) {
        var Q = T(A), C = [], i = 0;
        if (B) for (var h = 0; h < B.length; h++) {
          var o = O[g[h]];
          o ? (0 === i && (i = IA()), C[h] = o(B[h])) : C[h] = B[h];
        }
        var G, D = Q.apply(null, C);
        return D = (G = D, "string" === I ? Ag(G) : "boolean" === I ? Boolean(G) : G), 0 !== i && A9(i), D;
      }
      function Ag(A, I) {
        if (0 === I || !A) return "";
        for (var g, B, E, C = 0, i = 0; C |= B = Q[A + i >> 0], (0 != B || I) && (i++, !I || i != I););
        I || (I = i);
        var h = "";
        if (C < 128) {
          for (; I > 0;) E = String.fromCharCode.apply(String, Q.subarray(A, A + Math.min(I, 1024))), h = h ? h + E : E, A += 1024, I -= 1024;
          return h;
        }
        return g = A, function A(I, g) {
          for (var B = g; I[B];) ++B;
          if (B - g > 16 && I.subarray && AQ) return AQ.decode(I.subarray(g, B));
          for (var E, Q, C, i, h, G = "";;) {
            if (!(E = I[g++])) return G;
            if (!(128 & E)) {
              G += String.fromCharCode(E);
              continue;
            }
            if (Q = 63 & I[g++], (224 & E) == 192) {
              G += String.fromCharCode((31 & E) << 6 | Q);
              continue;
            }
            if (C = 63 & I[g++], (240 & E) == 224 ? E = (15 & E) << 12 | Q << 6 | C : (i = 63 & I[g++], (248 & E) == 240 ? E = (7 & E) << 18 | Q << 12 | C << 6 | i : (h = 63 & I[g++], E = (252 & E) == 248 ? (3 & E) << 24 | Q << 18 | C << 12 | i << 6 | h : (1 & E) << 30 | Q << 24 | C << 18 | i << 12 | h << 6 | 63 & I[g++])), E < 65536) G += String.fromCharCode(E);
            else {
              var D = E - 65536;
              G += String.fromCharCode(55296 | D >> 10, 56320 | 1023 & D);
            }
          }
        }(Q, g);
      }
      var AQ = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
      function AC(A, I, g, B) {
        if (!(B > 0)) return 0;
        for (var E = g, Q = g + B - 1, C = 0; C < A.length; ++C) {
          var i = A.charCodeAt(C);
          if (i >= 55296 && i <= 57343 && (i = 65536 + ((1023 & i) << 10) | 1023 & A.charCodeAt(++C)), i <= 127) {
            if (g >= Q) break;
            I[g++] = i;
          } else if (i <= 2047) {
            if (g + 1 >= Q) break;
            I[g++] = 192 | i >> 6, I[g++] = 128 | 63 & i;
          } else if (i <= 65535) {
            if (g + 2 >= Q) break;
            I[g++] = 224 | i >> 12, I[g++] = 128 | i >> 6 & 63, I[g++] = 128 | 63 & i;
          } else if (i <= 2097151) {
            if (g + 3 >= Q) break;
            I[g++] = 240 | i >> 18, I[g++] = 128 | i >> 12 & 63, I[g++] = 128 | i >> 6 & 63, I[g++] = 128 | 63 & i;
          } else if (i <= 67108863) {
            if (g + 4 >= Q) break;
            I[g++] = 248 | i >> 24, I[g++] = 128 | i >> 18 & 63, I[g++] = 128 | i >> 12 & 63, I[g++] = 128 | i >> 6 & 63, I[g++] = 128 | 63 & i;
          } else {
            if (g + 5 >= Q) break;
            I[g++] = 252 | i >> 30, I[g++] = 128 | i >> 24 & 63, I[g++] = 128 | i >> 18 & 63, I[g++] = 128 | i >> 12 & 63, I[g++] = 128 | i >> 6 & 63, I[g++] = 128 | 63 & i;
          }
        }
        return I[g] = 0, g - E;
      }
      function Ai(A, I, g) {
        return AC(A, Q, I, g);
      }
      "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
      function An(A, I) {
        return A % I > 0 && (A += I - A % I), A;
      }
      function AU(A) {
        $.buffer = B = A;
      }
      function A$() {
        $.HEAP8 = E = new Int8Array(B), $.HEAP16 = new Int16Array(B), $.HEAP32 = h = new Int32Array(B), $.HEAPU8 = Q = new Uint8Array(B), $.HEAPU16 = new Uint16Array(B), $.HEAPU32 = new Uint32Array(B), $.HEAPF32 = new Float32Array(B), $.HEAPF64 = new Float64Array(B);
      }
      function Ae() {
        var A = $.usingWasm ? 65536 : 16777216, I = 2147483648 - A;
        if (h[c >> 2] > I) return !1;
        var g = AN;
        for (AN = Math.max(AN, 16777216); AN < h[c >> 2];) AN = AN <= 536870912 ? An(2 * AN, A) : Math.min(An((3 * AN + 2147483648) / 4, A), I);
        var B = $.reallocBuffer(AN);
        return B && B.byteLength == AN ? (AU(B), A$(), !0) : (AN = g, !1);
      }
      a = S = s = w = y = c = 0, $.reallocBuffer || ($.reallocBuffer = function(A) {
        try {
          if (ArrayBuffer.transfer) I = ArrayBuffer.transfer(B, A);
          else {
            var I, g = E;
            I = new ArrayBuffer(A), new Int8Array(I).set(g);
          }
        } catch (Q) {
          return !1;
        }
        return !!Az(I) && I;
      });
      try {
        Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get)(/* @__PURE__ */ new ArrayBuffer(4));
      } catch (At) {}
      var Ak = $.TOTAL_STACK || 5242880, AN = $.TOTAL_MEMORY || 16777216;
      function Ar() {
        return AN;
      }
      function AY(A) {
        for (; A.length > 0;) {
          var I = A.shift();
          if ("function" == typeof I) {
            I();
            continue;
          }
          var g = I.func;
          "number" == typeof g ? void 0 === I.arg ? $.dynCall_v(g) : $.dynCall_vi(g, I.arg) : g(void 0 === I.arg ? null : I.arg);
        }
      }
      AN < Ak && H("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + AN + "! (TOTAL_STACK=" + Ak + ")"), $.buffer ? B = $.buffer : ("object" == typeof WebAssembly && "function" == typeof WebAssembly.Memory ? ($.wasmMemory = new WebAssembly.Memory({ initial: AN / 65536 }), B = $.wasmMemory.buffer) : B = new ArrayBuffer(AN), $.buffer = B), A$();
      var AJ = [], Af = [], AH = [], AM = [], A0 = !1;
      function Aq(A) {
        AJ.unshift(A);
      }
      function Ab(A) {
        AM.unshift(A);
      }
      var A6 = Math.floor, A7 = 0, A1 = null, AW = null;
      $.preloadedImages = {}, $.preloadedAudios = {};
      var AT = "data:application/octet-stream;base64,";
      function A2(A) {
        return String.prototype.startsWith ? A.startsWith(AT) : 0 === A.indexOf(AT);
      }
      (function A() {
        var I = "main.wast", g = "main.wasm", B = "main.temp.asm";
        A2(I) || (I = J(I)), A2(g) || (g = J(g)), A2(B) || (B = J(B));
        var E = {
          global: null,
          env: null,
          asm2wasm: l,
          parent: $
        }, Q = null;
        function i() {
          try {
            if ($.wasmBinary) return new Uint8Array($.wasmBinary);
            if ($.readBinary) return $.readBinary(g);
            throw "both async and sync fetching of the wasm failed";
          } catch (A) {
            IE(A);
          }
        }
        $.asmPreload = $.asm;
        var h = $.reallocBuffer, o = function(A) {
          A = An(A, $.usingWasm ? 65536 : 16777216);
          var I = $.buffer.byteLength;
          if ($.usingWasm) try {
            if (-1 !== $.wasmMemory.grow((A - I) / 65536)) return $.buffer = $.wasmMemory.buffer;
            return null;
          } catch (B) {
            return null;
          }
        };
        $.reallocBuffer = function(A) {
          return "asmjs" === G ? h(A) : o(A);
        };
        var G = "";
        $.asm = function(A, I, B) {
          if (!(I = I).table) {
            var h, o = $.wasmTableSize;
            void 0 === o && (o = 1024);
            var G = $.wasmMaxTableSize;
            "object" == typeof WebAssembly && "function" == typeof WebAssembly.Table ? void 0 !== G ? I.table = new WebAssembly.Table({
              initial: o,
              maximum: G,
              element: "anyfunc"
            }) : I.table = new WebAssembly.Table({
              initial: o,
              element: "anyfunc"
            }) : I.table = Array(o), $.wasmTable = I.table;
          }
          return I.memoryBase || (I.memoryBase = $.STATIC_BASE), I.tableBase || (I.tableBase = 0), h = function A(I, B, C) {
            if ("object" != typeof WebAssembly) return H("no native wasm support detected"), !1;
            if (!($.wasmMemory instanceof WebAssembly.Memory)) return H("no native wasm Memory in use"), !1;
            function h(A, I) {
              if ((Q = A.exports).memory) {
                var g = Q.memory, B = $.buffer, E;
                g.byteLength < B.byteLength && H("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here"), E = new Int8Array(B), new Int8Array(g).set(E), AU(g), A$();
              }
              $.asm = Q, $.usingWasm = !0, function A(I) {
                if (A7--, $.monitorRunDependencies && $.monitorRunDependencies(A7), 0 == A7 && (null !== A1 && (clearInterval(A1), A1 = null), AW)) {
                  var g = AW;
                  AW = null, g();
                }
              }("wasm-instantiate");
            }
            B.memory = $.wasmMemory, E.global = {
              NaN: NaN,
              Infinity: Infinity
            }, E["global.Math"] = Math, E.env = B;
            if (A7++, $.monitorRunDependencies && $.monitorRunDependencies(A7), $.instantiateWasm) try {
              return $.instantiateWasm(E, h);
            } catch (o) {
              return H("Module.instantiateWasm callback failed with error: " + o), !1;
            }
            function G(A) {
              h(A.instance, A.module);
            }
            function D(A) {
              (!$.wasmBinary && (t || k) && "function" == typeof fetch ? fetch(g, { credentials: "same-origin" }).then(function(A) {
                if (!A.ok) throw "failed to load wasm binary file at '" + g + "'";
                return A.arrayBuffer();
              }).catch(function() {
                return i();
              }) : new Promise(function(A, I) {
                A(i());
              })).then(function(A) {
                return WebAssembly.instantiate(A, E);
              }).then(A).catch(function(A) {
                H("failed to asynchronously prepare wasm: " + A), IE(A);
              });
            }
            return $.wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || A2(g) || "function" != typeof fetch ? D(G) : WebAssembly.instantiateStreaming(fetch(g, { credentials: "same-origin" }), E).then(G).catch(function(A) {
              H("wasm streaming compile failed: " + A), H("falling back to ArrayBuffer instantiation"), D(G);
            }), {};
          }(A, I, B), _(h, "no binaryen method succeeded."), h;
        }, $.asm;
      })(), S = (a = 1024) + 4816, Af.push(), $.STATIC_BASE = a, $.STATIC_BUMP = 4816;
      var Av = S;
      S += 16, c = L(4), w = (s = d(S)) + Ak, y = d(w), h[c >> 2] = y, $.wasmTableSize = 4, $.wasmMaxTableSize = 4, $.asmGlobalArg = {}, $.asmLibraryArg = {
        abort: IE,
        assert: _,
        enlargeMemory: Ae,
        getTotalMemory: Ar,
        abortOnCannotGrowMemory: function A() {
          IE("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + AN + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
        },
        invoke_iii: function A(I, g, B) {
          var E = IA();
          try {
            return $.dynCall_iii(I, g, B);
          } catch (Q) {
            if (A9(E), "number" != typeof Q && "longjmp" !== Q) throw Q;
            $.setThrew(1, 0);
          }
        },
        ___assert_fail: function A(I, g, B, E) {
          IE("Assertion failed: " + Ag(I) + ", at: " + [
            g ? Ag(g) : "unknown filename",
            B,
            E ? Ag(E) : "unknown function"
          ]);
        },
        ___setErrNo: function A(I) {
          return $.___errno_location && (h[$.___errno_location() >> 2] = I), I;
        },
        _abort: function A() {
          $.abort();
        },
        _emscripten_memcpy_big: function A(I, g, B) {
          return Q.set(Q.subarray(g, g + B), I), I;
        },
        _llvm_floor_f64: A6,
        DYNAMICTOP_PTR: c,
        tempDoublePtr: Av,
        ABORT: p,
        STACKTOP: s,
        STACK_MAX: w
      };
      var A3 = $.asm($.asmGlobalArg, $.asmLibraryArg, B);
      $.asm = A3, $.___errno_location = function() {
        return $.asm.___errno_location.apply(null, arguments);
      };
      var Az = $._emscripten_replace_memory = function() {
        return $.asm._emscripten_replace_memory.apply(null, arguments);
      };
      $._free = function() {
        return $.asm._free.apply(null, arguments);
      };
      $._malloc = function() {
        return $.asm._malloc.apply(null, arguments);
      };
      $._memcpy = function() {
        return $.asm._memcpy.apply(null, arguments);
      }, $._memset = function() {
        return $.asm._memset.apply(null, arguments);
      }, $._sbrk = function() {
        return $.asm._sbrk.apply(null, arguments);
      }, $._stb_vorbis_js_channels = function() {
        return $.asm._stb_vorbis_js_channels.apply(null, arguments);
      }, $._stb_vorbis_js_close = function() {
        return $.asm._stb_vorbis_js_close.apply(null, arguments);
      }, $._stb_vorbis_js_decode = function() {
        return $.asm._stb_vorbis_js_decode.apply(null, arguments);
      }, $._stb_vorbis_js_open = function() {
        return $.asm._stb_vorbis_js_open.apply(null, arguments);
      }, $._stb_vorbis_js_sample_rate = function() {
        return $.asm._stb_vorbis_js_sample_rate.apply(null, arguments);
      }, $.establishStackSpace = function() {
        return $.asm.establishStackSpace.apply(null, arguments);
      }, $.getTempRet0 = function() {
        return $.asm.getTempRet0.apply(null, arguments);
      }, $.runPostSets = function() {
        return $.asm.runPostSets.apply(null, arguments);
      }, $.setTempRet0 = function() {
        return $.asm.setTempRet0.apply(null, arguments);
      }, $.setThrew = function() {
        return $.asm.setThrew.apply(null, arguments);
      };
      var A5 = $.stackAlloc = function() {
        return $.asm.stackAlloc.apply(null, arguments);
      }, A9 = $.stackRestore = function() {
        return $.asm.stackRestore.apply(null, arguments);
      }, IA = $.stackSave = function() {
        return $.asm.stackSave.apply(null, arguments);
      };
      function II(A) {
        this.name = "ExitStatus", this.message = "Program terminated with exit(" + A + ")", this.status = A;
      }
      function Ig(A) {
        if (A = A || $.arguments, !(A7 > 0)) (function A() {
          if ($.preRun) for ("function" == typeof $.preRun && ($.preRun = [$.preRun]); $.preRun.length;) Aq($.preRun.shift());
          AY(AJ);
        })(), !(A7 > 0) && ($.calledRun || ($.setStatus ? ($.setStatus("Running..."), setTimeout(function() {
          setTimeout(function() {
            $.setStatus("");
          }, 1), I();
        }, 1)) : I()));
        function I() {
          !$.calledRun && ($.calledRun = !0, p || (A0 || (A0 = !0, AY(Af)), AY(AH), $.onRuntimeInitialized && $.onRuntimeInitialized(), function A() {
            if ($.postRun) for ("function" == typeof $.postRun && ($.postRun = [$.postRun]); $.postRun.length;) Ab($.postRun.shift());
            AY(AM);
          }()));
        }
      }
      function IE(A) {
        throw $.onAbort && $.onAbort(A), void 0 !== A ? (f(A), H(A), A = JSON.stringify(A)) : A = "", p = !0, "abort(" + A + "). Build with -s ASSERTIONS=1 for more info.";
      }
      if ($.dynCall_iii = function() {
        return $.asm.dynCall_iii.apply(null, arguments);
      }, $.asm = A3, $.ccall = j, $.cwrap = function A(I, g, B, E) {
        var Q = (B = B || []).every(function(A) {
          return "number" === A;
        });
        return "string" !== g && Q && !E ? T(I) : function() {
          return j(I, g, B, arguments, E);
        };
      }, II.prototype = Error(), II.prototype.constructor = II, AW = function A() {
        $.calledRun || Ig(), $.calledRun || (AW = A);
      }, $.run = Ig, $.abort = IE, $.preInit) for ("function" == typeof $.preInit && ($.preInit = [$.preInit]); $.preInit.length > 0;) $.preInit.pop()();
      $.noExitRuntime = !0, Ig(), $.onRuntimeInitialized = () => {
        isReady = !0, readySolver();
      }, stbvorbis.decode = function(A) {
        return function A(I) {
          if (!isReady) throw Error("SF3 decoder has not been initialized yet. Did you await synth.isReady?");
          var g = {};
          function B(A) {
            return new Int32Array($.HEAPU8.buffer, A, 1)[0];
          }
          function E(A, I) {
            var g = new ArrayBuffer(I * Float32Array.BYTES_PER_ELEMENT), B = new Float32Array(g);
            return B.set(new Float32Array($.HEAPU8.buffer, A, I)), B;
          }
          g.open = $.cwrap("stb_vorbis_js_open", "number", []), g.close = $.cwrap("stb_vorbis_js_close", "void", ["number"]), g.channels = $.cwrap("stb_vorbis_js_channels", "number", ["number"]), g.sampleRate = $.cwrap("stb_vorbis_js_sample_rate", "number", ["number"]), g.decode = $.cwrap("stb_vorbis_js_decode", "number", [
            "number",
            "number",
            "number",
            "number",
            "number"
          ]);
          var Q, C, i, h, o = g.open(), G = (Q = I, C = I.byteLength, i = $._malloc(C), (h = new Uint8Array($.HEAPU8.buffer, i, C)).set(new Uint8Array(Q, 0, C)), h), D = $._malloc(4), a = $._malloc(4), S = g.decode(o, G.byteOffset, G.byteLength, D, a);
          if ($._free(G.byteOffset), S < 0) throw g.close(o), $._free(D), Error("stbvorbis decode failed: " + S);
          for (var F = g.channels(o), R = Array(F), s = new Int32Array($.HEAPU32.buffer, B(D), F), w = 0; w < F; w++) R[w] = E(s[w], S), $._free(s[w]);
          var y = g.sampleRate(o);
          return g.close(o), $._free(B(D)), $._free(D), {
            data: R,
            sampleRate: y,
            eof: !0,
            error: null
          };
        }(A);
      };
    })();
    //#endregion
    //#region src/externals/stbvorbis_sync/stbvorbis_wrapper.ts
    const stb = stbvorbis;
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/synth_processor_options.ts
    const DEFAULT_SYNTH_OPTIONS = {
      enableEventSystem: true,
      maxBufferSize: 128,
      initialTime: 0,
      enableEffects: true
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/drum_parameters.ts
    /**
    * Represents a single drum instrument's XG/GS parameters.
    */
    var DrumParameters = class {
      /**
      * Pitch offset in cents.
      */
      pitch = 0;
      /**
      * Gain multiplier.
      */
      gain = 1;
      /**
      * Exclusive class override.
      */
      exclusiveClass = 0;
      /**
      * Pan, 1-64-127, 0 is random. This adds to the channel pan!
      */
      pan = 64;
      /**
      * Reverb multiplier.
      */
      reverbGain = 0;
      /**
      * Chorus multiplier.
      */
      chorusGain = 1;
      /**
      * Delay multiplier.
      */
      delayGain = 1;
      /**
      * If note on should be received.
      */
      rxNoteOn = true;
      /**
      * If note off should be received.
      * Note:
      * Due to the way sound banks implement drums (as 100s release time),
      * this means killing the voice on note off, not releasing it.
      */
      rxNoteOff = false;
      copyInto(p) {
        this.pitch = p.pitch;
        this.chorusGain = p.chorusGain;
        this.reverbGain = p.reverbGain;
        this.exclusiveClass = p.exclusiveClass;
        this.gain = p.gain;
        this.pan = p.pan;
        this.rxNoteOff = p.rxNoteOff;
        this.rxNoteOn = p.rxNoteOn;
        return this;
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/snapshot/channel_snapshot.ts
    /**
    * Represents a snapshot of a single channel's state in the synthesizer.
    */
    var ChannelSnapshot = class ChannelSnapshot {
      /**
      * The MIDI patch that the channel is using.
      */
      patch;
      /**
      * Indicates whether the channel's program change is disabled.
      */
      lockPreset;
      /**
      * Indicates the MIDI system when the preset was locked
      */
      lockedSystem;
      /**
      * The array of all MIDI controllers (in 14-bit values) with the modulator sources at the end.
      */
      midiControllers;
      /**
      * An array of booleans, indicating if the controller with a current index is locked.
      */
      lockedControllers;
      /**
      * Array of custom (not SF2) control values such as RPN pitch tuning, transpose, modulation depth, etc.
      */
      customControllers;
      /**
      * The channel's vibrato settings.
      * @property depth Vibrato depth, in gain.
      * @property delay Vibrato delay from note on in seconds.
      * @property rate Vibrato rate in Hz.
      */
      channelVibrato;
      /**
      * Key shift for the channel.
      */
      keyShift;
      /**
      * The channel's octave tuning in cents.
      */
      octaveTuning;
      /**
      * Parameters for each drum instrument.
      */
      drumParams;
      /**
      * Indicates whether the channel is muted.
      */
      isMuted;
      /**
      * Indicates whether the channel is a drum channel.
      */
      drumChannel;
      /**
      * The channel number this snapshot represents.
      */
      channelNumber;
      constructor(patch, lockPreset, lockedSystem, midiControllers, lockedControllers, customControllers, channelVibrato, channelTransposeKeyShift, channelOctaveTuning, drumParams, isMuted, drumChannel, channelNumber) {
        this.patch = patch;
        this.lockPreset = lockPreset;
        this.lockedSystem = lockedSystem;
        this.midiControllers = midiControllers;
        this.lockedControllers = lockedControllers;
        this.customControllers = customControllers;
        this.channelVibrato = channelVibrato;
        this.keyShift = channelTransposeKeyShift;
        this.octaveTuning = channelOctaveTuning;
        this.drumParams = drumParams;
        this.isMuted = isMuted;
        this.drumChannel = drumChannel;
        this.channelNumber = channelNumber;
      }
      /**
      * Creates a copy of existing snapshot.
      * @param snapshot The snapshot to create a copy from.
      */
      static copyFrom(snapshot) {
        return new ChannelSnapshot({ ...snapshot.patch }, snapshot.lockPreset, snapshot.lockedSystem, snapshot.midiControllers.slice(), [...snapshot.lockedControllers], snapshot.customControllers.slice(), { ...snapshot.channelVibrato }, snapshot.keyShift, snapshot.octaveTuning.slice(), snapshot.drumParams.map((d) => new DrumParameters().copyInto(d)), snapshot.isMuted, snapshot.drumChannel, snapshot.channelNumber);
      }
      /**
      * Creates a snapshot of the channel's state.
      * @param spessaSynthProcessor The synthesizer processor containing the channel.
      * @param channelNumber The channel number to take a snapshot of.
      */
      static create(spessaSynthProcessor, channelNumber) {
        const channelObject = spessaSynthProcessor.midiChannels[channelNumber];
        return new ChannelSnapshot({
          ...channelObject.patch,
          name: channelObject?.preset?.name ?? "undefined"
        }, channelObject.lockPreset, channelObject.lockedSystem, channelObject.midiControllers.slice(), [...channelObject.lockedControllers], channelObject.customControllers.slice(), { ...channelObject.channelVibrato }, channelObject.keyShift, channelObject.octaveTuning.slice(), channelObject.drumParams.map((d) => new DrumParameters().copyInto(d)), channelObject.isMuted, channelObject.drumChannel, channelNumber);
      }
      /**
      * Applies the snapshot to the specified channel.
      * @param spessaSynthProcessor The processor containing the channel.
      */
      apply(spessaSynthProcessor) {
        const channelObject = spessaSynthProcessor.midiChannels[this.channelNumber];
        channelObject.muteChannel(this.isMuted);
        channelObject.setDrums(this.drumChannel);
        channelObject.midiControllers.set(this.midiControllers);
        channelObject.lockedControllers = this.lockedControllers;
        channelObject.customControllers.set(this.customControllers);
        channelObject.updateChannelTuning();
        channelObject.channelVibrato.rate = this.channelVibrato.rate;
        channelObject.channelVibrato.delay = this.channelVibrato.delay;
        channelObject.channelVibrato.depth = this.channelVibrato.depth;
        channelObject.keyShift = this.keyShift;
        channelObject.octaveTuning.set(this.octaveTuning);
        for (let i = 0; i < 128; i++) this.drumParams[i].copyInto(channelObject.drumParams[i]);
        channelObject.setPresetLock(false);
        channelObject.setPatch(this.patch);
        channelObject.setPresetLock(this.lockPreset);
        channelObject.lockedSystem = this.lockedSystem;
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/key_modifier_manager.ts
    var KeyModifier = class {
      /**
      * The new override velocity. -1 means unchanged.
      */
      velocity = -1;
      /**
      * The MIDI patch this key uses. -1 on any property means unchanged.
      */
      patch = {
        bankLSB: -1,
        bankMSB: -1,
        isGMGSDrum: false,
        program: -1
      };
      /**
      * Linear gain override for the voice.
      */
      gain = 1;
    };
    var KeyModifierManager = class {
      /**
      * The velocity override mappings for MIDI keys
      * stored as [channelNumber][midiNote].
      */
      keyMappings = [];
      /**
      * Add a mapping for a MIDI key to a KeyModifier.
      * @param channel The MIDI channel number.
      * @param midiNote The MIDI note number (0-127).
      * @param mapping The KeyModifier to apply for this key.
      */
      addMapping(channel, midiNote, mapping) {
        this.keyMappings[channel] ??= [];
        this.keyMappings[channel][midiNote] = mapping;
      }
      /**
      * Delete a mapping for a MIDI key.
      * @param channel The MIDI channel number.
      * @param midiNote The MIDI note number (0-127).
      */
      deleteMapping(channel, midiNote) {
        if (this.keyMappings[channel]?.[midiNote] === void 0) return;
        this.keyMappings[channel][midiNote] = void 0;
      }
      /**
      * Clear all key mappings.
      */
      clearMappings() {
        this.keyMappings = [];
      }
      /**
      * Sets the key mappings to a new array.
      * @param mappings A 2D array where the first dimension is the channel number and the second dimension is the MIDI note number.
      */
      setMappings(mappings) {
        this.keyMappings = mappings;
      }
      /**
      * Returns the current key mappings.
      */
      getMappings() {
        return this.keyMappings;
      }
      /**
      * Gets the velocity override for a MIDI key.
      * @param channel The MIDI channel number.
      * @param midiNote The MIDI note number (0-127).
      * @returns The velocity override, or -1 if no override is set.
      */
      getVelocity(channel, midiNote) {
        return this.keyMappings[channel]?.[midiNote]?.velocity ?? -1;
      }
      /**
      * Gets the gain override for a MIDI key.
      * @param channel The MIDI channel number.
      * @param midiNote The MIDI note number (0-127).
      * @returns The gain override, or 1 if no override is set.
      */
      getGain(channel, midiNote) {
        return this.keyMappings[channel]?.[midiNote]?.gain ?? 1;
      }
      /**
      * Checks if a MIDI key has an override for the patch.
      * @param channel The MIDI channel number.
      * @param midiNote The MIDI note number (0-127).
      * @returns True if the key has an override patch, false otherwise.
      */
      hasOverridePatch(channel, midiNote) {
        const bank = this.keyMappings[channel]?.[midiNote]?.patch?.bankMSB;
        return bank !== void 0 && bank >= 0;
      }
      /**
      * Gets the patch override for a MIDI key.
      * @param channel The MIDI channel number.
      * @param midiNote The MIDI note number (0-127).
      * @returns An object containing the bank and program numbers.
      * @throws Error if no modifier is set for the key.
      */
      getPatch(channel, midiNote) {
        const modifier = this.keyMappings[channel]?.[midiNote];
        if (modifier) return modifier.patch;
        throw new Error("No modifier.");
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/snapshot/synthesizer_snapshot.ts
    function sendAddress(s, a1, a2, a3, data, offset = 0) {
      const checksum = 128 - (a1 + a2 + a3 + data.reduce((sum, cur) => sum + cur, 0)) % 128 & 127;
      s.systemExclusive([
        65,
        16,
        66,
        18,
        a1,
        a2,
        a3,
        ...data,
        checksum,
        247
      ], offset);
    }
    /**
    * Represents a snapshot of the synthesizer's state.
    */
    var SynthesizerSnapshot = class SynthesizerSnapshot {
      /**
      * The individual channel snapshots.
      */
      channelSnapshots;
      /**
      * Key modifiers.
      */
      keyMappings;
      masterParameters;
      reverbSnapshot;
      chorusSnapshot;
      delaySnapshot;
      insertionSnapshot;
      constructor(channelSnapshots, masterParameters, keyMappings, reverbSnapshot, chorusSnapshot, delaySnapshot, insertionSnapshot) {
        this.channelSnapshots = channelSnapshots;
        this.masterParameters = masterParameters;
        this.keyMappings = keyMappings;
        this.reverbSnapshot = reverbSnapshot;
        this.chorusSnapshot = chorusSnapshot;
        this.delaySnapshot = delaySnapshot;
        this.insertionSnapshot = insertionSnapshot;
      }
      /**
      * Creates a new synthesizer snapshot from the given SpessaSynthProcessor.
      * @param processor the processor to take a snapshot of.
      * @returns The snapshot.
      */
      static create(processor) {
        return new SynthesizerSnapshot(processor.midiChannels.map((_, i) => ChannelSnapshot.create(processor, i)), processor.getAllMasterParameters(), processor.keyModifierManager.getMappings(), processor.reverbProcessor.getSnapshot(), processor.chorusProcessor.getSnapshot(), processor.delayProcessor.getSnapshot(), processor.getInsertionSnapshot());
      }
      /**
      * Creates a copy of existing snapshot.
      * @param snapshot The snapshot to create a copy from.
      */
      static copyFrom(snapshot) {
        return new SynthesizerSnapshot(snapshot.channelSnapshots.map((s) => ChannelSnapshot.copyFrom(s)), { ...snapshot.masterParameters }, [...snapshot.keyMappings], { ...snapshot.reverbSnapshot }, { ...snapshot.chorusSnapshot }, { ...snapshot.delaySnapshot }, { ...snapshot.insertionSnapshot });
      }
      /**
      * Applies the snapshot to the synthesizer.
      * @param processor the processor to apply the snapshot to.
      */
      apply(processor) {
        processor.keyModifierManager.setMappings(this.keyMappings);
        while (processor.midiChannels.length < this.channelSnapshots.length) processor.createMIDIChannel();
        for (const channelSnapshot of this.channelSnapshots) channelSnapshot.apply(processor);
        for (const [key, value] of Object.entries(this.reverbSnapshot)) processor.reverbProcessor[key] = value;
        for (const [key, value] of Object.entries(this.chorusSnapshot)) processor.chorusProcessor[key] = value;
        for (const [key, value] of Object.entries(this.delaySnapshot)) processor.delayProcessor[key] = value;
        const is = this.insertionSnapshot;
        sendAddress(processor, 64, 3, 0, [is.type >> 8, is.type & 127]);
        for (let i = 0; i < is.params.length; i++) if (is.params[i] !== 255) sendAddress(processor, 64, 3, 3 + i, [is.params[i]]);
        for (let channel = 0; channel < is.channels.length; channel++) sendAddress(processor, 64, 64 | channelToSyx(channel), 34, [is.channels[channel] ? 1 : 0]);
        const entries = Object.entries(this.masterParameters);
        for (const [parameter, value] of entries) processor.setMasterParameter(parameter, value);
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/master_parameters.ts
    const DEFAULT_MASTER_PARAMETERS = {
      masterGain: 1,
      masterPan: 0,
      voiceCap: 350,
      interpolationType: interpolationTypes.hermite,
      midiSystem: "gs",
      monophonicRetriggerMode: false,
      reverbGain: 1,
      chorusGain: 1,
      delayGain: 1,
      reverbLock: false,
      chorusLock: false,
      delayLock: false,
      drumLock: false,
      customVibratoLock: false,
      nprnParamLock: false,
      insertionEffectLock: false,
      blackMIDIMode: false,
      autoAllocateVoices: false,
      transposition: 0,
      deviceID: -1
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/unit_converter.ts
    /**
    * Unit_converter.ts
    * purpose: converts soundfont units into more usable values with the use of lookup tables to improve performance
    */
    const MIN_TIMECENT = -15e3;
    const timecentLookupTable = new Float32Array(15e3 - MIN_TIMECENT + 1);
    for (let i = 0; i < timecentLookupTable.length; i++) {
      const timecents = MIN_TIMECENT + i;
      timecentLookupTable[i] = Math.pow(2, timecents / 1200);
    }
    /**
    * Converts timecents to seconds.
    * @param timecents The timecents value.
    * @returns The time in seconds.
    */
    function timecentsToSeconds(timecents) {
      if (timecents <= -32767) return 0;
      return timecentLookupTable[timecents - MIN_TIMECENT];
    }
    const MIN_ABS_CENT = -2e4;
    const MAX_ABS_CENT = 16500;
    const absoluteCentLookupTable = new Float32Array(MAX_ABS_CENT - MIN_ABS_CENT + 1);
    for (let i = 0; i < absoluteCentLookupTable.length; i++) {
      const absoluteCents = MIN_ABS_CENT + i;
      absoluteCentLookupTable[i] = 440 * Math.pow(2, (absoluteCents - 6900) / 1200);
    }
    /**
    * Converts absolute cents to frequency in Hz.
    * @param cents The absolute cents value.
    * @returns The frequency in Hz.
    */
    function absCentsToHz(cents) {
      if (cents < MIN_ABS_CENT || cents > MAX_ABS_CENT) return 440 * Math.pow(2, (cents - 6900) / 1200);
      return absoluteCentLookupTable[cents - MIN_ABS_CENT | 0];
    }
    const MIN_CENTIBELS = -16600;
    const CENTIBEL_LOOKUP_TABLE = new Float32Array(16e3 - MIN_CENTIBELS + 1);
    for (let i = 0; i < CENTIBEL_LOOKUP_TABLE.length; i++) {
      const centibels = MIN_CENTIBELS + i;
      CENTIBEL_LOOKUP_TABLE[i] = Math.pow(10, -centibels / 200);
    }
    /**
    * Converts centibel attenuation to gain.
    * @param centibels The centibel value.
    * @return The gain value.
    */
    function cbAttenuationToGain(centibels) {
      return CENTIBEL_LOOKUP_TABLE[centibels - MIN_CENTIBELS | 0];
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/dsp_chain/lowpass_filter.ts
    /**
    * Lowpass_filter.ts
    * purpose: applies a low pass filter to a voice
    * note to self: a lot of tricks and come from fluidsynth.
    * They are the real smart guys.
    * Shoutout to them!
    * Give their repo a star over at:
    * https://github.com/FluidSynth/fluidsynth
    */
    const FILTER_SMOOTHING_FACTOR = .03;
    var LowpassFilter = class LowpassFilter {
      /**
      * For smoothing the filter cutoff frequency.
      */
      static smoothingConstant = 1;
      /**
      * Cached coefficient calculations.
      * stored as cachedCoefficients[resonanceCb + currentInitialFc * 961].
      */
      static cachedCoefficients = /* @__PURE__ */ new Map();
      /**
      * Resonance in centibels.
      */
      resonanceCb = 0;
      /**
      * Current cutoff frequency in absolute cents.
      */
      currentInitialFc = 13500;
      /**
      * Filter coefficient 1.
      */
      a0 = 0;
      /**
      * Filter coefficient 2.
      */
      a1 = 0;
      /**
      * Filter coefficient 3.
      */
      a2 = 0;
      /**
      * Filter coefficient 4.
      */
      a3 = 0;
      /**
      * Filter coefficient 5.
      */
      a4 = 0;
      /**
      * Input history 1.
      */
      x1 = 0;
      /**
      * Input history 2.
      */
      x2 = 0;
      /**
      * Output history 1.
      */
      y1 = 0;
      /**
      * Output history 2.
      */
      y2 = 0;
      /**
      * For tracking the last cutoff frequency in the apply method, absolute cents.
      * Set to infinity to force recalculation.
      */
      lastTargetCutoff = Infinity;
      /**
      * Used for tracking if the filter has been initialized.
      */
      initialized = false;
      /**
      * Filter's sample rate in Hz.
      */
      sampleRate;
      /**
      * Maximum cutoff frequency in Hz.
      * This is used to prevent aliasing and ensure the filter operates within the valid frequency range.
      */
      maxCutoff;
      /**
      * Initializes a new instance of the filter.
      * @param sampleRate the sample rate of the audio engine in Hz.
      */
      constructor(sampleRate) {
        this.sampleRate = sampleRate;
        this.maxCutoff = sampleRate * .45;
      }
      static initCache(sampleRate) {
        LowpassFilter.smoothingConstant = FILTER_SMOOTHING_FACTOR * (44100 / sampleRate);
        const dummy = new LowpassFilter(sampleRate);
        dummy.resonanceCb = 0;
        for (let i = 1500; i < 13500; i++) {
          dummy.currentInitialFc = i;
          dummy.calculateCoefficients(i);
        }
      }
      init() {
        this.lastTargetCutoff = Infinity;
        this.resonanceCb = 0;
        this.currentInitialFc = 13500;
        this.a0 = 0;
        this.a1 = 0;
        this.a2 = 0;
        this.a3 = 0;
        this.a4 = 0;
        this.x1 = 0;
        this.x2 = 0;
        this.y1 = 0;
        this.y2 = 0;
        this.initialized = false;
      }
      /**
      * Calculates the filter coefficients based on the current resonance and cutoff frequency and caches them.
      * @param cutoffCents The cutoff frequency in cents.
      */
      calculateCoefficients(cutoffCents) {
        cutoffCents = cutoffCents | 0;
        const qCb = this.resonanceCb;
        const cached = LowpassFilter.cachedCoefficients.get(qCb + cutoffCents * 961);
        if (cached !== void 0) {
          this.a0 = cached.a0;
          this.a1 = cached.a1;
          this.a2 = cached.a2;
          this.a3 = cached.a3;
          this.a4 = cached.a4;
          return;
        }
        let cutoffHz = absCentsToHz(cutoffCents);
        cutoffHz = Math.min(cutoffHz, this.maxCutoff);
        const resonanceGain = cbAttenuationToGain(-(qCb - 3.01));
        const qGain = 1 / Math.sqrt(cbAttenuationToGain(-qCb));
        const w = 2 * Math.PI * cutoffHz / this.sampleRate;
        const cosw = Math.cos(w);
        const alpha = Math.sin(w) / (2 * resonanceGain);
        const b1 = (1 - cosw) * qGain;
        const b0 = b1 / 2;
        const b2 = b0;
        const a0 = 1 + alpha;
        const a1 = -2 * cosw;
        const a2 = 1 - alpha;
        const toCache = {
          a0: b0 / a0,
          a1: b1 / a0,
          a2: b2 / a0,
          a3: a1 / a0,
          a4: a2 / a0
        };
        this.a0 = toCache.a0;
        this.a1 = toCache.a1;
        this.a2 = toCache.a2;
        this.a3 = toCache.a3;
        this.a4 = toCache.a4;
        LowpassFilter.cachedCoefficients.set(qCb + cutoffCents * 961, toCache);
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/dsp_chain/volume_envelope.ts
    /**
    * Volume_envelope.ts
    * purpose: applies a volume envelope for a given voice
    *
    * For performance reasons, cbAttenuationToGain is inlined here.
    */
    const CB_SILENCE = 960;
    const PERCEIVED_CB_SILENCE = 900;
    var VolumeEnvelope = class {
      /**
      * The sample rate in Hz.
      */
      sampleRate;
      /**
      * The target gain for the current rendering block.
      */
      outputGain = 0;
      /**
      * The current attenuation of the envelope in cB.
      */
      attenuationCb = CB_SILENCE;
      /**
      * The current stage of the volume envelope.
      */
      state = 0;
      /**
      * The envelope's current time in samples.
      */
      sampleTime = 0;
      /**
      * The dB attenuation of the envelope when it entered the release stage.
      */
      releaseStartCb = CB_SILENCE;
      /**
      * The time in samples relative to the start of the envelope.
      */
      releaseStartTimeSamples = 0;
      /**
      * The attack duration in samples.
      */
      attackDuration = 0;
      /**
      * The decay duration in samples.
      */
      decayDuration = 0;
      /**
      * The release duration in samples.
      */
      releaseDuration = 0;
      /**
      * The voice's sustain amount in cB.
      */
      sustainCb = 0;
      /**
      * The time in samples to the end of delay stage, relative to the start of the envelope.
      */
      delayEnd = 0;
      /**
      * The time in samples to the end of attack stage, relative to the start of the envelope.
      */
      attackEnd = 0;
      /**
      * The time in samples to the end of hold stage, relative to the start of the envelope.
      */
      holdEnd = 0;
      /**
      * The time in samples to the end of decay stage, relative to the start of the envelope.
      */
      decayEnd = 0;
      /**
      * If the volume envelope has ever entered the release phase.
      * @private
      */
      enteredRelease = false;
      /**
      * If sustain stage is silent,
      * then we can turn off the voice when it is silent.
      * We can't do that with modulated as it can silence the volume and then raise it again, and the voice must keep playing.
      */
      canEndOnSilentSustain = false;
      /**
      * @param sampleRate Hz
      */
      constructor(sampleRate) {
        this.sampleRate = sampleRate;
      }
      /**
      * Starts the release phase in the envelope.
      * @param voice the voice this envelope belongs to.
      */
      startRelease(voice) {
        this.releaseStartTimeSamples = this.sampleTime;
        const timecents = voice.overrideReleaseVolEnv || voice.modulatedGenerators[generatorTypes.releaseVolEnv];
        this.releaseDuration = this.timecentsToSamples(Math.max(-7200, timecents));
        if (this.enteredRelease) this.releaseStartCb = this.attenuationCb;
        else {
          const sustainCb = Math.max(0, Math.min(CB_SILENCE, this.sustainCb));
          const fraction = sustainCb / CB_SILENCE;
          const keyNumAddition = (60 - voice.targetKey) * voice.modulatedGenerators[generatorTypes.keyNumToVolEnvDecay];
          this.decayDuration = this.timecentsToSamples(voice.modulatedGenerators[generatorTypes.decayVolEnv] + keyNumAddition) * fraction;
          switch (this.state) {
            case 0:
              this.releaseStartCb = CB_SILENCE;
              break;
            case 1: {
              const elapsed = 1 - (this.attackEnd - this.releaseStartTimeSamples) / this.attackDuration;
              this.releaseStartCb = 200 * Math.log10(elapsed) * -1;
              break;
            }
            case 2:
              this.releaseStartCb = 0;
              break;
            case 3:
              this.releaseStartCb = (1 - (this.decayEnd - this.releaseStartTimeSamples) / this.decayDuration) * sustainCb;
              break;
            case 4:
              this.releaseStartCb = sustainCb;
              break;
          }
          this.releaseStartCb = Math.max(0, Math.min(this.releaseStartCb, CB_SILENCE));
          this.attenuationCb = this.releaseStartCb;
        }
        this.enteredRelease = true;
        const releaseFraction = (CB_SILENCE - this.releaseStartCb) / CB_SILENCE;
        this.releaseDuration *= releaseFraction;
        if (this.releaseStartCb >= PERCEIVED_CB_SILENCE) voice.isActive = false;
      }
      /**
      * Initialize the volume envelope
      * @param voice The voice this envelope belongs to
      */
      init(voice) {
        this.enteredRelease = false;
        this.state = 0;
        this.sampleTime = 0;
        this.outputGain = 0;
        this.canEndOnSilentSustain = voice.modulatedGenerators[generatorTypes.sustainVolEnv] >= PERCEIVED_CB_SILENCE;
        this.sustainCb = Math.min(CB_SILENCE, voice.modulatedGenerators[generatorTypes.sustainVolEnv]);
        this.attackDuration = this.timecentsToSamples(voice.modulatedGenerators[generatorTypes.attackVolEnv]);
        const keyNumAddition = (60 - voice.targetKey) * voice.modulatedGenerators[generatorTypes.keyNumToVolEnvDecay];
        const fraction = this.sustainCb / CB_SILENCE;
        this.decayDuration = this.timecentsToSamples(voice.modulatedGenerators[generatorTypes.decayVolEnv] + keyNumAddition) * fraction;
        this.delayEnd = this.timecentsToSamples(voice.modulatedGenerators[generatorTypes.delayVolEnv]);
        this.attackEnd = this.attackDuration + this.delayEnd;
        const holdExcursion = (60 - voice.targetKey) * voice.modulatedGenerators[generatorTypes.keyNumToVolEnvHold];
        this.holdEnd = this.timecentsToSamples(voice.modulatedGenerators[generatorTypes.holdVolEnv] + holdExcursion) + this.attackEnd;
        this.decayEnd = this.decayDuration + this.holdEnd;
        if (this.attackEnd === 0) this.state = 2;
      }
      /**
      * Calculates the gain value for the last sample in the block and writes it to `outputGain`.
      * Essentially we use approach of 100dB is silence, 0dB is peak.
      * @param sampleCount the amount of samples to write
      * @param gainTarget the gain to apply.
      * @returns if the voice has finished.
      */
      process(sampleCount, gainTarget) {
        const { releaseStartTimeSamples, releaseStartCb, releaseDuration, delayEnd, attackEnd, attackDuration, holdEnd, decayEnd, decayDuration, sustainCb } = this;
        const sampleTime = this.sampleTime += sampleCount;
        if (this.enteredRelease) {
          const elapsedRelease = sampleTime - releaseStartTimeSamples;
          const cbDifference = CB_SILENCE - releaseStartCb;
          this.attenuationCb = elapsedRelease / releaseDuration * cbDifference + releaseStartCb;
          this.outputGain = CENTIBEL_LOOKUP_TABLE[this.attenuationCb - MIN_CENTIBELS | 0] * gainTarget;
          return this.attenuationCb < PERCEIVED_CB_SILENCE;
        }
        switch (this.state) {
          case 0:
            if (sampleTime < delayEnd) {
              this.attenuationCb = CB_SILENCE;
              this.outputGain = 0;
              return true;
            }
            this.state++;
          case 1:
            if (sampleTime < attackEnd) {
              this.attenuationCb = 0;
              const linearGain = 1 - (attackEnd - sampleTime) / attackDuration;
              this.outputGain = linearGain * gainTarget;
              return true;
            }
            this.state++;
          case 2:
            if (sampleTime < holdEnd) {
              this.attenuationCb = 0;
              this.outputGain = gainTarget;
              return true;
            }
            this.state++;
          case 3:
            if (sampleTime < decayEnd) {
              this.attenuationCb = (1 - (decayEnd - sampleTime) / decayDuration) * sustainCb;
              this.outputGain = gainTarget * CENTIBEL_LOOKUP_TABLE[this.attenuationCb - MIN_CENTIBELS | 0];
              return true;
            }
            this.state++;
          case 4:
            if (this.canEndOnSilentSustain && sustainCb >= PERCEIVED_CB_SILENCE) {
              this.attenuationCb = CB_SILENCE;
              this.outputGain = 0;
              return false;
            }
            this.attenuationCb = sustainCb;
            this.outputGain = gainTarget * CENTIBEL_LOOKUP_TABLE[sustainCb - MIN_CENTIBELS | 0];
            return true;
        }
      }
      timecentsToSamples(tc) {
        return Math.max(0, Math.floor(timecentsToSeconds(tc) * this.sampleRate));
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/modulator_curves.ts
    /**
    * Modulator_curves.ts
    * precomputes modulator concave and convex curves and calculates a curve value for a given polarity, direction and type
    */
    const MODULATOR_RESOLUTION = 16384;
    const MOD_CURVE_TYPES_AMOUNT = Object.keys(modulatorCurveTypes).length;
    const concave = new Float32Array(MODULATOR_RESOLUTION + 1);
    const convex = new Float32Array(MODULATOR_RESOLUTION + 1);
    concave[0] = 0;
    concave[concave.length - 1] = 1;
    convex[0] = 0;
    convex[convex.length - 1] = 1;
    for (let i = 1; i < MODULATOR_RESOLUTION - 1; i++) {
      const x = -400 / 960 * Math.log(i / (concave.length - 1)) / Math.LN10;
      convex[i] = 1 - x;
      concave[concave.length - 1 - i] = x;
    }
    /**
    * Transforms a value with a given curve type
    * @param transformType the bipolar and negative flags as a 2-bit number: 0bPD (polarity MSB, direction LSB)
    * @param curveType enumeration of curve types
    * @param value the linear value, 0 to 1
    * @returns the transformed value, 0 to 1, or -1 to 1
    */
    function getModulatorCurveValue(transformType, curveType, value) {
      const isBipolar = !!(transformType & 2);
      if (!!(transformType & 1)) value = 1 - value;
      switch (curveType) {
        case modulatorCurveTypes.linear:
          if (isBipolar) return value * 2 - 1;
          return value;
        case modulatorCurveTypes.switch:
          value = value > .5 ? 1 : 0;
          if (isBipolar) return value * 2 - 1;
          return value;
        case modulatorCurveTypes.concave:
          if (isBipolar) {
            value = value * 2 - 1;
            if (value < 0) return -concave[Math.trunc(value * -MODULATOR_RESOLUTION)];
            return concave[Math.trunc(value * MODULATOR_RESOLUTION)];
          }
          return concave[Math.trunc(value * MODULATOR_RESOLUTION)];
        case modulatorCurveTypes.convex:
          if (isBipolar) {
            value = value * 2 - 1;
            if (value < 0) return -convex[Math.trunc(value * -MODULATOR_RESOLUTION)];
            return convex[Math.trunc(value * MODULATOR_RESOLUTION)];
          }
          return convex[Math.trunc(value * MODULATOR_RESOLUTION)];
      }
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/dsp_chain/modulation_envelope.ts
    /**
    * Modulation_envelope.ts
    * purpose: calculates the modulation envelope for the given voice
    */
    const MODENV_PEAK = 1;
    const CONVEX_ATTACK = new Float32Array(1e3);
    for (let i = 0; i < CONVEX_ATTACK.length; i++) CONVEX_ATTACK[i] = getModulatorCurveValue(0, modulatorCurveTypes.convex, i / 1e3);
    var ModulationEnvelope = class {
      /**
      * The attack duration, in seconds.
      */
      attackDuration = 0;
      /**
      * The decay duration, in seconds.
      */
      decayDuration = 0;
      /**
      * The hold duration, in seconds.
      */
      holdDuration = 0;
      /**
      * Release duration, in seconds.
      */
      releaseDuration = 0;
      /**
      * The sustain level 0-1.
      */
      sustainLevel = 0;
      /**
      * Delay phase end time in seconds, absolute (audio context time).
      */
      delayEnd = 0;
      /**
      * Attack phase end time in seconds, absolute (audio context time).
      */
      attackEnd = 0;
      /**
      * Hold phase end time in seconds, absolute (audio context time).
      */
      holdEnd = 0;
      /**
      * The level of the envelope when the release phase starts.
      */
      releaseStartLevel = 0;
      /**
      * The current modulation envelope value.
      */
      currentValue = 0;
      /**
      * If the modulation envelope has ever entered the release phase.
      */
      enteredRelease = false;
      /**
      * Decay phase end time in seconds, absolute (audio context time).
      */
      decayEnd = 0;
      /**
      * Calculates the current modulation envelope value for the given time and voice.
      * @param voice the voice we are working on.
      * @param currentTime in seconds.
      * @returns  mod env value, from 0 to 1.
      */
      process(voice, currentTime) {
        if (this.enteredRelease) {
          if (this.releaseStartLevel === 0) return 0;
          return Math.max(0, (1 - (currentTime - voice.releaseStartTime) / this.releaseDuration) * this.releaseStartLevel);
        }
        if (currentTime < this.delayEnd) this.currentValue = 0;
        else if (currentTime < this.attackEnd) this.currentValue = CONVEX_ATTACK[~~((1 - (this.attackEnd - currentTime) / this.attackDuration) * 1e3)];
        else if (currentTime < this.holdEnd) this.currentValue = MODENV_PEAK;
        else if (currentTime < this.decayEnd) this.currentValue = (1 - (this.decayEnd - currentTime) / this.decayDuration) * (this.sustainLevel - MODENV_PEAK) + MODENV_PEAK;
        else this.currentValue = this.sustainLevel;
        return this.currentValue;
      }
      /**
      * Starts the release phase in the envelope.
      * @param voice the voice this envelope belongs to.
      */
      startRelease(voice) {
        this.releaseStartLevel = this.currentValue;
        this.enteredRelease = true;
        const releaseTime = this.tc2Sec(Math.max(voice.modulatedGenerators[generatorTypes.releaseModEnv], -7200));
        this.releaseDuration = releaseTime * this.releaseStartLevel;
      }
      /**
      * Initializes the modulation envelope.
      * @param voice the voice this envelope belongs to.
      */
      init(voice) {
        this.enteredRelease = false;
        this.sustainLevel = 1 - voice.modulatedGenerators[generatorTypes.sustainModEnv] / 1e3;
        this.attackDuration = this.tc2Sec(voice.modulatedGenerators[generatorTypes.attackModEnv]);
        const decayKeyExcursionCents = (60 - voice.midiNote) * voice.modulatedGenerators[generatorTypes.keyNumToModEnvDecay];
        const decayTime = this.tc2Sec(voice.modulatedGenerators[generatorTypes.decayModEnv] + decayKeyExcursionCents);
        this.decayDuration = decayTime * (1 - this.sustainLevel);
        const holdKeyExcursionCents = (60 - voice.midiNote) * voice.modulatedGenerators[generatorTypes.keyNumToModEnvHold];
        this.holdDuration = this.tc2Sec(holdKeyExcursionCents + voice.modulatedGenerators[generatorTypes.holdModEnv]);
        this.delayEnd = voice.startTime + this.tc2Sec(voice.modulatedGenerators[generatorTypes.delayModEnv]);
        this.attackEnd = this.delayEnd + this.attackDuration;
        this.holdEnd = this.attackEnd + this.holdDuration;
        this.decayEnd = this.holdEnd + this.decayDuration;
      }
      tc2Sec(timecents) {
        if (timecents <= -10114) return 0;
        return timecentsToSeconds(timecents);
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/dsp_chain/wavetable_oscillator.ts
    /**
    * Wavetable_oscillator.ts
    * purpose: plays back raw audio data at an arbitrary playback rate
    */
    var WavetableOscillator = class {
      /**
      * Is the loop on?
      */
      isLooping = false;
      /**
      * Sample data of the voice.
      */
      sampleData;
      /**
      * Playback step (rate) for sample pitch correction.
      */
      playbackStep = 0;
      /**
      * Start position of the loop.
      */
      loopStart = 0;
      /**
      * End position of the loop.
      */
      loopEnd = 0;
      /**
      * Length of the loop.
      * @private
      */
      loopLength = 0;
      /**
      * End position of the sample.
      */
      end = 0;
      /**
      * The current cursor of the sample.
      */
      cursor = 0;
    };
    var LinearOscillator = class extends WavetableOscillator {
      process(sampleCount, tuningRatio, outputBuffer) {
        const step = tuningRatio * this.playbackStep;
        const data = this.sampleData;
        const { loopEnd, loopLength, loopStart, end } = this;
        let cursor = this.cursor;
        if (this.isLooping) for (let i = 0; i < sampleCount; i++) {
          if (cursor > loopStart) cursor = loopStart + (cursor - loopStart) % loopLength;
          const floor = cursor | 0;
          let ceil = floor + 1;
          if (ceil >= loopEnd) ceil -= loopLength;
          const fraction = cursor - floor;
          const upper = data[ceil];
          const lower = data[floor];
          outputBuffer[i] = lower + (upper - lower) * fraction;
          cursor += step;
        }
        else for (let i = 0; i < sampleCount; i++) {
          const floor = cursor | 0;
          const ceil = floor + 1;
          if (ceil >= end) {
            outputBuffer.fill(0, i, sampleCount);
            return false;
          }
          const fraction = cursor - floor;
          const upper = data[ceil];
          const lower = data[floor];
          outputBuffer[i] = lower + (upper - lower) * fraction;
          cursor += step;
        }
        this.cursor = cursor;
        return true;
      }
    };
    var NearestOscillator = class extends WavetableOscillator {
      process(sampleCount, tuningRatio, outputBuffer) {
        const step = tuningRatio * this.playbackStep;
        const sampleData = this.sampleData;
        const { loopLength, loopStart, end } = this;
        let cursor = this.cursor;
        if (this.isLooping) for (let i = 0; i < sampleCount; i++) {
          if (cursor > loopStart) cursor = loopStart + (cursor - loopStart) % loopLength;
          outputBuffer[i] = sampleData[cursor | 0];
          cursor += step;
        }
        else for (let i = 0; i < sampleCount; i++) {
          if (cursor >= end) {
            outputBuffer.fill(0, i, sampleCount);
            return false;
          }
          outputBuffer[i] = sampleData[cursor | 0];
          cursor += step;
        }
        this.cursor = cursor;
        return true;
      }
    };
    var HermiteOscillator = class extends WavetableOscillator {
      process(sampleCount, tuningRatio, outputBuffer) {
        const step = tuningRatio * this.playbackStep;
        const sampleData = this.sampleData;
        const { loopEnd, loopLength, loopStart, end } = this;
        let cursor = this.cursor;
        if (this.isLooping) for (let i = 0; i < sampleCount; i++) {
          if (cursor > loopStart) cursor = loopStart + (cursor - loopStart) % loopLength;
          const y0 = cursor | 0;
          let y1 = y0 + 1;
          let y2 = y0 + 2;
          let y3 = y0 + 3;
          const t = cursor - y0;
          if (y1 >= loopEnd) y1 -= loopLength;
          if (y2 >= loopEnd) y2 -= loopLength;
          if (y3 >= loopEnd) y3 -= loopLength;
          const xm1 = sampleData[y0];
          const x0 = sampleData[y1];
          const x1 = sampleData[y2];
          const x2 = sampleData[y3];
          const c = (x1 - xm1) * .5;
          const v = x0 - x1;
          const w = c + v;
          const a = w + v + (x2 - x0) * .5;
          const b = w + a;
          outputBuffer[i] = ((a * t - b) * t + c) * t + x0;
          cursor += step;
        }
        else for (let i = 0; i < sampleCount; i++) {
          const y0 = cursor | 0;
          const y1 = y0 + 1;
          const y2 = y0 + 2;
          const y3 = y0 + 3;
          const t = cursor - y0;
          if (y3 >= end) {
            outputBuffer.fill(0, i, sampleCount);
            return false;
          }
          const xm1 = sampleData[y0];
          const x0 = sampleData[y1];
          const x1 = sampleData[y2];
          const x2 = sampleData[y3];
          const c = (x1 - xm1) * .5;
          const v = x0 - x1;
          const w = c + v;
          const a = w + v + (x2 - x0) * .5;
          const b = w + a;
          outputBuffer[i] = ((a * t - b) * t + c) * t + x0;
          cursor += step;
        }
        this.cursor = cursor;
        return true;
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/voice.ts
    /**
    * Voice.ts
    * purpose: prepares Voices from sample and generator data
    */
    const EXCLUSIVE_CUTOFF_TIME = -2320;
    /**
    * Voice represents a single instance of the
    * SoundFont2 synthesis model.
    * That is:
    * A wavetable oscillator (sample)
    * A volume envelope (volEnv)
    * A modulation envelope (modEnv)
    * Generators (generators and modulatedGenerators)
    * Modulators (modulators)
    * And MIDI params such as channel, MIDI note, velocity
    */
    var Voice = class {
      /**
      * All oscillators currently available to the voice.
      */
      oscillators = [
        new LinearOscillator(),
        new NearestOscillator(),
        new HermiteOscillator()
      ];
      /**
      * The oscillator currently used by this voice.
      */
      wavetable = this.oscillators[DEFAULT_MASTER_PARAMETERS.interpolationType];
      /**
      * Lowpass filter applied to the voice.
      */
      filter;
      /**
      * The unmodulated (copied to) generators of the voice.
      */
      generators = new Int16Array(GENERATORS_AMOUNT);
      /**
      * The generators in real-time, affected by modulators.
      * This is used during rendering.
      */
      modulatedGenerators = new Int16Array(GENERATORS_AMOUNT);
      /**
      * The voice's modulators.
      */
      modulators = new Array();
      /**
      * The current values for the respective modulators.
      * If there are more modulators, the array must be resized.
      */
      modulatorValues = new Int16Array(64);
      /**
      * Modulation envelope.
      */
      modEnv = new ModulationEnvelope();
      /**
      * Volume envelope.
      */
      volEnv;
      /**
      * Resonance offset, it is affected by the default resonant modulator
      */
      resonanceOffset = 0;
      /**
      * Priority of the voice. Used for stealing.
      */
      priority = 0;
      /**
      * If the voice is currently active.
      * If not, it can be used.
      */
      isActive = false;
      /**
      * Indicates if the voice has rendered at least one buffer.
      * Used for exclusive class to prevent killing voices set on the same note.
      */
      hasRendered = false;
      /**
      * Indicates if the voice is in the release phase.
      */
      isInRelease = false;
      /**
      * Indicates if the voice is currently held by the sustain pedal.
      */
      isHeld = false;
      /**
      * MIDI channel number of the voice.
      */
      channel = 0;
      /**
      * Velocity of the note.
      */
      velocity = 0;
      /**
      * MIDI note number.
      */
      midiNote = 0;
      /**
      * The root key of the voice.
      */
      rootKey = 0;
      /**
      * Target key for the note.
      */
      targetKey = 0;
      /**
      * The pressure of the voice
      */
      pressure = 0;
      /**
      * Linear gain of the voice. Used with Key Modifiers.
      */
      gainModifier = 1;
      /**
      * Looping mode of the sample:
      * 0 - no loop
      * 1 - loop
      * 2 - UNOFFICIAL: polyphone 2.4 added start on release
      * 3 - loop then play when released
      */
      loopingMode = 0;
      /**
      * Start time of the voice, absolute.
      */
      startTime = 0;
      /**
      * Start time of the release phase, absolute.
      */
      releaseStartTime = Infinity;
      /**
      * Current tuning in cents.
      */
      tuningCents = 0;
      /**
      * Current calculated tuning. (as in ratio)
      */
      tuningRatio = 1;
      /**
      * From -500 to 500. Used for smoothing.
      */
      currentPan = 0;
      /**
      * If MIDI Tuning Standard is already applied (at note-on time),
      * this will be used to take the values at real-time tuning as "midiNote"
      * property contains the tuned number.
      * see  SpessaSynth#29 comment by @paulikaro
      */
      realKey = 60;
      /**
      * Initial key to glide from, MIDI Note number. If -1, the portamento is OFF.
      */
      portamentoFromKey = -1;
      /**
      * Duration of the linear glide, in seconds.
      */
      portamentoDuration = 0;
      /**
      * From -500 to 500, where zero means disabled (use the channel pan). Used for random pan.
      */
      overridePan = 0;
      /**
      * In cents, used for drum tuning.
      */
      pitchOffset = 0;
      /**
      * Reverb send of the voice, used for drum parts, otherwise 1.
      */
      reverbSend = 1;
      /**
      * Chorus send of the voice, used for drum parts, otherwise 1.
      */
      chorusSend = 1;
      /**
      * Delay send of the voice, used for drum parts, otherwise 1.
      */
      delaySend = 1;
      /**
      * Exclusive class number for hi-hats etc.
      */
      exclusiveClass = 0;
      /**
      * In timecents, where zero means disabled (use the modulatedGenerators table).
      * Used for exclusive notes and killing notes.
      */
      overrideReleaseVolEnv = 0;
      vibLfoPhase = 0;
      vibLfoStartTime = 0;
      modLfoPhase = 0;
      modLfoStartTime = 0;
      constructor(sampleRate) {
        this.volEnv = new VolumeEnvelope(sampleRate);
        this.filter = new LowpassFilter(sampleRate);
      }
      /**
      * Releases the voice as exclusiveClass.
      */
      exclusiveRelease(currentTime, minExclusiveLength = MIN_EXCLUSIVE_LENGTH) {
        this.overrideReleaseVolEnv = EXCLUSIVE_CUTOFF_TIME;
        this.isInRelease = false;
        this.releaseVoice(currentTime, minExclusiveLength);
      }
      /**
      * Stops the voice
      * @param currentTime
      * @param minNoteLength minimum note length in seconds
      */
      releaseVoice(currentTime, minNoteLength = MIN_NOTE_LENGTH) {
        this.releaseStartTime = currentTime;
        if (this.releaseStartTime - this.startTime < minNoteLength) this.releaseStartTime = this.startTime + minNoteLength;
      }
      setup(currentTime, channel, midiNote, velocity, realKey) {
        this.startTime = currentTime;
        this.isActive = true;
        this.isInRelease = false;
        this.hasRendered = false;
        this.isHeld = false;
        this.releaseStartTime = Infinity;
        this.pressure = 0;
        this.channel = channel;
        this.midiNote = midiNote;
        this.velocity = velocity;
        this.realKey = realKey;
        this.overrideReleaseVolEnv = 0;
        this.portamentoDuration = 0;
        this.portamentoFromKey = -1;
        this.vibLfoPhase = .25;
        this.modLfoPhase = .25;
      }
    };
    //#endregion
    //#region src/utils/byte_functions/bit_mask.ts
    /**
    * Converts a given bit to boolean.
    * @param num The input number.
    * @param bit The index of the bit to convert into bool.
    */
    function bitMaskToBool(num, bit) {
      return (num >> bit & 1) > 0;
    }
    function toNumericBool(bool) {
      return bool ? 1 : 0;
    }
    //#endregion
    //#region src/soundbank/basic_soundbank/modulator_source.ts
    var ModulatorSource = class ModulatorSource {
      /**
      * If this field is set to false, the controller should be mapped with a minimum value of 0 and a maximum value of 1. This is also
      * called Unipolar. Thus, it behaves similar to the Modulation Wheel controller of the MIDI specification.
      *
      * If this field is set to true, the controller sound be mapped with a minimum value of -1 and a maximum value of 1. This is also
      * called Bipolar. Thus, it behaves similar to the Pitch Wheel controller of the MIDI specification.
      */
      isBipolar;
      /**
      * If this field is set true, the direction of the controller should be from the maximum value to the minimum value. So, for
      * example, if the controller source is Key Number, then a Key Number value of 0 corresponds to the maximum possible
      * controller output, and the Key Number value of 127 corresponds to the minimum possible controller input.
      */
      isNegative;
      /**
      * The index of the source.
      * It can point to one of the MIDI controllers or one of the predefined sources, depending on the 'isCC' flag.
      */
      index;
      /**
      * If this field is set to true, the MIDI Controller Palette is selected. The ‘index’ field value corresponds to one of the 128
      * MIDI Continuous Controller messages as defined in the MIDI specification.
      */
      isCC;
      /**
      * This field specifies how the minimum value approaches the maximum value.
      */
      curveType;
      constructor(index = modulatorSources.noController, curveType = modulatorCurveTypes.linear, isCC = false, isBipolar = false, isNegative = false) {
        this.isBipolar = isBipolar;
        this.isNegative = isNegative;
        this.index = index;
        this.isCC = isCC;
        this.curveType = curveType;
      }
      get sourceName() {
        return this.isCC ? Object.keys(midiControllers).find((k) => midiControllers[k] === this.index) ?? this.index.toString() : Object.keys(modulatorSources).find((k) => modulatorSources[k] === this.index) ?? this.index.toString();
      }
      get curveTypeName() {
        return Object.keys(modulatorCurveTypes).find((k) => modulatorCurveTypes[k] === this.curveType) ?? this.curveType.toString();
      }
      static fromSourceEnum(sourceEnum) {
        const isBipolar = bitMaskToBool(sourceEnum, 9);
        const isNegative = bitMaskToBool(sourceEnum, 8);
        const isCC = bitMaskToBool(sourceEnum, 7);
        return new ModulatorSource(sourceEnum & 127, sourceEnum >> 10 & 3, isCC, isBipolar, isNegative);
      }
      /**
      * Copies the modulator source.
      * @param source The source to copy from.
      * @returns the copied source.
      */
      static copyFrom(source) {
        return new ModulatorSource(source.index, source.curveType, source.isCC, source.isBipolar, source.isNegative);
      }
      toString() {
        return `${this.sourceName} ${this.curveTypeName} ${this.isBipolar ? "bipolar" : "unipolar"} ${this.isNegative ? "negative" : "positive"}`;
      }
      toSourceEnum() {
        return this.curveType << 10 | toNumericBool(this.isBipolar) << 9 | toNumericBool(this.isNegative) << 8 | toNumericBool(this.isCC) << 7 | this.index;
      }
      isIdentical(source) {
        return this.index === source.index && this.isNegative === source.isNegative && this.isCC === source.isCC && this.isBipolar === source.isBipolar && this.curveType === source.curveType;
      }
      /**
      * Gets the current value from this source.
      * @param midiControllers The MIDI controller + modulator source array.
      * @param pitchWheel the pitch wheel value, as channel determines if it's a per-note or a global value.
      * @param voice The voice to get the data for.
      */
      getValue(midiControllers, pitchWheel, voice) {
        let rawValue;
        if (this.isCC) rawValue = midiControllers[this.index];
        else switch (this.index) {
          case modulatorSources.noController:
            rawValue = 16383;
            break;
          case modulatorSources.noteOnKeyNum:
            rawValue = voice.midiNote << 7;
            break;
          case modulatorSources.noteOnVelocity:
            rawValue = voice.velocity << 7;
            break;
          case modulatorSources.polyPressure:
            rawValue = voice.pressure << 7;
            break;
          case modulatorSources.pitchWheel:
            rawValue = pitchWheel;
            break;
          default:
            rawValue = midiControllers[this.index + 128];
            break;
        }
        const transformType = (this.isBipolar ? 2 : 0) | (this.isNegative ? 1 : 0);
        return precomputedModulatorTransforms[MODULATOR_RESOLUTION * (this.curveType * MOD_CURVE_TYPES_AMOUNT + transformType) + rawValue];
      }
    };
    /**
    * To get the value, you do
    * MODULATOR_RESOLUTION * (MOD_CURVE_TYPES_AMOUNT * curveType + transformType) + your raw value as 14-bit number (0 - 16,383)
    */
    const precomputedModulatorTransforms = new Float32Array(MODULATOR_RESOLUTION * 4 * MOD_CURVE_TYPES_AMOUNT);
    for (let curveType = 0; curveType < MOD_CURVE_TYPES_AMOUNT; curveType++) for (let transformType = 0; transformType < 4; transformType++) {
      const tableIndex = MODULATOR_RESOLUTION * (curveType * MOD_CURVE_TYPES_AMOUNT + transformType);
      for (let value = 0; value < MODULATOR_RESOLUTION; value++) precomputedModulatorTransforms[tableIndex + value] = getModulatorCurveValue(transformType, curveType, value / MODULATOR_RESOLUTION);
    }
    //#endregion
    //#region src/soundbank/basic_soundbank/modulator.ts
    function getModSourceEnum(curveType, isBipolar, isNegative, isCC, index) {
      return new ModulatorSource(index, curveType, isCC, isBipolar, isNegative).toSourceEnum();
    }
    const DEFAULT_RESONANT_MOD_SOURCE = getModSourceEnum(modulatorCurveTypes.linear, true, false, true, midiControllers.filterResonance);
    var Modulator = class Modulator {
      /**
      * The generator destination of this modulator.
      */
      destination = generatorTypes.initialAttenuation;
      /**
      * The transform amount for this modulator.
      */
      transformAmount = 0;
      /**
      * The transform type for this modulator.
      */
      transformType = 0;
      /**
      * The primary source of this modulator.
      */
      primarySource;
      /**
      * The secondary source of this modulator.
      */
      secondarySource;
      /**
      * Creates a new SF2 Modulator
      */
      constructor(primarySource = new ModulatorSource(), secondarySource = new ModulatorSource(), destination = generatorTypes.INVALID, amount = 0, transformType = 0) {
        this.primarySource = primarySource;
        this.secondarySource = secondarySource;
        this.destination = destination;
        this.transformAmount = amount;
        this.transformType = transformType;
      }
      get destinationName() {
        return Object.keys(generatorTypes).find((k) => generatorTypes[k] === this.destination);
      }
      /**
      * Checks if the pair of modulators is identical (in SF2 terms)
      * @param mod1 modulator 1
      * @param mod2 modulator 2
      * @param checkAmount if the amount should be checked too.
      * @returns if they are identical
      */
      static isIdentical(mod1, mod2, checkAmount = false) {
        return mod1.primarySource.isIdentical(mod2.primarySource) && mod1.secondarySource.isIdentical(mod2.secondarySource) && mod1.destination === mod2.destination && mod1.transformType === mod2.transformType && (!checkAmount || mod1.transformAmount === mod2.transformAmount);
      }
      /**
      * Copies a modulator.
      * @param mod The modulator to copy.
      * @returns The copied modulator.
      */
      static copyFrom(mod) {
        return new Modulator(ModulatorSource.copyFrom(mod.primarySource), ModulatorSource.copyFrom(mod.secondarySource), mod.destination, mod.transformAmount, mod.transformType);
      }
      toString() {
        return `Source: ${this.primarySource.toString()}\nSecondary source: ${this.secondarySource.toString()}\nto: ${this.destinationName}\namount: ${this.transformAmount}` + (this.transformType === 2 ? "absolute value" : "");
      }
      write(modData, indexes) {
        writeWord(modData, this.primarySource.toSourceEnum());
        writeWord(modData, this.destination);
        writeWord(modData, this.transformAmount);
        writeWord(modData, this.secondarySource.toSourceEnum());
        writeWord(modData, this.transformType);
        if (!indexes) return;
        indexes.mod++;
      }
      /**
      * Sums transform and create a NEW modulator
      * @param modulator the modulator to sum with
      * @returns the new modulator
      */
      sumTransform(modulator) {
        const m = Modulator.copyFrom(this);
        m.transformAmount += modulator.transformAmount;
        return m;
      }
    };
    var DecodedModulator = class extends Modulator {
      /**
      * Reads an SF2 modulator
      * @param sourceEnum SF2 source enum
      * @param secondarySourceEnum SF2 secondary source enum
      * @param destination destination
      * @param amount amount
      * @param transformType transform type
      */
      constructor(sourceEnum, secondarySourceEnum, destination, amount, transformType) {
        super(ModulatorSource.fromSourceEnum(sourceEnum), ModulatorSource.fromSourceEnum(secondarySourceEnum), destination, amount, transformType);
        if (this.destination > MAX_GENERATOR) this.destination = generatorTypes.INVALID;
      }
    };
    const DEFAULT_ATTENUATION_MOD_CURVE_TYPE = modulatorCurveTypes.concave;
    const defaultSoundFont2Modulators = [
      new DecodedModulator(getModSourceEnum(DEFAULT_ATTENUATION_MOD_CURVE_TYPE, false, true, false, modulatorSources.noteOnVelocity), 0, generatorTypes.initialAttenuation, 960, 0),
      new DecodedModulator(129, 0, generatorTypes.vibLfoToPitch, 50, 0),
      new DecodedModulator(getModSourceEnum(DEFAULT_ATTENUATION_MOD_CURVE_TYPE, false, true, true, midiControllers.mainVolume), 0, generatorTypes.initialAttenuation, 960, 0),
      new DecodedModulator(13, 0, generatorTypes.vibLfoToPitch, 50, 0),
      new DecodedModulator(526, 16, generatorTypes.fineTune, 12700, 0),
      new DecodedModulator(650, 0, generatorTypes.pan, 500, 0),
      new DecodedModulator(getModSourceEnum(DEFAULT_ATTENUATION_MOD_CURVE_TYPE, false, true, true, midiControllers.expressionController), 0, generatorTypes.initialAttenuation, 960, 0),
      new DecodedModulator(219, 0, generatorTypes.reverbEffectsSend, 200, 0),
      new DecodedModulator(221, 0, generatorTypes.chorusEffectsSend, 200, 0)
    ];
    const defaultSpessaSynthModulators = [
      new DecodedModulator(getModSourceEnum(modulatorCurveTypes.convex, true, false, true, midiControllers.attackTime), 0, generatorTypes.attackVolEnv, 6e3, 0),
      new DecodedModulator(getModSourceEnum(modulatorCurveTypes.linear, true, false, true, midiControllers.releaseTime), 0, generatorTypes.releaseVolEnv, 3600, 0),
      new DecodedModulator(getModSourceEnum(modulatorCurveTypes.linear, true, false, true, midiControllers.decayTime), 0, generatorTypes.decayVolEnv, 3600, 0),
      new DecodedModulator(getModSourceEnum(modulatorCurveTypes.linear, true, false, true, midiControllers.brightness), 0, generatorTypes.initialFilterFc, 9600, 0),
      new DecodedModulator(DEFAULT_RESONANT_MOD_SOURCE, 0, generatorTypes.initialFilterQ, 200, 0),
      new DecodedModulator(getModSourceEnum(modulatorCurveTypes.switch, false, false, true, midiControllers.softPedal), 0, generatorTypes.initialAttenuation, 50, 0),
      new DecodedModulator(getModSourceEnum(modulatorCurveTypes.switch, false, false, true, midiControllers.softPedal), 0, generatorTypes.initialFilterFc, -2400, 0),
      new DecodedModulator(getModSourceEnum(modulatorCurveTypes.linear, true, false, true, midiControllers.balance), 0, generatorTypes.pan, 500, 0)
    ];
    const SPESSASYNTH_DEFAULT_MODULATORS = [...defaultSoundFont2Modulators, ...defaultSpessaSynthModulators];
    //#endregion
    //#region src/soundbank/basic_soundbank/generator.ts
    var Generator = class {
      /**
      * The generator's SF2 type.
      */
      generatorType;
      /**
      * The generator's 16-bit value.
      */
      generatorValue = 0;
      /**
      * Constructs a new generator
      * @param type generator type
      * @param value generator value
      * @param validate if the limits should be validated and clamped.
      */
      constructor(type, value, validate = true) {
        this.generatorType = type;
        if (value === void 0) throw new Error("No value provided.");
        this.generatorValue = Math.round(value);
        if (validate) {
          const lim = generatorLimits[type];
          if (lim !== void 0) this.generatorValue = Math.max(lim.min, Math.min(lim.max, this.generatorValue));
        }
      }
      write(genData) {
        writeWord(genData, this.generatorType);
        writeWord(genData, this.generatorValue);
      }
      toString() {
        return `${Object.keys(generatorTypes).find((k) => generatorTypes[k] === this.generatorType)}: ${this.generatorValue}`;
      }
    };
    //#endregion
    //#region src/soundbank/basic_soundbank/basic_zone.ts
    var BasicZone = class {
      /**
      * The zone's velocity range.
      * min -1 means that it is a default value
      */
      velRange = {
        min: -1,
        max: 127
      };
      /**
      * The zone's key range.
      * min -1 means that it is a default value.
      */
      keyRange = {
        min: -1,
        max: 127
      };
      /**
      * The zone's generators.
      */
      generators = [];
      /**
      * The zone's modulators.
      */
      modulators = [];
      get hasKeyRange() {
        return this.keyRange.min !== -1;
      }
      get hasVelRange() {
        return this.velRange.min !== -1;
      }
      /**
      * The current tuning in cents, taking in both coarse and fine generators.
      */
      get fineTuning() {
        const currentCoarse = this.getGenerator(generatorTypes.coarseTune, 0);
        const currentFine = this.getGenerator(generatorTypes.fineTune, 0);
        return currentCoarse * 100 + currentFine;
      }
      /**
      * The current tuning in cents, taking in both coarse and fine generators.
      */
      set fineTuning(tuningCents) {
        const coarse = Math.trunc(tuningCents / 100);
        const fine = tuningCents % 100;
        this.setGenerator(generatorTypes.coarseTune, coarse);
        this.setGenerator(generatorTypes.fineTune, fine);
      }
      /**
      * Adds to a given generator, or its default value.
      * @param type the generator type.
      * @param value the value to add.
      * @param validate if the value should be clamped to allowed limits.
      */
      addToGenerator(type, value, validate = true) {
        const genValue = this.getGenerator(type, generatorLimits[type].def);
        this.setGenerator(type, value + genValue, validate);
      }
      /**
      * Sets a generator to a given value if preset, otherwise adds a new one.
      * @param type the generator type.
      * @param value the value to set. Set to null to remove this generator (set as "unset").
      * @param validate if the value should be clamped to allowed limits.
      */
      setGenerator(type, value, validate = true) {
        switch (type) {
          case generatorTypes.sampleID: throw new Error("Use setSample()");
          case generatorTypes.instrument: throw new Error("Use setInstrument()");
          case generatorTypes.velRange:
          case generatorTypes.keyRange: throw new Error("Set the range manually");
        }
        if (value === null) {
          this.generators = this.generators.filter((g) => g.generatorType !== type);
          return;
        }
        const index = this.generators.findIndex((g) => g.generatorType === type);
        if (index === -1) this.addGenerators(new Generator(type, value, validate));
        else this.generators[index] = new Generator(type, value, validate);
      }
      /**
      * Adds generators to the zone.
      * @param generators the generators to add.
      */
      addGenerators(...generators) {
        for (const g of generators) switch (g.generatorType) {
          default:
            this.generators.push(g);
            break;
          case generatorTypes.sampleID:
          case generatorTypes.instrument: break;
          case generatorTypes.velRange:
            this.velRange.min = g.generatorValue & 127;
            this.velRange.max = g.generatorValue >> 8 & 127;
            break;
          case generatorTypes.keyRange:
            this.keyRange.min = g.generatorValue & 127;
            this.keyRange.max = g.generatorValue >> 8 & 127;
        }
      }
      /**
      * Adds modulators to the zone.
      * @param modulators the modulators to add.
      */
      addModulators(...modulators) {
        this.modulators.push(...modulators);
      }
      /**
      * Gets a generator value.
      * @param generatorType the generator type.
      * @param notFoundValue if the generator is not found, this value is returned. A default value can be passed here, or null for example,
      * to check if the generator is set.
      */
      getGenerator(generatorType, notFoundValue) {
        return this.generators.find((g) => g.generatorType === generatorType)?.generatorValue ?? notFoundValue;
      }
      copyFrom(zone) {
        this.generators = zone.generators.map((g) => new Generator(g.generatorType, g.generatorValue, false));
        this.modulators = zone.modulators.map(Modulator.copyFrom.bind(Modulator));
        this.velRange = { ...zone.velRange };
        this.keyRange = { ...zone.keyRange };
      }
      /**
      * Filters the generators and prepends the range generators.
      */
      getWriteGenerators(bank) {
        const generators = this.generators.filter((g) => g.generatorType !== generatorTypes.sampleID && g.generatorType !== generatorTypes.instrument && g.generatorType !== generatorTypes.keyRange && g.generatorType !== generatorTypes.velRange);
        if (!bank) throw new Error("No bank provided! ");
        if (this.hasVelRange) generators.unshift(new Generator(generatorTypes.velRange, this.velRange.max << 8 | Math.max(this.velRange.min, 0), false));
        if (this.hasKeyRange) generators.unshift(new Generator(generatorTypes.keyRange, this.keyRange.max << 8 | Math.max(this.keyRange.min, 0), false));
        return generators;
      }
    };
    //#endregion
    //#region src/soundbank/basic_soundbank/basic_global_zone.ts
    var BasicGlobalZone = class extends BasicZone {};
    //#endregion
    //#region src/soundbank/basic_soundbank/basic_sample.ts
    const RESAMPLE_RATE = 48e3;
    var BasicSample = class {
      /**
      * The sample's name.
      */
      name;
      /**
      * Sample rate in Hz.
      */
      sampleRate;
      /**
      * Original pitch of the sample as a MIDI note number.
      */
      originalKey;
      /**
      * Pitch correction, in cents. Can be negative.
      */
      pitchCorrection;
      /**
      * Linked sample, unused if mono.
      */
      linkedSample;
      /**
      * The type of the sample.
      */
      sampleType;
      /**
      * Relative to the start of the sample in sample points.
      */
      loopStart;
      /**
      * Relative to the start of the sample in sample points.
      */
      loopEnd;
      /**
      * Sample's linked instruments (the instruments that use it)
      * note that duplicates are allowed since one instrument can use the same sample multiple times.
      */
      linkedTo = [];
      /**
      * Indicates if the data was overridden, so it cannot be copied back unchanged.
      */
      dataOverridden = true;
      /**
      * The compressed sample data if the sample has been compressed.
      */
      compressedData;
      /**
      * The sample's audio data.
      */
      audioData;
      /**
      * The basic representation of a sample
      * @param sampleName The sample's name
      * @param sampleRate The sample's rate in Hz
      * @param originalKey The sample's pitch as a MIDI note number
      * @param pitchCorrection The sample's pitch correction in cents
      * @param sampleType The sample's type, an enum that can indicate SF3
      * @param loopStart The sample's loop start relative to the sample start in sample points
      * @param loopEnd The sample's loop end relative to the sample start in sample points
      */
      constructor(sampleName, sampleRate, originalKey, pitchCorrection, sampleType, loopStart, loopEnd) {
        this.name = sampleName;
        this.sampleRate = sampleRate;
        this.originalKey = originalKey;
        this.pitchCorrection = pitchCorrection;
        this.loopStart = loopStart;
        this.loopEnd = loopEnd;
        this.sampleType = sampleType;
      }
      /**
      * Indicates if the sample is compressed using vorbis SF3.
      */
      get isCompressed() {
        return this.compressedData !== void 0;
      }
      /**
      * If the sample is linked to another sample.
      */
      get isLinked() {
        return this.sampleType === sampleTypes.rightSample || this.sampleType === sampleTypes.leftSample || this.sampleType === sampleTypes.linkedSample;
      }
      /**
      * The sample's use count
      */
      get useCount() {
        return this.linkedTo.length;
      }
      /**
      * Get raw data for writing the file, either a compressed bit stream or signed 16-bit little endian PCM data.
      * @param allowVorbis if vorbis file data is allowed.
      * @return either s16le or vorbis data.
      */
      getRawData(allowVorbis) {
        if (this.compressedData && allowVorbis && !this.dataOverridden) return this.compressedData;
        return this.encodeS16LE();
      }
      /**
      * Resamples the audio data to a given sample rate.
      */
      resampleData(newSampleRate) {
        let audioData = this.getAudioData();
        const ratio = newSampleRate / this.sampleRate;
        const resampled = new Float32Array(Math.floor(audioData.length * ratio));
        for (let i = 0; i < resampled.length; i++) resampled[i] = audioData[Math.floor(i * (1 / ratio))];
        audioData = resampled;
        this.sampleRate = newSampleRate;
        this.loopStart = Math.floor(this.loopStart * ratio);
        this.loopEnd = Math.floor(this.loopEnd * ratio);
        this.audioData = audioData;
      }
      /**
      * Compresses the audio data
      * @param encodeVorbis the compression function to use when compressing
      */
      async compressSample(encodeVorbis) {
        if (this.isCompressed) return;
        try {
          let audioData = this.getAudioData();
          if (this.sampleRate < 8e3 || this.sampleRate > 96e3) {
            this.resampleData(RESAMPLE_RATE);
            audioData = this.getAudioData();
          }
          const compressed = await encodeVorbis(audioData, this.sampleRate);
          this.setCompressedData(compressed);
        } catch (error) {
          SpessaSynthWarn(`Failed to compress ${this.name}. Leaving as uncompressed!`, error);
          this.compressedData = void 0;
        }
      }
      /**
      * Sets the sample type and unlinks if needed.
      * @param type The type to set it to.
      */
      setSampleType(type) {
        this.sampleType = type;
        if (!this.isLinked) {
          if (this.linkedSample) {
            this.linkedSample.linkedSample = void 0;
            this.linkedSample.sampleType = type;
          }
          this.linkedSample = void 0;
        }
        if ((type & 32768) > 0) throw new Error("ROM samples are not supported.");
      }
      /**
      * Unlinks the sample from its stereo link if it has any.
      */
      unlinkSample() {
        this.setSampleType(sampleTypes.monoSample);
      }
      /**
      * Links a stereo sample.
      * @param sample the sample to link to.
      * @param type either left, right or linked.
      */
      setLinkedSample(sample, type) {
        if (sample.linkedSample) throw new Error(`${sample.name} is linked tp ${sample.linkedSample.name}. Unlink it first.`);
        this.linkedSample = sample;
        sample.linkedSample = this;
        switch (type) {
          case sampleTypes.leftSample:
            this.setSampleType(sampleTypes.leftSample);
            sample.setSampleType(sampleTypes.rightSample);
            break;
          case sampleTypes.rightSample:
            this.setSampleType(sampleTypes.rightSample);
            sample.setSampleType(sampleTypes.leftSample);
            break;
          case sampleTypes.linkedSample:
            this.setSampleType(sampleTypes.linkedSample);
            sample.setSampleType(sampleTypes.linkedSample);
            break;
          default: throw new Error("Invalid sample type: " + type);
        }
      }
      /**
      * Links the sample to a given instrument
      * @param instrument the instrument to link to
      */
      linkTo(instrument) {
        this.linkedTo.push(instrument);
      }
      /**
      * Unlinks the sample from a given instrument
      * @param instrument the instrument to unlink from
      */
      unlinkFrom(instrument) {
        const index = this.linkedTo.indexOf(instrument);
        if (index === -1) {
          SpessaSynthWarn(`Cannot unlink ${instrument.name} from ${this.name}: not linked.`);
          return;
        }
        this.linkedTo.splice(index, 1);
      }
      /**
      * Get the float32 audio data.
      * Note that this either decodes the compressed data or passes the ready sampleData.
      * If neither are set then it will throw an error!
      * @returns the audio data
      */
      getAudioData() {
        if (this.audioData) return this.audioData;
        if (this.isCompressed) {
          this.audioData = this.decodeVorbis();
          return this.audioData;
        }
        throw new Error("Sample data is undefined for a BasicSample instance.");
      }
      /**
      * Replaces the audio data *in-place*.
      * @param audioData The new audio data as Float32.
      * @param sampleRate The new sample rate, in Hertz.
      */
      setAudioData(audioData, sampleRate) {
        this.audioData = audioData;
        this.sampleRate = sampleRate;
        this.dataOverridden = true;
        this.compressedData = void 0;
      }
      /**
      * Replaces the audio with a compressed data sample and flags the sample as compressed
      * @param data the new compressed data
      */
      setCompressedData(data) {
        this.audioData = void 0;
        this.compressedData = data;
        this.dataOverridden = false;
      }
      /**
      * Encodes s16le sample
      * @return the encoded data
      */
      encodeS16LE() {
        const data = this.getAudioData();
        const data16 = new Int16Array(data.length);
        const len = data.length;
        for (let i = 0; i < len; i++) {
          let sample = data[i] * 32768;
          if (sample > 32767) sample = 32767;
          else if (sample < -32768) sample = -32768;
          data16[i] = sample;
        }
        return new IndexedByteArray(data16.buffer);
      }
      /**
      * Decode binary vorbis into a float32 pcm
      */
      decodeVorbis() {
        if (this.audioData) return this.audioData;
        if (!this.compressedData) throw new Error("Compressed data is missing.");
        try {
          const decoded = stb.decode(this.compressedData).data[0];
          if (decoded === void 0) {
            SpessaSynthWarn(`Error decoding sample ${this.name}: Vorbis decode returned undefined.`);
            return new Float32Array(0);
          }
          for (let i = 0; i < decoded.length; i++) decoded[i] = Math.max(-1, Math.min(decoded[i], .999969482421875));
          return decoded;
        } catch (error) {
          SpessaSynthWarn(`Error decoding sample ${this.name}: ${error}`);
          return new Float32Array(this.loopEnd + 1);
        }
      }
    };
    var EmptySample = class extends BasicSample {
      /**
      * A simplified class for creating samples.
      */
      constructor() {
        super("", 44100, 60, 0, sampleTypes.monoSample, 0, 0);
      }
    };
    //#endregion
    //#region src/soundbank/basic_soundbank/basic_instrument_zone.ts
    var BasicInstrumentZone = class extends BasicZone {
      /**
      * The instrument this zone belongs to.
      */
      parentInstrument;
      /**
      * For tracking on the individual zone level, since multiple presets can refer to the same instrument.
      */
      useCount;
      /**
      * Creates a new instrument zone.
      * @param instrument The parent instrument.
      * @param sample The sample to use in this zone.
      */
      constructor(instrument, sample) {
        super();
        this.parentInstrument = instrument;
        this._sample = sample;
        sample.linkTo(this.parentInstrument);
        this.useCount = instrument.useCount;
      }
      /**
      * Zone's sample.
      */
      _sample;
      /**
      * Zone's sample.
      */
      get sample() {
        return this._sample;
      }
      /**
      * Sets a sample for this zone.
      * @param sample the sample to set.
      */
      set sample(sample) {
        if (this._sample) this._sample.unlinkFrom(this.parentInstrument);
        this._sample = sample;
        sample.linkTo(this.parentInstrument);
      }
      getWriteGenerators(bank) {
        const gens = super.getWriteGenerators(bank);
        const sampleID = bank.samples.indexOf(this.sample);
        if (sampleID === -1) throw new Error(`${this.sample.name} does not exist in ${bank.soundBankInfo.name}! Cannot write sampleID generator.`);
        gens.push(new Generator(generatorTypes.sampleID, sampleID, false));
        return gens;
      }
    };
    //#endregion
    //#region src/soundbank/basic_soundbank/basic_preset_zone.ts
    var BasicPresetZone = class extends BasicZone {
      /**
      * The preset this zone belongs to.
      */
      parentPreset;
      /**
      * Creates a new preset zone.
      * @param preset the preset this zone belongs to.
      * @param instrument the instrument to use in this zone.
      */
      constructor(preset, instrument) {
        super();
        this.parentPreset = preset;
        this._instrument = instrument;
        this._instrument.linkTo(this.parentPreset);
      }
      /**
      * Zone's instrument.
      */
      _instrument;
      /**
      * Zone's instrument.
      */
      get instrument() {
        return this._instrument;
      }
      /**
      * Zone's instrument.
      */
      set instrument(instrument) {
        if (this._instrument) this._instrument.unlinkFrom(this.parentPreset);
        this._instrument = instrument;
        this._instrument.linkTo(this.parentPreset);
      }
      getWriteGenerators(bank) {
        const gens = super.getWriteGenerators(bank);
        if (!bank) throw new Error("Instrument ID cannot be determined without the sound bank itself.");
        const instrumentID = bank.instruments.indexOf(this.instrument);
        if (instrumentID === -1) throw new Error(`${this.instrument.name} does not exist in ${bank.soundBankInfo.name}! Cannot write instrument generator.`);
        gens.push(new Generator(generatorTypes.instrument, instrumentID, false));
        return gens;
      }
    };
    //#endregion
    //#region src/soundbank/basic_soundbank/basic_preset.ts
    var BasicPreset = class BasicPreset {
      /**
      * The parent soundbank instance
      * Currently used for determining default modulators and XG status
      */
      parentSoundBank;
      /**
      * The preset's name
      */
      name = "";
      program = 0;
      bankMSB = 0;
      bankLSB = 0;
      isGMGSDrum = false;
      /**
      * The preset's zones
      */
      zones = [];
      /**
      * Preset's global zone
      */
      globalZone;
      /**
      * Unused metadata
      */
      library = 0;
      /**
      * Unused metadata
      */
      genre = 0;
      /**
      * Unused metadata
      */
      morphology = 0;
      /**
      * Creates a new preset representation.
      * @param parentSoundBank the sound bank this preset belongs to.
      * @param globalZone optional, a global zone to use.
      */
      constructor(parentSoundBank, globalZone = new BasicGlobalZone()) {
        this.parentSoundBank = parentSoundBank;
        this.globalZone = globalZone;
      }
      get isXGDrums() {
        return this.parentSoundBank.isXGBank && BankSelectHacks.isXGDrums(this.bankMSB);
      }
      /**
      * Checks if this preset is a drum preset
      */
      get isAnyDrums() {
        const xg = this.parentSoundBank.isXGBank;
        return this.isGMGSDrum || xg && BankSelectHacks.isXGDrums(this.bankMSB);
      }
      static isInRange(range, number) {
        return number >= range.min && number <= range.max;
      }
      static addUniqueModulators(main, adder) {
        for (const addedMod of adder) if (!main.some((mm) => Modulator.isIdentical(addedMod, mm))) main.push(addedMod);
      }
      static subtractRanges(r1, r2) {
        return {
          min: Math.max(r1.min, r2.min),
          max: Math.min(r1.max, r2.max)
        };
      }
      /**
      * Unlinks everything from this preset.
      */
      delete() {
        for (const z of this.zones) z.instrument?.unlinkFrom(this);
      }
      /**
      * Deletes an instrument zone from this preset.
      * @param index the zone's index to delete.
      */
      deleteZone(index) {
        this.zones[index]?.instrument?.unlinkFrom(this);
        this.zones.splice(index, 1);
      }
      /**
      * Creates a new preset zone and returns it.
      * @param instrument the instrument to use in the zone.
      */
      createZone(instrument) {
        const z = new BasicPresetZone(this, instrument);
        this.zones.push(z);
        return z;
      }
      /**
      * Preloads (loads and caches synthesis data) for a given key range.
      */
      preload(keyMin, keyMax) {
        for (let key = keyMin; key < keyMax + 1; key++) for (let velocity = 0; velocity < 128; velocity++) for (const synthesisData of this.getVoiceParameters(key, velocity)) synthesisData.sample.getAudioData();
      }
      /**
      * Checks if the bank and program numbers are the same for the given preset as this one.
      * @param preset The preset to check.
      */
      matches(preset) {
        return MIDIPatchTools.matches(this, preset);
      }
      /**
      * Returns the voice synthesis data for this preset.
      * @param midiNote the MIDI note number.
      * @param velocity the MIDI velocity.
      * @returns the returned sound data.
      */
      getVoiceParameters(midiNote, velocity) {
        const voiceParameters = new Array();
        for (const presetZone of this.zones) {
          if (!BasicPreset.isInRange(presetZone.hasKeyRange ? presetZone.keyRange : this.globalZone.keyRange, midiNote) || !BasicPreset.isInRange(presetZone.hasVelRange ? presetZone.velRange : this.globalZone.velRange, velocity)) continue;
          const instrument = presetZone.instrument;
          if (!instrument || instrument.zones.length === 0) continue;
          const presetGenerators = new Int16Array(GENERATORS_AMOUNT);
          for (const generator of this.globalZone.generators) presetGenerators[generator.generatorType] = generator.generatorValue;
          for (const generator of presetZone.generators) presetGenerators[generator.generatorType] = generator.generatorValue;
          const presetModulators = [...presetZone.modulators];
          BasicPreset.addUniqueModulators(presetModulators, this.globalZone.modulators);
          for (const instZone of instrument.zones) {
            if (!BasicPreset.isInRange(instZone.hasKeyRange ? instZone.keyRange : instrument.globalZone.keyRange, midiNote) || !BasicPreset.isInRange(instZone.hasVelRange ? instZone.velRange : instrument.globalZone.velRange, velocity)) continue;
            const modulators = [...instZone.modulators];
            BasicPreset.addUniqueModulators(modulators, instrument.globalZone.modulators);
            BasicPreset.addUniqueModulators(modulators, this.parentSoundBank.defaultModulators);
            for (const presetMod of presetModulators) {
              const matchIndex = modulators.findIndex((m) => Modulator.isIdentical(presetMod, m));
              if (matchIndex === -1) modulators.push(presetMod);
              else modulators[matchIndex] = modulators[matchIndex].sumTransform(presetMod);
            }
            const generators = new Int16Array(defaultGeneratorValues);
            for (const generator of instrument.globalZone.generators) generators[generator.generatorType] = generator.generatorValue;
            for (const generator of instZone.generators) generators[generator.generatorType] = generator.generatorValue;
            for (let i = 0; i < generators.length; i++) generators[i] = Math.max(-32768, Math.min(32767, generators[i] + presetGenerators[i]));
            generators[generatorTypes.initialAttenuation] = Math.floor(generators[generatorTypes.initialAttenuation] * .4);
            voiceParameters.push({
              sample: instZone.sample,
              generators,
              modulators
            });
          }
        }
        return voiceParameters;
      }
      /**
      * BankMSB:bankLSB:program:isGMGSDrum
      */
      toMIDIString() {
        return MIDIPatchTools.toMIDIString(this);
      }
      toString() {
        return MIDIPatchTools.toNamedMIDIString(this);
      }
      /**
      * Combines preset into an instrument, flattening the preset zones into instrument zones.
      * This is a really complex function that attempts to work around the DLS limitations of only having the instrument layer.
      * @returns The instrument containing the flattened zones. In theory, it should exactly the same as this preset.
      */
      toFlattenedInstrument() {
        const addUnique = (main, adder) => {
          main.push(...adder.filter((g) => !main.some((mg) => mg.generatorType === g.generatorType)));
        };
        const addUniqueMods = (main, adder) => {
          main.push(...adder.filter((m) => !main.some((mm) => Modulator.isIdentical(m, mm))));
        };
        const outputInstrument = new BasicInstrument();
        outputInstrument.name = this.name;
        const globalPresetGenerators = [];
        const globalPresetModulators = [];
        const globalPresetZone = this.globalZone;
        globalPresetGenerators.push(...globalPresetZone.generators);
        globalPresetModulators.push(...globalPresetZone.modulators);
        const globalPresetKeyRange = globalPresetZone.keyRange;
        const globalPresetVelRange = globalPresetZone.velRange;
        for (const presetZone of this.zones) {
          if (!presetZone.instrument) throw new Error("No instrument in a preset zone.");
          let presetZoneKeyRange = presetZone.keyRange;
          if (!presetZone.hasKeyRange) presetZoneKeyRange = globalPresetKeyRange;
          let presetZoneVelRange = presetZone.velRange;
          if (!presetZone.hasVelRange) presetZoneVelRange = globalPresetVelRange;
          const presetGenerators = presetZone.generators.map((g) => new Generator(g.generatorType, g.generatorValue));
          addUnique(presetGenerators, globalPresetGenerators);
          const presetModulators = [...presetZone.modulators];
          addUniqueMods(presetModulators, globalPresetModulators);
          const instrument = presetZone.instrument;
          const iZones = instrument.zones;
          const globalInstGenerators = [];
          const globalInstModulators = [];
          const globalInstZone = instrument.globalZone;
          globalInstGenerators.push(...globalInstZone.generators);
          globalInstModulators.push(...globalInstZone.modulators);
          const globalInstKeyRange = globalInstZone.keyRange;
          const globalInstVelRange = globalInstZone.velRange;
          for (const instZone of iZones) {
            if (!instZone.sample) throw new Error("No sample in an instrument zone.");
            let instZoneKeyRange = instZone.keyRange;
            if (!instZone.hasKeyRange) instZoneKeyRange = globalInstKeyRange;
            let instZoneVelRange = instZone.velRange;
            if (!instZone.hasVelRange) instZoneVelRange = globalInstVelRange;
            instZoneKeyRange = BasicPreset.subtractRanges(instZoneKeyRange, presetZoneKeyRange);
            instZoneVelRange = BasicPreset.subtractRanges(instZoneVelRange, presetZoneVelRange);
            if (instZoneKeyRange.max < instZoneKeyRange.min || instZoneVelRange.max < instZoneVelRange.min) continue;
            const instGenerators = instZone.generators.map((g) => new Generator(g.generatorType, g.generatorValue));
            addUnique(instGenerators, globalInstGenerators);
            const instModulators = [...instZone.modulators];
            addUniqueMods(instModulators, globalInstModulators);
            /**
            * Sum preset modulators to instruments (amount) sf spec page 54
            */
            const finalModList = [...instModulators];
            for (const mod of presetModulators) {
              const identicalInstMod = finalModList.findIndex((m) => Modulator.isIdentical(mod, m));
              if (identicalInstMod === -1) finalModList.push(mod);
              else finalModList[identicalInstMod] = finalModList[identicalInstMod].sumTransform(mod);
            }
            let finalGenList = instGenerators.map((g) => new Generator(g.generatorType, g.generatorValue));
            for (const gen of presetGenerators) {
              if (gen.generatorType === generatorTypes.velRange || gen.generatorType === generatorTypes.keyRange || gen.generatorType === generatorTypes.instrument || gen.generatorType === generatorTypes.endOper || gen.generatorType === generatorTypes.sampleModes) continue;
              const identicalInstGen = instGenerators.findIndex((g) => g.generatorType === gen.generatorType);
              if (identicalInstGen === -1) {
                const newAmount = generatorLimits[gen.generatorType].def + gen.generatorValue;
                finalGenList.push(new Generator(gen.generatorType, newAmount));
              } else {
                const newAmount = finalGenList[identicalInstGen].generatorValue + gen.generatorValue;
                finalGenList[identicalInstGen] = new Generator(gen.generatorType, newAmount);
              }
            }
            finalGenList = finalGenList.filter((g) => g.generatorType !== generatorTypes.sampleID && g.generatorType !== generatorTypes.keyRange && g.generatorType !== generatorTypes.velRange && g.generatorType !== generatorTypes.endOper && g.generatorType !== generatorTypes.instrument && g.generatorValue !== generatorLimits[g.generatorType].def);
            const zone = outputInstrument.createZone(instZone.sample);
            zone.keyRange = instZoneKeyRange;
            zone.velRange = instZoneVelRange;
            if (zone.keyRange.min === 0 && zone.keyRange.max === 127) zone.keyRange.min = -1;
            if (zone.velRange.min === 0 && zone.velRange.max === 127) zone.velRange.min = -1;
            zone.addGenerators(...finalGenList);
            zone.addModulators(...finalModList);
          }
        }
        return outputInstrument;
      }
      /**
      * Writes the SF2 header
      * @param phdrData
      * @param index
      */
      write(phdrData, index) {
        SpessaSynthInfo(`%cWriting ${this.name}...`, consoleColors.info);
        writeBinaryStringIndexed(phdrData.pdta, this.name.slice(0, 20), 20);
        writeBinaryStringIndexed(phdrData.xdta, this.name.slice(20), 20);
        writeWord(phdrData.pdta, this.program);
        let wBank = this.bankMSB;
        if (this.isGMGSDrum) wBank = 128;
        else if (this.bankMSB === 0) wBank = this.bankLSB;
        writeWord(phdrData.pdta, wBank);
        phdrData.xdta.currentIndex += 4;
        writeWord(phdrData.pdta, index & 65535);
        writeWord(phdrData.xdta, index >> 16);
        writeDword(phdrData.pdta, this.library);
        writeDword(phdrData.pdta, this.genre);
        writeDword(phdrData.pdta, this.morphology);
        phdrData.xdta.currentIndex += 12;
      }
    };
    //#endregion
    //#region src/soundbank/basic_soundbank/basic_instrument.ts
    const notGlobalizedTypes = new Set([
      generatorTypes.velRange,
      generatorTypes.keyRange,
      generatorTypes.instrument,
      generatorTypes.sampleID,
      generatorTypes.exclusiveClass,
      generatorTypes.endOper,
      generatorTypes.sampleModes,
      generatorTypes.startloopAddrsOffset,
      generatorTypes.startloopAddrsCoarseOffset,
      generatorTypes.endloopAddrsOffset,
      generatorTypes.endloopAddrsCoarseOffset,
      generatorTypes.startAddrsOffset,
      generatorTypes.startAddrsCoarseOffset,
      generatorTypes.endAddrOffset,
      generatorTypes.endAddrsCoarseOffset,
      generatorTypes.initialAttenuation,
      generatorTypes.fineTune,
      generatorTypes.coarseTune,
      generatorTypes.keyNumToVolEnvHold,
      generatorTypes.keyNumToVolEnvDecay,
      generatorTypes.keyNumToModEnvHold,
      generatorTypes.keyNumToModEnvDecay
    ]);
    /**
    * Represents a single instrument
    */
    var BasicInstrument = class {
      /**
      * The instrument's name
      */
      name = "";
      /**
      * The instrument's zones
      */
      zones = [];
      /**
      * Instrument's global zone
      */
      globalZone = new BasicGlobalZone();
      /**
      * Instrument's linked presets (the presets that use it)
      * note that duplicates are allowed since one preset can use the same instrument multiple times.
      */
      linkedTo = [];
      /**
      * How many presets is this instrument used by
      */
      get useCount() {
        return this.linkedTo.length;
      }
      /**
      * Creates a new instrument zone and returns it.
      * @param sample The sample to use in the zone.
      */
      createZone(sample) {
        const zone = new BasicInstrumentZone(this, sample);
        this.zones.push(zone);
        return zone;
      }
      /**
      * Links the instrument ta a given preset
      * @param preset the preset to link to
      */
      linkTo(preset) {
        this.linkedTo.push(preset);
        for (const z of this.zones) z.useCount++;
      }
      /**
      * Unlinks the instrument from a given preset
      * @param preset the preset to unlink from
      */
      unlinkFrom(preset) {
        const index = this.linkedTo.indexOf(preset);
        if (index === -1) {
          SpessaSynthWarn(`Cannot unlink ${preset.name} from ${this.name}: not linked.`);
          return;
        }
        this.linkedTo.splice(index, 1);
        for (const z of this.zones) z.useCount--;
      }
      deleteUnusedZones() {
        this.zones = this.zones.filter((z) => {
          const stays = z.useCount > 0;
          if (!stays) z.sample.unlinkFrom(this);
          return stays;
        });
      }
      delete() {
        if (this.useCount > 0) throw new Error(`Cannot delete an instrument that is used by: ${this.linkedTo.map((p) => p.name).toString()}.`);
        for (const z of this.zones) z.sample.unlinkFrom(this);
      }
      /**
      * Deletes a given instrument zone if it has no uses
      * @param index the index of the zone to delete
      * @param force ignores the use count and deletes forcibly
      * @returns if the zone has been deleted
      */
      deleteZone(index, force = false) {
        const zone = this.zones[index];
        zone.useCount -= 1;
        if (zone.useCount < 1 || force) {
          zone.sample.unlinkFrom(this);
          this.zones.splice(index, 1);
          return true;
        }
        return false;
      }
      /**
      * Globalizes the instrument *in-place.*
      * This means trying to move as many generators and modulators
      * to the global zone as possible to reduce clutter and the count of parameters.
      */
      globalize() {
        const globalZone = this.globalZone;
        for (let checkedType = 0; checkedType < 58; checkedType++) {
          if (notGlobalizedTypes.has(checkedType)) continue;
          checkedType = checkedType;
          let occurrencesForValues = {};
          const defaultForChecked = generatorLimits[checkedType]?.def || 0;
          occurrencesForValues[defaultForChecked] = 0;
          for (const zone of this.zones) {
            const value = zone.getGenerator(checkedType, void 0);
            if (value === void 0) occurrencesForValues[defaultForChecked]++;
            else if (occurrencesForValues[value] === void 0) occurrencesForValues[value] = 1;
            else occurrencesForValues[value]++;
            let relativeCounterpart;
            switch (checkedType) {
              default: continue;
              case generatorTypes.decayVolEnv:
                relativeCounterpart = generatorTypes.keyNumToVolEnvDecay;
                break;
              case generatorTypes.holdVolEnv:
                relativeCounterpart = generatorTypes.keyNumToVolEnvHold;
                break;
              case generatorTypes.decayModEnv:
                relativeCounterpart = generatorTypes.keyNumToModEnvDecay;
                break;
              case generatorTypes.holdModEnv: relativeCounterpart = generatorTypes.keyNumToModEnvHold;
            }
            if (zone.getGenerator(relativeCounterpart, void 0) !== void 0) {
              occurrencesForValues = {};
              break;
            }
          }
          if (Object.keys(occurrencesForValues).length > 0) {
            let valueToGlobalize = ["0", 0];
            for (const [value, count] of Object.entries(occurrencesForValues)) if (count > valueToGlobalize[1]) valueToGlobalize = [value, count];
            const targetValue = Number.parseInt(valueToGlobalize[0]);
            if (targetValue !== defaultForChecked) globalZone.setGenerator(checkedType, targetValue, false);
            for (const z of this.zones) {
              const genValue = z.getGenerator(checkedType, void 0);
              if (genValue === void 0) {
                if (targetValue !== defaultForChecked) z.setGenerator(checkedType, defaultForChecked);
              } else if (genValue === targetValue) z.setGenerator(checkedType, null);
            }
          }
        }
        const modulators = this.zones[0].modulators.map((m) => Modulator.copyFrom(m));
        for (const checkedModulator of modulators) {
          let existsForAllZones = true;
          for (const zone of this.zones) {
            if (!existsForAllZones) continue;
            if (!zone.modulators.find((m) => Modulator.isIdentical(m, checkedModulator))) existsForAllZones = false;
          }
          if (existsForAllZones) {
            globalZone.addModulators(Modulator.copyFrom(checkedModulator));
            for (const zone of this.zones) {
              const modulator = zone.modulators.find((m) => Modulator.isIdentical(m, checkedModulator));
              if (!modulator) continue;
              if (modulator.transformAmount === checkedModulator.transformAmount) zone.modulators.splice(zone.modulators.indexOf(modulator), 1);
            }
          }
        }
      }
      write(instData, index) {
        SpessaSynthInfo(`%cWriting ${this.name}...`, consoleColors.info);
        writeBinaryStringIndexed(instData.pdta, this.name.slice(0, 20), 20);
        writeBinaryStringIndexed(instData.xdta, this.name.slice(20), 20);
        writeWord(instData.pdta, index & 65535);
        writeWord(instData.xdta, index >>> 16);
      }
    };
    //#endregion
    //#region src/soundbank/soundfont/write/sdta.ts
    const SDTA_TO_DATA_OFFSET = 20;
    async function getSDTA(bank, smplStartOffsets, smplEndOffsets, compress, decompress, vorbisFunc, progressFunc) {
      let writtenCount = 0;
      let smplChunkSize = 0;
      const sampleDatas = [];
      for (const s of bank.samples) {
        if (compress && vorbisFunc) await s.compressSample(vorbisFunc);
        if (decompress) s.setAudioData(s.getAudioData(), s.sampleRate);
        const r = s.getRawData(true);
        writtenCount++;
        await progressFunc?.(s.name, writtenCount, bank.samples.length);
        SpessaSynthInfo(`%cEncoded sample %c${writtenCount}. ${s.name}%c of %c${bank.samples.length}%c. Compressed: %c${s.isCompressed}%c.`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized, consoleColors.info, s.isCompressed ? consoleColors.recognized : consoleColors.unrecognized, consoleColors.info);
        smplChunkSize += r.length + (s.isCompressed ? 0 : 92);
        sampleDatas.push(r);
      }
      if (smplChunkSize % 2 !== 0) smplChunkSize++;
      const sdta = new IndexedByteArray(smplChunkSize + SDTA_TO_DATA_OFFSET);
      writeBinaryStringIndexed(sdta, "LIST");
      writeLittleEndianIndexed(sdta, smplChunkSize + SDTA_TO_DATA_OFFSET - 8, 4);
      writeBinaryStringIndexed(sdta, "sdta");
      writeBinaryStringIndexed(sdta, "smpl");
      writeLittleEndianIndexed(sdta, smplChunkSize, 4);
      let offset = 0;
      for (const [i, sample] of bank.samples.entries()) {
        const data = sampleDatas[i];
        sdta.set(data, offset + SDTA_TO_DATA_OFFSET);
        let startOffset;
        let endOffset;
        if (sample.isCompressed) {
          startOffset = offset;
          endOffset = startOffset + data.length;
        } else {
          startOffset = offset / 2;
          endOffset = startOffset + data.length / 2;
          offset += 92;
        }
        offset += data.length;
        smplStartOffsets.push(startOffset);
        smplEndOffsets.push(endOffset);
      }
      return sdta;
    }
    var SoundFontSample = class extends BasicSample {
      /**
      * Linked sample index for retrieving linked samples in sf2
      */
      linkedSampleIndex;
      /**
      * The sliced sample from the smpl chunk.
      */
      s16leData;
      startByteOffset;
      endByteOffset;
      sampleID;
      /**
      * Creates a sample
      * @param sampleName
      * @param sampleStartIndex
      * @param sampleEndIndex
      * @param sampleLoopStartIndex
      * @param sampleLoopEndIndex
      * @param sampleRate
      * @param samplePitch
      * @param samplePitchCorrection
      * @param linkedSampleIndex
      * @param sampleType
      * @param sampleDataArray
      * @param sampleIndex initial sample index when loading the sfont
      * Used for SF2Pack support
      */
      constructor(sampleName, sampleStartIndex, sampleEndIndex, sampleLoopStartIndex, sampleLoopEndIndex, sampleRate, samplePitch, samplePitchCorrection, linkedSampleIndex, sampleType, sampleDataArray, sampleIndex) {
        const compressed = (sampleType & 16) > 0;
        sampleType &= -17;
        super(sampleName, sampleRate, samplePitch, samplePitchCorrection, sampleType, sampleLoopStartIndex - sampleStartIndex / 2, sampleLoopEndIndex - sampleStartIndex / 2);
        this.dataOverridden = false;
        this.name = sampleName;
        this.startByteOffset = sampleStartIndex;
        this.endByteOffset = sampleEndIndex;
        this.sampleID = sampleIndex;
        const smplStart = sampleDataArray instanceof IndexedByteArray ? sampleDataArray.currentIndex : 0;
        if (sampleDataArray instanceof IndexedByteArray) if (compressed) {
          this.loopStart += this.startByteOffset / 2;
          this.loopEnd += this.startByteOffset / 2;
          this.setCompressedData(sampleDataArray.slice(this.startByteOffset / 2 + smplStart, this.endByteOffset / 2 + smplStart));
        } else this.s16leData = sampleDataArray.slice(smplStart + this.startByteOffset, smplStart + this.endByteOffset);
        else this.setAudioData(sampleDataArray.slice(this.startByteOffset / 2, this.endByteOffset / 2), sampleRate);
        this.linkedSampleIndex = linkedSampleIndex;
      }
      getLinkedSample(samplesArray) {
        if (this.linkedSample || !this.isLinked) return;
        const linked = samplesArray[this.linkedSampleIndex];
        if (linked) if (linked.linkedSample) {
          SpessaSynthInfo(`%cInvalid linked sample for ${this.name}: ${linked.name} is already linked to ${linked.linkedSample.name}`, consoleColors.warn);
          this.unlinkSample();
        } else this.setLinkedSample(linked, this.sampleType);
        else {
          SpessaSynthInfo(`%cInvalid linked sample for ${this.name}. Setting to mono.`, consoleColors.warn);
          this.unlinkSample();
        }
      }
      /**
      * Loads the audio data and stores it for reuse
      * @returns  The audio data
      */
      getAudioData() {
        if (this.audioData) return this.audioData;
        if (this.isCompressed) return super.getAudioData();
        if (!this.s16leData) {
          console.error(this);
          throw new Error("Unexpected lack of audio data.");
        }
        const byteLength = this.endByteOffset - this.startByteOffset;
        if (byteLength < 1) {
          SpessaSynthWarn(`Invalid sample ${this.name}! Invalid length: ${byteLength}`);
          return new Float32Array(1);
        }
        const audioData = new Float32Array(byteLength / 2);
        const convertedSigned16 = new Int16Array(this.s16leData.buffer);
        for (const [i, element] of convertedSigned16.entries()) audioData[i] = element / 32768;
        this.audioData = audioData;
        return audioData;
      }
      getRawData(allowVorbis) {
        if (this.dataOverridden || this.compressedData) return super.getRawData(allowVorbis);
        return this.s16leData ?? new Uint8Array(0);
      }
    };
    /**
    * Reads the samples from the shdr chunk
    */
    function readSamples(sampleHeadersChunk, smplChunkData, linkSamples = true) {
      const samples = [];
      let index = 0;
      while (sampleHeadersChunk.data.length > sampleHeadersChunk.data.currentIndex) {
        const sample = readSample(index, sampleHeadersChunk.data, smplChunkData);
        samples.push(sample);
        index++;
      }
      samples.pop();
      if (linkSamples) for (const s of samples) s.getLinkedSample(samples);
      return samples;
    }
    /**
    * Reads it into a sample
    */
    function readSample(index, sampleHeaderData, smplArrayData) {
      const sampleName = readBinaryStringIndexed(sampleHeaderData, 20);
      const sampleStartIndex = readLittleEndianIndexed(sampleHeaderData, 4) * 2;
      const sampleEndIndex = readLittleEndianIndexed(sampleHeaderData, 4) * 2;
      const sampleLoopStartIndex = readLittleEndianIndexed(sampleHeaderData, 4);
      const sampleLoopEndIndex = readLittleEndianIndexed(sampleHeaderData, 4);
      const sampleRate = readLittleEndianIndexed(sampleHeaderData, 4);
      let samplePitch = sampleHeaderData[sampleHeaderData.currentIndex++];
      if (samplePitch > 127) samplePitch = 60;
      const samplePitchCorrection = signedInt8(sampleHeaderData[sampleHeaderData.currentIndex++]);
      const sampleLink = readLittleEndianIndexed(sampleHeaderData, 2);
      const sampleType = readLittleEndianIndexed(sampleHeaderData, 2);
      return new SoundFontSample(sampleName, sampleStartIndex, sampleEndIndex, sampleLoopStartIndex, sampleLoopEndIndex, sampleRate, samplePitch, samplePitchCorrection, sampleLink, sampleType, smplArrayData, index);
    }
    //#endregion
    //#region src/soundbank/soundfont/write/shdr.ts
    function getSHDR(bank, smplStartOffsets, smplEndOffsets) {
      const sampleLength = 46;
      const shdrSize = sampleLength * (bank.samples.length + 1);
      const shdrData = new IndexedByteArray(shdrSize);
      const xshdrData = new IndexedByteArray(shdrSize);
      let maxSampleLink = 0;
      for (const [index, sample] of bank.samples.entries()) {
        writeBinaryStringIndexed(shdrData, sample.name.slice(0, 20), 20);
        writeBinaryStringIndexed(xshdrData, sample.name.slice(20), 20);
        const dwStart = smplStartOffsets[index];
        writeDword(shdrData, dwStart);
        xshdrData.currentIndex += 4;
        const dwEnd = smplEndOffsets[index];
        writeDword(shdrData, dwEnd);
        xshdrData.currentIndex += 4;
        let loopStart = sample.loopStart + dwStart;
        let loopEnd = sample.loopEnd + dwStart;
        if (sample.isCompressed) {
          loopStart -= dwStart;
          loopEnd -= dwStart;
        }
        writeDword(shdrData, loopStart);
        writeDword(shdrData, loopEnd);
        writeDword(shdrData, sample.sampleRate);
        shdrData[shdrData.currentIndex++] = sample.originalKey;
        shdrData[shdrData.currentIndex++] = sample.pitchCorrection;
        xshdrData.currentIndex += 14;
        const sampleLinkIndex = sample.linkedSample ? bank.samples.indexOf(sample.linkedSample) : 0;
        writeWord(shdrData, Math.max(0, sampleLinkIndex) & 65535);
        writeWord(xshdrData, Math.max(0, sampleLinkIndex) >> 16);
        maxSampleLink = Math.max(maxSampleLink, sampleLinkIndex);
        let type = sample.sampleType;
        if (sample.isCompressed) type |= 16;
        writeWord(shdrData, type);
        xshdrData.currentIndex += 2;
      }
      writeBinaryStringIndexed(shdrData, "EOS", sampleLength);
      writeBinaryStringIndexed(xshdrData, "EOS", sampleLength);
      return {
        pdta: RIFFChunk.write("shdr", shdrData),
        xdta: RIFFChunk.write("shdr", xshdrData)
      };
    }
    //#endregion
    //#region src/soundbank/soundfont/write/write_sf2_elements.ts
    function writeSF2Elements(bank, isPreset = false) {
      const elements = isPreset ? bank.presets : bank.instruments;
      const genHeader = isPreset ? "pgen" : "igen";
      const modHeader = isPreset ? "pmod" : "imod";
      const bagHeader = isPreset ? "pbag" : "ibag";
      const hdrHeader = isPreset ? "phdr" : "inst";
      const hdrByteSize = isPreset ? 38 : 22;
      let currentGenIndex = 0;
      const generatorIndexes = new Array();
      let currentModIndex = 0;
      const modulatorIndexes = new Array();
      const generators = new Array();
      const modulators = new Array();
      let zoneIndex = 0;
      const zoneIndexes = new Array();
      const writeZone = (z) => {
        generatorIndexes.push(currentGenIndex);
        const gens = z.getWriteGenerators(bank);
        currentGenIndex += gens.length;
        generators.push(...gens);
        modulatorIndexes.push(currentModIndex);
        const mods = z.modulators;
        currentModIndex += mods.length;
        modulators.push(...mods);
      };
      for (const el of elements) {
        zoneIndexes.push(zoneIndex);
        writeZone(el.globalZone);
        for (const zone of el.zones) writeZone(zone);
        zoneIndex += el.zones.length + 1;
      }
      generators.push(new Generator(0, 0, false));
      modulators.push(new DecodedModulator(0, 0, 0, 0, 0));
      generatorIndexes.push(currentGenIndex);
      modulatorIndexes.push(currentModIndex);
      zoneIndexes.push(zoneIndex);
      const genData = new IndexedByteArray(generators.length * 4);
      for (const g of generators) g.write(genData);
      const modData = new IndexedByteArray(modulators.length * 10);
      for (const m of modulators) m.write(modData);
      const bagSize = modulatorIndexes.length * 4;
      const bagData = {
        pdta: new IndexedByteArray(bagSize),
        xdta: new IndexedByteArray(bagSize)
      };
      for (const [i, modulatorIndex] of modulatorIndexes.entries()) {
        const generatorIndex = generatorIndexes[i];
        writeWord(bagData.pdta, generatorIndex & 65535);
        writeWord(bagData.pdta, modulatorIndex & 65535);
        writeWord(bagData.xdta, generatorIndex >> 16);
        writeWord(bagData.xdta, modulatorIndex >> 16);
      }
      const hdrSize = (elements.length + 1) * hdrByteSize;
      const hdrData = {
        pdta: new IndexedByteArray(hdrSize),
        xdta: new IndexedByteArray(hdrSize)
      };
      for (const [i, el] of elements.entries()) el.write(hdrData, zoneIndexes[i]);
      if (isPreset) {
        writeBinaryStringIndexed(hdrData.pdta, "EOP", 20);
        hdrData.pdta.currentIndex += 4;
        writeWord(hdrData.pdta, zoneIndex & 65535);
        hdrData.pdta.currentIndex += 12;
        writeBinaryStringIndexed(hdrData.xdta, "", 20);
        hdrData.xdta.currentIndex += 4;
        writeWord(hdrData.xdta, zoneIndex >> 16);
        hdrData.xdta.currentIndex += 12;
      } else {
        writeBinaryStringIndexed(hdrData.pdta, "EOI", 20);
        writeWord(hdrData.pdta, zoneIndex & 65535);
        writeBinaryStringIndexed(hdrData.xdta, "", 20);
        writeWord(hdrData.xdta, zoneIndex >> 16);
      }
      return {
        writeXdta: Math.max(currentGenIndex, currentModIndex, zoneIndex) > 65535,
        gen: {
          pdta: RIFFChunk.write(genHeader, genData),
          xdta: RIFFChunk.write(modHeader, new IndexedByteArray(4))
        },
        mod: {
          pdta: RIFFChunk.write(modHeader, modData),
          xdta: RIFFChunk.write(modHeader, new IndexedByteArray(10))
        },
        bag: {
          pdta: RIFFChunk.write(bagHeader, bagData.pdta),
          xdta: RIFFChunk.write(bagHeader, bagData.xdta)
        },
        hdr: {
          pdta: RIFFChunk.write(hdrHeader, hdrData.pdta),
          xdta: RIFFChunk.write(hdrHeader, hdrData.xdta)
        }
      };
    }
    //#endregion
    //#region src/soundbank/soundfont/write/write.ts
    const DEFAULT_SF2_WRITE_OPTIONS = {
      compress: false,
      writeDefaultModulators: true,
      writeExtendedLimits: true,
      decompress: false
    };
    /**
    * Writes the sound bank as an SF2 file.
    * @param bank
    * @param writeOptions the options for writing.
    * @returns the binary file data.
    */
    async function writeSF2Internal(bank, writeOptions = DEFAULT_SF2_WRITE_OPTIONS) {
      const options = fillWithDefaults(writeOptions, DEFAULT_SF2_WRITE_OPTIONS);
      if (options?.compress) {
        if (typeof options?.compressionFunction !== "function") throw new TypeError("No compression function supplied but compression enabled.");
        if (options?.decompress) throw new Error("Decompressed and compressed at the same time.");
      }
      SpessaSynthGroupCollapsed("%cSaving soundbank...", consoleColors.info);
      SpessaSynthInfo(`%cCompression: %c${options?.compress || "false"}%c`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized);
      SpessaSynthGroup("%cWriting INFO...", consoleColors.info);
      /**
      * Write INFO
      */
      const infoArrays = [];
      const info = bank.soundBankInfo;
      if (options?.compress || bank.samples.some((s) => s.isCompressed)) {
        info.version.major = 3;
        info.version.minor = 0;
      }
      if (options?.decompress) {
        info.version.major = 2;
        info.version.minor = 4;
      }
      const writeSF2Info = (type, data) => {
        if (!data) return;
        infoArrays.push(RIFFChunk.write(type, getStringBytes(data, true, true)));
      };
      {
        const ifilData = new IndexedByteArray(4);
        writeWord(ifilData, info.version.major);
        writeWord(ifilData, info.version.minor);
        infoArrays.push(RIFFChunk.write("ifil", ifilData));
      }
      writeSF2Info("isng", info.soundEngine);
      writeSF2Info("INAM", info.name);
      writeSF2Info("irom", info.romInfo);
      if (info.romVersion) {
        const ifilData = new IndexedByteArray(4);
        writeWord(ifilData, info.romVersion.major);
        writeWord(ifilData, info.romVersion.minor);
        infoArrays.push(RIFFChunk.write("iver", ifilData));
      }
      writeSF2Info("ICRD", toISODateString(info.creationDate));
      writeSF2Info("IENG", info.engineer);
      writeSF2Info("IPRD", info.product);
      writeSF2Info("ICOP", info.copyright);
      writeSF2Info("ICMT", info?.subject ? (info?.comment ? info.comment + "\n" : "") + info.subject : info?.comment);
      writeSF2Info("ISFT", options.software ?? "SpessaSynth");
      if (bank.defaultModulators.some((mod) => !SPESSASYNTH_DEFAULT_MODULATORS.some((m) => Modulator.isIdentical(m, mod, true))) && options?.writeDefaultModulators) {
        const mods = bank.defaultModulators;
        SpessaSynthInfo(`%cWriting %c${mods.length}%c default modulators...`, consoleColors.info, consoleColors.recognized, consoleColors.info);
        const dmodData = new IndexedByteArray(10 + mods.length * 10);
        for (const mod of mods) mod.write(dmodData);
        writeLittleEndianIndexed(dmodData, 0, 10);
        infoArrays.push(RIFFChunk.write("DMOD", dmodData));
      }
      SpessaSynthGroupEnd();
      SpessaSynthInfo("%cWriting SDTA...", consoleColors.info);
      const smplStartOffsets = [];
      const smplEndOffsets = [];
      const sdtaChunk = await getSDTA(bank, smplStartOffsets, smplEndOffsets, options.compress, options.decompress, options?.compressionFunction, options?.progressFunction);
      SpessaSynthInfo("%cWriting PDTA...", consoleColors.info);
      SpessaSynthInfo("%cWriting SHDR...", consoleColors.info);
      const shdrChunk = getSHDR(bank, smplStartOffsets, smplEndOffsets);
      SpessaSynthGroup("%cWriting instruments...", consoleColors.info);
      const instData = writeSF2Elements(bank, false);
      SpessaSynthGroupEnd();
      SpessaSynthGroup("%cWriting presets...", consoleColors.info);
      const presData = writeSF2Elements(bank, true);
      SpessaSynthGroupEnd();
      const chunks = [
        presData.hdr,
        presData.bag,
        presData.mod,
        presData.gen,
        instData.hdr,
        instData.bag,
        instData.mod,
        instData.gen,
        shdrChunk
      ];
      const pdtaChunk = RIFFChunk.writeParts("pdta", chunks.map((c) => c.pdta), true);
      if (options.writeExtendedLimits && (instData.writeXdta || presData.writeXdta || bank.presets.some((p) => p.name.length > 20) || bank.instruments.some((i) => i.name.length > 20) || bank.samples.some((s) => s.name.length > 20))) {
        SpessaSynthInfo(`%cWriting the xdta chunk as writeExtendedLimits is enabled and at least one condition was met.`, consoleColors.info, consoleColors.value);
        infoArrays.push(RIFFChunk.writeParts("xdta", chunks.map((c) => c.xdta), true));
      }
      const infoChunk = RIFFChunk.writeParts("INFO", infoArrays, true);
      SpessaSynthInfo("%cWriting the output file...", consoleColors.info);
      const main = RIFFChunk.writeParts("RIFF", [
        getStringBytes("sfbk"),
        infoChunk,
        sdtaChunk,
        pdtaChunk
      ]);
      SpessaSynthInfo(`%cSaved successfully! Final file size: %c${main.length}`, consoleColors.info, consoleColors.recognized);
      SpessaSynthGroupEnd();
      return main.buffer;
    }
    //#endregion
    //#region src/soundbank/basic_soundbank/preset_selector.ts
    function getAnyDrums(presets, preferXG) {
      const p = preferXG ? presets.find((p) => p.isXGDrums) : presets.find((p) => p.isGMGSDrum);
      if (p) return p;
      return presets.find((p) => p.isAnyDrums) ?? presets[0];
    }
    /**
    * A sophisticated preset selection system based on the MIDI Patch system
    * @param presets The preset list.
    * @param patch The patch to select.
    * @param system The MIDI system to select for.
    */
    function selectPreset(presets, patch, system) {
      if (presets.length === 0) throw new Error("No presets!");
      if (patch.isGMGSDrum && BankSelectHacks.isSystemXG(system)) patch = {
        ...patch,
        isGMGSDrum: false,
        bankLSB: 0,
        bankMSB: BankSelectHacks.getDrumBank(system)
      };
      const { isGMGSDrum, bankLSB, bankMSB, program } = patch;
      const isXG = BankSelectHacks.isSystemXG(system);
      const xgDrums = BankSelectHacks.isXGDrums(bankMSB) && isXG;
      let p = presets.find((p) => p.matches(patch));
      if (p && (!xgDrums || xgDrums && p.isXGDrums)) return p;
      const returnReplacement = (pres) => {
        SpessaSynthInfo(`%cPreset %c${MIDIPatchTools.toMIDIString(patch)}%c not found. (${system}) Replaced with %c${pres.toString()}`, consoleColors.warn, consoleColors.unrecognized, consoleColors.warn, consoleColors.value);
      };
      if (isGMGSDrum) {
        let p = presets.find((p) => p.isGMGSDrum && p.program === program);
        if (p) {
          returnReplacement(p);
          return p;
        }
        p = presets.find((p) => p.isAnyDrums && p.program === program);
        if (p) {
          returnReplacement(p);
          return p;
        }
        p = getAnyDrums(presets, false);
        returnReplacement(p);
        return p;
      }
      if (xgDrums) {
        let p = presets.find((p) => p.program === program && p.isXGDrums);
        if (p) {
          returnReplacement(p);
          return p;
        }
        p = presets.find((p) => p.isAnyDrums && p.program === program);
        if (p) {
          returnReplacement(p);
          return p;
        }
        p = getAnyDrums(presets, true);
        returnReplacement(p);
        return p;
      }
      const matchingPrograms = presets.filter((p) => p.program === program && !p.isAnyDrums);
      if (matchingPrograms.length === 0) {
        returnReplacement(presets[0]);
        return presets[0];
      }
      p = isXG ? matchingPrograms.find((p) => p.bankLSB === bankLSB) : matchingPrograms.find((p) => p.bankMSB === bankMSB);
      if (p) {
        returnReplacement(p);
        return p;
      }
      if (bankLSB !== 64 || !isXG) {
        const bank = Math.max(bankMSB, bankLSB);
        p = matchingPrograms.find((p) => p.bankLSB === bank || p.bankMSB === bank);
        if (p) {
          returnReplacement(p);
          return p;
        }
      }
      returnReplacement(matchingPrograms[0]);
      return matchingPrograms[0];
    }
    //#endregion
    //#region src/soundbank/downloadable_sounds/dls_verifier.ts
    var DLSVerifier = class {
      /**
      * @param chunk
      * @param expected
      * @throws error if the check doesn't pass
      */
      static verifyHeader(chunk, ...expected) {
        for (const expect of expected) if (chunk.header.toLowerCase() === expect.toLowerCase()) return;
        this.parsingError(`Invalid DLS chunk header! Expected "${expected.join(", or ")}" got "${chunk.header.toLowerCase()}"`);
      }
      /**
      * @param text {string}
      * @param expected {string}
      * @throws error if the check doesn't pass
      */
      static verifyText(text, ...expected) {
        for (const expect of expected) if (text.toLowerCase() === expect.toLowerCase()) return;
        this.parsingError(`FourCC error: Expected "${expected.join(", or ")}" got "${text.toLowerCase()}"`);
      }
      /**
      * @throws error if the check doesn't pass
      */
      static parsingError(error) {
        SpessaSynthGroupEnd();
        throw new Error(`DLS parse error: ${error} The file may be corrupted.`);
      }
      static verifyAndReadList(chunk, ...type) {
        this.verifyHeader(chunk, "LIST");
        chunk.data.currentIndex = 0;
        this.verifyText(readBinaryStringIndexed(chunk.data, 4), ...type);
        const chunks = [];
        while (chunk.data.length > chunk.data.currentIndex) chunks.push(RIFFChunk.read(chunk.data));
        return chunks;
      }
    };
    //#endregion
    //#region src/soundbank/downloadable_sounds/wave_sample.ts
    const WSMP_SIZE = 20;
    const WSMP_LOOP_SIZE = 16;
    var WaveSample = class WaveSample extends DLSVerifier {
      /**
      * Specifies the gain to be applied to this sample in 32 bit relative gain units.
      * Each unit of gain represents 1/655360 dB.
      */
      gain = 0;
      /**
      * Specifies the MIDI note which will replay the sample at original pitch. This value ranges
      * from 0 to 127 (a value of 60 represents Middle C, as defined by the MIDI specification).
      */
      unityNote = 60;
      /**
      * Specifies the tuning offset from the usUnityNote in 16 bit relative pitch. (cents)
      */
      fineTune = 0;
      /**
      * Specifies the number (count) of <wavesample-loop> records that are contained in the
      * <wsmp-ck> chunk. The <wavesample-loop> records are stored immediately following the
      * cSampleLoops data field. One shot sounds will have the cSampleLoops field set to 0.
      * Looped sounds will have the cSampleLoops field set to 1. Values greater than 1 are not yet
      * defined at this time.
      */
      loops = new Array();
      /**
      * Specifies flag options for the digital audio sample.
      * Default to F_WSMP_NO_COMPRESSION,
      * according to all DLS files I have.
      */
      fulOptions = 2;
      static copyFrom(inputWaveSample) {
        const outputWaveSample = new WaveSample();
        outputWaveSample.unityNote = inputWaveSample.unityNote;
        outputWaveSample.gain = inputWaveSample.gain;
        outputWaveSample.fineTune = inputWaveSample.fineTune;
        outputWaveSample.loops = inputWaveSample.loops.map((l) => {
          return { ...l };
        });
        outputWaveSample.fulOptions = inputWaveSample.fulOptions;
        return outputWaveSample;
      }
      static read(chunk) {
        this.verifyHeader(chunk, "wsmp");
        const waveSample = new WaveSample();
        const cbSize = readLittleEndianIndexed(chunk.data, 4);
        if (cbSize !== WSMP_SIZE) SpessaSynthWarn(`Wsmp cbSize mismatch: got ${cbSize}, expected ${WSMP_SIZE}.`);
        waveSample.unityNote = readLittleEndianIndexed(chunk.data, 2);
        waveSample.fineTune = signedInt16(chunk.data[chunk.data.currentIndex++], chunk.data[chunk.data.currentIndex++]);
        waveSample.gain = readLittleEndianIndexed(chunk.data, 4) | 0;
        waveSample.fulOptions = readLittleEndianIndexed(chunk.data, 4);
        if (readLittleEndianIndexed(chunk.data, 4) === 0) {} else {
          const cbSize = readLittleEndianIndexed(chunk.data, 4);
          if (cbSize !== WSMP_LOOP_SIZE) SpessaSynthWarn(`CbSize for loop in wsmp mismatch. Expected ${WSMP_LOOP_SIZE}, got ${cbSize}.`);
          const loopType = readLittleEndianIndexed(chunk.data, 4);
          const loopStart = readLittleEndianIndexed(chunk.data, 4);
          const loopLength = readLittleEndianIndexed(chunk.data, 4);
          waveSample.loops.push({
            loopStart,
            loopLength,
            loopType
          });
        }
        return waveSample;
      }
      static fromSFSample(sample) {
        const waveSample = new WaveSample();
        waveSample.unityNote = sample.originalKey;
        waveSample.fineTune = sample.pitchCorrection;
        if (sample.loopEnd !== 0 || sample.loopStart !== 0) waveSample.loops.push({
          loopStart: sample.loopStart,
          loopLength: sample.loopEnd - sample.loopStart,
          loopType: DLSLoopTypes.forward
        });
        return waveSample;
      }
      static fromSFZone(zone) {
        const waveSample = new WaveSample();
        waveSample.unityNote = zone.getGenerator(generatorTypes.overridingRootKey, zone.sample.originalKey);
        if (zone.getGenerator(generatorTypes.scaleTuning, 100) === 0 && zone.keyRange.max - zone.keyRange.min === 0) waveSample.unityNote = zone.keyRange.min;
        waveSample.fineTune = zone.fineTuning + zone.sample.pitchCorrection;
        waveSample.gain = -(zone.getGenerator(generatorTypes.initialAttenuation, 0) * .4) << 16;
        const loopingMode = zone.getGenerator(generatorTypes.sampleModes, 0);
        if (loopingMode !== 0) {
          const loopStart = zone.sample.loopStart + zone.getGenerator(generatorTypes.startloopAddrsOffset, 0) + zone.getGenerator(generatorTypes.startloopAddrsCoarseOffset, 0) * 32768;
          const loopEnd = zone.sample.loopEnd + zone.getGenerator(generatorTypes.endloopAddrsOffset, 0) + zone.getGenerator(generatorTypes.endloopAddrsCoarseOffset, 0) * 32768;
          let dlsLoopType;
          switch (loopingMode) {
            case 1:
            default:
              dlsLoopType = 0;
              break;
            case 3: dlsLoopType = 1;
          }
          waveSample.loops.push({
            loopType: dlsLoopType,
            loopStart,
            loopLength: loopEnd - loopStart
          });
        }
        return waveSample;
      }
      /**
      * Converts the wsmp data into an SF zone.
      */
      toSFZone(zone, sample) {
        let loopingMode = 0;
        const loop = this.loops[0];
        if (loop) loopingMode = loop.loopType === DLSLoopTypes.loopAndRelease ? 3 : 1;
        if (loopingMode !== 0) zone.setGenerator(generatorTypes.sampleModes, loopingMode);
        const wsmpAttenuationCorrected = -(this.gain >> 16) / .4;
        if (wsmpAttenuationCorrected !== 0) zone.setGenerator(generatorTypes.initialAttenuation, wsmpAttenuationCorrected);
        zone.fineTuning = this.fineTune - sample.pitchCorrection;
        if (this.unityNote !== sample.originalKey) zone.setGenerator(generatorTypes.overridingRootKey, this.unityNote);
        if (loop) {
          const diffStart = loop.loopStart - sample.loopStart;
          const diffEnd = loop.loopStart + loop.loopLength - sample.loopEnd;
          if (diffStart !== 0) {
            const fine = diffStart % 32768;
            zone.setGenerator(generatorTypes.startloopAddrsOffset, fine);
            const coarse = Math.trunc(diffStart / 32768);
            if (coarse !== 0) zone.setGenerator(generatorTypes.startloopAddrsCoarseOffset, coarse);
          }
          if (diffEnd !== 0) {
            const fine = diffEnd % 32768;
            zone.setGenerator(generatorTypes.endloopAddrsOffset, fine);
            const coarse = Math.trunc(diffEnd / 32768);
            if (coarse !== 0) zone.setGenerator(generatorTypes.endloopAddrsCoarseOffset, coarse);
          }
        }
      }
      write() {
        const wsmpData = new IndexedByteArray(WSMP_SIZE + this.loops.length * WSMP_LOOP_SIZE);
        writeDword(wsmpData, WSMP_SIZE);
        writeWord(wsmpData, this.unityNote);
        writeWord(wsmpData, this.fineTune);
        writeDword(wsmpData, this.gain);
        writeDword(wsmpData, this.fulOptions);
        writeDword(wsmpData, this.loops.length);
        for (const loop of this.loops) {
          writeDword(wsmpData, WSMP_LOOP_SIZE);
          writeDword(wsmpData, loop.loopType);
          writeDword(wsmpData, loop.loopStart);
          writeDword(wsmpData, loop.loopLength);
        }
        return RIFFChunk.write("wsmp", wsmpData);
      }
    };
    //#endregion
    //#region src/soundbank/downloadable_sounds/dls_sample.ts
    const W_FORMAT_TAG = {
      PCM: 1,
      ALAW: 6
    };
    function readPCM(data, bytesPerSample) {
      const maxSampleValue = Math.pow(2, bytesPerSample * 8 - 1);
      const maxUnsigned = Math.pow(2, bytesPerSample * 8);
      let normalizationFactor;
      let isUnsigned = false;
      if (bytesPerSample === 1) {
        normalizationFactor = 255;
        isUnsigned = true;
      } else normalizationFactor = maxSampleValue;
      const sampleLength = data.length / bytesPerSample;
      const sampleData = new Float32Array(sampleLength);
      if (bytesPerSample === 2) {
        const s16 = new Int16Array(data.buffer);
        for (const [i, element] of s16.entries()) sampleData[i] = element / 32768;
      } else for (let i = 0; i < sampleData.length; i++) {
        let sample = readLittleEndianIndexed(data, bytesPerSample);
        if (isUnsigned) sampleData[i] = sample / normalizationFactor - .5;
        else {
          if (sample >= maxSampleValue) sample -= maxUnsigned;
          sampleData[i] = sample / normalizationFactor;
        }
      }
      return sampleData;
    }
    function readALAW(data, bytesPerSample) {
      const sampleLength = data.length / bytesPerSample;
      const sampleData = new Float32Array(sampleLength);
      for (let i = 0; i < sampleData.length; i++) {
        const input = readLittleEndianIndexed(data, bytesPerSample);
        let sample = input ^ 85;
        sample &= 127;
        const exponent = sample >> 4;
        let mantissa = sample & 15;
        if (exponent > 0) mantissa += 16;
        mantissa = (mantissa << 4) + 8;
        if (exponent > 1) mantissa = mantissa << exponent - 1;
        sampleData[i] = (input > 127 ? mantissa : -mantissa) / 32768;
      }
      return sampleData;
    }
    var DLSSample = class extends BasicSample {
      wFormatTag;
      bytesPerSample;
      /**
      * Sample's raw data before decoding it, for faster writing
      */
      rawData;
      /**
      * @param name
      * @param rate
      * @param pitch
      * @param pitchCorrection
      * @param loopStart sample data points
      * @param loopEnd sample data points
      * @param dataChunk
      * @param wFormatTag
      * @param bytesPerSample
      */
      constructor(name, rate, pitch, pitchCorrection, loopStart, loopEnd, dataChunk, wFormatTag, bytesPerSample) {
        super(name, rate, pitch, pitchCorrection, sampleTypes.monoSample, loopStart, loopEnd);
        this.dataOverridden = false;
        this.rawData = dataChunk.data;
        this.wFormatTag = wFormatTag;
        this.bytesPerSample = bytesPerSample;
      }
      getAudioData() {
        if (!this.rawData) return new Float32Array(0);
        if (!this.audioData) {
          let sampleData;
          switch (this.wFormatTag) {
            default:
              SpessaSynthWarn(`Failed to decode sample. Unknown wFormatTag: ${this.wFormatTag}`);
              sampleData = new Float32Array(this.rawData.length / this.bytesPerSample);
              break;
            case W_FORMAT_TAG.PCM:
              sampleData = readPCM(this.rawData, this.bytesPerSample);
              break;
            case W_FORMAT_TAG.ALAW:
              sampleData = readALAW(this.rawData, this.bytesPerSample);
              break;
          }
          this.setAudioData(sampleData, this.sampleRate);
        }
        return this.audioData ?? new Float32Array(0);
      }
      getRawData(allowVorbis) {
        if (this.dataOverridden || this.isCompressed) return super.getRawData(allowVorbis);
        if (this.wFormatTag === W_FORMAT_TAG.PCM && this.bytesPerSample === 2) return this.rawData;
        return this.encodeS16LE();
      }
    };
    //#endregion
    //#region src/soundbank/downloadable_sounds/sample.ts
    var DownloadableSoundsSample = class DownloadableSoundsSample extends DLSVerifier {
      waveSample = new WaveSample();
      wFormatTag;
      bytesPerSample;
      sampleRate;
      dataChunk;
      name = "Unnamed sample";
      constructor(wFormatTag, bytesPerSample, sampleRate, dataChunk) {
        super();
        this.wFormatTag = wFormatTag;
        this.bytesPerSample = bytesPerSample;
        this.sampleRate = sampleRate;
        this.dataChunk = dataChunk;
      }
      static read(waveChunk) {
        const chunks = this.verifyAndReadList(waveChunk, "wave");
        const fmtChunk = chunks.find((c) => c.header === "fmt ");
        if (!fmtChunk) throw new Error("No fmt chunk in the wave file!");
        const wFormatTag = readLittleEndianIndexed(fmtChunk.data, 2);
        const channelsAmount = readLittleEndianIndexed(fmtChunk.data, 2);
        if (channelsAmount !== 1) throw new Error(`Only mono samples are supported. Fmt reports ${channelsAmount} channels.`);
        const sampleRate = readLittleEndianIndexed(fmtChunk.data, 4);
        readLittleEndianIndexed(fmtChunk.data, 4);
        readLittleEndianIndexed(fmtChunk.data, 2);
        const bytesPerSample = readLittleEndianIndexed(fmtChunk.data, 2) / 8;
        const dataChunk = chunks.find((c) => c.header === "data");
        if (!dataChunk) throw new Error("No data chunk in the WAVE chunk!");
        const sample = new DownloadableSoundsSample(wFormatTag, bytesPerSample, sampleRate, dataChunk);
        const waveInfo = RIFFChunk.findListType(chunks, "INFO");
        if (waveInfo) {
          let infoChunk = RIFFChunk.read(waveInfo.data);
          while (infoChunk.header !== "INAM" && waveInfo.data.currentIndex < waveInfo.data.length) infoChunk = RIFFChunk.read(waveInfo.data);
          if (infoChunk.header === "INAM") sample.name = readBinaryStringIndexed(infoChunk.data, infoChunk.size).trim();
        }
        const wsmpChunk = chunks.find((c) => c.header === "wsmp");
        if (wsmpChunk) sample.waveSample = WaveSample.read(wsmpChunk);
        return sample;
      }
      static fromSFSample(sample) {
        const raw = sample.getRawData(false);
        const dlsSample = new DownloadableSoundsSample(1, 2, sample.sampleRate, new RIFFChunk("data", raw.length, new IndexedByteArray(raw.buffer)));
        dlsSample.name = sample.name;
        dlsSample.waveSample = WaveSample.fromSFSample(sample);
        return dlsSample;
      }
      toSFSample(soundBank) {
        let originalKey = this.waveSample.unityNote;
        let pitchCorrection = this.waveSample.fineTune;
        const samplePitchSemitones = Math.trunc(pitchCorrection / 100);
        originalKey += samplePitchSemitones;
        pitchCorrection -= samplePitchSemitones * 100;
        let loopStart = 0;
        let loopEnd = 0;
        const loop = this.waveSample.loops?.[0];
        if (loop) {
          loopStart = loop.loopStart;
          loopEnd = loop.loopStart + loop.loopLength;
        }
        const sample = new DLSSample(this.name, this.sampleRate, originalKey, pitchCorrection, loopStart, loopEnd, this.dataChunk, this.wFormatTag, this.bytesPerSample);
        soundBank.addSamples(sample);
      }
      write() {
        const fmt = this.writeFmt();
        const wsmp = this.waveSample.write();
        const data = RIFFChunk.write("data", this.dataChunk.data);
        const inam = RIFFChunk.write("INAM", getStringBytes(this.name, true));
        const info = RIFFChunk.write("INFO", inam, false, true);
        SpessaSynthInfo(`%cSaved %c${this.name}%c successfully!`, consoleColors.recognized, consoleColors.value, consoleColors.recognized);
        return RIFFChunk.writeParts("wave", [
          fmt,
          wsmp,
          data,
          info
        ], true);
      }
      writeFmt() {
        const fmtData = new IndexedByteArray(18);
        writeWord(fmtData, this.wFormatTag);
        writeWord(fmtData, 1);
        writeDword(fmtData, this.sampleRate);
        writeDword(fmtData, this.sampleRate * 2);
        writeWord(fmtData, 2);
        writeWord(fmtData, this.bytesPerSample * 8);
        return RIFFChunk.write("fmt ", fmtData);
      }
    };
    //#endregion
    //#region src/soundbank/downloadable_sounds/connection_source.ts
    var ConnectionSource = class ConnectionSource {
      source;
      transform;
      bipolar;
      invert;
      constructor(source = dlsSources.none, transform = modulatorCurveTypes.linear, bipolar = false, invert = false) {
        this.source = source;
        this.transform = transform;
        this.bipolar = bipolar;
        this.invert = invert;
      }
      get sourceName() {
        return Object.keys(dlsSources).find((k) => dlsSources[k] === this.source) ?? this.source.toString();
      }
      get transformName() {
        return Object.keys(modulatorCurveTypes).find((k) => modulatorCurveTypes[k] === this.transform) ?? this.transform.toString();
      }
      static copyFrom(inputSource) {
        return new ConnectionSource(inputSource.source, inputSource.transform, inputSource.bipolar, inputSource.invert);
      }
      static fromSFSource(source) {
        let sourceEnum = void 0;
        if (source.isCC) switch (source.index) {
          case midiControllers.modulationWheel:
            sourceEnum = dlsSources.modulationWheel;
            break;
          case midiControllers.mainVolume:
            sourceEnum = dlsSources.volume;
            break;
          case midiControllers.pan:
            sourceEnum = dlsSources.pan;
            break;
          case midiControllers.expressionController:
            sourceEnum = dlsSources.expression;
            break;
          case midiControllers.chorusDepth:
            sourceEnum = dlsSources.chorus;
            break;
          case midiControllers.reverbDepth:
            sourceEnum = dlsSources.reverb;
            break;
        }
        else switch (source.index) {
          case modulatorSources.noController:
            sourceEnum = dlsSources.none;
            break;
          case modulatorSources.noteOnKeyNum:
            sourceEnum = dlsSources.keyNum;
            break;
          case modulatorSources.noteOnVelocity:
            sourceEnum = dlsSources.velocity;
            break;
          case modulatorSources.pitchWheel:
            sourceEnum = dlsSources.pitchWheel;
            break;
          case modulatorSources.pitchWheelRange:
            sourceEnum = dlsSources.pitchWheelRange;
            break;
          case modulatorSources.polyPressure:
            sourceEnum = dlsSources.polyPressure;
            break;
          case modulatorSources.channelPressure: sourceEnum = dlsSources.channelPressure;
        }
        if (sourceEnum === void 0) return;
        return new ConnectionSource(sourceEnum, source.curveType, source.isBipolar, source.isNegative);
      }
      toString() {
        return `${this.sourceName} ${this.transformName} ${this.bipolar ? "bipolar" : "unipolar"} ${this.invert ? "inverted" : "positive"}`;
      }
      toTransformFlag() {
        return this.transform | (this.bipolar ? 1 : 0) << 4 | (this.invert ? 1 : 0) << 5;
      }
      toSFSource() {
        let sourceEnum;
        let isCC = false;
        switch (this.source) {
          default:
          case dlsSources.modLfo:
          case dlsSources.vibratoLfo:
          case dlsSources.coarseTune:
          case dlsSources.fineTune:
          case dlsSources.modEnv: return;
          case dlsSources.keyNum:
            sourceEnum = modulatorSources.noteOnKeyNum;
            break;
          case dlsSources.none:
            sourceEnum = modulatorSources.noController;
            break;
          case dlsSources.modulationWheel:
            sourceEnum = midiControllers.modulationWheel;
            isCC = true;
            break;
          case dlsSources.pan:
            sourceEnum = midiControllers.pan;
            isCC = true;
            break;
          case dlsSources.reverb:
            sourceEnum = midiControllers.reverbDepth;
            isCC = true;
            break;
          case dlsSources.chorus:
            sourceEnum = midiControllers.chorusDepth;
            isCC = true;
            break;
          case dlsSources.expression:
            sourceEnum = midiControllers.expressionController;
            isCC = true;
            break;
          case dlsSources.volume:
            sourceEnum = midiControllers.mainVolume;
            isCC = true;
            break;
          case dlsSources.velocity:
            sourceEnum = modulatorSources.noteOnVelocity;
            break;
          case dlsSources.polyPressure:
            sourceEnum = modulatorSources.polyPressure;
            break;
          case dlsSources.channelPressure:
            sourceEnum = modulatorSources.channelPressure;
            break;
          case dlsSources.pitchWheel:
            sourceEnum = modulatorSources.pitchWheel;
            break;
          case dlsSources.pitchWheelRange:
            sourceEnum = modulatorSources.pitchWheelRange;
            break;
        }
        if (sourceEnum === void 0) return;
        return new ModulatorSource(sourceEnum, this.transform, isCC, this.bipolar, this.invert);
      }
    };
    //#endregion
    //#region src/soundbank/downloadable_sounds/default_dls_modulators.ts
    const DEFAULT_DLS_REVERB = new DecodedModulator(219, 0, generatorTypes.reverbEffectsSend, 1e3, 0);
    const DEFAULT_DLS_CHORUS = new DecodedModulator(221, 0, generatorTypes.chorusEffectsSend, 1e3, 0);
    new DecodedModulator(129, 0, generatorTypes.vibLfoToPitch, 0, 0);
    new DecodedModulator(13, 0, generatorTypes.vibLfoToPitch, 0, 0);
    //#endregion
    //#region src/soundbank/downloadable_sounds/connection_block.ts
    const invalidGeneratorTypes = new Set([
      generatorTypes.sampleModes,
      generatorTypes.initialAttenuation,
      generatorTypes.keyRange,
      generatorTypes.velRange,
      generatorTypes.sampleID,
      generatorTypes.fineTune,
      generatorTypes.coarseTune,
      generatorTypes.startAddrsOffset,
      generatorTypes.startAddrsCoarseOffset,
      generatorTypes.endAddrOffset,
      generatorTypes.endAddrsCoarseOffset,
      generatorTypes.startloopAddrsOffset,
      generatorTypes.startloopAddrsCoarseOffset,
      generatorTypes.endloopAddrsOffset,
      generatorTypes.endloopAddrsCoarseOffset,
      generatorTypes.overridingRootKey,
      generatorTypes.exclusiveClass
    ]);
    /**
    * Represents a single DLS articulator (connection block)
    */
    var ConnectionBlock = class ConnectionBlock {
      /**
      * Like SF2 modulator source.
      */
      source;
      /**
      * Like SF2 modulator secondary source.
      */
      control;
      /**
      * Like SF2 destination.
      */
      destination;
      /**
      * Like SF2 amount, but long (32-bit) instead of short.
      */
      scale;
      /**
      * Like SF2 source transforms.
      */
      transform;
      constructor(source = new ConnectionSource(), control = new ConnectionSource(), destination, transform, scale) {
        this.source = source;
        this.control = control;
        this.destination = destination;
        this.transform = transform;
        this.scale = scale;
      }
      get isStaticParameter() {
        return this.source.source === dlsSources.none && this.control.source === dlsSources.none;
      }
      get shortScale() {
        return this.scale >> 16;
      }
      get transformName() {
        return Object.keys(modulatorCurveTypes).find((k) => modulatorCurveTypes[k] === this.transform) ?? this.transform.toString();
      }
      get destinationName() {
        return Object.keys(dlsDestinations).find((k) => dlsDestinations[k] === this.destination) ?? this.destination.toString();
      }
      static read(artData) {
        const usSource = readLittleEndianIndexed(artData, 2);
        const usControl = readLittleEndianIndexed(artData, 2);
        const usDestination = readLittleEndianIndexed(artData, 2);
        const usTransform = readLittleEndianIndexed(artData, 2);
        const lScale = readLittleEndianIndexed(artData, 4) | 0;
        const transform = usTransform & 15;
        const control = new ConnectionSource(usControl, usTransform >> 4 & 15, bitMaskToBool(usTransform, 8), bitMaskToBool(usTransform, 9));
        return new ConnectionBlock(new ConnectionSource(usSource, usTransform >> 10 & 15, bitMaskToBool(usTransform, 14), bitMaskToBool(usTransform, 15)), control, usDestination, transform, lScale);
      }
      static fromSFModulator(m, articulation) {
        const failed = (msg) => {
          SpessaSynthWarn(`Failed converting SF modulator into DLS:\n ${m.toString()} \n(${msg})`);
        };
        if (m.transformType !== 0) {
          failed("Absolute transform type is not supported");
          return;
        }
        if (Modulator.isIdentical(m, DEFAULT_DLS_CHORUS, true) || Modulator.isIdentical(m, DEFAULT_DLS_REVERB, true)) return;
        let source = ConnectionSource.fromSFSource(m.primarySource);
        if (!source) {
          failed("Invalid primary source");
          return;
        }
        let control = ConnectionSource.fromSFSource(m.secondarySource);
        if (!control) {
          failed("Invalid secondary source");
          return;
        }
        const dlsDestination = ConnectionBlock.fromSFDestination(m.destination, m.transformAmount);
        if (dlsDestination === void 0) {
          failed("Invalid destination");
          return;
        }
        let amount = m.transformAmount;
        let destination;
        if (typeof dlsDestination === "number") destination = dlsDestination;
        else {
          destination = dlsDestination.destination;
          amount = dlsDestination.amount;
          if (dlsDestination.source !== dlsSources.none) {
            if (control.source !== dlsSources.none && source.source !== dlsSources.none) {
              failed("Articulation generators with secondary source are not supported");
              return;
            }
            if (source.source !== dlsSources.none) control = source;
            source = new ConnectionSource(dlsDestination.source, modulatorCurveTypes.linear, dlsDestination.isBipolar);
          }
        }
        const bloc = new ConnectionBlock(source, control, destination, 0, amount << 16);
        articulation.connectionBlocks.push(bloc);
      }
      static copyFrom(inputBlock) {
        return new ConnectionBlock(ConnectionSource.copyFrom(inputBlock.source), ConnectionSource.copyFrom(inputBlock.control), inputBlock.destination, inputBlock.transform, inputBlock.scale);
      }
      static fromSFGenerator(generator, articulation) {
        if (invalidGeneratorTypes.has(generator.generatorType)) return;
        const failed = (msg) => {
          SpessaSynthWarn(`Failed converting SF2 generator into DLS:\n ${generator.toString()} \n(${msg})`);
        };
        const dlsDestination = ConnectionBlock.fromSFDestination(generator.generatorType, generator.generatorValue);
        if (dlsDestination === void 0) {
          failed("Invalid type");
          return;
        }
        const source = new ConnectionSource();
        let destination;
        let amount = generator.generatorValue;
        if (typeof dlsDestination === "number") destination = dlsDestination;
        else {
          destination = dlsDestination.destination;
          amount = dlsDestination.amount;
          source.source = dlsDestination.source;
          source.bipolar = dlsDestination.isBipolar;
        }
        articulation.connectionBlocks.push(new ConnectionBlock(source, new ConnectionSource(), destination, 0, amount << 16));
      }
      static fromSFDestination(dest, amount) {
        switch (dest) {
          default: return;
          case generatorTypes.initialAttenuation: return {
            destination: dlsDestinations.gain,
            amount: -amount,
            isBipolar: false,
            source: dlsSources.none
          };
          case generatorTypes.fineTune: return dlsDestinations.pitch;
          case generatorTypes.pan: return dlsDestinations.pan;
          case generatorTypes.keyNum: return dlsDestinations.keyNum;
          case generatorTypes.reverbEffectsSend: return dlsDestinations.reverbSend;
          case generatorTypes.chorusEffectsSend: return dlsDestinations.chorusSend;
          case generatorTypes.freqModLFO: return dlsDestinations.modLfoFreq;
          case generatorTypes.delayModLFO: return dlsDestinations.modLfoDelay;
          case generatorTypes.delayVibLFO: return dlsDestinations.vibLfoDelay;
          case generatorTypes.freqVibLFO: return dlsDestinations.vibLfoFreq;
          case generatorTypes.delayVolEnv: return dlsDestinations.volEnvDelay;
          case generatorTypes.attackVolEnv: return dlsDestinations.volEnvAttack;
          case generatorTypes.holdVolEnv: return dlsDestinations.volEnvHold;
          case generatorTypes.decayVolEnv: return dlsDestinations.volEnvDecay;
          case generatorTypes.sustainVolEnv: return {
            destination: dlsDestinations.volEnvSustain,
            amount: 1e3 - amount,
            isBipolar: false,
            source: dlsSources.none
          };
          case generatorTypes.releaseVolEnv: return dlsDestinations.volEnvRelease;
          case generatorTypes.delayModEnv: return dlsDestinations.modEnvDelay;
          case generatorTypes.attackModEnv: return dlsDestinations.modEnvAttack;
          case generatorTypes.holdModEnv: return dlsDestinations.modEnvHold;
          case generatorTypes.decayModEnv: return dlsDestinations.modEnvDecay;
          case generatorTypes.sustainModEnv: return {
            destination: dlsDestinations.modEnvSustain,
            amount: 1e3 - amount,
            isBipolar: false,
            source: dlsSources.none
          };
          case generatorTypes.releaseModEnv: return dlsDestinations.modEnvRelease;
          case generatorTypes.initialFilterFc: return dlsDestinations.filterCutoff;
          case generatorTypes.initialFilterQ: return dlsDestinations.filterQ;
          case generatorTypes.modEnvToFilterFc: return {
            source: dlsSources.modEnv,
            destination: dlsDestinations.filterCutoff,
            amount,
            isBipolar: false
          };
          case generatorTypes.modEnvToPitch: return {
            source: dlsSources.modEnv,
            destination: dlsDestinations.pitch,
            amount,
            isBipolar: false
          };
          case generatorTypes.modLfoToFilterFc: return {
            source: dlsSources.modLfo,
            destination: dlsDestinations.filterCutoff,
            amount,
            isBipolar: true
          };
          case generatorTypes.modLfoToVolume: return {
            source: dlsSources.modLfo,
            destination: dlsDestinations.gain,
            amount,
            isBipolar: true
          };
          case generatorTypes.modLfoToPitch: return {
            source: dlsSources.modLfo,
            destination: dlsDestinations.pitch,
            amount,
            isBipolar: true
          };
          case generatorTypes.vibLfoToPitch: return {
            source: dlsSources.vibratoLfo,
            destination: dlsDestinations.pitch,
            amount,
            isBipolar: true
          };
          case generatorTypes.keyNumToVolEnvHold: return {
            source: dlsSources.keyNum,
            destination: dlsDestinations.volEnvHold,
            amount,
            isBipolar: true
          };
          case generatorTypes.keyNumToVolEnvDecay: return {
            source: dlsSources.keyNum,
            destination: dlsDestinations.volEnvDecay,
            amount,
            isBipolar: true
          };
          case generatorTypes.keyNumToModEnvHold: return {
            source: dlsSources.keyNum,
            destination: dlsDestinations.modEnvHold,
            amount,
            isBipolar: true
          };
          case generatorTypes.keyNumToModEnvDecay: return {
            source: dlsSources.keyNum,
            destination: dlsDestinations.modEnvDecay,
            amount,
            isBipolar: true
          };
          case generatorTypes.scaleTuning: return {
            source: dlsSources.keyNum,
            destination: dlsDestinations.pitch,
            amount: amount * 128,
            isBipolar: false
          };
        }
      }
      toString() {
        return `Source: ${this.source.toString()},\nControl: ${this.control.toString()},\nScale: ${this.scale} >> 16 = ${this.shortScale},\nOutput transform: ${this.transformName}\nDestination: ${this.destinationName}`;
      }
      write() {
        const out = new IndexedByteArray(12);
        writeWord(out, this.source.source);
        writeWord(out, this.control.source);
        writeWord(out, this.destination);
        writeWord(out, this.transform | this.control.toTransformFlag() << 4 | this.source.toTransformFlag() << 10);
        writeDword(out, this.scale);
        return out;
      }
      toSFGenerator(zone) {
        const destination = this.destination;
        const value = this.shortScale;
        switch (destination) {
          default:
            SpessaSynthInfo(`%cFailed converting DLS articulator into SF generator: %c${this.toString()}%c\n(invalid destination)`, consoleColors.warn, consoleColors.value, consoleColors.unrecognized);
            return;
          case dlsDestinations.pan:
            zone.setGenerator(generatorTypes.pan, value);
            break;
          case dlsDestinations.gain:
            zone.addToGenerator(generatorTypes.initialAttenuation, -value / .4);
            break;
          case dlsDestinations.filterCutoff:
            zone.setGenerator(generatorTypes.initialFilterFc, value);
            break;
          case dlsDestinations.filterQ:
            zone.setGenerator(generatorTypes.initialFilterQ, value);
            break;
          case dlsDestinations.modLfoFreq:
            zone.setGenerator(generatorTypes.freqModLFO, value);
            break;
          case dlsDestinations.modLfoDelay:
            zone.setGenerator(generatorTypes.delayModLFO, value);
            break;
          case dlsDestinations.vibLfoFreq:
            zone.setGenerator(generatorTypes.freqVibLFO, value);
            break;
          case dlsDestinations.vibLfoDelay:
            zone.setGenerator(generatorTypes.delayVibLFO, value);
            break;
          case dlsDestinations.volEnvDelay:
            zone.setGenerator(generatorTypes.delayVolEnv, value);
            break;
          case dlsDestinations.volEnvAttack:
            zone.setGenerator(generatorTypes.attackVolEnv, value);
            break;
          case dlsDestinations.volEnvHold:
            zone.setGenerator(generatorTypes.holdVolEnv, value);
            break;
          case dlsDestinations.volEnvDecay:
            zone.setGenerator(generatorTypes.decayVolEnv, value);
            break;
          case dlsDestinations.volEnvRelease:
            zone.setGenerator(generatorTypes.releaseVolEnv, value);
            break;
          case dlsDestinations.volEnvSustain:
            zone.setGenerator(generatorTypes.sustainVolEnv, 1e3 - value);
            break;
          case dlsDestinations.modEnvDelay:
            zone.setGenerator(generatorTypes.delayModEnv, value);
            break;
          case dlsDestinations.modEnvAttack:
            zone.setGenerator(generatorTypes.attackModEnv, value);
            break;
          case dlsDestinations.modEnvHold:
            zone.setGenerator(generatorTypes.holdModEnv, value);
            break;
          case dlsDestinations.modEnvDecay:
            zone.setGenerator(generatorTypes.decayModEnv, value);
            break;
          case dlsDestinations.modEnvRelease:
            zone.setGenerator(generatorTypes.releaseModEnv, value);
            break;
          case dlsDestinations.modEnvSustain:
            zone.setGenerator(generatorTypes.sustainModEnv, 1e3 - value);
            break;
          case dlsDestinations.reverbSend:
            zone.setGenerator(generatorTypes.reverbEffectsSend, value);
            break;
          case dlsDestinations.chorusSend:
            zone.setGenerator(generatorTypes.chorusEffectsSend, value);
            break;
          case dlsDestinations.pitch:
            zone.fineTuning += value;
            break;
        }
      }
      toSFModulator(zone) {
        let amount = this.shortScale;
        let modulatorDestination;
        let primarySource;
        let secondarySource = new ModulatorSource();
        const specialDestination = this.toCombinedSFDestination();
        if (specialDestination) {
          modulatorDestination = specialDestination;
          const controlSF = this.control.toSFSource();
          if (!controlSF) {
            this.failedConversion("Invalid control");
            return;
          }
          primarySource = controlSF;
        } else {
          const convertedDestination = this.toSFDestination();
          if (!convertedDestination) {
            this.failedConversion("Invalid destination");
            return;
          }
          if (typeof convertedDestination === "object") {
            amount = convertedDestination.newAmount;
            modulatorDestination = convertedDestination.gen;
          } else modulatorDestination = convertedDestination;
          const convertedPrimary = this.source.toSFSource();
          if (!convertedPrimary) {
            this.failedConversion("Invalid source");
            return;
          }
          primarySource = convertedPrimary;
          const convertedSecondary = this.control.toSFSource();
          if (!convertedSecondary) {
            this.failedConversion("Invalid control");
            return;
          }
          secondarySource = convertedSecondary;
        }
        if (this.transform !== modulatorCurveTypes.linear && primarySource.curveType === modulatorCurveTypes.linear) primarySource.curveType = this.transform;
        if (modulatorDestination === generatorTypes.initialAttenuation) {
          if (this.source.source === dlsSources.velocity || this.source.source === dlsSources.volume || this.source.source === dlsSources.expression) primarySource.isNegative = true;
          amount = Math.min(960, Math.max(0, amount));
        }
        const mod = new Modulator(primarySource, secondarySource, modulatorDestination, amount, 0);
        zone.addModulators(mod);
      }
      /**
      * Checks for an SF generator that consists of DLS source and destination (such as mod LFO and pitch)
      * @returns either a matching SF generator or nothing.
      */
      toCombinedSFDestination() {
        const source = this.source.source;
        const destination = this.destination;
        if (source === dlsSources.vibratoLfo && destination === dlsDestinations.pitch) return generatorTypes.vibLfoToPitch;
        else if (source === dlsSources.modLfo && destination === dlsDestinations.pitch) return generatorTypes.modLfoToPitch;
        else if (source === dlsSources.modLfo && destination === dlsDestinations.filterCutoff) return generatorTypes.modLfoToFilterFc;
        else if (source === dlsSources.modLfo && destination === dlsDestinations.gain) return generatorTypes.modLfoToVolume;
        else if (source === dlsSources.modEnv && destination === dlsDestinations.filterCutoff) return generatorTypes.modEnvToFilterFc;
        else if (source === dlsSources.modEnv && destination === dlsDestinations.pitch) return generatorTypes.modEnvToPitch;
        else return;
      }
      failedConversion(msg) {
        SpessaSynthInfo(`%cFailed converting DLS articulator into SF2:\n %c${this.toString()}%c\n(${msg})`, consoleColors.warn, consoleColors.value, consoleColors.unrecognized);
      }
      /**
      * Converts DLS destination of this block to an SF2 one, also with the correct amount.
      * @private
      */
      toSFDestination() {
        const amount = this.shortScale;
        switch (this.destination) {
          default:
          case dlsDestinations.none: return;
          case dlsDestinations.pan: return generatorTypes.pan;
          case dlsDestinations.gain: return {
            gen: generatorTypes.initialAttenuation,
            newAmount: -amount
          };
          case dlsDestinations.pitch: return generatorTypes.fineTune;
          case dlsDestinations.keyNum: return generatorTypes.overridingRootKey;
          case dlsDestinations.volEnvDelay: return generatorTypes.delayVolEnv;
          case dlsDestinations.volEnvAttack: return generatorTypes.attackVolEnv;
          case dlsDestinations.volEnvHold: return generatorTypes.holdVolEnv;
          case dlsDestinations.volEnvDecay: return generatorTypes.decayVolEnv;
          case dlsDestinations.volEnvSustain: return {
            gen: generatorTypes.sustainVolEnv,
            newAmount: 1e3 - amount
          };
          case dlsDestinations.volEnvRelease: return generatorTypes.releaseVolEnv;
          case dlsDestinations.modEnvDelay: return generatorTypes.delayModEnv;
          case dlsDestinations.modEnvAttack: return generatorTypes.attackModEnv;
          case dlsDestinations.modEnvHold: return generatorTypes.holdModEnv;
          case dlsDestinations.modEnvDecay: return generatorTypes.decayModEnv;
          case dlsDestinations.modEnvSustain: return {
            gen: generatorTypes.sustainModEnv,
            newAmount: 1e3 - amount
          };
          case dlsDestinations.modEnvRelease: return generatorTypes.releaseModEnv;
          case dlsDestinations.filterCutoff: return generatorTypes.initialFilterFc;
          case dlsDestinations.filterQ: return generatorTypes.initialFilterQ;
          case dlsDestinations.chorusSend: return generatorTypes.chorusEffectsSend;
          case dlsDestinations.reverbSend: return generatorTypes.reverbEffectsSend;
          case dlsDestinations.modLfoFreq: return generatorTypes.freqModLFO;
          case dlsDestinations.modLfoDelay: return generatorTypes.delayModLFO;
          case dlsDestinations.vibLfoFreq: return generatorTypes.freqVibLFO;
          case dlsDestinations.vibLfoDelay: return generatorTypes.delayVibLFO;
        }
      }
    };
    //#endregion
    //#region src/soundbank/downloadable_sounds/articulation.ts
    var DownloadableSoundsArticulation = class extends DLSVerifier {
      connectionBlocks = new Array();
      mode = "dls2";
      get length() {
        return this.connectionBlocks.length;
      }
      copyFrom(inputArticulation) {
        this.mode = inputArticulation.mode;
        for (const block of inputArticulation.connectionBlocks) this.connectionBlocks.push(ConnectionBlock.copyFrom(block));
      }
      fromSFZone(z) {
        this.mode = "dls2";
        const zone = new BasicZone();
        zone.copyFrom(z);
        for (const relativeGenerator of zone.generators) {
          let absoluteCounterpart;
          switch (relativeGenerator.generatorType) {
            default: continue;
            case generatorTypes.keyNumToVolEnvDecay:
              absoluteCounterpart = generatorTypes.decayVolEnv;
              break;
            case generatorTypes.keyNumToVolEnvHold:
              absoluteCounterpart = generatorTypes.holdVolEnv;
              break;
            case generatorTypes.keyNumToModEnvDecay:
              absoluteCounterpart = generatorTypes.decayModEnv;
              break;
            case generatorTypes.keyNumToModEnvHold: absoluteCounterpart = generatorTypes.holdModEnv;
          }
          const absoluteValue = zone.getGenerator(absoluteCounterpart, void 0);
          const dlsRelative = relativeGenerator.generatorValue * -128;
          if (absoluteValue === void 0) continue;
          const newAbsolute = absoluteValue - 60 / 128 * dlsRelative;
          zone.setGenerator(relativeGenerator.generatorType, dlsRelative, false);
          zone.setGenerator(absoluteCounterpart, newAbsolute, false);
        }
        for (const generator of zone.generators) ConnectionBlock.fromSFGenerator(generator, this);
        for (const modulator of zone.modulators) ConnectionBlock.fromSFModulator(modulator, this);
      }
      /**
      * Chunk list for the region/instrument (containing lar2 or lart)
      * @param chunks
      */
      read(chunks) {
        const lart = RIFFChunk.findListType(chunks, "lart");
        const lar2 = RIFFChunk.findListType(chunks, "lar2");
        if (lart) {
          this.mode = "dls1";
          while (lart.data.currentIndex < lart.data.length) {
            const chunk = RIFFChunk.read(lart.data);
            if (chunk.header !== "art1" && chunk.header !== "art2") continue;
            const artData = chunk.data;
            const cbSize = readLittleEndianIndexed(artData, 4);
            if (cbSize !== 8) SpessaSynthWarn(`CbSize in articulation mismatch. Expected 8, got ${cbSize}`);
            const connectionsAmount = readLittleEndianIndexed(artData, 4);
            for (let i = 0; i < connectionsAmount; i++) this.connectionBlocks.push(ConnectionBlock.read(artData));
          }
        } else if (lar2) {
          this.mode = "dls2";
          while (lar2.data.currentIndex < lar2.data.length) {
            const chunk = RIFFChunk.read(lar2.data);
            if (chunk.header !== "art1" && chunk.header !== "art2") continue;
            const artData = chunk.data;
            const cbSize = readLittleEndianIndexed(artData, 4);
            if (cbSize !== 8) SpessaSynthWarn(`CbSize in articulation mismatch. Expected 8, got ${cbSize}`);
            const connectionsAmount = readLittleEndianIndexed(artData, 4);
            for (let i = 0; i < connectionsAmount; i++) this.connectionBlocks.push(ConnectionBlock.read(artData));
          }
        }
      }
      /**
      * Note: this writes "lar2", not just "art2"
      */
      write() {
        const art2Data = new IndexedByteArray(8);
        writeDword(art2Data, 8);
        writeDword(art2Data, this.connectionBlocks.length);
        const out = this.connectionBlocks.map((a) => a.write());
        const art2 = RIFFChunk.writeParts(this.mode === "dls2" ? "art2" : "art1", [art2Data, ...out]);
        return RIFFChunk.write(this.mode === "dls2" ? "lar2" : "lart", art2, false, true);
      }
      /**
      * Converts DLS articulation into an SF zone.
      * @param zone The zone to write to.
      */
      toSFZone(zone) {
        const applyKeyToCorrection = (value, keyToGen, realGen, dlsDestination) => {
          const keyToGenValue = value / -128;
          zone.setGenerator(keyToGen, keyToGenValue);
          if (keyToGenValue <= 120) {
            const correction = Math.round(60 / 128 * value);
            const realValueConnection = this.connectionBlocks.find((block) => block.isStaticParameter && block.destination === dlsDestination);
            if (realValueConnection) zone.setGenerator(realGen, correction + realValueConnection.shortScale);
          }
        };
        for (const connection of this.connectionBlocks) {
          const amount = connection.shortScale;
          const source = connection.source.source;
          const control = connection.control.source;
          const destination = connection.destination;
          if (connection.isStaticParameter) {
            connection.toSFGenerator(zone);
            continue;
          }
          if (control === dlsSources.none) if (source === dlsSources.keyNum) {
            if (destination === dlsDestinations.pitch) {
              zone.setGenerator(generatorTypes.scaleTuning, amount / 128);
              continue;
            }
            if (destination === dlsDestinations.modEnvHold || destination === dlsDestinations.modEnvDecay || destination === dlsDestinations.volEnvHold || destination === dlsDestinations.volEnvDecay) continue;
          } else {
            const specialGen = connection.toCombinedSFDestination();
            if (specialGen) {
              zone.setGenerator(specialGen, amount);
              continue;
            }
          }
          connection.toSFModulator(zone);
        }
        for (const connection of this.connectionBlocks) {
          if (connection.source.source !== dlsSources.keyNum) continue;
          const generatorAmount = connection.shortScale;
          switch (connection.destination) {
            default:
            case dlsDestinations.volEnvHold:
              applyKeyToCorrection(generatorAmount, generatorTypes.keyNumToVolEnvHold, generatorTypes.holdVolEnv, dlsDestinations.volEnvHold);
              break;
            case dlsDestinations.volEnvDecay:
              applyKeyToCorrection(generatorAmount, generatorTypes.keyNumToVolEnvDecay, generatorTypes.decayVolEnv, dlsDestinations.volEnvDecay);
              break;
            case dlsDestinations.modEnvHold:
              applyKeyToCorrection(generatorAmount, generatorTypes.keyNumToModEnvHold, generatorTypes.holdModEnv, dlsDestinations.modEnvHold);
              break;
            case dlsDestinations.modEnvDecay:
              applyKeyToCorrection(generatorAmount, generatorTypes.keyNumToModEnvDecay, generatorTypes.decayModEnv, dlsDestinations.modEnvDecay);
              break;
          }
        }
        if (this.mode === "dls1") {
          zone.setGenerator(generatorTypes.delayVibLFO, zone.getGenerator(generatorTypes.delayModLFO, null));
          zone.setGenerator(generatorTypes.freqVibLFO, zone.getGenerator(generatorTypes.freqModLFO, null));
          zone.setGenerator(generatorTypes.vibLfoToPitch, zone.getGenerator(generatorTypes.modLfoToPitch, null));
          zone.setGenerator(generatorTypes.modLfoToPitch, null);
          for (const mod of zone.modulators) if (mod.destination === generatorTypes.modLfoToPitch) mod.destination = generatorTypes.vibLfoToPitch;
        }
      }
    };
    //#endregion
    //#region src/soundbank/downloadable_sounds/wave_link.ts
    var WaveLink = class WaveLink {
      /**
      * Specifies the channel placement of the sample. This is used to place mono sounds within a
      * stereo pair or for multi-track placement. Each bit position within the ulChannel field specifies
      * a channel placement with bit 0 specifying a mono sample or the left channel of a stereo file.
      */
      channel = 1;
      /**
      * Specifies the 0 based index of the cue entry in the wave pool table.
      */
      tableIndex;
      /**
      * Specifies flag options for this wave link. All bits not defined must be set to 0.
      */
      fusOptions = 0;
      /**
      * Specifies a group number for samples which are phase locked. All waves in a set of wave
      * links with the same group are phase locked and follow the wave in the group with the
      * F_WAVELINK_PHASE_MASTER flag set. If a wave is not a member of a phase locked
      * group, this value should be set to 0.
      */
      phaseGroup = 0;
      constructor(tableIndex) {
        this.tableIndex = tableIndex;
      }
      static copyFrom(waveLink) {
        const wlnk = new WaveLink(waveLink.tableIndex);
        wlnk.channel = waveLink.channel;
        wlnk.phaseGroup = waveLink.phaseGroup;
        wlnk.fusOptions = waveLink.fusOptions;
        return wlnk;
      }
      static read(chunk) {
        const fusOptions = readLittleEndianIndexed(chunk.data, 2);
        const phaseGroup = readLittleEndianIndexed(chunk.data, 2);
        const ulChannel = readLittleEndianIndexed(chunk.data, 4);
        const wlnk = new WaveLink(readLittleEndianIndexed(chunk.data, 4));
        wlnk.channel = ulChannel;
        wlnk.fusOptions = fusOptions;
        wlnk.phaseGroup = phaseGroup;
        return wlnk;
      }
      static fromSFZone(samples, zone) {
        const index = samples.indexOf(zone.sample);
        if (index === -1) throw new Error(`Wave link error: Sample ${zone.sample.name} does not exist in the sample list.`);
        const waveLink = new WaveLink(index);
        switch (zone.sample.sampleType) {
          default:
          case sampleTypes.leftSample:
          case sampleTypes.monoSample:
            waveLink.channel = Math.trunc(1);
            break;
          case sampleTypes.rightSample: waveLink.channel = 2;
        }
        return waveLink;
      }
      write() {
        const wlnkData = new IndexedByteArray(12);
        writeWord(wlnkData, this.fusOptions);
        writeWord(wlnkData, this.phaseGroup);
        writeDword(wlnkData, this.channel);
        writeDword(wlnkData, this.tableIndex);
        return RIFFChunk.write("wlnk", wlnkData);
      }
    };
    //#endregion
    //#region src/soundbank/downloadable_sounds/region.ts
    var DownloadableSoundsRegion = class DownloadableSoundsRegion extends DLSVerifier {
      articulation = new DownloadableSoundsArticulation();
      /**
      * Specifies the key range for this region.
      */
      keyRange = {
        min: 0,
        max: 127
      };
      /**
      * Specifies the velocity range for this region.
      */
      velRange = {
        min: 0,
        max: 127
      };
      /**
      * Specifies the key group for a drum instrument. Key group values allow multiple regions
      * within a drum instrument to belong to the same "key group." If a synthesis engine is
      * instructed to play a note with a key group setting and any other notes are currently playing
      * with this same key group, then the synthesis engine should turn off all notes with the same
      * key group value as soon as possible.
      */
      keyGroup = 0;
      /**
      * Specifies flag options for the synthesis of this region.
      */
      fusOptions = 0;
      /**
      * Indicates the layer of this region for editing purposes. This field facilitates the
      * organization of overlapping regions into layers for display to the user of a DLS sound editor.
      * For example, if a piano sound and a string section are overlapped to create a piano/string pad,
      * all the regions of the piano might be labeled as layer 1, and all the regions of the string
      * section might be labeled as layer 2
      */
      usLayer = 0;
      waveSample;
      waveLink;
      constructor(waveLink, waveSample) {
        super();
        this.waveSample = waveSample;
        this.waveLink = waveLink;
      }
      static copyFrom(inputRegion) {
        const outputRegion = new DownloadableSoundsRegion(WaveLink.copyFrom(inputRegion.waveLink), WaveSample.copyFrom(inputRegion.waveSample));
        outputRegion.keyGroup = inputRegion.keyGroup;
        outputRegion.keyRange = { ...inputRegion.keyRange };
        outputRegion.velRange = { ...inputRegion.velRange };
        outputRegion.usLayer = inputRegion.usLayer;
        outputRegion.fusOptions = inputRegion.fusOptions;
        outputRegion.articulation.copyFrom(inputRegion.articulation);
        return outputRegion;
      }
      static read(samples, chunk) {
        const regionChunks = this.verifyAndReadList(chunk, "rgn ", "rgn2");
        const waveSampleChunk = regionChunks.find((c) => c.header === "wsmp");
        let waveSample = waveSampleChunk ? WaveSample.read(waveSampleChunk) : void 0;
        const waveLinkChunk = regionChunks.find((c) => c.header === "wlnk");
        if (!waveLinkChunk) {
          SpessaSynthWarn("Invalid DLS region: missing 'wlnk' chunk! Discarding...");
          return;
        }
        const waveLink = WaveLink.read(waveLinkChunk);
        const regionHeader = regionChunks.find((c) => c.header === "rgnh");
        if (!regionHeader) {
          SpessaSynthWarn("Invalid DLS region: missing 'rgnh' chunk! Discarding...");
          return;
        }
        const sample = samples[waveLink.tableIndex];
        if (!sample) DownloadableSoundsRegion.parsingError(`Invalid sample index: ${waveLink.tableIndex}. Samples available: ${samples.length}`);
        waveSample ??= sample.waveSample;
        const region = new DownloadableSoundsRegion(waveLink, waveSample);
        const keyMin = readLittleEndianIndexed(regionHeader.data, 2);
        const keyMax = readLittleEndianIndexed(regionHeader.data, 2);
        let velMin = readLittleEndianIndexed(regionHeader.data, 2);
        let velMax = readLittleEndianIndexed(regionHeader.data, 2);
        if (velMin === 0 && velMax === 0) {
          velMax = 127;
          velMin = 0;
        }
        region.keyRange.max = keyMax;
        region.keyRange.min = keyMin;
        region.velRange.max = velMax;
        region.velRange.min = velMin;
        region.fusOptions = readLittleEndianIndexed(regionHeader.data, 2);
        region.keyGroup = readLittleEndianIndexed(regionHeader.data, 2);
        if (regionHeader.data.length - regionHeader.data.currentIndex >= 2) region.usLayer = readLittleEndianIndexed(regionHeader.data, 2);
        region.articulation.read(regionChunks);
        return region;
      }
      static fromSFZone(zone, samples) {
        const waveSample = WaveSample.fromSFZone(zone);
        const region = new DownloadableSoundsRegion(WaveLink.fromSFZone(samples, zone), waveSample);
        region.keyRange.min = Math.max(zone.keyRange.min, 0);
        region.keyRange.max = zone.keyRange.max;
        region.velRange.min = Math.max(zone.velRange.min, 0);
        region.velRange.max = zone.velRange.max;
        region.keyGroup = zone.getGenerator(generatorTypes.exclusiveClass, 0);
        region.articulation.fromSFZone(zone);
        return region;
      }
      write() {
        const chunks = [
          this.writeHeader(),
          this.waveSample.write(),
          this.waveLink.write(),
          this.articulation.write()
        ];
        return RIFFChunk.writeParts("rgn2", chunks, true);
      }
      toSFZone(instrument, samples) {
        const sample = samples[this.waveLink.tableIndex];
        if (!sample) DownloadableSoundsRegion.parsingError(`Invalid sample index: ${this.waveLink.tableIndex}`);
        const zone = instrument.createZone(sample);
        zone.keyRange = this.keyRange;
        zone.velRange = this.velRange;
        if (this.keyRange.max === 127 && this.keyRange.min === 0) zone.keyRange.min = -1;
        if (this.velRange.max === 127 && this.velRange.min === 0) zone.velRange.min = -1;
        if (this.keyGroup !== 0) zone.setGenerator(generatorTypes.exclusiveClass, this.keyGroup);
        this.waveSample.toSFZone(zone, sample);
        this.articulation.toSFZone(zone);
        zone.generators = zone.generators.filter((g) => g.generatorValue !== generatorLimits[g.generatorType].def);
        return zone;
      }
      writeHeader() {
        const rgnhData = new IndexedByteArray(14);
        writeWord(rgnhData, Math.max(this.keyRange.min, 0));
        writeWord(rgnhData, this.keyRange.max);
        writeWord(rgnhData, Math.max(this.velRange.min, 0));
        writeWord(rgnhData, this.velRange.max);
        writeWord(rgnhData, this.fusOptions);
        writeWord(rgnhData, this.keyGroup);
        writeWord(rgnhData, this.usLayer);
        return RIFFChunk.write("rgnh", rgnhData);
      }
    };
    //#endregion
    //#region src/soundbank/downloadable_sounds/instrument.ts
    /**
    * Represents a proper DLS instrument, with regions and articulation.
    * DLS
    */
    var DownloadableSoundsInstrument = class DownloadableSoundsInstrument extends DLSVerifier {
      articulation = new DownloadableSoundsArticulation();
      regions = new Array();
      name = "Unnamed";
      bankLSB = 0;
      bankMSB = 0;
      isGMGSDrum = false;
      program = 0;
      static copyFrom(inputInstrument) {
        const outputInstrument = new DownloadableSoundsInstrument();
        outputInstrument.name = inputInstrument.name;
        outputInstrument.isGMGSDrum = inputInstrument.isGMGSDrum;
        outputInstrument.bankMSB = inputInstrument.bankMSB;
        outputInstrument.bankLSB = inputInstrument.bankLSB;
        outputInstrument.program = inputInstrument.program;
        outputInstrument.articulation.copyFrom(inputInstrument.articulation);
        for (const region of inputInstrument.regions) outputInstrument.regions.push(DownloadableSoundsRegion.copyFrom(region));
        return outputInstrument;
      }
      static read(samples, chunk) {
        const chunks = this.verifyAndReadList(chunk, "ins ");
        const instrumentHeader = chunks.find((c) => c.header === "insh");
        if (!instrumentHeader) {
          SpessaSynthGroupEnd();
          throw new Error("No instrument header!");
        }
        let instrumentName = ``;
        const infoChunk = RIFFChunk.findListType(chunks, "INFO");
        if (infoChunk) {
          let info = RIFFChunk.read(infoChunk.data);
          while (info.header !== "INAM") info = RIFFChunk.read(infoChunk.data);
          instrumentName = readBinaryStringIndexed(info.data, info.data.length).trim();
        }
        if (instrumentName.length === 0) instrumentName = `Unnamed Instrument`;
        const instrument = new DownloadableSoundsInstrument();
        instrument.name = instrumentName;
        const regions = readLittleEndianIndexed(instrumentHeader.data, 4);
        /**
        *
        * Specifies the MIDI bank location. Bits 0-6 are defined as MIDI CC32 and bits 8-14 are
        * defined as MIDI CC0. Bits 7 and 15-30 are reserved and should be written to zero. If the
        * F_INSTRUMENT_DRUMS flag (Bit 31) is equal to 1 then the instrument is a drum
        * instrument; if equal to 0 then the instrument is a melodic instrument.
        */
        const ulBank = readLittleEndianIndexed(instrumentHeader.data, 4);
        instrument.program = readLittleEndianIndexed(instrumentHeader.data, 4) & 127;
        instrument.bankMSB = ulBank >>> 8 & 127;
        instrument.bankLSB = ulBank & 127;
        instrument.isGMGSDrum = ulBank >>> 31 > 0;
        SpessaSynthGroupCollapsed(`%cParsing %c"${instrumentName}"%c...`, consoleColors.info, consoleColors.recognized, consoleColors.info);
        const regionListChunk = RIFFChunk.findListType(chunks, "lrgn");
        if (!regionListChunk) {
          SpessaSynthGroupEnd();
          throw new Error("No region list!");
        }
        instrument.articulation.read(chunks);
        for (let i = 0; i < regions; i++) {
          const chunk = RIFFChunk.read(regionListChunk.data);
          this.verifyHeader(chunk, "LIST");
          const type = readBinaryStringIndexed(chunk.data, 4);
          if (type !== "rgn " && type !== "rgn2") {
            SpessaSynthGroupEnd();
            this.parsingError(`Invalid DLS region! Expected "rgn " or "rgn2" got "${type}"`);
          }
          const region = DownloadableSoundsRegion.read(samples, chunk);
          if (region) instrument.regions.push(region);
        }
        SpessaSynthGroupEnd();
        return instrument;
      }
      static fromSFPreset(preset, samples) {
        const instrument = new DownloadableSoundsInstrument();
        instrument.name = preset.name;
        instrument.bankLSB = preset.bankLSB;
        instrument.bankMSB = preset.bankMSB;
        instrument.program = preset.program;
        instrument.isGMGSDrum = preset.isGMGSDrum;
        SpessaSynthGroup(`%cConverting %c${preset.toString()}%c to DLS...`, consoleColors.info, consoleColors.value, consoleColors.info);
        const inst = preset.toFlattenedInstrument();
        for (const z of inst.zones) instrument.regions.push(DownloadableSoundsRegion.fromSFZone(z, samples));
        SpessaSynthGroupEnd();
        return instrument;
      }
      write() {
        SpessaSynthGroupCollapsed(`%cWriting %c${this.name}%c...`, consoleColors.info, consoleColors.recognized, consoleColors.info);
        const chunks = [this.writeHeader()];
        const regionChunks = this.regions.map((r) => r.write());
        chunks.push(RIFFChunk.writeParts("lrgn", regionChunks, true));
        if (this.articulation.length > 0) chunks.push(this.articulation.write());
        const inam = RIFFChunk.write("INAM", getStringBytes(this.name, true));
        chunks.push(RIFFChunk.write("INFO", inam, false, true));
        SpessaSynthGroupEnd();
        return RIFFChunk.writeParts("ins ", chunks, true);
      }
      /**
      * Performs the full DLS to SF2 instrument conversion.
      */
      toSFPreset(soundBank) {
        const preset = new BasicPreset(soundBank);
        preset.name = this.name;
        preset.bankMSB = this.bankMSB;
        preset.bankLSB = this.bankLSB;
        preset.isGMGSDrum = this.isGMGSDrum;
        preset.program = this.program;
        const instrument = new BasicInstrument();
        instrument.name = this.name;
        preset.createZone(instrument);
        this.articulation.toSFZone(instrument.globalZone);
        for (const region of this.regions) region.toSFZone(instrument, soundBank.samples);
        instrument.globalize();
        if (!instrument.globalZone.modulators.some((m) => m.destination === generatorTypes.reverbEffectsSend)) instrument.globalZone.addModulators(Modulator.copyFrom(DEFAULT_DLS_REVERB));
        if (!instrument.globalZone.modulators.some((m) => m.destination === generatorTypes.chorusEffectsSend)) instrument.globalZone.addModulators(Modulator.copyFrom(DEFAULT_DLS_CHORUS));
        instrument.globalZone.generators = instrument.globalZone.generators.filter((g) => g.generatorValue !== generatorLimits[g.generatorType].def);
        soundBank.addPresets(preset);
        soundBank.addInstruments(instrument);
      }
      writeHeader() {
        const inshData = new IndexedByteArray(12);
        writeDword(inshData, this.regions.length);
        let ulBank = (this.bankMSB & 127) << 8 | this.bankLSB & 127;
        if (this.isGMGSDrum) ulBank |= 1 << 31;
        writeDword(inshData, ulBank);
        writeDword(inshData, this.program & 127);
        return RIFFChunk.write("insh", inshData);
      }
    };
    //#endregion
    //#region src/soundbank/downloadable_sounds/downloadable_sounds.ts
    const DEFAULT_DLS_OPTIONS = { progressFunction: void 0 };
    var DownloadableSounds = class DownloadableSounds extends DLSVerifier {
      samples = new Array();
      instruments = new Array();
      soundBankInfo = {
        name: "Unnamed DLS sound bank",
        creationDate: /* @__PURE__ */ new Date(),
        software: "SpessaSynth",
        soundEngine: "DLS Level 2.2",
        product: "SpessaSynth DLS",
        version: {
          major: 2,
          minor: 4
        }
      };
      static read(buffer) {
        if (!buffer) throw new Error("No data provided!");
        const dataArray = new IndexedByteArray(buffer);
        SpessaSynthGroup("%cParsing DLS file...", consoleColors.info);
        const firstChunk = RIFFChunk.read(dataArray, false);
        this.verifyHeader(firstChunk, "RIFF");
        this.verifyText(readBinaryStringIndexed(dataArray, 4).toLowerCase(), "dls ");
        /**
        * Read the list
        */
        const chunks = [];
        while (dataArray.currentIndex < dataArray.length) chunks.push(RIFFChunk.read(dataArray));
        const dls = new DownloadableSounds();
        const infoChunk = RIFFChunk.findListType(chunks, "INFO");
        if (infoChunk) while (infoChunk.data.currentIndex < infoChunk.data.length) {
          const infoPart = RIFFChunk.read(infoChunk.data);
          const headerTyped = infoPart.header;
          const text = readBinaryStringIndexed(infoPart.data, infoPart.size);
          switch (headerTyped) {
            case "INAM":
              dls.soundBankInfo.name = text;
              break;
            case "ICRD":
              dls.soundBankInfo.creationDate = parseDateString(text);
              break;
            case "ICMT":
              dls.soundBankInfo.comment = text;
              break;
            case "ISBJ":
              dls.soundBankInfo.subject = text;
              break;
            case "ICOP":
              dls.soundBankInfo.copyright = text;
              break;
            case "IENG":
              dls.soundBankInfo.engineer = text;
              break;
            case "IPRD":
              dls.soundBankInfo.product = text;
              break;
            case "ISFT": dls.soundBankInfo.software = text;
          }
        }
        this.printInfo(dls);
        const colhChunk = chunks.find((c) => c.header === "colh");
        if (!colhChunk) {
          this.parsingError("No colh chunk!");
          return 5;
        }
        const instrumentAmount = readLittleEndianIndexed(colhChunk.data, 4);
        SpessaSynthInfo(`%cInstruments amount: %c${instrumentAmount}`, consoleColors.info, consoleColors.recognized);
        const waveListChunk = RIFFChunk.findListType(chunks, "wvpl");
        if (!waveListChunk) {
          this.parsingError("No wvpl chunk!");
          return 5;
        }
        const waveList = this.verifyAndReadList(waveListChunk, "wvpl");
        for (const wave of waveList) dls.samples.push(DownloadableSoundsSample.read(wave));
        const instrumentListChunk = RIFFChunk.findListType(chunks, "lins");
        if (!instrumentListChunk) {
          this.parsingError("No lins chunk!");
          return 5;
        }
        const instruments = this.verifyAndReadList(instrumentListChunk, "lins");
        SpessaSynthGroupCollapsed("%cLoading instruments...", consoleColors.info);
        if (instruments.length !== instrumentAmount) SpessaSynthWarn(`Colh reported invalid amount of instruments. Detected ${instruments.length}, expected ${instrumentAmount}`);
        for (const ins of instruments) dls.instruments.push(DownloadableSoundsInstrument.read(dls.samples, ins));
        SpessaSynthGroupEnd();
        const aliasingChunk = chunks.find((c) => c.header === "pgal");
        if (aliasingChunk) {
          SpessaSynthInfo("%cFound the instrument aliasing chunk!", consoleColors.recognized);
          const pgalData = aliasingChunk.data;
          if (pgalData[0] !== 0 || pgalData[1] !== 1 || pgalData[2] !== 2 || pgalData[3] !== 3) pgalData.currentIndex += 4;
          const drumInstrument = dls.instruments.find((i) => BankSelectHacks.isXGDrums(i.bankMSB) || i.isGMGSDrum);
          if (!drumInstrument) {
            SpessaSynthWarn("MobileBAE aliasing chunk without a drum preset. Aborting!");
            return dls;
          }
          const drumAliases = pgalData.slice(pgalData.currentIndex, pgalData.currentIndex + 128);
          pgalData.currentIndex += 128;
          for (let keyNum = 0; keyNum < 128; keyNum++) {
            const alias = drumAliases[keyNum];
            if (alias === keyNum) continue;
            const region = drumInstrument.regions.find((r) => r.keyRange.max === alias && r.keyRange.min === alias);
            if (!region) {
              SpessaSynthWarn(`Invalid drum alias ${keyNum} to ${alias}: region does not exist.`);
              continue;
            }
            const copied = DownloadableSoundsRegion.copyFrom(region);
            copied.keyRange.max = keyNum;
            copied.keyRange.min = keyNum;
            drumInstrument.regions.push(copied);
          }
          pgalData.currentIndex += 4;
          while (pgalData.currentIndex < pgalData.length) {
            const aliasBankNum = readLittleEndianIndexed(pgalData, 2);
            const aliasBankLSB = aliasBankNum & 127;
            const aliasBankMSB = aliasBankNum >> 7 & 127;
            const aliasProgram = pgalData[pgalData.currentIndex++];
            let nullByte = pgalData[pgalData.currentIndex++];
            if (nullByte !== 0) SpessaSynthWarn(`Invalid alias byte. Expected 0, got ${nullByte}`);
            const inputBankNum = readLittleEndianIndexed(pgalData, 2);
            const inputBankLSB = inputBankNum & 127;
            const inputBankMSB = inputBankNum >> 7 & 127;
            const inputProgram = pgalData[pgalData.currentIndex++];
            nullByte = pgalData[pgalData.currentIndex++];
            if (nullByte !== 0) SpessaSynthWarn(`Invalid alias header. Expected 0, got ${nullByte}`);
            const inputInstrument = dls.instruments.find((inst) => inst.bankLSB === inputBankLSB && inst.bankMSB === inputBankMSB && inst.program === inputProgram && !inst.isGMGSDrum);
            if (!inputInstrument) {
              SpessaSynthWarn(`Invalid alias. Missing instrument: ${inputBankLSB}:${inputBankMSB}:${inputProgram}`);
              continue;
            }
            const alias = DownloadableSoundsInstrument.copyFrom(inputInstrument);
            alias.bankMSB = aliasBankMSB;
            alias.bankLSB = aliasBankLSB;
            alias.program = aliasProgram;
            dls.instruments.push(alias);
          }
        }
        SpessaSynthInfo(`%cParsing finished! %c"${dls.soundBankInfo.name || "UNNAMED"}"%c has %c${dls.instruments.length}%c instruments and %c${dls.samples.length}%c samples.`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized, consoleColors.info);
        SpessaSynthGroupEnd();
        return dls;
      }
      /**
      * Performs a full conversion from BasicSoundBank to DownloadableSounds.
      */
      static fromSF(bank) {
        SpessaSynthGroupCollapsed("%cSaving SF2 to DLS level 2...", consoleColors.info);
        const dls = new DownloadableSounds();
        dls.soundBankInfo = { ...bank.soundBankInfo };
        for (const s of bank.samples) dls.samples.push(DownloadableSoundsSample.fromSFSample(s));
        for (const p of bank.presets) dls.instruments.push(DownloadableSoundsInstrument.fromSFPreset(p, bank.samples));
        SpessaSynthInfo("%cConversion complete!", consoleColors.recognized);
        SpessaSynthGroupEnd();
        return dls;
      }
      static printInfo(dls) {
        for (const [info, value] of Object.entries(dls.soundBankInfo)) if (typeof value === "object" && "major" in value) {
          const v = value;
          SpessaSynthInfo(`%c${info}: %c"${v.major}.${v.minor}"`, consoleColors.info, consoleColors.recognized);
        } else SpessaSynthInfo(`%c${info}: %c${value.toLocaleString()}`, consoleColors.info, consoleColors.recognized);
      }
      /**
      * Writes a DLS file
      * @param options
      */
      async write(options = DEFAULT_DLS_OPTIONS) {
        SpessaSynthGroupCollapsed("%cSaving DLS...", consoleColors.info);
        const colhNum = new IndexedByteArray(4);
        writeDword(colhNum, this.instruments.length);
        const colh = RIFFChunk.write("colh", colhNum);
        SpessaSynthGroupCollapsed("%cWriting instruments...", consoleColors.info);
        const lins = RIFFChunk.writeParts("lins", this.instruments.map((i) => i.write()), true);
        SpessaSynthInfo("%cSuccess!", consoleColors.recognized);
        SpessaSynthGroupEnd();
        SpessaSynthGroupCollapsed("%cWriting WAVE samples...", consoleColors.info);
        let currentIndex = 0;
        const ptblOffsets = [];
        const samples = [];
        let written = 0;
        for (const s of this.samples) {
          const out = s.write();
          await options?.progressFunction?.(s.name, written, this.samples.length);
          ptblOffsets.push(currentIndex);
          currentIndex += out.length;
          samples.push(out);
          written++;
        }
        const wvpl = RIFFChunk.writeParts("wvpl", samples, true);
        SpessaSynthInfo("%cSucceeded!", consoleColors.recognized);
        const ptblData = new IndexedByteArray(8 + 4 * ptblOffsets.length);
        writeDword(ptblData, 8);
        writeDword(ptblData, ptblOffsets.length);
        for (const offset of ptblOffsets) writeDword(ptblData, offset);
        const ptbl = RIFFChunk.write("ptbl", ptblData);
        this.soundBankInfo.software = "SpessaSynth";
        const infos = [];
        const info = this.soundBankInfo;
        const writeDLSInfo = (type, data) => {
          if (!data) return;
          infos.push(RIFFChunk.write(type, getStringBytes(data, true)));
        };
        writeDLSInfo("INAM", info.name);
        writeDLSInfo("ICMT", info.comment);
        writeDLSInfo("ICOP", info.copyright);
        writeDLSInfo("ICRD", toISODateString(info.creationDate));
        writeDLSInfo("IENG", info.engineer);
        writeDLSInfo("IPRD", info.product);
        writeDLSInfo("ISFT", options.software ?? "SpessaSynth");
        writeDLSInfo("ISBJ", info.subject);
        SpessaSynthInfo("%cCombining everything...");
        const out = RIFFChunk.writeParts("RIFF", [
          getStringBytes("DLS "),
          colh,
          lins,
          ptbl,
          wvpl,
          RIFFChunk.writeParts("INFO", infos, true)
        ]);
        SpessaSynthInfo("%cSaved successfully!", consoleColors.recognized);
        SpessaSynthGroupEnd();
        return out.buffer;
      }
      /**
      * Performs a full conversion from DownloadableSounds to BasicSoundBank.
      */
      toSF() {
        SpessaSynthGroup("%cConverting DLS to SF2...", consoleColors.info);
        const soundBank = new BasicSoundBank();
        soundBank.soundBankInfo.version.minor = 4;
        soundBank.soundBankInfo.version.major = 2;
        soundBank.soundBankInfo = { ...this.soundBankInfo };
        for (const sample of this.samples) sample.toSFSample(soundBank);
        for (const instrument of this.instruments) instrument.toSFPreset(soundBank);
        soundBank.flush();
        SpessaSynthInfo("%cConversion complete!", consoleColors.recognized);
        SpessaSynthGroupEnd();
        return soundBank;
      }
    };
    //#endregion
    //#region src/soundbank/basic_soundbank/basic_soundbank.ts
    /**
    * Represents a single sound bank, be it DLS or SF2.
    */
    var BasicSoundBank = class BasicSoundBank {
      /**
      * Indicates if the SF3/SF2Pack decoder is ready.
      */
      static isSF3DecoderReady = stb.isInitialized;
      /**
      * Sound bank's info.
      */
      soundBankInfo = {
        name: "Unnamed",
        creationDate: /* @__PURE__ */ new Date(),
        software: "SpessaSynth",
        soundEngine: "E-mu 10K2",
        version: {
          major: 2,
          minor: 4
        }
      };
      /**
      * The sound bank's presets.
      */
      presets = [];
      /**
      * The sound bank's samples.
      */
      samples = [];
      /**
      * The sound bank's instruments.
      */
      instruments = [];
      /**
      * Sound bank's default modulators.
      */
      defaultModulators = SPESSASYNTH_DEFAULT_MODULATORS.map(Modulator.copyFrom.bind(Modulator));
      /**
      * If the sound bank has custom default modulators (DMOD).
      */
      customDefaultModulators = false;
      _isXGBank = false;
      /**
      * Checks for XG drum sets and considers if this sound bank is XG.
      */
      get isXGBank() {
        return this._isXGBank;
      }
      /**
      * Merges sound banks with the given order. Keep in mind that the info read is copied from the first one
      * @param soundBanks the sound banks to merge, the first overwrites the last
      */
      static mergeSoundBanks(...soundBanks) {
        const mainSf = soundBanks.shift();
        if (!mainSf) throw new Error("No sound banks provided!");
        const presets = mainSf.presets;
        while (soundBanks.length > 0) {
          const newPresets = soundBanks?.shift()?.presets;
          if (newPresets) {
            for (const newPreset of newPresets) if (!presets.some((existingPreset) => newPreset.matches(existingPreset))) presets.push(newPreset);
          }
        }
        const b = new BasicSoundBank();
        b.addCompletePresets(presets);
        b.soundBankInfo = { ...mainSf.soundBankInfo };
        return b;
      }
      /**
      * Creates a simple sound bank with one saw wave preset.
      */
      static async getSampleSoundBankFile() {
        const font = new BasicSoundBank();
        const sampleData = new Float32Array(128);
        for (let i = 0; i < 128; i++) sampleData[i] = i / 128 * 2 - 1;
        const sample = new EmptySample();
        sample.name = "Saw";
        sample.originalKey = 65;
        sample.pitchCorrection = 20;
        sample.loopEnd = 127;
        sample.setAudioData(sampleData, 44100);
        font.addSamples(sample);
        const inst = new BasicInstrument();
        inst.name = "Saw Wave";
        inst.globalZone.addGenerators(new Generator(generatorTypes.initialAttenuation, 375), new Generator(generatorTypes.releaseVolEnv, -1e3), new Generator(generatorTypes.sampleModes, 1));
        inst.createZone(sample);
        inst.createZone(sample).setGenerator(generatorTypes.fineTune, -9);
        font.addInstruments(inst);
        const preset = new BasicPreset(font);
        preset.name = "Saw Wave";
        preset.createZone(inst);
        font.addPresets(preset);
        font.soundBankInfo.name = "Dummy";
        font.flush();
        return await font.writeSF2();
      }
      /**
      * Copies a given sound bank.
      * @param bank The sound bank to copy.
      */
      static copyFrom(bank) {
        const copied = new BasicSoundBank();
        for (const p of bank.presets) copied.clonePreset(p);
        copied.soundBankInfo = { ...bank.soundBankInfo };
        return copied;
      }
      /**
      * Adds complete presets along with their instruments and samples.
      * @param presets The presets to add.
      */
      addCompletePresets(presets) {
        this.addPresets(...presets);
        const instrumentList = [];
        for (const preset of presets) for (const zone of preset.zones) if (zone.instrument && !instrumentList.includes(zone.instrument)) instrumentList.push(zone.instrument);
        this.addInstruments(...instrumentList);
        const sampleList = [];
        for (const instrument of instrumentList) for (const zone of instrument.zones) if (zone.sample && !sampleList.includes(zone.sample)) sampleList.push(zone.sample);
        this.addSamples(...sampleList);
      }
      /**
      * Write the sound bank as a .dls file. This may not be 100% accurate.
      * @param options - options for writing the file.
      * @returns the binary file.
      */
      async writeDLS(options = DEFAULT_DLS_OPTIONS) {
        return DownloadableSounds.fromSF(this).write(options);
      }
      /**
      * Writes the sound bank as an SF2 file.
      * @param writeOptions the options for writing.
      * @returns the binary file data.
      */
      async writeSF2(writeOptions = DEFAULT_SF2_WRITE_OPTIONS) {
        return writeSF2Internal(this, writeOptions);
      }
      addPresets(...presets) {
        this.presets.push(...presets);
      }
      addInstruments(...instruments) {
        this.instruments.push(...instruments);
      }
      addSamples(...samples) {
        this.samples.push(...samples);
      }
      /**
      * Clones a sample into this bank.
      * @param sample The sample to copy.
      * @returns the copied sample, if a sample exists with that name, it is returned instead
      */
      cloneSample(sample) {
        const duplicate = this.samples.find((s) => s.name === sample.name);
        if (duplicate) return duplicate;
        const newSample = new BasicSample(sample.name, sample.sampleRate, sample.originalKey, sample.pitchCorrection, sample.sampleType, sample.loopStart, sample.loopEnd);
        if (sample.isCompressed) newSample.setCompressedData(sample.getRawData(true));
        else newSample.setAudioData(sample.getAudioData(), sample.sampleRate);
        this.addSamples(newSample);
        if (sample.linkedSample) {
          const clonedLinked = this.cloneSample(sample.linkedSample);
          if (!clonedLinked.linkedSample) newSample.setLinkedSample(clonedLinked, newSample.sampleType);
        }
        return newSample;
      }
      /**
      * Recursively clones an instrument into this sound bank, as well as its samples.
      * @returns the copied instrument, if an instrument exists with that name, it is returned instead.
      */
      cloneInstrument(instrument) {
        const duplicate = this.instruments.find((i) => i.name === instrument.name);
        if (duplicate) return duplicate;
        const newInstrument = new BasicInstrument();
        newInstrument.name = instrument.name;
        newInstrument.globalZone.copyFrom(instrument.globalZone);
        for (const zone of instrument.zones) newInstrument.createZone(this.cloneSample(zone.sample)).copyFrom(zone);
        this.addInstruments(newInstrument);
        return newInstrument;
      }
      /**
      * Recursively clones a preset into this sound bank, as well as its instruments and samples.
      * @returns the copied preset, if a preset exists with that name, it is returned instead.
      */
      clonePreset(preset) {
        const duplicate = this.presets.find((p) => p.name === preset.name);
        if (duplicate) return duplicate;
        const newPreset = new BasicPreset(this);
        newPreset.name = preset.name;
        newPreset.bankMSB = preset.bankMSB;
        newPreset.bankLSB = preset.bankLSB;
        newPreset.isGMGSDrum = preset.isGMGSDrum;
        newPreset.program = preset.program;
        newPreset.library = preset.library;
        newPreset.genre = preset.genre;
        newPreset.morphology = preset.morphology;
        newPreset.globalZone.copyFrom(preset.globalZone);
        for (const zone of preset.zones) newPreset.createZone(this.cloneInstrument(zone.instrument)).copyFrom(zone);
        this.addPresets(newPreset);
        return newPreset;
      }
      /**
      * Updates internal values.
      */
      flush() {
        this.presets.sort(MIDIPatchTools.sorter.bind(MIDIPatchTools));
        this.parseInternal();
      }
      /**
      * Trims a sound bank to only contain samples in a given MIDI file.
      * @param mid - the MIDI file
      */
      trimSoundBank(mid) {
        const trimInstrumentZones = (instrument, combos) => {
          let trimmedIZones = 0;
          for (let iZoneIndex = 0; iZoneIndex < instrument.zones.length; iZoneIndex++) {
            const iZone = instrument.zones[iZoneIndex];
            const iKeyRange = iZone.keyRange;
            const iVelRange = iZone.velRange;
            let isIZoneUsed = false;
            for (const iCombo of combos) if (iCombo.key >= iKeyRange.min && iCombo.key <= iKeyRange.max && iCombo.velocity >= iVelRange.min && iCombo.velocity <= iVelRange.max) {
              isIZoneUsed = true;
              break;
            }
            if (!isIZoneUsed && iZone.sample) {
              SpessaSynthInfo(`%c${iZone.sample.name}%c removed from %c${instrument.name}%c.`, consoleColors.recognized, consoleColors.info, consoleColors.recognized, consoleColors.info);
              if (instrument.deleteZone(iZoneIndex)) {
                trimmedIZones++;
                iZoneIndex--;
                SpessaSynthInfo(`%c${iZone.sample.name}%c deleted`, consoleColors.recognized, consoleColors.info);
              }
              if (iZone.sample.useCount < 1) this.deleteSample(iZone.sample);
            }
          }
          return trimmedIZones;
        };
        SpessaSynthGroup("%cTrimming sound bank...", consoleColors.info);
        const usedProgramsAndKeys = mid.getUsedProgramsAndKeys(this);
        SpessaSynthGroupCollapsed("%cModifying sound bank...", consoleColors.info);
        SpessaSynthInfo("Detected keys for midi:", usedProgramsAndKeys);
        for (let presetIndex = 0; presetIndex < this.presets.length; presetIndex++) {
          const p = this.presets[presetIndex];
          const used = usedProgramsAndKeys.get(p);
          if (used === void 0) {
            SpessaSynthInfo(`%cDeleting preset %c${p.name}%c and its zones`, consoleColors.info, consoleColors.recognized, consoleColors.info);
            this.deletePreset(p);
            presetIndex--;
          } else {
            const combos = [...used].map((s) => {
              const split = s.split("-");
              return {
                key: Number.parseInt(split[0]),
                velocity: Number.parseInt(split[1])
              };
            });
            SpessaSynthGroupCollapsed(`%cTrimming %c${p.name}`, consoleColors.info, consoleColors.recognized);
            SpessaSynthInfo(`Keys for ${p.name}:`, combos);
            let trimmedZones = 0;
            for (let zoneIndex = 0; zoneIndex < p.zones.length; zoneIndex++) {
              const zone = p.zones[zoneIndex];
              const keyRange = zone.keyRange;
              const velRange = zone.velRange;
              let isZoneUsed = false;
              for (const combo of combos) if (combo.key >= keyRange.min && combo.key <= keyRange.max && combo.velocity >= velRange.min && combo.velocity <= velRange.max && zone.instrument) {
                isZoneUsed = true;
                SpessaSynthInfo(`%cTrimmed off %c${trimInstrumentZones(zone.instrument, combos)}%c zones from %c${zone.instrument.name}`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized);
                break;
              }
              if (!isZoneUsed && zone.instrument) {
                trimmedZones++;
                p.deleteZone(zoneIndex);
                if (zone.instrument.useCount < 1) this.deleteInstrument(zone.instrument);
                zoneIndex--;
              }
            }
            SpessaSynthInfo(`%cTrimmed off %c${trimmedZones}%c zones from %c${p.name}`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized);
            SpessaSynthGroupEnd();
          }
        }
        this.removeUnusedElements();
        SpessaSynthInfo("%cSound bank modified!", consoleColors.recognized);
        SpessaSynthGroupEnd();
        SpessaSynthGroupEnd();
      }
      removeUnusedElements() {
        this.instruments = this.instruments.filter((i) => {
          i.deleteUnusedZones();
          const deletable = i.useCount < 1;
          if (deletable) i.delete();
          return !deletable;
        });
        this.samples = this.samples.filter((s) => {
          const deletable = s.useCount < 1;
          if (deletable) s.unlinkSample();
          return !deletable;
        });
      }
      deleteInstrument(instrument) {
        instrument.delete();
        this.instruments.splice(this.instruments.indexOf(instrument), 1);
      }
      deletePreset(preset) {
        preset.delete();
        this.presets.splice(this.presets.indexOf(preset), 1);
      }
      deleteSample(sample) {
        sample.unlinkSample();
        this.samples.splice(this.samples.indexOf(sample), 1);
      }
      /**
      * Get the appropriate preset.
      */
      getPreset(patch, system) {
        return selectPreset(this.presets, patch, system);
      }
      destroySoundBank() {
        this.presets.length = 0;
        this.instruments.length = 0;
        this.samples.length = 0;
      }
      parsingError(error) {
        throw new Error(`SF parsing error: ${error} The file may be corrupted.`);
      }
      /**
      * Parses the bank after loading is done
      * @protected
      */
      parseInternal() {
        this._isXGBank = false;
        const allowedPrograms = new Set([
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          16,
          17,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          40,
          41,
          48,
          56,
          57,
          58,
          64,
          65,
          66,
          126,
          127
        ]);
        for (const preset of this.presets) if (BankSelectHacks.isXGDrums(preset.bankMSB)) {
          this._isXGBank = true;
          if (!allowedPrograms.has(preset.program)) {
            this._isXGBank = false;
            SpessaSynthInfo(`%cThis bank is not valid XG. Preset %c${preset.toString()}%c is not a valid XG drum. XG mode will use presets on bank 128.`, consoleColors.info, consoleColors.value, consoleColors.info);
            break;
          }
        }
      }
      printInfo() {
        for (const [info, value] of Object.entries(this.soundBankInfo)) if (typeof value === "object" && "major" in value) {
          const v = value;
          SpessaSynthInfo(`%c${info}: %c"${v.major}.${v.minor}"`, consoleColors.info, consoleColors.recognized);
        } else SpessaSynthInfo(`%c${info}: %c${value.toLocaleString()}`, consoleColors.info, consoleColors.recognized);
      }
    };
    //#endregion
    //#region src/soundbank/soundfont/read/generators.ts
    var ReadGenerator = class extends Generator {
      /**
      * Creates a generator
      */
      constructor(dataArray) {
        const i = dataArray.currentIndex;
        const generatorType = dataArray[i + 1] << 8 | dataArray[i];
        const generatorValue = signedInt16(dataArray[i + 2], dataArray[i + 3]);
        dataArray.currentIndex += 4;
        super(generatorType, generatorValue, false);
      }
    };
    /**
    * Reads the generators
    */
    function readGenerators(generatorChunk) {
      const gens = [];
      while (generatorChunk.data.length > generatorChunk.data.currentIndex) gens.push(new ReadGenerator(generatorChunk.data));
      gens.pop();
      return gens;
    }
    //#endregion
    //#region src/soundbank/soundfont/read/preset_zones.ts
    /**
    * Preset_zones.ts
    * purpose: reads preset zones from soundfont and gets their respective samples and generators and modulators
    */
    /**
    * Reads the given preset zone
    */
    function applyPresetZones(indexes, presetGens, presetMods, instruments, presets) {
      const genStartIndexes = indexes.gen;
      const modStartIndexes = indexes.mod;
      let modIndex = 0;
      let genIndex = 0;
      for (const preset of presets) for (let i = 0; i < preset.zonesCount; i++) {
        const gensStart = genStartIndexes[genIndex++];
        const gensEnd = genStartIndexes[genIndex];
        const gens = presetGens.slice(gensStart, gensEnd);
        const modsStart = modStartIndexes[modIndex++];
        const modsEnd = modStartIndexes[modIndex];
        const mods = presetMods.slice(modsStart, modsEnd);
        if (gens.some((g) => g.generatorType === generatorTypes.instrument)) preset.createSoundFontZone(mods, gens, instruments);
        else {
          preset.globalZone.addGenerators(...gens);
          preset.globalZone.addModulators(...mods);
        }
      }
    }
    //#endregion
    //#region src/soundbank/soundfont/read/presets.ts
    /**
    * Parses soundfont presets, also includes function for getting the generators and samples from midi note and velocity
    */
    var SoundFontPreset = class extends BasicPreset {
      zoneStartIndex;
      zonesCount = 0;
      /**
      * Creates a preset
      */
      constructor(presetChunk, sf2) {
        super(sf2);
        this.name = readBinaryStringIndexed(presetChunk.data, 20).replace(/\d{3}:\d{3}/, "");
        this.program = readLittleEndianIndexed(presetChunk.data, 2);
        const wBank = readLittleEndianIndexed(presetChunk.data, 2);
        this.bankMSB = wBank & 127;
        this.isGMGSDrum = (wBank & 128) > 0;
        this.bankLSB = wBank >> 8;
        this.zoneStartIndex = readLittleEndianIndexed(presetChunk.data, 2);
        this.library = readLittleEndianIndexed(presetChunk.data, 4);
        this.genre = readLittleEndianIndexed(presetChunk.data, 4);
        this.morphology = readLittleEndianIndexed(presetChunk.data, 4);
      }
      createSoundFontZone(modulators, generators, instruments) {
        const instrumentID = generators.find((g) => g.generatorType === generatorTypes.instrument);
        let instrument;
        if (instrumentID) instrument = instruments[instrumentID.generatorValue];
        else throw new Error("No instrument ID found in preset zone.");
        if (!instrument) throw new Error(`Invalid instrument ID: ${instrumentID.generatorValue}, available instruments: ${instruments.length}`);
        const z = new BasicPresetZone(this, instrument);
        z.addGenerators(...generators);
        z.addModulators(...modulators);
        this.zones.push(z);
        return z;
      }
    };
    /**
    * Reads the presets
    */
    function readPresets(presetChunk, parent) {
      const presets = [];
      while (presetChunk.data.length > presetChunk.data.currentIndex) {
        const preset = new SoundFontPreset(presetChunk, parent);
        if (presets.length > 0) {
          const previous = presets[presets.length - 1];
          previous.zonesCount = preset.zoneStartIndex - previous.zoneStartIndex;
        }
        presets.push(preset);
      }
      presets.pop();
      return presets;
    }
    //#endregion
    //#region src/soundbank/soundfont/read/instruments.ts
    /**
    * Instrument.ts
    * purpose: parses soundfont instrument and stores them as a class
    */
    var SoundFontInstrument = class extends BasicInstrument {
      zoneStartIndex;
      zonesCount = 0;
      /**
      * Creates an instrument
      */
      constructor(instrumentChunk) {
        super();
        this.name = readBinaryStringIndexed(instrumentChunk.data, 20);
        this.zoneStartIndex = readLittleEndianIndexed(instrumentChunk.data, 2);
      }
      createSoundFontZone(modulators, generators, samples) {
        const sampleID = generators.find((g) => g.generatorType === generatorTypes.sampleID);
        let sample;
        if (sampleID) sample = samples[sampleID.generatorValue];
        else throw new Error("No sample ID found in instrument zone.");
        if (!sample) throw new Error(`Invalid sample ID: ${sampleID.generatorValue}, available samples: ${samples.length}`);
        const z = new BasicInstrumentZone(this, sample);
        z.addGenerators(...generators);
        z.addModulators(...modulators);
        this.zones.push(z);
        return z;
      }
    };
    /**
    * Reads the instruments
    */
    function readInstruments(instrumentChunk) {
      const instruments = [];
      while (instrumentChunk.data.length > instrumentChunk.data.currentIndex) {
        const instrument = new SoundFontInstrument(instrumentChunk);
        if (instruments.length > 0) {
          const previous = instruments[instruments.length - 1];
          previous.zonesCount = instrument.zoneStartIndex - previous.zoneStartIndex;
        }
        instruments.push(instrument);
      }
      instruments.pop();
      return instruments;
    }
    //#endregion
    //#region src/soundbank/soundfont/read/modulators.ts
    /**
    * Reads the modulator read
    */
    function readModulators(modulatorChunk) {
      const mods = [];
      while (modulatorChunk.data.length > modulatorChunk.data.currentIndex) {
        const dataArray = modulatorChunk.data;
        const sourceEnum = readLittleEndianIndexed(dataArray, 2);
        const destination = readLittleEndianIndexed(dataArray, 2);
        const amount = signedInt16(dataArray[dataArray.currentIndex++], dataArray[dataArray.currentIndex++]);
        const secondarySourceEnum = readLittleEndianIndexed(dataArray, 2);
        const transformType = readLittleEndianIndexed(dataArray, 2);
        mods.push(new DecodedModulator(sourceEnum, secondarySourceEnum, destination, amount, transformType));
      }
      mods.pop();
      return mods;
    }
    //#endregion
    //#region src/soundbank/soundfont/read/instrument_zones.ts
    /**
    * Reads the given instrument zone
    */
    function applyInstrumentZones(indexes, instrumentGenerators, instrumentModulators, samples, instruments) {
      const genStartIndexes = indexes.gen;
      const modStartIndexes = indexes.mod;
      let modIndex = 0;
      let genIndex = 0;
      for (const instrument of instruments) for (let i = 0; i < instrument.zonesCount; i++) {
        const gensStart = genStartIndexes[genIndex++];
        const gensEnd = genStartIndexes[genIndex];
        const gens = instrumentGenerators.slice(gensStart, gensEnd);
        const modsStart = modStartIndexes[modIndex++];
        const modsEnd = modStartIndexes[modIndex];
        const mods = instrumentModulators.slice(modsStart, modsEnd);
        if (gens.some((g) => g.generatorType === generatorTypes.sampleID)) instrument.createSoundFontZone(mods, gens, samples);
        else {
          instrument.globalZone.addGenerators(...gens);
          instrument.globalZone.addModulators(...mods);
        }
      }
    }
    //#endregion
    //#region src/soundbank/soundfont/read/zones.ts
    /**
    * @param zonesChunk both pbag and ibag work
    */
    function readZoneIndexes(zonesChunk) {
      const modStartIndexes = [];
      const genStartIndexes = [];
      while (zonesChunk.data.length > zonesChunk.data.currentIndex) {
        genStartIndexes.push(readLittleEndianIndexed(zonesChunk.data, 2));
        modStartIndexes.push(readLittleEndianIndexed(zonesChunk.data, 2));
      }
      return {
        mod: modStartIndexes,
        gen: genStartIndexes
      };
    }
    //#endregion
    //#region src/soundbank/soundfont/read/soundfont.ts
    /**
    * Soundfont.ts
    * purpose: parses a soundfont2 file
    */
    var SoundFont2 = class extends BasicSoundBank {
      sampleDataStartIndex = 0;
      /**
      * Initializes a new SoundFont2 Parser and parses the given data array
      */
      constructor(arrayBuffer, warnDeprecated = true) {
        super();
        if (warnDeprecated) throw new Error("Using the constructor directly is deprecated. Use SoundBankLoader.fromArrayBuffer() instead.");
        const mainFileArray = new IndexedByteArray(arrayBuffer);
        SpessaSynthGroup("%cParsing a SoundFont2 file...", consoleColors.info);
        if (!mainFileArray) {
          SpessaSynthGroupEnd();
          this.parsingError("No data provided!");
        }
        const firstChunk = RIFFChunk.read(mainFileArray, false);
        this.verifyHeader(firstChunk, "riff");
        const type = readBinaryStringIndexed(mainFileArray, 4).toLowerCase();
        if (type !== "sfbk" && type !== "sfpk") {
          SpessaSynthGroupEnd();
          throw new SyntaxError(`Invalid soundFont! Expected "sfbk" or "sfpk" got "${type}"`);
        }
        const isSF2Pack = type === "sfpk";
        const infoChunk = RIFFChunk.read(mainFileArray);
        this.verifyHeader(infoChunk, "list");
        const infoString = readBinaryStringIndexed(infoChunk.data, 4);
        if (infoString !== "INFO") {
          SpessaSynthGroupEnd();
          throw new SyntaxError(`Invalid soundFont! Expected "INFO" got "${infoString}"`);
        }
        let xdtaChunk;
        while (infoChunk.data.length > infoChunk.data.currentIndex) {
          const chunk = RIFFChunk.read(infoChunk.data);
          const text = readBinaryString(chunk.data, chunk.data.length);
          const headerTyped = chunk.header;
          switch (headerTyped) {
            case "ifil":
            case "iver": {
              const major = readLittleEndianIndexed(chunk.data, 2);
              const minor = readLittleEndianIndexed(chunk.data, 2);
              if (headerTyped === "ifil") this.soundBankInfo.version = {
                major,
                minor
              };
              else this.soundBankInfo.romVersion = {
                major,
                minor
              };
              break;
            }
            case "DMOD":
              this.defaultModulators = readModulators(chunk);
              this.customDefaultModulators = true;
              break;
            case "LIST":
              if (readBinaryStringIndexed(chunk.data, 4) === "xdta") {
                SpessaSynthInfo("%cExtended SF2 found!", consoleColors.recognized);
                xdtaChunk = chunk;
              }
              break;
            case "ICRD":
              this.soundBankInfo.creationDate = parseDateString(readBinaryStringIndexed(chunk.data, chunk.data.length));
              break;
            case "ISFT":
              this.soundBankInfo.software = text;
              break;
            case "IPRD":
              this.soundBankInfo.product = text;
              break;
            case "IENG":
              this.soundBankInfo.engineer = text;
              break;
            case "ICOP":
              this.soundBankInfo.copyright = text;
              break;
            case "INAM":
              this.soundBankInfo.name = text;
              break;
            case "ICMT":
              this.soundBankInfo.comment = text;
              break;
            case "irom":
              this.soundBankInfo.romInfo = text;
              break;
            case "isng": this.soundBankInfo.soundEngine = text;
          }
        }
        this.printInfo();
        const xChunks = {};
        if (xdtaChunk !== void 0) {
          xChunks.phdr = RIFFChunk.read(xdtaChunk.data);
          xChunks.pbag = RIFFChunk.read(xdtaChunk.data);
          xChunks.pmod = RIFFChunk.read(xdtaChunk.data);
          xChunks.pgen = RIFFChunk.read(xdtaChunk.data);
          xChunks.inst = RIFFChunk.read(xdtaChunk.data);
          xChunks.ibag = RIFFChunk.read(xdtaChunk.data);
          xChunks.imod = RIFFChunk.read(xdtaChunk.data);
          xChunks.igen = RIFFChunk.read(xdtaChunk.data);
          xChunks.shdr = RIFFChunk.read(xdtaChunk.data);
        }
        const sdtaChunk = RIFFChunk.read(mainFileArray, false);
        this.verifyHeader(sdtaChunk, "list");
        this.verifyText(readBinaryStringIndexed(mainFileArray, 4), "sdta");
        SpessaSynthInfo("%cVerifying smpl chunk...", consoleColors.warn);
        const sampleDataChunk = RIFFChunk.read(mainFileArray, false);
        this.verifyHeader(sampleDataChunk, "smpl");
        let sampleData;
        if (isSF2Pack) {
          SpessaSynthInfo("%cSF2Pack detected, attempting to decode the smpl chunk...", consoleColors.info);
          try {
            sampleData = stb.decode(mainFileArray.buffer.slice(mainFileArray.currentIndex, mainFileArray.currentIndex + sdtaChunk.size - 12)).data[0];
          } catch (error) {
            SpessaSynthGroupEnd();
            throw new Error(`SF2Pack Ogg Vorbis decode error: ${error}`, { cause: error });
          }
          SpessaSynthInfo(`%cDecoded the smpl chunk! Length: %c${sampleData.length}`, consoleColors.info, consoleColors.value);
        } else {
          sampleData = mainFileArray;
          this.sampleDataStartIndex = mainFileArray.currentIndex;
        }
        SpessaSynthInfo(`%cSkipping sample chunk, length: %c${sdtaChunk.size - 12}`, consoleColors.info, consoleColors.value);
        mainFileArray.currentIndex += sdtaChunk.size - 12;
        SpessaSynthInfo("%cLoading preset data chunk...", consoleColors.warn);
        const presetChunk = RIFFChunk.read(mainFileArray);
        this.verifyHeader(presetChunk, "list");
        readBinaryStringIndexed(presetChunk.data, 4);
        const phdrChunk = RIFFChunk.read(presetChunk.data);
        this.verifyHeader(phdrChunk, "phdr");
        const pbagChunk = RIFFChunk.read(presetChunk.data);
        this.verifyHeader(pbagChunk, "pbag");
        const pmodChunk = RIFFChunk.read(presetChunk.data);
        this.verifyHeader(pmodChunk, "pmod");
        const pgenChunk = RIFFChunk.read(presetChunk.data);
        this.verifyHeader(pgenChunk, "pgen");
        const instChunk = RIFFChunk.read(presetChunk.data);
        this.verifyHeader(instChunk, "inst");
        const ibagChunk = RIFFChunk.read(presetChunk.data);
        this.verifyHeader(ibagChunk, "ibag");
        const imodChunk = RIFFChunk.read(presetChunk.data);
        this.verifyHeader(imodChunk, "imod");
        const igenChunk = RIFFChunk.read(presetChunk.data);
        this.verifyHeader(igenChunk, "igen");
        const shdrChunk = RIFFChunk.read(presetChunk.data);
        this.verifyHeader(shdrChunk, "shdr");
        SpessaSynthInfo("%cParsing samples...", consoleColors.info);
        /**
        * Read all the samples
        * (the current index points to start of the smpl read)
        */
        mainFileArray.currentIndex = this.sampleDataStartIndex;
        const samples = readSamples(shdrChunk, sampleData, xdtaChunk === void 0);
        if (xdtaChunk && xChunks.shdr) {
          const xSamples = readSamples(xChunks.shdr, new Float32Array(1), false);
          if (xSamples.length === samples.length) for (const [i, s] of samples.entries()) {
            s.name += xSamples[i].name;
            s.linkedSampleIndex |= xSamples[i].linkedSampleIndex << 16;
          }
        }
        for (const s of samples) s.name = s.name.trim();
        this.samples.push(...samples);
        const instrumentGenerators = readGenerators(igenChunk);
        const instrumentModulators = readModulators(imodChunk);
        const instruments = readInstruments(instChunk);
        if (xdtaChunk && xChunks.inst) {
          const xInst = readInstruments(xChunks.inst);
          if (xInst.length === instruments.length) {
            for (const [i, inst] of instruments.entries()) {
              inst.name += xInst[i].name;
              inst.zoneStartIndex |= xInst[i].zoneStartIndex << 16;
            }
            for (const [i, inst] of instruments.entries()) if (i < instruments.length - 1) inst.zonesCount = instruments[i + 1].zoneStartIndex - inst.zoneStartIndex;
          }
        }
        for (const i of instruments) i.name = i.name.trim();
        this.instruments.push(...instruments);
        const ibagIndexes = readZoneIndexes(ibagChunk);
        if (xdtaChunk && xChunks.ibag) {
          const extraIndexes = readZoneIndexes(xChunks.ibag);
          for (let i = 0; i < ibagIndexes.mod.length; i++) ibagIndexes.mod[i] |= extraIndexes.mod[i] << 16;
          for (let i = 0; i < ibagIndexes.gen.length; i++) ibagIndexes.gen[i] |= extraIndexes.gen[i] << 16;
        }
        /**
        * Read all the instrument zones (and apply them)
        */
        applyInstrumentZones(ibagIndexes, instrumentGenerators, instrumentModulators, this.samples, instruments);
        const presetGenerators = readGenerators(pgenChunk);
        const presetModulators = readModulators(pmodChunk);
        const presets = readPresets(phdrChunk, this);
        if (xdtaChunk && xChunks.phdr) {
          const xPreset = readPresets(xChunks.phdr, this);
          if (xPreset.length === presets.length) {
            for (const [i, pres] of presets.entries()) {
              pres.name += xPreset[i].name;
              pres.zoneStartIndex |= xPreset[i].zoneStartIndex << 16;
            }
            for (const [i, preset] of presets.entries()) if (i < presets.length - 1) preset.zonesCount = presets[i + 1].zoneStartIndex - preset.zoneStartIndex;
          }
        }
        for (const p of presets) p.name = p.name.trim();
        this.addPresets(...presets);
        const pbagIndexes = readZoneIndexes(pbagChunk);
        if (xdtaChunk && xChunks.pbag) {
          const extraIndexes = readZoneIndexes(xChunks.pbag);
          for (let i = 0; i < pbagIndexes.mod.length; i++) pbagIndexes.mod[i] |= extraIndexes.mod[i] << 16;
          for (let i = 0; i < pbagIndexes.gen.length; i++) pbagIndexes.gen[i] |= extraIndexes.gen[i] << 16;
        }
        applyPresetZones(pbagIndexes, presetGenerators, presetModulators, this.instruments, presets);
        this.flush();
        SpessaSynthInfo(`%cParsing finished! %c"${this.soundBankInfo.name}"%c has %c${this.presets.length}%c presets,
            %c${this.instruments.length}%c instruments and %c${this.samples.length}%c samples.`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized, consoleColors.info);
        SpessaSynthGroupEnd();
      }
      verifyHeader(chunk, expected) {
        if (chunk.header.toLowerCase() !== expected.toLowerCase()) {
          SpessaSynthGroupEnd();
          this.parsingError(`Invalid chunk header! Expected "${expected.toLowerCase()}" got "${chunk.header.toLowerCase()}"`);
        }
      }
      verifyText(text, expected) {
        if (text.toLowerCase() !== expected.toLowerCase()) {
          SpessaSynthGroupEnd();
          this.parsingError(`Invalid FourCC: Expected "${expected.toLowerCase()}" got "${text.toLowerCase()}"\``);
        }
      }
    };
    //#endregion
    //#region src/soundbank/sound_bank_loader.ts
    var SoundBankLoader = class {
      /**
      * Loads a sound bank from a file buffer.
      * @param buffer The binary file buffer to load.
      * @returns The loaded sound bank, a BasicSoundBank instance.
      */
      static fromArrayBuffer(buffer) {
        if (readBinaryStringIndexed(new IndexedByteArray(buffer.slice(8, 12)), 4).toLowerCase() === "dls ") return this.loadDLS(buffer);
        return new SoundFont2(buffer, false);
      }
      static loadDLS(buffer) {
        return DownloadableSounds.read(buffer).toSF();
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/voice_modulator.ts
    var VoiceModulator = class VoiceModulator extends Modulator {
      /**
      * Indicates if the given modulator is chorus or reverb effects modulator.
      * This is done to simulate BASSMIDI effects behavior:
      * - defaults to 1000 transform amount rather than 200
      * - values can be changed, but anything above 200 is 1000
      * (except for values above 1000, they are copied directly)
      * - all values below are multiplied by 5 (200 * 5 = 1000)
      * - still can be disabled if the soundfont has its own modulator curve
      * - this fixes the very low amount of reverb by default and doesn't break soundfonts
      */
      isEffectModulator;
      /**
      * The default resonant modulator does not affect the filter gain.
      * Neither XG nor GS responded to cc #74 in that way.
      */
      isDefaultResonantModulator;
      /**
      * If this is a modulation wheel modulator (for modulation depth range).
      */
      isModWheelModulator;
      constructor(s1, s2, destination, amount, transformType, isEffectModulator, isDefaultResonantModulator, isModWheelModulator) {
        super(s1, s2, destination, amount, transformType);
        this.isEffectModulator = isEffectModulator;
        this.isDefaultResonantModulator = isDefaultResonantModulator;
        this.isModWheelModulator = isModWheelModulator;
      }
      static fromData(s1, s2, destination, amount, transformType) {
        const s1Enum = s1.toSourceEnum();
        const s2Enum = s2.toSourceEnum();
        return new VoiceModulator(s1, s2, destination, amount, transformType, (s1Enum === 219 || s1Enum === 221) && s2Enum === 0 && (destination === generatorTypes.reverbEffectsSend || destination === generatorTypes.chorusEffectsSend), s1Enum === DEFAULT_RESONANT_MOD_SOURCE && s2Enum === 0 && destination === generatorTypes.initialFilterQ, (s1.isCC && s1.index === midiControllers.modulationWheel || s2.isCC && s2.index === midiControllers.modulationWheel) && (destination === generatorTypes.modLfoToPitch || destination === generatorTypes.vibLfoToPitch));
      }
      static fromModulator(mod) {
        return this.fromData(mod.primarySource, mod.secondarySource, mod.destination, mod.transformAmount, mod.transformType);
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/voice_cache.ts
    /**
    * Represents a cached voice
    */
    var CachedVoice = class {
      /**
      * Sample data of this voice.
      */
      sampleData;
      /**
      * The unmodulated (copied to) generators of the voice.
      */
      generators;
      /**
      * The voice's modulators.
      */
      modulators;
      /**
      * Exclusive class number for hi-hats etc.
      */
      exclusiveClass;
      /**
      * Target key of the voice (can be overridden by generators)
      */
      targetKey;
      /**
      * Target velocity of the voice (can be overridden by generators)
      */
      velocity;
      /**
      * MIDI root key of the sample
      */
      rootKey;
      /**
      * Start position of the loop
      */
      loopStart;
      /**
      * End position of the loop
      */
      loopEnd;
      /**
      * Playback step (rate) for sample pitch correction
      */
      playbackStep;
      loopingMode;
      constructor(voiceParams, midiNote, velocity, sampleRate) {
        const sample = voiceParams.sample;
        const generators = voiceParams.generators;
        this.modulators = voiceParams.modulators.map(VoiceModulator.fromModulator.bind(VoiceModulator));
        this.generators = generators;
        this.rootKey = sample.originalKey;
        if (generators[generatorTypes.overridingRootKey] > -1) this.rootKey = generators[generatorTypes.overridingRootKey];
        this.targetKey = midiNote;
        if (generators[generatorTypes.keyNum] > -1) this.targetKey = generators[generatorTypes.keyNum];
        this.velocity = velocity;
        if (generators[generatorTypes.velocity] > -1) this.velocity = generators[generatorTypes.velocity];
        this.exclusiveClass = generators[generatorTypes.exclusiveClass];
        this.loopStart = sample.loopStart;
        this.loopEnd = sample.loopEnd;
        this.sampleData = sample.getAudioData();
        this.playbackStep = sample.sampleRate / sampleRate * Math.pow(2, sample.pitchCorrection / 1200);
        this.loopingMode = generators[generatorTypes.sampleModes];
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/dsp_chain/lfo.ts
    const TWOPI = Math.PI * 2;
    /**
    * Gets the current value of the LFO at a given time (sine wave).
    * @param startTime The time when the LFO started (in seconds).
    * @param frequency The frequency of the LFO (in Hz).
    * @param currentTime The current time (in seconds).
    * @returns The LFO value, which oscillates between -1 and 1.
    */
    function getLFOValueSine(startTime, frequency, currentTime) {
      if (currentTime < startTime) return 0;
      const elapsed = currentTime - startTime;
      return Math.sin(TWOPI * frequency * elapsed);
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/dsp_chain/render_voice.ts
    const HALF_PI$1 = Math.PI / 2;
    const MIN_PAN$1 = -500;
    const MAX_PAN$1 = 500;
    const PAN_RESOLUTION$1 = MAX_PAN$1 - MIN_PAN$1;
    const panTableLeft$1 = new Float32Array(PAN_RESOLUTION$1 + 1);
    const panTableRight$1 = new Float32Array(PAN_RESOLUTION$1 + 1);
    for (let pan = MIN_PAN$1; pan <= MAX_PAN$1; pan++) {
      const realPan = (pan - MIN_PAN$1) / PAN_RESOLUTION$1;
      const tableIndex = pan - MIN_PAN$1;
      panTableLeft$1[tableIndex] = Math.cos(HALF_PI$1 * realPan);
      panTableRight$1[tableIndex] = Math.sin(HALF_PI$1 * realPan);
    }
    /**
    * Renders a voice to the stereo output buffer
    * @param voice the voice to render
    * @param timeNow current time in seconds
    * @param outputL the left output buffer
    * @param outputR the right output buffer
    * @param startIndex
    * @param sampleCount
    */
    function renderVoice(voice, timeNow, outputL, outputR, startIndex, sampleCount) {
      if (!voice.isInRelease && timeNow >= voice.releaseStartTime) {
        voice.isInRelease = true;
        voice.volEnv.startRelease(voice);
        voice.modEnv.startRelease(voice);
        if (voice.loopingMode === 3) voice.wavetable.isLooping = false;
      }
      voice.hasRendered = true;
      if (!voice.isActive) return;
      const core = this.synthCore;
      const sampleRate = core.sampleRate;
      const modulated = voice.modulatedGenerators;
      let targetKey = voice.targetKey;
      let cents = voice.pitchOffset + modulated[generatorTypes.fineTune] + this.octaveTuning[voice.midiNote] + this.channelTuningCents;
      let semitones = modulated[generatorTypes.coarseTune];
      const tuning = core.tunings[this.preset.program * 128 + voice.realKey];
      if (tuning !== -1) {
        targetKey = Math.trunc(tuning);
        cents += (tuning - targetKey) * 100;
      }
      if (voice.portamentoFromKey > -1) {
        const elapsed = Math.min((timeNow - voice.startTime) / voice.portamentoDuration, 1);
        const diff = targetKey - voice.portamentoFromKey;
        semitones -= diff * (1 - elapsed);
      }
      cents += (targetKey - voice.rootKey) * modulated[generatorTypes.scaleTuning];
      let lowpassExcursion = 0;
      let volumeExcursionCentibels = 0;
      let voiceGain = voice.gainModifier * (1 + modulated[generatorTypes.amplitude] / 1e3);
      if (timeNow >= voice.vibLfoStartTime) {
        const vibPitchDepth = modulated[generatorTypes.vibLfoToPitch];
        const vibFilterDepth = modulated[generatorTypes.vibLfoToFilterFc];
        const vibAmplitudeDepth = modulated[generatorTypes.vibLfoAmplitudeDepth];
        if (vibPitchDepth !== 0 || vibFilterDepth !== 0 || vibAmplitudeDepth !== 0) {
          const rateInc = Math.max(0, absCentsToHz(modulated[generatorTypes.freqVibLFO]) + modulated[generatorTypes.vibLfoRate] / 100) * sampleCount / sampleRate;
          const vibLfoValue = 1 - 4 * Math.abs(voice.vibLfoPhase - .5);
          if ((voice.vibLfoPhase += rateInc) >= 1) voice.vibLfoPhase -= 1;
          cents += vibLfoValue * vibPitchDepth;
          lowpassExcursion += vibLfoValue * vibFilterDepth;
          voiceGain *= 1 - (vibLfoValue + 1) / 2 * (vibAmplitudeDepth / 1e3);
        }
      }
      if (timeNow >= voice.modLfoStartTime) {
        const modPitchDepth = modulated[generatorTypes.modLfoToPitch];
        const modVolDepth = modulated[generatorTypes.modLfoToVolume];
        const modFilterDepth = modulated[generatorTypes.modLfoToFilterFc];
        const modAmplitudeDepth = modulated[generatorTypes.modLfoAmplitudeDepth];
        if (modPitchDepth !== 0 || modFilterDepth !== 0 || modVolDepth !== 0 || modAmplitudeDepth !== 0) {
          const rateInc = Math.max(0, absCentsToHz(modulated[generatorTypes.freqModLFO]) + modulated[generatorTypes.modLfoRate] / 100) * sampleCount / sampleRate;
          const modLfoValue = 1 - 4 * Math.abs(voice.modLfoPhase - .5);
          if ((voice.modLfoPhase += rateInc) >= 1) voice.modLfoPhase -= 1;
          cents += modLfoValue * modPitchDepth;
          volumeExcursionCentibels += -modLfoValue * modVolDepth;
          lowpassExcursion += modLfoValue * modFilterDepth;
          voiceGain *= 1 - (modLfoValue + 1) / 2 * (modAmplitudeDepth / 1e3);
        }
      }
      if (this.midiControllers[midiControllers.modulationWheel] === 0 && this.channelVibrato.depth > 0) cents += getLFOValueSine(voice.startTime + this.channelVibrato.delay, this.channelVibrato.rate, timeNow) * this.channelVibrato.depth;
      const modEnvPitchDepth = modulated[generatorTypes.modEnvToPitch];
      const modEnvFilterDepth = modulated[generatorTypes.modEnvToFilterFc];
      if (modEnvFilterDepth !== 0 || modEnvPitchDepth !== 0) {
        const modEnv = voice.modEnv.process(voice, timeNow);
        lowpassExcursion += modEnv * modEnvFilterDepth;
        cents += modEnv * modEnvPitchDepth;
      }
      volumeExcursionCentibels -= voice.resonanceOffset;
      const centsTotal = cents + semitones * 100 | 0;
      if (centsTotal !== voice.tuningCents) {
        voice.tuningCents = centsTotal;
        voice.tuningRatio = Math.pow(2, centsTotal / 1200);
      }
      const gainTarget = cbAttenuationToGain(modulated[generatorTypes.initialAttenuation]) * cbAttenuationToGain(volumeExcursionCentibels);
      if (voice.loopingMode === 2 && !voice.isInRelease) {
        voice.isActive = voice.volEnv.process(sampleCount, gainTarget);
        return;
      }
      const buffer = core.voiceBuffer;
      voice.isActive = voice.wavetable.process(sampleCount, voice.tuningRatio, buffer);
      let gain = voice.volEnv.outputGain;
      const envActive = voice.volEnv.process(sampleCount, gainTarget);
      const gainInc = (voice.volEnv.outputGain - gain) / sampleCount;
      {
        const f = voice.filter;
        const initialFc = modulated[generatorTypes.initialFilterFc];
        if (f.initialized) f.currentInitialFc += (initialFc - f.currentInitialFc) * LowpassFilter.smoothingConstant;
        else {
          f.initialized = true;
          f.currentInitialFc = initialFc;
        }
        const targetCutoff = f.currentInitialFc + lowpassExcursion;
        const modulatedResonance = modulated[generatorTypes.initialFilterQ];
        if (f.currentInitialFc > 13499 && targetCutoff > 13499 && modulatedResonance === 0) {
          f.currentInitialFc = 13500;
          for (let i = 0; i < sampleCount; i++) {
            buffer[i] *= gain;
            gain += gainInc;
          }
        } else {
          if (Math.abs(f.lastTargetCutoff - targetCutoff) > 1 || f.resonanceCb !== modulatedResonance) {
            f.lastTargetCutoff = targetCutoff;
            f.resonanceCb = modulatedResonance;
            f.calculateCoefficients(targetCutoff);
          }
          const { a0, a1, a2, a3, a4 } = f;
          let { x1, x2, y1, y2 } = f;
          for (let i = 0; i < sampleCount; i++) {
            const input = buffer[i];
            const filtered = a0 * input + a1 * x1 + a2 * x2 - a3 * y1 - y2 * a4;
            x2 = x1;
            x1 = input;
            y2 = y1;
            y1 = filtered;
            buffer[i] = filtered * gain;
            gain += gainInc;
          }
          f.x1 = x1;
          f.x2 = x2;
          f.y1 = y1;
          f.y2 = y2;
        }
      }
      voice.isActive = voice.isActive && envActive;
      let pan;
      if (voice.overridePan) pan = voice.overridePan;
      else {
        voice.currentPan += (modulated[generatorTypes.pan] - voice.currentPan) * core.panSmoothingFactor;
        pan = voice.currentPan;
      }
      const outputGain = core.masterParameters.masterGain * core.midiVolume * voiceGain;
      const index = pan + 500 | 0;
      const gainLeft = panTableLeft$1[index] * outputGain * core.panLeft;
      const gainRight = panTableRight$1[index] * outputGain * core.panRight;
      if (this.insertionEnabled) {
        const insertionL = core.insertionInputL;
        const insertionR = core.insertionInputR;
        for (let i = 0; i < sampleCount; i++) {
          const s = buffer[i];
          insertionL[i] += gainLeft * s;
          insertionR[i] += gainRight * s;
        }
        return;
      }
      for (let i = 0; i < sampleCount; i++) {
        const s = buffer[i];
        const idx = i + startIndex;
        outputL[idx] += gainLeft * s;
        outputR[idx] += gainRight * s;
      }
      if (!core.enableEffects) return;
      const reverbSend = modulated[generatorTypes.reverbEffectsSend] * voice.reverbSend;
      if (reverbSend > 0) {
        const reverbGain = core.masterParameters.reverbGain * outputGain * (reverbSend / 1e3);
        const reverb = core.reverbInput;
        for (let i = 0; i < sampleCount; i++) reverb[i] += reverbGain * buffer[i];
      }
      const chorusSend = modulated[generatorTypes.chorusEffectsSend] * voice.chorusSend;
      if (chorusSend > 0) {
        const chorusGain = core.masterParameters.chorusGain * (chorusSend / 1e3) * outputGain;
        const chorus = core.chorusInput;
        for (let i = 0; i < sampleCount; i++) chorus[i] += chorusGain * buffer[i];
      }
      if (core.delayActive) {
        const delaySend = this.midiControllers[midiControllers.variationDepth] * voice.delaySend;
        if (delaySend > 0) {
          const delayGain = outputGain * core.masterParameters.delayGain * ((delaySend >> 7) / 127);
          const delay = core.delayInput;
          for (let i = 0; i < sampleCount; i++) delay[i] += delayGain * buffer[i];
        }
      }
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/controller_control/data_entry/data_entry_coarse.ts
    const registeredParameterTypes = {
      pitchWheelRange: 0,
      fineTuning: 1,
      coarseTuning: 2,
      modulationDepth: 5,
      resetParameters: 16383
    };
    const nonRegisteredMSB = {
      partParameter: 1,
      drumPitch: 24,
      drumPitchFine: 25,
      drumLevel: 26,
      drumPan: 28,
      drumReverb: 29,
      drumChorus: 30,
      drumDelay: 31,
      awe32: 127,
      SF2: 120
    };
    /**
    * https://cdn.roland.com/assets/media/pdf/SC-88PRO_OM.pdf
    * http://hummer.stanford.edu/sig/doc/classes/MidiOutput/rpn.html
    * These also seem to match XG
    * @enum {number}
    */
    const nonRegisteredLSB = {
      vibratoRate: 8,
      vibratoDepth: 9,
      vibratoDelay: 10,
      TVFFilterCutoff: 32,
      TVFFilterResonance: 33,
      EGAttackTime: 99,
      EGDecayTime: 100,
      EGReleaseTime: 102
    };
    const coolInfo$2 = (chanNum, what, value, type) => {
      if (type.length > 0) type = " " + type;
      SpessaSynthInfo(`%c${what} for %c${chanNum}%c is now set to %c${value}%c${type}.`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.value, consoleColors.info);
    };
    const addDefaultVibrato = (chan) => {
      if (chan.channelVibrato.delay === 0 && chan.channelVibrato.rate === 0 && chan.channelVibrato.depth === 0) {
        chan.channelVibrato.depth = 50;
        chan.channelVibrato.rate = 8;
        chan.channelVibrato.delay = .6;
      }
    };
    /**
    * Executes a data entry coarse (MSB) change for the current channel.
    * @param dataCoarse The value to set for the data entry coarse controller (0-127).
    */
    function dataEntryCoarse(dataCoarse) {
      this.midiControllers[midiControllers.dataEntryMSB] = dataCoarse << 7;
      switch (this.dataEntryState) {
        default:
        case dataEntryStates.Idle: break;
        case dataEntryStates.NRPCoarse:
        case dataEntryStates.NRPFine: {
          const paramCoarse = this.midiControllers[midiControllers.nonRegisteredParameterMSB] >> 7;
          const paramFine = this.midiControllers[midiControllers.nonRegisteredParameterLSB] >> 7;
          const dataFine = this.midiControllers[midiControllers.dataEntryLSB] >> 7;
          if (this.synthCore.masterParameters.drumLock && paramCoarse >= nonRegisteredMSB.drumPitch && paramCoarse <= nonRegisteredMSB.drumDelay) return;
          switch (paramCoarse) {
            default:
              if (dataCoarse === 64) return;
              SpessaSynthInfo(`%cUnrecognized NRPN for %c${this.channel}%c: %c(0x${paramCoarse.toString(16).toUpperCase()} 0x${paramFine.toString(16).toUpperCase()})%c data value: %c${dataCoarse}`, consoleColors.warn, consoleColors.recognized, consoleColors.warn, consoleColors.unrecognized, consoleColors.warn, consoleColors.value);
              break;
            case nonRegisteredMSB.partParameter: {
              const paramLock = this.synthCore.masterParameters.nprnParamLock;
              const vibratoLock = this.synthCore.masterParameters.customVibratoLock || paramLock;
              switch (paramFine) {
                default:
                  if (dataCoarse === 64) return;
                  SpessaSynthInfo(`%cUnrecognized NRPN for %c${this.channel}%c: %c(0x${paramCoarse.toString(16)} 0x${paramFine.toString(16)})%c data value: %c${dataCoarse}`, consoleColors.warn, consoleColors.recognized, consoleColors.warn, consoleColors.unrecognized, consoleColors.warn, consoleColors.value);
                  break;
                case nonRegisteredLSB.vibratoRate:
                  if (this.sysExModulators.active) {
                    this.controllerChange(midiControllers.vibratoRate, dataCoarse);
                    return;
                  }
                  if (vibratoLock || dataCoarse === 64) return;
                  addDefaultVibrato(this);
                  this.channelVibrato.rate = dataCoarse / 64 * 8;
                  coolInfo$2(this.channel, "Vibrato rate", `${dataCoarse} = ${this.channelVibrato.rate}`, "Hz");
                  break;
                case nonRegisteredLSB.vibratoDepth:
                  if (vibratoLock || dataCoarse === 64) return;
                  addDefaultVibrato(this);
                  this.channelVibrato.depth = dataCoarse / 2;
                  coolInfo$2(this.channel, "Vibrato depth", `${dataCoarse} = ${this.channelVibrato.depth}`, "cents of detune");
                  break;
                case nonRegisteredLSB.vibratoDelay:
                  if (vibratoLock || dataCoarse === 64) return;
                  addDefaultVibrato(this);
                  this.channelVibrato.delay = dataCoarse / 64 / 3;
                  coolInfo$2(this.channel, "Vibrato delay", `${dataCoarse} = ${this.channelVibrato.delay}`, "seconds");
                  break;
                case nonRegisteredLSB.TVFFilterCutoff:
                  if (paramLock) return;
                  this.controllerChange(midiControllers.brightness, dataCoarse);
                  coolInfo$2(this.channel, "Filter cutoff", dataCoarse.toString(), "");
                  break;
                case nonRegisteredLSB.TVFFilterResonance:
                  if (paramLock) return;
                  this.controllerChange(midiControllers.filterResonance, dataCoarse);
                  coolInfo$2(this.channel, "Filter resonance", dataCoarse.toString(), "");
                  break;
                case nonRegisteredLSB.EGAttackTime:
                  if (paramLock) return;
                  this.controllerChange(midiControllers.attackTime, dataCoarse);
                  coolInfo$2(this.channel, "EG attack time", dataCoarse.toString(), "");
                  break;
                case nonRegisteredLSB.EGDecayTime:
                  if (paramLock) return;
                  this.controllerChange(midiControllers.decayTime, dataCoarse);
                  coolInfo$2(this.channel, "EG decay time", dataCoarse.toString(), "");
                  break;
                case nonRegisteredLSB.EGReleaseTime:
                  if (paramLock) return;
                  this.controllerChange(midiControllers.releaseTime, dataCoarse);
                  coolInfo$2(this.channel, "EG release time", dataCoarse.toString(), "");
                  break;
              }
              break;
            }
            case nonRegisteredMSB.drumPitch: {
              /**
              * https://github.com/spessasus/spessasynth_core/pull/58#issuecomment-3893343073
              * it's actually 50 cents! (not for XG though)
              * also if SC-55 preset is explicitly requested (MAP1 - LSB 1), it's 100 cents as well!
              */
              const pitch = this.channelSystem === "xg" || this.patch.bankLSB === 1 ? (dataCoarse - 64) * 100 : (dataCoarse - 64) * 50;
              this.drumParams[paramFine].pitch = pitch;
              coolInfo$2(this.channel, `Drum ${paramFine} pitch`, pitch, "cents");
              break;
            }
            case nonRegisteredMSB.drumPitchFine: {
              const pitch = dataCoarse - 64;
              this.drumParams[paramFine].pitch += pitch;
              coolInfo$2(this.channel, `Drum ${paramFine} pitch fine`, this.drumParams[paramFine].pitch, "cents");
              break;
            }
            case nonRegisteredMSB.drumLevel:
              this.drumParams[paramFine].gain = dataCoarse / 120;
              coolInfo$2(this.channel, `Drum ${paramFine} level`, dataCoarse, "");
              break;
            case nonRegisteredMSB.drumPan:
              this.drumParams[paramFine].pan = dataCoarse;
              coolInfo$2(this.channel, `Drum ${paramFine} pan`, dataCoarse, "");
              break;
            case nonRegisteredMSB.drumReverb:
              this.drumParams[paramFine].reverbGain = dataCoarse / 127;
              coolInfo$2(this.channel, `Drum ${paramFine} reverb level`, dataCoarse, "");
              break;
            case nonRegisteredMSB.drumChorus:
              this.drumParams[paramFine].chorusGain = dataCoarse / 127;
              coolInfo$2(this.channel, `Drum ${paramFine} chorus level`, dataCoarse, "");
              break;
            case nonRegisteredMSB.drumDelay:
              this.drumParams[paramFine].delayGain = dataCoarse / 127;
              coolInfo$2(this.channel, `Drum ${paramFine} delay level`, dataCoarse, "");
              break;
            case nonRegisteredMSB.awe32: break;
            case nonRegisteredMSB.SF2: {
              if (paramFine > 100) break;
              const gen = this.customControllers[customControllers.sf2NPRNGeneratorLSB];
              const offset = (dataCoarse << 7 | dataFine) - 8192;
              this.setGeneratorOffset(gen, offset);
              break;
            }
          }
          break;
        }
        case dataEntryStates.RPCoarse:
        case dataEntryStates.RPFine: {
          const rpnValue = this.midiControllers[midiControllers.registeredParameterMSB] | this.midiControllers[midiControllers.registeredParameterLSB] >> 7;
          switch (rpnValue) {
            default:
              SpessaSynthInfo(`%cUnrecognized RPN for %c${this.channel}%c: %c(0x${rpnValue.toString(16)})%c data value: %c${dataCoarse}`, consoleColors.warn, consoleColors.recognized, consoleColors.warn, consoleColors.unrecognized, consoleColors.warn, consoleColors.value);
              break;
            case registeredParameterTypes.pitchWheelRange:
              this.midiControllers[128 + modulatorSources.pitchWheelRange] = dataCoarse << 7;
              coolInfo$2(this.channel, "Pitch wheel range", dataCoarse.toString(), "semitones");
              break;
            case registeredParameterTypes.coarseTuning: {
              const semitones = dataCoarse - 64;
              this.setCustomController(customControllers.channelTuningSemitones, semitones);
              coolInfo$2(this.channel, "Coarse tuning", semitones.toString(), "semitones");
              break;
            }
            case registeredParameterTypes.fineTuning:
              this.setTuning(dataCoarse - 64, false);
              break;
            case registeredParameterTypes.modulationDepth:
              this.setModulationDepth(dataCoarse * 100);
              break;
            case registeredParameterTypes.resetParameters:
              this.resetParameters();
              break;
          }
        }
      }
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/controller_control/data_entry/awe32.ts
    /**
    * SoundBlaster AWE32 NRPN generator mappings.
    * http://archive.gamedev.net/archive/reference/articles/article445.html
    * https://github.com/user-attachments/files/15757220/adip301.pdf
    */
    const AWE_NRPN_GENERATOR_MAPPINGS = [
      generatorTypes.delayModLFO,
      generatorTypes.freqModLFO,
      generatorTypes.delayVibLFO,
      generatorTypes.freqVibLFO,
      generatorTypes.delayModEnv,
      generatorTypes.attackModEnv,
      generatorTypes.holdModEnv,
      generatorTypes.decayModEnv,
      generatorTypes.sustainModEnv,
      generatorTypes.releaseModEnv,
      generatorTypes.delayVolEnv,
      generatorTypes.attackVolEnv,
      generatorTypes.holdVolEnv,
      generatorTypes.decayVolEnv,
      generatorTypes.sustainVolEnv,
      generatorTypes.releaseVolEnv,
      generatorTypes.fineTune,
      generatorTypes.modLfoToPitch,
      generatorTypes.vibLfoToPitch,
      generatorTypes.modEnvToPitch,
      generatorTypes.modLfoToVolume,
      generatorTypes.initialFilterFc,
      generatorTypes.initialFilterQ,
      generatorTypes.modLfoToFilterFc,
      generatorTypes.modEnvToFilterFc,
      generatorTypes.chorusEffectsSend,
      generatorTypes.reverbEffectsSend
    ];
    const clip = (v, min, max) => Math.max(min, Math.min(max, v));
    const msToTimecents = (ms) => Math.max(-32768, 1200 * Math.log2(ms / 1e3));
    const hzToCents = (hz) => 6900 + 1200 * Math.log2(hz / 440);
    /**
    * Function that emulates AWE32 similarly to fluidsynth
    * https://github.com/FluidSynth/fluidsynth/wiki/FluidFeatures
    *
    * Note: This makes use of findings by mrbumpy409:
    * https://github.com/fluidSynth/fluidsynth/issues/1473
    *
    * The excellent test files are available here, also collected and converted by mrbumpy409:
    * https://github.com/mrbumpy409/AWE32-midi-conversions
    */
    function handleAWE32NRPN(aweGen, dataLSB, dataMSB) {
      let dataValue = dataMSB << 7 | dataLSB;
      dataValue -= 8192;
      const generator = AWE_NRPN_GENERATOR_MAPPINGS[aweGen];
      if (!generator) SpessaSynthWarn(`Invalid AWE32 LSB: %c${aweGen}`, consoleColors.unrecognized);
      let milliseconds, hertz, centibels, cents;
      switch (generator) {
        default: break;
        case generatorTypes.delayModLFO:
        case generatorTypes.delayVibLFO:
        case generatorTypes.delayVolEnv:
        case generatorTypes.delayModEnv:
          milliseconds = 4 * clip(dataValue, 0, 5900);
          this.setGeneratorOverride(generator, msToTimecents(milliseconds));
          break;
        case generatorTypes.attackVolEnv:
        case generatorTypes.attackModEnv:
          milliseconds = clip(dataValue, 0, 5940);
          this.setGeneratorOverride(generator, msToTimecents(milliseconds));
          break;
        case generatorTypes.holdVolEnv:
        case generatorTypes.holdModEnv:
          milliseconds = clip(dataValue, 0, 8191);
          this.setGeneratorOverride(generator, msToTimecents(milliseconds));
          break;
        case generatorTypes.decayModEnv:
        case generatorTypes.decayVolEnv:
        case generatorTypes.releaseVolEnv:
        case generatorTypes.releaseModEnv:
          milliseconds = 4 * clip(dataValue, 0, 5940);
          this.setGeneratorOverride(generator, msToTimecents(milliseconds));
          break;
        case generatorTypes.freqVibLFO:
        case generatorTypes.freqModLFO:
          hertz = .084 * dataLSB;
          this.setGeneratorOverride(generator, hzToCents(hertz), true);
          break;
        case generatorTypes.sustainVolEnv:
        case generatorTypes.sustainModEnv:
          centibels = dataLSB * 7.5;
          this.setGeneratorOverride(generator, centibels);
          break;
        case generatorTypes.fineTune:
          this.setGeneratorOverride(generator, dataValue, true);
          break;
        case generatorTypes.modLfoToPitch:
        case generatorTypes.vibLfoToPitch:
          cents = clip(dataValue, -127, 127) * 9.375;
          this.setGeneratorOverride(generator, cents, true);
          break;
        case generatorTypes.modEnvToPitch:
          cents = clip(dataValue, -127, 127) * 9.375;
          this.setGeneratorOverride(generator, cents);
          break;
        case generatorTypes.modLfoToVolume:
          centibels = 1.875 * dataLSB;
          this.setGeneratorOverride(generator, centibels, true);
          break;
        case generatorTypes.initialFilterFc: {
          const fcCents = 4335 + 59 * dataLSB;
          this.setGeneratorOverride(generator, fcCents, true);
          break;
        }
        case generatorTypes.initialFilterQ:
          centibels = 215 * (dataLSB / 127);
          this.setGeneratorOverride(generator, centibels, true);
          break;
        case generatorTypes.modLfoToFilterFc:
          cents = clip(dataValue, -64, 63) * 56.25;
          this.setGeneratorOverride(generator, cents, true);
          break;
        case generatorTypes.modEnvToFilterFc:
          cents = clip(dataValue, -64, 63) * 56.25;
          this.setGeneratorOverride(generator, cents);
          break;
        case generatorTypes.chorusEffectsSend:
        case generatorTypes.reverbEffectsSend:
          this.setGeneratorOverride(generator, clip(dataValue, 0, 255) * (1e3 / 255));
          break;
      }
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/controller_control/data_entry/data_entry_fine.ts
    /**
    * Executes a data entry fine (LSB) change for the current channel.
    * @param dataValue The value to set for the data entry fine controller (0-127).
    */
    function dataEntryFine(dataValue) {
      this.midiControllers[midiControllers.dataEntryLSB] = dataValue << 7;
      switch (this.dataEntryState) {
        default: break;
        case dataEntryStates.RPCoarse:
        case dataEntryStates.RPFine: {
          const rpnValue = this.midiControllers[midiControllers.registeredParameterMSB] | this.midiControllers[midiControllers.registeredParameterLSB] >> 7;
          switch (rpnValue) {
            default:
              SpessaSynthInfo(`%cUnrecognized RPN LSB for %c${this.channel}%c: %c(0x${rpnValue.toString(16)})%c data value: %c${dataValue}`, consoleColors.warn, consoleColors.recognized, consoleColors.warn, consoleColors.unrecognized, consoleColors.warn, consoleColors.value);
              break;
            case registeredParameterTypes.pitchWheelRange: {
              if (dataValue === 0) break;
              this.midiControllers[128 + modulatorSources.pitchWheelRange] |= dataValue;
              const actualTune = (this.midiControllers[128 + modulatorSources.pitchWheelRange] >> 7) + dataValue / 128;
              SpessaSynthInfo(`%cChannel ${this.channel} pitch wheel range. Semitones: %c${actualTune}`, consoleColors.info, consoleColors.value);
              break;
            }
            case registeredParameterTypes.fineTuning: {
              const finalTuning = this.customControllers[customControllers.channelTuning] << 7 | dataValue;
              this.setTuning(finalTuning * .01220703125);
              break;
            }
            case registeredParameterTypes.modulationDepth: {
              const cents = this.customControllers[customControllers.modulationMultiplier] * 50 + dataValue / 128 * 100;
              this.setModulationDepth(cents);
              break;
            }
            case 16383:
              this.resetParameters();
              break;
          }
          break;
        }
        case dataEntryStates.NRPFine: {
          const paramCoarse = this.midiControllers[midiControllers.nonRegisteredParameterMSB] >> 7;
          const paramFine = this.midiControllers[midiControllers.nonRegisteredParameterLSB] >> 7;
          if (paramCoarse === nonRegisteredMSB.SF2 || paramCoarse >= nonRegisteredMSB.drumPitch && paramCoarse <= nonRegisteredMSB.drumDelay || paramCoarse === nonRegisteredMSB.partParameter) return;
          switch (paramCoarse) {
            default:
              SpessaSynthInfo(`%cUnrecognized NRPN LSB for %c${this.channel}%c: %c(0x${paramCoarse.toString(16).toUpperCase()} 0x${paramFine.toString(16).toUpperCase()})%c data value: %c${dataValue}`, consoleColors.warn, consoleColors.recognized, consoleColors.warn, consoleColors.unrecognized, consoleColors.warn, consoleColors.value);
              break;
            case nonRegisteredMSB.awe32:
              handleAWE32NRPN.call(this, paramFine, dataValue, this.midiControllers[midiControllers.dataEntryMSB] >> 7);
              break;
          }
        }
      }
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/controller_control/controller_change.ts
    /**
    * Handles MIDI controller changes for a channel.
    * @param controllerNumber The MIDI controller number (0-127).
    * @param controllerValue The value of the controller (0-127).
    * @param sendEvent If an event should be emitted.
    * @remarks
    * This function processes MIDI controller changes, updating the channel's
    * midiControllers table and handling special cases like bank select,
    * data entry, and sustain pedal. It also computes modulators for all voices
    * in the channel based on the controller change.
    * to allow changes.
    */
    function controllerChange(controllerNumber, controllerValue, sendEvent = true) {
      if (controllerNumber > 127) throw new Error("Invalid MIDI Controller.");
      if (controllerNumber >= midiControllers.modulationWheelLSB && controllerNumber <= midiControllers.effectControl2LSB && controllerNumber !== midiControllers.dataEntryLSB) {
        const actualCCNum = controllerNumber - 32;
        if (this.lockedControllers[actualCCNum]) return;
        this.midiControllers[actualCCNum] = this.midiControllers[actualCCNum] & 16256 | controllerValue & 127;
        this.computeModulatorsAll(1, actualCCNum);
      }
      if (this.lockedControllers[controllerNumber]) return;
      this.midiControllers[controllerNumber] = controllerValue << 7;
      switch (controllerNumber) {
        case midiControllers.omniModeOff:
        case midiControllers.omniModeOn:
        case midiControllers.allNotesOff:
          this.stopAllNotes();
          break;
        case midiControllers.allSoundOff:
          this.stopAllNotes(true);
          break;
        case midiControllers.polyModeOn:
          this.stopAllNotes(true);
          this.polyMode = true;
          break;
        case midiControllers.monoModeOn:
          this.stopAllNotes(true);
          this.polyMode = false;
          break;
        case midiControllers.bankSelect:
          this.setBankMSB(controllerValue);
          if (this.channel % 16 === 9 && BankSelectHacks.isSystemXG(this.channelSystem)) this.setBankMSB(127);
          break;
        case midiControllers.bankSelectLSB:
          this.setBankLSB(controllerValue);
          break;
        case midiControllers.variationDepth:
          this.synthCore.delayActive = true;
          break;
        case midiControllers.registeredParameterLSB:
          this.dataEntryState = dataEntryStates.RPFine;
          break;
        case midiControllers.registeredParameterMSB:
          this.dataEntryState = dataEntryStates.RPCoarse;
          break;
        case midiControllers.nonRegisteredParameterMSB:
          this.customControllers[customControllers.sf2NPRNGeneratorLSB] = 0;
          this.dataEntryState = dataEntryStates.NRPCoarse;
          break;
        case midiControllers.nonRegisteredParameterLSB:
          if (this.midiControllers[midiControllers.nonRegisteredParameterMSB] >> 7 === nonRegisteredMSB.SF2) {
            if (this.customControllers[customControllers.sf2NPRNGeneratorLSB] % 100 !== 0) this.customControllers[customControllers.sf2NPRNGeneratorLSB] = 0;
            switch (controllerValue) {
              case 100:
                this.customControllers[customControllers.sf2NPRNGeneratorLSB] += 100;
                break;
              case 101:
                this.customControllers[customControllers.sf2NPRNGeneratorLSB] += 1e3;
                break;
              case 102:
                this.customControllers[customControllers.sf2NPRNGeneratorLSB] += 1e4;
                break;
              default: if (controllerValue < 100) this.customControllers[customControllers.sf2NPRNGeneratorLSB] += controllerValue;
            }
          }
          this.dataEntryState = dataEntryStates.NRPFine;
          break;
        case midiControllers.dataEntryMSB:
          this.dataEntryCoarse(controllerValue);
          break;
        case midiControllers.dataEntryLSB:
          this.dataEntryFine(controllerValue);
          break;
        case midiControllers.resetAllControllers:
          this.resetControllersRP15Compliant();
          break;
        case midiControllers.sustainPedal:
          if (controllerValue < 64) {
            let vc = 0;
            if (this.voiceCount > 0) {
              for (const v of this.synthCore.voices) if (v.channel === this.channel && v.isActive && v.isHeld) {
                v.isHeld = false;
                v.releaseVoice(this.synthCore.currentTime);
                if (++vc >= this.voiceCount) break;
              }
            }
          }
          break;
        default:
          this.computeModulatorsAll(1, controllerNumber);
          break;
      }
      if (!sendEvent) return;
      this.synthCore.callEvent("controllerChange", {
        channel: this.channel,
        controllerNumber,
        controllerValue
      });
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/portamento_time.ts
    const PORTA_DIVISION_CONSTANT = 40;
    /**
    * @param cc the CC#5 value (should not be decimal)
    * (PCHIP cubic spline - smooth & exact), optimized with fewer operations than full binear search and interpolation.
    * Created by Benjamin Rosseaux.
    */
    function portaTimeToRate(cc) {
      if (cc < 1) return 0;
      else {
        const x0 = [
          1,
          2,
          4,
          8,
          16,
          32,
          64,
          80,
          96,
          112,
          120,
          124
        ];
        const ih = [
          1,
          .5,
          .25,
          .125,
          .0625,
          .03125,
          .0625,
          .0625,
          .0625,
          .125,
          .25,
          1 / 3
        ];
        const a = [
          -.16653127382501215,
          .11863875218299408,
          .029479047361245264,
          -.005442312089231738,
          .1451520875973037,
          -.005056281449558275,
          -.005095486882876532,
          .03334009551111544,
          -.09361368678020432,
          .14132569702451822,
          -.15805565301011382,
          -.09918856955881927
        ];
        const b = [
          .028212773333433472,
          -.3388502064992847,
          -.15839529890929713,
          -.12398131766775483,
          -.2874848552685111,
          .012254866302537692,
          .005957797193345771,
          -.03745899330347374,
          .12911781869810196,
          -.15867193224162568,
          .504406322732748,
          .3786845131875458
        ];
        const c = [
          .7218950861255283,
          .5574536226347168,
          .47133893237025826,
          .48597095327079914,
          .44336276333518854,
          .6076986311801551,
          .30851975971827794,
          .30514889345633955,
          .3302511933827384,
          .153822885219165,
          .1302280559047337,
          .49865530675491687
        ];
        const d = [
          -2.2218487496163566,
          -1.6382721639824072,
          -1.3010299956639813,
          -.958607314841775,
          -.6020599913279624,
          -.3010299956639812,
          .31386722036915343,
          .6232492903979004,
          .9242792860618817,
          1.290034611362518,
          1.4265112613645752,
          1.9030899869919435
        ];
        const thresholds = [
          2,
          4,
          8,
          16,
          32,
          64,
          80,
          96,
          112,
          120,
          124
        ];
        let s = -1;
        for (let i = thresholds.length - 1; i >= 0; i--) if (thresholds[i] < cc) {
          s = i;
          break;
        }
        s += 1;
        const t = (cc - x0[s]) * ih[s];
        return Math.exp(2.302585092994046 * (((a[s] * t + b[s]) * t + c[s]) * t + d[s])) / PORTA_DIVISION_CONSTANT;
      }
    }
    /**
    * Converts portamento time to seconds.
    * @param time MIDI portamento time (CC 5 value) (0-127)
    * @param distance Distance in semitones (keys) to slide over.
    * @returns The portamento time in seconds.
    */
    function portamentoTimeToSeconds(time, distance) {
      return portaTimeToRate(time) * distance;
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/note_on.ts
    const clamp = (num, min, max) => Math.max(min, Math.min(max, num));
    /**
    * Sends a "MIDI Note on" message and starts a note.
    * @param midiNote The MIDI note number (0-127).
    * @param velocity The velocity of the note (0-127). If less than 1, it will send a note off instead.
    */
    function noteOn(midiNote, velocity) {
      if (velocity < 1) {
        this.noteOff(midiNote);
        return;
      }
      velocity = Math.min(127, velocity);
      if (this.synthCore.masterParameters.blackMIDIMode && this.synthCore.voiceCount > 200 && velocity < 40 || this.synthCore.masterParameters.blackMIDIMode && velocity < 10 || this._isMuted) return;
      if (!this.preset) return;
      const realKey = midiNote + this.keyShift + this.customControllers[customControllers.channelKeyShift];
      let internalMidiNote = realKey;
      if (realKey > 127 || realKey < 0) return;
      const program = this.preset.program;
      const tune = this.synthCore.tunings[program * 128 + realKey];
      if (tune >= 0) internalMidiNote = Math.trunc(tune);
      if (this.synthCore.masterParameters.monophonicRetriggerMode || this.assignMode === 0) this.killNote(midiNote);
      const keyVel = this.synthCore.keyModifierManager.getVelocity(this.channel, realKey);
      if (keyVel > -1) velocity = keyVel;
      let voiceGain = this.synthCore.keyModifierManager.getGain(this.channel, realKey);
      let portamentoFromKey = -1;
      let portamentoDuration = 0;
      const portamentoTime = this.midiControllers[midiControllers.portamentoTime] >> 7;
      const portaControl = this.midiControllers[midiControllers.portamentoControl] >> 7;
      if (!this.drumChannel && portaControl !== internalMidiNote && this.midiControllers[midiControllers.portamentoOnOff] >= 8192 && portamentoTime > 0) {
        if (portaControl > 0) {
          portamentoDuration = portamentoTimeToSeconds(portamentoTime, Math.abs(internalMidiNote - portaControl));
          portamentoFromKey = portaControl;
        }
        this.controllerChange(midiControllers.portamentoControl, internalMidiNote);
      }
      if (!this.polyMode) {
        let vc = 0;
        if (this.voiceCount > 0) {
          for (const v of this.synthCore.voices) if (v.isActive && v.channel === this.channel) {
            v.exclusiveRelease(this.synthCore.currentTime, 0);
            if (++vc >= this.voiceCount) break;
          }
        }
      }
      const voices = this.synthCore.getVoices(this.channel, internalMidiNote, velocity);
      let panOverride = 0;
      let exclusiveOverride = 0;
      let pitchOffset = 0;
      let reverbSend = 1;
      let chorusSend = 1;
      let delaySend = 1;
      if (this.randomPan) panOverride = Math.round(Math.random() * 1e3 - 500);
      if (this.drumChannel) {
        const p = this.drumParams[internalMidiNote];
        if (!p.rxNoteOn) return;
        const drumPan = p.pan;
        if (drumPan !== 64) {
          const targetPan = Math.max(-63, Math.min(drumPan - 64 + ((this.midiControllers[midiControllers.pan] >> 7) - 64), 63)) || 1;
          panOverride = drumPan === 0 ? Math.round(Math.random() * 1e3 - 500) : targetPan / 63 * 500;
        }
        pitchOffset = p.pitch;
        exclusiveOverride = p.exclusiveClass;
        reverbSend = p.reverbGain;
        chorusSend = p.chorusGain;
        delaySend = p.delayGain;
        if (voiceGain === 1) voiceGain = p.gain;
      }
      for (const cached of voices) {
        const voice = this.synthCore.assignVoice();
        const now = this.synthCore.currentTime;
        voice.setup(now, this.channel, internalMidiNote, velocity, realKey);
        voice.wavetable = voice.oscillators[this.synthCore.masterParameters.interpolationType];
        voice.generators.set(cached.generators);
        voice.exclusiveClass = exclusiveOverride || cached.exclusiveClass;
        voice.rootKey = cached.rootKey;
        voice.loopingMode = cached.loopingMode;
        voice.wavetable.sampleData = cached.sampleData;
        voice.wavetable.playbackStep = cached.playbackStep;
        voice.targetKey = cached.targetKey;
        if (this.sysExModulators.active) {
          voice.modulators = [...cached.modulators];
          for (const m of this.sysExModulators.modulatorList) {
            const existingModIndex = voice.modulators.findIndex((voiceMod) => Modulator.isIdentical(voiceMod, m.mod));
            if (existingModIndex === -1) voice.modulators.push(m.mod);
            else voice.modulators[existingModIndex] = m.mod;
          }
        } else voice.modulators = cached.modulators;
        if (voice.modulators.length > voice.modulatorValues.length) {
          SpessaSynthWarn(`${voice.modulators.length} modulators! Increasing modulatorValues table.`);
          voice.modulatorValues = new Int16Array(voice.modulators.length);
        }
        if (this.generatorOverridesEnabled) for (const [generatorType, overrideValue] of this.generatorOverrides.entries()) {
          if (overrideValue === 32767) continue;
          voice.generators[generatorType] = overrideValue;
        }
        if (voice.exclusiveClass !== 0 && this.polyMode) {
          let vc = 0;
          if (this.voiceCount > 0) {
            for (const v of this.synthCore.voices) if (v.isActive && v.channel === this.channel && v.exclusiveClass === voice.exclusiveClass && v.hasRendered) {
              v.exclusiveRelease(this.synthCore.currentTime);
              if (++vc >= this.voiceCount) break;
            }
          }
        }
        this.computeModulators(voice);
        voice.volEnv.init(voice);
        voice.modEnv.init(voice);
        voice.filter.init();
        voice.vibLfoStartTime = now + timecentsToSeconds(voice.modulatedGenerators[generatorTypes.delayVibLFO]);
        voice.modLfoStartTime = now + timecentsToSeconds(voice.modulatedGenerators[generatorTypes.delayModLFO]);
        const cursorStartOffset = voice.modulatedGenerators[generatorTypes.startAddrsOffset] + voice.modulatedGenerators[generatorTypes.startAddrsCoarseOffset] * 32768;
        const endOffset = voice.modulatedGenerators[generatorTypes.endAddrOffset] + voice.modulatedGenerators[generatorTypes.endAddrsCoarseOffset] * 32768;
        const loopStartOffset = voice.modulatedGenerators[generatorTypes.startloopAddrsOffset] + voice.modulatedGenerators[generatorTypes.startloopAddrsCoarseOffset] * 32768;
        const loopEndOffset = voice.modulatedGenerators[generatorTypes.endloopAddrsOffset] + voice.modulatedGenerators[generatorTypes.endloopAddrsCoarseOffset] * 32768;
        const lastSample = cached.sampleData.length - 1;
        voice.wavetable.cursor = clamp(cursorStartOffset, 0, lastSample);
        voice.wavetable.end = clamp(lastSample + endOffset, 0, lastSample);
        voice.wavetable.loopStart = clamp(cached.loopStart + loopStartOffset, 0, lastSample);
        voice.wavetable.loopEnd = clamp(cached.loopEnd + loopEndOffset, 0, lastSample);
        if (voice.wavetable.loopEnd < voice.wavetable.loopStart) {
          const temp = voice.wavetable.loopStart;
          voice.wavetable.loopStart = voice.wavetable.loopEnd;
          voice.wavetable.loopEnd = temp;
        }
        if (voice.wavetable.loopEnd - voice.wavetable.loopStart < 1 && (voice.loopingMode === 1 || voice.loopingMode === 3)) voice.loopingMode = 0;
        voice.wavetable.loopLength = voice.wavetable.loopEnd - voice.wavetable.loopStart;
        voice.wavetable.isLooping = voice.loopingMode === 1 || voice.loopingMode === 3;
        voice.portamentoFromKey = portamentoFromKey;
        voice.portamentoDuration = portamentoDuration;
        voice.overridePan = panOverride;
        voice.gainModifier = voiceGain;
        voice.pitchOffset = pitchOffset;
        voice.reverbSend = reverbSend;
        voice.chorusSend = chorusSend;
        voice.delaySend = delaySend;
        voice.currentPan = Math.max(-500, Math.min(500, panOverride || voice.modulatedGenerators[generatorTypes.pan]));
      }
      this.voiceCount += voices.length;
      this.sendChannelProperty();
      this.synthCore.callEvent("noteOn", {
        midiNote,
        channel: this.channel,
        velocity
      });
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/note_off.ts
    /**
    * Releases a note by its MIDI note number.
    * If the note is in high performance mode and the channel is not a drum channel,
    * it kills the note instead of releasing it.
    * @param midiNote The MIDI note number to release (0-127).
    */
    function noteOff(midiNote) {
      if (midiNote > 127 || midiNote < 0) {
        SpessaSynthWarn(`Received a noteOn for note`, midiNote, "Ignoring.");
        return;
      }
      const realKey = midiNote + this.keyShift + this.customControllers[customControllers.channelKeyShift];
      if (this.synthCore.masterParameters.blackMIDIMode && !this.drumChannel || this.drumChannel && this.drumParams[realKey].rxNoteOff) {
        this.killNote(realKey);
        this.synthCore.callEvent("noteOff", {
          midiNote,
          channel: this.channel
        });
        return;
      }
      const sustain = this.midiControllers[midiControllers.sustainPedal] >= 8192;
      let vc = 0;
      if (this.voiceCount > 0) {
        for (const v of this.synthCore.voices) if (v.channel === this.channel && v.isActive && v.realKey === realKey && !v.isInRelease) {
          if (sustain) v.isHeld = true;
          else v.releaseVoice(this.synthCore.currentTime);
          if (++vc >= this.voiceCount) break;
        }
      }
      this.synthCore.callEvent("noteOff", {
        midiNote,
        channel: this.channel
      });
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/program_change.ts
    /**
    * Changes the program (preset) of the channel.
    * @param program The program number (0-127) to change to.
    */
    function programChange(program) {
      if (this.lockPreset) return;
      this.patch.program = program;
      let preset = this.synthCore.soundBankManager.getPreset(this.patch, this.channelSystem);
      if (!preset) {
        preset = this.synthCore.missingPresetHandler(this.patch, this.channelSystem);
        if (!preset) return;
      }
      this.preset = preset;
      if (preset.isAnyDrums !== this.drumChannel) this.setDrumFlag(preset.isAnyDrums);
      this.resetDrumParams();
      this.synthCore.callEvent("programChange", {
        channel: this.channel,
        bankLSB: this.preset.bankLSB,
        bankMSB: this.preset.bankMSB,
        program: this.preset.program,
        isGMGSDrum: this.preset.isGMGSDrum
      });
      this.sendChannelProperty();
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/system_exclusive/helpers.ts
    function sysExLogging(channel, value, what, units) {
      SpessaSynthInfo(`%cChannel %c${channel}%c ${what} is now set to %c${value} ${units}.`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.value);
    }
    function sysExNotRecognized(syx, what) {
      SpessaSynthInfo(`%cUnrecognized %c${what} %cSysEx: %c${arrayToHexString(syx)}`, consoleColors.warn, consoleColors.recognized, consoleColors.warn, consoleColors.unrecognized);
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/dynamic_modulator_system.ts
    const INITIAL_MODULATORS = [VoiceModulator.fromModulator(new DecodedModulator(getModSourceEnum(modulatorCurveTypes.linear, true, false, true, midiControllers.vibratoRate), 0, generatorTypes.vibLfoRate, 1e3, 0))];
    /**
    * A class for dynamic modulators
    * that are assigned for more complex system exclusive messages
    */
    var DynamicModulatorSystem = class {
      /**
      * The current dynamic modulator list.
      */
      modulatorList = [];
      active = false;
      channelNumber;
      constructor(channelNumber) {
        this.channelNumber = channelNumber;
      }
      resetModulators() {
        this.modulatorList = INITIAL_MODULATORS.map((m) => {
          return {
            mod: m,
            id: this.getModulatorID(m.primarySource.toSourceEnum(), m.destination, m.primarySource.isBipolar, m.primarySource.isNegative)
          };
        });
        this.active = false;
      }
      setupReceiver(addr3, data, source, sourceName, bipolar = false) {
        this.active = true;
        const centeredValue = data - 64;
        const centeredNormalized = centeredValue / 64;
        const normalizedNotCentered = data / 127;
        switch (addr3 & 15) {
          case 0:
            this.setModulator(source, generatorTypes.fineTune, centeredValue * 100, bipolar);
            sysExLogging(this.channelNumber, centeredValue, `${sourceName} pitch control`, "semitones");
            break;
          case 1:
            this.setModulator(source, generatorTypes.initialFilterFc, centeredNormalized * 9600, bipolar);
            sysExLogging(this.channelNumber, centeredNormalized * 9600, `${sourceName} filter control`, "cents");
            break;
          case 2:
            this.setModulator(source, generatorTypes.amplitude, centeredNormalized * 1e3, bipolar);
            sysExLogging(this.channelNumber, centeredNormalized * 100, `${sourceName} amplitude`, "%");
            break;
          case 3:
            this.setModulator(source, generatorTypes.vibLfoRate, centeredNormalized * 1e3, bipolar);
            sysExLogging(this.channelNumber, centeredNormalized * 10, `${sourceName} LFO1 rate`, "Hz");
            break;
          case 4:
            this.setModulator(source, generatorTypes.vibLfoToPitch, normalizedNotCentered * 600, bipolar);
            sysExLogging(this.channelNumber, normalizedNotCentered * 600, `${sourceName} LFO1 pitch depth`, "cents");
            break;
          case 5:
            this.setModulator(source, generatorTypes.vibLfoToFilterFc, normalizedNotCentered * 2400, bipolar);
            sysExLogging(this.channelNumber, normalizedNotCentered * 2400, `${sourceName} LFO1 filter depth`, "cents");
            break;
          case 6:
            this.setModulator(source, generatorTypes.vibLfoAmplitudeDepth, normalizedNotCentered * 1e3, bipolar);
            sysExLogging(this.channelNumber, normalizedNotCentered * 100, `${sourceName} LFO1 amplitude depth`, "%");
            break;
          case 7:
            this.setModulator(source, generatorTypes.modLfoRate, centeredNormalized * 1e3, bipolar);
            sysExLogging(this.channelNumber, centeredNormalized * 10, `${sourceName} LFO2 rate`, "Hz");
            break;
          case 8:
            this.setModulator(source, generatorTypes.modLfoToPitch, normalizedNotCentered * 600, bipolar);
            sysExLogging(this.channelNumber, normalizedNotCentered * 600, `${sourceName} LFO2 pitch depth`, "cents");
            break;
          case 9:
            this.setModulator(source, generatorTypes.modLfoToFilterFc, normalizedNotCentered * 2400, bipolar);
            sysExLogging(this.channelNumber, normalizedNotCentered * 2400, `${sourceName} LFO2 filter depth`, "cents");
            break;
          case 10:
            this.setModulator(source, generatorTypes.modLfoAmplitudeDepth, normalizedNotCentered * 1e3, bipolar);
            sysExLogging(this.channelNumber, normalizedNotCentered * 100, `${sourceName} LFO2 amplitude depth`, "%");
            break;
        }
      }
      /**
      * @param source Like in midiControllers: values below NON_CC_INDEX_OFFSET are CCs,
      * above are regular modulator sources.
      * @param destination The generator type to modulate.
      * @param amount The amount of modulation to apply.
      * @param isBipolar If true, the modulation is bipolar (ranges from -1 to 1 instead of from 0 to 1).
      * @param isNegative If true, the modulation is negative (goes from 1 to 0 instead of from 0 to 1).
      */
      setModulator(source, destination, amount, isBipolar = false, isNegative = false) {
        const id = this.getModulatorID(source, destination, isBipolar, isNegative);
        if (amount === 0) this.deleteModulator(id);
        const mod = this.modulatorList.find((m) => m.id === id);
        if (mod) mod.mod.transformAmount = amount;
        else {
          let srcNum, isCC;
          if (source >= 128) {
            srcNum = source - 128;
            isCC = false;
          } else {
            srcNum = source;
            isCC = true;
          }
          const modulator = VoiceModulator.fromData(new ModulatorSource(srcNum, modulatorCurveTypes.linear, isCC, isBipolar), new ModulatorSource(), destination, amount, 0);
          this.modulatorList.push({
            mod: modulator,
            id
          });
        }
      }
      getModulatorID(source, destination, isBipolar, isNegative) {
        return `${source}-${destination}-${isBipolar}-${isNegative}`;
      }
      deleteModulator(id) {
        this.modulatorList = this.modulatorList.filter((m) => m.id !== id);
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/compute_modulator.ts
    /**
    * Compute_modulator.ts
    * purpose: contains a function for computing all modulators
    */
    const EFFECT_MODULATOR_TRANSFORM_MULTIPLIER = 1e3 / 200;
    /**
    * Computes a given modulator
    * @param voice the voice of this modulator.
    * @param pitchWheel the pitch wheel value, as channel determines if it's a per-note or a global value.
    * @param modulatorIndex the modulator to compute
    * @returns the computed value
    */
    function computeModulator(voice, pitchWheel, modulatorIndex) {
      const modulator = voice.modulators[modulatorIndex];
      if (modulator.transformAmount === 0) {
        voice.modulatorValues[modulatorIndex] = 0;
        return 0;
      }
      const sourceValue = modulator.primarySource.getValue(this.midiControllers, pitchWheel, voice);
      const secondSrcValue = modulator.secondarySource.getValue(this.midiControllers, pitchWheel, voice);
      let transformAmount = modulator.transformAmount;
      if (modulator.isEffectModulator && transformAmount <= 1e3) {
        transformAmount *= EFFECT_MODULATOR_TRANSFORM_MULTIPLIER;
        transformAmount = Math.min(transformAmount, 1e3);
      }
      let computedValue = sourceValue * secondSrcValue * transformAmount;
      if (modulator.transformType === 2) computedValue = Math.abs(computedValue);
      if (modulator.isDefaultResonantModulator) voice.resonanceOffset = Math.max(0, computedValue / 2);
      if (modulator.isModWheelModulator) computedValue *= this.customControllers[customControllers.modulationMultiplier];
      voice.modulatorValues[modulatorIndex] = computedValue;
      return computedValue;
    }
    /**
    * Computes modulators of a given voice. Source and index indicate what modulators shall be computed.
    * @param voice the voice to compute modulators for.
    * @param sourceUsesCC what modulators should be computed, -1 means all, 0 means modulator source enum 1 means midi controller.
    * @param sourceIndex enum for the source.
    */
    function computeModulators(voice, sourceUsesCC = -1, sourceIndex = 0) {
      const modulators = voice.modulators;
      let generators = voice.generators;
      if (this.generatorOffsetsEnabled) {
        generators = new Int16Array(generators);
        for (let i = 0; i < generators.length; i++) generators[i] += this.generatorOffsets[i];
      }
      const modulatedGenerators = voice.modulatedGenerators;
      const pitch = this.perNotePitch ? this.pitchWheels[voice.realKey] : this.midiControllers[modulatorSources.pitchWheel + 128];
      if (sourceUsesCC === -1) {
        modulatedGenerators.set(generators);
        for (let i = 0; i < modulators.length; i++) {
          const mod = modulators[i];
          modulatedGenerators[mod.destination] = Math.min(32767, Math.max(-32768, modulatedGenerators[mod.destination] + this.computeModulator(voice, pitch, i)));
        }
        for (let gen = 0; gen < modulatedGenerators.length; gen++) {
          const limit = generatorLimits[gen];
          if (!limit) continue;
          modulatedGenerators[gen] = Math.min(limit.max, Math.max(limit.min, modulatedGenerators[gen]));
        }
        return;
      }
      const sourceCC = !!sourceUsesCC;
      for (let i = 0; i < modulators.length; i++) {
        const mod = modulators[i];
        if (mod.primarySource.isCC === sourceCC && mod.primarySource.index === sourceIndex || mod.secondarySource.isCC === sourceCC && mod.secondarySource.index === sourceIndex) {
          const destination = mod.destination;
          let outputValue = generators[destination];
          this.computeModulator(voice, pitch, i);
          for (let j = 0; j < modulators.length; j++) if (modulators[j].destination === destination) outputValue += voice.modulatorValues[j];
          const limits = generatorLimits[destination];
          modulatedGenerators[destination] = Math.max(limits.min, Math.min(outputValue, limits.max));
        }
      }
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/midi_channel.ts
    /**
    * This class represents a single MIDI Channel within the synthesizer.
    */
    var MIDIChannel = class {
      /**
      * An array of MIDI controllers for the channel.
      * This array is used to store the state of various MIDI controllers
      * such as volume, pan, modulation, etc.
      * @remarks
      * A bit of an explanation:
      * The controller table is stored as an int16 array, it stores 14-bit values.
      * This controller table is then extended with the modulatorSources section,
      * for example, pitch range and pitch range depth.
      * This allows us for precise control range and supports full pitch-wheel resolution.
      */
      midiControllers = new Int16Array(147);
      /**
      * An array for the MIDI 2.0 Per-note pitch wheels.
      */
      pitchWheels = new Int16Array(128).fill(8192);
      /**
      * An array indicating if a controller, at the equivalent index in the midiControllers array, is locked
      * (i.e., not allowed changing).
      * A locked controller cannot be modified.
      */
      lockedControllers = new Array(147).fill(false);
      /**
      * An array of custom (non-SF2) control values such as RPN pitch tuning, transpose, modulation depth, etc.
      * Refer to controller_tables.ts for the index definitions.
      */
      customControllers = new Float32Array(CUSTOM_CONTROLLER_TABLE_SIZE);
      /**
      * An array of octave tuning values for each note on the channel.
      * Each index corresponds to a note (0 = C, 1 = C#, ..., 11 = B).
      * Note: Repeated every 12 notes.
      */
      octaveTuning = new Int8Array(128);
      /**
      * Parameters for each drum instrument.
      */
      drumParams = [];
      /**
      * A system for dynamic modulator assignment for advanced system exclusives.
      */
      sysExModulators;
      /**
      * The key shift of the channel (in semitones).
      */
      keyShift = 0;
      /**
      * Indicates whether this channel is a drum channel.
      */
      drumChannel = false;
      /**
      * Enables random panning for every note played on this channel.
      */
      randomPan = false;
      /**
      * Assign mode for the channel.
      * ASSIGN MODE is the parameter that determines how voice assignment will be handled when sounds overlap on identical note numbers in the same channel (i.e., repeatedly struck notes).
      * This is initialized to a mode suitable for each Part, so for general purposes there is no need to change this.
      *
      * 0 - Single: If the same note is played multiple times in succession, the previously-sounding note will be completely silenced, and then the new note will be sounded.
      * 1 - LimitedMulti: If the same note is played multiple times in succession, the previously-sounding note will be continued to a certain extent even after the new note is sounded. (Default setting)
      * 2 - FullMulti: If the same note is played multiple times in succession, the previously-sounding note(s) will continue sounding for their natural length even after the new note is sounded.
      * We treat LimitedMulti like FullMulti
      */
      assignMode = 2;
      /**
      * Indicates whether this channel uses the insertion EFX processor.
      */
      insertionEnabled = false;
      /**
      * CC1 for GS controller matrix.
      * An arbitrary MIDI controller, which can be bound to any synthesis parameter.
      * Default is 16
      */
      cc1 = 16;
      /**
      * CC2 for GS controller matrix.
      * An arbitrary MIDI controller, which can be bound to any synthesis parameter.
      * Default is 17
      */
      cc2 = 17;
      /**
      * Drum map for GS system exclusive tracking.
      * Only used for selecting the correct channel when setting drum parameters through sysEx,
      * as those don't specify the channel, but the drum number.
      */
      drumMap = 0;
      /**
      * The current state of the data entry for the channel.
      */
      dataEntryState = dataEntryStates.Idle;
      /**
      * The currently selected MIDI patch of the channel.
      * Note that the exact matching preset may not be available, but this represents exactly what MIDI asks for.
      */
      patch = {
        bankMSB: 0,
        bankLSB: 0,
        program: 0,
        isGMGSDrum: false
      };
      /**
      * The preset currently assigned to the channel.
      * Note that this may be undefined in some cases
      * https://github.com/spessasus/spessasynth_core/issues/48
      */
      preset;
      /**
      * Indicates whether the program on this channel is locked.
      */
      lockPreset = false;
      /**
      * Indicates the MIDI system when the preset was locked.
      */
      lockedSystem = "gs";
      /**
      * The vibrato settings for the channel.
      * @property depth - Depth of the vibrato effect in cents.
      * @property delay - Delay before the vibrato effect starts (in seconds).
      * @property rate - Rate of the vibrato oscillation (in Hz).
      */
      channelVibrato = {
        delay: 0,
        depth: 0,
        rate: 0
      };
      /**
      * If the channel is in the poly mode.
      * True - POLY ON - regular playback.
      * False - MONO ON - one note per channel, others are killed on note-on
      */
      polyMode = true;
      /**
      * Channel's current voice count
      */
      voiceCount = 0;
      /**
      * The channel's number (0-based index)
      */
      channel;
      /**
      * The channel's receiving number (0-based index)
      * Only used when customChannelNumbers is enabled
      */
      rxChannel;
      /**
      * Core synthesis engine.
      */
      synthCore;
      /**
      * Sends a "MIDI Note on" message and starts a note.
      * @param midiNote The MIDI note number (0-127).
      * @param velocity The velocity of the note (0-127). If less than 1, it will send a note off instead.
      */
      noteOn = noteOn.bind(this);
      /**
      * Releases a note by its MIDI note number.
      * If the note is in high performance mode and the channel is not a drum channel,
      * it kills the note instead of releasing it.
      * @param midiNote The MIDI note number to release (0-127).
      */
      noteOff = noteOff.bind(this);
      /**
      * Changes the program (preset) of the channel.
      * @param programNumber The program number (0-127) to change to.
      */
      programChange = programChange.bind(this);
      controllerChange = controllerChange.bind(this);
      /**
      * Reset all controllers for channel.
      * This will reset all controllers to their default values,
      * except for the locked controllers.
      */
      resetControllers = resetControllers.bind(this);
      resetPreset = resetPreset.bind(this);
      /**
      * https://amei.or.jp/midistandardcommittee/Recommended_Practice/e/rp15.pdf
      * Reset controllers according to RP-15 Recommended Practice.
      */
      resetControllersRP15Compliant = resetControllersRP15Compliant.bind(this);
      /**
      * Reset all parameters to their default values.
      * This includes NRPN and RPN controllers, data entry state,
      * and generator overrides and offsets.
      */
      resetParameters = resetParameters.bind(this);
      /**
      * Executes a data entry fine (LSB) change for the current channel.
      * @param dataValue The value to set for the data entry fine controller (0-127).
      */
      dataEntryFine = dataEntryFine.bind(this);
      /**
      * Executes a data entry coarse (MSB) change for the current channel.
      * @param dataValue The value to set for the data entry coarse controller (0-127).
      */
      dataEntryCoarse = dataEntryCoarse.bind(this);
      renderVoice = renderVoice.bind(this);
      /**
      * Per-note pitch wheel mode uses the pitchWheels table as source
      * instead of the regular entry in the midiControllers table.
      */
      perNotePitch = false;
      /**
      * Will be updated every time something tuning-related gets changed.
      * This is used to avoid a big addition for every voice rendering call.
      */
      channelTuningCents = 0;
      /**
      * An array of offsets generators for SF2 nrpn support.
      * A value of 0 means no change; -10 means 10 lower, etc.
      */
      generatorOffsets = new Int16Array(GENERATORS_AMOUNT);
      /**
      * A small optimization that disables applying offsets until at least one is set.
      */
      generatorOffsetsEnabled = false;
      /**
      * An array of override generators for AWE32 support.
      * A value of 32,767 means unchanged, as it is not allowed anywhere.
      */
      generatorOverrides = new Int16Array(GENERATORS_AMOUNT);
      /**
      * A small optimization that disables applying overrides until at least one is set.
      */
      generatorOverridesEnabled = false;
      computeModulator = computeModulator.bind(this);
      computeModulators = computeModulators.bind(this);
      /**
      * For tracking voice count changes
      * @private
      */
      previousVoiceCount = 0;
      /**
      * Constructs a new MIDI channel.
      */
      constructor(synthProps, preset, channelNumber) {
        this.synthCore = synthProps;
        this.preset = preset;
        this.channel = channelNumber;
        this.rxChannel = channelNumber;
        this.sysExModulators = new DynamicModulatorSystem(channelNumber);
        this.resetGeneratorOverrides();
        this.resetGeneratorOffsets();
        for (let i = 0; i < 128; i++) this.drumParams.push(new DrumParameters());
        this.resetDrumParams();
        this.resetVibratoParams();
      }
      /**
      * Indicates whether the channel is muted.
      */
      _isMuted = false;
      /**
      * Indicates whether the channel is muted.
      */
      get isMuted() {
        return this._isMuted;
      }
      get channelSystem() {
        return this.lockPreset ? this.lockedSystem : this.synthCore.masterParameters.midiSystem;
      }
      clearVoiceCount() {
        this.previousVoiceCount = this.voiceCount;
        this.voiceCount = 0;
      }
      updateVoiceCount() {
        if (this.voiceCount !== this.previousVoiceCount) this.sendChannelProperty();
      }
      /**
      * Transposes the channel by given amount of semitones.
      * @param semitones The number of semitones to transpose the channel by. Can be decimal.
      * @param force Defaults to false, if true, it will force the transpose even if the channel is a drum channel.
      */
      transposeChannel(semitones, force = false) {
        if (!this.drumChannel) semitones += this.synthCore.masterParameters.transposition;
        const keyShift = Math.trunc(semitones);
        const currentTranspose = this.keyShift + this.customControllers[customControllers.channelTransposeFine] / 100;
        if (this.drumChannel && !force || semitones === currentTranspose) return;
        if (keyShift !== this.keyShift) this.stopAllNotes();
        this.keyShift = keyShift;
        this.setCustomController(customControllers.channelTransposeFine, (semitones - keyShift) * 100);
        this.sendChannelProperty();
      }
      /**
      * Sets the octave tuning for a given channel.
      * @param tuning The tuning array of 12 values, each representing the tuning for a note in the octave.
      * @remarks
      * Cent tunings are relative.
      */
      setOctaveTuning(tuning) {
        if (tuning.length !== 12) throw new Error("Tuning is not the length of 12.");
        for (let i = 0; i < 128; i++) this.octaveTuning[i] = tuning[i % 12];
      }
      /**
      * Sets the modulation depth for the channel.
      * @param cents The modulation depth in cents to set.
      * @remarks
      * This method sets the modulation depth for the channel by converting the given cents value into a
      * multiplier. The MIDI specification assumes the default modulation depth is 50 cents,
      * but it may vary for different sound banks.
      * For example, if you want a modulation depth of 100 cents,
      * the multiplier will be 2,
      * which, for a preset with a depth of 50,
      * will create a total modulation depth of 100 cents.
      *
      */
      setModulationDepth(cents) {
        cents = Math.round(cents);
        SpessaSynthInfo(`%cChannel ${this.channel} modulation depth. Cents: %c${cents}`, consoleColors.info, consoleColors.value);
        this.setCustomController(customControllers.modulationMultiplier, cents / 50);
      }
      /**
      * Sets the channel's tuning.
      * @param cents The tuning in cents to set.
      * @param log If true, logs the change to the console.
      */
      setTuning(cents, log = true) {
        cents = Math.round(cents);
        this.setCustomController(customControllers.channelTuning, cents);
        if (!log) return;
        SpessaSynthInfo(`%cFine tuning for %c${this.channel}%c is now set to %c${cents}%c cents.`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.value, consoleColors.info);
      }
      /**
      * Sets the pitch of the given channel.
      * @param pitch The pitch (0 - 16384)
      * @param midiNote The MIDI note number, pass -1 for the regular pitch wheel
      */
      pitchWheel(pitch, midiNote = -1) {
        if (this.lockedControllers[128 + modulatorSources.pitchWheel]) return;
        if (midiNote === -1) {
          this.perNotePitch = false;
          this.midiControllers[128 + modulatorSources.pitchWheel] = pitch;
          this.computeModulatorsAll(0, modulatorSources.pitchWheel);
          this.sendChannelProperty();
        } else {
          if (!this.perNotePitch) this.pitchWheels.fill(this.midiControllers[128 + modulatorSources.pitchWheel]);
          this.perNotePitch = true;
          this.pitchWheels[midiNote] = pitch;
          let vc = 0;
          if (this.voiceCount > 0) {
            for (const v of this.synthCore.voices) if (v.isActive && v.channel === this.channel && v.midiNote === midiNote) {
              this.computeModulators(v, 0, modulatorSources.polyPressure);
              if (++vc >= this.voiceCount) break;
            }
          }
        }
        this.synthCore.callEvent("pitchWheel", {
          channel: this.channel,
          pitch,
          midiNote
        });
      }
      /**
      * Sets the channel pressure (MIDI Aftertouch).
      * @param pressure the pressure of the channel.
      */
      channelPressure(pressure) {
        this.midiControllers[128 + modulatorSources.channelPressure] = pressure << 7;
        this.updateChannelTuning();
        this.computeModulatorsAll(0, modulatorSources.channelPressure);
        this.synthCore.callEvent("channelPressure", {
          channel: this.channel,
          pressure
        });
      }
      /**
      * Sets the pressure of the given note on a specific channel.
      * This is used for polyphonic pressure (aftertouch).
      * @param midiNote 0 - 127, the MIDI note number to set the pressure for.
      * @param pressure 0 - 127, the pressure value to set for the note.
      */
      polyPressure(midiNote, pressure) {
        let vc = 0;
        if (this.voiceCount > 0) {
          for (const v of this.synthCore.voices) if (v.isActive && v.channel === this.channel && v.midiNote === midiNote) {
            v.pressure = pressure;
            this.computeModulators(v, 0, modulatorSources.polyPressure);
            if (++vc >= this.voiceCount) break;
          }
        }
        this.synthCore.callEvent("polyPressure", {
          channel: this.channel,
          midiNote,
          pressure
        });
      }
      setCustomController(type, value) {
        this.customControllers[type] = value;
        this.updateChannelTuning();
      }
      updateChannelTuning() {
        this.channelTuningCents = this.customControllers[customControllers.channelTuning] + this.customControllers[customControllers.channelTransposeFine] + this.customControllers[customControllers.masterTuning] + this.customControllers[customControllers.channelTuningSemitones] * 100;
      }
      /**
      * Locks or unlocks the preset from MIDI program changes.
      * @param locked If the preset should be locked.
      */
      setPresetLock(locked) {
        if (this.lockPreset === locked) return;
        this.lockPreset = locked;
        if (locked) this.lockedSystem = this.synthCore.masterParameters.midiSystem;
      }
      /**
      * Changes the preset to, or from drums.
      * Note that this executes a program change.
      * @param isDrum If the channel should be a drum preset or not.
      */
      setDrums(isDrum) {
        if (BankSelectHacks.isSystemXG(this.channelSystem)) if (isDrum) {
          this.setBankMSB(BankSelectHacks.getDrumBank(this.channelSystem));
          this.setBankLSB(0);
        } else {
          if (this.channel % 16 === 9) throw new Error(`Cannot disable drums on channel ${this.channel} for XG.`);
          this.setBankMSB(0);
          this.setBankLSB(0);
        }
        else this.setGSDrums(isDrum);
        this.setDrumFlag(isDrum);
        this.programChange(this.patch.program);
      }
      /**
      * Sets the channel to a given MIDI patch.
      * Note that this executes a program change.
      * @param patch The MIDI patch to set the channel to.
      */
      setPatch(patch) {
        this.setBankMSB(patch.bankMSB);
        this.setBankLSB(patch.bankLSB);
        this.setGSDrums(patch.isGMGSDrum);
        this.programChange(patch.program);
      }
      /**
      * Sets the GM/GS drum flag.
      * @param drums
      */
      setGSDrums(drums) {
        if (drums === this.patch.isGMGSDrum) return;
        this.setBankLSB(0);
        this.setBankMSB(0);
        this.patch.isGMGSDrum = drums;
      }
      resetGeneratorOverrides() {
        this.generatorOverrides.fill(GENERATOR_OVERRIDE_NO_CHANGE_VALUE);
        this.generatorOverridesEnabled = false;
      }
      setGeneratorOverride(gen, value, realtime = false) {
        this.generatorOverrides[gen] = value;
        this.generatorOverridesEnabled = true;
        if (realtime) {
          let vc = 0;
          if (this.voiceCount > 0) {
            for (const v of this.synthCore.voices) if (v.channel === this.channel && v.isActive) {
              v.generators[gen] = value;
              this.computeModulators(v);
              if (++vc >= this.voiceCount) break;
            }
          }
        }
      }
      resetGeneratorOffsets() {
        this.generatorOffsets.fill(0);
        this.generatorOffsetsEnabled = false;
      }
      setGeneratorOffset(gen, value) {
        this.generatorOffsets[gen] = value * generatorLimits[gen].nrpn;
        this.generatorOffsetsEnabled = true;
        let vc = 0;
        if (this.voiceCount > 0) {
          for (const v of this.synthCore.voices) if (v.channel === this.channel && v.isActive) {
            this.computeModulators(v);
            if (++vc >= this.voiceCount) break;
          }
        }
      }
      /**
      * Stops a note nearly instantly.
      * @param midiNote The note to stop.
      * @param releaseTime in timecents, defaults to -12000 (very short release).
      */
      killNote(midiNote, releaseTime = -12e3) {
        midiNote += this.customControllers[customControllers.channelKeyShift];
        let vc = 0;
        if (this.voiceCount > 0) {
          for (const v of this.synthCore.voices) if (v.channel === this.channel && v.isActive && v.realKey === midiNote) {
            v.overrideReleaseVolEnv = releaseTime;
            v.isInRelease = false;
            v.releaseVoice(this.synthCore.currentTime);
            if (++vc >= this.voiceCount) break;
          }
        }
      }
      /**
      * Stops all notes on the channel.
      * @param force If true, stops all notes immediately, otherwise applies release time.
      */
      stopAllNotes(force = false) {
        if (force) {
          let vc = 0;
          if (this.voiceCount > 0) {
            for (const v of this.synthCore.voices) if (v.channel === this.channel && v.isActive) {
              v.isActive = false;
              if (++vc >= this.voiceCount) break;
            }
          }
          this.clearVoiceCount();
          this.updateVoiceCount();
        } else {
          let vc = 0;
          if (this.voiceCount > 0) {
            for (const v of this.synthCore.voices) if (v.channel === this.channel && v.isActive) {
              v.releaseVoice(this.synthCore.currentTime);
              if (++vc >= this.voiceCount) break;
            }
          }
        }
        this.synthCore.callEvent("stopAll", {
          channel: this.channel,
          force
        });
      }
      /**
      * Mutes or unmutes a channel.
      * @param isMuted If the channel should be muted.
      */
      muteChannel(isMuted) {
        if (isMuted) this.stopAllNotes(true);
        this._isMuted = isMuted;
        this.sendChannelProperty();
        this.synthCore.callEvent("muteChannel", {
          channel: this.channel,
          isMuted
        });
      }
      /**
      * Sends this channel's property
      */
      sendChannelProperty() {
        if (!this.synthCore.enableEventSystem) return;
        const data = {
          voicesAmount: this.voiceCount,
          pitchWheel: this.midiControllers[128 + modulatorSources.pitchWheel],
          pitchWheelRange: this.midiControllers[128 + modulatorSources.pitchWheelRange] / 128,
          isMuted: this.isMuted,
          transposition: this.keyShift + this.customControllers[customControllers.channelTransposeFine] / 100,
          isDrum: this.drumChannel,
          isEFX: this.insertionEnabled
        };
        this.synthCore.callEvent("channelPropertyChange", {
          channel: this.channel,
          property: data
        });
      }
      resetDrumParams() {
        if (this.synthCore.masterParameters.drumLock || !this.drumChannel) return;
        for (let i = 0; i < 128; i++) {
          const p = this.drumParams[i];
          p.pitch = 0;
          p.gain = 1;
          p.exclusiveClass = 0;
          p.pan = 64;
          p.reverbGain = drumReverbResetArray[i] / 127;
          p.chorusGain = 0;
          p.delayGain = 0;
          p.rxNoteOn = true;
          p.rxNoteOff = false;
        }
      }
      resetVibratoParams() {
        if (this.synthCore.masterParameters.customVibratoLock) return;
        this.channelVibrato.rate = 0;
        this.channelVibrato.depth = 0;
        this.channelVibrato.delay = 0;
      }
      computeModulatorsAll(sourceUsesCC, sourceIndex) {
        let vc = 0;
        if (this.voiceCount > 0) {
          for (const v of this.synthCore.voices) if (v.channel === this.channel && v.isActive) {
            this.computeModulators(v, sourceUsesCC, sourceIndex);
            if (++vc >= this.voiceCount) break;
          }
        }
      }
      setBankMSB(bankMSB) {
        if (this.lockPreset) return;
        this.patch.bankMSB = bankMSB;
      }
      setBankLSB(bankLSB) {
        if (this.lockPreset) return;
        this.patch.bankLSB = bankLSB;
      }
      /**
      * Sets drums on channel.
      */
      setDrumFlag(isDrum) {
        if (this.lockPreset || !this.preset) return;
        if (this.drumChannel === isDrum) return;
        if (isDrum) {
          this.keyShift = 0;
          this.drumChannel = true;
        } else this.drumChannel = false;
        this.synthCore.callEvent("drumChange", {
          channel: this.channel,
          isDrumChannel: this.drumChannel
        });
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_components/sound_bank_manager.ts
    var SoundBankManagerPreset = class extends BasicPreset {
      constructor(p, offset) {
        super(p.parentSoundBank, p.globalZone);
        this.bankMSB = BankSelectHacks.addBankOffset(p.bankMSB, offset, p.isXGDrums);
        this.name = p.name;
        this.bankLSB = p.bankLSB;
        this.isGMGSDrum = p.isGMGSDrum;
        this.program = p.program;
        this.genre = p.genre;
        this.morphology = p.morphology;
        this.library = p.library;
        this.zones = p.zones;
      }
    };
    var SoundBankManager = class {
      /**
      * All the sound banks, ordered from the most important to the least.
      */
      soundBankList = [];
      presetListChangeCallback;
      selectablePresetList = [];
      /**
      * @param presetListChangeCallback Supplied by the parent synthesizer class,
      * this is called whenever the preset list changes.
      */
      constructor(presetListChangeCallback) {
        this.presetListChangeCallback = presetListChangeCallback;
      }
      _presetList = [];
      /**
      * The list of all presets in the sound bank stack.
      */
      get presetList() {
        return [...this._presetList];
      }
      /**
      * The current sound bank priority order.
      * @returns The IDs of the sound banks in the current order.
      */
      get priorityOrder() {
        return this.soundBankList.map((s) => s.id);
      }
      /**
      * The current sound bank priority order.
      * @param newList The new order of sound bank IDs.
      */
      set priorityOrder(newList) {
        this.soundBankList.sort((a, b) => newList.indexOf(a.id) - newList.indexOf(b.id));
        this.generatePresetList();
      }
      /**
      * Deletes a given sound bank by its ID.
      * @param id the ID of the sound bank to delete.
      */
      deleteSoundBank(id) {
        if (this.soundBankList.length === 0) {
          SpessaSynthWarn("1 soundbank left. Aborting!");
          return;
        }
        const index = this.soundBankList.findIndex((s) => s.id === id);
        if (index === -1) throw new Error(`No sound bank with id "${id}"`);
        this.soundBankList.splice(index, 1);
        this.generatePresetList();
      }
      /**
      * Adds a new sound bank with a given ID, or replaces an existing one.
      * @param font the sound bank to add.
      * @param id the ID of the sound bank.
      * @param bankOffset the bank offset of the sound bank.
      */
      addSoundBank(font, id, bankOffset = 0) {
        const foundBank = this.soundBankList.find((s) => s.id === id);
        if (foundBank === void 0) this.soundBankList.push({
          id,
          soundBank: font,
          bankOffset
        });
        else {
          foundBank.soundBank = font;
          foundBank.bankOffset = bankOffset;
        }
        this.generatePresetList();
      }
      /**
      * Gets a given preset from the sound bank stack.
      * @param patch The MIDI patch to search for.
      * @param system The MIDI system to select the preset for.
      * @returns An object containing the preset and its bank offset.
      */
      getPreset(patch, system) {
        if (this.soundBankList.length === 0 || this.selectablePresetList.length === 0) return;
        return selectPreset(this.selectablePresetList, patch, system);
      }
      destroy() {
        for (const s of this.soundBankList) s.soundBank.destroySoundBank();
        this.soundBankList = [];
      }
      generatePresetList() {
        const presetList = new Array();
        const addedPresets = /* @__PURE__ */ new Set();
        for (const s of this.soundBankList) {
          const bank = s.soundBank;
          const bankOffset = s.bankOffset;
          for (const p of bank.presets) {
            const selectablePreset = new SoundBankManagerPreset(p, bankOffset);
            if (!addedPresets.has(selectablePreset.toMIDIString())) {
              addedPresets.add(selectablePreset.toMIDIString());
              presetList.push(selectablePreset);
            }
          }
        }
        presetList.sort(MIDIPatchTools.sorter.bind(MIDIPatchTools));
        this.selectablePresetList = presetList;
        this._presetList = presetList.map((p) => {
          return {
            bankMSB: p.bankMSB,
            bankLSB: p.bankLSB,
            program: p.program,
            isGMGSDrum: p.isGMGSDrum,
            name: p.name,
            isAnyDrums: p.isAnyDrums
          };
        });
        this.presetListChangeCallback();
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/controller_control/master_parameters.ts
    /**
    * Sets a master parameter of the synthesizer.
    * @param parameter The type of the master parameter to set.
    * @param value The value to set for the master parameter.
    */
    function setMasterParameterInternal(parameter, value) {
      this.masterParameters[parameter] = value;
      switch (parameter) {
        default: break;
        case "masterPan": {
          let pan = value;
          pan = pan / 2 + .5;
          this.panLeft = Math.cos(Math.PI / 2 * pan);
          this.panRight = Math.sin(Math.PI / 2 * pan);
          break;
        }
        case "voiceCap": {
          const cap = Math.min(value, 1e6);
          this.masterParameters.voiceCap = cap;
          for (let i = cap; i < this.voices.length; i++) this.voices[i].isActive = false;
          if (cap > this.voices.length) {
            SpessaSynthWarn(`Allocating ${cap - this.voices.length} new voices!`);
            for (let i = this.voices.length; i < cap; i++) this.voices.push(new Voice(this.sampleRate));
          }
          break;
        }
        case "transposition": {
          const semitones = value;
          this.masterParameters.transposition = 0;
          for (const item of this.midiChannels) item.transposeChannel(semitones);
          this.masterParameters.transposition = semitones;
        }
      }
      this.callEvent("masterParameterChange", {
        parameter,
        value
      });
    }
    /**
    * Gets a master parameter of the synthesizer.
    * @param type The type of the master parameter to get.
    * @returns The value of the master parameter.
    */
    function getMasterParameterInternal(type) {
      return this.masterParameters[type];
    }
    /**
    * Gets all master parameters of the synthesizer.
    * @returns All the master parameters.
    */
    function getAllMasterParametersInternal() {
      return { ...this.masterParameters };
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/system_exclusive/handle_gm.ts
    /**
    * Calculates frequency for MIDI Tuning Standard.
    * @param byte1 The first byte (midi note).
    * @param byte2 The second byte (most significant bits).
    * @param byte3 The third byte (the least significant bits).
    * @return An object containing the MIDI note and the cent tuning value.
    */
    function getTuning(byte1, byte2, byte3) {
      const midiNote = byte1;
      const fraction = byte2 << 7 | byte3;
      if (byte1 === 127 && byte2 === 127 && byte3 === 127) return -1;
      return midiNote + fraction * 61e-6;
    }
    /**
    * Handles a GM system exclusive (realtime/non-realtime)
    * @param syx
    * @param channelOffset
    */
    function handleGM(syx, channelOffset = 0) {
      switch (syx[2]) {
        case 4: {
          let cents;
          switch (syx[3]) {
            case 1: {
              const vol = syx[5] << 7 | syx[4];
              this.setMIDIVolume(vol / 16384);
              SpessaSynthInfo(`%cMaster Volume. Volume: %c${vol}`, consoleColors.info, consoleColors.value);
              break;
            }
            case 2: {
              const pan = ((syx[5] << 7 | syx[4]) - 8192) / 8192;
              this.setMasterParameter("masterPan", pan);
              SpessaSynthInfo(`%cMaster Pan. Pan: %c${pan}`, consoleColors.info, consoleColors.value);
              break;
            }
            case 3: {
              const tuningValue = (syx[5] << 7 | syx[6]) - 8192;
              cents = Math.floor(tuningValue / 81.92);
              this.setMasterTuning(cents);
              SpessaSynthInfo(`%cMaster Fine Tuning. Cents: %c${cents}`, consoleColors.info, consoleColors.value);
              break;
            }
            case 4:
              cents = (syx[5] - 64) * 100;
              this.setMasterTuning(cents);
              SpessaSynthInfo(`%cMaster Coarse Tuning. Cents: %c${cents}`, consoleColors.info, consoleColors.value);
              break;
            default: SpessaSynthInfo(`%cUnrecognized MIDI Device Control Real-time message: %c${arrayToHexString(syx)}`, consoleColors.warn, consoleColors.unrecognized);
          }
          break;
        }
        case 9:
          if (syx[3] === 1) {
            SpessaSynthInfo("%cGM1 system on", consoleColors.info);
            this.resetAllControllers("gm");
          } else if (syx[3] === 3) {
            SpessaSynthInfo("%cGM2 system on", consoleColors.info);
            this.resetAllControllers("gm2");
          } else {
            SpessaSynthInfo("%cGM system off, defaulting to GS", consoleColors.info);
            this.setMasterParameter("midiSystem", "gs");
          }
          break;
        case 8: {
          let currentMessageIndex = 4;
          switch (syx[3]) {
            case 1: {
              const program = syx[currentMessageIndex++];
              const tuningName = readBinaryString(syx, 16, currentMessageIndex);
              currentMessageIndex += 16;
              if (syx.length < 384) {
                SpessaSynthWarn(`The Bulk Tuning Dump is too short! (${syx.length} bytes, at least 384 are expected)`);
                return;
              }
              for (let midiNote = 0; midiNote < 128; midiNote++) this.tunings[program * 128 + midiNote] = getTuning(syx[currentMessageIndex++], syx[currentMessageIndex++], syx[currentMessageIndex++]);
              SpessaSynthInfo(`%cBulk Tuning Dump %c${tuningName}%c Program: %c${program}`, consoleColors.info, consoleColors.value, consoleColors.info, consoleColors.recognized);
              break;
            }
            case 2:
            case 7: {
              if (syx[3] === 7) currentMessageIndex++;
              const tuningProgram = syx[currentMessageIndex++];
              const numberOfChanges = syx[currentMessageIndex++];
              for (let i = 0; i < numberOfChanges; i++) {
                const midiNote = syx[currentMessageIndex++];
                this.tunings[tuningProgram * 128 + midiNote] = getTuning(syx[currentMessageIndex++], syx[currentMessageIndex++], syx[currentMessageIndex++]);
              }
              SpessaSynthInfo(`%cSingle Note Tuning. Program: %c${tuningProgram}%c Keys affected: %c${numberOfChanges}`, consoleColors.info, consoleColors.recognized, consoleColors.info, consoleColors.recognized);
              break;
            }
            case 9:
            case 8: {
              const newOctaveTuning = new Int8Array(12);
              if (syx[3] === 8) for (let i = 0; i < 12; i++) newOctaveTuning[i] = syx[7 + i] - 64;
              else for (let i = 0; i < 24; i += 2) {
                const tuning = (syx[7 + i] << 7 | syx[8 + i]) - 8192;
                newOctaveTuning[i / 2] = Math.floor(tuning / 81.92);
              }
              if ((syx[4] & 1) === 1) this.midiChannels[14 + channelOffset].setOctaveTuning(newOctaveTuning);
              if ((syx[4] >> 1 & 1) === 1) this.midiChannels[15 + channelOffset].setOctaveTuning(newOctaveTuning);
              for (let i = 0; i < 7; i++) if ((syx[5] >> i & 1) === 1) this.midiChannels[7 + i + channelOffset].setOctaveTuning(newOctaveTuning);
              for (let i = 0; i < 7; i++) if ((syx[6] >> i & 1) === 1) this.midiChannels[i + channelOffset].setOctaveTuning(newOctaveTuning);
              SpessaSynthInfo(`%cMIDI Octave Scale ${syx[3] === 8 ? "(1 byte)" : "(2 bytes)"} tuning via Tuning: %c${newOctaveTuning.join(" ")}`, consoleColors.info, consoleColors.value);
              break;
            }
            default:
              sysExNotRecognized(syx, "MIDI Tuning Standard");
              break;
          }
          break;
        }
        default: sysExNotRecognized(syx, "General MIDI");
      }
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/system_exclusive/handle_gs.ts
    const coolInfo$1 = (what, value) => {
      SpessaSynthInfo(`%cRoland GS ${what}%c is now set to %c${value}%c.`, consoleColors.recognized, consoleColors.info, consoleColors.value, consoleColors.info);
    };
    /**
    * Handles a GS system exclusive
    * http://www.bandtrax.com.au/sysex.htm
    * https://cdn.roland.com/assets/media/pdf/AT-20R_30R_MI.pdf
    * @param syx
    * @param channelOffset
    */
    function handleGS(syx, channelOffset = 0) {
      if (syx[3] === 18) switch (syx[2]) {
        case 66: {
          const addr1 = syx[4];
          const addr2 = syx[5];
          const addr3 = syx[6];
          const data = Math.min(syx[7], 127);
          if (addr1 === 0 && addr2 === 0 && addr3 === 127 && data === 0) {
            SpessaSynthInfo("%cGS Reset received!", consoleColors.info);
            this.resetAllControllers("gs");
            return;
          }
          if (addr1 === 64) {
            if (addr2 === 0) {
              switch (addr3) {
                case 0: {
                  const cents = ((data << 12 | syx[8] << 8 | syx[9] << 4 | syx[10]) - 1024) / 10;
                  this.setMasterTuning(cents);
                  coolInfo$1("Master Tune", cents);
                  break;
                }
                case 4:
                  coolInfo$1("Master Volume", data);
                  break;
                case 5: {
                  const transpose = data - 64;
                  coolInfo$1("Master Key-Shift", transpose);
                  this.setMasterTuning(transpose * 100);
                  break;
                }
                case 6:
                  coolInfo$1("Master Pan", data);
                  this.setMasterParameter("masterPan", (data - 64) / 64);
                  break;
                case 127:
                  if (data === 0) {
                    SpessaSynthInfo("%cGS Reset received!", consoleColors.info);
                    this.resetAllControllers("gs");
                  } else if (data === 127) {
                    SpessaSynthInfo("%cGS system off, switching to GM", consoleColors.info);
                    this.resetAllControllers("gm");
                  }
                  break;
                default:
                  sysExNotRecognized(syx, "Roland GS");
                  break;
              }
              return;
            }
            if (addr2 === 1) {
              const isReverb = addr3 >= 48 && addr3 <= 55;
              const isChorus = addr3 >= 56 && addr3 <= 64;
              const isDelay = addr3 >= 80 && addr3 <= 90;
              if (isReverb && this.masterParameters.reverbLock) return;
              if (isChorus && this.masterParameters.chorusLock) return;
              if (isDelay && this.masterParameters.delayLock) return;
              this.delayActive ||= addr3 === 64 || isDelay;
              switch (addr3) {
                default:
                  SpessaSynthInfo(`%cUnsupported Patch Common parameter: %c${addr3.toString(16)}`, consoleColors.warn, consoleColors.unrecognized);
                  break;
                case 0: {
                  const patchName = readBinaryString(syx, 16, 7);
                  coolInfo$1(`Patch Name for ${addr3 & 15}`, patchName);
                  break;
                }
                case 48:
                  this.setReverbMacro(data);
                  coolInfo$1("Reverb Macro", data);
                  break;
                case 49:
                  this.reverbProcessor.character = data;
                  coolInfo$1("Reverb Character", data);
                  this.callEvent("effectChange", {
                    effect: "reverb",
                    parameter: "character",
                    value: data
                  });
                  break;
                case 50:
                  this.reverbProcessor.preLowpass = data;
                  coolInfo$1("Reverb Pre-LPF", data);
                  this.callEvent("effectChange", {
                    effect: "reverb",
                    parameter: "preLowpass",
                    value: data
                  });
                  break;
                case 51:
                  this.reverbProcessor.level = data;
                  coolInfo$1("Reverb Level", data);
                  this.callEvent("effectChange", {
                    effect: "reverb",
                    parameter: "level",
                    value: data
                  });
                  break;
                case 52:
                  this.reverbProcessor.time = data;
                  coolInfo$1("Reverb Time", data);
                  this.callEvent("effectChange", {
                    effect: "reverb",
                    parameter: "time",
                    value: data
                  });
                  break;
                case 53:
                  this.reverbProcessor.delayFeedback = data;
                  coolInfo$1("Reverb Delay Feedback", data);
                  this.callEvent("effectChange", {
                    effect: "reverb",
                    parameter: "delayFeedback",
                    value: data
                  });
                  break;
                case 54: break;
                case 55:
                  this.reverbProcessor.preDelayTime = data;
                  coolInfo$1("Reverb Predelay Time", data);
                  this.callEvent("effectChange", {
                    effect: "reverb",
                    parameter: "preDelayTime",
                    value: data
                  });
                  break;
                case 56:
                  this.setChorusMacro(data);
                  coolInfo$1("Chorus Macro", data);
                  break;
                case 57:
                  this.chorusProcessor.preLowpass = data;
                  coolInfo$1("Pre-LPF", data);
                  this.callEvent("effectChange", {
                    effect: "chorus",
                    parameter: "preLowpass",
                    value: data
                  });
                  break;
                case 58:
                  this.chorusProcessor.level = data;
                  coolInfo$1("Chorus Level", data);
                  this.callEvent("effectChange", {
                    effect: "chorus",
                    parameter: "level",
                    value: data
                  });
                  break;
                case 59:
                  this.chorusProcessor.feedback = data;
                  coolInfo$1("Chorus Feedback", data);
                  this.callEvent("effectChange", {
                    effect: "chorus",
                    parameter: "feedback",
                    value: data
                  });
                  break;
                case 60:
                  this.chorusProcessor.delay = data;
                  coolInfo$1("Chorus Delay", data);
                  this.callEvent("effectChange", {
                    effect: "chorus",
                    parameter: "delay",
                    value: data
                  });
                  break;
                case 61:
                  this.chorusProcessor.rate = data;
                  coolInfo$1("Chorus Rate", data);
                  this.callEvent("effectChange", {
                    effect: "chorus",
                    parameter: "rate",
                    value: data
                  });
                  break;
                case 62:
                  this.chorusProcessor.depth = data;
                  coolInfo$1("Chorus Depth", data);
                  this.callEvent("effectChange", {
                    effect: "chorus",
                    parameter: "depth",
                    value: data
                  });
                  break;
                case 63:
                  this.chorusProcessor.sendLevelToReverb = data;
                  coolInfo$1("Chorus Send Level To Reverb", data);
                  this.callEvent("effectChange", {
                    effect: "chorus",
                    parameter: "sendLevelToReverb",
                    value: data
                  });
                  break;
                case 64:
                  this.chorusProcessor.sendLevelToDelay = data;
                  coolInfo$1("Chorus Send Level To Delay", data);
                  this.callEvent("effectChange", {
                    effect: "chorus",
                    parameter: "sendLevelToDelay",
                    value: data
                  });
                  break;
                case 80:
                  this.setDelayMacro(data);
                  coolInfo$1("Delay Macro", data);
                  break;
                case 81:
                  this.delayProcessor.preLowpass = data;
                  coolInfo$1("Delay Pre-LPF", data);
                  this.callEvent("effectChange", {
                    effect: "delay",
                    parameter: "preLowpass",
                    value: data
                  });
                  break;
                case 82:
                  this.delayProcessor.timeCenter = data;
                  coolInfo$1("Delay Time Center", data);
                  this.callEvent("effectChange", {
                    effect: "delay",
                    parameter: "timeCenter",
                    value: data
                  });
                  break;
                case 83:
                  this.delayProcessor.timeRatioLeft = data;
                  coolInfo$1("Delay Time Ratio Left", data);
                  this.callEvent("effectChange", {
                    effect: "delay",
                    parameter: "timeRatioLeft",
                    value: data
                  });
                  break;
                case 84:
                  this.delayProcessor.timeRatioRight = data;
                  coolInfo$1("Delay Time Ratio Right", data);
                  this.callEvent("effectChange", {
                    effect: "delay",
                    parameter: "timeRatioRight",
                    value: data
                  });
                  break;
                case 85:
                  this.delayProcessor.levelCenter = data;
                  coolInfo$1("Delay Level Center", data);
                  this.callEvent("effectChange", {
                    effect: "delay",
                    parameter: "levelCenter",
                    value: data
                  });
                  break;
                case 86:
                  this.delayProcessor.levelLeft = data;
                  coolInfo$1("Delay Level Left", data);
                  this.callEvent("effectChange", {
                    effect: "delay",
                    parameter: "levelLeft",
                    value: data
                  });
                  break;
                case 87:
                  this.delayProcessor.levelRight = data;
                  coolInfo$1("Delay Level Right", data);
                  this.callEvent("effectChange", {
                    effect: "delay",
                    parameter: "levelRight",
                    value: data
                  });
                  break;
                case 88:
                  this.delayProcessor.level = data;
                  coolInfo$1("Delay Level", data);
                  this.callEvent("effectChange", {
                    effect: "delay",
                    parameter: "level",
                    value: data
                  });
                  break;
                case 89:
                  this.delayProcessor.feedback = data;
                  coolInfo$1("Delay Feedback", data);
                  this.callEvent("effectChange", {
                    effect: "delay",
                    parameter: "feedback",
                    value: data
                  });
                  break;
                case 90:
                  this.delayProcessor.sendLevelToReverb = data;
                  coolInfo$1("Delay Send Level To Reverb", data);
                  this.callEvent("effectChange", {
                    effect: "delay",
                    parameter: "sendLevelToReverb",
                    value: data
                  });
                  break;
              }
              break;
            }
            if (addr2 === 3) {
              if (this.masterParameters.insertionEffectLock) return;
              if (addr3 >= 3 && addr3 <= 25) this.insertionParams[addr3 - 3] = data;
              if (addr3 >= 3 && addr3 <= 22) {
                this.insertionProcessor.setParameter(addr3, data);
                coolInfo$1(`EFX Parameter ${addr3 - 2}`, data);
                this.callEvent("effectChange", {
                  effect: "insertion",
                  parameter: addr3,
                  value: data
                });
                return;
              }
              switch (addr3) {
                default:
                  sysExNotRecognized(syx, "Roland GS EFX");
                  return;
                case 0: {
                  const type = data << 8 | syx[8];
                  const proc = this.insertionEffects.get(type);
                  if (proc) {
                    coolInfo$1("EFX Type", type.toString(16));
                    this.insertionProcessor = proc;
                  } else {
                    this.insertionProcessor = this.insertionFallback;
                    SpessaSynthInfo(`%cUnsupported EFX processor: %c${type.toString(16)}%c, using Thru.`, consoleColors.warn, consoleColors.unrecognized, consoleColors.warn);
                  }
                  this.resetInsertionParams();
                  this.insertionProcessor.reset();
                  this.callEvent("effectChange", {
                    effect: "insertion",
                    parameter: 0,
                    value: type
                  });
                  return;
                }
                case 23:
                  this.insertionProcessor.sendLevelToReverb = data / 127 * EFX_SENDS_GAIN_CORRECTION;
                  coolInfo$1("EFX Send Level to Reverb", data);
                  this.callEvent("effectChange", {
                    effect: "insertion",
                    parameter: addr3,
                    value: data
                  });
                  return;
                case 24:
                  this.insertionProcessor.sendLevelToChorus = data / 127 * EFX_SENDS_GAIN_CORRECTION;
                  coolInfo$1("EFX Send Level to Chorus", data);
                  this.callEvent("effectChange", {
                    effect: "insertion",
                    parameter: addr3,
                    value: data
                  });
                  return;
                case 25:
                  this.insertionProcessor.sendLevelToDelay = data / 127 * EFX_SENDS_GAIN_CORRECTION;
                  this.delayActive = true;
                  coolInfo$1("EFX Send Level to Delay", data);
                  this.callEvent("effectChange", {
                    effect: "insertion",
                    parameter: addr3,
                    value: data
                  });
                  return;
              }
            }
            if (addr2 >> 4 === 1) {
              const channel = syxToChannel(addr2 & 15) + channelOffset;
              const channelObject = this.midiChannels[channel];
              switch (addr3) {
                default:
                  sysExNotRecognized(syx, "Roland GS");
                  return;
                case 0:
                  channelObject.controllerChange(midiControllers.bankSelect, data);
                  channelObject.programChange(syx[8]);
                  break;
                case 2:
                  channelObject.rxChannel = data === 16 ? -1 : data + channelOffset;
                  this.customChannelNumbers ||= channelObject.rxChannel !== channelObject.channel;
                  coolInfo$1(`Rx. Channel on ${channel}`, channelObject.rxChannel);
                  break;
                case 19:
                  channelObject.polyMode = data === 1;
                  coolInfo$1(`Mono/poly on ${channel}`, channelObject.polyMode ? "POLY" : "MONO");
                  break;
                case 20:
                  channelObject.assignMode = data;
                  coolInfo$1(`Assign mode on ${channel}`, data);
                  break;
                case 21: {
                  channelObject.drumMap = data;
                  const isDrums = data > 0;
                  channelObject.setGSDrums(isDrums);
                  coolInfo$1(`Drums on ${channel}`, isDrums.toString());
                  return;
                }
                case 22: {
                  const keyShift = data - 64;
                  channelObject.setCustomController(customControllers.channelKeyShift, keyShift);
                  coolInfo$1(`Key shift on ${channel}`, keyShift);
                  return;
                }
                case 25:
                  channelObject.controllerChange(midiControllers.mainVolume, data);
                  return;
                case 28: {
                  const panPosition = data;
                  if (panPosition === 0) {
                    channelObject.randomPan = true;
                    coolInfo$1(`Random pan on ${channel}`, "ON");
                  } else {
                    channelObject.randomPan = false;
                    channelObject.controllerChange(midiControllers.pan, panPosition);
                  }
                  break;
                }
                case 31:
                  channelObject.cc1 = data;
                  coolInfo$1("CC1 Controller Number", data);
                  break;
                case 32:
                  channelObject.cc2 = data;
                  coolInfo$1("CC2 Controller Number", data);
                  break;
                case 33:
                  channelObject.controllerChange(midiControllers.chorusDepth, data);
                  break;
                case 34:
                  channelObject.controllerChange(midiControllers.reverbDepth, data);
                  break;
                case 42: {
                  const tuneCents = ((data << 7 | syx[8]) - 8192) / 81.92;
                  channelObject.setTuning(tuneCents);
                  break;
                }
                case 44:
                  channelObject.controllerChange(midiControllers.variationDepth, data);
                  break;
                case 48:
                  channelObject.controllerChange(midiControllers.vibratoRate, data);
                  break;
                case 49:
                  channelObject.controllerChange(midiControllers.vibratoDepth, data);
                  break;
                case 50:
                  channelObject.controllerChange(midiControllers.brightness, data);
                  break;
                case 51:
                  channelObject.controllerChange(midiControllers.filterResonance, data);
                  break;
                case 52:
                  channelObject.controllerChange(midiControllers.attackTime, data);
                  break;
                case 53:
                  channelObject.controllerChange(midiControllers.decayTime, data);
                  break;
                case 54:
                  channelObject.controllerChange(midiControllers.releaseTime, data);
                  break;
                case 55:
                  channelObject.controllerChange(midiControllers.vibratoDelay, data);
                  break;
                case 64: {
                  const tuningBytes = syx.length - 9;
                  const newTuning = new Int8Array(12);
                  for (let i = 0; i < tuningBytes; i++) newTuning[i] = syx[i + 7] - 64;
                  channelObject.setOctaveTuning(newTuning);
                  const cents = data - 64;
                  coolInfo$1(`Octave Scale Tuning on ${channel}`, newTuning.join(", "));
                  channelObject.setTuning(cents);
                  break;
                }
              }
              return;
            }
            if (addr2 >> 4 === 2) {
              const channel = syxToChannel(addr2 & 15) + channelOffset;
              const ch = this.midiChannels[channel];
              switch (addr3 & 240) {
                default:
                  sysExNotRecognized(syx, "Roland GS Patch Parameter Controller");
                  break;
                case 0:
                  if ((addr3 & 15) === 4) {
                    const cents = data / 127 * 600;
                    ch.customControllers[customControllers.modulationMultiplier] = cents / 50;
                    sysExLogging(ch.channel, cents, "modulation wheel depth", "cents");
                    break;
                  }
                  ch.sysExModulators.setupReceiver(addr3, data, midiControllers.modulationWheel, "mod wheel");
                  break;
                case 16:
                  if ((addr3 & 15) === 0) {
                    const centeredValue = data - 64;
                    ch.midiControllers[128 + modulatorSources.pitchWheelRange] = centeredValue << 7;
                    sysExLogging(ch.channel, centeredValue, "pitch wheel range", "semitones");
                    break;
                  }
                  ch.sysExModulators.setupReceiver(addr3, data, 128 + modulatorSources.pitchWheel, "pitch wheel", true);
                  break;
                case 32:
                  ch.sysExModulators.setupReceiver(addr3, data, 128 + modulatorSources.channelPressure, "channel pressure");
                  break;
                case 48:
                  ch.sysExModulators.setupReceiver(addr3, data, 128 + modulatorSources.polyPressure, "poly pressure");
                  break;
                case 64:
                  ch.sysExModulators.setupReceiver(addr3, data, ch.cc1, "CC1");
                  break;
                case 80: ch.sysExModulators.setupReceiver(addr3, data, ch.cc2, "CC2");
              }
              return;
            }
            if (addr2 >> 4 === 4) {
              const channel = syxToChannel(addr2 & 15) + channelOffset;
              const channelObject = this.midiChannels[channel];
              switch (addr3) {
                default:
                  sysExNotRecognized(syx, "Roland GS Patch Part Parameter");
                  break;
                case 0:
                case 1:
                  channelObject.controllerChange(midiControllers.bankSelectLSB, data);
                  break;
                case 34: {
                  if (this.masterParameters.insertionEffectLock) return;
                  const efx = data === 1;
                  channelObject.insertionEnabled = efx;
                  this.insertionActive ||= efx;
                  coolInfo$1(`Insertion for ${channel}`, efx ? "ON" : "OFF");
                  this.callEvent("effectChange", {
                    effect: "insertion",
                    parameter: efx ? -1 : -2,
                    value: channel
                  });
                }
              }
              return;
            }
            sysExNotRecognized(syx, "Roland GS Patch Parameter");
            return;
          }
          if (addr1 === 65) {
            if (this.masterParameters.drumLock) return;
            const map = (addr2 >> 4) + 1;
            const drumKey = addr3;
            switch (addr2 & 15) {
              default:
                sysExNotRecognized(syx, "Roland GS Drum Setup");
                return;
              case 0: {
                const patchName = readBinaryString(syx, 12, 7);
                coolInfo$1(`Patch Name for MAP${map}`, patchName);
                break;
              }
              case 1: {
                const pitch = data - 60;
                for (const ch of this.midiChannels) {
                  if (ch.drumMap !== map) continue;
                  ch.drumParams[drumKey].pitch = pitch * (ch.patch.bankLSB === 1 ? 100 : 50);
                }
                coolInfo$1(`Drum Pitch for MAP${map}, key ${drumKey}`, pitch);
                break;
              }
              case 2:
                for (const ch of this.midiChannels) {
                  if (ch.drumMap !== map) continue;
                  ch.drumParams[drumKey].gain = data / 120;
                }
                coolInfo$1(`Drum Level for MAP${map}, key ${drumKey}`, data);
                break;
              case 3:
                for (const ch of this.midiChannels) {
                  if (ch.drumMap !== map) continue;
                  ch.drumParams[drumKey].exclusiveClass = data;
                }
                coolInfo$1(`Drum Assign Group for MAP${map}, key ${drumKey}`, data);
                break;
              case 4:
                for (const ch of this.midiChannels) {
                  if (ch.drumMap !== map) continue;
                  ch.drumParams[drumKey].pan = data;
                }
                coolInfo$1(`Drum Pan for MAP${map}, key ${drumKey}`, data);
                break;
              case 5:
                for (const ch of this.midiChannels) {
                  if (ch.drumMap !== map) continue;
                  ch.drumParams[drumKey].reverbGain = data / 127;
                }
                coolInfo$1(`Drum Reverb for MAP${map}, key ${drumKey}`, data);
                break;
              case 6:
                for (const ch of this.midiChannels) {
                  if (ch.drumMap !== map) continue;
                  ch.drumParams[drumKey].chorusGain = data / 127;
                }
                coolInfo$1(`Drum Chorus for MAP${map}, key ${drumKey}`, data);
                break;
              case 7:
                for (const ch of this.midiChannels) {
                  if (ch.drumMap !== map) continue;
                  ch.drumParams[drumKey].rxNoteOff = data === 1;
                }
                coolInfo$1(`Drum Note Off for MAP${map}, key ${drumKey}`, data === 1);
                break;
              case 8:
                for (const ch of this.midiChannels) {
                  if (ch.drumMap !== map) continue;
                  ch.drumParams[drumKey].rxNoteOn = data === 1;
                }
                coolInfo$1(`Drum Note On for MAP${map}, key ${drumKey}`, data === 1);
                break;
              case 9:
                for (const ch of this.midiChannels) {
                  if (ch.drumMap !== map) continue;
                  ch.drumParams[drumKey].delayGain = data / 127;
                }
                coolInfo$1(`Drum Delay for MAP${map}, key ${drumKey}`, data);
                break;
            }
            return;
          }
          sysExNotRecognized(syx, "Roland GS");
          return;
        }
        case 69:
          if (syx[4] === 16) if (syx[5] === 0) this.callEvent("synthDisplay", [...syx]);
          else if (syx[5] === 1) this.callEvent("synthDisplay", [...syx]);
          else sysExNotRecognized(syx, "Roland GS Display");
          return;
        case 22: if (syx[4] === 16) {
          this.setMIDIVolume(syx[7] / 100);
          SpessaSynthInfo(`%cRoland Master Volume control set to: %c${syx[7]}`, consoleColors.info, consoleColors.value);
          return;
        } else sysExNotRecognized(syx, "Roland");
      }
      else {
        sysExNotRecognized(syx, "Roland");
        return;
      }
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/system_exclusive/handle_xg.ts
    const coolInfo = (what, value) => {
      SpessaSynthInfo(`%cYamaha XG ${what}%c for is now set to %c${value}%c.`, consoleColors.recognized, consoleColors.info, consoleColors.value, consoleColors.info);
    };
    /**
    * Handles a XG system exclusive
    * http://www.studio4all.de/htmle/main91.html
    * @param syx
    * @param channelOffset
    */
    function handleXG(syx, channelOffset = 0) {
      if (syx[2] === 76) {
        const addr1 = syx[3];
        const addr2 = syx[4];
        const addr3 = syx[5];
        const data = syx[6];
        if (addr1 === 0 && addr2 === 0) {
          switch (addr3) {
            case 0:
              {
                const cents = (((syx[6] & 15) << 12 | (syx[7] & 15) << 8 | (syx[8] & 15) << 4 | syx[9] & 15) - 1024) / 10;
                this.setMasterTuning(cents);
                coolInfo("Master Tune", cents);
              }
              break;
            case 4:
              this.setMIDIVolume(data / 127);
              coolInfo("Master Volume", data);
              break;
            case 5: {
              const vol = 127 - data;
              this.setMIDIVolume(vol / 127);
              coolInfo("Master Attenuation", data);
              break;
            }
            case 6: {
              const transpose = data - 64;
              this.setMasterParameter("transposition", transpose);
              coolInfo("Master Transpose", transpose);
              break;
            }
            case 127:
            case 126:
              SpessaSynthInfo("%cXG system on", consoleColors.info);
              this.resetAllControllers("xg");
              break;
          }
          return;
        }
        if (addr1 === 2 && addr2 === 1) {
          let effectType;
          const effect = addr3;
          if (effect <= 21) effectType = "Reverb";
          else if (effect <= 35) effectType = "Chorus";
          else effectType = "Variation";
          SpessaSynthInfo(`%cUnsupported XG ${effectType} Parameter: %c${effect.toString(16)}`, consoleColors.warn, consoleColors.unrecognized);
          return;
        }
        if (addr1 === 8) {
          if (!BankSelectHacks.isSystemXG(this.masterParameters.midiSystem)) return;
          const channel = addr2 + channelOffset;
          if (channel >= this.midiChannels.length) return;
          const channelObject = this.midiChannels[channel];
          switch (addr3) {
            case 1:
              channelObject.controllerChange(midiControllers.bankSelect, data);
              break;
            case 2:
              channelObject.controllerChange(midiControllers.bankSelectLSB, data);
              break;
            case 3:
              channelObject.programChange(data);
              break;
            case 4:
              channelObject.rxChannel = data + channelOffset;
              this.customChannelNumbers ||= channelObject.rxChannel !== channelObject.channel;
              coolInfo(`Rev. Channel on ${channel}`, channelObject.rxChannel);
              break;
            case 5:
              channelObject.polyMode = data === 1;
              coolInfo(`Mono/poly on ${channel}`, channelObject.polyMode ? "POLY" : "MONO");
              break;
            case 7:
              channelObject.setDrums(data !== 0);
              break;
            case 8: {
              if (channelObject.drumChannel) break;
              const keyShift = data - 64;
              channelObject.setCustomController(customControllers.channelKeyShift, keyShift);
              coolInfo(`Key shift on ${channel}`, keyShift);
              break;
            }
            case 11:
              channelObject.controllerChange(midiControllers.mainVolume, data);
              break;
            case 14: {
              const pan = data;
              if (pan === 0) {
                channelObject.randomPan = true;
                coolInfo(`Random Pan for ${channel}`, "ON");
              } else channelObject.controllerChange(midiControllers.pan, pan);
              break;
            }
            case 18:
              channelObject.controllerChange(midiControllers.chorusDepth, data);
              break;
            case 19:
              channelObject.controllerChange(midiControllers.reverbDepth, data);
              break;
            case 21:
              channelObject.controllerChange(midiControllers.vibratoRate, data);
              break;
            case 22:
              channelObject.controllerChange(midiControllers.vibratoDepth, data);
              break;
            case 23:
              channelObject.controllerChange(midiControllers.vibratoDelay, data);
              break;
            case 24:
              channelObject.controllerChange(midiControllers.brightness, data);
              break;
            case 25:
              channelObject.controllerChange(midiControllers.filterResonance, data);
              break;
            case 26:
              channelObject.controllerChange(midiControllers.attackTime, data);
              break;
            case 27:
              channelObject.controllerChange(midiControllers.decayTime, data);
              break;
            case 28:
              channelObject.controllerChange(midiControllers.releaseTime, data);
              break;
            default: SpessaSynthInfo(`%cUnsupported Yamaha XG Part Setup: %c${syx[5].toString(16).toUpperCase()}%c for channel ${channel}`, consoleColors.warn, consoleColors.unrecognized, consoleColors.warn);
          }
          return;
        }
        if (addr1 >> 4 === 3) {
          if (this.masterParameters.drumLock) return;
          const drumKey = addr2;
          switch (addr3) {
            default:
              sysExNotRecognized([addr3], "Yamaha XG Drum Setup");
              return;
            case 0: {
              const pitch = (data - 64) * 100;
              for (const ch of this.midiChannels) {
                if (!ch.drumChannel) continue;
                ch.drumParams[drumKey].pitch = pitch;
              }
              coolInfo(`Drum Pitch, key ${drumKey}`, pitch);
              break;
            }
            case 1: {
              const pitch = data - 64;
              for (const ch of this.midiChannels) {
                if (!ch.drumChannel) continue;
                ch.drumParams[drumKey].pitch += pitch;
              }
              coolInfo(`Drum Pitch Fine, key ${drumKey}`, pitch);
              break;
            }
            case 2:
              for (const ch of this.midiChannels) {
                if (!ch.drumChannel) continue;
                ch.drumParams[drumKey].gain = data / 120;
              }
              coolInfo(`Drum Level, key ${drumKey}`, data);
              break;
            case 3:
              for (const ch of this.midiChannels) {
                if (!ch.drumChannel) continue;
                ch.drumParams[drumKey].exclusiveClass = data;
              }
              coolInfo(`Drum Alternate Group, key ${drumKey}`, data);
              break;
            case 4:
              for (const ch of this.midiChannels) {
                if (!ch.drumChannel) continue;
                ch.drumParams[drumKey].pan = data;
              }
              coolInfo(`Drum Pan, key ${drumKey}`, data);
              break;
            case 5:
              for (const ch of this.midiChannels) {
                if (!ch.drumChannel) continue;
                ch.drumParams[drumKey].reverbGain = data / 127;
              }
              coolInfo(`Drum Reverb, key ${drumKey}`, data);
              break;
            case 6:
              for (const ch of this.midiChannels) {
                if (!ch.drumChannel) continue;
                ch.drumParams[drumKey].chorusGain = data / 127;
              }
              coolInfo(`Drum Chorus, key ${drumKey}`, data);
              break;
            case 9:
              for (const ch of this.midiChannels) {
                if (!ch.drumChannel) continue;
                ch.drumParams[drumKey].rxNoteOff = data === 1;
              }
              coolInfo(`Drum Note Off, key ${drumKey}`, data === 1);
              break;
            case 10:
              for (const ch of this.midiChannels) {
                if (!ch.drumChannel) continue;
                ch.drumParams[drumKey].rxNoteOn = data === 1;
              }
              coolInfo(`Drum Note On, key ${drumKey}`, data === 1);
              break;
          }
          return;
        }
        if (addr1 === 6 || addr1 === 7) this.callEvent("synthDisplay", [...syx]);
        else if (BankSelectHacks.isSystemXG(this.masterParameters.midiSystem)) sysExNotRecognized(syx, "Yamaha XG");
      } else sysExNotRecognized(syx, "Yamaha");
    }
    //#endregion
    //#region src/synthesizer/audio_engine/engine_methods/system_exclusive.ts
    /**
    * Executes a system exclusive message for the synthesizer.
    * @param syx The system exclusive message as an array of bytes.
    * @param channelOffset The channel offset to apply (default is 0).
    * @remarks
    * This is a rather extensive method that handles various system exclusive messages,
    * including Roland GS, MIDI Tuning Standard, and other non-realtime messages.
    */
    function systemExclusiveInternal(syx, channelOffset = 0) {
      channelOffset += this.portSelectChannelOffset;
      const manufacturer = syx[0];
      if (this.masterParameters.deviceID !== -1 && syx[1] !== 127 && this.masterParameters.deviceID !== syx[1]) return;
      switch (manufacturer) {
        default:
          SpessaSynthInfo(`%cUnknown manufacturer: %c${arrayToHexString(syx)}`, consoleColors.warn, consoleColors.unrecognized);
          break;
        case 126:
        case 127:
          handleGM.call(this, syx, channelOffset);
          break;
        case 65:
          handleGS.call(this, syx, channelOffset);
          break;
        case 67:
          handleXG.call(this, syx, channelOffset);
          break;
        case 245:
          if (syx.length < 2) return;
          this.portSelectChannelOffset = (syx[1] - 1) * 16;
          while (this.midiChannels.length <= this.portSelectChannelOffset) {
            SpessaSynthInfo(`%cPort select, channel offset %c${this.portSelectChannelOffset}%c. Creating a new port!`, consoleColors.info, consoleColors.value, consoleColors.info);
            for (let i = 0; i < 16; i++) this.createMIDIChannel(true);
          }
          break;
      }
    }
    //#endregion
    //#region src/synthesizer/audio_engine/effects/insertion/thru.ts
    var ThruFX = class {
      sendLevelToReverb = 40 / 127;
      sendLevelToChorus = 0;
      sendLevelToDelay = 0;
      type = 0;
      reset() {}
      process(inputLeft, inputRight, outputLeft, outputRight, outputReverb, outputChorus, outputDelay, startIndex, sampleCount) {
        const { sendLevelToReverb, sendLevelToChorus, sendLevelToDelay } = this;
        for (let i = 0; i < sampleCount; i++) {
          const sL = inputLeft[i];
          const sR = inputRight[i];
          const idx = startIndex + i;
          outputLeft[idx] += sL;
          outputRight[idx] += sR;
          const mono = (sL + sR) * .5;
          outputReverb[i] += mono * sendLevelToReverb;
          outputChorus[i] += mono * sendLevelToChorus;
          outputDelay[i] += mono * sendLevelToDelay;
        }
      }
      setParameter(parameter, value) {}
    };
    //#endregion
    //#region src/synthesizer/audio_engine/effects/insertion/convert.ts
    var InsertionValueConverter = class {
      static data = [
        [
          0,
          200,
          200,
          0,
          0,
          .05,
          .05,
          315,
          250,
          200,
          250,
          100,
          -180,
          0
        ],
        [
          .1,
          205,
          205,
          .1,
          5,
          .1,
          .1,
          315,
          250,
          200,
          250,
          110,
          -180,
          1
        ],
        [
          .2,
          210,
          210,
          .2,
          10,
          .15,
          .15,
          315,
          250,
          200,
          250,
          120,
          -180,
          2
        ],
        [
          .3,
          215,
          215,
          .3,
          15,
          .2,
          .2,
          315,
          250,
          200,
          250,
          130,
          -180,
          3
        ],
        [
          .4,
          220,
          220,
          .4,
          20,
          .25,
          .25,
          315,
          250,
          200,
          250,
          140,
          -180,
          4
        ],
        [
          .5,
          225,
          225,
          .5,
          25,
          .3,
          .3,
          315,
          250,
          200,
          250,
          150,
          -180,
          5
        ],
        [
          .6,
          230,
          230,
          .6,
          30,
          .35,
          .35,
          315,
          250,
          200,
          250,
          160,
          -168,
          5
        ],
        [
          .7,
          235,
          235,
          .7,
          35,
          .4,
          .4,
          315,
          250,
          200,
          250,
          170,
          -168,
          5
        ],
        [
          .8,
          240,
          240,
          .8,
          40,
          .45,
          .45,
          400,
          315,
          250,
          315,
          180,
          -168,
          5
        ],
        [
          .9,
          245,
          245,
          .9,
          45,
          .5,
          .5,
          400,
          315,
          250,
          315,
          190,
          -168,
          5
        ],
        [
          1,
          250,
          250,
          1,
          50,
          .55,
          .55,
          400,
          315,
          250,
          315,
          200,
          -156,
          5
        ],
        [
          1.1,
          255,
          255,
          1.1,
          55,
          .6,
          .6,
          400,
          315,
          250,
          315,
          210,
          -156,
          5
        ],
        [
          1.2,
          260,
          260,
          1.2,
          60,
          .65,
          .65,
          400,
          315,
          250,
          315,
          220,
          -156,
          5
        ],
        [
          1.3,
          265,
          265,
          1.3,
          65,
          .7,
          .7,
          400,
          315,
          250,
          315,
          230,
          -156,
          5
        ],
        [
          1.4,
          270,
          270,
          1.4,
          70,
          .75,
          .75,
          400,
          315,
          250,
          315,
          240,
          -144,
          5
        ],
        [
          1.5,
          275,
          275,
          1.5,
          75,
          .8,
          .8,
          400,
          315,
          250,
          315,
          250,
          -144,
          5
        ],
        [
          1.6,
          280,
          280,
          1.6,
          80,
          .85,
          .85,
          500,
          400,
          315,
          400,
          260,
          -144,
          5
        ],
        [
          1.7,
          285,
          285,
          1.7,
          85,
          .9,
          .9,
          500,
          400,
          315,
          400,
          270,
          -144,
          5
        ],
        [
          1.8,
          290,
          290,
          1.8,
          90,
          .95,
          .95,
          500,
          400,
          315,
          400,
          280,
          -132,
          5
        ],
        [
          1.9,
          295,
          295,
          1.9,
          95,
          1,
          1,
          500,
          400,
          315,
          400,
          290,
          -132,
          5
        ],
        [
          2,
          300,
          300,
          2,
          100,
          1.05,
          1.05,
          500,
          400,
          315,
          400,
          300,
          -132,
          5
        ],
        [
          2.1,
          305,
          305,
          2.1,
          105,
          1.1,
          1.1,
          500,
          400,
          315,
          400,
          320,
          -132,
          5
        ],
        [
          2.2,
          310,
          310,
          2.2,
          110,
          1.15,
          1.15,
          500,
          400,
          315,
          400,
          340,
          -120,
          5
        ],
        [
          2.3,
          315,
          315,
          2.3,
          115,
          1.2,
          1.2,
          500,
          400,
          315,
          400,
          360,
          -120,
          5
        ],
        [
          2.4,
          320,
          320,
          2.4,
          120,
          1.25,
          1.25,
          630,
          500,
          400,
          500,
          380,
          -120,
          5
        ],
        [
          2.5,
          325,
          325,
          2.5,
          125,
          1.3,
          1.3,
          630,
          500,
          400,
          500,
          400,
          -120,
          5
        ],
        [
          2.6,
          330,
          330,
          2.6,
          130,
          1.35,
          1.35,
          630,
          500,
          400,
          500,
          420,
          -108,
          5
        ],
        [
          2.7,
          335,
          335,
          2.7,
          135,
          1.4,
          1.4,
          630,
          500,
          400,
          500,
          440,
          -108,
          5
        ],
        [
          2.8,
          340,
          340,
          2.8,
          140,
          1.45,
          1.45,
          630,
          500,
          400,
          500,
          460,
          -108,
          5
        ],
        [
          2.9,
          345,
          345,
          2.9,
          145,
          1.5,
          1.5,
          630,
          500,
          400,
          500,
          480,
          -108,
          5
        ],
        [
          3,
          350,
          350,
          3,
          150,
          1.55,
          1.55,
          630,
          500,
          400,
          500,
          500,
          -96,
          6
        ],
        [
          3.1,
          355,
          355,
          3.1,
          155,
          1.6,
          1.6,
          630,
          500,
          400,
          500,
          520,
          -96,
          6
        ],
        [
          3.2,
          360,
          360,
          3.2,
          160,
          1.65,
          1.65,
          800,
          630,
          500,
          630,
          540,
          -96,
          6
        ],
        [
          3.3,
          365,
          365,
          3.3,
          165,
          1.7,
          1.7,
          800,
          630,
          500,
          630,
          560,
          -96,
          6
        ],
        [
          3.4,
          370,
          370,
          3.4,
          170,
          1.75,
          1.75,
          800,
          630,
          500,
          630,
          580,
          -84,
          6
        ],
        [
          3.5,
          375,
          375,
          3.5,
          175,
          1.8,
          1.8,
          800,
          630,
          500,
          630,
          600,
          -84,
          6
        ],
        [
          3.6,
          380,
          380,
          3.6,
          180,
          1.85,
          1.85,
          800,
          630,
          500,
          630,
          620,
          -84,
          6
        ],
        [
          3.7,
          385,
          385,
          3.7,
          185,
          1.9,
          1.9,
          800,
          630,
          500,
          630,
          640,
          -84,
          6
        ],
        [
          3.8,
          390,
          390,
          3.8,
          190,
          1.95,
          1.95,
          800,
          630,
          500,
          630,
          660,
          -72,
          6
        ],
        [
          3.9,
          395,
          395,
          3.9,
          195,
          2,
          2,
          800,
          630,
          500,
          630,
          680,
          -72,
          6
        ],
        [
          4,
          400,
          400,
          4,
          200,
          2.05,
          2.05,
          1e3,
          800,
          630,
          800,
          700,
          -72,
          6
        ],
        [
          4.1,
          405,
          405,
          4.1,
          205,
          2.1,
          2.1,
          1e3,
          800,
          630,
          800,
          720,
          -72,
          6
        ],
        [
          4.2,
          410,
          410,
          4.2,
          210,
          2.15,
          2.15,
          1e3,
          800,
          630,
          800,
          740,
          -60,
          6
        ],
        [
          4.3,
          415,
          415,
          4.3,
          215,
          2.2,
          2.2,
          1e3,
          800,
          630,
          800,
          760,
          -60,
          6
        ],
        [
          4.4,
          420,
          420,
          4.4,
          220,
          2.25,
          2.25,
          1e3,
          800,
          630,
          800,
          780,
          -60,
          6
        ],
        [
          4.5,
          425,
          425,
          4.5,
          225,
          2.3,
          2.3,
          1e3,
          800,
          630,
          800,
          800,
          -60,
          6
        ],
        [
          4.6,
          430,
          430,
          4.6,
          230,
          2.35,
          2.35,
          1e3,
          800,
          630,
          800,
          820,
          -48,
          6
        ],
        [
          4.7,
          435,
          435,
          4.7,
          235,
          2.4,
          2.4,
          1e3,
          800,
          630,
          800,
          840,
          -48,
          6
        ],
        [
          4.8,
          440,
          440,
          4.8,
          240,
          2.45,
          2.45,
          1250,
          1e3,
          800,
          1e3,
          860,
          -48,
          9
        ],
        [
          4.9,
          445,
          445,
          4.9,
          245,
          2.5,
          2.5,
          1250,
          1e3,
          800,
          1e3,
          880,
          -48,
          9
        ],
        [
          5,
          450,
          450,
          5,
          250,
          2.55,
          2.55,
          1250,
          1e3,
          800,
          1e3,
          900,
          -36,
          9
        ],
        [
          5.5,
          455,
          455,
          5.5,
          255,
          2.6,
          2.6,
          1250,
          1e3,
          800,
          1e3,
          920,
          -36,
          9
        ],
        [
          6,
          460,
          460,
          6,
          260,
          2.65,
          2.65,
          1250,
          1e3,
          800,
          1e3,
          940,
          -36,
          9
        ],
        [
          6.5,
          465,
          465,
          6.5,
          265,
          2.7,
          2.7,
          1250,
          1e3,
          800,
          1e3,
          960,
          -36,
          9
        ],
        [
          7,
          470,
          470,
          7,
          270,
          2.75,
          2.75,
          1250,
          1e3,
          800,
          1e3,
          980,
          -24,
          9
        ],
        [
          7.5,
          475,
          475,
          7.5,
          275,
          2.8,
          2.8,
          1250,
          1e3,
          800,
          1e3,
          1e3,
          -24,
          9
        ],
        [
          8,
          480,
          480,
          8,
          280,
          2.85,
          2.85,
          1600,
          1250,
          1e3,
          1250,
          1100,
          -24,
          9
        ],
        [
          8.5,
          485,
          485,
          8.5,
          285,
          2.9,
          2.9,
          1600,
          1250,
          1e3,
          1250,
          1200,
          -24,
          9
        ],
        [
          9,
          490,
          490,
          9,
          290,
          2.95,
          2.95,
          1600,
          1250,
          1e3,
          1250,
          1300,
          -12,
          9
        ],
        [
          9.5,
          495,
          495,
          9.5,
          295,
          3,
          3,
          1600,
          1250,
          1e3,
          1250,
          1400,
          -12,
          9
        ],
        [
          10,
          500,
          500,
          10,
          300,
          3.05,
          3.05,
          1600,
          1250,
          1e3,
          1250,
          1500,
          -12,
          9
        ],
        [
          11,
          505,
          505,
          11,
          305,
          3.1,
          3.1,
          1600,
          1250,
          1e3,
          1250,
          1600,
          -12,
          9
        ],
        [
          12,
          510,
          510,
          12,
          310,
          3.15,
          3.15,
          1600,
          1250,
          1e3,
          1250,
          1700,
          0,
          9
        ],
        [
          13,
          515,
          515,
          13,
          315,
          3.2,
          3.2,
          1600,
          1250,
          1e3,
          1250,
          1800,
          0,
          9
        ],
        [
          14,
          520,
          520,
          14,
          320,
          3.25,
          3.25,
          2e3,
          1600,
          1250,
          1600,
          1900,
          0,
          12
        ],
        [
          15,
          525,
          525,
          15,
          325,
          3.3,
          3.3,
          2e3,
          1600,
          1250,
          1600,
          2e3,
          0,
          12
        ],
        [
          16,
          530,
          530,
          16,
          330,
          3.35,
          3.35,
          2e3,
          1600,
          1250,
          1600,
          2100,
          12,
          12
        ],
        [
          17,
          535,
          535,
          17,
          335,
          3.4,
          3.4,
          2e3,
          1600,
          1250,
          1600,
          2200,
          12,
          12
        ],
        [
          18,
          540,
          540,
          18,
          340,
          3.45,
          3.45,
          2e3,
          1600,
          1250,
          1600,
          2300,
          12,
          12
        ],
        [
          19,
          545,
          545,
          19,
          345,
          3.5,
          3.5,
          2e3,
          1600,
          1250,
          1600,
          2400,
          12,
          12
        ],
        [
          20,
          550,
          550,
          20,
          350,
          3.55,
          3.55,
          2e3,
          1600,
          1250,
          1600,
          2500,
          24,
          12
        ],
        [
          21,
          560,
          555,
          21,
          355,
          3.6,
          3.6,
          2e3,
          1600,
          1250,
          1600,
          2600,
          24,
          12
        ],
        [
          22,
          570,
          560,
          22,
          360,
          3.65,
          3.65,
          2500,
          2e3,
          1600,
          2e3,
          2700,
          24,
          12
        ],
        [
          23,
          580,
          565,
          23,
          365,
          3.7,
          3.7,
          2500,
          2e3,
          1600,
          2e3,
          2800,
          24,
          12
        ],
        [
          24,
          590,
          570,
          24,
          370,
          3.75,
          3.75,
          2500,
          2e3,
          1600,
          2e3,
          2900,
          36,
          12
        ],
        [
          25,
          600,
          575,
          25,
          375,
          3.8,
          3.8,
          2500,
          2e3,
          1600,
          2e3,
          3e3,
          36,
          12
        ],
        [
          26,
          610,
          580,
          26,
          380,
          3.85,
          3.85,
          2500,
          2e3,
          1600,
          2e3,
          3100,
          36,
          12
        ],
        [
          27,
          620,
          585,
          27,
          385,
          3.9,
          3.9,
          2500,
          2e3,
          1600,
          2e3,
          3200,
          36,
          12
        ],
        [
          28,
          630,
          590,
          28,
          390,
          3.95,
          3.95,
          2500,
          2e3,
          1600,
          2e3,
          3300,
          48,
          12
        ],
        [
          29,
          640,
          595,
          29,
          395,
          4,
          4,
          2500,
          2e3,
          1600,
          2e3,
          3400,
          48,
          12
        ],
        [
          30,
          650,
          600,
          30,
          400,
          4.05,
          4.05,
          3150,
          2500,
          2e3,
          2500,
          3500,
          48,
          10
        ],
        [
          31,
          660,
          610,
          31,
          405,
          4.1,
          4.1,
          3150,
          2500,
          2e3,
          2500,
          3600,
          48,
          10
        ],
        [
          32,
          670,
          620,
          32,
          410,
          4.15,
          4.15,
          3150,
          2500,
          2e3,
          2500,
          3700,
          60,
          10
        ],
        [
          33,
          680,
          630,
          33,
          415,
          4.2,
          4.2,
          3150,
          2500,
          2e3,
          2500,
          3800,
          60,
          10
        ],
        [
          34,
          690,
          640,
          34,
          420,
          4.25,
          4.25,
          3150,
          2500,
          2e3,
          2500,
          3900,
          60,
          10
        ],
        [
          35,
          700,
          650,
          35,
          425,
          4.3,
          4.3,
          3150,
          2500,
          2e3,
          2500,
          4e3,
          60,
          10
        ],
        [
          36,
          710,
          660,
          36,
          430,
          4.35,
          4.35,
          3150,
          2500,
          2e3,
          2500,
          4100,
          72,
          10
        ],
        [
          37,
          720,
          670,
          37,
          435,
          4.4,
          4.4,
          3150,
          2500,
          2e3,
          2500,
          4200,
          72,
          10
        ],
        [
          38,
          730,
          680,
          38,
          440,
          4.45,
          4.45,
          4e3,
          3150,
          2500,
          3150,
          4300,
          72,
          11
        ],
        [
          39,
          740,
          690,
          39,
          445,
          4.5,
          4.5,
          4e3,
          3150,
          2500,
          3150,
          4400,
          72,
          11
        ],
        [
          40,
          750,
          700,
          40,
          450,
          4.55,
          4.55,
          4e3,
          3150,
          2500,
          3150,
          4500,
          84,
          11
        ],
        [
          41,
          760,
          710,
          50,
          455,
          4.6,
          4.6,
          4e3,
          3150,
          2500,
          3150,
          4600,
          84,
          11
        ],
        [
          42,
          770,
          720,
          60,
          460,
          4.65,
          4.65,
          4e3,
          3150,
          2500,
          3150,
          4700,
          84,
          11
        ],
        [
          43,
          780,
          730,
          70,
          465,
          4.7,
          4.7,
          4e3,
          3150,
          2500,
          3150,
          4800,
          84,
          11
        ],
        [
          44,
          790,
          740,
          80,
          470,
          4.75,
          4.75,
          4e3,
          3150,
          2500,
          3150,
          4900,
          96,
          11
        ],
        [
          45,
          800,
          750,
          90,
          475,
          4.8,
          4.8,
          4e3,
          3150,
          2500,
          3150,
          5e3,
          96,
          11
        ],
        [
          46,
          810,
          760,
          100,
          480,
          4.85,
          4.85,
          5e3,
          4e3,
          3150,
          4e3,
          5100,
          96,
          12
        ],
        [
          47,
          820,
          770,
          110,
          485,
          4.9,
          4.9,
          5e3,
          4e3,
          3150,
          4e3,
          5200,
          96,
          12
        ],
        [
          48,
          830,
          780,
          120,
          490,
          4.95,
          4.95,
          5e3,
          4e3,
          3150,
          4e3,
          5300,
          108,
          12
        ],
        [
          49,
          840,
          790,
          130,
          495,
          5,
          5,
          5e3,
          4e3,
          3150,
          4e3,
          5400,
          108,
          12
        ],
        [
          50,
          850,
          800,
          140,
          500,
          5.1,
          5.05,
          5e3,
          4e3,
          3150,
          4e3,
          5500,
          108,
          12
        ],
        [
          52,
          860,
          810,
          150,
          505,
          5.2,
          5.1,
          5e3,
          4e3,
          3150,
          4e3,
          5600,
          108,
          12
        ],
        [
          54,
          870,
          820,
          160,
          510,
          5.3,
          5.15,
          5e3,
          4e3,
          3150,
          4e3,
          5700,
          120,
          12
        ],
        [
          56,
          880,
          830,
          170,
          515,
          5.4,
          5.2,
          5e3,
          4e3,
          3150,
          4e3,
          5800,
          120,
          12
        ],
        [
          58,
          890,
          840,
          180,
          520,
          5.5,
          5.25,
          6300,
          5e3,
          4e3,
          5e3,
          5900,
          120,
          13
        ],
        [
          60,
          900,
          850,
          190,
          525,
          5.6,
          5.3,
          6300,
          5e3,
          4e3,
          5e3,
          6e3,
          120,
          13
        ],
        [
          62,
          910,
          860,
          200,
          530,
          5.7,
          5.35,
          6300,
          5e3,
          4e3,
          5e3,
          6100,
          132,
          13
        ],
        [
          64,
          920,
          870,
          210,
          535,
          5.8,
          5.4,
          6300,
          5e3,
          4e3,
          5e3,
          6200,
          132,
          13
        ],
        [
          66,
          930,
          880,
          220,
          540,
          5.9,
          5.45,
          6300,
          5e3,
          4e3,
          5e3,
          6300,
          132,
          13
        ],
        [
          68,
          940,
          890,
          230,
          545,
          6,
          5.5,
          6300,
          5e3,
          4e3,
          5e3,
          6400,
          132,
          13
        ],
        [
          70,
          950,
          900,
          240,
          550,
          6.1,
          5.55,
          6300,
          5e3,
          4e3,
          5e3,
          6500,
          144,
          13
        ],
        [
          72,
          960,
          910,
          250,
          555,
          6.2,
          5.6,
          6300,
          5e3,
          4e3,
          5e3,
          6600,
          144,
          13
        ],
        [
          74,
          970,
          920,
          260,
          560,
          6.3,
          5.65,
          8e3,
          6300,
          5e3,
          6300,
          6700,
          144,
          14
        ],
        [
          76,
          980,
          930,
          270,
          565,
          6.4,
          5.7,
          8e3,
          6300,
          5e3,
          6300,
          6800,
          144,
          14
        ],
        [
          78,
          990,
          940,
          280,
          570,
          6.5,
          5.75,
          8e3,
          6300,
          5e3,
          6300,
          6900,
          156,
          14
        ],
        [
          80,
          1e3,
          950,
          290,
          575,
          6.6,
          5.8,
          8e3,
          6300,
          5e3,
          6300,
          7e3,
          156,
          14
        ],
        [
          82,
          1e3,
          960,
          300,
          580,
          6.7,
          5.85,
          8e3,
          6300,
          5e3,
          6300,
          7100,
          156,
          14
        ],
        [
          84,
          1e3,
          970,
          320,
          585,
          6.8,
          5.9,
          8e3,
          6300,
          5e3,
          6300,
          7200,
          156,
          14
        ],
        [
          86,
          1e3,
          980,
          340,
          590,
          6.9,
          5.95,
          8e3,
          6300,
          5e3,
          6300,
          7300,
          168,
          14
        ],
        [
          88,
          1e3,
          990,
          360,
          595,
          7,
          6,
          8e3,
          6300,
          5e3,
          6300,
          7400,
          168,
          14
        ],
        [
          90,
          1e3,
          1e3,
          380,
          600,
          7.5,
          6.05,
          13500,
          8e3,
          6300,
          13500,
          7500,
          168,
          15
        ],
        [
          92,
          1e3,
          1e3,
          400,
          605,
          8,
          6.1,
          13500,
          8e3,
          6300,
          13500,
          7600,
          168,
          15
        ],
        [
          94,
          1e3,
          1e3,
          420,
          610,
          8.5,
          6.15,
          13500,
          8e3,
          6300,
          13500,
          7700,
          -180,
          15
        ],
        [
          96,
          1e3,
          1e3,
          440,
          615,
          9,
          6.2,
          13500,
          8e3,
          6300,
          13500,
          7800,
          -180,
          15
        ],
        [
          98,
          1e3,
          1e3,
          460,
          620,
          9.5,
          6.25,
          13500,
          8e3,
          6300,
          13500,
          7900,
          -180,
          15
        ],
        [
          100,
          1e3,
          1e3,
          480,
          625,
          10,
          6.3,
          13500,
          8e3,
          6300,
          13500,
          8e3,
          -180,
          15
        ],
        [
          100,
          1e3,
          1e3,
          500,
          630,
          10,
          6.35,
          13500,
          8e3,
          6300,
          13500,
          8e3,
          -180,
          15
        ],
        [
          100,
          1e3,
          1e3,
          500,
          635,
          10,
          6.4,
          13500,
          8e3,
          6300,
          13500,
          8e3,
          -180,
          15
        ]
      ];
      static preDelayTime(value) {
        return this.data[value][0];
      }
      static delayTime1(value) {
        return this.data[value][1];
      }
      static delayTime2(value) {
        return this.data[value][2];
      }
      static delayTime3(value) {
        return this.data[value][3];
      }
      static delayTime4(value) {
        return this.data[value][4];
      }
      static rate1(value) {
        return this.data[value][5];
      }
      static rate2(value) {
        return this.data[value][6];
      }
      static hfDamp(value) {
        return this.data[value][7];
      }
      static cutoffFreq(value) {
        return this.data[value][8];
      }
      static eqFreq(value) {
        return this.data[value][9];
      }
      static lpf(value) {
        return this.data[value][10];
      }
      static manual(value) {
        return this.data[value][11];
      }
      static azimuth(value) {
        return this.data[value][12];
      }
      static accl(value) {
        return this.data[value][13];
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/effects/insertion/utils.ts
    const HALF_PI = Math.PI / 2;
    const MIN_PAN = -64;
    const MAX_PAN = 63;
    const PAN_RESOLUTION = MAX_PAN - MIN_PAN;
    const panTableLeft = new Float32Array(PAN_RESOLUTION + 1);
    const panTableRight = new Float32Array(PAN_RESOLUTION + 1);
    for (let pan = MIN_PAN; pan <= MAX_PAN; pan++) {
      const realPan = (pan - MIN_PAN) / PAN_RESOLUTION;
      const tableIndex = pan - MIN_PAN;
      panTableLeft[tableIndex] = Math.cos(HALF_PI * realPan);
      panTableRight[tableIndex] = Math.sin(HALF_PI * realPan);
    }
    function zeroState(h) {
      h.x1 = h.x2 = h.y1 = h.y2 = 0;
    }
    const zeroCoeffs = {
      b0: 1,
      b1: 0,
      b2: 0,
      a0: 1,
      a1: 0,
      a2: 0
    };
    function applyShelves(x, lowC, highC, lowS, highS) {
      const l = lowC.b0 * x + lowC.b1 * lowS.x1 + lowC.b2 * lowS.x2 - lowC.a1 * lowS.y1 - lowC.a2 * lowS.y2;
      lowS.x2 = lowS.x1;
      lowS.x1 = x;
      lowS.y2 = lowS.y1;
      lowS.y1 = l;
      const h = highC.b0 * l + highC.b1 * highS.x1 + highC.b2 * highS.x2 - highC.a1 * highS.y1 - highC.a2 * highS.y2;
      highS.x2 = highS.x1;
      highS.x1 = l;
      highS.y2 = highS.y1;
      highS.y1 = h;
      return h;
    }
    function processBiquad(x, coeffs, state) {
      const y = coeffs.b0 * x + coeffs.b1 * state.x1 + coeffs.b2 * state.x2 - coeffs.a1 * state.y1 - coeffs.a2 * state.y2;
      state.x2 = state.x1;
      state.x1 = x;
      state.y2 = state.y1;
      state.y1 = y;
      return y;
    }
    /**
    * Robert Bristow-Johnson cookbook formulas
    * (https://webaudio.github.io/Audio-EQ-Cookbook/audio-eq-cookbook.html)
    *
    * S - a "shelf slope" parameter (for shelving EQ only).
    * When S = 1, the shelf slope is as steep as it can be and remain monotonically increasing or decreasing gain with frequency.
    * The shelf slope, in dB/octave,
    * remains proportional to S for all other values for a fixed  f0/Fs and dB gain.
    */
    function computeShelfCoeffs(coeffs, dbGain, f0, fs, isLow) {
      const A = Math.pow(10, dbGain / 40);
      const w0 = 2 * Math.PI * f0 / fs;
      const cosw0 = Math.cos(w0);
      const alpha = Math.sin(w0) / 2 * Math.sqrt((A + 1 / A) * (1 / 1 - 1) + 2);
      let b0, b1, b2, a0, a1, a2;
      if (isLow) {
        b0 = A * (A + 1 - (A - 1) * cosw0 + 2 * Math.sqrt(A) * alpha);
        b1 = 2 * A * (A - 1 - (A + 1) * cosw0);
        b2 = A * (A + 1 - (A - 1) * cosw0 - 2 * Math.sqrt(A) * alpha);
        a0 = A + 1 + (A - 1) * cosw0 + 2 * Math.sqrt(A) * alpha;
        a1 = -2 * (A - 1 + (A + 1) * cosw0);
        a2 = A + 1 + (A - 1) * cosw0 - 2 * Math.sqrt(A) * alpha;
      } else {
        b0 = A * (A + 1 + (A - 1) * cosw0 + 2 * Math.sqrt(A) * alpha);
        b1 = -2 * A * (A - 1 + (A + 1) * cosw0);
        b2 = A * (A + 1 + (A - 1) * cosw0 - 2 * Math.sqrt(A) * alpha);
        a0 = A + 1 - (A - 1) * cosw0 + 2 * Math.sqrt(A) * alpha;
        a1 = 2 * (A - 1 - (A + 1) * cosw0);
        a2 = A + 1 - (A - 1) * cosw0 - 2 * Math.sqrt(A) * alpha;
      }
      coeffs.b0 = b0 / a0;
      coeffs.b1 = b1 / a0;
      coeffs.b2 = b2 / a0;
      coeffs.a0 = 1;
      coeffs.a1 = a1 / a0;
      coeffs.a2 = a2 / a0;
    }
    const zeroStateC = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0
    };
    //#endregion
    //#region src/synthesizer/audio_engine/effects/insertion/stereo_eq.ts
    /**
    * Stereo-EQ
    * This is a four-band stereo equalizer (low, mid x 2, high).
    * Type: Stereo
    */
    var StereoEQFX = class {
      type = 256;
      sendLevelToReverb = 0;
      sendLevelToChorus = 0;
      sendLevelToDelay = 0;
      sampleRate;
      level = 1;
      /**
      * Selects the frequency of the low range (200 Hz/400 Hz).
      * @private
      */
      lowFreq = 400;
      /**
      * Adjusts the gain of the low frequency.
      * [-12;12]
      * @private
      */
      lowGain = 5;
      /**
      * Selects the frequency of the high range (4kHz/8kHz).
      * @private
      */
      hiFreq = 8e3;
      /**
      * Adjusts the gain of the high frequency.
      * [-12;12]
      * @private
      */
      hiGain = -12;
      /**
      * Adjusts the frequency of Mid 1 (mid range1).
      * [200;6300]
      * @private
      */
      m1Freq = 1600;
      /**
      * This parameter adjusts the width of the area around the M1
      * Freq parameter that will be affected by the Gain setting.
      * Higher values of Q will result in a narrower area being
      * affected.
      * 0.5/1.0/2.0/4.0/9.0
      * @private
      */
      m1Q = .5;
      /**
      * Adjusts the gain for the area specified by the M1 Freq
      * parameter and M1 Q parameter settings.
      * [-12;12]
      * @private
      */
      m1Gain = 8;
      /**
      * Adjusts the frequency of Mid 2 (mid range2).
      * [200;6300]
      * @private
      */
      m2Freq = 1e3;
      /**
      * This parameter adjusts the width of the area around the M2
      * Freq parameter that will be affected by the Gain setting.
      * Higher values of Q will result in a narrower area being
      * affected.
      * 0.5/1.0/2.0/4.0/9.0
      * @private
      */
      m2Q = .5;
      /**
      * Adjusts the gain for the area specified by the M2 Freq
      * parameter and M2 Q parameter settings.
      * [-12;12]
      * @private
      */
      m2Gain = -8;
      lowCoeffs = { ...zeroCoeffs };
      m1Coeffs = { ...zeroCoeffs };
      m2Coeffs = { ...zeroCoeffs };
      hiCoeffs = { ...zeroCoeffs };
      lowStateL = { ...zeroStateC };
      lowStateR = { ...zeroStateC };
      m1StateL = { ...zeroStateC };
      m1StateR = { ...zeroStateC };
      m2StateL = { ...zeroStateC };
      m2StateR = { ...zeroStateC };
      hiStateL = { ...zeroStateC };
      hiStateR = { ...zeroStateC };
      constructor(sampleRate) {
        this.sampleRate = sampleRate;
        this.reset();
        this.updateCoefficients();
      }
      reset() {
        this.level = 1;
        this.lowFreq = 400;
        this.lowGain = 5;
        this.hiGain = -12;
        this.hiFreq = 8e3;
        this.m1Freq = 1600;
        this.m1Q = .5;
        this.m1Gain = 8;
        this.m2Freq = 1e3;
        this.m2Q = .5;
        this.m2Gain = -8;
        zeroState(this.lowStateL);
        zeroState(this.lowStateR);
        zeroState(this.m1StateL);
        zeroState(this.m1StateR);
        zeroState(this.m2StateL);
        zeroState(this.m2StateR);
        zeroState(this.hiStateL);
        zeroState(this.hiStateR);
        this.updateCoefficients();
      }
      setParameter(parameter, value) {
        switch (parameter) {
          default: break;
          case 3:
            this.lowFreq = value === 1 ? 400 : 200;
            break;
          case 4:
            this.lowGain = value - 64;
            break;
          case 5:
            this.hiFreq = value === 1 ? 8e3 : 4e3;
            break;
          case 6:
            this.hiGain = value - 64;
            break;
          case 7:
            this.m1Freq = InsertionValueConverter.eqFreq(value);
            break;
          case 8:
            this.m1Q = [
              .5,
              1,
              2,
              4,
              9
            ][value] || 1;
            break;
          case 9:
            this.m1Gain = value - 64;
            break;
          case 10:
            this.m2Freq = InsertionValueConverter.eqFreq(value);
            break;
          case 11:
            this.m2Q = [
              .5,
              1,
              2,
              4,
              9
            ][value] || 1;
            break;
          case 12:
            this.m2Gain = value - 64;
            break;
          case 22:
            this.level = value / 127;
            break;
        }
        this.updateCoefficients();
      }
      process(inputLeft, inputRight, outputLeft, outputRight, outputReverb, outputChorus, outputDelay, startIndex, sampleCount) {
        const { level, sendLevelToChorus, sendLevelToDelay, sendLevelToReverb, lowCoeffs, lowStateL, lowStateR, m1Coeffs, m1StateL, m1StateR, m2StateL, m2StateR, m2Coeffs, hiCoeffs, hiStateL, hiStateR } = this;
        for (let i = 0; i < sampleCount; i++) {
          let sL = inputLeft[i];
          let sR = inputRight[i];
          sL = processBiquad(sL, lowCoeffs, lowStateL);
          sR = processBiquad(sR, lowCoeffs, lowStateR);
          sL = processBiquad(sL, m1Coeffs, m1StateL);
          sR = processBiquad(sR, m1Coeffs, m1StateR);
          sL = processBiquad(sL, m2Coeffs, m2StateL);
          sR = processBiquad(sR, m2Coeffs, m2StateR);
          sL = processBiquad(sL, hiCoeffs, hiStateL);
          sR = processBiquad(sR, hiCoeffs, hiStateR);
          const idx = startIndex + i;
          outputLeft[idx] += sL * level;
          outputRight[idx] += sR * level;
          const mono = .5 * (sL + sR);
          outputReverb[i] += mono * sendLevelToReverb;
          outputChorus[i] += mono * sendLevelToChorus;
          outputDelay[i] += mono * sendLevelToDelay;
        }
      }
      updateCoefficients() {
        computeLowShelfCoeffs(this.lowCoeffs, this.lowFreq, this.lowGain / 2, this.sampleRate);
        computePeakingEQCoeffs(this.m1Coeffs, this.m1Freq, this.m1Gain, this.m1Q, this.sampleRate);
        computePeakingEQCoeffs(this.m2Coeffs, this.m2Freq, this.m2Gain, this.m2Q, this.sampleRate);
        computeHighShelfCoeffs(this.hiCoeffs, this.hiFreq, this.hiGain / 2, this.sampleRate);
      }
    };
    /**
    * Robert Bristow-Johnson cookbook formulas
    * (https://webaudio.github.io/Audio-EQ-Cookbook/audio-eq-cookbook.html)
    *
    * S - a "shelf slope" parameter (for shelving EQ only).
    * When S = 1, the shelf slope is as steep as it can be and remain monotonically increasing or decreasing gain with frequency.
    * The shelf slope, in dB/octave,
    * remains proportional to S for all other values for a fixed  f0/Fs and dB gain.
    */
    const SHELF_SLOPE = 1;
    function computePeakingEQCoeffs(coeffs, freq, gainDB, Q, sampleRate) {
      const A = Math.pow(10, gainDB / 40);
      const w0 = 2 * Math.PI * freq / sampleRate;
      const cosw0 = Math.cos(w0);
      const alpha = Math.sin(w0) / (2 * Q);
      const b0 = 1 + alpha * A;
      const b1 = -2 * cosw0;
      const b2 = 1 - alpha * A;
      const a0 = 1 + alpha / A;
      const a1 = -2 * cosw0;
      const a2 = 1 - alpha / A;
      coeffs.a0 = 1;
      coeffs.a1 = a1 / a0;
      coeffs.a2 = a2 / a0;
      coeffs.b0 = b0 / a0;
      coeffs.b1 = b1 / a0;
      coeffs.b2 = b2 / a0;
    }
    function computeLowShelfCoeffs(coeffs, freq, gainDB, sampleRate) {
      const A = Math.pow(10, gainDB / 40);
      const w0 = 2 * Math.PI * freq / sampleRate;
      const cosw0 = Math.cos(w0);
      const alpha = Math.sin(w0) / 2 * Math.sqrt((A + 1 / A) * (1 / SHELF_SLOPE - 1) + 2);
      const b0 = A * (A + 1 - (A - 1) * cosw0 + 2 * Math.sqrt(A) * alpha);
      const b1 = 2 * A * (A - 1 - (A + 1) * cosw0);
      const b2 = A * (A + 1 - (A - 1) * cosw0 - 2 * Math.sqrt(A) * alpha);
      const a0 = A + 1 + (A - 1) * cosw0 + 2 * Math.sqrt(A) * alpha;
      const a1 = -2 * (A - 1 + (A + 1) * cosw0);
      const a2 = A + 1 + (A - 1) * cosw0 - 2 * Math.sqrt(A) * alpha;
      coeffs.a0 = 1;
      coeffs.a1 = a1 / a0;
      coeffs.a2 = a2 / a0;
      coeffs.b0 = b0 / a0;
      coeffs.b1 = b1 / a0;
      coeffs.b2 = b2 / a0;
    }
    function computeHighShelfCoeffs(coeffs, freq, gainDB, sampleRate) {
      const A = Math.pow(10, gainDB / 40);
      const w0 = 2 * Math.PI * freq / sampleRate;
      const cosw0 = Math.cos(w0);
      const alpha = Math.sin(w0) / 2 * Math.sqrt((A + 1 / A) * (1 / SHELF_SLOPE - 1) + 2);
      const b0 = A * (A + 1 + (A - 1) * cosw0 + 2 * Math.sqrt(A) * alpha);
      const b1 = -2 * A * (A - 1 + (A + 1) * cosw0);
      const b2 = A * (A + 1 + (A - 1) * cosw0 - 2 * Math.sqrt(A) * alpha);
      const a0 = A + 1 - (A - 1) * cosw0 + 2 * Math.sqrt(A) * alpha;
      const a1 = 2 * (A - 1 - (A + 1) * cosw0);
      const a2 = A + 1 - (A - 1) * cosw0 - 2 * Math.sqrt(A) * alpha;
      coeffs.a0 = 1;
      coeffs.a1 = a1 / a0;
      coeffs.a2 = a2 / a0;
      coeffs.b0 = b0 / a0;
      coeffs.b1 = b1 / a0;
      coeffs.b2 = b2 / a0;
    }
    //#endregion
    //#region src/synthesizer/audio_engine/effects/insertion/phaser.ts
    const ALL_PASS_STAGES = 8;
    const DEPTH_DIV = 128;
    const MANUAL_MULTIPLIER = 4;
    const MANUAL_OFFSET = 600;
    const FEEDBACK = .9;
    const PHASE_START = .35;
    /**
    * A phaser adds a phase-shifted sound to the original sound,
    * producing a twisting modulation that creates spaciousness
    * and depth.
    * Type: Stereo
    *
    * Note: seems to use a triangle LFO for modulation
    */
    var PhaserFX = class {
      sendLevelToReverb = 40 / 127;
      sendLevelToChorus = 0;
      sendLevelToDelay = 0;
      type = 288;
      /**
      * Adjusts the basic frequency from which the sound will be
      * modulated.
      * [100;8000]
      * @private
      */
      manual = 620;
      /**
      * Adjusts the frequency (period) of modulation.
      * @private
      * [0.05;10.0]
      */
      rate = .85;
      /**
      * Adjusts the depth of modulation.
      * [0;1]
      * @private
      */
      depth = 64 / DEPTH_DIV;
      /**
      * Adjusts the amount of emphasis added to the frequency
      * range surrounding the basic frequency determined by the
      * Manual parameter setting.
      * [0;1]
      * @private
      */
      reso = 16 / 127;
      /**
      * Adjusts the proportion by which the phase-shifted sound is
      * combined with the direct sound.
      * [0;1]
      * @private
      */
      mix = 1;
      /**
      * Adjusts the gain of the low frequency range. (200Hz)
      * [-12;12]
      * @private
      */
      lowGain = 0;
      /**
      * Adjusts the gain of the high frequency range. (4kHz)
      * [-12;12]
      * @private
      */
      hiGain = 0;
      prevInL;
      prevOutL;
      prevInR;
      prevOutR;
      lowShelfCoef = { ...zeroCoeffs };
      highShelfCoef = { ...zeroCoeffs };
      manualOffset = MANUAL_OFFSET;
      lowShelfStateL = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      };
      lowShelfStateR = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      };
      highShelfStateL = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      };
      highShelfStateR = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      };
      prevL = 0;
      prevR = 0;
      /**
      * Adjusts the output level.
      * [0;1]
      * @private
      */
      level = 104 / 127;
      phase = PHASE_START;
      sampleRate;
      constructor(sampleRate) {
        this.sampleRate = sampleRate;
        this.prevInL = new Float32Array(ALL_PASS_STAGES);
        this.prevOutL = new Float32Array(ALL_PASS_STAGES);
        this.prevInR = new Float32Array(ALL_PASS_STAGES);
        this.prevOutR = new Float32Array(ALL_PASS_STAGES);
        this.reset();
      }
      reset() {
        this.phase = PHASE_START;
        this.setManual(620);
        this.rate = .85;
        this.depth = 64 / DEPTH_DIV;
        this.reso = 16 / 127;
        this.mix = 1;
        this.lowGain = 0;
        this.hiGain = 0;
        this.level = 104 / 127;
        zeroState(this.highShelfStateL);
        zeroState(this.highShelfStateR);
        zeroState(this.lowShelfStateL);
        zeroState(this.lowShelfStateR);
        this.updateShelves();
        this.clearAllPass();
      }
      process(inputLeft, inputRight, outputLeft, outputRight, outputReverb, outputChorus, outputDelay, startIndex, sampleCount) {
        const { sendLevelToReverb, sendLevelToChorus, sendLevelToDelay, level, manual, manualOffset, mix, lowShelfCoef, lowShelfStateR, lowShelfStateL, highShelfCoef, highShelfStateL, highShelfStateR, prevInL, prevInR, prevOutL, prevOutR, sampleRate, depth } = this;
        let { prevL, prevR, phase } = this;
        const rateInc = this.rate / this.sampleRate;
        const fb = this.reso * FEEDBACK;
        for (let i = 0; i < sampleCount; i++) {
          const sL = applyShelves(inputLeft[i], lowShelfCoef, highShelfCoef, lowShelfStateL, highShelfStateL);
          const sR = applyShelves(inputRight[i], lowShelfCoef, highShelfCoef, lowShelfStateR, highShelfStateR);
          const lfo = 2 * Math.abs(phase - .5);
          if ((phase += rateInc) >= 1) phase -= 1;
          const fc = manualOffset + manual * (1 - depth * lfo);
          const tanTerm = Math.tan(Math.PI * fc / sampleRate);
          const a = Math.max(-.9999, Math.min(.9999, (1 - tanTerm) / (1 + tanTerm)));
          let apL = sL + fb * prevL;
          let apR = sR + fb * prevR;
          for (let stage = 0; stage < ALL_PASS_STAGES; stage++) {
            const outL = -a * apL + prevInL[stage] + a * prevOutL[stage];
            prevInL[stage] = apL;
            prevOutL[stage] = outL;
            apL = outL;
            const outR = -a * apR + prevInR[stage] + a * prevOutR[stage];
            prevInR[stage] = apR;
            prevOutR[stage] = outR;
            apR = outR;
          }
          prevL = apL;
          prevR = apR;
          const outL = (sL + apL * mix) * level;
          const outR = (sR + apR * mix) * level;
          const idx = startIndex + i;
          outputLeft[idx] += outL;
          outputRight[idx] += outR;
          const mono = (outL + outR) * .5;
          outputReverb[i] += mono * sendLevelToReverb;
          outputChorus[i] += mono * sendLevelToChorus;
          outputDelay[i] += mono * sendLevelToDelay;
        }
        this.phase = phase;
        this.prevL = prevL;
        this.prevR = prevR;
      }
      setParameter(parameter, value) {
        switch (parameter) {
          default: break;
          case 3:
            this.setManual(InsertionValueConverter.manual(value));
            break;
          case 4:
            this.rate = InsertionValueConverter.rate1(value);
            break;
          case 5:
            this.depth = value / DEPTH_DIV;
            break;
          case 6:
            this.reso = value / 127;
            break;
          case 7:
            this.mix = value / 127;
            break;
          case 19:
            this.lowGain = value - 64;
            break;
          case 20:
            this.hiGain = value - 64;
            break;
          case 22:
            this.level = value / 127;
            break;
        }
        this.updateShelves();
      }
      setManual(manualIn) {
        if (manualIn > 1e3) {
          this.manualOffset = MANUAL_OFFSET * 1.5 * MANUAL_MULTIPLIER;
          this.manual = manualIn;
        } else {
          this.manualOffset = MANUAL_OFFSET;
          this.manual = manualIn * MANUAL_MULTIPLIER;
        }
      }
      clearAllPass() {
        this.prevR = 0;
        this.prevL = 0;
        for (let i = 0; i < ALL_PASS_STAGES; i++) {
          this.prevInL[i] = 0;
          this.prevOutL[i] = 0;
          this.prevInR[i] = 0;
          this.prevOutR[i] = 0;
        }
      }
      updateShelves() {
        computeShelfCoeffs(this.lowShelfCoef, this.lowGain, 200, this.sampleRate, true);
        computeShelfCoeffs(this.highShelfCoef, this.hiGain, 4e3, this.sampleRate, false);
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/effects/insertion/auto_pan.ts
    const PI_2$1 = Math.PI * 2;
    const GAIN_LVL = .935;
    const LEVEL_EXP = 2;
    const PAN_SMOOTHING = .01;
    const DEFAULT_LEVEL$3 = 127;
    var AutoPanFX = class {
      sendLevelToReverb = 40 / 127;
      sendLevelToChorus = 0;
      sendLevelToDelay = 0;
      type = 294;
      /**
      * Selects the type of modulation.
      * Tri:
      *  The sound will be modulated like a triangle
      * wave.
      * Sqr:
      *  The sound will be modulated like a square
      * wave.
      * Sin:
      *  The sound will be modulated like a sine
      * wave.
      * Saw1,2: The sound will be modulated like a
      * sawtooth wave. The teeth in Saw1 and
      * Saw2 point at opposite direction.
      *
      * [Tri/Sqr/Sin/Saw1/Saw2 -> 00/01/02/03/04]
      * @private
      */
      modWave = 1;
      /**
      * Adjusts the frequency of modulation.
      * [Rate1 conversion]
      * @private
      */
      modRate = 3.05;
      /**
      * Adjusts the depth of modulation.
      * [0;127]
      * @private
      */
      modDepth = 96;
      /**
      * Adjusts the gain of the low frequency range. (200Hz)
      * [-12;12]
      * @private
      */
      lowGain = 0;
      /**
      * Adjusts the gain of the high frequency range. (4kHz)
      * [-12;12]
      * @private
      */
      hiGain = 0;
      /**
      * Adjusts the output level.
      * [0;1]
      * @private
      */
      level = DEFAULT_LEVEL$3 / 127;
      currentPan = 0;
      phase = 0;
      lsCoeffs = { ...zeroCoeffs };
      hsCoeffs = { ...zeroCoeffs };
      lsStateR = { ...zeroStateC };
      lsStateL = { ...zeroStateC };
      hsStateR = { ...zeroStateC };
      hsStateL = { ...zeroStateC };
      sampleRate;
      constructor(sampleRate) {
        this.sampleRate = sampleRate;
        this.reset();
      }
      reset() {
        this.modWave = 1;
        this.modRate = 3.05;
        this.modDepth = 96;
        this.lowGain = 0;
        this.hiGain = 0;
        this.level = DEFAULT_LEVEL$3 / 127;
        this.currentPan = 0;
        this.phase = 0;
        zeroState(this.hsStateR);
        zeroState(this.hsStateL);
        zeroState(this.lsStateR);
        zeroState(this.lsStateL);
        this.updateShelves();
      }
      process(inputLeft, inputRight, outputLeft, outputRight, outputReverb, outputChorus, outputDelay, startIndex, sampleCount) {
        const { sendLevelToReverb, sendLevelToChorus, sendLevelToDelay, level, lsCoeffs, lsStateL, lsStateR, hsCoeffs, hsStateR, hsStateL, modWave } = this;
        const depth = Math.pow(this.modDepth / 127, LEVEL_EXP);
        const scale = 2 / (1 + depth) * GAIN_LVL;
        const rateInc = this.modRate / this.sampleRate;
        let { phase, currentPan } = this;
        for (let i = 0; i < sampleCount; i++) {
          const sL = applyShelves(inputLeft[i], lsCoeffs, hsCoeffs, lsStateL, hsStateL);
          const sR = applyShelves(inputRight[i], lsCoeffs, hsCoeffs, lsStateR, hsStateR);
          let lfo;
          switch (modWave) {
            default:
              lfo = 1 - 4 * Math.abs(phase - .5);
              break;
            case 1:
              lfo = phase > .5 ? -1 : -Math.cos((phase - .75) * PI_2$1);
              break;
            case 2:
              lfo = Math.sin(PI_2$1 * phase);
              break;
            case 3:
              lfo = 1 - 2 * phase;
              break;
            case 4:
              lfo = 2 * phase - 1;
              break;
          }
          if ((phase += rateInc) >= 1) phase -= 1;
          currentPan += (lfo - currentPan) * PAN_SMOOTHING;
          const pan = currentPan * depth;
          const gainL = (1 - pan) * .5 * scale;
          const gainR = (1 + pan) * .5 * scale;
          const outL = sL * level * gainL;
          const outR = sR * level * gainR;
          const idx = startIndex + i;
          outputLeft[idx] += outL;
          outputRight[idx] += outR;
          const mono = (outL + outR) * .5;
          outputReverb[i] += mono * sendLevelToReverb;
          outputChorus[i] += mono * sendLevelToChorus;
          outputDelay[i] += mono * sendLevelToDelay;
        }
        this.currentPan = currentPan;
        this.phase = phase;
      }
      setParameter(parameter, value) {
        switch (parameter) {
          default: break;
          case 3:
            this.modWave = value;
            break;
          case 4:
            this.modRate = InsertionValueConverter.rate1(value);
            break;
          case 5:
            this.modDepth = value;
            break;
          case 19:
            this.lowGain = value - 64;
            break;
          case 20:
            this.hiGain = value - 64;
            break;
          case 22:
            this.level = value / 127;
            break;
        }
        this.updateShelves();
      }
      updateShelves() {
        computeShelfCoeffs(this.lsCoeffs, this.lowGain, 200, this.sampleRate, true);
        computeShelfCoeffs(this.hsCoeffs, this.hiGain, 4e3, this.sampleRate, false);
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/effects/insertion/auto_wah.ts
    const DEFAULT_LEVEL$2 = 96;
    const attackTime = .1;
    const releaseTime = .1;
    const SENS_COEFF = 27;
    const PEAK_DB = 28;
    const HPF_Q = -28;
    const HPF_FC = 400;
    const MANUAL_SCALE = .62;
    const FC_SMOOTH = .005;
    const DEPTH_MUL = 5;
    const LFO_SMOOTH_FRAC = DEPTH_MUL * .5;
    var AutoWahFX = class {
      sendLevelToReverb = 40 / 127;
      sendLevelToChorus = 0;
      sendLevelToDelay = 0;
      type = 289;
      /**
      * Selects the type of filter.
      * LPF: The wah effect will be applied over a wide
      * frequency range.
      * BPF: The wah effect will be applied over a narrow
      * frequency range.
      * 0 - LPF
      * 1 - BPF
      * @private
      */
      filType = 1;
      /**
      * Adjusts the sensitivity with which the filter is controlled. If
      * this value is increased, the filter frequency will change more
      * readily in response to the input level.
      * [0;127]
      * @private
      */
      sens = 0;
      /**
      * Adjusts the center frequency from which the effect is
      * applied.
      *
      * Note: Doesn't use "Manual" conversion??
      * [0;127] (assuming manual though, seems to use a part of the curve)
      * @private
      */
      manual = 68;
      /**
      * Adjusts the amount of the wah effect that will occur in the
      * area of the center frequency. Lower settings will cause the
      * effect to be applied in a broad area around the center
      * frequency. Higher settings will cause the effect to be
      * applied in a more narrow range. In the case of LPF,
      * decreasing the value will cause the wah effect to change
      * less.
      * [0;127]
      * @private
      */
      peak = 62;
      /**
      * Adjusts the speed of the modulation.
      * [Rate1 conversion]
      * @private
      */
      rate = 2.05;
      /**
      * Adjusts the depth of the modulation.
      * [0;127]
      * @private
      */
      depth = 72;
      /**
      * Sets the direction in which the frequency will change when
      * the filter is modulated. With a setting of Up, the filter will
      * change toward a higher frequency. With a setting of Down
      * it will change toward a lower frequency.
      * 0 - down
      * 1 - up
      * @private
      */
      polarity = 1;
      /**
      * Adjusts the stereo location of the output sound. L63 is far
      * left, 0 is center, and R63 is far right.
      * [-64;63]
      * @private
      */
      pan = 0;
      /**
      * Adjusts the gain of the low frequency range. (200Hz)
      * [-12;12]
      * @private
      */
      lowGain = 0;
      /**
      * Adjusts the gain of the high frequency range. (4kHz)
      * [-12;12]
      * @private
      */
      hiGain = 0;
      /**
      * Adjusts the output level.
      * [0;1]
      * @private
      */
      level = DEFAULT_LEVEL$2 / 127;
      coeffs = { ...zeroCoeffs };
      state = { ...zeroStateC };
      hpCoeffs = { ...zeroCoeffs };
      hpState = { ...zeroStateC };
      phase = 0;
      lsCoeffs = { ...zeroCoeffs };
      hsCoeffs = { ...zeroCoeffs };
      lsState = { ...zeroStateC };
      hsState = { ...zeroStateC };
      sampleRate;
      lastFc = this.manual;
      attackCoeff;
      releaseCoeff;
      envelope = 0;
      constructor(sampleRate) {
        this.sampleRate = sampleRate;
        this.attackCoeff = Math.exp(-1 / (attackTime * sampleRate));
        this.releaseCoeff = Math.exp(-1 / (releaseTime * sampleRate));
        this.reset();
      }
      reset() {
        this.filType = 1;
        this.sens = 0;
        this.setManual(68);
        this.peak = 62;
        this.rate = 2.05;
        this.depth = 72;
        this.polarity = 1;
        this.lowGain = 0;
        this.hiGain = 0;
        this.pan = 0;
        this.level = DEFAULT_LEVEL$2 / 127;
        this.phase = .2;
        this.lastFc = this.manual;
        zeroState(this.hsState);
        zeroState(this.lsState);
        zeroState(this.state);
        zeroState(this.hpState);
        this.updateShelves();
      }
      process(inputLeft, inputRight, outputLeft, outputRight, outputReverb, outputChorus, outputDelay, startIndex, sampleCount) {
        const { sendLevelToReverb, sendLevelToChorus, sendLevelToDelay, level, lsCoeffs, lsState, hsCoeffs, hsState, coeffs, state, sampleRate, filType, manual, pan, attackCoeff, releaseCoeff, hpState, hpCoeffs } = this;
        let { phase, lastFc, envelope } = this;
        const rateInc = this.rate / this.sampleRate;
        const peak = Math.pow(10, this.peak / 127 * PEAK_DB / 20);
        const hpfPeak = Math.pow(10, this.peak / 127 * HPF_Q / 20);
        const pol = this.polarity === 0 ? -1 : DEPTH_MUL;
        const depth = this.depth / 127 * pol;
        const sens = this.sens / 127;
        const index = pan + 64 | 0;
        const gainL = panTableLeft[index];
        const gainR = panTableRight[index];
        for (let i = 0; i < sampleCount; i++) {
          const s = applyShelves((inputLeft[i] + inputRight[i]) * .5, lsCoeffs, hsCoeffs, lsState, hsState);
          const rectified = Math.abs(s);
          envelope = rectified > envelope ? attackCoeff * envelope + (1 - attackCoeff) * rectified : releaseCoeff * envelope + (1 - releaseCoeff) * rectified;
          const lfo = 2 * Math.abs(phase - .5) * depth;
          if ((phase += rateInc) >= 1) phase -= 1;
          const lfoMul = lfo >= LFO_SMOOTH_FRAC || pol < 0 ? 1 : Math.sin(lfo * Math.PI / (2 * LFO_SMOOTH_FRAC));
          const base = manual * (1 + sens * envelope * SENS_COEFF);
          const fc = Math.max(20, base * (1 + lfoMul * lfo));
          lastFc += (Math.max(10, fc) - lastFc) * FC_SMOOTH;
          computeLowpassCoeffs(coeffs, lastFc, peak, sampleRate);
          let processedSample = s;
          if (filType === 1) {
            computeHighpassCoeffs(hpCoeffs, HPF_FC, hpfPeak, sampleRate);
            processedSample = processBiquad(processedSample, hpCoeffs, hpState);
          }
          const mono = processBiquad(processedSample, coeffs, state) * level;
          const outL = mono * gainL;
          const outR = mono * gainR;
          const idx = startIndex + i;
          outputLeft[idx] += outL;
          outputRight[idx] += outR;
          outputReverb[i] += mono * sendLevelToReverb;
          outputChorus[i] += mono * sendLevelToChorus;
          outputDelay[i] += mono * sendLevelToDelay;
        }
        this.phase = phase;
        this.lastFc = lastFc;
        this.envelope = envelope;
      }
      setParameter(parameter, value) {
        switch (parameter) {
          default: break;
          case 3:
            this.filType = value;
            break;
          case 4:
            this.sens = value;
            break;
          case 5:
            this.setManual(value);
            break;
          case 6:
            this.peak = value;
            break;
          case 7:
            this.rate = InsertionValueConverter.rate1(value);
            break;
          case 8:
            this.depth = value;
            break;
          case 9:
            this.polarity = value;
            break;
          case 19:
            this.lowGain = value - 64;
            break;
          case 20:
            this.hiGain = value - 64;
            break;
          case 21:
            this.pan = value - 64;
            break;
          case 22:
            this.level = value / 127;
            break;
        }
        this.updateShelves();
      }
      setManual(value) {
        const target = value * MANUAL_SCALE;
        const floor = InsertionValueConverter.manual(Math.floor(target));
        const ceil = InsertionValueConverter.manual(Math.ceil(target));
        const frac = target - Math.floor(target);
        this.manual = floor + (ceil - floor) * frac;
      }
      updateShelves() {
        computeShelfCoeffs(this.lsCoeffs, this.lowGain, 200, this.sampleRate, true);
        computeShelfCoeffs(this.hsCoeffs, this.hiGain, 4e3, this.sampleRate, false);
      }
    };
    function computeLowpassCoeffs(coeffs, freq, Q, sampleRate) {
      const w0 = 2 * Math.PI * freq / sampleRate;
      const cosw0 = Math.cos(w0);
      const alpha = Math.sin(w0) / (2 * Q);
      const b1 = 1 - cosw0;
      const b0 = b1 / 2;
      const b2 = b0;
      const a0 = 1 + alpha;
      const a1 = -2 * cosw0;
      const a2 = 1 - alpha;
      coeffs.a0 = 1;
      coeffs.a1 = a1 / a0;
      coeffs.a2 = a2 / a0;
      coeffs.b0 = b0 / a0;
      coeffs.b1 = b1 / a0;
      coeffs.b2 = b2 / a0;
    }
    function computeHighpassCoeffs(coeffs, freq, Q, sampleRate) {
      const w0 = 2 * Math.PI * freq / sampleRate;
      const cosw0 = Math.cos(w0);
      const alpha = Math.sin(w0) / (2 * Q);
      const b0 = (1 + cosw0) / 2;
      const b1 = -(1 + cosw0);
      const b2 = b0;
      const a0 = 1 + alpha;
      const a1 = -2 * cosw0;
      const a2 = 1 - alpha;
      coeffs.a0 = 1;
      coeffs.a1 = a1 / a0;
      coeffs.a2 = a2 / a0;
      coeffs.b0 = b0 / a0;
      coeffs.b1 = b1 / a0;
      coeffs.b2 = b2 / a0;
    }
    //#endregion
    //#region src/synthesizer/audio_engine/effects/insertion/ph_auto_wah.ts
    const DEFAULT_LEVEL$1 = 127;
    var PhAutoWahFx = class {
      sendLevelToReverb = 40 / 127;
      sendLevelToChorus = 0;
      sendLevelToDelay = 0;
      type = 4360;
      /**
      * Sets the stereo location of the phaser sound. L63 is far left, 0
      * is center, and R63 is far right.
      * [0;127]
      * @private
      */
      phPan = 0;
      /**
      * Sets the stereo location of the aut-wah sound. L63 is far left, 0
      * is center, and R63 is far right.
      * [0;127]
      * @private
      */
      awPan = 127;
      /**
      * Adjusts the output level.
      * [0;1]
      * @private
      */
      level = DEFAULT_LEVEL$1 / 127;
      phaser;
      autoWah;
      bufferPh;
      bufferAw;
      constructor(sampleRate, maxBufferSize) {
        this.phaser = new PhaserFX(sampleRate);
        this.autoWah = new AutoWahFX(sampleRate);
        this.bufferAw = new Float32Array(maxBufferSize);
        this.bufferPh = new Float32Array(maxBufferSize);
        this.phaser.sendLevelToReverb = 0;
        this.phaser.sendLevelToChorus = 0;
        this.phaser.sendLevelToDelay = 0;
        this.autoWah.sendLevelToReverb = 0;
        this.autoWah.sendLevelToChorus = 0;
        this.autoWah.sendLevelToDelay = 0;
        this.reset();
      }
      reset() {
        this.phPan = 0;
        this.awPan = 127;
        this.level = DEFAULT_LEVEL$1 / 127;
        this.phaser.reset();
        this.autoWah.reset();
        this.phaser.setParameter(22, 127);
        this.autoWah.setParameter(22, 127);
      }
      process(inputLeft, inputRight, outputLeft, outputRight, outputReverb, outputChorus, outputDelay, startIndex, sampleCount) {
        const { sendLevelToReverb, sendLevelToChorus, sendLevelToDelay, level } = this;
        const { bufferPh, bufferAw } = this;
        this.bufferPh.fill(0);
        this.phaser.process(inputLeft, inputLeft, bufferPh, bufferPh, bufferPh, bufferPh, bufferPh, 0, sampleCount);
        this.bufferAw.fill(0);
        this.autoWah.process(inputRight, inputRight, bufferAw, bufferAw, bufferAw, bufferAw, bufferAw, 0, sampleCount);
        const phPan = this.phPan | 0;
        const phL = panTableLeft[phPan];
        const phR = panTableRight[phPan];
        const awPan = this.awPan | 0;
        const awL = panTableLeft[awPan];
        const awR = panTableRight[awPan];
        for (let i = 0; i < sampleCount; i++) {
          const outPhaser = bufferPh[i] * .5 * level;
          const outAutoWah = bufferAw[i] * .5 * level;
          const outL = outPhaser * phL + outAutoWah * awL;
          const outR = outPhaser * phR + outAutoWah * awR;
          const idx = startIndex + i;
          outputLeft[idx] += outL;
          outputRight[idx] += outR;
          const mono = (outL + outR) * .5;
          outputReverb[i] += mono * sendLevelToReverb;
          outputChorus[i] += mono * sendLevelToChorus;
          outputDelay[i] += mono * sendLevelToDelay;
        }
      }
      setParameter(parameter, value) {
        if (parameter >= 3 && parameter <= 7) {
          this.phaser.setParameter(parameter, value);
          return;
        }
        if (parameter >= 8 && parameter <= 14) {
          this.autoWah.setParameter(parameter - 5, value);
          return;
        }
        switch (parameter) {
          default: break;
          case 18:
            this.phPan = value;
            break;
          case 19:
            this.phaser.setParameter(22, value);
            break;
          case 20:
            this.awPan = value;
            break;
          case 21:
            this.autoWah.setParameter(22, value);
            break;
          case 22:
            this.level = value / 127;
            break;
        }
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/effects/insertion/tremolo.ts
    const DEFAULT_LEVEL = 127;
    const PI_2 = Math.PI * 2;
    const GAIN_SMOOTHING = .01;
    var TremoloFX = class {
      sendLevelToReverb = 40 / 127;
      sendLevelToChorus = 0;
      sendLevelToDelay = 0;
      type = 293;
      /**
      * Selects the type of modulation.
      * Tri:
      *  The sound will be modulated like a triangle
      * wave.
      * Sqr:
      *  The sound will be modulated like a square
      * wave.
      * Sin:
      *  The sound will be modulated like a sine
      * wave.
      * Saw1,2: The sound will be modulated like a
      * sawtooth wave. The teeth in Saw1 and
      * Saw2 point at opposite direction.
      *
      * [Tri/Sqr/Sin/Saw1/Saw2 -> 00/01/02/03/04]
      * @private
      */
      modWave = 1;
      /**
      * Adjusts the frequency of modulation.
      * [Rate1 conversion]
      * @private
      */
      modRate = 3.05;
      /**
      * Adjusts the depth of modulation.
      * [0;127]
      * @private
      */
      modDepth = 96;
      /**
      * Adjusts the gain of the low frequency range. (200Hz)
      * [-12;12]
      * @private
      */
      lowGain = 0;
      /**
      * Adjusts the gain of the high frequency range. (4kHz)
      * [-12;12]
      * @private
      */
      hiGain = 0;
      /**
      * Adjusts the output level.
      * [0;1]
      * @private
      */
      level = DEFAULT_LEVEL / 127;
      phase = 0;
      currentGain = 1;
      lsCoeffs = { ...zeroCoeffs };
      hsCoeffs = { ...zeroCoeffs };
      lsStateR = { ...zeroStateC };
      lsStateL = { ...zeroStateC };
      hsStateR = { ...zeroStateC };
      hsStateL = { ...zeroStateC };
      sampleRate;
      constructor(sampleRate) {
        this.sampleRate = sampleRate;
        this.reset();
      }
      reset() {
        this.modWave = 1;
        this.modRate = 3.05;
        this.modDepth = 96;
        this.lowGain = 0;
        this.hiGain = 0;
        this.level = DEFAULT_LEVEL / 127;
        this.phase = 0;
        this.currentGain = 1;
        zeroState(this.hsStateR);
        zeroState(this.hsStateL);
        zeroState(this.lsStateR);
        zeroState(this.lsStateL);
        this.updateShelves();
      }
      process(inputLeft, inputRight, outputLeft, outputRight, outputReverb, outputChorus, outputDelay, startIndex, sampleCount) {
        const { sendLevelToReverb, sendLevelToChorus, sendLevelToDelay, level, lsCoeffs, lsStateL, lsStateR, hsCoeffs, hsStateR, hsStateL, modDepth, modWave } = this;
        const rateInc = this.modRate / this.sampleRate;
        let { currentGain, phase } = this;
        for (let i = 0; i < sampleCount; i++) {
          const sL = applyShelves(inputLeft[i], lsCoeffs, hsCoeffs, lsStateL, hsStateL);
          const sR = applyShelves(inputRight[i], lsCoeffs, hsCoeffs, lsStateR, hsStateR);
          let lfo;
          switch (modWave) {
            default:
              lfo = 1 - 4 * Math.abs(phase - .5);
              break;
            case 1:
              lfo = phase > .5 ? -1 : -Math.cos((phase - .75) * PI_2);
              break;
            case 2:
              lfo = Math.sin(PI_2 * phase);
              break;
            case 3:
              lfo = 1 - 2 * phase;
              break;
            case 4:
              lfo = 2 * phase - 1;
              break;
          }
          if ((phase += rateInc) >= 1) phase -= 1;
          const tremoloLevel = 1 - (lfo / 2 + .5) * (modDepth / 127);
          currentGain += (tremoloLevel - currentGain) * GAIN_SMOOTHING;
          const outL = sL * level * currentGain;
          const outR = sR * level * currentGain;
          const idx = startIndex + i;
          outputLeft[idx] += outL;
          outputRight[idx] += outR;
          const mono = (outL + outR) * .5;
          outputReverb[i] += mono * sendLevelToReverb;
          outputChorus[i] += mono * sendLevelToChorus;
          outputDelay[i] += mono * sendLevelToDelay;
        }
        this.phase = phase;
        this.currentGain = currentGain;
      }
      setParameter(parameter, value) {
        switch (parameter) {
          default: break;
          case 3:
            this.modWave = value;
            break;
          case 4:
            this.modRate = InsertionValueConverter.rate1(value);
            break;
          case 5:
            this.modDepth = value;
            break;
          case 19:
            this.lowGain = value - 64;
            break;
          case 20:
            this.hiGain = value - 64;
            break;
          case 22:
            this.level = value / 127;
            break;
        }
        this.updateShelves();
      }
      updateShelves() {
        computeShelfCoeffs(this.lsCoeffs, this.lowGain, 200, this.sampleRate, true);
        computeShelfCoeffs(this.hsCoeffs, this.hiGain, 4e3, this.sampleRate, false);
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/effects/insertion_list.ts
    const insertionList = [
      ThruFX,
      StereoEQFX,
      PhaserFX,
      AutoPanFX,
      AutoWahFX,
      PhAutoWahFx,
      TremoloFX
    ];
    //#endregion
    //#region src/synthesizer/audio_engine/effects/reverb/dattorro.ts
    /**
    * Dattorro Reverb Node
    * by khoin on GitHub, public domain.
    * https://github.com/khoin/DattorroReverbNode/
    * Adapted for spessasynth by spessasus.
    */
    var DattorroReverb = class {
      preDelay = 0;
      preLPF = .5;
      inputDiffusion1 = .75;
      inputDiffusion2 = .625;
      decay = .5;
      decayDiffusion1 = .7;
      decayDiffusion2 = .5;
      damping = .005;
      excursionRate = .1;
      excursionDepth = .2;
      gain = 1;
      sampleRate;
      lp1 = 0;
      lp2 = 0;
      lp3 = 0;
      excPhase = 0;
      pDWrite = 0;
      taps;
      pDelay;
      pDLength;
      delays = new Array();
      constructor(sampleRate) {
        this.sampleRate = sampleRate;
        this.pDLength = sampleRate;
        this.pDelay = new Float32Array(this.pDLength);
        for (const delay of [
          .004771345,
          .003595309,
          .012734787,
          .009307483,
          .022579886,
          .149625349,
          .060481839,
          .1249958,
          .030509727,
          .141695508,
          .089244313,
          .106280031
        ]) this.makeDelayLine(delay);
        this.taps = Int16Array.from([
          .008937872,
          .099929438,
          .064278754,
          .067067639,
          .066866033,
          .006283391,
          .035818689,
          .011861161,
          .121870905,
          .041262054,
          .08981553,
          .070931756,
          .011256342,
          .004065724
        ], (x) => Math.round(x * this.sampleRate));
      }
      process(input, outputLeft, outputRight, startIndex, sampleCount) {
        const pd = this.preDelay | 0;
        const fi = this.inputDiffusion1;
        const si = this.inputDiffusion2;
        const dc = this.decay;
        const ft = this.decayDiffusion1;
        const st = this.decayDiffusion2;
        const dp = 1 - this.damping;
        const ex = this.excursionRate / this.sampleRate;
        const ed = this.excursionDepth * this.sampleRate / 1e3;
        const blockStart = this.pDWrite;
        for (let j = 0; j < sampleCount; j++) this.pDelay[(blockStart + j) % this.pDLength] = input[j];
        for (let i = 0; i < sampleCount; i++) {
          this.lp1 += this.preLPF * (this.pDelay[(this.pDLength + this.pDWrite - pd + i) % this.pDLength] - this.lp1);
          let pre = this.writeDelay(0, this.lp1 - fi * this.readDelay(0));
          pre = this.writeDelay(1, fi * (pre - this.readDelay(1)) + this.readDelay(0));
          pre = this.writeDelay(2, fi * pre + this.readDelay(1) - si * this.readDelay(2));
          pre = this.writeDelay(3, si * (pre - this.readDelay(3)) + this.readDelay(2));
          const split = si * pre + this.readDelay(3);
          const exc = ed * (1 + Math.cos(this.excPhase * 6.28));
          const exc2 = ed * (1 + Math.sin(this.excPhase * 6.2847));
          let temp = this.writeDelay(4, split + dc * this.readDelay(11) + ft * this.readDelayCAt(4, exc));
          this.writeDelay(5, this.readDelayCAt(4, exc) - ft * temp);
          this.lp2 += dp * (this.readDelay(5) - this.lp2);
          temp = this.writeDelay(6, dc * this.lp2 - st * this.readDelay(6));
          this.writeDelay(7, this.readDelay(6) + st * temp);
          temp = this.writeDelay(8, split + dc * this.readDelay(7) + ft * this.readDelayCAt(8, exc2));
          this.writeDelay(9, this.readDelayCAt(8, exc2) - ft * temp);
          this.lp3 += dp * (this.readDelay(9) - this.lp3);
          temp = this.writeDelay(10, dc * this.lp3 - st * this.readDelay(10));
          this.writeDelay(11, this.readDelay(10) + st * temp);
          const leftSample = this.readDelayAt(9, this.taps[0]) + this.readDelayAt(9, this.taps[1]) - this.readDelayAt(10, this.taps[2]) + this.readDelayAt(11, this.taps[3]) - this.readDelayAt(5, this.taps[4]) - this.readDelayAt(6, this.taps[5]) - this.readDelayAt(7, this.taps[6]);
          const idx = i + startIndex;
          outputLeft[idx] += leftSample * this.gain;
          const rightSample = this.readDelayAt(5, this.taps[7]) + this.readDelayAt(5, this.taps[8]) - this.readDelayAt(6, this.taps[9]) + this.readDelayAt(7, this.taps[10]) - this.readDelayAt(9, this.taps[11]) - this.readDelayAt(10, this.taps[12]) - this.readDelayAt(11, this.taps[13]);
          outputRight[idx] += rightSample * this.gain;
          this.excPhase += ex;
          for (let j = 0, d = this.delays[0]; j < this.delays.length; d = this.delays[++j]) {
            d[1] = d[1] + 1 & d[3];
            d[2] = d[2] + 1 & d[3];
          }
        }
        this.pDWrite = (blockStart + sampleCount) % this.pDLength;
      }
      makeDelayLine(length) {
        const len = Math.round(length * this.sampleRate);
        const nextPow2 = 2 ** Math.ceil(Math.log2(len));
        this.delays.push([
          new Float32Array(nextPow2),
          len - 1,
          0,
          nextPow2 - 1
        ]);
      }
      writeDelay(index, sample) {
        return this.delays[index][0][this.delays[index][1]] = sample;
      }
      readDelay(index) {
        return this.delays[index][0][this.delays[index][2]];
      }
      readDelayAt(index, i) {
        const delay = this.delays[index];
        return delay[0][delay[2] + i & delay[3]];
      }
      readDelayCAt(index, i) {
        const d = this.delays[index], frac = i - ~~i, mask = d[3];
        let int = ~~i + d[2] - 1;
        const x0 = d[0][int++ & mask], x1 = d[0][int++ & mask], x2 = d[0][int++ & mask], x3 = d[0][int & mask];
        const a = (3 * (x1 - x2) - x0 + x3) / 2, b = 2 * x2 + x0 - (5 * x1 + x3) / 2, c = (x2 - x0) / 2;
        return ((a * frac + b) * frac + c) * frac + x1;
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/effects/delay_line.ts
    var DelayLine = class {
      feedback = 0;
      gain = 1;
      buffer;
      bufferLength;
      writeIndex = 0;
      constructor(maxDelay) {
        this.buffer = new Float32Array(maxDelay);
        this.bufferLength = this.buffer.length;
        this._time = maxDelay - 5;
      }
      /**
      * Samples
      */
      _time;
      get time() {
        return this._time;
      }
      set time(value) {
        this._time = Math.min(this.bufferLength, value) | 0;
      }
      clear() {
        this.buffer.fill(0);
      }
      /**
      * OVERWRITES the output
      * @param input
      * @param output
      * @param sampleCount
      */
      process(input, output, sampleCount) {
        let writeIndex = this.writeIndex;
        const delay = this._time;
        const buffer = this.buffer;
        const bufferLength = this.bufferLength;
        const feedback = this.feedback;
        const gain = this.gain;
        for (let i = 0; i < sampleCount; i++) {
          let readIndex = writeIndex - delay;
          if (readIndex < 0) readIndex += bufferLength;
          const delayed = buffer[readIndex];
          output[i] = delayed * gain;
          buffer[writeIndex] = input[i] + delayed * feedback;
          if (++writeIndex >= bufferLength) writeIndex = 0;
        }
        this.writeIndex = writeIndex;
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/effects/reverb/reverb.ts
    const DELAY_GAIN$1 = 1.5;
    var SpessaSynthReverb = class {
      /**
      * Dattorro reverb processor.
      * @private
      */
      dattorro;
      /**
      * Left delay line, also used for the mono delay. (character 6)
      * @private
      */
      delayLeft;
      /**
      * Right delay line.
      * @private
      */
      delayRight;
      /**
      * Output of the left (and mono) delay.
      * @private
      */
      delayLeftOutput;
      /**
      * Output of the right delay.
      * @private
      */
      delayRightOutput;
      /**
      * Input into the left delay. Mixed dry input and right output.
      * @private
      */
      delayLeftInput;
      /**
      * Pre LPF buffer for the delay characters.
      * @private
      */
      delayPreLPF;
      /**
      * Sample rate of the processor.
      * @private
      */
      sampleRate;
      /**
      * Cutoff frequency
      * @private
      */
      preLPFfc = 8e3;
      /**
      * Alpha
      * @private
      */
      preLPFa = 0;
      /**
      * Previous value
      * @private
      */
      preLPFz = 0;
      /**
      * Reverb time coefficient for different reverb characters.
      * @private
      */
      characterTimeCoefficient = 1;
      /**
      * Reverb gain coefficient for different reverb characters.
      * @private
      */
      characterGainCoefficient = 1;
      /**
      * Reverb pre-lowpass coefficient for different reverb characters.
      * @private
      */
      characterLPFCoefficient = 0;
      /**
      * Gain for the delay output.
      * @private
      */
      delayGain = 1;
      /**
      * Panning delay feedback gain (from the right to the left delay).
      * @private
      */
      panDelayFeedback = 0;
      constructor(sampleRate, maxBufferSize) {
        this.sampleRate = sampleRate;
        this.delayLeftOutput = new Float32Array(maxBufferSize);
        this.delayRightOutput = new Float32Array(maxBufferSize);
        this.delayLeftInput = new Float32Array(maxBufferSize);
        this.delayPreLPF = new Float32Array(maxBufferSize);
        this.dattorro = new DattorroReverb(sampleRate);
        this.delayLeft = new DelayLine(sampleRate);
        this.delayRight = new DelayLine(sampleRate);
      }
      _delayFeedback = 0;
      get delayFeedback() {
        return this._delayFeedback;
      }
      set delayFeedback(value) {
        this._delayFeedback = value;
        this.updateFeedback();
      }
      _character = 0;
      get character() {
        return this._character;
      }
      set character(value) {
        this._character = value;
        this.dattorro.damping = .005;
        this.characterTimeCoefficient = 1;
        this.characterGainCoefficient = 1;
        this.characterLPFCoefficient = 0;
        this.dattorro.inputDiffusion1 = .75;
        this.dattorro.inputDiffusion2 = .625;
        this.dattorro.decayDiffusion1 = .7;
        this.dattorro.decayDiffusion2 = .5;
        this.dattorro.excursionRate = .5;
        this.dattorro.excursionDepth = .7;
        switch (value) {
          case 0:
            this.dattorro.damping = .85;
            this.characterTimeCoefficient = .9;
            this.characterGainCoefficient = .7;
            this.characterLPFCoefficient = .2;
            break;
          case 1:
            this.dattorro.damping = .2;
            this.characterGainCoefficient = .5;
            this.characterTimeCoefficient = 1;
            this.dattorro.decayDiffusion2 = .64;
            this.dattorro.decayDiffusion1 = .6;
            this.characterLPFCoefficient = .2;
            break;
          case 2:
            this.dattorro.damping = .56;
            this.characterGainCoefficient = .55;
            this.characterTimeCoefficient = 1;
            this.dattorro.decayDiffusion2 = .64;
            this.dattorro.decayDiffusion1 = .6;
            this.characterLPFCoefficient = .1;
            break;
          case 3:
            this.dattorro.damping = .6;
            this.characterGainCoefficient = 1;
            this.characterLPFCoefficient = 0;
            this.dattorro.decayDiffusion2 = .7;
            this.dattorro.decayDiffusion1 = .66;
            break;
          case 4:
            this.characterGainCoefficient = .75;
            this.dattorro.damping = .2;
            this.characterLPFCoefficient = .2;
            break;
          case 5:
            this.characterGainCoefficient = .55;
            this.dattorro.damping = .65;
            this.characterTimeCoefficient = .5;
            break;
        }
        this.updateTime();
        this.updateGain();
        this.updateLowpass();
        this.updateFeedback();
        this.delayLeft.clear();
        this.delayRight.clear();
      }
      _time = 0;
      get time() {
        return this._time;
      }
      set time(value) {
        this._time = value;
        this.updateTime();
      }
      _preDelayTime = 0;
      get preDelayTime() {
        return this._preDelayTime;
      }
      set preDelayTime(value) {
        this._preDelayTime = value;
        this.dattorro.preDelay = value / 1e3 * this.sampleRate;
      }
      _level = 0;
      get level() {
        return this._level;
      }
      set level(value) {
        this._level = value;
        this.updateGain();
      }
      _preLowpass = 0;
      get preLowpass() {
        return this._preLowpass;
      }
      set preLowpass(value) {
        this._preLowpass = value;
        this.preLPFfc = 8e3 * .63 ** this._preLowpass;
        const decay = Math.exp(-2 * Math.PI * this.preLPFfc / this.sampleRate);
        this.preLPFa = 1 - decay;
        this.updateLowpass();
      }
      /**
      *
      * @param input 0-based
      * @param outputLeft startIndex-based
      * @param outputRight startIndex-based
      * @param startIndex
      * @param sampleCount
      */
      process(input, outputLeft, outputRight, startIndex, sampleCount) {
        switch (this._character) {
          default:
            this.dattorro.process(input, outputLeft, outputRight, startIndex, sampleCount);
            return;
          case 6: {
            let delayIn;
            if (this._preLowpass > 0) {
              const preLPF = this.delayPreLPF;
              let z = this.preLPFz;
              const a = this.preLPFa;
              for (let i = 0; i < sampleCount; i++) {
                const x = input[i];
                z += a * (x - z);
                preLPF[i] = z;
              }
              this.preLPFz = z;
              delayIn = preLPF;
            } else delayIn = input;
            this.delayLeft.process(delayIn, this.delayLeftOutput, sampleCount);
            const g = this.delayGain;
            const delay = this.delayLeftOutput;
            for (let i = 0, o = startIndex; i < sampleCount; i++, o++) {
              const sample = delay[i] * g;
              outputRight[o] += sample;
              outputLeft[o] += sample;
            }
            return;
          }
          case 7: {
            let delayIn;
            if (this._preLowpass > 0) {
              const preLPF = this.delayPreLPF;
              let z = this.preLPFz;
              const a = this.preLPFa;
              for (let i = 0; i < sampleCount; i++) {
                const x = input[i];
                z += a * (x - z);
                preLPF[i] = z;
              }
              this.preLPFz = z;
              delayIn = preLPF;
            } else delayIn = input;
            const fb = this.panDelayFeedback;
            const { delayLeftInput, delayLeftOutput, delayRightOutput } = this;
            for (let i = 0; i < sampleCount; i++) delayLeftInput[i] = delayIn[i] + delayRightOutput[i] * fb;
            this.delayLeft.process(delayLeftInput, delayLeftOutput, sampleCount);
            this.delayRight.process(delayLeftOutput, delayRightOutput, sampleCount);
            const g = this.delayGain;
            for (let i = 0, o = startIndex; i < sampleCount; i++, o++) {
              outputLeft[o] += delayLeftOutput[i] * g;
              outputRight[o] += delayRightOutput[i] * g;
            }
            return;
          }
        }
      }
      getSnapshot() {
        return {
          level: this._level,
          preLowpass: this._preLowpass,
          character: this._character,
          time: this._time,
          delayFeedback: this._delayFeedback,
          preDelayTime: this._preDelayTime
        };
      }
      updateFeedback() {
        const exp = 1 - (1 - this._delayFeedback / 127) ** 1.9;
        if (this._character === 6) this.delayLeft.feedback = exp * .73;
        else {
          this.delayLeft.feedback = this.delayRight.feedback = 0;
          this.panDelayFeedback = exp * .73;
        }
      }
      updateLowpass() {
        this.dattorro.preLPF = Math.min(1, .1 + (7 - this.preLowpass) / 14 + this.characterLPFCoefficient);
      }
      updateGain() {
        this.dattorro.gain = this._level / 348 * this.characterGainCoefficient;
        this.delayGain = this._level / 127 * DELAY_GAIN$1;
      }
      updateTime() {
        const t = this._time / 127;
        this.dattorro.decay = this.characterTimeCoefficient * (.05 + .65 * t);
        const timeSamples = Math.max(21, t * this.sampleRate * .4468 | 0);
        if (this.character === 7) this.delayRight.time = this.delayLeft.time = Math.floor(timeSamples / 2);
        else this.delayLeft.time = timeSamples;
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/effects/chorus/chorus.ts
    const CHORUS_GAIN = 1.3;
    var SpessaSynthChorus = class {
      /**
      * Cutoff frequency
      * @private
      */
      preLPFfc = 8e3;
      /**
      * Alpha
      * @private
      */
      preLPFa = 0;
      /**
      * Previous value
      * @private
      */
      preLPFz = 0;
      leftDelayBuffer;
      rightDelayBuffer;
      sampleRate;
      phase = 0;
      write = 0;
      gain = .5;
      reverbGain = 0;
      delayGain = 0;
      depthSamples = 0;
      delaySamples = 1;
      rateInc = 0;
      feedbackGain = 0;
      constructor(sampleRate, maxBufferSize) {
        this.sampleRate = sampleRate;
        this.leftDelayBuffer = new Float32Array(sampleRate);
        this.rightDelayBuffer = new Float32Array(sampleRate);
        this.preLowpass = 0;
      }
      _sendLevelToReverb = 0;
      get sendLevelToReverb() {
        return this._sendLevelToReverb;
      }
      set sendLevelToReverb(value) {
        this._sendLevelToReverb = value;
        this.reverbGain = value / 127;
      }
      _sendLevelToDelay = 0;
      get sendLevelToDelay() {
        return this._sendLevelToDelay;
      }
      set sendLevelToDelay(value) {
        this._sendLevelToDelay = value;
        this.delayGain = value / 127;
      }
      _preLowpass = 0;
      get preLowpass() {
        return this._preLowpass;
      }
      set preLowpass(value) {
        this._preLowpass = value;
        this.preLPFfc = 8e3 * .63 ** this._preLowpass;
        const decay = Math.exp(-2 * Math.PI * this.preLPFfc / this.sampleRate);
        this.preLPFa = 1 - decay;
      }
      _depth = 0;
      get depth() {
        return this._depth;
      }
      set depth(value) {
        this._depth = value;
        this.depthSamples = value / 127 * .025 * this.sampleRate;
      }
      _delay = 0;
      get delay() {
        return this._delay;
      }
      set delay(value) {
        this._delay = value;
        this.delaySamples = Math.max(1, value / 127 * .025 * this.sampleRate);
      }
      _feedback = 0;
      get feedback() {
        return this._feedback;
      }
      set feedback(value) {
        this._feedback = value;
        this.feedbackGain = value / 128;
      }
      _rate = 0;
      get rate() {
        return this._rate;
      }
      set rate(value) {
        this._rate = value;
        const rate = 15.5 * (value / 127);
        this.rateInc = rate / this.sampleRate;
      }
      _level = 64;
      get level() {
        return this._level;
      }
      set level(value) {
        this.gain = value / 127 * CHORUS_GAIN;
        this._level = value;
      }
      process(input, outputLeft, outputRight, outputReverb, outputDelay, startIndex, sampleCount) {
        const bufferL = this.leftDelayBuffer;
        const bufferR = this.rightDelayBuffer;
        const rateInc = this.rateInc;
        const bufferLen = bufferL.length;
        const depth = this.depthSamples;
        const delay = this.delaySamples;
        const gain = this.gain;
        const reverbGain = this.reverbGain;
        const delayGain = this.delayGain;
        const feedback = this.feedbackGain;
        const preLPF = this._preLowpass > 0;
        let phase = this.phase;
        let write = this.write;
        let z = this.preLPFz;
        const a = this.preLPFa;
        for (let i = 0; i < sampleCount; i++) {
          let inputSample = input[i];
          if (preLPF) {
            z += a * (inputSample - z);
            inputSample = z;
          }
          const lfo = 2 * Math.abs(phase - .5);
          const dL = Math.max(1, Math.min(delay + lfo * depth, bufferLen));
          let readPosL = write - dL;
          if (readPosL < 0) readPosL += bufferLen;
          let x0 = readPosL | 0;
          let x1 = x0 + 1;
          if (x1 >= bufferLen) x1 -= bufferLen;
          let frac = readPosL - x0;
          const outL = bufferL[x0] * (1 - frac) + bufferL[x1] * frac;
          bufferL[write] = inputSample + outL * feedback;
          const dR = Math.max(1, Math.min(delay + (1 - lfo) * depth, bufferLen));
          let readPosR = write - dR;
          if (readPosR < 0) readPosR += bufferLen;
          x0 = readPosR | 0;
          x1 = x0 + 1;
          if (x1 >= bufferLen) x1 -= bufferLen;
          frac = readPosR - x0;
          const outR = bufferR[x0] * (1 - frac) + bufferR[x1] * frac;
          const o = i + startIndex;
          outputLeft[o] += outL * gain;
          outputRight[o] += outR * gain;
          const mono = (outL + outR) / 2;
          outputReverb[i] += mono * reverbGain;
          outputDelay[i] += mono * delayGain;
          bufferR[write] = inputSample + outR * feedback;
          if (++write >= bufferLen) write = 0;
          if ((phase += rateInc) >= 1) phase -= 1;
        }
        this.write = write;
        this.phase = phase;
        this.preLPFz = z;
      }
      getSnapshot() {
        return {
          preLowpass: this._preLowpass,
          depth: this._depth,
          delay: this._delay,
          sendLevelToDelay: this._sendLevelToDelay,
          sendLevelToReverb: this._sendLevelToReverb,
          rate: this._rate,
          feedback: this._feedback,
          level: this._level
        };
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/effects/delay/delay.ts
    const delayTimeSegments = [
      {
        start: 1,
        end: 20,
        timeStart: .1,
        resolution: .1
      },
      {
        start: 20,
        end: 35,
        timeStart: 2,
        resolution: .2
      },
      {
        start: 35,
        end: 45,
        timeStart: 5,
        resolution: .5
      },
      {
        start: 45,
        end: 55,
        timeStart: 10,
        resolution: 1
      },
      {
        start: 55,
        end: 70,
        timeStart: 20,
        resolution: 2
      },
      {
        start: 70,
        end: 80,
        timeStart: 50,
        resolution: 5
      },
      {
        start: 80,
        end: 90,
        timeStart: 100,
        resolution: 10
      },
      {
        start: 90,
        end: 105,
        timeStart: 200,
        resolution: 20
      },
      {
        start: 105,
        end: 116,
        timeStart: 500,
        resolution: 50
      }
    ];
    const DELAY_GAIN = 1.66;
    var SpessaSynthDelay = class {
      /**
      * Cutoff frequency
      * @private
      */
      preLPFfc = 8e3;
      /**
      * Alpha
      * @private
      */
      preLPFa = 0;
      /**
      * Previous value
      * @private
      */
      preLPFz = 0;
      delayLeft;
      delayRight;
      delayCenter;
      sampleRate;
      delayCenterOutput;
      delayPreLPF;
      delayCenterTime;
      delayLeftMultiplier = .04;
      delayRightMultiplier = .04;
      gain = 0;
      reverbGain = 0;
      constructor(sampleRate, maxBufferSize) {
        this.sampleRate = sampleRate;
        this.delayCenterOutput = new Float32Array(maxBufferSize);
        this.delayPreLPF = new Float32Array(maxBufferSize);
        this.delayCenterTime = .34 * sampleRate;
        this.delayCenter = new DelayLine(sampleRate);
        this.delayLeft = new DelayLine(sampleRate);
        this.delayRight = new DelayLine(sampleRate);
      }
      _sendLevelToReverb = 0;
      get sendLevelToReverb() {
        return this._sendLevelToReverb;
      }
      set sendLevelToReverb(value) {
        this._sendLevelToReverb = value;
        this.reverbGain = value / 127;
      }
      _preLowpass = 0;
      get preLowpass() {
        return this._preLowpass;
      }
      set preLowpass(value) {
        this._preLowpass = value;
        this.preLPFfc = 8e3 * .63 ** this._preLowpass;
        const decay = Math.exp(-2 * Math.PI * this.preLPFfc / this.sampleRate);
        this.preLPFa = 1 - decay;
      }
      _levelRight = 0;
      get levelRight() {
        return this._levelRight;
      }
      set levelRight(value) {
        this._levelRight = value;
        this.updateGain();
      }
      _level = 64;
      get level() {
        return this._level;
      }
      set level(value) {
        this._level = value;
        this.gain = value / 127 * DELAY_GAIN;
      }
      _levelCenter = 127;
      get levelCenter() {
        return this._levelCenter;
      }
      set levelCenter(value) {
        this._levelCenter = value;
        this.updateGain();
      }
      _levelLeft = 0;
      get levelLeft() {
        return this._levelLeft;
      }
      set levelLeft(value) {
        this._levelLeft = value;
        this.updateGain();
      }
      _feedback = 16;
      get feedback() {
        return this._feedback;
      }
      set feedback(value) {
        this._feedback = value;
        this.delayLeft.feedback = this.delayRight.feedback = 0;
        this.delayCenter.feedback = (value - 64) / 66;
      }
      _timeRatioRight = 0;
      get timeRatioRight() {
        return this._timeRatioRight;
      }
      set timeRatioRight(value) {
        this._timeRatioRight = value;
        this.delayRightMultiplier = value * (100 / 2400);
        this.delayRight.time = this.delayCenterTime * this.delayRightMultiplier;
      }
      _timeRatioLeft = 0;
      get timeRatioLeft() {
        return this._timeRatioLeft;
      }
      set timeRatioLeft(value) {
        this._timeRatioLeft = value;
        this.delayLeftMultiplier = value * (100 / 2400);
        this.delayLeft.time = this.delayCenterTime * this.delayLeftMultiplier;
      }
      _timeCenter = 12;
      get timeCenter() {
        return this._timeCenter;
      }
      set timeCenter(value) {
        this._timeCenter = value;
        let delayMs = .1;
        for (const segment of delayTimeSegments) if (value >= segment.start && value < segment.end) {
          delayMs = segment.timeStart + (value - segment.start) * segment.resolution;
          break;
        }
        this.delayCenterTime = Math.max(2, this.sampleRate * (delayMs / 1e3));
        this.delayCenter.time = this.delayCenterTime;
        this.delayLeft.time = this.delayCenterTime * this.delayLeftMultiplier;
        this.delayRight.time = this.delayCenterTime * this.delayRightMultiplier;
      }
      process(input, outputLeft, outputRight, outputReverb, startIndex, sampleCount) {
        let delayIn;
        if (this._preLowpass > 0) {
          const preLPF = this.delayPreLPF;
          let z = this.preLPFz;
          const a = this.preLPFa;
          for (let i = 0; i < sampleCount; i++) {
            const x = input[i];
            z += a * (x - z);
            preLPF[i] = z;
          }
          this.preLPFz = z;
          delayIn = preLPF;
        } else delayIn = input;
        const { gain, reverbGain } = this;
        this.delayCenter.process(delayIn, this.delayCenterOutput, sampleCount);
        const center = this.delayCenterOutput;
        for (let i = 0, o = startIndex; i < sampleCount; i++, o++) {
          const sample = center[i];
          outputReverb[i] += sample * reverbGain;
          const outSample = sample * gain;
          outputLeft[o] += outSample;
          outputRight[o] += outSample;
        }
        for (let i = 0; i < sampleCount; i++) center[i] += input[i];
        const stereoOut = this.delayPreLPF;
        this.delayLeft.process(center, stereoOut, sampleCount);
        for (let i = 0, o = startIndex; i < sampleCount; i++, o++) {
          const sample = stereoOut[i];
          outputLeft[o] += sample * gain;
          outputReverb[i] += sample * reverbGain;
        }
        this.delayRight.process(center, stereoOut, sampleCount);
        for (let i = 0, o = startIndex; i < sampleCount; i++, o++) {
          const sample = stereoOut[i];
          outputRight[o] += sample * gain;
          outputReverb[i] += sample * reverbGain;
        }
      }
      getSnapshot() {
        return {
          level: this._level,
          preLowpass: this._preLowpass,
          timeCenter: this._timeCenter,
          timeRatioRight: this._timeRatioRight,
          timeRatioLeft: this._timeRatioLeft,
          levelCenter: this._levelCenter,
          levelLeft: this._levelLeft,
          levelRight: this._levelRight,
          feedback: this._feedback,
          sendLevelToReverb: this._sendLevelToReverb
        };
      }
      updateGain() {
        this.delayCenter.gain = this._levelCenter / 127;
        this.delayLeft.gain = this._levelLeft / 127;
        this.delayRight.gain = this._levelRight / 127;
      }
    };
    //#endregion
    //#region src/synthesizer/audio_engine/synthesizer_core.ts
    const GAIN_SMOOTHING_FACTOR = .01;
    const PAN_SMOOTHING_FACTOR = .05;
    /**
    * The core synthesis engine which interacts with channels and holds all the synth parameters.
    */
    var SynthesizerCore = class {
      /**
      * Voices of this synthesizer, as a fixed voice pool.
      */
      voices;
      /**
      * All MIDI channels of the synthesizer.
      */
      midiChannels = [];
      /**
      * The maximum allowed buffer size to render.
      */
      maxBufferSize;
      /**
      * The buffer to use when rendering a voice.
      */
      voiceBuffer;
      /**
      * The insertion processor's left input buffer.
      */
      insertionInputL;
      /**
      * The insertion processor's right input buffer.
      */
      insertionInputR;
      /**
      * The reverb processor's input buffer.
      */
      reverbInput;
      /**
      * The chorus processor's input buffer.
      */
      chorusInput;
      /**
      * The delay processor's input buffer.
      */
      delayInput;
      /**
      * Delay is not used outside SC-88+ MIDIs, this is an optimization.
      */
      delayActive = false;
      /**
      * The sound bank manager, which manages all sound banks and presets.
      */
      soundBankManager = new SoundBankManager(this.updatePresetList.bind(this));
      /**
      * Handles the custom key overrides: velocity and preset
      */
      keyModifierManager = new KeyModifierManager();
      sampleRate;
      /**
      * This.tunings[program * 128 + key] = midiNote,cents (fraction)
      * All MIDI Tuning Standard tunings, 128 keys for each of 128 programs.
      * -1 means no change.
      */
      tunings = new Float32Array(16384).fill(-1);
      /**
      * The master parameters of the synthesizer.
      */
      masterParameters = { ...DEFAULT_MASTER_PARAMETERS };
      /**
      * The current time of the synthesizer, in seconds.
      */
      currentTime = 0;
      /**
      * The volume gain, set by MIDI sysEx
      */
      midiVolume = 1;
      /**
      * Are the chorus and reverb effects enabled?
      */
      enableEffects;
      /**
      * Is the event system enabled?
      */
      enableEventSystem;
      /**
      * The pan of the left channel.
      */
      panLeft = Math.cos(Math.PI / 4);
      /**
      * The pan of the right channel.
      */
      panRight = Math.cos(Math.PI / 4);
      /**
      * Synth's default (reset) preset.
      */
      defaultPreset;
      /**
      * Synth's default (reset) drum preset.
      */
      drumPreset;
      /**
      * Gain smoothing factor, adjusted to the sample rate.
      */
      gainSmoothingFactor;
      /**
      * Pan smoothing factor, adjusted to the sample rate.
      */
      panSmoothingFactor;
      /**
      * Calls when an event occurs.
      * @param eventType The event type.
      * @param eventData The event data.
      */
      eventCallbackHandler;
      missingPresetHandler;
      /**
      * Cached voices for all presets for this synthesizer.
      * Nesting is calculated in getCachedVoiceIndex, returns a list of voices for this note.
      */
      cachedVoices = /* @__PURE__ */ new Map();
      /**
      * Sets a master parameter of the synthesizer.
      * @param type The type of the master parameter to set.
      * @param value The value to set for the master parameter.
      */
      setMasterParameter = setMasterParameterInternal.bind(this);
      /**
      * Gets a master parameter of the synthesizer.
      * @param type The type of the master parameter to get.
      * @returns The value of the master parameter.
      */
      getMasterParameter = getMasterParameterInternal.bind(this);
      /**
      * Gets all master parameters of the synthesizer.
      * @returns All the master parameters.
      */
      getAllMasterParameters = getAllMasterParametersInternal.bind(this);
      systemExclusive = systemExclusiveInternal.bind(this);
      /**
      * Current total amount of voices that are currently playing.
      */
      voiceCount = 0;
      /**
      * A sysEx may set a "Part" (channel) to receive on a different channel number.
      * This slows down the access, so this toggle tracks if it's enabled or not.
      */
      customChannelNumbers = false;
      /**
      * The synthesizer's reverb processor.
      */
      reverbProcessor;
      /**
      * The synthesizer's chorus processor.
      */
      chorusProcessor;
      /**
      * The synthesizer's delay processor.
      */
      delayProcessor;
      /**
      * The fallback processor when the requested insertion is not available.
      */
      insertionFallback = new ThruFX();
      /**
      * The current insertion processor.
      */
      insertionProcessor = this.insertionFallback;
      /**
      * All the insertion effects available to the processor.
      * The key is the EFX type stored as MSB << 8 | LSB
      */
      insertionEffects = /* @__PURE__ */ new Map();
      /**
      * Insertion is not used outside SC-88Pro+ MIDIs, this is an optimization.
      */
      insertionActive = false;
      /**
      * For F5 system exclusive.
      */
      portSelectChannelOffset = 0;
      /**
      * For insertion snapshot tracking
      * 20 parameters (0-19) + 3 sends
      * Index to gs is Addr3 - 3 (for example EFX PARAMETER 1 is 0x03 and here it's 0)
      * note: 255 means "no change"
      * @protected
      */
      insertionParams = new Uint8Array(23).fill(255);
      /**
      * Last time the priorities were assigned.
      * Used to prevent assigning priorities multiple times when more than one voice is triggered during a quantum.
      */
      lastPriorityAssignmentTime = 0;
      /**
      * Synth's event queue from the main thread
      */
      eventQueue = [];
      /**
      * The time of a single sample, in seconds.
      */
      sampleTime;
      constructor(eventCallbackHandler, missingPresetHandler, sampleRate, options) {
        this.eventCallbackHandler = eventCallbackHandler;
        this.missingPresetHandler = missingPresetHandler;
        this.sampleRate = sampleRate;
        this.sampleTime = 1 / sampleRate;
        this.currentTime = options.initialTime;
        this.enableEffects = options.enableEffects;
        this.enableEventSystem = options.enableEventSystem;
        this.maxBufferSize = options.maxBufferSize;
        this.gainSmoothingFactor = GAIN_SMOOTHING_FACTOR * (44100 / sampleRate);
        this.panSmoothingFactor = PAN_SMOOTHING_FACTOR * (44100 / sampleRate);
        LowpassFilter.initCache(this.sampleRate);
        const bufSize = this.maxBufferSize;
        this.reverbProcessor = options.reverbProcessor ?? new SpessaSynthReverb(sampleRate, bufSize);
        this.chorusProcessor = options.chorusProcessor ?? new SpessaSynthChorus(sampleRate, bufSize);
        this.delayProcessor = options.delayProcessor ?? new SpessaSynthDelay(sampleRate, bufSize);
        this.voiceBuffer = new Float32Array(bufSize);
        this.insertionInputL = new Float32Array(bufSize);
        this.insertionInputR = new Float32Array(bufSize);
        this.reverbInput = new Float32Array(bufSize);
        this.chorusInput = new Float32Array(bufSize);
        this.delayInput = new Float32Array(bufSize);
        for (const insertion of insertionList) this.registerInsertionProcessor(insertion);
        this.resetInsertionParams();
        this.voices = [];
        for (let i = 0; i < this.masterParameters.voiceCap; i++) this.voices.push(new Voice(this.sampleRate));
      }
      controllerChange(channel, controllerNumber, controllerValue) {
        if (this.customChannelNumbers) {
          for (const ch of this.midiChannels) if (ch.rxChannel === channel) ch.controllerChange(controllerNumber, controllerValue);
          return;
        }
        this.midiChannels[channel + this.portSelectChannelOffset].controllerChange(controllerNumber, controllerValue);
      }
      noteOn(channel, midiNote, velocity) {
        if (this.customChannelNumbers) {
          for (const ch of this.midiChannels) if (ch.rxChannel === channel) ch.noteOn(midiNote, velocity);
          return;
        }
        this.midiChannels[channel + this.portSelectChannelOffset].noteOn(midiNote, velocity);
      }
      noteOff(channel, midiNote) {
        if (this.customChannelNumbers) {
          for (const ch of this.midiChannels) if (ch.rxChannel === channel) ch.noteOff(midiNote);
          return;
        }
        this.midiChannels[channel + this.portSelectChannelOffset].noteOff(midiNote);
      }
      polyPressure(channel, midiNote, pressure) {
        if (this.customChannelNumbers) {
          for (const ch of this.midiChannels) if (ch.rxChannel === channel) ch.polyPressure(midiNote, pressure);
          return;
        }
        this.midiChannels[channel + this.portSelectChannelOffset].polyPressure(midiNote, pressure);
      }
      channelPressure(channel, pressure) {
        if (this.customChannelNumbers) {
          for (const ch of this.midiChannels) if (ch.rxChannel === channel) ch.channelPressure(pressure);
          return;
        }
        this.midiChannels[channel + this.portSelectChannelOffset].channelPressure(pressure);
      }
      pitchWheel(channel, pitch, midiNote = -1) {
        if (this.customChannelNumbers) {
          for (const ch of this.midiChannels) if (ch.rxChannel === channel) ch.pitchWheel(pitch, midiNote);
          return;
        }
        this.midiChannels[channel + this.portSelectChannelOffset].pitchWheel(pitch, midiNote);
      }
      programChange(channel, programNumber) {
        if (this.customChannelNumbers) {
          for (const ch of this.midiChannels) if (ch.rxChannel === channel) ch.programChange(programNumber);
          return;
        }
        this.midiChannels[channel + this.portSelectChannelOffset].programChange(programNumber);
      }
      /**
      * Assigns the first available voice for use.
      * If none available, will assign priorities.
      */
      assignVoice() {
        for (let i = 0; i < this.masterParameters.voiceCap; i++) {
          const v = this.voices[i];
          if (!v.isActive) {
            v.priority = Infinity;
            return v;
          }
        }
        if (this.masterParameters.autoAllocateVoices) {
          const v = new Voice(this.sampleRate);
          this.voices.push(v);
          this.masterParameters.voiceCap++;
          this.callEvent("masterParameterChange", {
            parameter: "voiceCap",
            value: this.masterParameters.voiceCap
          });
          return v;
        }
        this.assignVoicePriorities();
        let lowest = this.voices[0];
        for (let i = 0; i < this.masterParameters.voiceCap; i++) {
          const v = this.voices[i];
          if (v.priority < lowest.priority) lowest = v;
        }
        lowest.priority = Infinity;
        return lowest;
      }
      /**
      * Stops all notes on all channels.
      * @param force if true, all notes are stopped immediately, otherwise they are stopped gracefully.
      */
      stopAllChannels(force) {
        SpessaSynthInfo("%cStop all received!", consoleColors.info);
        for (const channel of this.midiChannels) channel.stopAllNotes(force);
      }
      /**
      * Processes a raw MIDI message.
      * @param message The message to process.
      * @param channelOffset The channel offset for the message.
      * @param options Additional options for scheduling the message.
      */
      processMessage(message, channelOffset = 0, options = DEFAULT_SYNTH_METHOD_OPTIONS) {
        const time = options.time;
        if (time > this.currentTime) {
          this.eventQueue.push({
            message,
            channelOffset,
            time
          });
          this.eventQueue.sort((e1, e2) => e1.time - e2.time);
        } else this.processMessageInternal(message, channelOffset);
      }
      destroySynthProcessor() {
        this.voices.length = 0;
        for (const c of this.midiChannels) {
          c.lockedControllers = [];
          c.preset = void 0;
        }
        this.clearCache();
        this.midiChannels.length = 0;
        this.soundBankManager.destroy();
      }
      /**
      * @param channel channel to get voices for
      * @param midiNote the MIDI note to use
      * @param velocity the velocity to use
      * @returns output is an array of Voices
      */
      getVoices(channel, midiNote, velocity) {
        const channelObject = this.midiChannels[channel];
        const overridePatch = this.keyModifierManager.hasOverridePatch(channel, midiNote);
        let preset = channelObject.preset;
        if (overridePatch) {
          const patch = this.keyModifierManager.getPatch(channel, midiNote);
          preset = this.soundBankManager.getPreset(patch, this.masterParameters.midiSystem);
        }
        if (!preset) return [];
        return this.getVoicesForPreset(preset, midiNote, velocity);
      }
      createMIDIChannel(sendEvent) {
        const channel = new MIDIChannel(this, this.defaultPreset, this.midiChannels.length);
        this.midiChannels.push(channel);
        if (sendEvent) {
          this.callEvent("newChannel", void 0);
          channel.sendChannelProperty();
          channel.setDrums(true);
        }
      }
      /**
      * Executes a full system reset of all controllers.
      * This will reset all controllers to their default values,
      * except for the locked controllers.
      */
      resetAllControllers(system = "gs") {
        this.callEvent("allControllerReset", void 0);
        this.setMasterParameter("midiSystem", system);
        this.tunings.fill(-1);
        this.portSelectChannelOffset = 0;
        this.customChannelNumbers = false;
        this.setMIDIVolume(1);
        this.setReverbMacro(4);
        this.setChorusMacro(2);
        this.setDelayMacro(0);
        if (!this.masterParameters.delayLock) this.delayActive = false;
        this.resetInsertion();
        if (!this.drumPreset || !this.defaultPreset) return;
        for (let channelNumber = 0; channelNumber < this.midiChannels.length; channelNumber++) {
          const ch = this.midiChannels[channelNumber];
          ch.resetControllers(false);
          ch.resetPreset();
          for (let ccNum = 0; ccNum < 128; ccNum++) if (this.midiChannels[channelNumber].lockedControllers[ccNum]) this.callEvent("controllerChange", {
            channel: channelNumber,
            controllerNumber: ccNum,
            controllerValue: this.midiChannels[channelNumber].midiControllers[ccNum] >> 7
          });
          if (!this.midiChannels[channelNumber].lockedControllers[128 + modulatorSources.pitchWheel]) {
            const val = this.midiChannels[channelNumber].midiControllers[128 + modulatorSources.pitchWheel];
            this.callEvent("pitchWheel", {
              channel: channelNumber,
              pitch: val,
              midiNote: -1
            });
          }
          if (!this.midiChannels[channelNumber].lockedControllers[128 + modulatorSources.channelPressure]) {
            const val = this.midiChannels[channelNumber].midiControllers[128 + modulatorSources.channelPressure] >> 7;
            this.callEvent("channelPressure", {
              channel: channelNumber,
              pressure: val
            });
          }
        }
      }
      process(left, right, startIndex = 0, sampleCount = 0) {
        this.processSplit([[left, right]], left, right, startIndex, sampleCount);
      }
      /**
      * The main rendering pipeline, renders all voices the processes the effects:
      * ```
      *                   ┌────────────────────────────────┐
      *                   │        Voice Processor         │
      *                   └───────────────┬────────────────┘
      *                                   │
      *                   ┌───────────────┴────────────────┐
      *                   │      Insertion Processor       │
      *                   │      (Bypass or Process)       │
      *                   └───────────────┬────────────────┘
      *                                   │
      *              ┌──────────┬─────────┼────────────────────────┐
      *              │          │         │                        │
      *              │          │         𜸊                        │
      *              │          │ ┌───────┴───────┐                │
      *              │          │ │    Chorus     │                │
      *              │          │ │   Processor   ├──────────┐     │
      *              │          │ └─┬──────────┬──┘          │     │
      *              │          │   │          │             │     │
      *              │          │   │          │             │     │
      *              │          │   │          │             │     │
      *              │          │   │          │             │     │
      *              │          │   │          𜸊             𜸊     𜸊
      *              │          │   │ ┌────────┴───────┐   ┌─┴─────┴────────┐
      *              │          └───┼>┤     Delay      ├─>>┤     Reverb     │
      *              │              │ │   Processor    │   │   Processor    │
      *              │              │ └────────┬───────┘   └───────┬────────┘
      *              │              │          │                   │
      *              │              │          │                   │
      *              │              │          │                   │
      *              │              │          │                   │
      *              𜸊              𜸊          𜸊                   𜸊
      *    ┌─────────┴──────────┐ ┌─┴──────────┴───────────────────┴────┐
      *    │  Dry Output Pairs  │ │        Stereo Effects Output        │
      *    └────────────────────┘ └─────────────────────────────────────┘
      * ```
      * The pipeline is quite similar to the one on SC-8850 manual page 78.
      * All output arrays must be the same length, the method will crash otherwise.
      * @param outputs The stereo pairs for each MIDI channel's dry output, will be wrapped if less.
      * @param effectsLeft The left stereo effect output buffer.
      * @param effectsRight The right stereo effect output buffer.
      * @param startIndex The index to start writing at into the output buffer.
      * @param samples The amount of samples to write.
      */
      processSplit(outputs, effectsLeft, effectsRight, startIndex = 0, samples = 0) {
        if (this.eventQueue.length > 0) {
          const time = this.currentTime;
          while (this.eventQueue[0]?.time <= time) {
            const q = this.eventQueue.shift();
            if (q) this.processMessageInternal(q.message, q.channelOffset);
          }
        }
        startIndex = Math.max(startIndex, 0);
        const sampleCount = samples || outputs[0][0].length - startIndex;
        if (sampleCount > this.maxBufferSize) throw new Error(`Requested ${sampleCount} samples, but maxBufferSize is ${this.maxBufferSize}`);
        this.reverbInput.fill(0);
        this.chorusInput.fill(0);
        if (this.delayActive) this.delayInput.fill(0);
        if (this.insertionActive) {
          this.insertionInputL.fill(0);
          this.insertionInputR.fill(0);
        }
        for (const c of this.midiChannels) c.clearVoiceCount();
        this.voiceCount = 0;
        const cap = this.masterParameters.voiceCap;
        const outputCount = outputs.length;
        for (let i = 0; i < cap; i++) {
          const v = this.voices[i];
          const ch = this.midiChannels[v.channel];
          if (!v.isActive || ch.isMuted) continue;
          const outputIndex = v.channel % outputCount;
          ch.renderVoice(v, this.currentTime, outputs[outputIndex][0], outputs[outputIndex][1], startIndex, sampleCount);
          ch.voiceCount++;
          this.voiceCount++;
        }
        if (this.enableEffects) {
          const { chorusInput, delayInput, reverbInput, insertionInputR, insertionInputL } = this;
          if (this.insertionActive) this.insertionProcessor.process(insertionInputL, insertionInputR, effectsLeft, effectsRight, reverbInput, chorusInput, delayInput, startIndex, sampleCount);
          this.chorusProcessor.process(chorusInput, effectsLeft, effectsRight, reverbInput, delayInput, startIndex, sampleCount);
          if (this.delayActive && this.masterParameters.midiSystem !== "xg") this.delayProcessor.process(delayInput, effectsLeft, effectsRight, reverbInput, startIndex, sampleCount);
          this.reverbProcessor.process(reverbInput, effectsLeft, effectsRight, startIndex, sampleCount);
        }
        for (const c of this.midiChannels) c.updateVoiceCount();
        this.currentTime += sampleCount * this.sampleTime;
      }
      /**
      * Gets voices for a preset.
      * @param preset The preset to get voices for.
      * @param midiNote The MIDI note to use.
      * @param velocity The velocity to use.
      * @returns Output is an array of voices.
      */
      getVoicesForPreset(preset, midiNote, velocity) {
        const cached = this.getCachedVoice(preset, midiNote, velocity);
        if (cached !== void 0) return cached;
        const voices = new Array();
        for (const voiceParams of preset.getVoiceParameters(midiNote, velocity)) {
          const sample = voiceParams.sample;
          if (voiceParams.sample.getAudioData() === void 0) {
            SpessaSynthWarn(`Discarding invalid sample: ${sample.name}`);
            continue;
          }
          voices.push(new CachedVoice(voiceParams, midiNote, velocity, this.sampleRate));
        }
        this.setCachedVoice(preset, midiNote, velocity, voices);
        return voices;
      }
      clearCache() {
        this.cachedVoices.clear();
      }
      getInsertionSnapshot() {
        return {
          type: this.insertionProcessor.type,
          params: this.insertionParams.slice(),
          channels: this.midiChannels.map((c) => c.insertionEnabled)
        };
      }
      /**
      * Copied callback so MIDI channels can call it.
      */
      callEvent(eventName, eventData) {
        this.eventCallbackHandler(eventName, eventData);
      }
      resetInsertionParams() {
        this.insertionParams.fill(255);
        this.insertionParams[20] = 40;
        this.insertionParams[21] = 0;
        this.insertionParams[22] = 0;
      }
      resetInsertion() {
        if (this.masterParameters.insertionEffectLock) return;
        this.insertionActive = false;
        this.insertionProcessor = this.insertionFallback;
        this.insertionProcessor.reset();
        this.insertionProcessor.sendLevelToReverb = 40 / 127 * EFX_SENDS_GAIN_CORRECTION;
        this.insertionProcessor.sendLevelToChorus = 0;
        this.insertionProcessor.sendLevelToDelay = 0;
        this.resetInsertionParams();
        this.callEvent("effectChange", {
          effect: "insertion",
          parameter: 0,
          value: this.insertionProcessor.type
        });
      }
      /**
      * @param volume {number} 0 to 1
      */
      setMIDIVolume(volume) {
        this.midiVolume = Math.pow(volume, Math.E);
      }
      /**
      * Sets the synth's primary tuning.
      * @param cents
      */
      setMasterTuning(cents) {
        cents = Math.round(cents);
        for (const channel of this.midiChannels) channel.setCustomController(customControllers.masterTuning, cents);
      }
      setReverbMacro(macro) {
        if (this.masterParameters.reverbLock) return;
        const rev = this.reverbProcessor;
        rev.level = 64;
        rev.preDelayTime = 0;
        rev.character = macro;
        switch (macro) {
          /**
          * REVERB MACRO is a macro parameter that allows global setting of reverb parameters.
          * When you select the reverb type with REVERB MACRO, each reverb parameter will be set to their most
          * suitable value.
          *
          * Room1, Room2, Room3
          * These reverbs simulate the reverberation of a room. They provide a well-defined
          * spacious reverberation.
          * Hall1, Hall2
          * These reverbs simulate the reverberation of a concert hall. They provide a deeper
          * reverberation than the Room reverbs.
          * Plate
          * This simulates a plate reverb (a studio device using a metal plate).
          * Delay
          * This is a conventional delay that produces echo effects.
          * Panning Delay
          * This is a special delay in which the delayed sounds move left and right.
          * It is effective when you are listening in stereo.
          */
          case 0:
            rev.character = 0;
            rev.preLowpass = 3;
            rev.time = 80;
            rev.delayFeedback = 0;
            rev.preDelayTime = 0;
            break;
          case 1:
            rev.preLowpass = 4;
            rev.time = 56;
            rev.delayFeedback = 0;
            break;
          case 2:
            rev.preLowpass = 0;
            rev.time = 72;
            rev.delayFeedback = 0;
            break;
          case 3:
            rev.preLowpass = 4;
            rev.time = 72;
            rev.delayFeedback = 0;
            break;
          case 4:
            rev.preLowpass = 0;
            rev.time = 64;
            rev.delayFeedback = 0;
            break;
          case 5:
            rev.preLowpass = 0;
            rev.time = 88;
            rev.delayFeedback = 0;
            break;
          case 6:
            rev.preLowpass = 0;
            rev.time = 32;
            rev.delayFeedback = 40;
            break;
          case 7:
            rev.preLowpass = 0;
            rev.time = 64;
            rev.delayFeedback = 32;
            break;
          default:
            SpessaSynthWarn(`Invalid reverb macro: ${macro}`);
            return;
        }
        this.callEvent("effectChange", {
          effect: "reverb",
          parameter: "macro",
          value: macro
        });
      }
      setChorusMacro(macro) {
        if (this.masterParameters.chorusLock) return;
        const chr = this.chorusProcessor;
        chr.level = 64;
        chr.preLowpass = 0;
        chr.delay = 127;
        chr.sendLevelToDelay = 0;
        chr.sendLevelToReverb = 0;
        switch (macro) {
          /**
          * CHORUS MACRO is a macro parameter that allows global setting of chorus parameters.
          * When you select the chorus type with CHORUS MACRO, each chorus parameter will be set to their
          * most suitable value.
          *
          * Chorus1, Chorus2, Chorus3, Chorus4
          * These are conventional chorus effects that add spaciousness and depth to the
          * sound.
          * Feedback Chorus
          * This is a chorus with a flanger-like effect and a soft sound.
          * Flanger
          * This is an effect sounding somewhat like a jet airplane taking off and landing.
          * Short Delay
          * This is a delay with a short delay time.
          * Short Delay (FB)
          * This is a short delay with many repeats.
          */
          case 0:
            chr.feedback = 0;
            chr.delay = 112;
            chr.rate = 3;
            chr.depth = 5;
            break;
          case 1:
            chr.feedback = 5;
            chr.delay = 80;
            chr.rate = 9;
            chr.depth = 19;
            break;
          case 2:
            chr.feedback = 8;
            chr.delay = 80;
            chr.rate = 3;
            chr.depth = 19;
            break;
          case 3:
            chr.feedback = 16;
            chr.delay = 64;
            chr.rate = 9;
            chr.depth = 16;
            break;
          case 4:
            chr.feedback = 64;
            chr.delay = 127;
            chr.rate = 2;
            chr.depth = 24;
            break;
          case 5:
            chr.feedback = 112;
            chr.delay = 127;
            chr.rate = 1;
            chr.depth = 5;
            break;
          case 6:
            chr.feedback = 0;
            chr.depth = 127;
            chr.rate = 0;
            chr.depth = 127;
            break;
          case 7:
            chr.feedback = 80;
            chr.depth = 127;
            chr.rate = 0;
            chr.depth = 127;
            break;
          default:
            SpessaSynthWarn(`Invalid chorus macro: ${macro}`);
            return;
        }
        this.callEvent("effectChange", {
          effect: "chorus",
          parameter: "macro",
          value: macro
        });
      }
      setDelayMacro(macro) {
        if (this.masterParameters.delayLock) return;
        const dly = this.delayProcessor;
        dly.level = 64;
        dly.preLowpass = 0;
        dly.sendLevelToReverb = 0;
        dly.levelRight = dly.levelLeft = 0;
        dly.levelCenter = 127;
        switch (macro) {
          /**
          * DELAY MACRO is a macro parameter that allows global setting of delay parameters. When you select the delay type with DELAY MACRO, each delay parameter will be set to their most
          * suitable value.
          *
          * Delay1, Delay2, Delay3
          * These are conventional delays. 1, 2 and 3 have progressively longer delay times.
          * Delay4
          * This is a delay with a rather short delay time.
          * Pan Delay1. Pan Delay2. Pan Delay3
          * The delay sound moves between left and right. This is effective when listening in
          * stereo. 1, 2 and 3 have progressively longer delay times.
          * Pan Delay4
          * This is a rather short delay with the delayed sound moving between left and
          * right.
          * It is effective when listening in stereo.
          * Dly To Rev
          * Reverb is added to the delay sound, which moves between left and right.
          * It is effective when listening in stereo.
          * PanRepeat
          * The delay sound moves between left and right,
          * but the pan positioning is different from the effects listed above.
          * It is effective when listening in stereo.
          */
          case 0:
            dly.timeCenter = 97;
            dly.timeRatioRight = dly.timeRatioLeft = 1;
            dly.feedback = 80;
            break;
          case 1:
            dly.timeCenter = 106;
            dly.timeRatioRight = dly.timeRatioLeft = 1;
            dly.feedback = 80;
            break;
          case 2:
            dly.timeCenter = 115;
            dly.timeRatioRight = dly.timeRatioLeft = 1;
            dly.feedback = 72;
            break;
          case 3:
            dly.timeCenter = 83;
            dly.timeRatioRight = dly.timeRatioLeft = 1;
            dly.feedback = 72;
            break;
          case 4:
            dly.timeCenter = 105;
            dly.timeRatioLeft = 12;
            dly.timeRatioRight = 24;
            dly.levelCenter = 0;
            dly.levelLeft = 125;
            dly.levelRight = 60;
            dly.feedback = 74;
            break;
          case 5:
            dly.timeCenter = 109;
            dly.timeRatioLeft = 12;
            dly.timeRatioRight = 24;
            dly.levelCenter = 0;
            dly.levelLeft = 125;
            dly.levelRight = 60;
            dly.feedback = 71;
            break;
          case 6:
            dly.timeCenter = 115;
            dly.timeRatioLeft = 12;
            dly.timeRatioRight = 24;
            dly.levelCenter = 0;
            dly.levelLeft = 120;
            dly.levelRight = 64;
            dly.feedback = 73;
            break;
          case 7:
            dly.timeCenter = 93;
            dly.timeRatioLeft = 12;
            dly.timeRatioRight = 24;
            dly.levelCenter = 0;
            dly.levelLeft = 120;
            dly.levelRight = 64;
            dly.feedback = 72;
            break;
          case 8:
            dly.timeCenter = 109;
            dly.timeRatioLeft = 12;
            dly.timeRatioRight = 24;
            dly.levelCenter = 0;
            dly.levelLeft = 114;
            dly.levelRight = 60;
            dly.feedback = 61;
            dly.sendLevelToReverb = 36;
            break;
          case 9:
            dly.timeCenter = 110;
            dly.timeRatioLeft = 21;
            dly.timeRatioRight = 32;
            dly.levelCenter = 97;
            dly.levelLeft = 127;
            dly.levelRight = 67;
            dly.feedback = 40;
            break;
          default:
            SpessaSynthWarn(`Invalid delay macro: ${macro}`);
            return;
        }
        this.callEvent("effectChange", {
          effect: "delay",
          parameter: "macro",
          value: macro
        });
      }
      getCachedVoice(patch, midiNote, velocity) {
        return this.cachedVoices.get(this.getCachedVoiceIndex(patch, midiNote, velocity));
      }
      setCachedVoice(patch, midiNote, velocity, voices) {
        this.cachedVoices.set(this.getCachedVoiceIndex(patch, midiNote, velocity), voices);
      }
      registerInsertionProcessor(proc) {
        const p = new proc(this.sampleRate, this.maxBufferSize);
        this.insertionEffects.set(p.type, p);
      }
      processMessageInternal(message, channelOffset) {
        const statusByteData = getEvent(message[0]);
        const channelNumber = statusByteData.channel + channelOffset;
        switch (statusByteData.status) {
          case midiMessageTypes.noteOn: {
            const velocity = message[2];
            if (velocity > 0) this.noteOn(channelNumber, message[1], velocity);
            else this.noteOff(channelNumber, message[1]);
            break;
          }
          case midiMessageTypes.noteOff:
            this.noteOff(channelNumber, message[1]);
            break;
          case midiMessageTypes.pitchWheel:
            this.pitchWheel(channelNumber, message[2] << 7 | message[1]);
            break;
          case midiMessageTypes.controllerChange:
            this.controllerChange(channelNumber, message[1], message[2]);
            break;
          case midiMessageTypes.programChange:
            this.programChange(channelNumber, message[1]);
            break;
          case midiMessageTypes.polyPressure:
            this.polyPressure(channelNumber, message[1], message[2]);
            break;
          case midiMessageTypes.channelPressure:
            this.channelPressure(channelNumber, message[1]);
            break;
          case midiMessageTypes.systemExclusive:
            this.systemExclusive(new IndexedByteArray(message.slice(1)), channelOffset);
            break;
          case midiMessageTypes.reset:
            this.stopAllChannels(false);
            this.resetAllControllers();
            break;
          default: break;
        }
      }
      /**
      * Assigns priorities to the voices.
      * Gets the priority of a voice based on its channel and state.
      * Higher priority means the voice is more important and should be kept longer.
      */
      assignVoicePriorities() {
        if (this.lastPriorityAssignmentTime === this.currentTime) return;
        SpessaSynthInfo("%cPolyphony exceeded, stealing voices", consoleColors.warn);
        this.lastPriorityAssignmentTime = this.currentTime;
        const cap = this.masterParameters.voiceCap;
        for (let i = 0; i < cap; i++) {
          const voice = this.voices[i];
          voice.priority = 0;
          if (this.midiChannels[voice.channel].drumChannel) voice.priority += 5;
          if (voice.isInRelease) voice.priority -= 5;
          voice.priority += voice.velocity / 25;
          voice.priority -= voice.volEnv.state;
          if (voice.isInRelease) voice.priority -= 5;
          voice.priority -= voice.volEnv.attenuationCb / 200;
        }
      }
      updatePresetList() {
        const mainFont = this.soundBankManager.presetList;
        this.clearCache();
        this.callEvent("presetListChange", mainFont);
        this.getDefaultPresets();
        for (const c of this.midiChannels) c.setPresetLock(false);
        this.resetAllControllers();
      }
      getDefaultPresets() {
        this.defaultPreset = this.soundBankManager.getPreset({
          bankLSB: 0,
          bankMSB: 0,
          program: 0,
          isGMGSDrum: false
        }, "xg");
        this.drumPreset = this.soundBankManager.getPreset({
          bankLSB: 0,
          bankMSB: 0,
          program: 0,
          isGMGSDrum: true
        }, "gs");
      }
      getCachedVoiceIndex(patch, midiNote, velocity) {
        let bankMSB = patch.bankMSB;
        let bankLSB = patch.bankLSB;
        const { isGMGSDrum, program } = patch;
        if (isGMGSDrum) {
          bankMSB = 128;
          bankLSB = 0;
        }
        return bankMSB + bankLSB * 128 + program * 16384 + 2097152 * midiNote + 268435456 * velocity;
      }
    };
    //#endregion
    //#region src/synthesizer/processor.ts
    /**
    * Processor.ts
    * purpose: the core synthesis engine
    */
    var SpessaSynthProcessor = class {
      /**
      * Controls if the processor is fully initialized.
      */
      processorInitialized = stb.isInitialized;
      /**
      * Sample rate in Hertz.
      */
      sampleRate;
      /**
      * Calls when an event occurs.
      * @param event The event that occurred.
      */
      onEventCall;
      /**
      * Renders float32 audio data to stereo outputs; buffer size must be equal or smaller than `maxBufferSize`.
      * All float arrays must have the same length.
      * @param left the left output channel.
      * @param right the right output channel.
      * @param startIndex start offset of the passed arrays, rendering starts at this index, defaults to 0.
      * @param sampleCount the length of the rendered buffer, defaults to float32array length - startOffset.
      */
      process;
      /**
      * Renders float32 audio data to stereo outputs; buffer size must be equal or smaller than `maxBufferSize`.
      * All float arrays must have the same length.
      * @param outputs any number stereo pairs (L, R) to render channels separately into.
      * @param effectsLeft the left stereo effect output buffer.
      * @param effectsRight the left stereo effect output buffer.
      * @param startIndex start offset of the passed arrays, rendering starts at this index, defaults to 0.
      * @param sampleCount the length of the rendered buffer, defaults to float32array length - startOffset.
      */
      processSplit;
      /**
      * Executes a system exclusive message for the synthesizer.
      * @param syx The system exclusive message as an array of bytes.
      * @param channelOffset The channel offset to apply (default is 0).
      */
      systemExclusive;
      /**
      * Executes a MIDI controller change message on the specified channel.
      * @param channel The MIDI channel to change the controller on.
      * @param controllerNumber The MIDI controller number to change.
      * @param controllerValue The value to set the controller to.
      */
      controllerChange;
      /**
      * Executes a MIDI Note-on message on the specified channel.
      * @param channel The MIDI channel to send the note on.
      * @param midiNote The MIDI note number to play.
      * @param velocity The velocity of the note, from 0 to 127.
      * @remarks
      * If the velocity is 0, it will be treated as a Note-off message.
      */
      noteOn;
      /**
      * Executes a MIDI Note-off message on the specified channel.
      * @param channel The MIDI channel to send the note off.
      * @param midiNote The MIDI note number to stop playing.
      */
      noteOff;
      /**
      * Executes a MIDI Poly Pressure (Aftertouch) message on the specified channel.
      * @param channel The MIDI channel to send the poly pressure on.
      * @param midiNote The MIDI note number to apply the pressure to.
      * @param pressure The pressure value, from 0 to 127.
      */
      polyPressure;
      /**
      * Executes a MIDI Channel Pressure (Aftertouch) message on the specified channel.
      * @param channel The MIDI channel to send the channel pressure on.
      * @param pressure The pressure value, from 0 to 127.
      */
      channelPressure;
      /**
      * Executes a MIDI Pitch Wheel message on the specified channel.
      * @param channel The MIDI channel to send the pitch wheel on.
      * @param pitch The new pitch value: 0-16384
      * @param midiNote The MIDI note number (optional), pass -1 for the regular pitch wheel.
      */
      pitchWheel;
      /**
      * Executes a MIDI Program Change message on the specified channel.
      * @param channel The MIDI channel to send the program change on.
      * @param programNumber The program number to change to, from 0 to 127.
      */
      programChange;
      /**
      * Processes a raw MIDI message.
      * @param message The message to process.
      * @param channelOffset The channel offset for the message.
      * @param options Additional options for scheduling the message.
      */
      processMessage;
      /**
      * Core synthesis engine.
      */
      synthCore;
      /**
      * Tor applying the snapshot after an override sound bank too.
      */
      savedSnapshot;
      /**
      * Creates a new synthesizer engine.
      * @param sampleRate sample rate, in Hertz.
      * @param opts the processor's options.
      */
      constructor(sampleRate, opts = {}) {
        const options = fillWithDefaults(opts, DEFAULT_SYNTH_OPTIONS);
        this.sampleRate = sampleRate;
        if (!Number.isFinite(options.initialTime) || !Number.isFinite(sampleRate)) throw new TypeError(`Initial time or sample rate is invalid! initial time: ${options.initialTime}, sample rate: ${sampleRate}`);
        this.synthCore = new SynthesizerCore(this.callEvent.bind(this), this.missingPreset.bind(this), this.sampleRate, options);
        const c = this.synthCore;
        this.process = c.process.bind(c);
        this.processSplit = c.processSplit.bind(c);
        this.systemExclusive = c.systemExclusive.bind(c);
        this.controllerChange = c.controllerChange.bind(c);
        this.noteOn = c.noteOn.bind(c);
        this.noteOff = c.noteOff.bind(c);
        this.polyPressure = c.polyPressure.bind(c);
        this.channelPressure = c.channelPressure.bind(c);
        this.pitchWheel = c.pitchWheel.bind(c);
        this.programChange = c.programChange.bind(c);
        this.processMessage = c.processMessage.bind(c);
        for (let i = 0; i < 16; i++) this.synthCore.createMIDIChannel(false);
        this.processorInitialized.then(() => {
          SpessaSynthInfo("%cSpessaSynth is ready!", consoleColors.recognized);
        });
      }
      /**
      * Are the chorus and reverb effects enabled?
      */
      get enableEffects() {
        return this.synthCore.enableEffects;
      }
      /**
      * Are the chorus and reverb effects enabled?
      */
      set enableEffects(v) {
        this.synthCore.enableEffects = v;
      }
      /**
      * Is the event system enabled?
      */
      get enableEventSystem() {
        return this.synthCore.enableEventSystem;
      }
      /**
      * Is the event system enabled?
      */
      set enableEventSystem(v) {
        this.synthCore.enableEventSystem = v;
      }
      /**
      * All MIDI channels of the synthesizer.
      */
      get midiChannels() {
        return this.synthCore.midiChannels;
      }
      /**
      * Current total amount of voices that are currently playing.
      */
      get totalVoicesAmount() {
        return this.synthCore.voiceCount;
      }
      /**
      * The current time of the synthesizer, in seconds. You probably should not modify this directly.
      */
      get currentSynthTime() {
        return this.synthCore.currentTime;
      }
      /**
      * Synthesizer's reverb processor.
      */
      get reverbProcessor() {
        return this.synthCore.reverbProcessor;
      }
      /**
      * Synthesizer's chorus processor.
      */
      get chorusProcessor() {
        return this.synthCore.chorusProcessor;
      }
      /**
      * Synthesizer's delay processor.
      */
      get delayProcessor() {
        return this.synthCore.delayProcessor;
      }
      /**
      * The sound bank manager, which manages all sound banks and presets.
      */
      get soundBankManager() {
        return this.synthCore.soundBankManager;
      }
      /**
      * Handles the custom key overrides: velocity and preset
      */
      get keyModifierManager() {
        return this.synthCore.keyModifierManager;
      }
      /**
      * Renders float32 audio data to stereo outputs; buffer size of 128 is recommended.
      * All float arrays must have the same length.
      * @param outputs output stereo channels (L, R).
      * @param reverb unused legacy parameter.
      * @param chorus unused legacy parameter.
      * @param startIndex start offset of the passed arrays, rendering starts at this index, defaults to 0.
      * @param sampleCount the length of the rendered buffer, defaults to float32array length - startOffset.
      * @deprecated use process() as the effects are now integrated.
      */
      renderAudio(outputs, reverb, chorus, startIndex = 0, sampleCount = 0) {
        const maxBuff = this.synthCore.maxBufferSize;
        if (sampleCount > maxBuff) {
          let samples = 0;
          while (samples < sampleCount) {
            const blockSize = Math.min(maxBuff, sampleCount - samples);
            this.synthCore.process(outputs[0], outputs[1], startIndex + samples, blockSize);
            samples += blockSize;
          }
        } else this.synthCore.process(outputs[0], outputs[1], startIndex, sampleCount);
      }
      /**
      * Renders the float32 audio data of each channel, routing effects to external outputs.
      * Buffer size of 128 is recommended.
      * All float arrays must have the same length.
      * @param reverbChannels unused legacy parameter.
      * @param chorusChannels unused legacy parameter.
      * @param separateChannels a total of 16 stereo pairs (L, R) for each MIDI channel.
      * @param startIndex start offset of the passed arrays, rendering starts at this index, defaults to 0.
      * @param sampleCount the length of the rendered buffer, defaults to float32array length - startOffset.
      * @deprecated use processSplit() as the effects are now integrated.
      */
      renderAudioSplit(reverbChannels, chorusChannels, separateChannels, startIndex = 0, sampleCount = 0) {
        const maxBuff = this.synthCore.maxBufferSize;
        if (sampleCount > maxBuff) {
          let samples = 0;
          while (samples < sampleCount) {
            const blockSize = Math.min(maxBuff, sampleCount - samples);
            this.synthCore.processSplit(separateChannels, reverbChannels[0], reverbChannels[1], startIndex + samples, blockSize);
            samples += blockSize;
          }
        } else this.synthCore.processSplit(separateChannels, reverbChannels[0], reverbChannels[1], startIndex, sampleCount);
      }
      /**
      * A handler for missing presets during program change. By default, it warns to console.
      * @param patch The MIDI patch that was requested.
      * @param system The MIDI System for the request.
      * @returns If a BasicPreset instance is returned, it will be used by the channel.
      */
      onMissingPreset = (patch, system) => {
        SpessaSynthWarn(`No preset found for ${MIDIPatchTools.toMIDIString(patch)}! Did you forget to add a sound bank?`);
      };
      /**
      * Sets a master parameter of the synthesizer.
      * @param type The type of the master parameter to set.
      * @param value The value to set for the master parameter.
      */
      setMasterParameter(type, value) {
        this.synthCore.setMasterParameter(type, value);
      }
      /**
      * Gets a master parameter of the synthesizer.
      * @param type The type of the master parameter to get.
      * @returns The value of the master parameter.
      */
      getMasterParameter(type) {
        return this.synthCore.getMasterParameter(type);
      }
      /**
      * Gets all master parameters of the synthesizer.
      * @returns All the master parameters.
      */
      getAllMasterParameters() {
        return this.synthCore.getAllMasterParameters();
      }
      /**
      * Executes a full system reset of all controllers.
      * This will reset all controllers to their default values,
      * except for the locked controllers.
      */
      resetAllControllers(system = "gs") {
        this.synthCore.resetAllControllers(system);
      }
      /**
      * Applies the snapshot to the synth
      */
      applySynthesizerSnapshot(snapshot) {
        this.savedSnapshot = snapshot;
        snapshot.apply(this);
        SpessaSynthInfo("%cFinished applying snapshot!", consoleColors.info);
        this.resetAllControllers();
      }
      /**
      * Gets a synthesizer snapshot from this processor instance.
      */
      getSnapshot() {
        return SynthesizerSnapshot.create(this);
      }
      /**
      * @internal
      */
      getInsertionSnapshot() {
        return this.synthCore.getInsertionSnapshot();
      }
      /**
      * Sets the embedded sound bank.
      * @param bank The sound bank file to set.
      * @param offset The bank offset of the embedded sound bank.
      */
      setEmbeddedSoundBank(bank, offset) {
        const loadedFont = SoundBankLoader.fromArrayBuffer(bank);
        this.synthCore.soundBankManager.addSoundBank(loadedFont, EMBEDDED_SOUND_BANK_ID, offset);
        const order = this.synthCore.soundBankManager.priorityOrder;
        order.pop();
        order.unshift(EMBEDDED_SOUND_BANK_ID);
        this.synthCore.soundBankManager.priorityOrder = order;
        if (this.savedSnapshot !== void 0) this.applySynthesizerSnapshot(this.savedSnapshot);
        SpessaSynthInfo(`%cEmbedded sound bank set at offset %c${offset}`, consoleColors.recognized, consoleColors.value);
      }
      clearEmbeddedBank() {
        if (this.synthCore.soundBankManager.soundBankList.some((s) => s.id === EMBEDDED_SOUND_BANK_ID)) this.synthCore.soundBankManager.deleteSoundBank(EMBEDDED_SOUND_BANK_ID);
      }
      createMIDIChannel() {
        this.synthCore.createMIDIChannel(true);
      }
      /**
      * Stops all notes on all channels.
      * @param force if true, all notes are stopped immediately, otherwise they are stopped gracefully.
      */
      stopAllChannels(force = false) {
        this.synthCore.stopAllChannels(force);
      }
      /**
      *  Destroy the synthesizer processor, clearing all channels and voices.
      *  This is irreversible, so use with caution.
      */
      destroySynthProcessor() {
        this.synthCore.destroySynthProcessor();
      }
      /**
      * DEPRECATED, does nothing!
      * @param amount
      * @deprecated
      */
      killVoices(amount) {
        SpessaSynthWarn(`killVoices is deprecated, don't use it! Amount requested: ${amount}`);
      }
      /**
      * Clears the synthesizer's voice cache.
      */
      clearCache() {
        this.synthCore.clearCache();
      }
      /**
      * Gets voices for a preset.
      * @param preset The preset to get voices for.
      * @param midiNote The MIDI note to use.
      * @param velocity The velocity to use.
      * @returns Output is an array of voices.
      * @remarks
      * This is a public method, but it is only intended to be used by the sequencer.
      * @internal
      */
      getVoicesForPreset(preset, midiNote, velocity) {
        return this.synthCore.getVoicesForPreset(preset, midiNote, velocity);
      }
      /**
      * Calls synth event
      * @param eventName the event name
      * @param eventData the event data
      */
      callEvent(eventName, eventData) {
        this.onEventCall?.({
          type: eventName,
          data: eventData
        });
      }
      missingPreset(patch, system) {
        return this.onMissingPreset(patch, system);
      }
    };
    //#endregion
    return { ALL_CHANNELS_OR_DIFFERENT_ACTION, BasicGlobalZone, BasicInstrument, BasicInstrumentZone, BasicMIDI, BasicPreset, BasicPresetZone, BasicSample, BasicSoundBank, BasicZone, CONTROLLER_TABLE_SIZE, CUSTOM_CONTROLLER_TABLE_SIZE, ChannelSnapshot, DEFAULT_MASTER_PARAMETERS, DEFAULT_PERCUSSION, DEFAULT_WAV_WRITE_OPTIONS, DLSLoopTypes, EmptySample, GENERATORS_AMOUNT, Generator, IndexedByteArray, KeyModifier, MAX_GENERATOR, MIDIBuilder, MIDIMessage, MIDIPatchTools, MIDITrack, Modulator, ModulatorSource, NON_CC_INDEX_OFFSET, SoundBankLoader, SpessaSynthCoreUtils, SpessaSynthLogging, SpessaSynthProcessor, SpessaSynthSequencer, SynthesizerSnapshot, audioToWav, customControllers, customResetArray, dataEntryStates, defaultGeneratorValues, defaultMIDIControllerValues, dlsDestinations, dlsSources, drumReverbResetArray, generatorLimits, generatorTypes, interpolationTypes, midiControllers, midiMessageTypes, modulatorCurveTypes, modulatorSources, modulatorTransformTypes, sampleTypes, setResetValue };

  //# sourceMappingURL=index.js.map
  })();

  var SpessaSynth_lib = (() => {
    var { ALL_CHANNELS_OR_DIFFERENT_ACTION, BasicMIDI, BasicSoundBank, DEFAULT_MASTER_PARAMETERS, DEFAULT_PERCUSSION, KeyModifier, MIDITrack, SoundBankLoader, SpessaSynthCoreUtils, SpessaSynthLogging, SpessaSynthProcessor, SpessaSynthSequencer, SynthesizerSnapshot, audioToWav, midiControllers, midiMessageTypes } = SpessaSynth_core;
    var LibSynthesizerSnapshot = SpessaSynth_core.SynthesizerSnapshot;

    //#region src/synthesizer/basic/synth_config.ts
    const DEFAULT_SYNTH_CONFIG = {
      enableEventSystem: true,
      oneOutput: false,
      audioNodeCreators: void 0
    };
    //#endregion
    //#region src/synthesizer/worklet/worklet_processor_name.ts
    const WORKLET_PROCESSOR_NAME = "spessasynth-worklet-processor";
    //#endregion
    //#region src/utils/fill_with_defaults.ts
    /**
    * Fills the object with default values.
    * @param obj object to fill.
    * @param defObj object to fill with.
    */
    function fillWithDefaults(obj, defObj) {
      return {
        ...defObj,
        ...obj
      };
    }
    //#endregion
    //#region src/synthesizer/basic/key_modifier_manager.ts
    var WorkletKeyModifierManagerWrapper = class {
      keyModifiers = [];
      synth;
      constructor(synth) {
        this.synth = synth;
      }
      /**
      * Modifies a single key.
      * @param channel The channel affected. Usually 0-15.
      * @param midiNote The MIDI note to change. 0-127.
      * @param options The key's modifiers.
      */
      addModifier(channel, midiNote, options) {
        const mod = new KeyModifier();
        mod.gain = options?.gain ?? 1;
        mod.velocity = options?.velocity ?? -1;
        mod.patch = fillWithDefaults(options.patch ?? {}, {
          isGMGSDrum: false,
          bankLSB: -1,
          bankMSB: -1,
          program: -1
        });
        this.keyModifiers[channel] ??= [];
        this.keyModifiers[channel][midiNote] = mod;
        this.sendToWorklet("addMapping", {
          channel,
          midiNote,
          mapping: mod
        });
      }
      /**
      * Gets a key modifier.
      * @param channel The channel affected. Usually 0-15.
      * @param midiNote The MIDI note to change. 0-127.
      * @returns The key modifier if it exists.
      */
      getModifier(channel, midiNote) {
        return this.keyModifiers?.[channel]?.[midiNote];
      }
      /**
      * Deletes a key modifier.
      * @param channel The channel affected. Usually 0-15.
      * @param midiNote The MIDI note to change. 0-127.
      */
      deleteModifier(channel, midiNote) {
        this.sendToWorklet("deleteMapping", {
          channel,
          midiNote
        });
        if (this.keyModifiers[channel]?.[midiNote] === void 0) return;
        this.keyModifiers[channel][midiNote] = void 0;
      }
      /**
      * Clears ALL Modifiers
      */
      clearModifiers() {
        this.sendToWorklet("clearMappings", null);
        this.keyModifiers = [];
      }
      sendToWorklet(type, data) {
        const msg = {
          type,
          data
        };
        this.synth.post({
          type: "keyModifierManager",
          channelNumber: -1,
          data: msg
        });
      }
    };
    //#endregion
    //#region src/synthesizer/basic/sound_bank_manager.ts
    var SoundBankManager = class {
      /**
      * All the sound banks, ordered from the most important to the least.
      */
      soundBankList;
      synth;
      /**
      * Creates a new instance of the sound bank manager.
      */
      constructor(synth) {
        this.soundBankList = [];
        this.synth = synth;
      }
      /**
      * The current sound bank priority order.
      * @returns The IDs of the sound banks in the current order.
      */
      get priorityOrder() {
        return this.soundBankList.map((s) => s.id);
      }
      /**
      * Rearranges the sound banks in a given order.
      * @param newList The order of sound banks, a list of identifiers, first overwrites second.
      */
      set priorityOrder(newList) {
        this.sendToWorklet("rearrangeSoundBanks", newList);
        this.soundBankList.sort((a, b) => newList.indexOf(a.id) - newList.indexOf(b.id));
      }
      /**
      * Adds a new sound bank buffer with a given ID.
      * @param soundBankBuffer The sound bank's buffer
      * @param id The sound bank's unique identifier.
      * @param bankOffset The sound bank's bank offset. Default is 0.
      */
      async addSoundBank(soundBankBuffer, id, bankOffset = 0) {
        this.sendToWorklet("addSoundBank", {
          soundBankBuffer,
          bankOffset,
          id
        }, [soundBankBuffer]);
        await this.awaitResponse();
        const found = this.soundBankList.find((s) => s.id === id);
        if (found === void 0) this.soundBankList.push({
          id,
          bankOffset
        });
        else found.bankOffset = bankOffset;
      }
      /**
      * Deletes a sound bank with the given ID.
      * @param id The sound bank to delete.
      */
      async deleteSoundBank(id) {
        if (this.soundBankList.length < 2) {
          SpessaSynthCoreUtils.SpessaSynthWarn("1 sound bank left. Aborting!");
          return;
        }
        if (!this.soundBankList.some((s) => s.id === id)) {
          SpessaSynthCoreUtils.SpessaSynthWarn(`No sound banks with id of "${id}" found. Aborting!`);
          return;
        }
        this.sendToWorklet("deleteSoundBank", id);
        this.soundBankList = this.soundBankList.filter((s) => s.id !== id);
        await this.awaitResponse();
      }
      async awaitResponse() {
        return new Promise((r) => this.synth.awaitWorkerResponse("soundBankManager", r));
      }
      sendToWorklet(type, data, transferable = []) {
        const msg = {
          type: "soundBankManager",
          channelNumber: -1,
          data: {
            type,
            data
          }
        };
        this.synth.post(msg, transferable);
      }
    };
    //#endregion
    //#region src/synthesizer/basic/synth_event_handler.ts
    var SynthEventHandler = class {
      /**
      * The time delay before an event is called.
      * Set to 0 to disable it.
      */
      timeDelay = 0;
      /**
      * The main list of events.
      * @private
      */
      events = {
        noteOff: /* @__PURE__ */ new Map(),
        noteOn: /* @__PURE__ */ new Map(),
        pitchWheel: /* @__PURE__ */ new Map(),
        controllerChange: /* @__PURE__ */ new Map(),
        programChange: /* @__PURE__ */ new Map(),
        channelPressure: /* @__PURE__ */ new Map(),
        polyPressure: /* @__PURE__ */ new Map(),
        drumChange: /* @__PURE__ */ new Map(),
        stopAll: /* @__PURE__ */ new Map(),
        newChannel: /* @__PURE__ */ new Map(),
        muteChannel: /* @__PURE__ */ new Map(),
        presetListChange: /* @__PURE__ */ new Map(),
        allControllerReset: /* @__PURE__ */ new Map(),
        soundBankError: /* @__PURE__ */ new Map(),
        synthDisplay: /* @__PURE__ */ new Map(),
        masterParameterChange: /* @__PURE__ */ new Map(),
        channelPropertyChange: /* @__PURE__ */ new Map(),
        effectChange: /* @__PURE__ */ new Map()
      };
      /**
      * Adds a new event listener.
      * @param event The event to listen to.
      * @param id The unique identifier for the event. It can be used to overwrite existing callback with the same ID.
      * @param callback The callback for the event.
      */
      addEvent(event, id, callback) {
        this.events[event].set(id, callback);
      }
      /**
      * Removes an event listener
      * @param name The event to remove a listener from.
      * @param id The unique identifier for the event to remove.
      */
      removeEvent(name, id) {
        this.events[name].delete(id);
      }
      /**
      * Calls the given event.
      * INTERNAL USE ONLY!
      * @internal
      */
      callEventInternal(name, eventData) {
        const eventList = this.events[name];
        const callback = () => {
          for (const callback of eventList.values()) try {
            callback(eventData);
          } catch (error) {
            console.error(`Error while executing an event callback for ${name}:`, error);
          }
        };
        if (this.timeDelay > 0) setTimeout(callback.bind(this), this.timeDelay * 1e3);
        else callback();
      }
    };
    //#endregion
    //#region src/utils/other.ts
    /**
    * Other.js
    * purpose: contains some useful functions that don't belong in any specific category
    */
    const consoleColors = SpessaSynthCoreUtils.consoleColors;
    //#endregion
    //#region src/synthesizer/basic/basic_synthesizer.ts
    const DEFAULT_SYNTH_METHOD_OPTIONS = { time: 0 };
    var BasicSynthesizer = class {
      /**
      * Allows managing the sound bank list.
      */
      soundBankManager = new SoundBankManager(this);
      /**
      * Allows managing key modifications.
      */
      keyModifierManager = new WorkletKeyModifierManagerWrapper(this);
      /**
      * Allows setting up custom event listeners for the synthesizer.
      */
      eventHandler = new SynthEventHandler();
      /**
      * Synthesizer's parent AudioContext instance.
      */
      context;
      /**
      * Synth's current channel properties.
      */
      channelProperties = [];
      /**
      * The current preset list.
      */
      presetList = [];
      /**
      * INTERNAL USE ONLY!
      * @internal
      * All sequencer callbacks
      */
      sequencers = new Array();
      /**
      * Resolves when the synthesizer is ready.
      */
      isReady;
      /**
      * Legacy parameter.
      * @deprecated
      */
      reverbProcessor = void 0;
      /**
      * Legacy parameter.
      * @deprecated
      */
      chorusProcessor = void 0;
      /**
      * INTERNAL USE ONLY!
      * @internal
      */
      post;
      worklet;
      /**
      * The new channels will have their audio sent to the modulated output by this constant.
      * what does that mean?
      * e.g., if outputsAmount is 16, then channel's 16 audio data will be sent to channel 0
      */
      _outputsAmount = 16;
      /**
      * The current amount of MIDI channels the synthesizer has.
      */
      channelsAmount = this._outputsAmount;
      masterParameters = { ...DEFAULT_MASTER_PARAMETERS };
      resolveMap = /* @__PURE__ */ new Map();
      renderingProgressTracker = /* @__PURE__ */ new Map();
      /**
      * Creates a new instance of a synthesizer.
      * @param worklet The AudioWorkletNode to use.
      * @param postFunction The internal post function.
      * @param config Optional configuration for the synthesizer.
      */
      constructor(worklet, postFunction, config) {
        SpessaSynthCoreUtils.SpessaSynthInfo("%cInitializing SpessaSynth synthesizer...", consoleColors.info);
        this.context = worklet.context;
        this.worklet = worklet;
        this.post = postFunction;
        this.isReady = new Promise((resolve) => this.awaitWorkerResponse("sf3Decoder", resolve));
        this.worklet.port.onmessage = (e) => this.handleMessage(e.data);
        for (let i = 0; i < this.channelsAmount; i++) this.addNewChannelInternal(false);
        this.channelProperties[DEFAULT_PERCUSSION].isDrum = true;
        this.eventHandler.addEvent("newChannel", `synth-new-channel-${Math.random()}`, () => {
          this.channelsAmount++;
        });
        this.eventHandler.addEvent("presetListChange", `synth-preset-list-change-${Math.random()}`, (e) => {
          this.presetList = [...e];
        });
        this.eventHandler.addEvent("masterParameterChange", `synth-master-parameter-change-${Math.random()}`, (e) => {
          this.masterParameters[e.parameter] = e.value;
        });
        this.eventHandler.addEvent("channelPropertyChange", `synth-channel-property-change-${Math.random()}`, (e) => {
          this.channelProperties[e.channel] = e.property;
          this._voicesAmount = this.channelProperties.reduce((sum, voices) => sum + voices.voicesAmount, 0);
        });
      }
      /**
      * Current voice amount
      */
      _voicesAmount = 0;
      /**
      * The current number of voices playing.
      */
      get voicesAmount() {
        return this._voicesAmount;
      }
      /**
      * The audioContext's current time.
      */
      get currentTime() {
        return this.context.currentTime;
      }
      /**
      * Connects from a given node.
      * @param destinationNode The node to connect to.
      */
      connect(destinationNode) {
        for (let i = 0; i < 17; i++) this.worklet.connect(destinationNode, i);
        return destinationNode;
      }
      /**
      * Disconnects from a given node.
      * @param destinationNode The node to disconnect from.
      */
      disconnect(destinationNode) {
        if (!destinationNode) {
          this.worklet.disconnect();
          return;
        }
        for (let i = 0; i < 17; i++) this.worklet.disconnect(destinationNode, i);
        return destinationNode;
      }
      /**
      * Sets the SpessaSynth's log level in the processor.
      * @param enableInfo Enable info (verbose)
      * @param enableWarning Enable warnings (unrecognized messages)
      * @param enableGroup Enable groups (to group a lot of logs)
      */
      setLogLevel(enableInfo, enableWarning, enableGroup) {
        this.post({
          channelNumber: ALL_CHANNELS_OR_DIFFERENT_ACTION,
          type: "setLogLevel",
          data: {
            enableInfo,
            enableWarning,
            enableGroup
          }
        });
      }
      /**
      * Gets a master parameter from the synthesizer.
      * @param type The parameter to get.
      * @returns The parameter value.
      */
      getMasterParameter(type) {
        return this.masterParameters[type];
      }
      /**
      * Sets a master parameter to a given value.
      * @param type The parameter to set.
      * @param value The value to set.
      */
      setMasterParameter(type, value) {
        this.masterParameters[type] = value;
        this.post({
          type: "setMasterParameter",
          channelNumber: ALL_CHANNELS_OR_DIFFERENT_ACTION,
          data: {
            type,
            data: value
          }
        });
      }
      /**
      * Gets a complete snapshot of the synthesizer, effects.
      */
      async getSnapshot() {
        return new Promise((resolve) => {
          this.awaitWorkerResponse("synthesizerSnapshot", (s) => {
            resolve(LibSynthesizerSnapshot.copyFrom(s));
          });
          this.post({
            type: "requestSynthesizerSnapshot",
            data: null,
            channelNumber: -1
          });
        });
      }
      /**
      * Adds a new channel to the synthesizer.
      */
      addNewChannel() {
        this.addNewChannelInternal(true);
      }
      /**
      * DEPRECATED, please don't use it!
      * @deprecated
      */
      setVibrato(channel, value) {}
      /**
      * Connects a given channel output to the given audio node.
      * Note that this output is only meant for visualization and may be silent when Insertion Effect for this channel is enabled.
      * @param targetNode The node to connect to.
      * @param channelNumber The channel number to connect to, will be rolled over if value is greater than 15.
      * @returns The target node.
      */
      connectChannel(targetNode, channelNumber) {
        this.worklet.connect(targetNode, channelNumber % 16 + 1);
        return targetNode;
      }
      /**
      * Disconnects a given channel output to the given audio node.
      * @param targetNode The node to disconnect from.
      * @param channelNumber The channel number to connect to, will be rolled over if value is greater than 15.
      */
      disconnectChannel(targetNode, channelNumber) {
        this.worklet.disconnect(targetNode, channelNumber % 16 + 1);
      }
      /**
      * Connects the individual audio outputs to the given audio nodes.
      * Note that these outputs is only meant for visualization and may be silent when Insertion Effect for this channel is enabled.
      * @param audioNodes Exactly 16 outputs.
      */
      connectIndividualOutputs(audioNodes) {
        if (audioNodes.length !== this._outputsAmount) throw new Error(`input nodes amount differs from the system's outputs amount!
                Expected ${this._outputsAmount} got ${audioNodes.length}`);
        for (let channel = 0; channel < this._outputsAmount; channel++) this.connectChannel(audioNodes[channel], channel);
      }
      /**
      * Disconnects the individual audio outputs from the given audio nodes.
      * @param audioNodes Exactly 16 outputs.
      */
      disconnectIndividualOutputs(audioNodes) {
        if (audioNodes.length !== this._outputsAmount) throw new Error(`input nodes amount differs from the system's outputs amount!
                Expected ${this._outputsAmount} got ${audioNodes.length}`);
        for (let channel = 0; channel < this._outputsAmount; channel++) this.disconnectChannel(audioNodes[channel], channel);
      }
      /**
      * Disables the GS NRPN parameters like vibrato or drum key tuning.
      * @deprecated Deprecated! Please use master parameters
      */
      disableGSNPRNParams() {
        this.setMasterParameter("nprnParamLock", true);
      }
      /**
      * Sends a raw MIDI message to the synthesizer.
      * @param message the midi message, each number is a byte.
      * @param channelOffset the channel offset of the message.
      * @param eventOptions additional options for this command.
      */
      sendMessage(message, channelOffset = 0, eventOptions = DEFAULT_SYNTH_METHOD_OPTIONS) {
        this._sendInternal(message, channelOffset, eventOptions);
      }
      /**
      * Starts playing a note
      * @param channel Usually 0-15: the channel to play the note.
      * @param midiNote 0-127 the key number of the note.
      * @param velocity 0-127 the velocity of the note (generally controls loudness).
      * @param eventOptions Additional options for this command.
      */
      noteOn(channel, midiNote, velocity, eventOptions = DEFAULT_SYNTH_METHOD_OPTIONS) {
        const ch = channel % 16;
        const offset = channel - ch;
        midiNote %= 128;
        velocity %= 128;
        this.sendMessage([
          midiMessageTypes.noteOn | ch,
          midiNote,
          velocity
        ], offset, eventOptions);
      }
      /**
      * Stops playing a note.
      * @param channel Usually 0-15: the channel of the note.
      * @param midiNote {number} 0-127 the key number of the note.
      * @param eventOptions Additional options for this command.
      */
      noteOff(channel, midiNote, eventOptions = DEFAULT_SYNTH_METHOD_OPTIONS) {
        midiNote %= 128;
        const ch = channel % 16;
        const offset = channel - ch;
        this._sendInternal([midiMessageTypes.noteOff | ch, midiNote], offset, eventOptions);
      }
      /**
      * Stops all notes.
      * @param force If the notes should immediately be stopped, defaults to false.
      */
      stopAll(force = false) {
        this.post({
          channelNumber: ALL_CHANNELS_OR_DIFFERENT_ACTION,
          type: "stopAll",
          data: force ? 1 : 0
        });
      }
      /**
      * Changes the given controller
      * @param channel Usually 0-15: the channel to change the controller.
      * @param controllerNumber 0-127 the MIDI CC number.
      * @param controllerValue 0-127 the controller value.
      * @param eventOptions Additional options for this command.
      */
      controllerChange(channel, controllerNumber, controllerValue, eventOptions = DEFAULT_SYNTH_METHOD_OPTIONS) {
        if (controllerNumber > 127 || controllerNumber < 0) throw new Error(`Invalid controller number: ${controllerNumber}`);
        controllerValue = Math.floor(controllerValue) % 128;
        controllerNumber = Math.floor(controllerNumber) % 128;
        const ch = channel % 16;
        const offset = channel - ch;
        this._sendInternal([
          midiMessageTypes.controllerChange | ch,
          controllerNumber,
          controllerValue
        ], offset, eventOptions);
      }
      /**
      * Resets all controllers (for every channel)
      */
      resetControllers() {
        this.post({
          channelNumber: ALL_CHANNELS_OR_DIFFERENT_ACTION,
          type: "ccReset",
          data: null
        });
      }
      /**
      * Causes the given midi channel to ignore controller messages for the given controller number.
      * @param channel Usually 0-15: the channel to lock.
      * @param controllerNumber 0-127 MIDI CC number.
      * @param isLocked True if locked, false if unlocked.
      * @remarks
      *  Controller number -1 locks the preset.
      */
      lockController(channel, controllerNumber, isLocked) {
        this.post({
          channelNumber: channel,
          type: "lockController",
          data: {
            controllerNumber,
            isLocked
          }
        });
      }
      /**
      * Applies pressure to a given channel.
      * @param channel Usually 0-15: the channel to change the controller.
      * @param pressure 0-127: the pressure to apply.
      * @param eventOptions Additional options for this command.
      */
      channelPressure(channel, pressure, eventOptions = DEFAULT_SYNTH_METHOD_OPTIONS) {
        const ch = channel % 16;
        const offset = channel - ch;
        pressure %= 128;
        this.sendMessage([midiMessageTypes.channelPressure | ch, pressure], offset, eventOptions);
      }
      /**
      * Applies pressure to a given note.
      * @param channel Usually 0-15: the channel to change the controller.
      * @param midiNote 0-127: the MIDI note.
      * @param pressure 0-127: the pressure to apply.
      * @param eventOptions Additional options for this command.
      */
      polyPressure(channel, midiNote, pressure, eventOptions = DEFAULT_SYNTH_METHOD_OPTIONS) {
        const ch = channel % 16;
        const offset = channel - ch;
        midiNote %= 128;
        pressure %= 128;
        this.sendMessage([
          midiMessageTypes.polyPressure | ch,
          midiNote,
          pressure
        ], offset, eventOptions);
      }
      /**
      * Sets the pitch of the given channel.
      * @param channel Usually 0-15: the channel to change pitch.
      * @param value The bend of the MIDI pitch wheel message. 0 - 16384
      * @param eventOptions Additional options for this command.
      */
      pitchWheel(channel, value, eventOptions = DEFAULT_SYNTH_METHOD_OPTIONS) {
        const ch = channel % 16;
        const offset = channel - ch;
        this.sendMessage([
          midiMessageTypes.pitchWheel | ch,
          value & 127,
          value >> 7
        ], offset, eventOptions);
      }
      /**
      * Sets the channel's pitch wheel range, in semitones.
      * @param channel Usually 0-15: the channel to change.
      * @param range The bend range in semitones.
      * @param eventOptions Additional options for this command.
      */
      pitchWheelRange(channel, range, eventOptions = DEFAULT_SYNTH_METHOD_OPTIONS) {
        this.controllerChange(channel, midiControllers.registeredParameterMSB, 0, eventOptions);
        this.controllerChange(channel, midiControllers.registeredParameterLSB, 0, eventOptions);
        this.controllerChange(channel, midiControllers.dataEntryMSB, range);
        this.controllerChange(channel, midiControllers.registeredParameterMSB, 127, eventOptions);
        this.controllerChange(channel, midiControllers.registeredParameterLSB, 127, eventOptions);
        this.controllerChange(channel, midiControllers.dataEntryMSB, 0, eventOptions);
      }
      /**
      * Changes the program for a given channel
      * @param channel Usually 0-15: the channel to change.
      * @param programNumber 0-127 the MIDI patch number.
      * @param eventOptions Additional options for this command.
      */
      programChange(channel, programNumber, eventOptions = DEFAULT_SYNTH_METHOD_OPTIONS) {
        const ch = channel % 16;
        const offset = channel - ch;
        programNumber %= 128;
        this.sendMessage([midiMessageTypes.programChange | ch, programNumber], offset, eventOptions);
      }
      /**
      * Transposes the channel by given number of semitones.
      * @param channel The channel number.
      * @param semitones The transposition of the channel, it can be a float.
      * @param force Defaults to false, if true transposes the channel even if it's a drum channel.
      */
      transposeChannel(channel, semitones, force = false) {
        this.post({
          channelNumber: channel,
          type: "transposeChannel",
          data: {
            semitones,
            force
          }
        });
      }
      /**
      * Mutes or unmutes the given channel.
      * @param channel Usually 0-15: the channel to mute.
      * @param isMuted Indicates if the channel is muted.
      */
      muteChannel(channel, isMuted) {
        this.post({
          channelNumber: channel,
          type: "muteChannel",
          data: isMuted
        });
      }
      /**
      * Sends a MIDI Sysex message to the synthesizer.
      * @param messageData The message's data, excluding the F0 byte, but including the F7 at the end.
      * @param channelOffset Channel offset for the system exclusive message, defaults to zero.
      * @param eventOptions Additional options for this command.
      */
      systemExclusive(messageData, channelOffset = 0, eventOptions = DEFAULT_SYNTH_METHOD_OPTIONS) {
        this._sendInternal([midiMessageTypes.systemExclusive, ...Array.from(messageData)], channelOffset, eventOptions);
      }
      /**
      * Tune MIDI keys of a given program using the MIDI Tuning Standard.
      * @param program  0 - 127 the MIDI program number to use.
      * @param tunings The keys and their tunings.
      * TargetPitch of -1 sets the tuning for this key to be tuned regularly.
      */
      tuneKeys(program, tunings) {
        if (tunings.length > 127) throw new Error("Too many tunings. Maximum allowed is 127.");
        const systemExclusive = [
          127,
          16,
          8,
          2,
          program,
          tunings.length
        ];
        for (const tuning of tunings) {
          systemExclusive.push(tuning.sourceKey);
          if (tuning.targetPitch === -1) systemExclusive.push(127, 127, 127);
          else {
            const midiNote = Math.floor(tuning.targetPitch);
            const fraction = Math.floor((tuning.targetPitch - midiNote) / 61e-6);
            systemExclusive.push(midiNote, fraction >> 7 & 127, fraction & 127);
          }
        }
        systemExclusive.push(247);
        this.systemExclusive(systemExclusive);
      }
      /**
      * Toggles drums on a given channel.
      * @param channel The channel number.
      * @param isDrum If the channel should be drums.
      */
      setDrums(channel, isDrum) {
        this.post({
          channelNumber: channel,
          type: "setDrums",
          data: isDrum
        });
      }
      /**
      * Yes please!
      */
      reverbateEverythingBecauseWhyNot() {
        for (let i = 0; i < this.channelsAmount; i++) {
          this.controllerChange(i, midiControllers.reverbDepth, 127);
          this.lockController(i, midiControllers.reverbDepth, true);
        }
        return "That's the spirit!";
      }
      /**
      * INTERNAL USE ONLY!
      * @param type INTERNAL USE ONLY!
      * @param resolve INTERNAL USE ONLY!
      * @internal
      */
      awaitWorkerResponse(type, resolve) {
        this.resolveMap.set(type, resolve);
      }
      /**
      * INTERNAL USE ONLY!
      * @param callback the sequencer callback
      * @internal
      */
      assignNewSequencer(callback) {
        this.post({
          channelNumber: -1,
          type: "requestNewSequencer",
          data: null
        });
        this.sequencers.push(callback);
        return this.sequencers.length - 1;
      }
      assignProgressTracker(type, progressFunction) {
        if (this.renderingProgressTracker.get(type)) throw new Error("Something is already being rendered!");
        this.renderingProgressTracker.set(type, progressFunction);
      }
      revokeProgressTracker(type) {
        this.renderingProgressTracker.delete(type);
      }
      _sendInternal(message, channelOffset, eventOptions) {
        const options = fillWithDefaults(eventOptions, DEFAULT_SYNTH_METHOD_OPTIONS);
        this.post({
          type: "midiMessage",
          channelNumber: ALL_CHANNELS_OR_DIFFERENT_ACTION,
          data: {
            messageData: new Uint8Array(message),
            channelOffset,
            options
          }
        });
      }
      /**
      * Handles the messages received from the worklet.
      */
      handleMessage(m) {
        switch (m.type) {
          case "eventCall":
            this.eventHandler.callEventInternal(m.data.type, m.data.data);
            break;
          case "sequencerReturn":
            this.sequencers[m.data.id]?.(m.data);
            break;
          case "isFullyInitialized":
            this.workletResponds(m.data.type, m.data.data);
            break;
          case "soundBankError":
            SpessaSynthCoreUtils.SpessaSynthWarn(m.data);
            this.eventHandler.callEventInternal("soundBankError", m.data);
            break;
          case "renderingProgress": this.renderingProgressTracker.get(m.data.type)?.(m.data.data);
        }
      }
      addNewChannelInternal(post) {
        this.channelProperties.push({
          voicesAmount: 0,
          pitchWheel: 0,
          pitchWheelRange: 0,
          isMuted: false,
          isDrum: this.channelsAmount % 16 === DEFAULT_PERCUSSION,
          isEFX: false,
          transposition: 0
        });
        if (!post) return;
        this.post({
          channelNumber: 0,
          type: "addNewChannel",
          data: null
        });
      }
      workletResponds(type, data) {
        this.resolveMap.get(type)?.(data);
        this.resolveMap.delete(type);
      }
    };
    //#endregion
    //#region src/synthesizer/worklet/worklet_synthesizer.ts
    /**
    * This synthesizer uses an audio worklet node containing the processor.
    */
    var WorkletSynthesizer = class extends BasicSynthesizer {
      /**
      * Creates a new instance of an AudioWorklet-based synthesizer.
      * @param context The audio context.
      * @param config Optional configuration for the synthesizer.
      */
      constructor(context, config = DEFAULT_SYNTH_CONFIG) {
        const synthConfig = fillWithDefaults(config, DEFAULT_SYNTH_CONFIG);
        let outputChannelCount = new Array(17).fill(2);
        let numberOfOutputs = 17;
        if (synthConfig.oneOutput) {
          outputChannelCount = [34];
          numberOfOutputs = 1;
        }
        let worklet;
        try {
          worklet = (synthConfig?.audioNodeCreators?.worklet ?? ((context, name, options) => {
            return new AudioWorkletNode(context, name, options);
          }))(context, WORKLET_PROCESSOR_NAME, {
            outputChannelCount,
            numberOfOutputs,
            processorOptions: {
              oneOutput: synthConfig.oneOutput,
              enableEventSystem: synthConfig.enableEventSystem
            }
          });
        } catch (error) {
          console.error(error);
          throw new Error("Could not create the AudioWorkletNode. Did you forget to addModule()?", { cause: error });
        }
        super(worklet, (data, transfer = []) => {
          worklet.port.postMessage(data, transfer);
        }, synthConfig);
      }
      /**
      * Starts an offline audio render.
      * @param config The configuration to use.
      * @remarks
      * Call this method immediately after you've set up the synthesizer.
      * Do NOT call any other methods after initializing before this one.
      * Chromium seems to ignore worklet messages for OfflineAudioContext.
      */
      async startOfflineRender(config) {
        this.post({
          type: "startOfflineRender",
          data: config,
          channelNumber: -1
        }, config.soundBankList.map((b) => b.soundBankBuffer));
        await new Promise((r) => this.awaitWorkerResponse("startOfflineRender", r));
      }
      /**
      * Destroys the synthesizer instance.
      */
      destroy() {
        this.post({
          channelNumber: 0,
          type: "destroyWorklet",
          data: null
        });
        this.worklet.disconnect();
        delete this.worklet;
      }
    };
    //#endregion
    //#region src/synthesizer/worker/playback_worklet.ts
    const PLAYBACK_WORKLET_PROCESSOR_NAME = `spessasynth-playback-worklet-processor`;
    function getPlaybackWorkletURL(maxQueuedChunks) {
      const PLAYBACK_WORKLET_CODE = `
    const BLOCK_SIZE = 128;

    const MAX_QUEUED = ${maxQueuedChunks};

    /**
    * An AudioWorkletProcessor that plays back 18 separate streams of stereo audio: reverb, and chorus and 16 dry channels.
    */
    class PlaybackProcessor extends AudioWorkletProcessor
    {
        
        
        /** @type {Float32Array[]} */
        data = [];
        
        updateRequested = false;
        
        alive = true;
        
        /**
        *
        * @type {MessagePort}
        */
        sentPort;
        
        constructor()
        {
            super();
            
            /**
            * @param e {MessageEvent}
            */
            this.port.onmessage = (e) =>
            {
                if (e.ports.length)
                {
                    const sentPort = e.ports[0];
                    this.sentPort = sentPort;
                    sentPort.onmessage = (e) =>
                    {
                        if(e.data === null)
                        {
                            // the worklet is dead
                            this.alive = false;
                        }
                        this.data.push(e.data);
                        this.updateRequested = false;
                        // if we need more, request immediately
                        if (this.data.length < MAX_QUEUED)
                        {
                            this.sentPort.postMessage(null);
                        }
                    };
                    
                }
            };
        }
        
        // noinspection JSUnusedGlobalSymbols
        /**
        * @param _inputs {[Float32Array, Float32Array][]}
        * @param outputs {[Float32Array, Float32Array][]}
        * @returns {boolean}
        */
        process(_inputs, outputs)
        {
            const data = this.data.shift();
            if (!data)
            {
                return this.alive;
            }
            let offset = 0;
            // decode the data nicely
            for (let i = 0; i < 17; i++)
            {
                outputs[i][0].set(data.subarray(offset, offset + BLOCK_SIZE));
                offset += BLOCK_SIZE;
                outputs[i][1].set(data.subarray(offset, offset + BLOCK_SIZE));
                offset += BLOCK_SIZE;
            }
            
            // if it has already been requested, we need to wait
            if (!this.updateRequested)
            {
                this.sentPort.postMessage(null);
                this.updateRequested = true;
            }
            
            // keep it online
            return this.alive;
        }
    }
    registerProcessor("${PLAYBACK_WORKLET_PROCESSOR_NAME}", PlaybackProcessor);
        `;
      const blob = new Blob([PLAYBACK_WORKLET_CODE], { type: "application/javascript" });
      return URL.createObjectURL(blob);
    }
    //#endregion
    //#region src/synthesizer/worker/render_audio_worker.ts
    const DEFAULT_WORKER_RENDER_AUDIO_OPTIONS = {
      extraTime: 2,
      separateChannels: false,
      loopCount: 0,
      progressCallback: void 0,
      preserveSynthParams: true,
      enableEffects: true,
      sequencerID: 0
    };
    const RENDER_BLOCKS_PER_PROGRESS = 64;
    const BLOCK_SIZE$1 = 128;
    function renderAudioWorker(sampleRate, options) {
      const rendererSynth = new SpessaSynthProcessor(sampleRate, { enableEventSystem: false });
      for (const entry of this.synthesizer.soundBankManager.soundBankList) rendererSynth.soundBankManager.addSoundBank(entry.soundBank, entry.id, entry.bankOffset);
      rendererSynth.soundBankManager.priorityOrder = this.synthesizer.soundBankManager.priorityOrder;
      this.stopAudioLoop();
      const seq = this.sequencers[options.sequencerID];
      const parsedMid = seq.midiData;
      if (!parsedMid) throw new Error("No MIDI is loaded!");
      const playbackRate = seq.playbackRate;
      const loopStartAbsolute = parsedMid.midiTicksToSeconds(parsedMid.loop.start) / playbackRate;
      const loopDuration = parsedMid.midiTicksToSeconds(parsedMid.loop.end) / playbackRate - loopStartAbsolute;
      const sampleDuration = sampleRate * (parsedMid.duration / playbackRate + options.extraTime + loopDuration * options.loopCount);
      const rendererSeq = new SpessaSynthSequencer(rendererSynth);
      rendererSeq.loopCount = options.loopCount;
      if (options.preserveSynthParams) {
        rendererSeq.playbackRate = seq.playbackRate;
        const snapshot = this.synthesizer.getSnapshot();
        rendererSynth.applySynthesizerSnapshot(snapshot);
      }
      rendererSynth.setMasterParameter("autoAllocateVoices", true);
      rendererSeq.loadNewSongList([parsedMid]);
      rendererSeq.play();
      const wetL = new Float32Array(sampleDuration);
      const wetR = new Float32Array(sampleDuration);
      const returnedChunks = {
        effects: [wetL, wetR],
        dry: []
      };
      const sampleDurationNoLastQuantum = sampleDuration - BLOCK_SIZE$1;
      if (options.separateChannels) {
        const dry = [];
        for (let i = 0; i < 16; i++) {
          const d = [new Float32Array(sampleDuration), new Float32Array(sampleDuration)];
          dry.push(d);
          returnedChunks.dry.push(d);
        }
        let index = 0;
        while (true) {
          for (let i = 0; i < RENDER_BLOCKS_PER_PROGRESS; i++) {
            if (index >= sampleDurationNoLastQuantum) {
              rendererSeq.processTick();
              rendererSynth.processSplit(dry, wetL, wetR, index, sampleDuration - index);
              this.startAudioLoop();
              return returnedChunks;
            }
            rendererSeq.processTick();
            rendererSynth.processSplit(dry, wetL, wetR, index, BLOCK_SIZE$1);
            index += BLOCK_SIZE$1;
          }
          this.postProgress("renderAudio", index / sampleDuration);
        }
      } else {
        const dryL = new Float32Array(sampleDuration);
        const dryR = new Float32Array(sampleDuration);
        const dry = [dryL, dryR];
        returnedChunks.dry.push(dry);
        let index = 0;
        while (true) {
          for (let i = 0; i < RENDER_BLOCKS_PER_PROGRESS; i++) {
            if (index >= sampleDurationNoLastQuantum) {
              rendererSeq.processTick();
              rendererSynth.process(dryL, dryR, index, sampleDuration - index);
              this.startAudioLoop();
              return returnedChunks;
            }
            rendererSeq.processTick();
            rendererSynth.process(dryL, dryR, index, BLOCK_SIZE$1);
            index += BLOCK_SIZE$1;
          }
          this.postProgress("renderAudio", index / sampleDuration);
        }
      }
    }
    //#endregion
    //#region src/synthesizer/worker/worker_synthesizer.ts
    const DEFAULT_BANK_WRITE_OPTIONS = {
      trim: true,
      bankID: "",
      writeEmbeddedSoundBank: true,
      sequencerID: 0
    };
    const DEFAULT_SF2_WRITE_OPTIONS = {
      ...DEFAULT_BANK_WRITE_OPTIONS,
      writeDefaultModulators: true,
      writeExtendedLimits: true,
      compress: false,
      compressionQuality: 1,
      decompress: false
    };
    const DEFAULT_RMIDI_WRITE_OPTIONS = {
      ...DEFAULT_BANK_WRITE_OPTIONS,
      bankOffset: 0,
      correctBankOffset: true,
      metadata: {},
      format: "sf2",
      ...DEFAULT_SF2_WRITE_OPTIONS
    };
    const DEFAULT_DLS_WRITE_OPTIONS = { ...DEFAULT_BANK_WRITE_OPTIONS };
    /**
    * This synthesizer uses a Worker containing the processor and an audio worklet node for playback.
    */
    var WorkerSynthesizer = class extends BasicSynthesizer {
      /**
      * Time offset for syncing with the synth
      * @private
      */
      timeOffset = 0;
      /**
      * Creates a new instance of a Worker-based synthesizer.
      * @param context The audio context.
      * @param workerPostMessage The postMessage for the worker containing the synthesizer core.
      * @param config Optional configuration for the synthesizer.
      */
      constructor(context, workerPostMessage, config = DEFAULT_SYNTH_CONFIG) {
        const synthConfig = fillWithDefaults(config, DEFAULT_SYNTH_CONFIG);
        if (synthConfig.oneOutput) throw new Error("One output mode is not supported in the WorkerSynthesizer.");
        let worklet;
        try {
          worklet = (synthConfig?.audioNodeCreators?.worklet ?? ((context, name, options) => {
            return new AudioWorkletNode(context, name, options);
          }))(context, PLAYBACK_WORKLET_PROCESSOR_NAME, {
            outputChannelCount: new Array(18).fill(2),
            numberOfOutputs: 18,
            processorOptions: {
              oneOutput: synthConfig.oneOutput,
              enableEventSystem: synthConfig.enableEventSystem
            }
          });
        } catch (error) {
          console.error(error);
          throw new Error("Could not create the AudioWorkletNode. Did you forget to registerPlaybackWorklet()?", { cause: error });
        }
        super(worklet, workerPostMessage, synthConfig);
        const messageChannel = new MessageChannel();
        const workerPort = messageChannel.port1;
        const workletPort = messageChannel.port2;
        this.worklet.port.postMessage(null, [workletPort]);
        workerPostMessage({
          initialTime: this.context.currentTime,
          sampleRate: this.context.sampleRate
        }, [workerPort]);
      }
      get currentTime() {
        return this.context.currentTime + this.timeOffset;
      }
      /**
      * Registers an audio worklet for the WorkerSynthesizer.
      * @param context The context to register the worklet for.
      * @param maxQueueSize The maximum amount of 128-sample chunks to store in the worklet. Higher values result in less breakups but higher latency.
      */
      static async registerPlaybackWorklet(context, maxQueueSize = 20) {
        if (!context?.audioWorklet.addModule) throw new Error("Audio worklet is not supported.");
        return context.audioWorklet.addModule(getPlaybackWorkletURL(maxQueueSize));
      }
      /**
      * Handles a return message from the Worker.
      * @param e The event received from the Worker.
      */
      handleWorkerMessage(e) {
        this.timeOffset = e.currentTime - this.context.currentTime;
        this.handleMessage(e);
      }
      /**
      * Writes a DLS file directly in the worker.
      * @param options Options for writing the file.
      * @returns The file array buffer and its corresponding name.
      */
      async writeDLS(options = DEFAULT_DLS_WRITE_OPTIONS) {
        const writeOptions = fillWithDefaults(options, DEFAULT_DLS_WRITE_OPTIONS);
        return new Promise((resolve) => {
          this.assignProgressTracker("workerSynthWriteFile", (p) => {
            options.progressFunction?.(p);
          });
          const postOptions = {
            ...writeOptions,
            progressFunction: null
          };
          this.awaitWorkerResponse("workerSynthWriteFile", (data) => resolve(data));
          this.post({
            type: "writeDLS",
            data: postOptions,
            channelNumber: -1
          });
        });
      }
      /**
      * Writes an SF2/SF3 file directly in the worker.
      * @param options Options for writing the file.
      * @returns The file array buffer and its corresponding name.
      */
      async writeSF2(options = DEFAULT_SF2_WRITE_OPTIONS) {
        const writeOptions = fillWithDefaults(options, DEFAULT_SF2_WRITE_OPTIONS);
        return new Promise((resolve) => {
          this.assignProgressTracker("workerSynthWriteFile", (p) => {
            options.progressFunction?.(p);
          });
          const postOptions = {
            ...writeOptions,
            progressFunction: null
          };
          this.awaitWorkerResponse("workerSynthWriteFile", (data) => resolve(data));
          this.post({
            type: "writeSF2",
            data: postOptions,
            channelNumber: -1
          });
        });
      }
      /**
      * Writes an embedded MIDI (RMIDI) file directly in the worker.
      * @param options Options for writing the file.
      * @returns The file array buffer.
      */
      async writeRMIDI(options = DEFAULT_RMIDI_WRITE_OPTIONS) {
        const writeOptions = fillWithDefaults(options, DEFAULT_RMIDI_WRITE_OPTIONS);
        return new Promise((resolve) => {
          this.assignProgressTracker("workerSynthWriteFile", (p) => {
            options.progressFunction?.(p);
          });
          const postOptions = {
            ...writeOptions,
            progressFunction: null
          };
          this.awaitWorkerResponse("workerSynthWriteFile", (data) => resolve(data.binary));
          this.post({
            type: "writeRMIDI",
            data: postOptions,
            channelNumber: -1
          });
        });
      }
      /**
      * Renders the current song in the connected sequencer to Float32 buffers.
      * @param sampleRate The sample rate to use, in Hertz.
      * @param renderOptions Extra options for the render.
      * @returns A single audioBuffer if separate channels were not enabled, otherwise 16.
      * @remarks
      * This stops the synthesizer.
      */
      async renderAudio(sampleRate, renderOptions = DEFAULT_WORKER_RENDER_AUDIO_OPTIONS) {
        const options = fillWithDefaults(renderOptions, DEFAULT_WORKER_RENDER_AUDIO_OPTIONS);
        if (options.enableEffects && options.separateChannels) throw new Error("Effects cannot be applied to separate channels.");
        return new Promise((resolve) => {
          this.awaitWorkerResponse("renderAudio", (data) => {
            this.revokeProgressTracker("renderAudio");
            const bufferLength = data.dry[0][0].length;
            const dryChannels = data.dry.map((dryPair) => {
              const buffer = new AudioBuffer({
                sampleRate,
                numberOfChannels: 2,
                length: bufferLength
              });
              buffer.copyToChannel(dryPair[0], 0);
              buffer.copyToChannel(dryPair[1], 1);
              return buffer;
            });
            if (options.enableEffects) {
              const buffer = new AudioBuffer({
                sampleRate,
                numberOfChannels: 2,
                length: bufferLength
              });
              buffer.copyToChannel(data.effects[0], 0);
              buffer.copyToChannel(data.effects[1], 1);
              dryChannels.push(buffer);
            }
            resolve(dryChannels);
          });
          this.assignProgressTracker("renderAudio", (p) => {
            options.progressCallback?.(p, 0);
          });
          const strippedOptions = {
            ...options,
            progressCallback: void 0
          };
          this.post({
            type: "renderAudio",
            data: {
              sampleRate,
              options: strippedOptions
            },
            channelNumber: -1
          });
        });
      }
    };
    //#endregion
    //#region src/sequencer/midi_data.ts
    var MIDIDataTrack = class extends MIDITrack {
      /**
      * THIS DATA WILL BE EMPTY! USE sequencer.getMIDI() TO GET THE ACTUAL DATA!
      */
      events = [];
      constructor(track) {
        super();
        super.copyFrom(track);
        this.events = [];
      }
    };
    /**
    * A simplified version of the MIDI, accessible at all times from the Sequencer.
    * Use getMIDI() to get the actual sequence.
    * This class contains all properties that MIDI does, except for tracks and the embedded sound bank.
    */
    var MIDIData = class MIDIData extends BasicMIDI {
      tracks;
      /**
      * THIS DATA WILL BE EMPTY! USE sequencer.getMIDI() TO GET THE ACTUAL DATA!
      */
      embeddedSoundBank = void 0;
      /**
      * The byte length of the sound bank if it exists.
      */
      embeddedSoundBankSize;
      constructor(mid) {
        super();
        super.copyMetadataFrom(mid);
        this.tracks = mid.tracks.map((t) => new MIDIDataTrack(t));
        this.embeddedSoundBankSize = mid instanceof MIDIData ? mid.embeddedSoundBankSize : mid?.embeddedSoundBank?.byteLength;
      }
    };
    //#endregion
    //#region src/sequencer/enums.ts
    const songChangeType = {
      shuffleOn: 1,
      shuffleOff: 2,
      index: 3
    };
    //#endregion
    //#region src/synthesizer/basic/basic_synthesizer_core.ts
    /**
    * The interface for the audio processing code that uses spessasynth_core and runs on a separate thread.
    */
    var BasicSynthesizerCore = class {
      synthesizer;
      sequencers = new Array();
      post;
      lastSequencerSync = 0;
      /**
      * Indicates if the processor is alive.
      * @protected
      */
      alive = false;
      enableEventSystem;
      constructor(sampleRate, options, postMessage) {
        this.synthesizer = new SpessaSynthProcessor(sampleRate, options);
        this.enableEventSystem = options.enableEventSystem ?? false;
        this.post = postMessage;
        this.synthesizer.onEventCall = (event) => {
          this.post({
            type: "eventCall",
            data: event,
            currentTime: this.synthesizer.currentSynthTime
          });
        };
      }
      createNewSequencer() {
        const sequencer = new SpessaSynthSequencer(this.synthesizer);
        const sequencerID = this.sequencers.length;
        this.sequencers.push(sequencer);
        sequencer.onEventCall = (e) => {
          if (!this.enableEventSystem) return;
          if (e.type === "songListChange") {
            const midiDatas = e.data.newSongList.map((s) => {
              return new MIDIData(s);
            });
            this.post({
              type: "sequencerReturn",
              data: {
                type: e.type,
                data: {
                  newSongList: midiDatas,
                  shuffledSongIndexes: sequencer.shuffledSongIndexes
                },
                id: sequencerID
              },
              currentTime: this.synthesizer.currentSynthTime
            });
            return;
          }
          this.post({
            type: "sequencerReturn",
            data: {
              ...e,
              id: sequencerID
            },
            currentTime: this.synthesizer.currentSynthTime
          });
        };
      }
      postReady(type, data, transferable = []) {
        this.post({
          type: "isFullyInitialized",
          data: {
            type,
            data
          },
          currentTime: this.synthesizer.currentSynthTime
        }, transferable);
      }
      postProgress(type, data) {
        this.post({
          type: "renderingProgress",
          data: {
            type,
            data
          },
          currentTime: this.synthesizer.currentSynthTime
        });
      }
      destroy() {
        this.synthesizer.destroySynthProcessor();
        delete this.synthesizer;
        delete this.sequencers;
      }
      handleMessage(m) {
        const channel = m.channelNumber;
        let channelObject = void 0;
        if (channel >= 0) {
          channelObject = this.synthesizer.midiChannels[channel];
          if (channelObject === void 0) {
            SpessaSynthCoreUtils.SpessaSynthWarn(`Trying to access channel ${channel} which does not exist... ignoring!`);
            return;
          }
        }
        switch (m.type) {
          case "midiMessage":
            this.synthesizer.processMessage(m.data.messageData, m.data.channelOffset, m.data.options);
            break;
          case "customCcChange":
            channelObject?.setCustomController(m.data.ccNumber, m.data.ccValue);
            break;
          case "ccReset":
            if (channel === ALL_CHANNELS_OR_DIFFERENT_ACTION) this.synthesizer.resetAllControllers();
            else channelObject?.resetControllers();
            break;
          case "stopAll":
            if (channel === ALL_CHANNELS_OR_DIFFERENT_ACTION) this.synthesizer.stopAllChannels(m.data === 1);
            else channelObject?.stopAllNotes(m.data === 1);
            break;
          case "muteChannel":
            channelObject?.muteChannel(m.data);
            break;
          case "addNewChannel":
            this.synthesizer.createMIDIChannel();
            break;
          case "setMasterParameter":
            this.synthesizer.setMasterParameter(m.data.type, m.data.data);
            break;
          case "setDrums":
            channelObject?.setDrums(m.data);
            break;
          case "transposeChannel":
            channelObject?.transposeChannel(m.data.semitones, m.data.force);
            break;
          case "lockController":
            if (m.data.controllerNumber === ALL_CHANNELS_OR_DIFFERENT_ACTION) channelObject?.setPresetLock(m.data.isLocked);
            else {
              if (!channelObject) return;
              channelObject.lockedControllers[m.data.controllerNumber] = m.data.isLocked;
            }
            break;
          case "sequencerSpecific": {
            const seq = this.sequencers[m.data.id];
            if (!seq) return;
            const seqMsg = m.data;
            switch (seqMsg.type) {
              default: break;
              case "loadNewSongList":
                try {
                  const songMap = seqMsg.data.map((s) => {
                    if ("duration" in s) return BasicMIDI.copyFrom(s);
                    return BasicMIDI.fromArrayBuffer(s.binary, s.fileName);
                  });
                  seq.loadNewSongList(songMap);
                } catch (error) {
                  console.error(error);
                  this.post({
                    type: "sequencerReturn",
                    data: {
                      type: "midiError",
                      data: error,
                      id: m.data.id
                    },
                    currentTime: this.synthesizer.currentSynthTime
                  });
                }
                break;
              case "pause":
                seq.pause();
                break;
              case "play":
                seq.play();
                break;
              case "setTime":
                seq.currentTime = seqMsg.data;
                break;
              case "changeMIDIMessageSending":
                seq.externalMIDIPlayback = seqMsg.data;
                break;
              case "setPlaybackRate":
                seq.playbackRate = seqMsg.data;
                break;
              case "setLoopCount":
                seq.loopCount = seqMsg.data;
                break;
              case "changeSong":
                switch (seqMsg.data.changeType) {
                  case songChangeType.shuffleOff:
                    seq.shuffleMode = false;
                    break;
                  case songChangeType.shuffleOn:
                    seq.shuffleMode = true;
                    break;
                  case songChangeType.index:
                    if (seqMsg.data.data !== void 0) seq.songIndex = seqMsg.data.data;
                    break;
                }
                break;
              case "getMIDI":
                if (!seq.midiData) throw new Error("No MIDI is loaded!");
                this.post({
                  type: "sequencerReturn",
                  data: {
                    type: "getMIDI",
                    data: seq.midiData,
                    id: m.data.id
                  },
                  currentTime: this.synthesizer.currentSynthTime
                });
                break;
              case "setSkipToFirstNote":
                seq.skipToFirstNoteOn = seqMsg.data;
                break;
            }
            break;
          }
          case "soundBankManager":
            try {
              const sfManager = this.synthesizer.soundBankManager;
              const sfManMsg = m.data;
              let font;
              switch (sfManMsg.type) {
                case "addSoundBank":
                  font = SoundBankLoader.fromArrayBuffer(sfManMsg.data.soundBankBuffer);
                  sfManager.addSoundBank(font, sfManMsg.data.id, sfManMsg.data.bankOffset);
                  this.postReady("soundBankManager", null);
                  break;
                case "deleteSoundBank":
                  sfManager.deleteSoundBank(sfManMsg.data);
                  this.postReady("soundBankManager", null);
                  break;
                case "rearrangeSoundBanks":
                  sfManager.priorityOrder = sfManMsg.data;
                  this.postReady("soundBankManager", null);
              }
            } catch (error) {
              this.post({
                type: "soundBankError",
                data: error,
                currentTime: this.synthesizer.currentSynthTime
              });
            }
            break;
          case "keyModifierManager": {
            const kmMsg = m.data;
            const man = this.synthesizer.keyModifierManager;
            switch (kmMsg.type) {
              default: return;
              case "addMapping":
                man.addMapping(kmMsg.data.channel, kmMsg.data.midiNote, kmMsg.data.mapping);
                break;
              case "clearMappings":
                man.clearMappings();
                break;
              case "deleteMapping": man.deleteMapping(kmMsg.data.channel, kmMsg.data.midiNote);
            }
            break;
          }
          case "requestSynthesizerSnapshot": {
            const snapshot = SynthesizerSnapshot.create(this.synthesizer);
            this.postReady("synthesizerSnapshot", snapshot);
            break;
          }
          case "requestNewSequencer":
            this.createNewSequencer();
            break;
          case "setLogLevel":
            SpessaSynthLogging(m.data.enableInfo, m.data.enableWarning, m.data.enableGroup);
            break;
          case "destroyWorklet":
            this.alive = false;
            this.synthesizer.destroySynthProcessor();
            this.destroy();
            break;
          default:
            SpessaSynthCoreUtils.SpessaSynthWarn("Unrecognized event!", m);
            break;
        }
      }
    };
    //#endregion
    //#region src/synthesizer/worker/write_sf_worker.ts
    async function writeSF2Worker(opts) {
      let sf = this.getBank(opts);
      if (opts.compress && !this.compressionFunction) {
        const e = /* @__PURE__ */ new Error(`Compression enabled but no compression has been provided to WorkerSynthesizerCore.`);
        this.post({
          type: "soundBankError",
          data: e,
          currentTime: this.synthesizer.currentSynthTime
        });
        throw e;
      }
      const sq = this.sequencers[opts.sequencerID];
      if (opts.trim) {
        if (!sq.midiData) throw new Error("Sound bank MIDI trimming is enabled but no MIDI is loaded!");
        const sfCopy = BasicSoundBank.copyFrom(sf);
        sfCopy.trimSoundBank(sq.midiData);
        sf = sfCopy;
      }
      let compressionFunction;
      if (this.compressionFunction !== void 0) compressionFunction = (audioData, sampleRate) => this.compressionFunction(audioData, sampleRate, opts.compressionQuality);
      return {
        binary: await sf.writeSF2({
          ...opts,
          progressFunction: (sampleName, sampleIndex, sampleCount) => {
            this.postProgress("workerSynthWriteFile", {
              sampleCount,
              sampleIndex,
              sampleName
            });
            return new Promise((r) => r());
          },
          compressionFunction
        }),
        bank: sf
      };
    }
    async function writeDLSWorker(opts) {
      let sf = this.getBank(opts);
      const sq = this.sequencers[opts.sequencerID];
      if (opts.trim) {
        if (!sq.midiData) throw new Error("Sound bank MIDI trimming is enabled but no MIDI is loaded!");
        const sfCopy = BasicSoundBank.copyFrom(sf);
        sfCopy.trimSoundBank(sq.midiData);
        sf = sfCopy;
      }
      return {
        binary: await sf.writeDLS({
          ...opts,
          progressFunction: (sampleName, sampleIndex, sampleCount) => {
            this.postProgress("workerSynthWriteFile", {
              sampleCount,
              sampleIndex,
              sampleName
            });
            return new Promise((r) => r());
          }
        }),
        bank: sf
      };
    }
    //#endregion
    //#region src/synthesizer/worker/write_rmi_worker.ts
    async function writeRMIDIWorker(opts) {
      const sq = this.sequencers[opts.sequencerID];
      if (!sq.midiData) throw new Error("No MIDI is loaded!");
      let sf;
      let sfBin;
      if (opts.format === "sf2") {
        const bin = await writeSF2Worker.call(this, opts);
        sfBin = bin.binary;
        sf = bin.bank;
      } else {
        const bin = await writeDLSWorker.call(this, opts);
        sfBin = bin.binary;
        sf = bin.bank;
      }
      return BasicMIDI.copyFrom(sq.midiData).writeRMIDI(sfBin, {
        soundBank: sf,
        ...opts
      });
    }
    //#endregion
    //#region src/synthesizer/worker/worker_synthesizer_core.ts
    const BLOCK_SIZE = 128;
    var WorkerSynthesizerCore = class extends BasicSynthesizerCore {
      /**
      * The message port to the playback audio worklet.
      */
      workletMessagePort;
      compressionFunction;
      /**
      * Creates a new worker synthesizer core: the synthesizer that runs in the worker.
      * Most parameters here are provided with the first message that is posted to the worker by the WorkerSynthesizer.
      * @param synthesizerConfiguration The data from the first message sent from WorkerSynthesizer.
      * Listen for the first event and use its data to initialize this class.
      * @param workletMessagePort The first port from the first message sent from WorkerSynthesizer.
      * @param mainThreadCallback postMessage function or similar.
      * @param compressionFunction Optional function for compressing SF3 banks.
      */
      constructor(synthesizerConfiguration, workletMessagePort, mainThreadCallback, compressionFunction) {
        super(synthesizerConfiguration.sampleRate, {
          enableEventSystem: true,
          enableEffects: true,
          initialTime: synthesizerConfiguration.initialTime
        }, mainThreadCallback);
        this.workletMessagePort = workletMessagePort;
        this.workletMessagePort.onmessage = this.process.bind(this);
        this.compressionFunction = compressionFunction;
        this.synthesizer.processorInitialized.then(() => {
          this.postReady("sf3Decoder", null);
          this.startAudioLoop();
        });
      }
      /**
      * Handles a message received from the main thread.
      * @param m The message received.
      */
      handleMessage(m) {
        switch (m.type) {
          case "renderAudio": {
            const rendered = renderAudioWorker.call(this, m.data.sampleRate, m.data.options);
            const transferable = [];
            for (const r of rendered.effects) transferable.push(r.buffer);
            for (const d of rendered.dry) transferable.push(...d.map((c) => c.buffer));
            this.postReady("renderAudio", rendered, transferable);
            break;
          }
          case "writeRMIDI":
            this.stopAudioLoop();
            writeRMIDIWorker.call(this, m.data).then((data) => {
              this.postReady("workerSynthWriteFile", {
                binary: data,
                fileName: ""
              }, [data]);
              this.startAudioLoop();
            });
            break;
          case "writeSF2":
            this.stopAudioLoop();
            writeSF2Worker.call(this, m.data).then((data) => {
              this.postReady("workerSynthWriteFile", {
                binary: data.binary,
                fileName: data.bank.soundBankInfo.name + (data.bank.soundBankInfo.version.major === 3 ? ".sf3" : ".sf2")
              }, [data.binary]);
              this.startAudioLoop();
            });
            break;
          case "writeDLS":
            this.stopAudioLoop();
            writeDLSWorker.call(this, m.data).then((data) => {
              this.postReady("workerSynthWriteFile", {
                binary: data.binary,
                fileName: data.bank.soundBankInfo.name + ".dls"
              }, [data.binary]);
              this.startAudioLoop();
            });
            break;
          default: super.handleMessage(m);
        }
      }
      getBank(opts) {
        const sq = this.sequencers[opts.sequencerID];
        const sf = opts.writeEmbeddedSoundBank && sq.midiData?.embeddedSoundBank ? SoundBankLoader.fromArrayBuffer(sq.midiData.embeddedSoundBank) : this.synthesizer.soundBankManager.soundBankList.find((b) => b.id === opts.bankID)?.soundBank;
        if (!sf) {
          const e = /* @__PURE__ */ new Error(`${opts.bankID} does not exist in the sound bank list!`);
          this.post({
            type: "soundBankError",
            data: e,
            currentTime: this.synthesizer.currentSynthTime
          });
          throw e;
        }
        return sf;
      }
      stopAudioLoop() {
        this.synthesizer.stopAllChannels(true);
        for (const seq of this.sequencers) seq.pause();
        this.alive = false;
      }
      startAudioLoop() {
        this.alive = true;
        this.process();
      }
      destroy() {
        this.workletMessagePort.postMessage(null);
        this.stopAudioLoop();
        super.destroy();
      }
      process() {
        if (!this.alive) return;
        const byteStep = BLOCK_SIZE * Float32Array.BYTES_PER_ELEMENT;
        const data = new Float32Array(BLOCK_SIZE * 34);
        let byteOffset = 0;
        const wetR = new Float32Array(data.buffer, byteOffset, BLOCK_SIZE);
        byteOffset += byteStep;
        const wetL = new Float32Array(data.buffer, byteOffset, BLOCK_SIZE);
        byteOffset += byteStep;
        const dry = [];
        for (let i = 0; i < 16; i++) {
          const dryL = new Float32Array(data.buffer, byteOffset, BLOCK_SIZE);
          byteOffset += byteStep;
          const dryR = new Float32Array(data.buffer, byteOffset, BLOCK_SIZE);
          byteOffset += byteStep;
          dry.push([dryL, dryR]);
        }
        for (const seq of this.sequencers) seq.processTick();
        this.synthesizer.processSplit(dry, wetL, wetR);
        this.workletMessagePort.postMessage(data, [data.buffer]);
        const t = this.synthesizer.currentSynthTime;
        if (this.enableEventSystem && t - this.lastSequencerSync > 1) {
          for (let id = 0; id < this.sequencers.length; id++) this.post({
            type: "sequencerReturn",
            data: {
              type: "sync",
              data: this.sequencers[id].currentTime,
              id
            },
            currentTime: t
          });
          this.lastSequencerSync = t;
        }
      }
    };
    //#endregion
    //#region src/sequencer/default_sequencer_options.ts
    const DEFAULT_SEQUENCER_OPTIONS = {
      skipToFirstNoteOn: true,
      initialPlaybackRate: 1
    };
    //#endregion
    //#region src/sequencer/seq_event_handler.ts
    var SeqEventHandler = class {
      /**
      * The time delay before an event is called.
      * Set to 0 to disable it.
      */
      timeDelay = 0;
      events = {
        songChange: /* @__PURE__ */ new Map(),
        songEnded: /* @__PURE__ */ new Map(),
        metaEvent: /* @__PURE__ */ new Map(),
        timeChange: /* @__PURE__ */ new Map(),
        midiError: /* @__PURE__ */ new Map(),
        textEvent: /* @__PURE__ */ new Map()
      };
      /**
      * Adds a new event listener.
      * @param event The event to listen to.
      * @param id The unique identifier for the event. It can be used to overwrite existing callback with the same ID.
      * @param callback The callback for the event.
      */
      addEvent(event, id, callback) {
        this.events[event].set(id, callback);
      }
      /**
      * Removes an event listener
      * @param name The event to remove a listener from.
      * @param id The unique identifier for the event to remove.
      */
      removeEvent(name, id) {
        this.events[name].delete(id);
      }
      /**
      * Calls the given event.
      * Internal use only.
      * @internal
      */
      callEventInternal(name, eventData) {
        const eventList = this.events[name];
        const callback = () => {
          for (const callback of eventList.values()) try {
            callback(eventData);
          } catch (error) {
            console.error(`Error while executing a sequencer event callback for ${name}:`, error);
          }
        };
        if (this.timeDelay > 0) setTimeout(callback.bind(this), this.timeDelay * 1e3);
        else callback();
      }
    };
    //#endregion
    //#region src/sequencer/sequencer.ts
    var Sequencer = class {
      /**
      * The current MIDI data for all songs, like the midiData property.
      */
      songListData = [];
      /**
      * Allows setting up custom event listeners for the sequencer.
      */
      eventHandler = new SeqEventHandler();
      /**
      * Indicates whether the sequencer has finished playing a sequence.
      */
      isFinished = false;
      /**
      * The synthesizer attached to this sequencer.
      */
      synth;
      /**
      * The current MIDI data, with the exclusion of the embedded sound bank and event data.
      */
      midiData;
      /**
      * The MIDI port to play to.
      */
      midiOut;
      isLoading = false;
      /**
      * Indicates if the sequencer is paused.
      * Paused if a number, undefined if playing.
      */
      pausedTime = 0;
      getMIDICallback = void 0;
      highResTimeOffset = 0;
      /**
      * Absolute playback startTime, bases on the synth's time.
      */
      absoluteStartTime;
      /**
      * For sending the messages to the correct SpessaSynthSequencer in core
      */
      sequencerID;
      /**
      * Creates a new MIDI sequencer for playing back MIDI files.
      * @param synth synth to send events to.
      * @param options the sequencer's options.
      */
      constructor(synth, options = DEFAULT_SEQUENCER_OPTIONS) {
        this.synth = synth;
        this.absoluteStartTime = this.synth.currentTime;
        this.sequencerID = this.synth.assignNewSequencer(this.handleMessage.bind(this));
        this._skipToFirstNoteOn = options?.skipToFirstNoteOn ?? true;
        if (options?.initialPlaybackRate !== 1) this.playbackRate = options?.initialPlaybackRate ?? 1;
        if (!this._skipToFirstNoteOn) this.sendMessage("setSkipToFirstNote", false);
        window.addEventListener("beforeunload", this.resetMIDIOutput.bind(this));
      }
      _shuffledSongIndexes = [];
      /**
      * The shuffled song indexes.
      * This is used when shuffleMode is enabled.
      */
      get shuffledSongIndexes() {
        return this._shuffledSongIndexes;
      }
      _songIndex = 0;
      /**
      * The current song number in the playlist.
      * If shuffle Mode is enabled, this is the index of the shuffled song list.
      */
      get songIndex() {
        return this._songIndex;
      }
      /**
      * The current song number in the playlist.
      * If shuffle Mode is enabled, this is the index of the shuffled song list.
      */
      set songIndex(value) {
        /**
        * Sets the song index in the playlist.
        */
        const clamped = Math.max(0, value % this._songsAmount);
        if (clamped === this._songIndex) return;
        this.isLoading = true;
        this.midiData = void 0;
        this.sendMessage("changeSong", {
          changeType: songChangeType.index,
          data: clamped
        });
      }
      _currentTempo = 120;
      /**
      * Current song's tempo in BPM.
      */
      get currentTempo() {
        return this._currentTempo;
      }
      /**
      * The current sequence's length, in seconds.
      */
      get duration() {
        return this.midiData?.duration ?? 0;
      }
      _songsAmount = 0;
      get songsAmount() {
        return this._songsAmount;
      }
      _skipToFirstNoteOn;
      /**
      * Indicates if the sequencer should skip to first note on.
      */
      get skipToFirstNoteOn() {
        return this._skipToFirstNoteOn;
      }
      /**
      * Indicates if the sequencer should skip to first note on.
      */
      set skipToFirstNoteOn(val) {
        this._skipToFirstNoteOn = val;
        this.sendMessage("setSkipToFirstNote", this._skipToFirstNoteOn);
      }
      /**
      * Internal loop count marker (-1 is infinite).
      */
      _loopCount = -1;
      /**
      * The current remaining number of loops. -1 means infinite looping.
      */
      get loopCount() {
        return this._loopCount;
      }
      /**
      * The current remaining number of loops. -1 means infinite looping.
      */
      set loopCount(val) {
        this._loopCount = val;
        this.sendMessage("setLoopCount", val);
      }
      /**
      * Controls the playback's rate.
      */
      _playbackRate = 1;
      /**
      * Controls the playback's rate.
      */
      get playbackRate() {
        return this._playbackRate;
      }
      /**
      * Controls the playback's rate.
      */
      set playbackRate(value) {
        const t = this.currentTime;
        this.sendMessage("setPlaybackRate", value);
        this.highResTimeOffset *= value / this._playbackRate;
        this._playbackRate = value;
        this.recalculateStartTime(t);
      }
      _shuffleSongs = false;
      /**
      * Controls if the sequencer should shuffle the songs in the song list.
      * If true, the sequencer will play the songs in a random order.
      *
      * Songs are shuffled on a `loadNewSongList` call.
      */
      get shuffleSongs() {
        return this._shuffleSongs;
      }
      /**
      * Controls if the sequencer should shuffle the songs in the song list.
      * If true, the sequencer will play the songs in a random order.
      *
      * Songs are shuffled on a `loadNewSongList` call.
      */
      set shuffleSongs(value) {
        this._shuffleSongs = value;
        if (value) this.sendMessage("changeSong", { changeType: songChangeType.shuffleOn });
        else this.sendMessage("changeSong", { changeType: songChangeType.shuffleOff });
      }
      /**
      * Current playback time, in seconds.
      */
      get currentTime() {
        if (this.isLoading) return 0;
        if (this.pausedTime !== void 0) return this.pausedTime;
        return (this.synth.currentTime - this.absoluteStartTime) * this._playbackRate;
      }
      /**
      * Current playback time, in seconds.
      */
      set currentTime(time) {
        this.sendMessage("setTime", time);
      }
      /**
      * A smoothed version of currentTime.
      * Use for visualization as it's not affected by the audioContext stutter.
      */
      get currentHighResolutionTime() {
        if (this.pausedTime !== void 0) return this.pausedTime;
        const highResTimeOffset = this.highResTimeOffset;
        const absoluteStartTime = this.absoluteStartTime;
        const performanceElapsedTime = (performance.now() / 1e3 - absoluteStartTime) * this._playbackRate;
        let currentPerformanceTime = highResTimeOffset + performanceElapsedTime;
        const currentAudioTime = this.currentTime;
        const smoothingFactor = .01 * this._playbackRate;
        const timeDifference = currentAudioTime - currentPerformanceTime;
        this.highResTimeOffset += timeDifference * smoothingFactor;
        currentPerformanceTime = this.highResTimeOffset + performanceElapsedTime;
        return currentPerformanceTime;
      }
      /**
      * True if paused, false if playing or stopped.
      */
      get paused() {
        return this.pausedTime !== void 0;
      }
      /**
      * Gets the current MIDI File.
      */
      async getMIDI() {
        return new Promise((resolve) => {
          this.getMIDICallback = resolve;
          this.sendMessage("getMIDI", null);
        });
      }
      /**
      * Loads a new song list.
      * @param midiBuffers The MIDI files to play.
      */
      loadNewSongList(midiBuffers) {
        this.isLoading = true;
        this.midiData = void 0;
        this.sendMessage("loadNewSongList", midiBuffers);
        this._songIndex = 0;
        this._songsAmount = midiBuffers.length;
      }
      /**
      * Connects a given output to the sequencer.
      * @param output The output to connect. Pass undefined to use the connected synthesizer.
      */
      connectMIDIOutput(output) {
        this.resetMIDIOutput();
        this.midiOut = output;
        this.sendMessage("changeMIDIMessageSending", output !== void 0);
        this.currentTime -= .1;
      }
      /**
      * Pauses the playback.
      */
      pause() {
        if (this.paused) return;
        this.pausedTime = this.currentTime;
        this.sendMessage("pause", null);
      }
      /**
      * Starts or resumes the playback.
      */
      play() {
        this.recalculateStartTime(this.pausedTime ?? 0);
        this.pausedTime = void 0;
        this.isFinished = false;
        this.sendMessage("play", null);
      }
      handleMessage(m) {
        switch (m.type) {
          case "midiMessage": {
            const midiEventData = m.data.message;
            if (this.midiOut && midiEventData[0] >= 128) {
              this.midiOut.send(midiEventData);
              return;
            }
            break;
          }
          case "songChange": {
            this._songIndex = m.data.songIndex;
            const idx = this._shuffleSongs ? this._shuffledSongIndexes[this._songIndex] : this._songIndex;
            const songChangeData = this.songListData[idx];
            this.midiData = songChangeData;
            this.isLoading = false;
            this.absoluteStartTime = 0;
            this.callEventInternal("songChange", songChangeData);
            break;
          }
          case "sync":
            if (Math.abs(m.data - this.currentTime) > .05) this.recalculateStartTime(m.data);
            break;
          case "timeChange": {
            const time = m.data.newTime;
            this.recalculateStartTime(time);
            this.callEventInternal("timeChange", time);
            break;
          }
          case "pause":
            this.pausedTime = this.currentTime;
            this.isFinished = m.data.isFinished;
            if (this.isFinished) this.callEventInternal("songEnded", null);
            break;
          case "midiError":
            this.callEventInternal("midiError", m.data);
            break;
          case "getMIDI":
            if (this.getMIDICallback) this.getMIDICallback(BasicMIDI.copyFrom(m.data));
            break;
          case "metaEvent": {
            const event = m.data.event;
            switch (event.statusByte) {
              case midiMessageTypes.setTempo:
                this._currentTempo = 6e7 / SpessaSynthCoreUtils.readBytesAsUintBigEndian(event.data, 3);
                break;
              case midiMessageTypes.text:
              case midiMessageTypes.lyric:
              case midiMessageTypes.copyright:
              case midiMessageTypes.trackName:
              case midiMessageTypes.marker:
              case midiMessageTypes.cuePoint:
              case midiMessageTypes.instrumentName:
              case midiMessageTypes.programName: {
                if (!this.midiData) break;
                let lyricsIndex = -1;
                if (event.statusByte === midiMessageTypes.lyric) lyricsIndex = Math.min(this.midiData.lyrics.findIndex((l) => l.ticks === event.ticks), this.midiData.lyrics.length - 1);
                if (this.midiData.isKaraokeFile && (event.statusByte === midiMessageTypes.text || event.statusByte === midiMessageTypes.lyric)) lyricsIndex = Math.min(this.midiData.lyrics.findIndex((l) => l.ticks === event.ticks), this.midiData.lyrics.length);
                this.callEventInternal("textEvent", {
                  event,
                  lyricsIndex
                });
                break;
              }
            }
            this.callEventInternal("metaEvent", {
              event: m.data.event,
              trackNumber: m.data.trackIndex
            });
            break;
          }
          case "loopCountChange":
            this._loopCount = m.data.newCount;
            break;
          case "songListChange":
            this.songListData = m.data.newSongList.map((m) => new MIDIData(m));
            this._shuffledSongIndexes = m.data.shuffledSongIndexes;
            break;
          default: break;
        }
      }
      callEventInternal(type, data) {
        this.eventHandler.callEventInternal(type, data);
      }
      resetMIDIOutput() {
        if (!this.midiOut) return;
        for (let i = 0; i < 16; i++) {
          this.midiOut.send([
            midiMessageTypes.controllerChange | i,
            120,
            0
          ]);
          this.midiOut.send([
            midiMessageTypes.controllerChange | i,
            123,
            0
          ]);
        }
        this.midiOut.send([midiMessageTypes.reset]);
      }
      recalculateStartTime(time) {
        this.absoluteStartTime = this.synth.currentTime - time / this._playbackRate;
        this.highResTimeOffset = (this.synth.currentTime - performance.now() / 1e3) * this._playbackRate;
        if (this.paused) this.pausedTime = time;
      }
      sendMessage(messageType, messageData) {
        this.synth.post({
          channelNumber: ALL_CHANNELS_OR_DIFFERENT_ACTION,
          type: "sequencerSpecific",
          data: {
            type: messageType,
            data: messageData,
            id: this.sequencerID
          }
        });
      }
    };
    //#endregion
    //#region src/utils/buffer_to_wav.ts
    /**
    * Converts an audio buffer into a wave file.
    * @param audioBuffer The audio data channels.
    * @param options Additional options for writing the file.
    * @returns The binary file.
    */
    function audioBufferToWav(audioBuffer, options) {
      const channels = [];
      const channelOffset = options?.channelOffset ?? 0;
      const channelCount = options?.channelCount ?? audioBuffer.numberOfChannels;
      for (let i = channelOffset; i < audioBuffer.numberOfChannels; i++) {
        channels.push(audioBuffer.getChannelData(i));
        if (channels.length >= channelCount) break;
      }
      return new Blob([audioToWav(channels, audioBuffer.sampleRate, options)], { type: "audio/wav" });
    }
    //#endregion
    //#region src/external_midi/midi_handler.ts
    /**
    * Midi_handler.js
    * purpose: handles the connection between MIDI devices and synthesizer/sequencer via Web MIDI API
    */
    var LibMIDIPort = class {
      port;
      constructor(port) {
        this.port = port;
      }
      /**
      *
      */
      get id() {
        return this.port.id;
      }
      /**
      *
      */
      get name() {
        return this.port.name;
      }
      /**
      *
      */
      get manufacturer() {
        return this.port.manufacturer;
      }
      /**
      *
      */
      get version() {
        return this.port.version;
      }
    };
    var LibMIDIInput = class extends LibMIDIPort {
      connectedSynths = /* @__PURE__ */ new Set();
      constructor(input) {
        super(input);
        input.onmidimessage = (e) => {
          for (const s of this.connectedSynths) if (e.data) s.sendMessage(e.data);
        };
      }
      /**
      * Connects the input to a given synth, listening for all incoming events.
      * @param synth The synth to connect to.
      */
      connect(synth) {
        this.connectedSynths.add(synth);
      }
      /**
      * Disconnects the input from a given synth.
      * @param synth The synth to disconnect from.
      */
      disconnect(synth) {
        this.connectedSynths.delete(synth);
      }
    };
    var LibMIDIOutput = class extends LibMIDIPort {
      port;
      constructor(output) {
        super(output);
        this.port = output;
      }
      /**
      * Connects a given sequencer to the output, playing back the MIDI file to it.
      * @param seq The sequencer to connect.
      */
      connect(seq) {
        seq.connectMIDIOutput(this.port);
      }
      /**
      * Disconnects sequencer from the output, making it play to the attached Synthesizer instead.
      * @param seq The sequencer to disconnect.
      */
      disconnect(seq) {
        seq.connectMIDIOutput(void 0);
      }
    };
    /**
    * A class for handling physical MIDI devices.
    */
    var MIDIDeviceHandler = class MIDIDeviceHandler {
      /**
      * The available MIDI inputs. ID maps to the input.
      */
      inputs = /* @__PURE__ */ new Map();
      /**
      * The available MIDI outputs. ID maps to the output.
      */
      outputs = /* @__PURE__ */ new Map();
      constructor(access) {
        for (const [key, value] of access.inputs.entries()) this.inputs.set(key, new LibMIDIInput(value));
        for (const [key, value] of access.outputs.entries()) this.outputs.set(key, new LibMIDIOutput(value));
      }
      /**
      * Attempts to initialize the MIDI Device Handler.
      * @returns The handler.
      * @throws An error if the MIDI Devices fail to initialize.
      */
      static async createMIDIDeviceHandler() {
        if (navigator.requestMIDIAccess) try {
          const response = await navigator.requestMIDIAccess({
            sysex: true,
            software: true
          });
          SpessaSynthCoreUtils.SpessaSynthInfo("%cMIDI handler created!", consoleColors.recognized);
          return new MIDIDeviceHandler(response);
        } catch (error) {
          SpessaSynthCoreUtils.SpessaSynthWarn(`Could not get MIDI Devices:`, error);
          throw error;
        }
        else {
          SpessaSynthCoreUtils.SpessaSynthWarn("Web MIDI API is not supported.", consoleColors.unrecognized);
          throw new Error("Web MIDI API is not supported.");
        }
      }
    };
    //#endregion
    //#region src/external_midi/web_midi_link.ts
    /**
    * Web_midi_link.js
    * purpose: handles the web midi link connection to the synthesizer
    * https://www.g200kg.com/en/docs/webmidilink/
    */
    var WebMIDILinkHandler = class {
      /**
      * Initializes support for Web MIDI Link (https://www.g200kg.com/en/docs/webmidilink/)
      * @param synth The synthesizer to enable support with.
      */
      constructor(synth) {
        window.addEventListener("message", (msg) => {
          if (typeof msg.data !== "string") return;
          const data = msg.data.split(",");
          if (data[0] !== "midi") return;
          data.shift();
          const midiData = data.map((byte) => Number.parseInt(byte, 16));
          synth.sendMessage(midiData);
        });
        SpessaSynthCoreUtils.SpessaSynthInfo("%cWeb MIDI Link handler created!", consoleColors.recognized);
      }
    };

    return { DEFAULT_SYNTH_CONFIG, MIDIDeviceHandler, Sequencer, WebMIDILinkHandler, WorkerSynthesizer, WorkerSynthesizerCore, WorkletSynthesizer, audioBufferToWav };
  })();

  const delay = (ms) => new Promise((resolve) => {setTimeout(resolve, ms);});

  class MIDISynthesizer {
    SpessaSynth = {
      initialized: false,
      init: async () => {
        if (this.SpessaSynth.initialized) return
        this.SpessaSynth.audioContext = new AudioContext();
        await this.SpessaSynth.audioContext.audioWorklet.addModule("https://cdn.jsdelivr.net/npm/spessasynth_lib@4.2.15/dist/spessasynth_processor.min.js"); // Download it and find a way
        this.SpessaSynth.synth = new SpessaSynth_lib.WorkletSynthesizer(this.SpessaSynth.audioContext);
        this.SpessaSynth.synth.connect(this.SpessaSynth.audioContext.destination);
        this.SpessaSynth.initialized = true;
      },
      audioContext: null,
      synth: null
    };
    tempo = 120;
    projectChannel = 1;
    projectChannelTime = Date.now();

    getInfo() {
      return {
        id: 'midisynth',  
        name: Scratch.translate("MIDI Synthesizer"),
        color1: "#4c97ff",
        color2: "#337bcc",
        color3: "#2c6ca3",
        menuIconURI: iconURI,
        blocks: [
          {
            opcode: "initialize",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("initialize the synthesizer")
          },
          {
            opcode: "isInitialized",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is the synthesizer initialized?")
          },
          {
            opcode: "addSoundfont",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("add soundfont from [type] [data] as [id]"),
            arguments: {
              "type": {
                type: Scratch.ArgumentType.STRING,
                menu: "fileType",
                defaultValue: "URL"
              },
              "data": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://raw.githubusercontent.com/spessasus/SpessaSynth/refs/tags/v3.25.0/soundfonts/GeneralUserGS.sf3"
              },
              "id": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "main"
              }
            }
          },
          {
            opcode: "loadSoundfont",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("load soundfont [id] and [behavior]"),
            arguments: {
              "id": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "main"
              },
              "behavior": {
                type: Scratch.ArgumentType.STRING,
                menu: "soundfontLoadBehavior",
                defaultValue: "fallback"
              }
            }
          },
          "---",
          {
            opcode: "selectChannel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("go to channel [channel] in [scope]"),
            arguments: {
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              "scope": {
                type: Scratch.ArgumentType.STRING,
                menu: "scope",
                defaultValue: "script"
              }
            }
          },
          {
            opcode: "currentChannel",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current channel"),
            disableMonitor: true
          },
          {
            opcode: "setTempo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set tempo to [bpm] bpm"),
            arguments: {
              "bpm": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 120
              }
            }
          },
          "---",
          {
            opcode: "noteOnChannel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("note on [note] at velocity [velocity] in channel [channel]"),
            arguments: {
              "note": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 60
              },
              "velocity": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "noteOffChannel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("note off [note] at velocity [velocity] in channel [channel]"),
            arguments: {
              "note": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 60
              },
              "velocity": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "playNoteChannel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("play note [note] at velocity [velocity] for [beats] beats in channel [channel]"),
            arguments: {
              "note": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 60
              },
              "velocity": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              "beats": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.25
              },
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "playNoteChannelWait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("play note [note] at velocity [velocity] for [beats] beats in channel [channel] and wait"),
            arguments: {
              "note": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 60
              },
              "velocity": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              "beats": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.25
              },
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          "---",
          {
            opcode: "changeChannelInstrument",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change instrument to [instrument] in channel [channel]"),
            arguments: {
              "instrument": {
                type: Scratch.ArgumentType.STRING,
                menu: "instruments",
                defaultValue: 0
              },
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "changeDrumKit",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change drum kit to [drumkit]"),
            arguments: {
              "drumkit": {
                type: Scratch.ArgumentType.STRING,
                menu: "drumkits",
                defaultValue: 0
              }
            }
          },
          {
            opcode: "setDrumKit",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[value] Drum Kit in channel [channel]"),
            arguments: {
              "value": {
                type: Scratch.ArgumentType.STRING,
                menu: "enable",
                defaultValue: 0
              },
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "programChangeChannel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("send a program change event [program] to the channel [channel]"),
            arguments: {
              "program": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 48
              },
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "transposeChannel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("transpose the channel [channel] by [semitones] semitones [force]"),
            arguments: {
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              "semitones": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 12
              },
              "force": {
                type: Scratch.ArgumentType.STRING,
                menu: "force",
                defaultValue: "force"
              }
            }
          },
          {
            opcode: "setChannelPitchWheelRange",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set the channel [channel]'s pitch wheel range to [semitones]"),
            arguments: {
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              "semitones": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 12
              }
            }
          },
          {
            opcode: "pitchWheelChannel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set the channel [channel]'s pitch wheel to [value]"),
            arguments: {
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              "value": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8192
              }
            }
          },
          {
            opcode: "sendControlChange",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("send [function] control change with value [value] to channel [channel]"),
            arguments: {
              "function": {
                type: Scratch.ArgumentType.STRING,
                menu: "controlChange",
                defaultValue: "Volume"
              },
              "value": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "sendBoolControlChange",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[value] [function] control change in channel [channel]"),
            arguments: {
              "value": {
                type: Scratch.ArgumentType.STRING
              },
              "function": {
                type: Scratch.ArgumentType.STRING
              },
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "muteChannel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("mute channel [channel]"),
            arguments: {
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "unmuteChannel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unmute channel [channel]"),
            arguments: {
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "isChannelMute",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is channel [channel] mute?"),
            arguments: {
              "channel": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          "---",
          {
            opcode: "allSoundsOff",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("all sounds off")
          }
        ],
        menus: {
          "fileType": {
            acceptReporters: true,
            items: ["URL", "base64", "hex", "binary", "string"]
          },
          "force": {
            acceptReporters: true,
            items: [{ text: "force", value: true }, { text: "do not force", value: false }]
          },
          "soundfontLoadBehavior": {
            acceptReporters: true,
            items: [
              {
                text: "use the other soundfonts as fallback",
                value: "fallback"
              },
              {
                text: "stop using the other soundfonts",
                value: "override"
              }
            ]
          },
          "enable": {
            acceptReporters: true,
            items: [
              { text: "enable", value: true },
              { text: "disable", value: false }
            ]
          },
          "scope": {
            acceptReporters: true,
            items: ["script", "sprite", "project"],
          },
          "instruments": {
            acceptReporters: true,
            items: [
              {
                text: "Acoustic Grand Piano",
                value: 0
              },
              {
                text: "Bright Acoustic Piano",
                value: 1
              },
              {
                text: "Electric Grand Piano",
                value: 2
              },
              {
                text: "Honky-tonk Piano",
                value: 3
              },
              {
                text: "Electric Piano 1",
                value: 4
              },
              {
                text: "Electric Piano 2",
                value: 5
              },
              {
                text: "Harpsichord",
                value: 6
              },
              {
                text: "Clavi",
                value: 7
              },
              {
                text: "Celesta",
                value: 8
              },
              {
                text: "Glockenspiel",
                value: 9
              },
              {
                text: "Music Box",
                value: 10
              },
              {
                text: "Vibraphone",
                value: 11
              },
              {
                text: "Marimba",
                value: 12
              },
              {
                text: "Xylophone",
                value: 13
              },
              {
                text: "Tubular Bells",
                value: 14
              },
              {
                text: "Dulcimer",
                value: 15
              },
              {
                text: "Drawbar Organ",
                value: 16
              },
              {
                text: "Percussive Organ",
                value: 17
              },
              {
                text: "Rock Organ",
                value: 18
              },
              {
                text: "Church Organ",
                value: 19
              },
              {
                text: "Reed Organ",
                value: 20
              },
              {
                text: "Accordion",
                value: 21
              },
              {
                text: "Harmonica",
                value: 22
              },
              {
                text: "Tango Accordion",
                value: 23
              },
              {
                text: "Acoustic Guitar (nylon)",
                value: 24
              },
              {
                text: "Acoustic Guitar (steel)",
                value: 25
              },
              {
                text: "Electric Guitar (jazz)",
                value: 26
              },
              {
                text: "Electric Guitar (clean)",
                value: 27
              },
              {
                text: "Electric Guitar (muted)",
                value: 28
              },
              {
                text: "Overdriven Guitar",
                value: 29
              },
              {
                text: "Distortion Guitar",
                value: 30
              },
              {
                text: "Guitar Harmonics",
                value: 31
              },
              {
                text: "Acoustic Bass",
                value: 32
              },
              {
                text: "Electric Bass (finger)",
                value: 33
              },
              {
                text: "Electric Bass (pick)",
                value: 34
              },
              {
                text: "Fretless Bass",
                value: 35
              },
              {
                text: "Slap Bass 1",
                value: 36
              },
              {
                text: "Slap Bass 2",
                value: 37
              },
              {
                text: "Synth Bass 1",
                value: 38
              },
              {
                text: "Synth Bass 2",
                value: 39
              },
              {
                text: "Violin",
                value: 40
              },
              {
                text: "Viola",
                value: 41
              },
              {
                text: "Cello",
                value: 42
              },
              {
                text: "Contrabass",
                value: 43
              },
              {
                text: "Tremelo Strings",
                value: 44
              },
              {
                text: "Pizzicato Strings",
                value: 45
              },
              {
                text: "Orchestral Harp",
                value: 46
              },
              {
                text: "Timpani",
                value: 47
              },
              {
                text: "String Ensemble 1",
                value: 48
              },
              {
                text: "String Ensemble 2",
                value: 49
              },
              {
                text: "SynthStrings 1",
                value: 50
              },
              {
                text: "SynthStrings 2",
                value: 51
              },
              {
                text: "Choir Aahs",
                value: 52
              },
              {
                text: "Voice Oohs",
                value: 53
              },
              {
                text: "Synth Voice",
                value: 54
              },
              {
                text: "Orchestra Hit",
                value: 55
              },
              {
                text: "Trumpet",
                value: 56
              },
              {
                text: "Trombone",
                value: 57
              },
              {
                text: "Tuba",
                value: 58
              },
              {
                text: "Muted Trumpet",
                value: 59
              },
              {
                text: "French Horn",
                value: 60
              },
              {
                text: "Brass Section",
                value: 61
              },
              {
                text: "SynthBrass 1",
                value: 62
              },
              {
                text: "SynthBrass 2",
                value: 63
              },
              {
                text: "Soprano Sax",
                value: 64
              },
              {
                text: "Alto Sax",
                value: 65
              },
              {
                text: "Tenor Sax",
                value: 66
              },
              {
                text: "Baritone Sax",
                value: 67
              },
              {
                text: "Oboe",
                value: 68
              },
              {
                text: "English Horn",
                value: 69
              },
              {
                text: "Bassoon",
                value: 70
              },
              {
                text: "Clarinet",
                value: 71
              },
              {
                text: "Piccolo",
                value: 72
              },
              {
                text: "Flute",
                value: 73
              },
              {
                text: "Recorder",
                value: 74
              },
              {
                text: "Pan Flute",
                value: 75
              },
              {
                text: "Blown Bottle",
                value: 76
              },
              {
                text: "Skakuhachi",
                value: 77
              },
              {
                text: "Whistle",
                value: 78
              },
              {
                text: "Ocarina",
                value: 79
              },
              {
                text: "Lead 1 (square)",
                value: 80
              },
              {
                text: "Lead 2 (sawtooth)",
                value: 81
              },
              {
                text: "Lead 3 (calliope)",
                value: 82
              },
              {
                text: "Lead 4 (chiff)",
                value: 83
              },
              {
                text: "Lead 5 (charang)",
                value: 84
              },
              {
                text: "Lead 6 (voice)",
                value: 85
              },
              {
                text: "Lead 7 (fifths)",
                value: 86
              },
              {
                text: "Lead 8 (bass + lead)",
                value: 87
              },
              {
                text: "Pad 1 (new age)",
                value: 88
              },
              {
                text: "Pad 2 (warm)",
                value: 89
              },
              {
                text: "Pad 3 (polysynth)",
                value: 90
              },
              {
                text: "Pad 4 (choir)",
                value: 91
              },
              {
                text: "Pad 5 (bowed)",
                value: 92
              },
              {
                text: "Pad 6 (metallic)",
                value: 93
              },
              {
                text: "Pad 7 (halo)",
                value: 94
              },
              {
                text: "Pad 8 (sweep)",
                value: 95
              },
              {
                text: "FX 1 (rain)",
                value: 96
              },
              {
                text: "FX 2 (soundchannel)",
                value: 97
              },
              {
                text: "FX 3 (crystal)",
                value: 98
              },
              {
                text: "FX 4 (atmosphere)",
                value: 99
              },
              {
                text: "FX 5 (brightness)",
                value: 100
              },
              {
                text: "FX 6 (goblins)",
                value: 101
              },
              {
                text: "FX 7 (echoes)",
                value: 102
              },
              {
                text: "FX 8 (sci-fi)",
                value: 103
              },
              {
                text: "Sitar",
                value: 104
              },
              {
                text: "Banjo",
                value: 105
              },
              {
                text: "Shamisen",
                value: 106
              },
              {
                text: "Koto",
                value: 107
              },
              {
                text: "Kalimba",
                value: 108
              },
              {
                text: "Bag Pipe",
                value: 109
              },
              {
                text: "Fiddle",
                value: 110
              },
              {
                text: "Shanai",
                value: 111
              },
              {
                text: "Tinkle Bell",
                value: 112
              },
              {
                text: "Agogo",
                value: 113
              },
              {
                text: "Steel Drums",
                value: 114
              },
              {
                text: "Woodblock",
                value: 115
              },
              {
                text: "Taiko Drum",
                value: 116
              },
              {
                text: "Melodic Tom",
                value: 117
              },
              {
                text: "Synth Drum",
                value: 118
              },
              {
                text: "Reverse Cymbal",
                value: 119
              },
              {
                text: "Guitar Fret Noise",
                value: 120
              },
              {
                text: "Breath Noise",
                value: 121
              },
              {
                text: "Seashore",
                value: 122
              },
              {
                text: "Bird Tweet",
                value: 123
              },
              {
                text: "Telephone Ring",
                value: 124
              },
              {
                text: "Helicopter",
                value: 125
              },
              {
                text: "Applause",
                value: 126
              },
              {
                text: "Gunshot",
                value: 127
              }
            ]
          },
          "drumkits": {
            acceptReporters: true,
            items: [
              {
                text: "Standard",
                value: 0
              },
              {
                text: "Room",
                value: 8
              },
              {
                text: "Power",
                value: 16
              },
              {
                text: "Electronic",
                value: 24
              },
              {
                text: "TR-808",
                value: 25
              },
              {
                text: "Jazz",
                value: 32
              },
              {
                text: "Brush",
                value: 40
              },
              {
                text: "Orchestra",
                value: 48
              },
              {
                text: "SFX",
                value: 56
              },
              {
                text: "CM-64/32",
                value: 127
              }
            ],
          },
          "controlChange": {
            acceptReporters: true,
            items: [
              {
                "text": "Bank Select",
                "value": 0
              },
              {
                "text": "Modulation Wheel",
                "value": 1
              },
              {
                "text": "Breath Controller",
                "value": 2
              },
              {
                "text": "Undefined (3)",
                "value": 3
              },
              {
                "text": "Foot Controller",
                "value": 4
              },
              {
                "text": "Portamento Time",
                "value": 5
              },
              {
                "text": "Data Entry MSB",
                "value": 6
              },
              {
                "text": "Volume",
                "value": 7
              },
              {
                "text": "Balance",
                "value": 8
              },
              {
                "text": "Undefined (9)",
                "value": 9
              },
              {
                "text": "Pan",
                "value": 10
              },
              {
                "text": "Expression Controller",
                "value": 11
              },
              {
                "text": "Effect Control 1",
                "value": 12
              },
              {
                "text": "Effect Control 2",
                "value": 13
              },
              {
                "text": "Undefined (14)",
                "value": 14
              },
              {
                "text": "Undefined (15)",
                "value": 15
              },
              {
                "text": "General Purpose Controller 1",
                "value": 16
              },
              {
                "text": "General Purpose Controller 2",
                "value": 17
              },
              {
                "text": "General Purpose Controller 3",
                "value": 18
              },
              {
                "text": "General Purpose Controller 4",
                "value": 19
              },
              {
                "text": "Undefined (20)",
                "value": 20
              },
              {
                "text": "Undefined (21)",
                "value": 21
              },
              {
                "text": "Undefined (22)",
                "value": 22
              },
              {
                "text": "Undefined (23)",
                "value": 23
              },
              {
                "text": "Undefined (24)",
                "value": 24
              },
              {
                "text": "Undefined (25)",
                "value": 25
              },
              {
                "text": "Undefined (26)",
                "value": 26
              },
              {
                "text": "Undefined (27)",
                "value": 27
              },
              {
                "text": "Undefined (28)",
                "value": 28
              },
              {
                "text": "Undefined (29)",
                "value": 29
              },
              {
                "text": "Undefined (30)",
                "value": 30
              },
              {
                "text": "Undefined (31)",
                "value": 31
              },
              {
                "text": "LSB for Control 0 (Bank Select)",
                "value": 32
              },
              {
                "text": "LSB for Control 1 (Modulation Wheel)",
                "value": 33
              },
              {
                "text": "LSB for Control 2 (Breath Controller)",
                "value": 34
              },
              {
                "text": "LSB for Control 3 (Undefined)",
                "value": 35
              },
              {
                "text": "LSB for Control 4 (Foot Controller)",
                "value": 36
              },
              {
                "text": "LSB for Control 5 (Portamento Time)",
                "value": 37
              },
              {
                "text": "LSB for Control 6 (Data Entry)",
                "value": 38
              },
              {
                "text": "LSB for Control 7 (Channel Volume, formerly Main Volume)",
                "value": 39
              },
              {
                "text": "LSB for Control 8 (Balance)",
                "value": 40
              },
              {
                "text": "LSB for Control 9 (Undefined)",
                "value": 41
              },
              {
                "text": "LSB for Control 10 (Pan)",
                "value": 42
              },
              {
                "text": "LSB for Control 11 (Expression Controller)",
                "value": 43
              },
              {
                "text": "LSB for Control 12 (Effect control 1)",
                "value": 44
              },
              {
                "text": "LSB for Control 13 (Effect control 2)",
                "value": 45
              },
              {
                "text": "LSB for Control 14 (Undefined)",
                "value": 46
              },
              {
                "text": "LSB for Control 15 (Undefined)",
                "value": 47
              },
              {
                "text": "LSB for Control 16 (General Purpose Controller 1)",
                "value": 48
              },
              {
                "text": "LSB for Control 17 (General Purpose Controller 2)",
                "value": 49
              },
              {
                "text": "LSB for Control 18 (General Purpose Controller 3)",
                "value": 50
              },
              {
                "text": "LSB for Control 19 (General Purpose Controller 4)",
                "value": 51
              },
              {
                "text": "LSB for Control 20 (Undefined)",
                "value": 52
              },
              {
                "text": "LSB for Control 21 (Undefined)",
                "value": 53
              },
              {
                "text": "LSB for Control 22 (Undefined)",
                "value": 54
              },
              {
                "text": "LSB for Control 23 (Undefined)",
                "value": 55
              },
              {
                "text": "LSB for Control 24 (Undefined)",
                "value": 56
              },
              {
                "text": "LSB for Control 25 (Undefined)",
                "value": 57
              },
              {
                "text": "LSB for Control 26 (Undefined)",
                "value": 58
              },
              {
                "text": "LSB for Control 27 (Undefined)",
                "value": 59
              },
              {
                "text": "LSB for Control 28 (Undefined)",
                "value": 60
              },
              {
                "text": "LSB for Control 29 (Undefined)",
                "value": 61
              },
              {
                "text": "LSB for Control 30 (Undefined)",
                "value": 62
              },
              {
                "text": "LSB for Control 31 (Undefined)",
                "value": 63
              },
              {
                "text": "Damper Pedal on/off (Sustain)",
                "value": 64
              },
              {
                "text": "Portamento On/Off",
                "value": 65
              },
              {
                "text": "Sostenuto On/Off",
                "value": 66
              },
              {
                "text": "Soft Pedal On/Off",
                "value": 67
              },
              {
                "text": "Legato Footswitch",
                "value": 68
              },
              {
                "text": "Hold 2",
                "value": 69
              },
              {
                "text": "Sound Controller 1 (default: Sound Variation)",
                "value": 70
              },
              {
                "text": "Sound Controller 2 (default: Timbre/Harmonic Intens.)",
                "value": 71
              },
              {
                "text": "Sound Controller 3 (default: Release Time)",
                "value": 72
              },
              {
                "text": "Sound Controller 4 (default: Attack Time)",
                "value": 73
              },
              {
                "text": "Sound Controller 5 (default: Brightness)",
                "value": 74
              },
              {
                "text": "Sound Controller 6 (default: Decay Time \u2013 see MMA RP-021)",
                "value": 75
              },
              {
                "text": "Sound Controller 7 (default: Vibrato Rate \u2013 see MMA RP-021)",
                "value": 76
              },
              {
                "text": "Sound Controller 8 (default: Vibrato Depth \u2013 see MMA RP-021)",
                "value": 77
              },
              {
                "text": "Sound Controller 9 (default: Vibrato Delay \u2013 see MMA RP-021)",
                "value": 78
              },
              {
                "text": "Sound Controller 10 (default undefined \u2013 see MMA RP-021)",
                "value": 79
              },
              {
                "text": "General Purpose Controller 5",
                "value": 80
              },
              {
                "text": "General Purpose Controller 6",
                "value": 81
              },
              {
                "text": "General Purpose Controller 7",
                "value": 82
              },
              {
                "text": "General Purpose Controller 8",
                "value": 83
              },
              {
                "text": "Portamento Control",
                "value": 84
              },
              {
                "text": "Undefined (85)",
                "value": 85
              },
              {
                "text": "Undefined (86)",
                "value": 86
              },
              {
                "text": "Undefined (87)",
                "value": 87
              },
              {
                "text": "High Resolution Velocity Prefix",
                "value": 88
              },
              {
                "text": "Undefined (89)",
                "value": 89
              },
              {
                "text": "Undefined (90)",
                "value": 90
              },
              {
                "text": "Effects 1 Depth",
                "value": 91
              },
              {
                "text": "Effects 2 Depth (formerly Tremolo Depth)",
                "value": 92
              },
              {
                "text": "Effects 3 Depth",
                "value": 93
              },
              {
                "text": "Effects 4 Depth (formerly Celeste [Detune] Depth)",
                "value": 94
              },
              {
                "text": "Effects 5 Depth (formerly Phaser Depth)",
                "value": 95
              },
              {
                "text": "Data Increment (Data Entry +1) (see MMA RP-018)",
                "value": 96
              },
              {
                "text": "Data Decrement (Data Entry -1) (see MMA RP-018)",
                "value": 97
              },
              {
                "text": "Non-Registered Parameter Number (NRPN) \u2013 LSB",
                "value": 98
              },
              {
                "text": "Non-Registered Parameter Number (NRPN) \u2013 MSB",
                "value": 99
              },
              {
                "text": "Registered Parameter Number (RPN) \u2013 LSB*",
                "value": 100
              },
              {
                "text": "Registered Parameter Number (RPN) \u2013 MSB*",
                "value": 101
              },
              {
                "text": "Undefined (102)",
                "value": 102
              },
              {
                "text": "Undefined (103)",
                "value": 103
              },
              {
                "text": "Undefined (104)",
                "value": 104
              },
              {
                "text": "Undefined (105)",
                "value": 105
              },
              {
                "text": "Undefined (106)",
                "value": 106
              },
              {
                "text": "Undefined (107)",
                "value": 107
              },
              {
                "text": "Undefined (108)",
                "value": 108
              },
              {
                "text": "Undefined (109)",
                "value": 109
              },
              {
                "text": "Undefined (110)",
                "value": 110
              },
              {
                "text": "Undefined (111)",
                "value": 111
              },
              {
                "text": "Undefined (112)",
                "value": 112
              },
              {
                "text": "Undefined (113)",
                "value": 113
              },
              {
                "text": "Undefined (114)",
                "value": 114
              },
              {
                "text": "Undefined (115)",
                "value": 115
              },
              {
                "text": "Undefined (116)",
                "value": 116
              },
              {
                "text": "Undefined (117)",
                "value": 117
              },
              {
                "text": "Undefined (118)",
                "value": 118
              },
              {
                "text": "Undefined (119)",
                "value": 119
              },
              {
                "text": "[Channel Mode Message] All Sound Off",
                "value": 120
              },
              {
                "text": "[Channel Mode Message] Reset All Controllers",
                "value": 121
              },
              {
                "text": "[Channel Mode Message] Local Control On/Off",
                "value": 122
              },
              {
                "text": "[Channel Mode Message] All Notes Off",
                "value": 123
              },
              {
                "text": "[Channel Mode Message] Omni Mode Off (+ all notes off)",
                "value": 124
              },
              {
                "text": "[Channel Mode Message] Omni Mode On (+ all notes off)",
                "value": 125
              },
              {
                "text": "[Channel Mode Message] Mono Mode On (+ poly off, + all notes off)",
                "value": 126
              },
              {
                "text": "[Channel Mode Message] Poly Mode On (+ mono off, +all notes off)",
                "value": 127
              }
            ]
          },
          "controlChangeOnOff": {
            acceptReporters: true,
            items: [
              {
                "text": "Damper Pedal on/off (Sustain)",
                "value": 64
              },
              {
                "text": "Portamento On/Off",
                "value": 65
              },
              {
                "text": "Sostenuto On/Off",
                "value": 66
              },
              {
                "text": "Soft Pedal On/Off",
                "value": 67
              },
              {
                "text": "Legato Footswitch",
                "value": 68
              },
              {
                "text": "Hold 2",
                "value": 69
              },
              {
                "text": "[Channel Mode Message] Local Control On/Off",
                "value": 122
              }
            ]
          }
        }
      };
    }

    async initialize(){
      await this.SpessaSynth.init();
    }

    isInitialized(){
      return this.SpessaSynth.initialized;
    }

    // ---
    
    async addSoundfont(args){
      const splitIntoParts = (string, partLength) => {
        const arr = [];
        for (let i = 0; i < string.length; i += partLength) {
          arr.push(string.substring(i, i + partLength));
        }
        return arr;
      }

      if (!this.SpessaSynth.initialized) return
      var arrayBuffer;
      var data = args.data;
      switch (args.type){
        case "base64":
          data = "data:/octet-stream;base64," + data;
        case "URL":
          const response = await fetch(data);
          arrayBuffer = await response.arrayBuffer();
          break;
        case "hex":
          arrayBuffer = splitIntoParts(data, 2);
          arrayBuffer = Uint8Array.from(arrayBuffer.map((o) => parseInt(o, 16)));
          break;
        case "binary":
          arrayBuffer = splitIntoParts(args.data, 8);
          arrayBuffer = Uint8Array.from(arrayBuffer.map((o) => parseInt(o, 2)));
          break;
      }

      await this.SpessaSynth.synth.soundBankManager.addSoundBank(arrayBuffer, args.id);
    }

    loadSoundfont(args){
      if (!this.SpessaSynth.initialized) return
      var priority = this.SpessaSynth.synth.soundBankManager.priorityOrder;
      var banks = this.SpessaSynth.synth.soundBankManager.soundBankList.map((bank) => bank.id);
      if (args.behaviour == "fallback"){
        this.SpessaSynth.synth.soundBankManager.priorityOrder = [args.id].concat(banks.filter((id)=> id != args.id));
      } else {
        this.SpessaSynth.synth.soundBankManager.priorityOrder = [args.id];
      }
    }

    // ---

    selectChannel(args, util){
      switch (args.scope){
        case "script":
          util.thread.channel = args.channel;
          util.thread.channelTime = Date.now();
          break;
        case "sprite":
          util.target.channel = args.channel;
          util.target.channelTime = Date.now();
          break;
        case "project":
          this.projectChannel = args.channel;
          this.projectChannelTime = Date.now();
          break;
      }
    }

    currentChannel(args, util){
      if (!util.thread.channel){
        util.thread.channel = 1;
        util.thread.channelTime = 0;
      }
      if (!util.target.channel){
        util.target.channel = 1;
        util.target.channelTime = 0;
      }
      var channel = [util.thread.channel, util.target.channel, this.projectChannel];
      var time = [util.thread.channelTime, util.target.channelTime, this.projectChannelTime];
      return channel[time.indexOf(Math.max(...time))];
    }

    setTempo(args){
      if (!this.SpessaSynth.initialized) return
      this.tempo = args.bpm;
    }

    // ---

    noteOnChannel(args){
      if (!this.SpessaSynth.initialized) return
      this.SpessaSynth.synth.noteOn(args.channel - 1, args.note, args.velocity);
    }
    
    noteOffChannel(args){
      if (!this.SpessaSynth.initialized) return
      this.SpessaSynth.synth.noteOff(args.channel - 1, args.note, args.velocity);
    }

    async playNoteChannel(args) {
      if (!this.SpessaSynth.initialized) return;
      var progress = 0;
      var tick = 100;

      this.SpessaSynth.synth.noteOn(args.channel - 1, args.note, args.velocity);

      while (progress < args.beats){
        progress += this.tempo * tick / 60000;
        await delay(tick);
      }
      
      this.SpessaSynth.synth.noteOff(args.channel - 1, args.note, args.velocity);
    }

    playNoteChannelWait(args) {
      if (!this.SpessaSynth.initialized) return;
      return new Promise((resolve) => {
        var progress = 0;
        var tick = 100;

        this.SpessaSynth.synth.noteOn(args.channel - 1, args.note, args.velocity);

        const interval = setInterval(() => {
          progress += this.tempo * tick / 60000;

          if (progress >= args.beats) {
            clearInterval(interval);
            this.SpessaSynth.synth.noteOff(args.channel - 1, args.note, args.velocity);
            resolve();
          }
        }, tick);
      });
    }

    // ---

    changeChannelInstrument(args){
      if (!this.SpessaSynth.initialized) return
      this.SpessaSynth.synth.programChange(args.channel - 1, args.instrument);
    }

    changeDrumKit(args){
      if (!this.SpessaSynth.initialized) return
      this.SpessaSynth.synth.programChange(9, args.drumkit);
    }

    setDrumKit(args){
      this.SpessaSynth.synth.setDrums(args.channel - 1, args.value);
    }

    programChangeChannel(args){
      if (!this.SpessaSynth.initialized) return
      this.SpessaSynth.synth.programChange(args.channel - 1, args.program);
    }

    transposeChannel(args){
      if (!this.SpessaSynth.initialized) return
      this.SpessaSynth.synth.transposeChannel(args.channel - 1, args.semitones, args.force);
    }

    setChannelPitchWheelRange(args){
      this.SpessaSynth.synth.pitchWheelRange(args.channel - 1, args.semitones);
    }

    pitchWheelChannel(args){
      this.SpessaSynth.synth.pitchWheel(args.channel - 1, args.value);
    }

    sendControlChange(args){
      this.SpessaSynth.synth.controllerChange(args.channel - 1, args.function, args.value);
    }

    sendBoolControlChange(args){
      console.log("Hi")
    }

    muteChannel(args){
      this.SpessaSynth.synth.muteChannel(args.channel - 1, true);
    }

    unmuteChannel(args){
      this.SpessaSynth.synth.muteChannel(args.channel - 1, false);
    }

    isChannelMute(args){
      return this.SpessaSynth.synth.channelProperties[args.channel - 1].isMuted;
    }

    // ---
    
    allSoundsOff(){
      if (!this.SpessaSynth.initialized) return
      this.SpessaSynth.synth.stopAll();
    }
  }
  Scratch.extensions.register(new MIDISynthesizer());
})(Scratch);