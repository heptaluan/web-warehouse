import { fromJS } from "immutable"
import { expect } from "chai"

import { addRoom } from "../../src/server/actionCreator.js"
import { makeStore } from "../../src/server/store.js"

describe("server store", () => {

    // 因为要用到异步的操作，所以这里传入一个 done
    it("dispatch actions", (done) => {

        // 创建一个假的状态数据
        const mockState = fromJS({
            rooms: []
        })

        // 然后创建一个 store，数据就是默认的 mockState
        const store = makeStore(mockState)

        // 监听 store 发生变化时的操作
        store.subscribe(() => {

            // 利用 getState() 获取当前状态
            const state = store.getState()
            expect(state.get("rooms").size).to.equal(1)
            done()
        })

        // 向 store 发送一个 action 用来触发 subscrube() 事件
        store.dispatch(addRoom({
            name: "聊天室", owner: "terry"
        }))
    })
})