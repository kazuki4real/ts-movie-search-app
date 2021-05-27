import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LinkButton, Wrapper } from './Search'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Title = styled.h1``

const Movie = () => {
  const history = useHistory()
  const location = useLocation()
  const info: any = location.state
  const [data] = useState({ Poster: info.Poster, ID: info.ID, Title: info.Title, queryTitle: info.queryTitle })

  const handleClick = () => {
    history.push({
      pathname: '/search',
      state: { queryTitle: info.queryTitle }
    })
  }

  console.log(info)

  return (
    <div>
      <p>imdbID: {data.ID}</p>
      <Title>{data.Title}</Title>
      <img src={data.Poster} alt="movieImage" />
      <Wrapper>
        <LinkButton variant="contained" color="primary" onClick={handleClick}>
          Search
        </LinkButton>
      </Wrapper>
    </div>
  )
}

export default Movie
