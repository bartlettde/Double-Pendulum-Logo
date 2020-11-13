let r1 = 60;
let r2 = 60;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = 1;
let px2 = -1;
let py2 = -1;
let cx, cy;

let buffer;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function setup() {
  let canvasWidth = 350
  let canvasHeight = 350

  let cnv = createCanvas(canvasWidth, canvasHeight);
  pixelDensity(1);
  a1 = PI / 2;
  a2 = PI / 2;
  cx = canvasWidth / 2;
  cy = canvasHeight / 2;
  cnv.position((windowWidth - canvasWidth)/2, (windowHeight-canvasHeight)/2)
  buffer = createGraphics(width, height);
  buffer.background(3,37,57);
  buffer.translate(cx, cy);
}

function draw() {
  let m1 = getRndInteger(4, 15);
  let m2 = getRndInteger(4, 15);
  background(3,37,57);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);
  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = (a1_v * a1_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  translate(cx, cy);
  stroke(0);
  strokeWeight(0);

  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);

  line(0, 0, x1, y1);
  fill(0);

  line(x1, y1, x2, y2);
  fill(0);

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  buffer.stroke(250, 153, 28);
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }

  px2 = x2;
  py2 = y2;
}
