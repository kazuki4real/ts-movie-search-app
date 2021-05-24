import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      Hello this is Home!
      <Link to="/search">search</Link>
    </div>
  )
}

export default Home
