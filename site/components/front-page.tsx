import React from "react";
import { MyDropzone } from "./upload";

export function FrontPage() {
  return (
    <header className="max-w-7xl mx-auto h-96 flex items-center justify-start">
      {/* <Image
        src="https://my.simp.pics/0CMeV33SKzUpajhI.jpg"
        className="opacity-10 absolute h-vh faded-bottom"
        objectPosition="top"
        layout="fill"
        objectFit="contain"
        // width="100%"
      /> */}
      <div className="px-8 relative">
        <h1 className="font-black text-blueGray-400 text-6xl mb-3">
          simp.pics
        </h1>
        <p className="text-blueGray-500 font-semibold text-lg">
          Share the images from the people you love
        </p>
        <MyDropzone />
      </div>
    </header>
  );
}
