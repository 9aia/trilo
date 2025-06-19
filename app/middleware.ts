import { createMiddleware } from "@solidjs/start/middleware";
import { FetchEvent } from "@solidjs/start/server";
import { cloudflare } from "./lib/cloudflare";
import { createDb } from "./lib/db";
import { Database } from "./lib/db";

declare global {
	namespace App {
		interface RequestEventLocals {
			db: Database
		}
	}
}


export function db() {
  return async (event: FetchEvent) => {    
    event.locals.db = createDb(event);
  };
}

export default createMiddleware({
  onRequest: [cloudflare(), db()]
});
