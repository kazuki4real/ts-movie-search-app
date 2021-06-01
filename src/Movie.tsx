import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LinkButton, Wrapper } from './Search'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { db } from './firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

const Title = styled.h1`
  text-align: center;
`

const MainSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
`

const List = styled.li`
  word-break: break-all;
  width: 100%;
  list-style: none;
  padding: 15px 0;
`

const Image = styled.div`
  padding: 25px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin-left: 25px;
`

// const Input = styled(TextField)`
//   width: 20%;
// `
const TextArea = styled(TextareaAutosize)`
  width: 100%;
  background-color: inherit;
  margin-bottom: 20px;
  color: white;
  font-size: 15px;
  font-weight: 600;
`

const ListContainer = styled.div`
  margin-top: 10px;
`

const Field = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Btn = styled(Button)`
  display: flex;
  align-items: flex-end;
  width: 100%;
`

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
    movies: info.movies,
    examples: info.examples
  })

  type Unsub = () => void

  useEffect(() => {
    const unsubscribe: Unsub = db
      .collection('ratings')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot: any) => {
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
      state: {
        movies: data.movies,
        examples: data.examples
      }
    })
  }

  console.log('info_movie', info)
  console.log('datas', datas)

  return (
    <div id="movie_each">
      <p>imdbID: {data.ID}</p>
      <Title>{data.Title}</Title>
      <MainSection>
        <Image>
          <img src={data.Poster} alt="movieImage" />
        </Image>
        <Form onSubmit={handleSubmit}>
          <Field>
            <TextArea
              value={title}
              aria-label="minimum height"
              rowsMin={3}
              placeholder="Let me know your what you felt about this movie..."
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* <Input
              id="outlined-basic"
              label="感想"
              variant="outlined"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            /> */}
            {/* <Input
              id="outlined-basic"
              label="ratings"
              variant="outlined"
              type="text"
              value={ratings}
              onChange={(e) => setRatings(e.target.value)}
            /> */}
            <Btn variant="contained" color="primary" type="submit">
              add
            </Btn>
            <ListContainer>
              {datas && datas.map((each: any) => (each.imdbID === data.ID ? <List>{each.title}</List> : null))}
            </ListContainer>
          </Field>
        </Form>
      </MainSection>
      <Wrapper>
        <LinkButton variant="contained" color="primary" onClick={handleClick}>
          Search
        </LinkButton>
      </Wrapper>
    </div>
  )
}

export default Movie
