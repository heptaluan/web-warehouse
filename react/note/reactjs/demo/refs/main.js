import React from "react"
import ReactDOM from "react-dom"


class Father extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div>
                <input type="button" value="点击切换颜色" onClick={ () => {
                    this.refs.box.style.backgroundColor="blue"
                }} />
                <br />
                <br />
                <div ref='box' style={{"width": "200px", "height": "200px", "backgroundColor": "red"}}></div>
            </div>
        )
    }
}

ReactDOM.render(
    <Father />,
    document.getElementById('box')
)