// node环境中的全局变量
let path = require('path');
// 引用webpack内置插件
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 想让css热生效，不能将其抽取出单独打包，要把它放在js里面
// const ExtractTextPlugin = require('extract-text-webpack-plugin');


// 常用path
//当前工作目录
const ROOT_PATH = path.resolve(__dirname);
//项目资源文件夹
const APP_PATH = path.resolve(ROOT_PATH, 'src');
// 项目构建资源文件夹
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: [path.resolve(APP_PATH, 'index.js')],
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js',
        // 在内存中的位置
        publicPath: '/'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.s?css$/,
                // 开发期间抽取样式单独打包，会让css的热更新失效
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'sass-loader', 'postcss-loader']
                // }),
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},
                    {
                        loader: "postcss-loader", options: {
                            plugins: () => [require('autoprefixer')({browsers: 'last 5 version'})]
                        }
                    }
                ],
                include: APP_PATH
            },
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules|packages/,
            }
        ]
    },
    plugins: [
        // 自动生成html文件,并且将打包后的css、js插入其中
        new HtmlWebpackPlugin({
            // html对应的标签名
            title: 'myApp',
            // html对应的文件名
            filename: 'index.html'
        }),
        // 开发期间，禁用css打包
        // new ExtractTextPlugin({
        //     filename: 'build.min.css',
        //     allChunks: true
        // }),
        new webpack.NamedModulesPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};