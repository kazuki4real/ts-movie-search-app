import React, { useState } from 'react'
import { testData } from './data'
import styled from 'styled-components'
import { useHistory } from 'react-router'

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
  background: #dddddd83;
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
  background: #393232ab;
  padding: 10px 0;
  border-radius: 5px;
  user-select: none;
  padding-left: 10px;

  &:hover {
    opacity: 50%;
    cursor: pointer;
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
  justify-content: flex-end;
`

const Test = () => {
  const [valA, setValA] = useState<number>(0)
  const [valB, setValB] = useState<number>(0)
  const [valC, setValC] = useState<number>(0)
  const [currentQuestion, setCurrentQuestion] = useState<number>(1)
  const history = useHistory()

  const answers = ['そう思う', 'そう思わない', 'よくわからない']

  const handleClick = (point: number): void => {
    if (currentQuestion < 21) {
      if (point === 5) {
        setValA(valA + 5)
      } else if (point === 3) {
        setValB(valB + 3)
      } else {
        setValC(valC + 1)
      }
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const showResult = (valA: number, valB: number, valC: number) => {
    if (valA > 10) {
      return 'valA'
    } else {
      return 'val else'
    }
  }

  const reset = (): void => {
    setCurrentQuestion(1)
    setValA(0)
    setValB(0)
    setValC(0)
  }

  const handleHome = (): void => {
    history.push('/')
  }

  console.log(valA)

  return (
    <Wrapper>
      <Container>
        {currentQuestion < 11 && (
          <div>
            <Question>{testData.questions[currentQuestion - 1].question}</Question>
            <AnswerSection>
              <Ul>
                <List onClick={() => handleClick(5)}>{answers[0]}</List>
                <List onClick={() => handleClick(1)}>{answers[1]}</List>
                <List onClick={() => handleClick(3)}>{answers[2]}</List>
              </Ul>
            </AnswerSection>
            <CurrentNum>{currentQuestion}/10</CurrentNum>
          </div>
        )}
        {currentQuestion === 11 && (
          <Result>
            <p>{showResult(valA, valB, valC)}</p>
            <button onClick={reset}>Test again</button>
          </Result>
        )}
      </Container>
      <button onClick={handleHome}>Home</button>
    </Wrapper>
  )
}

export default Test
