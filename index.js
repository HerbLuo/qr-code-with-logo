/**
 * 对 QRCode 的再封装
 * qrCode
 * change logs:
 * 2018/1/24 herbluo created
 */
import QRCode from 'qrcode'

const logoSize = 0.2

// main
const getCanvasOfQrCodeWithLogo = ({canvas, content, width = 0, logo}) => {
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
      logo.width = width * logoSize
      logo.xy = width * (1 - logoSize) / 2
      return drawLogo(canvas, logo)
    })
}

/**
 * copy自
 * http://blog.csdn.net/bdss58/article/details/67151775
 */
const promisify = (f) => {
  return function () {
    const args = Array.prototype.slice.call(arguments)
    return new Promise(function (resolve, reject) {
      args.push(function (err, result) {
        if (err) reject(err)
        else resolve(result)
      })
      f.apply(null, args)
    })
  }
}

const toCanvas = promisify(QRCode.toCanvas)

// 对于内容少的QrCode，增大容错率
const getErrorCorrectionLevel = (content) => {
  if (content.length > 36) {
    return 'M'
  } else if (content.length > 16) {
    return 'Q'
  } else {
    return 'H'
  }
}

// 得到原QrCode的大小，以便缩放得到正确的QrCode大小
const getOriginWidth = (content, errorCorrectionLevel) => {
  const _canvas = document.createElement('canvas')
  return toCanvas(_canvas, content, {errorCorrectionLevel})
    .then(() => _canvas.width)
}

// 绘制Logo
const drawLogo = (canvas, {
  src,
  bgColor = '#ffffff',
  crossOrigin,
  radius = 0,

  width: wh,
  xy,
}) => {
  const ctx = canvas.getContext('2d')

  return Promise.resolve()
    .then(() => {
      ctx.fillStyle = bgColor
      ctx.fillRect(xy, xy, wh, wh)
    })
    .then(() => new Image().also(image => {
      if (crossOrigin || radius) {
        image.setAttribute('crossOrigin', 'Anonymous')
      }
      image.src = src
    }))
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
  toCanvas: getCanvasOfQrCodeWithLogo
}
export default QrCodeWithLogo
