import { PI2 } from "@/constants/math";

export interface Point {
  pointCenterX: number;
  pointCenterY: number;
  animate: (ctx: CanvasRenderingContext2D) => void;
}

export class PointImpl implements Point {
  pointCenterX: number;
  pointCenterY: number;

  private radian: number;
  private CENTER_LINE: number;
  private VELOCITY: number; // 속도
  private AMPLITUDE: number; // 진폭
  private POINT_RADIUS: number; // 점 반지름

  constructor(POINT_GAP: number, idx: number, width: number, height: number) {
    this.pointCenterX = POINT_GAP * idx;
    this.radian = idx * 0.38;
    this.CENTER_LINE = height / 3;
    this.VELOCITY = 0.007;
    this.AMPLITUDE = height / 100;
    this.POINT_RADIUS =
      width / 370 > 5.8 ? 5.8 : width / 370 < 2.5 ? 2.5 : width / 370;
    this.pointCenterY =
      this.AMPLITUDE * Math.sin(this.radian) + this.CENTER_LINE;
  }

  animate(ctx: CanvasRenderingContext2D) {
    this.radian += this.VELOCITY;
    this.pointCenterY =
      this.AMPLITUDE * Math.sin(this.radian) + this.CENTER_LINE;

    ctx.beginPath();
    ctx.fillStyle = "rgb(102, 103, 171)";
    ctx.arc(this.pointCenterX, this.pointCenterY, this.POINT_RADIUS, 0, PI2);
    ctx.fill();
  }
}
