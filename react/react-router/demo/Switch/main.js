import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom'

const Links = () => (
  <nav>
    <Link to='/'>Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/contact/xxx/xxx/xxxxx'>Contact</Link>
    <Link to='/1234'>1234</Link>
  </nav>
)

const App = () => (
  <BrowserRouter>
    <div>
      <Links />
      <Switch>
        <Route exact path='/' render={() => <h1>Home</h1>} />
        <Route path='/about' render={() => <h1>About</h1>} />
        <Route path='/:itemid' render={({ match }) => (
            <h1>To: {match.params.itemid}</h1>
        )} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </div>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('box')
)
