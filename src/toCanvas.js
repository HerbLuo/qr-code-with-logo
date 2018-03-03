import { renderQrCode } from './draw-canvas'
import { drawLogo } from './draw-logo'

export const toCanvas = (options) => {
  return renderQrCode(options)
    .then(() => options)
    .then(drawLogo)
}