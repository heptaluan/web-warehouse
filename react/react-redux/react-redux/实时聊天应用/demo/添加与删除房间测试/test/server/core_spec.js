import { expect } from "chai"

// 生成随机的不重复的 id
import { v1 } from "uuid"
import { fromJS, Map, List } from "immutable"

import { addRoom, removeRoom } from "../../src/server/core.js"

describe("rooms", () => {

    // 测试 addRoom
    it("能够添加房间：addRoom", () => {
        
        // 设定初始数据
        var firstRoom = { name: "first room", id: v1(), owner: "eisneim" }

        // 利用 addRoom 来计算下一个状态（undefined - 初始的 state）
        const nextState = addRoom( undefined, firstRoom )

        // 取出 room 结构（利用 immutable 提供的 get 方法）
        const rooms = nextState.get("rooms")

        // 检查 rooms 对象是否存在
        expect( rooms ).to.be.ok

        // 检查 rooms 的第一个对象是否为上面的 firstRoom
        expect( rooms.get(0) ).to.equal(Map(firstRoom))

        // 然后在当前的状态上再次 next（nextNextState）
        // 为了区别当初始值为 undefined 的情况下，再次给予一个 nextState 看看会发生什么
        const nextNextState = addRoom(nextState, {
            name: "second room", owner: "terry"
        })

        // getIn - 获取深层次的数据（因为是嵌套结构）
        // 1 - 因为 0 是上面的 firstRoom，故第一个自然是 second room
        // 然后在获取其 name 属性，来测试是否等于 second name
        expect( nextNextState.getIn(["rooms", 1, "name"])).to.equal("second room")
    })



    // 测试 removeRoom（大体操作和上面类似）
    const mockState = fromJS({
        rooms: [{ name: "first room", id: v1(), owner: "eisneim" }]
    })

    // 测试能否被创建者删除
    it("能被创建者删除", () => {
        const state = removeRoom(mockState, {
            id: mockState.getIn(["rooms", 0, "id"]),
            user: "eisneim"
        })
        
        // 删除后 size 为 0
        expect(state.get("rooms").size).to.equal(0)
    })

    // 测试是否不能被其他人删除
    // 换了一个 user，不能删除的情况下 rooms 的 size 不变
    it("不能被其他人删除", () => {
        const state = removeRoom(mockState, {
            id: mockState.getIn(["rooms", 0, "id"]),
            user: "terry"
        })
    
        expect(state.get("rooms").size).to.equal(1)
    
    })
})