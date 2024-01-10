// Name: Web & Device
// ID: webanddeviceInfinityLoopGaming
// Description: Interacts and gets data from websites, your device, and your network.
// By: InfinityLoopGaming <https://scratch.mit.edu/users/InfinityLoopGaming/>
(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must be run unsandboxed!");
  }
  const paletteIcon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzMuNjY2NjciIGhlaWdodD0iMTMzLjY2NjY3IiB2aWV3Qm94PSIwLDAsMTMzLjY2NjY3LDEzMy42NjY2NyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3My41LC0xMTQuNSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTczLjUsMjQ4LjE2NjY3di0xMzMuNjY2NjdoMTMzLjY2NjY3djEzMy42NjY2N3oiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxnIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTI4NC4zNDA2NiwyMDYuNjA0NGgtODguNjgxMzJjLTAuNDQzNDEsMCAtMC43MzkwMSwtMC4yOTU2IC0wLjczOTAxLC0wLjczOTAxdi01Ni4xNjQ4NGMwLC0wLjQ0MzQxIDAuMjk1NiwtMC43MzkwMSAwLjczOTAxLC0wLjczOTAxaDg4LjY4MTMyYzAuNDQzNDEsMCAwLjczOTAxLDAuMjk1NiAwLjczOTAxLDAuNzM5MDF2NTYuMTY0ODRjMCwwLjQ0MzQxIC0wLjI5NTYsMC43MzkwMSAtMC43MzkwMSwwLjczOTAxek0yODMuNjAxNjUsMTUwLjQzOTU2aC04Ny4yMDMzdjU0LjY4NjgxaDg3LjIwMzN6Ii8+PHBhdGggZD0iTTMwNS43NzE5OCwyMTMuMTA3Njl2MS42MjU4MmMwLDEuNzczNjMgLTEwLjkzNzM2LDMuNjk1MDUgLTExLjA4NTE2LDMuNjk1MDVoLTEwOS4zNzM2M2MtMC4xNDc4LDAgLTExLjA4NTE2LC0xLjkyMTQzIC0xMS4wODUxNiwtMy42OTUwNXYtMS42MjU4MmMwLC0xLjE4MjQyIDEuMDM0NjIsLTIuMjE3MDMgMi4yMTcwMywtMi4yMTcwM2gxMi41NjMxOXYtNjUuNjI0MThjMCwtMi4wNjkyMyAxLjYyNTgyLC0zLjY5NTA1IDMuNjk1MDUsLTMuNjk1MDVoOTQuNTkzNDFjMi4wNjkyMywwIDMuNjk1MDUsMS42MjU4MiAzLjY5NTA1LDMuNjk1MDV2NjUuNjI0MThoMTIuNTYzMTljMS4xODI0MiwwIDIuMjE3MDMsMS4wMzQ2MiAyLjIxNzAzLDIuMjE3MDN6TTE5MC40ODYyNiwyMTAuODkwNjZoMzYuMjExNTRjMC4yOTU2LDAgMjYuNDU2NTksMCAyNi42MDQ0LDBoMzYuMjExNTR2LTY1LjYyNDE4YzAsLTEuMTgyNDIgLTEuMDM0NjIsLTIuMjE3MDMgLTIuMjE3MDMsLTIuMjE3MDNoLTk0LjU5MzQxYy0xLjE4MjQyLDAgLTIuMjE3MDMsMS4wMzQ2MiAtMi4yMTcwMywyLjIxNzAzek0zMDQuMjkzOTYsMjEzLjEwNzY5YzAsLTAuNDQzNDEgLTAuMjk1NiwtMC43MzkwMSAtMC43MzkwMSwtMC43MzkwMWgtMTMuMTU0NGMwLDAuMTQ3OCAtMC4xNDc4LDAuMTQ3OCAtMC4yOTU2LDAuMTQ3OGMtMC4xNDc4LDAgLTAuMTQ3OCwtMC4xNDc4IC0wLjI5NTYsLTAuMTQ3OGgtMzYuMDYzNzRoLTI3Ljc4NjgxaC0zNS45MTU5M2MwLDAuMTQ3OCAtMC4xNDc4LDAuMTQ3OCAtMC4yOTU2LDAuMTQ3OGMtMC4xNDc4LDAgLTAuMTQ3OCwtMC4xNDc4IC0wLjI5NTYsLTAuMTQ3OGgtMTMuMDA2NTljLTAuNDQzNDEsMCAtMC43MzkwMSwwLjI5NTYgLTAuNzM5MDEsMC43MzkwMXYxLjMzMDIyYzEuMzMwMjIsMC43MzkwMSA4LjcyMDMzLDIuNTEyNjQgOS42MDcxNCwyLjUxMjY0aDEwOS4zNzM2M2MwLjg4NjgxLDAgOC4yNzY5MiwtMS43NzM2MyA5LjYwNzE0LC0yLjUxMjY0eiIvPjwvZz48cGF0aCBkPSJNMjE2LjQ2MjUsMTc4Ljc5NzVjMCwtMTIuOTc4IDEwLjU1OSwtMjMuNTM4IDIzLjUzOCwtMjMuNTM4YzAuMDYsMCAwLjExNywwLjAwNCAwLjE3NSwwLjAwNWMwLjAwNCwwIDAuMDEsMCAwLjAxNSwwYzEyLjg5MSwwLjEwMyAyMy4zNDcsMTAuNjE4IDIzLjM0NywyMy41MzNjMCwxMi45NDcgLTEwLjUwNSwyMy40ODIgLTIzLjQzOCwyMy41MzdjLTAuMDE1LDAgLTAuMDMsMC4wMDYgLTAuMDQ1LDAuMDA2YzAsMCAwLDAgLTAuMDAxLDBjLTAuMDAxLDAgLTAuMDAxLDAgLTAuMDAyLDBjLTAuMDA5LDAgLTAuMDE5LC0wLjAwNCAtMC4wMjksLTAuMDA0Yy0wLjAwNywwIC0wLjAxNCwwIC0wLjAyMiwwYy0xMi45NzksMCAtMjMuNTM4LC0xMC41NTkgLTIzLjUzOCwtMjMuNTM5ek0yNTguODg3NSwxNzEuMTcwNWMtMS43MjUsMC41NjggLTMuNDIsMS4wNDYgLTUuMDg1LDEuNDM5YzAuNDc5LDIuMDA1IDAuNzQ0LDQuMDc4IDAuNzQ0LDYuMTg4YzAsMi4wODQgLTAuMjU4LDQuMTI5IC0wLjcyNSw2LjEwOWMyLjI0OSwwLjUyMyAzLjk3OCwxLjA3IDUuMDg3LDEuNDYxYzAuOTQzLC0yLjM0MiAxLjQ2NiwtNC44OTUgMS40NjYsLTcuNTdjMCwtMi42OTYgLTAuNTMyLC01LjI3IC0xLjQ4NywtNy42Mjd6TTI1MC43MDU1LDE3My4yNTc1Yy0zLjIwNSwwLjU4IC02LjI2MywwLjg3MyAtOS4xMjIsMC45NTF2OS4xNjljMy40MzEsMC4wNzggNi41MTMsMC40MzMgOS4xMzgsMC44OTZjMC40MjUsLTEuNzczIDAuNjYsLTMuNjA3IDAuNjYsLTUuNDc2YzAsLTEuODkxIC0wLjI0LC0zLjc0NyAtMC42NzYsLTUuNTR6TTIzOC40MTg1LDE4Ni41OTU1Yy0yLjU0LDAuMDcyIC01LjIzNiwwLjMxMyAtOC4wNTIsMC43OTNjMS42MjUsNC4xMzcgNC4zOTksNy43NzQgOC4wNTIsMTAuNDM2ek0yNDkuNzQ5NSwxODcuMzY3NWMtMi4zNzQsLTAuMzk0IC01LjEyNSwtMC42OTkgLTguMTY2LC0wLjc3NXYxMS4zMDZjMy43MTIsLTIuNjczIDYuNTI3LC02LjM0NSA4LjE2NiwtMTAuNTMxek0yNDkuNzQyNSwxNzAuMjA4NWMtMS42NDEsLTQuMTc2IC00LjQ1NCwtNy44NDEgLTguMTU5LC0xMC41MTF2MTEuMzA3YzIuNTcsLTAuMDY4IDUuMzAzLC0wLjMwOCA4LjE1OSwtMC43OTZ6TTIzMC4zNTc1LDE3MC4yMjk1YzIuMzQ3LDAuMzg5IDUuMDYxLDAuNjkyIDguMDYxLDAuNzc0di0xMS4yMzJjLTMuNjYsMi42NjggLTYuNDM4LDYuMzEyIC04LjA2MSwxMC40NTh6TTIyOS4zODY1LDE3My4zMTg1Yy0wLjQyNiwxLjc3NSAtMC42NiwzLjYwOSAtMC42Niw1LjQ3OGMwLDEuODkgMC4yMzksMy43NDQgMC42NzQsNS41MzVjMy4xNjYsLTAuNTc0IDYuMTg4LC0wLjg2MSA5LjAxOCwtMC45NDN2LTkuMTc2Yy0zLjM5MSwtMC4wODMgLTYuNDMyLC0wLjQzNSAtOS4wMzIsLTAuODk0ek0yMjUuNTYyNSwxNzguNzk2NWMwLC0yLjA4NCAwLjI1NywtNC4xMjkgMC43MjQsLTYuMTA5Yy0yLjMxMywtMC41MzkgLTQuMDc5LC0xLjEwMSAtNS4xODEsLTEuNDk0Yy0wLjk1MSwyLjM1MiAtMS40NzgsNC45MTYgLTEuNDc4LDcuNjA0YzAsMi43MDcgMC41MzQsNS4yODkgMS40OTcsNy42NTRjMS43NTYsLTAuNTg0IDMuNDg1LC0xLjA3MyA1LjE4LC0xLjQ3M2MtMC40NzksLTIuMDAzIC0wLjc0MiwtNC4wNzIgLTAuNzQyLC02LjE4MnpNMjM0LjAxNDUsMTk4LjI3MTVjLTMuMDM2LC0yLjg1IC01LjM1OCwtNi4zNjMgLTYuNzkyLC0xMC4yNDZjLTEuNTMsMC4zNTEgLTMuMDg3LDAuNzczIC00LjY2NywxLjI4M2MyLjU2NSw0LjI0MyA2LjYzMiw3LjQ3NyAxMS40NTksOC45NjN6TTI1Ny40ODU1LDE4OS4yNDE1Yy0xLjA1NCwtMC4zNTIgLTIuNjEsLTAuODEzIC00LjU4NCwtMS4yNThjLTEuNDIzLDMuODc3IC0zLjczMSw3LjM4NiAtNi43NTIsMTAuMjM4YzQuNzgyLC0xLjUxOCA4LjgwMywtNC43NTQgMTEuMzM2LC04Ljk4ek0yNDYuMTUwNSwxNTkuMzc1NWMzLjAwOSwyLjg0MiA1LjMxMSw2LjMzNyA2LjczNiwxMC4xOTdjMS41MDIsLTAuMzQ1IDMuMDI5LC0wLjc1OCA0LjU3OCwtMS4yNTVjLTIuNTM1LC00LjIwOCAtNi41NDgsLTcuNDMgLTExLjMxNCwtOC45NDJ6TTIyMi41MzE1LDE2OC4zMjc1YzEuMDU0LDAuMzUyIDIuNjQ0LDAuODMgNC42NzQsMS4yODdjMS40MzIsLTMuOTAxIDMuNzYxLC03LjQzIDYuODEsLTEwLjI5MWMtNC44NDMsMS40OTIgLTguOTIsNC43NDIgLTExLjQ4NCw5LjAwNHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+";
  const webBlockIcon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0Ny4wNzUiIGhlaWdodD0iNDcuMDgxIiB2aWV3Qm94PSIwLDAsNDcuMDc1LDQ3LjA4MSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNi40NjIsLTE1MC4zNDcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjE2LjQ2MiwxNzMuODg1YzAsLTEyLjk3OCAxMC41NTksLTIzLjUzOCAyMy41MzgsLTIzLjUzOGMwLjA2LDAgMC4xMTcsMC4wMDQgMC4xNzUsMC4wMDVjMC4wMDQsMCAwLjAxLDAgMC4wMTUsMGMxMi44OTEsMC4xMDMgMjMuMzQ3LDEwLjYxOCAyMy4zNDcsMjMuNTMzYzAsMTIuOTQ3IC0xMC41MDUsMjMuNDgyIC0yMy40MzgsMjMuNTM3Yy0wLjAxNSwwIC0wLjAzLDAuMDA2IC0wLjA0NSwwLjAwNmMwLDAgMCwwIC0wLjAwMSwwYy0wLjAwMSwwIC0wLjAwMSwwIC0wLjAwMiwwYy0wLjAwOSwwIC0wLjAxOSwtMC4wMDQgLTAuMDI5LC0wLjAwNGMtMC4wMDcsMCAtMC4wMTQsMCAtMC4wMjIsMGMtMTIuOTc5LDAgLTIzLjUzOCwtMTAuNTU5IC0yMy41MzgsLTIzLjUzOXpNMjU4Ljg4NywxNjYuMjU4Yy0xLjcyNSwwLjU2OCAtMy40MiwxLjA0NiAtNS4wODUsMS40MzljMC40NzksMi4wMDUgMC43NDQsNC4wNzggMC43NDQsNi4xODhjMCwyLjA4NCAtMC4yNTgsNC4xMjkgLTAuNzI1LDYuMTA5YzIuMjQ5LDAuNTIzIDMuOTc4LDEuMDcgNS4wODcsMS40NjFjMC45NDMsLTIuMzQyIDEuNDY2LC00Ljg5NSAxLjQ2NiwtNy41N2MwLC0yLjY5NiAtMC41MzIsLTUuMjcgLTEuNDg3LC03LjYyN3pNMjUwLjcwNSwxNjguMzQ1Yy0zLjIwNSwwLjU4IC02LjI2MywwLjg3MyAtOS4xMjIsMC45NTF2OS4xNjljMy40MzEsMC4wNzggNi41MTMsMC40MzMgOS4xMzgsMC44OTZjMC40MjUsLTEuNzczIDAuNjYsLTMuNjA3IDAuNjYsLTUuNDc2YzAsLTEuODkxIC0wLjI0LC0zLjc0NyAtMC42NzYsLTUuNTR6TTIzOC40MTgsMTgxLjY4M2MtMi41NCwwLjA3MiAtNS4yMzYsMC4zMTMgLTguMDUyLDAuNzkzYzEuNjI1LDQuMTM3IDQuMzk5LDcuNzc0IDguMDUyLDEwLjQzNnpNMjQ5Ljc0OSwxODIuNDU1Yy0yLjM3NCwtMC4zOTQgLTUuMTI1LC0wLjY5OSAtOC4xNjYsLTAuNzc1djExLjMwNmMzLjcxMiwtMi42NzMgNi41MjcsLTYuMzQ1IDguMTY2LC0xMC41MzF6TTI0OS43NDIsMTY1LjI5NmMtMS42NDEsLTQuMTc2IC00LjQ1NCwtNy44NDEgLTguMTU5LC0xMC41MTF2MTEuMzA3YzIuNTcsLTAuMDY4IDUuMzAzLC0wLjMwOCA4LjE1OSwtMC43OTZ6TTIzMC4zNTcsMTY1LjMxN2MyLjM0NywwLjM4OSA1LjA2MSwwLjY5MiA4LjA2MSwwLjc3NHYtMTEuMjMyYy0zLjY2LDIuNjY4IC02LjQzOCw2LjMxMiAtOC4wNjEsMTAuNDU4ek0yMjkuMzg2LDE2OC40MDZjLTAuNDI2LDEuNzc1IC0wLjY2LDMuNjA5IC0wLjY2LDUuNDc4YzAsMS44OSAwLjIzOSwzLjc0NCAwLjY3NCw1LjUzNWMzLjE2NiwtMC41NzQgNi4xODgsLTAuODYxIDkuMDE4LC0wLjk0M3YtOS4xNzZjLTMuMzkxLC0wLjA4MyAtNi40MzIsLTAuNDM1IC05LjAzMiwtMC44OTR6TTIyNS41NjIsMTczLjg4NGMwLC0yLjA4NCAwLjI1NywtNC4xMjkgMC43MjQsLTYuMTA5Yy0yLjMxMywtMC41MzkgLTQuMDc5LC0xLjEwMSAtNS4xODEsLTEuNDk0Yy0wLjk1MSwyLjM1MiAtMS40NzgsNC45MTYgLTEuNDc4LDcuNjA0YzAsMi43MDcgMC41MzQsNS4yODkgMS40OTcsNy42NTRjMS43NTYsLTAuNTg0IDMuNDg1LC0xLjA3MyA1LjE4LC0xLjQ3M2MtMC40NzksLTIuMDAzIC0wLjc0MiwtNC4wNzIgLTAuNzQyLC02LjE4MnpNMjM0LjAxNCwxOTMuMzU5Yy0zLjAzNiwtMi44NSAtNS4zNTgsLTYuMzYzIC02Ljc5MiwtMTAuMjQ2Yy0xLjUzLDAuMzUxIC0zLjA4NywwLjc3MyAtNC42NjcsMS4yODNjMi41NjUsNC4yNDMgNi42MzIsNy40NzcgMTEuNDU5LDguOTYzek0yNTcuNDg1LDE4NC4zMjljLTEuMDU0LC0wLjM1MiAtMi42MSwtMC44MTMgLTQuNTg0LC0xLjI1OGMtMS40MjMsMy44NzcgLTMuNzMxLDcuMzg2IC02Ljc1MiwxMC4yMzhjNC43ODIsLTEuNTE4IDguODAzLC00Ljc1NCAxMS4zMzYsLTguOTh6TTI0Ni4xNSwxNTQuNDYzYzMuMDA5LDIuODQyIDUuMzExLDYuMzM3IDYuNzM2LDEwLjE5N2MxLjUwMiwtMC4zNDUgMy4wMjksLTAuNzU4IDQuNTc4LC0xLjI1NWMtMi41MzUsLTQuMjA4IC02LjU0OCwtNy40MyAtMTEuMzE0LC04Ljk0MnpNMjIyLjUzMSwxNjMuNDE1YzEuMDU0LDAuMzUyIDIuNjQ0LDAuODMgNC42NzQsMS4yODdjMS40MzIsLTMuOTAxIDMuNzYxLC03LjQzIDYuODEsLTEwLjI5MWMtNC44NDMsMS40OTIgLTguOTIsNC43NDIgLTExLjQ4NCw5LjAwNHoiLz48L2c+PC9nPjwvc3ZnPg==";
  const fullscreenBlockIcon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0Ny4yMjYyMSIgaGVpZ2h0PSI0Ny4yMjYyMSIgdmlld0JveD0iMCwwLDQ3LjIyNjIxLDQ3LjIyNjIxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE2LjM4Njg5LC0xNTYuMzg2OSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yNjMuNjEzMTEsMTU2LjM4OTI2bC0wLjM4NjY1LDEwLjYyNzEzbC0xLjc3MTQ4LC0wLjA2MzE2bDAuMjcyMTMsLTcuNDI4OWwtMTUuNzA0ODgsMTUuNzA1NDdsLTEuMjUyMDIsLTEuMjUyMDJsMTUuNzAyNTIsLTE1LjcwMjUybC03LjQyNDc3LDAuMjcwOTRsLTAuMDYzMTYsLTEuNzcwODl6Ii8+PHBhdGggZD0iTTIyNi45NTIwNSwyMDEuNDUzOGwwLjA2MzE2LDEuNzcxNDhsLTEwLjYyODMyLDAuMzg1NDZsMC4zODcyNCwtMTAuNjI3MTNsMS43NzA4OSwwLjA2MzE2bC0wLjI3MjEzLDcuNDI4OWwxNS43MDU0NywtMTUuNzA1NDdsMS4yNTIwMiwxLjI1MjAybC0xNS43MDMxMSwxNS43MDI1MnoiLz48cGF0aCBkPSJNMjUzLjA0Njc3LDIwMS40NTQ5OGw3LjQyODMxLDAuMjcyMTNsLTE1LjcwNDg4LC0xNS43MDQ4OGwxLjI1MjAyLC0xLjI1MjAybDE1LjcwMjUyLDE1LjcwMjUybC0wLjI3MDk0LC03LjQyNDc3bDEuNzcxNDgsLTAuMDYzMTZsMC4zODU0NywxMC42MjgzMmwtMTAuNjI3MTQsLTAuMzg3MjR6Ii8+PHBhdGggZD0iTTIzMy45NzgzNywxNzUuMjI5OGwtMTUuNzAzMTEsLTE1LjcwMjUybDAuMjcwOTQsNy40MjQ3N2wtMS43NzA4OSwwLjA2MzE2bC0wLjM4NjA1LC0xMC42MjgzMmwxMC42MjcxMywwLjM4NjY0bC0wLjA2MzE2LDEuNzcxNDlsLTcuNDI4MzEsLTAuMjcyMTNsMTUuNzA1NDcsMTUuNzA0ODh6Ii8+PC9nPjwvZz48L3N2Zz4=";
  const networkBlockIcon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0Ny4xODExOSIgaGVpZ2h0PSIzNS40NjQxMyIgdmlld0JveD0iMCwwLDQ3LjE4MTE5LDM1LjQ2NDEzIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE2LjQwOTQxLC0xNjIuMjY3OTMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjYzLjU5MDU5LDE3MS43OTE3NmwtMy42MjgyMywzLjM2NDAyYy01LjcwODkyLC01LjA2MjU0IC0xMi4yNTI5NSwtNy44MjczNiAtMTkuOTI0NjEsLTcuODEzMmMtNy42NzE2NiwwLjAxNDE1IC0xNC4yNzcwMywyLjY4OTMzIC0yMC4xMTgwNiw3LjgxNzkybC0zLjUxMDI4LC0zLjI1MDc4YzEwLjc3MTQ2LC0xMS42NTM3NSAzMy4xMTE3NiwtMTMuOTYwOTEgNDcuMTgxMTksLTAuMTE3OTV6Ii8+PHBhdGggZD0iTTIyNi45MzU1MywxODEuOTU5M2wtMy41NjY5LC0zLjMwMjY4YzcuNjk5OTcsLTguNjQ4MzEgMjQuMjEzMzgsLTkuNjM5MTIgMzMuMzk0ODQsLTAuMDU2NjJsLTMuNjQ3MTEsMy4zMDI2OGMtMy43NTA5LC0zLjMxNjg0IC04LjA4MjE0LC01LjA5NTU3IC0xMy4wMjIwMSwtNS4wOTU1N2MtNC45Mzk4NywwIC05LjMxMzU3LDEuNzIyMTEgLTEzLjE1ODgzLDUuMTUyMTl6Ii8+PHBhdGggZD0iTTI0Ni43MTg2LDE4OC40NjU1OWMtNC45OTY0OSwtMy4zMDI2OCAtOC40NTAxNSwtMy4zMDI2OCAtMTMuMjcyMDcsMC4wMjM1OWwtMy42Mzc2NywtMy4zNTQ1OGM2LjAwMTQ1LC01LjYwNTEyIDE0LjU2NDgzLC01LjYwNTEyIDIwLjQ3MTkyLC0wLjAxODg3eiIvPjxwYXRoIGQ9Ik0yMzkuOTE1MDcsMTg5LjYwNzM3YzEuMDgzMjcsLTAuMDM1NTcgMi4xMzUzOCwwLjM2NTc2IDIuOTE5NzYsMS4xMTM3NmMwLjc4NDM4LDAuNzQ4IDEuMjM1MTgsMS43Nzk4NyAxLjI1MTA2LDIuODYzNjFjMC4wMTc2NSwxLjA4MzI0IC0wLjM5NjEyLDIuMTI5MDUgLTEuMTUwMTUsMi45MDY5N2MtMC43NTQwMywwLjc3NzkyIC0xLjc4NjQyLDEuMjI0MTIgLTIuODY5NjksMS4yNDAyNWMtMi4yNDYxMiwwLjAxNDY3IC00LjEwMDQ0LC0xLjc1MjA1IC00LjE5NDQxLC0zLjk5NjI1Yy0wLjAxMzIsLTIuMjUyNDQgMS43OTEyLC00LjA5NDczIDQuMDQzNDMsLTQuMTI4MzV6Ii8+PC9nPjwvZz48L3N2Zz4=";
  const deviceBlockIcon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0Ny42MTQyNiIgaGVpZ2h0PSIyOC4xMTc0NyIgdmlld0JveD0iMCwwLDQ3LjYxNDI2LDI4LjExNzQ3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE2LjE5Mjg3LC0xNjUuOTQxMjYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjYxLjk1MjY4LDE3Ni4yNjYwNGgtNi4zMTUxNWMtMS4wMDI0MSwwIC0xLjg1NDQ1LDAuODUyMDQgLTEuODU0NDUsMS45MDQ1N3YwLjU1MTMydjEzLjAzMTI3djAuMzUwODRjMCwxLjA1MjUzIDAuODUyMDQsMS45MDQ1NyAxLjg1NDQ1LDEuOTA0NTdoNi4zMTUxNWMxLjAwMjQxLDAgMS44NTQ0NSwtMC44NTIwNCAxLjg1NDQ1LC0xLjkwNDU3di0wLjM1MDg0di0zLjU1ODU0di04LjM3MDA5di0xLjA1MjUzdi0wLjU1MTMyYzAsLTEuMTAyNjUgLTAuODAxOTIsLTEuOTU0NjkgLTEuODU0NDUsLTEuOTU0Njl6TTI1OS41OTcwMywxOTMuMjA2NjloLTEuODA0MzNjLTAuMjUwNiwwIC0wLjUwMTIsLTAuMjAwNDggLTAuNTAxMiwtMC41MDEyYzAsLTAuMzAwNzIgMC4yMDA0OCwtMC41MDEyIDAuNTAxMiwtMC41MDEyaDEuODA0MzNjMC4yNTA2LDAgMC41MDEyLDAuMjAwNDggMC41MDEyLDAuNTAxMmMwLDAuMzAwNzIgLTAuMjAwNDgsMC41MDEyIC0wLjUwMTIsMC41MDEyek0yNjIuNDAzNzYsMTkxLjQwMjM2YzAsMCAtMC4wNTAxMiwwIDAsMGgtNy4xMTcwOGgtMC4wNTAxMnYtMTIuNTMwMDdoMC4wNTAxMmg3LjExNzA4YzAsMCAwLDAgMC4wNTAxMiwwdjEyLjUzMDA3ek0yNTUuOTg4MzcsMTY5LjgwMDUyYy0wLjI1MDYsLTAuMTAwMjQgLTAuNTAxMiwtMC4xNTAzNiAtMC43NTE4LC0wLjE1MDM2aC02LjQ2NTUyaC02LjQ2NTUyYy0wLjI1MDYsMCAtMC41MDEyLDAuMDUwMTIgLTAuNzUxOCwwLjE1MDM2Yy0wLjcwMTY4LDAuMzAwNzIgLTEuMTUyNzcsMS4wMDI0MSAtMS4xNTI3NywxLjgwNDMzdjAuMzUwODR2MTcuNjkyNDZ2Mi40MDU3N2MwLDEuMTAyNjUgMC44NTIwNCwxLjk1NDY5IDEuOTA0NTcsMS45NTQ2OWgzLjM1ODA2aDMuMTA3NDZoMy4xMDc0NmgxLjEwMjY1Yy0wLjM1MDg0LC0wLjU1MTMyIC0wLjYwMTQ0LC0xLjIwMjg5IC0wLjYwMTQ0LC0xLjkwNDU3di0xLjE1Mjc3aC0xLjM1MzI1aC04Ljc3MTA1aC0wLjA1MDEydi0xOC42NDQ3NGgwLjA1MDEyaDEzLjA4MTM5aDAuMDUwMTJ2Mi41MDYwMWMwLjEwMDI0LDAgMC4yMDA0OCwwIDAuMzAwNzIsMGgxLjQ1MzQ5di0yLjkwNjk4di0wLjMwMDcyYzAsLTAuODAxOTIgLTAuNTAxMiwtMS41MDM2MSAtMS4xNTI3NywtMS44MDQzM3pNMjQ3LjQ2NzkyLDE5Mi4yMDQyOWMwLC0wLjA1MDEyIDAuMDUwMTIsLTAuMDUwMTIgMC4wNTAxMiwtMC4xMDAyNGMwLjEwMDI0LC0wLjEwMDI0IDAuMjAwNDgsLTAuMTUwMzYgMC4zNTA4NCwtMC4xNTAzNmgxLjg1NDQ1YzAuMjAwNDgsMCAwLjM1MDg0LDAuMTAwMjQgMC40NTEwOCwwLjI1MDZjMC4wNTAxMiwwLjA1MDEyIDAuMDUwMTIsMC4xNTAzNiAwLjA1MDEyLDAuMjUwNmMwLDAuMTAwMjQgMCwwLjE1MDM2IC0wLjA1MDEyLDAuMjUwNmMtMC4xMDAyNCwwLjE1MDM2IC0wLjI1MDYsMC4yNTA2IC0wLjQ1MTA4LDAuMjUwNmgtMS44NTQ0NWMtMC4yNTA2LDAgLTAuNTAxMiwtMC4yNTA2IC0wLjUwMTIsLTAuNTAxMmMwLC0wLjA1MDEyIDAuMDUwMTIsLTAuMTUwMzYgMC4xMDAyNCwtMC4yNTA2ek0yNDYuNTE1NjQsMTY4LjE0NjU2djAuMTUwMzZoLTAuOTAyMTZoLTI3LjA2NDk1djE2LjUzOTY5aDIwLjQ5OTE5djQuNzExMzFoLTQuMzEwMzRjMCwwLjQ1MTA4IDAuMjUwNiwyLjQwNTc3IDMuMjA3NywyLjgwNjc0aC0wLjE1MDM2YzAuNDUxMDgsMCAwLjg1MjA0LDAuNDAwOTYgMC44NTIwNCwwLjg1MjA0YzAsMC40NTEwOCAtMC40MDA5NiwwLjg1MjA0IC0wLjg1MjA0LDAuODUyMDRoLTEyLjkzMTAzYy0wLjQ1MTA4LDAgLTAuODUyMDQsLTAuNDAwOTYgLTAuODUyMDQsLTAuODUyMDRjMCwtMC40NTEwOCAwLjQwMDk2LC0wLjg1MjA0IDAuODUyMDQsLTAuODUyMDRoLTAuMTAwMjRjMi45NTcxLC0wLjM1MDg0IDMuMjA3NywtMi4zNTU2NSAzLjIwNzcsLTIuODA2NzRoLTkuODIzNTdjLTEuMDUyNTMsMCAtMS45MDQ1NywtMC44NTIwNCAtMS45NTQ2OSwtMS44NTQ0NXYtMC4wNTAxMmMwLDAgMCwwIDAsLTAuMDUwMTJ2LTAuMTUwMzZjMCwwIDAsMCAwLC0wLjA1MDEydi0yLjk1NzFjMCwwIDAsMCAwLC0wLjA1MDEydi0xNi4yMzg5N2MwLC0xLjIwMjg5IDEuMDAyNDEsLTIuMjA1MjkgMi4yMDUyOSwtMi4yMDUyOWgyNS45MTIxOGMxLjI1MzAxLDAgMi4yMDUyOSwxLjAwMjQxIDIuMjA1MjksMi4yMDUyOXoiLz48L2c+PC9nPjwvc3ZnPg==";
  const clipboardBlockIcon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMi42NjEzNyIgaGVpZ2h0PSI0Ny45MDMzNSIgdmlld0JveD0iMCwwLDMyLjY2MTM3LDQ3LjkwMzM1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIzLjY2OTMxLC0xNTYuMDQ4MzMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjM2LjczMzg2LDE2MS40OTE4OWMwLC0xLjgwMzg0IDEuNDYyMywtMy4yNjYxNCAzLjI2NjE0LC0zLjI2NjE0YzEuODAzODQsMCAzLjI2NjE0LDEuNDYyMyAzLjI2NjE0LDMuMjY2MTRjMCwwLjM3NzQ5IC0wLjA2NDA0LDAuNzQwMDIgLTAuMTgxODUsMS4wNzczM2g0LjUyMDR2NC4zNzc2MmgtMTUuMjA5Mzh2LTQuMzc3NjJoNC41MjA0Yy0wLjExNzgxLC0wLjMzNzMgLTAuMTgxODUsLTAuNjk5ODQgLTAuMTgxODUsLTEuMDc3MzN6TTI0MCwxNTYuMDQ4MzNjMi42MzM1NSwwIDQuODMwMywxLjg3MDE1IDUuMzM0NjcsNC4zNTQ4NWgyLjI3MDAyYzEuMjE2MjMsMCAyLjE5MzcyLDAuOTY5NzcgMi4xOTM3MiwyLjE2NjA0djAuMDExMzloNC4zMzg1NWMxLjIxNjIzLDAgMi4xOTM3MiwwLjk2OTc3IDIuMTkzNzIsMi4xNjYwNHYzNy4wMzg5OWMwLDEuMTg0MTggLTAuOTgyMTYsMi4xNjYwNCAtMi4xOTM3MiwyLjE2NjA0aC0yOC4yNzM5M2MtMS4yMTYyMywwIC0yLjE5MzcyLC0wLjk2OTc3IC0yLjE5MzcyLC0yLjE2NjA0di0zNy4wMzg5OWMwLC0xLjE4NDE4IDAuOTgyMTYsLTIuMTY2MDQgMi4xOTM3MiwtMi4xNjYwNGg0LjMzODU1di0wLjAxMTM5YzAsLTEuMTg0MTggMC45ODIxNiwtMi4xNjYwNCAyLjE5MzcyLC0yLjE2NjA0aDIuMjcwMDJjMC41MDQzNywtMi40ODQ3IDIuNzAxMTIsLTQuMzU0ODUgNS4zMzQ2NywtNC4zNTQ4NXpNMjQ5Ljc5ODQxLDE2Ni45NDY4NGMwLDEuMTg0MTggLTAuOTgyMTYsMi4xNjYwNCAtMi4xOTM3MiwyLjE2NjA0aC0xNS4yMDkzOGMtMS4yMTYyMywwIC0yLjE5MzcyLC0wLjk2OTc3IC0yLjE5MzcyLC0yLjE2NjA0di0yLjIwMDJoLTQuMzM4NTV2MzcuMDM4OTloMjguMjczOTN2LTM3LjAzODk5aC00LjMzODU1ek0yNDkuNzk4NDEsMTczLjQ2NzczdjIuMTc3NDJoLTE5LjU5Njgydi0yLjE3NzQyek0yNDkuNzk4NDEsMTgwdjIuMTc3NDJoLTE5LjU5Njgydi0yLjE3NzQyek0yNDkuNzk4NDEsMTg2LjUzMjI3djIuMTc3NDJoLTE5LjU5Njgydi0yLjE3NzQyek0yNDkuNzk4NDEsMTkzLjA2NDU1djIuMTc3NDJoLTE5LjU5Njgydi0yLjE3NzQyeiIvPjwvZz48L2c+PC9zdmc+";
  const batteryBlockIcon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0Ny40NDIzNyIgaGVpZ2h0PSIyMC44NzQ2NCIgdmlld0JveD0iMCwwLDQ3LjQ0MjM3LDIwLjg3NDY0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE2LjI3ODgyLC0xNjkuNTYyNjgpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjU3LjU1MzY4LDE3NC4zMDY5MnYxMS4zODYxN2MwLDAuNzg0NyAtMC42Mzg1NywxLjQyMzI3IC0xLjQyMzI3LDEuNDIzMjdoLTM1LjEwNzM1Yy0wLjc4NDcsMCAtMS40MjMyNywtMC42Mzg1NyAtMS40MjMyNywtMS40MjMyN3YtMTEuMzg2MTdjMCwtMC43ODQ3IDAuNjM4NTgsLTEuNDIzMjcgMS40MjMyNywtMS40MjMyN2gzNS4xMDczNWMwLjc4NDcsMCAxLjQyMzI3LDAuNjM4NTggMS40MjMyNywxLjQyMzI3eiIvPjxwYXRoIGQ9Ik0yNjMuNzIxMTgsMTc4LjU3NjczYzAsMC45NDg4NSAwLDIuMzcyMTIgMCwyLjg0NjA3YzAsMC40NzQ5IC0wLjQ3NDQyLDAuOTQ5MzIgLTAuOTQ4ODUsMC45NDkzMmMtMC40NzQ0MywwIC0xLjg5NzY5LDAgLTEuODk3NjksMHYzLjMyMDk3YzAsMi42MTU5NyAtMi4xMjgyNiw0Ljc0NDI0IC00Ljc0NDI0LDQuNzQ0MjRoLTM1LjEwNzM1Yy0yLjYxNTk3LDAgLTQuNzQ0MjQsLTIuMTI4MjYgLTQuNzQ0MjQsLTQuNzQ0MjR2LTExLjM4NjE3YzAsLTIuNjE1OTcgMi4xMjgyNywtNC43NDQyNCA0Ljc0NDI0LC00Ljc0NDI0aDM1LjEwNzM1YzIuNjE1OTcsMCA0Ljc0NDI0LDIuMTI4MjYgNC43NDQyNCw0Ljc0NDI0djMuMzIwOTZjMCwwIDEuNDIzMjcsMCAxLjg5NzY5LDBjMC40NzQ0MywwIDAuOTQ4ODUsMC40NzQ0MiAwLjk0ODg1LDAuOTQ4ODV6TTI1OC45NzY5NSwxNzQuMzA2OTJjMCwtMS41Njk4NyAtMS4yNzY2NywtMi44NDY1NCAtMi44NDY1NCwtMi44NDY1NGgtMzUuMTA3MzVjLTEuNTY5ODcsMCAtMi44NDY1NSwxLjI3NjY3IC0yLjg0NjU1LDIuODQ2NTR2MTEuMzg2MTdjMCwxLjU2OTg3IDEuMjc2NjgsMi44NDY1NCAyLjg0NjU1LDIuODQ2NTRoMzUuMTA3MzVjMS41Njk4NywwIDIuODQ2NTQsLTEuMjc2NjcgMi44NDY1NCwtMi44NDY1NHoiLz48L2c+PC9nPjwvc3ZnPg==";

  //Battery code copy and pasted from battery extension. I will eventually see if I can optimize this, because it seems a bit long.
  /** @type {Promise<BatteryManager>|null} */
  let getBatteryPromise = null;
  /** @type {BatteryManager|null} */
  let cachedBattery = null;
  /** @type {boolean} */
  let batteryError = false;
  const withBattery = (callback) => {
    // Getting the BatteryManager is async the first time. Usually it's very fast, but we shouldn't assume that it is.
    // All the logic here lets us return values immediately when we have already got the battery instead of forcing
    // a delay by returning a promise.
    if (!navigator.getBattery || batteryError) {
      return callback(null);
    }
    if (cachedBattery) {
      return callback(cachedBattery);
    }
    if (!getBatteryPromise) {
      getBatteryPromise = navigator
        .getBattery()
        .then((battery) => {
          getBatteryPromise = null;
          cachedBattery = battery;

          cachedBattery.addEventListener("chargingchange", () => {
            Scratch.vm.runtime.startHats("battery_chargingChanged");
          });
          cachedBattery.addEventListener("levelchange", () => {
            Scratch.vm.runtime.startHats("battery_levelChanged");
          });
          cachedBattery.addEventListener("chargingtimechange", () => {
            Scratch.vm.runtime.startHats("battery_chargeTimeChanged");
          });
          cachedBattery.addEventListener("dischargingtimechange", () => {
            Scratch.vm.runtime.startHats("battery_dischargeTimeChanged");
          });

          return cachedBattery;
        })
        .catch((error) => {
          getBatteryPromise = null;
          console.error("Could not get battery", error);
          batteryError = true;
          return null;
        });
    }
    return getBatteryPromise.then((battery) => {
      return callback(battery);
    });
  };

  // Try to get the battery immediately so that event blocks work.
  withBattery(() => {});
  //End of battery code.

  class WebAndDevice {
    getInfo() {
      return {
        id: "webanddeviceInfinityLoopGaming",
        name: "Web & Device",
        color1: "#348ceb",
        color2: "#5b95d4",
        color3: "#84a3c4",
        menuIconURI: paletteIcon,
        blocks: [
          "Web",
          {
            opcode: "setTitle",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set page title to [title]"),
            blockIconURI: webBlockIcon,
            arguments: {
              title: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "pageTitle",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("page title"),
            blockIconURI: webBlockIcon,
          },
          "---",
          {
            opcode: "open_url",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("open url [url] in new tab"),
            blockIconURI: webBlockIcon,
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "redirect_url",
            blockType: Scratch.BlockType.COMMAND,
            text: "redirect to url [url]",
            blockIconURI: webBlockIcon,
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "currenturl",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current link"),
            blockIconURI: webBlockIcon,
          },
          {
            opcode: "fetchdatafromurl",
            blockType: Scratch.BlockType.REPORTER,
            text: "fetch data from url [url]",
            blockIconURI: webBlockIcon,
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          "---",
          {
            opcode: "enterFullscreen",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("enter fullscreen"),
            blockIconURI: fullscreenBlockIcon,
          },
          {
            opcode: "exitFullscreen",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("exit fullscreen"),
            blockIconURI: fullscreenBlockIcon,
          },
          {
            opcode: "isFullscreen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is page fullscreen?"),
            blockIconURI: fullscreenBlockIcon,
          },
          "---",
          {
            opcode: "connected_to_internet",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "connected to internet?",
            blockIconURI: networkBlockIcon,
          },
          {
            opcode: "networktype",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("network type"),
            blockIconURI: networkBlockIcon,
          },
          {
            opcode: "networkgeneration",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("network generation"),
            blockIconURI: networkBlockIcon,
          },
          "---",
          {
            opcode: "browser",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("browser"),
            blockIconURI: deviceBlockIcon,
          },
          {
            opcode: "operatingsystem",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("operating system"),
            blockIconURI: deviceBlockIcon,
          },
          {
            opcode: "devicememory",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("device memory"),
            blockIconURI: deviceBlockIcon,
          },
          {
            opcode: "screenWidth",
            text: "screen width",
            blockType: Scratch.BlockType.REPORTER,
            blockIconURI: deviceBlockIcon,
          },
          {
            opcode: "screenHeight",
            text: "screen height",
            blockType: Scratch.BlockType.REPORTER,
            blockIconURI: deviceBlockIcon,
          },
          "---",
          {
            opcode: "set_clipboard",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set clipboard to [text]",
            blockIconURI: clipboardBlockIcon,
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },

          {
            opcode: "clipboard",
            blockType: Scratch.BlockType.REPORTER,
            text: "clipboard",
            blockIconURI: clipboardBlockIcon,
          },
          "---",
          {
            opcode: "batteryCharging",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("charging?"),
            blockIconURI: batteryBlockIcon,
          },
          {
            opcode: "batteryLevel",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("battery level"),
            blockIconURI: batteryBlockIcon,
          },
          {
            opcode: "batteryChargeTime",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("seconds until charged"),
            blockIconURI: batteryBlockIcon,
          },
          {
            opcode: "batteryDischargeTime",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("seconds until empty"),
            blockIconURI: batteryBlockIcon,
          },
          "---",
          {
            opcode: "batteryChargingChanged",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when charging changed"),
            blockIconURI: batteryBlockIcon,
            isEdgeActivated: false,
          },
          {
            opcode: "batteryLevelChanged",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when battery level changed"),
            blockIconURI: batteryBlockIcon,
            isEdgeActivated: false,
          },
          {
            opcode: "batteryChargeTimeChanged",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when time until charged changed"),
            blockIconURI: batteryBlockIcon,
            isEdgeActivated: false,
          },
          {
            opcode: "batteryDischargeTimeChanged",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when time until empty changed"),
            blockIconURI: batteryBlockIcon,
            isEdgeActivated: false,
          },
        ],
      };
    }

    setTitle(args) {
      document.title = args.title;
    }
    pageTitle() {
      return document.title;
    }
    enterFullscreen() {
      if (document.fullscreenElement === null) {
        document.documentElement.requestFullscreen();
      }
    }
    exitFullscreen() {
      if (document.fullscreenElement !== null) {
        document.exitFullscreen();
      }
    }
    isFullscreen() {
      return document.fullscreenElement !== null;
    }
    networktype() {
      try {
        switch (navigator.connection.type) {
          case "bluetooth":
            return "bluetooth";
          case "cellular":
            return "cellular";
          case "ethernet":
            return "ethernet";
          case "wifi":
            return "wi-fi";
          case "wimax":
            return "wimax";
          default:
            return "";
        }
      } catch (err) {
        return "";
      }
    }
    networkgeneration() {
      try {
        switch (navigator.connection.effectiveType) {
          case "slow-2g":
          case "2g":
            return "2g";
          case "3g":
            return "3g";
          case "4g":
            return "4g";
          default:
            return "";
        }
      } catch (err) {
        return "";
      }
    }
    currenturl() {
      try {
        return document.URL || "";
      } catch (err) {
        return "";
      }
    }
    browser() {
      try {
        let has = (input) => navigator.userAgent.includes(input);
        if (has("Firefox")) return "firefox";
        if (has("SamsungBrowser")) return "samsung internet";
        if ((has("Opera") || has("OPR")) && has("GX")) return "opera gx";
        if (has("Opera") || has("OPR")) return "opera";
        if (has("Trident")) return "internet explorer";
        if (has("Edge")) return "legacy";
        if (has("Edg")) return "edge";
        if (has("YaBrowser") || has("YaSearchBrowser")) return "yandex";
        if (has("Miui")) return "mi browser";
        if (has("UBrowser")) return "uc browser";
        if (has("Chrome")) return "chromium";
        if (has("Safari")) return "safari";
        return "";
      } catch (err) {
        return "";
      }
    }
    operatingsystem() {
      const userAgent = navigator.userAgent;
      if (userAgent.includes("Windows")) {
        return "Windows";
      } else if (userAgent.includes("Android")) {
        return "Android";
      } else if (userAgent.includes("iPhone") || userAgent.includes("iPod") || userAgent.includes("iPad")) {
        return "iOS";
      } else if (userAgent.includes("Linux")) {
        return "Linux";
      } else if (userAgent.includes("CrOS")) {
        return "ChromeOS";
      } else if (userAgent.includes("Mac OS")) {
        return "macOS";
      }
      return "Other";
    }
    devicememory() {
      // @ts-expect-error
      if (navigator.deviceMemory === undefined) {
        return "Unsupported";
      } else {
        // @ts-expect-error
        return navigator.deviceMemory;
      }
    }
    open_url({ url }) {
      Scratch.openWindow(url);
    }
    redirect_url({ url }) {
      Scratch.redirect(url);
    }
    connected_to_internet() {
      try {
        return navigator.onLine;
      } catch (err) {
        return false;
      }
    }
    screenWidth() {
      return window.screen.width;
    }
    screenHeight() {
      return window.screen.height;
    }
    fetchdatafromurl(args) {
      return Scratch.fetch(args.URL)
        .then((r) => r.text())
        .catch(() => "");
    }
    set_clipboard(args) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(args.text);
      }
    }

    clipboard() {
      if (navigator.clipboard && navigator.clipboard.readText) {
        return Scratch.canReadClipboard().then((allowed) => {
          if (allowed) {
            return navigator.clipboard.readText();
          }
          return "";
        });
      }
      return "";
    }
    batteryCharging() {
      return withBattery((battery) => {
        if (!battery) return true;
        return battery.charging;
      });
    }
    batterylevel() {
      return withBattery((battery) => {
        if (!battery) return 100;
        return battery.level * 100;
      });
    }
    batteryChargeTime() {
      return withBattery((battery) => {
        if (!battery) return 0;
        return battery.chargingTime;
      });
    }
    batteryDischargeTime() {
      return withBattery((battery) => {
        if (!battery) return Infinity;
        return battery.dischargingTime;
      });
    }
  }

  Scratch.extensions.register(new WebAndDevice());
})(Scratch);

//Credits to Network, Navigator, Fetch, Window Controls, and Battery extensions for help with scripts.
