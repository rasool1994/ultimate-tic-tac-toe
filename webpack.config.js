const path = require('path');

module.exports = {
    //import js file by path
    entry: "./resource/assets/javascripts/index.js",
    //output js file by path
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public/javascripts')
    },
    module: {
        rules: [
            {
                //load js included style in html head (style) tag
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                //mix file name with hash string
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};