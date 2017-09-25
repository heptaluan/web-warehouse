import { createStore } from "redux"
import coreReducer from "./reducer"

import { fromJS } from "immutable"

// 创建一个默认状态，从服务器发送到客户端
export const DEFAULT_STATE = fromJS({
    rooms: [{
        room: "公开房间", id: "0"
    }]
})

export function makeStore(state = DEFAULT_STATE) {
    return createStore(coreReducer, state)
}