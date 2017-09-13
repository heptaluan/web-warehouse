import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom"


const isActiveFunc = (match, location) => {
    console.log(match, location);
    return match;
}

const Links = () => (
    <nav>
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeStyle={{ color: "red", fontWeight: "bold" }} to={{ pathname: "/about" }}>About</NavLink>
        <NavLink isActive={isActiveFunc} activeClassName="active" to="/contact">Contact</NavLink>
    </nav>
)

const App = () => (
    <BrowserRouter>
        <div>
            <Links />
            <Route exact path="/" render={() => <h1>Home</h1>} />
            <Route path="/about" render={() => <h1>About</h1>} />
            <Route path="/contact" render={() => <h1>Contact</h1>} />
        </div>
    </BrowserRouter>
)


ReactDOM.render(
    <App />,
    document.getElementById("box")
)





