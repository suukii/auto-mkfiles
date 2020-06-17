const fs = require('fs')
const path = require('path')
const { toKebabCase, toCamelCase } = require('./utils')

const genRoutes = (data, path = '@/views') => {
  const filename = toKebabCase(data.key)
  const isRoot = path === '@/views'
  const routeName = toCamelCase(data.key)
  const routePath = `${isRoot ? '/' : ''}${filename}`

  // find the path to the file recursively
  path += `/${filename}`

  let nestedRoutes = ''
  if (Array.isArray(data.children)) {
    nestedRoutes = data.children.map((child) => genRoutes(child, path))
  }
  return `{
    path: '${routePath}',
    name: '${routeName}',
    component: ${isRoot ? 'Layout' : `() => import('${path}')`},
    meta: {
      title: '${data.label}',
    },
    ${nestedRoutes ? `children: [${nestedRoutes}]` : ''}
  }`
}

/**
 * create files for store modules
 * @param {array} arr
 * @param {string} dirname
 */
const makeRouter = (arr, dirname = './dist/router') => {
  fs.mkdir(dirname, { recursive: true }, (err) => {
    if (err) throw err
    arr.forEach((parent) => {
      const filename = toKebabCase(parent.key)
      const fileContent = `export default ${genRoutes(parent)}`
      fs.writeFile(path.resolve(dirname, `./${filename}.js`), fileContent, (err) => {
        if (err) throw err
      })
    })
  })
}

module.exports = makeRouter
