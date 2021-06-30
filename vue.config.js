module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/'
      : '/',
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  /*devServer: {
    proxy: {
      '^/api': {
        target: 'http://brigadas.test/',
        pathRewrite: {'^/api': '/api'},
        changeOrigin: true,
        secure:false,
        logLevel: "debug"
      },
    }
  },*/
  transpileDependencies: [
    'vuetify'
  ]
}
