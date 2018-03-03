import { toCanvas } from './toCanvas'
import { isString } from './utils'

export const toImage = (options) => {
  const canvas = document.createElement('canvas')
  options.canvas = canvas
  if (options.logo) {
    if (isString(options.logo)) {
      options.logo = { src: options.logo }
    }
    options.logo.crossOrigin = 'Anonymous'
  }
  return toCanvas(options)
    .then(() => {
      const {
        image = new Image(),
        download
      } = options
      image.src = canvas.toDataURL('image/png')
    })
    .catch(it => console.error(it))
}
