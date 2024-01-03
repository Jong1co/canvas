"use client";
import useCanvas from "@/hook/useCanvas";
import useClientWidthHeight from "@/hook/useClientWidthHeight";
import { WaveImpl } from "@/utils/wave";
import { WavePoint, WavePointImpl } from "@/utils/wavePoint";
import React, { useCallback, useMemo } from "react";

const WavePage = () => {
  const wave = useMemo(() => new WaveImpl(), []);
  const { width, height } = useClientWidthHeight(wave.resize);

  const { canvasRef } = useCanvas(wave?.draw);

  return (
    <main>
      <canvas ref={canvasRef}></canvas>
    </main>
  );
};

export default WavePage;
