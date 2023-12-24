// components/StyledNavigation.tsx

import Link from 'next/link';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import styled from 'styled-components';
import {useRouter} from 'next/router';

const NavigationContainer = styled.nav`
  position: absolute;
  top: 10px;
  right: 10px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  li {
    margin-left: 10px;
  }

  a {
    text-decoration: none;
    color: #3498db;
    font-weight: bold;
    font-size: 16px;
    border: 2px solid #3498db;
    padding: 8px 16px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;

    &:hover {
      background-color: #3498db;
      color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
`;

const Navigation: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  return (
    <NavigationContainer>
      <ul>
        {!auth && (
          <>
            {router.pathname !== '/login' && (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
            {router.pathname !== '/signup' && (
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            )}
          </>
        )}
        {auth && (
          <li>
            <Link href="">Logout</Link>
          </li>
        )}
      </ul>
    </NavigationContainer>
  );
};

export default Navigation;
