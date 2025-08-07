/** @type { import('@storybook/react-vite').StorybookConfig } */
export default {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: [
    // for kuromojin
    {
      from: "../node_modules/kuromoji/dict",
      to: "/dict",
    },
  ],
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      resolve: {
        alias: {
          // for kuromojin
          path: "path-browserify",
        },
      },
      define: {
        // For @textlint/kernel
        "process.env.TIMING": false,
      },
    });
  },
};
