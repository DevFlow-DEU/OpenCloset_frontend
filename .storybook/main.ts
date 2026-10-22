import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-mcp'],
  framework: '@storybook/react-vite',
  viteFinal: async (viteConfig) => {
    // Storybook runs without the Cloudflare Workers dev integration
    viteConfig.plugins = (viteConfig.plugins ?? []).filter((plugin) => {
      if (!plugin) return false;
      if (Array.isArray(plugin)) {
        return !plugin.some((p) => p?.name === 'cloudflare');
      }
      return plugin.name !== 'cloudflare';
    });
    return viteConfig;
  },
};

export default config;
