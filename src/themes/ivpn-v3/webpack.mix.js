let mix = require('laravel-mix');
let path = require('path');

require('laravel-mix-bundle-analyzer');
require('mix-env-file');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.env(process.env.ENV_FILE);

mix.webpackConfig({
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.common.js',
            'lunr': 'lunr/lunr.min.js',            
            '@': path.resolve('assets/js'),            
            'scss': path.resolve('assets/scss'),
        }
    }
});


// if (mix.inProduction()) {
    // mix.bundleAnalyzer();
// }


// mix.disableNotifications();

mix.js('assets/js/app.js', 'static/js/')    
    .js('assets/js/servers.js', 'static/js/')
    .js('assets/js/search.js', 'static/js/')
    .js('assets/js/menu.js', 'static/js/')
    .sass('assets/scss/pages.scss', 'static/css/')    
    .copy('node_modules/flag-icon-css/flags', 'static/flags')
    .copy('node_modules/flag-icon-css/css/flag-icon.min.css', 'static/css')
    .setPublicPath('static')
    .version()
    .then(() => {
        // Run Laravel Mix copy file method
        new (require('laravel-mix/src/tasks/CopyFilesTask'))({
          from: 'static/mix-manifest.json',
          to: new File('data/manifest.json')
        }).run();
      })


      