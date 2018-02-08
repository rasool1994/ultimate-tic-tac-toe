const path = require('path');
const webpack = require('webpack');

//ExtractTextPlugin for extract extract the style sheets into a dedicated file
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//webpack plugin for clean public (build) folder before build
const CleanWebpackPlugin = require('clean-webpack-plugin');

//Uglify Js Plugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//webpack copy plugin
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('[name]').replace('css/js', 'css');
    },
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        '/js/app.js': "./resources/assets/js/app.js",
        // '/css/style.css': "./resources/assets/style/sass/style.scss",
        '/css/custom.css': "./resources/assets/style/sass/custom.scss",
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        // new UglifyJsPlugin(),
        //clean build (public) folder before build
        // new CleanWebpackPlugin(['public'])
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@fortawesome/fontawesome-free-solid$': '@fortawesome/fontawesome-free-solid/shakable.es.js'

        }
    },
    module: {
        rules: [
            //sass loader
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                minimize: true
                            }
                        }, {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", // creates style nodes from JS strings
                    use: [
                        {
                            loader: "css-loader", // translates CSS into CommonJS
                            options: {
                                sourceMap: true,
                                minimize: true
                            }
                        }
                    ]
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
            //vue-loader
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            // image loader
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
            // font loader
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/fonts/'
                        }
                    }
                ]
            },
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