import { defineConfig } from "sanity";

import { schemaTypes } from "./schemaTypes";

/**
 * Sanity Studio config for Prolific Collections.
 * Use with `npx sanity dev` from a Sanity Studio setup that points at this file,
 * or copy these schema types into an existing Sanity project.
 */
export default defineConfig({
  name: "prolific-collections",
  title: "Prolific Collections",
  projectId: process.env.SANITY_PROJECT_ID ?? "c5whp0wg",
  dataset: process.env.SANITY_DATASET ?? "production",
  plugins: [],
  schema: {
    types: schemaTypes,
  },
});
