const Koa = require('koa')
const app = new Koa()

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
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// response

app.use(async ctx => {
  if (ctx.query.greet !== 'world') {
    throw new Error('Can only greet "world"')
  }
  
  ctx.status = 200
  ctx.body = `Hello ${ctx.query.greet} from Koa`
})

app.listen(3000)
