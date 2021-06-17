import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LinkButton, Wrapper } from './Search'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { db } from './firebase'
import LinearProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { sp } from './media'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import './App.css'

const Title = styled.h1`
  text-align: center;
  margin-top: 35px;

  ${sp`
  margin-bottom: 0;
  `}
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
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  word-break: break-all;
  width: 100%;
  list-style: none;
  padding: 15px 0;
  margin-top: 0;
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

  ${sp`
    margin-left: 0;
    width: 95%;
  `}
`

// const Input = styled(TextField)`
//   width: 20%;
// `

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  background-color: inherit;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: 600;
`

const ListContainer = styled.div`
  width: 100%;
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

const Error = styled.p`
  color: red;
  margin-top: 0;
`
const Time = styled.p`
  text-align: right;
`

const Hr = styled.hr`
  color: #000;
  width: 100%;
`

const Movie = () => {
  const history = useHistory()
  const location = useLocation()
  const [datas, setData] = useState<any>()
  const [title, setTitle] = useState<any>('')
  const [error, setError] = useState<any>('')
  const [loading, setLoading] = useState<boolean>(false)
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
    setLoading(true)
    const unsubscribe: Unsub = db
      .collection('ratings')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot: any) => {
        const dataSet = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data()
        }))
        setData(dataSet)
        setLoading(false)
      })

    return () => unsubscribe()
  }, [])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')

    if (title === '') {
      setError('この作品はどうでしたか...？')
      return
    }

    db.collection('ratings').add({
      title,
      // ratings,
      timestamp: Date.now(),
      imdbID: data.ID
    })

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

  const timeConvert = (timestamp: any) => {
    const today = new Date(timestamp)
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate() + 1
    return `${year}/${month}/${day}`
  }

  console.log('info_movie', info)
  console.log('datas', datas)
  console.log('loading', loading)
  console.log('title', title)

  return (
    <div>
      {/* <p>imdbID: {data.ID}</p> */}
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
              placeholder="この作品は..."
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
            <Error>{error}</Error>
            <Btn variant="contained" color="primary" type="submit">
              書き込む
            </Btn>
            {loading && <LinearProgress />}
            <ListContainer id="containe">
              {datas &&
                datas.map((each: any) =>
                  each.imdbID === data.ID ? (
                    <div>
                      <List>
                        <AccountCircleIcon />
                        <span style={{ marginBottom: '5px' }}>{each.title}</span>
                      </List>
                      <Time>{timeConvert(each.timestamp)}</Time>
                      <Hr color="#000" />
                    </div>
                  ) : null
                )}
            </ListContainer>
          </Field>
        </Form>
      </MainSection>
      <Wrapper>
        <LinkButton style={{ marginBottom: '25px', marginTop: '15px' }} variant="outlined" onClick={handleClick}>
          戻る
        </LinkButton>
      </Wrapper>
    </div>
  )
}

export default Movie
