import React from "react";

class Bar extends React.Component {
    constructor(props) {
        super();

        this.state = {
            value: props.value
        }

        this.change = (this.change).bind(this)

        this.setColor = props.setColor
    }

    change(event) {
        this.setState({ "value": parseInt(event.target.value)})
        this.setColor(this.props.color, this.state.value)
    }

    render() {
        return (
            <div>
                {this.props.color}
                <input type="range" min="0" max="255" value={this.state.value} onChange={this.change} />
                <input type="number" min="0" max="255" value={this.state.value} onChange={this.change} />
            </div>
        )
    }
}

export default Bar;