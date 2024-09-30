const createExpoWebpackConfigAsync = require("@expo/webpack-config");
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config here, e.g. config.plugins.push(new MyAwesomeWebpackPlugin());
  return config;
};
