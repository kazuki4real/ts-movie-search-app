import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CssBaseline from '@material-ui/core/CssBaseline'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

type Array = {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

const API_KEY = '13e3e246'

const App = () => {
  const [movies, setMovie] = useState<Array[]>([])
  const [examples, setExamples] = useState<Array[]>([])
  const [title] = useState('You')
  const [years] = useState<number[]>([2017, 2018, 2019, 2020, 2021])
  const [query, setQuery] = useState<string>('')
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  )

  const getApiData = async (searchValue: string): Promise<void> => {
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`
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

  console.log(query === '')
  console.log(movies)
  console.log(examples)

  useEffect(() => {
    if (query === '') {
      exampleApi()
      return
    }
    getApiData(query)
  }, [query])

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setQuery(e.target.value)}
        />
        {query !== '' ? (
          movies.map((movie: any, index) => (
            <ul>
              {movie.Poster === 'N/A' ? null : (
                <div key={movie.id}>
                  <li key={index}>{movie.Title}</li>
                  <img src={movie.Poster} alt="MovieImage" />
                </div>
              )}
            </ul>
          ))
        ) : (
          <div>
            <h1>Here are the recommendations for you!</h1>
            <MainContent>
              {examples.map((example: any, index) => (
                <div key={index}>
                  <img src={example.Poster} alt="MovieImage" />
                </div>
              ))}
            </MainContent>
          </div>
        )}
      </ThemeProvider>
    </Wrapper>
  )
}

export default App
