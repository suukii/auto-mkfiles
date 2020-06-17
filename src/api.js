const fs = require('fs')
const path = require('path')
const { toKebabCase } = require('./utils')

/**
 * create files for store modules
 * @param {array} arr
 * @param {string} dirname
 */
const makeApi = (arr, dirname = './dist/api') => {
  fs.mkdir(dirname, { recursive: true }, (err) => {
    if (err) throw err
    arr.forEach((n) => {
      const filename = toKebabCase(n)
      const fileContent = `import { request } from './request'`
      fs.writeFile(path.resolve(dirname, `./${filename}.js`), fileContent, (err) => {
        if (err) throw err
      })
    })
  })
}

module.exports = makeApi
