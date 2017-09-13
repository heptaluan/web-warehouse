import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Link } from "react-router-dom"


const Links = () => (
    <nav>
        <Link to="/nested/one">One</Link>
        <Link to="/nested/two">Two</Link>
        <Link replace to="/nested/Three">Three</Link>
        <Route path="/nested/:id?" render={({ match }) => <h2>URL: {match.params.id || "id"}</h2>} />
    </nav>
)

const App = () => (
    <BrowserRouter>
        <div>
            <Links />
        </div>
    </BrowserRouter>
)

ReactDOM.render(
    <App />,
    document.getElementById("box")
)





