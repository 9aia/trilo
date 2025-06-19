import { MetaProvider } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { Suspense } from 'solid-js'
import './app.css'

const queryClient = new QueryClient()

export default function App() {
  return (
    <Router root={props => (
      <Suspense>
        <MetaProvider>
          <QueryClientProvider client={queryClient}>
            {props.children}
          </QueryClientProvider>
        </MetaProvider>
      </Suspense>
    )}
    >
      <FileRoutes />
    </Router>
  )
}
