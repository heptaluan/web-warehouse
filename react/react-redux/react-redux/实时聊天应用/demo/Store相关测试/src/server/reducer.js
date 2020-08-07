import { addRoom, removeRoom } from './core'

export default function reduce(state, action) {

  // 这里根据 action 的类别来做不同的操作
  switch (action.type) {
    case 'ADD_ROOM':
      return addRoom(state, action.room)
    case 'REMOVE_ROOM':
      return removeRoom(state, action.payload)
  }

  return state;
}