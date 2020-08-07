import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'


const getConfirmation = () => {
  // window.confirm('ok')
}

const App = () => (
  <BrowserRouter basename='/index' forceRefresh={false} getUserConfirmation={getConfirmation()} keyLength={12} >
    <div>
      <Link to='/'>Home</Link>
      <Route exact path='/' component={Home} />
    </div>
  </BrowserRouter>
)

const Home = (props) => { 
  console.log(props, 'home') 
  return <h1>Home Page</h1> 
}


ReactDOM.render(
  <App />, 
  document.getElementById('box')
)