import transifexApi from "@transifex/api";

const TOKEN = process.env.TRANSIFEX_TOKEN;
if (!TOKEN) {
  console.error("Missing TRANSIFEX_TOKEN.");
  process.exit(1);
}

const ORGANIZATION_NAME = process.env.TRANSIFEX_ORGANIZATION;
if (!ORGANIZATION_NAME) {
  console.error("Missing TRANSIFEX_ORGANIZATION.");
  process.exit(1);
}

const PROJECT_NAME = process.env.TRANSIFEX_PROJECT;
if (!PROJECT_NAME) {
  console.error("Missing TRANSIFEX_PROJECT.");
  process.exit(1);
}

const RUNTIME_RESOURCE = process.env.TRANSIFEX_RUNTIME_RESOURCE;
if (!RUNTIME_RESOURCE) {
  console.error("Missing TRANSIFEX_RUNTIME_RESOURCE.");
  process.exit(1);
}

const METADATA_RESOURCE = process.env.TRANSIFEX_METADATA_RESOURCE;
if (!METADATA_RESOURCE) {
  console.error("Missing TRANSIFEX_METADATA_RESOURCE.");
  process.exit(1);
}

const SOURCE_LOCALE = "en";

transifexApi.setup({
  auth: TOKEN,
});

export {
  transifexApi,
  ORGANIZATION_NAME,
  PROJECT_NAME,
  RUNTIME_RESOURCE,
  METADATA_RESOURCE,
  SOURCE_LOCALE,
};
