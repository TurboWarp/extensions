// Name: Better Input
// ID: BetterInputSP
// Description: Expansion of the "ask and wait" Blocks.
// By: SharkPool

// Version V.4.2.01

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Better Input must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzQuMTc2IiBoZWlnaHQ9IjEzNC4xNzYiIHZpZXdCb3g9IjAgMCAxMzQuMTc2IDEzNC4xNzYiPjxnIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTAgNjcuMDg4QzAgMzAuMDM2IDMwLjAzNiAwIDY3LjA4OCAwczY3LjA4OCAzMC4wMzYgNjcuMDg4IDY3LjA4OC0zMC4wMzYgNjcuMDg4LTY3LjA4OCA2Ny4wODhTMCAxMDQuMTQgMCA2Ny4wODgiIGZpbGw9IiM5NDAwZmYiLz48cGF0aCBkPSJtNzYuNzY3IDI4LjEzNCAxMC44MzQuMDRjMTAuNTE1LjA4IDEwLjgzNC4xMiAxMS41MS41OTcgMi40MyAxLjg3MiAyLjM5IDQuOTM5LS4xNTkgNi42NTItLjc1Ni41MTgtMS4xMTUuNTU3LTQuMzQxLjU1N2gtMy41MDV2NjIuMTc2aDMuNDY1YzMuOTQzIDAgNC45LjMxOCA1LjgxNSAxLjk1MSAxLjAzNiAxLjgzMy41MTggMy45NDQtMS4yNzQgNS4yNTgtLjY3Ny41MTgtLjk5Ni41MTgtMTEuNTExLjU5OGwtMTAuODM0LjA4LTEuMTE1LS41NThjLTEuMTU2LS42MzgtMi4xOTEtMi4xNTEtMi4xOTEtMy4zODYgMC0uODc2Ljk5Ni0yLjY2OSAxLjc5Mi0zLjI2Ni41OTgtLjQ3OCAxLjExNi0uNTE4IDQuMzQyLS41OThsMy42NjQtLjA4VjM2LjAybC0zLjY2NC0uMDhjLTMuMjI2LS4wOC0zLjc0NC0uMTE5LTQuMzQyLS41OTctLjc5Ni0uNTU4LTEuNzkyLTIuMzUtMS43OTItMy4yNjYgMC0xLjIzNS45OTYtMi43ODggMi4xOS0zLjM4NnoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik01MS43NTMgNDUuNTRoMjguMDR2NDMuMDU2bC0yOC40MzgtLjA0Yy0yOC4yLS4wNzktMjguNDM5LS4wNzktMjkuMzE1LS41OTctLjQ3OC0uMjc5LTEuMTE2LS45MTYtMS4zOTQtMS40NzRsLS41NTgtLjk1NVY2Ny4wODhjMC0xNy43MjUuMDQtMTguNDQyLjQ3OC0xOS4zNTguNTk3LTEuMDc1Ljk1Ni0xLjQzNCAyLjE1LTEuODcyLjc1OC0uMjM5IDYuMTc1LS4zMTggMjkuMDM3LS4zMTh6bS0xMC4wMzcgOS45OTdjLS42MzcuMzk4LTEuMzE0IDEuNzkzLTUuMDE5IDkuOTk4LTQuNjIgMTAuMjM2LTQuODU5IDEwLjkxMy0zLjgyMyAxMi4wMjggMS4xNTUgMS4yMzUgMi45NDcgMS4yNzUgMy45ODMuMDQuMzE4LS4zOTguNzk2LTEuMjc0IDEuMDM1LTEuOTUxbC40MzgtMS4yMzVoOS41NmwuNTU3IDEuNDM0Yy43MTcgMS45NTEgMS40NzQgMi42MjkgMi45MDggMi42MjkuOTE2IDAgMS4xOTUtLjEyIDEuNzkyLS43OTcuNTE4LS41NTguNzE3LTEuMDM2LjcxNy0xLjY3M3MtMS4xNTUtMy41ODUtMy43ODQtOS40NGMtNC45NzgtMTEuMTkyLTQuNzQtMTAuNzE0LTUuNTM2LTExLjExMi0uOTE2LS41MTgtMS45MTItLjQ3OC0yLjgyOC4wOHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik00My4xOSA2My4xODVjLjE1OS4xNTkgMi41ODkgNi4xMzQgMi41ODkgNi4zMzMgMCAuMTU5LTEuMTk1LjIzOS0yLjcwOS4yMzktMi4wNzEgMC0yLjY2OC0uMDgtMi41ODktLjMxOS4wOC0uMTYuNjc3LTEuNjMzIDEuMzk0LTMuMzA2LjcxNy0xLjYzMyAxLjMxNS0yLjk4NyAxLjMxNS0yLjk0N3ptNTEuNTQgMy45MDNWNDUuNWw4LjI4NS4wOGM3LjgwNy4wOCA4LjMyNS4xMTkgOS4xMjEuNTk3LjQ3OC4yNzkgMS4xMTYuOTE2IDEuMzk0IDEuNDc0bC41NTguOTU2Vjg1LjUzbC0uNTU4Ljk1NWMtLjI3OC41NTgtLjkxNiAxLjE5NS0xLjM5NCAxLjQ3NC0uODM2LjUxOC0xLjMxNC41MTgtOS4xMi41OThsLTguMjg2LjA4eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjkwMGI0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0ibTc2Ljc2NyAyOC4xMzQgMTAuODM0LjA0YzEwLjUxNS4wOCAxMC44MzQuMTIgMTEuNTEuNTk3IDIuNDMgMS44NzIgMi4zOSA0LjkzOS0uMTU5IDYuNjUyLS43NTYuNTE4LTEuMTE1LjU1Ny00LjM0MS41NTdoLTMuNTA1djYyLjE3NmgzLjQ2NWMzLjk0MyAwIDQuOS4zMTggNS44MTUgMS45NTEgMS4wMzYgMS44MzMuNTE4IDMuOTQ0LTEuMjc0IDUuMjU4LS42NzcuNTE4LS45OTYuNTE4LTExLjUxMS41OThsLTEwLjgzNC4wOC0xLjExNS0uNTU4Yy0xLjE1Ni0uNjM4LTIuMTkxLTIuMTUxLTIuMTkxLTMuMzg2IDAtLjg3Ni45OTYtMi42NjkgMS43OTItMy4yNjYuNTk4LS40NzggMS4xMTYtLjUxOCA0LjM0Mi0uNTk4bDMuNjY0LS4wOFYzNi4wMmwtMy42NjQtLjA4Yy0zLjIyNi0uMDgtMy43NDQtLjExOS00LjM0Mi0uNTk3LS43OTYtLjU1OC0xLjc5Mi0yLjM1LTEuNzkyLTMuMjY2IDAtMS4yMzUuOTk2LTIuNzg4IDIuMTktMy4zODZ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTc4LjQ2MSA0NS41NHY0My4wNTZzLTU1LjU0NS0uMTE5LTU2LjQyMS0uNjM3Yy0uNDc4LS4yNzktMS4xMTYtLjkxNi0xLjM5NC0xLjQ3NGwtLjU1OC0uOTU1VjY3LjA4OGMwLTE3LjcyNS4wNC0xOC40NDIuNDc4LTE5LjM1OC41OTctMS4wNzUuOTU2LTEuNDM0IDIuMTUtMS44NzIuNzU4LS4yMzkgNTUuNzQ1LS4zMTggNTUuNzQ1LS4zMThtLTM2Ljc0NSA5Ljk5N2MtLjYzNy4zOTgtMS4zMTQgMS43OTMtNS4wMTkgOS45OTgtNC42MiAxMC4yMzYtNC44NTkgMTAuOTEzLTMuODIzIDEyLjAyOCAxLjE1NSAxLjIzNSAyLjk0NyAxLjI3NSAzLjk4My4wNC4zMTgtLjM5OC43OTYtMS4yNzQgMS4wMzUtMS45NTFsLjQzOC0xLjIzNWg5LjU2bC41NTcgMS40MzRjLjcxNyAxLjk1MSAxLjQ3NCAyLjYyOSAyLjkwOCAyLjYyOS45MTYgMCAxLjE5NS0uMTIgMS43OTItLjc5Ny41MTgtLjU1OC43MTctMS4wMzYuNzE3LTEuNjczcy0xLjE1NS0zLjU4NS0zLjc4NC05LjQ0Yy00Ljk3OC0xMS4xOTItNC43NC0xMC43MTQtNS41MzYtMTEuMTEyLS45MTYtLjUxOC0xLjkxMi0uNDc4LTIuODI4LjA4IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTQzLjE5IDYzLjE4NWMuMTU5LjE1OSAyLjU4OSA2LjEzNCAyLjU4OSA2LjMzMyAwIC4xNTktMS4xOTUuMjM5LTIuNzA5LjIzOS0yLjA3MSAwLTIuNjY4LS4wOC0yLjU4OS0uMzE5LjA4LS4xNi42NzctMS42MzMgMS4zOTQtMy4zMDYuNzE3LTEuNjMzIDEuMzE1LTIuOTg3IDEuMzE1LTIuOTQ3TTk2LjA2NCA0NS41czE1LjI3Ni4xOTkgMTYuMDcyLjY3N2MuNDc4LjI3OSAxLjExNi45MTYgMS4zOTQgMS40NzRsLjU1OC45NTZWODUuNTNsLS41NTguOTU1Yy0uMjc4LjU1OC0uOTE2IDEuMTk1LTEuMzk0IDEuNDc0LS44MzYuNTE4LTE2LjA3Mi42NzctMTYuMDcyLjY3N3oiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+";
  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3OS4zNjMiIGhlaWdodD0iODcuOTIxIiB2aWV3Qm94PSIwIDAgNzkuMzYzIDg3LjkyMSI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMzIuMzUzIDQzLjk1OXYyMS41NDhsLTExLjcwNi0uMDhjLTExLjAzMS0uMDc5LTExLjcwNy0uMDc5LTEyLjg4OS0uNTk3LS42NzUtLjI3OS0xLjU3Ni0uOTE2LTEuOTctMS40NzRMNSA2Mi40MDFWMjUuNDc4bC43ODgtLjk1NmMuMzk0LS41NTggMS4yOTUtMS4xOTUgMS45Ny0xLjQ3NCAxLjEyNi0uNDc4IDEuODU4LS41MTggMTIuODg5LS41OTdsMTEuNzA2LS4wOHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0zMC40NjkgNjUuNTA3cy0yMS41MjktLjE1OS0yMi43MS0uNjc3Yy0uNjc2LS4yNzktMS41NzctLjkxNi0xLjk3LTEuNDc0TDUgNjIuNDAxVjI1LjQ3OGwuNzg4LS45NTZjLjM5NC0uNTU4IDEuMjk1LTEuMTk1IDEuOTctMS40NzQgMS4xMjYtLjQ3OCAyMi43MTEtLjY3NyAyMi43MTEtLjY3N3oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDcuMDExIDQzLjk1OVYyMi4zNzFsMTEuNzA2LjA4YzExLjAzMS4wOCAxMS43NjMuMTE5IDEyLjg4OS41OTcuNjc1LjI3OSAxLjU3Ni45MTYgMS45NyAxLjQ3NGwuNzg4Ljk1NnYzNi45MjNsLS43ODguOTU1Yy0uMzk0LjU1OC0xLjI5NSAxLjE5NS0xLjk3IDEuNDc0LTEuMTgyLjUxOC0xLjg1OC41MTgtMTIuODg5LjU5OGwtMTEuNzA2LjA4eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjkwMGI0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTQ4Ljg5NSAyMi4zNzFzMjEuNTg1LjE5OSAyMi43MS42NzdjLjY3Ni4yNzkgMS41NzcuOTE2IDEuOTcgMS40NzRsLjc4OS45NTZ2MzYuOTIzbC0uNzg4Ljk1NWMtLjM5NC41NTgtMS4yOTUgMS4xOTUtMS45NyAxLjQ3NC0xLjE4Mi41MTgtMjIuNzExLjY3Ny0yMi43MTEuNjc3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Im0yOS4yNzggNS4wMDUgMTAuODMzLjA0YzEwLjUxNi4wOCAxMC44MzQuMTIgMTEuNTExLjU5NyAyLjQzIDEuODcyIDIuMzkgNC45MzktLjE1OSA2LjY1Mi0uNzU3LjUxOC0xLjExNS41NTctNC4zNDEuNTU3aC0zLjUwNXY2Mi4xNzZoMy40NjVjMy45NDMgMCA0Ljg5OS4zMTggNS44MTUgMS45NTEgMS4wMzYgMS44MzMuNTE4IDMuOTQ0LTEuMjc1IDUuMjU4LS42NzcuNTE4LS45OTUuNTE4LTExLjUxLjU5OGwtMTAuODM0LjA4LTEuMTE2LS41NThjLTEuMTU1LS42MzgtMi4xOS0yLjE1MS0yLjE5LTMuMzg2IDAtLjg3Ni45OTUtMi42NjkgMS43OTItMy4yNjYuNTk3LS40NzggMS4xMTUtLjUxOCA0LjM0Mi0uNTk4bDMuNjY0LS4wOFYxMi44OTFsLTMuNjY0LS4wOGMtMy4yMjctLjA4LTMuNzQ1LS4xMTktNC4zNDItLjU5Ny0uNzk3LS41NTgtMS43OTItMi4zNS0xLjc5Mi0zLjI2NiAwLTEuMjM1Ljk5NS0yLjc4OCAyLjE5LTMuMzg2eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjkwMGI0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0ibTI5LjI3OCA1LjAwNSAxMC44MzMuMDRjMTAuNTE2LjA4IDEwLjgzNC4xMiAxMS41MTEuNTk3IDIuNDMgMS44NzIgMi4zOSA0LjkzOS0uMTU5IDYuNjUyLS43NTcuNTE4LTEuMTE1LjU1Ny00LjM0MS41NTdoLTMuNTA1djYyLjE3NmgzLjQ2NWMzLjk0MyAwIDQuODk5LjMxOCA1LjgxNSAxLjk1MSAxLjAzNiAxLjgzMy41MTggMy45NDQtMS4yNzUgNS4yNTgtLjY3Ny41MTgtLjk5NS41MTgtMTEuNTEuNTk4bC0xMC44MzQuMDgtMS4xMTYtLjU1OGMtMS4xNTUtLjYzOC0yLjE5LTIuMTUxLTIuMTktMy4zODYgMC0uODc2Ljk5NS0yLjY2OSAxLjc5Mi0zLjI2Ni41OTctLjQ3OCAxLjExNS0uNTE4IDQuMzQyLS41OThsMy42NjQtLjA4VjEyLjg5MWwtMy42NjQtLjA4Yy0zLjIyNy0uMDgtMy43NDUtLjExOS00LjM0Mi0uNTk3LS43OTctLjU1OC0xLjc5Mi0yLjM1LTEuNzkyLTMuMjY2IDAtMS4yMzUuOTk1LTIuNzg4IDIuMTktMy4zODZ6IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==";

  const formatIcon =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAuOTA0IiBoZWlnaHQ9Ijk1LjUiIHZpZXdCb3g9IjAgMCAxNTAuOTA0IDk1LjUiPjxnIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTc1LjE5NCA2OS41NjhzLTQwLjI2Ny0uMTYtNDEuNTYtLjY3N2MtLjczOC0uMjc5LTEuNzIyLS45MTYtMi4xNTMtMS40NzRsLS44NjItLjk1NlYyOS41NGwuODYyLS45NTZjLjQzLS41NTggMS40MTUtMS4xOTUgMi4xNTQtMS40NzQgMS4yMy0uNDc4IDQxLjU1OS0uNjc3IDQxLjU1OS0uNjc3eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjkwMGI0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTY5LjU0MyAyNi40MzJzNDIuNjYyLjE5OSA0My44OTMuNjc3Yy43MzguMjc5IDEuNzIzLjkxNiAyLjE1NCAxLjQ3NGwuODYxLjk1NnYzNi45MjJsLS44NjEuOTU2Yy0uNDMuNTU4LTEuNDE2IDEuMTk1LTIuMTU0IDEuNDc0LTEuMjkyLjUxOC00My44OTMuNjc3LTQzLjg5My42Nzd6IiBmaWxsPSJub25lIiBzdHJva2U9IiM2OTAwYjQiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNNzEuNjAzIDI2LjQzMnM0MC42MDIuMTk5IDQxLjgzMy42NzdjLjczOC4yNzkgMS43MjMuOTE2IDIuMTU0IDEuNDc0bC44NjEuOTU2djM2LjkyMmwtLjg2MS45NTZjLS40My41NTgtMS40MTYgMS4xOTUtMi4xNTQgMS40NzQtMS4yOTIuNTE4LTQxLjgzMy42NzctNDEuODMzLjY3N3oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNzMuMTM0IDY5LjU2OHMtMzguMjA3LS4xNi0zOS41LS42NzdjLS43MzgtLjI3OS0xLjcyMi0uOTE2LTIuMTUzLTEuNDc0bC0uODYyLS45NTZWMjkuNTRsLjg2Mi0uOTU2Yy40My0uNTU4IDEuNDE1LTEuMTk1IDIuMTU0LTEuNDc0IDEuMjMtLjQ3OCAzOS40OTktLjY3NyAzOS40OTktLjY3N3oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNSAyMi4xNThWNWgxNy4xNTh6IiBmaWxsPSJub25lIiBzdHJva2U9IiM2OTAwYjQiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMTQ1LjkwNCA3My4zNDJWOTAuNWgtMTcuMTU4eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjkwMGI0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTUgMjIuMTU4VjVoMTcuMTU4eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xNDUuOTA0IDczLjM0MlY5MC41aC0xNy4xNTh6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTIyLjE1OCA5MC41SDVWNzMuMzQyek0xMjguNzQ2IDVoMTcuMTU4djE3LjE1OHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0yMi4xNTggOTAuNUg1VjczLjM0MnpNMTI4Ljc0NiA1aDE3LjE1OHYxNy4xNTh6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTcxLjcxOCAzMy40MmMxLjE4My0uNzIgMi40ODUtLjc3MSAzLjY2Ny0uMTAzIDEuMDI5LjUxNC43NzctLjA0IDcuMjA1IDE0LjQwOSAzLjM5NCA3LjU1OSA0Ljg3IDExLjQwOCA0Ljg3IDEyLjIzMXMtLjI2MyAxLjQ0NS0uOTMyIDIuMTY1Yy0uNzcuODc1LTEuMTM3IDEuMDM0LTIuMzIgMS4wMzQtMS44NTEgMC0yLjg5OC0uOTgyLTMuODI0LTMuNTAybC0uNjUzLTEuNzQxLTYuMjA1LjAxLTYuMjA1LS4wMS0uNDk4IDEuNDg0Yy0uMzA5Ljg3NC0uOTkxIDIuMTE3LTEuNDAzIDIuNjMtMS4zMzcgMS41OTUtMy42NjMgMS41MzQtNS4xNTQtLjA2LTEuMzM3LTEuNDQtMS4wNDctMi4zNzMgNC45MTgtMTUuNTg5IDQuNzgyLTEwLjU5MyA1LjcxMi0xMi40NDQgNi41MzQtMTIuOTU4IiBmaWxsPSIjNjkwMGI0Ii8+PHBhdGggZD0iTTczLjYyOSA0My4zNTdjLjIwNi4yMDYgMy4zNDMgNy45MiAzLjM0MyA4LjE3NiAwIC4yMDYtMS41NDMuMzA5LTMuNDk3LjMwOS0yLjY3NCAwLTMuNDQ2LS4xMDMtMy4zNDMtLjQxMi4xMDMtLjIwNS44NzQtMi4xMDggMS44LTQuMjY4LjkyNi0yLjEwOCAxLjY5Ny0zLjg1NiAxLjY5Ny0zLjgwNSIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=";
  const colorIcon =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NS41MzUiIGhlaWdodD0iNzEuNDk3IiB2aWV3Qm94PSIwIDAgNzUuNTM1IDcxLjQ5NyI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMjEuMzA3IDIxLjQ2MkMyMS4zMDcgMTIuMzcgMjguNjc3IDUgMzcuNzY4IDVzMTYuNDYxIDcuMzcgMTYuNDYxIDE2LjQ2Mi03LjM3IDE2LjQ2MS0xNi40NjEgMTYuNDYxLTE2LjQ2MS03LjM3LTE2LjQ2MS0xNi40NjF6IiBmaWxsPSJub25lIiBzdHJva2U9IiM2OTAwYjQiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNNSA1MC4wMzZjMC05LjA5MSA3LjM3LTE2LjQ2MSAxNi40NjItMTYuNDYxczE2LjQ2MSA3LjM3IDE2LjQ2MSAxNi40NjFjMCA5LjA5Mi03LjM3IDE2LjQ2Mi0xNi40NjEgMTYuNDYyQzEyLjM3IDY2LjQ5OCA1IDU5LjEyOCA1IDUwLjAzNnoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik0zNy42MTMgNTAuMDM2YzAtOS4wOTEgNy4zNy0xNi40NjEgMTYuNDYxLTE2LjQ2MSA5LjA5MiAwIDE2LjQ2MiA3LjM3IDE2LjQ2MiAxNi40NjEgMCA5LjA5Mi03LjM3IDE2LjQ2Mi0xNi40NjIgMTYuNDYycy0xNi40NjEtNy4zNy0xNi40NjEtMTYuNDYyeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjkwMGI0IiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTIxLjMwNyAyMS40NjJDMjEuMzA3IDEyLjM3IDI4LjY3NyA1IDM3Ljc2OCA1czE2LjQ2MSA3LjM3IDE2LjQ2MSAxNi40NjItNy4zNyAxNi40NjEtMTYuNDYxIDE2LjQ2MS0xNi40NjEtNy4zNy0xNi40NjEtMTYuNDYxIiBmaWxsPSJsaW1lIi8+PHBhdGggZD0iTTUgNTAuMDM2YzAtOS4wOTEgNy4zNy0xNi40NjEgMTYuNDYyLTE2LjQ2MXMxNi40NjEgNy4zNyAxNi40NjEgMTYuNDYxYzAgOS4wOTItNy4zNyAxNi40NjItMTYuNDYxIDE2LjQ2MkMxMi4zNyA2Ni40OTggNSA1OS4xMjggNSA1MC4wMzYiIGZpbGw9InJlZCIvPjxwYXRoIGQ9Ik0zNy42MTMgNTAuMDM2YzAtOS4wOTEgNy4zNy0xNi40NjEgMTYuNDYxLTE2LjQ2MSA5LjA5MiAwIDE2LjQ2MiA3LjM3IDE2LjQ2MiAxNi40NjEgMCA5LjA5Mi03LjM3IDE2LjQ2Mi0xNi40NjIgMTYuNDYycy0xNi40NjEtNy4zNy0xNi40NjEtMTYuNDYyIiBmaWxsPSJibHVlIi8+PC9nPjwvc3ZnPg==";
  const effectIcon =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1Ny40NDIiIGhlaWdodD0iNzAuNDUiIHZpZXdCb3g9IjAgMCA1Ny40NDIgNzAuNDUiPjxnIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNNSA0OS4wNDdjLTMuOTg4LTguMTE3LTMuOTk2LTE4LjI0My4xNTMtMjYuNDFDOS44NCAxMy4wNjIgMTcuNzMgOC44MTggMjAuOSA3LjQzOGEzMS40IDMxLjQgMCAwIDEgNi4wNzYtMi4wODNsMi4xMi0uNDU3YzEuNTU4LS4zMiAzLjExLjY0NiAzLjQ0NyAyLjE4Ny4zNCAxLjU0NS0uNjUxIDMuMDY2LTIuMjE2IDMuNDAybC0yLjA2My40NDVhMjUuNCAyNS40IDAgMCAwLTQuOTYgMS43MTZjLTIuMDgzLjkwMi04Ljk3NCA0LjM5Mi0xMi45NDkgMTIuNTE1LTMuMDE3IDUuOTMzLTMuOTE3IDE1LjM2Ni44MzIgMjMuMTUgNC4zMDMgNy40OTggMTMuMTEyIDEyLjA5NSAyMS40NjggMTEuMzIxIDcuOTAzLS41NjggMTUuMTU1LTUuODI4IDE3LjY5OC0xMi43OTUgMi41ODEtNi41NTIuODY2LTEzLjI2OS0xLjk2Ny0xNy4wNTItMy40MTMtNC42Ni03LjY2LTYuMDk0LTkuMzI4LTYuNDk1LS4yNDktLjA3NC02LjA4NS0xLjgyNy0xMS4yNC43NTQtMi4yMiAxLjA2NC01LjA5IDMuNDU2LTYuNjI4IDcuMDUtMS42NiAzLjcxMi0xLjIzIDguNDg0IDEuMDIgMTEuNjU1IDIuMjYzIDMuMzk5IDYuNTMyIDUuMzIzIDEwLjIwMyA0LjY3IDMuNjU1LS41NzUgNi4xMjctMy4yOTQgNi43MTMtNS42ODMuNjg5LTIuNTY4LS4zNjgtNC43MzktMS4xOTMtNS41Mi0xLjQwMS0xLjM4My0yLjYxMS0xLjQwNi0yLjY2My0xLjQxYTUgNSAwIDAgMC0xLjAyNi4wNTRjLS42NTQuMjQtMS41ODIuNzY0LTEuODU0IDEuMzE2LS4wNDguMDktLjE3LjM0LjA2NC45NjMuNTYzIDEuNDc3LS4xOTcgMy4xMy0xLjY5NCAzLjY4NS0xLjQ5LjU1OC0zLjE2Ny0uMTkyLTMuNzMzLTEuNjczLS45MzEtMi40NS0uNDE2LTQuMzY4LjE4LTUuNTQ2IDEuNTU4LTMuMDY2IDUuMTc2LTQuMTc2IDUuNTg1LTQuMjk0LjE4Ny0uMDU3LjM4NS0uMDkxLjU4LS4xMDguMzk4LS4wNiAxLjEtLjE1NSAyLjA1Mi0uMTE4IDIuMTc4LjAyNyA0LjY2IDEuMTY1IDYuNTYzIDMuMDQ2IDIuMjQ2IDIuMTIgNC4wMDYgNi4zOCAyLjc1OCAxMS4wMTEtMS4yMTcgNC45NTctNS44OTUgOS4wNTYtMTEuMzUzIDkuOTE0LTUuODcgMS4wNDctMTIuNDgyLTEuODQ3LTE1Ljk3My03LjA5NC0zLjM2NS00LjcyOC00LjAwOS0xMS42NDctMS41NDgtMTcuMTM2IDIuNy02LjMyIDcuODU5LTkuMTggOS4zNzMtOS45MDcgNy4yNzktMy42MzUgMTUuMDU5LTEuMjM1IDE1LjM4Ni0xLjEzNCAyLjA5My40OTQgNy45MTMgMi40NDMgMTIuNDM3IDguNjI1IDMuNDc3IDQuNjUgNi4yOTcgMTMuMzM3IDIuNzE0IDIyLjQzLTMuMjczIDguOTYyLTEyLjU5IDE1Ljc3LTIyLjYzOCAxNi40OTMtLjc4OC4wNzQtMS41ODUuMTE1LTIuMzguMTE1LTkuNzUgMC0xOS42MjctNS42Mi0yNC41OC0xNC4yNSAwIDAtLjgyMS0xLjQxOC0xLjE4My0yLjE1M3oiIHN0cm9rZT0iIzY5MDBiNCIgc3Ryb2tlLXdpZHRoPSIxMCIvPjxwYXRoIGQ9Ik02LjE4MiA1MS4yMDFjLTUuMTM0LTguNDItNS41NTMtMTkuNjU3LTEuMDMtMjguNTY1QzkuODQgMTMuMDYyIDE3LjczIDguODE4IDIwLjkgNy40MzhhMzEuNCAzMS40IDAgMCAxIDYuMDc2LTIuMDgzbDIuMTItLjQ1N2MxLjU1OC0uMzIgMy4xMS42NDYgMy40NDcgMi4xODcuMzQgMS41NDUtLjY1MSAzLjA2Ni0yLjIxNiAzLjQwMmwtMi4wNjMuNDQ1YTI1LjQgMjUuNCAwIDAgMC00Ljk2IDEuNzE2Yy0yLjA4My45MDItOC45NzQgNC4zOTItMTIuOTQ5IDEyLjUxNS0zLjAxNyA1LjkzMy0zLjkxNyAxNS4zNjYuODMyIDIzLjE1IDQuMzAzIDcuNDk4IDEzLjExMiAxMi4wOTUgMjEuNDY4IDExLjMyMSA3LjkwMy0uNTY4IDE1LjE1NS01LjgyOCAxNy42OTgtMTIuNzk1IDIuNTgxLTYuNTUyLjg2Ni0xMy4yNjktMS45NjctMTcuMDUyLTMuNDEzLTQuNjYtNy42Ni02LjA5NC05LjMyOC02LjQ5NS0uMjQ5LS4wNzQtNi4wODUtMS44MjctMTEuMjQuNzU0LTIuMjIgMS4wNjQtNS4wOSAzLjQ1Ni02LjYyOCA3LjA1LTEuNjYgMy43MTItMS4yMyA4LjQ4NCAxLjAyIDExLjY1NSAyLjI2MyAzLjM5OSA2LjUzMiA1LjMyMyAxMC4yMDMgNC42NyAzLjY1NS0uNTc1IDYuMTI3LTMuMjk0IDYuNzEzLTUuNjgzLjY4OS0yLjU2OC0uMzY4LTQuNzM5LTEuMTkzLTUuNTItMS40MDEtMS4zODMtMi42MTEtMS40MDYtMi42NjMtMS40MWE1IDUgMCAwIDAtMS4wMjYuMDU0Yy0uNjU0LjI0LTEuNTgyLjc2NC0xLjg1NCAxLjMxNi0uMDQ4LjA5LS4xNy4zNC4wNjQuOTYzLjU2MyAxLjQ3Ny0uMTk3IDMuMTMtMS42OTQgMy42ODUtMS40OS41NTgtMy4xNjctLjE5Mi0zLjczMy0xLjY3My0uOTMxLTIuNDUtLjQxNi00LjM2OC4xOC01LjU0NiAxLjU1OC0zLjA2NiA1LjE3Ni00LjE3NiA1LjU4NS00LjI5NC4xODctLjA1Ny4zODUtLjA5MS41OC0uMTA4LjM5OC0uMDYgMS4xLS4xNTUgMi4wNTItLjExOCAyLjE3OC4wMjcgNC42NiAxLjE2NSA2LjU2MyAzLjA0NiAyLjI0NiAyLjEyIDQuMDA2IDYuMzggMi43NTggMTEuMDExLTEuMjE3IDQuOTU3LTUuODk1IDkuMDU2LTExLjM1MyA5LjkxNC01Ljg3IDEuMDQ3LTEyLjQ4Mi0xLjg0Ny0xNS45NzMtNy4wOTQtMy4zNjUtNC43MjgtNC4wMDktMTEuNjQ3LTEuNTQ4LTE3LjEzNiAyLjctNi4zMiA3Ljg1OS05LjE4IDkuMzczLTkuOTA3IDcuMjc5LTMuNjM1IDE1LjA1OS0xLjIzNSAxNS4zODYtMS4xMzQgMi4wOTMuNDk0IDcuOTEzIDIuNDQzIDEyLjQzNyA4LjYyNSAzLjQ3NyA0LjY1IDYuMjk3IDEzLjMzNyAyLjcxNCAyMi40My0zLjI3MyA4Ljk2Mi0xMi41OSAxNS43Ny0yMi42MzggMTYuNDkzLS43ODguMDc0LTEuNTg1LjExNS0yLjM4LjExNS05Ljc1IDAtMTkuNjI3LTUuNjItMjQuNTgtMTQuMjUiLz48L2c+PC9zdmc+";

  let laidImgContain = "";
  const vm = Scratch.vm;
  const fontMenu = [
    "Sans Serif", "Serif", "Handwriting",
    "Marker", "Curly", "Pixel", "Scratch"
  ];

  const xmlEscape = function (unsafe) {
    return Scratch.Cast.toString(unsafe).replace(/[<>&'"]/g, c => {
      switch (c) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "&": return "&amp;";
        case "'": return "&apos;";
        case "\"": return "&quot;";
      }
    });
  };

  class BetterInputSP {
    constructor() {
      this.activeOverlays = []; this.askBoxPromises = [];
      this.isWaitingForInput = false; this.isDropdownOpen = false;
      this.userInput = " "; this.defaultValue = "";
      this.textBoxX = 0; this.textBoxY = 0;
      this.askBoxInfo = [0, 1]; this.appendTarget = ["window", false];
      this.forceInput = "Disabled";
      this.overlayInput = null;
      this.uiOrder = ["question", "input", "buttons"];

      this.optionList = ["Option 1", "Option 2", "Option 3"];
      this.sliderInfo = [0, 100, 50];
      this.Timeout = 0;

      this.inputType = "Enabled";
      this.fontSize = "14px"; this.fontFamily = "Sans Serif"; this.textAlign = "left";
       // overlay + Image, input, dropdown button 
      this.mainUIinfo = {
        // Border Radius
        dimensions: ["auto", "auto"],
        overlayRad: 5, 
        inputRad: 4,
        dropBtnRad: 5,
        // Border Information
        overlayBord: "1px none #000000",
        inputBord: "1px solid #000000",
        dropBtnBord: "1px none #000000",
        // Text Padding
        overlayPad: "15px",
        inputPad: "5px",
        dropBtnPad: "5px 10px",
        // Text Shadow
        overlayTxtShad: "none",
        inputTxtShad: "none",
        dropBtnTxtShad: "none",
        // Outline: Color + Thickness
        overlayOutline: ["", 0],
        inputOutline: ["", 0],
        dropBtnOutline: ["", 0]
      };
      this.DropdownText = "Dropdown";
      this.lastPressBtn = "";
      this.buttonJSON = {
        "Submit": {
          color: "#0074D9", textColor: "#ffffff",
          name: "Submit", image: "", imgScale: 100,
          borderRadius: 5, border: "1px none #000000",
          padding: "5px 10px", dropShadow: "none", outline: ["", 0]
        },
        "Cancel": {
          color: "#d9534f", textColor: "#ffffff",
          name: "Cancel", image: "", imgScale: 100,
          borderRadius: 5, border: "1px none #000000",
          padding: "5px 10px", dropShadow: "none", outline: ["", 0]
        },
      };

      this.questionColor = "#000000"; this.inputColor = "#000000";
      this.textBoxColor = ["#ffffff"]; this.inputFieldColor = "#a5aec3";
      this.dropdwnBtnColor = ["#5f5f5f", "#ffffff"];
      this.overlayImage = [" ", " ", " "];

      this.Blur = 0; this.Brightness = 0; this.Opacity = 100;
      this.Invert = 0; this.Saturation = 100; this.Hue = 0;
      this.Sepia = 0; this.Contrast = 100; this.Scale = 100; 
      this.SkewX = 0; this.SkewY = 0; this.Rotation = 90;
      this.imgScale = [100, 100, 100];
      this.shadowEnabled = true;
      this.shadowS = [0, 0, 5, "#000000"];
    }

    getInfo() {
      return {
        id: "BetterInputSP",
        name: "Better Input",
        color1: "#9400ff",
        color2: "#7800cd",
        color3: "#6900b3",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "askAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: "ask [question] and wait",
            arguments: {
              question: { type: Scratch.ArgumentType.STRING, defaultValue: "What is your name?" }
            },
          },
          {
            opcode: "askAndWaitForInput",
            blockType: Scratch.BlockType.REPORTER,
            text: "ask [question] and wait",
            arguments: {
              question: { type: Scratch.ArgumentType.STRING, defaultValue: "What is your name?" }
            },
          },
          {
            opcode: "getUserInput", blockType: Scratch.BlockType.REPORTER,
            text: "user input"
          },
          {
            opcode: "setDefaultV",
            blockType: Scratch.BlockType.COMMAND,
            text: "set default value to [defaultV]",
            arguments: {
              defaultV: { type: Scratch.ArgumentType.STRING, defaultValue: "My Name Is..." }
            },
          },
          {
            opcode: "removeAskBoxes", blockType: Scratch.BlockType.COMMAND,
            text: "remove all ask boxes"
          },
          {
            opcode: "resetInput", blockType: Scratch.BlockType.COMMAND,
            text: "reset user input"
          },
          { blockType: Scratch.BlockType.LABEL, text: "Formatting" },
          {
            opcode: "setFontSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font size to [SIZE]",
            blockIconURI: formatIcon,
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 14 }
            },
          },
          {
            opcode: "setTextAlignment",
            blockType: Scratch.BlockType.COMMAND,
            text: "set alignment to [ALIGNMENT]",
            blockIconURI: formatIcon,
            arguments: {
              ALIGNMENT: { type: Scratch.ArgumentType.STRING, menu: "alignmentMenu" }
            },
          },
          {
            opcode: "setFontFamily",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font to [FONT]",
            blockIconURI: formatIcon,
            arguments: {
              FONT: { type: Scratch.ArgumentType.STRING, menu: "fontMenu" }
            },
          },
          "---",
          {
            opcode: "setInputType",
            blockType: Scratch.BlockType.COMMAND,
            text: "set input type to [ACTION]",
            blockIconURI: formatIcon,
            arguments: {
              ACTION: { type: Scratch.ArgumentType.STRING, menu: "inputActionMenu" }
            },
          },
          {
            opcode: "setDropdown",
            blockType: Scratch.BlockType.COMMAND,
            text: "set dropdown options to array: [DROPDOWN]",
            blockIconURI: formatIcon,
            arguments: {
              DROPDOWN: { type: Scratch.ArgumentType.STRING, defaultValue: "[\"Option 1\", \"Option 2\", \"Option 3\"]" }
            },
          },
          {
            opcode: "setSlider",
            blockType: Scratch.BlockType.COMMAND,
            text: "set slider to min: [MIN] max: [MAX] default: [DEFAULT]",
            blockIconURI: formatIcon,
            arguments: {
              MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              DEFAULT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Buttons" },
          {
            opcode: "setButton",
            blockType: Scratch.BlockType.COMMAND,
            text: "[BUTTON] button named [NAME]",
            blockIconURI: formatIcon,
            arguments: {
              BUTTON: { type: Scratch.ArgumentType.STRING, menu: "buttonType" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Submit" }
            },
          },
          {
            opcode: "deleteAllButtons", blockType: Scratch.BlockType.COMMAND,
            text: "remove all buttons", blockIconURI: formatIcon
          },
          {
            opcode: "setButtonText",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [BUTTON_MENU] button name to [TEXT]",
            blockIconURI: formatIcon,
            arguments: {
              BUTTON_MENU: { type: Scratch.ArgumentType.STRING, menu: "buttonMenu" },
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "my dropdown" }
            },
          },
          {
            opcode: "lastButton", blockType: Scratch.BlockType.REPORTER,
            text: "last pressed button", blockIconURI: formatIcon
          },
          { blockType: Scratch.BlockType.LABEL, text: "Positioning" },
          {
            opcode: "setPrePosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "preset textbox position to x: [X] y: [Y]",
            blockIconURI: formatIcon,
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "setPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set textbox position to x: [X] y: [Y]",
            blockIconURI: formatIcon,
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "changePosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "change textbox position by x: [X] y: [Y]",
            blockIconURI: formatIcon,
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "getXpos", blockType: Scratch.BlockType.REPORTER,
            blockIconURI: formatIcon, text: "x position"
          },
          {
            opcode: "getYpos", blockType: Scratch.BlockType.REPORTER,
            blockIconURI: formatIcon, text: "y position"
          },
          {
            opcode: "setDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: "set direction to [ROTATE]",
            blockIconURI: formatIcon,
            arguments: {
              ROTATE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 }
            },
          },
          {
            opcode: "changeDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: "change direction by [ROTATE]",
            blockIconURI: formatIcon,
            arguments: {
              ROTATE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 15 }
            },
          },
          {
            opcode: "reportDirection", blockType: Scratch.BlockType.REPORTER,
            text: "direction", blockIconURI: formatIcon
          },
          { blockType: Scratch.BlockType.LABEL, text: "Visual Settings" },
          {
            opcode: "setColorSettings",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [COLOR_TYPE] color to [COLOR]",
            blockIconURI: colorIcon,
            arguments: {
              COLOR_TYPE: { type: Scratch.ArgumentType.STRING, menu: "colorSettingsMenu" },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            },
          },
          "---",
          {
            opcode: "setImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ELEMENT] image to [IMAGE]",
            blockIconURI: colorIcon,
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "elementMenu" },
              IMAGE: { type: Scratch.ArgumentType.STRING, defaultValue: "input-url-here" }
            },
          },
          {
            opcode: "scaleImage",
            blockType: Scratch.BlockType.COMMAND,
            text: "scale [ELEMENT] image to [SCALE]%",
            blockIconURI: colorIcon,
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "elementMenu" },
              SCALE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            },
          },
          "---",
          {
            opcode: "enableShadow",
            blockType: Scratch.BlockType.COMMAND,
            text: "set box shadow to [ACTION]",
            blockIconURI: colorIcon,
            arguments: {
              ACTION: { type: Scratch.ArgumentType.STRING, menu: "buttonActionMenu" }
            },
          },
          {
            opcode: "setShadow",
            blockType: Scratch.BlockType.COMMAND,
            text: "set box shadow [SHADOW] to [AMT]",
            blockIconURI: colorIcon,
            arguments: {
              SHADOW: { type: Scratch.ArgumentType.STRING, menu: "shadowStuff" },
              AMT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            },
          },
          {
            opcode: "setDropShadow",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ELEMENT] shadow to x [x] y [y] z [z] color [COLOR]",
            blockIconURI: colorIcon,
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "textsMenu" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            },
          },
          {
            opcode: "setOutline",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ELEMENT] outline to [COLOR] thickness [THICK]",
            blockIconURI: colorIcon,
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "textsMenu" },
              COLOR: { type: Scratch.ArgumentType.COLOR },
              THICK: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            },
          },
          "---",
          {
            opcode: "setBorder",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ELEMENT] border to [TYPE] color [COLOR] width [WIDTH]",
            blockIconURI: colorIcon,
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "elementMenu" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "borderTypes" },
              COLOR: { type: Scratch.ArgumentType.COLOR },
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          {
            opcode: "setBorderRadius",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ELEMENT] border radius to [VALUE]",
            blockIconURI: colorIcon,
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "elementMenu" },
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          "---",
          {
            opcode: "setPadding",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [ELEMENT] padding to T: [N1] B: [N3] L: [N4] R: [N2]",
            blockIconURI: colorIcon,
            arguments: {
              ELEMENT: { type: Scratch.ArgumentType.STRING, menu: "elementMenu" },
              N1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              N2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              N3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              N4: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            },
          },
          {
            opcode: "setDimension",
            blockType: Scratch.BlockType.COMMAND,
            text: "set Textbox width [W] height [H]",
            blockIconURI: colorIcon,
            arguments: {
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Effects" },
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset effects",
            blockIconURI: effectIcon
          },
          {
            opcode: "setEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set effect [EFFECT] to [AMT]",
            blockIconURI: effectIcon,
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "effectMenu" },
              AMT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          {
            opcode: "changeEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "change effect [EFFECT] by [AMT]",
            blockIconURI: effectIcon,
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "effectMenu" },
              AMT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            },
          },
          {
            opcode: "showEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "effect [EFFECT]",
            blockIconURI: effectIcon,
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "effectMenu" }
            },
          },
          "---",
          {
            opcode: "setTimeout",
            blockType: Scratch.BlockType.COMMAND,
            text: "when submitted delete textbox after [TIME] secs",
            blockIconURI: effectIcon,
            arguments: {
              TIME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            },
          },
          {
            opcode: "reportTimeout",
            blockType: Scratch.BlockType.REPORTER,
            text: "current textbox timeout",
            blockIconURI: effectIcon
          },
          { blockType: Scratch.BlockType.LABEL, text: "Operations" },
          {
            opcode: "setUI",
            blockType: Scratch.BlockType.COMMAND,
            text: "set UI order to [ARRAY]",
            arguments: {
              ARRAY: { type: Scratch.ArgumentType.STRING, defaultValue: "[\"question\", \"input\", \"buttons\"]" }
            },
          },
          {
            opcode: "getUIOrder",
            blockType: Scratch.BlockType.REPORTER,
            text: "UI order"
          },
          "---",
          {
            opcode: "setAppend",
            blockType: Scratch.BlockType.COMMAND,
            text: "append next textbox to [TARGET]",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "appendMenu" }
            },
          },
          {
            opcode: "setFocus",
            blockType: Scratch.BlockType.COMMAND,
            text: "toggle focus mode to [TYPE]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "buttonActionMenu" }
            },
          },
          "---",
          {
            opcode: "isWaitingInput",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is waiting?"
          },
          {
            opcode: "isDropdown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is dropdown open?"
          },
          {
            opcode: "setSubmitEvent",
            blockType: Scratch.BlockType.COMMAND,
            text: "set force input to [ENTER]",
            arguments: {
              ENTER: { type: Scratch.ArgumentType.STRING, menu: "enterMenu" }
            },
          },
          {
            opcode: "setMaxBoxCount",
            blockType: Scratch.BlockType.COMMAND,
            text: "set max box count to: [MAX]",
            arguments: {
              MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            },
          },
          {
            opcode: "getBoxInfo",
            blockType: Scratch.BlockType.REPORTER,
            text: "textbox [INFO]",
            arguments: {
              INFO: { type: Scratch.ArgumentType.STRING, menu: "boxInfo" }
            },
          }
        ],
        menus: {
          fontMenu: { acceptReporters: true, items: "allFonts" },
          buttonMenu: {
            acceptReporters: true,
            items: this.allButtons(["Dropdown"], false),
          },
          elementMenu: {
            acceptReporters: true,
            items: this.allButtons(["Textbox", "Input Box", "Dropdown Button"], false),
          },
          colorSettingsMenu: {
            acceptReporters: true,
            items: this.allButtons([
              "Textbox", "Question Text", "Textbox Shadow",
              "Input Text", "Input Box",
              "Dropdown Button", "Dropdown Text"
            ], true),
          },
          textsMenu: {
            acceptReporters: true,
            items: this.allButtons(["Question Text", "Input Text", "Dropdown Text"], true, true),
          },
          appendMenu: ["window", "canvas"],
          buttonType: { acceptReporters: true, items: ["add", "remove"] },
          buttonActionMenu: { acceptReporters: true, items: ["Enabled", "Disabled"] },
          alignmentMenu: { acceptReporters: true, items: ["left", "right", "center"] },
          shadowStuff: { acceptReporters: true, items: ["Size", "X", "Y"] },
          boxInfo: {
            acceptReporters: true,
            items: ["count", "limit", "button count", "button names"],
          },
          inputActionMenu: {
            acceptReporters: true,
            items: [
              "None", "Text", "Password", "Number", "Color",
              "Dropdown", "Single Dropdown", "Multi-Select Dropdown",
              "Horizontal Slider", "Vertical Slider"
            ],
          },
          effectMenu: {
            acceptReporters: true,
            items: [
              "Blur", "Brightness", "Opacity", "Invert",
              "Saturation", "Hue", "Sepia", "Contrast",
              "Scale", "SkewX", "SkewY",
            ],
          },
          enterMenu: {
            acceptReporters: true,
            items: ["Disabled", "Enter Key", "Shift + Enter Key"],
          },
          borderTypes: {
            acceptReporters: true,
            items: [
              "none", "solid", "dotted", "dashed",
              "double", "groove", "ridge", "inset", "outset"
            ],
          }
        },
      };
    }

    allFonts() {
      const custFonts = vm.runtime.fontManager ? vm.runtime.fontManager.getFonts().map((i) => ({ text: i.name, value: i.family })) : [];
      return [ ...fontMenu, ...custFonts ];
    }

    allButtons(array, enableTxt, justTxt) {
      let customBtn = Object.keys(this.buttonJSON);
      if (justTxt) customBtn = customBtn.map(btn => btn + " Text");
      else if (enableTxt) customBtn.forEach((btn) => { customBtn.push(btn + " Text") });
      return [ ...array, ...customBtn ];
    }

    updateOverlayPos(overlay) {
      if (this.Rotation > 359) this.Rotation = 0;
      else if (this.Rotation < 1) this.Rotation = 360;
      if (this.textBoxX !== null && this.textBoxY !== null) {
        if (this.appendTarget[0] === "window") {
          overlay.style.left = `${50 + this.textBoxX}%`;
          overlay.style.top = `${50 + this.textBoxY}%`;
        }
        overlay.style.transform = `
          translate${this.appendTarget[0] === "window" ? "(-50%, -50%)" : `(${-50 + this.textBoxX}%, ${-50 + this.textBoxY}%)` }
          SkewX(${this.SkewX}deg) SkewY(${this.SkewY}deg)
          rotate(${this.Rotation - 90}deg) scale(${this.Scale / 100})
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
      overlay.style.boxShadow = this.shadowEnabled ? `${this.shadowS[0]}px ${this.shadowS[1]}px ${this.shadowS[2]}px ${this.shadowS[3]}` : "none";
      overlay.style.transform = `
        translate${this.appendTarget[0] === "window" ? "(-50%, -50%)" : `(${-50 + this.textBoxX}%, ${-50 + this.textBoxY}%)` }
        SkewX(${this.SkewX}deg) SkewY(${this.SkewY}deg)
        rotate(${this.Rotation - 90}deg) scale(${this.Scale / 100})
      `;
      overlay.style.filter = `
        blur(${this.Blur}px) brightness(${newBrightness}%)
        invert(${this.Invert}%) saturate(${this.Saturation}%)
        hue-rotate(${this.Hue}deg) sepia(${this.Sepia}%)
        contrast(${this.Contrast}%)
      `;
      overlay.style.opacity = newOpacity;
      overlay.style.border = this.mainUIinfo.overlayBord;
      overlay.style.padding = this.mainUIinfo.overlayPad;
      overlay.style.fontFamily = this.fontFamily;
      overlay.style.textAlign = this.textAlign;
      overlay.style.borderRadius = `${this.mainUIinfo.overlayRad}px`;
      overlay.style.width = this.mainUIinfo.dimensions[0];
      overlay.style.height = this.mainUIinfo.dimensions[1];
      laidImgContain.style.borderRadius = `${this.mainUIinfo.overlayRad}px`;
      laidImgContain.style.background = "";
      this.setImageStyles(laidImgContain, this.overlayImage[0], this.imgScale[0]);
      this.updateButtonImages(overlay);
    }
    updateButtonImages(overlay) {
      let text = overlay.querySelector(".question");
      if (text) {
        text.style.color = this.questionColor;
        text.style.textShadow = this.mainUIinfo.overlayTxtShad;
        this.tryOutline(text, this.mainUIinfo.overlayOutline[0], this.mainUIinfo.overlayOutline[1]);
      }
      const inputField = overlay.querySelector(this.inputType.includes("Single") ? "select" : "input");
      if (inputField) {
        inputField.style.width = this.inputType === "Color" || this.inputType.includes("Single") ? "100%" :
          this.inputType === "Horizontal Slider" ? "95%" : "auto";
        inputField.style.background = "";
        inputField.style.fontFamily = this.fontFamily;
        inputField.style[this.inputFieldColor.includes("gradient") ? "backgroundImage" : "backgroundColor"] = this.inputFieldColor;
        inputField.style.color = this.inputColor; inputField.style.accentColor = this.inputFieldColor;
        inputField.style.textShadow = this.mainUIinfo.inputTxtShad;
        this.tryOutline(inputField, this.mainUIinfo.inputOutline[0], this.mainUIinfo.inputOutline[1]);
        inputField.style.border = this.mainUIinfo.inputBord;
        inputField.style.borderRadius = `${this.mainUIinfo.inputRad}px`;
        inputField.style.padding = this.mainUIinfo.inputPad;
        this.setImageStyles(inputField, this.overlayImage[1], this.imgScale[1]);
      }

      const dropBtn = overlay.querySelector("button.dropbtn");
      if (dropBtn) {
        dropBtn.style.backgroundImage = "";
        dropBtn.style.fontFamily = this.fontFamily;
        dropBtn.style.color = this.dropdwnBtnColor[1];
        dropBtn.style.borderRadius = `${this.mainUIinfo.dropBtnRad}px`;
        dropBtn.style.border = this.mainUIinfo.dropBtnBord;
        dropBtn.style.padding = this.mainUIinfo.dropBtnPad;
        dropBtn.style.textShadow = this.mainUIinfo.dropBtnTxtShad;
        this.tryOutline(dropBtn, this.mainUIinfo.dropBtnOutline[0], this.mainUIinfo.dropBtnOutline[1]);
        dropBtn.style[this.dropdwnBtnColor[0].includes("gradient") ? "backgroundImage" : "backgroundColor"] = this.dropdwnBtnColor[0];
        this.setImageStyles(dropBtn, this.overlayImage[2], this.imgScale[2]);
      }
      const btnContain = overlay.querySelector(".button-container");
      if (btnContain) {
        const buttons = btnContain.querySelectorAll("button");
        buttons.forEach((button, index) => {
          const buttonName = Object.keys(this.buttonJSON)[index];
          const buttonInfo = this.buttonJSON[buttonName];
          if (buttonInfo) {
            button.style.color = buttonInfo.textColor;
            button.style.fontFamily = this.fontFamily;
            button.style.borderRadius = `${buttonInfo.borderRadius}px`;
            button.style.border = buttonInfo.border;
            button.style.padding = buttonInfo.padding;
            button.style.textShadow = buttonInfo.dropShadow;
            this.tryOutline(button, buttonInfo.outline[0], buttonInfo.outline[1]);
            button.style.background = "";
            button.style[buttonInfo.color.includes("gradient") ? "backgroundImage" : "background"] = buttonInfo.color;
            this.setImageStyles(button, buttonInfo.image, buttonInfo.imgScale);
          }
        });
      }
    }
    tryOutline(element, color, thick) {
      element.style.webkitTextStrokeColor = color;
      element.style.webkitTextStrokeWidth = `${thick}px`;
      //multi-platform support cuz we cant have nice things
      element.style.textStrokeColor = color;
      element.style.textStrokeWidth = `${thick}px`;
      element.style.mozTextStrokeColor = color;
      element.style.mozTextStrokeWidth = `${thick}px`;
    }

    setImageStyles(element, url, scale) {
      if (Scratch.Cast.toString(url).length > 5) {
        Scratch.canFetch(encodeURI(url)).then((canFetch) => {
          if (canFetch) {
            element.style.background = `url(${encodeURI(url)})`;
            element.style.backgroundSize = `${scale}%`;
          } else { console.warn("Cannot fetch content from the URL") }
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
      this.Blur = 0; this.Brightness = 0; this.Opacity = 100; this.Invert = 0;
      this.Saturation = 100; this.Hue = 0; this.Sepia = 0; this.Contrast = 100;
      this.Scale = 100; this.SkewX = 0; this.SkewY = 0;
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    setColorSettings(args) {
      const colorType = args.COLOR_TYPE;
      const colorValue = args.COLOR;
      const colorTypeMap = {
        "Question Text": () => this.questionColor = colorValue,
        "Input Text": () => this.inputColor = colorValue,
        "Textbox": () => { this.textBoxColor[0] = colorValue; this.overlayImage[0] = " "; },
        "Textbox Shadow": () => { this.shadowS[3] = colorValue },
        "Input Box": () => { this.inputFieldColor = colorValue; this.overlayImage[1] = " "; },
        "Dropdown Button": () => { this.dropdwnBtnColor[0] = colorValue; this.overlayImage[2] = " "; },
        "Dropdown Text": () => this.dropdwnBtnColor[1] = colorValue,
      };
      const buttonInfo = this.buttonJSON[colorType] || this.buttonJSON[colorType.replace(" Text", "")];
      if (buttonInfo) {
        if (colorType.includes(" Text")) buttonInfo.textColor = colorValue;
        else {
          buttonInfo.color = colorValue;
          buttonInfo.image = " ";
        }
      }
      const applyColor = colorTypeMap[colorType];
      if (applyColor) applyColor();
      this.activeOverlays.forEach(overlay => this.updateOverlay(overlay));
    }

    findGradientType(menu) {
      const colorTypeMap = {
        Textbox: { newColorType: "textBoxColor", ind: 0 },
        "Dropdown Button": { newColorType: "dropdwnBtnColor", ind: 2 }
      };
      if (colorTypeMap[menu]) {
        const { newColorType, ind } = colorTypeMap[menu];
        this.overlayImage[ind] = " ";
        return newColorType;
      } else if (this.buttonJSON[menu]) { return ["button", menu] }
      return menu;
    }

    callStyling(element, value, type, elements) {
      const elementID = elements[element];
      if (elementID !== undefined) this.mainUIinfo[elementID] = value;
      else if (this.buttonJSON[element]) this.buttonJSON[element][type] = value;
      this.activeOverlays.forEach(overlay => this.updateOverlay(overlay));
    }

    setBorder(args) {
      const width = Scratch.Cast.toNumber(args.WIDTH);
      const string = `${width}px ${args.TYPE} ${args.COLOR}`;
      this.callStyling(
        args.ELEMENT, string, "border",
        { Textbox: "overlayBord", "Input Box": "inputBord", "Dropdown Button": "dropBtnBord" }
      );
    }

    setBorderRadius(args) {
      this.callStyling(
        args.ELEMENT, Math.max(args.VALUE, 0), "borderRadius",
        { Textbox: "overlayRad", "Input Box": "inputRad", "Dropdown Button": "dropBtnRad" }
      );
    }

    setPadding(args) {
      const casted = [
        Scratch.Cast.toNumber(args.N1), Scratch.Cast.toNumber(args.N2),
        Scratch.Cast.toNumber(args.N3), Scratch.Cast.toNumber(args.N4)
      ];
      let pad = `${casted[0]}px ${casted[1]}px ${casted[2]}px ${casted[3]}px`;
      this.callStyling(
        args.ELEMENT, pad, "padding",
        { Textbox: "overlayPad", "Input Box": "inputPad", "Dropdown Button": "dropBtnPad" }
      );
    }

    setDropShadow(args) {
      const casted = [
        Scratch.Cast.toNumber(args.x), Scratch.Cast.toNumber(args.y), Scratch.Cast.toNumber(args.z)
      ];
      let shadow = args.z === 0 ? "none" : `${casted[0]}px ${casted[1] * -1}px ${casted[2]}px ${args.COLOR}`;
      this.callStyling(
        args.ELEMENT.slice(0, -5), shadow, "dropShadow",
        { "Question": "overlayTxtShad", "Input": "inputTxtShad", "Dropdown": "dropBtnTxtShad" }
      );
    }

    setOutline(args) {
      const thick = Scratch.Cast.toNumber(args.THICK);
      this.callStyling(
        args.ELEMENT.slice(0, -5), [args.COLOR, thick], "outline",
        { "Question": "overlayOutline", "Input": "inputOutline", "Dropdown": "dropBtnOutline" }
      );
    }

    setShadow(args) {
      const shadowMap = { Size: 2, X: 0, Y: 1 };
      const propertyIndex = shadowMap[args.SHADOW];
      if (propertyIndex !== undefined) this.shadowS[propertyIndex] = args.AMT;
      this.activeOverlays.forEach(overlay => this.updateOverlay(overlay));
    }

    setImage(args) {
      const elementMap = { Textbox: 0, "Input Box": 1, "Dropdown Button": 2 };
      const elementIndex = elementMap[args.ELEMENT];
      if (elementIndex !== undefined) this.overlayImage[elementIndex] = args.IMAGE;
      else if (this.buttonJSON[args.ELEMENT]) this.buttonJSON[args.ELEMENT].image = args.IMAGE;
      this.activeOverlays.forEach(overlay => this.updateOverlay(overlay));
    }

    scaleImage(args) {
      const elementMap = { Textbox: 0, "Input Box": 1, "Dropdown Button": 2 };
      const elementIndex = elementMap[args.ELEMENT];
      if (elementIndex !== undefined) this.imgScale[elementIndex] = args.SCALE;
      else if (this.buttonJSON[args.ELEMENT]) this.buttonJSON[args.ELEMENT].imgScale = args.SCALE;
      this.activeOverlays.forEach(overlay => this.updateOverlay(overlay));
    }

    setDimension(args) {
      const w = `${Scratch.Cast.toNumber(args.W)}px`;
      const h = `${Scratch.Cast.toNumber(args.H)}px`;
      // Negative numbers result in auto-dimensions
      this.mainUIinfo.dimensions = [w.includes("-") ? "auto" : w, h.includes("-") ? "auto" : h];
      this.activeOverlays.forEach(overlay => this.updateOverlay(overlay));
    }

    setDirection(args) {
      this.Rotation = Scratch.Cast.toNumber(args.ROTATE);
      this.activeOverlays.forEach((overlay) => { this.updateOverlay(overlay) });
    }

    changeDirection(args) {
      this.Rotation = this.Rotation + Scratch.Cast.toNumber(args.ROTATE);
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
      if (args.ACTION === "Text" || args.ACTION ===  "None") this.inputType = args.ACTION === "Text" ? "Enabled" : "Disabled";
      else this.inputType = args.ACTION;
    }

    enableShadow(args) { this.shadowEnabled = args.ACTION === "Enabled" }

    setButtonText(args) {
      const buttonMenu = args.BUTTON_MENU;
      const text = args.TEXT;
      if (buttonMenu === "Dropdown") this.DropdownText = text;
      else if (this.buttonJSON[buttonMenu]) {
        this.buttonJSON[buttonMenu].name = text;
        vm.extensionManager.refreshBlocks();
      }
    }

    setDropdown(args) {
      try {
        this.optionList = JSON.parse(args.DROPDOWN);
      } catch { this.optionList = ["Invalid Array"] }
    }

    removeAskBoxes() {
      const overlaysToRemove = [];
      this.activeOverlays.forEach((overlay) => {
        if (overlay) {
          if (this.appendTarget[0] === "window" && overlay.parentNode) overlay.parentNode.removeChild(overlay);
          else if (overlay.parentNode.parentNode !== document.documentElement) overlay.parentNode.parentNode.removeChild(overlay.parentNode);
          overlaysToRemove.push(overlay);
        }
        if (this.askBoxPromises) {
          const index = this.activeOverlays.indexOf(overlay);
          if (index !== -1) this.askBoxPromises[index].resolve("removed");
        }
      });
      this.askBoxPromises = [];
      this.activeOverlays = this.activeOverlays.filter((overlay) => !overlaysToRemove.includes(overlay));
      this.askBoxInfo[0] = 0;
      this.isDropdownOpen = false;
      const bugged = document.querySelectorAll(`div[class^="SP-ask-box"]`);
      bugged.forEach((box) => { box.parentNode.removeChild(box) });
    }

    resetInput() { this.userInput = this.askBoxInfo[1] > 1 ? [] : "" }

    askAndWaitForInput(args) {
      if (this.askBoxInfo[0] < this.askBoxInfo[1] ) {
        return this.askAndWait(args).then(() => { return this.getUserInput() });
      }
    }

    askAndWait(args) {
      if (this.askBoxInfo[0] < this.askBoxInfo[1]) {
        const question = args.question;
        let hasDecreased = false; // for the box counter
        const index = this.askBoxInfo[0];
        this.isWaitingForInput = true;
        this.lastPressBtn = "";
        this.askBoxInfo[0]++;
        let selectOpts = [];
        return new Promise((resolve) => {
          this.askBoxPromises.push({ resolve });
          const overlay = document.createElement("div");
          overlay.classList.add("SP-ask-box");
          overlay.style.pointerEvents = "auto";
          overlay.style.position = "fixed";
          overlay.style.fontSize = this.fontSize;
          overlay.style.left = this.appendTarget[0] === "window" ? `${50 + this.textBoxX}%` : "0%";
          overlay.style.top = this.appendTarget[0] === "window" ? `${50 + this.textBoxY}%` : "0%";

          const focusBG = document.createElement("div");
          focusBG.style.cssText = "pointer-events: auto; position: fixed; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 9998;";
          focusBG.className = "SP-ask-boxBG";
          focusBG.id = this.appendTarget[0];
          focusBG.style.left = this.appendTarget[0] === "window" ? "0%" : "-50%";
          focusBG.style.top = this.appendTarget[0] === "window" ? "0%" : "-50%";

          laidImgContain = document.createElement("div");
          laidImgContain.style.width = "100%";
          laidImgContain.style.height = "100%";
          laidImgContain.style.position = "absolute";
          laidImgContain.style.top = 0;
          laidImgContain.style.left = 0;
          laidImgContain.style.zIndex = "-1";
          if (this.forceInput !== "Disabled") {
            const overlayInput = this.forceInput === "Enter Key" ? "Enter" : this.forceInput === "Shift + Enter Key" ? "ShiftEnter" : this.forceInput;
            const handleKeydown = (event) => {
              if ((overlayInput === "ShiftEnter" && event.shiftKey && event.key === "Enter") || event.key === overlayInput) {
                setInpValue(inputField.value);
                this.closeOverlay(overlay, hasDecreased);
                hasDecreased = true;
                resolve();
              }
            };
            const observer = new MutationObserver((mutationsList) => {
              for (const mutation of mutationsList) {
                if (mutation.type === "childList" && !document.contains(overlay)) {
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
          if (this.uiOrder[0] !== "question") questionText.style.marginTop = "10px";
          if (this.uiOrder[0] === "question") questionText.style.marginBottom = "10px";
          questionText.innerHTML = xmlEscape(question).replace(/\n/g, "<br>");

          const inputField = document.createElement("input");
          inputField.style.display = this.inputType ? "block" : "none";
          inputField.style.fontSize = this.fontSize;
          inputField.style.margin = "0 auto";
          inputField.type = this.inputType.toLowerCase();
          const setInpValue = (val) => {
            inputField.value = val;
            if (this.askBoxInfo[1] == 1) this.userInput = inputField.value;
            else {
              const newInput = [...this.userInput];
              newInput[index] = inputField.value;
              this.userInput = newInput;
            }
          }
          inputField.addEventListener("input", () => { setInpValue(inputField.value) });
          const btnContain = document.createElement("div");
          btnContain.classList.add("button-container");
          for (const buttonName in this.buttonJSON) {
            const btnInfo = this.buttonJSON[buttonName];
            if (btnInfo.name.includes("<newline>")) btnContain.appendChild(document.createElement("br"));
            else {
              const btn = document.createElement("button");
              if (this.uiOrder[0] !== "buttons") btn.style.marginTop = "10px";
              if (this.uiOrder[2] !== "buttons") btn.style.marginBottom = "10px";
              btn.style.marginRight = "5px";
              btn.style.cursor = "pointer";
              btn.innerHTML = xmlEscape(btnInfo.name).replace(/\n/g, "<br>");
              btn.style.display = "inline-block";
              btn.addEventListener("click", () => {
                this.lastPressBtn = btnInfo.name;
                setInpValue(this.inputType === "Disabled" ? btnInfo.name : this.userInput);
                this.closeOverlay(overlay, hasDecreased);
                hasDecreased = true;
                resolve();
              });
              btnContain.appendChild(btn);
            }
          }
          let dropdwnCont, dropdwnBtn, sliderContain, valTxt;
          if (this.inputType.includes("Dropdown")) {
            const dropdown = document.createElement("div");
            dropdown.className = "dropdown";
            if (this.inputType === "Single Dropdown") {
              dropdwnBtn = document.createElement("select");
              this.optionList.forEach((label) => {
                let opt = document.createElement("option");
                opt.value = label; opt.text = label;
                dropdwnBtn.appendChild(opt);
              });
              dropdwnBtn.addEventListener("input", () => { setInpValue(dropdwnBtn.value) });
              setInpValue(dropdwnBtn.value);
            } else {
              dropdwnBtn = document.createElement("button");
              dropdwnBtn.className = "dropbtn";
              dropdwnBtn.innerHTML = xmlEscape(this.DropdownText).replace(/\n/g, "<br>");
              dropdwnCont = document.createElement("div");
              dropdwnCont.id = "myDropdown";
              dropdwnCont.className = "dropdown-content";
              dropdwnCont.style.display = "none";
              this.optionList.forEach((label, index) => {
                const optTxt = document.createElement("label");
                optTxt.style.color = this.questionColor;
                optTxt.textContent = "";
                const optRadio = document.createElement("input");
                optRadio.type = this.inputType === "Dropdown" ? "radio" : "checkbox";
                optRadio.name = "dropdownOptions";
                optRadio.value = index;
                optRadio.classList.add("dropdown-radio");
                optRadio.addEventListener("click", () => {
                  if (this.inputType === "Multi-Select Dropdown") {
                    if (selectOpts.includes(label)) selectOpts = selectOpts.filter(item => item !== label);
                    else selectOpts.push(label);
                    inputField.value = selectOpts.length > 0 ? JSON.stringify(selectOpts) : "";
                  } else { inputField.value = label }
                  setInpValue(inputField.value)
                });
                optTxt.append(optRadio, document.createTextNode(" " + label), document.createElement("br"));
                dropdwnCont.appendChild(optTxt);
              });
              dropdwnBtn.addEventListener("click", () => {
                this.lastPressBtn = this.DropdownText;
                dropdwnCont.style.display = this.isDropdownOpen ? "none" : "block";
                this.isDropdownOpen = !this.isDropdownOpen;
              });
            }
          } else if (this.inputType.includes("Slider")) {
            sliderContain = document.createElement("div");
            sliderContain.classList.add("slider-container");
            const slider = document.createElement("input");
            slider.type = "range";
            slider.min = this.sliderInfo[0]; slider.max = this.sliderInfo[1]; slider.value = this.sliderInfo[2];
            if (this.inputType.includes("Vertical")) {
              slider.style.writingMode = "vertical-lr";
              slider.style.direction = "rtl";
            }
            sliderContain.appendChild(slider);
            valTxt = document.createElement("span");
            valTxt.classList.add("slider-value");
            sliderContain.appendChild(valTxt);
            valTxt.style.color = this.questionColor;
            valTxt.textContent = slider.value;
            slider.addEventListener("input", () => {
              valTxt.textContent = slider.value;
              setInpValue(valTxt.textContent);
            });
            setInpValue(valTxt.textContent);
          }
          for (const item of this.uiOrder) {
            switch (item) {
              case "question": { overlay.appendChild(questionText); break }
              case "input":
                if (this.inputType !== "Disabled") {
                  const createBr = () => { return document.createElement("br") };
                  if (this.inputType === "Single Dropdown") overlay.append(dropdwnBtn, createBr());
                  else if (this.inputType.includes("Dropdown")) overlay.append(dropdwnBtn, dropdwnCont, createBr());
                  else if (this.inputType.includes("Slider")) overlay.append(sliderContain, valTxt, createBr());
                  else {
                    setInpValue(this.defaultValue);
                    overlay.appendChild(inputField);
                  }
                }
                break;
              case "buttons": { overlay.appendChild(btnContain); break }
            }
          }
          overlay.appendChild(laidImgContain);
          if (this.appendTarget[0] === "window") {
            document.body.appendChild(overlay);
            if (this.appendTarget[1]) document.body.appendChild(focusBG);
          }
          inputField.focus();
          this.activeOverlays.push(overlay);
          if (this.appendTarget[0] === "window") {
            const resizeHandler = () => {
              overlay.style.left = `${this.textBoxX !== null ? 50 + this.textBoxX : 50}%`;
              overlay.style.top = `${this.textBoxY !== null ? 50 + this.textBoxY : 50}%`;
            };
            document.addEventListener("fullscreenchange", resizeHandler);
            document.addEventListener("webkitfullscreenchange", resizeHandler);
            document.addEventListener("mozfullscreenchange", resizeHandler);
            document.addEventListener("MSFullscreenChange", resizeHandler);
            const observer = new MutationObserver((mutationsList) => {
              for (const mutation of mutationsList) {
                if (mutation.type === "childList" && Array.from(mutation.removedNodes).includes(overlay)) {
                  document.removeEventListener("fullscreenchange", resizeHandler);
                  document.removeEventListener("webkitfullscreenchange", resizeHandler);
                  document.removeEventListener("mozfullscreenchange", resizeHandler);
                  document.removeEventListener("MSFullscreenChange", resizeHandler);
                  observer.disconnect();
                }
              }
            });
            observer.observe(overlay.parentNode, { childList: true });
            document.body.appendChild(overlay);
          } else {
            if (this.appendTarget[1]) vm.renderer.addOverlay(focusBG, "scale-centered");
            vm.renderer.addOverlay(overlay, "scale-centered");
          }
          inputField.focus();
          if (this.appendTarget[0] === "window") overlay.style.zIndex = "9999";
          else overlay.parentNode.style.zIndex = "9999";
          this.updateOverlay(overlay);
        });
      }
    }
    closeOverlay(overlay, doneBefore) {
      if (this.askBoxInfo[0] < 2) this.isWaitingForInput = false;
      this.isDropdownOpen = false;
      if (!doneBefore) {
        this.askBoxInfo[0]--;
        let usedBG = document.querySelectorAll(`div[class="SP-ask-boxBG"]`);
        usedBG = usedBG[usedBG.length - 1];
        // ^ Prioritizes Textboxes on Window
        const index = this.activeOverlays.indexOf(overlay);
        setTimeout(() => {
          if (index !== -1) {
            this.activeOverlays.splice(index, 1);
            this.askBoxPromises.splice(index, 1);
          }
          if (this.appendTarget[0] === "window") document.body.removeChild(overlay);
          else vm.renderer.removeOverlay(overlay);
          if (usedBG) {
            if (usedBG.id === "window") document.body.removeChild(usedBG);
            else vm.renderer.removeOverlay(usedBG);
          }
        }, this.Timeout * 1000);
      }
    }

    setButton(args) {
      if (args.BUTTON === "add") {
        this.buttonJSON[args.NAME] = {
          borderRadius: 5, border: "1px none #000000",
          color: "#0074D9", textColor: "#ffffff",
          name: args.NAME, padding: "5px 10px",
          image: "", imgScale: 100,
          dropShadow: "none", outline: ["", 0]
        };
      } else { delete this.buttonJSON[args.NAME] }
      vm.extensionManager.refreshBlocks();
    }

    deleteAllButtons() {
      this.buttonJSON = {};
      vm.extensionManager.refreshBlocks();
    }

    lastButton() { return this.lastPressBtn }

    isWaitingInput() { return this.isWaitingForInput }

    isDropdown() { return this.isDropdownOpen }

    setMaxBoxCount(args) {
      this.askBoxInfo[1] = Scratch.Cast.toNumber(args.MAX);
      if (this.askBoxInfo[1] > 1 && !Array.isArray(this.userInput)) this.userInput = [this.userInput];
    }

    setTimeout(args) { this.Timeout = Scratch.Cast.toNumber(args.TIME) }

    reportTimeout() { return this.Timeout }

    getUserInput() {
      if (this.askBoxInfo[1] > 1) return this.userInput === null ? "[]" : JSON.stringify(this.userInput);
      else return this.userInput === null ? "" : this.userInput;
    }

    getBoxInfo(args) {
      if (args.INFO.includes("button")) {
        const buttons = Object.keys(this.buttonJSON);
        return args.INFO.includes("names") ? JSON.stringify(buttons) : buttons.length;
      } else { return this.askBoxInfo[args.INFO === "count" ? 0 : 1] }
    }

    setSubmitEvent(args) { this.forceInput = args.ENTER }

    setDefaultV(args) { this.defaultValue = args.defaultV }

    setAppend(args) { this.appendTarget[0] = args.TARGET }
    setFocus(args) { this.appendTarget[1] = args.TYPE === "Enabled" }

    setUI(args) {
      let array;
      try { array = JSON.parse(args.ARRAY.toLowerCase()) } catch { return }
      if (!Array.isArray(array)) return;
      const allowedUI = ["question", "input", "buttons"];
      let filteredArray = [...new Set(array.filter(element => allowedUI.includes(element)))];
      allowedUI.forEach(element => {
        if (!filteredArray.includes(element)) filteredArray.push(element);
      });
      this.uiOrder = filteredArray;
    }

    getUIOrder() { return JSON.stringify(this.uiOrder) }
  }

  Scratch.extensions.register(new BetterInputSP());
})(Scratch);
