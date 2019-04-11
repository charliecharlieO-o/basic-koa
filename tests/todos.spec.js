const test = require('ava')
const request = require('supertest-as-promised')

const app = require('../app')
const Todo = require('../routes/todo')

test.beforeEach(async t => {
  t.context.request = request(app.callback())
})

test('listing is empty', async t => {
  const {body, status, type} = await t.context.request.get('/todos')
  t.is(status, 200)
  t.is(type, 'application/json')
  t.is(body.length, 0)
})

test('create new resource', async t => {
  const {status, body} = await t.context.request.post('/todos').send({
    title: 'Be awesome'
  })
  t.is(status, 201)
})
