const { getWebpackEntryPoints, hasBabelConfig } = require('@wordpress/scripts/utils/config');
const { hasArgInCLI } = require('@wordpress/scripts/utils/cli');
const { hasPostCSSConfig } = require('@wordpress/scripts/utils');
const { hasCssnanoConfig } = require('@wordpress/scripts/utils');
const postcssPlugins = require('@wordpress/postcss-plugins-preset');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const path = require('path');

const themeURL = '/wp-content/themes/ns-bb-theme/build/';


// can't figure out how to import this one from the scripts, so recreating it
const cssLoaders = [
  {
    loader: MiniCSSExtractPlugin.loader,
    options: {
      publicPath: themeURL,
    }
  },
  {
    loader: require.resolve('css-loader'),
    options: {
      sourceMap: !isProduction,
      modules: {
        auto: true,
      },
    },
  },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      // Provide a fallback configuration if there's not
      // one explicitly available in the project.
      ...(!hasPostCSSConfig() && {
        postcssOptions: {
          ident: 'postcss',
          sourceMap: !isProduction,
          plugins: isProduction
            ? [
              ...postcssPlugins,
              require('cssnano')({
                // Provide a fallback configuration if there's not
                // one explicitly available in the project.
                ...(!hasCssnanoConfig() && {
                  preset: [
                    'default',
                    {
                      discardComments: {
                        removeAll: true,
                      },
                    },
                  ],
                }),
              }),
            ]
            : postcssPlugins,
        },
      }),
    },
  },
];

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

const glob = require('glob');
const hasReactFastRefresh = hasArgInCLI('--hot') && !isProduction;

const base = glob.sync('./src/scripts/**.js', './src/scripts/blocks/**.js').reduce(function (obj, el) {
  obj[path.parse(el).dir.replace(/^(\.\/src)/, "") + '/' + path.parse(el).name] = el;
  return obj
}, {});

const acfblocks = glob.sync('./src/scripts/blocks/**.js').reduce(function (obj, el) {
  obj[path.parse(el).dir.replace(/^(\.\/src)/, "") + '/' + path.parse(el).name] = el;
  return obj
}, {});

const sass = glob.sync('./src/styles/**/*.scss').reduce(function (obj, el) {
  if (!path.parse(el).name.startsWith('_')) {
    obj[path.parse(el).dir.replace(/^(\.\/src)/, "") + '/' + path.parse(el).name] = el;
    return obj
  }
  else return obj;
}, {});

overideRules = [
  {
    test: /\.(j|t)sx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          // Babel uses a directory within local node_modules
          // by default. Use the environment variable option
          // to enable more persistent caching.
          cacheDirectory:
            process.env.BABEL_CACHE_DIRECTORY || true,

          // Provide a fallback configuration if there's not
          // one explicitly available in the project.
          ...(!hasBabelConfig() && {
            babelrc: false,
            configFile: false,
            presets: [
              require.resolve(
                '@wordpress/babel-preset-default'
              ),
            ],
            plugins: [
              hasReactFastRefresh &&
              require.resolve(
                'react-refresh/babel'
              ),
            ].filter(Boolean),
          }),
        },
      },
    ],
  },
  {
    test: /\.css$/,
    use: cssLoaders,
  },
  {
    test: /\.pcss$/,
    use: cssLoaders,
  },
  {
    test: /\.(sc|sa)ss$/,
    use: [
      ...cssLoaders,
      {
        loader: require.resolve('sass-loader'),
        options: {
          sourceMap: !isProduction,
        },
      },
    ],
  },
  {
    test: /\.svg$/,
    issuer: /\.(j|t)sx?$/,
    use: ['@svgr/webpack', 'url-loader'],
    type: 'javascript/auto',
  },
  {
    test: /\.(bmp|png|jpe?g|gif|webp)$/i,
    type: 'asset/resource',
    issuer: /\.(pc|sc|sa|c)ss$/,
    generator: {
      filename: 'images/[name].[hash:8][ext]',
    },
  },
  {
    test: /\.(svg)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'svgs/[name].[hash:8][ext]',
    },
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name].[hash:8][ext]',
    },
  },
];

module.exports = {
  ...defaultConfig,
  cache: false,
  entry: {
    ...getWebpackEntryPoints(),
    ...base,
    ...acfblocks,
    ...sass,
  },
  module: {
    rules: overideRules
  },
}
