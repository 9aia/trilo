import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import "./app.css";
import { Suspense } from "solid-js";
import { MetaProvider } from "@solidjs/meta";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

const queryClient = new QueryClient()

export default function App() {
  return <Router root={props => (
      <Suspense>
        <MetaProvider>
          <QueryClientProvider client={queryClient}>
            {props.children}
          </QueryClientProvider>
        </MetaProvider>
      </Suspense>
  )}>
    <FileRoutes />
  </Router>
}
