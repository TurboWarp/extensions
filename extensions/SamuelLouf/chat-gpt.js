/*!
 * Copyright 2023 SamuelLouf
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
* Extension based on Donutask's "AI" extension
* https://www.youtube.com/watch?v=hSnFf_YT5qk
*/

(function (Scratch) {
  'use strict';

  const menuIcon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzOS40Njc1NiIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCwwLDM5LjQ2NzU2LDQwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIwLjE2NjY5LC0xNjApIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yNTkuNTc4OSwxODIuMDc0OGMwLjIyMzQsMi4xMjMxIC0wLjIzMzEsNC4yNjIzIC0xLjMwMzcsNi4xMDkyYy0wLjcwMjQsMS4yMzM4IC0xLjY2MDIsMi4zMDM0IC0yLjgwOTMsMy4xMzdjLTEuMTQ5MiwwLjgzMzcgLTIuNDYzMiwxLjQxMjIgLTMuODU0LDEuNjk2OWMtMC42NTYzLDIuMDMyNyAtMS45NDE1LDMuODA0NCAtMy42NzAxLDUuMDU5M2MtMS43Mjg1LDEuMjU0OSAtMy44MTExLDEuOTI4MiAtNS45NDcyLDEuOTIyNmMtMS40MTkxLDAuMDA4OSAtMi44MjM3LC0wLjI4NTQgLTQuMTE5OSwtMC44NjMyYy0xLjI5NjEsLTAuNTc3OSAtMi40NTM5LC0xLjQyNTkgLTMuMzk1OCwtMi40ODc0Yy0yLjA4ODIsMC40NDgxIC00LjI2NDgsMC4yMjEyIC02LjIxNTY5LC0wLjY0NzljLTEuOTUwOTEsLTAuODY5MSAtMy41NzUzLC0yLjMzNTQgLTQuNjM4ODQsLTQuMTg3NWMtMC43MTczNiwtMS4yMjQ2IC0xLjE2NDg2LC0yLjU4ODIgLTEuMzEyNTUsLTMuOTk5N2MtMC4xNDc2OSwtMS40MTE1IDAuMDA3ODQsLTIuODM4MiAwLjQ1NjE4LC00LjE4NDhjLTEuNDMxODgsLTEuNTg0NCAtMi4zMjM1MSwtMy41ODI2IC0yLjU0NjMsLTUuNzA2NWMtMC4yMjI3OSwtMi4xMjQgMC4yMzQ3NywtNC4yNjM3IDEuMzA2NjksLTYuMTEwOGMwLjcwMjM0LC0xLjIzMzggMS42NjAxNSwtMi4zMDMzIDIuODA5MzEsLTMuMTM2OTVjMS4xNDkxNiwtMC44MzM2NSAyLjQ2MzE1LC0xLjQxMjE5IDMuODU0LC0xLjY5NjljMC42NTY4MywtMi4wMzE0OSAxLjk0MTgsLTMuODAxOTEgMy42Njk3LC01LjA1NjAxYzEuNzI3OSwtMS4yNTQxMSAzLjgwOTQsLTEuOTI3MSA1Ljk0NDQsLTEuOTIxOTVjMS40MTkxLC0wLjAwODkzIDIuODIzNywwLjI4NTM4IDQuMTE5OSwwLjg2MzIxYzEuMjk2MiwwLjU3Nzg0IDIuNDUzOSwxLjQyNTg5IDMuMzk1OCwyLjQ4NzM3YzIuMDg4MywtMC40NDgxOSA0LjI2NDksLTAuMjIxMzcgNi4yMTU4LDAuNjQ3NzJjMS45NTA5LDAuODY5MSAzLjU3NTMsMi4zMzU1NCA0LjYzODcsNC4xODc3MmMwLjcxNzQsMS4yMjQ1NCAxLjE2NDksMi41ODgxOCAxLjMxMjYsMy45OTk2OGMwLjE0NzcsMS40MTE1IC0wLjAwNzgsMi44MzgyIC0wLjQ1NjIsNC4xODQ4YzEuNDMxNSwxLjU4MzcgMi4zMjMyLDMuNTgxIDIuNTQ2NSw1LjcwNDF6TTI0Ny4yOTA5LDE5NS4xODQxYzEuNDAzNywtMS40MDUgMi4xOTMzLC0zLjMwOTEgMi4xOTU4LC01LjI5NTJ2LTkuMjk4N2MtMC4wMDI1LC0wLjAxOTUgLTAuMDA5NywtMC4wMzgyIC0wLjAyMTEsLTAuMDU0M2MtMC4wMTE1LC0wLjAxNjEgLTAuMDI2NywtMC4wMjkxIC0wLjA0NDMsLTAuMDM3OWwtMy4zNjY0LC0xLjk0Mzh2MTEuMjI4M2MwLjAwMTQsMC4yMjk5IC0wLjA1ODUsMC40NTYxIC0wLjE3MzYsMC42NTUzYy0wLjExNSwwLjE5OTIgLTAuMjgxLDAuMzY0MSAtMC40ODA5LDAuNDc3OGwtNy45NjQ0LDQuNjAwNWMtMC4wNjk0LDAuMDQyNSAtMC4xNzU5LDAuMTAwOSAtMC4yMzY2LDAuMTM0YzEuMzQ2NSwxLjEyMzIgMy4wNDQ5LDEuNzM3MyA0Ljc5ODQsMS43MzQ4YzEuOTg2LC0wLjAwNDMgMy44ODk0LC0wLjc5NTcgNS4yOTMxLC0yLjIwMDh6TTIzMC40NDQ3LDE5My45OTU0YzEuOTE5NiwwLjUxNDMgMy45NjQ5LDAuMjQ2MiA1LjY4NywtMC43NDU3bDguMDUxMiwtNC42NDg1YzAuMDE1OSwtMC4wMTE5IDAuMDI4NiwtMC4wMjc2IDAuMDM3LC0wLjA0NTZjMC4wMDg0LC0wLjAxOCAwLjAxMjIsLTAuMDM3OSAwLjAxMTEsLTAuMDU3N3YtMy44ODc2bC05LjcyMzcsNS42MTQ1Yy0wLjE5ODUsMC4xMTYgLTAuNDI0MywwLjE3NzIgLTAuNjU0MSwwLjE3NzJjLTAuMjI5OSwwIC0wLjQ1NTcsLTAuMDYxMiAtMC42NTQyLC0wLjE3NzJsLTcuOTY0MzksLTQuNjAwNGMtMC4wNzQxMywtMC4wNDI2IC0wLjE3NzQzLC0wLjEwNTcgLTAuMjM2NTcsLTAuMTQxMmMtMC4zMDA2MiwxLjcyNzUgMC4wMTU5MywzLjUwNTYgMC44OTQyMyw1LjAyMzJjMC45OTU1OCwxLjcxOTkgMi42MzI3OSwyLjk3NDcgNC41NTI0MywzLjQ4OXpNMjIzLjA1Mjg5LDE3OC44MDQ2YzAuNTE0MjcsMS45MTg5IDEuNzY4NDYsMy41NTU1IDMuNDg3NTcsNC41NTExbDguMDUxOTQsNC42NTI1YzAuMDE4MywwLjAwNzggMC4wMzgzLDAuMDEwOSAwLjA1ODEsMC4wMDkxYzAuMDE5OCwtMC4wMDE4IDAuMDM4OSwtMC4wMDg0IDAuMDU1NSwtMC4wMTk0bDMuMzY2MywtMS45NDM3bC05LjcyMzY3LC01LjYxMzhjLTAuMTk5NywtMC4xMTM3IC0wLjM2NTUxLC0wLjI3ODUgLTAuNDgwNCwtMC40Nzc1Yy0wLjExNDg5LC0wLjE5OTEgLTAuMTc0NzIsLTAuNDI1MSAtMC4xNzMzMiwtMC42NTQ5di05LjIwMDljMCwtMC4wODQzIDAuMDAzOTQsLTAuMjA1OCAwLjAwMzk0LC0wLjI3NDRjLTEuNjQ2MDYsMC42MDM3IC0zLjAyNzI5LDEuNzY3MSAtMy45MDE3OCwzLjI4NjdjLTAuOTkwODMsMS43MjE5IC0xLjI1ODQ1LDMuNzY2NCAtMC43NDQxOCw1LjY4NTJ6TTI1MS45MzMyLDE4MC4wMzM4YzAuMTE0MiwwLjE5OSAwLjE3MzQsMC40MjQ4IDAuMTcxNSwwLjY1NDJ2OS4yMDA5YzAsMC4wODQ0IDAsMC4yMDU4IDAsMC4yNzUyYzEuMzM2OCwtMC40OTI0IDIuNTA1NiwtMS4zNTU1IDMuMzY5NiwtMi40ODgyYzAuODYzOSwtMS4xMzI3IDEuMzg3NCwtMi40ODgxIDEuNTA4OSwtMy45MDc1YzAuMTIxNSwtMS40MTk0IC0wLjE2MzgsLTIuODQ0IC0wLjgyMjYsLTQuMTA3MWMtMC42NTg5LC0xLjI2MzEgLTEuNjYzOSwtMi4zMTIzIC0yLjg5NzUsLTMuMDI0OWwtOC4wNTIsLTQuNjQ4NWMtMC4wMTgzLC0wLjAwNzggLTAuMDM4MiwtMC4wMTEgLTAuMDU4LC0wLjAwOTJjLTAuMDE5OCwwLjAwMTggLTAuMDM4OSwwLjAwODUgLTAuMDU1NSwwLjAxOTRsLTMuMzY2NCwxLjk0M2w5LjcyMzgsNS42MTQ1YzAuMTk5LDAuMTE0MiAwLjM2NCwwLjI3OTIgMC40NzgyLDAuNDc4MnpNMjU0LjMzMzQsMTcwLjM1MzFjLTAuNTQ5MiwtMS4zMTM2NSAtMS40NjExLC0yLjQ0MzcxIC0yLjYyOSwtMy4yNTgwMmMtMS4xNjgsLTAuODE0MzEgLTIuNTQzNiwtMS4yNzkxOSAtMy45NjYxLC0xLjM0MDI2Yy0xLjQyMjUsLTAuMDYxMDYgLTIuODMzLDAuMjg0MjEgLTQuMDY2NCwwLjk5NTQzbC04LjA1MTIsNC42NDQ2NWMtMC4wMTU5LDAuMDExOSAtMC4wMjg2LDAuMDI3NiAtMC4wMzcsMC4wNDU2Yy0wLjAwODQsMC4wMTggLTAuMDEyMiwwLjAzNzggLTAuMDExMSwwLjA1Nzd2My44ODc2bDkuNzIzNywtNS42MTQ2YzAuMTk4NSwtMC4xMTU4IDAuNDI0MywtMC4xNzY5IDAuNjU0MSwtMC4xNzY5YzAuMjI5OSwwIDAuNDU1NiwwLjA2MTEgMC42NTQxLDAuMTc2OWw3Ljk2NDUsNC42MDA1YzAuMDc0MSwwLjA0MjUgMC4xNzc0LDAuMTA0OCAwLjIzNjUsMC4xNDExYzAuMjQwOSwtMS40MDMzIDAuMDc3MSwtMi44NDYxIC0wLjQ3MjEsLTQuMTU5N3pNMjMzLjc0NzksMTcwLjIxNzVjLTAuMDAxMywtMC4yMjk4IDAuMDU4NiwtMC40NTU5IDAuMTczNiwtMC42NTQ5YzAuMTE1MSwtMC4xOTkwNCAwLjI4MSwtMC4zNjM4MiAwLjQ4MDksLTAuNDc3NDNsNy45NjQ0LC00LjYwMDQ0YzAuMDcwMiwtMC4wNDI1OCAwLjE3NTksLTAuMTAwOTQgMC4yMzY2LC0wLjEzNDA2Yy0xLjA5NDUsLTAuOTExMjYgLTIuNDI1OSwtMS40OTE5MSAtMy44Mzg1LC0xLjY3Mzk3Yy0xLjQxMjUsLTAuMTgyMDYgLTIuODQ3NiwwLjA0MTk5IC00LjEzNzQsMC42NDU5NGMtMS4yODk4LDAuNjAzOTUgLTIuMzgwOSwxLjU2MjggLTMuMTQ1NiwyLjc2NDMyYy0wLjc2NDYsMS4yMDE1MiAtMS4xNzEyLDIuNTk1OTkgLTEuMTcyMSw0LjAyMDE0djkuMjk4N2MwLjAwMjQsMC4wMTk2IDAuMDA5NywwLjAzODMgMC4wMjExLDAuMDU0NGMwLjAxMTQsMC4wMTYxIDAuMDI2NywwLjAyOTEgMC4wNDQzLDAuMDM3OWwzLjM2NzIsMS45NDM4ek0yMzUuNTcxLDE4Mi40OTg1bDQuMzMwOCwyLjQ5OThsNC4zMzA3LC0yLjQ5OTh2LTUuMDAxbC00LjMzMDcsLTIuNDk5N2wtNC4zMzA4LDIuNTAxM3oiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxOS44MzMzMTE5NzE5MDk2MToyMC4wMDAwMDIyOTUxMjQ1MTctLT4=';
  const blockIcon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzOS40Njc1NiIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCwwLDM5LjQ2NzU2LDQwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIwLjE2NjY5LC0xNTkuOTk5OTkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yNTkuNTc4OSwxODIuMDc0OGMwLjIyMzQsMi4xMjMxIC0wLjIzMzEsNC4yNjIzIC0xLjMwMzcsNi4xMDkyYy0wLjcwMjQsMS4yMzM4IC0xLjY2MDIsMi4zMDM0IC0yLjgwOTMsMy4xMzdjLTEuMTQ5MiwwLjgzMzcgLTIuNDYzMiwxLjQxMjIgLTMuODU0LDEuNjk2OWMtMC42NTYzLDIuMDMyNyAtMS45NDE1LDMuODA0NCAtMy42NzAxLDUuMDU5M2MtMS43Mjg1LDEuMjU0OSAtMy44MTExLDEuOTI4MiAtNS45NDcyLDEuOTIyNmMtMS40MTkxLDAuMDA4OSAtMi44MjM3LC0wLjI4NTQgLTQuMTE5OSwtMC44NjMyYy0xLjI5NjEsLTAuNTc3OSAtMi40NTM5LC0xLjQyNTkgLTMuMzk1OCwtMi40ODc0Yy0yLjA4ODIsMC40NDgxIC00LjI2NDgsMC4yMjEyIC02LjIxNTY5LC0wLjY0NzljLTEuOTUwOTEsLTAuODY5MSAtMy41NzUzLC0yLjMzNTQgLTQuNjM4ODQsLTQuMTg3NWMtMC43MTczNiwtMS4yMjQ2IC0xLjE2NDg2LC0yLjU4ODIgLTEuMzEyNTUsLTMuOTk5N2MtMC4xNDc2OSwtMS40MTE1IDAuMDA3ODQsLTIuODM4MiAwLjQ1NjE4LC00LjE4NDhjLTEuNDMxODgsLTEuNTg0NCAtMi4zMjM1MSwtMy41ODI2IC0yLjU0NjMsLTUuNzA2NWMtMC4yMjI3OSwtMi4xMjQgMC4yMzQ3NywtNC4yNjM3IDEuMzA2NjksLTYuMTEwOGMwLjcwMjM0LC0xLjIzMzggMS42NjAxNSwtMi4zMDMzIDIuODA5MzEsLTMuMTM2OTVjMS4xNDkxNiwtMC44MzM2NSAyLjQ2MzE1LC0xLjQxMjE5IDMuODU0LC0xLjY5NjljMC42NTY4MywtMi4wMzE0OSAxLjk0MTgsLTMuODAxOTEgMy42Njk3LC01LjA1NjAxYzEuNzI3OSwtMS4yNTQxMSAzLjgwOTQsLTEuOTI3MSA1Ljk0NDQsLTEuOTIxOTVjMS40MTkxLC0wLjAwODkzIDIuODIzNywwLjI4NTM4IDQuMTE5OSwwLjg2MzIxYzEuMjk2MiwwLjU3Nzg0IDIuNDUzOSwxLjQyNTg5IDMuMzk1OCwyLjQ4NzM3YzIuMDg4MywtMC40NDgxOSA0LjI2NDksLTAuMjIxMzcgNi4yMTU4LDAuNjQ3NzJjMS45NTA5LDAuODY5MSAzLjU3NTMsMi4zMzU1NCA0LjYzODcsNC4xODc3MmMwLjcxNzQsMS4yMjQ1NCAxLjE2NDksMi41ODgxOCAxLjMxMjYsMy45OTk2OGMwLjE0NzcsMS40MTE1IC0wLjAwNzgsMi44MzgyIC0wLjQ1NjIsNC4xODQ4YzEuNDMxNSwxLjU4MzcgMi4zMjMyLDMuNTgxIDIuNTQ2NSw1LjcwNDF6TTI0Ny4yOTA5LDE5NS4xODQxYzEuNDAzNywtMS40MDUgMi4xOTMzLC0zLjMwOTEgMi4xOTU4LC01LjI5NTJ2LTkuMjk4N2MtMC4wMDI1LC0wLjAxOTUgLTAuMDA5NywtMC4wMzgyIC0wLjAyMTEsLTAuMDU0M2MtMC4wMTE1LC0wLjAxNjEgLTAuMDI2NywtMC4wMjkxIC0wLjA0NDMsLTAuMDM3OWwtMy4zNjY0LC0xLjk0Mzh2MTEuMjI4M2MwLjAwMTQsMC4yMjk5IC0wLjA1ODUsMC40NTYxIC0wLjE3MzYsMC42NTUzYy0wLjExNSwwLjE5OTIgLTAuMjgxLDAuMzY0MSAtMC40ODA5LDAuNDc3OGwtNy45NjQ0LDQuNjAwNWMtMC4wNjk0LDAuMDQyNSAtMC4xNzU5LDAuMTAwOSAtMC4yMzY2LDAuMTM0YzEuMzQ2NSwxLjEyMzIgMy4wNDQ5LDEuNzM3MyA0Ljc5ODQsMS43MzQ4YzEuOTg2LC0wLjAwNDMgMy44ODk0LC0wLjc5NTcgNS4yOTMxLC0yLjIwMDh6TTIzMC40NDQ3LDE5My45OTU0YzEuOTE5NiwwLjUxNDMgMy45NjQ5LDAuMjQ2MiA1LjY4NywtMC43NDU3bDguMDUxMiwtNC42NDg1YzAuMDE1OSwtMC4wMTE5IDAuMDI4NiwtMC4wMjc2IDAuMDM3LC0wLjA0NTZjMC4wMDg0LC0wLjAxOCAwLjAxMjIsLTAuMDM3OSAwLjAxMTEsLTAuMDU3N3YtMy44ODc2bC05LjcyMzcsNS42MTQ1Yy0wLjE5ODUsMC4xMTYgLTAuNDI0MywwLjE3NzIgLTAuNjU0MSwwLjE3NzJjLTAuMjI5OSwwIC0wLjQ1NTcsLTAuMDYxMiAtMC42NTQyLC0wLjE3NzJsLTcuOTY0MzksLTQuNjAwNGMtMC4wNzQxMywtMC4wNDI2IC0wLjE3NzQzLC0wLjEwNTcgLTAuMjM2NTcsLTAuMTQxMmMtMC4zMDA2MiwxLjcyNzUgMC4wMTU5MywzLjUwNTYgMC44OTQyMyw1LjAyMzJjMC45OTU1OCwxLjcxOTkgMi42MzI3OSwyLjk3NDcgNC41NTI0MywzLjQ4OXpNMjIzLjA1Mjg5LDE3OC44MDQ2YzAuNTE0MjcsMS45MTg5IDEuNzY4NDYsMy41NTU1IDMuNDg3NTcsNC41NTExbDguMDUxOTQsNC42NTI1YzAuMDE4MywwLjAwNzggMC4wMzgzLDAuMDEwOSAwLjA1ODEsMC4wMDkxYzAuMDE5OCwtMC4wMDE4IDAuMDM4OSwtMC4wMDg0IDAuMDU1NSwtMC4wMTk0bDMuMzY2MywtMS45NDM3bC05LjcyMzY3LC01LjYxMzhjLTAuMTk5NywtMC4xMTM3IC0wLjM2NTUxLC0wLjI3ODUgLTAuNDgwNCwtMC40Nzc1Yy0wLjExNDg5LC0wLjE5OTEgLTAuMTc0NzIsLTAuNDI1MSAtMC4xNzMzMiwtMC42NTQ5di05LjIwMDljMCwtMC4wODQzIDAuMDAzOTQsLTAuMjA1OCAwLjAwMzk0LC0wLjI3NDRjLTEuNjQ2MDYsMC42MDM3IC0zLjAyNzI5LDEuNzY3MSAtMy45MDE3OCwzLjI4NjdjLTAuOTkwODMsMS43MjE5IC0xLjI1ODQ1LDMuNzY2NCAtMC43NDQxOCw1LjY4NTJ6TTI1MS45MzMyLDE4MC4wMzM4YzAuMTE0MiwwLjE5OSAwLjE3MzQsMC40MjQ4IDAuMTcxNSwwLjY1NDJ2OS4yMDA5YzAsMC4wODQ0IDAsMC4yMDU4IDAsMC4yNzUyYzEuMzM2OCwtMC40OTI0IDIuNTA1NiwtMS4zNTU1IDMuMzY5NiwtMi40ODgyYzAuODYzOSwtMS4xMzI3IDEuMzg3NCwtMi40ODgxIDEuNTA4OSwtMy45MDc1YzAuMTIxNSwtMS40MTk0IC0wLjE2MzgsLTIuODQ0IC0wLjgyMjYsLTQuMTA3MWMtMC42NTg5LC0xLjI2MzEgLTEuNjYzOSwtMi4zMTIzIC0yLjg5NzUsLTMuMDI0OWwtOC4wNTIsLTQuNjQ4NWMtMC4wMTgzLC0wLjAwNzggLTAuMDM4MiwtMC4wMTEgLTAuMDU4LC0wLjAwOTJjLTAuMDE5OCwwLjAwMTggLTAuMDM4OSwwLjAwODUgLTAuMDU1NSwwLjAxOTRsLTMuMzY2NCwxLjk0M2w5LjcyMzgsNS42MTQ1YzAuMTk5LDAuMTE0MiAwLjM2NCwwLjI3OTIgMC40NzgyLDAuNDc4MnpNMjU0LjMzMzQsMTcwLjM1MzFjLTAuNTQ5MiwtMS4zMTM2NSAtMS40NjExLC0yLjQ0MzcxIC0yLjYyOSwtMy4yNTgwMmMtMS4xNjgsLTAuODE0MzEgLTIuNTQzNiwtMS4yNzkxOSAtMy45NjYxLC0xLjM0MDI2Yy0xLjQyMjUsLTAuMDYxMDYgLTIuODMzLDAuMjg0MjEgLTQuMDY2NCwwLjk5NTQzbC04LjA1MTIsNC42NDQ2NWMtMC4wMTU5LDAuMDExOSAtMC4wMjg2LDAuMDI3NiAtMC4wMzcsMC4wNDU2Yy0wLjAwODQsMC4wMTggLTAuMDEyMiwwLjAzNzggLTAuMDExMSwwLjA1Nzd2My44ODc2bDkuNzIzNywtNS42MTQ2YzAuMTk4NSwtMC4xMTU4IDAuNDI0MywtMC4xNzY5IDAuNjU0MSwtMC4xNzY5YzAuMjI5OSwwIDAuNDU1NiwwLjA2MTEgMC42NTQxLDAuMTc2OWw3Ljk2NDUsNC42MDA1YzAuMDc0MSwwLjA0MjUgMC4xNzc0LDAuMTA0OCAwLjIzNjUsMC4xNDExYzAuMjQwOSwtMS40MDMzIDAuMDc3MSwtMi44NDYxIC0wLjQ3MjEsLTQuMTU5N3pNMjMzLjc0NzksMTcwLjIxNzVjLTAuMDAxMywtMC4yMjk4IDAuMDU4NiwtMC40NTU5IDAuMTczNiwtMC42NTQ5YzAuMTE1MSwtMC4xOTkwNCAwLjI4MSwtMC4zNjM4MiAwLjQ4MDksLTAuNDc3NDNsNy45NjQ0LC00LjYwMDQ0YzAuMDcwMiwtMC4wNDI1OCAwLjE3NTksLTAuMTAwOTQgMC4yMzY2LC0wLjEzNDA2Yy0xLjA5NDUsLTAuOTExMjYgLTIuNDI1OSwtMS40OTE5MSAtMy44Mzg1LC0xLjY3Mzk3Yy0xLjQxMjUsLTAuMTgyMDYgLTIuODQ3NiwwLjA0MTk5IC00LjEzNzQsMC42NDU5NGMtMS4yODk4LDAuNjAzOTUgLTIuMzgwOSwxLjU2MjggLTMuMTQ1NiwyLjc2NDMyYy0wLjc2NDYsMS4yMDE1MiAtMS4xNzEyLDIuNTk1OTkgLTEuMTcyMSw0LjAyMDE0djkuMjk4N2MwLjAwMjQsMC4wMTk2IDAuMDA5NywwLjAzODMgMC4wMjExLDAuMDU0NGMwLjAxMTQsMC4wMTYxIDAuMDI2NywwLjAyOTEgMC4wNDQzLDAuMDM3OWwzLjM2NzIsMS45NDM4ek0yMzUuNTcxLDE4Mi40OTg1bDQuMzMwOCwyLjQ5OThsNC4zMzA3LC0yLjQ5OTh2LTUuMDAxbC00LjMzMDcsLTIuNDk5N2wtNC4zMzA4LDIuNTAxM3oiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxOS44MzMzMTE4NzY2NDgxOTY6MjAuMDAwMDA5NTkwMjY0OTk1LS0+';

  const delay = s => new Promise(res => setTimeout(res, s*1000));

  function Send(text, api_key, model, language) {
  
    var sQuestion = text;
    if (sQuestion == "") {
      alert("Type in your question!");
      return;
    }
  
    var sUrl = "https://api.openai.com/v1/completions";
    var sModel = model;// "text-davinci-003";
    if (sModel.indexOf("gpt-3.5-turbo") != -1) {
      //https://openai.com/research/gpt-4
      sUrl = "https://api.openai.com/v1/chat/completions";
    }
  
    var oHttp = new XMLHttpRequest();
    oHttp.open("POST", sUrl);
    oHttp.setRequestHeader("Accept", "application/json");
    oHttp.setRequestHeader("Content-Type", "application/json");
    oHttp.setRequestHeader("Authorization", "Bearer " + api_key)
  
    oHttp.onreadystatechange = function() {
      if (oHttp.readyState === 4) {
        //console.log(oHttp.status);
  
        var oJson = {}
  
        try {
          oJson = JSON.parse(oHttp.responseText);
        } catch (error) {
          localStorage.chatgptanswer = "Error: " + error.message
        }
  
        if (oJson.error && oJson.error.message) {
          localStorage.chatgptanswer = "Error: " + oJson.error.message;
  
        } else if (oJson.choices) {
          var s = "";
  
          if (oJson.choices[0].text) {
            s = oJson.choices[0].text;
  
          } else if (oJson.choices[0].message) {
            //ChatGPT-4
            s = oJson.choices[0].message.content;
          }
  
          if (language != "en-US") {
            var a = s;
            if (a.length == 2) {
              s = a[1];
            }
          }
  
          if (s == "") {
            localStorage.chatgptanswer = "No response";
          } else {
            localStorage.chatgptanswer = s;
          }
        }
      }
    };
  
    var iMaxTokens = 2048;
    var sUserId = "1";
    var dTemperature = 0.5;
  
    var data = {
      model: sModel,
      prompt: sQuestion,
      max_tokens: iMaxTokens,
      user: sUserId,
      temperature: dTemperature,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["#", ";"]
    }
  
    //ChatGPT-4
    if (sModel.indexOf("gpt-3.5-turbo") != -1) {
      data = {
        "model": sModel,
        "messages": [
          {
            "role": "user",
            "content": sQuestion
          }
        ]
      }
    }
    
    oHttp.send(JSON.stringify(data));
  }

  async function ask(text, api_key, model, language){
    localStorage.chatgptanswer = "Send Function did not respond [YOU_CAN'T_RETURN_A_VALUE]";
    Send(text, api_key, model, language);
    var response_time = 0.1;
    await delay(0.1);
    while (localStorage.chatgptanswer == "Send Function did not respond [YOU_CAN'T_RETURN_A_VALUE]") {
      response_time = response_time + 0.1;
      await delay(0.1);
    }
    return {
      answer: localStorage.chatgptanswer,
      response_time: response_time
    };
  }

  class ChatGPTExtension {
    getInfo() {
      return {
        id: 'samuelloufchatgpt',
        name: 'ChatGPT',
        color1: '#19c37d',
        color2: '#13955f',
        menuIconURI: menuIcon,
        blockIconURI: blockIcon,
        blocks: [
          {
            opcode: 'ask_to_chatgpt_function',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ask [QUESTION] with api key [API_KEY] using model [MODEL] in [LANGUAGE]',
            arguments: {
              QUESTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'How did computers changed the world?'
              },
              API_KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'API KEY'
              },
              MODEL: {
                type: Scratch.ArgumentType.STRING,
                menu: 'models',
                defaultValue: 'text-davinci-003'
              },
              LANGUAGE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'languages',
                defaultValue: 'en-US'
              }
            }
          }
        ],
        menus: {
          models: {
            acceptReporters: true,
            items: ['text-davinci-003', 'text-davinci-002', 'code-davinci-002', 'gpt-3.5-turbo', 'gpt-3.5-turbo-0301']
          },
          languages: {
            acceptReporters: true,
            items: [
              {
                text: 'English (United States)',
                value: 'en-US'
              },
              {
                text: 'French (France)',
                value: 'fr-FR'
              },
              {
                text: 'Russian (Russia)',
                value: 'ru-RU'
              },
              {
                text: 'Portuguese (Brazil)',
                value: 'pt-BR'
              },
              {
                text: 'Spanish (Spain)',
                value: 'es-ES'
              },
              {
                text: 'German (Germany)',
                value: 'de-DE'
              },
              {
                text: 'Italian (Italy)',
                value: 'it-IT'
              },
              {
                text: 'Polish (Poland)',
                value: 'pl-PL'
              },
              {
                text: 'Dutch (Netherlands)',
                value: 'nl-NL'
              }
            ]
          }
        }
      };
    }

    async ask_to_chatgpt_function (args){
      var chatgptanswer = await ask(args.QUESTION, args.API_KEY, args.MODEL, args.LANGUAGE);
      console.log(chatgptanswer);
      return chatgptanswer.answer.replace("\n\n", "");
    }
  }
  Scratch.extensions.register(new ChatGPTExtension());
})(Scratch);
