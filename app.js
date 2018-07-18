import Koa from 'koa'
import Router from 'koa-router'
import bodyparser from 'koa-bodyparser'

// import routes
import defaults from './routes/default'
import todos from './routes/todo'

export const app = new Koa()

// error handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 400
    ctx.body = `Uh-oh ${err.message}`
    console.log('Error handler:', err.message)
  }
})

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// Adding a body parser (goes before routes)
app.use(bodyparser)
// create a new router and use routes
const router = new Router()
router.use('/todos', todos.routes(), todos.allowedMethods())
router.use('/', defaults.routes(), defaults.allowedMethods())

app.use(router.routes())
app.listen(3000)
