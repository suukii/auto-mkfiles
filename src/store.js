const fs = require('fs')
const path = require('path')
const { toKebabCase, getTemplate } = require('./utils')

/**
 * create files for store modules
 * @param {array} arr
 * @param {string} dirname
 */
const makeStore = (arr, dirname = './dist/store') => {
  fs.mkdir(dirname, { recursive: true }, (err) => {
    if (err) throw err
    arr.forEach((n) => {
      const filename = toKebabCase(n)
      // get template file content
      const fileContent = getTemplate({
        template: '../templates/store.template.js',
        data: {
          filename
        }
      })
      fs.writeFile(path.resolve(dirname, `./${filename}.js`), fileContent, (err) => {
        if (err) throw err
      })
    })
  })
}

module.exports = makeStore
