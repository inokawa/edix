import { defineConfig, devices } from "@playwright/test";

const FRAMEWORK_DIR = process.env.FRAMEWORK_DIR;

const FRAMEWORK_SPEC = "framework.spec.ts";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "list",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    // video: "retain-on-failure"
  },

  /* Configure projects for major browsers */
  projects: FRAMEWORK_DIR
    ? [
        {
          name: "framework",
          use: { ...devices["Desktop Chrome"] },
          testMatch: FRAMEWORK_SPEC,
        },
      ]
    : [
        {
          name: "chromium",
          use: { ...devices["Desktop Chrome"] },
          testIgnore: FRAMEWORK_SPEC,
        },
        {
          name: "firefox",
          use: { ...devices["Desktop Firefox"] },
          testIgnore: FRAMEWORK_SPEC,
        },
        {
          name: "webkit",
          use: { ...devices["Desktop Safari"] },
          testIgnore: FRAMEWORK_SPEC,
        },
      ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: FRAMEWORK_DIR
        ? `(cd ${FRAMEWORK_DIR} && npm run build && npx http-server dist)`
        : "npm run storybook",
      url: FRAMEWORK_DIR ? "http://127.0.0.1:8080" : "http://127.0.0.1:6006",
      reuseExistingServer: !process.env.CI,
    },
  ],
});
