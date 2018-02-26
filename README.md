### 带Logo的QrCode生成工具  
###### 对[node-qrcode](https://github.com/soldair/node-qrcode)的再封装，支持Logo，支持调整大小

![Example Picture](https://raw.githubusercontent.com/HerbLuo/qr-code-with-logo/master/qr-code-with-logo-screenshot.png)

___

- 支持npm方式引用，
- 支持直接`<script>`方式引用
- 支持vue
- 支持react
- 等

___

#### 使用方法：
##### npm:
```bash
npm i --save qr-code-with-logo
```
```javascript
import QrCodeWithLogo from 'qr-code-with-logo'
QrCodeWithLogo.toCanvas({
  canvas: document.createElement('canvas'),
  content: 'http://blog.cloudself.cn',
  width: 380,
  logo: {
    // 注意该图片文件不能存在跨域问题，
    // 如存在跨域问题，则无法使用 logo.radius, logo.bgColor 等logo下的所有其余属性
    // 且该Canvas不能 toDataURL
    src: 'http://blog.cloudself.cn/images/avatar.png',
    radius: 8
  }
})
document.getElementsByTagName('body')[0].appendChild(canvas)
```

##### `<script>标签形式`, [点此](https://raw.githubusercontent.com/HerbLuo/qr-code-with-logo/master/lib/qr-code-with-logo.browser.min.js)处下载该文件
```html
<!-- 有对 promise的依赖，如不考虑兼容，可尝试删除该依赖 -->
<script src="//www.promisejs.org/polyfills/promise-6.1.0.js"></script>
<!-- 将上方下载的文件放置于js文件夹下 -->
<script src="./js/qr-code-with-logo.browser.min.js"></script>
```

文档待完善，明日继续
