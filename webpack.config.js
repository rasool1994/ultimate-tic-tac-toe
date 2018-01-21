const path = require('path');

//ExtractTextPlugin for extract extract the style sheets into a dedicated file
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('[name]').replace('css/js', 'css');
    },
    disable: process.env.NODE_ENV === "development"
});

//webpack plugin for clean public (build) folder before build
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    //import js file by path
    entry: {
        '/js/index.js': "./resources/assets/js/index.js",
        '/js/print.js': "./resources/assets/js/print.js",
        '/css/style.css': "./resources/assets/style/sass/style.scss",
        '/css/app.css': "./resources/assets/style/css/style.css"
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, './public'),

        //public path config for webpack dev middleware
        // publicPath: '/'
    },
    devtool: 'inline-source-map',
    plugins: [
        extractSass,

        //clean build (public) folder before build
        new CleanWebpackPlugin(['public'])
    ],
    //output js file by path
    module: {
        //loaders is deprecated
        // loaders: [
        //
        // ],
        rules: [
            //sass loader
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            //babel-loader
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            //load included style in html head (style) tag
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", // creates style nodes from JS strings
                    use: "css-loader" // translates CSS into CommonJS
                })
            },
            // image loader
            //replace image name with hash string
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/images/'
                        }
                    }
                ]
            },
            //font loader
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/,
            //     use: [
            //         'file-loader'
            //     ]
            // },
            //data loader
            // {
            //     test: /\.(csv|tsv)$/,
            //     use: [
            //         'csv-loader'
            //     ]
            // },
            // {
            //     test: /\.xml$/,
            //     use: [
            //         'xml-loader'
            //     ]
            // }
        ]
    }
};