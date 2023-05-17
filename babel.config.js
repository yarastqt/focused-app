module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          '@app': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
