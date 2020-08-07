import { expect } from 'chai'
import { fromJS, Map, List } from 'immutable'
import { v1 } from 'uuid'

import coreReducer from '../../src/server/reducer'
import { addRoom, removeRoom } from '../../src/server/actionCreator'


describe('server 端核心 Reducer', () => {
  it('可以当作一个 reducer', () => {
    var id = v1();
    var actions = [
      // 添加了三个房间
      { type: 'ADD_ROOM', room: { id, name: '1', owner: 'eisneim' } },
      { type: 'ADD_ROOM', room: { name: '2', owner: 'terry' } },
      { type: 'ADD_ROOM', room: { name: '3', owner: 'eisneim' } },
      // 删除掉第一个房间
      { type: 'REMOVE_ROOM', payload: { id: id, user: 'eisneim' } },
    ]

    // 依次调用 coreReducer
    const finalState = actions.reduce(coreReducer, undefined)

    expect(finalState.get('rooms').size).to.equal(2)

    // 因为删除掉了第一个，所以默认的第一个的 owner 为 terry
    expect(finalState.getIn(['rooms', 0, 'owner'])).to.equal('terry')
  })


  it('使用 actionCreator', () => {
    var id = v1()
    var actions = [
      addRoom({ id, name: '1', owner: 'eisneim' }),
      addRoom({ name: '2', owner: 'terry' }),
      addRoom({ name: '3', owner: 'eisneim' }),
      removeRoom({ id: id, user: 'eisneim' }),
    ]
    const finalState = actions.reduce(coreReducer, undefined)
    console.log(finalState)
    expect(finalState.get('rooms').size).to.equal(2)
    expect(finalState.getIn(['rooms', 0, 'owner'])).to.equal('terry')

  })
})
