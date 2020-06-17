const fs = require('fs')
const path = require('path')

const toKebabCase = (str) => str.replace(/[A-Z]/g, ($1) => `-${$1.toLowerCase()}`)

const toCamelCase = (str) => str.replace(/-.?/g, ($1) => `${$1.slice(1).toUpperCase()}`)

const capitalizeCamel = (str) => str[0].toUpperCase() + str.slice(1)

/**
 * read the vue template file
 * replace {{ name }} with given data
 * @param {string} template relative path to the vue template file
 * @param {object} data data accessible in the vue template file
 * @return {string} return file content after inserting data
 */
const getTemplate = ({ template = '', data = {} }) => {
  const content = fs.readFileSync(path.resolve(__dirname, template), 'utf-8')
  return content.replace(/{{([^\{\}]+)}}/g, ($1, $2) => data[$2.trim()] || '')
}

module.exports = {
  toKebabCase,
  toCamelCase,
  capitalizeCamel,
  getTemplate
}
