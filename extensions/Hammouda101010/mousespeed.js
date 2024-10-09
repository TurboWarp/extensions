// Name: Mouse Speed
// ID: hammouda101010mousespeed
// Description: Get The Speed of the Mouse.
// By: Hammouda101010 <https://scratch.mit.edu/users/hammouda101010/>
// License: MIT

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Mouse Speed must run unsandboxed, silly");
  }
  // Block Icons
  const blocksIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzkuNjk1NDQiIGhlaWdodD0iMTM5LjY5NTQ0IiB2aWV3Qm94PSIwLDAsMTM5LjY5NTQ0LDEzOS42OTU0NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MC4xNTIyOCwtMTEwLjE1MjI4KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTc1LjE1MjI4LDE4MGMwLC0zNS44MTQ0MSAyOS4wMzMzMSwtNjQuODQ3NzIgNjQuODQ3NzIsLTY0Ljg0NzcyYzM1LjgxNDQxLDAgNjQuODQ3NzIsMjkuMDMzMzEgNjQuODQ3NzIsNjQuODQ3NzJjMCwzNS44MTQ0MSAtMjkuMDMzMzEsNjQuODQ3NzIgLTY0Ljg0NzcyLDY0Ljg0NzcyYy0zNS44MTQ0MSwwIC02NC44NDc3MiwtMjkuMDMzMzEgLTY0Ljg0NzcyLC02NC44NDc3MnoiIGZpbGw9IiMwMGUwZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxnPjxwYXRoIGQ9Ik0yMzMuMTc2NjQsMTc5LjkyMjA5bC04LjU4OTA5LC0zOC41NzcyMWwxMi4yMjk0Niw1LjAxMDgxbDE3LjY1MzQ5LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1Ny4zNTE5NiwxODEuMzExNWwtOC41ODkwOSwtMzguNTc3MjFsMTIuMjI5NDYsNS4wMTA4MWwxNy42NTM1LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIwOS45NDMyNywxODAuNTI0OTJsLTguNTg5MDksLTM4LjU3NzJsMTIuMjI5NDYsNS4wMTA4MWwxNy42NTM1LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1MS42MDMyMiwyMTcuOTU3NmwtMTEuMTgzLC0yMC4xNjMzbC0xOC4wMTI3LDExLjMzMjVsLTAuNzgzNywtNjkuMDE1NWw0Ny42NjYxLDQ4LjM1MzhsLTE2LjY1NzIsMy43MDc3bDEwLjMzNTksMTguOTc3M2MwLDAgMS4zMjU4LDQuNTI1NCAtMi44MjUxLDcuMTEzMmMtNC45NTY3LDMuMDkwMyAtOC41NDAzLC0wLjMwNTcgLTguNTQwMywtMC4zMDU3eiIgZmlsbD0iIzAwZTBmZiIgc3Ryb2tlPSIjMDA2YWEyIiBzdHJva2Utd2lkdGg9IjQuNSIvPjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo2OS44NDc3MjExODc2MzE4Mzo2OS44NDc3MjExODc2MzIwMi0tPg==";
  const menuIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzkuNjk1NDQiIGhlaWdodD0iMTM5LjY5NTQ0IiB2aWV3Qm94PSIwLDAsMTM5LjY5NTQ0LDEzOS42OTU0NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MC4xNTIyOCwtMTEwLjE1MjI4KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTc1LjE1MjI4LDE4MGMwLC0zNS44MTQ0MSAyOS4wMzMzMSwtNjQuODQ3NzIgNjQuODQ3NzIsLTY0Ljg0NzcyYzM1LjgxNDQxLDAgNjQuODQ3NzIsMjkuMDMzMzEgNjQuODQ3NzIsNjQuODQ3NzJjMCwzNS44MTQ0MSAtMjkuMDMzMzEsNjQuODQ3NzIgLTY0Ljg0NzcyLDY0Ljg0NzcyYy0zNS44MTQ0MSwwIC02NC44NDc3MiwtMjkuMDMzMzEgLTY0Ljg0NzcyLC02NC44NDc3MnoiIGZpbGw9IiMwMGUwZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxnPjxwYXRoIGQ9Ik0yMzMuMTc2NjQsMTc5LjkyMjA5bC04LjU4OTA5LC0zOC41NzcyMWwxMi4yMjk0Niw1LjAxMDgxbDE3LjY1MzQ5LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1Ny4zNTE5NiwxODEuMzExNWwtOC41ODkwOSwtMzguNTc3MjFsMTIuMjI5NDYsNS4wMTA4MWwxNy42NTM1LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIwOS45NDMyNywxODAuNTI0OTJsLTguNTg5MDksLTM4LjU3NzJsMTIuMjI5NDYsNS4wMTA4MWwxNy42NTM1LDMzLjU2NjM5bC0xNy40MTk5MywzNC42MTY3NGwtMTIuNDYzMDIsMy45NjA0NnoiIGZpbGw9IiMwMGE0ZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1MS42MDMyMiwyMTcuOTU3NmwtMTEuMTgzLC0yMC4xNjMzbC0xOC4wMTI3LDExLjMzMjVsLTAuNzgzNywtNjkuMDE1NWw0Ny42NjYxLDQ4LjM1MzhsLTE2LjY1NzIsMy43MDc3bDEwLjMzNTksMTguOTc3M2MwLDAgMS4zMjU4LDQuNTI1NCAtMi44MjUxLDcuMTEzMmMtNC45NTY3LDMuMDkwMyAtOC41NDAzLC0wLjMwNTcgLTguNTQwMywtMC4zMDU3eiIgZmlsbD0iIzAwZTBmZiIgc3Ryb2tlPSIjMDA2YWEyIiBzdHJva2Utd2lkdGg9IjQuNSIvPjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo2OS44NDc3MjExODc2MzE4Mzo2OS44NDc3MjExODc2MzIwMi0tPg==";

  const limitIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzkuNjk1NDQiIGhlaWdodD0iMTM5LjY5NTQ0IiB2aWV3Qm94PSIwLDAsMTM5LjY5NTQ0LDEzOS42OTU0NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MC4zMzE3MSwtMTEwLjE1MjI4KSI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMTc1LjMzMTcxLDE4MGMwLC0zNS44MTQ0MSAyOS4wMzMzMSwtNjQuODQ3NzIgNjQuODQ3NzIsLTY0Ljg0NzcyYzM1LjgxNDQxLDAgNjQuODQ3NzIsMjkuMDMzMzEgNjQuODQ3NzIsNjQuODQ3NzJjMCwzNS44MTQ0MSAtMjkuMDMzMzEsNjQuODQ3NzIgLTY0Ljg0NzcyLDY0Ljg0NzcyYy0zNS44MTQ0MSwwIC02NC44NDc3MiwtMjkuMDMzMzEgLTY0Ljg0NzcyLC02NC44NDc3MnoiIGZpbGw9IiMwMGUwZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxnIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIj48cGF0aCBkPSJNMjMzLjE1MzIsMTk5LjY1ODk5bDM4LjU3NzIxLC04LjU4OTA5bC01LjAxMDgxLDEyLjIyOTQ2bC0zMy41NjYzOSwxNy42NTM1bC0zNC42MTY3NCwtMTcuNDE5OTNsLTMuOTYwNDYsLTEyLjQ2MzAyeiIgZmlsbD0iIzlhMGYwMCIvPjxwYXRoIGQ9Ik0yMzMuOTM5NzgsMTUyLjI1MDNsMzguNTc3MiwtOC41ODkwOWwtNS4wMTA4MSwyNS42ODcxNWwtMzMuNTY2MzksMjcuNjUwNjRsLTM0LjYxNjc0LC0yOC45NTUwOWwtMy45NjA0NiwtMjQuMzgyNjl6IiBmaWxsPSIjZmYwMDAwIi8+PHBhdGggZD0iTTIzMy4wMDYwMSwxODguNTU4MjhsMzQuMzQ3NjUsLTguOTczNmwwLjc1Njc3LDEyLjYxMzk3bC0zNS4xMDQ0MSwxNy42NTM0OWwtMzQuNjE2NzQsLTE3LjQxOTkzbDEuMDM4MTEsLTE0LjM4NTU1eiIgZmlsbD0iI2ZmMDAwMCIvPjxwYXRoIGQ9Ik0yMzQuNTQyNjEsMTc1LjQ4MzY3bDM4LjU3NzIxLC04LjU4OTA5bC01LjAxMDgxLDEyLjIyOTQ2bC0zMy41NjYzOSwxNy42NTM0OWwtMzQuNjE2NzQsLTE3LjQxOTkzbC0zLjk2MDQ2LC0xMi40NjMwMnoiIGZpbGw9IiNmZjQ2NDYiLz48L2c+PHBhdGggZD0iTTI3Mi4wOTg4NiwyMTYuMzAyNjlsLTYuNjM2ODUsLTExLjk2NjQ1bC0xMC42OTAxMiw2LjcyNTU4bC0wLjQ2NTExLC00MC45NTkwOWwyOC4yODg3MiwyOC42OTY4NmwtOS44ODU2NiwyLjIwMDQzbDYuMTM0MTIsMTEuMjYyNTljMCwwIDAuNzg2ODMsMi42ODU3MiAtMS42NzY2Myw0LjIyMTUyYy0yLjk0MTY5LDEuODM0MDIgLTUuMDY4NDcsLTAuMTgxNDMgLTUuMDY4NDcsLTAuMTgxNDN6IiBmaWxsPSIjMDBlMGZmIiBzdHJva2U9IiMwMDZhYTIiIHN0cm9rZS13aWR0aD0iNC41Ii8+PGcgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiPjxwYXRoIGQ9Ik0yMTIuNjcyMzIsMTg4LjE5NjQzbDIuMTQyNTcsLTI2LjQ2MDQ0aDIyLjM5MTc5bC0xMC44OTE0MSwzNy43MDg5NHoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMjI1LjQ1MDk5LDE5OS44MDIwM3YtMjIuOTUxNThoMjQuOTEwODZsMC41MzU2NCwxMC4wOTYxNHoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMjI1Ljc1NTMzLDE5OS43MjU3Mmw2LjYzODk2LC0yMi42ODQzOWw1LjE0MzQzLC0wLjM1ODg2bDMuMzk0MTcsMTUuNzIyODF6IiBmaWxsPSIjZGVkZWRlIi8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjY5LjY2ODI4ODYzNjA5MDUyOjY5Ljg0NzcyLS0+";
  const noLimitIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzkuNjk1NDQiIGhlaWdodD0iMTM5LjY5NTQ0IiB2aWV3Qm94PSIwLDAsMTM5LjY5NTQ0LDEzOS42OTU0NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MC4zMzE3MSwtMTEwLjE1MjI4KSI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMTc1LjMzMTcxLDE4MGMwLC0zNS44MTQ0MSAyOS4wMzMzMSwtNjQuODQ3NzIgNjQuODQ3NzIsLTY0Ljg0NzcyYzM1LjgxNDQxLDAgNjQuODQ3NzIsMjkuMDMzMzEgNjQuODQ3NzIsNjQuODQ3NzJjMCwzNS44MTQ0MSAtMjkuMDMzMzEsNjQuODQ3NzIgLTY0Ljg0NzcyLDY0Ljg0NzcyYy0zNS44MTQ0MSwwIC02NC44NDc3MiwtMjkuMDMzMzEgLTY0Ljg0NzcyLC02NC44NDc3MnoiIGZpbGw9IiMwMGUwZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxnIHN0cm9rZS13aWR0aD0iMCI+PGcgc3Ryb2tlPSIjMDAwMDAwIj48cGF0aCBkPSJNMjMzLjE0ODI5LDIyMC44ODQ3NGwtMzQuNjE2NzQsLTE3LjQxOTkzbC0zLjk2MDQ2LC0xMi40NjMwMmwzMy41MzQ2OCw3LjQ2NjM5bDEzLjI3MzIyLDE1LjY4MzI2bDEuMjA0NzcsMS43NzA5M3oiIGZpbGw9IiM3Y2JmMDAiLz48cGF0aCBkPSJNMjcxLjcyNTQ5LDE5MS4wMDE3OGwtNS4wMTA4MSwxMi4yMjk0NmwtMTcuNjExMzgsOS4yNjIzMmwtMi4wNTQ4NiwtMy4yNTIwNGwtOS4yNjI3NywtMTAuNjgzMTR6IiBmaWxsPSIjN2NiZjAwIi8+PHBhdGggZD0iTTIzMy45MzQ4NiwxNTIuMTgyMThsMzguNTc3MiwtOC41ODkwOWwtNS4wMTA4MSwyNS42ODcxNWwtMzIuMDU0MTIsMjYuNDA0OWwtNC40MDQyNSwtNi4wMjQ5MmwtMS45MDc1MSwtMi41MzAwMmwtMC45MjUwOCwtMC43MjUzNWwzLjI3NzYsLTIuNjAxMTFsOC40ODEwNSwtMTAuMDg4MzlsMS41MTg0NCwtNC44MjA5NmwtMy45OTA2NCwtNS41MTcxOWwtNS4yMjk2OCwtMTEuNTY2MzV6IiBmaWxsPSIjYTVmZjAwIi8+PHBhdGggZD0iTTE5OS4zMTgxMiwxNjcuOTc1NzlsLTMuOTYwNDYsLTI0LjM4MjY5bDI3LjIxNzM4LDYuMDU5ODVsMC44ODAxNywxLjc5NDQxbDYuMjA4MiwxMy4yMjY0OGwyLjQ2NzU1LDcuNDUxMTNsLTUuNDE2NzMsNS44OTQxMWwtNS41MjE5NCw0LjQ5NzUzbC0xLjAyMjc2LDIuOTAwMjd6IiBmaWxsPSIjYTVmZjAwIi8+PHBhdGggZD0iTTIzMy4wMDEwOSwxODguNDkwMTZsMzQuMzQ3NjUsLTguOTczNmwwLjc1Njc3LDEyLjYxMzk3bC0yNS4wMTEsMTIuNTc3NjZsLTEyLjA1MTY0LC0xNS4wNDc5OGwtMS43MDMyMywtMi4zMTYyNXoiIGZpbGw9IiNhNWZmMDAiLz48cGF0aCBkPSJNMjMzLjAwMTEsMjA5Ljc4NDAybC0zNC42MTY3NCwtMTcuNDE5OTNsMS4wMzgxMSwtMTQuMzg1NTVsMjAuOTUxODQsNi41NTg4N2w0LjU0NjAyLDkuNDU0NmwxMS4yMTk5NywxNC4yMTMzNXoiIGZpbGw9IiNhNWZmMDAiLz48cGF0aCBkPSJNMjczLjExNDksMTY2LjgyNjQ2bC01LjAxMDgxLDEyLjIyOTQ2bC0zMi4zNTExNiwxNy4wMTQzNmwtNC43MTAwNSwtNi40MTAwN2wtMS45MDc1MSwtMi41MzAwMmwtMC45MjUwOCwtMC43MjUzNWwzLjI3NzYsLTIuNjAxMTFsOC4yMzg3NywtOS41NDM0OXoiIGZpbGw9IiNjYWZmNjkiLz48cGF0aCBkPSJNMTk5LjkyMDk2LDE3OS4yODk0OGwtMy45NjA0NiwtMTIuNDYzMDJsMzQuNDAxOTQsNy42NTk0OGwtMy42NDgyMSwzLjUzMzE0bC01LjUyMTk0LDQuNDk3NTNsMC41MzA4OCw3Ljc0NDIzeiIgZmlsbD0iI2NhZmY2OSIvPjwvZz48ZyBzdHJva2U9Im5vbmUiPjxwYXRoIGQ9Ik0yMTIuNjY3NCwxODguMTI4MzFsMi4xNDI1NywtMjYuNDYwNDRoMTMuNTU4NTVsMS4yOTQ4OSwzLjAwNTk4bDMuMDUwNzYsOC4wMzQzNWwtNS45OTk5NCw1LjMxMDg5bC01LjUyMTk0LDQuNDk3NTNsMy43MjgwNSwxMS40NzUzOWwyLjA4MjU5LDIuOTg2OTNsLTAuNjkyNTcsMi4zOTc4N3oiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMjI5LjEzNTM3LDE4Ny4xMzAxOWwtMC45MjUwOCwtMC43MjUzNWwyLjM1NTEzLC0xLjc2MDIybC0wLjg5MzExLDMuMDkyMjF6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTIzNy4yMDE3NiwxNjEuNjY3ODdsLTAuMjUyMjMsMC44NzMyNmwtMC41MTIyNCwtMC44NzMyNnoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMjUwLjM1NjkzLDE3Ni43ODIzM2wwLjUzNTY0LDEwLjA5NjE0bC0xNi4wMDkyLDguMDg3NzZsLTMuODQwNSwtNS4zMDYwMmwtMS45MDc1MSwtMi41MzAwMmwtMC45MjUwOCwtMC43MjUzNWwzLjI3NzYsLTIuNjAxMTFsNi43ODI3NywtNy4wMjE0eiIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0yMjUuNDQ2MDcsMTk5LjczMzkxdi00Ljk2MzE3bDIuNjE3MTcsMy42NDF6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTIyNS40NDYwNywxNzYuNzgyMzNoMi42OTczNGwtMS40MjkxOCwxLjIzNjc1bC0xLjI2ODE2LDAuOTg4Njl6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTI0MC45MjY5NywxOTIuMzM3MTVsLTUuODgxNTQsMi44MzY5OGwtNC4wMDI1NiwtNS41MTM5MWwtMS42OTIyMywtMi4zMDQxNGwwLjYzMjQxLC0yLjE2MDg2bDEuNTA0ODMsLTEuMzkxNDhsNi4yNDM0NSwtNi4yNjk2OHoiIGZpbGw9IiNkZWRlZGUiLz48cGF0aCBkPSJNMjI1Ljc1MDQxLDE5OS42NTc2bDAuOTE5MDgsLTMuMTQwMzhsMS40NjU3OCwxLjk5MDA0eiIgZmlsbD0iI2RlZGVkZSIvPjwvZz48L2c+PHBhdGggZD0iTTI3Mi4wOTg4NiwyMTYuMzAyNjlsLTYuNjM2ODUsLTExLjk2NjQ1bC0xMC42OTAxMiw2LjcyNTU4bC0wLjQ2NTExLC00MC45NTkwOWwyOC4yODg3MiwyOC42OTY4NmwtOS44ODU2NiwyLjIwMDQzbDYuMTM0MTIsMTEuMjYyNTljMCwwIDAuNzg2ODMsMi42ODU3MiAtMS42NzY2Myw0LjIyMTUyYy0yLjk0MTY5LDEuODM0MDIgLTUuMDY4NDcsLTAuMTgxNDMgLTUuMDY4NDcsLTAuMTgxNDN6IiBmaWxsPSIjMDBlMGZmIiBzdHJva2U9IiMwMDZhYTIiIHN0cm9rZS13aWR0aD0iNC41Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NjkuNjY4MjkwMDAwMDAwMDE6NjkuODQ3NzItLT4=";

  // Scratch's VM
  const vm = Scratch.vm;

  class MouseSpeed {
    constructor() {
      this.mouseX = 0; // Current mouse X position
      this.mouseY = 0; // Current mouse Y position
      this.lastX = 0; // Previous mouse X position
      this.lastY = 0; // Previous mouse Y position
      this.lastTime = performance.now(); // Last time the mouse was updated
      this.speed = 0; // Speed of the mouse
      this.limit = null; //Mouse's speed limit
      this.tolerance = 50; // Tolerance of the mouse's speed

      // Bind this to the event listener to track mouse movement
      vm.renderer.canvas.addEventListener(
        "mousemove",
        this.handleMouseMove.bind(this)
      );

      // Start a continuous update interval to constantly track mouse speed
      setInterval(() => this.updateMouseSpeed(), 50); // Updates every 50ms
    }

    getInfo() {
      return {
        id: "mousespeed",
        name: "Mouse Speed",
        menuIconURI: menuIcon,
        blockIconURI: blocksIcon,
        docsURI: "https://extensions.turbowarp.org/Hammouda101010/mousespeed",
        color1: "#38C3E5",
        color2: "#33A5C1",
        blocks: [
          {
            opcode: "getMouseSpeed",
            blockType: Scratch.BlockType.REPORTER,
            text: "mouse speed",
          },
          {
            opcode: "mouseFaster",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is mouse faster than [SPEED]?",
            arguments: {
              SPEED: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: "mouseTolerance",
            blockType: Scratch.BlockType.COMMAND,
            text: "set mouse speed tolerance to [TOLERANCE]",
            arguments: {
              TOLERANCE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Mouse Speed Limit",
          },
          {
            opcode: "mouseLimit",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: limitIcon,
            text: "set mouse speed limit to [LIMIT]",
            arguments: {
              LIMIT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "mouseLimitRemove",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: noLimitIcon,
            text: "remove mouse speed limit",
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Sprites Speed"
          },
          {
            opcode: "mouseSpriteFaster",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is mouse faster than [SPRITE]?",
            arguments: {
              SPRITE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myself",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Hats & Events"
          },
          {
            opcode: "whenMouseFaster",
            blockType: Scratch.BlockType.HAT,
            text: "when mouse is faster than [SPEED]",
            arguments: {
              SPEED: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
        ],
      };
    }

    // Handles Mouse Speed
    handleMouseMove(event) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }

    //Updates Mouse Speed:
    updateMouseSpeed() {
      const currentTime = performance.now();
      const timeElapsed = (currentTime - this.lastTime) / 1000; // Time in seconds

      if (timeElapsed > 0) {
        const dx = this.mouseX - this.lastX;
        const dy = this.mouseY - this.lastY;

        // Calculate the distance traveled by the mouse
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate speed in pixels per second
        this.speed = distance / timeElapsed;
      }

      // Update the last known mouse position and time
      this.lastX = this.mouseX;
      this.lastY = this.mouseY;
      this.lastTime = currentTime;
    }

    clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    }

    //The Extension Blocks

    getMouseSpeed() {
      //Gets Mouse Speed
      if (this.limit === null) {
        return Math.round(this.speed / this.tolerance); // Return the rounded speed
      } else {
        return this.clamp(
          Math.round(this.speed / this.tolerance),
          0,
          this.limit
        ); // Return the limited rounded speed
      }
    }
    mouseFaster(args) {
      // Checks if mouse speed is greater than the SPEED arg
      return this.getMouseSpeed() > args.SPEED;
    }

    mouseTolerance(args) {
      //sets the mouse's tolerance
      this.tolerance = args.TOLERANCE;
    }

    mouseLimit(args) {
      this.limit = args.LIMIT;
    }

    mouseLimitRemove() {
      this.limit = null;
    }

    whenMouseFaster(args) {
      return this.getMouseSpeed() > args.SPEED;
    }
  }

  vm.runtime.on("BEFORE_EXECUTE", () => {
    // startHats is the same as before!
    vm.runtime.startHats("mousespeed_whenMouseFaster");
  });

  Scratch.extensions.register(new MouseSpeed());
})(Scratch);
