## A tool for generating QR code with logo   

[中文](./README.md) | English

repackage from [node-qrcode](https://github.com/soldair/node-qrcode)，support logo and size adjustment

![Example Picture](https://raw.githubusercontent.com/HerbLuo/qr-code-with-logo/master/qr-code-with-logo-screenshot-v2.png)

___

### Works on
- on npm，
- on `<script>`
- on vue
- on react
- on IE9+
- etc
___

### Usage：
#### npm:
```bash
npm i --save qr-code-with-logo
```

```javascript
import QrCodeWithLogo from 'qr-code-with-logo'

const myCanvas = document.createElement('canvas')
document.getElementsByTagName('body')[0].appendChild(canvas)

QrCodeWithLogo.toCanvas({
  canvas: myCanvas,
  content: 'https://cdn.blog.cloudself.cn',
  width: 380,
  logo: {
    src: 'https://cdn.blog.cloudself.cn/images/avatar.png',
    radius: 8
  }
})
```

#### Browser
download [qr-code-with-logo.browser.min.js](https://raw.githubusercontent.com/HerbLuo/qr-code-with-logo/master/lib/qr-code-with-logo.browser.min.js)  
```html
<canvas id="canvas"></canvas>

<!-- dependent on es6 promise -->
<script src="//www.promisejs.org/polyfills/promise-6.1.0.js"></script>
<!-- put the js file to js folder -->
<script src="./js/qr-code-with-logo.browser.min.js"></script>
<script>
  QrCodeWithLogo.toCanvas({
    canvas: document.getElementById('canvas'), // use your canvas node to replace it
    content: 'https://cdn.blog.cloudself.cn/',
    width: 380,
    logo: {
      src: 'https://cdn.blog.cloudself.cn/images/avatar.png',
    }
  })
</script>
```

### API  

**Canvas format**
```javascript
QrCodeWithLogo.toCanvas({/* CanvasOptions */})
  .then(_ => console.log('success'))
```

the options of `toCanvas` is an object, it includes special options [CanvasOptions](#1-canvasoptions), and common options [BaseOptions](#3-baseoptions).  

**Image format**, and it is based on canvas too  
```javascript
QrCodeWithLogo.toImage({/* ImageOptions */})
  .then(_ => console.log('success'))
```

the options of `toImage` is an object, it includes special options [ImageOptions](#2-imageoptions), and common options [BaseOptions](#3-baseoptions).  

##### 1. CanvasOptions

**`canvas`**  

Type: `DOMElement`  

Canvas where to draw QR Code.  


##### 2. ImageOptions

**`image`**  

Type: `DOMElement`  

Optional, image where to draw QR Code, it must be an `<image>`.  


**`download`**  

Type: `boolean`  
Default: `false`  

Optional, specify downloading image immediately.   


**`downloadName`**  

Type: `string`  
Default: `qr-code.png`  

Optional, the png-file's name of QR code.


##### 3. BaseOptions

**`content`**  

Type: `string`  

Content text of QR code.  


**`width`**  

Type: `number`  
Default: `0` 

Optional, width of QR code (automatic size by default).  


**`logo`**  

Type: `string | Logo` Note: `Logo` is an object

Optional, logo src or the [Logo Options](#logo-options).  
  
  
**`nodeQrCodeOptions`**  

Type: `NodeQrCodeOptions`  

Optional, this project is based on `node-qrcode`, and compatible with [node-qrcode options](https://github.com/soldair/node-qrcode#qr-code-options), 
there is an excerpt commonly used options [excerpts of node-qrcode options](#excerpts-of-node-qrcode-options).




###### Logo Options

* `src`  

  Type: `string`  
  
  Src of logo image.  
  Note: If the image is storing in a foreign origin, the canvas can not toDataURL before enable CORS for your image.   
  
* `crossOrigin`  

  Type: `string`  
  Default: `'Anonymous'`
  
  Optional, usually do do need to modify.  
  
* `logoRadius`  

  Type: `number`
    
  Optional, radius of the logo, it may lead the logo to fail to load.  
  
* `logoSize`  

  Type: `number`
  Default: `0.15`
    
  Optional, size of logo, the value is between `0` and `1` indicating the proportion of logo in the QR code.  
  The relation of `logoSize` and `borderSize` just like `content-box`.  
    
* `borderRadius`  

  Type: `number`
  Default: `8`
 
  Optional, radius of logo's border.  
  
* `borderSize`  

  Type: `number`
  Default: `0.05`
    
  Optional, size of logo, the value is between `0` and `1` indicating the proportion of border in the QR code.  
  The relation of `logoSize` and `borderSize` just like `content-box`.  
  
* `bgColor`  

  Alias: `borderColor`  
  Type: `string`  
  Default: `'#ffffff'`
  
  Optional, background color of logo, it can be 'transparent'.  


###### Excerpts of node-qrcode options

* `margin`  

  Type: `number`  
  Default: `4`
  
  Optional, define how much wide the quiet zone should be.  
  
* `color.dark`  

  Type: `string`  
  Default: `'#000000ff'`  
  
  Optional, color of dark module. Value must be in hex format (RGBA or RGB, the RGBA is not support on IE browser).  
  Note: dark color should always be darker than color.light.  
  
* `color.light`  

  Type: `string`  
  Default: `'#000000ff'`
  
  Optional, color of light module. Value must be in hex format (RGBA or RGB, the RGBA is not support on IE browser)  
  
_____

### Others

_____

1. If the console output `"Promise" is undefined`,  
   add the following code.
   ```javascript
   import Promise from 'es6-promise'
   if (typeof window.Promise === 'undefined') {
     window.Promise = Promise
   }
   ```
   
`document version 0.0.1`
