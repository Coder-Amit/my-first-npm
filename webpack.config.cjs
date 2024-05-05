const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';
console.log(`${devMode ? 'development' : 'production'} mode bundle`);

module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: {
        main: './src/index.js',
        NewCompo: "./src/NewCompo/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    devtool: devMode ? 'inline-source-map' : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: !devMode,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 2020,
                    mangle: { toplevel: true },
                    compress: {
                        module: true,
                        toplevel: true,
                        unsafe_arrows: true,
                        drop_console: !devMode,
                        drop_debugger: !devMode,
                    },
                    output: { quote_style: 1 },
                },
            }),
        ],
    },
};
