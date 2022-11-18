module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/emudeck-compatibility-list/" : "/",
  
  // Configure webpack is required for developing on WSL
  configureWebpack: {
    devServer: {
      watchOptions: {
        poll: true
      }
    }
  }
};
