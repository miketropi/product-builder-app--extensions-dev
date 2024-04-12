const mix = require('laravel-mix');

mix
  .js('./src/main.js', './theme-extension/assets/product-builder.bundle.js')
  .react()
  .sass('./src/scss/main.scss', 'product-builder.bundle.css')
  .setPublicPath('./theme-extension/assets/')

mix.copyDirectory('./theme-extension', '../product-builder-app/extensions/theme-extension');
