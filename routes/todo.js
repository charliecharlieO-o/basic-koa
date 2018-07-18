const Router = require('koa-router')

const router = new Router()
const todos = []

router.get('/', async ctx => {
  ctx.body = todos
})

module.exports = router
