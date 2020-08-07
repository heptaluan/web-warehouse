'use strict'

import Immutable from 'immutable'

const Todo = Immutable.Record({
	id: '',
	complete: false,
	text: '',
})

export default Todo
