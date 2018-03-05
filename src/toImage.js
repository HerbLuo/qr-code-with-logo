import { toCanvas } from './toCanvas'
import {isFunction, isString} from './utils'

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

      if (download !== true && !isFunction(download)) {
        return
      }
      download = download === true ? (start) => start() : download

      const startDownload = () => {
        saveImage(image, downloadName)
      }
      download(startDownload)
    })
}

const saveImage = (image, name) => {
  const dataURL = image.src

  const link = document.createElement("a")
  link.download = name
  link.href = dataURL
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
