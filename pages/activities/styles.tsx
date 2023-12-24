// styles.js
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  margin: 8px;
  width: calc(50% - 16px); /* Two cards per row on mobile */
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 180px;
  position: relative;

  p.title {
    font-weight: 700;
    margin: 4px 0;
    font-size: 16px;
  }

  p {
    margin: 4px 0;
  }

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;

    &:hover {
      text-decoration: none;
      color: #2dc44d;
    }
  }

  @media (min-width: 768px) {
    width: calc(33.333% - 16px); /* Three cards per row on tablets */
  }

  @media (min-width: 992px) {
    width: calc(25% - 16px); /* Four cards per row on small desktops */
  }

  @media (min-width: 1200px) {
    width: calc(16.666% - 16px); /* Six cards per row on larger screens */
  }
`;

export {Card};
