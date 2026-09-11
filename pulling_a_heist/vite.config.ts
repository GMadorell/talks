import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Inline all JS/CSS into index.html on build so html/ opens straight from disk:
// browsers block separate module scripts and stylesheets on file:// (CORS),
// but inline ones need no fetch. Images in public/ stay as plain files.
// Build-only, so `make present` and `make pdf` (dev server) are unaffected.
export default defineConfig({
  plugins: [
    { ...viteSingleFile(), apply: 'build' },
    {
      // Slidev's build sets output.manualChunks, which the bundler rejects once
      // single-file mode disables code splitting. Drop it after config resolves.
      name: 'drop-slidev-manual-chunks',
      apply: 'build',
      enforce: 'post',
      configResolved(config) {
        const build = config.build as Record<string, any>
        for (const key of ['rollupOptions', 'rolldownOptions']) {
          const output = build[key]?.output
          for (const o of Array.isArray(output) ? output : output ? [output] : [])
            delete o.manualChunks
        }
      },
    },
  ],
})
