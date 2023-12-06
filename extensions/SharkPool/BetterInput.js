// Name: Better Input
// ID: BetterInputSP
// Description: Expansion of the "ask and wait" Blocks
// By: SharkPool

// Version V.3.0.2 (Bug Fixes and New Blocks)

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) throw new Error("Better Input must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzQuMTc2MjgiIGhlaWdodD0iMTM0LjE3NjI4IiB2aWV3Qm94PSIwLDAsMTM0LjE3NjI4LDEzNC4xNzYyOCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Mi45MTE4NiwtMTEyLjkxMTg2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTcyLjkxMTg2LDE4MGMwLC0zNy4wNTE3NiAzMC4wMzYzOCwtNjcuMDg4MTQgNjcuMDg4MTQsLTY3LjA4ODE0YzM3LjA1MTc2LDAgNjcuMDg4MTQsMzAuMDM2MzggNjcuMDg4MTQsNjcuMDg4MTRjMCwzNy4wNTE3NiAtMzAuMDM2MzgsNjcuMDg4MTQgLTY3LjA4ODE0LDY3LjA4ODE0Yy0zNy4wNTE3NiwwIC02Ny4wODgxNCwtMzAuMDM2MzggLTY3LjA4ODE0LC02Ny4wODgxNHoiIGZpbGw9IiM5NDAwZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI0OS42Nzg4MiwxNDEuMDQ1NzZsMTAuODMzOSwwLjAzOTgzYzEwLjUxNTI2LDAuMDc5NjYgMTAuODMzOSwwLjExOTQ5IDExLjUxMTAyLDAuNTk3NDVjMi40Mjk2NiwxLjg3MjA0IDIuMzg5ODMsNC45Mzg5OSAtMC4xNTkzMyw2LjY1MTY5Yy0wLjc1Njc4LDAuNTE3OCAtMS4xMTUyNSwwLjU1NzYzIC00LjM0MTUyLDAuNTU3NjNoLTMuNTA1MDl2MzEuMTA3NjN2MzEuMDY3NzloMy40NjUyNmMzLjk0MzIyLDAgNC44OTkxNiwwLjMxODY1IDUuODE1MjYsMS45NTE3YzEuMDM1NiwxLjgzMjIgMC41MTc4LDMuOTQzMjMgLTEuMjc0NTgsNS4yNTc2M2MtMC42NzcxMiwwLjUxNzggLTAuOTk1NzYsMC41MTc4IC0xMS41MTEwMiwwLjU5NzQ1bC0xMC44MzM5LDAuMDc5NjZsLTEuMTE1MjUsLTAuNTU3NjNjLTEuMTU1MDksLTAuNjM3MjkgLTIuMTkwNjgsLTIuMTUwODUgLTIuMTkwNjgsLTMuMzg1NmMwLC0wLjg3NjI3IDAuOTk1NzcsLTIuNjY4NjQgMS43OTIzNywtMy4yNjYxYzAuNTk3NDYsLTAuNDc3OTcgMS4xMTUyNSwtMC41MTc4IDQuMzQxNTIsLTAuNTk3NDVsMy42NjQ0LC0wLjA3OTY3di0zMS4wNjc3OXYtMzEuMDY3NzlsLTMuNjY0NCwtMC4wNzk2N2MtMy4yMjYyNywtMC4wNzk2NiAtMy43NDQwNiwtMC4xMTk0OSAtNC4zNDE1MiwtMC41OTc0NWMtMC43OTY2MSwtMC41NTc2MyAtMS43OTIzNywtMi4zNSAtMS43OTIzNywtMy4yNjYxYzAsLTEuMjM0NzUgMC45OTU3NiwtMi43ODgxNCAyLjE5MDY4LC0zLjM4NTZ6IiBmaWxsPSJub25lIiBzdHJva2U9IiM2OTAwYjQiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMjI0LjY2NTI2LDE1OC40NTE3aDI4LjA0MDY3djIxLjU0ODMxdjIxLjUwODQ4bC0yOC40Mzg5OCwtMC4wMzk4M2MtMjguMiwtMC4wNzk2NiAtMjguNDM4OTksLTAuMDc5NjcgLTI5LjMxNTI2LC0wLjU5NzQ2Yy0wLjQ3Nzk3LC0wLjI3ODgyIC0xLjExNTI1LC0wLjkxNjEgLTEuMzk0MDcsLTEuNDczNzNsLTAuNTU3NjMsLTAuOTU1OTN2LTE4LjQ0MTUzYzAsLTE3LjcyNDU4IDAuMDM5ODMsLTE4LjQ0MTUzIDAuNDc3OTcsLTE5LjM1NzYzYzAuNTk3NDYsLTEuMDc1NDIgMC45NTU5MywtMS40MzM5IDIuMTUwODUsLTEuODcyMDNjMC43NTY3OCwtMC4yMzg5OSA2LjE3MzczLC0wLjMxODY1IDI5LjAzNjQ0LC0wLjMxODY1ek0yMTQuNjI3OTcsMTY4LjQ0OTE2Yy0wLjYzNzI5LDAuMzk4MyAtMS4zMTQ0MSwxLjc5MjM3IC01LjAxODY0LDkuOTk3NDZjLTQuNjIwMzQsMTAuMjM2NDQgLTQuODU5MzIsMTAuOTEzNTYgLTMuODIzNzIsMTIuMDI4ODJjMS4xNTUwOSwxLjIzNDc1IDIuOTQ3NDUsMS4yNzQ1NyAzLjk4MzA1LDAuMDM5ODNjMC4zMTg2NSwtMC4zOTgzIDAuNzk2NiwtMS4yNzQ1NyAxLjAzNTU5LC0xLjk1MTdsMC40MzgxNCwtMS4yMzQ3NWg0Ljc3OTY2aDQuNzc5NjZsMC41NTc2MywxLjQzMzljMC43MTY5NSwxLjk1MTcgMS40NzM3MywyLjYyODgyIDIuOTA3NjMsMi42Mjg4MmMwLjkxNjEsMCAxLjE5NDkxLC0wLjExOTQ5IDEuNzkyMzcsLTAuNzk2NjFjMC41MTc4LC0wLjU1NzYzIDAuNzE2OTUsLTEuMDM1NTkgMC43MTY5NSwtMS42NzI4OGMwLC0wLjYzNzI5IC0xLjE1NTA4LC0zLjU4NDc0IC0zLjc4MzksLTkuNDM5ODNjLTQuOTc4ODEsLTExLjE5MjM3IC00LjczOTg0LC0xMC43MTQ0MSAtNS41MzY0NSwtMTEuMTEyNzFjLTAuOTE2MSwtMC41MTc4IC0xLjkxMTg3LC0wLjQ3Nzk2IC0yLjgyNzk3LDAuMDc5NjZ6IiBmaWxsPSJub25lIiBzdHJva2U9IiM2OTAwYjQiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMjE2LjEwMTcsMTc2LjA5NjYxYzAuMTU5MzIsMC4xNTkzMiAyLjU4ODk4LDYuMTMzOSAyLjU4ODk4LDYuMzMzMDVjMCwwLjE1OTMyIC0xLjE5NDkxLDAuMjM4OTggLTIuNzA4NDcsMC4yMzg5OGMtMi4wNzExOCwwIC0yLjY2ODY0LC0wLjA3OTY2IC0yLjU4ODk4LC0wLjMxODY1YzAuMDc5NjYsLTAuMTU5MzIgMC42NzcxMiwtMS42MzMwNSAxLjM5NDA3LC0zLjMwNTkzYzAuNzE2OTUsLTEuNjMzMDUgMS4zMTQ0LC0yLjk4NzI5IDEuMzE0NCwtMi45NDc0NnoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0yNjcuNjQyMzgsMTgwdi0yMS41ODgxM2w4LjI4NDc0LDAuMDc5NjZjNy44MDY3OCwwLjA3OTY2IDguMzI0NTgsMC4xMTk1IDkuMTIxMTksMC41OTc0NmMwLjQ3Nzk2LDAuMjc4ODIgMS4xMTUyNSwwLjkxNjEgMS4zOTQwNywxLjQ3MzczbDAuNTU3NjIsMC45NTU5M3YxOC40ODEzNnYxOC40NDE1M2wtMC41NTc2MiwwLjk1NTkzYy0wLjI3ODgyLDAuNTU3NjMgLTAuOTE2MTEsMS4xOTQ5MSAtMS4zOTQwNywxLjQ3MzczYy0wLjgzNjQ0LDAuNTE3OCAtMS4zMTQ0MSwwLjUxNzggLTkuMTIxMTksMC41OTc0NmwtOC4yODQ3NCwwLjA3OTY2di0yMS41NDgzeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjkwMGI0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTI0OS42Nzg4MiwxNDEuMDQ1NzZsMTAuODMzOSwwLjAzOTgzYzEwLjUxNTI2LDAuMDc5NjYgMTAuODMzOSwwLjExOTQ5IDExLjUxMTAyLDAuNTk3NDVjMi40Mjk2NiwxLjg3MjA0IDIuMzg5ODMsNC45Mzg5OSAtMC4xNTkzMyw2LjY1MTY5Yy0wLjc1Njc4LDAuNTE3OCAtMS4xMTUyNSwwLjU1NzYzIC00LjM0MTUyLDAuNTU3NjNoLTMuNTA1MDl2MzEuMTA3NjN2MzEuMDY3NzloMy40NjUyNmMzLjk0MzIyLDAgNC44OTkxNiwwLjMxODY1IDUuODE1MjYsMS45NTE3YzEuMDM1NiwxLjgzMjIgMC41MTc4LDMuOTQzMjMgLTEuMjc0NTgsNS4yNTc2M2MtMC42NzcxMiwwLjUxNzggLTAuOTk1NzYsMC41MTc4IC0xMS41MTEwMiwwLjU5NzQ1bC0xMC44MzM5LDAuMDc5NjZsLTEuMTE1MjUsLTAuNTU3NjNjLTEuMTU1MDksLTAuNjM3MjkgLTIuMTkwNjgsLTIuMTUwODUgLTIuMTkwNjgsLTMuMzg1NmMwLC0wLjg3NjI3IDAuOTk1NzcsLTIuNjY4NjQgMS43OTIzNywtMy4yNjYxYzAuNTk3NDYsLTAuNDc3OTcgMS4xMTUyNSwtMC41MTc4IDQuMzQxNTIsLTAuNTk3NDVsMy42NjQ0LC0wLjA3OTY3di0zMS4wNjc3OXYtMzEuMDY3NzlsLTMuNjY0NCwtMC4wNzk2N2MtMy4yMjYyNywtMC4wNzk2NiAtMy43NDQwNiwtMC4xMTk0OSAtNC4zNDE1MiwtMC41OTc0NWMtMC43OTY2MSwtMC41NTc2MyAtMS43OTIzNywtMi4zNSAtMS43OTIzNywtMy4yNjYxYzAsLTEuMjM0NzUgMC45OTU3NiwtMi43ODgxNCAyLjE5MDY4LC0zLjM4NTZ6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yNTEuMzcyNiwxNTguNDUxN3Y0My4wNTY3OGMwLDAgLTU1LjU0NDYzLC0wLjExOTUgLTU2LjQyMDksLTAuNjM3MjljLTAuNDc3OTcsLTAuMjc4ODIgLTEuMTE1MjUsLTAuOTE2MSAtMS4zOTQwNywtMS40NzM3M2wtMC41NTc2MywtMC45NTU5M3YtMTguNDQxNTNjMCwtMTcuNzI0NTggMC4wMzk4MywtMTguNDQxNTMgMC40Nzc5NywtMTkuMzU3NjNjMC41OTc0NiwtMS4wNzU0MiAwLjk1NTkzLC0xLjQzMzkgMi4xNTA4NSwtMS44NzIwM2MwLjc1Njc4LC0wLjIzODk5IDU1Ljc0Mzc4LC0wLjMxODY1IDU1Ljc0Mzc4LC0wLjMxODY1ek0yMTQuNjI3OTcsMTY4LjQ0OTE2Yy0wLjYzNzI5LDAuMzk4MyAtMS4zMTQ0MSwxLjc5MjM3IC01LjAxODY0LDkuOTk3NDZjLTQuNjIwMzQsMTAuMjM2NDQgLTQuODU5MzIsMTAuOTEzNTYgLTMuODIzNzIsMTIuMDI4ODJjMS4xNTUwOSwxLjIzNDc1IDIuOTQ3NDUsMS4yNzQ1NyAzLjk4MzA1LDAuMDM5ODNjMC4zMTg2NSwtMC4zOTgzIDAuNzk2NiwtMS4yNzQ1NyAxLjAzNTU5LC0xLjk1MTdsMC40MzgxNCwtMS4yMzQ3NWg0Ljc3OTY2aDQuNzc5NjZsMC41NTc2MywxLjQzMzljMC43MTY5NSwxLjk1MTcgMS40NzM3MywyLjYyODgyIDIuOTA3NjMsMi42Mjg4MmMwLjkxNjEsMCAxLjE5NDkxLC0wLjExOTQ5IDEuNzkyMzcsLTAuNzk2NjFjMC41MTc4LC0wLjU1NzYzIDAuNzE2OTUsLTEuMDM1NTkgMC43MTY5NSwtMS42NzI4OGMwLC0wLjYzNzI5IC0xLjE1NTA4LC0zLjU4NDc0IC0zLjc4MzksLTkuNDM5ODNjLTQuOTc4ODEsLTExLjE5MjM3IC00LjczOTg0LC0xMC43MTQ0MSAtNS41MzY0NSwtMTEuMTEyNzFjLTAuOTE2MSwtMC41MTc4IC0xLjkxMTg3LC0wLjQ3Nzk2IC0yLjgyNzk3LDAuMDc5NjZ6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMTYuMTAxNywxNzYuMDk2NjFjMC4xNTkzMiwwLjE1OTMyIDIuNTg4OTgsNi4xMzM5IDIuNTg4OTgsNi4zMzMwNWMwLDAuMTU5MzIgLTEuMTk0OTEsMC4yMzg5OCAtMi43MDg0NywwLjIzODk4Yy0yLjA3MTE4LDAgLTIuNjY4NjQsLTAuMDc5NjYgLTIuNTg4OTgsLTAuMzE4NjVjMC4wNzk2NiwtMC4xNTkzMiAwLjY3NzEyLC0xLjYzMzA1IDEuMzk0MDcsLTMuMzA1OTNjMC43MTY5NSwtMS42MzMwNSAxLjMxNDQsLTIuOTg3MjkgMS4zMTQ0LC0yLjk0NzQ2eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjY4Ljk3NTcxLDE1OC40MTE4N2MwLDAgMTUuMjc1OTksMC4xOTkxNSAxNi4wNzI2LDAuNjc3MTJjMC40Nzc5NiwwLjI3ODgyIDEuMTE1MjUsMC45MTYxIDEuMzk0MDcsMS40NzM3M2wwLjU1NzYyLDAuOTU1OTN2MTguNDgxMzZ2MTguNDQxNTNsLTAuNTU3NjIsMC45NTU5M2MtMC4yNzg4MiwwLjU1NzYzIC0wLjkxNjExLDEuMTk0OTEgLTEuMzk0MDcsMS40NzM3M2MtMC44MzY0NCwwLjUxNzggLTE2LjA3MjYsMC42NzcxMiAtMTYuMDcyNiwwLjY3NzEyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9nPjwvc3ZnPg==";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OS4zNjMxMyIgaGVpZ2h0PSI4Ny45MjE0OSIgdmlld0JveD0iMCwwLDc5LjM2MzEzLDg3LjkyMTQ5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAwLjMxODQzLC0xMzYuMDQxNDMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMzIuNjcxMTksMTgwLjAwMDAzdjIxLjU0ODNsLTExLjcwNjUyLC0wLjA3OTY2Yy0xMS4wMzExNiwtMC4wNzk2NiAtMTEuNzA2NTQsLTAuMDc5NjYgLTEyLjg4ODQ1LC0wLjU5NzQ2Yy0wLjY3NTM3LC0wLjI3ODgyIC0xLjU3NTg3LC0wLjkxNjEgLTEuOTY5ODUsLTEuNDczNzNsLTAuNzg3OTMsLTAuOTU1OTN2LTE4LjQ0MTUzdi0xOC40ODEzNmwwLjc4NzkzLC0wLjk1NTkzYzAuMzkzOTgsLTAuNTU3NjMgMS4yOTQ0OCwtMS4xOTQ5MSAxLjk2OTg1LC0xLjQ3MzczYzEuMTI1NjMsLTAuNDc3OTYgMS44NTcyOSwtMC41MTc4IDEyLjg4ODQ1LC0wLjU5NzQ2bDExLjcwNjUyLC0wLjA3OTY2djIxLjU4ODEzeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0yMzAuNzg3MTYsMjAxLjU0ODMzYzAsMCAtMjEuNTI5MDQsLTAuMTU5MzIgLTIyLjcxMDk0LC0wLjY3NzEyYy0wLjY3NTM3LC0wLjI3ODgyIC0xLjU3NTg3LC0wLjkxNjEgLTEuOTY5ODUsLTEuNDczNzNsLTAuNzg3OTMsLTAuOTU1OTN2LTE4LjQ0MTUzdi0xOC40ODEzNmwwLjc4NzkzLC0wLjk1NTkzYzAuMzkzOTgsLTAuNTU3NjMgMS4yOTQ0OCwtMS4xOTQ5MSAxLjk2OTg1LC0xLjQ3MzczYzEuMTI1NjMsLTAuNDc3OTcgMjIuNzEwOTQsLTAuNjc3MTIgMjIuNzEwOTQsLTAuNjc3MTJ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjQ3LjMyODgxLDE4MC4wMDAwMXYtMjEuNTg4MTNsMTEuNzA2NTIsMC4wNzk2NmMxMS4wMzExNiwwLjA3OTY2IDExLjc2MjgyLDAuMTE5NSAxMi44ODg0NSwwLjU5NzQ2YzAuNjc1MzcsMC4yNzg4MiAxLjU3NTg3LDAuOTE2MSAxLjk2OTg1LDEuNDczNzNsMC43ODc5MywwLjk1NTkzdjE4LjQ4MTM2djE4LjQ0MTUzbC0wLjc4NzkzLDAuOTU1OTNjLTAuMzkzOTgsMC41NTc2MyAtMS4yOTQ0OCwxLjE5NDkxIC0xLjk2OTg1LDEuNDczNzNjLTEuMTgxOTEsMC41MTc4IC0xLjg1NzI5LDAuNTE3OCAtMTIuODg4NDUsMC41OTc0NmwtMTEuNzA2NTIsMC4wNzk2NnYtMjEuNTQ4M3oiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0yNDkuMjEyODQsMTU4LjQxMTg4YzAsMCAyMS41ODUzMiwwLjE5OTE1IDIyLjcxMDk0LDAuNjc3MTJjMC42NzUzNywwLjI3ODgyIDEuNTc1ODcsMC45MTYxIDEuOTY5ODUsMS40NzM3M2wwLjc4NzkzLDAuOTU1OTN2MTguNDgxMzZ2MTguNDQxNTNsLTAuNzg3OTMsMC45NTU5M2MtMC4zOTM5OCwwLjU1NzYzIC0xLjI5NDQ4LDEuMTk0OTEgLTEuOTY5ODUsMS40NzM3M2MtMS4xODE5MSwwLjUxNzggLTIyLjcxMDk0LDAuNjc3MTIgLTIyLjcxMDk0LDAuNjc3MTJ6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMjkuNTk1NTYsMTQxLjA0NTc3bDEwLjgzMzksMC4wMzk4M2MxMC41MTUyNiwwLjA3OTY2IDEwLjgzMzksMC4xMTk0OSAxMS41MTEwMiwwLjU5NzQ1YzIuNDI5NjYsMS44NzIwNCAyLjM4OTgzLDQuOTM4OTkgLTAuMTU5MzMsNi42NTE2OWMtMC43NTY3OCwwLjUxNzggLTEuMTE1MjUsMC41NTc2MyAtNC4zNDE1MiwwLjU1NzYzaC0zLjUwNTA5djMxLjEwNzYzdjMxLjA2Nzc5aDMuNDY1MjZjMy45NDMyMiwwIDQuODk5MTYsMC4zMTg2NSA1LjgxNTI2LDEuOTUxN2MxLjAzNTYsMS44MzIyIDAuNTE3OCwzLjk0MzIzIC0xLjI3NDU4LDUuMjU3NjNjLTAuNjc3MTIsMC41MTc4IC0wLjk5NTc2LDAuNTE3OCAtMTEuNTExMDIsMC41OTc0NWwtMTAuODMzOSwwLjA3OTY2bC0xLjExNTI1LC0wLjU1NzYzYy0xLjE1NTA5LC0wLjYzNzI5IC0yLjE5MDY4LC0yLjE1MDg1IC0yLjE5MDY4LC0zLjM4NTZjMCwtMC44NzYyNyAwLjk5NTc3LC0yLjY2ODY0IDEuNzkyMzcsLTMuMjY2MWMwLjU5NzQ2LC0wLjQ3Nzk3IDEuMTE1MjUsLTAuNTE3OCA0LjM0MTUyLC0wLjU5NzQ1bDMuNjY0NCwtMC4wNzk2N3YtMzEuMDY3Nzl2LTMxLjA2Nzc5bC0zLjY2NDQsLTAuMDc5NjdjLTMuMjI2MjcsLTAuMDc5NjYgLTMuNzQ0MDYsLTAuMTE5NDkgLTQuMzQxNTIsLTAuNTk3NDVjLTAuNzk2NjEsLTAuNTU3NjMgLTEuNzkyMzcsLTIuMzUgLTEuNzkyMzcsLTMuMjY2MWMwLC0xLjIzNDc1IDAuOTk1NzYsLTIuNzg4MTQgMi4xOTA2OCwtMy4zODU2eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjkwMGI0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTIyOS41OTU1NiwxNDEuMDQ1NzdsMTAuODMzOSwwLjAzOTgzYzEwLjUxNTI2LDAuMDc5NjYgMTAuODMzOSwwLjExOTQ5IDExLjUxMTAyLDAuNTk3NDVjMi40Mjk2NiwxLjg3MjA0IDIuMzg5ODMsNC45Mzg5OSAtMC4xNTkzMyw2LjY1MTY5Yy0wLjc1Njc4LDAuNTE3OCAtMS4xMTUyNSwwLjU1NzYzIC00LjM0MTUyLDAuNTU3NjNoLTMuNTA1MDl2MzEuMTA3NjN2MzEuMDY3NzloMy40NjUyNmMzLjk0MzIyLDAgNC44OTkxNiwwLjMxODY1IDUuODE1MjYsMS45NTE3YzEuMDM1NiwxLjgzMjIgMC41MTc4LDMuOTQzMjMgLTEuMjc0NTgsNS4yNTc2M2MtMC42NzcxMiwwLjUxNzggLTAuOTk1NzYsMC41MTc4IC0xMS41MTEwMiwwLjU5NzQ1bC0xMC44MzM5LDAuMDc5NjZsLTEuMTE1MjUsLTAuNTU3NjNjLTEuMTU1MDksLTAuNjM3MjkgLTIuMTkwNjgsLTIuMTUwODUgLTIuMTkwNjgsLTMuMzg1NmMwLC0wLjg3NjI3IDAuOTk1NzcsLTIuNjY4NjQgMS43OTIzNywtMy4yNjYxYzAuNTk3NDYsLTAuNDc3OTcgMS4xMTUyNSwtMC41MTc4IDQuMzQxNTIsLTAuNTk3NDVsMy42NjQ0LC0wLjA3OTY3di0zMS4wNjc3OXYtMzEuMDY3NzlsLTMuNjY0NCwtMC4wNzk2N2MtMy4yMjYyNywtMC4wNzk2NiAtMy43NDQwNiwtMC4xMTk0OSAtNC4zNDE1MiwtMC41OTc0NWMtMC43OTY2MSwtMC41NTc2MyAtMS43OTIzNywtMi4zNSAtMS43OTIzNywtMy4yNjYxYzAsLTEuMjM0NzUgMC45OTU3NiwtMi43ODgxNCAyLjE5MDY4LC0zLjM4NTZ6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+";

  const formatIcon =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNTAuOTAzNTUiIGhlaWdodD0iOTUuNSIgdmlld0JveD0iMCwwLDE1MC45MDM1NSw5NS41Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTY0LjU0ODIyLC0xMzIuMjUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMzkuNzQxOTcsMjAxLjgxODIzYzAsMCAtNDAuMjY2OTcsLTAuMTU5MzIgLTQxLjU1OTI5LC0wLjY3NzEyYy0wLjczODQ2LC0wLjI3ODgyIC0xLjcyMzA5LC0wLjkxNjEgLTIuMTUzODcsLTEuNDczNzNsLTAuODYxNTQsLTAuOTU1OTN2LTE4LjQ0MTUzdi0xOC40ODEzNmwwLjg2MTU0LC0wLjk1NTkzYzAuNDMwNzksLTAuNTU3NjMgMS40MTU0MSwtMS4xOTQ5MSAyLjE1Mzg3LC0xLjQ3MzczYzEuMjMwNzksLTAuNDc3OTYgNDEuNTU5MjksLTAuNjc3MTIgNDEuNTU5MjksLTAuNjc3MTJ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjkwMGI0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTIzNC4wOTEzNiwxNTguNjgxNzhjMCwwIDQyLjY2MTg0LDAuMTk5MTYgNDMuODkyNjIsMC42NzcxMmMwLjczODQ2LDAuMjc4ODIgMS43MjMwOSwwLjkxNjEgMi4xNTM4NywxLjQ3MzczbDAuODYxNTQsMC45NTU5M3YxOC40ODEzNnYxOC40NDE1M2wtMC44NjE1NCwwLjk1NTkzYy0wLjQzMDc5LDAuNTU3NjMgLTEuNDE1NDEsMS4xOTQ5MSAtMi4xNTM4NywxLjQ3MzczYy0xLjI5MjMyLDAuNTE3OCAtNDMuODkyNjIsMC42NzcxMiAtNDMuODkyNjIsMC42NzcxMnoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0yMzYuMTUxNCwxNTguNjgxNzhjMCwwIDQwLjYwMTgxLDAuMTk5MTUgNDEuODMyNTksMC42NzcxMmMwLjczODQ2LDAuMjc4ODIgMS43MjMwOSwwLjkxNjEgMi4xNTM4NywxLjQ3MzczbDAuODYxNTQsMC45NTU5M3YxOC40ODEzNnYxOC40NDE1M2wtMC44NjE1NCwwLjk1NTkzYy0wLjQzMDc5LDAuNTU3NjMgLTEuNDE1NDEsMS4xOTQ5MSAtMi4xNTM4NywxLjQ3MzczYy0xLjI5MjMyLDAuNTE3OCAtNDEuODMyNTksMC42NzcxMiAtNDEuODMyNTksMC42NzcxMnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIzNy42ODE5MywyMDEuODE4MjNjMCwwIC0zOC4yMDY5NCwtMC4xNTkzMiAtMzkuNDk5MjYsLTAuNjc3MTJjLTAuNzM4NDYsLTAuMjc4ODIgLTEuNzIzMDksLTAuOTE2MSAtMi4xNTM4NywtMS40NzM3M2wtMC44NjE1NCwtMC45NTU5M3YtMTguNDQxNTN2LTE4LjQ4MTM2bDAuODYxNTQsLTAuOTU1OTNjMC40MzA3OSwtMC41NTc2MyAxLjQxNTQxLC0xLjE5NDkxIDIuMTUzODcsLTEuNDczNzNjMS4yMzA3OCwtMC40Nzc5NyAzOS40OTkyNiwtMC42NzcxMiAzOS40OTkyNiwtMC42NzcxMnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0xNjkuNTQ4MjIsMTU0LjQwNzUydi0xNy4xNTc1MmgxNy4xNTc1MnoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0zMTAuNDUxNzgsMjA1LjU5MjQ4djE3LjE1NzUyaC0xNy4xNTc1MnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSJub25lIiBzdHJva2U9IiM2OTAwYjQiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMTY5LjU0ODIzLDE1NC40MDc1MnYtMTcuMTU3NTJoMTcuMTU3NTJ6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0zMTAuNDUxNzgsMjA1LjU5MjQ4djE3LjE1NzUyaC0xNy4xNTc1MnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0xODYuNzA1NzYsMjIyLjc1aC0xNy4xNTc1MnYtMTcuMTU3NTJ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjkwMGI0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTI5My4yOTQyNSwxMzcuMjVoMTcuMTU3NTJ2MTcuMTU3NTJ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjkwMGI0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTE4Ni43MDU3NiwyMjIuNzVoLTE3LjE1NzUydi0xNy4xNTc1MnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yOTMuMjk0MjUsMTM3LjI1aDE3LjE1NzUydjE3LjE1NzUyeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIzNi4yNjY0NCwxNjUuNjY5ODVjMS4xODI3MiwtMC43MTk5MSAyLjQ4NDMxLC0wLjc3MTMzIDMuNjY3MDMsLTAuMTAyODNjMS4wMjg0NSwwLjUxNDIyIDAuNzc2MzksLTAuMDQwOTQgNy4yMDQyMSwxNC40MDg4YzMuMzkzOSw3LjU1OTEzIDQuODY5NjUsMTEuNDA4NTMgNC44Njk2NSwxMi4yMzEyOWMwLDAuODIyNzYgLTAuMjYyMzgsMS40NDUyOSAtMC45MzA4OCwyLjE2NTIxYy0wLjc3MTM0LDAuODc0MTkgLTEuMTM3ODQsMS4wMzM3NCAtMi4zMjA1NSwxLjAzMzc0Yy0xLjg1MTIxLDAgLTIuODk4MjIsLTAuOTgyNTUgLTMuODIzODIsLTMuNTAyMjdsLTAuNjUyODgsLTEuNzQwOWwtNi4yMDUwNSwwLjAwOTg1bC02LjIwNSwtMC4wMDk5bC0wLjQ5ODQ5LDEuNDgzODZjLTAuMzA4NTQsMC44NzQyIC0wLjk5MDc4LDIuMTE2OTMgLTEuNDAyMTcsMi42MzExNWMtMS4zMzcsMS41OTQwOSAtMy42NjMxMywxLjUzMzU5IC01LjE1NDM5LC0wLjA2MDUxYy0xLjMzNywtMS40Mzk4NCAtMS4wNDcyOSwtMi4zNzMyOCA0LjkxNzczLC0xNS41ODg4OGM0Ljc4MjI5LC0xMC41OTMwNiA1LjcxMTg0LC0xMi40NDQ0MSA2LjUzNDYsLTEyLjk1ODYzeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7bm9Ib3ZlciZxdW90OzpmYWxzZSwmcXVvdDtvcmlnSXRlbSZxdW90OzpbJnF1b3Q7UGF0aCZxdW90Oyx7JnF1b3Q7YXBwbHlNYXRyaXgmcXVvdDs6dHJ1ZSwmcXVvdDtzZWdtZW50cyZxdW90OzpbW1szMzcuMjU1OTQsMTk4LjIzMTY1XSxbMCwwXSxbLTEuMjc0NTgsMC43OTY2XV0sW1szMjcuMjE4NjYsMjE4LjIyNjU3XSxbNy40MDg0NiwtMTYuNDEwMThdLFstOS4yNDA2OCwyMC40NzI4OF1dLFtbMzE5LjU3MTIyLDI0Mi4yODQyMV0sWy0yLjA3MTIsLTIuMjMwNTJdLFsyLjMxMDE4LDIuNDY5NV1dLFtbMzI3LjUzNzMyLDI0Mi4zNjM4N10sWy0yLjA3MTIsMi40Njk0OF0sWzAuNjM3MywtMC43OTY2XV0sW1szMjkuNjA4NSwyMzguNDYwNDddLFstMC40Nzc5OCwxLjM1NDI2XSxbMCwwXV0sWzMzMC40ODQ3OCwyMzUuOTkwOTddLFszNDAuMDQ0MSwyMzUuOTkwOTddLFszNDkuNjAzNDIsMjM1Ljk5MDk3XSxbWzM1MC43MTg2OCwyMzguODU4NzddLFswLDBdLFsxLjQzMzksMy45MDM0XV0sW1szNTYuNTMzOTQsMjQ0LjExNjQxXSxbLTIuODY3OCwwXSxbMS44MzIyLDBdXSxbWzM2MC4xMTg2OCwyNDIuNTIzMTldLFstMS4xOTQ5MiwxLjM1NDI0XSxbMS4wMzU2LC0xLjExNTI2XV0sW1szNjEuNTUyNTgsMjM5LjE3NzQzXSxbMCwxLjI3NDU4XSxbMCwtMS4yNzQ1OF1dLFtbMzUzLjk4NDc4LDIyMC4yOTc3N10sWzUuMjU3NjQsMTEuNzEwMThdLFstOS45NTc2MiwtMjIuMzg0NzRdXSxbWzM0Mi45MTE4OCwxOTguMDcyMzVdLFsxLjU5MzIyLDAuNzk2Nl0sWy0xLjgzMjIsLTEuMDM1Nl1dLFtbMzM3LjI1NTk0LDE5OC4yMzE2N10sWzEuODMyMiwtMS4xMTUyNF0sWzAsMF1dXSwmcXVvdDtjbG9zZWQmcXVvdDs6dHJ1ZSwmcXVvdDtmaWxsQ29sb3ImcXVvdDs6WzAsMCwwLDFdfV19IiBmaWxsPSIjNjkwMGI0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PHBhdGggZD0iTTIzOC4xNzcwNCwxNzUuNjA3MDJjMC4yMDU2OSwwLjIwNTY5IDMuMzQyNDYsNy45MTkwOCAzLjM0MjQ2LDguMTc2MTljMCwwLjIwNTY5IC0xLjU0MjY3LDAuMzA4NTMgLTMuNDk2NzMsMC4zMDg1M2MtMi42NzM5NywwIC0zLjQ0NTMxLC0wLjEwMjg0IC0zLjM0MjQ2LC0wLjQxMTM5YzAuMTAyODQsLTAuMjA1NjkgMC44NzQxOSwtMi4xMDgzMiAxLjc5OTc5LC00LjI2ODA3YzAuOTI1NjEsLTIuMTA4MzIgMS42OTY5NCwtMy44NTY3IDEuNjk2OTQsLTMuODA1Mjd6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+";

  const colorIcon =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3NS41MzUxNyIgaGVpZ2h0PSI3MS40OTc0NiIgdmlld0JveD0iMCwwLDc1LjUzNTE3LDcxLjQ5NzQ2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAyLjIzMjQxLC0xNDQuMjUxMjcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMjMuNTM4NTYsMTY1LjcxMjcxYzAsLTkuMDkxNDEgNy4zNzAwNCwtMTYuNDYxNDQgMTYuNDYxNDQsLTE2LjQ2MTQ0YzkuMDkxNDEsMCAxNi40NjE0NCw3LjM3MDA0IDE2LjQ2MTQ0LDE2LjQ2MTQ0YzAsOS4wOTE0MSAtNy4zNzAwMywxNi40NjE0NCAtMTYuNDYxNDQsMTYuNDYxNDRjLTkuMDkxNDEsMCAtMTYuNDYxNDQsLTcuMzcwMDMgLTE2LjQ2MTQ0LC0xNi40NjE0NHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0yMDcuMjMyNDIsMTk0LjI4NzI5YzAsLTkuMDkxNDEgNy4zNzAwNCwtMTYuNDYxNDQgMTYuNDYxNDQsLTE2LjQ2MTQ0YzkuMDkxNDEsMCAxNi40NjE0NCw3LjM3MDA0IDE2LjQ2MTQ0LDE2LjQ2MTQ0YzAsOS4wOTE0MSAtNy4zNzAwNCwxNi40NjE0NCAtMTYuNDYxNDQsMTYuNDYxNDRjLTkuMDkxNDEsMCAtMTYuNDYxNDQsLTcuMzcwMDMgLTE2LjQ2MTQ0LC0xNi40NjE0NHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0yMzkuODQ0NzEsMTk0LjI4NzI5YzAsLTkuMDkxNDEgNy4zNzAwNCwtMTYuNDYxNDQgMTYuNDYxNDQsLTE2LjQ2MTQ0YzkuMDkxNDEsMCAxNi40NjE0NCw3LjM3MDA0IDE2LjQ2MTQ0LDE2LjQ2MTQ0YzAsOS4wOTE0MSAtNy4zNzAwMywxNi40NjE0NCAtMTYuNDYxNDQsMTYuNDYxNDRjLTkuMDkxNDEsMCAtMTYuNDYxNDQsLTcuMzcwMDMgLTE2LjQ2MTQ0LC0xNi40NjE0NHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0yMjMuNTM4NTYsMTY1LjcxMjcxYzAsLTkuMDkxNDEgNy4zNzAwMywtMTYuNDYxNDQgMTYuNDYxNDQsLTE2LjQ2MTQ0YzkuMDkxNCwwIDE2LjQ2MTQ0LDcuMzcwMDQgMTYuNDYxNDQsMTYuNDYxNDRjMCw5LjA5MTQxIC03LjM3MDAzLDE2LjQ2MTQ0IC0xNi40NjE0NCwxNi40NjE0NGMtOS4wOTE0LDAgLTE2LjQ2MTQ0LC03LjM3MDAzIC0xNi40NjE0NCwtMTYuNDYxNDR6IiBmaWxsPSIjMDBmZjAxIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0ibm9uZSIvPjxwYXRoIGQ9Ik0yMDcuMjMyNDEsMTk0LjI4NzI5YzAsLTkuMDkxNCA3LjM3MDA0LC0xNi40NjE0NCAxNi40NjE0NCwtMTYuNDYxNDRjOS4wOTE0LDAgMTYuNDYxNDQsNy4zNzAwNCAxNi40NjE0NCwxNi40NjE0NGMwLDkuMDkxNCAtNy4zNzAwNCwxNi40NjE0NCAtMTYuNDYxNDQsMTYuNDYxNDRjLTkuMDkxNCwwIC0xNi40NjE0NCwtNy4zNzAwNCAtMTYuNDYxNDQsLTE2LjQ2MTQ0eiIgZmlsbD0iI2ZmMDAwMCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9Im5vbmUiLz48cGF0aCBkPSJNMjM5Ljg0NDcxLDE5NC4yODcyOWMwLC05LjA5MTQxIDcuMzcwMDMsLTE2LjQ2MTQ0IDE2LjQ2MTQ0LC0xNi40NjE0NGM5LjA5MTQsMCAxNi40NjE0NCw3LjM3MDA0IDE2LjQ2MTQ0LDE2LjQ2MTQ0YzAsOS4wOTE0MSAtNy4zNzAwMywxNi40NjE0NCAtMTYuNDYxNDQsMTYuNDYxNDRjLTkuMDkxNCwwIC0xNi40NjE0NCwtNy4zNzAwNCAtMTYuNDYxNDQsLTE2LjQ2MTQ0eiIgZmlsbD0iIzAwNzFmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9Im5vbmUiLz48L2c+PC9nPjwvc3ZnPg==";

  const effectIcon =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1Ny40NDI0MSIgaGVpZ2h0PSI3MC40NSIgdmlld0JveD0iMCwwLDU3LjQ0MjQxLDcwLjQ1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjEwLjI2NjQ1LC0xNDQuODU2NTUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMTUuMjY2NDUsMTkzLjkwNDFjLTMuOTg4MTUsLTguMTE3MSAtMy45OTYxMSwtMTguMjQzMDUgMC4xNTIyMSwtMjYuNDExMDNjNC42ODc3OSwtOS41NzQzMSAxMi41NzY5MSwtMTMuODE3OTcgMTUuNzQ3NTYsLTE1LjE5Nzc1YzEuOTA1OCwtMC44ODUwOCAzLjkxMzg4LC0xLjU3NDk3IDYuMDc1MzcsLTIuMDgzMTNsMi4xMjA1OSwtMC40NTc2OGMxLjU1ODA1LC0wLjMxOTcgMy4xMDkyOCwwLjY0NjE0IDMuNDQ2OCwyLjE4NzQ1YzAuMzQwOTMsMS41NDQ2OCAtMC42NTExOCwzLjA2NTggLTIuMjE2MDUsMy40MDIzM2wtMi4wNjI2MywwLjQ0NDIyYy0xLjcxNDg4LDAuNDAzODQgLTMuMzU4MTYsMC45NjkyMSAtNC45NjA1MywxLjcxNjMxYy0yLjA4MzA4LDAuOTAxOSAtOC45NzMyOCw0LjM5MTczIC0xMi45NDg1MiwxMi41MTU2Yy0zLjAxNzIzLDUuOTMzMDUgLTMuOTE3MjksMTUuMzY2MDIgMC44MzE4NywyMy4xNDk5OGM0LjMwMjU0LDcuNDk3OTIgMTMuMTEyMTcsMTIuMDk0OTMgMjEuNDY4MzcsMTEuMzIwOTFjNy45MDI3NiwtMC41Njg3NCAxNS4xNTQzNCwtNS44Mjg3MiAxNy42OTc2OCwtMTIuNzk0OTJjMi41ODA4NCwtNi41NTIyNiAwLjg2NTk2LC0xMy4yNjk0MyAtMS45NjcxNywtMTcuMDUyMDRjLTMuNDEyNzEsLTQuNjYwOTYgLTcuNjYwNywtNi4wOTQ1OCAtOS4zMjc4NSwtNi40OTUwNWMtMC4yNDg4OCwtMC4wNzQwNCAtNi4wODU2LC0xLjgyNzM2IC0xMS4yNDA0NiwwLjc1MzgzYy0yLjIxOTQ1LDEuMDYzNDQgLTUuMDkwMDksMy40NTYxOCAtNi42Mjc2OCw3LjA1MDMzYy0xLjY2MDMzLDMuNzExOTQgLTEuMjMwNzYsOC40ODM5NSAxLjAxOTM4LDExLjY1NDA4YzIuMjYzNzgsMy4zOTg5NyA2LjUzMjIyLDUuMzIzOTIgMTAuMjA0MDQsNC42NzEwNWMzLjY1NDc3LC0wLjU3NTQ3IDYuMTI2NTEsLTMuMjk0NjQgNi43MTI5MSwtNS42ODQwMWMwLjY4ODY4LC0yLjU2NzczIC0wLjM2ODIsLTQuNzM4MzYgLTEuMTkzMjYsLTUuNTE5MTFjLTEuNDAxMjIsLTEuMzgzMTQgLTIuNjExNTIsLTEuNDA2NyAtMi42NjI2NiwtMS40MTAwN2MtMC41NzI3NiwtMC4wMTY4MyAtMC44NTU3MywwLjAyNjkyIC0xLjAyNjIsMC4wNTM4NGMtMC42NTQ1OSwwLjIzODk0IC0xLjU4MTkyLDAuNzYzOTMgLTEuODU0NjYsMS4zMTU4NGMtMC4wNDc3MywwLjA5MDg2IC0wLjE3MDQ3LDAuMzM5OSAwLjA2NDc4LDAuOTYyNDhjMC41NjI1MywxLjQ3NzM3IC0wLjE5Nzc0LDMuMTI5NzQgLTEuNjk0NDIsMy42ODUwMmMtMS40ODk4NiwwLjU1ODY0IC0zLjE2NzI0LC0wLjE5MTgyIC0zLjczMzE4LC0xLjY3MjU2Yy0wLjkzMDc0LC0yLjQ0OTk1IC0wLjQxNTkzLC00LjM2ODE4IDAuMTgwNjksLTUuNTQ2MDNjMS41NTgwNSwtMy4wNjU4IDUuMTc1MzIsLTQuMTc2MzUgNS41ODQ0MywtNC4yOTQxNGMwLjE4NzUxLC0wLjA1NzIxIDAuMzg1MjUsLTAuMDkwODYgMC41Nzk1OCwtMC4xMDc2OWMwLjM5ODg5LC0wLjA2MDU4IDEuMTAxMiwtMC4xNTQ4IDIuMDUyNCwtMC4xMTc3OWMyLjE3ODU0LDAuMDI2OTIgNC42NjA1MSwxLjE2NDQgNi41NjI5LDMuMDQ1NjFjMi4yNDY3MywyLjEyMDE1IDQuMDA1OTMsNi4zODA2MyAyLjc1ODEyLDExLjAxMTNjLTEuMjE3MTIsNC45NTcxIC01Ljg5NDY4LDkuMDU2MDYgLTExLjM1Mjk3LDkuOTE0MjFjLTUuODcwODIsMS4wNDY2MSAtMTIuNDgxNDUsLTEuODQ3NTYgLTE1Ljk3MjU3LC03LjA5NDA4Yy0zLjM2NDk4LC00LjcyODI2IC00LjAwOTM0LC0xMS42NDczNSAtMS41NDc4MiwtMTcuMTM2MTdjMi43MDAxNywtNi4zMjAwNiA3Ljg1ODQ0LC05LjE4MDU3IDkuMzcyMTcsLTkuOTA3NDhjNy4yNzg4NiwtMy42MzQ1NCAxNS4wNTg4OCwtMS4yMzUwNyAxNS4zODYxNywtMS4xMzQxMWMyLjA5MzMxLDAuNDk0NyA3LjkxMjk5LDIuNDQzMjIgMTIuNDM3MTMsOC42MjUyOWMzLjQ3NzQ5LDQuNjUwODYgNi4yOTY5OCwxMy4zMzY3MyAyLjcxMzgsMjIuNDI5ODFjLTMuMjcyOTMsOC45NjE4MyAtMTIuNTkwNTUsMTUuNzY5ODUgLTIyLjYzNzc2LDE2LjQ5MzM5Yy0wLjc4NzU1LDAuMDc0MDQgLTEuNTg1MzIsMC4xMTQ0MiAtMi4zNzk2OSwwLjExNDQyYy05Ljc1MDYsMCAtMTkuNjI3MzQsLTUuNjIwMDcgLTI0LjU4MTA2LC0xNC4yNDg3M2MwLDAgLTAuODIwNDksLTEuNDE4MzQgLTEuMTgxODEsLTIuMTUzNzN6IiBzdHJva2U9IiM2OTAwYjQiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMjE2LjQ0ODI3LDE5Ni4wNTc4NGMtNS4xMzQ0MSwtOC40MjAwMSAtNS41NTM3NSwtMTkuNjU2NzkgLTEuMDI5NjEsLTI4LjU2NDc3YzQuNjg3NzksLTkuNTc0MzEgMTIuNTc2OTEsLTEzLjgxNzk3IDE1Ljc0NzU2LC0xNS4xOTc3NWMxLjkwNTgsLTAuODg1MDggMy45MTM4OCwtMS41NzQ5NyA2LjA3NTM3LC0yLjA4MzEzbDIuMTIwNTksLTAuNDU3NjhjMS41NTgwNSwtMC4zMTk3IDMuMTA5MjgsMC42NDYxNCAzLjQ0NjgsMi4xODc0NWMwLjM0MDkzLDEuNTQ0NjggLTAuNjUxMTgsMy4wNjU4IC0yLjIxNjA1LDMuNDAyMzNsLTIuMDYyNjMsMC40NDQyMmMtMS43MTQ4OCwwLjQwMzg0IC0zLjM1ODE2LDAuOTY5MjEgLTQuOTYwNTMsMS43MTYzMWMtMi4wODMwOCwwLjkwMTkgLTguOTczMjgsNC4zOTE3MyAtMTIuOTQ4NTIsMTIuNTE1NmMtMy4wMTcyMyw1LjkzMzA1IC0zLjkxNzI5LDE1LjM2NjAyIDAuODMxODcsMjMuMTQ5OThjNC4zMDI1NCw3LjQ5NzkyIDEzLjExMjE3LDEyLjA5NDkzIDIxLjQ2ODM3LDExLjMyMDkxYzcuOTAyNzYsLTAuNTY4NzQgMTUuMTU0MzQsLTUuODI4NzIgMTcuNjk3NjgsLTEyLjc5NDkyYzIuNTgwODQsLTYuNTUyMjYgMC44NjU5NiwtMTMuMjY5NDMgLTEuOTY3MTcsLTE3LjA1MjA0Yy0zLjQxMjcxLC00LjY2MDk2IC03LjY2MDcsLTYuMDk0NTggLTkuMzI3ODUsLTYuNDk1MDVjLTAuMjQ4ODgsLTAuMDc0MDQgLTYuMDg1NiwtMS44MjczNiAtMTEuMjQwNDYsMC43NTM4M2MtMi4yMTk0NSwxLjA2MzQ0IC01LjA5MDA5LDMuNDU2MTggLTYuNjI3NjgsNy4wNTAzM2MtMS42NjAzMywzLjcxMTk0IC0xLjIzMDc2LDguNDgzOTUgMS4wMTkzOCwxMS42NTQwOGMyLjI2Mzc4LDMuMzk4OTcgNi41MzIyMiw1LjMyMzkyIDEwLjIwNDA0LDQuNjcxMDVjMy42NTQ3NywtMC41NzU0NyA2LjEyNjUxLC0zLjI5NDY0IDYuNzEyOTEsLTUuNjg0MDFjMC42ODg2OCwtMi41Njc3MyAtMC4zNjgyLC00LjczODM2IC0xLjE5MzI2LC01LjUxOTExYy0xLjQwMTIyLC0xLjM4MzE0IC0yLjYxMTUyLC0xLjQwNjcgLTIuNjYyNjYsLTEuNDEwMDdjLTAuNTcyNzYsLTAuMDE2ODMgLTAuODU1NzMsMC4wMjY5MiAtMS4wMjYyLDAuMDUzODRjLTAuNjU0NTksMC4yMzg5NCAtMS41ODE5MiwwLjc2MzkzIC0xLjg1NDY2LDEuMzE1ODRjLTAuMDQ3NzMsMC4wOTA4NiAtMC4xNzA0NywwLjMzOTkgMC4wNjQ3OCwwLjk2MjQ4YzAuNTYyNTMsMS40NzczNyAtMC4xOTc3NCwzLjEyOTc0IC0xLjY5NDQyLDMuNjg1MDJjLTEuNDg5ODYsMC41NTg2NCAtMy4xNjcyNCwtMC4xOTE4MiAtMy43MzMxOCwtMS42NzI1NmMtMC45MzA3NCwtMi40NDk5NSAtMC40MTU5MywtNC4zNjgxOCAwLjE4MDY5LC01LjU0NjAzYzEuNTU4MDUsLTMuMDY1OCA1LjE3NTMyLC00LjE3NjM1IDUuNTg0NDMsLTQuMjk0MTRjMC4xODc1MSwtMC4wNTcyMSAwLjM4NTI1LC0wLjA5MDg2IDAuNTc5NTgsLTAuMTA3NjljMC4zOTg4OSwtMC4wNjA1OCAxLjEwMTIsLTAuMTU0OCAyLjA1MjQsLTAuMTE3NzljMi4xNzg1NCwwLjAyNjkyIDQuNjYwNTEsMS4xNjQ0IDYuNTYyOSwzLjA0NTYxYzIuMjQ2NzMsMi4xMjAxNSA0LjAwNTkzLDYuMzgwNjMgMi43NTgxMiwxMS4wMTEzYy0xLjIxNzEyLDQuOTU3MSAtNS44OTQ2OCw5LjA1NjA2IC0xMS4zNTI5Nyw5LjkxNDIxYy01Ljg3MDgyLDEuMDQ2NjEgLTEyLjQ4MTQ1LC0xLjg0NzU2IC0xNS45NzI1NywtNy4wOTQwOGMtMy4zNjQ5OCwtNC43MjgyNiAtNC4wMDkzNCwtMTEuNjQ3MzUgLTEuNTQ3ODIsLTE3LjEzNjE3YzIuNzAwMTcsLTYuMzIwMDYgNy44NTg0NCwtOS4xODA1NyA5LjM3MjE3LC05LjkwNzQ4YzcuMjc4ODYsLTMuNjM0NTQgMTUuMDU4ODgsLTEuMjM1MDcgMTUuMzg2MTcsLTEuMTM0MTFjMi4wOTMzMSwwLjQ5NDcgNy45MTI5OSwyLjQ0MzIyIDEyLjQzNzEzLDguNjI1MjljMy40Nzc0OSw0LjY1MDg2IDYuMjk2OTgsMTMuMzM2NzMgMi43MTM4LDIyLjQyOTgxYy0zLjI3MjkzLDguOTYxODMgLTEyLjU5MDU1LDE1Ljc2OTg1IC0yMi42Mzc3NiwxNi40OTMzOWMtMC43ODc1NSwwLjA3NDA0IC0xLjU4NTMyLDAuMTE0NDIgLTIuMzc5NjksMC4xMTQ0MmMtOS43NTA2LDAgLTE5LjYyNzM0LC01LjYyMDA3IC0yNC41ODEwNiwtMTQuMjQ4NzN6IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+";

  let newColorType = "";
  let overlayImageContainer = "";
  const fontMenu = [
    "Scratch",
    "Sans Serif",
    "Serif",
    "Handwriting",
    "Marker",
    "Curly",
    "Pixel"
  ];  

  class BetterInputSP {
    constructor() {
      this.activeOverlays = [];
      this.activeUI = [];
      this.askBoxPromises = [];
      this.isWaitingForInput = false;
      this.isDropdownOpen = false;
      this.userInput = " ";
      this.textBoxX = 0;
      this.textBoxY = 0;
      this.askBoxInfo = [0, 1];
      this.forceInput = "Disabled";
      this.overlayInput = null;

      this.optionList = ["Option 1", "Option 2", "Option 3"];
      this.sliderInfo = [0, 100, 50];
      this.Timeout = 0;

      this.shadowEnabled = true;
      this.isInputEnabled = "Enabled";
      this.DropdownText = "Dropdown";
      this.fontSize = "14px";
      this.textAlign = "left";
      this.fontFamily = "Sans Serif";
      this.overlayBorderRadius = [5, 4, 5];
      this.buttonJSON = {
        "Submit": {
          borderRadius: 5,
          color: "#0074D9",
          textColor: "#ffffff",
          name: "Submit",
          image: "",
          imgScale: 100,
        },
        "Cancel": {
          borderRadius: 5,
          color: "#d9534f",
          textColor: "#ffffff",
          name: "Cancel",
          image: "",
          imgScale: 100,
        },
      };

      this.questionColor = "#000000";
      this.inputColor = "#000000";
      this.textBoxColor = ["#ffffff"];
      this.inputFieldColor = ["#ffffff", "#000000"];
      this.dropdownButtonColor = ["#5f5f5f", "#ffffff"];
      this.overlayImage = [" ", " ", " "];

      this.Blur = 0;
      this.Brightness = 0;
      this.Opacity = 100;
      this.Invert = 0;
      this.Saturation = 100;
      this.Hue = 0;
      this.Sepia = 0;
      this.Contrast = 100;
      this.Scale = 100;
      this.SkewX = 0;
      this.SkewY = 0;
      this.Rotation = 90;
      this.imgScale = [100, 100, 100];
      this.shadowS = [0, 0, 5, 0.3];
    }

    getInfo() {
      return {
        id: "BetterInputSP",
        name: "Better Input",
        color1: "#9400ff",
        color2: "#7600cc",
        color3: "#8500e6",
        menuIconURI,
        blockIconURI,
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: "Text Blocks" },
          {
            opcode: "askAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: "ask [question] and wait",
            arguments: {
              question: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "What is your name?",
              },
            },
          },
          {
            opcode: "askAndWaitForInput",
            blockType: Scratch.BlockType.REPORTER,
            text: "ask [question] and wait",
            arguments: {
              question: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "What is your name?",
              },
            },
          },
          {
            opcode: "getUserInput",
            blockType: Scratch.BlockType.REPORTER,
            text: "user input",
          },
          {
            opcode: "removeAskBoxes",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove all ask boxes",
          },
          { blockType: Scratch.BlockType.LABEL, text: "Formatting" },
          {
            opcode: "setFontSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font size to [SIZE]",
            blockIconURI: formatIcon,
            arguments: {
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 14,
              },
            },
          },
          {
            opcode: "setTextAlignment",
            blockType: Scratch.BlockType.COMMAND,
            text: "set alignment to [ALIGNMENT]",
            blockIconURI: formatIcon,
            arguments: {
              ALIGNMENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "alignmentMenu",
                defaultValue: "left",
              },
            },
          },
          {
            opcode: "setFontFamily",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font to [FONT]",
            blockIconURI: formatIcon,
            arguments: {
              FONT: {
                type: Scratch.ArgumentType.STRING,
                menu: "fontMenu",
                defaultValue: "Sans Serif",
              },
            },
          },
          {
            opcode: "setInputType",
            blockType: Scratch.BlockType.COMMAND,
            text: "set Input Box to be [ACTION]",
            blockIconURI: formatIcon,
            arguments: {
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "inputActionMenu",
                defaultValue: "Text",
              },
            },
          },
          {
            opcode: "setDropdown",
            blockType: Scratch.BlockType.COMMAND,
            text: "set dropdown options to array: [DROPDOWN]",
            blockIconURI: formatIcon,
            arguments: {
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[\"Option 1\", \"Option 2\", \"Option 3\"]",
              },
            },
          },
          {
            opcode: "setSlider",
            blockType: Scratch.BlockType.COMMAND,
            text: "set slider to min: [MIN] max: [MAX] default: [DEFAULT]",
            blockIconURI: formatIcon,
            arguments: {
              MIN: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              MAX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              DEFAULT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          "---",
          {
            opcode: "setButton",
            blockType: Scratch.BlockType.COMMAND,
            text: "[BUTTON] button named [NAME]",
            blockIconURI: formatIcon,
            arguments: {
              BUTTON: {
                type: Scratch.ArgumentType.STRING,
                menu: "buttonType",
                defaultValue: "add",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Submit",
              },
            },
          },
          {
            opcode: "deleteAllButtons",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove all buttons",
            blockIconURI: formatIcon
          },
          {
            opcode: "setButtonText",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [BUTTON_MENU] button name to [TEXT]",
            blockIconURI: formatIcon,
            arguments: {
              BUTTON_MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "buttonMenu",
                defaultValue: "Dropdown",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my dropdown",
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Positioning" },
          {
            opcode: "setPrePosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "preset textbox position to x: [X] y: [Y]",
            blockIconURI: formatIcon,
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "setPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set textbox position to x: [X] y: [Y]",
            blockIconURI: formatIcon,
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "changePosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "change textbox position by x: [X] y: [Y]",
            blockIconURI: formatIcon,
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "getXpos",
            blockType: Scratch.BlockType.REPORTER,
            blockIconURI: formatIcon,
            text: "x position",
          },
          {
            opcode: "getYpos",
            blockType: Scratch.BlockType.REPORTER,
            blockIconURI: formatIcon,
            text: "y position",
          },
          {
            opcode: "setDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: "set direction to [ROTATE]",
            blockIconURI: formatIcon,
            arguments: {
              ROTATE: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 90,
              },
            },
          },
          {
            opcode: "changeDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: "change direction by [ROTATE]",
            blockIconURI: formatIcon,
            arguments: {
              ROTATE: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 15,
              },
            },
          },
          {
            opcode: "reportDirection",
            blockType: Scratch.BlockType.REPORTER,
            text: "direction",
            blockIconURI: formatIcon,
          },
          { blockType: Scratch.BlockType.LABEL, text: "Visual Settings" },
          {
            opcode: "setColorSettings",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [COLOR_TYPE] color to [COLOR]",
            blockIconURI: colorIcon,
            arguments: {
              COLOR_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "colorSettingsMenu",
                defaultValue: "Textbox",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#000000",
              },
            },
          },
          {
            opcode: "setGradient",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [COLOR_TYPE] color to gradient with colors [COLOR1] and [COLOR2] with direction [DIR]",
            blockIconURI: colorIcon,
            arguments: {
              COLOR_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "elementMenu",
                defaultValue: "Textbox",
              },
              COLOR1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff",
              },
              COLOR2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ff0000",
              },
              DIR: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 90,
              },
            },
          },
          {
            opcode: "setCircleGradient",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [COLOR_TYPE] color to radial gradient with colors [COLOR1] and [COLOR2] with position x [X] y [Y]",
            blockIconURI: colorIcon,
            arguments: {
              COLOR_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "elementMenu",
                defaultValue: "Textbox",
              },
              COLOR1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff",
              },
              COLOR2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ff0000",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          "---",
          {
            opcode: "enableShadow",
            blockType: Scratch.BlockType.COMMAND,
            text: "set box shadow to be [ACTION]",
            blockIconURI: colorIcon,
            arguments: {
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "buttonActionMenu",
                defaultValue: "Enabled",
              },
            },
          },
          {
            opcode: "setShadow",
            blockType: Scratch.BlockType.COMMAND,
            text: "set box shadow [SHADOW] to [AMT]",
            blockIconURI: colorIcon,
            arguments: {
              SHADOW: {
                type: Scratch.ArgumentType.STRING,
                menu: "shadowStuff",
                defaultValue: "Size",
              },
              AMT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },
          "---",
          {
            opcode: "setBorderRadius",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ELEMENT] border radius to [VALUE]",
            blockIconURI: colorIcon,
            arguments: {
              ELEMENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "elementMenu",
                defaultValue: "Textbox",
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },
          "---",
          {
            opcode: "setImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ELEMENT] image to [IMAGE]",
            blockIconURI: colorIcon,
            arguments: {
              ELEMENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "elementMenu",
                defaultValue: "Textbox",
              },
              IMAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "input-url-or-uri-here",
              },
            },
          },
          {
            opcode: "scaleImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "scale [ELEMENT] image to [SCALE]%",
            blockIconURI: colorIcon,
            arguments: {
              ELEMENT: {
                type: Scratch.ArgumentType.STRING,
                menu: "elementMenu",
                defaultValue: "Textbox",
              },
              SCALE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Effects" },
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset effects",
            blockIconURI: effectIcon,
          },
          {
            opcode: "setEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set effect [EFFECT] to [AMT]",
            blockIconURI: effectIcon,
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "effectMenu",
                defaultValue: "Blur",
              },
              AMT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },
          {
            opcode: "changeEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "change effect [EFFECT] by [AMT]",
            blockIconURI: effectIcon,
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "effectMenu",
                defaultValue: "Blur",
              },
              AMT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },
          {
            opcode: "showEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "effect [EFFECT]",
            blockIconURI: effectIcon,
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "effectMenu",
                defaultValue: "Blur",
              },
            },
          },
          "---",
          {
            opcode: "setTimeout",
            blockType: Scratch.BlockType.COMMAND,
            text: "when submitted delete textbox after [TIME] secs",
            blockIconURI: effectIcon,
            arguments: {
              TIME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },
          {
            opcode: "reportTimeout",
            blockType: Scratch.BlockType.REPORTER,
            text: "current textbox timeout",
            blockIconURI: effectIcon,
          },
          { blockType: Scratch.BlockType.LABEL, text: "Operations" },
          {
            opcode: "isWaitingInput",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is waiting?",
          },
          {
            opcode: "isDropdown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is dropdown open?",
          },
          {
            opcode: "setSubmitEvent",
            blockType: Scratch.BlockType.COMMAND,
            text: "set force input to [ENTER]",
            arguments: {
              ENTER: {
                type: Scratch.ArgumentType.STRING,
                menu: "enterMenu",
                defaultValue: "Disabled",
              },
            },
          },
          {
            opcode: "setMaxBoxCount",
            blockType: Scratch.BlockType.COMMAND,
            text: "set max box count to: [MAX]",
            arguments: {
              MAX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "getBoxInfo",
            blockType: Scratch.BlockType.REPORTER,
            text: "textbox [INFO]",
            arguments: {
              INFO: {
                type: Scratch.ArgumentType.STRING,
                menu: "boxInfo",
                defaultValue: "count",
              },
            },
          },
        ],
        menus: {
          alignmentMenu: {
            acceptReporters: true,
            items: ["left", "right", "center"],
          },
          boxInfo: {
            acceptReporters: true,
            items: ["count", "limit", "button count", "button names"],
          },
          buttonType: {
            acceptReporters: true,
            items: ["add", "remove"],
          },
          fontMenu: {
            acceptReporters: true,
            items: "allFonts",
          },
          buttonActionMenu: {
            acceptReporters: true,
            items: ["Enabled", "Disabled"],
          },
          inputActionMenu: {
            acceptReporters: true,
            items: [
              "Text",
              "None",
              "Dropdown",
              "Multi-Select Dropdown",
              "Horizontal Slider",
              "Vertical Slider"
            ],
          },
          effectMenu: {
            acceptReporters: true,
            items: [
              "Blur",
              "Brightness",
              "Opacity",
              "Invert",
              "Saturation",
              "Hue",
              "Sepia",
              "Contrast",
              "Scale",
              "SkewX",
              "SkewY",
            ],
          },
          shadowStuff: {
            acceptReporters: true,
            items: ["Size", "X", "Y", "Opacity"],
          },
          buttonMenu: {
            acceptReporters: true,
            items: this.allButtons([
              "Dropdown"
            ], false),
          },
          elementMenu: {
            acceptReporters: true,
            items: this.allButtons([
              "Textbox",
              "Input Box",
              "Dropdown Button",
            ], false),
          },
          colorSettingsMenu: {
            acceptReporters: true,
            items: this.allButtons([
              "Textbox",
              "Question Text",
              "Input Text",
              "Input Box",
              "Input Outline",
              "Dropdown Button",
              "Dropdown Text",
            ], true),
          },
          enterMenu: {
            acceptReporters: true,
            items: ["Disabled", "Enter Key", "Shift + Enter Key"],
          },
        },
      };
    }

    allFonts() {
      const customFonts = Scratch.vm.runtime.fontManager
        ? Scratch.vm.runtime.fontManager.getFonts().map((i) => ({
            text: i.name,
            value: i.family,
          }))
        : [];
      return [ ...fontMenu, ...customFonts ];
    }

    allButtons(array, enableText) {
      const customButtons = Object.keys(this.buttonJSON);
      if (enableText) {
        customButtons.forEach((button) => { customButtons.push(button + " Text") });
      }
      return [ ...array, ...customButtons ];
    }

    updateOverlayPos(overlay) {
      if (this.Rotation > 359) {
        this.Rotation = 0;
      } else if (this.Rotation < 1) {
        this.Rotation = 360;
      }

      if (this.textBoxX !== null && this.textBoxY !== null) {
        overlay.style.left = `${50 + this.textBoxX}%`;
        overlay.style.top = `${50 + this.textBoxY}%`;
        overlay.style.transform = `
          translate(-50%, -50%)
          SkewX(${this.SkewX}deg)
          SkewY(${this.SkewY}deg)
          rotate(${this.Rotation - 90}deg)
          scale(${this.Scale / 100})
        `;
      } else {
        overlay.style.left = "50%";
        overlay.style.top = "50%";
      }
    }

    updateOverlay(overlay) {
      const newOpacity =  this.Opacity / 100;
      const newBrightness = this.Brightness + 100;
      overlay.style.backgroundImage = "";
      overlay.style[this.textBoxColor[0].includes("gradient") ? "backgroundImage" : "backgroundColor"] = this.textBoxColor[0];
      overlay.style.boxShadow = this.shadowEnabled ? `${this.shadowS[0]}px ${this.shadowS[1]}px ${this.shadowS[2]}px rgba(0, 0, 0, ${this.shadowS[3]})` : "none";

      overlay.style.transform = `
        translate(-50%, -50%)
        SkewX(${this.SkewX}deg)
        SkewY(${this.SkewY}deg)
        rotate(${this.Rotation - 90}deg)
        scale(${this.Scale / 100})
      `;
      overlay.style.filter = `
        blur(${this.Blur}px)
        brightness(${newBrightness}%)
        invert(${this.Invert}%)
        saturate(${this.Saturation}%)
        hue-rotate(${this.Hue}deg)
        sepia(${this.Sepia}%)
        contrast(${this.Contrast}%)
      `;
      overlay.style.opacity = newOpacity;
      overlay.style.fontFamily = this.fontFamily;
      overlay.style.textAlign = this.textAlign;
      overlay.style.borderRadius = this.overlayBorderRadius[0] + "px";
      overlayImageContainer.style.borderRadius = this.overlayBorderRadius[0] + "px";
      overlayImageContainer.style.background = "";
      this.setImageStyles(overlayImageContainer, this.overlayImage[0], this.imgScale[0]);
      this.updateButtonImages(overlay);
    }

    updateButtonImages(overlay) {
      let text = overlay.querySelector(".question");
      if (text) text.style.color = this.questionColor;

      const inputField = overlay.querySelector("input");
      if (inputField) {
        inputField.style.background = "";
        inputField.style[this.inputFieldColor[0].includes("gradient") ? "backgroundImage" : "backgroundColor"] = this.inputFieldColor[0];
        inputField.style.color = this.inputColor;
        inputField.style.border = `1px solid ${this.inputFieldColor[1]}`;
        inputField.style.borderRadius = this.overlayBorderRadius[1] + "px";
        this.setImageStyles(inputField, this.overlayImage[1], this.imgScale[1]);
      }

      const dropdownButton = overlay.querySelector("button.dropbtn");
      if (dropdownButton) {
        dropdownButton.style.backgroundImage = "";
        dropdownButton.style.color = this.dropdownButtonColor[1];
        dropdownButton.style.borderRadius = this.overlayBorderRadius[2] + "px";
        dropdownButton.style[this.dropdownButtonColor[0].includes("gradient") ? "backgroundImage" : "backgroundColor"] = this.dropdownButtonColor[0];
        this.setImageStyles(dropdownButton, this.overlayImage[2], this.imgScale[2]);
      }

      const buttonContainer = overlay.querySelector(".button-container");
      if (buttonContainer) {
        const buttons = buttonContainer.querySelectorAll("button");
        buttons.forEach((button, index) => {
          const buttonName = Object.keys(this.buttonJSON)[index];
          const buttonInfo = this.buttonJSON[buttonName];
          if (buttonInfo) {
            button.style.color = buttonInfo.textColor;
            button.style.borderRadius = buttonInfo.borderRadius + "px";
            button.style.background = "";
            button.style[buttonInfo.color.includes("gradient") ? "backgroundImage" : "background"] = buttonInfo.color;
            this.setImageStyles(button, buttonInfo.image, buttonInfo.imgScale);
          }
        });
      }
    }

    setImageStyles(element, url, scale) {
      if (Scratch.Cast.toString(url).length > 5) {
        Scratch.canFetch(encodeURI(url)).then((canFetch) => {
          if (canFetch) {
            element.style.background = `url(${encodeURI(url)})`;
            element.style.backgroundSize = scale + "%";
          } else {
            console.log("Cannot fetch content from the URL");
          }
        });
      }
    }

    showEffect(args) { return this[args.EFFECT] }

    setEffect(args) {
      this[args.EFFECT] = args.AMT;
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    changeEffect(args) {
      const effect = args.EFFECT;
      this[effect] = this[effect] + args.AMT;
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    resetEffect() {
      this.Blur = 0;
      this.Brightness = 0;
      this.Opacity = 100;
      this.Invert = 0;
      this.Saturation = 100;
      this.Hue = 0;
      this.Sepia = 0;
      this.Contrast = 100;
      this.Scale = 100;
      this.SkewX = 0;
      this.SkewY = 0;
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    setColorSettings(args) {
      const colorType = args.COLOR_TYPE;
      const colorValue = args.COLOR;
      switch (colorType) {
        case "Question Text":
          this.questionColor = colorValue;
          break;
        case "Input Text":
          this.inputColor = colorValue;
          break;
        case "Textbox":
          this.textBoxColor[0] = colorValue;
          this.overlayImage[0] = " ";
          break;
        case "Input Box":
          this.inputFieldColor[0] = colorValue;
          this.overlayImage[1] = " ";
          break;
        case "Input Outline":
          this.inputFieldColor[1] = colorValue;
          break;
        case "Dropdown Button":
          this.dropdownButtonColor[0] = colorValue;
          this.overlayImage[2] = " ";
          break;
        case "Dropdown Text":
          this.dropdownButtonColor[1] = colorValue;
          break;
        default:
          if (this.buttonJSON[colorType] || this.buttonJSON[colorType.replace(" Text", "")]) {
            let buttonInfo;
            if (colorType.includes(" Text")) {
              buttonInfo = this.buttonJSON[colorType.replace(" Text", "")];
              buttonInfo.textColor = colorValue;
            } else {
              buttonInfo = this.buttonJSON[colorType];
              buttonInfo.color = colorValue;
              buttonInfo.image = " ";
            }
          }
          break;
      }
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    findGradientType(menu) {
      const colorType = menu;
      switch (colorType) {
        case "Textbox":
          newColorType = "textBoxColor";
          this.overlayImage[0] = " ";
          return newColorType;
        case "Input Box":
          newColorType = "inputFieldColor";
          this.overlayImage[1] = " ";
          return newColorType;
        case "Dropdown Button":
          newColorType = "dropdownButtonColor";
          this.overlayImage[2] = " ";
          return newColorType;
        default:
          if (this.buttonJSON[colorType]) {
            newColorType = ["button", colorType];
          }
          return newColorType;
      }
    }

    setGradient(args) {
      const newColorType = this.findGradientType(args.COLOR_TYPE);
      const gradientColor = `linear-gradient(${args.DIR - 90}deg, ${args.COLOR2}, ${args.COLOR1})`;
      if (newColorType[0] !== "button") {
        this[newColorType][0] = gradientColor;
      } else {
        const buttonInfo = this.buttonJSON[newColorType[1]];
        buttonInfo.color = gradientColor;
      }
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    setCircleGradient(args) {
      const newColorType = this.findGradientType(args.COLOR_TYPE);
      const newPos = [args.X + 50, args.Y + 50];
      const gradientColor = `radial-gradient(circle at ${newPos[0]}% ${newPos[1]}%, ${args.COLOR2}, ${args.COLOR1})`;
      if (newColorType[0] !== "button") {
        this[newColorType][0] = gradientColor;
      } else {
        const buttonInfo = this.buttonJSON[newColorType[1]];
        buttonInfo.color = gradientColor;
      }
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    setBorderRadius(args) {
      const element = args.ELEMENT;
      let value = args.VALUE;
      if (value < 0)  value = 0;
      switch (element) {
        case "Textbox":
          this.overlayBorderRadius[0] = value;
          break;
        case "Input Box":
          this.overlayBorderRadius[1] = value;
          break;
        case "Dropdown Button":
          this.overlayBorderRadius[2] = value;
          break;
        default:
          if (this.buttonJSON[element]) {
            const buttonInfo = this.buttonJSON[element];
            buttonInfo.borderRadius = value;
          }
          break;
      }
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    setShadow(args) {
      const shadow = args.SHADOW;
      switch (shadow) {
        case "Size":
          this.shadowS[2] = args.AMT;
          break;
        case "X":
          this.shadowS[0] = args.AMT;
          break;
        case "Y":
          this.shadowS[1] = args.AMT;
          break;
        case "Opacity":
          this.shadowS[3] = args.AMT / 100;
          break;
      }
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    setImage(args) {
      if (args.ELEMENT === "Textbox") {
        this.overlayImage[0] = args.IMAGE;
      } else if (args.ELEMENT === "Input Box") {
        this.overlayImage[1] = args.IMAGE;
      } else if (args.ELEMENT === "Dropdown Button") {
        this.overlayImage[2] = args.IMAGE;
      } else if (this.buttonJSON[args.ELEMENT]) {
        const buttonInfo = this.buttonJSON[args.ELEMENT];
        buttonInfo.image = args.IMAGE;
      }
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    scaleImage(args) {
      if (args.ELEMENT === "Textbox") {
        this.imgScale[0] = args.SCALE;
      } else if (args.ELEMENT === "Input Box") {
        this.imgScale[1] = args.SCALE;
      } else if (args.ELEMENT === "Dropdown Button") {
        this.imgScale[2] = args.SCALE;
      } else if (this.buttonJSON[args.ELEMENT]) {
        const buttonInfo = this.buttonJSON[args.ELEMENT];
        buttonInfo.imgScale = args.SCALE;
      }
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    setDirection(args) {
      const ROTATE = args.ROTATE;
      this.Rotation = Scratch.Cast.toNumber(ROTATE);
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    changeDirection(args) {
      const ROTATE = args.ROTATE;
      this.Rotation = this.Rotation + Scratch.Cast.toNumber(ROTATE);
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    reportDirection() { return this.Rotation }

    setPrePosition(args) {
      this.textBoxX = Scratch.Cast.toNumber(args.X) / (screen.width / 400);
      this.textBoxY = Scratch.Cast.toNumber(args.Y) / (screen.height / -300);
    }

    setPosition(args) {
      this.textBoxX = Scratch.Cast.toNumber(args.X) / (screen.width / 400);
      this.textBoxY = Scratch.Cast.toNumber(args.Y) / (screen.height / -300);
      this.activeOverlays.forEach((overlay) => { this.updateOverlayPos(overlay) });
    }

    changePosition(args) {
      this.textBoxX = this.textBoxX + Scratch.Cast.toNumber(args.X) / (screen.width / 400);
      this.textBoxY = this.textBoxY + Scratch.Cast.toNumber(args.Y) / (screen.height / -300);
      this.activeOverlays.forEach((overlay) => { this.updateOverlayPos(overlay) });
    }

    getXpos() { return this.textBoxX * (screen.width / 400) }

    getYpos() { return this.textBoxY * (screen.height / -300) }

    setFontSize(args) { this.fontSize = args.SIZE + "px" }

    setTextAlignment(args) {
      this.textAlign = args.ALIGNMENT;
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    setFontFamily(args) {
      this.fontFamily = args.FONT;
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    setSlider(args) { this.sliderInfo = [args.MIN, args.MAX, args.DEFAULT] }

    setInputType(args) {
      if (args.ACTION === "Text" || args.ACTION ===  "None") {
        this.isInputEnabled = args.ACTION === "Text" ? "Enabled" : "Disabled";
      } else {
        this.isInputEnabled = args.ACTION;
      }
    }

    enableShadow(args) { this.shadowEnabled = args.ACTION === "Enabled" }

    setButtonText(args) {
      const buttonMenu = args.BUTTON_MENU;
      const text = args.TEXT;
      if (buttonMenu === "Dropdown") {
        this.DropdownText = text;
      } else if (this.buttonJSON[buttonMenu]) {
        const buttonInfo = this.buttonJSON[buttonMenu];
        buttonInfo.name = text;
        Scratch.vm.extensionManager.refreshBlocks();
      }
    }

    setDropdown(args) {
      try {
        this.optionList = JSON.parse(args.DROPDOWN);
      } catch (error) {
        this.optionList = ["Undefined Array Error"];
      }
    }

    removeAskBoxes() {
      const overlaysToRemove = [];
      this.activeOverlays.forEach((overlay) => {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
          overlaysToRemove.push(overlay);
        }
        if (this.askBoxPromises) {
          const index = this.activeOverlays.indexOf(overlay);
          if (index !== -1) this.askBoxPromises[index].resolve("removed");
        }
      });
      this.askBoxPromises = [];
      this.activeOverlays = this.activeOverlays.filter(
        (overlay) => !overlaysToRemove.includes(overlay)
      );
      this.activeUI = [];
      this.askBoxInfo[0] = 0;
      this.userInput = "";
    }

    askAndWaitForInput(args) {
      if (this.askBoxInfo[0] < this.askBoxInfo[1] ) {
        return this.askAndWait(args).then(() => { return this.getUserInput() });
      }
    }

    askAndWait(args) {
      if (this.askBoxInfo[0] < this.askBoxInfo[1]) {
        const question = args.question;
        this.isWaitingForInput = true;
        this.userInput = null;
        this.askBoxInfo[0]++;
        let selectedOptions = [];

        return new Promise((resolve) => {
          const askBoxPromise = { resolve };
          this.askBoxPromises.push(askBoxPromise);
          const overlay = document.createElement("div");
          overlay.classList.add("ask-box");
          overlay.style.position = "fixed";
          overlay.style.zIndex = "9999";
          overlay.style.padding = "15px";
          overlay.style.fontSize = this.fontSize;
          overlay.style.left = `${50 + this.textBoxX}%`;
          overlay.style.top = `${50 + this.textBoxY}%`;

          overlayImageContainer = document.createElement("div");
          overlayImageContainer.style.width = '100%';
          overlayImageContainer.style.height = '100%';
          overlayImageContainer.style.position = "absolute";
          overlayImageContainer.style.top = 0;
          overlayImageContainer.style.left = 0;
          overlayImageContainer.style.zIndex = "-1";

          if (this.forceInput !== "Disabled") {
            let overlayInput;
            if (this.forceInput === "Enter Key") {
              overlayInput = "Enter";
            } else if (this.forceInput === "Shift + Enter Key") {
              overlayInput = "ShiftEnter";
            } else {
              overlayInput = this.forceInput;
            }
            const handleKeydown = (event) => {
              if (
                (overlayInput === "ShiftEnter" &&
                  event.shiftKey &&
                  event.key === "Enter") ||
                event.key === overlayInput
              ) {
                this.userInput = inputField.value;
                this.closeOverlay(overlay);
                resolve();
              }
            };
            const observer = new MutationObserver((mutationsList) => {
              for (const mutation of mutationsList) {
                if (
                  mutation.type === "childList" &&
                  !document.contains(overlay)
                ) {
                  document.removeEventListener("keydown", handleKeydown);
                  observer.disconnect();
                }
              }
            });
            observer.observe(document.body, { childList: true });
            document.addEventListener("keydown", handleKeydown);
          }

          const questionText = document.createElement("div");
          questionText.classList.add("question");
          questionText.style.fontSize = this.fontSize;
          questionText.style.marginBottom = "10px";
          questionText.textContent = question;

          const inputField = document.createElement("input");
          inputField.style.display = this.isInputEnabled ? "block" : "none";
          inputField.style.width = "94%";
          inputField.style.padding = "5px";
          inputField.style.fontSize = this.fontSize;
          inputField.style.margin = "0 auto";

          const buttonContainer = document.createElement("div");
          buttonContainer.classList.add("button-container");
          for (const buttonName in this.buttonJSON) {
            const buttonInfo = this.buttonJSON[buttonName];
            if (buttonInfo.name.includes("<newline>")) {
              const lineBreak = document.createElement("br");
              buttonContainer.appendChild(lineBreak);
            } else {
              const button = document.createElement("button");
              button.style.marginTop = "10px";
              button.style.marginRight = "5px";
              button.style.padding = "5px 10px";
              button.style.border = "none";
              button.style.cursor = "pointer";
              button.textContent = buttonInfo.name;
              button.style.display = "inline-block";
              button.addEventListener("click", () => {
                if (this.isInputEnabled === "Disabled") {
                  this.userInput = buttonInfo.name;
                } else {
                  this.userInput = inputField.value;
                }
                this.closeOverlay(overlay);
                resolve();
              });
              buttonContainer.appendChild(button);
            }
          }

          const dropdown = document.createElement("div");
          dropdown.className = "dropdown";

          const dropdownButton = document.createElement("button");
          dropdownButton.className = "dropbtn";
          dropdownButton.textContent = this.DropdownText;
          dropdownButton.style.padding = "5px 10px";
          dropdownButton.style.border = "none";
          const dropdownContent = document.createElement("div");
          dropdownContent.id = "myDropdown";
          dropdownContent.className = "dropdown-content";
          dropdownContent.style.display = "none";

          const optionLabels = this.optionList;
          optionLabels.forEach((label, index) => {
            const optionLabel = document.createElement("label");
            optionLabel.style.color = this.questionColor;
            optionLabel.textContent = "";
            const optionRadio = document.createElement("input");
            optionRadio.type = this.isInputEnabled === "Dropdown" ? "radio" : "checkbox";
            optionRadio.name = "dropdownOptions";
            optionRadio.value = index;
            optionRadio.classList.add("dropdown-radio");
            optionRadio.addEventListener("click", () => {
              if (this.isInputEnabled === "Multi-Select Dropdown") {
                if (selectedOptions.includes(label)) {
                  selectedOptions = selectedOptions.filter(item => item !== label);
                } else {
                  selectedOptions.push(label);
                }
                inputField.value = selectedOptions.length > 0 ? JSON.stringify(selectedOptions) : "";
              } else {
                inputField.value = label;
              }
            });
            optionLabel.appendChild(optionRadio);
            optionLabel.appendChild(document.createTextNode(" " + label));
            optionLabel.appendChild(document.createElement("br"));
            dropdownContent.appendChild(optionLabel);
          });
          document.body.appendChild(dropdown);
          dropdownButton.addEventListener("click", () => {
            dropdownContent.style.display = this.isDropdownOpen ? "none" : "block";
            this.isDropdownOpen = !this.isDropdownOpen;
          });

          const sliderContainer = document.createElement("div");
          sliderContainer.classList.add("slider-container");
          const slider = document.createElement("input");
          if (this.isInputEnabled.includes("Vertical")) slider.style.transform = "rotate(270deg)";
          slider.type = "range";
          slider.min = this.sliderInfo[0];
          slider.max = this.sliderInfo[1];
          slider.value = this.sliderInfo[2];
          if (this.isInputEnabled.includes("Vertical")) {
            for (let i = 0; i < 3; i++) {
              sliderContainer.appendChild(document.createElement("br"));
            }
            sliderContainer.appendChild(slider);
            for (let i = 0; i < 4; i++) {
              sliderContainer.appendChild(document.createElement("br"));
            }
          } else {
            sliderContainer.appendChild(slider);
          }
          const valueDisplay = document.createElement("span");
          valueDisplay.classList.add("slider-value");
          sliderContainer.appendChild(valueDisplay);
          valueDisplay.style.color = this.questionColor;
          valueDisplay.textContent = slider.value;
          slider.addEventListener("input", () => {
            valueDisplay.textContent = slider.value;
            this.userInput = valueDisplay.textContent;
          });

          overlay.appendChild(questionText);
          if (this.isInputEnabled !== "Disabled") {
            if (this.isInputEnabled === "Enabled") {
              overlay.appendChild(inputField);
            } else if (this.isInputEnabled.includes("Dropdown")) {
              overlay.appendChild(dropdownButton);
              overlay.appendChild(dropdownContent);
              overlay.appendChild(document.createElement("br"));
            } else {
              overlay.appendChild(sliderContainer);
              overlay.appendChild(valueDisplay);
              overlay.appendChild(document.createElement("br"));
            }
          }
          overlay.appendChild(buttonContainer);
          overlay.appendChild(overlayImageContainer);
          document.body.appendChild(overlay);
          inputField.focus();

          const resizeHandler = () => {
            if (this.textBoxX !== null && this.textBoxY !== null) {
              overlay.style.left = `${50 + this.textBoxX}%`;
              overlay.style.top = `${50 + this.textBoxY}%`;
            } else {
              overlay.style.left = "50%";
              overlay.style.top = "50%";
            }
          };

          this.activeOverlays.push(overlay);
          this.activeUI.push({
            overlay: {
              button: buttonContainer,
              dropdown: dropdownButton,
              input: inputField,
            },
          });
          document.addEventListener("fullscreenchange", resizeHandler);
          document.addEventListener("webkitfullscreenchange", resizeHandler);
          document.addEventListener("mozfullscreenchange", resizeHandler);
          document.addEventListener("MSFullscreenChange", resizeHandler);

          const overlayParent = overlay.parentNode;
          const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
              if (mutation.type === "childList" && mutation.removedNodes.contains(overlay)) {
                document.removeEventListener("fullscreenchange", resizeHandler);
                document.removeEventListener("webkitfullscreenchange", resizeHandler);
                document.removeEventListener("mozfullscreenchange", resizeHandler);
                document.removeEventListener("MSFullscreenChange", resizeHandler);
                observer.disconnect();
              }
            }
          });
          observer.observe(overlayParent, { childList: true });
          document.body.appendChild(overlay);
          inputField.focus();
          this.updateOverlay(overlay);
        });
      }
    }

    closeOverlay(overlay) {
      if (this.askBoxInfo[0] < 2) this.isWaitingForInput = false;
      this.isDropdownOpen = false;
      this.askBoxInfo[0]--;
      const index = this.activeOverlays.indexOf(overlay);
      if (index !== -1) {
        this.activeOverlays.splice(index, 1);
        this.askBoxPromises.splice(index, 1);
      }
      delete this.activeUI[overlay];
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, this.Timeout * 1000);
    }

    setButton(args) {
      if (args.BUTTON === "add") {
        this.buttonJSON[args.NAME] = {
          borderRadius: 5,
          color: "#0074D9",
          textColor: "#ffffff",
          name: args.NAME,
          image: "",
          imgScale: 100,
        };
      } else {
        delete this.buttonJSON[args.NAME];
      }
      Scratch.vm.extensionManager.refreshBlocks()
    }

    deleteAllButtons() {
      this.buttonJSON = {};
      Scratch.vm.extensionManager.refreshBlocks()
    }

    isWaitingInput() { return this.isWaitingForInput }

    isDropdown() { return this.isDropdownOpen }

    setMaxBoxCount(args) { this.askBoxInfo[1] = args.MAX }

    setTimeout(args) {
      this.Timeout = args.TIME;
      this.Condition = args.CONDITION;
    }

    reportTimeout() { return this.Timeout }

    getUserInput() { return this.userInput === null ? "" : this.userInput }

    getBoxInfo(args) {
      if (args.INFO.includes("button")) {
        const buttons = Object.keys(this.buttonJSON);
        return args.INFO.includes("names") ? JSON.stringify(buttons) : buttons.length;
      } else {
        return this.askBoxInfo[args.INFO === "count" ? 0 : 1]
      }
    }

    setSubmitEvent(args) { this.forceInput = args.ENTER }
  }

  Scratch.extensions.register(new BetterInputSP());
})(Scratch);
