const path = require('path')
const config = require('./tsconfig.json')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: getAliases(),
      },
    ],
  ],
}

function getAliases() {
  const { baseUrl, paths } = config.compilerOptions

  return Object.entries(paths).reduce((aliases, alias) => {
    const key = alias[0].replace('/*', '')
    const value = path.resolve(baseUrl, alias[1][0].replace('*', ''))

    return {
      ...aliases,
      [key]: value,
    }
  }, {})
}
