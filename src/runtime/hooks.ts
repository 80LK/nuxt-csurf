import type { FetchContext, ResponseType } from 'ofetch'
import { useCsrf } from './composables'

export function onRequest({ options }: FetchContext<any, ResponseType>) {
  const { csrf, headerName } = useCsrf()
  if (!options.headers || !(options.headers instanceof Headers)) {
    options.headers = new Headers(options.headers || {})
  }
  options.headers.append(headerName, csrf)
}
