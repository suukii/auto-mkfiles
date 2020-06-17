/**
 * menu:
 * setting
 *   account
 *   others
 * nested
 *   menu-1
 *     menu-1-1
 *     menu-1-2
 *   menu-2
 */

const routes = [
  {
    key: 'setting',
    label: 'setting',
    children: [
      {
        key: 'account',
        label: 'account'
      },
      {
        key: 'others',
        label: 'others'
      }
    ]
  },
  {
    key: 'nested',
    label: 'nested',
    children: [
      {
        key: 'menu-1',
        label: 'menu-1',
        children: [
          {
            key: 'menu-1-1',
            label: 'menu-1-1'
          },
          {
            key: 'menu-1-2',
            label: 'menu-1-2'
          }
        ]
      },
      {
        key: 'menu-2',
        label: 'menu-2'
      }
    ]
  }
]

const modules = ['setting', 'menu-1', 'menu-2']

const makeViews = require('./src/views')
const makeStore = require('./src/store')
const makeApi = require('./src/api')
const makeRouter = require('./src/router')

makeViews(routes)
makeStore(modules)
makeApi(modules)
makeRouter(routes)
