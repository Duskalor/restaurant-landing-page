import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID ?? '',
    dataset: process.env.PUBLIC_SANITY_DATASET ?? 'production',
  },
  deployment: {
    appId: 'gt159rhskafe5cv0n8zgk3ek',
  },
});
