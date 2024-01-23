import React, { useState, useEffect } from "react";
import { supabase } from "../client.js";
import { fetchFiles } from "../utilities/fetchFiles.js";
import NavBar from "../components/NavBar.jsx";
import Greeting from "../components/Greeting.jsx";
import Card from "../components/Card.jsx";

const Gallery = () => {
  const [gifs, setGifs] = useState([]);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user.id;

    const fetchGifs = async () => {
      try {
        const files = await fetchFiles(userId);

        const urls = files.map((file) => {
          const publicURL = supabase.storage
            .from("generative-art-gifs")
            .getPublicUrl(`${userId}/${file.name}`);

          return {
            ...file,
            gifUrl: publicURL.data.publicUrl,
          };
        });
        setGifs(urls);
      } catch (error) {
        console.error("Error creating signed URL:", error.message);
        return null;
      }
    };

    fetchGifs();
  }, []);
  console.log(gifs);

  return (
    <>
      <div class="w-screen h-screen">
        <Greeting />
        <div class="flex flex-col justify-center items-center h-2/5 ">
          <div class="text-white text-4xl my-4 ">
            Your Brainy Gif Collection
          </div>
          <div class="w-5/12 text-center text-white text-md font-noto">
            Your brainy gif collection is here. Pin it on IPFS to share with
            your friends in a decentralised way. Whether red, blue or grey, it
            matters.
          </div>
        </div>

        <div class="relative grid grid-cols-5 gap-6 p-4 ">
          {gifs.length > 0 ? (
            gifs.map((gif) => (
              <Card
                name={gif.name}
                gifUrl={gif.gifUrl}
                id={gif.id}
                metadata={gif.metadata}
              />
            ))
          ) : (
            <p>No GIFs available</p>
          )}
        </div>
      </div>

      <div class="absolute top-6 right-8" onClick={() => toggleNavbar()}>
        <img src="/img/navbar.png" alt="nav bar" />
      </div>

      <div class={`navbar ${isNavbarOpen ? "active" : ""} h-screen min-w-52`}>
        <NavBar setIsNavbarOpen={setIsNavbarOpen} />
      </div>
    </>
  );
};

export default Gallery;
