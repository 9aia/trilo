import type { APIEvent } from '@solidjs/start/server'
import { restorePhoto } from '~/lib/photo-restoration'

export async function POST(event: APIEvent) {
  try {
    const formData = await event.request.formData()
    const photo = formData.get('photo')

    console.log('Form data received:', {
      photoType: typeof photo,
      photoValue: photo,
      isFile: photo instanceof File,
      formDataEntries: Array.from(formData.entries()).map(([key, value]) => ({
        key,
        type: typeof value,
        isFile: value instanceof File,
        value: value instanceof File ? `${value.name} (${value.size} bytes)` : value,
      })),
    })

    if (!photo) {
      return new Response(JSON.stringify({ error: 'No photo file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!(photo instanceof File)) {
      return new Response(JSON.stringify({ error: 'Photo must be a file' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.log('Photo received:', photo.name, photo.size, photo.type)

    // Convert photo file to base64
    const arrayBuffer = await photo.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    const base64String = btoa(String.fromCharCode(...uint8Array))

    const result = await restorePhoto(base64String)

    if (result.error) {
      return result.error
    }

    return result.data
  }
  catch (error) {
    console.error('Error processing photo restore:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
