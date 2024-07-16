// Name: Wheel Scroll
// ID: Den4ik12WheelScroll
// Description: Blocks for detecting mouse wheel scrolling.
// By: Den4ik-12 <https://scratch.mit.edu/users/Den4ik-12/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      'Wheel Scroll:\nExtension "Wheel Scroll" must run unsandboxed!\nPlease enable the unsandboxed mode when loading the extension.'
    );
  }

  const extIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMDUiIGhlaWdodD0iMjA1IiB2aWV3Qm94PSIwLDAsMjA1LDIwNSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzNy41LC03Ny41KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTQwLDE4MGMwLC01NS4yMjg0NyA0NC43NzE1MywtMTAwIDEwMCwtMTAwYzU1LjIyODQ3LDAgMTAwLDQ0Ljc3MTUzIDEwMCwxMDBjMCw1NS4yMjg0NyAtNDQuNzcxNTMsMTAwIC0xMDAsMTAwYy01NS4yMjg0NywwIC0xMDAsLTQ0Ljc3MTUzIC0xMDAsLTEwMHoiIGZpbGw9IiNlNzRjM2MiIHN0cm9rZT0iI2IwM2EyZSIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTI2MC4yMjIxOCwxODAuMzU5ODZ2MzAuNDYyNjNjMCwyNi40NjY3MiAtMjEuNDU3Nyw0Ny45MTk5OCAtNDcuOTIyMiw0Ny45MTk5OGMtMjYuNDY0NSwwIC00Ny45MTk5OCwtMjEuNDUzMjggLTQ3LjkxOTk4LC00Ny45MTk5OHYtMzAuNDYyNjN6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMDYuNzM5MjYsMTcwLjM0NThsLTQyLjU1ODc1LC0wLjE1OTU5bDAuMTk5NDgsLTIxLjMwNDU5YzAsLTI0LjY0MjI0IDE4LjU5NTU2LC00NC45NDIyNiA0Mi41MjMwMywtNDcuNjIzOTFjMC41NTMyNywtMC4wNjIwMSAxLjA2Njk5LDE1LjkxOTA0IDEuMDY2OTksMTUuOTE5MDRjMCwwIC0xMS4zMDgwNCwzLjc5Mjc0IC0xMS41NTUwNCwxMi4zODgyNmMtMC4yNTY4LDguOTM2NjcgLTAuMTAxNTgsMTkuNDUyMjcgLTAuMDg1NzcsMjMuNTE3NTFjMC4wMjk5Miw3LjY5Njg4IDEwLjQ0NTA1LDExLjczNjI4IDEwLjQ0NTA1LDExLjczNjI4eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjE3LjY5NTc2LDE2NC44MTg3OWMwLDAgMTAuNDE1MTMsLTQuMDM5MzkgMTAuNDQ1MDUsLTExLjczNjI4YzAuMDE1ODEsLTQuMDY1MjMgMC4xNzEwMywtMTQuNTgwODQgLTAuMDg1NzcsLTIzLjUxNzUxYy0wLjI0NywtOC41OTU1IC0xMS41NTUwNCwtMTIuMzg4MjYgLTExLjU1NTA0LC0xMi4zODgyNmMwLDAgMC41MTM3MSwtMTUuOTgxMDUgMS4wNjY5OSwtMTUuOTE5MDRjMjMuOTI3NDcsMi42ODE2NiA0Mi41MjMwMywyMi45ODE2NiA0Mi41MjMwMyw0Ny42MjM5MmwwLjE5OTQ4LDIxLjMwNDU5bC00Mi41NTg3NSwwLjE1OTU5eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIxMi4zMDA5NiwxMjYuMDU4NDJjMy4zODEzOSwwIDYuMTIyMDQsMi43NDA5MiA2LjEyMjA0LDYuMTIyMzN2MTcuOTE1OThjMCwzLjM4MTExIC0yLjc0MTIyLDYuMTIxNzYgLTYuMTIyMDQsNi4xMjE3NmMtMy4zODA4MSwwIC02LjEyMTc2LC0yLjc0MDY1IC02LjEyMTc2LC02LjEyMTc2di0xNy45MTU5OGMwLC0zLjM4MTExIDIuNzQwMzUsLTYuMTIyMzMgNi4xMjE3NiwtNi4xMjIzM3oiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTI5Ny40MzIzOSwxMjIuODY1NTdjMCwwIC0yLjcyOTUyLC0yLjQwOTQxIC01LjAzNjE1LC0yLjQwMzE1Yy0yLjMwNjYyLDAuMDA2MjYgLTUuMjk0MDcsMi40MzExOCAtNS4yOTQwNywyLjQzMTE4YzAsMCAtMS43NDY4MywxLjcyNjExIC05LjcwOTM1LDkuNjg5MTdjLTIuMDE3MywyLjAxNzIgLTUuMjg3MjIsMi4wMTcyIC03LjMwNDAxLDBjLTIuMDE2NzgsLTIuMDE4MjQgLTIuMDE3MywtNS4yODc3NSAwLC03LjMwNDUyYzYuNDU1OTUsLTYuNDU2OSAxOC41MzA1OSwtMTguNTMwMTcgMTguNTMwNTksLTE4LjUzMDE3YzIuMDE3MywtMi4wMTY3OCA1LjI4NzY1LC0yLjAxNjc4IDcuMzA0MDEsMGMwLDAgMTAuNDE5MzMsMTAuNDE4OTEgMTguMzgyMzksMTguMzgxODdjMi4wMTgyNSwyLjAxODI0IDIuMDE4MjUsNS4yODgxNiAwLDcuMzA0NTJjLTIuMDE2ODgsMi4wMTczIC01LjI4Nzc1LDIuMDE3MyAtNy4zMDMwNiwwYy02LjQ1ODg4LC02LjQ1NzAxIC05LjU3MDM1LC05LjU2ODg4IC05LjU3MDM1LC05LjU2ODg4eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjk3LjQzMjQsMTU5LjQxMTM0YzAsMCAzLjExMTQ3LC0zLjExMTg4IDkuNTcwMzUsLTkuNTY4ODhjMi4wMTUzMiwtMi4wMTczIDUuMjg2MTgsLTIuMDE3MyA3LjMwMzA2LDBjMi4wMTgyNSwyLjAxNjM2IDIuMDE4MjUsNS4yODYyOSAwLDcuMzA0NTJjLTcuOTYzMDUsNy45NjI5NSAtMTguMzgyMzksMTguMzgxODcgLTE4LjM4MjM5LDE4LjM4MTg3Yy0yLjAxNjM2LDIuMDE2NzggLTUuMjg2NywyLjAxNjc4IC03LjMwNDAxLDBjMCwwIC0xMi4wNzQ2NCwtMTIuMDczMjggLTE4LjUzMDU5LC0xOC41MzAxN2MtMi4wMTczLC0yLjAxNjc4IC0yLjAxNjc4LC01LjI4NjI5IDAsLTcuMzA0NTJjMi4wMTY3OCwtMi4wMTcyIDUuMjg2NywtMi4wMTcyIDcuMzA0MDEsMGM3Ljk2MjU0LDcuOTYzMDUgOS43MDkzNSw5LjY4OTE3IDkuNzA5MzUsOS42ODkxN2MwLDAgMi45ODc0NCwyLjQyNDkyIDUuMjk0MDcsMi40MzExOGMyLjMwNjYyLDAuMDA2MjYgNS4wMzYxNSwtMi40MDMxNSA1LjAzNjE1LC0yLjQwMzE1eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTAyLjU6MTAyLjUtLT4=";
  const blockIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTcuMzMzMzMiIGhlaWdodD0iMTE3LjMzMzMzIiB2aWV3Qm94PSIwLDAsMTE3LjMzMzMzLDExNy4zMzMzMyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MS4zMzMzMywtMTIxLjMzMzMzKSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjUyLjI0ODg1LDE4MC4yNDE0M3YyMC40MzY5MWMwLDE3Ljc1NjExIC0xNC4zOTU2MywzMi4xNDg3OCAtMzIuMTUwMjYsMzIuMTQ4NzhjLTE3Ljc1NDYzLDAgLTMyLjE0ODc4LC0xNC4zOTI2NiAtMzIuMTQ4NzgsLTMyLjE0ODc4di0yMC40MzY5MXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE0OTAyIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMjE2LjM2Nzk5LDE3My41MjMxNWwtMjguNTUyMDEsLTAuMTA3MDhsMC4xMzM4MywtMTQuMjkyOTJjMCwtMTYuNTMyMSAxMi40NzU0OCwtMzAuMTUxMDYgMjguNTI4MDQsLTMxLjk1MDE0YzAuMzcxMTgsLTAuMDQxNjEgMC43MTU4MiwxMC42Nzk4NCAwLjcxNTgyLDEwLjY3OTg0YzAsMCAtNy41ODY0LDIuNTQ0NDkgLTcuNzUyMTEsOC4zMTExYy0wLjE3MjI5LDUuOTk1NDcgLTAuMDY4MTUsMTMuMDUwMjIgLTAuMDU3NTQsMTUuNzc3NTNjMC4wMjAwNyw1LjE2MzcyIDcuMDA3NDMsNy44NzM2OSA3LjAwNzQzLDcuODczNjl6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xNDkwMiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTIyMy43MTg1MywxNjkuODE1MTZjMCwwIDYuOTg3MzUsLTIuNzA5OTcgNy4wMDc0MywtNy44NzM2OWMwLjAxMDYxLC0yLjcyNzMgMC4xMTQ3NCwtOS43ODIwNiAtMC4wNTc1NCwtMTUuNzc3NTNjLTAuMTY1NzEsLTUuNzY2NiAtNy43NTIxMSwtOC4zMTExIC03Ljc1MjExLC04LjMxMTFjMCwwIDAuMzQ0NjMsLTEwLjcyMTQzIDAuNzE1ODIsLTEwLjY3OTg0YzE2LjA1MjU2LDEuNzk5MDggMjguNTI4MDQsMTUuNDE4MDUgMjguNTI4MDQsMzEuOTUwMTRsMC4xMzM4MywxNC4yOTI5MmwtMjguNTUyMDEsMC4xMDcwOHoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xNDkwMiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTIyMC4wOTkyNCwxNDMuODExNDNjMi4yNjg1MiwwIDQuMTA3MTgsMS44Mzg4NCA0LjEwNzE4LDQuMTA3Mzd2MTIuMDE5NTZjMCwyLjI2ODM0IC0xLjgzOTA0LDQuMTA2OTkgLTQuMTA3MTgsNC4xMDY5OWMtMi4yNjgxMywwIC00LjEwNjk5LC0xLjgzODY3IC00LjEwNjk5LC00LjEwNjk5di0xMi4wMTk1NmMwLC0yLjI2ODM0IDEuODM4NDYsLTQuMTA3MzcgNC4xMDY5OSwtNC4xMDczN3oiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE0OTAyIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMjUyLjI0ODg1LDE4MC4yNDE0M3YyMC40MzY5MWMwLDE3Ljc1NjExIC0xNC4zOTU2MywzMi4xNDg3OCAtMzIuMTUwMjYsMzIuMTQ4NzhjLTE3Ljc1NDYzLDAgLTMyLjE0ODc4LC0xNC4zOTI2NiAtMzIuMTQ4NzgsLTMyLjE0ODc4di0yMC40MzY5MXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIxNi4zNjc5OSwxNzMuNTIzMTVsLTI4LjU1MjAxLC0wLjEwNzA4bDAuMTMzODMsLTE0LjI5MjkyYzAsLTE2LjUzMjEgMTIuNDc1NDgsLTMwLjE1MTA2IDI4LjUyODA0LC0zMS45NTAxNGMwLjM3MTE4LC0wLjA0MTYxIDAuNzE1ODIsMTAuNjc5ODQgMC43MTU4MiwxMC42Nzk4NGMwLDAgLTcuNTg2NCwyLjU0NDQ5IC03Ljc1MjExLDguMzExMWMtMC4xNzIyOSw1Ljk5NTQ3IC0wLjA2ODE1LDEzLjA1MDIyIC0wLjA1NzU0LDE1Ljc3NzUzYzAuMDIwMDcsNS4xNjM3MiA3LjAwNzQzLDcuODczNjkgNy4wMDc0Myw3Ljg3MzY5eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjIzLjcxODUzLDE2OS44MTUxNmMwLDAgNi45ODczNSwtMi43MDk5NyA3LjAwNzQzLC03Ljg3MzY5YzAuMDEwNjEsLTIuNzI3MyAwLjExNDc0LC05Ljc4MjA2IC0wLjA1NzU0LC0xNS43Nzc1M2MtMC4xNjU3MSwtNS43NjY2IC03Ljc1MjExLC04LjMxMTEgLTcuNzUyMTEsLTguMzExMWMwLDAgMC4zNDQ2MywtMTAuNzIxNDMgMC43MTU4MiwtMTAuNjc5ODRjMTYuMDUyNTYsMS43OTkwOCAyOC41MjgwNCwxNS40MTgwNSAyOC41MjgwNCwzMS45NTAxNGwwLjEzMzgzLDE0LjI5MjkybC0yOC41NTIwMSwwLjEwNzA4eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIyMC4wOTkyNCwxNDMuODExNDNjMi4yNjg1MiwwIDQuMTA3MTgsMS44Mzg4NCA0LjEwNzE4LDQuMTA3Mzd2MTIuMDE5NTZjMCwyLjI2ODM0IC0xLjgzOTA0LDQuMTA2OTkgLTQuMTA3MTgsNC4xMDY5OWMtMi4yNjgxMywwIC00LjEwNjk5LC0xLjgzODY3IC00LjEwNjk5LC00LjEwNjk5di0xMi4wMTk1NmMwLC0yLjI2ODM0IDEuODM4NDYsLTQuMTA3MzcgNC4xMDY5OSwtNC4xMDczN3oiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTI4MS41NzE2NSwxMzkuMjkzMDdjMCwwIC0xLjY1MDY2LC0xLjM4OTM0IC0yLjkwNzc2LC0xLjM4NTkyYy0xLjI1NzA5LDAuMDAzNDEgLTMuMDU0NDYsMS40MDIxIC0zLjA1NDQ2LDEuNDAyMWMwLDAgLTEuMDA4MiwwLjk5NjI1IC01LjYwMzg4LDUuNTkyMjNjLTEuMTY0MzIsMS4xNjQyNSAtMy4wNTE1OCwxLjE2NDI1IC00LjIxNTU5LDBjLTEuMTY0LC0xLjE2NDg1IC0xLjE2NDMyLC0zLjA1MTg5IDAsLTQuMjE1OWMzLjcyNjEzLC0zLjcyNjY4IDEwLjY5NTE3LC0xMC42OTQ5MyAxMC42OTUxNywtMTAuNjk0OTNjMS4xNjQzMiwtMS4xNjQgMy4wNTE4NCwtMS4xNjQgNC4yMTU1OSwwYzAsMCA2LjAxMzY1LDYuMDEzNDEgMTAuNjA5NjQsMTAuNjA5MzRjMS4xNjQ4NiwxLjE2NDg1IDEuMTY0ODYsMy4wNTIxNCAwLDQuMjE1OWMtMS4xNjQwNywxLjE2NDMyIC0zLjA1MTg5LDEuMTY0MzIgLTQuMjE1MDYsMGMtMy43Mjc4MywtMy43MjY3NCAtNS41MjM2NiwtNS41MjI4MSAtNS41MjM2NiwtNS41MjI4MXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE0OTAyIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMjgxLjU3MTY2LDE2OC44MjE3N2MwLDAgMS43OTU4MywtMS43OTYwNiA1LjUyMzY2LC01LjUyMjgxYzEuMTYzMTcsLTEuMTY0MzIgMy4wNTA5OCwtMS4xNjQzMiA0LjIxNTA2LDBjMS4xNjQ4NiwxLjE2Mzc4IDEuMTY0ODYsMy4wNTEwNSAwLDQuMjE1OWMtNC41OTU5OCw0LjU5NTkzIC0xMC42MDk2NCwxMC42MDkzNCAtMTAuNjA5NjQsMTAuNjA5MzRjLTEuMTYzNzgsMS4xNjQgLTMuMDUxMjksMS4xNjQgLTQuMjE1NTksMGMwLDAgLTYuOTY5MDQsLTYuOTY4MjUgLTEwLjY5NTE3LC0xMC42OTQ5M2MtMS4xNjQzMiwtMS4xNjQgLTEuMTY0LC0zLjA1MTA1IDAsLTQuMjE1OWMxLjE2NCwtMS4xNjQyNSAzLjA1MTI5LC0xLjE2NDI1IDQuMjE1NTksMGM0LjU5NTY4LDQuNTk1OTggNS42MDM4OCw1LjU5MjIzIDUuNjAzODgsNS41OTIyM2MwLDAgMS43OTczNywxLjM5ODcgMy4wNTQ0NiwxLjQwMjFjMS4yNTcwOSwwLjAwMzQxIDIuOTA3NzYsLTEuMzg1OTIgMi45MDc3NiwtMS4zODU5MnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xNDkwMiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTI4MS41NzE2NSwxMzkuMjkzMDdjMCwwIC0xLjU3NTM4LC0xLjM5MDYyIC0yLjkwNjY4LC0xLjM4NzAxYy0xLjMzMTI5LDAuMDAzNjEgLTMuMDU1NTUsMS40MDMxOSAtMy4wNTU1NSwxLjQwMzE5YzAsMCAtMS4wMDgyLDAuOTk2MjUgLTUuNjAzODgsNS41OTIyM2MtMS4xNjQzMiwxLjE2NDI1IC0zLjA1MTU4LDEuMTY0MjUgLTQuMjE1NTksMGMtMS4xNjQsLTEuMTY0ODUgLTEuMTY0MzIsLTMuMDUxODkgMCwtNC4yMTU5YzMuNzI2MTMsLTMuNzI2NjggMTAuNjk1MTcsLTEwLjY5NDkzIDEwLjY5NTE3LC0xMC42OTQ5M2MxLjE2NDMyLC0xLjE2NCAzLjA1MTg0LC0xLjE2NCA0LjIxNTU5LDBjMCwwIDYuMDEzNjUsNi4wMTM0MSAxMC42MDk2NCwxMC42MDkzNGMxLjE2NDg2LDEuMTY0ODUgMS4xNjQ4NiwzLjA1MjE0IDAsNC4yMTU5Yy0xLjE2NDA3LDEuMTY0MzIgLTMuMDUxODksMS4xNjQzMiAtNC4yMTUwNiwwYy0zLjcyNzgzLC0zLjcyNjc0IC01LjUyMzY2LC01LjUyMjgxIC01LjUyMzY2LC01LjUyMjgxeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjgxLjU3MTY2LDE2OC44MjE3N2MwLDAgMS43OTU4MywtMS43OTYwNiA1LjUyMzY2LC01LjUyMjgxYzEuMTYzMTcsLTEuMTY0MzIgMy4wNTA5OCwtMS4xNjQzMiA0LjIxNTA2LDBjMS4xNjQ4NiwxLjE2Mzc4IDEuMTY0ODYsMy4wNTEwNSAwLDQuMjE1OWMtNC41OTU5OCw0LjU5NTkzIC0xMC42MDk2NCwxMC42MDkzNCAtMTAuNjA5NjQsMTAuNjA5MzRjLTEuMTYzNzgsMS4xNjQgLTMuMDUxMjksMS4xNjQgLTQuMjE1NTksMGMwLDAgLTYuOTY5MDQsLTYuOTY4MjUgLTEwLjY5NTE3LC0xMC42OTQ5M2MtMS4xNjQzMiwtMS4xNjQgLTEuMTY0LC0zLjA1MTA1IDAsLTQuMjE1OWMxLjE2NCwtMS4xNjQyNSAzLjA1MTI5LC0xLjE2NDI1IDQuMjE1NTksMGM0LjU5NTY4LDQuNTk1OTggNS42MDM4OCw1LjU5MjIzIDUuNjAzODgsNS41OTIyM2MwLDAgMS43MjQyNCwxLjM5OTU3IDMuMDU1NTUsMS40MDMxOWMxLjMzMTI5LDAuMDAzNjEgMi45MDY2OCwtMS4zODcwMSAyLjkwNjY4LC0xLjM4NzAxeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTE4MS4zMzMzMywyMzguNjY2Njd2LTExNy4zMzMzM2gxMTcuMzMzMzN2MTE3LjMzMzMzeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9Ik5hTiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjU4LjY2NjY2NjY2NjY2NjY2OjU4LjY2NjY2NjY2NjY2NjY2LS0+";
  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const startWhenScrollEvent = (dir, e) => {
    let threads;
    if (dir === "") {
      threads = runtime.startHats("Den4ik12WheelScroll_whenScroll");
    } else {
      threads = runtime.startHats("Den4ik12WheelScroll_whenScrollDir", {
        SCROLL_TYPE: dir,
      });
    }
    threads.forEach((thread) => {
      thread.deltaX = e.deltaX;
      thread.deltaY = e.deltaY;
      thread.deltaZ = e.deltaZ;
      switch (e.deltaMode) {
        case 0: {
          thread.deltaMode = "px";
          break;
        }
        case 1: {
          thread.deltaMode = "lines";
          break;
        }
        case 2: {
          thread.deltaMode = "pages";
          break;
        }
      }
    });
  };

  document.body.addEventListener(
    "wheel",
    (e) => {
      startWhenScrollEvent("", e);
      if (e.deltaZ != 0) startWhenScrollEvent("az", e);
      if (e.deltaY != 0) startWhenScrollEvent("ay", e);
      if (e.deltaX != 0) startWhenScrollEvent("ax", e);
      if (e.deltaZ > 0) startWhenScrollEvent("i", e);
      if (e.deltaZ < 0) startWhenScrollEvent("o", e);
      if (e.deltaY > 0) startWhenScrollEvent("d", e);
      if (e.deltaY < 0) startWhenScrollEvent("u", e);
      if (e.deltaX > 0) startWhenScrollEvent("r", e);
      if (e.deltaX < 0) startWhenScrollEvent("l", e);
    },
    { passive: true }
  );

  class WheelScroll {
    getInfo() {
      return {
        id: "Den4ik12WheelScroll",
        name: Scratch.translate("Wheel Scroll"),
        color1: "#E74C3C",
        color2: "#CB4335",
        color3: "#B03A2E",
        menuIconURI: extIcon,
        blockIconURI: blockIcon,
        blocks: [
          {
            text: Scratch.translate("Note: Most computer mouses do not"),
            blockType: Scratch.BlockType.LABEL,
          },
          {
            text: Scratch.translate("have the ability to scroll along the x"),
            blockType: Scratch.BlockType.LABEL,
          },
          {
            text: Scratch.translate("and z axes"),
            blockType: Scratch.BlockType.LABEL,
          },
          {
            opcode: "whenScrollDir",
            text: Scratch.translate("when mouse wheel scrolls [SCROLL_TYPE]"),
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
            arguments: {
              SCROLL_TYPE: {
                menu: "SCROLL_TYPE",
                defaultValue: "u",
              },
            },
          },
          {
            opcode: "whenScroll",
            text: Scratch.translate("when mouse wheel scrolls"),
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
          },
          {
            opcode: "getDelta",
            text: Scratch.translate("delta [DELTA_TYPE]"),
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            arguments: {
              DELTA_TYPE: {
                menu: "DELTA_TYPE",
                defaultValue: "y",
              },
            },
          },
        ],
        menus: {
          SCROLL_TYPE: {
            items: [
              {
                text: Scratch.translate("up"),
                value: "u",
              },
              {
                text: Scratch.translate("down"),
                value: "d",
              },
              {
                text: Scratch.translate("to the left"),
                value: "l",
              },
              {
                text: Scratch.translate("to the right"),
                value: "r",
              },
              {
                text: Scratch.translate("out"),
                value: "o",
              },
              {
                text: Scratch.translate("in"),
                value: "i",
              },
              {
                text: Scratch.translate("along the x-axis"),
                value: "ax",
              },
              {
                text: Scratch.translate("along the y-axis"),
                value: "ay",
              },
              {
                text: Scratch.translate("along the z-axis"),
                value: "az",
              },
            ],
          },
          DELTA_TYPE: {
            acceptReporters: true,
            items: [
              "x",
              "y",
              "z",
              { text: Scratch.translate("mode"), value: "mode" },
            ],
          },
        },
      };
    }
    getDelta(args, util) {
      let result;
      switch (args.DELTA_TYPE) {
        case "x": {
          result = util.thread.deltaX;
          break;
        }
        case "y": {
          result = util.thread.deltaY;
          break;
        }
        case "z": {
          result = util.thread.deltaZ;
          break;
        }
        case "mode": {
          result = util.thread.deltaMode;
          break;
        }
        default: {
          return "";
        }
      }
      return result ? result : "";
    }
  }
  Scratch.extensions.register(new WheelScroll());
})(Scratch);
