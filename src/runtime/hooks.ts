import type { FetchContext, ResponseType } from 'ofetch'

export function onRequestBuilder(contextBuilder: () => ({ csrf: string, headerName: string })): (context: FetchContext<any, ResponseType>) => Promise<void> | void {
  return ({ options }) => {
    const { csrf, headerName } = contextBuilder()

    if (!options.headers || !(options.headers instanceof Headers)) {
      options.headers = new Headers(options.headers || {})
    }
    options.headers.append(headerName, csrf)
  }
}
