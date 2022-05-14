import { LayoutDefault } from 'layouts/Default'
import { QueryClient, QueryClientProvider } from 'react-query'

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
    <QueryClientProvider client={queryClient}>
      <LayoutDefault>{children}</LayoutDefault>
    </QueryClientProvider>
  )
}
