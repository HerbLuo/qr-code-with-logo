## 带Logo的QR Code(二维码)生成工具  

中文 | [English](./README-en.md)

对[node-qrcode](https://github.com/soldair/node-qrcode)的再封装，支持Logo，支持调整大小

![Example Picture](https://raw.githubusercontent.com/HerbLuo/qr-code-with-logo/master/qr-code-with-logo-screenshot-v5.png)

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
##### 1.`npm`:
```bash
npm i --save qr-code-with-logo
```

```javascript
import QrCodeWithLogo from 'qr-code-with-logo'
import LocalImage from './Avatar.png'

const myCanvas = document.createElement('canvas')
document.getElementsByTagName('body')[0].appendChild(canvas)

QrCodeWithLogo.toCanvas({
  canvas: myCanvas,
  content: 'https://cdn.blog.cloudself.cn',
  width: 380,
  logo: {
    src: LocalImage,
    // src: 'https://cdn.blog.cloudself.cn/images/avatar.png',
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
    content: 'https://cdn.blog.cloudself.cn/',
    width: 380,
    logo: {
      src: 'https://cdn.blog.cloudself.cn/images/avatar.png',
    }
  })
</script>
```

____

#### 三、API  

目前只能将QrCode转换成Canvas输出
```javascript
QrCodeWithLogo.toCanvas({/* CanvasOptions */})
  .then(_ => console.log('success'))
```
或者将QrCode转换成Image输出，不过它也是基于Canvas的  
```javascript
QrCodeWithLogo.toImage({/* ImageOptions */})
  .then(_ => console.log('success'))
```

其中toCanvas的参数为一个对象，它包含特有的属性 [CanvasOptions](#1-canvasoptions)，以及公共的属性 [BaseOptions](#3-baseoptions)  

toImage的参数同为一个对象，它包含特有的属性 [ImageOptions](#2-imageoptions)，以及公共的属性 [BaseOptions](#3-baseoptions)  


##### 1. CanvasOptions

**`canvas`**  

Type: `DOMElement`  

配置dom节点，只允许为`<canvas>`，不可为`<div>`等  


##### 2. ImageOptions

**`image`**  

Type: `DOMElement`  

可选的，配置dom节点，只允许为`<image>`，不可为`<div>`等  


**`download`**  

Type: `boolean`  
Default: `false`  

可选，为true的时候，以文件的形式输出  


**`downloadName`**  

Type: `string`  
Default: `qr-code.png`  

可选，下载时，图片的文件名


##### 3. BaseOptions

**`content`**  

Type: `string`  

二维码的内容  


**`width`**  

Type: `number`  
Default: `0` 

可选，二维码的宽度(默认会随二维码内容的长度自动调整大小)  


**`logo`**  

Type: `string | Logo` `Logo`为js对象

可选，可以为字符串（代表src），也可以为对象，其中Logo对象的具体属性有  

* `src`  

  Type: `string`  
  
  Logo地址，（可以是远程的，也可以是本地的base64图片）当存在跨域时，该二维码（canvas）无法 toDataURL，亦无法使用JS转换成 `image`
  
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
    
  可选，border的 大小，范围在 `0-1`之间，代表border在二维码中的比例
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

* `errorCorrectionLevel`

  Type: 'L' | 'M' | 'Q' | 'H'
  
  二维码容错率，  
  默认情况下，  
  当二维码文本长度大余36字符，采用 M(中)，  
  小于16，采用 H(高)，  
  否则采用Q   
  
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
