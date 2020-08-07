import React from "react";
import ReactDOM from "react-dom";
import Bar from "./Components/Bar";


class App extends React.Component {

    constructor(props) {
        super();

        this.state = {
            "r": 110,
            "g": 120,
            "b": 130
        }

        this.bars = ["r", "g", "b"].map( (item, index) => {
            return <Bar key={index} value={this.state[item]} color={item} setColor={(this.setColor).bind(this)} ></Bar>
        })
    }

    setColor(color, value) {
        this.setState({ [color]: value })
    }

    render() {
        return (
            <div>
                <div style={{"backgroundColor": `rgb(${this.state.r}, ${this.state.g}, ${this.state.b})`, "width": "200px", "height": "200px"}}></div>
                {this.bars}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('box')
)