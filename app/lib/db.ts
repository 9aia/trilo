import { type FetchEvent } from "@solidjs/start/server";
import { type AnyD1Database, DrizzleD1Database, drizzle } from "drizzle-orm/d1";

import * as schema from "../../db/schema";
import { getRequestEvent, RequestEvent } from "solid-js/web";

export type Database = DrizzleD1Database<typeof schema> & { $client: AnyD1Database };

export const createDb = (event: FetchEvent): Database => {
  return drizzle(event.locals.env.DB, { schema })
};

export function getDb(event?: RequestEvent) {
  "use server";
  if(!event) event = getRequestEvent();
  if (!event) throw Error("Missing event");
  return event.locals.db;
}

