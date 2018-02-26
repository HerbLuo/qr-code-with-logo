import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const watch = {
  include: 'index.js',
  exclude: 'node_modules/**'
}

export default [{
  input: 'index.js',

  output: [
    {
      format: 'cjs',
      exports: 'named',
      file: 'lib/index.common.js'
    },
    {
      format: 'es',
      file: 'lib/index.esm.js'
    },
    {
      format: 'umd',
      file: 'lib/index.js',
      name: 'QrCodeWithLogo',
      globals: {
        'qrcode': 'QRCode',
        'QrCodeWithLogo': 'QrCodeWithLogo'
      }
    }
  ],

  watch,

  plugins: [
    babel()
  ],

  external: ['qrcode', 'es6-promisify']
}, {
  input: 'index.js',

  output: [
    {
      format: 'umd',
      file: 'lib/qr-code-with-logo.browser.min.js',
      name: 'QrCodeWithLogo',
      globals: {
        'QrCodeWithLogo': 'QrCodeWithLogo'
      }
    }
  ],

  watch,

  plugins: [
    resolve({browser: true}),
    commonjs(),
    babel(),
    uglify()
  ],

  external: []
}]