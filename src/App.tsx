import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import Search from './Search'
import Movie from './Movie'
import Test from './Test'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search/" component={Search} />
        <Route path="/search/:imdbID">
          <Movie />
        </Route>
        <Route path="/test" component={Test} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
