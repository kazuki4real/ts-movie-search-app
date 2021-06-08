import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'

const WrapperHome = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const LinkButton = styled.button`
  border: none;
  background: #3f51b5;
  border-radius: 5px;
  width: 50%;
  margin: 25px 0;
  padding: 60px 0;
  color: white;
  font-size: 25px;
  font-weight: 600;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    transition-duration: 0.5s;
  }
`

const Home = () => {
  const history = useHistory()

  const handleClick = (point: number) => {
    if (point === 0) {
      history.push('/search')
    } else {
      history.push('/test')
    }
  }

  return (
    <WrapperHome>
      <LinkButton onClick={() => handleClick(0)}>検索</LinkButton>
      <LinkButton onClick={() => handleClick(1)}>診断 (制作中...)</LinkButton>
    </WrapperHome>
  )
}

export default Home
