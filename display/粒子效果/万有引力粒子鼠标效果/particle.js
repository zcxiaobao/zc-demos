function rand(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor() {
    this.x = rand(0, canvas.width);
    this.y = rand(0, canvas.height);
    this.vx = rand(-1, 1);
    this.vy = rand(-1, 1);
    this.r = rand(1, 3);
    this.col = `rgba(${Math.round(rand(150, 200))}, ${Math.round(
      rand(100, 255)
    )}, ${Math.round(rand(180, 255))},${1})`;
  }
}

window.onload = function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var centerX, centerY;
  var part_num = 2500;

  var mousedown = false;
  var X, Y;
  var P = [];

  function initVar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    X = centerX;
    Y = centerY;
  }

  function initParticle() {
    for (var i = 0; i < part_num; i++) {
      P.push(new Particle());
    }
  }

  function bg() {
    ctx.fillStyle = "rgba(25,25,30,1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function bounce(b) {
    if (b.x < b.r) {
      b.x = b.r;
      b.vx *= -1;
    }
    if (b.x > canvas.width - b.r) {
      b.x = canvas.width - b.r;
      b.vx *= -1;
    }

    if (b.y - b.r < 0) {
      b.y = b.r;
      b.vy *= -1;
    }
    if (b.y > canvas.height - b.r) {
      b.y = canvas.height - b.r;
      b.vy *= -1;
    }
  }

  function attract(p) {
    var dx = p.x - X,
      dy = p.y - Y,
      dist = Math.sqrt(dx * dx + dy * dy),
      angle = Math.atan2(dy, dx);
    if (dist > 10 && dist < 300) {
      if (!mousedown) {
        p.vx -= (20 / (p.r * dist)) * Math.cos(angle);
        p.vy -= (20 / (p.r * dist)) * Math.sin(angle);
      } else if (mousedown) {
        p.vx += (250 / (p.r * dist)) * Math.cos(angle);
        p.vy += (250 / (p.r * dist)) * Math.sin(angle);
      }
    }
  }

  function draw() {
    var p;
    for (var i = 0; i < P.length; i++) {
      p = P[i];

      if (mouseover) attract(p);
      bounce(p);

      p.x += p.vx;
      p.y += p.vy;

      p.vx *= 0.975;
      p.vy *= 0.975;

      ctx.fillStyle = p.col;
      ctx.fillRect(p.x, p.y, p.r, p.r);
    }
    ctx.strokeStyle = !mousedown ? "rgba(255,255,255,1)" : "rgba(255,0,0,1)";

    ctx.beginPath();
    ctx.moveTo(X, Y - 10);
    ctx.lineTo(X, Y + 10);
    ctx.moveTo(X - 10, Y);
    ctx.lineTo(X + 10, Y);
    ctx.stroke();
  }

  function loop() {
    bg();
    draw();

    window.requestAnimationFrame(loop);
  }
  initVar();
  initParticle();
  loop();

  window.onreinitVar = initVar;

  window.onmousemove = function (e) {
    X = e.clientX;
    Y = e.clientY;
  };

  window.onmousedown = function () {
    mousedown = true;
  };

  window.onmouseup = function () {
    mousedown = false;
  };

  var mouseover = false;

  window.onmouseover = function () {
    mouseover = true;
  };

  window.onmouseout = function () {
    mouseover = false;
  };
};
