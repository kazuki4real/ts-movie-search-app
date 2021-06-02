import React from 'react'
import { Wrapper, Main, Ul, Paper, EmptyErr, Array } from './Search'
import { Alert } from '@material-ui/lab'

const MovieList = (props: any) => {
  return (
    <Wrapper>
      <Main>
        {props.movies !== undefined &&
          props.movies.map((movie: Array, index: number) => (
            <Ul>
              {movie.Poster === 'N/A' ? null : (
                <Paper key={index + 'paper'}>
                  <li key={index + 'li'}>{movie.Title}</li>
                  <div key={index + 'link'} onClick={() => props.handleClick(movie.Poster, movie.imdbID, movie.Title)}>
                    <img key={index + 'img'} src={movie.Poster} alt="MovieImage" width="300" height="445" />
                  </div>
                </Paper>
              )}
            </Ul>
          ))}
        {/* ２回目以降の処理 */}
        {props.info !== undefined && !props.duplicated
          ? props.info.movies.map((backMovie: Array, index: number) => (
              <Ul>
                {backMovie.Poster === 'N/A' ? null : (
                  <Paper key={index}>
                    <li key={index + 'li'}>{backMovie.Title}</li>
                    <div
                      key={index + 'link'}
                      onClick={() => props.handleClickSecond(backMovie.Poster, backMovie.imdbID, backMovie.Title)}
                    >
                      <img key={index + 'img'} src={backMovie.Poster} alt="MovieImage" width="300" height="445" />
                    </div>
                  </Paper>
                )}
              </Ul>
            ))
          : null}
      </Main>
      <Main>
        {props.examples !== undefined &&
          props.examples.map((example: Array, index: number) => (
            <Paper key={index}>
              <div key={index} onClick={() => props.handleClick(example.Poster, example.imdbID, example.Title)}>
                <img key={index} src={example.Poster} alt="MovieImage" width="300" height="445" />
              </div>
            </Paper>
          ))}
        {props.info !== undefined && !props.duplicated
          ? props.info.examples.map((backExample: Array, index: number) => (
              <Paper key={index}>
                <div
                  key={index}
                  onClick={() => props.handleClickSecond(backExample.Poster, backExample.imdbID, backExample.Title)}
                >
                  <img key={index} src={backExample.Poster} alt="MovieImage" width="300" height="445" />
                </div>
              </Paper>
            ))
          : null}
      </Main>
      {props.empty ? (
        <EmptyErr hidden={props.empty === ''}>
          <Alert variant="outlined" severity="error">
            {props.empty}
          </Alert>
        </EmptyErr>
      ) : null}
    </Wrapper>
  )
}

export default MovieList
