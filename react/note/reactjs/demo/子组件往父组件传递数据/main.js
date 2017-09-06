import React from "react"
import ReactDOM from "react-dom"
import Child from "./app/Child"

class Father extends React.Component {

    constructor() {
        super();
        this.state = {
            d: 10
        }
    }

    getD(number) {
        this.setState({
            "d": number
        })
    }

    render() {
        return (
            <div>
                <div>父组件的 d：{this.state.d}</div>
                <Child d={this.state.d} getD={(this.getD).bind(this)} ></Child>
            </div>
        )
    }
}

ReactDOM.render(
    <Father />,
    document.getElementById("box")
)