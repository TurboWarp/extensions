// Name: Sprite Parenting
// ID: SPspriteParent
// Description: Link sprites together and make them follow the parent.
// By: SharkPool

// Version 2.0.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Sprite Parenting must run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI5NS41IiBoZWlnaHQ9Ijk1LjUiIHZpZXdCb3g9IjAsMCw5NS41LDk1LjUiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTIuMjUsLTEzMi4yNSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xOTIuMjUsMTgwYzAsLTI2LjM3MTYgMjEuMzc4NCwtNDcuNzUgNDcuNzUsLTQ3Ljc1YzI2LjM3MTYsMCA0Ny43NSwyMS4zNzg0IDQ3Ljc1LDQ3Ljc1YzAsMjYuMzcxNiAtMjEuMzc4NCw0Ny43NSAtNDcuNzUsNDcuNzVjLTI2LjM3MTYsMCAtNDcuNzUsLTIxLjM3ODQgLTQ3Ljc1LC00Ny43NXoiIGZpbGw9IiM0YjIxY2MiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMjIyLjQ3Mzg3LDE1NS40MzU5NmMwLjAxODI2LDAuMDAwMDEgMC4wMzY0OSwwLjAwMDMxIDAuMDU0NzMsMC4wMDA5YzAuNjg3MTcsMC4wMjU5MSAxLjI5NDc0LDAuNDUzODUgMS41NTA2MywxLjA5MjE3bDAuNzYxODYsMS44OTcxN2MwLjY3Mzk4LC0wLjE2MzQ0IDEuMzY1MDMsLTAuMjQ1OTkgMi4wNTg1NCwtMC4yNDU5YzQuODIxNjQsMC4wMDAwNCA4LjczMDM1LDMuOTA5MDYgOC43MzAzOCw4LjczMTFjMC4wMDAwMiwxLjUxMjgxIC0wLjM5MywyLjk5OTY3IC0xLjE0MDU0LDQuMzE0ODVjMy43OTk1MiwxLjAzNTEgNi40MzU4Myw0LjQ4NTg5IDYuNDM1ODQsOC40MjQxOGMtMC4wMDAwMiwxLjYxNzk1IC0wLjQ0OTU2LDMuMjA0MDcgLTEuMjk4NDgsNC41ODEzOGMzLjU5MTc5LDEuMTcyMTMgNi4wMjIxMiw0LjUyMTg1IDYuMDIyMTYsOC4zMDAzNGMtMC4wMDAyMywzLjAyMTk2IC0xLjU2Mjk3LDUuODI4OTUgLTQuMTMxNDMsNy40MjA4NmwzLjg4NzM1LDkuNjc4NzljMC4zNTkxMywwLjg5MjY1IC0wLjA3MzY2LDEuOTA3NCAtMC45NjY0NSwyLjI2NjAxYy0wLjg5MjU3LDAuMzU5MTYgLTEuOTA3MjQsLTAuMDczNjYgLTIuMjY1ODMsLTAuOTY2NTNsLTMuOTI0MTQsLTkuNzcwMzNjLTAuNDQwMDQsMC4wNjc5NiAtMC44ODQ2MywwLjEwMjE3IC0xLjMyOTg4LDAuMTAyM2MtNC44MjE2NCwtMC4wMDAwNCAtOC43MzAzNCwtMy45MDkwNiAtOC43MzAzOCwtOC43MzExYy0wLjAwMDE1LC0xLjYxODI1IDAuNDQ5NCwtMy4yMDQ3MSAxLjI5ODQ3LC00LjU4MjI4Yy0zLjU5MTQ4LC0xLjE3MjAzIC02LjAyMTczLC00LjUyMTI4IC02LjAyMjE2LC04LjI5OTQ0YzAuMDAwMzgsLTEuNTEzMjcgMC4zOTQwMiwtMy4wMDA0NyAxLjE0MjM0LC00LjMxNTc0Yy0zLjc5OTkxLC0xLjAzNDMzIC02LjQzNywtNC40ODQ4MiAtNi40Mzc2NCwtOC40MjMyOWMwLjAwMDE0LC0yLjc1NzY2IDEuMzAyOTQsLTUuMzUzMTcgMy41MTQwNSwtNy4wMDA4NmwtMC44MzYzNCwtMi4wODI5NGMtMC4zNTg1NCwtMC44OTIzOSAwLjA3NDE1LC0xLjkwNjUgMC45NjY0NSwtMi4yNjUxMmMwLjIwOTg0LC0wLjA4NDcgMC40MzQxNywtMC4xMjc2OCAwLjY2MDQ1LC0wLjEyNjU0eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjIuMTE2NjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjQiLz48cGF0aCBkPSJNMjY4Ljc0ODMsMTUwLjc1OTc4YzAuMTc0NDYsLTAuMDI0NjYgMC4zNTIwNCwtMC4wMTUwNyAwLjUyMjgzLDAuMDI4MjJjMC43MjYwOSwwLjE4MjkxIDEuMTY2NDksMC45MTk4MSAwLjk4MzY2LDEuNjQ1OTdsLTAuNDI2MzMsMS42OTQ4N2MxLjg3OTAzLDEuMDM4ODIgMy4xNTY5MSwyLjkwNDM0IDMuNDQ2ODIsNS4wMzE4NmMwLjQxMzQxLDMuMDM4NTkgLTEuMjU4NDksNS45Nzc3OCAtNC4wODE0MSw3LjE3NTFjMC43MTU1NSwwLjkzNjA5IDEuMTc1NTUsMi4wNDIwOSAxLjMzNDg3LDMuMjA5NTRjMC4zOTY3MiwyLjkxNDkgLTEuMTI2MjMsNS43NTQyMyAtMy43NzM4OCw3LjAzNTg5YzAuNzk5ODMsMC45NzM1NyAxLjMxMzM4LDIuMTUwMjcgMS40ODMzMywzLjM5ODc3YzAuNTA2NzMsMy43MjAyIC0yLjA5ODAzLDcuMTQ2NzkgLTUuODE3OTIsNy42NTM1NGMtMC4zNDM1MiwwLjA0NjY5IC0wLjY5MDExLDAuMDY3MDQgLTEuMDM2NzUsMC4wNjA4NWwtMi4wMDA2OCw3Ljk1MDIxYy0wLjE4MjgxLDAuNzI2NTQgLTAuOTIwMTQsMS4xNjcwOSAtMS42NDY1MSwwLjk4Mzc5Yy0wLjcyNjQ3LC0wLjE4Mjg0IC0xLjE2NzAyLC0wLjkyMDI1IC0wLjk4Mzc1LC0xLjY0NjY2bDEuOTgxOTIsLTcuODc1NzFjLTIuMTQ4ODcsLTAuOTU4MjMgLTMuNjQ5NTEsLTIuOTU5NTggLTMuOTY3MjcsLTUuMjkxYy0wLjM5NzA1LC0yLjkxNTEgMS4xMjU5LC01Ljc1NDgyIDMuNzczNzksLTcuMDM2NTljLTAuNzk5NjgsLTAuOTczMzkgLTEuMzEzMTksLTIuMTQ5ODMgLTEuNDgzMjMsLTMuMzk4MDhjLTAuNDEzODgsLTMuMDM4NCAxLjI1NzM4LC01Ljk3NzczIDQuMDc5OTIsLTcuMTc1NjFjLTAuNzE0OTQsLTAuOTM2MSAtMS4xNzQ0LC0yLjA0MTkgLTEuMzMzMzgsLTMuMjA5MDRjLTAuNTA2NzMsLTMuNzIwMiAyLjA5ODAyLC03LjE0Njc5IDUuODE3OTEsLTcuNjUzNTVjMC41MzUwMywtMC4wNzI5NiAxLjA3Njg1LC0wLjA4MTg5IDEuNjE0MDEsLTAuMDI2NjNsMC4zODg0LC0xLjU0MzcyYzAuMTMwMzQsLTAuNTE5MzYgMC41NTQxLC0wLjkxMzM2IDEuMDgxNTMsLTEuMDA1NTdjMC4wMTQwMiwtMC4wMDIzOCAwLjAyODAzLC0wLjAwNDUxIDAuMDQyMTQsLTAuMDA2NDV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMi4xMTY2NyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iNCIvPjxwYXRoIGQ9Ik0yNDEuNjMzLDE5MS4xNTkxYy0wLjQ4MzE2LC0wLjMyNTExIC0wLjYxOTE0LC0wLjc5OTYgLTAuMzI4NywtMS4yMzEyNGMxLjE3NTI2LC0xLjc0NjYyIDQuMjAxNTUsLTYuMjQ0MTcgNC44MTU0NCwtNy4xNTY0OWMwLjIxMjYzLC0wLjMxNiAwLjc1MTgxLC0wLjM2MyAxLjIwNDA2LC0wLjA2OTY3YzAuNDUyMjUsMC4yOTMzMyAwLjYwNDMxLDAuODA2NDkgMC40MDAwMiwxLjExMDA5Yy0wLjYwNDg0LDAuODk4ODggLTMuNjUzMDgsNS40MjkwNSAtNC44MzM0Niw3LjE4MzI4Yy0wLjI5MDQ3LDAuNDMxNjkgLTAuNzc0MTksMC40ODkxMyAtMS4yNTczNSwwLjE2NDAyeiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTI0Ny4yNDAzMywxODguMjc1MjljLTEuODE5OTMsMC4xMDgyNCAtMy40NjUyMSwtMi42NjE1MyAtMy42NzQ4NCwtNi4xODY0M2MtMC4yMDk2MywtMy41MjQ5IDEuMDk1NzcsLTYuNDcwMTUgMi45MTU2OSwtNi41NzgzOWMxLjgxOTkzLC0wLjEwODI0IDMuNDY1MiwyLjY2MTU0IDMuNjc0ODQsNi4xODY0NGMwLjIwOTYzLDMuNTI0OSAtMS4wOTU3Niw2LjQ3MDE0IC0yLjkxNTY5LDYuNTc4Mzh6TTI0OS4wMDEyNywxODEuNzY1NThjLTAuMTMxMywtMi4yMDc3MSAtMS4xNjE3NywtMy45NDI0NiAtMi4zMDE2MSwtMy44NzQ2N2MtMS4xMzk4NSwwLjA2Nzc5IC0xLjk1NzQ1LDEuOTEyNDUgLTEuODI2MTUsNC4xMjAxNmMwLjEzMTMsMi4yMDc3MSAxLjE2MTc3LDMuOTQyNDUgMi4zMDE2MiwzLjg3NDY2YzEuMTM5ODUsLTAuMDY3NzkgMS45NTc0NSwtMS45MTI0NCAxLjgyNjE0LC00LjEyMDE1eiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTI0NS44OTIwNywxNzAuNDkzMzdjMC41ODEwNCwtMC4wMzkxNCAwLjk3OTI1LDAuMjUyNTIgMS4wMTQyMiwwLjc3MTZjMC4xNDE1LDIuMTAwNDUgMC41MDU4NCw3LjUwOTEgMC41Nzk3NSw4LjYwNjI1YzAuMDI1NiwwLjM4MDAyIC0wLjM3MTY5LDAuNzQ3NTQgLTAuOTA4ODMsMC43OTI4NmMtMC41MzcxNCwwLjA0NTMxIC0wLjk3MTc2LC0wLjI2NzA0IC0wLjk5NjM1LC0wLjYzMjE0Yy0wLjA3MjgxLC0xLjA4MDk4IC0wLjQzOTgxLC02LjUyODg4IC0wLjU4MTkyLC04LjYzODQ4Yy0wLjAzNDk3LC0wLjUxOTE1IDAuMzEyMDksLTAuODYwOTQgMC44OTMxNCwtMC45MDAwOHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0yNDMuMjA3MDcsMTc0LjMwNTE5Yy0xLjM4MiwtMS4xODkwNyAtMC42MzUzMywtNC4zMjI5NCAxLjY2NzczLC02Ljk5OTY1YzIuMzAzMDYsLTIuNjc2NzIgNS4yOTA0LC0zLjg4MjY4IDYuNjcyNCwtMi42OTM2MWMxLjM4MiwxLjE4OTA3IDAuNjM1MzEsNC4zMjI5NCAtMS42Njc3NCw2Ljk5OTY2Yy0yLjMwMzA2LDIuNjc2NzIgLTUuMjkwMzksMy44ODI2NyAtNi42NzIzOSwyLjY5MzZ6TTI0OS4wMDI1OCwxNzAuODU3MWMxLjQ0MjQ1LC0xLjY3NjQ4IDEuOTEwMSwtMy42MzkyNiAxLjA0NDUyLC00LjM4NGMtMC44NjU1OCwtMC43NDQ3NCAtMi43MzY1OSwwLjAxMDU4IC00LjE3OTA1LDEuNjg3MDVjLTEuNDQyNDUsMS42NzY0OCAtMS45MTAxLDMuNjM5MjUgLTEuMDQ0NTIsNC4zODM5OWMwLjg2NTU4LDAuNzQ0NzQgMi43MzY1OSwtMC4wMTA1NyA0LjE3OTA1LC0xLjY4NzA1eiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTI1Ny42MjMyOCwxNjUuMjEyMzdjMC4xNzk3MywwLjU1MzkzIC0wLjAwNTk0LDEuMDExMjcgLTAuNTAwOCwxLjE3MTgzYy0yLjAwMjQ1LDAuNjQ5NzIgLTcuMTU4NzMsMi4zMjI3NyAtOC4yMDQ2OCwyLjY2MjE0Yy0wLjM2MjI5LDAuMTE3NTUgLTAuODE1NjQsLTAuMTc4MDYgLTAuOTkwNjUsLTAuNjg3OTFjLTAuMTc1LC0wLjUwOTg1IDAuMDIxODYsLTEuMDA3NTQgMC4zNjk5MywtMS4xMjA0OGMxLjAzMDUzLC0wLjMzNDM3IDYuMjI0MjQsLTIuMDE5NTUgOC4yMzU0MSwtMi42NzIxYzAuNDk0OTIsLTAuMTYwNTggMC45MTEwNywwLjA5MjU4IDEuMDkwNzksMC42NDY1MXoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0yNTIuOTcyMDcsMTY1Ljg2NjU0Yy0wLjE2MDA1LC0xLjgxNjEgMi41NjE3LC0zLjUzOTY0IDYuMDc5MTksLTMuODQ5NjRjMy41MTc0OSwtMC4zMSA2LjQ5ODc2LDAuOTEwOTQgNi42NTg4MSwyLjcyNzA0YzAuMTYwMDUsMS44MTYxIC0yLjU2MTcxLDMuNTM5NjUgLTYuMDc5MjEsMy44NDk2NWMtMy41MTc0OSwwLjMxIC02LjQ5ODc0LC0wLjkxMDk0IC02LjY1ODgsLTIuNzI3MDV6TTI1OS41MjkzMiwxNjcuNDQxMjZjMi4yMDMwNywtMC4xOTQxNiAzLjkwNzc1LC0xLjI3MzYzIDMuODA3NSwtMi40MTEwOWMtMC4xMDAyNSwtMS4xMzc0NiAtMS45Njc0NSwtMS45MDIxNiAtNC4xNzA1MiwtMS43MDhjLTIuMjAzMDcsMC4xOTQxNiAtMy45MDc3NSwxLjI3MzY0IC0zLjgwNzUsMi40MTExYzAuMTAwMjUsMS4xMzc0NiAxLjk2NzQ2LDEuOTAyMTUgNC4xNzA1MywxLjcwNzk5eiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTIwMS43MzU1MSwxNzYuMzMwMzRjMi44NzEsLTIuMDU1NzggNi4wNTg4NywtMi41MjA2OCA3LjEyMDI3LC0xLjAzODM2YzEuMDYxNDEsMS40ODIzMSAtMC40MDU1Nyw0LjM1MDUgLTMuMjc2NTgsNi40MDYyOGMtMi44NzEsMi4wNTU3OCAtNi4wNTg4NiwyLjUyMDY4IC03LjEyMDI2LDEuMDM4MzZjLTEuMDYxNDEsLTEuNDgyMzEgMC40MDU1NiwtNC4zNTA1MSAzLjI3NjU3LC02LjQwNjI5ek0yMDAuMzU2ODIsMTgxLjI4MzI0YzAuNjY0NzcsMC45Mjg0IDIuNjYxMzgsMC42MzcyMyA0LjQ1OTU0LC0wLjY1MDM0YzEuNzk4MTYsLTEuMjg3NTcgMi43MTY5NSwtMy4wODM5NyAyLjA1MjE3LC00LjAxMjM3Yy0wLjY2NDc3LC0wLjkyODQgLTIuNjYxMzgsLTAuNjM3MjMgLTQuNDU5NTQsMC42NTAzNGMtMS43OTgxNiwxLjI4NzU3IC0yLjcxNjk0LDMuMDgzOTcgLTIuMDUyMTcsNC4wMTIzN3oiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMjA1LjQ3NTU5LDE3Ni43NjQ0OGMyLjA4MTUxLDAuMzcxMzkgNy40NTY4NywxLjMzMDQ3IDguNTIzNDUsMS41MjA3N2MwLjM2MDI0LDAuMDY0MjggMC42MjMzMywwLjUzMDM3IDAuNTE5NywxLjA1OTM2Yy0wLjEwMzYzLDAuNTI4OTkgLTAuNTEyMzEsMC44ODM4MyAtMC44ODcyNywwLjgxNjkyYy0xLjA4MjU0LC0wLjE5MzE0IC02LjQxOTE4LC0xLjE0NTMyIC04LjQ5MTY3LC0xLjUxNTA4Yy0wLjUxMjE3LC0wLjA5MTM4IC0wLjc1ODYzLC0wLjUxOTAzIC0wLjY1NjM1LC0xLjA5MjM0YzAuMTAyMjgsLTAuNTczMzEgMC40Nzk5MSwtMC44ODEwMSAwLjk5MjE0LC0wLjc4OTYzeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0yMTYuOTg2MTQsMTc5LjkyODMzYzEuNjk3MDksMy4wOTY1OCAxLjc3NjgxLDYuMzE3MTcgMC4xNzgwMyw3LjE5MzM5Yy0xLjU5ODc4LDAuODc2MjIgLTQuMjcwNjEsLTAuOTIzNzQgLTUuOTY3NzEsLTQuMDIwMzJjLTEuNjk3MDksLTMuMDk2NTggLTEuNzc2OCwtNi4zMTcxNiAtMC4xNzgwMiwtNy4xOTMzOGMxLjU5ODc4LC0wLjg3NjIyIDQuMjcwNjEsMC45MjM3NCA1Ljk2NzcsNC4wMjAzMXpNMjEyLjIzNDA0LDE3Ny45NjYzMWMtMS4wMDEzNCwwLjU0ODc5IC0wLjk1MTQyLDIuNTY1OSAwLjExMTUsNC41MDUzNGMxLjA2MjkyLDEuOTM5NDQgMi43MzYzMywzLjA2Njc4IDMuNzM3NjcsMi41MTc5OWMxLjAwMTM0LC0wLjU0ODc5IDAuOTUxNDIsLTIuNTY1ODkgLTAuMTExNSwtNC41MDUzM2MtMS4wNjI5MiwtMS45Mzk0NCAtMi43MzYzMywtMy4wNjY3OCAtMy43Mzc2NywtMi41MTc5OXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48cGF0aCBkPSJNMjE4LjA5ODQ1LDE5MS4zOTY1NGMtMS4wMDE1OSwtMS44NjIxMSAtMy41ODgxMSwtNi42NzA4NyAtNC4xMDEzNCwtNy42MjUwMmMtMC4xNzMzNSwtMC4zMjIyNyAwLjAyODU5LC0wLjgxNzkzIDAuNTA3NTgsLTEuMDY1MjJjMC40Nzg5OCwtMC4yNDcyOSAxLjAxMDg5LC0wLjE0NzMzIDEuMTkxMzEsMC4xODgxYzAuNTIwODksMC45Njg0MyAzLjA4ODc5LDUuNzQyNTYgNC4wODYwMyw3LjU5NjU5YzAuMjQ2NDQsMC40NTgxOCAwLjA2NDM0LDAuOTE2OTQgLTAuNDQ4NTQsMS4xOTI4MWMtMC41MTI4OCwwLjI3NTg3IC0wLjk4ODU3LDAuMTcwOTkgLTEuMjM1MDUsLTAuMjg3MjV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTIyMi4wNDI5OSwxODkuMzc0MzZjMi43NTAwMSwyLjIxNTAyIDQuMDUyMjYsNS4xNjE2OCAyLjkwODYzLDYuNTgxNTJjLTEuMTQzNjMsMS40MTk4NCAtNC4zMDAwNiwwLjc3NTIyIC03LjA1MDA3LC0xLjQzOTgxYy0yLjc1MDAxLC0yLjIxNTAyIC00LjA1MjI1LC01LjE2MTY4IC0yLjkwODYyLC02LjU4MTUxYzEuMTQzNjMsLTEuNDE5ODQgNC4zMDAwNSwtMC43NzUyMiA3LjA1MDA2LDEuNDM5ODF6TTIxNi45MDE3OCwxODkuMzczNDhjLTAuNzE2MjgsMC44ODkyNyAwLjA5OTMzLDIuNzM0OCAxLjgyMTcxLDQuMTIyMTFjMS43MjIzOCwxLjM4NzMxIDMuNjk5MywxLjc5MTA1IDQuNDE1NTgsMC45MDE3OGMwLjcxNjI4LC0wLjg4OTI3IC0wLjA5OTM0LC0yLjczNDggLTEuODIxNzIsLTQuMTIyMTFjLTEuNzIyMzgsLTEuMzg3MzEgLTMuNjk5MjksLTEuNzkxMDQgLTQuNDE1NTcsLTAuOTAxNzd6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTIyOS44NjI3LDE5NS4wOTc3M2MtMi4wOTYxMywtMC4yNzcyOCAtNy41MDkyMSwtMC45OTMzMyAtOC41ODMyOCwtMS4xMzU0MWMtMC4zNjI3NywtMC4wNDc5OSAtMC42NDY1OCwtMC41MDE3NiAtMC41NjY4NywtMS4wMzQ4OWMwLjA3OTcxLC0wLjUzMzEzIDAuNDcxOTgsLTAuOTA1OTkgMC44NDk1OCwtMC44NTYwNWMxLjA5MDE0LDAuMTQ0MiA2LjQ2NDI0LDAuODU1MTEgOC41NTEyNywxLjEzMTE4YzAuNTE1NzYsMC4wNjgyMyAwLjc4MTI0LDAuNDg0MzMgMC43MDQ4NywxLjA2MTY3Yy0wLjA3NjM3LDAuNTc3MzQgLTAuNDM5NzUsMC45MDE3MiAtMC45NTU1NywwLjgzMzQ5eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0yMzIuMTc5ODYsMTkwLjU3NTJjMy41MTU0MywtMC4zMzI1OSA2LjUwNDQ4LDAuODY5MTcgNi42NzYyLDIuNjg0MmMwLjE3MTcyLDEuODE1MDMgLTIuNTM4OTEsMy41NTYwMyAtNi4wNTQzNCwzLjg4ODYyYy0zLjUxNTQzLDAuMzMyNTkgLTYuNTA0NDcsLTAuODY5MTcgLTYuNjc2MTksLTIuNjg0MjFjLTAuMTcxNzIsLTEuODE1MDMgMi41Mzg5LC0zLjU1NjAzIDYuMDU0MzMsLTMuODg4NjJ6TTIyOC40OTY4OSwxOTQuMTYyMzZjMC4xMDc1NCwxLjEzNjc5IDEuOTc5NjIsMS44ODk0NyA0LjE4MTQxLDEuNjgxMTdjMi4yMDE3OCwtMC4yMDgzIDMuODk5NDgsLTEuMjk4NzIgMy43OTE5NCwtMi40MzU1MWMtMC4xMDc1NCwtMS4xMzY3OSAtMS45Nzk2MiwtMS44ODk0NyAtNC4xODE0LC0xLjY4MTE2Yy0yLjIwMTc4LDAuMjA4MyAtMy44OTk0OCwxLjI5ODcyIC0zLjc5MTk0LDIuNDM1NTF6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTI3NC4yODM3NiwxNzUuNTUwNTZjLTAuNDMxMjYsMC4zOTEzNiAtMC45MjQ0OSwwLjQwOTg4IC0xLjI3NDExLDAuMDI0NjFjLTEuNDE0NzQsLTEuNTU4OTkgLTUuMDU3NywtNS41NzMzNSAtNS43OTY2OCwtNi4zODc2OGMtMC4yNTU5NSwtMC4yODIwNiAtMC4xNzI2LC0wLjgxNjgyIDAuMjIwNDEsLTEuMTg1NzZjMC4zOTMwMSwtMC4zNjg5NCAwLjkyNzY0LC0wLjM5MzgyIDEuMTczNTYsLTAuMTIyODNjMC43MjgwOCwwLjgwMjMxIDQuMzk3NDcsNC44NDU4MSA1LjgxODM4LDYuNDExNTljMC4zNDk2NywwLjM4NTMxIDAuMjg5NzIsMC44Njg3MiAtMC4xNDE1NSwxLjI2MDA3eiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTI3MS43NzcyMiwxNzEuNTc4MjljMS41OTAxNywtMC44OTE3NSA0LjI3OTQsMC44ODIxMiA2LjAwNjU3LDMuOTYyMDJjMS43MjcxNiwzLjA3OTkgMS44MzgyMyw2LjI5OTU2IDAuMjQ4MDYsNy4xOTEzMWMtMS41OTAxNywwLjg5MTc1IC00LjI3OTQxLC0wLjg4MjEzIC02LjAwNjU3LC0zLjk2MjAzYy0xLjcyNzE2LC0zLjA3OTkgLTEuODM4MjIsLTYuMjk5NTUgLTAuMjQ4MDYsLTcuMTkxM3pNMjczLjAzNDI1LDE3OC4yMDM3OWMxLjA4MTc1LDEuOTI5IDIuNzY2MDUsMy4wNCAzLjc2MiwyLjQ4MTQ4YzAuOTk1OTUsLTAuNTU4NTIgMC45MjY0LC0yLjU3NTA1IC0wLjE1NTM1LC00LjUwNDA1Yy0xLjA4MTc1LC0xLjkyOSAtMi43NjYwNiwtMy4wMzk5OSAtMy43NjIwMSwtMi40ODE0N2MtMC45OTU5NSwwLjU1ODUyIC0wLjkyNjM5LDIuNTc1MDQgMC4xNTUzNiw0LjUwNDA0eiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTI3NS44NjU5MiwxODguNDE0OTFjLTAuNTgyMjYsLTAuMDEwODEgLTAuOTU0LC0wLjMzNTUgLTAuOTQ0MzUsLTAuODU1NjdjMC4wMzkwNCwtMi4xMDQ4NSAwLjEzOTU2LC03LjUyNDgzIDAuMTU5OTUsLTguNjI0MjhjMC4wMDcwNywtMC4zODA4MiAwLjQzNDQsLTAuNzEyOTQgMC45NzM0NCwtMC43MTIwNWMwLjUzOTA0LDAuMDAwODkgMC45NDUyOSwwLjM0OTM0IDAuOTM4NTEsMC43MTUyMmMtMC4wMjAxLDEuMDgzMjQgLTAuMTIxMzQsNi41NDI1NSAtMC4xNjA1Niw4LjY1NjU3Yy0wLjAwOTY0LDAuNTIwMjMgLTAuMzg0NzMsMC44MzEwMiAtMC45NjY5OSwwLjgyMDIxeiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PHBhdGggZD0iTTI3Ni43NjQ4MywxODMuODA0NzRjMS43Njg5NywwLjQ0MTEzIDIuNTEwMzUsMy41NzYyNSAxLjY1NTk0LDcuMDAyNDVjLTAuODU0NDEsMy40MjYyIC0yLjk4MTA4LDUuODQ2MDggLTQuNzUwMDUsNS40MDQ5NWMtMS43Njg5NywtMC40NDExMyAtMi41MTAzNSwtMy41NzYyNiAtMS42NTU5NCwtNy4wMDI0NWMwLjg1NDQxLC0zLjQyNjIgMi45ODEwNywtNS44NDYwNyA0Ljc1MDA1LC01LjQwNDk0ek0yNzMuMTM3MiwxODkuNDg5NmMtMC41MzUxNCwyLjE0NTg5IC0wLjA3MDc5LDQuMTA5NDYgMS4wMzcxNSw0LjM4NTc1YzEuMTA3OTMsMC4yNzYyOSAyLjQzOTksLTEuMjM5MzIgMi45NzUwMywtMy4zODUyMmMwLjUzNTE0LC0yLjE0NTg5IDAuMDcwNzksLTQuMTA5NDUgLTEuMDM3MTUsLTQuMzg1NzRjLTEuMTA3OTMsLTAuMjc2MjkgLTIuNDM5OSwxLjIzOTMyIC0yLjk3NTA0LDMuMzg1MjF6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48L2c+PC9nPjwvc3ZnPg==";

  //thank you DogeIsCut for the inspiration behind the menu icon and the permission to take his idea and make it an extension :3
  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTguNzUzOTIiIGhlaWdodD0iMTY2LjEzNTYzIiB2aWV3Qm94PSIwLDAsMTE4Ljc1MzkyLDE2Ni4xMzU2MyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MC42MjMwNCwtOTYuOTMyMTkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTk5LjMzNjU2LDI1NS40MDE2M2MtMTEuNTk3NzYsLTcuNTkxOTYgLTE3LjgyMTk4LC0xOC42MDA3MSAtMTMuOTAyMjEsLTI0LjU4ODY2YzMuOTE5NzMsLTUuOTg3OTggMTYuNDk5MTgsLTQuNjg3NjQgMjguMDk2ODksMi45MDQzM2MxMS41OTc3Niw3LjU5MTk1IDE3LjgyMjAyLDE4LjYwMDY2IDEzLjkwMjI2LDI0LjU4ODZjLTMuOTE5NzMsNS45ODc5OCAtMTYuNDk5MjIsNC42ODc2NCAtMjguMDk2OTMsLTIuOTA0MzN6TTE5My4xMTY1NCwyMzYuMjAxOWMtMi40NTQ5OCwzLjc1MDM3IDEuNDQzMzMsMTAuNjQ1MzEgOC43MDcxOCwxNS40MDAyOWM3LjI2Mzg3LDQuNzU0OTggMTUuMTQyNTksNS41NjkzOSAxNy41OTc1NywxLjgxOTAyYzIuNDU1MDIsLTMuNzUwMzYgLTEuNDQzMzMsLTEwLjY0NTMyIC04LjcwNzE5LC0xNS40MDAyOWMtNy4yNjM4NywtNC43NTQ5OCAtMTUuMTQyNTksLTUuNTY5MzggLTE3LjU5NzU3LC0xLjgxOTAxeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iLz48cGF0aCBkPSJNMjEzLjczNjIxLDI1NC4xMTQ1MmMtMi4wMzgzNCwwLjEzMDc4IC0zLjM3NTgxLC0xLjIzNTg2IC0zLjUyMjIsLTMuNTE3MjZjLTAuMTQ2MzksLTIuMjgxNCAxLjAwMzQsLTMuODQwOTggMy4wNDE1LC0zLjk3MTc4YzguMjQ3MTgsLTAuNTI5MjcgMjkuNDgzNTgsLTEuODkyMzUgMzMuNzkxMzksLTIuMTY4OGMxLjQ5MjEsLTAuMDk1ODEgMi45Mjk5MywxLjQ2ODM3IDMuMTAxMTEsMy41Nzc1YzAuMTcxMTcsMi4xMDkxMSAtMS4wNjA0MSwzLjgxMTMgLTIuNDkzOTMsMy45MDMzNGMtNC4yNDQzLDAuMjcyNDIgLTI1LjYzNDc5LDEuNjQ1MzUgLTMzLjkxNzg2LDIuMTc3eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iLz48cGF0aCBkPSJNMjU5LjI5OTM3LDI1OC40MjA2MmMtMTMuNTY5MTgsMi44MzI1MyAtMjUuNzU0NzQsLTAuNTUwNjMgLTI3LjIxNzE1LC03LjU1NjQ1Yy0xLjQ2MjQ4LC03LjAwNTgxIDguMzUyMDIsLTE0Ljk4MTM0IDIxLjkyMTE3LC0xNy44MTM4NGMxMy41NjkxOCwtMi44MzI1MiAyNS43NTQ3NCwwLjU1MDU4IDI3LjIxNzE1LDcuNTU2NGMxLjQ2MjQ4LDcuMDA1ODEgLTguMzUyMDUsMTQuOTgxMzYgLTIxLjkyMTIsMTcuODEzODZ6TTI1OC4zNzE0NiwyNTMuOTc1MzRjOC40OTg1OSwtMS43NzQwNSAxNC42NDU1NywtNi43NjkyNyAxMy43Mjk1OSwtMTEuMTU3MTJjLTAuOTE1OTUsLTQuMzg3ODggLTguNTQ3OTcsLTYuNTA2OCAtMTcuMDQ2NTYsLTQuNzMyNzRjLTguNDk4NTksMS43NzQwNSAtMTQuNjQ1NTcsNi43NjkyNyAtMTMuNzI5NTksMTEuMTU3MTJjMC45MTU5Nyw0LjM4Nzg0IDguNTQ3OTcsNi41MDY4IDE3LjA0NjU2LDQuNzMyNzR6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjxwYXRoIGQ9Ik0yNjQuNjMyNjQsMjQ2LjEwOTExYy0xLjM0ODg1LDEuNTMzODEgLTMuMjYwOTYsMS41MTMxOCAtNC45Nzc2NiwwLjAwMzVjLTEuNzE2NywtMS41MDk2NyAtMi4wMDY0NiwtMy40MjU0OCAtMC42NTc4LC00Ljk1OTEzYzUuNDU3MzgsLTYuMjA1ODkgMTkuNTA5OTUsLTIyLjE4NjEzIDIyLjM2MDU1LC0yNS40Mjc3YzAuOTg3MzMsLTEuMTIyODIgMy4xMTAwOCwtMS4wMzM0NyA0LjcyMjQ5LDAuMzM2ODZjMS42MTI0MSwxLjM3MDMyIDEuOTQ1MTksMy40NDQ4NCAwLjk5NjYsNC41MjM1NmMtMi44MDg1NSwzLjE5MzggLTE2Ljk2MzExLDE5LjI4OTk3IC0yMi40NDQxOSwyNS41MjI5MnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9Ii8+PHBhdGggZD0iTTI5My4xMTI0MywyMDUuOTAxNDNjNi42OTk3NSwxMi4xMzUwNCA3LjA1MTg2LDI0Ljc3NjYxIDAuNzg2NDgsMjguMjM1N2MtNi4yNjUzNSwzLjQ1OTEzIC0xNi43NzU2NCwtMy41NzQxNSAtMjMuNDc1MzUsLTE1LjcwOTE4Yy02LjY5OTc1LC0xMi4xMzUwMyAtNy4wNTE5MSwtMjQuNzc2NTkgLTAuNzg2NTMsLTI4LjIzNTY3YzYuMjY1MzUsLTMuNDU5MTQgMTYuNzc1NjcsMy41NzQxNyAyMy40NzUzOCwxNS43MDkyek0yODkuMTM2OTcsMjA4LjA5NjI1Yy00LjE5NjE1LC03LjYwMDM4IC0xMC43Nzg5NCwtMTIuMDA1NDMgLTE0LjcwMzAxLC05LjgzODkyYy0zLjkyNDEyLDIuMTY2NDkgLTMuNzAzNTgsMTAuMDg0MTIgMC40OTI1OCwxNy42ODQ1YzQuMTk2MTUsNy42MDAzOCAxMC43Nzg5NCwxMi4wMDU0MyAxNC43MDMwMiw5LjgzODkxYzMuOTI0MDgsLTIuMTY2NTIgMy43MDM1NywtMTAuMDg0MTIgLTAuNDkyNTgsLTE3LjY4NDV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjxwYXRoIGQ9Ik0yNzguODI1MDQsMjAwLjU0MTY3YzEuODYyNzksMC44Mzc4MyAyLjQwNTcsMi42NzEzMyAxLjQ2Nzk4LDQuNzU2MjZjLTAuOTM3NzIsMi4wODQ5MyAtMi42ODM0NiwyLjkyNTU2IC00LjU0NjA1LDIuMDg3ODdjLTcuNTM2OTQsLTMuMzg5NzYgLTI2Ljk0NDYsLTEyLjExODE4IC0zMC44ODE0NCwtMTMuODg4NzljLTEuMzYzNjIsLTAuNjEzMjQgLTEuOTAyODMsLTIuNjY4MyAtMS4wNjc2MSwtNC42MTI1NGMwLjgzNTI0LC0xLjk0NDI0IDIuNzE5OTgsLTIuODcyNjggNC4wMzAwNywtMi4yODM1YzMuODc4ODEsMS43NDQ0NyAyMy40MjcyNiwxMC41MzYyNiAzMC45OTcwNiwxMy45NDA3MXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9Ii8+PHBhdGggZD0iTTI0MC4zNjc5MSwyMDIuNTE0NzFjLTEzLjg1MDgyLDAuNTQ3NDcgLTI1LjMwODM2LC00LjgwNTk1IC0yNS41OTA5OCwtMTEuOTU3MjFjLTAuMjgyNjcsLTcuMTUxMjQgMTAuNzE2NTMsLTEzLjM5MjI2IDI0LjU2NzM5LC0xMy45Mzk3YzEzLjg1MDgxLC0wLjU0NzQ3IDI1LjMwODMyLDQuODA1OTQgMjUuNTkwOTQsMTEuOTU3MTljMC4yODI2Nyw3LjE1MTI0IC0xMC43MTY1MiwxMy4zOTIzIC0yNC41NjczOCwxMy45Mzk3NHpNMjU1LjU3NTQ4LDE4OS4yNDY0OWMtMC4xNzcsLTQuNDc4OTQgLTcuMzUzMDIsLTcuODMxODggLTE2LjAyODA0LC03LjQ4OWMtOC42NzUwMSwwLjM0Mjg5IC0xNS41NjQsNC4yNTE3NSAtMTUuMzg2OTcsOC43MzA3MWMwLjE3Nyw0LjQ3ODk0IDcuMzUzMDIsNy44MzE4OCAxNi4wMjgwNCw3LjQ4OWM4LjY3NTAxLC0wLjM0Mjg4IDE1LjU2Mzk3LC00LjI1MTc3IDE1LjM4Njk3LC04LjczMDcxeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iLz48cGF0aCBkPSJNMjM3LjAzMzk5LDE5MC42NjE1NGMtMS4yOTg3MSwxLjg4MTM4IC0zLjE0ODU0LDIuMzY1NzIgLTQuODI5NDksMS4yMDUzOWMtNi44MzA2NCwtNC43MTUzMyAtMjQuNDcwMzIsLTE2Ljg5MjMzIC0yNy45NzAzOSwtMTkuMzA4NDljLTEuMTgyMTUsLTAuODE2MDkgLTEuMzYzMTEsLTIuOTA5MyAtMC4xMzE3NSwtNC42MzAxN2MxLjIzMTM2LC0xLjcyMDg3IDMuMjY4ODgsLTIuMzIzMDQgNC40OTkzMywtMS40NzM2YzMuNTUyNDYsMi40NTIyOCAyMS4wNjUwNywxNC41NDE2IDI3Ljg2NjE0LDE5LjIzNjQzYzEuNjgwNzMsMS4xNjAyMiAxLjg2NDg4LDMuMDg5MDUgMC41NjYxNyw0Ljk3MDQzeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iLz48cGF0aCBkPSJNMTkwLjE5MTg4LDE2OC4wNDA1NmMtOC42NzI1NSwtMTAuODEzNTEgLTExLjE3NzExLC0yMy4yMDk1NCAtNS41OTQsLTI3LjY4NzE4YzUuNTgzMDYsLTQuNDc3NjcgMTcuMTM5NTEsMC42NTg1OCAyNS44MTIwNiwxMS40NzIxNGM4LjY3MjU1LDEwLjgxMzUxIDExLjE3NzEsMjMuMjA5NTEgNS41OTM5OSwyNy42ODcxNWMtNS41ODMwNiw0LjQ3NzY3IC0xNy4xMzk1NCwtMC42NTg1NiAtMjUuODEyMDgsLTExLjQ3MjExek0xOTMuNzM0MzQsMTY1LjE5OTQxYzUuNDMxNzYsNi43NzI3IDEyLjY2OTc3LDkuOTg5NTggMTYuMTY2NTYsNy4xODUxN2MzLjQ5Njc5LC0yLjgwNDQxIDEuOTI4MTUsLTEwLjU2ODIyIC0zLjUwMzYxLC0xNy4zNDA5MmMtNS40MzE3NiwtNi43NzI3IC0xMi42Njk3NywtOS45ODk2MiAtMTYuMTY2NTQsLTcuMTg1MTdjLTMuNDk2NzgsMi44MDQ0MSAtMS45MjgxNSwxMC41NjgyMiAzLjUwMzYsMTcuMzQwOTN6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjxwYXRoIGQ9Ik0xOTQuOTg2MjcsMTU2LjQ1NDcxYy0yLjE1NzIyLC0wLjc1NjczIC0zLjExMjEzLC0yLjQxMzQzIC0yLjQzNjA0LC00LjM0MDgyYzIuNzQ3NjEsLTcuODMyMTYgOS44NDMwNiwtMjguMDU4MTggMTEuMjUwOTUsLTMyLjA3MTQzYzAuNDc1NTMsLTEuMzU1NDcgMi40NDY5NywtMi4wODE5MiA0LjQzMTYsLTEuMzQ3ODJjMS45ODQ2NCwwLjczNDEgMy4xMDI2OSwyLjU0MDc1IDIuNjA3NzEsMy45NTE2MmMtMS40Mjg5Miw0LjA3MzMxIC04LjQ3MzMxLDI0LjE1MzY0IC0xMS4yMDg5NCwzMS45NTE4NmMtMC42NzYwNSwxLjkyNzE2IC0yLjQ4ODA4LDIuNjEzMzIgLTQuNjQ1MywxLjg1NjZ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjxwYXRoIGQ9Ik0yMDcuOTc5NDYsMTA2LjgyMjA3YzEwLjY3NDczLC04Ljg0MjgxIDIzLjAyOTUxLC0xMS41NDM0OSAyNy41OTUwNywtNi4wMzIwM2M0LjU2NTU4LDUuNTExNDEgLTAuMzg2OTEsMTcuMTQ3OCAtMTEuMDYxNjgsMjUuOTkwNjFjLTEwLjY3NDcxLDguODQyOCAtMjMuMDI5NDcsMTEuNTQzNDggLTI3LjU5NTAyLDYuMDMyMDJjLTQuNTY1NTksLTUuNTExNCAwLjM4Njg3LC0xNy4xNDc4MyAxMS4wNjE2NCwtMjUuOTkwNjR6TTIwMy45NDgzLDEyNi41OTc0NmMyLjg1OTQ2LDMuNDUxOSAxMC41OTc0NiwxLjc2MDQ1IDE3LjI4MzIzLC0zLjc3Nzk1YzYuNjg1NzgsLTUuNTM4MzkgOS43ODc1OSwtMTIuODI2NDcgNi45MjgwOSwtMTYuMjc4MzhjLTIuODU5NDYsLTMuNDUxOSAtMTAuNTk3NDYsLTEuNzYwNDUgLTE3LjI4MzIzLDMuNzc3OTRjLTYuNjg1NzgsNS41MzgzOSAtOS43ODc1NSwxMi44MjY0OCAtNi45MjgwOSwxNi4yNzgzOHoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9Ii8+PHBhdGggZD0iTTIyMC4xNTA2OCwxMTEuMzUzNDRjMC4wMTQ1OCwtMi4yODYwNSAxLjI3MTAxLC0zLjcyNzUzIDMuMzEzNTEsLTMuNzE0NTNjOC4yOTk5NSwwLjA1MzA4IDI5LjczNCwwLjE5MDExIDMzLjk4Njk2LDAuMjE3MzFjMS40MzY0NSwwLjAwOTIgMi43NjQxNSwxLjYzNzU0IDIuNzE0ODksMy43NTMwMmMtMC4wNDkyNiwyLjExNTQ4IC0xLjM5NDQ5LDMuNzU5OTggLTIuODg5NjQsMy43NTAzOWMtNC4zMTY1OCwtMC4wMjc1NyAtMjUuNTk2MjUsLTAuMTYzNjUgLTMzLjg2MDIyLC0wLjIxNjQzYy0yLjA0MjI3LC0wLjAxMzA1IC0zLjI4MDA4LC0xLjUwMzcyIC0zLjI2NTUsLTMuNzg5Nzd6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjxwYXRoIGQ9Ik0yNzEuMzExODEsMTA3LjUxMTE5YzExLjgzMTk3LDcuMjIxNDUgMTguNDAxMjMsMTguMDI3ODkgMTQuNjcyNzIsMjQuMTM2NzhjLTMuNzI4NDUsNi4xMDg5MSAtMTYuMzQyNzEsNS4yMDY5NiAtMjguMTc0NywtMi4wMTQ1MmMtMTEuODMxOTgsLTcuMjIxNDQgLTE4LjQwMTIyLC0xOC4wMjc4NiAtMTQuNjcyNzEsLTI0LjEzNjc0YzMuNzI4NDYsLTYuMTA4OTEgMTYuMzQyNzMsLTUuMjA3IDI4LjE3NDcyLDIuMDE0NDh6TTI1MS4yOTk3OSwxMTAuMTI1NjZjLTIuMzM1MjMsMy44MjYwOCAxLjc3OTE5LDEwLjU5NDMzIDkuMTg5NzYsMTUuMTE3MjVjNy40MTA1Nyw0LjUyMjkzIDE1LjMxMTA5LDUuMDg3ODEgMTcuNjQ2MzEsMS4yNjE2OWMyLjMzNTIzLC0zLjgyNjA4IC0xLjc3OTE5LC0xMC41OTQzMyAtOS4xODk3NiwtMTUuMTE3MjVjLTcuNDEwNTcsLTQuNTIyOTMgLTE1LjMxMTA4LC01LjA4Nzc3IC0xNy42NDYzMSwtMS4yNjE2OXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9Ii8+PC9nPjwvZz48L3N2Zz4=";

  class SPspriteParent {
    constructor() {
      this.links = Object.create(null);
    }

    getInfo() {
      return {
        id: "SPspriteParent",
        name: "Sprite Parenting",
        color1: "#4B21CC",
        menuIconURI,
        blockIconURI,
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: "Linking" },
          {
            opcode: "makeLink",
            blockType: Scratch.BlockType.COMMAND,
            text: "make new sprite family named [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Link 1"
              },
            },
          },
          {
            opcode: "deleteLink",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete sprite family named [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Link 1"
              },
            },
          },
          {
            opcode: "deleteAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all sprite families",
          },
          "---",
          {
            opcode: "addSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "adopt [NAME] to family named [LINK]",
            arguments: {
              LINK: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Link 1"
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "TARGETS"
              }
            },
          },
          {
            opcode: "removeSprite",
            blockType: Scratch.BlockType.COMMAND,
            text: "disown [NAME] from family named [LINK]",
            arguments: {
              LINK: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Link 1"
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "TARGETS"
              }
            },
          },
          "---",
          {
            opcode: "linkExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "family named [NAME] exists?",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Link 1"
              }
            },
          },
          {
            opcode: "contentsLink",
            blockType: Scratch.BlockType.REPORTER,
            text: "children of family named [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Link 1"
              }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Parent Sprites" },
          {
            opcode: "linkMaster",
            blockType: Scratch.BlockType.COMMAND,
            text: "make [NAME] the parent of family named [LINK]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "TARGETS"
              },
              LINK: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Link 1"
              }
            },
          },
          {
            opcode: "whoMaster",
            blockType: Scratch.BlockType.REPORTER,
            text: "parent of family named [LINK]",
            arguments: {
              LINK: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Link 1"
              }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Parent Functions" },
          {
            opcode: "updateLink",
            blockType: Scratch.BlockType.COMMAND,
            text: "step [TYPE] of sprites in family named [LINK]",
            arguments: {
              LINK: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Link 1"
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "CONTROLTYPE"
              }
            },
          },
          {
            opcode: "updateAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "step [TYPE] of all sprite families",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "CONTROLTYPE"
              }
            },
          },
          "---",
          {
            opcode: "refreshLink",
            blockType: Scratch.BlockType.COMMAND,
            text: "refresh sprites in family named [LINK]",
            arguments: {
              LINK: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Link 1"
              }
            },
          },
          {
            opcode: "refreshAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "refresh all sprite families"
          }
        ],
        menus: {
          TARGETS: {
            acceptReporters: true,
            items: "_getTargets",
          },
          CONTROLTYPE: {
            acceptReporters: true,
            items: [
              "everything", "x and y", "direction",
              "size", "effects", "visibility"
            ],
          },
        },
      };
    }

    makeLink(args) { this.links[args.NAME] = {} }

    deleteLink(args) { delete this.links[args.NAME] }

    deleteAll(args) { this.links = Object.create(null) }

    addSprite(args, util) {
      const link = this.links[args.LINK];
      if (!link) this.links[args.LINK] = {};
      const target = args.NAME === "_myself_" ? util.target : runtime.getSpriteTargetByName(args.NAME);
      if (target) this.links[args.LINK][target.id] = [target, target.x, target.y];
    }

    removeSprite(args, util) {
      const link = this.links[args.LINK];
      if (link) {
        const target = args.NAME === "_myself_" ? util.target : runtime.getSpriteTargetByName(args.NAME);
        if (target) delete this.links[args.LINK][target.id];
      }
    }

    linkExists(args) { return Scratch.Cast.toBoolean(this.links[args.NAME]) }

    contentsLink(args) {
      const link = this.links[args.NAME];
      if (link !== undefined) {
        const spriteNames = Object.keys(link).filter(key => key !== "SPlinkMaster")
          .map(key => {
            const sprite = link[key][0];
            const name = sprite.getName();
            if (!sprite.isOriginal) return name + " (Clone)";
            else return name;
        });
        return JSON.stringify(spriteNames);
      } else { return "This Family Doesn't Exist" }
    }

    linkMaster(args, util) {
      const link = this.links[args.LINK];
      if (!link) this.links[args.LINK] = {};
      const target = args.NAME === "_myself_" ? util.target : runtime.getSpriteTargetByName(args.NAME);
      if (target) {
        this.links[args.LINK].SPlinkMaster = {
          sprite: target.getName(),
          id: target.id,
          direction: target.direction,
          size: target.size,
          show: target.visible,
          effects: target.effects
        };
      }
    }

    updateMaster() {
      for (const link in this.links) {
        const newLink = this.links[link];
        if (newLink.SPlinkMaster !== undefined) {
          const target = runtime.getTargetById(newLink.SPlinkMaster.id);
          newLink.SPlinkMaster = {
            sprite: target.getName(),
            id: target.id,
            direction: target.direction,
            size: target.size,
            show: target.visible,
            effects: target.effects
          };
        }
      }
    }

    whoMaster(args) {
      if (this.links[args.LINK] !== undefined) {
        const master = this.links[args.LINK].SPlinkMaster;
        if (master !== undefined) return master.sprite;
      }
      return "This Family doesnt have a Parent";
    }

    refresh(LINK) {
      this.updateMaster();
      if (this.links[LINK]) {
        let link = this.links[LINK];
        Object.keys(link).filter(key => key !== "SPlinkMaster")
          .map(key => {
            // get new values for target
            const target = runtime.getTargetById(key);
            if (target) link[key] = [target, target.x, target.y];
        });
      }
    }

    refreshLink(args) { this.refresh(args.LINK) }

    refreshAll() {
      const linkKeys = Object.keys(this.links);
      for (let i = 0; i < linkKeys.length; i++) {
        this.refresh(linkKeys[i]);
      }
    }

    updateLink(args) { this.update(args.LINK, args.TYPE) }

    updateAll(args) {
      const linkKeys = Object.keys(this.links);
      for (let i = 0; i < linkKeys.length; i++) {
        this.update(linkKeys[i], args.TYPE);
      }
    }

    update(link, TYPE) {
      this.updateMaster();
      link = this.links[link];
      if (link) {
        const master = link.SPlinkMaster;
        const sprites = Object.keys(link).filter(key => key !== "SPlinkMaster");
        if (!master) throw new Error("No parent was assigned to this family");
        const masTarget = runtime.getTargetById(master.id);
        for (let i = 0; i < sprites.length; i++) {
          const target = link[sprites[i]][0];
          if (target) {
            if (TYPE === "everything" || TYPE === "direction") {
              target.setDirection(master.direction);
            }
            if (TYPE === "everything" || TYPE === "size") {
              target.setSize(master.size);
            }
            if (TYPE === "everything" || TYPE === "visibility") {
              target.setVisible(master.show);
            }
            if (TYPE === "everything" || TYPE === "effects") {
              let value = master.effects;
              for (const effect in value) {
                target.setEffect(effect, value[effect]);
              }
            }
            if (TYPE === "everything" || TYPE === "x and y") {
              target.setXY(link[sprites[i]][1] + masTarget.x, link[sprites[i]][2] + masTarget.y);
            }
          }
        }
      }
    }

    //Thank you LilyMakesThings for this bit of gold :3
    _getTargets() {
      const spriteNames = [];
      spriteNames.push({ text : "myself", value: "_myself_" });
      const targets = Scratch.vm.runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) spriteNames.push({ text : target.getName(), value : target.getName() });
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }
  }

  Scratch.extensions.register(new SPspriteParent());
})(Scratch);
