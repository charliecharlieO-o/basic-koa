const test = require('ava')
const request = require('supertest-as-promised')

const app = require('../app')

test.beforeEach(async t => {
  t.context.request = request(app.callback())
})

test('server says hello', async t => {
  const {status, text} = await t.context.request.get('/')
  t.is(status, 200)
  t.is(text, 'Hello...router!\n')
})
