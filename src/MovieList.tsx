import React from 'react'
import { Wrapper, Main, Ul, Paper, EmptyErr, Array } from './Search'
import { Alert } from '@material-ui/lab'
import styled from 'styled-components'
import { pc, sp, tab } from './media'

const Image = styled.img`
  width: 300px;
  height: 455px;
  &:hover {
    transform: scale(1.05);
    transition-duration: 0.5s;
  }

  ${sp`
    width: 220px;
  height: 355px;
  `}
`

const List = styled.li`
  margin-bottom: 10px;
`

const MovieList = (props: any) => {
  return (
    <Wrapper>
      <Main>
        {props.movies !== undefined &&
          props.movies.map((movie: Array, index: number) => (
            <Ul>
              {movie.Poster === 'N/A' ? null : (
                <Paper key={index + 'paper'} id="paper">
                  <List key={index + 'li'}>【{movie.Title}】</List>
                  <div key={index + 'link'} onClick={() => props.handleClick(movie.Poster, movie.imdbID, movie.Title)}>
                    <Image key={index + 'img'} src={movie.Poster} alt="MovieImage" />
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
                    <List key={index + 'li'}>【{backMovie.Title}】</List>
                    <div
                      key={index + 'link'}
                      onClick={() => props.handleClickSecond(backMovie.Poster, backMovie.imdbID, backMovie.Title)}
                    >
                      <Image key={index + 'img'} src={backMovie.Poster} alt="MovieImage" />
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
            <Ul>
              {example.Poster === 'N/A' ? null : (
                <Paper key={index + 'paper'}>
                  <List key={index + 'li'}>【{example.Title}】</List>
                  <div
                    key={index + 'link'}
                    onClick={() => props.handleClick(example.Poster, example.imdbID, example.Title)}
                  >
                    <Image key={index + 'img'} src={example.Poster} alt="MovieImage" />
                  </div>
                </Paper>
              )}
            </Ul>
          ))}
        {/* example 2回目以降 */}
        {props.info !== undefined && !props.duplicated
          ? props.info.examples.map((backExample: Array, index: number) => (
              <Ul>
                {backExample.Poster === 'N/A' ? null : (
                  <Paper key={index}>
                    <List key={index + 'li'}>【{backExample.Title}】</List>
                    <div
                      key={index + 'link'}
                      onClick={() => props.handleClickSecond(backExample.Poster, backExample.imdbID, backExample.Title)}
                    >
                      <Image key={index + 'img'} src={backExample.Poster} alt="MovieImage" />
                    </div>
                  </Paper>
                )}
              </Ul>
            ))
          : null}
      </Main>
      {props.empty ? (
        <EmptyErr hidden={props.empty === ''} id="error">
          <Alert variant="outlined" severity="error">
            {props.empty}
          </Alert>
        </EmptyErr>
      ) : null}
    </Wrapper>
  )
}

export default MovieList
