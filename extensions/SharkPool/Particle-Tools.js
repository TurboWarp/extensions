// Name: Particle Tools
// ID: ParticleToolsSP
// Description: Tools for making particle engines easier.
// By: SharkPool

// Version V.1.2.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Particle Tools must run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNDQuMjkzODgiIGhlaWdodD0iMTQ0LjI5Mzg4IiB2aWV3Qm94PSIwLDAsMTQ0LjI5Mzg4LDE0NC4yOTM4OCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIyMzcuNDQwOTUiIHkxPSIxNDEuMzYxOSIgeDI9IjIzNy40NDA5NSIgeTI9IjE3Ny4xNDUzMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmZmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDkwZmYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMjQyLjU1OTA2IiB5MT0iMTgzLjQxNzEzIiB4Mj0iMjQyLjU1OTA2IiB5Mj0iMjE4LjYzODEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDA5MGZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjIwMS4zNjE5MSIgeTE9IjE4Mi41NTkwNiIgeDI9IjIzNS4xNzY3NiIgeTI9IjE4Mi41NTkwNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0zIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmZmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDkwZmYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMjQ1LjM4NTY5IiB5MT0iMTc3LjQ0MDk1IiB4Mj0iMjc4LjYzODEiIHkyPSIxNzcuNDQwOTUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItNCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDA5MGZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjI1MC41NTQzIiB5MT0iMTU3LjcxNTAzIiB4Mj0iMjY5LjY5MjU0IiB5Mj0iMTYxLjQyMjAzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTUiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwOTBmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyMTAuMzA3NDYiIHkxPSIxOTguNTc3OTgiIHgyPSIyMjkuNDQ1NzEiIHkyPSIyMDIuMjg0OTciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItNiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA5MGZmIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeDE9IjIwNS42MTg3NSIgeTE9IjE1OS4yNTA5NiIgeDI9IjIzMi41MTU1OCIgeTI9IjE2My41ODI5MiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci03Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmZmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDkwZmYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMjQ4LjM0MjE1IiB5MT0iMTk2LjkyMTMyIiB4Mj0iMjc0LjQ2ODc2IiB5Mj0iMjAxLjEyOTIzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTgiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwOTBmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjcuODUzMDYsLTEwNy44NTMwNikiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTE2Ny44NTMwNiwxODBjMCwtMzkuODQ1NjYgMzIuMzAxMjgsLTcyLjE0Njk0IDcyLjE0Njk0LC03Mi4xNDY5NGMzOS44NDU2NSwwIDcyLjE0Njk0LDMyLjMwMTI4IDcyLjE0Njk0LDcyLjE0Njk0YzAsMzkuODQ1NjYgLTMyLjMwMTI4LDcyLjE0Njk0IC03Mi4xNDY5NCw3Mi4xNDY5NGMtMzkuODQ1NjYsMCAtNzIuMTQ2OTQsLTMyLjMwMTI4IC03Mi4xNDY5NCwtNzIuMTQ2OTR6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iIzAwOTBmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjM0LjE1ODQ5LDE0MS4zNjE5aDkuMzU4MDVjMCwwIC01LjA5MjkzLDkuODg1MTUgLTYuMTA0MDIsMTkuMTE4NzJjLTEuMTI2NTgsMTAuMjg4MzIgMi4wNzY5MywxNi42NjQ3IDEuNjMyNDQsMTYuNjY0N2MtMC44MTU5LDAgLTYuNTUxNTIsLTYuMzg5OTcgLTcuNTM3NzEsLTE2LjY4Mzk5Yy0wLjg4MzkyLC05LjIyNjQ3IDIuNjUxMjUsLTE5LjA5OTQzIDIuNjUxMjUsLTE5LjA5OTQzeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9InVybCgjY29sb3ItMSkiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI0NS44NDE1MiwyMTguNjM4MWgtOS4zNTgwNGMwLDAgNS4wOTI5NCwtOS44ODUxNSA2LjEwNDAzLC0xOS4xMTg3MmMxLjEyNjU4LC0xMC4yODgzMiAtMS4yMzMyNywtMTYuMTAyMjYgLTAuNzg4NzksLTE2LjEwMjI2YzAuODE1OSwwIDUuNzA3ODcsNS44Mjc1NCA2LjY5NDA2LDE2LjEyMTU0YzAuODgzOTIsOS4yMjY0NyAtMi42NTEyNiwxOS4wOTk0MyAtMi42NTEyNiwxOS4wOTk0M3oiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSJ1cmwoI2NvbG9yLTIpIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yMDEuMzYxOTEsMTg1Ljg0MTUydi05LjM1ODA0YzAsMCA5Ljg4NTE1LDUuMDkyOTQgMTkuMTE4NzEsNi4xMDQwM2MxMC4yODgzMiwxLjEyNjU4IDE0LjY5NjE0LC0wLjk1MjA0IDE0LjY5NjE0LC0wLjUwNzU1YzAsMC44MTU5IC00LjQyMTQxLDUuNDI2NjQgLTE0LjcxNTQzLDYuNDEyODNjLTkuMjI2NDcsMC44ODM5MiAtMTkuMDk5NDIsLTIuNjUxMjUgLTE5LjA5OTQyLC0yLjY1MTI1eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9InVybCgjY29sb3ItMykiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI3OC42MzgxLDE3NC4xNTg0OXY5LjM1ODA1YzAsMCAtOS44ODUxNSwtNS4wOTI5MyAtMTkuMTE4NzIsLTYuMTA0MDJjLTEwLjI4ODMyLC0xLjEyNjU4IC0xNC4xMzM2OSwwLjY3MDgyIC0xNC4xMzM2OSwwLjIyNjMzYzAsLTAuODE1OSAzLjg1ODk3LC01LjE0NTQxIDE0LjE1Mjk4LC02LjEzMTZjOS4yMjY0NywtMC44ODM5MiAxOS4wOTk0MiwyLjY1MTI1IDE5LjA5OTQyLDIuNjUxMjV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0idXJsKCNjb2xvci00KSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjY2LjQ5MzQzLDE0Ny40NzA4M2w0Ljk0MjM2LDQuOTUxMjdjMCwwIC03LjkxOTk0LDIuNTI2MTIgLTEzLjMzOTM1LDYuODY3NzdjLTYuMDM4NDcsNC44Mzc2MiAtOS42NTQzLDExLjUzMzcyIC05Ljg4OTA1LDExLjI5ODU1Yy0wLjQzMDksLTAuNDMxNjggMS44NTQ4LC04LjQ3NDY5IDYuNzgwNDQsLTE0LjQzMzE3YzQuNDE0ODMsLTUuMzQwNTUgMTEuNTA1NiwtOC42ODQ0MyAxMS41MDU2LC04LjY4NDQzeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9InVybCgjY29sb3ItNSkiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIxMy41MDY1NywyMTIuNTI5MThsLTQuOTQyMzcsLTQuOTUxMjdjMCwwIDcuOTE5OTQsLTIuNTI2MTIgMTMuMzM5MzUsLTYuODY3NzdjNi4wMzg0NywtNC44Mzc2MiA5LjY1NDMsLTExLjUzMzcyIDkuODg5MDUsLTExLjI5ODU0YzAuNDMwOSwwLjQzMTY4IC0xLjg1NDgsOC40NzQ2OSAtNi43ODA0NCwxNC40MzMxNmMtNC40MTQ4Myw1LjM0MDU1IC0xMS41MDU1OSw4LjY4NDQzIC0xMS41MDU1OSw4LjY4NDQzeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9InVybCgjY29sb3ItNikiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIwNi4yMTQzLDE1NS41NTMyM2w0LjgxOTE0LC01LjM1MjIxYzAsMCAzLjAzMDk2LDguMDAzNDEgNy43OTEzLDEzLjMzNjczYzUuMzA0MTEsNS45NDI1MyAxMi4zODYwMSw5LjI5MjY5IDEyLjE1NzExLDkuNTQ2OTJjLTAuNDIwMTcsMC40NjY2MyAtOC44MTM3OSwtMS40NDIzMSAtMTUuMjA5MTgsLTYuMTc5MzljLTUuNzMyMTUsLTQuMjQ1ODQgLTkuNTU4MzUsLTExLjM1MjAzIC05LjU1ODM1LC0xMS4zNTIwM3oiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSJ1cmwoI2NvbG9yLTcpIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNzMuODkwMjcsMjA0LjcyMTA4bC00LjY4MTE0LDUuMTk4OTRjMCwwIC0yLjk0NDE2LC03Ljc3NDIzIC03LjU2ODE4LC0xMi45NTQ4MWMtNS4xNTIyMiwtNS43NzIzNyAtMTIuMDMxMzIsLTkuMDI2NTkgLTExLjgwODk4LC05LjI3MzU0YzAuNDA4MTMsLTAuNDUzMjcgOC41NjE0MSwxLjQwMTAxIDE0Ljc3MzY2LDYuMDAyNDZjNS41NjgwMSw0LjEyNDI2IDkuMjg0NjQsMTEuMDI2OTUgOS4yODQ2NCwxMS4wMjY5NXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSJ1cmwoI2NvbG9yLTgpIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yMzEuODUyNjEsMTQwLjk3NDA1YzAsLTQuNjM0MjMgMy43NTY3OCwtOC4zOTEwMiA4LjM5MTAxLC04LjM5MTAyYzQuNjM0MjMsMCA4LjM5MTAyLDMuNzU2NzkgOC4zOTEwMiw4LjM5MTAyYzAsNC42MzQyMyAtMy43NTY3OSw4LjM5MTAxIC04LjM5MTAyLDguMzkxMDFjLTQuNjM0MjMsMCAtOC4zOTEwMSwtMy43NTY3OCAtOC4zOTEwMSwtOC4zOTEwMXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41Ii8+PHBhdGggZD0iTTI0OC4xNDc0LDIxOS4wMjU5NmMwLDQuNjM0MjMgLTMuNzU2NzksOC4zOTEwMSAtOC4zOTEwMiw4LjM5MTAxYy00LjYzNDIzLDAgLTguMzkxMDEsLTMuNzU2NzggLTguMzkxMDEsLTguMzkxMDFjMCwtNC42MzQyMyAzLjc1Njc4LC04LjM5MTAyIDguMzkxMDEsLTguMzkxMDJjNC42MzQyMywwIDguMzkxMDIsMy43NTY3OSA4LjM5MTAyLDguMzkxMDJ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik0yMDAuOTc0MDUsMTg4LjE0NzRjLTQuNjM0MjMsMCAtOC4zOTEwMiwtMy43NTY3OSAtOC4zOTEwMiwtOC4zOTEwMmMwLC00LjYzNDIzIDMuNzU2NzksLTguMzkxMDEgOC4zOTEwMiwtOC4zOTEwMWM0LjYzNDIzLDAgOC4zOTEwMSwzLjc1Njc4IDguMzkxMDEsOC4zOTEwMWMwLDQuNjM0MjMgLTMuNzU2NzgsOC4zOTEwMiAtOC4zOTEwMSw4LjM5MTAyeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJNMjc5LjAyNTk2LDE3MS44NTI2MWM0LjYzNDIzLDAgOC4zOTEwMSwzLjc1Njc4IDguMzkxMDEsOC4zOTEwMWMwLDQuNjM0MjMgLTMuNzU2NzksOC4zOTEwMiAtOC4zOTEwMSw4LjM5MTAyYy00LjYzNDIzLDAgLTguMzkxMDIsLTMuNzU2NzkgLTguMzkxMDIsLTguMzkxMDJjMCwtNC42MzQyMyAzLjc1NjgsLTguMzkxMDEgOC4zOTEwMiwtOC4zOTEwMXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41Ii8+PHBhdGggZD0iTTI2NS40ODA4LDE0Ni4wNDU5NmMyLjQ1MTk0LC0yLjQ0NzUzIDYuNDIzNzQsLTIuNDQzOTUgOC44NzEyNywwLjAwNzk5YzIuNDQ3NTIsMi40NTE5NCAyLjQ0Mzk1LDYuNDIzNzQgLTAuMDA3OTksOC44NzEyNmMtMi40NTE5NCwyLjQ0NzUzIC02LjQyMzc0LDIuNDQzOTUgLTguODcxMjYsLTAuMDA3OTljLTIuNDQ3NTIsLTIuNDUxOTQgLTIuNDQzOTYsLTYuNDIzNzQgMC4wMDc5OCwtOC44NzEyNnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41Ii8+PHBhdGggZD0iTTIxNC41MTkxOSwyMTMuOTU0MDRjLTIuNDUxOTQsMi40NDc1MyAtNi40MjM3NCwyLjQ0Mzk1IC04Ljg3MTI3LC0wLjAwNzk5Yy0yLjQ0NzUzLC0yLjQ1MTk0IC0yLjQ0Mzk1LC02LjQyMzc0IDAuMDA3OTksLTguODcxMjdjMi40NTE5NCwtMi40NDc1MyA2LjQyMzczLC0yLjQ0Mzk1IDguODcxMjYsMC4wMDc5OWMyLjQ0NzUzLDIuNDUxOTQgMi40NDM5Niw2LjQyMzc0IC0wLjAwNzk4LDguODcxMjZ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik0yMDQuODA1LDE1Ni42NzIzMWMtMi42NTA0OSwtMi4zODY1IC0yLjg2NDQ5LC02LjQ2OTc5IC0wLjQ3Nzk5LC05LjEyMDI4YzIuMzg2NSwtMi42NTA0OSA2LjQ2OTc5LC0yLjg2NDQ5IDkuMTIwMjcsLTAuNDc3OTljMi42NTA0OSwyLjM4NjUgMi44NjQ1LDYuNDY5NzkgMC40Nzc5OSw5LjEyMDI3Yy0yLjM4NjUsMi42NTA0OSAtNi40Njk3OSwyLjg2NDUgLTkuMTIwMjgsMC40Nzh6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik0yNzUuMjU5MiwyMDMuNjM0MDRjMi41NzQ1OSwyLjMxODE2IDIuNzgyNDYsNi4yODQ1MiAwLjQ2NDMsOC44NTkxMWMtMi4zMTgxNiwyLjU3NDU5IC02LjI4NDUxLDIuNzgyNDYgLTguODU5MTEsMC40NjQzYy0yLjU3NDU5LC0yLjMxODE2IC0yLjc4MjQ2LC02LjI4NDUyIC0wLjQ2NDMsLTguODU5MWMyLjMxODE2LC0yLjU3NDU5IDYuMjg0NTIsLTIuNzgyNDcgOC44NTkxMSwtMC40NjQzeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==";

  class ParticleToolsSP {
    constructor() {
      this.IDs = {};
      this.IDcount = 0;
      this.Gravity = 9.8;
    }

    getInfo() {
      return {
        id: "ParticleToolsSP",
        name: "Particle Tools",
        docsURI: "https://extensions.penguinmod.com/docs/particle-tools",
        color1: "#0090ff",
        menuIconURI,
        blocks: [
          {
            opcode: "genID",
            blockType: Scratch.BlockType.COMMAND,
            text: "generate new particle ID with velocity x [VELX] and y [VELY]",
            arguments: {
              VELX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5
              },
              VELY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8
              },
            },
          },
          {
            opcode: "replaceID",
            blockType: Scratch.BlockType.COMMAND,
            text: "replace particle ID [ID] with velocity x [VELX] and y [VELY]",
            arguments: {
              VELX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5
              },
              VELY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8
              },
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Operations" },
          {
            opcode: "deleteID",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all particle IDs"
          },
          {
            opcode: "deleteOneID",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete particle ID [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
            },
          },
          {
            opcode: "whenID",
            blockType: Scratch.BlockType.EVENT,
            text: "when particle ID is [TYPE]",
            isEdgeActivated: false,
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "EVENT"
              },
            },
          },
          "---",
          {
            opcode: "reportID",
            blockType: Scratch.BlockType.REPORTER,
            text: "particle ID [NAME] [REPORT]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              REPORT: {
                type: Scratch.ArgumentType.STRING,
                menu: "REPORT_TYPE"
              },
            },
          },
          {
            opcode: "existID",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "particle ID [NAME] [TYPE] ?",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "EXIST"
              },
              NAME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            },
          },
          {
            opcode: "reportCnt",
            blockType: Scratch.BlockType.REPORTER,
            text: "number of particle IDs",
          },
          { blockType: Scratch.BlockType.LABEL, text: "Velocity Randomizer" },
          {
            opcode: "genVel",
            blockType: Scratch.BlockType.REPORTER,
            text: "pick random [MIN] to [MAX] precision [TorF]",
            arguments: {
              MIN: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -5
              },
              MAX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5
              },
              TorF: {
                type: Scratch.ArgumentType.STRING,
                menu: "PRECISION"
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Gravity Force" },
          {
            opcode: "setGravity",
            blockType: Scratch.BlockType.COMMAND,
            text: "set gravity to [GRAVITY]",
            arguments: {
              GRAVITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 9.8
              },
            },
          },
          {
            opcode: "currentGrav",
            blockType: Scratch.BlockType.REPORTER,
            text: "current gravity"
          },
          {
            opcode: "updateGravity",
            blockType: Scratch.BlockType.COMMAND,
            text: "update [REPORT] with gravity for particle ID:[ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              REPORT: {
                type: Scratch.ArgumentType.STRING,
                menu: "REPORT_TYPE"
              },
            },
          },
          {
            opcode: "updateCustomGravity",
            blockType: Scratch.BlockType.COMMAND,
            text: "update [REPORT] with force [INPUT] for particle ID:[ID]",
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              INPUT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1.5
              },
              REPORT: {
                type: Scratch.ArgumentType.STRING,
                menu: "REPORT_TYPE"
              },
            },
          },
        ],
        menus: {
          REPORT_TYPE: {
            acceptReporters: true,
            items: ["all", "x velocity", "y velocity"]
          },
          PRECISION: {
            acceptReporters: true,
            items: ["on", "off"]
          },
          EXIST: {
            acceptReporters: false,
            items: ["exists", "used"]
          },
          EVENT: {
            acceptReporters: false,
            items: ["added", "deleted"]
          },
        }
      };
    }

    genID(args) {
      this.IDcount++;
      this.IDs[this.IDcount] = {
        ID: this.IDcount.toString(),
        "X Velocity": args.VELX.toString(),
        "Y Velocity": args.VELY.toString(),
        active: false
      };
      runtime.startHats("ParticleToolsSP_whenID", { TYPE: "added" });
    }

    replaceID(args) {
      if (this.IDs[args.ID] === undefined) this.IDcount++;
      this.IDs[args.ID] = {
        ID: args.ID.toString(),
        "X Velocity": args.VELX.toString(),
        "Y Velocity": args.VELY.toString(),
        active: false
      };
      runtime.startHats("ParticleToolsSP_whenID", { TYPE: "added" });
    }

    reportID(args) {
      const ID = args.NAME;
      if (this.IDs[ID] === undefined) return "ID doesnt exist!";
      const Value = this.IDs[ID];
      delete Value.active;
      if (args.REPORT === "all") return JSON.stringify(Value);
      else if (args.REPORT === "x velocity") {
        this.IDs[ID].active = true;
        return Value["X Velocity"];
      } else {
        this.IDs[ID].active = true;
        return Value["Y Velocity"];
      }
    }

    updateGravity(args) {
      const ID = args.ID;
      if (this.IDs[ID] !== undefined) {
        this.IDs[ID].active = true;
        const Value = this.IDs[ID];
        const currentXVelocity = parseFloat(Value["X Velocity"]);
        const currentYVelocity = parseFloat(Value["Y Velocity"]);
        const newXVelocity = currentXVelocity - this.Gravity;
        const newYVelocity = currentYVelocity - this.Gravity;
        if (args.REPORT === "all") {
          Value["X Velocity"] = newXVelocity.toString();
          Value["Y Velocity"] = newYVelocity.toString();
        } else if (args.REPORT === "x velocity") {
          Value["X Velocity"] = newXVelocity.toString();
        } else {
          Value["Y Velocity"] = newYVelocity.toString();
        }
      }
    }

    updateCustomGravity(args) {
      const ID = args.ID;
      if (this.IDs[ID] !== undefined) {
        this.IDs[ID].active = true;
        const Value = this.IDs[ID];
        const currentXVelocity = parseFloat(Value["X Velocity"]);
        const currentYVelocity = parseFloat(Value["Y Velocity"]);
        const newXVelocity = currentXVelocity - args.INPUT;
        const newYVelocity = currentYVelocity - args.INPUT;
        if (args.REPORT === "all") {
          Value["X Velocity"] = newXVelocity.toString();
          Value["Y Velocity"] = newYVelocity.toString();
        } else if (args.REPORT === "x velocity") {
          Value["X Velocity"] = newXVelocity.toString();
        } else {
          Value["Y Velocity"] = newYVelocity.toString();
        }
      }
    }

    genVel(args) {
      if (args.TorF === "on") {
        const max = Scratch.Cast.toNumber(args.MAX);
        const min = Scratch.Cast.toNumber(args.MIN);
        return Math.round((Math.random() * (max - min + 1) + min) * 10000) /10000;
      } else {
        const max = Scratch.Cast.toNumber(args.MAX);
        const min = Scratch.Cast.toNumber(args.MIN);
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    }

    reportCnt() { return this.IDcount }

    currentGrav() { return this.Gravity }

    deleteID() {
      if (Object.keys(this.IDs).length > 0) runtime.startHats("ParticleToolsSP_whenID", { TYPE: "deleted" });
      this.IDs = {};
      this.IDcount = 0;
    }

    deleteOneID(args) {
      const ID = args.NAME;
      if (this.IDs[ID]) {
        runtime.startHats("ParticleToolsSP_whenID", { TYPE: "deleted" });
        delete this.IDs[ID];
        if (this.IDcount > 0) this.IDcount--;
      }
    }

    existID(args) {
      if (args.TYPE === "exists") return Scratch.Cast.toBoolean(this.IDs[args.NAME]);
      else return (this.IDs[args.NAME] && this.IDs[args.NAME].active) || false;
    }

    setGravity(args) { this.Gravity = args.GRAVITY }
  }

  Scratch.extensions.register(new ParticleToolsSP());
})(Scratch);
