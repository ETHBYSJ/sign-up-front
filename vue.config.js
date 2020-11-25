module.exports = {
  devServer: {
      port: 1125,     // 端口
  },

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  },

　css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: ['production', 'test'].includes(process.env.NODE_ENV),
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false,
  }
};