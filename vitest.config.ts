import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    root: "src",
    clearMocks: true,
    projects: [
      {
        test: {
          name: "unit",
          environment: "node",
          exclude: ["**/*.browser.{test,spec}.ts"],
        },
      },
      {
        test: {
          name: "browser",
          include: ["**/*.browser.{test,spec}.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
            screenshotFailures: false,
          },
        },
      },
    ],
  },
});
