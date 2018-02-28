'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var QRCode = _interopDefault(require('qrcode'));

/**
 *
 * helpers
 * change logs:
 * 2018/2/28 herbluo created
 */
var drawLogo = function drawLogo(_ref) {
  var canvas = _ref.canvas,
      content = _ref.content,
      logo = _ref.logo;

  if (!logo) {
    return;
  }

  var canvasWidth = canvas.width;
  var _logo$logoSize = logo.logoSize,
      logoSize = _logo$logoSize === undefined ? 0.15 : _logo$logoSize,
      borderColor = logo.borderColor,
      _logo$bgColor = logo.bgColor,
      bgColor = _logo$bgColor === undefined ? borderColor || '#ffffff' : _logo$bgColor,
      _logo$borderSize = logo.borderSize,
      borderSize = _logo$borderSize === undefined ? 0.05 : _logo$borderSize,
      crossOrigin = logo.crossOrigin,
      _logo$borderRadius = logo.borderRadius,
      borderRadius = _logo$borderRadius === undefined ? 8 : _logo$borderRadius,
      _logo$logoRadius = logo.logoRadius,
      logoRadius = _logo$logoRadius === undefined ? 0 : _logo$logoRadius;

  var logoSrc = typeof logo === 'string' ? logo : logo.src;
  var logoWidth = canvasWidth * logoSize;
  var logoXY = canvasWidth * (1 - logoSize) / 2;
  var logoBgWidth = canvasWidth * (logoSize + borderSize);
  var logoBgXY = canvasWidth * (1 - logoSize - borderSize) / 2;

  var ctx = canvas.getContext('2d');

  // logo 底色
  canvasRoundRect(ctx)(logoBgXY, logoBgXY, logoBgWidth, logoBgWidth, borderRadius);
  ctx.fillStyle = bgColor;
  ctx.fill();

  // logo
  var image = new Image();
  if (crossOrigin || logoRadius) {
    image.setAttribute('crossOrigin', 'Anonymous');
  }
  image.src = logoSrc;

  var drawLogoWithImage = function drawLogoWithImage(image) {
    return function () {
      ctx.drawImage(image, logoXY, logoXY, logoWidth, logoWidth);
    };
  };

  var drawLogoWithCanvas = function drawLogoWithCanvas(image) {
    return function () {
      var canvasImage = document.createElement('canvas');
      canvasImage.width = logoXY + logoWidth;
      canvasImage.height = logoXY + logoWidth;
      canvasImage.getContext('2d').drawImage(image, logoXY, logoXY, logoWidth, logoWidth);

      canvasRoundRect(ctx)(logoXY, logoXY, logoWidth, logoWidth, logoRadius);
      ctx.fillStyle = ctx.createPattern(canvasImage, 'no-repeat');
      ctx.fill();
    };
  };

  // 将 logo绘制到 canvas上
  image.onload = logoRadius ? drawLogoWithCanvas(image) : drawLogoWithImage(image);
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

/**
 * copy自
 * http://blog.csdn.net/bdss58/article/details/67151775
 * promisify
 * change logs:
 * 2018/2/28 herbluo created
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

/**
 *
 * render
 * change logs:
 * 2018/2/28 herbluo created
 */
var toCanvas = promisify(QRCode.toCanvas);

var renderQrCode = function renderQrCode(_ref) {
  var canvas = _ref.canvas,
      content = _ref.content,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 0 : _ref$width;

  var errorCorrectionLevel = getErrorCorrectionLevel(content);

  return getOriginWidth(content, errorCorrectionLevel).then(function (_width) {
    return toCanvas(canvas, content, {
      scale: width === 0 ? undefined : width / _width * 4,
      errorCorrectionLevel: errorCorrectionLevel
    });
  });
};

// 得到原QrCode的大小，以便缩放得到正确的QrCode大小
var getOriginWidth = function getOriginWidth(content, errorCorrectionLevel) {
  var _canvas = document.createElement('canvas');
  return toCanvas(_canvas, content, { errorCorrectionLevel: errorCorrectionLevel }).then(function () {
    return _canvas.width;
  });
};

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

/**
 * 对 QRCode 的再封装
 * qrCode
 * change logs:
 * 2018/1/24 herbluo created
 */

var getCanvasOfQrCodeWithLogo = function getCanvasOfQrCodeWithLogo(payload) {
  return renderQrCode(payload).then(function () {
    return payload;
  }).then(drawLogo);
};

var QrCodeWithLogo = {
  toCanvas: getCanvasOfQrCodeWithLogo
};

/**
 *
 * index
 * change logs:
 * 2018/2/28 herbluo created
 */

exports.default = QrCodeWithLogo;
