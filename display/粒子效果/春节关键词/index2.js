function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function randomColor() {
  return `rgb(${Math.round(rand(0, 255))}, ${Math.round(
    rand(0, 255)
  )}, ${Math.round(rand(0, 255))})`;
}
function splitKeyList(text) {
  console.log(text);
  let keyList = text.split(",");
  if (keyList.length === 1) {
    keyList = text.split("，");
  }
  if (keyList.length === 1) {
    keyList = text.split(" ");
  }
  return keyList;
}
// 春节颜色库
const colorList = [
  "#FFC0CB",
  "#00FFFF",
  "#CC0033",
  "#FFCC00",
  "#FF9900",
  "#33FF00",
  "#FF69B4",
  "#4169E1",
  "#7FFFAA",
  "#90EE90",
  "#FFD700",
  "#FFA500",
  "#FF4500",
  "#CC3300",
  "#FF6633",
  "#990033",
];
// 默认关键词
const defaultKeyList = [
  "👨‍👩‍👦,🕕,🏮,🕖,🤝,👨‍👨‍👦‍👦,🍬,🥜,🥰",
  "👨‍👩‍👦,🥟,📺,👏,🕛,🌉,🧨,🧧",
  "👨‍👨‍👧‍👦,🥟,📺,🕛,广场,🧨,🎇,🙏",
  "👨‍👨‍👧‍👦,📺,🦠,🛌,🥼,🦸🏻,🏆,致敬",
  "🐅,小包,🥂,老铁,🥟,🍬,🤓",
];
let timer = null;
class Particle {
  constructor(particle) {
    // 当前坐标
    this.x = particle.x;
    this.y = particle.y;
    // 目标点坐标
    this.tx = particle.tx;
    this.ty = particle.ty;
    this.radius = particle.radius || 2;
    this.color = particle.color || "#F00000";
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    return this;
  }
}

// 传入粒子对象绘制动画帧，并接受一个动画结束的回调
function drawFrame(particles, finished) {
  timer = window.requestAnimationFrame(() => {
    drawFrame(particles, finished);
  });
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 缓动系数
  const easing = 0.10;
  const finishedParticles = particles.filter((particle) => {
    // 当前坐标和目标点之间的距离
    const dx = particle.tx - particle.x;
    const dy = particle.ty - particle.y;
    // 速度
    let vx = dx * easing;
    let vy = dy * easing;

    // 当距离小于0.1表示粒子已完成动画
    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
      particle.finished = true;
      particle.x = particle.tx;
      particle.y = particle.ty;
    } else {
      particle.x += vx;
      particle.y += vy;
    }
    particle.draw(ctx);
    return particle.finished;
  });

  if (finishedParticles.length === particles.length) {
    window.cancelAnimationFrame(timer);
    finished && finished();
  }

  return particles;
}

// 获取目标对象的像素点，interval 控制像素点数量，值越大返回的像素点越少
function getWordPxInfo(target, interval = 5) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const viewWidth = window.innerWidth * 0.5;
  const viewHeight = window.innerHeight * 0.5;
  if (window.innerWidth < 1080) {
    interval = 3;
  }
  canvas.width = viewWidth;
  canvas.height = viewHeight;

  if (typeof target === "string") {
    // 绘制文字
    const textWidth = viewWidth / 2.5;
    ctx.font = `${
      target.length < 3 ? textWidth : (textWidth * 3) / (1 + target.length)
    }px bold`;
    const color = colorList[rand(0, colorList.length)];
    ctx.fillStyle = color;
    console.log(color);
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(target, viewWidth / 2, viewHeight / 2);
  } else {
    // 绘制图片
    ctx.drawImage(
      target,
      (viewWidth - target.width) / 2,
      (viewHeight - target.height) / 2,
      target.width,
      target.height
    );
  }

  // 获取像素数据
  const { data, width, height } = ctx.getImageData(0, 0, viewWidth, viewHeight);
  const pixeles = [];
  // 遍历像素数据，用interval减少取到的像素数据
  for (let x = 0; x < width; x += interval) {
    for (let y = 0; y < height; y += interval) {
      const pos = (y * width + x) * 4; // 每个像素点由 rgba 四个值组成，所以需要乘以4才能得到正确的位置
      // 只提取 rgba 中透明度大于0.5的像素，imageData 里 aplha 128等于 rgba 中 alpha 的 0.5
      if (data[pos + 3] > 128) {
        pixeles.push({
          x,
          y,
          rgba: [data[pos], data[pos + 1], data[pos + 2], data[pos + 3]],
        });
      }
    }
  }
  return pixeles;
}

// 创建粒子
function createParticles({ text, radius, interval }) {
  const pixeles = getWordPxInfo(text, interval);
  return pixeles.map(({ x, y, rgba: color }) => {
    return new Particle({
      x: Math.random() * (50 + window.innerWidth * 0.5) - 50,
      y: Math.random() * (50 + window.innerHeight * 0.5) - 50,
      tx: x,
      ty: y,
      radius,
      color: `rgba(${color})`,
    });
  });
}

function loop(words, i = 0) {
  return drawFrame(
    createParticles({ text: words[i], radius: 2, interval: 4 }),
    () => {
      i++;
      if (i < words.length && words[i].length > 0) {
        loop(words, i);
      }
    }
  );
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.5;
canvas.height = window.innerHeight * 0.5;

const uiInput = document.getElementsByClassName("ui-input")[0];
uiInput.addEventListener("keydown", function (event) {
  const keyCode = event.keyCode
    ? event.keyCode
    : event.which
    ? event.which
    : event.charCode; //解决浏览器之间的差异问题
  if (keyCode === 13) {
    if (!uiInput.value) {
      alert("请输入你的关键词");
      window.cancelAnimationFrame(timer);
      loop(splitKeyList(defaultKeyList[rand(0, defaultKeyList.length)]));
    } else {
      window.cancelAnimationFrame(timer);
      loop(splitKeyList(uiInput.value));
    }
  }
});
loop(splitKeyList(defaultKeyList[rand(0, defaultKeyList.length)]));
