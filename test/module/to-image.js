import QrCodeWithLogo from '../../lib' // 注意此行不要直接复制，应使用下一行
// import QrCodeWithLogo from 'qr-code-with-logo'
import Promise from 'es6-promise'

if (typeof window.Promise === 'undefined') {
  window.Promise = Promise
}

const body = document.getElementsByTagName('body')[0]

// 带 LOGO的
{
  const image = new Image()
  QrCodeWithLogo.toImage({
    image,
    content: 'http://blog.cloudself.cn',
    width: 380,
    logo: 'http://closx-shop.oss-cn-qingdao.aliyuncs.com/images/19a4fefb578960a123aa813b28394cb1828162b8.jpg',
  })
  body.appendChild(image)
}

body.appendChild(document.createElement('div').also(item => {
  item.style.backgroundColor = 'rgb(210, 210, 210)'
  item.style.height = '1px'
  item.style.marginTop = '18px'
}))
