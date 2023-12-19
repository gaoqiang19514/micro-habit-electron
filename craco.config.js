const CracoLessPlugin = require('craco-less');

module.exports = {
  style: {
    modules: {
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
