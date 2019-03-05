const path = require('path');
//const publicPath = process.env.PUBLIC_PATH;

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' }
  });

  config.output.globalObject = 'this';

  return config;
};
