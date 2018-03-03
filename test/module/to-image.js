import QrCodeWithLogo from '../../lib' // 注意此行不要直接复制，应使用下一行
// import QrCodeWithLogo from 'qr-code-with-logo'
import { pSingle } from 'p-single'
import Promise from 'es6-promise'

if (typeof window.Promise === 'undefined') {
  window.Promise = Promise
}

const body = document.getElementsByTagName('body')[0]

// 普通
{
  const image = new Image()
  QrCodeWithLogo.toImage({
    image,
    content: 'http://blog.cloudself.cn',
    width: 380,
    nodeQrCodeOptions: {
      color: {
        dark: '#ff4538',
        light: '#d2ffdb'
      },
    },
    logo: {
      src: 'http://closx-shop.oss-cn-qingdao.aliyuncs.com/images/19a4fefb578960a123aa813b28394cb1828162b8.jpg',
      logoRadius: 8,
      borderColor: '#d2ffdb'
    },
  })
  body.appendChild(image)
}

// 生成QrCode并下载
{
  const div = document.createElement('div')
  div.style.width = '380px'
  div.style.height = '380px'
  div.style.lineHeight = '380px'
  div.style.display = 'inline-block'
  div.style.textAlign = 'center'
  div.style.verticalAlign = 'bottom'
  const button = document.createElement('button')
  button.innerText = '点此生成qr-code并下载'
  div.appendChild(button)
  body.appendChild(div)

  // pSingle 可以防止用户重复点击导致的重复下载，去掉pSingle照常运行
  button.onclick = pSingle(() => {
    return QrCodeWithLogo.toImage({
      download: true,
      downloadName: '二维码',
      content: 'http://blog.cloudself.cn',
      width: 1080,
      logo: {
        src: 'http://closx-shop.oss-cn-qingdao.aliyuncs.com/images/19a4fefb578960a123aa813b28394cb1828162b8.jpg',
        logoRadius: 8,
      },
    })
      .then(() => new Promise(resolve => void setTimeout(resolve, 100)))
      .then(() => {
        console.log('生成成功')
      })
  })
}

// 可下载
{
  const image = new Image()
  QrCodeWithLogo.toImage({
    image,
    content: 'http://blog.cloudself.cn',
    width: 380,
    nodeQrCodeOptions: {
      color: {
        dark: '#ff4538',
        light: '#d2ffdb'
      },
    },
    logo: {
      src: 'http://closx-shop.oss-cn-qingdao.aliyuncs.com/images/19a4fefb578960a123aa813b28394cb1828162b8.jpg',
      logoRadius: 8,
      borderColor: '#d2ffdb'
    },
  })
  body.appendChild(image)
}

body.appendChild(document.createElement('div').also(item => {
  item.style.backgroundColor = 'rgb(210, 210, 210)'
  item.style.height = '1px'
  item.style.margin = '18px 0'
}))
