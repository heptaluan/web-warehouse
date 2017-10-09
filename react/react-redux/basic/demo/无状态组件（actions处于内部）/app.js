import React from "react"
import { connect } from "react-redux"

// 这里的数据是通过将 App 组件传入下方的 connect() 函数
// 拿到的 state 和 action 分别为 connect() 的两个参数的返回值
let App = ({ v, actions}) => {
    return (
        <div>
            <h1>{v}</h1>
            <input type="button" value="加一" onClick={actions.Add}/>
            {" "}
            <input type="button" value="减一" onClick={actions.Cut}/>
        </div>

    )
}

// 包裹后上方 App 内才可以拿到数据
// 参数为两个函数
export default connect(
    (state) => {
        return {
            v: state.v
        }
    },
    (dispatch) => {

        // 这里涉及到一个问题
        // 如果将 actions 放在外面（新建一个 actions.js 文件在导入）
        // 那么外面的 actions 中就没有了 dispatch 方法（作用域）
        // 亦或是单单导入 { "type": "ADD" }，但是和 dispatch 整合起来又是一个问题
        // 也可以使用取巧的方式，即将 dispatch 往下面传（不推荐，推荐使用官方提供的方式）

        // 所以，总结的来说
        // 其实放在哪里无所谓，最根本的原因就是需要将 action 和 dispatch 整合起来
        // 这也是为什么要使用 bindActionCreators() 方法的原因        

        // 但是如果直接写在内部，可以使用如下方式
        return {
            actions: {
                Add: () => {
                    dispatch({
                        "type": "ADD"
                    })
                },
                Cut: () => {
                    dispatch({
                        "type": "CUT"
                    })
                }
            }
        }
    }
)(App)


