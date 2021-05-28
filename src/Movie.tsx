import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LinkButton, Wrapper } from './Search'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { db } from './firebase'

const Title = styled.h1``

const Movie = () => {
  const history = useHistory()
  const location = useLocation()
  const [datas, setData] = useState<any>()
  const [title, setTitle] = useState<any>('')
  const [ratings, setRatings] = useState<any>('')
  const info: any = location.state
  const [data] = useState({
    Poster: info.Poster,
    ID: info.ID,
    Title: info.Title,
    Movies: info.movies,
    Examples: info.examples
    // Movie_: info.movies_,
    // Examples_: info.examples_
  })

  type Unsub = () => void

  useEffect(() => {
    const unsubscribe: Unsub = db.collection('ratings').onSnapshot((snapshot: any) => {
      const dataSet = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }))
      setData(dataSet)
    })
    return () => unsubscribe()
  }, [])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    db.collection('ratings').add({
      title,
      ratings,
      timestamp: Date.now(),
      imdbID: data.ID
    })

    setRatings('')
    setTitle('')
  }

  const handleClick = () => {
    history.push({
      pathname: '/search',
      state: { movies_: data.Movies, examples_: data.Examples /*, Movies_: data.Movie_, Examples_: data.Examples_*/ }
    })
  }

  console.log('info', info)
  console.log('datas', datas)

  return (
    <div>
      <p>imdbID: {data.ID}</p>
      <Title>{data.Title}</Title>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="ratings" value={ratings} onChange={(e) => setRatings(e.target.value)} />
        <button type="submit">add</button>
      </form>
      <img src={data.Poster} alt="movieImage" />
      {datas &&
        datas.map((each: any) =>
          each.imdbID === data.ID ? (
            <li>
              {each.title} {each.ratings}/5
            </li>
          ) : null
        )}
      <Wrapper>
        <LinkButton variant="contained" color="primary" onClick={handleClick}>
          Search
        </LinkButton>
      </Wrapper>
    </div>
  )
}

export default Movie
