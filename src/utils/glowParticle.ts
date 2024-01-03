const PI2 = Math.PI * 2;

export class GlowParticle {
  x: number;
  y: number;
  radius: number;
  rgb: { r: number; g: number; b: number };
  vx: number;
  vy: number;
  sinValue: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    rgb: { r: number; g: number; b: number }
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rgb = rgb;

    this.vx = Math.random() * 4;
    this.vy = Math.random() * 4;

    this.sinValue = Math.random();
  }

  animate(
    ctx: CanvasRenderingContext2D,
    stageWidth: number,
    stageHeight: number
  ) {
    this.sinValue += 0.01;

    this.radius += Math.sin(this.sinValue);

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.vx *= -1;
      this.x += 10;
    } else if (this.x > stageWidth) {
      this.vx *= -1;
      this.x -= 10;
    }

    if (this.y < 0) {
      this.vy *= -1;
      this.y += 10;
    } else if (this.y > stageHeight) {
      this.vy *= -1;
      this.y -= 10;
    }

    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b}, 1)`;
    ctx.fill();
  }
}
