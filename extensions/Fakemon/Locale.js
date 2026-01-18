// Name: Locale
// ID: fakemonLocale
// Description: Blocks for manual l10n translations.
// By: Scratch_Fakemon <https://scratch.mit.edu/users/Scratch_Fakemon/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The Locale extension must run unsandboxed!");
  }

  let localeObject =
    // @ts-ignore
    Scratch.vm.runtime.extensionStorage["fakemonLocale"]?.localeObject || {};
  let blockExtensionIcon =
    "data:image/svg+xml,%3Csvg%20width%3D%22152%22%20height%3D%22152%22%20viewBox%3D%220%200%20152%20152%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23a)%22%3E%3Cg%20filter%3D%22url(%23b)%22%3E%3Cpath%20d%3D%22M100.439%2040.336a6%206%200%200%201%206%206v61.178a6%206%200%200%201-6%206H41.394L31.906%20123l-9.516-9.517a6%206%200%200%201-5.39-5.969V46.337a6%206%200%200%201%206-6.001z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22m100.439%2040.336.001-2.5h-.001zm0%2073.178v2.5h.001zm-59.045%200v-2.5h-1.036l-.732.732zM31.906%20123l-1.767%201.768%201.767%201.767%201.768-1.767zm-9.516-9.517%201.767-1.767-.63-.63-.886-.09zm78.049-73.147v2.5a3.5%203.5%200%200%201%203.5%203.5h5a8.5%208.5%200%200%200-8.499-8.5zm6%206h-2.5v61.178h5V46.337zm0%2061.178h-2.5a3.5%203.5%200%200%201-3.5%203.5v2.5l.001%202.5a8.5%208.5%200%200%200%208.499-8.5zm-6%206v-2.5H41.394v5h59.045zm-59.045%200-1.768-1.768-9.487%209.486L31.906%20123l1.768%201.768%209.487-9.486zM31.906%20123l1.768-1.768-9.517-9.516-1.767%201.767-1.768%201.768%209.517%209.517zm-9.516-9.517.25-2.487a3.5%203.5%200%200%201-3.14-3.482h-5a8.5%208.5%200%200%200%207.638%208.457zM17%20107.514h2.5V46.337h-5v61.177zm0-61.177h2.5a3.5%203.5%200%200%201%203.5-3.501v-5a8.5%208.5%200%200%200-8.5%208.5zm6-6.001v2.5h77.439v-5H23z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.15%22%2F%3E%3Cg%20filter%3D%22url(%23c)%22%3E%3Cpath%20d%3D%22M128.196%2028a6%206%200%200%201%206%206v61.178a6%206%200%200%201-6%206H69.149l-9.486%209.486-9.516-9.518a6%206%200%200%201-5.39-5.968V34a6%206%200%200%201%206-6z%22%20fill%3D%22%23438feb%22%20shape-rendering%3D%22crispEdges%22%2F%3E%3Cpath%20d%3D%22M128.196%2028v-2.5zm6%2067.178h2.5zm-6%206v2.5zm-59.047%200v-2.5h-1.035l-.732.732zm-9.486%209.486-1.768%201.768%201.768%201.768%201.768-1.768zm-9.516-9.518%201.767-1.767-.63-.63-.886-.09zm-5.39-5.968h-2.5zm0-61.178h-2.5zm6-6v-2.5zm77.439%200v2.5a3.5%203.5%200%200%201%203.5%203.5h5a8.5%208.5%200%200%200-8.5-8.5zm6%206h-2.5v61.178h5V34zm0%2061.178h-2.5a3.5%203.5%200%200%201-3.5%203.5v5a8.5%208.5%200%200%200%208.5-8.5zm-6%206v-2.5H69.149v5h59.047zm-59.047%200-1.767-1.768-9.487%209.486%201.768%201.768%201.768%201.768%209.486-9.486zm-9.486%209.486%201.768-1.768-9.517-9.517-1.767%201.767-1.768%201.768%209.516%209.518zm-9.516-9.518.25-2.487a3.5%203.5%200%200%201-3.14-3.481h-5c0%204.404%203.348%208.022%207.638%208.456zm-5.39-5.968h2.5V34h-5v61.178zm0-61.178h2.5a3.5%203.5%200%200%201%203.5-3.5v-5a8.5%208.5%200%200%200-8.5%208.5zm6-6v2.5h77.439v-5h-77.44z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.15%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cdefs%3E%3Cfilter%20id%3D%22b%22%20x%3D%2214.5%22%20y%3D%2237.836%22%20width%3D%2294.439%22%20height%3D%2292.7%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22shape%22%2F%3E%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%3CfeOffset%20dy%3D%224%22%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%222%22%2F%3E%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22arithmetic%22%20k2%3D%22-1%22%20k3%3D%221%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.25%200%22%2F%3E%3CfeBlend%20in2%3D%22shape%22%20result%3D%22effect1_innerShadow_131_48%22%2F%3E%3C%2Ffilter%3E%3Cfilter%20id%3D%22c%22%20x%3D%2238.257%22%20y%3D%2225.5%22%20width%3D%22102.439%22%20height%3D%2296.7%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%3CfeOffset%20dy%3D%224%22%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%222%22%2F%3E%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.25%200%22%2F%3E%3CfeBlend%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_131_48%22%2F%3E%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_131_48%22%20result%3D%22shape%22%2F%3E%3C%2Ffilter%3E%3CclipPath%20id%3D%22a%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M0%200h152v152H0z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E";
  let menuExtensionIcon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUyIiBoZWlnaHQ9IjE1MiIgdmlld0JveD0iMCAwIDE1MiAxNTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMzFfNDgpIj4KPGNpcmNsZSBjeD0iNzYiIGN5PSI3NiIgcj0iNzYiIGZpbGw9IiMyNDVDQTAiLz4KPGNpcmNsZSBjeD0iNzYiIGN5PSI3NiIgcj0iNzMuNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiIHN0cm9rZS13aWR0aD0iNSIvPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9pXzEzMV80OCkiPgo8cGF0aCBkPSJNMTAwLjQzOSA0MC4zMzU5QzEwMy43NTMgNDAuMzM2MSAxMDYuNDM5IDQzLjAyMzMgMTA2LjQzOSA0Ni4zMzY5VjEwNy41MTRDMTA2LjQzOSAxMTAuODI3IDEwMy43NTMgMTEzLjUxNCAxMDAuNDM5IDExMy41MTRINDEuMzkzNkwzMS45MDYyIDEyM0wyMi4zODk2IDExMy40ODNDMTkuMzYyNiAxMTMuMTc4IDE3IDExMC42MjEgMTcgMTA3LjUxNFY0Ni4zMzY5QzE3IDQzLjAyMzIgMTkuNjg2MyA0MC4zMzU5IDIzIDQwLjMzNTlIMTAwLjQzOVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPHBhdGggZD0iTTEwMC40MzkgNDAuMzM1OUwxMDAuNDQgMzcuODM1OUgxMDAuNDM5VjQwLjMzNTlaTTEwMC40MzkgMTEzLjUxNFYxMTYuMDE0SDEwMC40NEwxMDAuNDM5IDExMy41MTRaTTQxLjM5MzYgMTEzLjUxNFYxMTEuMDE0SDQwLjM1ODFMMzkuNjI1OSAxMTEuNzQ2TDQxLjM5MzYgMTEzLjUxNFpNMzEuOTA2MiAxMjNMMzAuMTM4NSAxMjQuNzY4TDMxLjkwNjIgMTI2LjUzNUwzMy42NzM5IDEyNC43NjhMMzEuOTA2MiAxMjNaTTIyLjM4OTYgMTEzLjQ4M0wyNC4xNTc0IDExMS43MTZMMjMuNTI3NCAxMTEuMDg2TDIyLjY0MDkgMTEwLjk5NkwyMi4zODk2IDExMy40ODNaTTEwMC40MzkgNDAuMzM1OUwxMDAuNDM5IDQyLjgzNTlDMTAyLjM3MiA0Mi44MzYgMTAzLjkzOSA0NC40MDM2IDEwMy45MzkgNDYuMzM2OUgxMDYuNDM5SDEwOC45MzlDMTA4LjkzOSA0MS42NDMgMTA1LjEzNCAzNy44MzYyIDEwMC40NCAzNy44MzU5TDEwMC40MzkgNDAuMzM1OVpNMTA2LjQzOSA0Ni4zMzY5SDEwMy45MzlWMTA3LjUxNEgxMDYuNDM5SDEwOC45MzlWNDYuMzM2OUgxMDYuNDM5Wk0xMDYuNDM5IDEwNy41MTRIMTAzLjkzOUMxMDMuOTM5IDEwOS40NDYgMTAyLjM3MiAxMTEuMDE0IDEwMC40MzkgMTExLjAxNEwxMDAuNDM5IDExMy41MTRMMTAwLjQ0IDExNi4wMTRDMTA1LjEzNCAxMTYuMDEzIDEwOC45MzkgMTEyLjIwOCAxMDguOTM5IDEwNy41MTRIMTA2LjQzOVpNMTAwLjQzOSAxMTMuNTE0VjExMS4wMTRINDEuMzkzNlYxMTMuNTE0VjExNi4wMTRIMTAwLjQzOVYxMTMuNTE0Wk00MS4zOTM2IDExMy41MTRMMzkuNjI1OSAxMTEuNzQ2TDMwLjEzODYgMTIxLjIzMkwzMS45MDYyIDEyM0wzMy42NzM5IDEyNC43NjhMNDMuMTYxMiAxMTUuMjgyTDQxLjM5MzYgMTEzLjUxNFpNMzEuOTA2MiAxMjNMMzMuNjc0IDEyMS4yMzJMMjQuMTU3NCAxMTEuNzE2TDIyLjM4OTYgMTEzLjQ4M0wyMC42MjE5IDExNS4yNTFMMzAuMTM4NSAxMjQuNzY4TDMxLjkwNjIgMTIzWk0yMi4zODk2IDExMy40ODNMMjIuNjQwOSAxMTAuOTk2QzIwLjg3ODEgMTEwLjgxOCAxOS41IDEwOS4zMjUgMTkuNSAxMDcuNTE0SDE3SDE0LjVDMTQuNSAxMTEuOTE4IDE3Ljg0NzIgMTE1LjUzNyAyMi4xMzg0IDExNS45NzFMMjIuMzg5NiAxMTMuNDgzWk0xNyAxMDcuNTE0SDE5LjVWNDYuMzM2OUgxN0gxNC41VjEwNy41MTRIMTdaTTE3IDQ2LjMzNjlIMTkuNUMxOS41IDQ0LjQwMzQgMjEuMDY3NSA0Mi44MzU5IDIzIDQyLjgzNTlWNDAuMzM1OVYzNy44MzU5QzE4LjMwNSAzNy44MzU5IDE0LjUgNDEuNjQzIDE0LjUgNDYuMzM2OUgxN1pNMjMgNDAuMzM1OVY0Mi44MzU5SDEwMC40MzlWNDAuMzM1OVYzNy44MzU5SDIzVjQwLjMzNTlaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjE1Ii8+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIxX2RfMTMxXzQ4KSI+CjxwYXRoIGQ9Ik0xMjguMTk2IDI4QzEzMS41MSAyOC4wMDAxIDEzNC4xOTYgMzAuNjg2MyAxMzQuMTk2IDM0Vjk1LjE3NzdDMTM0LjE5NiA5OC40OTEzIDEzMS41MSAxMDEuMTc4IDEyOC4xOTYgMTAxLjE3OEg2OS4xNDk0TDU5LjY2MzEgMTEwLjY2NEw1MC4xNDY1IDEwMS4xNDZDNDcuMTE5NiAxMDAuODQxIDQ0Ljc1NyA5OC4yODUyIDQ0Ljc1NjggOTUuMTc3N1YzNEM0NC43NTY4IDMwLjY4NjQgNDcuNDQzMiAyOC4wMDAxIDUwLjc1NjggMjhIMTI4LjE5NloiIGZpbGw9IiM0MzhGRUIiIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyIvPgo8cGF0aCBkPSJNMTI4LjE5NiAyOEwxMjguMTk2IDI1LjVIMTI4LjE5NlYyOFpNMTM0LjE5NiA5NS4xNzc3TDEzNi42OTYgOTUuMTc3OFY5NS4xNzc3SDEzNC4xOTZaTTEyOC4xOTYgMTAxLjE3OFYxMDMuNjc4SDEyOC4xOTZMMTI4LjE5NiAxMDEuMTc4Wk02OS4xNDk0IDEwMS4xNzhWOTguNjc3N0g2OC4xMTM5TDY3LjM4MTYgOTkuNDFMNjkuMTQ5NCAxMDEuMTc4Wk01OS42NjMxIDExMC42NjRMNTcuODk1MiAxMTIuNDMyTDU5LjY2MyAxMTQuMkw2MS40MzA5IDExMi40MzJMNTkuNjYzMSAxMTAuNjY0Wk01MC4xNDY1IDEwMS4xNDZMNTEuOTE0MyA5OS4zNzg4TDUxLjI4NDMgOTguNzQ4N0w1MC4zOTc5IDk4LjY1OTJMNTAuMTQ2NSAxMDEuMTQ2Wk00NC43NTY4IDk1LjE3NzdINDIuMjU2OFY5NS4xNzc4TDQ0Ljc1NjggOTUuMTc3N1pNNDQuNzU2OCAzNEw0Mi4yNTY4IDM0VjM0SDQ0Ljc1NjhaTTUwLjc1NjggMjhWMjUuNUg1MC43NTY4TDUwLjc1NjggMjhaTTEyOC4xOTYgMjhMMTI4LjE5NiAzMC41QzEzMC4xMjkgMzAuNSAxMzEuNjk2IDMyLjA2NzEgMTMxLjY5NiAzNEgxMzQuMTk2SDEzNi42OTZDMTM2LjY5NiAyOS4zMDU2IDEzMi44OTEgMjUuNTAwMSAxMjguMTk2IDI1LjVMMTI4LjE5NiAyOFpNMTM0LjE5NiAzNEgxMzEuNjk2Vjk1LjE3NzdIMTM0LjE5NkgxMzYuNjk2VjM0SDEzNC4xOTZaTTEzNC4xOTYgOTUuMTc3N0wxMzEuNjk2IDk1LjE3NzZDMTMxLjY5NiA5Ny4xMTA2IDEzMC4xMjkgOTguNjc3NyAxMjguMTk2IDk4LjY3NzdMMTI4LjE5NiAxMDEuMTc4TDEyOC4xOTYgMTAzLjY3OEMxMzIuODkxIDEwMy42NzggMTM2LjY5NiA5OS44NzIgMTM2LjY5NiA5NS4xNzc4TDEzNC4xOTYgOTUuMTc3N1pNMTI4LjE5NiAxMDEuMTc4Vjk4LjY3NzdINjkuMTQ5NFYxMDEuMTc4VjEwMy42NzhIMTI4LjE5NlYxMDEuMTc4Wk02OS4xNDk0IDEwMS4xNzhMNjcuMzgxNiA5OS40MUw1Ny44OTUzIDEwOC44OTZMNTkuNjYzMSAxMTAuNjY0TDYxLjQzMDkgMTEyLjQzMkw3MC45MTcyIDEwMi45NDZMNjkuMTQ5NCAxMDEuMTc4Wk01OS42NjMxIDExMC42NjRMNjEuNDMwOSAxMDguODk2TDUxLjkxNDMgOTkuMzc4OEw1MC4xNDY1IDEwMS4xNDZMNDguMzc4NiAxMDIuOTE0TDU3Ljg5NTIgMTEyLjQzMkw1OS42NjMxIDExMC42NjRaTTUwLjE0NjUgMTAxLjE0Nkw1MC4zOTc5IDk4LjY1OTJDNDguNjM0NiA5OC40ODA5IDQ3LjI1NjkgOTYuOTg4NSA0Ny4yNTY4IDk1LjE3NzZMNDQuNzU2OCA5NS4xNzc3TDQyLjI1NjggOTUuMTc3OEM0Mi4yNTcgOTkuNTgxOSA0NS42MDQ3IDEwMy4yIDQ5Ljg5NTEgMTAzLjYzNEw1MC4xNDY1IDEwMS4xNDZaTTQ0Ljc1NjggOTUuMTc3N0g0Ny4yNTY4VjM0SDQ0Ljc1NjhINDIuMjU2OFY5NS4xNzc3SDQ0Ljc1NjhaTTQ0Ljc1NjggMzRMNDcuMjU2OCAzNEM0Ny4yNTY4IDMyLjA2NzEgNDguODIzOSAzMC41MDAxIDUwLjc1NjkgMzAuNUw1MC43NTY4IDI4TDUwLjc1NjggMjUuNUM0Ni4wNjI2IDI1LjUwMDEgNDIuMjU2OCAyOS4zMDU2IDQyLjI1NjggMzRMNDQuNzU2OCAzNFpNNTAuNzU2OCAyOFYzMC41SDEyOC4xOTZWMjhWMjUuNUg1MC43NTY4VjI4WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L2c+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaV8xMzFfNDgiIHg9IjE0LjUiIHk9IjM3LjgzNTkiIHdpZHRoPSI5NC40Mzk1IiBoZWlnaHQ9IjkyLjY5OTUiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0ic2hhcGUiIHJlc3VsdD0iZWZmZWN0MV9pbm5lclNoYWRvd18xMzFfNDgiLz4KPC9maWx0ZXI+CjxmaWx0ZXIgaWQ9ImZpbHRlcjFfZF8xMzFfNDgiIHg9IjM4LjI1NjgiIHk9IjI1LjUiIHdpZHRoPSIxMDIuNDM5IiBoZWlnaHQ9Ijk2LjY5OTciIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9Im91dCIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzEzMV80OCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18xMzFfNDgiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTMxXzQ4Ij4KPHJlY3Qgd2lkdGg9IjE1MiIgaGVpZ2h0PSIxNTIiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
  class Locale {
    getInfo() {
      return {
        id: "fakemonLocale",
        name: Scratch.translate("Locale"),
        color1: "#2a5fa0", // TurboWarp will automatically generate colors 2 and 3 based on color 1.
        blockIconURI: blockExtensionIcon,
        menuIconURI: menuExtensionIcon,
        blocks: [
          {
            opcode: "translate",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("translate [TEXT] to language code [LANG]"),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, world!",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Preferred Languages"),
          },
          {
            opcode: "getLanguageCode",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get user's most preferred language code"),
          },
          {
            opcode: "getLanguageArray",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get user's preferred language array"),
          },
          {
            opcode: "isLanguagePreferred",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate(
              "does the user prefer language code [LANG]?"
            ),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
            },
          },
          {
            opcode: "supportedPreferredLanguages",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "preferred languages that can be translated to"
            ),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("All Translations"),
          },
          {
            opcode: "setFullLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set global translation information to JSON [JSON]"
            ),
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"en":{"Hello, world!":"Hello, world!"},"es":{"Hello, world!":"¡Hola, mundo!"}}`,
              },
            },
          },
          {
            opcode: "mergeFullLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "merge current translation information with JSON [JSON]"
            ),
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"en":{"Hello, world!":"Hello, world!"},"es":{"Hello, world!":"¡Hola, mundo!"}}`,
              },
            },
          },
          {
            opcode: "getFullLocaleJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get global translation information"),
          },
          {
            opcode: "supportedLanguages",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all languages that can be translated to"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Per-Language Translations"),
          },
          {
            opcode: "setPerLangLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set translations for language code [LANG] to JSON [JSON]"
            ),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"Hello, world!":"¡Hola, mundo!"}`,
              },
            },
          },
          {
            opcode: "mergePerLangLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "merge current translations for language code [LANG] with JSON [JSON]"
            ),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"Hello, world!":"¡Hola, mundo!"}`,
              },
            },
          },
          {
            opcode: "getPerLangLocaleJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "get translations for language code [LANG]"
            ),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Per-Word Translations"),
          },
          {
            opcode: "setPerWordTranslation",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set translation for [TEXTIN] in language code [LANG] to [TEXTOUT]"
            ),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              TEXTIN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, world!",
              },
              TEXTOUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "¡Hola, mundo!",
              },
            },
          },
        ],
        menus: {
          NAME: {
            // In case menus are ever needed
            acceptReporters: true,
            items: [{ text: Scratch.translate("NAME"), value: "NAME" }],
          },
        },
      };
    }
    setFullLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        localeObject = JSON.parse(args.JSON);
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateLocaleInfo();
    }
    mergeFullLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        localeObject = { ...localeObject, ...JSON.parse(args.JSON) };
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateLocaleInfo();
    }
    getFullLocaleJSON() {
      return JSON.stringify(localeObject) || "{}";
    }
    setPerLangLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        localeObject[args.LANG] = JSON.parse(args.JSON);
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateLocaleInfo();
    }
    mergePerLangLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        localeObject[args.LANG] = { ...localeObject, ...JSON.parse(args.JSON) };
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateLocaleInfo();
    }
    setPerWordTranslation(args) {
      if (!Object.prototype.hasOwnProperty.call(localeObject, args.LANG)) {
        // VS Code got mad when I tried to do it the normal way.
        localeObject[args.LANG] = {};
      }
      localeObject[args.LANG][args.TEXTIN] = args.TEXTOUT;
      this._updateLocaleInfo();
    }
    getPerLangLocaleJSON(args) {
      return JSON.stringify(localeObject[args.LANG]) || "{}";
    }
    translate(args) {
      try {
        return localeObject[args.LANG][args.TEXT];
      } catch {
        return args.TEXT;
      } // Fallback to default language
    }
    getLanguageCode() {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      return ReduxStore?.getState().locales.locale || navigator.languages[0];
    }
    getLanguageArray() {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      if (navigator.languages.includes(ReduxStore?.getState().locales.locale)) {
        return JSON.stringify(navigator.languages);
      } else {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        return JSON.stringify([
          ReduxStore?.getState().locales.locale,
          ...navigator.languages,
        ]);
      }
    }
    isLanguagePreferred(args) {
      return JSON.parse(this.getLanguageArray()).includes(args.LANG);
    }
    supportedLanguages() {
      return JSON.stringify(Object.keys(localeObject));
    }
    supportedPreferredLanguages() {
      const languageArray = JSON.parse(this.getLanguageArray());
      const matchedLanguages = [];
      JSON.parse(this.supportedLanguages()).forEach((value) => {
        if (languageArray.includes(value)) {
          matchedLanguages.push(value);
        }
      });
      return JSON.stringify(matchedLanguages);
    }
    _updateLocaleInfo() {
      // @ts-ignore since extension storage IS a thing
      Scratch.vm.runtime.extensionStorage["fakemonLocale"] = {
        // @ts-ignore
        ...Scratch.vm.runtime.extensionStorage["fakemonLocale"],
        ...{ localeObject: localeObject },
      };
    }
  }
  Scratch.extensions.register(new Locale());
})(Scratch);
