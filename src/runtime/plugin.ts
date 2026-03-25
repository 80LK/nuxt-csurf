import { onRequest } from './hooks'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const csrfFetch = $fetch.create({ onRequest })
  return { provide: { csrfFetch } }
})
