import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import nodejs from "@astrojs/node";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
        applyAstroPreset: false,
      },
    }),
    svelte(),
  ],
  adapter: nodejs(),
});
