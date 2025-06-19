import type { Database } from '~/lib/db'

declare module '@9aia/castor' {
  interface Register {
    database: Database
  }
}
