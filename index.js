/**
 * 对 QRCode 的再封装
 * qrCode
 * change logs:
 * 2018/1/24 herbluo created
 */
import QRCode from 'qrcode'
import { promisify } from 'es6-promisify'

const getCanvasOfLogoQrCodeWithLogo = ({canvas, content, width = 0, logo}) => {
  const errorCorrectionLevel = getErrorCorrectionLevel(content)

  // 取得绘制出的QrCode的原大小，然后按比例缩放
  return getOriginWidth(content, errorCorrectionLevel)
    // 绘制QrCode
    .then(_width => toCanvas(canvas, content, {
      scale: width === 0
        ? undefined
        : width / _width * 4,
      errorCorrectionLevel
    }))
    // 绘制Logo
    .then(() => {
      if (!logo) {
        return
      }

      logo = typeof logo === 'string' ? {
        src: logo
      } : logo
      logo.width = width * 0.2
      logo.xy = width * 0.4
      return drawLogo(canvas, logo)
    })
}

const toCanvas = promisify(QRCode.toCanvas)

const getErrorCorrectionLevel = (content) => {
  if (content.length > 36) {
    return 'M'
  } else if (content.length > 16) {
    return 'Q'
  } else {
    return 'H'
  }
}

const getOriginWidth = (content, errorCorrectionLevel) => {
  const _canvas = document.createElement('canvas')
  return toCanvas(_canvas, content, {errorCorrectionLevel})
    .then(() => _canvas.width)
}

const drawLogo = (canvas, {src, width: wh, xy, radius = 0, crossOrigin}) => {
  const ctx = canvas.getContext('2d')

  return Promise.resolve()
    .then(() => {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(xy, xy, wh, wh)
    })
    // 生成一个Image对象
    .then(() => new Image().also(image => {
      if (crossOrigin || radius) {
        image.setAttribute('crossOrigin', 'Anonymous')
      }
      image.src = src
    }))
    // 将上述Image对象（Logo）绘制到画布上
    .then(image => {
      const sub = wh * 0.28
      const xy2 = xy + (sub / 2)
      const wh2 = wh - sub

      const drawLogoWithCanvas = (image) => () => {
        const canvasImage = document.createElement('canvas')
        canvasImage.width = xy + wh
        canvasImage.height = xy + wh
        canvasImage.getContext('2d').drawImage(image, xy2, xy2, wh2, wh2)

        canvasRoundRect(ctx)(xy2, xy2, wh2, wh2, radius)
        ctx.fillStyle = ctx.createPattern(canvasImage, 'no-repeat')
        ctx.fill()
      }
      const drawLogoWithImage = (image) => () => {
        ctx.drawImage(image, xy2, xy2, wh2, wh2)
      }
      image.onload = radius ? drawLogoWithCanvas(image) : drawLogoWithImage(image)
    })
}

// copy来的方法，用于绘制圆角
const canvasRoundRect = ctx => (x, y, w, h, r) => {
  const minSize = Math.min(w, h)
  if (r > minSize / 2) {
    r = minSize / 2
  }
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
  return ctx
}

const QrCodeWithLogo = {
  toCanvas: getCanvasOfLogoQrCodeWithLogo
}
export default QrCodeWithLogo
