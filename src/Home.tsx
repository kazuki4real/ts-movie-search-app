import React from 'react'
import { LinkButton, Wrapper } from './Search'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory()

  const handleClick = (point: number) => {
    if (point === 0) {
      history.push('/search')
    } else {
      history.push('/test')
    }
  }

  return (
    <div>
      Hello this is Home!
      <Wrapper>
        <LinkButton variant="contained" color="primary" onClick={() => handleClick(0)}>
          Search
        </LinkButton>
        <LinkButton variant="contained" color="secondary" onClick={() => handleClick(1)}>
          Test
        </LinkButton>
      </Wrapper>
    </div>
  )
}

export default Home
