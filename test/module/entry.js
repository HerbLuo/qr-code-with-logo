/**
 *
 * entry
 * change logs:
 * 2018/2/26 herbluo created
 */
import qrCodeWithLogo from '../../lib'

const body = document.getElementsByTagName('body')[0]

// 带 LOGO的，圆角
{
  const canvas = document.createElement('canvas')
  qrCodeWithLogo.toCanvas({
    canvas,
    content: 'http://blog.cloudself.cn',
    width: 380,
    logo: {
      src: 'http://blog.cloudself.cn/images/avatar.png',
      radius: 6
    }
  })
  body.appendChild(canvas)
}
