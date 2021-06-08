import React, { useState, useEffect } from 'react'
import { testData } from './data'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Switch } from '@material-ui/core'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  margin-top: 25px;
  padding: 15px 30px;
  background: #8f8c8c83;
  border-radius: 5px;
`

const Question = styled.h1`
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const AnswerSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

const List = styled.p`
  list-style: none;
  margin: 25px 0;
  font-size: 25px;
  border: solid 1px #393232ab;
  padding: 10px 0;
  border-radius: 5px;
  user-select: none;
  padding-left: 10px;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
    transition-duration: 0.5s;
    border: solid 1px #3f51b5;
  }
`

const Ul = styled.ul`
  padding-left: 0;
`

const Result = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  font-size: 25px;
`

const CurrentNum = styled.p`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  text-decoration: underline;
`

const BackHome = styled(Button)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 15px;
`

const Test = () => {
  const [valA, setValA] = React.useState<number>(0)
  const [valB, setValB] = React.useState<number>(0)
  const [valC, setValC] = React.useState<number>(0)
  const [result, setResult] = React.useState<string>('')
  const [thinking, setThinking] = React.useState<boolean>(true)
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(1)
  const history = useHistory()

  const answers = ['そう思う', 'そう思わない', 'よくわからない']

  //回答されたときの得点加算処理
  const handleClick = (value: string): void => {
    if (currentQuestion < 11) {
      if (value === 'valA') {
        setValA(valA + 1)
      } else if (value === 'valB') {
        setValB(valB + 1)
      } else {
        setValC(valC + 1)
      }
      setCurrentQuestion(currentQuestion + 1)
    }

    if (currentQuestion === 10) {
      setTimeout(showResult, 2000)
      console.log('called')
    }
  }

  console.log('val', valA, valB, valC)

  console.log('result', result)
  console.log('thinking', thinking)

  //最終結果の表示
  const showResult = () => {
    !thinking && setThinking(true)

    if (valA > valB && valA > valC) {
      setResult('トレンドからオールドファッションまで幅広く観たいあなた')
    } else if (valB > valA && valB > valC) {
      setResult('新しいジャンルにも挑戦してみたいあなた')
    } else if (valC > valA && valC > valB) {
      setResult('みたいものが気分によってバラバラなあなた')
    } else {
      setResult('王道をしっかり押さえておきたいあなた')
    }
    setThinking(false)
  }

  //test againをしたときの初期化
  const reset = (): void => {
    setCurrentQuestion(1)
    setValA(0)
    setValB(0)
    setValC(0)
    setResult('')
    setThinking(true)
  }

  //ホームへ戻る
  const handleHome = (): void => {
    history.push('/')
  }

  const handleSearch = (): void => {
    history.push('/search')
  }

  return (
    <Wrapper>
      <Container>
        {currentQuestion < 11 && (
          <div>
            <CurrentNum> No. {currentQuestion}/10</CurrentNum>
            <Question>{testData.questions[currentQuestion - 1].question}</Question>
            <AnswerSection>
              <Ul>
                <List onClick={() => handleClick('valA')}>{answers[0]}</List>
                <List onClick={() => handleClick('valB')}>{answers[1]}</List>
                <List onClick={() => handleClick('valC')}>{answers[2]}</List>
              </Ul>
            </AnswerSection>
          </div>
        )}
        {currentQuestion === 11 && (
          <Result>
            {thinking ? (
              <LinearProgress />
            ) : (
              <div>
                <p>{result}</p>
                <button onClick={reset}>Test again</button>
                <button onClick={handleSearch}>go to search</button>
              </div>
            )}
          </Result>
        )}
      </Container>
      <BackHome variant="contained" color="primary" onClick={handleHome}>
        Home
      </BackHome>
    </Wrapper>
  )
}

export default Test
