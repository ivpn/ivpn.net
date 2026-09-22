// Re-export everything from @vue/server-renderer.
// This file is used as a virtual module by vite.config.ssr.js to intercept
// the alias-rewritten import "vue/server-renderer" → "@vue/compat/server-renderer".
export * from '@vue/server-renderer'
