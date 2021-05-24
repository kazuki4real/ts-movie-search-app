import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { ModifierFlags } from 'typescript'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

const LinkButton = styled(Button)`
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
  const [title] = useState('You')
  const [years] = useState<number[]>([2017, 2018, 2019, 2020, 2021])
  const [queryTitle, setqueryTitle] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const history = useHistory()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    getApiData(queryTitle, year)
    exampleApi()
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
    const randomNum = Math.floor(Math.random() * years.length)
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&y=${years[randomNum]}`
    const res = await fetch(url)
    const resJson = await res.json()
    setExamples(resJson.Search)
  }

  console.log('queryTitle', queryTitle)
  console.log('movie', movies)
  console.log('examples', examples)
  console.log('year', year)

  useEffect(() => {
    if (queryTitle === '') {
      exampleApi()
    }
  }, [queryTitle])

  const handleHome = () => {
    history.push('/')
  }

  return (
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
      {queryTitle !== '' ? (
        movies.map((movie: Array) => (
          <ul>
            {movie.Poster === 'N/A' ? null : (
              <Paper key={movie.id}>
                <li key={movie.id}>{movie.Title}</li>
                <a href={`https://www.imdb.com/title/${movie.imdbID}/`} target="_blank">
                  <img src={movie.Poster} alt="MovieImage" width="300" height="445" />
                </a>
              </Paper>
            )}
          </ul>
        ))
      ) : (
        <div>
          <h1>Here are the recommendations for you!</h1>
          <MainContent>
            {examples.map((example: Array) => (
              <Paper key={example.id}>
                <a href={`https://www.imdb.com/title/${example.imdbID}/`} target="_blank">
                  <img src={example.Poster} alt="MovieImage" width="300" height="445" />
                </a>
              </Paper>
            ))}
          </MainContent>
        </div>
      )}
      <LinkButton variant="contained" color="primary" onClick={handleHome}>
        Home
      </LinkButton>
    </Wrapper>
  )
}

export default Search
