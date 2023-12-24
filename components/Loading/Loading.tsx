import React from 'react'
import styled from 'styled-components'

const StyledLoadingWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Loading: React.FC = () => {
  return (
    <StyledLoadingWrapper>
      <div>Loading...</div>
    </StyledLoadingWrapper>
  )
}

export default Loading
