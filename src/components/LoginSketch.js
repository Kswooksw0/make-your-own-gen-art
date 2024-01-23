import React, { useRef, useEffect } from "react";
import p5 from "p5";
import Box from "./Box";

const LoginSketch = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const instance = new p5(p5Sketch, sketchRef.current);
    return () => instance.remove();
  }, []);

  const p5Sketch = (p) => {
    let box;

    let boxArr = new Array(3);
    let div;

    p.setup = () => {
      p.createCanvas(500, 500, p.WEBGL);
      p.background(0, 0, 0);
      p.strokeWeight(3);
      p.stroke("black");
      p.fill("white");
      box = new Box(p, 0, 0, 0.01);
      div = p.width / 3 - 60;

      p.ortho(-p.width / 2, p.width / 2, p.height / 2, -p.height / 2, 0, 2000);

      for (let i = 0; i < boxArr.length; i++) {
        boxArr[i] = new Array(3);
      }
      const rotateVals = ["xy", "xz", "yz"];

      for (let i = 0; i < boxArr.length; i++) {
        for (let j = 0; j < boxArr[0].length; j++) {
          if (
            (i === 0 && j === 0) ||
            (i === 0 && j === 2) ||
            (i === 1 && j === 1) ||
            (i === 2 && j === 0) ||
            (i === 2 && j === 2)
          ) {
            let x = -div + div * j;
            let y = div - div * i;
            boxArr[i][j] = new Box(
              p,
              x,
              y,
              div,
              0.06,
              p.random(1, 4) * p.TWO_PI,
              p.random(rotateVals)
            );
          }
        }
      }
    };

    p.draw = () => {
      p.background(0, 0, 0);
      for (let i = 0; i < boxArr.length; i++) {
        for (let j = 0; j < boxArr[0].length; j++) {
          let box = boxArr[i][j];
          if (box) {
            box.rotateBox();
            box.display();
          }
        }
      }
    };
  };

  return (
    <>
      <div ref={sketchRef} id="login-sketch"></div>
    </>
  );
};

export default LoginSketch;
