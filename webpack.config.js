var webpack = require("webpack");

module.exports = {
  entry: './app/app.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
        Board: 'app/components/Board.jsx',
        Tile: 'app/components/Tile.jsx',
        Grid: 'app/components/Grid.jsx',
        Header: 'app/components/Header.jsx',
        TicketData: 'app/TicketData.jsx',
        
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css/, 
        loaders: ['style', 'css']
      }
    ]
  },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
