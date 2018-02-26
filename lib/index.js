(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('qrcode')) :
	typeof define === 'function' && define.amd ? define(['qrcode'], factory) :
	(global.QrCodeWithLogo = factory(global.QRCode));
}(this, (function (QRCode) { 'use strict';

QRCode = QRCode && QRCode.hasOwnProperty('default') ? QRCode['default'] : QRCode;

/**
 * 对 QRCode 的再封装
 * qrCode
 * change logs:
 * 2018/1/24 herbluo created
 */

// main
var getCanvasOfQrCodeWithLogo = function getCanvasOfQrCodeWithLogo(_ref) {
  var canvas = _ref.canvas,
      content = _ref.content,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 0 : _ref$width,
      logo = _ref.logo;

  var errorCorrectionLevel = getErrorCorrectionLevel(content);

  // 取得绘制出的QrCode的原大小，然后按比例缩放
  return getOriginWidth(content, errorCorrectionLevel)
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
    logo.width = width * 0.2;
    logo.xy = width * 0.4;
    return drawLogo(canvas, logo);
  });
};

/**
 * copy自
 * http://blog.csdn.net/bdss58/article/details/67151775
 */
var promisify = function promisify(f) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    return new Promise(function (resolve, reject) {
      args.push(function (err, result) {
        if (err) reject(err);else resolve(result);
      });
      f.apply(null, args);
    });
  };
};

var toCanvas = promisify(QRCode.toCanvas);

// 对于内容少的QrCode，增大容错率
var getErrorCorrectionLevel = function getErrorCorrectionLevel(content) {
  if (content.length > 36) {
    return 'M';
  } else if (content.length > 16) {
    return 'Q';
  } else {
    return 'H';
  }
};

// 得到原QrCode的大小，以便缩放得到正确的QrCode大小
var getOriginWidth = function getOriginWidth(content, errorCorrectionLevel) {
  var _canvas = document.createElement('canvas');
  return toCanvas(_canvas, content, { errorCorrectionLevel: errorCorrectionLevel }).then(function () {
    return _canvas.width;
  });
};

// 绘制Logo
var drawLogo = function drawLogo(canvas, _ref2) {
  var src = _ref2.src,
      _ref2$bgColor = _ref2.bgColor,
      bgColor = _ref2$bgColor === undefined ? '#ffffff' : _ref2$bgColor,
      crossOrigin = _ref2.crossOrigin,
      _ref2$radius = _ref2.radius,
      radius = _ref2$radius === undefined ? 0 : _ref2$radius,
      wh = _ref2.width,
      xy = _ref2.xy;

  var ctx = canvas.getContext('2d');

  return Promise.resolve().then(function () {
    ctx.fillStyle = bgColor;
    ctx.fillRect(xy, xy, wh, wh);
  }).then(function () {
    return function (_o) {
      (function (image) {
        if (crossOrigin || radius) {
          image.setAttribute('crossOrigin', 'Anonymous');
        }
        image.src = src;
      })(_o);

      return _o;
    }(new Image());
  }).then(function (image) {
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
  toCanvas: getCanvasOfQrCodeWithLogo
};

return QrCodeWithLogo;

})));
