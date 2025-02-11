// Name: Mobile Keyboard
// ID: mobilekeyboard0419
// Description: Show the keyboard on mobile devices and get the users input without showing any input modal.
// License: MPL-2.0
// By: veggiecan0419

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The mobile keyboard extension must run unsandboxed");
  }

  const menuicon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3NC4yMjAyOSIgaGVpZ2h0PSI3NC4yMjAyOSIgdmlld0JveD0iMCwwLDc0LjIyMDI5LDc0LjIyMDI5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYyLjg4OTg1LC0xMTIuODg5ODUpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yNjUuMjkwODEsMTUwYzAsLTE5LjE2OTM2IDE1LjUzOTg0LC0zNC43MDkxOSAzNC43MDkxOSwtMzQuNzA5MTljMTkuMTY5MzYsMCAzNC43MDkxOSwxNS41Mzk4NCAzNC43MDkxOSwzNC43MDkxOWMwLDE5LjE2OTM2IC0xNS41Mzk4NCwzNC43MDkxOSAtMzQuNzA5MTksMzQuNzA5MTljLTE5LjE2OTM2LDAgLTM0LjcwOTE5LC0xNS41Mzk4NCAtMzQuNzA5MTksLTM0LjcwOTE5eiIgZmlsbD0iIzk5OTk5OSIgc3Ryb2tlPSIjNjY2NjY2IiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMjkzLjA5Mjc4LDE3NC4yMjU4NmMtMS4yMzkzMSwwLjIxNzgyIC0yLjQyMDU1LC0wLjYxMDI3IC0yLjYzODM2LC0xLjg0OTU4bC03LjA1NzgzLC00MC4xNTY3Yy0wLjIxNzgxLC0xLjIzOTMxIDAuNjEwMjYsLTIuNDIwNTUgMS44NDk1NywtMi42MzgzNmwyMS42NjEwNywtMy44MDcwOWMxLjIzOTMxLC0wLjIxNzgyIDIuNDIwNTUsMC42MTAyNiAyLjYzODM2LDEuODQ5NTdsNy4wNTc4Myw0MC4xNTY3YzAuMjE3ODEsMS4yMzkzMSAtMC42MTAyNywyLjQyMDU1IC0xLjg0OTU3LDIuNjM4MzZ6TTMxMS42OTQwNSwxNjIuOTQzMDhjMC4zNjQyNCwtMC4wNjQwMiAwLjYwNzYsLTAuNDExMTggMC41NDM1OSwtMC43NzU0MmwtNS4yMTkwNCwtMjkuNjk0NjRjLTAuMDY0MDEsLTAuMzY0MjQgLTAuNDExMTgsLTAuNjA3NjEgLTAuNzc1NDIsLTAuNTQzNTlsLTE4LjI3MzkyLDMuMjExNzdjLTAuMzY0MjQsMC4wNjQwMiAtMC42MDc2MSwwLjQxMTE4IC0wLjU0MzU5LDAuNzc1NDJsNS4yMTkwNSwyOS42OTQ2NGMwLjA2NDAxLDAuMzY0MjQgMC40MTExOCwwLjYwNzYxIDAuNzc1NDIsMC41NDM2ek0yOTQuMjIyMjYsMTY1LjEzMTU4Yy0wLjM1MDk4LDAuMDYxNjkgLTAuNjg1NTIsLTAuMTcyODMgLTAuNzQ3MjEsLTAuNTIzODJsLTIuMjI3NTksLTEyLjY3NDI0Yy0wLjA2MTY5LC0wLjM1MDk4IDAuMTcyODMsLTAuNjg1NTIgMC41MjM4MiwtMC43NDcyMWwxNi4zNjg4MSwtMi44NzY5NGMwLjM1MDk4LC0wLjA2MTY5IDAuNjg1NTIsMC4xNzI4MyAwLjc0NzIxLDAuNTIzODFsMi4yMjc1OSwxMi42NzQyNGMwLjA2MTY5LDAuMzUwOTggLTAuMTcyODMsMC42ODU1MiAtMC41MjM4MiwwLjc0NzIxeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNjY2NjY2IiBzdHJva2Utd2lkdGg9IjUiLz48cGF0aCBkPSJNMjkzLjA5Mjc4LDE3NC4yMjU4NmMtMS4yMzkzMSwwLjIxNzgyIC0yLjQyMDU1LC0wLjYxMDI3IC0yLjYzODM2LC0xLjg0OTU4bC03LjA1NzgzLC00MC4xNTY3Yy0wLjIxNzgxLC0xLjIzOTMxIDAuNjEwMjYsLTIuNDIwNTUgMS44NDk1NywtMi42MzgzNmwyMS42NjEwNywtMy44MDcwOWMxLjIzOTMxLC0wLjIxNzgyIDIuNDIwNTUsMC42MTAyNiAyLjYzODM2LDEuODQ5NTdsNy4wNTc4Myw0MC4xNTY3YzAuMjE3ODEsMS4yMzkzMSAtMC42MTAyNywyLjQyMDU1IC0xLjg0OTU3LDIuNjM4MzZ6TTMxMS42OTQwNSwxNjIuOTQzMDhjMC4zNjQyNCwtMC4wNjQwMiAwLjYwNzYsLTAuNDExMTggMC41NDM1OSwtMC43NzU0MmwtNS4yMTkwNCwtMjkuNjk0NjRjLTAuMDY0MDEsLTAuMzY0MjQgLTAuNDExMTgsLTAuNjA3NjEgLTAuNzc1NDIsLTAuNTQzNTlsLTE4LjI3MzkyLDMuMjExNzdjLTAuMzY0MjQsMC4wNjQwMiAtMC42MDc2MSwwLjQxMTE4IC0wLjU0MzU5LDAuNzc1NDJsNS4yMTkwNSwyOS42OTQ2NGMwLjA2NDAxLDAuMzY0MjQgMC40MTExOCwwLjYwNzYxIDAuNzc1NDIsMC41NDM2eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjkzLjA5Mjc4LDE3NC4yMjU4NmMtMS4yMzkzMSwwLjIxNzgyIC0yLjQyMDU1LC0wLjYxMDI3IC0yLjYzODM2LC0xLjg0OTU4bC03LjA1NzgzLC00MC4xNTY3Yy0wLjIxNzgxLC0xLjIzOTMxIDAuNjEwMjYsLTIuNDIwNTUgMS44NDk1NywtMi42MzgzNmwyMS42NjEwNywtMy44MDcwOWMxLjIzOTMxLC0wLjIxNzgyIDIuNDIwNTUsMC42MTAyNiAyLjYzODM2LDEuODQ5NTdsNy4wNTc4Myw0MC4xNTY3YzAuMjE3ODEsMS4yMzkzMSAtMC42MTAyNywyLjQyMDU1IC0xLjg0OTU3LDIuNjM4MzZ6TTMxMS42OTQwNSwxNjIuOTQzMDhjMC4zNjQyNCwtMC4wNjQwMiAwLjYwNzYsLTAuNDExMTggMC41NDM1OSwtMC43NzU0MmwtNS4yMTkwNCwtMjkuNjk0NjRjLTAuMDY0MDEsLTAuMzY0MjQgLTAuNDExMTgsLTAuNjA3NjEgLTAuNzc1NDIsLTAuNTQzNTlsLTE4LjI3MzkyLDMuMjExNzdjLTAuMzY0MjQsMC4wNjQwMiAtMC42MDc2MSwwLjQxMTE4IC0wLjU0MzU5LDAuNzc1NDJsNS4yMTkwNSwyOS42OTQ2NGMwLjA2NDAxLDAuMzY0MjQgMC40MTExOCwwLjYwNzYxIDAuNzc1NDIsMC41NDM2ek0yOTQuMjIyMjYsMTY1LjEzMTU4Yy0wLjM1MDk4LDAuMDYxNjkgLTAuNjg1NTIsLTAuMTcyODMgLTAuNzQ3MjEsLTAuNTIzODJsLTIuMjI3NTksLTEyLjY3NDI0Yy0wLjA2MTY5LC0wLjM1MDk4IDAuMTcyODMsLTAuNjg1NTIgMC41MjM4MiwtMC43NDcyMWwxNi4zNjg4MSwtMi44NzY5NGMwLjM1MDk4LC0wLjA2MTY5IDAuNjg1NTIsMC4xNzI4MyAwLjc0NzIxLDAuNTIzODFsMi4yMjc1OSwxMi42NzQyNGMwLjA2MTY5LDAuMzUwOTggLTAuMTcyODMsMC42ODU1MiAtMC41MjM4MiwwLjc0NzIxeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMzAxLjEwNTM5LDE2OC43ODExNGMtMC4xOTk2NiwtMS4xMzYwMyAwLjU1OTQyLC0yLjIxODgzIDEuNjk1NDUsLTIuNDE4NWMxLjEzNjAzLC0wLjE5OTY3IDIuMjE4ODMsMC41NTk0MSAyLjQxODUsMS42OTU0NGMwLjE5OTY2LDEuMTM2MDMgLTAuNTU5NDEsMi4yMTg4MyAtMS42OTU0NSwyLjQxODVjLTEuMTM2MDMsMC4xOTk2NyAtMi4yMTg4MywtMC41NTk0MSAtMi40MTg1LC0xLjY5NTQ0eiIgZmlsbD0iI2NmY2ZjZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjkyLjM2ODM2LDEzMi4yODE2NmMtMC4zNDAxNywwLjA1OTc5IC0wLjY2NDQsLTAuMTY3NTEgLTAuNzI0MiwtMC41MDc2OWwtMC4wODAyMSwtMC40NTYzNmMtMC4wNTk3OCwtMC4zNDAxNyAwLjE2NzUxLC0wLjY2NDQxIDAuNTA3NjgsLTAuNzI0Mmw4Ljc2NDI3LC0xLjU0MDM4YzAuMzQwMTcsLTAuMDU5NzkgMC42NjQ0MSwwLjE2NzUxIDAuNzI0MiwwLjUwNzY4bDAuMDgwMiwwLjQ1NjM2YzAuMDU5NzgsMC4zNDAxNyAtMC4xNjc1MSwwLjY2NDQxIC0wLjUwNzY4LDAuNzI0MnoiIGZpbGw9IiNjZmNmY2YiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI5NC4yMjIyNiwxNjUuMTMxNThjLTAuMzUwOTgsMC4wNjE2OSAtMC42ODU1MiwtMC4xNzI4MyAtMC43NDcyMSwtMC41MjM4MmwtMi4yMjc1OSwtMTIuNjc0MjRjLTAuMDYxNjksLTAuMzUwOTggMC4xNzI4MywtMC42ODU1MiAwLjUyMzgyLC0wLjc0NzIxbDE2LjM2ODgxLC0yLjg3Njk0YzAuMzUwOTgsLTAuMDYxNjkgMC42ODU1MiwwLjE3MjgzIDAuNzQ3MjEsMC41MjM4MWwyLjIyNzU5LDEyLjY3NDI0YzAuMDYxNjksMC4zNTA5OCAtMC4xNzI4MywwLjY4NTUyIC0wLjUyMzgyLDAuNzQ3MjF6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yOTQuNDYwNzMsMTYwLjc0Yy0wLjM2NDI0LDAuMDY0MDIgLTAuNzExNCwtMC4xNzkzNSAtMC43NzU0MiwtMC41NDM1OWwtMS4yNzQ1NCwtNy4yNTE3MWMtMC4wNjQwMSwtMC4zNjQyNCAwLjE3OTM2LC0wLjcxMTQgMC41NDM1OSwtMC43NzU0MmwxNC40MDg3MSwtMi41MzI0NGMwLjM2NDI0LC0wLjA2NDAyIDAuNzExNDEsMC4xNzkzNiAwLjc3NTQyLDAuNTQzNmwxLjI3NDU0LDcuMjUxNzFjMC4wNjQwMSwwLjM2NDI0IC0wLjE3OTM2LDAuNzExNCAtMC41NDM1OSwwLjc3NTQyeiIgZmlsbC1vcGFjaXR5PSIwLjE0NTEiIGZpbGw9IiM2NzY3NjciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI5OC4wNTg2MSwxNjMuMjY2NDNjLTAuMzY0MjQsMC4wNjQwMiAtMC43MTE0MSwtMC4xNzkzNiAtMC43NzU0MiwtMC41NDM2bC0wLjIxMTI5LC0xLjIwMjE3Yy0wLjA2NDAxLC0wLjM2NDI0IDAuMTc5MzUsLTAuNzExNCAwLjU0MzU5LC0wLjc3NTQybDguMjkwMDMsLTEuNDU3MDNjMC4zNjQyNCwtMC4wNjQwMiAwLjcxMTQxLDAuMTc5MzUgMC43NzU0MiwwLjU0MzU5bDAuMjExMjksMS4yMDIxOGMwLjA2NDAxLDAuMzY0MjQgLTAuMTc5MzUsMC43MTE0IC0wLjU0MzU5LDAuNzc1NDJ6IiBmaWxsLW9wYWNpdHk9IjAuMTQ1MSIgZmlsbD0iIzY3Njc2NyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjk0Ljk5OTI4LDE2My44MDQxM2MtMC4zNjQyNCwwLjA2NDAyIC0wLjcxMTQsLTAuMTc5MzUgLTAuNzc1NDIsLTAuNTQzNTlsLTAuMjExMywtMS4yMDIxOGMtMC4wNjQwMSwtMC4zNjQyNCAwLjE3OTM2LC0wLjcxMTQgMC41NDM1OSwtMC43NzU0MmwxLjA1OTQ3LC0wLjE4NjIxYzAuMzY0MjQsLTAuMDY0MDIgMC43MTE0LDAuMTc5MzUgMC43NzU0MSwwLjU0MzU5bDAuMjExMywxLjIwMjE4YzAuMDY0MDEsMC4zNjQyNCAtMC4xNzkzNiwwLjcxMTQgLTAuNTQzNTksMC43NzU0MnoiIGZpbGwtb3BhY2l0eT0iMC4xNDUxIiBmaWxsPSIjNjc2NzY3IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0zMDguMzE4NzQsMTYxLjQ2MzEzYy0wLjM2NDI0LDAuMDY0MDIgLTAuNzExNCwtMC4xNzkzNSAtMC43NzU0MiwtMC41NDM1OWwtMC4yMTEzLC0xLjIwMjE4Yy0wLjA2NDAxLC0wLjM2NDI0IDAuMTc5MzYsLTAuNzExNCAwLjU0MzYsLTAuNzc1NDJsMS4wNTk0NiwtMC4xODYyMWMwLjM2NDI0LC0wLjA2NDAyIDAuNzExNDEsMC4xNzkzNSAwLjc3NTQyLDAuNTQzNTlsMC4yMTEyOSwxLjIwMjE4YzAuMDY0MDEsMC4zNjQyNCAtMC4xNzkzNSwwLjcxMTQgLTAuNTQzNTksMC43NzU0MnoiIGZpbGwtb3BhY2l0eT0iMC4xNDUxIiBmaWxsPSIjNjc2NzY3IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNjIuODg5ODUsMTg3LjExMDE0di03NC4yMjAyOWg3NC4yMjAyOXY3NC4yMjAyOXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MzcuMTEwMTQ2MDcxODUxNDk6MzcuMTEwMTUxMDcxODUxNTItLT4="
  const blockicon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MS44MjYyOSIgaGVpZ2h0PSI2MS44MjYyOSIgdmlld0JveD0iMCwwLDYxLjgyNjI5LDYxLjgyNjI5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjY5LjA4Njg1LC0xMTkuMDg2ODUpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yOTMuMDkyNzgsMTc0LjIyNTg2Yy0xLjIzOTMxLDAuMjE3ODIgLTIuNDIwNTUsLTAuNjEwMjcgLTIuNjM4MzYsLTEuODQ5NThsLTcuMDU3ODMsLTQwLjE1NjdjLTAuMjE3ODEsLTEuMjM5MzEgMC42MTAyNiwtMi40MjA1NSAxLjg0OTU3LC0yLjYzODM2bDIxLjY2MTA3LC0zLjgwNzA5YzEuMjM5MzEsLTAuMjE3ODIgMi40MjA1NSwwLjYxMDI2IDIuNjM4MzYsMS44NDk1N2w3LjA1NzgzLDQwLjE1NjdjMC4yMTc4MSwxLjIzOTMxIC0wLjYxMDI3LDIuNDIwNTUgLTEuODQ5NTcsMi42MzgzNnpNMzExLjY5NDA1LDE2Mi45NDMwOGMwLjM2NDI0LC0wLjA2NDAyIDAuNjA3NiwtMC40MTExOCAwLjU0MzU5LC0wLjc3NTQybC01LjIxOTA0LC0yOS42OTQ2NGMtMC4wNjQwMSwtMC4zNjQyNCAtMC40MTExOCwtMC42MDc2MSAtMC43NzU0MiwtMC41NDM1OWwtMTguMjczOTIsMy4yMTE3N2MtMC4zNjQyNCwwLjA2NDAyIC0wLjYwNzYxLDAuNDExMTggLTAuNTQzNTksMC43NzU0Mmw1LjIxOTA1LDI5LjY5NDY0YzAuMDY0MDEsMC4zNjQyNCAwLjQxMTE4LDAuNjA3NjEgMC43NzU0MiwwLjU0MzZ6TTI5NC4yMjIyNiwxNjUuMTMxNThjLTAuMzUwOTgsMC4wNjE2OSAtMC42ODU1MiwtMC4xNzI4MyAtMC43NDcyMSwtMC41MjM4MmwtMi4yMjc1OSwtMTIuNjc0MjRjLTAuMDYxNjksLTAuMzUwOTggMC4xNzI4MywtMC42ODU1MiAwLjUyMzgyLC0wLjc0NzIxbDE2LjM2ODgxLC0yLjg3Njk0YzAuMzUwOTgsLTAuMDYxNjkgMC42ODU1MiwwLjE3MjgzIDAuNzQ3MjEsMC41MjM4MWwyLjIyNzU5LDEyLjY3NDI0YzAuMDYxNjksMC4zNTA5OCAtMC4xNzI4MywwLjY4NTUyIC0wLjUyMzgyLDAuNzQ3MjF6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4yNDMxNCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjUiLz48cGF0aCBkPSJNMjkzLjA5Mjc4LDE3NC4yMjU4NmMtMS4yMzkzMSwwLjIxNzgyIC0yLjQyMDU1LC0wLjYxMDI3IC0yLjYzODM2LC0xLjg0OTU4bC03LjA1NzgzLC00MC4xNTY3Yy0wLjIxNzgxLC0xLjIzOTMxIDAuNjEwMjYsLTIuNDIwNTUgMS44NDk1NywtMi42MzgzNmwyMS42NjEwNywtMy44MDcwOWMxLjIzOTMxLC0wLjIxNzgyIDIuNDIwNTUsMC42MTAyNiAyLjYzODM2LDEuODQ5NTdsNy4wNTc4Myw0MC4xNTY3YzAuMjE3ODEsMS4yMzkzMSAtMC42MTAyNywyLjQyMDU1IC0xLjg0OTU3LDIuNjM4MzZ6TTMxMS42OTQwNSwxNjIuOTQzMDhjMC4zNjQyNCwtMC4wNjQwMiAwLjYwNzYsLTAuNDExMTggMC41NDM1OSwtMC43NzU0MmwtNS4yMTkwNCwtMjkuNjk0NjRjLTAuMDY0MDEsLTAuMzY0MjQgLTAuNDExMTgsLTAuNjA3NjEgLTAuNzc1NDIsLTAuNTQzNTlsLTE4LjI3MzkyLDMuMjExNzdjLTAuMzY0MjQsMC4wNjQwMiAtMC42MDc2MSwwLjQxMTE4IC0wLjU0MzU5LDAuNzc1NDJsNS4yMTkwNSwyOS42OTQ2NGMwLjA2NDAxLDAuMzY0MjQgMC40MTExOCwwLjYwNzYxIDAuNzc1NDIsMC41NDM2eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjkzLjA5Mjc4LDE3NC4yMjU4NmMtMS4yMzkzMSwwLjIxNzgyIC0yLjQyMDU1LC0wLjYxMDI3IC0yLjYzODM2LC0xLjg0OTU4bC03LjA1NzgzLC00MC4xNTY3Yy0wLjIxNzgxLC0xLjIzOTMxIDAuNjEwMjYsLTIuNDIwNTUgMS44NDk1NywtMi42MzgzNmwyMS42NjEwNywtMy44MDcwOWMxLjIzOTMxLC0wLjIxNzgyIDIuNDIwNTUsMC42MTAyNiAyLjYzODM2LDEuODQ5NTdsNy4wNTc4Myw0MC4xNTY3YzAuMjE3ODEsMS4yMzkzMSAtMC42MTAyNywyLjQyMDU1IC0xLjg0OTU3LDIuNjM4MzZ6TTMxMS42OTQwNSwxNjIuOTQzMDhjMC4zNjQyNCwtMC4wNjQwMiAwLjYwNzYsLTAuNDExMTggMC41NDM1OSwtMC43NzU0MmwtNS4yMTkwNCwtMjkuNjk0NjRjLTAuMDY0MDEsLTAuMzY0MjQgLTAuNDExMTgsLTAuNjA3NjEgLTAuNzc1NDIsLTAuNTQzNTlsLTE4LjI3MzkyLDMuMjExNzdjLTAuMzY0MjQsMC4wNjQwMiAtMC42MDc2MSwwLjQxMTE4IC0wLjU0MzU5LDAuNzc1NDJsNS4yMTkwNSwyOS42OTQ2NGMwLjA2NDAxLDAuMzY0MjQgMC40MTExOCwwLjYwNzYxIDAuNzc1NDIsMC41NDM2ek0yOTQuMjIyMjYsMTY1LjEzMTU4Yy0wLjM1MDk4LDAuMDYxNjkgLTAuNjg1NTIsLTAuMTcyODMgLTAuNzQ3MjEsLTAuNTIzODJsLTIuMjI3NTksLTEyLjY3NDI0Yy0wLjA2MTY5LC0wLjM1MDk4IDAuMTcyODMsLTAuNjg1NTIgMC41MjM4MiwtMC43NDcyMWwxNi4zNjg4MSwtMi44NzY5NGMwLjM1MDk4LC0wLjA2MTY5IDAuNjg1NTIsMC4xNzI4MyAwLjc0NzIxLDAuNTIzODFsMi4yMjc1OSwxMi42NzQyNGMwLjA2MTY5LDAuMzUwOTggLTAuMTcyODMsMC42ODU1MiAtMC41MjM4MiwwLjc0NzIxeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMzAxLjEwNTM5LDE2OC43ODExNGMtMC4xOTk2NiwtMS4xMzYwMyAwLjU1OTQyLC0yLjIxODgzIDEuNjk1NDUsLTIuNDE4NWMxLjEzNjAzLC0wLjE5OTY3IDIuMjE4ODMsMC41NTk0MSAyLjQxODUsMS42OTU0NGMwLjE5OTY2LDEuMTM2MDMgLTAuNTU5NDEsMi4yMTg4MyAtMS42OTU0NSwyLjQxODVjLTEuMTM2MDMsMC4xOTk2NyAtMi4yMTg4MywtMC41NTk0MSAtMi40MTg1LC0xLjY5NTQ0eiIgZmlsbD0iI2NmY2ZjZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjkyLjM2ODM2LDEzMi4yODE2NmMtMC4zNDAxNywwLjA1OTc5IC0wLjY2NDQsLTAuMTY3NTEgLTAuNzI0MiwtMC41MDc2OWwtMC4wODAyMSwtMC40NTYzNmMtMC4wNTk3OCwtMC4zNDAxNyAwLjE2NzUxLC0wLjY2NDQxIDAuNTA3NjgsLTAuNzI0Mmw4Ljc2NDI3LC0xLjU0MDM4YzAuMzQwMTcsLTAuMDU5NzkgMC42NjQ0MSwwLjE2NzUxIDAuNzI0MiwwLjUwNzY4bDAuMDgwMiwwLjQ1NjM2YzAuMDU5NzgsMC4zNDAxNyAtMC4xNjc1MSwwLjY2NDQxIC0wLjUwNzY4LDAuNzI0MnoiIGZpbGw9IiNjZmNmY2YiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI5NC4yMjIyNiwxNjUuMTMxNThjLTAuMzUwOTgsMC4wNjE2OSAtMC42ODU1MiwtMC4xNzI4MyAtMC43NDcyMSwtMC41MjM4MmwtMi4yMjc1OSwtMTIuNjc0MjRjLTAuMDYxNjksLTAuMzUwOTggMC4xNzI4MywtMC42ODU1MiAwLjUyMzgyLC0wLjc0NzIxbDE2LjM2ODgxLC0yLjg3Njk0YzAuMzUwOTgsLTAuMDYxNjkgMC42ODU1MiwwLjE3MjgzIDAuNzQ3MjEsMC41MjM4MWwyLjIyNzU5LDEyLjY3NDI0YzAuMDYxNjksMC4zNTA5OCAtMC4xNzI4MywwLjY4NTUyIC0wLjUyMzgyLDAuNzQ3MjF6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yOTQuNDYwNzMsMTYwLjc0Yy0wLjM2NDI0LDAuMDY0MDIgLTAuNzExNCwtMC4xNzkzNSAtMC43NzU0MiwtMC41NDM1OWwtMS4yNzQ1NCwtNy4yNTE3MWMtMC4wNjQwMSwtMC4zNjQyNCAwLjE3OTM2LC0wLjcxMTQgMC41NDM1OSwtMC43NzU0MmwxNC40MDg3MSwtMi41MzI0NGMwLjM2NDI0LC0wLjA2NDAyIDAuNzExNDEsMC4xNzkzNiAwLjc3NTQyLDAuNTQzNmwxLjI3NDU0LDcuMjUxNzFjMC4wNjQwMSwwLjM2NDI0IC0wLjE3OTM2LDAuNzExNCAtMC41NDM1OSwwLjc3NTQyeiIgZmlsbC1vcGFjaXR5PSIwLjE0NTEiIGZpbGw9IiM2NzY3NjciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI5OC4wNTg2MSwxNjMuMjY2NDNjLTAuMzY0MjQsMC4wNjQwMiAtMC43MTE0MSwtMC4xNzkzNiAtMC43NzU0MiwtMC41NDM2bC0wLjIxMTI5LC0xLjIwMjE3Yy0wLjA2NDAxLC0wLjM2NDI0IDAuMTc5MzUsLTAuNzExNCAwLjU0MzU5LC0wLjc3NTQybDguMjkwMDMsLTEuNDU3MDNjMC4zNjQyNCwtMC4wNjQwMiAwLjcxMTQxLDAuMTc5MzUgMC43NzU0MiwwLjU0MzU5bDAuMjExMjksMS4yMDIxOGMwLjA2NDAxLDAuMzY0MjQgLTAuMTc5MzUsMC43MTE0IC0wLjU0MzU5LDAuNzc1NDJ6IiBmaWxsLW9wYWNpdHk9IjAuMTQ1MSIgZmlsbD0iIzY3Njc2NyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjk0Ljk5OTI4LDE2My44MDQxM2MtMC4zNjQyNCwwLjA2NDAyIC0wLjcxMTQsLTAuMTc5MzUgLTAuNzc1NDIsLTAuNTQzNTlsLTAuMjExMywtMS4yMDIxOGMtMC4wNjQwMSwtMC4zNjQyNCAwLjE3OTM2LC0wLjcxMTQgMC41NDM1OSwtMC43NzU0MmwxLjA1OTQ3LC0wLjE4NjIxYzAuMzY0MjQsLTAuMDY0MDIgMC43MTE0LDAuMTc5MzUgMC43NzU0MSwwLjU0MzU5bDAuMjExMywxLjIwMjE4YzAuMDY0MDEsMC4zNjQyNCAtMC4xNzkzNiwwLjcxMTQgLTAuNTQzNTksMC43NzU0MnoiIGZpbGwtb3BhY2l0eT0iMC4xNDUxIiBmaWxsPSIjNjc2NzY3IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0zMDguMzE4NzQsMTYxLjQ2MzEzYy0wLjM2NDI0LDAuMDY0MDIgLTAuNzExNCwtMC4xNzkzNSAtMC43NzU0MiwtMC41NDM1OWwtMC4yMTEzLC0xLjIwMjE4Yy0wLjA2NDAxLC0wLjM2NDI0IDAuMTc5MzYsLTAuNzExNCAwLjU0MzYsLTAuNzc1NDJsMS4wNTk0NiwtMC4xODYyMWMwLjM2NDI0LC0wLjA2NDAyIDAuNzExNDEsMC4xNzkzNSAwLjc3NTQyLDAuNTQzNTlsMC4yMTEyOSwxLjIwMjE4YzAuMDY0MDEsMC4zNjQyNCAtMC4xNzkzNSwwLjcxMTQgLTAuNTQzNTksMC43NzU0MnoiIGZpbGwtb3BhY2l0eT0iMC4xNDUxIiBmaWxsPSIjNjc2NzY3IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNjkuMDg2ODUsMTgwLjkxMzE0di02MS44MjYyOWg2MS44MjYyOXY2MS44MjYyOXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MzAuOTEzMTQ2NzI0MTY3MjM0OjMwLjkxMzE1MTcyNDE2NzI2NC0tPg==";

  class MobileKeyboard {
    constructor() {
      this.keyboardOpen = false;
      /** @type {Array<() => void>} */
      this.waitCallbacks = [];
      this.defaultValue = "";
      this.typedText = "";
      this.inputElement = null;
    }

    getInfo() {
      return {
        id: "mobilekeyboard0419",
        color1: "#999999",
        color2: "#666666",
        color3: "#333333",
        menuIconURI: menuicon,
        blockIconURI: blockicon,
        name: Scratch.translate("Mobile Keyboard"),
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Currently only works on Android"),
          },
          {
            opcode: "showKeyboardBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show [TYPE] keyboard"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "keyboardtypes",
                defaultValue: "alphabetical",
              },
            },
          },
          {
            opcode: "showKeyboardAndWaitBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show [TYPE] keyboard and wait"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "keyboardtypes",
                defaultValue: "alphabetical",
              },
            },
          },
          {
            opcode: "typedTextSinceKeyboardOpened",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("typed text"),
          },
          {
            opcode: "isKeyboardOpen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is keyboard open?"),
          },
          {
            opcode: "setDefaultValue",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set text box's default value to [VALUE]"),
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("You typed: "),
              },
            },
          },
          {
            opcode: "setCurrentValue",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set textbox current value to [TEXT]"),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Now the text is different"),
              },
            },
          },
          {
            opcode: "getCursorPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("cursor position/start of selection"),
          },
          {
            opcode: "getSelectionEnd",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("end of selection"),
          },
          {
            opcode: "isAnySelected",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is any text selected?"),
          },
          {
            opcode: "setCursorPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set cursor position to [INDEX]"),
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3",
              },
            },
          },
          {
            opcode: "setSelectedText",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "select text starting at position in text [START] ending at position [END]"
            ),
            arguments: {
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3",
              },
            },
          },
          {
            opcode: "closeKeyboardBlock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("close keyboard"),
          },
        ],
        menus: {
          keyboardtypes: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("alphabetical"),
                value: "text",
              },
              {
                text: Scratch.translate("alphabetical (allows newlines)"),
                value: "textarea",
              },
              {
                text: Scratch.translate("numerical"),
                value: "number",
              },
              {
                text: Scratch.translate("email adress"),
                value: "email",
              },
              {
                text: Scratch.translate("web address"),
                value: "url",
              },
              {
                text: Scratch.translate("search"),
                value: "search",
              },
            ],
          },
        },
      };
    }

    showKeyboard(type) {
      const input = document.createElement(
        type === "textarea" ? "textarea" : "input"
      );
      if (type !== "textarea") {
        /** @type {HTMLInputElement} */ (input).type = type;
      }
      input.style.position = "absolute";
      input.style.top = "0";
      input.style.left = "0";
      input.style.width = "1px";
      input.style.height = "1px";
      input.style.fontSize = "1px";
      input.style.padding = "0px";
      input.style.border = "none";
      input.style.backgroundColor = "#fff";
      input.value = this.defaultValue;

      this.typedText = this.defaultValue;
      this.keyboardOpen = true;
      this.inputElement = input;

      document.body.appendChild(input);
      input.focus();
      input.click();

      const done = () => {
        this.keyboardOpen = false;
        this.inputElement = null;

        if (input.parentNode) {
          input.parentNode.removeChild(input);
        }

        for (const callback of this.waitCallbacks) {
          callback();
        }
        this.waitCallbacks.length = 0;
      };

      input.addEventListener("input", () => {
        this.typedText = input.value;
      });

      if (type !== "textarea") {
        input.addEventListener("keydown", (event) => {
          if (/** @type {KeyboardEvent} */ (event).key === "Enter") {
            input.blur();
          }
        });
      }

      input.addEventListener("blur", () => {
        done();
      });
    }

    showKeyboardBlock(args) {
      this.showKeyboard(args.TYPE);
    }

    showKeyboardAndWaitBlock(args) {
      return new Promise((resolve) => {
        this.waitCallbacks.push(() => resolve());
        this.showKeyboard(args.TYPE);
      });
    }

    typedTextSinceKeyboardOpened() {
      return this.typedText;
    }

    isKeyboardOpen() {
      return this.keyboardOpen;
    }

    setDefaultValue(args) {
      this.defaultValue = Scratch.Cast.toString(args.VALUE);
    }

    setCurrentValue(args) {
      if (this.inputElement) {
        const text = Scratch.Cast.toString(args.TEXT);
        this.inputElement.value = text;
        this.typedText = text;
      }
    }

    getCursorPosition() {
      if (this.inputElement) {
        return this.inputElement.selectionStart;
      }
      return -1;
    }

    getSelectionEnd() {
      if (this.inputElement) {
        return this.inputElement.selectionEnd;
      }
      return -1;
    }

    isAnySelected() {
      if (this.inputElement) {
        return (
          this.inputElement.selectionEnd !== this.inputElement.selectionStart
        );
      }
      return false;
    }

    setCursorPosition(args) {
      if (this.inputElement) {
        this.inputElement.setSelectionRange(args.INDEX, args.INDEX);
      }
    }

    setSelectedText(args) {
      if (this.inputElement) {
        this.inputElement.setSelectionRange(args.START, args.END);
      }
    }

    closeKeyboardBlock() {
      if (this.inputElement) {
        this.inputElement.blur();
      }
    }
  }

  Scratch.extensions.register(new MobileKeyboard());
})(Scratch);
