'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Blog Admin' // page title
//启动端口
const port = process.env.port || process.env.npm_config_port || 8485 // dev port

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: 'dist',
  // 关闭ESLint，如果你需要使用ESLint，把lintOnSave设为true即可
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: process.env.NODE_ENV === "production" ? true : false,
    // 开启 CSS source maps? 生产环境下是false,开发环境下是true
    sourceMap: process.env.NODE_ENV === "production" ? false : true,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  devServer: {
    port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.when(process.env.NODE_ENV !== 'development',
      config => {
        config.optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // 只打包初始时依赖的第三方
            },
            elementUI: {
              name: 'chunk-elementUI', // 单独将 elementUI 拆包
              priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
              test: /[\\/]node_modules[\\/]element-ui[\\/]/
            },
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'), // 可自定义拓展你的规则
              minChunks: 2, // 最小公用次数
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })
        config.optimization.runtimeChunk('single')
      }
    )
  }
}
