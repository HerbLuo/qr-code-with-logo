/**
 * 对 QRCode 的再封装
 * qrCode
 * change logs:
 * 2018/1/24 herbluo created
 */
import {drawLogo} from './draw-logo'
import {renderQrCode} from './draw-canvas'

const getCanvasOfQrCodeWithLogo = (payload) => {
  return renderQrCode(payload)
    .then(() => payload)
    .then(drawLogo)
}

const QrCodeWithLogo = {
  toCanvas: getCanvasOfQrCodeWithLogo
}
export default QrCodeWithLogo
