const path = require("path");
const webpack = require("webpack");
const glob = require("glob");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const whitelister = require('purgecss-whitelister')

const config = {
    devtool: "source-map",
    entry: {
        app: "./src/resources/js/app.js",
        home: "./src/resources/js/home.js",
        styles: "./src/resources/scss/main.scss",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        minimize: process.env.NODE_ENV === "production",
        minimizer: [
            new ESBuildMinifyPlugin({
                css: true,
            }),
        ],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/resources/js/"),
            "@@": path.resolve(__dirname, "src/resources"),
            "~": path.resolve(__dirname, "src"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: [
                    {
                        loader: "babel-loader",
                        options: { presets: ["@babel/preset-env"] },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            publicPath: "images",
                            outputPath: "images",
                            name: "[name].[ext]",
                            esModule: false,
                            useRelativePaths: true
                        },
                    },
                    // {
                    //     loader: 'url-loader'    
                    // }
                ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(woff|ttf|eot|otf|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            publicPath: "fonts",
                            outputPath: "fonts",
                            name: "[name].[ext]",
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: "ejs-compiled-loader",
                        options: {
                            htmlmin: true,
                            htmlminOptions: {
                                removeComments: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: 'handlebars-loader',
                        // query: { inlineRequires: '\/images\/' }
                    }
                ]
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "resources", "img"),
                    to: path.resolve(__dirname, "dist", "images"),
                }
            ]
        }),
        new HtmlWebpackPlugin({
            title: "Home Page",
            template: path.join(__dirname, "src", "pages", "index.hbs"),
            filename: "index.html",
            chunks: ["styles", "app", "home"],
            templateParameters: require("./data.json")
        }),        
        new CleanWebpackPlugin(),
    ],
};

module.exports = (env, { mode }) => {
    let isDevelopment = mode === "development";

    if (isDevelopment) { // is Development Mode
        config.output.filename = "[name].bundle.js";
        config.devServer = {
            contentBase: path.resolve(__dirname, "dist"),
            index: "index.html",
            port: 8888,
        };
    } else { // is Production Mode
        config.output.filename = "[name].bundle.[contenthash].js";
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),
            new PurgecssPlugin({
                paths: glob.sync(`${path.join(__dirname, "src")}/**/*.hbs`, {
                    nodir: true,
                    whitelist: whitelister('./src/resources/scss/main.scss') //, './src/resources/scss/3slick-theme.css'
                })                
            })
        );
    }

    config.module.rules.push(
        ...[
            {
                test: /\.css$/,
                use: [
                    isDevelopment
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    isDevelopment
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "resolve-url-loader", // add this before sass-loader
                    "sass-loader",
                ],
            },
        ]
    );

    return config;
};