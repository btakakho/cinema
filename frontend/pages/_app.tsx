import type { AppProps } from 'next/app'
import { AppProvider } from 'providers/AppProvider'

import '@/assets/styles/globals.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default App
