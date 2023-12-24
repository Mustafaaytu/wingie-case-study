import styled, { keyframes } from 'styled-components'

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const BodyWithGradient = styled.body`
  margin: 0;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
  background: linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`

export default BodyWithGradient
