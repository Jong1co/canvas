import { PI2 } from "@/constants/math";

export interface LightSource {
  drawRadialGradientBehindLightSource: (ctx: CanvasRenderingContext2D) => void;
  drawLightSource: (ctx: CanvasRenderingContext2D) => void;
  drawLightLines: (
    ctx: CanvasRenderingContext2D,
    pointCenterX: number,
    pointCenterY: number
  ) => void;
}

export class LightSourceImpl implements LightSource {
  private centerX: number;
  private centerY: number;
  private radius: number;

  constructor(width: number, height: number) {
    this.centerX = width / 2;
    this.centerY = height / 1.4;
    this.radius = width / 48 > 48 ? 48 : width / 48 < 24 ? 24 : width / 48;
  }

  drawRadialGradientBehindLightSource(ctx: CanvasRenderingContext2D) {
    const gradientRadius = this.radius * 16;
    //그라디언트 생성
    const gradient = ctx.createRadialGradient(
      //시작점 start
      this.centerX, //
      this.centerY, //
      0,
      //시작점 end
      //끝점 start
      this.centerX, //중심
      this.centerY, //중심
      gradientRadius //반지름 * 16
    );

    gradient.addColorStop(0, "rgba(102, 103, 171, 0.2)");
    gradient.addColorStop(1, "rgba(31, 31, 36, 0.1)");
    ctx.fillStyle = gradient; //TODO: 면에 적용할 색 또는 스타일을 지정한다.

    //원을 그린다.
    ctx.arc(this.centerX, this.centerY, gradientRadius, 0, PI2);
    ctx.fill(); //TODO: 색을 채운다.
  }

  drawLightSource(ctx: CanvasRenderingContext2D) {
    ctx.beginPath(); //TODO: beginPath는 뭐지
    ctx.fillStyle = "rgb(102, 103, 171)";
    ctx.arc(this.centerX, this.centerY, this.radius, 0, PI2);
    ctx.fill();
  }

  drawLightLines(
    ctx: CanvasRenderingContext2D,
    pointCenterX: number,
    pointCenterY: number
  ) {
    ctx.strokeStyle = "rgb(176, 176, 212, 0.24)"; //TODO: 선의 색상을 지정한다.
    ctx.lineWidth = 1; //TODO: 선의 두께를 지정한다.
    //TODO: 매개 변수로 지정된 좌표로 이동한다.
    ctx.moveTo(this.centerX, this.centerY - this.radius);
    //TODO: 현재 위치에서 매개 변수로 지정된 좌표로 직선으로 연결한다.
    ctx.lineTo(pointCenterX, pointCenterY);

    ctx.stroke(); //TODO: 선을 지정된 스타일로 적용한다.
  }
}
