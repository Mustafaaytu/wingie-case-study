interface HeadersWithAuthorization {
  Authorization: string;
  [key: string]: string;
}

export const addAuthorizationHeader = (
  headers?: HeadersWithAuthorization
): HeadersWithAuthorization => {
  const user: {token: string} = JSON.parse(localStorage.getItem('auth')!);

  return {
    ...headers,
    Authorization: `${user?.token}`,
    'Content-Type': 'application/json',
  };
};
