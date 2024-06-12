// Name: Soundcloud API
// ID: SPsoundCloud
// Description: Fetch Songs and Statistics from Soundcloud (Unofficial)
// By: SharkPool

// Version V.1.0.21

/* !IMPORTANT!
  In this Extension, I use regulare fetch()
  I am unable to use Scratch.fetch() since it doesnt work for certain people
  It is a issue I am unaware of, nor do I know what causes it...
  but it happened to certain people like TheShovel

  Same issue with my Spotify API extension.
*/

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Soundcloud API must be run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMzIiIGhlaWdodD0iMjMyIiB2aWV3Qm94PSIwLDAsMjMyLDIzMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIyMzkuNjMzOTUiIHkxPSIzMDMuMDAxMzkiIHgyPSIyMzkuNjMzOTUiIHkyPSI3MS4wMDEzOSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiYzU4MDAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiYzE5MDAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMjM5LjYzMzk0IiB5MT0iODMuMDAxMzgiIHgyPSIyMzkuNjMzOTQiIHkyPSIyOTEuMDAxMzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY3NjAwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmYyMjAwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyMy42MzM5NSwtNzEuMDAxMzgpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMzkuNjMzOTUsNzEuMDAxMzljNjQuMDY1MDMsMCAxMTYsNTEuOTM0OTcgMTE2LDExNmMwLDY0LjA2NTAzIC01MS45MzQ5NywxMTYgLTExNiwxMTZjLTY0LjA2NTAzLDAgLTExNiwtNTEuOTM0OTcgLTExNiwtMTE2YzAsLTY0LjA2NTAzIDUxLjkzNDk3LC0xMTYgMTE2LC0xMTZ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0idXJsKCNjb2xvci0xKSIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMTM1LjYzMzk0LDE4Ny4wMDEzOGMwLC01Ny40Mzc2MSA0Ni41NjIzOSwtMTA0IDEwNCwtMTA0YzU3LjQzNzYxLDAgMTA0LDQ2LjU2MjM5IDEwNCwxMDRjMCw1Ny40Mzc2MSAtNDYuNTYyMzksMTA0IC0xMDQsMTA0Yy01Ny40Mzc2MSwwIC0xMDQsLTQ2LjU2MjM5IC0xMDQsLTEwNHoiIGZpbGw9InVybCgjY29sb3ItMikiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTE1OC42NTQxNSwxODEuNDc0MzljMC4zODYzOSwwIDAuNjkxNDQsMC4zMDUwNSAwLjc1MjQ1LDAuNzMyMTFsMi4wMTMzMSwxNi4xNjc0OWwtMi4wMTMzMSwxNS44MjE3N2MtMC4wNjEwMSwwLjQyNzA3IC0wLjM2NjA2LDAuNzMyMTEgLTAuNzUyNDUsMC43MzIxMWMtMC4zODYzOSwwIC0wLjY5MTQ0LC0wLjMwNTA1IC0wLjc1MjQ1LC0wLjczMjExbC0xLjc2OTI3LC0xNS44MjE3N2wxLjc2OTI3LC0xNi4xNjc0OWMwLjA2MTAxLC0wLjQyNzA3IDAuMzY2MDYsLTAuNzMyMTEgMC43NTI0NSwtMC43MzIxMSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMTUyLjAwNDEzLDE4Ny42NzcwMWMwLjM2NjA2LDAgMC42NzExLDAuMjg0NzEgMC43MTE3OCwwLjY5MTQ0bDEuNTY1OTEsMTAuMDA1NTRsLTEuNTY1OTEsOS44NDI4NWMtMC4wNDA2NywwLjQwNjczIC0wLjM0NTcyLDAuNjkxNDQgLTAuNzExNzgsMC42OTE0NGMtMC4zODYzOSwwIC0wLjY3MTEsLTAuMjg0NzEgLTAuNzMyMTEsLTAuNjkxNDRsLTEuMzIxODcsLTkuODIyNTFsMS4zMjE4NywtMTAuMDA1NTRjMC4wNjEwMSwtMC40MjcwNyAwLjM2NjA2LC0wLjcxMTc4IDAuNzMyMTEsLTAuNzExNzgiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTE2NS43NTE1OCwxNzguMzAxOTFjMC40Njc3NCwwIDAuODMzNzksMC4zNjYwNiAwLjg5NDgsMC45MTUxNGwxLjkxMTYzLDE5LjE3NzI4bC0xLjkxMTYzLDE4LjQ4NTg0Yy0wLjA0MDY3LDAuNTA4NDEgLTAuNDI3MDcsMC44NzQ0NyAtMC44OTQ4LDAuODc0NDdjLTAuNDY3NzQsMCAtMC44NTQxMywtMC4zODYzOSAtMC44OTQ4LC0wLjg5NDhsLTEuNjg3OTMsLTE4LjQ4NTg0bDEuNjg3OTMsLTE5LjE3NzI4YzAuMDQwNjcsLTAuNTI4NzUgMC40MjcwNywtMC44OTQ4IDAuODk0OCwtMC44OTQ4IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0xNzIuODY5MzQsMTc3LjYzMDhjMC41NDkwOCwwIDAuOTk2NDksMC40NDc0IDEuMDU3NSwxLjAxNjgybDEuODA5OTUsMTkuNzI2MzdsLTEuODA5OTUsMTkuMDc1NmMtMC4wNjEwMSwwLjU4OTc2IC0wLjUwODQxLDEuMDM3MTYgLTEuMDU3NSwxLjAzNzE2Yy0wLjU0OTA4LDAgLTEuMDE2ODIsLTAuNDQ3NCAtMS4wNTc1LC0xLjAzNzE2bC0xLjU4NjI0LC0xOS4wNzU2bDEuNTg2MjQsLTE5LjcwNjAzYzAuMDQwNjcsLTAuNTg5NzYgMC41MDg0MSwtMS4wMzcxNiAxLjA1NzUsLTEuMDM3MTYiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTE4MS4yNjgzLDIxNy42MTIyOXYweiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMjExZTFmIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2UtbWl0ZXJsaW1pdD0iMSIvPjxwYXRoIGQ9Ik0xODIuOTc2NTYsMTk4LjM5NDMzbC0xLjcwODI2LDE5LjIxNzk2Yy0wLjA0MDY3LDAuNjkxNDQgLTAuNTQ5MDgsMS4xOTk4NSAtMS4xOTk4NSwxLjE5OTg1Yy0wLjY1MDc3LDAgLTEuMTc5NTEsLTAuNTI4NzUgLTEuMjIwMTksLTEuMTk5ODVsLTEuNTA0OSwtMTkuMjE3OTZsMS41MDQ5LC0xOC4yODI0OGMwLjA0MDY3LC0wLjY5MTQ0IDAuNTY5NDIsLTEuMTk5ODUgMS4yMjAxOSwtMS4xOTk4NWMwLjYzMDQzLDAgMS4xNTkxOCwwLjUwODQxIDEuMTk5ODUsMS4xNzk1MXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTE4Ny4zMDgyMywxNjcuMjc5NTRjMC43MTE3OCwwIDEuMzIxODcsMC41ODk3NiAxLjM2MjU0LDEuMzQyMjFsMS41ODYyNCwyOS43NTIyNGwtMS41ODYyNCwxOS4yMTc5NnYwYy0wLjA0MDY3LDAuNzUyNDUgLTAuNjUwNzcsMS4zNDIyMSAtMS4zNjI1NCwxLjM0MjIxYy0wLjczMjExLDAgLTEuMzIxODcsLTAuNTg5NzYgLTEuMzYyNTQsLTEuMzQyMjFsLTEuNDAzMjIsLTE5LjIxNzk2bDEuNDAzMjIsLTI5Ljc1MjI0YzAuMDQwNjcsLTAuNzUyNDUgMC42MzA0MywtMS4zNDIyMSAxLjM2MjU0LC0xLjM0MjIxIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0xOTQuNTA3MzQsMTYwLjQyNjE2YzAuNzkzMTIsMCAxLjQ2NDIzLDAuNjcxMSAxLjUyNTIzLDEuNDg0NTZsMS40ODQ1NiwzNi41NjQ5NmwtMS40ODQ1NiwxOS4xMTYyN3YwYy0wLjA0MDY3LDAuODU0MTMgLTAuNzExNzgsMS41MDQ5IC0xLjUyNTIzLDEuNTA0OWMtMC44MzM3OSwwIC0xLjQ4NDU2LC0wLjY3MTEgLTEuNTI1MjMsLTEuNTA0OWwtMS4zMjE4NywtMTkuMDk1OTRsMS4zMjE4NywtMzYuNTY0OTZjMC4wNDA2NywtMC44NTQxMyAwLjcxMTc4LC0xLjUwNDkgMS41MjUyMywtMS41MDQ5IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0yMDEuOTcwODIsMTU3LjEzMTY1YzAuODk0OCwwIDEuNjI2OTIsMC43MzIxMSAxLjY2NzU5LDEuNjg3OTNsMS4zODI4OCwzOS42MTU0M2wtMS4zODI4OCwxOC45MTI5MXYtMC4wMjAzNGMtMC4wNDA2NywwLjkxNTE0IC0wLjc3Mjc5LDEuNjQ3MjUgLTEuNjY3NTksMS42NDcyNWMtMC45MTUxNCwwIC0xLjY0NzI1LC0wLjczMjExIC0xLjY2NzU5LC0xLjY0NzI1bC0xLjIyMDE5LC0xOC45MTI5MWwxLjIyMDE5LC0zOS42MTU0M2MwLjAyMDM0LC0wLjkzNTQ4IDAuNzUyNDUsLTEuNjY3NTkgMS42Njc1OSwtMS42Njc1OSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMjEyLjUwNTEsMTk4LjM5NDMzbC0xLjI4MTIsMTguNzkwODljLTAuMDQwNjcsMS4wMTY4MiAtMC44MzM3OSwxLjgwOTk1IC0xLjgzMDI4LDEuODA5OTVjLTAuOTk2NDksMCAtMS43ODk2MSwtMC44MTM0NiAtMS44MzAyOCwtMS44MDk5NWwtMS4xMzg4NCwtMTguNzkwODlsMS4xMzg4NCwtNDAuOTM3M2MwLjA0MDY3LC0xLjAxNjgyIDAuODMzNzksLTEuODA5OTUgMS44MzAyOCwtMS44MDk5NWMwLjk5NjQ5LDAgMS43ODk2MSwwLjc5MzEyIDEuODMwMjgsMS44MDk5NXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTIxMS4yMjM5MSwyMTcuMTg1MjJ2MHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzIxMWUxZiIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEiLz48cGF0aCBkPSJNMjE2Ljg3NzQ0LDE1Ni41NDE4OWMxLjA3NzgzLDAgMS45MzE5NiwwLjg1NDEzIDEuOTcyNjQsMS45NTIzbDEuMTc5NTEsMzkuOTAwMTRsLTEuMTc5NTEsMTguNjI4MnYtMC4wMjAzNGMtMC4wMjAzNCwxLjA5ODE3IC0wLjg5NDgsMS45NzI2NCAtMS45NzI2NCwxLjk3MjY0Yy0xLjA3NzgzLDAgLTEuOTUyMywtMC44NTQxMyAtMS45NzI2NCwtMS45NTIzbC0xLjAzNzE2LC0xOC42MDc4NmwxLjAzNzE2LC0zOS45MDAxNGMwLjAyMDM0LC0xLjExODUxIDAuODk0OCwtMS45NzI2NCAxLjk3MjY0LC0xLjk3MjY0IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0yMjQuNDIyMjcsMTU3Ljg0MzQzYzEuMTU5MTgsMCAyLjA5NDY2LDAuOTM1NDggMi4xMzUzMywyLjExNDk5bDEuMDc3ODMsMzguNDM1OTFsLTEuMDc3ODMsMTguNTA2MTh2LTAuMDIwMzRjLTAuMDIwMzQsMS4xNzk1MSAtMC45NzYxNSwyLjExNDk5IC0yLjEzNTMzLDIuMTE0OTljLTEuMTc5NTEsMCAtMi4xMTQ5OSwtMC45MzU0OCAtMi4xMzUzMywtMi4xMTQ5OWwtMC45NTU4MSwtMTguNDg1ODRsMC45NTU4MSwtMzguNDM1OTFjMC4wMjAzNCwtMS4xNzk1MSAwLjk1NTgxLC0yLjExNDk5IDIuMTM1MzMsLTIuMTE0OTkiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTIzMy4yNjg2MywxNTAuNzY2MzRjMC42MTAwOSwwLjQyNzA3IDEuMDE2ODIsMS4xMTg1MSAxLjA1NzUsMS44OTEyOWwwLjk1NTgxLDQ1LjczNjdsLTAuODc0NDcsMTYuNTUzODhsLTAuMTAxNjgsMS44MDk5NWMtMC4wMjAzNCwwLjYzMDQzIC0wLjI4NDcxLDEuMTk5ODUgLTAuNjkxNDQsMS42MDY1OGMtMC40MjcwNywwLjQwNjczIC0wLjk3NjE1LDAuNjcxMSAtMS42MDY1OCwwLjY3MTFjLTAuNzExNzgsMCAtMS4zMjE4NywtMC4zMjUzOCAtMS43NDg5NCwtMC44MzM3OWMtMC4zMDUwNSwtMC4zNjYwNiAtMC41MDg0MSwtMC44NTQxMyAtMC41Mjg3NSwtMS4zNjI1NHYtMC4wODEzNWwtMC44NTQxMywtMTguMzg0MTZsMC44NTQxMywtNDUuMjg5M3YtMC40MjcwN2MwLjAyMDM0LC0wLjc5MzEyIDAuNDI3MDcsLTEuNTA0OSAxLjA1NzUsLTEuOTExNjNjMC4zNDU3MiwtMC4yMjM3IDAuNzcyNzksLTAuMzY2MDYgMS4yMjAxOSwtMC4zNjYwNmMwLjQ2Nzc0LDAgMC44OTQ4LDAuMTQyMzYgMS4yNjA4NiwwLjM4NjM5IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0yMzQuMjg1NDUsMjE2Ljc3ODQ5djB2MHYwdjB6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMyMTFlMWYiIHN0cm9rZS1saW5lam9pbj0iYmV2ZWwiIHN0cm9rZS1taXRlcmxpbWl0PSIxIi8+PHBhdGggZD0iTTI0MC44MzM3OSwxNDYuNDM0NjdjMC42OTE0NCwwLjQyNzA3IDEuMTc5NTEsMS4xOTk4NSAxLjE5OTg1LDIuMDUzOThsMS4wNzc4Myw0OS45MDU2OGwtMS4wNzc4MywxOC4wOTk0NXYtMC4wMjAzNGMtMC4wMjAzNCwxLjM0MjIxIC0xLjExODUxLDIuNDQwMzggLTIuNDQwMzgsMi40NDAzOGMtMS4zMjE4NywwIC0yLjQyMDA0LC0xLjA5ODE3IC0yLjQ0MDM4LC0yLjQyMDA0bC0wLjQ4ODA4LC04LjkyNzcxbC0wLjUwODQxLC05LjE3MTc0bDAuOTk2NDksLTQ5LjY0MTN2LTAuMjQ0MDRjMCwtMC43NTI0NSAwLjM2NjA2LC0xLjQyMzU1IDAuODk0OCwtMS44NzA5NWMwLjQyNzA3LC0wLjM0NTcyIDAuOTU1ODEsLTAuNTQ5MDggMS41NDU1NywtMC41NDkwOGMwLjQ0NzQsMCAwLjg3NDQ3LDAuMTIyMDIgMS4yNDA1MiwwLjM0NTcyIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0zMDcuODgzMTEsMTc0LjgwNDAzYzEyLjI0MjU1LDAgMjIuMTY2NzQsOS45MDM4NiAyMi4xNjY3NCwyMi4xMjYwN2MwLDEyLjI0MjU1IC05LjkyNDE5LDIyLjA0NDcyIC0yMi4xNDY0MSwyMi4wNDQ3MmgtNjEuMzk1NzhjLTEuMzIxODcsLTAuMTIyMDIgLTIuMzc5MzcsLTEuMTc5NTEgLTIuMzk5NywtMi41NDIwNnYtNzAuMjgyODFjMC4wMjAzNCwtMS4yODEyIDAuNDY3NzQsLTEuOTUyMyAyLjEzNTMzLC0yLjYwMzA3YzQuMzExMzMsLTEuNjY3NTkgOS4xNzE3NCwtMi42NDM3NCAxNC4xNzQ1MSwtMi42NDM3NGMyMC4zOTc0NywwIDM3LjEzNDM4LDE1LjY1OTA4IDM4LjkwMzY1LDM1LjYwOTE0YzIuNjIzNCwtMS4wOTgxNyA1LjUzMTUyLC0xLjcwODI2IDguNTYxNjUsLTEuNzA4MjYiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvZz48L3N2Zz4=";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxODAuMDk5NyIgaGVpZ2h0PSI3OC4xOTM3MSIgdmlld0JveD0iMCwwLDE4MC4wOTk3LDc4LjE5MzcxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTQ5Ljk1MDE1LC0xNDAuOTAzMTUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xNTguNjU0MTUsMTgxLjQ3NDRjMC4zODYzOSwwIDAuNjkxNDQsMC4zMDUwNSAwLjc1MjQ1LDAuNzMyMTFsMi4wMTMzMSwxNi4xNjc0OWwtMi4wMTMzMSwxNS44MjE3N2MtMC4wNjEwMSwwLjQyNzA3IC0wLjM2NjA2LDAuNzMyMTEgLTAuNzUyNDUsMC43MzIxMWMtMC4zODYzOSwwIC0wLjY5MTQ0LC0wLjMwNTA1IC0wLjc1MjQ1LC0wLjczMjExbC0xLjc2OTI3LC0xNS44MjE3N2wxLjc2OTI3LC0xNi4xNjc0OWMwLjA2MTAxLC0wLjQyNzA3IDAuMzY2MDYsLTAuNzMyMTEgMC43NTI0NSwtMC43MzIxMSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMTUyLjAwNDEzLDE4Ny42NzcwMmMwLjM2NjA2LDAgMC42NzExLDAuMjg0NzEgMC43MTE3OCwwLjY5MTQ0bDEuNTY1OTEsMTAuMDA1NTRsLTEuNTY1OTEsOS44NDI4NWMtMC4wNDA2NywwLjQwNjczIC0wLjM0NTcyLDAuNjkxNDQgLTAuNzExNzgsMC42OTE0NGMtMC4zODYzOSwwIC0wLjY3MTEsLTAuMjg0NzEgLTAuNzMyMTEsLTAuNjkxNDRsLTEuMzIxODcsLTkuODIyNTFsMS4zMjE4NywtMTAuMDA1NTRjMC4wNjEwMSwtMC40MjcwNyAwLjM2NjA2LC0wLjcxMTc4IDAuNzMyMTEsLTAuNzExNzgiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTE2NS43NTE1OCwxNzguMzAxOTJjMC40Njc3NCwwIDAuODMzNzksMC4zNjYwNiAwLjg5NDgsMC45MTUxNGwxLjkxMTYzLDE5LjE3NzI4bC0xLjkxMTYzLDE4LjQ4NTg0Yy0wLjA0MDY3LDAuNTA4NDEgLTAuNDI3MDcsMC44NzQ0NyAtMC44OTQ4LDAuODc0NDdjLTAuNDY3NzQsMCAtMC44NTQxMywtMC4zODYzOSAtMC44OTQ4LC0wLjg5NDhsLTEuNjg3OTMsLTE4LjQ4NTg0bDEuNjg3OTMsLTE5LjE3NzI4YzAuMDQwNjcsLTAuNTI4NzUgMC40MjcwNywtMC44OTQ4IDAuODk0OCwtMC44OTQ4IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0xNzIuODY5MzQsMTc3LjYzMDgxYzAuNTQ5MDgsMCAwLjk5NjQ5LDAuNDQ3NCAxLjA1NzUsMS4wMTY4MmwxLjgwOTk1LDE5LjcyNjM3bC0xLjgwOTk1LDE5LjA3NTZjLTAuMDYxMDEsMC41ODk3NiAtMC41MDg0MSwxLjAzNzE2IC0xLjA1NzUsMS4wMzcxNmMtMC41NDkwOCwwIC0xLjAxNjgyLC0wLjQ0NzQgLTEuMDU3NSwtMS4wMzcxNmwtMS41ODYyNCwtMTkuMDc1NmwxLjU4NjI0LC0xOS43MDYwM2MwLjA0MDY3LC0wLjU4OTc2IDAuNTA4NDEsLTEuMDM3MTYgMS4wNTc1LC0xLjAzNzE2IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0xODEuMjY4MywyMTcuNjEyM3oiIHN0cm9rZT0iIzIxMWUxZiIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEiLz48cGF0aCBkPSJNMTgyLjk3NjU2LDE5OC4zOTQzNGwtMS43MDgyNiwxOS4yMTc5NmMtMC4wNDA2NywwLjY5MTQ0IC0wLjU0OTA4LDEuMTk5ODUgLTEuMTk5ODUsMS4xOTk4NWMtMC42NTA3NywwIC0xLjE3OTUxLC0wLjUyODc1IC0xLjIyMDE5LC0xLjE5OTg1bC0xLjUwNDksLTE5LjIxNzk2bDEuNTA0OSwtMTguMjgyNDhjMC4wNDA2NywtMC42OTE0NCAwLjU2OTQyLC0xLjE5OTg1IDEuMjIwMTksLTEuMTk5ODVjMC42MzA0MywwIDEuMTU5MTgsMC41MDg0MSAxLjE5OTg1LDEuMTc5NTF6IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0xODcuMzA4MjMsMTY3LjI3OTU0YzAuNzExNzgsMCAxLjMyMTg3LDAuNTg5NzYgMS4zNjI1NCwxLjM0MjIxbDEuNTg2MjQsMjkuNzUyMjRsLTEuNTg2MjQsMTkuMjE3OTZ2MGMtMC4wNDA2NywwLjc1MjQ1IC0wLjY1MDc3LDEuMzQyMjEgLTEuMzYyNTQsMS4zNDIyMWMtMC43MzIxMSwwIC0xLjMyMTg3LC0wLjU4OTc2IC0xLjM2MjU0LC0xLjM0MjIxbC0xLjQwMzIyLC0xOS4yMTc5NmwxLjQwMzIyLC0yOS43NTIyNGMwLjA0MDY3LC0wLjc1MjQ1IDAuNjMwNDMsLTEuMzQyMjEgMS4zNjI1NCwtMS4zNDIyMSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMTk0LjUwNzM0LDE2MC40MjYxN2MwLjc5MzEyLDAgMS40NjQyMywwLjY3MTEgMS41MjUyMywxLjQ4NDU2bDEuNDg0NTYsMzYuNTY0OTZsLTEuNDg0NTYsMTkuMTE2Mjd2MGMtMC4wNDA2NywwLjg1NDEzIC0wLjcxMTc4LDEuNTA0OSAtMS41MjUyMywxLjUwNDljLTAuODMzNzksMCAtMS40ODQ1NiwtMC42NzExIC0xLjUyNTIzLC0xLjUwNDlsLTEuMzIxODcsLTE5LjA5NTk0bDEuMzIxODcsLTM2LjU2NDk2YzAuMDQwNjcsLTAuODU0MTMgMC43MTE3OCwtMS41MDQ5IDEuNTI1MjMsLTEuNTA0OSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMjAxLjk3MDgyLDE1Ny4xMzE2NmMwLjg5NDgsMCAxLjYyNjkyLDAuNzMyMTEgMS42Njc1OSwxLjY4NzkzbDEuMzgyODgsMzkuNjE1NDNsLTEuMzgyODgsMTguOTEyOTF2LTAuMDIwMzRjLTAuMDQwNjcsMC45MTUxNCAtMC43NzI3OSwxLjY0NzI1IC0xLjY2NzU5LDEuNjQ3MjVjLTAuOTE1MTQsMCAtMS42NDcyNSwtMC43MzIxMSAtMS42Njc1OSwtMS42NDcyNWwtMS4yMjAxOSwtMTguOTEyOTFsMS4yMjAxOSwtMzkuNjE1NDNjMC4wMjAzNCwtMC45MzU0OCAwLjc1MjQ1LC0xLjY2NzU5IDEuNjY3NTksLTEuNjY3NTkiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTIxMi41MDUxLDE5OC4zOTQzNGwtMS4yODEyLDE4Ljc5MDg5Yy0wLjA0MDY3LDEuMDE2ODIgLTAuODMzNzksMS44MDk5NSAtMS44MzAyOCwxLjgwOTk1Yy0wLjk5NjQ5LDAgLTEuNzg5NjEsLTAuODEzNDYgLTEuODMwMjgsLTEuODA5OTVsLTEuMTM4ODQsLTE4Ljc5MDg5bDEuMTM4ODQsLTQwLjkzNzNjMC4wNDA2NywtMS4wMTY4MiAwLjgzMzc5LC0xLjgwOTk1IDEuODMwMjgsLTEuODA5OTVjMC45OTY0OSwwIDEuNzg5NjEsMC43OTMxMiAxLjgzMDI4LDEuODA5OTV6IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0yMTEuMjIzOTEsMjE3LjE4NTIyeiIgc3Ryb2tlPSIjMjExZTFmIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2UtbWl0ZXJsaW1pdD0iMSIvPjxwYXRoIGQ9Ik0yMTYuODc3NDQsMTU2LjU0MTljMS4wNzc4MywwIDEuOTMxOTYsMC44NTQxMyAxLjk3MjY0LDEuOTUyM2wxLjE3OTUxLDM5LjkwMDE0bC0xLjE3OTUxLDE4LjYyODJ2LTAuMDIwMzRjLTAuMDIwMzQsMS4wOTgxNyAtMC44OTQ4LDEuOTcyNjQgLTEuOTcyNjQsMS45NzI2NGMtMS4wNzc4MywwIC0xLjk1MjMsLTAuODU0MTMgLTEuOTcyNjQsLTEuOTUyM2wtMS4wMzcxNiwtMTguNjA3ODZsMS4wMzcxNiwtMzkuOTAwMTRjMC4wMjAzNCwtMS4xMTg1MSAwLjg5NDgsLTEuOTcyNjQgMS45NzI2NCwtMS45NzI2NCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMjI0LjQyMjI3LDE1Ny44NDM0NGMxLjE1OTE4LDAgMi4wOTQ2NiwwLjkzNTQ4IDIuMTM1MzMsMi4xMTQ5OWwxLjA3NzgzLDM4LjQzNTkxbC0xLjA3NzgzLDE4LjUwNjE4di0wLjAyMDM0Yy0wLjAyMDM0LDEuMTc5NTEgLTAuOTc2MTUsMi4xMTQ5OSAtMi4xMzUzMywyLjExNDk5Yy0xLjE3OTUxLDAgLTIuMTE0OTksLTAuOTM1NDggLTIuMTM1MzMsLTIuMTE0OTlsLTAuOTU1ODEsLTE4LjQ4NTg0bDAuOTU1ODEsLTM4LjQzNTkxYzAuMDIwMzQsLTEuMTc5NTEgMC45NTU4MSwtMi4xMTQ5OSAyLjEzNTMzLC0yLjExNDk5IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0yMzMuMjY4NjMsMTUwLjc2NjM1YzAuNjEwMDksMC40MjcwNyAxLjAxNjgyLDEuMTE4NTEgMS4wNTc1LDEuODkxMjlsMC45NTU4MSw0NS43MzY3bC0wLjg3NDQ3LDE2LjU1Mzg4bC0wLjEwMTY4LDEuODA5OTVjLTAuMDIwMzQsMC42MzA0MyAtMC4yODQ3MSwxLjE5OTg1IC0wLjY5MTQ0LDEuNjA2NThjLTAuNDI3MDcsMC40MDY3MyAtMC45NzYxNSwwLjY3MTEgLTEuNjA2NTgsMC42NzExYy0wLjcxMTc4LDAgLTEuMzIxODcsLTAuMzI1MzggLTEuNzQ4OTQsLTAuODMzNzljLTAuMzA1MDUsLTAuMzY2MDYgLTAuNTA4NDEsLTAuODU0MTMgLTAuNTI4NzUsLTEuMzYyNTR2LTAuMDgxMzVsLTAuODU0MTMsLTE4LjM4NDE2bDAuODU0MTMsLTQ1LjI4OTN2LTAuNDI3MDdjMC4wMjAzNCwtMC43OTMxMiAwLjQyNzA3LC0xLjUwNDkgMS4wNTc1LC0xLjkxMTYzYzAuMzQ1NzIsLTAuMjIzNyAwLjc3Mjc5LC0wLjM2NjA2IDEuMjIwMTksLTAuMzY2MDZjMC40Njc3NCwwIDAuODk0OCwwLjE0MjM2IDEuMjYwODYsMC4zODYzOSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMjM0LjI4NTQ1LDIxNi43Nzg1djB2MHYweiIgc3Ryb2tlPSIjMjExZTFmIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBzdHJva2UtbWl0ZXJsaW1pdD0iMSIvPjxwYXRoIGQ9Ik0yNDAuODMzNzksMTQ2LjQzNDY4YzAuNjkxNDQsMC40MjcwNyAxLjE3OTUxLDEuMTk5ODUgMS4xOTk4NSwyLjA1Mzk4bDEuMDc3ODMsNDkuOTA1NjhsLTEuMDc3ODMsMTguMDk5NDV2LTAuMDIwMzRjLTAuMDIwMzQsMS4zNDIyMSAtMS4xMTg1MSwyLjQ0MDM4IC0yLjQ0MDM4LDIuNDQwMzhjLTEuMzIxODcsMCAtMi40MjAwNCwtMS4wOTgxNyAtMi40NDAzOCwtMi40MjAwNGwtMC40ODgwOCwtOC45Mjc3MWwtMC41MDg0MSwtOS4xNzE3NGwwLjk5NjQ5LC00OS42NDEzdi0wLjI0NDA0YzAsLTAuNzUyNDUgMC4zNjYwNiwtMS40MjM1NSAwLjg5NDgsLTEuODcwOTVjMC40MjcwNywtMC4zNDU3MiAwLjk1NTgxLC0wLjU0OTA4IDEuNTQ1NTcsLTAuNTQ5MDhjMC40NDc0LDAgMC44NzQ0NywwLjEyMjAyIDEuMjQwNTIsMC4zNDU3MiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMzA3Ljg4MzExLDE3NC44MDQwNGMxMi4yNDI1NSwwIDIyLjE2Njc0LDkuOTAzODYgMjIuMTY2NzQsMjIuMTI2MDdjMCwxMi4yNDI1NSAtOS45MjQxOSwyMi4wNDQ3MiAtMjIuMTQ2NDEsMjIuMDQ0NzJoLTYxLjM5NTc4Yy0xLjMyMTg3LC0wLjEyMjAyIC0yLjM3OTM3LC0xLjE3OTUxIC0yLjM5OTcsLTIuNTQyMDZ2LTcwLjI4MjgxYzAuMDIwMzQsLTEuMjgxMiAwLjQ2Nzc0LC0xLjk1MjMgMi4xMzUzMywtMi42MDMwN2M0LjMxMTMzLC0xLjY2NzU5IDkuMTcxNzQsLTIuNjQzNzQgMTQuMTc0NTEsLTIuNjQzNzRjMjAuMzk3NDcsMCAzNy4xMzQzOCwxNS42NTkwOCAzOC45MDM2NSwzNS42MDkxNGMyLjYyMzQsLTEuMDk4MTcgNS41MzE1MiwtMS43MDgyNiA4LjU2MTY1LC0xLjcwODI2IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjwvZz48L2c+PC9zdmc+";

  let clientID = "8BBZpqUP1KSN4W6YB64xog2PX4Dw98b1";

  /*
    Forced to use a Proxy since SoundCloud API only works:
      -client-side (from user tabs)
      -requests from SoundCloud site
  */

  // For API fetching, we use this, its fast and reliable
  const proxy = "https://corsproxy.io?";
  // For file fetching, we must use this, its slower but works all the time
  // We also use it as a backup in case proxy 1 fails to work. (Only happens to the "extractID" block)
  const proxy2 = "https://api.codetabs.com/v1/proxy?quest=";

  /*
    I am using arrays since the API has JSON paths in order to get certain elements
    If people are familiar with JS/JSON, people can do the same
    Or they can just input the text value
  */
  const trackMenu = [
    { text: "name", value: `["title"]` },
    { text: "artist", value: `["user", "username"]` },
    { text: "artist ID", value: `["user_id"]` },
    { text: "description", value: `["description"]` },
    { text: "cover", value: `["artwork_url"]` },
    { text: "release date", value: `["created_at"]` },
    { text: "duration", value: `["duration"]` },
    { text: "plays", value: `["playback_count"]` },
    { text: "likes", value: `["likes_count"]` },
    { text: "comment count", value: `["comment_count"]` },
    { text: "genre", value: `["genre"]` }
  ];
  const artistMenu = [
    { text: "username", value: "username" },
    { text: "description", value: "description" },
    { text: "profile picture", value: "avatar_url" },
    { text: "join date", value: "created_at" },
    { text: "track count", value: "track_count" },
    { text: "follower count", value: "followers_count" },
    { text: "following count", value: "followings_count" }
  ];

  class SPsoundCloud {
    getInfo() {
      return {
        id: "SPsoundCloud",
        name: "SoundCloud API",
        color1: "#ff2200",
        color2: "#db1b00",
        color3: "#c02300",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "setClient",
            blockType: Scratch.BlockType.COMMAND,
            text: "set client ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "8BBZpqUP1KSN4W6YB64xog2PX4Dw98b1" }
            }
          },
          {
            opcode: "getClientID",
            blockType: Scratch.BlockType.REPORTER,
            text: "client ID"
          },
          { blockType: Scratch.BlockType.LABEL, text: "Must be True for Extension to Work" },
          {
            opcode: "testClient",
            blockType: Scratch.BlockType.BOOLEAN,
            disableMonitor: true,
            text: "test client ID"
          },
          "---",
          {
            opcode: "extractID",
            blockType: Scratch.BlockType.REPORTER,
            text: "ID of [THING] from url [URL]",
            arguments: {
              THING: {
                type: Scratch.ArgumentType.STRING,
                menu: "IDS"
              },
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://soundcloud.com/"
              }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Songs" },
          {
            opcode: "getTrackAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: "fetch [THING] from track ID [ID]",
            arguments: {
              THING: {
                type: Scratch.ArgumentType.STRING,
                menu: "TRACKS"
              },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 241049935 }
            }
          },
          {
            opcode: "getTrackMp3",
            blockType: Scratch.BlockType.REPORTER,
            text: "fetch mp3 of track ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 241049935 }
            }
          },
          {
            opcode: "getTrackComment",
            blockType: Scratch.BlockType.REPORTER,
            text: "fetch [NUM2] offset [NUM1] of [TYPE] comments from track ID [ID]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "COMMENT" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 241049935 },
              NUM1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NUM2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 }
            },
          },
          {
            opcode: "searchTracks",
            blockType: Scratch.BlockType.REPORTER,
            text: "fetch track search results with query [QUERY]",
            arguments: {
              QUERY: { type: Scratch.ArgumentType.STRING, defaultValue: "Ancient Visions" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Artists" },
          {
            opcode: "getArtistAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: "fetch [THING] from artist ID [ID]",
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "ARTISTS" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 127123168 }
            }
          },
          {
            opcode: "getFollowers",
            blockType: Scratch.BlockType.REPORTER,
            text: "fetch [NUM2] offset [NUM1] of followers from artist ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 127123168 },
              NUM1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NUM2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 }
            },
          },
          {
            opcode: "getTracks",
            blockType: Scratch.BlockType.REPORTER,
            text: "fetch [NUM2] offset [NUM1] of tracks from artist ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 127123168 },
              NUM1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              NUM2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 }
            },
          },
          {
            opcode: "searchArtists",
            blockType: Scratch.BlockType.REPORTER,
            text: "fetch artist search results with query [QUERY]",
            arguments: {
              QUERY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Aliantos"
              }
            }
          },
        ],
        menus: {
          IDS: {
            acceptReporters: true,
            items: ["track", "artist"]
          },
          COMMENT: {
            acceptReporters: true,
            items: ["new", "old"]
          },
          TRACKS: {
            acceptReporters: true,
            items: trackMenu
          },
          ARTISTS: {
            acceptReporters: true,
            items: artistMenu
          },
        },
      };
    }

    // Menu Utility
    // @param {menuType} => artistMenu or trackMenu
    // @param {value} => string user inputted
    
    // determine wether the input value is an array path (for the API)
    // or a preset text item (see Line : 41)
    decodeMenuArgs(menuType, value) {
      const menu = menuType === "artistMenu" ? artistMenu : trackMenu;
      value = Scratch.Cast.toString(value);
      const menuItem = menu.find(item => item.text === value);
      if (menuItem) return menuItem.value; // Assume user referenced menu text and not value
      else return value; // Assume its an array path
    }

    setClient(args) { clientID = Scratch.Cast.toString(args.ID) }

    getClientID() { return clientID }

    async testClient() {
      try {
        const url = `https://api-auth.soundcloud.com/oauth/session?client_id=${clientID}`;
        if (!await Scratch.canFetch(url)) return false;
        // eslint-disable-next-line
        const response = await fetch(`${proxy}${url}`);
        if (!response.ok) return false;
        const responseData = await response.json();
        return Object.keys(responseData).length > 0;
      } catch { return false }
    }

    async extractID(args) {
      try {
        let response;
        if (!args.URL.startsWith("https://soundcloud")) return "";
        if (!await Scratch.canFetch(args.URL)) return "";
        let success = false;
        let proxyUse = proxy;
        while (!success && proxyUse) {
          try {
            // eslint-disable-next-line
            response = await fetch(`${proxyUse}${args.URL}`);
            if (!response.ok) {
              if (proxyUse === proxy) proxyUse = proxy2;
              else return "Error: 404";
            } else { success = true }
          } catch {
            if (proxyUse === proxy) proxyUse = proxy2;
            else return "";
          }
        }
        if (success) {
          response = await response.text();
          const regex = args.THING === "track" ? /soundcloud:\/\/sounds:(\d+)/ : /soundcloud:\/\/users:(\d+)/;
          const match = response.match(regex);
          if (match && match[1]) return match[1] ?? "";
        }
      } catch { return "" }
      return "";
    }

    async getTrackAtt(args) {
      try {
        let response;
        const path = JSON.parse(this.decodeMenuArgs("trackMenu", args.THING));
        if (!Array.isArray(path)) return "";
        if (!await Scratch.canFetch(`https://api-v2.soundcloud.com/tracks/${args.ID}?client_id=${clientID}&app_locale=en`)) return "";
        // eslint-disable-next-line
        response = await fetch(`${proxy}https://api-v2.soundcloud.com/tracks/${args.ID}?client_id=${clientID}&app_locale=en`);
        if (!response.ok) return "Error: 404";
        let json = await response.json();
        for (var i = 0; i < path.length; i++) {
          json = json[path[i]];
        }
        if (path[0] === "duration") json = this.milli2Time(json);
        return json ?? "";
      } catch { return "" }
    }
    milli2Time(milli) {
      let seconds = Math.floor(milli / 1000);
      let hours = Math.floor(seconds / 3600);
      seconds %= 3600;
      let minutes = Math.floor(seconds / 60);
      seconds %= 60;
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    async getTrackMp3(args) {
      try {
        let response;
        if (!await Scratch.canFetch(`https://api-v2.soundcloud.com/tracks/${args.ID}/download?client_id=${clientID}&app_locale=en`)) return "";
        // eslint-disable-next-line
        response = await fetch(`${proxy2}https://api-v2.soundcloud.com/tracks/${args.ID}/download?client_id=${clientID}&app_locale=en`);
        if (!response.ok) return "Error: 404";
        let json = await response.json();
        return json.redirectUri ?? "Error: Downloads are Disabled for this Track";
      } catch { return "" }
    }

    async getTrackComment(args) {
      try {
        let response;
        const type = args.TYPE === "new" ? "newest" : "oldest";
        if (!await Scratch.canFetch(`https://api-v2.soundcloud.com/tracks/${args.ID}/comments?sort=${type}&threaded=1&client_id=${clientID}&limit=${args.NUM2}&offset=${args.NUM1}&app_locale=en`)) return "";
        // eslint-disable-next-line
        response = await fetch(`${proxy}https://api-v2.soundcloud.com/tracks/${args.ID}/comments?sort=${type}&threaded=1&client_id=${clientID}&limit=${args.NUM2}&offset=${args.NUM1}&app_locale=en`);
        if (!response.ok) return "Error: 404";
        let json = await response.json();
        return JSON.stringify(json.collection);
      } catch { return "[]" }
    }

    async getArtistAtt(args) {
      try {
        let response;
        if (!await Scratch.canFetch(`https://api-v2.soundcloud.com/users/${args.ID}?client_id=${clientID}&app_locale=en`)) return "";
        // eslint-disable-next-line
        response = await fetch(`${proxy}https://api-v2.soundcloud.com/users/${args.ID}?client_id=${clientID}&app_locale=en`);
        if (!response.ok) return "Error: 404";
        let json = await response.json();
        args.THING = this.decodeMenuArgs("artistMenu", args.THING);
        return json[args.THING] ?? "";
      } catch { return "" }
    }

    async getFollowers(args) { return await this.getArtistStuff(args, "followers?") }
    async getTracks(args) { return await this.getArtistStuff(args, "tracks?representation=1&") }

    async getArtistStuff(args, type) {
      try {
        let response;
        if (!await Scratch.canFetch(`https://api-v2.soundcloud.com/users/${args.ID}/${type}client_id=${clientID}&limit=${args.NUM2}&offset=${args.NUM1}&app_locale=en`)) return "";
        // eslint-disable-next-line
        response = await fetch(`${proxy}https://api-v2.soundcloud.com/users/${args.ID}/${type}client_id=${clientID}&limit=${args.NUM2}&offset=${args.NUM1}&app_locale=en`);
        if (!response.ok) return "Error: 404";
        let json = await response.json();
        return JSON.stringify(json.collection);
      } catch { return "[]" }
    }

    async searchTracks(args) { return await this.fetchSearch(args, "tracks") }
    async searchArtists(args) { return await this.fetchSearch(args, "users") }

    async fetchSearch(args, type) {
      try {
        let response;
        args.QUERY = encodeURIComponent(args.QUERY);
        if (!await Scratch.canFetch(`https://api-v2.soundcloud.com/search/${type}?q=${args.QUERY}&client_id=${clientID}&limit=${args.NUM2}&offset=${args.NUM1}&app_locale=en`)) return "";
        // eslint-disable-next-line
        response = await fetch(`${proxy}https://api-v2.soundcloud.com/search/${type}?q=${args.QUERY}&client_id=${clientID}&limit=${args.NUM2}&offset=${args.NUM1}&app_locale=en`);
        if (!response.ok) return "Error: 404";
        let json = await response.json();
        return JSON.stringify(json.collection);
      } catch { return "[]" }
    }
  }

  // Block Gradient Maker
  // If merged, you can remove it or keep it
  function addLinearGradientToBody() {
    var grad1 = document.createElement("div");
    grad1.innerHTML = `<svg><defs>
      <linearGradient x1="240" y1="0" x2="240" y2="100" gradientUnits="userSpaceOnUse" id="SPsoundCloud-GRAD1">
      <stop offset="0" stop-color="#ff7600"/><stop offset="0.5" stop-color="#ff2200"/></linearGradient>
      </defs></svg>`;
    document.body.appendChild(grad1);
  }
  if (Scratch.gui) Scratch.gui.getBlockly().then((ScratchBlocks) => {
    addLinearGradientToBody();
    if (!ScratchBlocks?.SPgradients?.patched) { // New Gradient Patch by Ashimee <3
      ScratchBlocks.SPgradients = {gradientUrls: {}, patched: false};
      const BSP = ScratchBlocks.BlockSvg.prototype, BSPR = BSP.render;
      BSP.render = function(...args) {
        const res = BSPR.apply(this, args);
        let category;
        if (this?.svgPath_ && (category = this.type.slice(0, this.type.indexOf("_"))) && ScratchBlocks.SPgradients.gradientUrls[category]) {
          const urls = ScratchBlocks.SPgradients.gradientUrls[category];
          if (urls) this.svgPath_.setAttribute("fill", urls[0]);
        }
        return res;
      }
      ScratchBlocks.SPgradients.patched = true;
    }
    ScratchBlocks.SPgradients.gradientUrls["SPsoundCloud"] = ["url(#SPsoundCloud-GRAD1)"];
  });

  Scratch.extensions.register(new SPsoundCloud());
})(Scratch);
