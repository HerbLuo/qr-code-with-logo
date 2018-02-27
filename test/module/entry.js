/**
 *
 * entry
 * change logs:
 * 2018/2/26 herbluo created
 */
import QrCodeWithLogo from '../../lib'
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
    content: 'http://blog.cloudself.cn',
    width: 380,
    logo: {
      src: 'http://closx-shop.oss-cn-qingdao.aliyuncs.com/images/19a4fefb578960a123aa813b28394cb1828162b8.jpg',
    }
  })
  body.appendChild(canvas)
}

// 带 LOGO的，圆角
{
  const canvas = document.createElement('canvas')
  QrCodeWithLogo.toCanvas({
    canvas,
    content: 'http://blog.cloudself.cn',
    width: 320,
    logo: {
      src: 'http://closx-shop.oss-cn-qingdao.aliyuncs.com/images/19a4fefb578960a123aa813b28394cb1828162b8.jpg',
      radius: 18
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
      src: 'http://closx-shop.oss-cn-qingdao.aliyuncs.com/images/19a4fefb578960a123aa813b28394cb1828162b8.jpg',
      radius: 8
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

