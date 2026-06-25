/**
 * vite.config.ssr.js
 * Vite configuration for build-time SSR pre-rendering.
 * Produces Node.js-compatible ESM bundles in ssr-dist/.
 * Run via: vite build --config vite.config.ssr.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

/**
 * Resolve `vue` and `@vue/compat` to the runtime-only compat build.
 *
 * Goals:
 *  1. Exact imports (`import from 'vue'`) → vue.runtime.esm-bundler.js
 *     Excludes @vue/compiler-dom/-core and their deps (estree-walker, entities)
 *     which cause CJS/ESM default-import failures in Node.js.
 *  2. Sub-path import `vue/server-renderer` / `@vue/compat/server-renderer`
 *     → virtual module re-exporting @vue/server-renderer.
 *     (The alias-based approach would produce `/path/to/file.js/server-renderer`
 *     which breaks; the plugin intercepts before that happens.)
 *  3. Runtime-only vue-i18n: we pass pre-compiled JSON messages, no compiler.
 *
 * Using a plugin (not resolve.alias) for (1) avoids breaking subpath imports.
 */
function vueSSRResolutionPlugin() {
  const VIRTUAL_SERVER_RENDERER = '\0vue-ssr-server-renderer'
  const VUE_RUNTIME = resolve(__dirname, 'node_modules/@vue/compat/dist/vue.runtime.esm-bundler.js')
  const VUE_I18N_RUNTIME = resolve(__dirname, 'node_modules/vue-i18n/dist/vue-i18n.runtime.esm-bundler.js')

  return {
    name: 'vue-ssr-resolution',
    enforce: 'pre',
    resolveId(id) {
      // Sub-path: server-renderer virtual shim
      if (id === 'vue/server-renderer' || id === '@vue/compat/server-renderer') {
        return VIRTUAL_SERVER_RENDERER
      }
      // Exact: route to runtime builds (no compiler → no estree-walker/entities)
      if (id === 'vue' || id === '@vue/compat') {
        return VUE_RUNTIME
      }
      if (id === 'vue-i18n') {
        return VUE_I18N_RUNTIME
      }
    },
    load(id) {
      if (id === VIRTUAL_SERVER_RENDERER) {
        // Re-export from the real @vue/server-renderer package.
        return `export * from '@vue/server-renderer'`
      }
    },
  }
}

export default defineConfig({
  plugins: [
    vueSSRResolutionPlugin(),  // must be first — intercepts before all other plugins
    vue({
      template: {
        compilerOptions: {
          compatConfig: { MODE: 2 },
        },
        // Don't transform absolute URLs to module imports – they are static
        // assets served by Hugo/nginx and must remain as plain HTML src strings.
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
    VueI18nPlugin({}),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'assets/js'),
      'scss': resolve(__dirname, 'assets/scss'),
    },
  },

  // Bundle Vue and related packages so Rollup handles CJS→ESM interop.
  // Node.js v22 cannot reliably detect named exports from @vue/compat's CJS
  // build dynamically, but Rollup's static bundling produces correct ESM.
  ssr: {
    noExternal: [
      '@vue/compat',
      '@vue/reactivity',
      '@vue/runtime-core',
      '@vue/runtime-dom',
      '@vue/shared',
      '@vue/server-renderer',
      'vue-i18n',
      '@intlify/core-base',
      '@intlify/shared',
      'vuex',
      'vue-router',
      'js-cookie',
      'date-fns',
    ],
  },

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['global-builtin', 'slash-div', 'color-functions'],
      },
    },
  },

  build: {
    ssr: true,
    outDir: 'ssr-dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        'entry.pricing': resolve(__dirname, 'assets/js/ssr/entry.pricing.js'),
        'entry.servers': resolve(__dirname, 'assets/js/ssr/entry.servers.js'),
        // entry.light is excluded: OnePageCheckout is a fully interactive
        // payment/crypto page that requires browser APIs at module load time.
      },
      external: [
        // Absolute static-asset paths are served by Hugo/nginx, not bundled.
        /^\/images\//,
        /^\/images-static\//,
        /^\/img\//,
        /^\/resources\//,
        /^\/images$/,
      ],
      output: {
        format: 'esm',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        paths: (id) => {
          if (id.startsWith('/')) return id
        },
      },
    },
  },
})

