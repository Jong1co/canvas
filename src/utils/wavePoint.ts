export interface WavePoint {
  pointX: number;
  pointY: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export class WavePointImpl implements WavePoint {
  pointX: number;
  pointY: number;
  private speed: number;
  private wave: number;
  private cur: number;
  private y: number;

  constructor(
    private canvasWidth: number,
    private canvasHeight: number,
    private i: number
  ) {
    this.pointX = canvasWidth;
    this.pointY = canvasHeight / 1.4;
    this.y = this.pointY;
    this.speed = 0.05;
    this.cur = i;
    this.wave = canvasHeight / 4;
  }

  //여기에서 arrow function을 사용하지 않으면 에러 발생함
  //this관련 문제임
  draw = (ctx: CanvasRenderingContext2D) => {
    // ctx.clearRect(0, 0, this.canvasWidth, this.wave);
    // ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    // console.log(this.pointX, this.pointY);
    this.cur += this.speed;

    this.pointY = this.y + Math.sin(this.cur) * this.wave;
    // const newPointY = this.pointY + Math.sin(this.speed);

    // ctx.beginPath();

    // ctx.arc(this.pointX, this.pointY, 30, 0, Math.PI * 2, false);
    // ctx.fillStyle = "rgba(13, 13, 13, 0.2)";
    // ctx.fill();

    // ctx.closePath();
  };
}
