const fs = require('fs')
const path = require('path')
const { toKebabCase, capitalizeCamel, toCamelCase, getTemplate } = require('./utils')

/**
 * make directories recursively
 * make a default file where there is no nested structure
 * @param {array} arr
 * @param {string} dirname
 * @param {string} defaultFilename
 */
const makeViews = (arr, dirname = './dist/views', defaultFilename = 'index.vue') => {
  Array.isArray(arr) &&
    arr.forEach((dir) => {
      const filename = toKebabCase(dir.key)
      // make a dir
      fs.mkdir(path.resolve(dirname, `./${filename}`), { recursive: true }, (err) => {
        if (err) throw err

        // get template file content
        const fileContent = getTemplate({
          template: '../templates/view.template.vue',
          data: {
            name: capitalizeCamel(toCamelCase(dir.key))
          }
        })
        // make an index.vue file
        fs.writeFile(path.resolve(dirname, `./${filename}/${defaultFilename}`), fileContent, (err) => {
          if (err) throw err
        })

        if (Array.isArray(dir.children)) {
          makeViews(dir.children, path.resolve(dirname, `./${filename}`))
        }
      })
    })
}

module.exports = makeViews
