"use client";

import { RefObject, useEffect, useRef } from "react";
import useClientWidthHeight from "./useClientWidthHeight";

const useCanvas = (animate: (ctx: CanvasRenderingContext2D) => void) => {
  const { width, height } = useClientWidthHeight();

  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    //주사율 맞추기
    const devicePixelRatio = window.devicePixelRatio ?? 1;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    //

    let requestId: number;
    const requestAnimation = () => {
      requestId = window.requestAnimationFrame(requestAnimation);
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        animate(ctx);
      }
    };
    requestAnimation();

    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [width, height, animate]);

  return { canvasRef };
};

export default useCanvas;
