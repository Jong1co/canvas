"use client";

import React, { RefObject, useEffect, useRef } from "react";
import useClientWidthHeight from "./useClientWidthHeight";

const useCanvasTest = () => {
  const { width, height } = useClientWidthHeight();

  const textCanvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = textCanvasRef.current?.getContext("2d");

    if (ctx) {
      // 첫 번째 경로 시작
      ctx.beginPath();
      ctx.moveTo(50, 50);
      ctx.lineTo(100, 100);
      ctx.stroke(); // 선 그리기

      // ctx.beginPath();
      // ctx.moveTo(150, 50);
      ctx.lineTo(200, 100);
      // ctx.strokeStyle = "rgb(102, 103, 171)";
      ctx.stroke(); // 선 그리기
      // ctx.beginPath();

      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(200, 200);
      ctx.stroke(); // 선 그리기
      // 두 번째 경로 시작 (beginPath를 호출하지 않으면 첫 번째 경로에 이어서 그려짐)

      // ctx.beginPath();
      // ctx.fillStyle = "rgb(102, 103, 171)"; //색상을 채움 기본값 검정색인듯
      // ctx.arc(100, 100, 50, 0, Math.PI * 1);
      // ctx.fill();
    }
  }, [width, height]);

  return { textCanvasRef };
};

export default useCanvasTest;
