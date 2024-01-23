import React, { useRef, useState, useEffect } from "react";
import p5 from "p5";
import { generateCoord } from "./generateCoord";
import { supabase } from "../client.js";
import { formatDate } from "../utilities/formatDate";

const Sketch = () => {
  const sketchRef = useRef();
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    // Instantiate the p5 instance
    const instance = new p5(p5Sketch, sketchRef.current);
    return () => instance.remove();
  }, []);

  // upload file
  const uploadFile = async (file) => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const userId = user.id;
    const userName = user.user_metadata.userName;

    await createFolderIfNotExists(userId);

    try {
      const { data, error } = await supabase.storage
        .from("generative-art-gifs")
        .upload(`${userId}/${userName}_${formatDate()}`, file);
    } catch (error) {
      alert("Error uploading file:", error.message);
    }
  };

  // create folder
  const createFolderIfNotExists = async (folder) => {
    try {
      const { data, error } = await supabase.storage
        .from("generative-art-gifs")
        .list(`${folder}/`);

      if (!data || data.length === 0) {
        await supabase.storage
          .from("generative-art-gifs")
          .upload(`${folder}/`, "");
      }
    } catch (error) {
      throw new Error("the folder does not exist");
    }
  };

  const p5Sketch = (p) => {
    // capturing video
    let fps = 30;
    let isCapturing = false;
    let captureStarted = false;
    let currentFrameCount;
    let lastFrameCount;
    let capturer = new window.CCapture({
      format: "gif",
      workersPath: "./js/",
      framerate: fps,
      verbose: false,
    });
    let secondsToRecord = 1;
    let addedFrames = secondsToRecord * fps;

    // orthographic view settings
    let ma;

    // box size
    let boxSize = 1500;

    // sliders
    let PLred1;
    let PLred2;
    let PLblue1;
    let PLblue2;
    let noiseScale;
    let fluctuator;
    let brainSize;

    let recordButton;
    let progressText;

    let coords = generateCoord(p, boxSize);

    let shapes = ["cylinder", "box", "sphere"];
    let currShapeIndex = 0;

    p.setup = () => {
      p.noiseDetail(7, 0.25);
      p.noiseSeed(1);
      p.frameRate(fps);

      let cnv = p.createCanvas(
        p.windowWidth * 0.4,
        p.windowHeight * 0.85,
        p.WEBGL
      );
      cnv.id("gen-art-canvas");

      ma = p.atan(1 / p.sqrt(2));
      p.ortho(-p.width / 2, p.width / 2, p.height / 2, -p.height / 2, 0, 2000);

      const sliderWidthFactor = 0.80;
      const sliderWidth = 160;
      const firstSliderHeight = p.height * 0.2;

      /* Create glass panel that contains the sliders */

      // let sliderPanel = p.createDiv();
      // sliderPanel.style('position', 'relative')
      // sliderPanel.style('left', '2%')
      // sliderPanel.position(p.windowWidth * 0.90, p.windowHeight * 0.1);
      // sliderPanel.class(
      //   "min-w-72 h-4/5 rounded-xl border-purple-800 bg-darker-black slider-panel"
      // );

      /* SETTING OF SLIDERS */
      let PLredText = p.createDiv("red-1");
      PLredText.position(p.windowWidth * sliderWidthFactor, firstSliderHeight);
      PLredText.class("slider-text");

      PLred1 = p.createSlider(0, 255, 100, 0.5);
      PLred1.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 1.3
      );
      PLred1.style("width", `${sliderWidth}px`);
      PLred1.class("slider");

      let PLred2Text = p.createDiv("red-2");
      PLred2Text.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 1.6
      );
      PLred2Text.class("slider-text");

      PLred2 = p.createSlider(0, 255, 100, 0.5);
      PLred2.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 1.9
      );
      PLred2.style("width", `${sliderWidth}px`);
      PLred2.class("slider");

      let PLblue1Text = p.createDiv("blue-1");
      PLblue1Text.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 2.2
      );
      PLblue1Text.class("slider-text");

      PLblue1 = p.createSlider(0, 255, 100, 0.5);
      PLblue1.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 2.5
      );
      PLblue1.style("width", `${sliderWidth}px`);
      PLblue1.class("slider");

      let PLblue2Text = p.createDiv("blue-2");
      PLblue2Text.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 2.8
      );
      PLblue2Text.class("slider-text");

      PLblue2 = p.createSlider(0, 255, 100, 0.5);
      PLblue2.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 3.1
      );
      PLblue2.style("width", `${sliderWidth}px`);
      PLblue2.class("slider");

      /* FLUCTUATION */
      let fluctuatorText = p.createDiv("fluctuation");
      fluctuatorText.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 3.4
      );
      fluctuatorText.class("slider-text");

      fluctuator = p.createSlider(15, 50, 25, 1);
      fluctuator.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 3.7
      );
      fluctuator.style("width", `${sliderWidth}px`);
      fluctuator.class("slider");

      /* NOISE FACTOR */
      let noiseScaleText = p.createDiv("noise factor");
      noiseScaleText.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 4.0
      );
      noiseScaleText.class("slider-text");

      noiseScale = p.createSlider(0.008, 0.08, 0.03, 0.001);
      noiseScale.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 4.3
      );
      noiseScale.style("width", `${sliderWidth}px`);
      noiseScale.class("slider");

      /* BRAIN SIZE */
      let brainSizeText = p.createDiv("size");
      brainSizeText.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 4.6
      );
      brainSizeText.class("slider-text");

      brainSize = p.createSlider(50, 200, 125, 0.5);
      brainSize.position(
        p.windowWidth * sliderWidthFactor,
        firstSliderHeight * 4.9
      );
      brainSize.style("width", `${sliderWidth}px`);
      brainSize.class("slider");

      /* record button */

      let buttonContainer = p.createDiv();
      buttonContainer.style("width", "100%");
      buttonContainer.style("display", "flex");
      buttonContainer.style("justify-content", "center");

      recordButton = p.createButton("Create Gif");
      recordButton.style("width", "150px");
      recordButton.style("background-color", "#18181b");
      recordButton.style("border-radius", "0.75rem");
      recordButton.style("padding", "1rem");
      recordButton.style("font-size", "1.3rem");
      recordButton.style("color", "rgb(255 255 255)");
      recordButton.style("border-width", "1px");
      recordButton.parent(buttonContainer);

      recordButton.mousePressed(() => {
        captureStarted = true;
        isCapturing = true;
        recordButton.style("visibility", "hidden");
        progressText.style("visibility", "visible");
      });

      progressText = p.createDiv("Creating your GIF...");
      progressText.position(p.windowWidth * 0.44, p.windowHeight * 0.2);
      progressText.style("width", "fit-content");
      progressText.style("color", "rgb(255 255 255)");
      progressText.style("font-size", "1.5rem");
      progressText.style("visibility", "hidden");
    };

    p.draw = () => {
      p.background(0, 0, 0);
      let locX = p.mouseX - p.width / 2;
      let locY = p.mouseY - p.height / 2;

      // rotation
      p.rotateX(ma);
      p.rotateY(-p.QUARTER_PI);
      p.rotateY(-p.frameCount * 0.008);

      p.push();
      p.noStroke();
      p.translate(0, -p.height * 0.2, 0);

      for (let coord of coords) {
        let c = coord.center;
        let cX = c.x,
          cY = c.y,
          cZ = c.z;

        p.push();

        p.translate(cX, cY, cZ);

        let n = p.noise(
          cX * noiseScale.value(),
          cY * noiseScale.value(),
          (p.millis() / fluctuator.value()) * noiseScale.value()
        );

        p.ambientMaterial(p.map(0, 300, 0, 255, p.frameCount % 300) * n);
        p.pointLight(PLred1.value(), 160, PLblue1.value(), 0, -600, 0);
        p.pointLight(PLred2.value(), 15, 115, 0, 200, 0);
        p.pointLight(18, 150, PLblue2.value(), 0, 0, -30);
        p.pointLight(210, 111, 17, locX, locY, 0);

        // directional light
        p.directionalLight(70, 150, 23, -1, 0, 1);
        p.directionalLight(170, 50, 123, 1, 0, -1);

        p.fill(coord.cols);

        let nudgedCoord = coord.center.lerp(coord.nudgedCoord, n);
        p.translate(nudgedCoord.x, nudgedCoord.y, nudgedCoord.z);

        if (shapes[currShapeIndex] === "cylinder") {
          p.cylinder(brainSize.value() * n, brainSize.value() * n);
        } else if (shapes[currShapeIndex] === "box") {
          p.box(brainSize.value() * n);
        } else if (shapes[currShapeIndex] === "sphere") {
          p.sphere(brainSize.value() * n * 0.3);
        }
        p.pop();
      }
      p.pop();

      // capturing video
      if (isCapturing && captureStarted) {
        currentFrameCount = p.frameCount;
        lastFrameCount = currentFrameCount + addedFrames;
        capturer.start();
        captureStarted = false;
      }
      if (isCapturing) {
        capturer.capture(p.canvas);
      }
      if (p.frameCount === lastFrameCount) {
        isCapturing = false;
        capturer.stop();
        capturer.save((blob) => {
          const file = new File([blob], `someGif.gif`, { type: "image/gif" });
          uploadFile(file);
          recordButton.style("visibility", "visible");
          progressText.style("visibility", "hidden");
        });
      }
    };

    p.doubleClicked = () => {
      currShapeIndex = (currShapeIndex + 1) % 3;
    };
  };

  return (
    <>
      <div ref={sketchRef}></div>
    </>
  );
};

export default Sketch;
