"use client";
import React, { useEffect, useState } from "react";

const useClientWidthHeight = () => {
  const [boxSize, setBoxSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resize = () => {
      setBoxSize({ width: window.innerWidth, height: window.innerHeight });
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return boxSize;
};

export default useClientWidthHeight;
