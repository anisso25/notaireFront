const path = require('path');
const fixBabelImports = require("customize-cra").fixBabelImports;

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: '@storybook/preset-create-react-app',
      options: {
        craOverrides: {
          fileLoaderExcludes: ['less'],
        },
      },
    },
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', { 
        loader: 'less-loader', 
        options:{ 
          lessOptions: {
            javascriptEnabled : true 
          }
        }
      }],
      include: path.resolve(__dirname, '../'),
    });
    fixBabelImports('antd', {
      libraryDirectory: 'es',
      style: true,
    })(config)

    // Needed for hot-load development.
    config.watch = true;
    return config;
  }
}