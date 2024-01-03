"use client";
import { RefObject, useEffect, useRef, useState } from "react";
// import { GlowParticle } from "@/utils/GlowParticle";
import { COLOR } from "@/constants/color";
import useClientWidthHeight from "@/hook/useClientWidthHeight";
import useCanvas from "@/hook/useCanvas";
import { LightSourceImpl, LightSource } from "@/utils/lightSource";
import { Point, PointImpl } from "@/utils/point";
import useCanvasTest from "@/hook/useCanvasTest";

export default function Home() {
  const { width, height } = useClientWidthHeight();

  const lightSource: LightSource = new LightSourceImpl(width, height);

  const points: Point[] = [];
  const initPoints = () => {
    const POINT_NUMBER = 72;
    const POINT_GAP = width / POINT_NUMBER;
    for (let i = 0; i <= POINT_NUMBER; i++) {
      const point: Point = new PointImpl(POINT_GAP, i, width, height);
      points.push(point);
    }
  };

  if (width && height) {
    initPoints();
  }

  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height); // TODO: clearRect는 뭐지

    ctx.fillStyle = "rgb(31, 31, 36)";
    ctx.fillRect(0, 0, width, height);

    lightSource.drawRadialGradientBehindLightSource(ctx);
    lightSource.drawLightSource(ctx);

    for (let i = 0; i < points.length; i++) {
      lightSource.drawLightLines(
        ctx,
        points[i].pointCenterX,
        points[i].pointCenterY
      );
      points[i].animate(ctx);
    }
  };

  const { canvasRef } = useCanvas(animate);
  // const {textCanvasRef} = useCanvasTest();

  return (
    <main>
      {/* <div>{width}</div>
      <div>{height}</div> */}
      {/* 안녕하세요 */}
      <canvas ref={canvasRef}></canvas>
    </main>
  );
}

// const pixelRatio = useRef(1);
// const totalParticles = useRef(1);
// const particles = useRef<any>([]);
// const maxRaddius = useRef(90);
// const minRadius = useRef(40);

// const stageWidth = useRef(document.body.clientWidth);
// const stageHeight = useRef(document.body.clientHeight);

// const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

// useEffect(() => {
//   const canvas = canvasRef.current;
//   if (!canvas) return;
//   const ctx = canvas.getContext("2d"); //이건 뭐지?
//   if (!ctx) return;
//   setCtx(ctx);

//   pixelRatio.current = window.devicePixelRatio > 1 ? 2 : 1;

//   window.addEventListener("resize", resize, false);
//   window.requestAnimationFrame(animate);
// }, []);

// const resize = () => {
//   canvasRef.current!.width = stageWidth.current * pixelRatio.current;
//   canvasRef.current!.height = stageHeight.current * pixelRatio.current;
//   ctx?.scale(pixelRatio.current, pixelRatio.current);

//   createParticles();
// };

// const createParticles = () => {
//   let curColor = 0;
//   particles.current = [];

//   for (let i = 0; i < totalParticles.current; i++) {
//     const item = new GlowParticle(
//       Math.random() * stageWidth.current,
//       Math.random() * stageHeight.current,
//       Math.random() * (maxRaddius.current - minRadius.current),
//       COLOR[curColor]
//     );

//     if (++curColor >= COLOR.length) {
//       curColor = 0;
//     }

//     particles.current[i] = item;
//   }
// };

// const animate = () => {
//   // window.requestAnimationFrame(this.animate.vind)

//   ctx?.clearRect(0, 0, stageWidth.current, stageHeight.current);

//   for (let i = 0; i < totalParticles.current; i++) {
//     const item = particles.current[i];
//     item.animate(ctx, stageWidth.current, stageHeight.current);
//   }
// };
