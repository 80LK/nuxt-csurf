import { useFetch, useNuxtApp, useRuntimeConfig } from "nuxt/app";
export const useCsrfFetch = (url, options) => {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$csrfFetch
  });
};
export const useLazyCsrfFetch = (url, options) => {
  return useFetch(url, {
    ...options,
    lazy: true,
    $fetch: useNuxtApp().$csrfFetch
  });
};
export function useCsrf() {
  const headerName = useRuntimeConfig().public.csurf.headerName ?? "";
  if (import.meta.server) {
    return { csrf: useNuxtApp().ssrContext?.event?.context?.csrfToken, headerName };
  }
  const metaTag = window.document.querySelector('meta[name="csrf-token"]');
  return { csrf: metaTag?.getAttribute("content"), headerName };
}
