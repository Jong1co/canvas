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
    for (let i = 1; i < this.numberOfPoints; i++) {
      // ctx.lineTo(this.points[i].pointX, this.points[i].pointY);

      const cx = (prevX + this.points[i].pointX) / 2;
      const cy = (prevY + this.points[i].pointY) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy); //곡선 그리는 것 //TODO: 어떻게 그리는지?

      /* 곡선을 그리기 위해 이전 좌표 업데이트하기 */
      prevX = this.points[i].pointX;
      prevY = this.points[i].pointY;

      if (i != 0 && i != this.numberOfPoints - 1) {
        this.points[i].draw(ctx);
      }
    }
    /* 붓을 오른쪽 모서리부터 왼쪽 모서리 그리고 첫번째 점 위치까지 옮기면서 색칠해줍니다. */
    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(0, this.stageHeight);
    ctx.lineTo(this.points[0].pointX, this.points[0].pointY);

    /* 색상 RED & 채우기 */
    ctx.fillStyle = "#ff0000";
    ctx.fill();

    /* 붓 끝내기 */
    ctx.closePath();
  };
}
