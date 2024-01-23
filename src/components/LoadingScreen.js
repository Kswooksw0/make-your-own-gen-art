import React, { useRef, useEffect } from "react";
import p5 from "p5";

const LoadingScreen = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const instance = new p5(p5Sketch, sketchRef.current);
    return () => instance.remove();
  }, []);

  const p5Sketch = (p) => {

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.background(0, 0, 0);
      p.strokeWeight(3)
    };

    p.draw = () => {
        p.background(0, 0, 0);
        p.rotateX(p.millis() / 1000);
        p.rotateY(p.millis() / 1000);
        p.fill('white');
        p.box(80);
    };
  };

  return (
    <>
      <div ref={sketchRef} id="loading-screen"></div>
    </>
  );
};

export default LoadingScreen;
