export function onRequestBuilder(contextBuilder) {
  return ({ options }) => {
    const { csrf, headerName } = contextBuilder();
    if (!options.headers || !(options.headers instanceof Headers)) {
      options.headers = new Headers(options.headers || {});
    }
    options.headers.append(headerName, csrf);
  };
}
