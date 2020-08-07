import { v1 } from 'uuid'
import { fromJS, Map, List } from 'immutable'

// 创建一个初始状态
export const INITIAL_STATE = fromJS({
  rooms: []
})

// addRoom
export function addRoom(state = INITIAL_STATE, room) {

  // 如果不存在，则直接返回 state，什么都不操作
  if (!room || !room.owner) return state;

  // 更新 state
  return state.update('rooms', rooms => rooms.push(Map({
    id: room.id || v1(),
    name: room.name || 'no name',
    owner: room.owner
  })))
}

// removeRoom
export function removeRoom(state, { id, user }) {

  // 先获取 room
  const rooms = state.get('rooms')

  // 找到 index（类似 filter）
  var index = rooms.findIndex(r => r.get('id') === id)

  // -1 - 表示不存在于这个数组当中
  // 或者 room 存在，但是其 owner 不等于 user（配合 core_spec.js 中的 mockState 一起看）
  if (index == -1 || rooms.getIn([index, 'owner']) !== user) {
    console.log('不是房间创建者，不能删除该房间')
    return state;
  }

  // 然后删除这个房间
  return state.update('rooms', rooms => rooms.splice(index, 1))
}