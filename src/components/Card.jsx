import React from "react";
import { useState, useRef } from "react";
import { extractDate } from "../utilities/extractDate";
import { convertToMegabytes } from "../utilities/getInMB";
import { pinToIPFS } from "../utilities/interact";

const Card = ({ name, gifUrl, id, metadata }) => {
  const descriptionBox = useRef("");
  const [description, setDescription] = useState("");
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [isPinning, setIsPinning] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  //   https://gateway.pinata.cloud/ipfs/QmVuDuMfeDY1EXJVzc4m8BWVCmZx1wN7affjnaHYjVP596
  const setNewDescription = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };

  const handleCloseButton = () => {
    setIsOpened(false);
    setIpfsUrl("");
  };

  const pinGifToIPFS = async (url, name, description) => {
    setIsPinning(true);
    const tokenURI = await pinToIPFS(url, name, description);
    setIsPinning(false);
    setIpfsUrl(tokenURI);
    setDescription("");
    descriptionBox.current.value = "";
  };

  return (
    <>
      <div class="flex flex-col items-center w-full h-fit bg-black border border-purple-500 rounded-xl shadow-purple-500 shadow-md z-0">
        <img class="relative w-10/12 h-full" key={id} alt={name} src={gifUrl} />
        <div class="flex justify-evenly items-center w-10/12">
          <button
            onClick={() => setIsOpened(true)}
            class="my-6 p-2 w-6/12 rounded-3xl bg-white"
          >
            Get Info
          </button>
          {/* <div
            class={`w-3 h-3 rounded-full ${
              !isPinned
                ? "bg-red-800 border border-red-800"
                : "bg-green-700 border border-green-700"
            }`}
          ></div> */}
        </div>
      </div>

      {isOpened ? (
        <div class="absolute w-screen min-h-max flex justify-center items-center z-10">
          <div class="relative grid grid-cols-2 gap-4 w-10/12 h-2/6 p-4 bg-light-black rounded-3xl">
            <div class="col-span-1">
              <img
                class="w-full h-full border border-purple-500 rounded-3xl"
                key={id}
                alt={name}
                src={gifUrl}
              />
            </div>
            <div class="col-span-1 grid grid-rows-6 p-4 text-white text-md">
              <div class="flex flex-col items-start justify-center row-span-5 w-full p-4 ">
                <div class="my-8">
                  Date created: {extractDate(name)} (sec-min-hr-dd-mm-yyyy)
                </div>

                <div class="my-8">
                  File size: {convertToMegabytes(metadata.size)}
                </div>

                <textarea
                  ref={descriptionBox}
                  class="w-full h-3/6 p-4 bg-dark-black border border-purple-500 rounded-xl"
                  placeholder="write a description for this GIF..."
                  onChange={(e) => setNewDescription(e)}
                ></textarea>

                {ipfsUrl ? (
                  <div class="py-6">
                    Click{" "}
                    <a
                      href={ipfsUrl}
                      target="_blank"
                      rel="noreferrer"
                      class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                      here
                    </a>{" "}
                    to see your IPFS gif data!
                  </div>
                ) : (
                  ""
                )}
                <div></div>
              </div>

              <div class="row-span-1 flex justify-around items-center p-4 text-black">
                <button
                  onClick={() => handleCloseButton()}
                  class="mb-2 p-2 w-3/12 h-4/6 rounded-3xl bg-white text-lg"
                >
                  close
                </button>
                <button
                  class="p-2 w-3/12 h-4/6 rounded-3xl text-white text-lg bg-dark-black border border-purple-800 pin-button"
                  onClick={() => pinGifToIPFS(gifUrl, name, description)}
                >
                  {ipfsUrl
                    ? "Pinned!"
                    : isPinning
                    ? "Pinning..."
                    : "Pin on IPFS"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Card;