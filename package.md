个人用 `package` 和 `webpack.config`，做一下整理记录

----

## vue

#### package.json 配置（基于 vue）

```js
{
    // ...

    "scripts": {
        "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot --port 3000",
        "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
    },
    "dependencies": {
        "vue": "^2.2.1",
        "vue-router": "^2.5.3"
    },
    "devDependencies": {
        "babel-core": "^6.0.0",
        "babel-loader": "^6.0.0",
        "babel-preset-latest": "^6.0.0",
        "cross-env": "^3.0.0",
        "css-loader": "^0.25.0",
        "file-loader": "^0.9.0",
        "node-sass": "^4.5.3",
        "sass-loader": "^5.0.1",
        "style-loader": "^0.17.0",
        "vue-loader": "^11.1.4",
        "vue-style-loader": "^3.0.1",
        "vue-template-compiler": "^2.2.1",
        "webpack": "^2.2.0",
        "webpack-dev-server": "^2.2.0"
    }

    // ...
}
```



#### webpack.config.js 配置（基于 vue）

```js
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
```


## react

#### package.json 配置（react 基本配置）

```js

{
    // ...

    "devDependencies": {
        "babel-core": "^6.24.1",
        "babel-loader": "^6.4.1",
        "babel-preset-es2015": "^6.24.1",
        "babel-preset-react": "^6.24.1",
        "react": "^15.5.4",
        "react-dom": "^15.5.4",
        "webpack": "^2.4.1"
    }

    // ...
}

```


#### webpack.config.js 配置（react 基本配置）

```js
const path = require('path');

module.exports = {
    entry: "./main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            }
        ]
    },
    watch: true
}
```