const mix = require('laravel-mix');

// mix.extract(['react', 'react-dom'], 'product-builder-vendor.js');

mix
  .js('./src/main.js', './theme-extension/assets/product-builder.bundle.js')
  .react()
  .sass('./src/scss/main.scss', 'product-builder.bundle.css')
  .setPublicPath('./theme-extension/assets/')

// mix.copyDirectory('./theme-extension', '../product-builder-app/extensions/theme-extension');
mix.copyDirectory('./theme-extension', '../product-builder-app/extensions/theme-extension');
