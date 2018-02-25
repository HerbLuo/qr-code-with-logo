(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('qrcode'), require('es6-promisify')) :
	typeof define === 'function' && define.amd ? define(['qrcode', 'es6-promisify'], factory) :
	(global.QrCodeWithLogo = factory(global.QRCode,global.es6Promisify));
}(this, (function (QRCode,es6Promisify) { 'use strict';

QRCode = QRCode && QRCode.hasOwnProperty('default') ? QRCode['default'] : QRCode;

/**
 * 对 QRCode 的再封装
 * qrCode
 * change logs:
 * 2018/1/24 herbluo created
 */

var getCanvasOfLogoQrCodeWithLogo = function getCanvasOfLogoQrCodeWithLogo(_ref) {
  var canvas = _ref.canvas,
      content = _ref.content,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 0 : _ref$width,
      logo = _ref.logo;

  var errorCorrectionLevel = void 0;
  if (content.length > 36) {
    errorCorrectionLevel = 'M';
  } else if (content.length > 16) {
    errorCorrectionLevel = 'Q';
  } else {
    errorCorrectionLevel = 'H';
  }

  // 取得绘制出的QrCode的原大小，然后按比例缩放
  return getOriginWidth(content, function (_o) {
    (function (it) {
      return console.log(it);
    })(_o);

    return _o;
  }(errorCorrectionLevel))
  // 绘制QrCode
  .then(function (_width) {
    return toCanvas(canvas, content, {
      scale: width === 0 ? undefined : width / _width * 4,
      errorCorrectionLevel: errorCorrectionLevel
    });
  })
  // 绘制Logo
  .then(function () {
    if (!logo) {
      return;
    }

    logo = typeof logo === 'string' ? {
      src: logo
    } : logo;
    logo.width = width * 0.24;
    logo.xy = width * 0.38;
    return drawLogo(canvas, logo);
  });
};

var toCanvas = es6Promisify.promisify(QRCode.toCanvas);

var getOriginWidth = function getOriginWidth(content, errorCorrectionLevel) {
  var _canvas = document.createElement('canvas');
  return toCanvas(_canvas, content, { errorCorrectionLevel: errorCorrectionLevel }).then(function () {
    return _canvas.width;
  });
};

var drawLogo = function drawLogo(canvas, _ref2) {
  var src = _ref2.src,
      wh = _ref2.width,
      xy = _ref2.xy,
      _ref2$radius = _ref2.radius,
      radius = _ref2$radius === undefined ? 0 : _ref2$radius,
      crossOrigin = _ref2.crossOrigin;

  var ctx = canvas.getContext('2d');

  return Promise.resolve().then(function () {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(xy, xy, wh, wh);
  })
  // 生成一个Image对象
  .then(function () {
    return function (_o) {
      (function (image) {
        if (crossOrigin || radius) {
          image.setAttribute('crossOrigin', 'Anonymous');
        }
        image.src = src;
      })(_o);

      return _o;
    }(new Image());
  })
  // 将上述Image对象（Logo）绘制到画布上
  .then(function (image) {
    var sub = wh * 0.28;
    var xy2 = xy + sub / 2;
    var wh2 = wh - sub;

    var drawLogoWithCanvas = function drawLogoWithCanvas(image) {
      return function () {
        var canvasImage = document.createElement('canvas');
        canvasImage.width = xy + wh;
        canvasImage.height = xy + wh;
        canvasImage.getContext('2d').drawImage(image, xy2, xy2, wh2, wh2);

        canvasRoundRect(ctx)(xy2, xy2, wh2, wh2, radius);
        ctx.fillStyle = ctx.createPattern(canvasImage, 'no-repeat');
        ctx.fill();
      };
    };
    var drawLogoWithImage = function drawLogoWithImage(image) {
      return function () {
        ctx.drawImage(image, xy2, xy2, wh2, wh2);
      };
    };
    image.onload = radius ? drawLogoWithCanvas(image) : drawLogoWithImage(image);
  });
};

// copy来的方法，用于绘制圆角
var canvasRoundRect = function canvasRoundRect(ctx) {
  return function (x, y, w, h, r) {
    var minSize = Math.min(w, h);
    if (r > minSize / 2) {
      r = minSize / 2;
    }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    return ctx;
  };
};

var QrCodeWithLogo = {
  toCanvas: getCanvasOfLogoQrCodeWithLogo
};

return QrCodeWithLogo;

})));
