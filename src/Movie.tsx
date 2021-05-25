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
  const [data] = useState({ Poster: info.Poster, ID: info.ID, Title: info.Title })

  const handleClick = () => {
    history.push('/search')
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
