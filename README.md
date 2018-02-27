## 带Logo的QrCode生成工具  
对[node-qrcode](https://github.com/soldair/node-qrcode)的再封装，支持Logo，支持调整大小

![Example Picture](https://raw.githubusercontent.com/HerbLuo/qr-code-with-logo/master/qr-code-with-logo-screenshot.png)

___

#### 一、支持列表
- 支持npm方式引用，
- 支持直接`<script>`方式引用
- 支持vue
- 支持react
- 支持IE9+
- 等
___

#### 二、使用方法：
##### 1.npm:
```bash
npm i --save qr-code-with-logo
```

```javascript
import QrCodeWithLogo from 'qr-code-with-logo'

const myCanvas = document.createElement('canvas')
document.getElementsByTagName('body')[0].appendChild(canvas)

QrCodeWithLogo.toCanvas({
  canvas: myCanvas,
  content: 'http://blog.cloudself.cn',
  width: 380,
  logo: {
    src: 'http://blog.cloudself.cn/images/avatar.png',
    radius: 8
  }
})
```

##### 2.`<script>`标签形式, [点此](https://raw.githubusercontent.com/HerbLuo/qr-code-with-logo/master/lib/qr-code-with-logo.browser.min.js)处下载该文件
```html
<canvas id="canvas"></canvas>

<!-- 有对 promise的依赖，如不考虑兼容，可尝试删除该依赖 -->
<script src="//www.promisejs.org/polyfills/promise-6.1.0.js"></script>
<!-- 将上方下载的文件放置于js文件夹下 -->
<script src="./js/qr-code-with-logo.browser.min.js"></script>
<script>
  QrCodeWithLogo.toCanvas({
    canvas: document.getElementById('canvas'), // 换成你的canvas节点
    content: 'http://blog.cloudself.cn/',
    width: 380,
    logo: {
      src: 'http://blog.cloudself.cn/images/avatar.png',
    }
  })
</script>
```

三、API  
目前只能将QrCode转换成Canvas输出
```javascript
QrCodeWithLogo.toCanvas({/*args*/})
```

其中参数为一个对象，该对象的属性有：

**canvas `Element`**  
配置dom节点，只允许为`<canvas>`，不可为`<div>`等  

**content `string`**  
二维码的内容  

**width `number`**  
可选，二维码的宽度  

**logo `string | Logo`**  
可选，可以为字符串（代表src），也可以为对象，其中Logo对象的具体属性有
*  **src `string`**  
  Logo地址，当存在跨域时，该二维码（canvas）无法 toDataURL，亦无法使用JS转换成 `image`
  
*  **bgColor `string`**,  
  可选，logo的背景色，可以为 'transparent'(透明), 默认为 '#ffffff'
  
*  **crossOrigin `string`**  
  可选，一般不必修改，默认为 'Anonymous'
  
*  **radius `number`**,  
  可选，logo的 borderRadius，存在跨域时，Logo会加载失败，默认为 0

四：其它
* 如果控制台报错 `“Promise”未定义`  
  在添加如下代码即可
  ```javascript
  import Promise from 'es6-promise'
  if (typeof window.Promise === 'undefined') {
    window.Promise = Promise
  }
  ```
