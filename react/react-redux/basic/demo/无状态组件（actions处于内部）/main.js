import React from "react"
import { render } from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"
import App from "./app"

import reducer from "./reducer"

let store = createStore(reducer);

// 将 store 数据传递下去
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("box")
)





