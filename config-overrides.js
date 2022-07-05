const fs = require('fs');
const path = require('path');
const {
  override,
  addLessLoader,
  useBabelRc,
  addBabelPlugin,
  addWebpackModuleRule,
} = require('customize-cra');
const lessToJS = require('less-vars-to-js');
const eslintConfig = require('./.eslintrc.js');

const antdVariables = lessToJS(
  fs.readFileSync(
    path.resolve(
      __dirname,
      './src/theme/antd.lessvars',
    ),
    'utf8',
  ),
);

const useEslintConfig = configRules => c => {
  const config = c;
  const updatedRules = config.module.rules.map(rule => {
    // Only target rules that have defined a `useEslintrc` parameter in their options
    // eslint-disable-next-line no-void
    if (rule.use && rule.use.some(use => use.options && use.options.useEslintrc !== void 0)) {
      const ruleUse = rule.use[0];
      const baseOptions = ruleUse.options;
      const baseConfig = baseOptions.baseConfig || {};
      const newOptions = {
        useEslintrc: false,
        ignore: true,
        baseConfig: { ...baseConfig, ...configRules },
      };
      ruleUse.options = newOptions;
      return rule;
    }
    return rule;
  });
  config.module.rules = updatedRules;
  return config;
};

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        ...antdVariables,
      },
    },
  }),
  useBabelRc(),
  useEslintConfig(eslintConfig),
  addBabelPlugin(
    ['babel-plugin-styled-components', {
      displayName: true,
    }],
  ),
  addWebpackModuleRule({
    test: /\.lessvars$/,
    use: [
      {
        loader: 'less-vars-loader',
        options: {
          resolveVariables: true,
        },
      },
    ],
  }),
);
