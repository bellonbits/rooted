import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from '@/routes/AppRoutes'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { AuthListener } from '@/components/common/AuthListener'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthListener />
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
