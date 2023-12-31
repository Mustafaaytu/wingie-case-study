import type { AppProps } from 'next/app'
import { ThemeProvider, type DefaultTheme } from 'styled-components'
import GlobalStyle from '@/styles/globalstyles'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import Navigation from '@/components/Navigation/Navigation'

const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Navigation />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}
