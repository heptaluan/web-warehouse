import React from "react"
import ReactDOM from "react-dom"


class Father extends React.Component {

    constructor() {
        super();
        
        this.change = (this.change).bind(this);

        this.state = {
            "txt": ""
        }
    }

    change(event) {
        this.setState({
            "txt": event.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text" onInput={this.change} />
                <h1>{ this.state.txt }</h1>
            </div>
        )
    }
}

ReactDOM.render(
    <Father />,
    document.getElementById('box')
)