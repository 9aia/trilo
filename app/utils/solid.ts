import type { APIEvent } from "@solidjs/start/server";
import type { SafeParseReturnType, ZodSchema } from 'zod';

export async function getValidated<O>(
  event: APIEvent,
  type: 'body' | 'params' | 'query' | 'form',
  schema: ZodSchema<O>,
) {
  if (type === 'body') {
    const data = await event.request.json()
    const result = schema.safeParse(data)

    if (!result.success)
      return badRequest(result)

    return success(result.data)
  }

  if (type === 'params') {
    const params = event.params
    const result = schema.safeParse(params)

    if (!result.success)
      return badRequest(result)

    return success(result.data)
  }

  if (type === 'form') {
    const formData = await event.request.formData()
    const result = schema.safeParse(formData)

    if (!result.success)
      return badRequest(result)

    return success(result.data)
  }

  if (type === 'query') {
    const url = new URL(event.request.url)
    const result = schema.safeParse(url.searchParams)

    if (!result.success)
      return badRequest(result)

    return success(result.data)
  }

  return internal()
}

export function internal(message = 'Internal Server Error', error?: unknown) {
  if (error) {
    return {
      data: null,
      error: new Response(message + " " + error, { status: 500 })
    }
  }

  return {
    data: null,
    error: new Response(message, { status: 500 })
  }
}

export function badRequest<I, O>(result?: SafeParseReturnType<I, O>) {
  if (!result) {
    return {
      data: null,
      error: new Response("Bad Request", { status: 400 })
    }
  }

  return {
    data: null,
    error: new Response(JSON.stringify(result.error), { status: 400 })
  }
}

export function success<T>(data: T) {
  return {
    data,
    error: null
  }
}

export function validated<O>(
  data: FormData | unknown,
  schema: ZodSchema<O>,
) {
  let dataToZod: unknown = data

  if(data instanceof FormData) {
    dataToZod = Object.fromEntries(data.entries())
  }

  const validation = schema.safeParse(dataToZod)

  if (!validation.success)
    throw new BadRequestError(JSON.stringify(validation.error))

  return validation.data
}

export class InternalError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = "InternalError"
  }
}

export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = "BadRequestError"
  }
}

export class NotFoundError extends BadRequestError {
  constructor(message?: string) {
    super(message)
    this.name = "NotFoundError"
  }
}

export class UnauthorizedError extends BadRequestError {
  constructor(message?: string) {
    super(message)
    this.name = "UnauthorizedError"
  }
}

export class ForbiddenError extends BadRequestError {
  constructor(message?: string) {
    super(message)
    this.name = "ForbiddenError"
  }
}
