const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    process.env.NODE_ENV = argv.mode;

    const development = argv.mode === 'development';

    return {
        entry: './index.js',
        output: {
            path: __dirname + '/dist',
            filename: '[name].js',
            assetModuleFilename: '[name][ext]',
            clean: true
        },
        resolve: {
            extensions: ['.js'],
            modules: [
                './src/js',
                './src/css',
                './src/img',
                'node_modules'
            ]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.(png|woff|woff2)$/,
                    type: 'asset/resource'
                }
            ]
        },
        devtool: development ? 'eval-source-map' : false,
        devServer: {
            static: './dist',
            watchFiles: ['./src'],
            port: 3000,
            compress: true,
            hot: true
        },
        optimization: {
            minimize: development ? false : true
        },
        stats: {
            assets: false,
            builtAt: false,
            hash: false,
            modules: false,
            entrypoints: false,
            version: false
        },
        performance: {
            hints: false
        },
        plugins: [
            new CleanWebpackPlugin({
                verbose: false
            }),
            new HtmlPlugin({
                template: './src/html/index.html',
                minify: false
            }),
            new CopyPlugin({
                patterns: [
                    { from: './src/js/serviceWorker.js' },
                    { from: './src/html/manifest.json' },
                    { from: './src/img/bussit-192.png' },
                    { from: './src/img/bussit-512.png' }
                ]
            }),
        ]
    };
};
