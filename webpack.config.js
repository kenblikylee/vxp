module.exports = {
  mode: "production",
  devtool: "source-map",
  output: {
    libraryTarget: "umd",
    library: "vxp",
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}
