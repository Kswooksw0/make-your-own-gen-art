import React, { useState, useEffect } from "react";
import { supabase } from "../client.js";
import { fetchFiles } from "../utilities/fetchFiles.js";
import NavBar from "../components/NavBar.jsx";
import Greeting from "../components/Greeting.jsx";
import Card from "../components/Card.jsx";
import { convertDateToNumber } from "../utilities/convertDateToNumber.js";

const Gallery = () => {
  const [gifs, setGifs] = useState([]);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const fetchGifs = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user.id;
    try {
      const files = await fetchFiles(userId);

      const urls = files.map((file) => {
        const publicURL = supabase.storage
          .from("generative-art-gifs")
          .getPublicUrl(`${userId}/${file.name}`);

        const dateForComparison = convertDateToNumber(file.name);

        return {
          ...file,
          dateForComparison,
          gifUrl: publicURL.data.publicUrl,
        };
      });

      urls.sort((file1, file2) => {
        return file2.dateForComparison - file1.dateForComparison
      })

      setGifs(urls);
    } catch (error) {
      console.error("Error creating signed URL:", error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchGifs();
  }, []);

  const removeAndUpdateGifs = async (folder, file) => {
    const { data, error } = await supabase.storage
      .from("generative-art-gifs")
      .remove([`${folder}/${file}`]);

    fetchGifs();
  };

  return (
    <>
      <div class="w-screen h-screen">
        <Greeting />
        <div class="flex flex-col justify-center items-center h-2/5 ">
          <div class="text-white text-4xl my-4 ">
            Your Brainy Gif Collection
          </div>
          <div class="w-5/12 text-center text-white text-md font-noto">
            {gifs.length > 0
              ? `Your brainy gif collection is here 😜. Pin it on IPFS to share with
            your friends in a decentralised way. Whether red, blue or grey, it
            matters.`
              : "You currently have not made any GIFs 🫤. Click on 'Create GIF' button on the homepage to populate your gallery ."}
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
                removeAndUpdateGifs={removeAndUpdateGifs}
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
