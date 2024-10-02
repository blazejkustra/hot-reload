import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import type {Configuration} from 'webpack';
import {DefinePlugin, ProvidePlugin} from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import type Environment from './types';

/**
 * Get a production grade config for web or desktop
 */
const getCommonConfiguration = ({file = '.env', platform = 'web'}: Environment): Configuration => ({
    mode: 'production',
    devtool: 'source-map',
    entry: {
        main: ['babel-polyfill', './index.js'],
    },
    output: {
        filename: '[name]-[contenthash].bundle.js',
        path: path.resolve(__dirname, '../../dist'),
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'web/index.html',
            filename: 'index.html',
            isWeb: platform === 'web',
            isProduction: file === '.env.production',
            isStaging: file === '.env.staging',
        }),
        new ProvidePlugin({
            process: 'process/browser',
        }),
        new DefinePlugin({
            ...(platform === 'desktop' ? {} : {process: {env: {}}}),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            __REACT_WEB_CONFIG__: JSON.stringify(dotenv.config({path: file}).parsed),

            // React Native JavaScript environment requires the global __DEV__ variable to be accessible.
            // react-native-render-html uses variable to log exclusively during development.
            // See https://reactnative.dev/docs/javascript-environment
            // eslint-disable-next-line @typescript-eslint/naming-convention
            __DEV__: /staging|prod|adhoc/.test(file) === false,
        }),

        // This allows us to interactively inspect JS bundle contents
        ...(process.env.ANALYZE_BUNDLE === 'true' ? [new BundleAnalyzerPlugin()] : []),
    ],
    module: {
        rules: [
            // Transpiles and lints all the JS
            {
                test: /\.(js|ts)x?$/,
                loader: 'babel-loader',

                /**
                 * Exclude node_modules except any packages we need to convert for rendering HTML because they import
                 * "react-native" internally and use JSX which we need to convert to JS for the browser.
                 *
                 * You'll need to add anything in here that needs the alias for "react-native" -> "react-native-web"
                 * You can remove something from this list if it doesn't use "react-native" as an import and it doesn't
                 * use JSX/JS that needs to be transformed by babel.
                 */
                exclude: [new RegExp(`node_modules/(?!(react-native-web)/).*|.native.js$`)],
            },
        ],
    },
    resolve: {
        // React Native libraries may have web-specific module implementations that appear with the extension `.web.js`
        // without this, web will try to use native implementations and break in not very obvious ways.
        // This is also why we have to use .website.js for our own web-specific files...
        // Because desktop also relies on "web-specific" module implementations
        // This also skips packing web only dependencies to desktop and vice versa
        extensions: [
            '.web.js',
            ...(platform === 'desktop' ? ['.desktop.js'] : []),
            '.website.js',
            '.js',
            '.jsx',
            '.web.ts',
            ...(platform === 'desktop' ? ['.desktop.ts'] : []),
            '.website.ts',
            ...(platform === 'desktop' ? ['.desktop.tsx'] : []),
            '.website.tsx',
            '.ts',
            '.web.tsx',
            '.tsx',
        ],
        fallback: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'process/browser': require.resolve('process/browser'),
            crypto: false,
        },
    },
});

export default getCommonConfiguration;
