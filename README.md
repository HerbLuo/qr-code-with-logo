## 带Logo的QrCode(二维码)生成工具  
对[node-qrcode](https://github.com/soldair/node-qrcode)的再封装，支持Logo，支持调整大小

![Example Picture](https://raw.githubusercontent.com/HerbLuo/qr-code-with-logo/master/qr-code-with-logo-screenshot-v2.png)

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
[更多示例代码参见此处](https://github.com/HerbLuo/qr-code-with-logo/blob/master/test/module/entry.js)

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

____

#### 三、API  

目前只能将QrCode转换成Canvas输出
```javascript
QrCodeWithLogo.toCanvas({/*args*/})
  .then(_ => void console.log('success'))
```

其中参数为一个对象，该对象的属性有：

**`canvas`**  

Type: `Element`  

配置dom节点，只允许为`<canvas>`，不可为`<div>`等  


**`content`**  

Type: `string`  

二维码的内容  


**`width`**  

Type: `number` 
Default: `0` 

可选，二维码的宽度  


**`logo`**  

Type: `string | Logo` `Logo`为js对象

可选，可以为字符串（代表src），也可以为对象，其中Logo对象的具体属性有  

* `src`  

  Type: `string`  
  
  Logo地址，当存在跨域时，该二维码（canvas）无法 toDataURL，亦无法使用JS转换成 `image`
  
* `crossOrigin`  

  Type: `string`  
  Default: `'Anonymous'`
  
  可选，一般不必修改，默认为 'Anonymous'  
  
* `logoRadius`  

  Type: `number`
    
  可选，logo的 radius，如果配置了它，存在跨域时，Logo可能会加载失败
  
* `logoSize`  

  Type: `number`
  Default: `0.15`
    
  可选，logo的 大小，范围在 `0-1`之间，代表logo在二维码中的比例
  与 `borderSize` 共同组成了 logo的大小，他们的关系相当于标准盒模型  
    
* `borderRadius`  

  Type: `number`
  Default: `8`
 
  可选，logo的边框的 radius
  
* `borderSize`  

  Type: `number`
  Default: `0.05`
    
  可选，border的 大小，范围在 `0-1`之间，代表logo在二维码中的比例
  与 `logoSize` 共同组成了 logo的大小，他们的关系相当于标准盒模型
  
* `bgColor`  

  Alias: `borderColor`  
  Type: `string`  
  Default: `'#ffffff'`
  
  可选，logo的背景色，可以为 'transparent'(透明)   
  
  
**`nodeQrCodeOptions`**  

Type: `NodeQrCodeOptions`  `node-qrcode`的参数，[参见](https://github.com/soldair/node-qrcode#qr-code-options)

可选，本项目基于`node-qrcode`，并对其配置参数兼容，其中常用参数的有

* `margin`  

  Type: `number`  
  Default: `4`
  
  可选，二维码的外边框大小，单位是单块二维码的像素  
  
* `color.dark`  

  Type: `string`  
  Default: `'#000000ff'`  RGBA, IE下仅支持RGB
  
  可选，二维码的前景色  
  
* `color.light`  

  Type: `string`  
  Default: `'#000000ff'`
  
  可选，二维码的背景色  
  
_____

#### 四：其它

_____

1. 如果控制台报错 `“Promise”未定义`  
   添加如下代码即可
   ```javascript
   import Promise from 'es6-promise'
   if (typeof window.Promise === 'undefined') {
     window.Promise = Promise
   }
   ```
