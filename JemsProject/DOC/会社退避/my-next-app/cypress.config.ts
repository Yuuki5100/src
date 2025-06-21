import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      console.debug("Cypress config loaded:", on);
      console.debug("Cypress config loaded:", config);
    },
  },
});
