const mix = require('laravel-mix');
const path = require('path');
const { exec } = require('child_process');

mix
  .js('./src/main.js', './theme-extension/assets/product-builder.bundle.js')
  .js('./src/main-v2.js', './theme-extension/assets/product-builder-v2.bundle.js')
  .js('./src/funnel.js', './theme-extension/assets/funnel-builder.bundle.js')
  .react()
  .sass('./src/scss/main.scss', 'product-builder.bundle.css')
  .sass('./src/scss/main-v2.scss', 'product-builder-v2.bundle.css')
  .sass('./src/scss/funnel.scss', 'funnel-builder.bundle.css')
  .setPublicPath('./theme-extension/assets/')
  .options({
    terser: {
      extractComments: false,
    },
  })

if (process.env.COPY_PATH) {
  mix.webpackConfig({
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tapAsync('RoboCopyPlugin', (_compilation, callback) => {
            const src = path.resolve(__dirname, './theme-extension');
            const dest = path.resolve(__dirname, process.env.COPY_PATH);
            // robocopy exit codes 0-7 are success (bit flags for files copied, skipped, etc.)
            exec(`robocopy "${src}" "${dest}" /E /IS /IT /IM /NP /NFL /NDL`, (err) => {
              if (err && err.code > 7) {
                console.error('[RoboCopy] Copy failed with code:', err.code);
              } else {
                console.log('[RoboCopy] Theme extension synced to:', dest);
              }
              callback();
            });
          });
        }
      }
    ]
  });
}
