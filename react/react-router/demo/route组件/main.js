import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const App = () => (

  // 外层容器
  <BrowserRouter basename='/index'>
    <div>
      {/* 首页 */}
      <Link to='/'>首页</Link>
      {/* 关于 */}
      <Link to='/about/12?name=index'>关于</Link>
      {/* 内容主页 */}
      <Link to='/contact'>内容主页</Link>
      {/* 模拟接口 */}
      <Link to='/query/user?id=123&name=index'>模拟接口</Link>
      <Link to={{ pathname: '/query/user', search: '?id=456&name=index' }} >模拟接口</Link>
      <div>
        {/* 匹配首页内容 */}
        <Route exact path='/' component={Home} />
        {/* 匹配关于页面内容 */}
        <Route path='/about/:id' render={({ history, location, match }) => 
          <h1> {console.log(history, location, match)} 关于 
            <span onClick={() => { history.push('/', { name: 'mm' }) }}> 
              点击我回首页
            </span>
          </h1>} />
        {/* 匹配内容页面 */}
        <Route path='/contact' children={({ match }) => match && <h1>内容主页</h1>} />
        {/* 模拟接口 */}
        <Route path='/query/user' render={({ match, location }) => (
          <div>
            <p>query</p>
            <p>match:{JSON.stringify(match)}</p>
            <p>location:{JSON.stringify(location)}</p>
            <p>id:{new URLSearchParams(location.search).get('id')}</p>
            <p>name:{new URLSearchParams(location.search).get('name')}</p>
          </div>
        )} />
      </div>
    </div>
  </BrowserRouter>

)

const Home = (props) => { console.log(props, 'home'); return <h1>Home</h1> }

ReactDOM.render(
  <App />,
  document.getElementById('box')
)





