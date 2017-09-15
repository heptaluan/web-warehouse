import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Link, Prompt } from "react-router-dom"


const Links = () => (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/form">Form</Link>
    </nav>
)

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = { dirty: false }
        this.onInput = this.onInput.bind(this)
    }

    onInput(e) {
        const isShow = !!e.target.value.trim()
        this.setState({ dirty: isShow })
    }

    render() {
        return (
            <div>
                <h1>Form</h1>
                <input type="text" onInput={this.onInput} />
                <Prompt when={this.state.dirty} message="数据尚未保存，确定离开？" />
            </div>
        )
    }
}

const App = () => (
    <BrowserRouter>
        <div>
            <Links />
            <Route exact path="/" render={() => <h1>Home</h1>} />
            <Route path="/form" component={Form} />

        </div>
    </BrowserRouter>
)


ReactDOM.render(
    <App />,
    document.getElementById("box")
)





