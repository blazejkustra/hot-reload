require('dotenv').config();

const IS_E2E_TESTING = process.env.E2E_TESTING === 'true';

const ReactCompilerConfig = {
    environment: {
        enableTreatRefLikeIdentifiersAsRefs: true,
    },
};
const defaultPresets = ['@babel/preset-react', '@babel/preset-env', '@babel/preset-flow', '@babel/preset-typescript'];
const defaultPlugins = [
    ['babel-plugin-react-compiler', ReactCompilerConfig], // must run first!
    // Adding the commonjs: true option to react-native-web plugin can cause styling conflicts
    ['react-native-web'],

    '@babel/transform-runtime',
    '@babel/plugin-proposal-class-properties',

    // We use `transform-class-properties` for transforming ReactNative libraries and do not use it for our own
    // source code transformation as we do not use class property assignment.
    'transform-class-properties',

    // Keep it last
    'react-native-reanimated/plugin',
];

const webpack = {
    presets: defaultPresets,
    plugins: defaultPlugins,
};

module.exports = (api) => {
    console.debug('babel.config.js');
    console.debug('  - api.version:', api.version);
    console.debug('  - api.env:', api.env());
    console.debug('  - process.env.NODE_ENV:', process.env.NODE_ENV);
    console.debug('  - process.env.BABEL_ENV:', process.env.BABEL_ENV);

    // For `react-native` (iOS/Android) caller will be "metro"
    // For `webpack` (Web) caller will be "@babel-loader"
    // For jest, it will be babel-jest
    // For `storybook` there won't be any config at all so we must give default argument of an empty object
    const runningIn = api.caller((args = {}) => args.name);
    console.debug('  - running in: ', runningIn);

    return webpack;
};
