module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/globals/_mixins.scss";
          @import "@/styles/globals/_variables.scss";
          @import "@/styles/globals/_z-index.scss";
        `
      },
      less: {
        modifyVars: {
          'primary-color': '#4C56C0',
          'link-color': '#4C56C0'
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 8080
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  }
};
