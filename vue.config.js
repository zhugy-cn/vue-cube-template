const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme',
          './src/assets/stylus/variables',
          './src/assets/stylus/mixin',
        ],
      },
    },
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true,
    },
  },
  // 配置别名
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_com', resolve('src/components'))
      .set('_api', resolve('src/api'))
      .set('_views', resolve('src/views'))
      .set('_assets', resolve('src/assets'));
  },

  devServer: {
    port: 1995,
    disableHostCheck: true, // 内网穿透
  },
};
