import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import fs from 'fs';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

// Plugin to generate manifest compatible with Hugo
function hugoManifestPlugin() {
  return {
    name: 'hugo-manifest',
    apply: 'build',
    writeBundle(options, bundle) {
      const manifest = {};
      
      for (const [fileName, info] of Object.entries(bundle)) {
        if (info.type === 'chunk' && info.isEntry) {
          // Get the original entry name
          const entryName = info.facadeModuleId ? 
            info.facadeModuleId.split('/').pop().replace('.js', '').replace('.scss', '') : 
            fileName.replace(/\.[^.]+$/, '').replace('js/', '').replace('css/', '');
          
          // fileName already includes the directory (js/ or css/)
          // Create manifest entries for JS files
          if (fileName.startsWith('js/')) {
            manifest[`/js/${entryName}.js`] = `/${fileName}`;
          }
          
          // Also add CSS entries if they exist
          if (info.css && info.css.length > 0) {
            info.css.forEach(cssFile => {
              manifest[`/css/${entryName}.css`] = `/${cssFile}`;
            });
          }
        }
        
        if (info.type === 'asset' && fileName.endsWith('.css')) {
          // Handle standalone CSS files - fileName already has css/ prefix
          const baseName = fileName.replace('css/', '').split('.')[0];
          manifest[`/css/${baseName}.css`] = `/${fileName}`;
        }
      }
      
      // Write manifest to both static and data directories
      const manifestJson = JSON.stringify(manifest, null, 2);
      fs.writeFileSync(
        resolve(__dirname, 'static/mix-manifest.json'),
        manifestJson
      );
      // Write to Hugo's data directory (two levels up from theme)
      fs.writeFileSync(
        resolve(__dirname, '../../data/manifest.json'),
        manifestJson
      );
    }
  };
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          },
          transformAssetUrls: {
            // Don't transform absolute URLs (starting with /)
            includeAbsolute: false
          }
        }
      }),
      VueI18nPlugin({}),
      hugoManifestPlugin()
    ],
    
    resolve: {
      alias: {
        'lunr': resolve(__dirname, 'node_modules/lunr/lunr.min.js'),
        '@': resolve(__dirname, 'assets/js'),
        'scss': resolve(__dirname, 'assets/scss'),
        'vue': '@vue/compat',
        // Add alias for fonts to help Vite resolve them
        '@fonts': resolve(__dirname, 'assets/scss/fonts')
      }
    },

    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['global-builtin', 'slash-div', 'color-functions']
        }
      }
    },

    build: {
      outDir: 'static',
      emptyOutDir: false, // Don't empty the directory (Hugo might have other static files)
      manifest: false, // We're using our custom manifest
      assetsInlineLimit: 0, // Don't inline any assets
      assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot', '**/*.otf'],
      chunkSizeWarningLimit: 1600,
      modulePreload: false, // Disable module preloading for external assets
      sourcemap: true, // Enable source maps for debugging
      rolldownOptions: {
        input: {
          app: resolve(__dirname, 'assets/js/app.js'),
          servers: resolve(__dirname, 'assets/js/servers.js'),
          'openvpn-config': resolve(__dirname, 'assets/js/openvpn-config.js'),
          search: resolve(__dirname, 'assets/js/search.js'),
          menu: resolve(__dirname, 'assets/js/menu.js'),
          wireguard: resolve(__dirname, 'assets/js/wireguard.js'),
          localisation: resolve(__dirname, 'assets/js/localisation.js'),
          pages: resolve(__dirname, 'assets/scss/pages.scss'),
          services: resolve(__dirname, 'assets/scss/services.scss')
        },
        external: [
          // Treat absolute paths as external (they're served by Hugo)
          /^\/images\//,
          /^\/images-static\//,
          /^\/img\//,
          /^\/resources\//
        ],
        output: {
          entryFileNames: (chunkInfo) => {
            // Use IIFE format for standalone utility scripts
            if (['localisation', 'menu'].includes(chunkInfo.name)) {
              return 'js/[name].[hash].js';
            }
            return 'js/[name].[hash].js';
          },
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.names?.[0] ?? assetInfo.name ?? '';
            if (name.endsWith('.css')) {
              return 'css/[name].[hash][extname]';
            }
            // Put font files in a fonts directory
            if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
              return 'fonts/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          },
          // Keep external paths as-is
          paths: (id) => {
            if (id.startsWith('/')) {
              return id;
            }
          }
        }
      }
    },

    server: {
      port: 3000,
      strictPort: false,
    }
  };
});
