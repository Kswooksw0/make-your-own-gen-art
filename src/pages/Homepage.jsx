import React, { useState, useEffect } from "react";
import Sketch from "../components/Sketch";
import NavBar from "../components/NavBar";
import Greeting from "../components/Greeting";
import "../styles/navbar.css";

const Homepage = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <div class="w-screen h-screen flex justify-center items-start">
        <Sketch />

        <div class="flex items-center flex-col absolute top-20 left-24 w-3/12">
          <div class="text-4xl text-white">3D Generative Art</div>
          <div class="w-full my-6 p-4 text-white font-noto text-justify text-md border">
            <div>
              Generative art is an art form that has been created, in whole or
              in part, with the use of an autonomous system. Tweak the
              parameters to see how individual pieces interact with each other
              to form a 'brainy' emergence of shapes, colours, light, velocity and
              textures.
            </div>
            <br />
            <div>
              Double click around the image to switch its form. Once you are happy with the look, 
              click on "Create GIF" to create a unique generative art GIF of your own. In your gallery,
              pin the GIF that you want on IPFS (InterPlanetary File System) — a peer-to-peer distributed file system
              for decentralised sharing. 
            </div>
          </div>
        </div>

        {/* <div class="flex justify-center absolute bottom-32 w-screen border">
          <div class="font-noto text-sm text-white">
            Double click around the image to alter its form
          </div>
        </div> */}

        <Greeting />

        <div class="absolute top-6 right-8" onClick={() => toggleNavbar()}>
          <img src="/img/navbar.png" alt="nav bar" />
        </div>

        <div class={`navbar ${isNavbarOpen ? "active" : ""} h-screen min-w-52`}>
          <NavBar setIsNavbarOpen={setIsNavbarOpen} />
        </div>
      </div>
    </>
  );
};

export default Homepage;
