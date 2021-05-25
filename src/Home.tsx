import React from 'react'
import { LinkButton, Wrapper } from './Search'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push('/search')
  }

  return (
    <div>
      Hello this is Home!
      <Wrapper>
        <LinkButton variant="contained" color="primary" onClick={handleClick}>
          Search
        </LinkButton>
      </Wrapper>
    </div>
  )
}

export default Home
