import QrCodeWithLogo from '../../lib' // 注意此行不要直接复制，应使用下一行
// import QrCodeWithLogo from 'qr-code-with-logo'
import {pSingle} from 'p-single'
import Promise from 'es6-promise'

if (typeof window.Promise === 'undefined') {
  window.Promise = Promise
}

const body = document.body

// 普通
{
  const image = new Image()
  QrCodeWithLogo.toImage({
    image,
    content: 'http://cdn.blog.cloudself.cn',
    width: 380,
    nodeQrCodeOptions: {
      color: {
        dark: '#ff4538',
        light: '#d2ffdb'
      }
    },
    logo: {
      src: 'http://closx-shop.oss-cn-qingdao.aliyuncs.com/images/19a4fefb578960a123aa813b28394cb1828162b8.jpg',
      logoRadius: 8,
      borderColor: '#d2ffdb'
    }
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
        logoRadius: 8
      }
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
  let startDownload
  QrCodeWithLogo.toImage({
    image,
    content: 'http://blog.cloudself.cn',
    width: 380,
    download: (_startDownload) => {
      startDownload = _startDownload
    },
    nodeQrCodeOptions: {
      color: {
        dark: '#ff4538',
        light: '#d2ffdb'
      }
    },
    logo: {
      src: 'http://closx-shop.oss-cn-qingdao.aliyuncs.com/images/19a4fefb578960a123aa813b28394cb1828162b8.jpg',
      logoRadius: 8,
      borderColor: '#d2ffdb'
    }
  }).catch(e => console.error(e))

  const div = document.createElement('div')
  div.style.display = 'inline-block'
  div.style.position = 'relative'

  // 悬浮下载层
  const hover = document.createElement('div')
  hover.className = '-qr-code-download-hover'
  hover.style.position = 'absolute'
  hover.style.top = '0'
  hover.style.left = '0'
  hover.style.width = '380px'
  hover.style.height = '380px'
  hover.style.display = 'flex'
  hover.style.justifyContent = 'center'
  hover.style.alignItems = 'center'
  hover.style.cursor = 'pointer'
  hover.innerHTML = `
  <button class="-qr-code-download">点击下载该二维码</button>
  `
  const style = document.createElement('style')
  const styleStr = `
  .-qr-code-download {
    cursor: pointer;
    border: 0;
    width: 80px;
    height: 80px;
    border-radius: 8px;
    outline: none;
    background-color: #fffffff5
  }
  .-qr-code-download:hover {
    background-color: #f5f5f5
  }
  .-qr-code-download-hover {
    background-color: #11111111
  }
  `
  style.type = 'text/css'
  if (style.styleSheet) {
    style.styleSheet.cssText = styleStr
  } else {
    style.innerHTML = styleStr
  }
  document.head.appendChild(style)

  // 添加鼠标悬浮显示事件
  hover.style.display = 'none'
  div.onmouseover = () => {
    hover.style.display = 'flex'
  }
  div.onmouseout = () => {
    hover.style.display = 'none'
  }

  hover.onclick = () => {
    startDownload()
  }

  div.appendChild(image)
  div.appendChild(hover)
  body.appendChild(div)
}

body.appendChild(document.createElement('div').also(item => {
  item.style.backgroundColor = 'rgb(210, 210, 210)'
  item.style.height = '1px'
  item.style.margin = '18px 0'
}))
