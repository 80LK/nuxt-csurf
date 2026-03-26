import { randomEncryptSecret } from 'uncsrf';
import { defineNuxtModule, createResolver, addServerHandler, addServerPlugin, addImports, addPlugin } from '@nuxt/kit';
import { defuReplaceArray } from '../dist/runtime/utils.js';

const defaultOptions = {
  https: process.env.NODE_ENV === "production",
  cookieKey: "",
  cookie: {
    path: "/",
    httpOnly: true,
    sameSite: "strict"
  },
  headerName: "csrf-token",
  methodsToProtect: ["POST", "PUT", "PATCH"]
};
const module = defineNuxtModule({
  meta: {
    name: "nuxt-csurf",
    configKey: "csurf"
  },
  // defaults: …, // don't use defaults (to prevent arrays from being merged)
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    options = defuReplaceArray(options, defaultOptions);
    if (!options.cookieKey) {
      options.cookieKey = `${options.https ? "__Host-" : ""}csrf`;
    }
    options.cookie = options.cookie || {};
    if (options.cookie.secure === void 0) {
      options.cookie.secure = !!options.https;
    }
    if (!options.encryptSecret) {
      options.encryptSecret = randomEncryptSecret();
    }
    nuxt.options.runtimeConfig.csurf = defuReplaceArray(nuxt.options.runtimeConfig.csurf, { ...options });
    nuxt.options.runtimeConfig.public.csurf = { headerName: nuxt.options.runtimeConfig.csurf.headerName };
    if (options.enabled !== false) {
      addServerHandler({ handler: resolve("runtime/server/middleware/csrf") });
      addServerPlugin(resolve("runtime/server/plugin/csrf"));
    }
    nuxt.options.build.transpile.push(resolve("runtime"));
    addImports(["useCsrf", "useCsrfFetch", "useLazyCsrfFetch"].map((key) => ({
      name: key,
      as: key,
      from: resolve("runtime/composables")
    })));
    addPlugin(resolve("runtime/plugin"));
  }
});

export { module as default };
