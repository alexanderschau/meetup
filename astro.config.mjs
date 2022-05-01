import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import nodejs from "@astrojs/node";
import netlify from "@astrojs/netlify/functions";

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
  adapter: netlify(),
});
