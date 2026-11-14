// Name: Locale
// ID: fakemonLocale
// Description: Blocks for manual translations and language information.
// By: Scratch_Fakemon <https://scratch.mit.edu/users/Scratch_Fakemon/>
// By: 0x1194 <https://scratch.mit.edu/users/0x1194/>
// License: MPL-2.0

/* Note for contributors:
When updating this extension's block info, please also update the documentation (/docs/Fakemon/Locale.md).
Locale can be confusing to some users, so accurate documentation should help explain things better.
*/

(async function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The Locale extension must run unsandboxed!");
  }

  const Cast = Scratch.Cast;

  /** @type {any[]} */
  let allAttemptedTranslations = [];

  /** @type {any[]} */
  let allFailedTranslations = [];

  /** @type {any} */
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
    } catch (error) {
      if (
        confirm(
          Scratch.translate(
            "Locale: Unable to load language information. Would you like to retry? The error was as follows: {error}",
            // @ts-ignore
            { error: error.message }
          )
        )
      )
        return await getLanguageNameAndCodeLookupTableGLOBALIZED(); // Retry on user request only

      fetchResult = null;
    }

    if (fetchResult) {
      try {
        return await fetchResult.json();
      } catch {
        return backupTable;
      }
    }

    return backupTable;
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

  let localeObject =
    // @ts-ignore
    Scratch.vm.runtime.extensionStorage["fakemonLocale"]?.localeObject ||
    Object.create(null);
  let config =
    // @ts-ignore
    Scratch.vm.runtime.extensionStorage["fakemonLocale"]?.config || {
      throwErrorOnFail: false,
      specialPrefix: "_",
      specialFallback: "en",
    };
  let blockExtensionIcon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUyIiBoZWlnaHQ9IjE1MiIgdmlld0JveD0iMCAwIDE1MiAxNTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48ZyBmaWx0ZXI9InVybCgjYikiPjxwYXRoIGQ9Ik0xMDAuNDM5IDQwLjMzNmE2IDYgMCAwIDEgNiA2djYxLjE3OGE2IDYgMCAwIDEtNiA2SDQxLjM5NEwzMS45MDYgMTIzbC05LjUxNi05LjUxN2E2IDYgMCAwIDEtNS4zOS01Ljk2OVY0Ni4zMzdhNiA2IDAgMCAxIDYtNi4wMDF6IiBmaWxsPSIjZmZmIi8+PC9nPjxwYXRoIGQ9Im0xMDAuNDM5IDQwLjMzNi4wMDEtMi41aC0uMDAxem0wIDczLjE3OHYyLjVoLjAwMXptLTU5LjA0NSAwdi0yLjVoLTEuMDM2bC0uNzMyLjczMnpNMzEuOTA2IDEyM2wtMS43NjcgMS43NjggMS43NjcgMS43NjcgMS43NjgtMS43Njd6bS05LjUxNi05LjUxNyAxLjc2Ny0xLjc2Ny0uNjMtLjYzLS44ODYtLjA5em03OC4wNDktNzMuMTQ3djIuNWEzLjUgMy41IDAgMCAxIDMuNSAzLjVoNWE4LjUgOC41IDAgMCAwLTguNDk5LTguNXptNiA2aC0yLjV2NjEuMTc4aDVWNDYuMzM3em0wIDYxLjE3OGgtMi41YTMuNSAzLjUgMCAwIDEtMy41IDMuNXYyLjVsLjAwMSAyLjVhOC41IDguNSAwIDAgMCA4LjQ5OS04LjV6bS02IDZ2LTIuNUg0MS4zOTR2NWg1OS4wNDV6bS01OS4wNDUgMC0xLjc2OC0xLjc2OC05LjQ4NyA5LjQ4NkwzMS45MDYgMTIzbDEuNzY4IDEuNzY4IDkuNDg3LTkuNDg2ek0zMS45MDYgMTIzbDEuNzY4LTEuNzY4LTkuNTE3LTkuNTE2LTEuNzY3IDEuNzY3LTEuNzY4IDEuNzY4IDkuNTE3IDkuNTE3em0tOS41MTYtOS41MTcuMjUtMi40ODdhMy41IDMuNSAwIDAgMS0zLjE0LTMuNDgyaC01YTguNSA4LjUgMCAwIDAgNy42MzggOC40NTd6TTE3IDEwNy41MTRoMi41VjQ2LjMzN2gtNXY2MS4xNzd6bTAtNjEuMTc3aDIuNWEzLjUgMy41IDAgMCAxIDMuNS0zLjUwMXYtNWE4LjUgOC41IDAgMCAwLTguNSA4LjV6bTYtNi4wMDF2Mi41aDc3LjQzOXYtNUgyM3oiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjE1Ii8+PGcgZmlsdGVyPSJ1cmwoI2MpIj48cGF0aCBkPSJNMTI4LjE5NiAyOGE2IDYgMCAwIDEgNiA2djYxLjE3OGE2IDYgMCAwIDEtNiA2SDY5LjE0OWwtOS40ODYgOS40ODYtOS41MTYtOS41MThhNiA2IDAgMCAxLTUuMzktNS45NjhWMzRhNiA2IDAgMCAxIDYtNnoiIGZpbGw9IiM0MzhmZWIiIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyIvPjxwYXRoIGQ9Ik0xMjguMTk2IDI4di0yLjV6bTYgNjcuMTc4aDIuNXptLTYgNnYyLjV6bS01OS4wNDcgMHYtMi41aC0xLjAzNWwtLjczMi43MzJ6bS05LjQ4NiA5LjQ4Ni0xLjc2OCAxLjc2OCAxLjc2OCAxLjc2OCAxLjc2OC0xLjc2OHptLTkuNTE2LTkuNTE4IDEuNzY3LTEuNzY3LS42My0uNjMtLjg4Ni0uMDl6bS01LjM5LTUuOTY4aC0yLjV6bTAtNjEuMTc4aC0yLjV6bTYtNnYtMi41em03Ny40MzkgMHYyLjVhMy41IDMuNSAwIDAgMSAzLjUgMy41aDVhOC41IDguNSAwIDAgMC04LjUtOC41em02IDZoLTIuNXY2MS4xNzhoNVYzNHptMCA2MS4xNzhoLTIuNWEzLjUgMy41IDAgMCAxLTMuNSAzLjV2NWE4LjUgOC41IDAgMCAwIDguNS04LjV6bS02IDZ2LTIuNUg2OS4xNDl2NWg1OS4wNDd6bS01OS4wNDcgMC0xLjc2Ny0xLjc2OC05LjQ4NyA5LjQ4NiAxLjc2OCAxLjc2OCAxLjc2OCAxLjc2OCA5LjQ4Ni05LjQ4NnptLTkuNDg2IDkuNDg2IDEuNzY4LTEuNzY4LTkuNTE3LTkuNTE3LTEuNzY3IDEuNzY3LTEuNzY4IDEuNzY4IDkuNTE2IDkuNTE4em0tOS41MTYtOS41MTguMjUtMi40ODdhMy41IDMuNSAwIDAgMS0zLjE0LTMuNDgxaC01YzAgNC40MDQgMy4zNDggOC4wMjIgNy42MzggOC40NTZ6bS01LjM5LTUuOTY4aDIuNVYzNGgtNXY2MS4xNzh6bTAtNjEuMTc4aDIuNWEzLjUgMy41IDAgMCAxIDMuNS0zLjV2LTVhOC41IDguNSAwIDAgMC04LjUgOC41em02LTZ2Mi41aDc3LjQzOXYtNWgtNzcuNDR6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4xNSIvPjwvZz48L2c+PGRlZnM+PGZpbHRlciBpZD0iYiIgeD0iMTQuNSIgeT0iMzcuODM2IiB3aWR0aD0iOTQuNDM5IiBoZWlnaHQ9IjkyLjciIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz48ZmVPZmZzZXQgZHk9IjQiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+PGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+PGZlQmxlbmQgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QxX2lubmVyU2hhZG93XzEzMV80OCIvPjwvZmlsdGVyPjxmaWx0ZXIgaWQ9ImMiIHg9IjM4LjI1NyIgeT0iMjUuNSIgd2lkdGg9IjEwMi40MzkiIGhlaWdodD0iOTYuNyIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPjxmZU9mZnNldCBkeT0iNCIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz48ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPjxmZUJsZW5kIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18xMzFfNDgiLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTMxXzQ4IiByZXN1bHQ9InNoYXBlIi8+PC9maWx0ZXI+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDE1MnYxNTJIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=";
  let menuExtensionIcon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUyIiBoZWlnaHQ9IjE1MiIgdmlld0JveD0iMCAwIDE1MiAxNTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMzFfNDgpIj4KPGNpcmNsZSBjeD0iNzYiIGN5PSI3NiIgcj0iNzYiIGZpbGw9IiMyNDVDQTAiLz4KPGNpcmNsZSBjeD0iNzYiIGN5PSI3NiIgcj0iNzMuNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiIHN0cm9rZS13aWR0aD0iNSIvPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9pXzEzMV80OCkiPgo8cGF0aCBkPSJNMTAwLjQzOSA0MC4zMzU5QzEwMy43NTMgNDAuMzM2MSAxMDYuNDM5IDQzLjAyMzMgMTA2LjQzOSA0Ni4zMzY5VjEwNy41MTRDMTA2LjQzOSAxMTAuODI3IDEwMy43NTMgMTEzLjUxNCAxMDAuNDM5IDExMy41MTRINDEuMzkzNkwzMS45MDYyIDEyM0wyMi4zODk2IDExMy40ODNDMTkuMzYyNiAxMTMuMTc4IDE3IDExMC42MjEgMTcgMTA3LjUxNFY0Ni4zMzY5QzE3IDQzLjAyMzIgMTkuNjg2MyA0MC4zMzU5IDIzIDQwLjMzNTlIMTAwLjQzOVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPHBhdGggZD0iTTEwMC40MzkgNDAuMzM1OUwxMDAuNDQgMzcuODM1OUgxMDAuNDM5VjQwLjMzNTlaTTEwMC40MzkgMTEzLjUxNFYxMTYuMDE0SDEwMC40NEwxMDAuNDM5IDExMy41MTRaTTQxLjM5MzYgMTEzLjUxNFYxMTEuMDE0SDQwLjM1ODFMMzkuNjI1OSAxMTEuNzQ2TDQxLjM5MzYgMTEzLjUxNFpNMzEuOTA2MiAxMjNMMzAuMTM4NSAxMjQuNzY4TDMxLjkwNjIgMTI2LjUzNUwzMy42NzM5IDEyNC43NjhMMzEuOTA2MiAxMjNaTTIyLjM4OTYgMTEzLjQ4M0wyNC4xNTc0IDExMS43MTZMMjMuNTI3NCAxMTEuMDg2TDIyLjY0MDkgMTEwLjk5NkwyMi4zODk2IDExMy40ODNaTTEwMC40MzkgNDAuMzM1OUwxMDAuNDM5IDQyLjgzNTlDMTAyLjM3MiA0Mi44MzYgMTAzLjkzOSA0NC40MDM2IDEwMy45MzkgNDYuMzM2OUgxMDYuNDM5SDEwOC45MzlDMTA4LjkzOSA0MS42NDMgMTA1LjEzNCAzNy44MzYyIDEwMC40NCAzNy44MzU5TDEwMC40MzkgNDAuMzM1OVpNMTA2LjQzOSA0Ni4zMzY5SDEwMy45MzlWMTA3LjUxNEgxMDYuNDM5SDEwOC45MzlWNDYuMzM2OUgxMDYuNDM5Wk0xMDYuNDM5IDEwNy41MTRIMTAzLjkzOUMxMDMuOTM5IDEwOS40NDYgMTAyLjM3MiAxMTEuMDE0IDEwMC40MzkgMTExLjAxNEwxMDAuNDM5IDExMy41MTRMMTAwLjQ0IDExNi4wMTRDMTA1LjEzNCAxMTYuMDEzIDEwOC45MzkgMTEyLjIwOCAxMDguOTM5IDEwNy41MTRIMTA2LjQzOVpNMTAwLjQzOSAxMTMuNTE0VjExMS4wMTRINDEuMzkzNlYxMTMuNTE0VjExNi4wMTRIMTAwLjQzOVYxMTMuNTE0Wk00MS4zOTM2IDExMy41MTRMMzkuNjI1OSAxMTEuNzQ2TDMwLjEzODYgMTIxLjIzMkwzMS45MDYyIDEyM0wzMy42NzM5IDEyNC43NjhMNDMuMTYxMiAxMTUuMjgyTDQxLjM5MzYgMTEzLjUxNFpNMzEuOTA2MiAxMjNMMzMuNjc0IDEyMS4yMzJMMjQuMTU3NCAxMTEuNzE2TDIyLjM4OTYgMTEzLjQ4M0wyMC42MjE5IDExNS4yNTFMMzAuMTM4NSAxMjQuNzY4TDMxLjkwNjIgMTIzWk0yMi4zODk2IDExMy40ODNMMjIuNjQwOSAxMTAuOTk2QzIwLjg3ODEgMTEwLjgxOCAxOS41IDEwOS4zMjUgMTkuNSAxMDcuNTE0SDE3SDE0LjVDMTQuNSAxMTEuOTE4IDE3Ljg0NzIgMTE1LjUzNyAyMi4xMzg0IDExNS45NzFMMjIuMzg5NiAxMTMuNDgzWk0xNyAxMDcuNTE0SDE5LjVWNDYuMzM2OUgxN0gxNC41VjEwNy41MTRIMTdaTTE3IDQ2LjMzNjlIMTkuNUMxOS41IDQ0LjQwMzQgMjEuMDY3NSA0Mi44MzU5IDIzIDQyLjgzNTlWNDAuMzM1OVYzNy44MzU5QzE4LjMwNSAzNy44MzU5IDE0LjUgNDEuNjQzIDE0LjUgNDYuMzM2OUgxN1pNMjMgNDAuMzM1OVY0Mi44MzU5SDEwMC40MzlWNDAuMzM1OVYzNy44MzU5SDIzVjQwLjMzNTlaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjE1Ii8+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIxX2RfMTMxXzQ4KSI+CjxwYXRoIGQ9Ik0xMjguMTk2IDI4QzEzMS41MSAyOC4wMDAxIDEzNC4xOTYgMzAuNjg2MyAxMzQuMTk2IDM0Vjk1LjE3NzdDMTM0LjE5NiA5OC40OTEzIDEzMS41MSAxMDEuMTc4IDEyOC4xOTYgMTAxLjE3OEg2OS4xNDk0TDU5LjY2MzEgMTEwLjY2NEw1MC4xNDY1IDEwMS4xNDZDNDcuMTE5NiAxMDAuODQxIDQ0Ljc1NyA5OC4yODUyIDQ0Ljc1NjggOTUuMTc3N1YzNEM0NC43NTY4IDMwLjY4NjQgNDcuNDQzMiAyOC4wMDAxIDUwLjc1NjggMjhIMTI4LjE5NloiIGZpbGw9IiM0MzhGRUIiIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyIvPgo8cGF0aCBkPSJNMTI4LjE5NiAyOEwxMjguMTk2IDI1LjVIMTI4LjE5NlYyOFpNMTM0LjE5NiA5NS4xNzc3TDEzNi42OTYgOTUuMTc3OFY5NS4xNzc3SDEzNC4xOTZaTTEyOC4xOTYgMTAxLjE3OFYxMDMuNjc4SDEyOC4xOTZMMTI4LjE5NiAxMDEuMTc4Wk02OS4xNDk0IDEwMS4xNzhWOTguNjc3N0g2OC4xMTM5TDY3LjM4MTYgOTkuNDFMNjkuMTQ5NCAxMDEuMTc4Wk01OS42NjMxIDExMC42NjRMNTcuODk1MiAxMTIuNDMyTDU5LjY2MyAxMTQuMkw2MS40MzA5IDExMi40MzJMNTkuNjYzMSAxMTAuNjY0Wk01MC4xNDY1IDEwMS4xNDZMNTEuOTE0MyA5OS4zNzg4TDUxLjI4NDMgOTguNzQ4N0w1MC4zOTc5IDk4LjY1OTJMNTAuMTQ2NSAxMDEuMTQ2Wk00NC43NTY4IDk1LjE3NzdINDIuMjU2OFY5NS4xNzc4TDQ0Ljc1NjggOTUuMTc3N1pNNDQuNzU2OCAzNEw0Mi4yNTY4IDM0VjM0SDQ0Ljc1NjhaTTUwLjc1NjggMjhWMjUuNUg1MC43NTY4TDUwLjc1NjggMjhaTTEyOC4xOTYgMjhMMTI4LjE5NiAzMC41QzEzMC4xMjkgMzAuNSAxMzEuNjk2IDMyLjA2NzEgMTMxLjY5NiAzNEgxMzQuMTk2SDEzNi42OTZDMTM2LjY5NiAyOS4zMDU2IDEzMi44OTEgMjUuNTAwMSAxMjguMTk2IDI1LjVMMTI4LjE5NiAyOFpNMTM0LjE5NiAzNEgxMzEuNjk2Vjk1LjE3NzdIMTM0LjE5NkgxMzYuNjk2VjM0SDEzNC4xOTZaTTEzNC4xOTYgOTUuMTc3N0wxMzEuNjk2IDk1LjE3NzZDMTMxLjY5NiA5Ny4xMTA2IDEzMC4xMjkgOTguNjc3NyAxMjguMTk2IDk4LjY3NzdMMTI4LjE5NiAxMDEuMTc4TDEyOC4xOTYgMTAzLjY3OEMxMzIuODkxIDEwMy42NzggMTM2LjY5NiA5OS44NzIgMTM2LjY5NiA5NS4xNzc4TDEzNC4xOTYgOTUuMTc3N1pNMTI4LjE5NiAxMDEuMTc4Vjk4LjY3NzdINjkuMTQ5NFYxMDEuMTc4VjEwMy42NzhIMTI4LjE5NlYxMDEuMTc4Wk02OS4xNDk0IDEwMS4xNzhMNjcuMzgxNiA5OS40MUw1Ny44OTUzIDEwOC44OTZMNTkuNjYzMSAxMTAuNjY0TDYxLjQzMDkgMTEyLjQzMkw3MC45MTcyIDEwMi45NDZMNjkuMTQ5NCAxMDEuMTc4Wk01OS42NjMxIDExMC42NjRMNjEuNDMwOSAxMDguODk2TDUxLjkxNDMgOTkuMzc4OEw1MC4xNDY1IDEwMS4xNDZMNDguMzc4NiAxMDIuOTE0TDU3Ljg5NTIgMTEyLjQzMkw1OS42NjMxIDExMC42NjRaTTUwLjE0NjUgMTAxLjE0Nkw1MC4zOTc5IDk4LjY1OTJDNDguNjM0NiA5OC40ODA5IDQ3LjI1NjkgOTYuOTg4NSA0Ny4yNTY4IDk1LjE3NzZMNDQuNzU2OCA5NS4xNzc3TDQyLjI1NjggOTUuMTc3OEM0Mi4yNTcgOTkuNTgxOSA0NS42MDQ3IDEwMy4yIDQ5Ljg5NTEgMTAzLjYzNEw1MC4xNDY1IDEwMS4xNDZaTTQ0Ljc1NjggOTUuMTc3N0g0Ny4yNTY4VjM0SDQ0Ljc1NjhINDIuMjU2OFY5NS4xNzc3SDQ0Ljc1NjhaTTQ0Ljc1NjggMzRMNDcuMjU2OCAzNEM0Ny4yNTY4IDMyLjA2NzEgNDguODIzOSAzMC41MDAxIDUwLjc1NjkgMzAuNUw1MC43NTY4IDI4TDUwLjc1NjggMjUuNUM0Ni4wNjI2IDI1LjUwMDEgNDIuMjU2OCAyOS4zMDU2IDQyLjI1NjggMzRMNDQuNzU2OCAzNFpNNTAuNzU2OCAyOFYzMC41SDEyOC4xOTZWMjhWMjUuNUg1MC43NTY4VjI4WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L2c+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaV8xMzFfNDgiIHg9IjE0LjUiIHk9IjM3LjgzNTkiIHdpZHRoPSI5NC40Mzk1IiBoZWlnaHQ9IjkyLjY5OTUiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0ic2hhcGUiIHJlc3VsdD0iZWZmZWN0MV9pbm5lclNoYWRvd18xMzFfNDgiLz4KPC9maWx0ZXI+CjxmaWx0ZXIgaWQ9ImZpbHRlcjFfZF8xMzFfNDgiIHg9IjM4LjI1NjgiIHk9IjI1LjUiIHdpZHRoPSIxMDIuNDM5IiBoZWlnaHQ9Ijk2LjY5OTciIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9Im91dCIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzEzMV80OCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18xMzFfNDgiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTMxXzQ4Ij4KPHJlY3Qgd2lkdGg9IjE1MiIgaGVpZ2h0PSIxNTIiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
  class Locale {
    constructor() {
      Scratch.vm.on("PROJECT_START", () => {
        this.clearAttemptedTranslationInfo();
      });
      /**
       * @type {{ name: any; code: any; }[]}
       */
      let arrayThusFar = [];
      // @ts-ignore
      try {
        if (languageNameAndCodeLookupTableGLOBALIZED.menuMap) {
          languageNameAndCodeLookupTableGLOBALIZED.menuMap[
            this._matchLanguages(
              Object.keys(languageNameAndCodeLookupTableGLOBALIZED.menuMap),
              // @ts-ignore
              this.getLanguageArray(true)
            )?.at(0) || "en"
          ].forEach((/** @type {{ name: any; code: any; }} */ entry) => {
            // Heavily inspired by https://github.com/TurboWarp/scratch-vm/blob/develop/src/extensions/scratch3_translate/index.js
            const obj = { name: entry.name, code: entry.code };
            try {
              if (obj) {
                // @ts-ignore
                if (
                  !this._filterArray(arrayThusFar, "code").includes(obj.code)
                ) {
                  arrayThusFar.push(obj);
                }
              }
            } catch (error) {
              console.warn("Locale:", error);
            }
          });
        }
      } catch (error) {
        console.warn(error); // Probably just didn't get loaded properly and the user didn't care
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
            func: "showTranslationModal",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Show Translation Modal"),
            hideFromPalette: !showRecreatableBlocks,
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
            opcode: "placeholderTranslate",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "placeholder translate [TEXT] to language code [LANG] with variables [VARS]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  default: `I have [apples] [apples == 1 ? "apple" : "apples"]!`,
                  description:
                    "This is a demonstration of Locale's placeholder system. Since it's being viewed by the project developer, the variable name `apples` should be translated. Additionally, change the expression to match how pluralizations work in your language.",
                }),
              },
              VARS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"${Scratch.translate("apples")}": 3}`,
              },
            },
          },
          "---",
          {
            opcode: "clearAttemptedTranslationInfo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear attempted/failed translation info"),
            hideFromPalette: !showRecreatableBlocks,
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
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Configuration"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "getConfig",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get configuration"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "setConfigBool",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set Boolean configuration [KEY] to [VALUE]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: "CONFIG_KEY_BOOL",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                menu: "BOOL",
              },
            },
          },
          {
            opcode: "getConfigBool",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("get Boolean configuration [KEY]"),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: "CONFIG_KEY_BOOL",
              },
            },
          },
          {
            opcode: "setConfigStr",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set string configuration [KEY] to [VALUE]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: "CONFIG_KEY_STR",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "_",
              },
            },
          },
          {
            opcode: "getConfigStr",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get string configuration [KEY]"),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: "CONFIG_KEY_STR",
              },
            },
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
          CONFIG_KEY_BOOL: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("error on translation fail?"),
                value: "throwErrorOnFail",
              },
            ],
          },
          CONFIG_KEY_STR: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("special translation prefix"),
                value: "specialPrefix",
              },
              {
                text: Scratch.translate(
                  "special translation fallback language"
                ),
                value: "specialFallback",
              },
            ],
          },
          BOOL: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("true"),
                value: "true",
              },
              {
                text: Scratch.translate("false"),
                value: "false",
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

        // @ts-ignore
        Scratch.vm.extensionManager.refreshBlocks("fakemonLocale");
      }

      if (hasToggledRecreatableBlocks) {
        doToggle();
        return;
      }

      // If the user hasn't used this button before, tell them what it does
      if (
        confirm(
          Scratch.translate(
            `This button will ${showRecreatableBlocks ? "hide" : "show"} blocks that can be recreated with other extensions or require values set by these blocks.` +
              `\n\nExisting blocks in the project will not be affected, and you can undo this at any time. Is this okay?`
          )
        )
      )
        doToggle(); // Ask for the user's consent just in case
    }

    // eslint-disable-next-line require-await
    async showTranslationModal() {
      // Some of this is taken from SharkPool's Dropdown Maker extension
      // @ts-ignore
      ScratchBlocks?.Procedures?.createProcedureDefCallback_();

      const modalContent = document.querySelector(
        `[class*="custom-procedures_modal-content_"]`
      );

      // @ts-ignore
      modalContent.style.width = "1050px";
      const blockSpace = document.querySelector(
        `[class^="custom-procedures_workspace_"]`
      );
      blockSpace?.remove();

      const modalBody = document.querySelector(
        `[class*="custom-procedures_body_"]`
      );
      if (!modalBody) return;

      // @ts-ignore
      modalBody?.replaceChildren([]);
      modalBody?.classList?.add("fakemonLocale_modalBody");

      const clearGhostInput = () => {
        /** @type {Element | null} */
        const element = document.querySelector(`[class*="removableTextInput"]`);

        // @ts-ignore
        if (!element) {
          setTimeout(clearGhostInput, 8);
          return;
        }

        // @ts-ignore
        element.style.opacity = 0;
      };

      clearGhostInput();

      const styles = document.createElement("style");
      styles.textContent = `
      .fakemonLocale_modalBody select {
        border: 0.1em solid #969696;
        padding: 0.1em 0.3em 0.1em 0.3em;

        color: white;
        border-radius: 0;
        background: #202020;
      }

      #fakemonLocale_table {
        width: 100%;
        margin-top: 1em;
      }

      #fakemonLocale_table[showall=false] th,
      #fakemonLocale_table[showall=false] td {
        max-width: 50%;
      }
      
      .fakemonLocale_actionItem {
      width: 25px !important; /* Otherwise it'll take up way more space than it needs */
      }

      #fakemonLocale_table tr th,
      #fakemonLocale_table tr td {
        border: 0.1em solid #969696;
        padding: 0.3em 0.3em 0.3em 0.3em;
        word-wrap: break-word;
        word-break: break-word;
      }

      #fakemonLocale_table tr th:nth-child(odd),
      #fakemonLocale_table tr td:nth-child(odd) {
        background: #242424;
      }

      #fakemonLocale_table tr th:nth-child(even),
      #fakemonLocale_table tr td:nth-child(even) {
        background: #363636;
      }

      #fakemonLocale_table *[contenteditable=true] {
        width: 100%;
        height: 100%;
        display: inline-block;
        padding: 0;
      }

      #fakemonLocale_table *[contenteditable=true]:empty:before,
      #fakemonLocale_table *[contenteditable=true]:has(br):before {
        content: '...';
        color: gray;
      }
        
      .fakemonLocale_actionButton {
      width: 20px;
      height: 20px;
      border: none;
      border-radius: 5px;
      }

      .fakemonLocale_removeButton {
      background-color: #ff6666;
      }

      .fakemonLocale_addButton {
      background-color: #6afe99;
      color: black;
      }
      `;

      modalBody?.append(styles);

      /** @type {Element | null} */
      const title = document.querySelector(
        `[class*="modal_header-item-title_"]`
      );
      if (title) title.textContent = Scratch.translate("Translations");

      // The custom block modal auto-selects an input but we don't want to do that

      let viewedLanguage = Object.keys(localeObject).at(0) ?? "%all";

      const langIndicator = document.createElement("span");
      langIndicator.textContent = Scratch.translate("View translations in: ");

      const langSelection = document.createElement("select");

      const refillSelection = () => {
        const allLangsOption = document.createElement("option");
        allLangsOption.value = "%all";
        allLangsOption.textContent = Scratch.translate("all languages");

        const newLangOption = document.createElement("option");
        newLangOption.value = "%new";
        newLangOption.textContent = Scratch.translate("new language");

        langSelection.replaceChildren(
          allLangsOption,
          ...Object.keys(localeObject).map((code) => {
            let codeOption = document.createElement("option");
            codeOption.value = code;
            codeOption.textContent = code;

            return codeOption;
          }),
          newLangOption
        );
      };

      refillSelection();

      langSelection.value = viewedLanguage;
      langIndicator.append(langSelection);
      modalBody?.append(langIndicator);

      let table = document.createElement("table");
      table.id = "fakemonLocale_table";
      modalBody?.append(table);

      const tableHead = document.createElement("thead");
      const tableBody = document.createElement("tbody");
      table.append(tableHead, tableBody);

      const tableHeadRow = document.createElement("tr");
      tableHead.append(tableHeadRow);

      const refillTable = (newLanguage = "%all") => {
        let showAllLanguages = newLanguage === "%all";
        table.setAttribute("showall", Cast.toString(showAllLanguages));

        let actionHead = document.createElement("th");
        actionHead.classList.add("fakemonLocale_actionItem");
        tableHeadRow.replaceChildren(actionHead);

        let sourceHead = document.createElement("th");
        sourceHead.textContent = Scratch.translate("Source");

        tableHeadRow.append(sourceHead);

        if (showAllLanguages) {
          Object.keys(localeObject).forEach((code) => {
            let languageHead = document.createElement("th");
            languageHead.textContent = code;

            tableHeadRow.append(languageHead);
          });
        } else {
          let translationHead = document.createElement("th");
          translationHead.textContent = Scratch.translate("Translation");

          tableHeadRow.append(translationHead);
        }

        // I don't know what a better name for this would be but this is just the localeObject with the structure changed
        // from language-to-translations to translations-to-languages.
        let sourceParentedObject = Object.entries(localeObject)?.reduce(
          (accumulator, languageEntry) => {
            let languageCode = languageEntry?.at(0);

            Object.entries(languageEntry?.at(1))?.forEach((entry) => {
              let source = entry?.at(0);

              if (!Object.prototype.hasOwnProperty.call(accumulator, source))
                Reflect.set(accumulator, source, Object.create(null));

              Reflect.set(
                accumulator?.[source],
                languageCode,
                entry?.at(1) ?? ""
              );
            });

            return accumulator;
          },
          Object.create(null)
        );

        // @ts-ignore
        tableBody.replaceChildren([]);
        if (showAllLanguages)
          Object.entries(sourceParentedObject).forEach((sourceEntry) => {
            let sourceName = sourceEntry?.at(0),
              sourceTranslations = sourceEntry?.at(1);

            let translationRow = document.createElement("tr");

            let actionItem = document.createElement("td");
            actionItem.classList.add("fakemonLocale_actionItem");
            let actionButton = document.createElement("button");
            actionButton.innerText = "-";
            actionButton.classList.add(
              "fakemonLocale_actionButton",
              "fakemonLocale_removeButton"
            );
            actionButton.addEventListener("click", () => {
              Object.keys(localeObject).forEach((lang) => {
                Reflect.deleteProperty(localeObject[lang], sourceName);
                refillTable(viewedLanguage);
              });
            });
            actionItem.appendChild(actionButton);
            translationRow.append(actionItem);

            let sourceItem = document.createElement("td");
            sourceItem.textContent = sourceName;

            translationRow.append(sourceItem);

            Object.keys(localeObject)?.forEach((languageCode) => {
              let translationItem = document.createElement("td");
              let translationSpan = document.createElement("span");

              translationSpan.textContent =
                sourceTranslations?.[languageCode] || "";
              translationSpan.contentEditable = "true";

              translationSpan.addEventListener("keydown", (event) => {
                // Don't let the user insert newlines or tabs
                if (event.key === "Enter" || event.key === "Tab") {
                  event.preventDefault();
                  //event.stopPropagation();
                  return;
                }
              });

              translationSpan.addEventListener("keyup", () => {
                if (
                  !Object.prototype.hasOwnProperty.call(
                    localeObject,
                    languageCode
                  )
                )
                  Reflect.set(localeObject, languageCode, Object.create(null));

                if (
                  translationSpan.textContent.length > 0 &&
                  translationSpan.textContent != "\n"
                )
                  Reflect.set(
                    localeObject?.[languageCode],
                    sourceName,
                    translationSpan.textContent.trim()
                  );
              });

              translationItem.append(translationSpan);
              translationRow.append(translationItem);
              tableBody.append(translationRow);
            });
          });
        else
          Object.entries(sourceParentedObject).forEach((sourceEntry) => {
            let sourceName = sourceEntry?.at(0),
              sourceTranslations = sourceEntry?.at(1);

            let translationRow = document.createElement("tr");
            let actionItem = document.createElement("td");
            actionItem.classList.add("fakemonLocale_actionItem");
            let actionButton = document.createElement("button");
            actionButton.innerText = "-";
            actionButton.classList.add(
              "fakemonLocale_actionButton",
              "fakemonLocale_removeButton"
            );
            actionButton.addEventListener("click", () => {
              Object.keys(localeObject).forEach((lang) => {
                Reflect.deleteProperty(localeObject[lang], sourceName);
                refillTable(viewedLanguage);
              });
            });
            actionItem.appendChild(actionButton);
            translationRow.append(actionItem);

            let sourceItem = document.createElement("td");
            sourceItem.textContent = sourceName;

            let translationItem = document.createElement("td");
            let translationSpan = document.createElement("span");

            translationSpan.textContent =
              sourceTranslations?.[newLanguage] || "";
            translationSpan.contentEditable = "true";

            translationSpan.addEventListener("keydown", (event) => {
              // Don't let the user insert newlines or tabs
              if (event.key === "Enter" || event.key === "Tab") {
                event.preventDefault();
                //event.stopPropagation();
                return;
              }
            });

            translationSpan.addEventListener("keyup", () => {
              if (
                !Object.prototype.hasOwnProperty.call(localeObject, newLanguage)
              )
                Reflect.set(localeObject, newLanguage, Object.create(null));

              if (
                translationSpan.textContent.length > 0 &&
                translationSpan.textContent != "\n"
              )
                Reflect.set(
                  localeObject?.[newLanguage],
                  sourceName,
                  translationSpan.textContent.trim()
                );
            });

            translationItem.append(translationSpan);
            translationRow.append(sourceItem, translationItem);
            tableBody.append(translationRow);
          });
        let finalRow = document.createElement("tr");
        let actionItem = document.createElement("td");
        let actionButton = document.createElement("button");
        actionButton.innerText = "+";
        actionButton.classList.add(
          "fakemonLocale_actionButton",
          "fakemonLocale_addButton"
        );
        actionButton.addEventListener("click", () => {
          let string = prompt(
            Scratch.translate(
              "What string would you like to add for translation? (blank to cancel)"
            )
          );
          if (string)
            if (!Object.hasOwnProperty.call(sourceParentedObject, string)) {
              Object.keys(localeObject).forEach((lang, i) => {
                localeObject[lang][string] = "";
              });
            } else {
              alert(
                Scratch.translate("String '{string}' already exists.", {
                  string: string,
                })
              );
            }

          refillTable(viewedLanguage);
        });
        actionItem.appendChild(actionButton);
        finalRow.append(actionItem);
        tableBody.append(finalRow);
      };

      refillTable(viewedLanguage);

      langSelection.addEventListener("change", () => {
        if (langSelection.selectedOptions?.[0]?.value === "%new") {
          let languageCode = prompt(
            Scratch.translate(
              "What should the language code be? (blank to cancel)"
            )
          );

          if (!languageCode) {
            langSelection.value = viewedLanguage;

            return;
          }

          if (
            Object.prototype.hasOwnProperty.call(localeObject, languageCode)
          ) {
            alert(
              Scratch.translate("Language '{lang}' already exists.", {
                lang: languageCode,
              })
            );

            langSelection.value = viewedLanguage;

            return;
          }

          Reflect.set(localeObject, languageCode, Object.create(null));

          refillSelection();

          langSelection.value = languageCode;
          viewedLanguage = languageCode;

          refillTable(viewedLanguage);

          return;
        }

        viewedLanguage = langSelection.selectedOptions?.[0]?.value ?? "%all";

        refillTable(viewedLanguage);
      });
    }

    /** @param {{ JSON: string; }} args */
    setFullLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        localeObject = JSON.parse(args.JSON);
        if (Object.getPrototypeOf(localeObject) !== Object.prototype) {
          localeObject = backupLocaleObject;
        }
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateExtensionStorage();
    }

    /** @param {{ JSON: string; }} args */
    mergeFullLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        let mergedJson = JSON.parse(args.JSON);
        if (Object.getPrototypeOf(mergedJson) === Object.prototype) {
          localeObject = { ...localeObject, ...mergedJson };
        }
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateExtensionStorage();
    }

    getFullLocaleJSON() {
      return JSON.stringify(localeObject) || "{}";
    }

    /** @param {{ LANG: string; JSON: string; }} args */
    setPerLangLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        let mergedJson = JSON.parse(args.JSON);
        if (Object.getPrototypeOf(mergedJson) === Object.prototype) {
          localeObject[args.LANG] = mergedJson;
        }
      } catch {
        localeObject = backupLocaleObject;
      }
      this._updateExtensionStorage();
    }

    /** @param {{ LANG: string; }} args */
    delLangFromJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        Reflect.deleteProperty(localeObject, args.LANG);
      } catch {
        localeObject = backupLocaleObject;
      }
      this._updateExtensionStorage();
    }

    /** @param {{ LANG: string; JSON: string; }} args */
    mergePerLangLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        let mergedJson = JSON.parse(args.JSON);
        if (Object.getPrototypeOf(mergedJson) === Object.prototype) {
          localeObject[args.LANG] = {
            ...localeObject[args.LANG],
            ...mergedJson,
          };
        }
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateExtensionStorage();
    }

    /** @param {{ LANG: string; TEXTIN: string | number; TEXTOUT: any; }} args */
    setPerWordTranslation(args) {
      if (!Object.prototype.hasOwnProperty.call(localeObject, args.LANG)) {
        // VS Code got mad when I tried to do it the normal way.
        localeObject[args.LANG] = Object.create(null);
      }
      localeObject[args.LANG][args.TEXTIN] = args.TEXTOUT;
      this._updateExtensionStorage();
    }

    /** @param {{ LANG: string; }} args */
    getPerLangLocaleJSON(args) {
      return JSON.stringify(localeObject[args.LANG]) || "{}";
    }

    /**
     * @returns {any}
     * @param {{ TEXT: string; LANG: string; VARS?: any, throwErrorOnFail?: boolean }} args
     */
    translate(args) {
      const isSpecial = args.TEXT.startsWith(config.specialPrefix);
      const throwErrorOnFail = config.throwErrorOnFail || args.throwErrorOnFail;
      const translationLogInfo = {
        text: args.TEXT,
        lang: args.LANG,
        isSpecial: isSpecial,
        vars: args.VARS
          ? Object.getPrototypeOf(args.VARS) == Object.prototype
            ? JSON.parse(args.VARS)
            : args.VARS
          : null,
        timestamp: new Date().getTime(),
      };

      allAttemptedTranslations.push(translationLogInfo);

      try {
        let translation = localeObject[args.LANG][args.TEXT];
        if (!translation) {
          translation = throwErrorOnFail
            ? `The ${args.LANG} translation object does not contain an entry for ${args.TEXT}`
            : isSpecial && args.LANG != config.specialFallback
              ? this.translate({
                  ...args,
                  LANG: config.specialFallback,
                  throwErrorOnFail: true,
                })
              : args.TEXT;

          allFailedTranslations.push({
            ...translationLogInfo,
            error: `The ${args.LANG} translation object does not contain an entry for ${args.TEXT}`,
          });
        }

        return Cast.toString(translation || args.TEXT);
      } catch (error) {
        allFailedTranslations.push({
          ...translationLogInfo,
          // @ts-ignore
          error: error.message,
        });
        // @ts-ignore
        return throwErrorOnFail
          ? // @ts-ignore
            error.message
          : isSpecial && args.LANG != config.specialFallback
            ? this.translate({
                ...args,
                LANG: config.specialFallback,
                throwErrorOnFail: true,
              })
            : args.TEXT;
      }
    }

    /** @param {{ VARS?: any; TEXT: string; LANG: string; }} args */
    placeholderTranslate(args) {
      const res = this.translate(args);
      if (res) {
        let isInPlaceholder = false;
        let skipNextChar = false;
        let reconstructed = "";
        let currentExpression = "";
        for (let i = 0; i < res.length; i++) {
          if (!skipNextChar) {
            if (res[i] == "\\") {
              skipNextChar = true;
            } else if (res[i] == "[") {
              isInPlaceholder = true;
            } else if (res[i] == "]") {
              isInPlaceholder = false;
              reconstructed += this._evaluateExpression(
                currentExpression,
                args.VARS
              );
              currentExpression = "";
            } else {
              if (isInPlaceholder) currentExpression += res[i];
              else reconstructed += res[i];
            }
          }
        }
        return reconstructed;
      } else return "";
    }

    getLanguageCode() {
      // @ts-ignore
      return Scratch.vm?.getLocale() || navigator.languages[0];
    }

    /**
     * @param {boolean} raw Whether or not to return the raw JSON (for internal use) instead of the stringified version
     * @returns {string | string[]}
     */
    getLanguageArray(raw = false) {
      // @ts-ignore
      if (navigator.languages?.includes(Scratch.vm?.getLocale()))
        // @ts-ignore
        return raw ? navigator.languages : JSON.stringify(navigator.languages);

      // @ts-ignore
      let languages = [Scratch.vm?.getLocale(), ...navigator.languages];
      return raw ? languages : JSON.stringify(languages);
    }

    /** @param {{ LANG: any; }} args */
    isLanguagePreferred(args) {
      return this.getLanguageArray(true).includes(args.LANG);
    }

    /**
     * @param {boolean} raw Whether or not to return the raw JSON (for internal use) instead of the stringified version
     * @returns {string | string[]}
     */
    supportedLanguages(raw = false) {
      let languages = Object.keys(localeObject);

      return raw ? languages : JSON.stringify(languages);
    }

    /**
     * @param {boolean} raw Whether or not to return the raw JSON (for internal use) instead of the stringified version
     * @returns {string | string[]}
     */
    supportedPreferredLanguages(raw = false) {
      let matches = this._matchLanguages(
        this.getLanguageArray(true),
        // @ts-ignore
        this.supportedLanguages(true)
      );

      // @ts-ignore
      return raw ? matches : JSON.stringify(matches);
    }

    /** @param {{ CODE: any; }} args */
    nameFromCode(args) {
      let codeIndex = this._getLanguageCodes()?.indexOf(args.CODE);
      // @ts-ignore
      if (codeIndex < 0) return "";

      // @ts-ignore
      return this._getLanguageNames()?.at(codeIndex);
    }

    /** @param {{ NAME: string | number; CODE: any; }} args */
    nameFromCodeSpecified(args) {
      try {
        // @ts-ignore
        let codeIndex = this._filterArray(
          languageNameAndCodeLookupTableGLOBALIZED.menuMap[args.NAME],
          "code"
        ).indexOf(args.CODE); // Language codes are in alphabetical order for the target language, not based on the code or native name.
        if (codeIndex < 0) return "";
        // @ts-ignore
        return this._getLanguageNames(args.NAME).at(codeIndex);
      } catch {
        return ""; // The lookup table isn't perfect so there might not always be a translation of a language name
      }
    }

    /** @param {{ NAME: string | number; }} args */
    codeFromName(args) {
      // @ts-ignore
      if (this._getLanguageCodes().includes(args.NAME)) {
        // The menu allows any reporter to be inserted, including those that don't match a menu option.
        // Remember, args.NAME will return the *value* of the menu, which, if using the menu's default options, is the language code.
        return args.NAME;
      } else {
        args.NAME = Cast.toString(args.NAME).trim().toLowerCase();
        if (
          Object.prototype.hasOwnProperty.call(
            languageNameAndCodeLookupTableGLOBALIZED.nameMap,
            args.NAME
          )
        ) {
          // This is to ensure the actual name value can be used via inputs. This implementation is inspired by the Translate extension's.
          return languageNameAndCodeLookupTableGLOBALIZED.nameMap[args.NAME];
          // @ts-ignore
        }

        // @ts-ignore
        if (!this._getLanguageNames().includes(args.NAME)) return "";

        // Fallback
        // @ts-ignore
        let nameIndex = this._getLanguageNames().indexOf(args.NAME);
        if (nameIndex != -1)
          // @ts-ignore
          return this._getLanguageCodes().at(nameIndex);
        return "";
      }
    }

    clearAttemptedTranslationInfo() {
      allAttemptedTranslations = [];
      allFailedTranslations = [];
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

    getConfig() {
      return JSON.stringify(config);
    }

    /** @param {{ KEY: string; VALUE: string | boolean; }} args */
    setConfigBool(args) {
      Reflect.set(config, args.KEY, Cast.toBoolean(args.VALUE));
      this._updateExtensionStorage();
    }

    /** @param {{ KEY: string; }} args */
    getConfigBool(args) {
      return Cast.toBoolean(config?.[args.KEY]);
    }

    /** @param {{ KEY: string; VALUE: string | number; }} args */
    setConfigStr(args) {
      Reflect.set(config, args.KEY, Cast.toString(args.VALUE));
      this._updateExtensionStorage();
    }

    /** @param {{ KEY: string; }} args */
    getConfigStr(args) {
      return Cast.toString(config?.[args.KEY]);
    }

    // Internal functions
    _updateExtensionStorage() {
      try {
        // @ts-ignore since extension storage IS a thing
        Scratch.vm.runtime.extensionStorage["fakemonLocale"] = {
          // @ts-ignore
          ...Scratch.vm.runtime.extensionStorage["fakemonLocale"],
          localeObject: localeObject,
          config: config,
        };
      } catch (error) {
        console.warn("Locale:", error);
      }
    }

    /**
     * @param {any[]} array
     * @param {string} matchKey
     * @returs {any[]}
     */
    _filterArray(array, matchKey) {
      if (!array || !Array.isArray(array)) return [];

      return array?.map((/** @type {{ [x: string]: any; }} */ value) => {
        try {
          if (!value) return;
          if (!Object.prototype.hasOwnProperty.call(value, matchKey)) return;

          let property = Reflect.get(value, matchKey, value);
          if (!property) return;

          return property;
        } catch (error) {
          console.warn("Locale:", error);
          return null;
        }
      });
    }

    /**
     * @param {string | any[]} languageArray
     * @param {any[]} supportedLanguages
     * @returns {string[]?}
     */
    _matchLanguages(languageArray, supportedLanguages) {
      /** @type {any[]} */
      return supportedLanguages?.reduce(
        (/** @type {any[]} */ accumulator, /** @type {any} */ value) => {
          if (languageArray.includes(value) && !accumulator.includes(value))
            return accumulator.concat(value);

          return accumulator;
        },
        []
      );
    }

    /**
     * @param {string} lang
     * @returns {string[]?}
     */
    _getLanguageNames(lang = this.getLanguageCode()) {
      try {
        return this._filterArray(
          languageNameAndCodeLookupTableGLOBALIZED.menuMap[lang],
          "name"
        );
      } catch {
        return null;
      }
    }

    _getLanguageCodes() {
      try {
        return this._filterArray(languageNameAndCodeLookupTable, "code");
      } catch {
        return null;
      }
    }

    _makeLanguageNameMenu() {
      // Since the language names are being translated, we need a consistent way to refer to them.
      try {
        const names = this._getLanguageNames() || [];
        const codes = this._getLanguageCodes() || [];

        return names?.reduce(
          (
            /** @type {any[]} */ accumulator,
            /** @type {any} */ nameValue,
            /** @type {Number} */ index
          ) => {
            if (nameValue && codes[index])
              return accumulator.concat({
                text: nameValue,
                value: codes[index],
              });

            return accumulator;
          },
          []
        );
      } catch {
        return [];
      }
    }

    /**
     * Internal function used to evaluate the placeholders of a translation.
     * This is different from `_evaluateExpression` which evaluates the expressions themselves.
     *
     * @param {string} translation The translation
     * @param {any} vars Variables to use during evaluation of placeholders
     */
    _evaluatePlaceholders(translation, vars) {
      let expressionToEvaluate = "";
      let resultingString = "";

      /** @type {"text" | "text-escaped" | "expression" | "expr-quote" | "expr-quotation" | "expr-escaped"} */
      let exprMode = "text";

      for (let charIndex = 0; charIndex < translation.length; charIndex++) {
        let char = translation.charAt(charIndex);

        switch (exprMode) {
          case "text":
            if (char === "\\") {
              exprMode = "text-escaped";
              break;
            }

            if (char === "[") {
              expressionToEvaluate = "";
              exprMode = "expression";
              break;
            }

            resultingString += char;
            break;
          case "text-escaped":
            resultingString += char;
            break;
          case "expression":
            if (char === "]") {
              exprMode = "text";
              resultingString += this._evaluateExpression(
                expressionToEvaluate,
                vars
              );

              expressionToEvaluate = "";
              break;
            }

            if (char === `'`) exprMode = "expr-quote";
            else if (char === `"`) exprMode = "expr-quotation";

            expressionToEvaluate += char;
            break;
          case "expr-quote":
            if (char === "\\") {
              exprMode = "expr-escaped";
              break;
            }

            if (char === `'`) exprMode = "expression";

            expressionToEvaluate += char;
            break;
          case "expr-quotation":
            if (char === "\\") {
              exprMode = "expr-escaped";
              break;
            }

            if (char === `"`) exprMode = "expression";

            expressionToEvaluate += char;
            break;
          case "expr-escaped":
            expressionToEvaluate += `\\${char}`;
            break;
        }
      }

      if (expressionToEvaluate.length > 0)
        resultingString += this._evaluateExpression(expressionToEvaluate, vars);

      return resultingString;
    }

    /**
     * Internal function used to evaluate an expression with the given variables.
     *
     * @param {string} expression The expression
     * @param {any} vars Variables to use during evaluation of expression
     */
    // @ts-ignore
    _evaluateExpression(expression, vars) {
      // TODO: EXPRESSION EVALUATOR
      /* LOCALE EXPRESSIONS SPEC - v0.1-pre
      ---[OPERATORS]---
        a == b — Equality: checks if two operands are equal
        a === b — Strict equality: checks if two operands are exactly equal
        a < b — Less than: checks if the left operand is less than the right operand
        a <= b — Less than or equal to: checks if the left operand is less than or equal to the right operand
        a > b — Greater than: checks if the left operand is greater than the right operand
        a >= b — Greater than or equal to: checks if the left operand is greater than or equal to the right operand
        a ? b : c — Ternary: if the first operand is truthy, the second operand is returned; otherwise, the third operand is returned
        a || b — Or: if the first operand is truthy, return it; otherwise, return the other operand
        a && b — And: if both operands are truthy, return true
        a ?? b — Nullish: if the left operand is nullish (null/undefined), returns the right operand; otherwise, returns the left operand
        !a — Not: if the operand is truthy, return false; if the operand is falsy, return true
        a + b — Addition: adds both operands together; if one operand is a string, both operands will be coalesced to a string and joined together
        a - b — Subtraction: subtracts the right operand from the left operand; only works if both operands are numbers
        a * b — Multiplication: multiplies both operands together; only works if at least one operand is a number
          if one operand is a string and the other operand is a number, repeat the string operand by the numerical operand's amount of times
        a / b — Division: divides the left operand by the right operand; only works if both operands are numbers
        a % b — Modulus: takes the remainder (modulus) of the left operand and the right operand; only works if both operands are numbers
        name(a, b, c) — Function Call: Runs a function (can be per translation, language, or global)
        ---[META STUFF]---
        name(a, b, c) => {expression} — Function Definition: Stores the expression defined as a callable function (can be stored in the translation, language, or global)
          Examples: 
            pluralize(value, singular, dual, plural, pluralMany) — Uses a value to return the pluralized form of a word based on rules defined by the language
            isSingular(value) — Returns true if the value meets the language's singular rule (should just be value = 1)
            isDual(value) — Returns true if the value meets the language's dual rule (should be value = 2 if necessary)
            isPlural(value) — Returns true if the value meets the language's plural rule (in the case of English, value != 1)
            isPluralMany(value) — Returns true if the value meets the language's plural many rule
        a = b — Variable Assignment: Assigns a value to a global or per-lang variable
        ---[DEMOS]---
        a == 1 ? thing : a > 4 ? "thingów" : "things"
      */

      return "(Expressions are not implemented in this version of Locale.)";
    }
  }

  // @ts-ignore
  Scratch.extensions.register(new Locale());
})(Scratch);
