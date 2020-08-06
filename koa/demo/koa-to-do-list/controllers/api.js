const APIError = require('../rest').APIError

var gid = 0

function nextId() {
  gid++
  return 't' + gid
}

var todos = [
  {
    id: nextId(),
    name: 'AAA',
    description: 'test AAA'
  },
  {
    id: nextId(),
    name: 'BBB',
    description: 'test BBB'
  },
  {
    id: nextId(),
    name: 'CCC',
    description: 'test CCC'
  },
  {
    id: nextId(),
    name: 'DDD',
    description: 'test DDD'
  },
  {
    id: nextId(),
    name: 'EEE',
    description: 'test EEE'
  },
]

module.exports = {

  // GET
  'GET /api/todos': async (ctx, next) => {
    ctx.rest({
      todos: todos
    })
  },

  // POST
  'POST /api/todos': async (ctx, next) => {

    var t = ctx.request.body,
      todo

    if (!t.name || !t.name.trim()) {
      throw new APIError('invalid_input', 'Missing name')
    }

    if (!t.description || !t.description.trim()) {
      throw new APIError('invalid_input', 'Missing description')
    }

    todo = {
      id: nextId(),
      name: t.name.trim(),
      description: t.description.trim()
    }

    todos.push(todo)
    ctx.rest(todo)
  },

  // PUT
  'PUT /api/todos/:id': async (ctx, next) => {

    var t = ctx.request.body,
      index = -1,
      l = todos.length,
      i = 0,
      todo

    if (!t.name || !t.name.trim()) {
      throw new APIError('invalid_input', 'Missing name')
    }

    if (!t.description || !t.description.trim()) {
      throw new APIError('invalid_input', 'Missing description')
    }

    for (; i < l; i++) {
      if (todos[i].id === ctx.params.id) {
        index = i
        break
      }
    }

    if (index === -1) {
      throw new APIError('notfound', 'Todo not found by id ' + ctx.params.id)
    }

    todo = todos[index]
    todo.name = t.name.trim()

    todo.description = t.description.trim()
    ctx.rest(todo)
  },

  // DELETE
  'DELETE /api/todos/:id': async (ctx, next) => {

    var i = 0,
      l = todos.length,
      index = -1

    for (; i < l; i++) {
      if (todos[i].id === ctx.params.id) {
        index = i
        break
      }
    }

    if (index === -1) {
      throw new APIError('notfound', 'Todo not found by id: ' + ctx.params.id)
    }

    ctx.rest(todos.splice(index, 1)[0])
  }
}