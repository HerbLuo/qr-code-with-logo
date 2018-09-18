import QrCodeWithLogo from '../../lib' // 注意此行不要直接复制，应使用下一行
// import QrCodeWithLogo from 'qr-code-with-logo'
import Promise from 'es6-promise'
import LocalImage from './AvatarGitHub.png'

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
      src: LocalImage,
    }
  })
  body.appendChild(canvas)
}
