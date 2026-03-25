import { onRequestBuilder } from './hooks'
import { defineNuxtPlugin } from '#app'
import { useCsrf } from '#imports'

export default defineNuxtPlugin(() => {
  const csrf = useCsrf()

  const onRequest = onRequestBuilder(csrf)

  const csrfFetch = $fetch.create({ onRequest })

  return { provide: { csrfFetch } }
})
