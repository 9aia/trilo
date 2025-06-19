import type { FetchEvent } from '@solidjs/start/server'
import type { AnyD1Database, DrizzleD1Database } from 'drizzle-orm/d1'
import type { RequestEvent } from 'solid-js/web'

import { drizzle } from 'drizzle-orm/d1'
import { getRequestEvent } from 'solid-js/web'
import * as schema from '../../db/schema'

export type Database = DrizzleD1Database<typeof schema> & { $client: AnyD1Database }

export function createDb(event: FetchEvent): Database {
  return drizzle(event.locals.env.DB, { schema })
}

export function getDb(event?: RequestEvent) {
  'use server'
  if (!event)
    event = getRequestEvent()
  if (!event)
    throw new Error('Missing event')
  return event.locals.db
}
