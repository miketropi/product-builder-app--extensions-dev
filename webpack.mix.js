const mix = require('laravel-mix');

// mix.extract(['react', 'react-dom'], 'product-builder-vendor.js');

mix
  .js('./src/main.js', './theme-extension/assets/product-builder.bundle.js')
  .js('./src/funnel.js', './theme-extension/assets/funnel-builder.bundle.js')
  .react()
  .sass('./src/scss/main.scss', 'product-builder.bundle.css')
  .sass('./src/scss/funnel.scss', 'funnel-builder.bundle.css')
  .setPublicPath('./theme-extension/assets/')

mix.copyDirectory('./theme-extension', process.env.COPY_PATH); 
