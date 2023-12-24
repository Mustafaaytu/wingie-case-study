import styled from 'styled-components'

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Gölge ekleme */

  p {
    margin: 8px 0;
  }

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;

    &:hover {
      text-decoration: none;
      color: #2dc44d;
    }
  }
`

export { Card }
