'use client';
import {User} from '@/interfaces/user';
import {updateUser} from '@/redux/reducers/auth.reducer';
import {AppDispatch, RootState} from '@/redux/store';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function withAuth(Component: React.ComponentType<any>) {
  return function WithAuthComponent(props: any) {
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const stateUser: User | undefined = useSelector(
      (state: RootState) => state.auth.user
    );

    useEffect(() => {
      const user = localStorage.getItem('auth');

      if (user && !stateUser) {
        dispatch(updateUser(JSON.parse(user)));
      } else if (!user) {
        console.log('redirecc to login');
        router.push('/login');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Component {...props} />;
  };
}
