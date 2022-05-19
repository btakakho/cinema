import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { LayoutDefault } from '@/layouts/Default'

import { store } from '@/store/store'

import { HeadProvider } from './HeadProvider/HeadProvider'
import { ReduxToast } from './ReduxToast'

interface IProps {
  children: React.ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const AppProvider = ({ children }: IProps) => {
  return (
    <HeadProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReduxToast />
          <LayoutDefault>{children}</LayoutDefault>
        </QueryClientProvider>
      </Provider>
    </HeadProvider>
  )
}
