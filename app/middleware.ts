import type { FetchEvent } from '@solidjs/start/server'
import type { Database } from './lib/db'
import { createMiddleware } from '@solidjs/start/middleware'
import { cloudflare } from './lib/cloudflare'
import { createDb } from './lib/db'

declare global {
  // eslint-disable-next-line ts/no-namespace
  namespace App {
    interface RequestEventLocals {
      db: Database
    }
  }
}

export function db() {
  return async (event: FetchEvent) => {
    event.locals.db = createDb(event)
  }
}

export default createMiddleware({
  onRequest: [cloudflare(), db()],
})
