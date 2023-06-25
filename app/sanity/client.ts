import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  useCdn: false, // set to `false` for fresh data
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
};

export const client = createClient(config);
