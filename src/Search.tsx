import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { useHistory, Link } from 'react-router-dom'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Main = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const SearchField = styled(TextField)`
  width: 100%;
  margin-top: 25px;
`

export const LinkButton = styled(Button)`
  width: 50%;
  margin: 25px 0;
`

const SearchBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  flex-direction: column;
  justify-content: center;
`

const SearchBtn = styled(Button)`
  margin-top: 25px;
  width: 100%;
`

const Paper = styled.div`
  padding: 10px 15px;
`

type Array = {
  id: string
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

const API_KEY = '13e3e246'

const Search = () => {
  const [movies, setMovie] = useState<Array[]>([])
  const [examples, setExamples] = useState<Array[]>([])
  const [years] = useState<number[]>([2017, 2018, 2019, 2020, 2021])
  const [queryTitle, setqueryTitle] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const history = useHistory()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (queryTitle === '') {
      exampleApi()
    } else {
      getApiData(queryTitle, year)
    }
  }

  const getApiData = async (title: string, year: string): Promise<void> => {
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&y=${year}`
    const response = await fetch(url)
    const resJson = await response.json()

    if (resJson.Search) {
      setMovie(resJson.Search)
    }
  }

  const exampleApi = async (): Promise<void> => {
    const initialTitle = 'you'
    const randomNum = Math.floor(Math.random() * years.length)
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${initialTitle}&y=${years[randomNum]}`
    const res = await fetch(url)
    const resJson = await res.json()
    setExamples(resJson.Search)
  }

  console.log('queryTitle', queryTitle)
  console.log('movie', movies)
  console.log('examples', examples)
  console.log('year', year)

  const handleHome = () => {
    history.push('/')
  }

  const handleClick = (Poster: string, ID: string, Title: string) => {
    console.log(ID, Poster)
    history.push({
      pathname: '/search/' + ID,
      state: { Poster: Poster, ID: ID, Title: Title }
    })
  }

  return (
    <div>
      <Wrapper>
        <SearchBox>
          <form onSubmit={(e) => handleSubmit(e)}>
            <SearchField
              id="outlined-basic"
              label="Search series..."
              variant="outlined"
              value={queryTitle}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setqueryTitle(e.target.value)}
            />
            <SearchField
              id="outlined-basic"
              label="Search by Year..."
              variant="outlined"
              value={year}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setYear(e.target.value)}
            />
            <SearchBtn variant="contained" type="submit">
              Search
            </SearchBtn>
          </form>
        </SearchBox>
        <Main>
          {queryTitle !== '' ? (
            movies.map((movie: Array, index: number) => (
              <ul>
                {movie.Poster === 'N/A' ? null : (
                  <Paper key={index + 'paper'}>
                    <li key={index + 'li'}>{movie.Title}</li>
                    <div key={index + 'link'} onClick={() => handleClick(movie.Poster, movie.imdbID, movie.Title)}>
                      <img key={index + 'img'} src={movie.Poster} alt="MovieImage" width="300" height="445" />
                    </div>
                  </Paper>
                )}
              </ul>
            ))
          ) : (
            <MainContent>
              {examples.map((example: Array, index: number) => (
                <Paper key={index}>
                  <div key={index} onClick={() => handleClick(example.Poster, example.imdbID, example.Title)}>
                    <img key={index} src={example.Poster} alt="MovieImage" width="300" height="445" />
                  </div>
                </Paper>
              ))}
            </MainContent>
          )}
        </Main>
      </Wrapper>
      <Wrapper>
        <LinkButton variant="contained" color="primary" onClick={handleHome}>
          Home
        </LinkButton>
      </Wrapper>
    </div>
  )
}

export default Search
