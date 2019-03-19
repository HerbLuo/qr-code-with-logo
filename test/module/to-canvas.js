import QrCodeWithLogo from '../../lib' // 注意此行不要直接复制，应使用下一行
// import QrCodeWithLogo from 'qr-code-with-logo'
import Promise from 'es6-promise'

if (typeof window.Promise === 'undefined') {
  window.Promise = Promise
}

const body = document.getElementsByTagName('body')[0]

// 带 LOGO的
{
  const canvas = document.createElement('canvas')
  QrCodeWithLogo.toCanvas({
    canvas,
    content: 'http://cdn.blog.cloudself.cn',
    width: 380,
    logo: {
      src: 'https://cdn-blog-cloudself-cn.oss-cn-hangzhou.aliyuncs.com/images/avatar.png',
    }
  })
  body.appendChild(canvas)
}

// 带 LOGO的，圆角，满配
{
  const canvas = document.createElement('canvas')
  QrCodeWithLogo.toCanvas({
    canvas,
    content: 'http://blog.cloudself.cn',
    width: 320,
    nodeQrCodeOptions: { // 兼容 node-qrcode
      margin: 4,
      color: {
        dark: '#ff4538',
        light: '#d2ffdb'
      }
    },
    logo: {
      src: 'https://cdn-blog-cloudself-cn.oss-cn-hangzhou.aliyuncs.com/images/avatar.png',
      logoRadius: 14,
      borderRadius: 8,
      borderColor: '#BBBBBB99', // IE下 只能使用 6位的 RGB
      borderSize: 0.06 // 边框大小 相对二维码的比例
    }
  })
  body.appendChild(canvas)
}

// Logo不带白底
{
  const canvas = document.createElement('canvas')
  QrCodeWithLogo.toCanvas({
    canvas,
    content: 'http://blog.cloudself.cn',
    width: 380,
    logo: {
      bgColor: 'transparent',
      src: 'https://cdn-blog-cloudself-cn.oss-cn-hangzhou.aliyuncs.com/images/avatar.png',
      logoRadius: 8
    }
  })
  body.appendChild(canvas)
}

// 不带LOGO
{
  const canvas = document.createElement('canvas')
  QrCodeWithLogo.toCanvas({
    canvas,
    content: 'http://blog.cloudself.cn',
    width: 380,
  })
  body.appendChild(canvas)
}

// 错误级别
{
  const content = 'http://cloudself.cn'
  const canvasHighCL = document.createElement('canvas')
  QrCodeWithLogo.toCanvas({
    canvas: canvasHighCL,
    content,
    nodeQrCodeOptions: {
      errorCorrectionLevel: 'L'
    }
  })
  const canvasLowCL = document.createElement('canvas')
  QrCodeWithLogo.toCanvas({
    canvas: canvasLowCL,
    content,
    nodeQrCodeOptions: {
      errorCorrectionLevel: 'H'
    }
  })
  body.appendChild(canvasHighCL)
  body.appendChild(canvasLowCL)
}

const divEl = document.createElement('div');
// noinspection JSValidateTypes
divEl.style = "background-color: rgb(210, 210, 210);height: 1px; margin: 18px 0";
body.appendChild(divEl)
