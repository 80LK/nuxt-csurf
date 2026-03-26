import { onRequestBuilder } from './hooks'
import { defineNuxtPlugin } from '#app'
import { useCsrf } from '#imports'

export default defineNuxtPlugin(() => {
  const onRequest = onRequestBuilder(() => useCsrf())

  const csrfFetch = $fetch.create({ onRequest })

  return { provide: { csrfFetch } }
})
