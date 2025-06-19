import { FetchEvent } from "@solidjs/start/server";
import { type PlatformProxy } from "wrangler";

type Proxy = PlatformProxy<Env, IncomingRequestCfProperties>;

interface CacheStorage {
  open(cacheName: string): Promise<Cache>;
  readonly default: Cache;
}

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    cf: IncomingRequestCfProperties;
    env: Env;
    caches: CacheStorage;
    waitUntil: (promise: Promise<unknown>) => void;
    passThroughOnException: () => void;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var cfPlatformProxy: Proxy;
}

const ensurePlatformProxy = async (): Promise<Proxy> => {
  if (globalThis.cfPlatformProxy) return globalThis.cfPlatformProxy;
  const wrangler = await import("wrangler");
  const proxy = await wrangler.getPlatformProxy<Env>({ persist: true });
  globalThis.cfPlatformProxy = proxy;
  return proxy;
};

export function cloudflare() {
  return async (event: FetchEvent) => {
    if (import.meta.env.DEV) {
      const platformProxy = await ensurePlatformProxy();
      event.locals.cf = platformProxy.cf;
      event.locals.env = platformProxy.env;
      event.locals.caches = platformProxy.caches as unknown as CacheStorage;
      event.locals.waitUntil = platformProxy.ctx.waitUntil;
      event.locals.passThroughOnException = platformProxy.ctx.passThroughOnException;
    } else {
      const context = event.nativeEvent.context;
      event.locals.cf = context.cf;
      event.locals.env = context.cloudflare.env;
      event.locals.caches = caches as unknown as CacheStorage;
      event.locals.waitUntil = context.waitUntil;
      event.locals.passThroughOnException = context.passThroughOnException;
    }
  };
}
