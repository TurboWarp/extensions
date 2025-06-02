// Name: Popup Phoenix
// ID: SPpopups
// Description: Create custom Popups. Inspired by 'Better Input'.
// By: SharkPool
// Licence: MIT

// Version V.1.0.04

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed)
    throw new Error("Popup Phoenix must run unsandboxed!");

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4Ny41MzIiIGhlaWdodD0iODcuNTMyIiB2aWV3Qm94PSIwIDAgODcuNTMyIDg3LjUzMiI+PGcgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0uMDAxIDQzLjc2N0MuMDAxIDE5LjU5NSAxOS41OTQuMDAxIDQzLjc2Ni4wMDFzNDMuNzY2IDE5LjU5NCA0My43NjYgNDMuNzY2LTE5LjU5NCA0My43NjYtNDMuNzY2IDQzLjc2NlMwIDY3LjkzOSAwIDQzLjc2NyIgZmlsbD0iIzgyMTliZiIvPjxwYXRoIGQ9Ik01LjE2NSA0My43NjdjMC0yMS4zMiAxNy4yODItMzguNjAyIDM4LjYwMi0zOC42MDJzMzguNjAyIDE3LjI4MiAzOC42MDIgMzguNjAyLTE3LjI4MiAzOC42MDItMzguNjAyIDM4LjYwMlM1LjE2NSA2NS4wODcgNS4xNjUgNDMuNzY3IiBmaWxsPSIjYTgxMmZmIi8+PHBhdGggZD0ibTQwLjM5NyA1OC4wODctMy44NS42MDctLjE4MSA0Ljg3LTMuMTYgMS44MjUtMS40NDQtNi4yMS00LjEzOS0yLjU1NiAxLjkwNC0zLjMzNCA0LjQ3NiAyLjAwOCA0LjQ3NS0xLjQ0MS0zLjM4NC00LjUyNi0yLjY4OSAyLjAwMS00LjkyNy0uODc0IDIuNDY1LTMuNTktOC40NjUgMi4yOTItMi41NTYtNC4wNDUgOC4wNi0xLjgyOC0xMC4wNjgtLjc2My0xLjg0Ni01LjQ1MSAxMC4yOTEgMS4yMjctMTAuMzYtMy45OC45Ny02Ljc3OCA5LjQ4MyA1LjkzNC04LjA3NS05Ljc0NSAzLjI5Ni01LjM1NiAxMi40MjYgMTQuODA4LS4zNzQgNy41OCA1LjMzOSAxLjAyMSA1LjM2NS0xMS4xOTggOC4wMDMgMS41ODQtLjI5IDQuMzk3LTIuODk5LTEuMDM1LS4yMzMgMy43MSAxLjgzNSAyLjU0MiA0Ljc1Ny0xLjEtLjE2Mi02LjY5NCA3LjAyMy03LjY2OCA1LjI5Ny03LjQwOCAzLjI3MiAzLjkzNS03LjgxMSAxMS4yNDcgOS4xNzUtNy4wNi4xODggNy40MzMtOS40MDEgNC4yNTEgMTAuMzUtMS41My0xLjYyMSA2LjAzLTEwLjEzMy4xNDkgOS4xMTUgMS41Ni0zLjkwNyA0Ljc0OC04LjktMi45MTYgMi4zNDggMy4zODctNC43MDMgMS41Mi0yLjI4LTIuMjIzLTMuNjc5IDQuOTU0IDQuMTQ3LjcwMiA1LjEwNy0yLjMgMS41NjUgMy44NC00LjMyMyAyLS45NzEgNi41MzgtMy41ODgtMS4xMzMuMDM5LTUuMDY1LTMuOTM3LS42MzMuNDMgMi43MDMgNC4zIDYuNTI4LTIuODMyIDMuMzQtMi45NzMtMy4wMjMuNzUgNS4zNy0zLjE5NyAyLjg5NC0yLjk0LTIuOTYuNTI2LTUuMjk3LTIuNzggMy4xNTUtMi41NjQtMy42NCA0LjM2OS02LjU2NHoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+";
  const getBlockIcon = (name) => {
    // lower file size moment
    const start =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI";
    return (
      start +
      {
        main: "3OS4xOTkiIGhlaWdodD0iODcuOTIyIiB2aWV3Qm94PSIwIDAgNzkuMTk5IDg3LjkyMiI+PHBhdGggZD0ibTI1LjkwMSA2NS41MDctNS4yNTUtLjA4Yy0xMS4wMy0uMDgtMTEuNzA3LS4wOC0xMi44ODktLjU5OC0uMzctLjE1Mi0yLjc1OC0yLjQyOS0yLjc1OC0yLjQyOVYyNS40NzdzMi4wODMtMi4xNSAyLjc1OC0yLjQzYzEuMTI2LS40NzggMS44NTgtLjUxOCAxMi44OS0uNTk3bDUuMjUzLS4wOHoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxMCIgb3BhY2l0eT0iLjI1Ii8+PHBhdGggZD0iTTMwLjQ2OSA2NS41MDdzLTIxLjUzLS4xNi0yMi43MS0uNjc3Yy0uNjc3LS4yOC0yLjc2LTIuNDMtMi43Ni0yLjQzVjI1LjQ3OHMyLjA4My0yLjE1MSAyLjc1OC0yLjQzYzEuMTI3LS40NzggMjIuNzEyLS42NzcgMjIuNzEyLS42Nzd6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTUzLjYyOCAyMi4zNyA0LjkyMy4wOGMxMS4wMzEuMDggMTEuNzYzLjEyIDEyLjg5LjU5OC42NzQuMjc5IDIuNzU3IDIuNDMgMi43NTcgMi40M3YzNi45MjNzLTIuMDgzIDIuMTUtMi43NTggMi40MjljLTEuMTgyLjUxOC0xLjg1OC41MTgtMTIuODg5LjU5OGwtNC45MjMuMDh6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMTAiIG9wYWNpdHk9Ii4yNSIvPjxwYXRoIGQ9Ik00OC44OTUgMjIuMzdzMjEuNTg1LjIgMjIuNzEuNjc4Yy42NzYuMjc5IDIuNzU5IDIuNDMgMi43NTkgMi40M3YzNi45MjNzLTIuMDgzIDIuMTUtMi43NTggMi40MjljLTEuMTgyLjUxOC0yMi43MTEuNjc3LTIyLjcxMS42Nzd6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTI5LjI3OCA1LjAwNSAxMC44MzIuMDRjMTAuNTE2LjA4IDEwLjgzNC4xMiAxMS41MTEuNTk2IDIuNDMgMS44NzIgMi4zOSA0Ljk0LS4xNTkgNi42NTItLjc1Ny41MTgtMS4xMTUuNTU3LTQuMzQuNTU3aC0zLjUwNnY2Mi4xNzZoMy40NjVjMy45NDMgMCA0LjkuMzE4IDUuODE1IDEuOTUxIDEuMDM2IDEuODMzLjUxOCAzLjk0NC0xLjI3NSA1LjI1OC0uNjc3LjUxOC0uOTk1LjUxOC0xMS41MS41OThsLTEwLjgzNC4wOC0xLjExNi0uNTU4Yy0xLjE1NS0uNjM4LTIuMTktMi4xNS0yLjE5LTMuMzg2IDAtLjg3NS45OTUtMi42NjggMS43OTItMy4yNjUuNTk3LS40NzggMS4xMTUtLjUxOCA0LjM0Mi0uNTk4bDMuNjY0LS4wOFYxMi44OWwtMy42NjQtLjA4Yy0zLjIyNy0uMDgtMy43NDUtLjExOS00LjM0Mi0uNTk3LS43OTctLjU1OC0xLjc5Mi0yLjM1LTEuNzkyLTMuMjY2IDAtMS4yMzUuOTk1LTIuNzg4IDIuMTktMy4zODZ6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMTAiIG9wYWNpdHk9Ii4yNSIvPjxwYXRoIGQ9Im0yOS4yNzggNS4wMDUgMTAuODMyLjA0YzEwLjUxNi4wOCAxMC44MzQuMTIgMTEuNTExLjU5NiAyLjQzIDEuODcyIDIuMzkgNC45NC0uMTU5IDYuNjUyLS43NTcuNTE4LTEuMTE1LjU1Ny00LjM0LjU1N2gtMy41MDZ2NjIuMTc2aDMuNDY1YzMuOTQzIDAgNC45LjMxOCA1LjgxNSAxLjk1MSAxLjAzNiAxLjgzMy41MTggMy45NDQtMS4yNzUgNS4yNTgtLjY3Ny41MTgtLjk5NS41MTgtMTEuNTEuNTk4bC0xMC44MzQuMDgtMS4xMTYtLjU1OGMtMS4xNTUtLjYzOC0yLjE5LTIuMTUtMi4xOS0zLjM4NiAwLS44NzUuOTk1LTIuNjY4IDEuNzkyLTMuMjY1LjU5Ny0uNDc4IDEuMTE1LS41MTggNC4zNDItLjU5OGwzLjY2NC0uMDhWMTIuODlsLTMuNjY0LS4wOGMtMy4yMjctLjA4LTMuNzQ1LS4xMTktNC4zNDItLjU5Ny0uNzk3LS41NTgtMS43OTItMi4zNS0xLjc5Mi0zLjI2NiAwLTEuMjM1Ljk5NS0yLjc4OCAyLjE5LTMuMzg2eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==",
        color:
          "3NS41MzUiIGhlaWdodD0iNzEuNDk3IiB2aWV3Qm94PSIwIDAgNzUuNTM1IDcxLjQ5NyI+PHBhdGggZD0iTTIxLjMwNyAyMS40NjJDMjEuMzA3IDEyLjM3IDI4LjY3NyA1IDM3Ljc2OCA1czE2LjQ2MSA3LjM3IDE2LjQ2MSAxNi40NjItNy4zNyAxNi40NjEtMTYuNDYxIDE2LjQ2MS0xNi40NjEtNy4zNy0xNi40NjEtMTYuNDYxeiIgc3Ryb2tlPSIjMDAwIiBvcGFjaXR5PSIuMjUiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNNSA1MC4wMzZjMC05LjA5MSA3LjM3LTE2LjQ2MSAxNi40NjItMTYuNDYxczE2LjQ2MSA3LjM3IDE2LjQ2MSAxNi40NjFjMCA5LjA5Mi03LjM3IDE2LjQ2Mi0xNi40NjEgMTYuNDYyQzEyLjM3IDY2LjQ5OCA1IDU5LjEyOCA1IDUwLjAzNnoiIHN0cm9rZT0iIzAwMCIgb3BhY2l0eT0iLjI1IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTM3LjYxMyA1MC4wMzZjMC05LjA5MSA3LjM3LTE2LjQ2MSAxNi40NjEtMTYuNDYxIDkuMDkyIDAgMTYuNDYyIDcuMzcgMTYuNDYyIDE2LjQ2MSAwIDkuMDkyLTcuMzcgMTYuNDYyLTE2LjQ2MiAxNi40NjJzLTE2LjQ2MS03LjM3LTE2LjQ2MS0xNi40NjJ6IiBzdHJva2U9IiMwMDAiIG9wYWNpdHk9Ii4yNSIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0yMS4zMDcgMjEuNDYyQzIxLjMwNyAxMi4zNyAyOC42NzcgNSAzNy43NjggNXMxNi40NjEgNy4zNyAxNi40NjEgMTYuNDYyLTcuMzcgMTYuNDYxLTE2LjQ2MSAxNi40NjEtMTYuNDYxLTcuMzctMTYuNDYxLTE2LjQ2MSIgZmlsbD0iIzBmMCIvPjxwYXRoIGQ9Ik01IDUwLjAzNmMwLTkuMDkxIDcuMzctMTYuNDYxIDE2LjQ2Mi0xNi40NjFzMTYuNDYxIDcuMzcgMTYuNDYxIDE2LjQ2MWMwIDkuMDkyLTcuMzcgMTYuNDYyLTE2LjQ2MSAxNi40NjJDMTIuMzcgNjYuNDk4IDUgNTkuMTI4IDUgNTAuMDM2IiBmaWxsPSJyZWQiLz48cGF0aCBkPSJNMzcuNjEzIDUwLjAzNmMwLTkuMDkxIDcuMzctMTYuNDYxIDE2LjQ2MS0xNi40NjEgOS4wOTIgMCAxNi40NjIgNy4zNyAxNi40NjIgMTYuNDYxIDAgOS4wOTItNy4zNyAxNi40NjItMTYuNDYyIDE2LjQ2MnMtMTYuNDYxLTcuMzctMTYuNDYxLTE2LjQ2MiIgZmlsbD0iIzAwZiIvPjwvc3ZnPg==",
        effect:
          "1Ny40NDIiIGhlaWdodD0iNzAuNDUiIHZpZXdCb3g9IjAgMCA1Ny40NDIgNzAuNDUiPjxwYXRoIGQ9Ik01IDQ5LjA0N2MtMy45ODgtOC4xMTctMy45OTYtMTguMjQzLjE1My0yNi40MUM5Ljg0IDEzLjA2MiAxNy43MyA4LjgxOCAyMC45IDcuNDM4YTMxLjQgMzEuNCAwIDAgMSA2LjA3Ni0yLjA4M2wyLjEyLS40NTdjMS41NTgtLjMyIDMuMTEuNjQ2IDMuNDQ3IDIuMTg3LjM0IDEuNTQ1LS42NTEgMy4wNjYtMi4yMTYgMy40MDJsLTIuMDYzLjQ0NWEyNS40IDI1LjQgMCAwIDAtNC45NiAxLjcxNmMtMi4wODMuOTAyLTguOTc0IDQuMzkyLTEyLjk0OSAxMi41MTUtMy4wMTcgNS45MzMtMy45MTcgMTUuMzY2LjgzMiAyMy4xNSA0LjMwMyA3LjQ5OCAxMy4xMTIgMTIuMDk1IDIxLjQ2OCAxMS4zMjEgNy45MDMtLjU2OCAxNS4xNTUtNS44MjggMTcuNjk4LTEyLjc5NSAyLjU4MS02LjU1Mi44NjYtMTMuMjY5LTEuOTY3LTE3LjA1Mi0zLjQxMy00LjY2LTcuNjYtNi4wOTQtOS4zMjgtNi40OTUtLjI0OS0uMDc0LTYuMDg1LTEuODI3LTExLjI0Ljc1NC0yLjIyIDEuMDY0LTUuMDkgMy40NTYtNi42MjggNy4wNS0xLjY2IDMuNzEyLTEuMjMgOC40ODQgMS4wMiAxMS42NTUgMi4yNjMgMy4zOTkgNi41MzIgNS4zMjMgMTAuMjAzIDQuNjcgMy42NTUtLjU3NSA2LjEyNy0zLjI5NCA2LjcxMy01LjY4My42ODktMi41NjgtLjM2OC00LjczOS0xLjE5My01LjUyLTEuNDAxLTEuMzgzLTIuNjExLTEuNDA2LTIuNjYzLTEuNDFhNSA1IDAgMCAwLTEuMDI2LjA1NGMtLjY1NC4yNC0xLjU4Mi43NjQtMS44NTQgMS4zMTYtLjA0OC4wOS0uMTcuMzQuMDY0Ljk2My41NjMgMS40NzctLjE5NyAzLjEzLTEuNjk0IDMuNjg1LTEuNDkuNTU4LTMuMTY3LS4xOTItMy43MzMtMS42NzMtLjkzMS0yLjQ1LS40MTYtNC4zNjguMTgtNS41NDYgMS41NTgtMy4wNjYgNS4xNzYtNC4xNzYgNS41ODUtNC4yOTQuMTg3LS4wNTcuMzg1LS4wOTEuNTgtLjEwOC4zOTgtLjA2IDEuMS0uMTU1IDIuMDUyLS4xMTggMi4xNzguMDI3IDQuNjYgMS4xNjUgNi41NjMgMy4wNDYgMi4yNDYgMi4xMiA0LjAwNiA2LjM4IDIuNzU4IDExLjAxMS0xLjIxNyA0Ljk1Ny01Ljg5NSA5LjA1Ni0xMS4zNTMgOS45MTQtNS44NyAxLjA0Ny0xMi40ODItMS44NDctMTUuOTczLTcuMDk0LTMuMzY1LTQuNzI4LTQuMDA5LTExLjY0Ny0xLjU0OC0xNy4xMzYgMi43LTYuMzIgNy44NTktOS4xOCA5LjM3My05LjkwNyA3LjI3OS0zLjYzNSAxNS4wNTktMS4yMzUgMTUuMzg2LTEuMTM0IDIuMDkzLjQ5NCA3LjkxMyAyLjQ0MyAxMi40MzcgOC42MjUgMy40NzcgNC42NSA2LjI5NyAxMy4zMzcgMi43MTQgMjIuNDMtMy4yNzMgOC45NjItMTIuNTkgMTUuNzctMjIuNjM4IDE2LjQ5My0uNzg4LjA3NC0xLjU4NS4xMTUtMi4zOC4xMTUtOS43NSAwLTE5LjYyNy01LjYyLTI0LjU4LTE0LjI1IDAgMC0uODIxLTEuNDE4LTEuMTgzLTIuMTUzeiIgc3Ryb2tlPSIjMDAwIiBvcGFjaXR5PSIuMjUiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNi4xODIgNTEuMjAxYy01LjEzNC04LjQyLTUuNTUzLTE5LjY1Ny0xLjAzLTI4LjU2NUM5Ljg0IDEzLjA2MiAxNy43MyA4LjgxOCAyMC45IDcuNDM4YTMxLjQgMzEuNCAwIDAgMSA2LjA3Ni0yLjA4M2wyLjEyLS40NTdjMS41NTgtLjMyIDMuMTEuNjQ2IDMuNDQ3IDIuMTg3LjM0IDEuNTQ1LS42NTEgMy4wNjYtMi4yMTYgMy40MDJsLTIuMDYzLjQ0NWEyNS40IDI1LjQgMCAwIDAtNC45NiAxLjcxNmMtMi4wODMuOTAyLTguOTc0IDQuMzkyLTEyLjk0OSAxMi41MTUtMy4wMTcgNS45MzMtMy45MTcgMTUuMzY2LjgzMiAyMy4xNSA0LjMwMyA3LjQ5OCAxMy4xMTIgMTIuMDk1IDIxLjQ2OCAxMS4zMjEgNy45MDMtLjU2OCAxNS4xNTUtNS44MjggMTcuNjk4LTEyLjc5NSAyLjU4MS02LjU1Mi44NjYtMTMuMjY5LTEuOTY3LTE3LjA1Mi0zLjQxMy00LjY2LTcuNjYtNi4wOTQtOS4zMjgtNi40OTUtLjI0OS0uMDc0LTYuMDg1LTEuODI3LTExLjI0Ljc1NC0yLjIyIDEuMDY0LTUuMDkgMy40NTYtNi42MjggNy4wNS0xLjY2IDMuNzEyLTEuMjMgOC40ODQgMS4wMiAxMS42NTUgMi4yNjMgMy4zOTkgNi41MzIgNS4zMjMgMTAuMjAzIDQuNjcgMy42NTUtLjU3NSA2LjEyNy0zLjI5NCA2LjcxMy01LjY4My42ODktMi41NjgtLjM2OC00LjczOS0xLjE5My01LjUyLTEuNDAxLTEuMzgzLTIuNjExLTEuNDA2LTIuNjYzLTEuNDFhNSA1IDAgMCAwLTEuMDI2LjA1NGMtLjY1NC4yNC0xLjU4Mi43NjQtMS44NTQgMS4zMTYtLjA0OC4wOS0uMTcuMzQuMDY0Ljk2My41NjMgMS40NzctLjE5NyAzLjEzLTEuNjk0IDMuNjg1LTEuNDkuNTU4LTMuMTY3LS4xOTItMy43MzMtMS42NzMtLjkzMS0yLjQ1LS40MTYtNC4zNjguMTgtNS41NDYgMS41NTgtMy4wNjYgNS4xNzYtNC4xNzYgNS41ODUtNC4yOTQuMTg3LS4wNTcuMzg1LS4wOTEuNTgtLjEwOC4zOTgtLjA2IDEuMS0uMTU1IDIuMDUyLS4xMTggMi4xNzguMDI3IDQuNjYgMS4xNjUgNi41NjMgMy4wNDYgMi4yNDYgMi4xMiA0LjAwNiA2LjM4IDIuNzU4IDExLjAxMS0xLjIxNyA0Ljk1Ny01Ljg5NSA5LjA1Ni0xMS4zNTMgOS45MTQtNS44NyAxLjA0Ny0xMi40ODItMS44NDctMTUuOTczLTcuMDk0LTMuMzY1LTQuNzI4LTQuMDA5LTExLjY0Ny0xLjU0OC0xNy4xMzYgMi43LTYuMzIgNy44NTktOS4xOCA5LjM3My05LjkwNyA3LjI3OS0zLjYzNSAxNS4wNTktMS4yMzUgMTUuMzg2LTEuMTM0IDIuMDkzLjQ5NCA3LjkxMyAyLjQ0MyAxMi40MzcgOC42MjUgMy40NzcgNC42NSA2LjI5NyAxMy4zMzcgMi43MTQgMjIuNDMtMy4yNzMgOC45NjItMTIuNTkgMTUuNzctMjIuNjM4IDE2LjQ5My0uNzg4LjA3NC0xLjU4NS4xMTUtMi4zOC4xMTUtOS43NSAwLTE5LjYyNy01LjYyLTI0LjU4LTE0LjI1Ii8+PC9zdmc+",
      }[name]
    );
  };

  const Cast = Scratch.Cast;
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;
  const keyUtil = runtime.ioDevices.keyboard;

  const defaultFonts = [
    "Sans Serif",
    "Serif",
    "Handwriting",
    "Marker",
    "Curly",
    "Pixel",
    "Scratch",
  ];
  const translatedInputs = {
    popup: Scratch.translate("default-popup"),
    label: Scratch.translate("new-label"),
    input: Scratch.translate("new-input"),
    btnRow: Scratch.translate("default-button-row"),
    button: Scratch.translate("submit-button"),
  };

  const validInputs = [
    createMenuItem("text", "text"),
    createMenuItem("multi-line text", "textarea"),
    createMenuItem("password", "password"),
    createMenuItem("number", "number"),
    createMenuItem("color", "color"),
    createMenuItem("date", "date"),
    createMenuItem("dropdown", "select"),
    createMenuItem("multi-select dropdown", "multiSelect"),
    createMenuItem("horizontal slider", "rangeHorz"),
    createMenuItem("vertical slider", "rangeVert"),
  ];
  const validBorders = [
    createMenuItem("none", "none"),
    createMenuItem("solid", "solid"),
    createMenuItem("dotted", "dotted"),
    createMenuItem("dashed", "dashed"),
    createMenuItem("double", "double"),
    createMenuItem("groove", "groove"),
    createMenuItem("ridge", "ridge"),
    createMenuItem("inset", "inset"),
    createMenuItem("outset", "outset"),
  ];
  const validEffects = [
    createMenuItem("blur", "blur"),
    createMenuItem("brightness", "brightness"),
    createMenuItem("opacity", "opacity"),
    createMenuItem("saturation", "saturate"),
    createMenuItem("hue", "hue-rotate"),
    createMenuItem("invert", "invert"),
    createMenuItem("sepia", "sepia"),
    createMenuItem("contrast", "contrast"),
    createMenuItem("direction", "rotate"),
    createMenuItem("scale x", "scaleX"),
    createMenuItem("scale y", "scaleY"),
    createMenuItem("skew x", "skewX"),
    createMenuItem("skew y", "skewY"),
  ];

  // internals
  const styleStorage = {
    popups: Object.create(null),
    labels: Object.create(null),
    inputs: Object.create(null),
    buttons: Object.create(null),
  };
  const elementStorage = {
    popups: Object.create(null),
    labels: Object.create(null),
    inputs: Object.create(null),
    buttonRows: Object.create(null),
    buttons: Object.create(null),
  };

  const xmlEscape = function (unsafe) {
    return Cast.toString(unsafe).replace(new RegExp(`[<>&'"]`, "g"), (c) => {
      switch (c) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "'":
          return "&apos;";
        case '"':
          return "&quot;";
      }
    });
  };

  const createLabel = (id, text) => {
    const element = document.createElement("div");
    element.style.width = "max-content";
    const label = document.createElement("pre");
    label.id = xmlEscape(id);
    label.innerHTML = xmlEscape(text).replace(/\n/g, "<br>");
    label.setAttribute("style", compileStyles(id, "label"));

    element.appendChild(label);
    return {
      type: "label",
      data: { id, text },
      DOMelement: element,
    };
  };

  const createInput = (id, type, options) => {
    const inputHolder = document.createElement("div");
    inputHolder.id = xmlEscape(id);
    inputHolder.style.width = "max-content";
    let element;

    const setElementValue = (value) => {
      inputHolder.setAttribute("returnValue", JSON.stringify(value));
    };

    if (type === "select") {
      const selectors = options.selectors ?? ["no options created"];
      element = document.createElement("select");
      selectors.forEach((option) => {
        let opt = document.createElement("option");
        opt.value = option;
        opt.text = option;
        element.appendChild(opt);
      });

      element.addEventListener("focus", () => {
        options.menuOpened = true;
      });
      element.addEventListener("blur", () => {
        options.menuOpened = false;
      });
      element.addEventListener("change", (e) =>
        setElementValue([e.target.value])
      );
      setElementValue([selectors[0]]);
    } else if (type === "multiSelect") {
      const createOption = (text, index) => {
        const holder = document.createElement("div");
        holder.setAttribute(
          "style",
          "display: flex; padding: 5px; cursor: pointer"
        );

        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = index === 0 ? true : false;
        const label = document.createElement("pre");
        label.innerHTML = xmlEscape(text).replace(/\n/g, "<br>");
        label.setAttribute("style", "margin:0 0 0 5px; font-family: inherit;");

        holder.append(check, label);
        return holder;
      };

      const selectors = options.selectors ?? ["no options created"];
      let response = [selectors[0]];
      options.menuOpened = true;

      element = document.createElement("div");
      const optionsDiv = document.createElement("div");
      optionsDiv.setAttribute(
        "style",
        "overflow-y: scroll; height: calc(100% - 1px);"
      );
      element.appendChild(optionsDiv);

      setElementValue(response);
      for (let i = 0; i < selectors.length; i++) {
        const option = createOption(selectors[i], i);
        optionsDiv.appendChild(option);

        option.addEventListener("click", (e) => {
          if (e.target.tagName === "PRE")
            e.target.parentNode.querySelector("input").click();
          else if (e.target.tagName === "INPUT") {
            if (e.target.checked) response.push(selectors[i]);
            else response.splice(response.indexOf(selectors[i]), 1);
            setElementValue(response);
          }
          e.stopPropagation();
        });
      }
    } else if (type === "textarea") {
      element = document.createElement("textarea");
      element.value = options.defaultValue ?? "";
    } else if (type.startsWith("range")) {
      element = document.createElement("div");

      const counter = document.createElement("div");
      counter.setAttribute("style", "text-align: center");
      counter.innerText = options.defaultValue ?? 0;

      const range = document.createElement("input");
      range.setAttribute("style", "display: block; margin: auto;");
      range.type = "range";
      if (type.endsWith("Vert")) range.style.writingMode = "sideways-lr";

      range.setAttribute("max", options.maxV ?? 100);
      range.setAttribute("min", options.minV ?? 0);
      range.value = options.defaultValue ?? 0;
      range.addEventListener("input", (e) => {
        const value = e.target.value;
        setElementValue([value]);
        counter.innerText = value;
      });

      element.append(range, counter);
      setElementValue([counter.innerText]);
    } else {
      element = document.createElement("input");
      element.type = type;
      element.value = options.defaultValue ?? "";

      if (type === "color") {
        inputHolder.setAttribute(
          "style",
          "display: flex; justify-content: center; width: 100%;"
        );
        const colorStyle = document.createElement("style");
        colorStyle.textContent = `
          input[type="color"] {
            cursor: pointer;
          }
          input[type="color"]::-webkit-color-swatch {
            border: black solid 1px;
            margin: 1px;
            border-radius: 5px;
          }
          input[type="color"]::-moz-color-swatch {
            border: black solid 1px;
            margin: 1px;
            border-radius: 5px;
          }
          input[type="color"]::-webkit-color-swatch-wrapper {
            padding: 0px;
          }
        `;
        element.append(colorStyle);
      }
    }

    element.setAttribute("style", compileStyles(id, "input"));
    inputHolder.appendChild(element);
    return {
      type: "input",
      data: { id, type, options },
      DOMelement: inputHolder,
    };
  };

  const createButtonRow = (id) => {
    const buttonRow = document.createElement("div");
    buttonRow.id = xmlEscape(id);
    buttonRow.style.width = "max-content";

    return {
      type: "buttonRow",
      data: { id, buttons: [] },
      DOMelement: buttonRow,
    };
  };

  const createButton = (id, text) => {
    const element = document.createElement("button");
    element.id = xmlEscape(id);
    element.innerHTML = xmlEscape(text).replace(/\n/g, "<br>");
    element.setAttribute("returnValue", id);
    element.setAttribute("style", compileStyles(id, "button"));

    return {
      type: "button",
      data: { id, text },
      DOMelement: element,
    };
  };

  const genDefaultStyles = (id, type) => {
    if (type.endsWith("s")) type = type.substring(0, type.length - 1);
    if (type === "popup") {
      styleStorage.popups[id] = {
        SPstorage: {},
        display: "flex",
        "flex-direction": "column",
        position: "absolute",
        "pointer-events": "auto",
        transform: "translate(-50%, -50%)",
        filter: "",
        left: "calc(50% + 0px)",
        top: "calc(50% + 0px)",
        width: "max-content",
        height: "auto",
        padding: "15px",
        background: "#fff",
        "box-shadow": "#000 0px 0px 5px",
        border: "1px none #000",
        "border-radius": "5px",
      };
    } else if (type === "label") {
      styleStorage.labels[id] = {
        SPstorage: {},
        "font-size": "14px",
        "font-family": "Sans Serif",
        margin: "5px",
        color: "#000",
        "text-shadow": "none",
        "-webkit-text-stroke-width": "0px",
        transform: "",
        filter: "",
      };
    } else if (type === "input") {
      styleStorage.inputs[id] = {
        SPstorage: {},
        width: "max-content",
        height: "auto",
        margin: "5px",
        padding: "5px",
        border: "1px solid #000",
        "border-radius": "4px",
        "text-align": "left",
        "font-size": "14px",
        "font-family": "Sans Serif",
        background: "#a5aec3",
        "accent-color": "#9f50d9",
        color: "#000",
        "text-shadow": "none",
        "-webkit-text-stroke-width": "0px",
        transform: "",
        filter: "",
      };
    } else if (type === "button") {
      styleStorage.buttons[id] = {
        SPstorage: {},
        width: "auto",
        height: "auto",
        cursor: "pointer",
        margin: "5px",
        padding: "5px 10px",
        "border-radius": "5px",
        border: "1px none #fff",
        background: "#0074d9",
        "font-size": "14px",
        "font-family": "Sans Serif",
        color: "#fff",
        "text-shadow": "none",
        "-webkit-text-stroke-width": "0px",
        transform: "",
        filter: "",
      };
    }
    return styleStorage[type + "s"][id];
  };

  const genDefaultBox = (id, optEmptyElements) => {
    genDefaultStyles(id, "popup");
    const defaultElements = [];
    let submitBtn, cancelBtn;
    if (!optEmptyElements) {
      defaultElements.push(
        createLabel("default-label", Scratch.translate("Whats Your Name?"))
      );
      defaultElements.push(
        createInput("default-input", "text", {
          defaultValue: Scratch.translate("...type your name"),
        })
      );

      const buttonRow = createButtonRow("default-button-row");
      submitBtn = createButton("submit-button", Scratch.translate("Submit"));
      cancelBtn = createButton("cancel-button", Scratch.translate("Cancel"));
      buttonRow.data.buttons.push(submitBtn.data, cancelBtn.data);
      buttonRow.DOMelement.append(submitBtn.DOMelement, cancelBtn.DOMelement);
      defaultElements.push(buttonRow);
    }

    const defaultBox = {
      waiting: false,
      isWindowed: false,
      focused: false,
      autoControl: true,
      forceKey: undefined,
      lastBtnPressed: undefined,
      value: undefined,
      DOMelement: undefined,
      elements: defaultElements,
    };
    if (!optEmptyElements) {
      elementStorage.labels["default-label"] = defaultElements[0];
      elementStorage.inputs["default-input"] = defaultElements[1];
      elementStorage.buttons["submit-button"] = submitBtn;
      elementStorage.buttons["cancel-button"] = cancelBtn;
      elementStorage.buttonRows["default-button-row"] = defaultElements[2];
    }
    elementStorage.popups[id] = defaultBox;
    return defaultBox;
  };

  // popup box GUI
  const compileStyles = (id, type) => {
    const boxInfo = elementStorage[type + "s"][id];
    const styleObj = styleStorage[type + "s"][id] ?? genDefaultStyles(id, type);
    if (type === "input" && boxInfo?.data.type === "color") {
      // color inputs with these options look weird
      if (styleObj["width"] === "max-content") styleObj["width"] = "80%";
      if (styleObj["height"] === "auto") styleObj["height"] = "30px";
    }

    let styleString = "";
    Object.entries(styleObj).forEach((style) => {
      styleString += `${style[0]}: ${style[1]};`;
    });
    return styleString;
  };

  const compileBox = (id) => {
    const boxInfo = elementStorage.popups[id];
    boxInfo.waiting = true;
    let boxInputs = [];

    const popupContainer = document.createElement("div");
    popupContainer.setAttribute(
      "style",
      "position: fixed; width: 100%; height: 100%;"
    );
    popupContainer.style.pointerEvents = boxInfo.focused ? "auto" : "none";
    if (boxInfo.focused)
      popupContainer.style.backgroundColor = "rgba(0,0,0,0.5)";
    if (boxInfo.isWindowed) popupContainer.style.zIndex = "9999";
    else {
      popupContainer.style.left = "-50%";
      popupContainer.style.top = "-50%";
    }

    const popupPanel = document.createElement("div");
    popupPanel.classList.add("SP-Popup-Box");
    popupPanel.id = xmlEscape(id);
    popupPanel.setAttribute("style", compileStyles(id, "popup"));

    // various element utils
    const handleClose = (event) => {
      // if theres no input, set the value to the button name
      if (event)
        boxInfo.lastBtnPressed = event.target.getAttribute("returnValue");
      if (boxInputs.length === 0) boxInfo.value = boxInfo.lastBtnPressed ?? "";
      else compileInputValues();
      runtime.off("KEY_PRESSED", forceKeyHandler);
      closeBox(id);
    };
    const forceKeyHandler = (key) => {
      if (boxInfo.forceKey === "shiftEnter") {
        if (key === "enter" && runtime.ioDevices.keyboard.getKeyIsDown("shift"))
          handleClose();
        return;
      }
      if (key.toLowerCase() == boxInfo.forceKey.toLowerCase()) handleClose();
    };

    const compileInputValues = () => {
      if (boxInputs.length === 0) boxInfo.value = "";
      else if (boxInputs.length === 1) {
        const input = boxInputs[0];
        const element = input.DOMelement;

        const returnValue = element.getAttribute("returnValue");
        boxInfo.value = returnValue
          ? JSON.parse(returnValue)
          : element.firstChild.value;
      } else {
        boxInfo.value = Object.create(null);
        for (let i = 0; i < boxInputs.length; i++) {
          const input = boxInputs[i];
          const element = input.DOMelement;

          const returnValue = element.getAttribute("returnValue");
          boxInfo.value[input.data.id] = returnValue
            ? JSON.parse(returnValue)
            : element.firstChild.value;
        }
      }
    };

    // append elements to panel
    for (let i = 0; i < boxInfo.elements.length; i++) {
      const item = boxInfo.elements[i];
      let element = item.DOMelement;
      if (item.type === "label") {
        const refreshedLabel = elementStorage.labels[item.data.id];
        element = refreshedLabel.DOMelement;
      } else if (item.type === "input") {
        boxInputs.push(item);

        const refreshedInput = elementStorage.inputs[item.data.id];
        if (!refreshedInput) continue;
        const recentData = refreshedInput.data;
        element = createInput(
          recentData.id,
          recentData.type,
          recentData.options
        ).DOMelement;
        item.DOMelement = element;
      }
      popupPanel.appendChild(element);

      // add event listeners
      if (item.type === "input") {
        element.addEventListener("change", compileInputValues);
        if (boxInfo.forceKey !== undefined)
          element.addEventListener("keydown", (e) => {
            if (boxInfo.forceKey === keyUtil._keyStringToScratchKey(e.key)) {
              handleClose();
              e.preventDefault();
            }
          });
      } else if (item.type === "buttonRow") {
        element.addEventListener("click", (e) => {
          if (e.target.tagName === "BUTTON") handleClose(e);
          e.stopPropagation();
        });
      }
    }

    popupContainer.appendChild(popupPanel);
    if (boxInfo.isWindowed) document.body.appendChild(popupContainer);
    else render.addOverlay(popupContainer, "scale-centered");
    compileInputValues();
    boxInfo.DOMelement = popupContainer;

    // extra event listeners
    if (boxInfo.forceKey !== undefined)
      runtime.on("KEY_PRESSED", forceKeyHandler);
  };

  const closeBox = (id, optForce) => {
    const boxInfo = elementStorage.popups[id];
    boxInfo.waiting = false;

    if (optForce || boxInfo.autoControl) {
      if (boxInfo.isWindowed) boxInfo.DOMelement?.remove();
      else render.removeOverlay(boxInfo.DOMelement);
      boxInfo.DOMelement = undefined;
    }
  };

  const updateBoxVisuals = (id, type) => {
    const boxInfo = elementStorage[type][id];
    if (!boxInfo || !boxInfo.DOMelement) return;
    const element =
      type === "buttons" ? boxInfo.DOMelement : boxInfo.DOMelement.firstChild;
    element.setAttribute(
      "style",
      compileStyles(id, type.slice(0, type.length - 1))
    );
  };

  // extension utilities
  function createBlockLabel(text) {
    return {
      blockType: Scratch.BlockType.LABEL,
      text: Scratch.translate(text),
    };
  }

  function createMenuItem(text, value) {
    return {
      text: Scratch.translate(text),
      value,
    };
  }

  genDefaultBox("default-popup", false);

  class SPpopups {
    constructor() {
      runtime.on("PROJECT_START", () => this.removeAllPopups());
      runtime.on("PROJECT_STOP_ALL", () => this.removeAllPopups());
    }
    getInfo() {
      return {
        id: "SPpopups",
        name: Scratch.translate("Popup Phoenix"),
        color1: "#a812ff",
        color2: "#941cd9",
        color3: "#8219bf",
        menuIconURI,
        blockIconURI: getBlockIcon("main"),
        blocks: [
          {
            opcode: "showPopup",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show popup with ID [ID] and [TYPE]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "AWAITS" },
            },
          },
          {
            opcode: "showPopupReport",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("show popup with ID [ID] and wait"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          {
            opcode: "userInput",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("response from [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          "---",
          {
            opcode: "removePopup",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove popup with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          {
            opcode: "removeAllPopups",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove all popups"),
          },
          createBlockLabel("Popups"),
          {
            opcode: "createPopup",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create new popup with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("new-popup"),
              },
            },
          },
          {
            opcode: "deletePopup",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete popup with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          "---",
          {
            opcode: "append2Popup",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "append [TYPE] with ID [ELEMENT_ID] to popup [POP_ID]"
            ),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "UI_ELEMENTS" },
              ELEMENT_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.label,
              },
              POP_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          {
            opcode: "removeFromPopup",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "remove [TYPE] with ID [ELEMENT_ID] from popup [POP_ID]"
            ),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "UI_ELEMENTS" },
              ELEMENT_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.label,
              },
              POP_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          {
            opcode: "removePopupContent",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove all elements from popup [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          "---",
          {
            opcode: "setPopupPos",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set position of [ID] to x: [X] y: [Y]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
              X: { type: Scratch.ArgumentType.NUMBER },
              Y: { type: Scratch.ArgumentType.NUMBER },
            },
          },
          {
            opcode: "getPos",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[TYPE] position of [ID]"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "POSITION" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          createBlockLabel("Labels"),
          {
            opcode: "createPopLabel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "create new label with ID [ID] and text [TEXT]"
            ),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.label,
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("whats your name?"),
              },
            },
          },
          {
            opcode: "deletePopLabel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete label with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.label,
              },
            },
          },
          createBlockLabel("Inputs"),
          {
            opcode: "createPopInput",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create new [TYPE] input with ID [ID]"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "INPUTS" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.input,
              },
            },
          },
          {
            opcode: "deletePopInput",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete input with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.input,
              },
            },
          },
          "---",
          {
            opcode: "setDefaultValue",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set default value of input [ID] to [VALUE]"
            ),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.input,
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(`...type here`),
              },
            },
          },
          "---",
          {
            opcode: "setSliderParams",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set slider [ID] min [MIN] max [MAX]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.input,
              },
              MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          "---",
          {
            opcode: "setDropOptions",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set options of dropdown [ID] to [ARRAY]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.input,
              },
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(
                  `["Option 1", "Option 2", "Option 3"]`
                ),
              },
            },
          },
          {
            opcode: "isDropOpen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate(
              "is dropdown [DROP_ID] in popup [POP_ID] open?"
            ),
            arguments: {
              DROP_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.input,
              },
              POP_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          createBlockLabel("Buttons"),
          {
            opcode: "createBtnRow",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create new button row with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.btnRow,
              },
            },
          },
          {
            opcode: "createPopBtn",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "create new button with ID [ID] and text [TEXT]"
            ),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.button,
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Submit"),
              },
            },
          },
          {
            opcode: "deleteBtnRow",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete button row with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.btnRow,
              },
            },
          },
          {
            opcode: "deletePopBtn",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete button with ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.button,
              },
            },
          },
          "---",
          {
            opcode: "append2Row",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("append button [BTN_ID] to row [ROW_ID]"),
            arguments: {
              BTN_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.button,
              },
              ROW_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.btnRow,
              },
            },
          },
          {
            opcode: "removeFromRow",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove button [BTN_ID] from row [ROW_ID]"),
            arguments: {
              BTN_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.button,
              },
              ROW_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.btnRow,
              },
            },
          },
          {
            opcode: "removeRowContent",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove all buttons from row [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.btnRow,
              },
            },
          },
          createBlockLabel("Operators"),
          {
            opcode: "allElements",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all [TYPE] IDs"),
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "UI_SELECT" },
            },
          },
          {
            opcode: "popupWaiting",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is popup [ID] waiting?"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          {
            opcode: "lastButtonPress",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last button pressed in [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          "---",
          {
            opcode: "setPopupTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "show next popup with ID [ID] on the [TYPE]"
            ),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "POPUP_LOCATION",
              },
            },
          },
          {
            opcode: "toggleOption",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("toggle [OPTION] in popup [ID] [TYPE]"),
            arguments: {
              OPTION: { type: Scratch.ArgumentType.STRING, menu: "EXTRA_OPTS" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLER" },
            },
          },
          {
            opcode: "setForceClose",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set auto-close action in popup [ID] to [KEY] key"
            ),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
              KEY: { type: Scratch.ArgumentType.STRING, menu: "FORCE_KEY" },
            },
          },
          createBlockLabel("Customization"),
          {
            opcode: "setPopupAlign",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: getBlockIcon("color"),
            text: Scratch.translate("set alignment of popup [ID] to [TYPE]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ALIGNMENT" },
            },
          },
          {
            opcode: "setInputAlign",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: getBlockIcon("color"),
            text: Scratch.translate("set alignment of input [ID] to [TYPE]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.input,
              },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ALIGNMENT" },
            },
          },
          "---",
          {
            opcode: "setInputFont",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: getBlockIcon("color"),
            text: Scratch.translate("set font of [ELEMENT] [ID] to [FONT]"),
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "UI_MAIN2" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.label,
              },
              FONT: { type: Scratch.ArgumentType.STRING, menu: "FONTS" },
            },
          },
          {
            opcode: "setInputFontSZ",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: getBlockIcon("color"),
            text: Scratch.translate(
              "set font size of [ELEMENT] [ID] to [SIZE]"
            ),
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "UI_MAIN2" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.label,
              },
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
            },
          },
          {
            opcode: "setElementOutline",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: getBlockIcon("color"),
            text: Scratch.translate(
              "set text outline of [ELEMENT] [ID] to color [COLOR] weight [WEIGHT]"
            ),
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "UI_MAIN2" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.label,
              },
              COLOR: { type: Scratch.ArgumentType.COLOR },
              WEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          "---",
          {
            opcode: "setElementAtt",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: getBlockIcon("color"),
            text: Scratch.translate("set [PARAM] of [ELEMENT] [ID] to [VALUE]"),
            arguments: {
              PARAM: { type: Scratch.ArgumentType.STRING, menu: "POP_STYLES" },
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "UI_MAIN" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "#ff0000",
              },
            },
          },
          {
            opcode: "setElementBorder",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: getBlockIcon("color"),
            text: Scratch.translate(
              "set border of [ELEMENT] [ID] to [TYPE] [COLOR] weight [WEIGHT]"
            ),
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "UI_MAIN" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "BORDERS" },
              COLOR: { type: Scratch.ArgumentType.COLOR },
              WEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          {
            opcode: "setElementShadow",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: getBlockIcon("color"),
            text: Scratch.translate(
              "set shadow of [ELEMENT] [ID] to x: [X] y: [Y] color [COLOR] blur [AMT] strength [BLUR]"
            ),
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "UI_MAIN" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
              X: { type: Scratch.ArgumentType.NUMBER },
              Y: { type: Scratch.ArgumentType.NUMBER },
              COLOR: { type: Scratch.ArgumentType.COLOR },
              AMT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              BLUR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          "---",
          {
            opcode: "resetElementEffect",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: getBlockIcon("effect"),
            text: Scratch.translate("reset effects of [ELEMENT] [ID]"),
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "UI_MAIN" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
          {
            opcode: "setElementEffect",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: getBlockIcon("effect"),
            text: Scratch.translate(
              "set [EFFECT] of [ELEMENT] [ID] to [VALUE]"
            ),
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "UI_MAIN" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          {
            opcode: "getElementEffect",
            blockType: Scratch.BlockType.REPORTER,
            blockIconURI: getBlockIcon("effect"),
            text: Scratch.translate("[EFFECT] of [ELEMENT] [ID]"),
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "UI_MAIN" },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: translatedInputs.popup,
              },
            },
          },
        ],
        menus: {
          FONTS: { acceptReporters: true, items: "getFonts" },
          POP_STYLES: {
            acceptReporters: true,
            items: this.genStyleList("popup"),
          },
          LAB_STYLES: {
            acceptReporters: true,
            items: this.genStyleList("label"),
          },
          INP_STYLES: {
            acceptReporters: true,
            items: this.genStyleList("input"),
          },
          BUT_STYLES: {
            acceptReporters: true,
            items: this.genStyleList("button"),
          },
          INPUTS: { acceptReporters: true, items: validInputs },
          BORDERS: { acceptReporters: true, items: validBorders },
          EFFECTS: { acceptReporters: true, items: validEffects },
          UI_ELEMENTS: {
            acceptReporters: true,
            items: this.genElementList(false, true, false),
          },
          UI_MAIN: {
            acceptReporters: true,
            items: this.genElementList(true, false, true),
          },
          UI_MAIN2: {
            acceptReporters: true,
            items: this.genElementList(false, false, true),
          },
          UI_SELECT: {
            acceptReporters: true,
            items: this.genElementList(true, true, true),
          },
          AWAITS: {
            acceptReporters: false,
            items: [
              createMenuItem("wait", "wait"),
              createMenuItem("continue", "continue"),
            ],
          },
          TOGGLER: {
            acceptReporters: false,
            items: [createMenuItem("on", "on"), createMenuItem("off", "off")],
          },
          POSITION: {
            acceptReporters: false,
            items: [createMenuItem("x", "x"), createMenuItem("y", "y")],
          },
          POPUP_LOCATION: {
            acceptReporters: false,
            items: [
              createMenuItem("window", "window"),
              createMenuItem("canvas", "canvas"),
            ],
          },
          ALIGNMENT: {
            acceptReporters: false,
            items: [
              createMenuItem("left", "left"),
              createMenuItem("right", "flex-end"),
              createMenuItem("center", "center"),
            ],
          },
          FORCE_KEY: {
            acceptReporters: true,
            items: [
              createMenuItem("none", "none"),
              createMenuItem("enter", "enter"),
              createMenuItem("shift & enter", "shiftEnter"),
            ],
          },
          EXTRA_OPTS: {
            acceptReporters: true,
            items: [
              createMenuItem("focus mode", "focus"),
              createMenuItem("auto close", "autoClose"),
            ],
          },
        },
      };
    }

    // Helper Funcs
    getFonts() {
      const custFonts = runtime.fontManager
        ? runtime.fontManager
            .getFonts()
            .map((i) => ({ text: i.name, value: i.family }))
        : [];
      return [...defaultFonts, ...custFonts];
    }

    genElementList(addPopup, addRow, addButton) {
      const list = [];
      if (addPopup) list.push(createMenuItem("popup", "popup"));
      list.push(
        createMenuItem("label", "label"),
        createMenuItem("input", "input")
      );
      if (addRow) list.push(createMenuItem("button row", "buttonRow"));
      if (addButton) list.push(createMenuItem("button", "button"));
      return list;
    }

    genStyleList() {
      return [
        createMenuItem("background color", "background"),
        createMenuItem("text color", "color"),
        createMenuItem("accent color", "accent-color"),
        createMenuItem("margins", "margin"),
        createMenuItem("padding", "padding"),
        createMenuItem("width", "width"),
        createMenuItem("height", "height"),
        createMenuItem("border radius", "border-radius"),
      ];
    }

    getElementPath(path, useBtn, usePopup) {
      const validPaths = ["label", "input", useBtn ? "button" : "buttonRow"];
      if (usePopup) validPaths.push("popup");
      return validPaths.includes(path) ? path : "label";
    }

    openPopupHandler(args, util, reportResponse) {
      const id = Cast.toString(args.ID);
      let popup = elementStorage.popups[id];
      if (!util.stackFrame.awaitingInput) {
        if (popup === undefined) popup = genDefaultBox(id, false);
        if (popup.DOMelement) closeBox(id, true);
        compileBox(id);
        util.stackFrame.awaitingInput = true;
      }

      if ((reportResponse ? true : args.TYPE === "wait") && popup?.waiting)
        util.yield();
      if (reportResponse)
        return typeof popup.value === "object"
          ? JSON.stringify(popup.value)
          : popup.value || "";
    }

    // Block Funcs
    /* main */
    showPopup(args, util) {
      this.openPopupHandler(args, util, false);
    }

    showPopupReport(args, util) {
      return this.openPopupHandler(args, util, true);
    }

    userInput(args) {
      const id = Cast.toString(args.ID);
      const popup = elementStorage.popups[id];
      if (popup === undefined) return "";
      return typeof popup.value === "object"
        ? JSON.stringify(popup.value)
        : popup.value || "";
    }

    removePopup(args) {
      const id = Cast.toString(args.ID);
      const popup = elementStorage.popups[id];
      if (popup !== undefined && popup.DOMelement) closeBox(id, true);
    }

    removeAllPopups() {
      const allPopups = Object.entries(elementStorage.popups);
      for (let i = 0; i < allPopups.length; i++) {
        const entry = allPopups[i];
        if (entry[1].DOMelement) closeBox(entry[0], true);
      }
    }

    /* popups */
    createPopup(args) {
      this.removePopup(args);
      const id = Cast.toString(args.ID);
      genDefaultBox(id, true);
    }

    deletePopup(args) {
      this.removePopup(args);
      const id = Cast.toString(args.ID);
      delete styleStorage.popups[id];
      delete elementStorage.popups[id];
    }

    append2Popup(args) {
      const popup = elementStorage.popups[Cast.toString(args.POP_ID)];
      const path = this.getElementPath(Cast.toString(args.TYPE));
      const elementID = Cast.toString(args.ELEMENT_ID);
      const element = elementStorage[path + "s"][elementID];
      if (popup === undefined || element === undefined) return;

      const elementIndex = popup.elements.findIndex((i) => {
        return i.type === path && i.data.id === elementID;
      });
      if (elementIndex === -1) popup.elements.push(element);
    }

    removeFromPopup(args) {
      const popup = elementStorage.popups[Cast.toString(args.POP_ID)];
      const path = this.getElementPath(Cast.toString(args.TYPE));
      const elementID = Cast.toString(args.ELEMENT_ID);
      if (popup === undefined) return;

      const elementIndex = popup.elements.findIndex((i) => {
        return i.type === path && i.data.id === elementID;
      });
      if (elementIndex > -1) popup.elements.splice(elementIndex, 1);
    }

    removePopupContent(args) {
      const id = Cast.toString(args.ID);
      const popup = elementStorage.popups[id];
      if (popup !== undefined) popup.elements = [];
    }

    setPopupPos(args) {
      const id = Cast.toString(args.ID);
      const styles = styleStorage.popups[id] ?? genDefaultStyles(id, "popup");
      styles.left = `calc(50% + ${Cast.toNumber(args.X)}px)`;
      styles.top = `calc(50% + ${Cast.toNumber(args.Y) * -1}px)`;
      updateBoxVisuals(id, "popups");
    }

    getPos(args) {
      const id = Cast.toString(args.ID);
      const styles = styleStorage.popups[id] ?? genDefaultStyles(id, "popup");
      if (args.TYPE === "x")
        return parseFloat(styles.left.replace("calc(50% + ", ""));
      else return parseFloat(styles.top.replace("calc(50% + ", "")) * -1;
    }

    /* labels */
    createPopLabel(args) {
      const id = Cast.toString(args.ID);
      const text = Cast.toString(args.TEXT);
      elementStorage.labels[id] = createLabel(id, text);
    }

    deletePopLabel(args) {
      const id = Cast.toString(args.ID);
      delete styleStorage.labels[id];
      delete elementStorage.labels[id];
    }

    /* inputs */
    createPopInput(args) {
      const id = Cast.toString(args.ID);
      let type = Cast.toString(args.TYPE);

      const isValidInput = validInputs.findIndex((i) => {
        return i.value === type;
      });
      if (isValidInput === -1) type = "text";
      elementStorage.inputs[id] = createInput(id, type, {});
    }

    deletePopInput(args) {
      const id = Cast.toString(args.ID);
      delete styleStorage.inputs[id];
      delete elementStorage.inputs[id];
    }

    setDefaultValue(args) {
      const input = elementStorage.inputs[Cast.toString(args.ID)];
      if (input) input.data.options.defaultValue = Cast.toString(args.VALUE);
    }

    setSliderParams(args) {
      const input = elementStorage.inputs[Cast.toString(args.ID)];
      if (input) {
        input.data.options.minV = Cast.toNumber(args.MIN);
        input.data.options.maxV = Cast.toNumber(args.MAX);
      }
    }

    setDropOptions(args) {
      try {
        const array = JSON.parse(args.ARRAY);
        if (array.length === 0) array.push("no options created");
        const id = Cast.toString(args.ID);
        const input = elementStorage.inputs[id];
        if (input) input.data.options.selectors = array;
      } catch {
        console.warn("Failed to set Dropdown Options, invalid Array!");
      }
    }

    isDropOpen(args) {
      const popup = elementStorage.popups[Cast.toString(args.POP_ID)];
      const dropID = Cast.toString(args.DROP_ID);
      if (popup === undefined || !popup.waiting) return false;
      const dropdown = popup.elements.find((e) => {
        return e.type === "input" && e.data.id === dropID;
      });
      if (dropdown) return dropdown.data.options.menuOpened ?? false;
      return false;
    }

    /* buttons */
    createBtnRow(args) {
      const id = Cast.toString(args.ID);
      elementStorage.buttonRows[id] = createButtonRow(id);
    }

    createPopBtn(args) {
      const id = Cast.toString(args.ID);
      const text = Cast.toString(args.TEXT);
      elementStorage.buttons[id] = createButton(id, text);
    }

    deleteBtnRow(args) {
      const id = Cast.toString(args.ID);
      delete elementStorage.buttonRows[id];
    }

    deletePopBtn(args) {
      const id = Cast.toString(args.ID);
      delete styleStorage.buttons[id];
      delete elementStorage.buttons[id];
    }

    append2Row(args) {
      const btn = elementStorage.buttons[Cast.toString(args.BTN_ID)];
      const row = elementStorage.buttonRows[Cast.toString(args.ROW_ID)];
      if (row === undefined || btn === undefined) return;

      const btnList = row.data.buttons;
      const btnIndex = btnList.findIndex((i) => {
        return i.id === btn.data.id;
      });
      if (btnIndex > -1) return;
      btnList.push(btn.data);
      row.DOMelement.appendChild(btn.DOMelement);
    }

    removeFromRow(args) {
      const btn = elementStorage.buttons[Cast.toString(args.BTN_ID)];
      const row = elementStorage.buttonRows[Cast.toString(args.ROW_ID)];
      if (row === undefined || btn === undefined) return;

      const btnList = row.data.buttons;
      const btnIndex = btnList.findIndex((i) => {
        return i.id === btn.data.id;
      });
      if (btnIndex === -1) return;
      btnList.splice(btnIndex, 1);
      row.DOMelement.children[btnIndex].remove();
    }

    removeRowContent(args) {
      const row = elementStorage.buttonRows[Cast.toString(args.ID)];
      if (row === undefined) return;

      Array.from(row.DOMelement.children).forEach((button) => button.remove());
      row.data.buttons = [];
    }

    /* operations */
    allElements(args) {
      const namespace = Cast.toString(args.TYPE) + "s";
      const items = elementStorage[namespace];
      if (!items) return "[]";
      else return JSON.stringify(Object.keys(items));
    }

    popupWaiting(args) {
      const id = Cast.toString(args.ID);
      let popup = elementStorage.popups[id];
      if (popup === undefined) return false;
      return popup.waiting;
    }

    lastButtonPress(args) {
      const id = Cast.toString(args.ID);
      let popup = elementStorage.popups[id];
      if (popup === undefined) return "";
      return popup.lastBtnPressed ?? "";
    }

    setPopupTarget(args) {
      const id = Cast.toString(args.ID);
      let popup = elementStorage.popups[id];
      if (popup === undefined) return;
      popup.isWindowed = args.TYPE === "window";
    }

    toggleOption(args) {
      const id = Cast.toString(args.ID);
      let popup = elementStorage.popups[id];
      if (popup === undefined) return;

      const option = Cast.toString(args.OPTION);
      popup[option === "focus" ? "focused" : "autoControl"] =
        args.TYPE === "on";
    }

    setForceClose(args) {
      const id = Cast.toString(args.ID);
      let popup = elementStorage.popups[id];
      if (popup === undefined) return;

      const key = Cast.toString(args.KEY);
      popup.forceKey = key === "none" ? undefined : key;
    }

    /* customization */
    setPopupAlign(args) {
      const id = Cast.toString(args.ID);
      const styles = styleStorage.popups[id] ?? genDefaultStyles(id, "popup");
      styles["align-items"] = args.TYPE;
      styles["justify-content"] = args.TYPE;
      updateBoxVisuals(id, "popups");
    }

    setInputAlign(args) {
      const id = Cast.toString(args.ID);
      const styles = styleStorage.inputs[id] ?? genDefaultStyles(id, "input");
      styles["text-align"] = args.TYPE === "flex-end" ? "right" : args.TYPE;
      updateBoxVisuals(id, "inputs");
    }

    setInputFont(args) {
      const id = Cast.toString(args.ID);
      const path = this.getElementPath(Cast.toString(args.ELEMENT), true) + "s";
      const styles = styleStorage[path][id] ?? genDefaultStyles(id, path);
      styles["font-family"] = Cast.toString(args.FONT);
      updateBoxVisuals(id, path);
    }

    setInputFontSZ(args) {
      const id = Cast.toString(args.ID);
      const path = this.getElementPath(Cast.toString(args.ELEMENT), true) + "s";
      const styles = styleStorage[path][id] ?? genDefaultStyles(id, path);
      styles["font-size"] = `${Cast.toNumber(args.SIZE)}px`;
      updateBoxVisuals(id, path);
    }

    setElementOutline(args) {
      const id = Cast.toString(args.ID);
      const path = this.getElementPath(Cast.toString(args.ELEMENT), true) + "s";
      const styles = styleStorage[path][id] ?? genDefaultStyles(id, path);
      styles["-webkit-text-stroke-width"] = `${Cast.toNumber(args.WEIGHT)}px`;
      styles["-webkit-text-stroke-color"] = args.COLOR;
      updateBoxVisuals(id, path);
    }

    setElementAtt(args) {
      const id = Cast.toString(args.ID);
      const param = Cast.toString(args.PARAM);
      let value = Cast.toString(args.VALUE);
      const path =
        this.getElementPath(Cast.toString(args.ELEMENT), true, true) + "s";
      const styles = styleStorage[path][id] ?? genDefaultStyles(id, path);
      const isValidStyle = this.genStyleList().findIndex((i) => {
        return i.value === param;
      });

      if (!param.includes("color") && param !== "background") {
        if (param === "width" || param === "height") {
          // allow users to input things like "auto" while still adding "px" to numbers
          value = /^\d+$/.test(value) ? `${value}px` : value;
        } else {
          // handle cases where users to input specific attributes like "margin-left"
          if (value.includes(" "))
            value = /^\d+$/.test(value.replaceAll(" ", ""))
              ? value.replaceAll(" ", "px ")
              : value;
          else value = `${value}px`;
        }
      }

      if (isValidStyle > -1) styles[param] = value;
      updateBoxVisuals(id, path);
    }

    setElementBorder(args) {
      const id = Cast.toString(args.ID);
      const weight = Cast.toNumber(args.WEIGHT);
      const isBorderValid = validBorders.findIndex((i) => {
        return i.value === args.TYPE;
      });
      const path =
        this.getElementPath(Cast.toString(args.ELEMENT), true, true) + "s";
      const styles = styleStorage[path][id] ?? genDefaultStyles(id, path);
      styles[path === "labels" ? "border-bottom" : "border"] =
        `${isBorderValid > -1 ? args.TYPE : "none"} ${args.COLOR} ${weight}px`;
      updateBoxVisuals(id, path);
    }

    setElementShadow(args) {
      const id = Cast.toString(args.ID);
      const pos = [Cast.toNumber(args.X), Cast.toNumber(args.Y)];
      const weight = [Cast.toNumber(args.AMT), Cast.toNumber(args.BLUR)];
      const path =
        this.getElementPath(Cast.toString(args.ELEMENT), true, true) + "s";
      const styles = styleStorage[path][id] ?? genDefaultStyles(id, path);
      if (path === "labels")
        styles["text-shadow"] =
          `${args.COLOR} ${pos[0]}px ${pos[1]}px ${weight[0]}px`;
      else
        styles["box-shadow"] =
          `${args.COLOR} ${pos[0]}px ${pos[1]}px ${weight[0]}px ${weight[1]}px`;
      updateBoxVisuals(id, path);
    }

    resetElementEffect(args) {
      const id = Cast.toString(args.ID);
      const path =
        this.getElementPath(Cast.toString(args.ELEMENT), true, true) + "s";
      const styles = styleStorage[path][id] ?? genDefaultStyles(id, path);
      if (path === "popups") styles["transform"] = "translate(-50%, -50%)";
      styles["filter"] = "";
      updateBoxVisuals(id, path);
    }

    setElementEffect(args) {
      const effect = Cast.toString(args.EFFECT);
      const effectIndex = validEffects.findIndex((i) => {
        return i.value === effect;
      });
      if (effectIndex === -1) return;
      const id = Cast.toString(args.ID);
      const path =
        this.getElementPath(Cast.toString(args.ELEMENT), true, true) + "s";
      const styles = styleStorage[path][id] ?? genDefaultStyles(id, path);

      let value = Cast.toNumber(args.VALUE);
      const cssTarget = effectIndex > 7 ? "transform" : "filter";
      const regex = new RegExp(`${effect}\\(([^)]*)\\)`);
      styles["SPstorage"][effect] = value;

      switch (effect) {
        case "blur":
          value += "px";
          break;
        case "brightness":
          value = `${100 - value * -1}%`;
          break;
        case "opacity":
          value = 1 - value / 100;
          break;
        case "saturate":
        case "sepia":
        case "invert":
          value += "%";
          break;
        case "hue-rotate":
          value += "deg";
          break;
        case "contrast":
          value = `${100 + value}%`;
          break;
        case "rotate":
          value = `${value - 90}deg`;
          break;
        case "scaleX":
        case "scaleY":
          value /= 100;
          break;
        case "skewX":
        case "skewY":
          value += "deg";
          break;
      }

      const newCSS = styles[cssTarget].replace(regex, "");
      styles[cssTarget] = newCSS + `${effect}(${value})`;
      updateBoxVisuals(id, path);
    }

    getElementEffect(args) {
      const effect = Cast.toString(args.EFFECT);
      const isValidEffect = validEffects.findIndex((i) => {
        return i.value === effect;
      });
      if (isValidEffect === -1) return "";

      const id = Cast.toString(args.ID);
      const path =
        this.getElementPath(Cast.toString(args.ELEMENT), true, true) + "s";
      const styles = styleStorage[path][id] ?? genDefaultStyles(id, path);
      return styles["SPstorage"][effect] ?? "";
    }
  }

  Scratch.extensions.register(new SPpopups());
})(Scratch);
