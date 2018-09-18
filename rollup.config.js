import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const watch = {
  include: 'src/**',
  exclude: 'node_modules/**'
}

export default [{
  input: 'index.js',

  output: [
    {
      format: 'cjs',
      exports: 'named',
      file: 'lib/index.js'
    },
    {
      format: 'es',
      file: 'lib/index.esm.js'
    },
    {
      format: 'umd',
      file: 'lib/index.umd.js',
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

  external: ['qrcode']
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
