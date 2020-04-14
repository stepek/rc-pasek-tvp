const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');

const getRandomBackground = () => {
  const files = fs.readdirSync(path.resolve(__dirname, '../images/'));
  const imgList = files.filter(file => /.*\.png$/.test(file));

  return imgList[Math.floor(Math.random() * Math.floor(imgList.length))];
};

const drawImage = (text, image, res) => {
  const img = new Canvas.Image();

  img.onload = () => {
    const canvas = Canvas.createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    Canvas.registerFont(path.resolve(__dirname, '../fonts/font.ttf'), {family: 'tvp', weight: 'lighter'});

    ctx.drawImage(img, 0, 0);

    ctx.font = '25px tvp';

    ctx.fillStyle = '#FFF';
    ctx.fillText(text, 141, 352);

    return canvas.pngStream().pipe(res);
  };

  img.src = (path.resolve(__dirname, `../images/${image}`));
};

module.exports = {
  drawImage,
  getRandomBackground
};
