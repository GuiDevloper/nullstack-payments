const configs = require('nullstack/webpack.config')
const path = require('path')

module.exports = configs.map(config => {
  return (...args) => {
    const c = config(...args)
    // by personal choice configuring "~/" path alias (same in tsconfig.json)
    c.resolve.alias['~'] = path.resolve(__dirname, 'src/')
    return c
  }
})
