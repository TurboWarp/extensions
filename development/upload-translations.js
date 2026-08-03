import {
  transifexApi,
  ORGANIZATION_NAME,
  PROJECT_NAME,
  RUNTIME_RESOURCE,
  METADATA_RESOURCE,
} from "./transifex-common.js";
import Builder from "./builder.js";

const uploadRuntimeStrings = async (strings) => {
  if (
    strings["lab/text@_Animated Text"].string !== "Animated Text" ||
    strings["lab/text@_Animated Text"].developer_comment !==
      "Part of the 'Animated Text' extension." ||
    Object.keys(strings).length < 1500
  ) {
    throw new Error("Sanity check failed.");
  }

  await transifexApi.ResourceStringsAsyncUpload.upload({
    resource: {
      data: {
        id: `o:${ORGANIZATION_NAME}:p:${PROJECT_NAME}:r:${RUNTIME_RESOURCE}`,
        type: "resources",
      },
    },
    content: JSON.stringify(strings),
  });
};

const uploadMetadataStrings = async (strings) => {
  if (
    strings["lab/text@name"].string !== "Animated Text" ||
    strings["lab/text@name"].developer_comment !==
      "Name of the 'Animated Text' extension in the extension gallery." ||
    Object.keys(strings).length < 150
  ) {
    throw new Error("Sanity check failed.");
  }

  await transifexApi.ResourceStringsAsyncUpload.upload({
    resource: {
      data: {
        id: `o:${ORGANIZATION_NAME}:p:${PROJECT_NAME}:r:${METADATA_RESOURCE}`,
        type: "resources",
      },
    },
    content: JSON.stringify(strings),
  });
};

const run = async () => {
  console.log("Building...");
  const builder = new Builder();
  const build = await builder.build();

  console.log("Generating strings...");
  const l10n = build.generateL10N();

  console.log("Uploading runtime strings...");
  await uploadRuntimeStrings(l10n["extension-runtime"]);

  console.log("Uploading metadata strings...");
  await uploadMetadataStrings(l10n["extension-metadata"]);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
