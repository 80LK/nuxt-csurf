import type { FetchContext, ResponseType } from 'ofetch'

export function onRequestBuilder(ctx: { csrf: string, headerName: string }): (context: FetchContext<any, ResponseType>) => Promise<void> | void {
  return ({ options }) => {
    const { csrf, headerName } = ctx
    if (!options.headers || !(options.headers instanceof Headers)) {
      options.headers = new Headers(options.headers || {})
    }
    options.headers.append(headerName, csrf)
  }
}
