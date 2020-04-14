const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');

const getRandomBackground = () => {
  const files = fs.readdirSync(path.resolve(__dirname, '../images/'));
  const imgList = files.filter(file => /.*\.jpg$/.test(file));

  return imgList[Math.floor(Math.random() * Math.floor(imgList.length))];
};

const drawImage = (text, image, res) => {
  const img = new Canvas.Image();

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        context.strokeText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
    context.strokeText(line, x, y);
  }

  function wrapTextUp(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ').reverse();
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y -= lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.strokeText(line, x, y);
    context.fillText(line, x, y);
  }

  img.onload = () => {
    const canvas = Canvas.createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    Canvas.registerFont(path.resolve(__dirname, '../fonts/font.ttf'), {family: 'tvp', weight: 'lighter'});

    ctx.drawImage(img, 0, 0);

    ctx.font = '45px tvp';
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0,0,0)';
    ctx.fillStyle = 'rgba(244,244,244,0.96)';
    ctx.textAlign = "center";

    if (text.includes('.')) {
      const splitText = text.split('.').filter(item => item !== '').map(item => item.trim());

      if (splitText.length === 1) {
        wrapText(ctx, splitText[0], 375,800, 700, 55);
      } else if (splitText.length >= 2) {
        wrapText(ctx, splitText[0], 375,300, 700, 55);
        wrapText(ctx, splitText[1], 375,800, 700, 55);
      }
    } else {
      wrapText(ctx, text, 375,800, 700, 55);
    }
    return canvas.pngStream().pipe(res);
  };

  img.src = (path.resolve(__dirname, `../images/${image}`));
};

module.exports = {
  drawImage,
  getRandomBackground
};
