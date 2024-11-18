const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  // publicPath: '/vue-lingerine-store/'
  publicPath: process.env.NODE_ENV === "production" ? "/vue-lingerine-store/" : "/",
}