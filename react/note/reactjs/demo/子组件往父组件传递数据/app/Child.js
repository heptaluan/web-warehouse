import React from "react"

class Child extends React.Component {

    constructor(props) {
        super();

        this.state = {
            d: props.d
        }

        this.add = () => {
            this.setState({ "d": this.state.d + 1 })

            props.getD(this.state.d + 1)
        }

    }

    render() {
        return (
            <div>
                <hr />
                <div>子组件的 d： {this.props.d}</div>
                <input type="button" value="clickMe" onClick={this.add} />
            </div>
        )
    }
}

export default Child;