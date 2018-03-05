/**
 *
 * helpers
 * change logs:
 * 2018/2/28 herbluo created
 */
export const drawLogo = ({
  canvas,
  content,
  logo
}) => {
  if (!logo) {
    return
  }

  const canvasWidth = canvas.width
  const {
    logoSize = 0.15,
    borderColor,
    bgColor = borderColor || '#ffffff',
    borderSize = 0.05,
    crossOrigin,
    borderRadius = 8,
    logoRadius = 0,
  } = logo
  let logoSrc = typeof logo === 'string' ? logo : logo.src
  let logoWidth = canvasWidth * logoSize
  let logoXY = canvasWidth * (1 - logoSize) / 2
  let logoBgWidth = canvasWidth * (logoSize + borderSize)
  let logoBgXY = canvasWidth * (1 - logoSize - borderSize) / 2

  const ctx = canvas.getContext('2d')

  // logo 底色
  canvasRoundRect(ctx)(logoBgXY, logoBgXY, logoBgWidth, logoBgWidth, borderRadius)
  ctx.fillStyle = bgColor
  ctx.fill()

  // logo
  const image = new Image()
  if (crossOrigin || logoRadius) {
    image.setAttribute('crossOrigin', crossOrigin || 'anonymous')
  }
  image.src = logoSrc

  // 使用image绘制可以避免某些跨域情况
  const drawLogoWithImage = (image) => {
    ctx.drawImage(image, logoXY, logoXY, logoWidth, logoWidth)
  }

  // 使用canvas绘制以获得更多的功能
  const drawLogoWithCanvas = (image) => {
    const canvasImage = document.createElement('canvas')
    canvasImage.width = logoXY + logoWidth
    canvasImage.height = logoXY + logoWidth
    canvasImage.getContext('2d').drawImage(image, logoXY, logoXY, logoWidth, logoWidth)

    canvasRoundRect(ctx)(logoXY, logoXY, logoWidth, logoWidth, logoRadius)
    ctx.fillStyle = ctx.createPattern(canvasImage, 'no-repeat')
    ctx.fill()
  }

  // 将 logo绘制到 canvas上
  return new Promise(((resolve, reject) => {
    image.onload = () => {
      logoRadius ? drawLogoWithCanvas(image) : drawLogoWithImage(image)
      resolve()
    }
  }))
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
