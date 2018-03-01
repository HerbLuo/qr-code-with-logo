/**
 * 对 QRCode 的再封装
 * qrCode
 * change logs:
 * 2018/1/24 herbluo created
 */
import {drawLogo} from './draw-logo'
import {renderQrCode} from './draw-canvas'

const getCanvasOfQrCodeWithLogo = (options) => {
  return renderQrCode(options)
    .then(() => options)
    .then(drawLogo)
}

const toImage = (options) => {
  const canvas = document.createElement('canvas')
  options.canvas = canvas
  return getCanvasOfQrCodeWithLogo(options)
    .then(() => {
      const {
        image = new Image(),
        download
      } = options
      image.src = canvas.toDataURL('image/png')
      console.log(canvas)
    })
}

const QrCodeWithLogo = {
  toCanvas: getCanvasOfQrCodeWithLogo,
  toImage
}
export default QrCodeWithLogo
