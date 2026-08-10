// Name: Locale
// ID: fakemonLocale
// Description: Blocks for manual translations and language information.
// By: Scratch_Fakemon <https://scratch.mit.edu/users/Scratch_Fakemon/>
// License: MPL-2.0

/* Note for contributors:
When updating this extension's block info, please also update the documentation (/docs/Fakemon/Locale.md).
Locale can be confusing to some users, so accurate documentation should help explain things better.
*/

(async function (Scratch) {
  "use strict";
  /**
   * @type {any[]}
   */
  let allAttemptedTranslations = [];
  /**
   * @type {any[]}
   */
  let allFailedTranslations = [];
  Scratch.vm.on("PROJECT_START", () => {
    // Reset translation lists
    allAttemptedTranslations = [];
    allFailedTranslations = [];
  });
  /**
   * @type {any}
   */
  let languageNameAndCodeLookupTableGLOBALIZED;
  /*
  TODO: Make a version of Locale with this value auto-filled (possibly with a build script) for use in environments like the desktop app
  It isn't needed when getting the code from the official gallery since the user is already connected to the Internet,
  but static environments that won't always be connected (like the Desktop app) will benefit from having the table built-in.
  */
  const backupTable = null;
  async function getLanguageNameAndCodeLookupTableGLOBALIZED() {
    let fetchResult;
    try {
      fetchResult = await Scratch.fetch(
        "https://raw.githubusercontent.com/TurboWarp/scratch-translate-extension-languages-mirror/main/package/languages.json" // TurboWarp's mirror of the supported Translate extension languages
      );
    } catch {
      fetchResult = null;
    }

    if (fetchResult) {
      return JSON.parse(await fetchResult.text());
    } else {
      return backupTable;
    }
  }
  languageNameAndCodeLookupTableGLOBALIZED =
    await getLanguageNameAndCodeLookupTableGLOBALIZED();

  /**
   * @type {any[]}
   */
  let languageNameAndCodeLookupTable;

  // @SharkPool-SP mentioned that many blocks in Locale can be recreated by other extensions (most notably JSON)
  let showRecreatableBlocks = true; // Whether or not to show blocks that can be recreated with other extensions
  let hasToggledRecreatableBlocks = false; // Whether or not the previous variable has been toggled so the explanation only shows once

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The Locale extension must run unsandboxed!");
  }
  let localeObject =
    // @ts-ignore
    Scratch.vm.runtime.extensionStorage["fakemonLocale"]?.localeObject || {};
  let blockExtensionIcon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUyIiBoZWlnaHQ9IjE1MiIgdmlld0JveD0iMCAwIDE1MiAxNTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48ZyBmaWx0ZXI9InVybCgjYikiPjxwYXRoIGQ9Ik0xMDAuNDM5IDQwLjMzNmE2IDYgMCAwIDEgNiA2djYxLjE3OGE2IDYgMCAwIDEtNiA2SDQxLjM5NEwzMS45MDYgMTIzbC05LjUxNi05LjUxN2E2IDYgMCAwIDEtNS4zOS01Ljk2OVY0Ni4zMzdhNiA2IDAgMCAxIDYtNi4wMDF6IiBmaWxsPSIjZmZmIi8+PC9nPjxwYXRoIGQ9Im0xMDAuNDM5IDQwLjMzNi4wMDEtMi41aC0uMDAxem0wIDczLjE3OHYyLjVoLjAwMXptLTU5LjA0NSAwdi0yLjVoLTEuMDM2bC0uNzMyLjczMnpNMzEuOTA2IDEyM2wtMS43NjcgMS43NjggMS43NjcgMS43NjcgMS43NjgtMS43Njd6bS05LjUxNi05LjUxNyAxLjc2Ny0xLjc2Ny0uNjMtLjYzLS44ODYtLjA5em03OC4wNDktNzMuMTQ3djIuNWEzLjUgMy41IDAgMCAxIDMuNSAzLjVoNWE4LjUgOC41IDAgMCAwLTguNDk5LTguNXptNiA2aC0yLjV2NjEuMTc4aDVWNDYuMzM3em0wIDYxLjE3OGgtMi41YTMuNSAzLjUgMCAwIDEtMy41IDMuNXYyLjVsLjAwMSAyLjVhOC41IDguNSAwIDAgMCA4LjQ5OS04LjV6bS02IDZ2LTIuNUg0MS4zOTR2NWg1OS4wNDV6bS01OS4wNDUgMC0xLjc2OC0xLjc2OC05LjQ4NyA5LjQ4NkwzMS45MDYgMTIzbDEuNzY4IDEuNzY4IDkuNDg3LTkuNDg2ek0zMS45MDYgMTIzbDEuNzY4LTEuNzY4LTkuNTE3LTkuNTE2LTEuNzY3IDEuNzY3LTEuNzY4IDEuNzY4IDkuNTE3IDkuNTE3em0tOS41MTYtOS41MTcuMjUtMi40ODdhMy41IDMuNSAwIDAgMS0zLjE0LTMuNDgyaC01YTguNSA4LjUgMCAwIDAgNy42MzggOC40NTd6TTE3IDEwNy41MTRoMi41VjQ2LjMzN2gtNXY2MS4xNzd6bTAtNjEuMTc3aDIuNWEzLjUgMy41IDAgMCAxIDMuNS0zLjUwMXYtNWE4LjUgOC41IDAgMCAwLTguNSA4LjV6bTYtNi4wMDF2Mi41aDc3LjQzOXYtNUgyM3oiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjE1Ii8+PGcgZmlsdGVyPSJ1cmwoI2MpIj48cGF0aCBkPSJNMTI4LjE5NiAyOGE2IDYgMCAwIDEgNiA2djYxLjE3OGE2IDYgMCAwIDEtNiA2SDY5LjE0OWwtOS40ODYgOS40ODYtOS41MTYtOS41MThhNiA2IDAgMCAxLTUuMzktNS45NjhWMzRhNiA2IDAgMCAxIDYtNnoiIGZpbGw9IiM0MzhmZWIiIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyIvPjxwYXRoIGQ9Ik0xMjguMTk2IDI4di0yLjV6bTYgNjcuMTc4aDIuNXptLTYgNnYyLjV6bS01OS4wNDcgMHYtMi41aC0xLjAzNWwtLjczMi43MzJ6bS05LjQ4NiA5LjQ4Ni0xLjc2OCAxLjc2OCAxLjc2OCAxLjc2OCAxLjc2OC0xLjc2OHptLTkuNTE2LTkuNTE4IDEuNzY3LTEuNzY3LS42My0uNjMtLjg4Ni0uMDl6bS01LjM5LTUuOTY4aC0yLjV6bTAtNjEuMTc4aC0yLjV6bTYtNnYtMi41em03Ny40MzkgMHYyLjVhMy41IDMuNSAwIDAgMSAzLjUgMy41aDVhOC41IDguNSAwIDAgMC04LjUtOC41em02IDZoLTIuNXY2MS4xNzhoNVYzNHptMCA2MS4xNzhoLTIuNWEzLjUgMy41IDAgMCAxLTMuNSAzLjV2NWE4LjUgOC41IDAgMCAwIDguNS04LjV6bS02IDZ2LTIuNUg2OS4xNDl2NWg1OS4wNDd6bS01OS4wNDcgMC0xLjc2Ny0xLjc2OC05LjQ4NyA5LjQ4NiAxLjc2OCAxLjc2OCAxLjc2OCAxLjc2OCA5LjQ4Ni05LjQ4NnptLTkuNDg2IDkuNDg2IDEuNzY4LTEuNzY4LTkuNTE3LTkuNTE3LTEuNzY3IDEuNzY3LTEuNzY4IDEuNzY4IDkuNTE2IDkuNTE4em0tOS41MTYtOS41MTguMjUtMi40ODdhMy41IDMuNSAwIDAgMS0zLjE0LTMuNDgxaC01YzAgNC40MDQgMy4zNDggOC4wMjIgNy42MzggOC40NTZ6bS01LjM5LTUuOTY4aDIuNVYzNGgtNXY2MS4xNzh6bTAtNjEuMTc4aDIuNWEzLjUgMy41IDAgMCAxIDMuNS0zLjV2LTVhOC41IDguNSAwIDAgMC04LjUgOC41em02LTZ2Mi41aDc3LjQzOXYtNWgtNzcuNDR6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4xNSIvPjwvZz48L2c+PGRlZnM+PGZpbHRlciBpZD0iYiIgeD0iMTQuNSIgeT0iMzcuODM2IiB3aWR0aD0iOTQuNDM5IiBoZWlnaHQ9IjkyLjciIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz48ZmVPZmZzZXQgZHk9IjQiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+PGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+PGZlQmxlbmQgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QxX2lubmVyU2hhZG93XzEzMV80OCIvPjwvZmlsdGVyPjxmaWx0ZXIgaWQ9ImMiIHg9IjM4LjI1NyIgeT0iMjUuNSIgd2lkdGg9IjEwMi40MzkiIGhlaWdodD0iOTYuNyIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPjxmZU9mZnNldCBkeT0iNCIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz48ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPjxmZUJsZW5kIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18xMzFfNDgiLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTMxXzQ4IiByZXN1bHQ9InNoYXBlIi8+PC9maWx0ZXI+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDE1MnYxNTJIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=";
  let menuExtensionIcon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUyIiBoZWlnaHQ9IjE1MiIgdmlld0JveD0iMCAwIDE1MiAxNTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMzFfNDgpIj4KPGNpcmNsZSBjeD0iNzYiIGN5PSI3NiIgcj0iNzYiIGZpbGw9IiMyNDVDQTAiLz4KPGNpcmNsZSBjeD0iNzYiIGN5PSI3NiIgcj0iNzMuNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiIHN0cm9rZS13aWR0aD0iNSIvPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9pXzEzMV80OCkiPgo8cGF0aCBkPSJNMTAwLjQzOSA0MC4zMzU5QzEwMy43NTMgNDAuMzM2MSAxMDYuNDM5IDQzLjAyMzMgMTA2LjQzOSA0Ni4zMzY5VjEwNy41MTRDMTA2LjQzOSAxMTAuODI3IDEwMy43NTMgMTEzLjUxNCAxMDAuNDM5IDExMy41MTRINDEuMzkzNkwzMS45MDYyIDEyM0wyMi4zODk2IDExMy40ODNDMTkuMzYyNiAxMTMuMTc4IDE3IDExMC42MjEgMTcgMTA3LjUxNFY0Ni4zMzY5QzE3IDQzLjAyMzIgMTkuNjg2MyA0MC4zMzU5IDIzIDQwLjMzNTlIMTAwLjQzOVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPHBhdGggZD0iTTEwMC40MzkgNDAuMzM1OUwxMDAuNDQgMzcuODM1OUgxMDAuNDM5VjQwLjMzNTlaTTEwMC40MzkgMTEzLjUxNFYxMTYuMDE0SDEwMC40NEwxMDAuNDM5IDExMy41MTRaTTQxLjM5MzYgMTEzLjUxNFYxMTEuMDE0SDQwLjM1ODFMMzkuNjI1OSAxMTEuNzQ2TDQxLjM5MzYgMTEzLjUxNFpNMzEuOTA2MiAxMjNMMzAuMTM4NSAxMjQuNzY4TDMxLjkwNjIgMTI2LjUzNUwzMy42NzM5IDEyNC43NjhMMzEuOTA2MiAxMjNaTTIyLjM4OTYgMTEzLjQ4M0wyNC4xNTc0IDExMS43MTZMMjMuNTI3NCAxMTEuMDg2TDIyLjY0MDkgMTEwLjk5NkwyMi4zODk2IDExMy40ODNaTTEwMC40MzkgNDAuMzM1OUwxMDAuNDM5IDQyLjgzNTlDMTAyLjM3MiA0Mi44MzYgMTAzLjkzOSA0NC40MDM2IDEwMy45MzkgNDYuMzM2OUgxMDYuNDM5SDEwOC45MzlDMTA4LjkzOSA0MS42NDMgMTA1LjEzNCAzNy44MzYyIDEwMC40NCAzNy44MzU5TDEwMC40MzkgNDAuMzM1OVpNMTA2LjQzOSA0Ni4zMzY5SDEwMy45MzlWMTA3LjUxNEgxMDYuNDM5SDEwOC45MzlWNDYuMzM2OUgxMDYuNDM5Wk0xMDYuNDM5IDEwNy41MTRIMTAzLjkzOUMxMDMuOTM5IDEwOS40NDYgMTAyLjM3MiAxMTEuMDE0IDEwMC40MzkgMTExLjAxNEwxMDAuNDM5IDExMy41MTRMMTAwLjQ0IDExNi4wMTRDMTA1LjEzNCAxMTYuMDEzIDEwOC45MzkgMTEyLjIwOCAxMDguOTM5IDEwNy41MTRIMTA2LjQzOVpNMTAwLjQzOSAxMTMuNTE0VjExMS4wMTRINDEuMzkzNlYxMTMuNTE0VjExNi4wMTRIMTAwLjQzOVYxMTMuNTE0Wk00MS4zOTM2IDExMy41MTRMMzkuNjI1OSAxMTEuNzQ2TDMwLjEzODYgMTIxLjIzMkwzMS45MDYyIDEyM0wzMy42NzM5IDEyNC43NjhMNDMuMTYxMiAxMTUuMjgyTDQxLjM5MzYgMTEzLjUxNFpNMzEuOTA2MiAxMjNMMzMuNjc0IDEyMS4yMzJMMjQuMTU3NCAxMTEuNzE2TDIyLjM4OTYgMTEzLjQ4M0wyMC42MjE5IDExNS4yNTFMMzAuMTM4NSAxMjQuNzY4TDMxLjkwNjIgMTIzWk0yMi4zODk2IDExMy40ODNMMjIuNjQwOSAxMTAuOTk2QzIwLjg3ODEgMTEwLjgxOCAxOS41IDEwOS4zMjUgMTkuNSAxMDcuNTE0SDE3SDE0LjVDMTQuNSAxMTEuOTE4IDE3Ljg0NzIgMTE1LjUzNyAyMi4xMzg0IDExNS45NzFMMjIuMzg5NiAxMTMuNDgzWk0xNyAxMDcuNTE0SDE5LjVWNDYuMzM2OUgxN0gxNC41VjEwNy41MTRIMTdaTTE3IDQ2LjMzNjlIMTkuNUMxOS41IDQ0LjQwMzQgMjEuMDY3NSA0Mi44MzU5IDIzIDQyLjgzNTlWNDAuMzM1OVYzNy44MzU5QzE4LjMwNSAzNy44MzU5IDE0LjUgNDEuNjQzIDE0LjUgNDYuMzM2OUgxN1pNMjMgNDAuMzM1OVY0Mi44MzU5SDEwMC40MzlWNDAuMzM1OVYzNy44MzU5SDIzVjQwLjMzNTlaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjE1Ii8+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIxX2RfMTMxXzQ4KSI+CjxwYXRoIGQ9Ik0xMjguMTk2IDI4QzEzMS41MSAyOC4wMDAxIDEzNC4xOTYgMzAuNjg2MyAxMzQuMTk2IDM0Vjk1LjE3NzdDMTM0LjE5NiA5OC40OTEzIDEzMS41MSAxMDEuMTc4IDEyOC4xOTYgMTAxLjE3OEg2OS4xNDk0TDU5LjY2MzEgMTEwLjY2NEw1MC4xNDY1IDEwMS4xNDZDNDcuMTE5NiAxMDAuODQxIDQ0Ljc1NyA5OC4yODUyIDQ0Ljc1NjggOTUuMTc3N1YzNEM0NC43NTY4IDMwLjY4NjQgNDcuNDQzMiAyOC4wMDAxIDUwLjc1NjggMjhIMTI4LjE5NloiIGZpbGw9IiM0MzhGRUIiIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyIvPgo8cGF0aCBkPSJNMTI4LjE5NiAyOEwxMjguMTk2IDI1LjVIMTI4LjE5NlYyOFpNMTM0LjE5NiA5NS4xNzc3TDEzNi42OTYgOTUuMTc3OFY5NS4xNzc3SDEzNC4xOTZaTTEyOC4xOTYgMTAxLjE3OFYxMDMuNjc4SDEyOC4xOTZMMTI4LjE5NiAxMDEuMTc4Wk02OS4xNDk0IDEwMS4xNzhWOTguNjc3N0g2OC4xMTM5TDY3LjM4MTYgOTkuNDFMNjkuMTQ5NCAxMDEuMTc4Wk01OS42NjMxIDExMC42NjRMNTcuODk1MiAxMTIuNDMyTDU5LjY2MyAxMTQuMkw2MS40MzA5IDExMi40MzJMNTkuNjYzMSAxMTAuNjY0Wk01MC4xNDY1IDEwMS4xNDZMNTEuOTE0MyA5OS4zNzg4TDUxLjI4NDMgOTguNzQ4N0w1MC4zOTc5IDk4LjY1OTJMNTAuMTQ2NSAxMDEuMTQ2Wk00NC43NTY4IDk1LjE3NzdINDIuMjU2OFY5NS4xNzc4TDQ0Ljc1NjggOTUuMTc3N1pNNDQuNzU2OCAzNEw0Mi4yNTY4IDM0VjM0SDQ0Ljc1NjhaTTUwLjc1NjggMjhWMjUuNUg1MC43NTY4TDUwLjc1NjggMjhaTTEyOC4xOTYgMjhMMTI4LjE5NiAzMC41QzEzMC4xMjkgMzAuNSAxMzEuNjk2IDMyLjA2NzEgMTMxLjY5NiAzNEgxMzQuMTk2SDEzNi42OTZDMTM2LjY5NiAyOS4zMDU2IDEzMi44OTEgMjUuNTAwMSAxMjguMTk2IDI1LjVMMTI4LjE5NiAyOFpNMTM0LjE5NiAzNEgxMzEuNjk2Vjk1LjE3NzdIMTM0LjE5NkgxMzYuNjk2VjM0SDEzNC4xOTZaTTEzNC4xOTYgOTUuMTc3N0wxMzEuNjk2IDk1LjE3NzZDMTMxLjY5NiA5Ny4xMTA2IDEzMC4xMjkgOTguNjc3NyAxMjguMTk2IDk4LjY3NzdMMTI4LjE5NiAxMDEuMTc4TDEyOC4xOTYgMTAzLjY3OEMxMzIuODkxIDEwMy42NzggMTM2LjY5NiA5OS44NzIgMTM2LjY5NiA5NS4xNzc4TDEzNC4xOTYgOTUuMTc3N1pNMTI4LjE5NiAxMDEuMTc4Vjk4LjY3NzdINjkuMTQ5NFYxMDEuMTc4VjEwMy42NzhIMTI4LjE5NlYxMDEuMTc4Wk02OS4xNDk0IDEwMS4xNzhMNjcuMzgxNiA5OS40MUw1Ny44OTUzIDEwOC44OTZMNTkuNjYzMSAxMTAuNjY0TDYxLjQzMDkgMTEyLjQzMkw3MC45MTcyIDEwMi45NDZMNjkuMTQ5NCAxMDEuMTc4Wk01OS42NjMxIDExMC42NjRMNjEuNDMwOSAxMDguODk2TDUxLjkxNDMgOTkuMzc4OEw1MC4xNDY1IDEwMS4xNDZMNDguMzc4NiAxMDIuOTE0TDU3Ljg5NTIgMTEyLjQzMkw1OS42NjMxIDExMC42NjRaTTUwLjE0NjUgMTAxLjE0Nkw1MC4zOTc5IDk4LjY1OTJDNDguNjM0NiA5OC40ODA5IDQ3LjI1NjkgOTYuOTg4NSA0Ny4yNTY4IDk1LjE3NzZMNDQuNzU2OCA5NS4xNzc3TDQyLjI1NjggOTUuMTc3OEM0Mi4yNTcgOTkuNTgxOSA0NS42MDQ3IDEwMy4yIDQ5Ljg5NTEgMTAzLjYzNEw1MC4xNDY1IDEwMS4xNDZaTTQ0Ljc1NjggOTUuMTc3N0g0Ny4yNTY4VjM0SDQ0Ljc1NjhINDIuMjU2OFY5NS4xNzc3SDQ0Ljc1NjhaTTQ0Ljc1NjggMzRMNDcuMjU2OCAzNEM0Ny4yNTY4IDMyLjA2NzEgNDguODIzOSAzMC41MDAxIDUwLjc1NjkgMzAuNUw1MC43NTY4IDI4TDUwLjc1NjggMjUuNUM0Ni4wNjI2IDI1LjUwMDEgNDIuMjU2OCAyOS4zMDU2IDQyLjI1NjggMzRMNDQuNzU2OCAzNFpNNTAuNzU2OCAyOFYzMC41SDEyOC4xOTZWMjhWMjUuNUg1MC43NTY4VjI4WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L2c+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaV8xMzFfNDgiIHg9IjE0LjUiIHk9IjM3LjgzNTkiIHdpZHRoPSI5NC40Mzk1IiBoZWlnaHQ9IjkyLjY5OTUiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0ic2hhcGUiIHJlc3VsdD0iZWZmZWN0MV9pbm5lclNoYWRvd18xMzFfNDgiLz4KPC9maWx0ZXI+CjxmaWx0ZXIgaWQ9ImZpbHRlcjFfZF8xMzFfNDgiIHg9IjM4LjI1NjgiIHk9IjI1LjUiIHdpZHRoPSIxMDIuNDM5IiBoZWlnaHQ9Ijk2LjY5OTciIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9Im91dCIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzEzMV80OCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18xMzFfNDgiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTMxXzQ4Ij4KPHJlY3Qgd2lkdGg9IjE1MiIgaGVpZ2h0PSIxNTIiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
  class Locale {
    constructor() {
      /**
       * @type {{ name: any; code: any; }[]}
       */
      let arrayThusFar = [];
      // @ts-ignore
      if (languageNameAndCodeLookupTableGLOBALIZED.menuMap) {
        languageNameAndCodeLookupTableGLOBALIZED.menuMap[
          this._matchLanguages(
            Object.keys(languageNameAndCodeLookupTableGLOBALIZED.menuMap),
            JSON.parse(this.getLanguageArray())
          )[0] || "en"
        ].forEach((/** @type {{ name: any; code: any; }} */ entry) => {
          // Heavily inspired by https://github.com/TurboWarp/scratch-vm/blob/develop/src/extensions/scratch3_translate/index.js
          const obj = { name: entry.name, code: entry.code };
          try {
            if (obj) {
              // @ts-ignore
              if (!this._filterArray(arrayThusFar, "code").includes(obj.code)) {
                arrayThusFar.push(obj);
              }
            }
          } catch (error) {
            console.warn("Locale:", error);
          }
        });
      } else {
        console.warn(
          "Locale: languageNameAndCodeLookupTableGLOBALIZED does not contain a menuMap key or it lacks a value."
        );
      }
      languageNameAndCodeLookupTable = arrayThusFar;
    }
    getInfo() {
      return {
        id: "fakemonLocale",
        name: Scratch.translate("Locale"),
        color1: "#2a5fa0",
        blockIconURI: blockExtensionIcon,
        menuIconURI: menuExtensionIcon,
        docsURI: "https://extensions.turbowarp.org/Fakemon/Locale",
        blocks: [
          {
            func: "toggleRecreatableBlocks",
            blockType: Scratch.BlockType.BUTTON,
            text: showRecreatableBlocks
              ? Scratch.translate("Hide Recreatable Blocks")
              : Scratch.translate("Show Recreatable Blocks"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Global Translations"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "setFullLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set global translation information to JSON [JSON]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"en":{"${Scratch.translate("Hello, world!")}":"Hello, world!"},"es":{"${Scratch.translate("Hello, world!")}":"¡Hola, mundo!"}}`,
              },
            },
          },
          {
            opcode: "mergeFullLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "merge current translation information with JSON [JSON]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"pl":{"${Scratch.translate("Hello, world!")}":"Cześć, świat!"}}`,
              },
            },
          },
          {
            opcode: "getFullLocaleJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get global translation information"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "supportedLanguages",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all languages that can be translated to"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Per-Language Translations"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "setPerLangLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set translations for language code [LANG] to JSON [JSON]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"${Scratch.translate("Hello, world!")}":"¡Hola, mundo!"}`,
              },
            },
          },
          {
            opcode: "delLangFromJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete language code [LANG]"),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
            },
          },

          {
            opcode: "mergePerLangLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "merge current translations for language code [LANG] with JSON [JSON]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"${Scratch.translate("Apples and bananas")}":"Manzanas y plátanos"}`,
              },
            },
          },
          {
            opcode: "getPerLangLocaleJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "get translations for language code [LANG]"
            ),
            hideFromPalette: !showRecreatableBlocks,
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
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "setPerWordTranslation",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set translation for [TEXTIN] in language code [LANG] to [TEXTOUT]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              TEXTIN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello, world!"),
              },
              TEXTOUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "¡Hola, mundo!",
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
            text: Scratch.translate("get user's current language code"),
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
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Language Code ⇆ Name Conversions"),
          },
          {
            opcode: "nameFromCode",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("name of language with code [CODE]"),
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANG_CODE",
                defaultValue: "es",
              },
            },
          },
          {
            opcode: "nameFromCodeSpecified",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "name of language with code [CODE] in [NAME]"
            ),
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANG_CODE",
                defaultValue: "es",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANG_NAME",
                defaultValue: "es",
              },
            },
          },
          {
            opcode: "codeFromName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("code of language with name [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANG_NAME",
                defaultValue: "es",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Translating Text"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "translate",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("translate [TEXT] to language code [LANG]"),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello, world!"),
              },
            },
          },
          {
            opcode: "getallAttemptedTranslations",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("attempted translations as strings"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "getallAttemptedTranslationsObj",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("attempted translations as objects"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "getAllFailedTranslations",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("failed translations as strings"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "getAllFailedTranslationsObj",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("failed translations as objects"),
            hideFromPalette: !showRecreatableBlocks,
          },
        ],
        menus: {
          LANG_CODE: {
            acceptReporters: true,
            items: this._getLanguageCodes() || [
              {
                text: Scratch.translate(
                  "There was a problem getting language codes."
                ),
                value: "none1",
              },
              {
                text: Scratch.translate("Please try again later."),
                value: "none2",
              },
            ],
          },
          LANG_NAME: {
            acceptReporters: true,
            items: this._makeLanguageNameMenu() || [
              {
                text: Scratch.translate(
                  "There was a problem getting language names."
                ),
                value: "none1",
              },
              {
                text: Scratch.translate("Please try again later."),
                value: "none2",
              },
            ],
          },
        },
      };
    }
    toggleRecreatableBlocks() {
      function doToggle() {
        showRecreatableBlocks = !showRecreatableBlocks;
        hasToggledRecreatableBlocks = true;
        Scratch.vm.extensionManager.refreshBlocks();
      }
      if (!hasToggledRecreatableBlocks) {
        // If the user hasn't used this button before, tell them what it does
        alert(
          Scratch.translate(
            `This button will ${showRecreatableBlocks ? "hide" : "show"} blocks that can be recreated with other extensions or require values set by these blocks.`
          )
        );
        if (
          confirm(
            Scratch.translate(
              "Existing blocks in the project will not be affected, and you can undo this at any time. Is this okay?"
            )
          )
        ) {
          // Ask for user consent, just in case
          doToggle();
        }
      } else {
        // Otherwise, just toggle the variable
        doToggle();
      }
    }
    /**
     * @param {{ JSON: string; }} args
     */
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
    /**
     * @param {{ JSON: string; }} args
     */
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
    /**
     * @param {{ LANG: string; JSON: string; }} args
     */
    setPerLangLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        localeObject[args.LANG] = JSON.parse(args.JSON);
      } catch {
        localeObject = backupLocaleObject;
      }
      this._updateLocaleInfo();
    }
    /**
     * @param {{ LANG: string; }} args
     */
    delLangFromJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        delete localeObject[args.LANG];
      } catch {
        localeObject = backupLocaleObject;
      }
      this._updateLocaleInfo();
    }
    /**
     * @param {{ LANG: string; JSON: string; }} args
     */
    mergePerLangLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        localeObject[args.LANG] = {
          ...localeObject[args.LANG],
          ...JSON.parse(args.JSON),
        };
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateLocaleInfo();
    }
    /**
     * @param {{ LANG: string; TEXTIN: string | number; TEXTOUT: any; }} args
     */
    setPerWordTranslation(args) {
      if (!Object.prototype.hasOwnProperty.call(localeObject, args.LANG)) {
        // VS Code got mad when I tried to do it the normal way.
        localeObject[args.LANG] = {};
      }
      localeObject[args.LANG][args.TEXTIN] = args.TEXTOUT;
      this._updateLocaleInfo();
    }
    /**
     * @param {{ LANG: string; }} args
     */
    getPerLangLocaleJSON(args) {
      return JSON.stringify(localeObject[args.LANG]) || "{}";
    }
    /**
     * @param {{ TEXT: string; LANG: string; }} args
     */
    translate(args) {
      const translationLogInfo = {
        text: args.TEXT,
        lang: args.LANG,
        timestamp: new Date().getTime(),
      };

      allAttemptedTranslations.push(translationLogInfo);

      try {
        let translation = localeObject[args.LANG][args.TEXT];
        if (!translation) {
          translation = args.TEXT;

          allFailedTranslations.push({
            ...translationLogInfo,
            error: `The ${args.LANG} translation object does not contain an entry for ${args.TEXT}`,
          });
        }
        return translation || args.TEXT;
      } catch (error) {
        // Just return the input
        allFailedTranslations.push({
          ...translationLogInfo,
          // @ts-ignore
          error: error.message,
        });
        return args.TEXT;
      }
    }
    getLanguageCode() {
      try {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        return ReduxStore?.getState().locales.locale || navigator.languages[0];
      } catch {
        return navigator.languages[0];
      }
    }
    getLanguageArray() {
      try {
        if (
          // @ts-ignore
          // eslint-disable-next-line no-undef
          navigator.languages.includes(ReduxStore?.getState().locales.locale)
        ) {
          return JSON.stringify(navigator.languages);
        } else {
          return JSON.stringify([
            // @ts-ignore
            // eslint-disable-next-line no-undef
            ReduxStore?.getState().locales.locale,
            ...navigator.languages,
          ]);
        }
      } catch {
        return JSON.stringify(navigator.languages);
      }
    }
    /**
     * @param {{ LANG: any; }} args
     */
    isLanguagePreferred(args) {
      return JSON.parse(this.getLanguageArray()).includes(args.LANG);
    }
    supportedLanguages() {
      return JSON.stringify(Object.keys(localeObject));
    }
    supportedPreferredLanguages() {
      return JSON.stringify(
        this._matchLanguages(
          JSON.parse(this.getLanguageArray()),
          JSON.parse(this.supportedLanguages())
        )
      );
    }
    /**
     * @param {{ CODE: any; }} args
     */
    nameFromCode(args) {
      // @ts-ignore
      let codeIndex = this._getLanguageCodes().indexOf(args.CODE);
      if (codeIndex != -1) {
        // @ts-ignore
        return this._getLanguageNames()[codeIndex];
      } else {
        return "";
      }
    }
    /**
     * @param {{ NAME: string | number; CODE: any; }} args
     */
    nameFromCodeSpecified(args) {
      try {
        // @ts-ignore
        let codeIndex = this._filterArray(
          languageNameAndCodeLookupTableGLOBALIZED.menuMap[args.NAME],
          "code"
        ).indexOf(args.CODE); // Language codes are in alphabetical order for the target language, not based on the code or native name.
        if (codeIndex != -1) {
          // @ts-ignore
          return this._getLanguageNames(args.NAME)[codeIndex];
        } else {
          return "";
        }
      } catch {
        return ""; // The lookup table isn't perfect so there might not always be a translation of a language name
      }
    }
    /**
     * @param {{ NAME: string | number; }} args
     */
    codeFromName(args) {
      // @ts-ignore
      if (this._getLanguageCodes().includes(args.NAME)) {
        // The menu allows any reporter to be inserted, including those that don't match a menu. Remember, args.NAME will return the *value* of the menu, which, in this case, is the language code.
        return args.NAME;
      } else {
        args.NAME = args.NAME.toString().trim().toLowerCase();
        if (
          Object.prototype.hasOwnProperty.call(
            languageNameAndCodeLookupTableGLOBALIZED.nameMap,
            args.NAME
          )
        ) {
          // This is to ensure the actual name value can be used via inputs. This implementation is inspired by the Translate extension's.
          return languageNameAndCodeLookupTableGLOBALIZED.nameMap[args.NAME];
          // @ts-ignore
        } else if (this._getLanguageNames().includes(args.NAME)) {
          // Fallback
          // @ts-ignore
          let nameIndex = this._getLanguageNames().indexOf(args.NAME);
          if (nameIndex != -1) {
            // @ts-ignore
            return this._getLanguageCodes()[nameIndex];
          } else {
            return "";
          }
        } else {
          return "";
        }
      }
    }
    getallAttemptedTranslations() {
      return JSON.stringify(
        this._filterArray(allAttemptedTranslations, "text")
      );
    }
    getallAttemptedTranslationsObj() {
      return JSON.stringify(allAttemptedTranslations);
    }
    getAllFailedTranslations() {
      return JSON.stringify(this._filterArray(allFailedTranslations, "text"));
    }
    getAllFailedTranslationsObj() {
      return JSON.stringify(allFailedTranslations);
    }
    // Internal functions
    _updateLocaleInfo() {
      try {
        // @ts-ignore since extension storage IS a thing
        Scratch.vm.runtime.extensionStorage["fakemonLocale"] = {
          // @ts-ignore
          ...Scratch.vm.runtime.extensionStorage["fakemonLocale"],
          ...{ localeObject: localeObject },
        };
      } catch (error) {
        console.warn("Locale:", error);
      }
    }
    /**
     * @param {any[]} array
     * @param {string} matchKey
     */
    _filterArray(array, matchKey) {
      if (array != []) {
        return array.map((/** @type {{ [x: string]: any; }} */ value) => {
          try {
            if (value) {
              if (Object.prototype.hasOwnProperty.call(value, matchKey)) {
                if (value[matchKey]) {
                  return value[matchKey];
                }
              }
            }
          } catch (error) {
            console.warn("Locale:", error);
          }
        });
      }
    }
    /**
     * @param {string | any[]} languageArray
     * @param {any[]} supportedLanguages
     */
    _matchLanguages(languageArray, supportedLanguages) {
      /**
       * @type {any[]}
       */
      const matchedLanguages = [];
      supportedLanguages.forEach((/** @type {any} */ value) => {
        if (languageArray.includes(value)) {
          matchedLanguages.push(value);
        }
      });
      return matchedLanguages;
    }
    _getLanguageNames(lang = this.getLanguageCode()) {
      return this._filterArray(
        languageNameAndCodeLookupTableGLOBALIZED.menuMap[lang],
        "name"
      );
    }
    _getLanguageCodes() {
      return this._filterArray(languageNameAndCodeLookupTable, "code");
    }
    _makeLanguageNameMenu() {
      // Since the language names are being translated, we need a consistent way to refer to them.
      const names = this._getLanguageNames();
      const codes = this._getLanguageCodes();
      let menuThusFar = [];
      // @ts-ignore
      for (let i = 0; i < names.length; i++) {
        // @ts-ignore
        if (names[i] && codes[i]) {
          // @ts-ignore
          menuThusFar.push({ text: names[i], value: codes[i] });
        }
      }
      return menuThusFar;
    }
  }
  // @ts-ignore
  Scratch.extensions.register(new Locale());
})(Scratch);
