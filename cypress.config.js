import { devServer } from "@cypress/vite-dev-server";
import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer(devServerConfig) {
      return devServer({
        ...devServerConfig,
        framework: "react",
        viteConfig: require("./vite.config.js"),
      });
    },
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    env: {
      test_user: "cypress-test-user",
      test_password: "cypress-test-user",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
