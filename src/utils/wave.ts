import { WavePoint, WavePointImpl } from "./wavePoint";

export interface Wave {
  init: () => void;
  resize: (stageWidth: number, stageHeight: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export class WaveImpl implements Wave {
  private points: WavePoint[];
  private numberOfPoints: number;
  private pointGap: number;
  private stageWidth: number;
  private stageHeight: number;
  private centerX: number;
  private centerY: number;

  constructor() {
    this.points = [];
    this.numberOfPoints = 6;

    // this.init();
  }

  resize = (stageWidth: number, stageHeight: number) => {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.pointGap = this.stageWidth / (this.numberOfPoints - 1);
    /* 초기화 함수로 넘어가기 */
    this.init();
  };

  init = () => {
    for (let i = 0; i < this.numberOfPoints; i++) {
      this.points.push(new WavePointImpl(this.pointGap * i, this.centerY, i));
    }
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();

    /* 점의 시작점으로 붓 이동하기 */
    /* 곡선을 위해 이전의 좌표 기억하기 */
    let prevX = this.points[0].pointX;
    let prevY = this.points[0].pointY;
    ctx.moveTo(prevX, prevY);
    //TODO: 여기 이해 안 감
    for (let i = 0; i < this.numberOfPoints; i++) {
      ctx.lineTo(this.points[i].pointX, this.points[i].pointY);

      if (i != 0 && i != this.numberOfPoints - 1) {
        this.points[i].draw(ctx);
      }
    }
    /* 색상 RED & 채우기 */
    ctx.fillStyle = "#ff0000";
    ctx.fill();

    /* 붓 끝내기 */
    ctx.closePath();
  };
}
