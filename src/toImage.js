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
        downloadName = 'qr-code'
      } = options
      let {
        download
      } = options

      image.src = canvas.toDataURL()

      if (!download) {
        return
      }
      download = Promise.resolve(download)
      return download.then(() => {
        saveImage(image, downloadName)
      })
    })
}

const saveImage = (image, name) => {
  const dataURL = image.src

  const link = document.createElement("a")
  link.download = name;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
