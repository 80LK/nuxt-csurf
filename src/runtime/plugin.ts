import { defineNuxtPlugin } from '#app'
import { onRequest } from './hooks'

export default defineNuxtPlugin(() => {
  const csrfFetch = $fetch.create({ onRequest })
  return { provide: { csrfFetch } }
})
