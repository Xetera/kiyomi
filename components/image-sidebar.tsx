import { humanFileSize } from "@/lib/utils/shared";
import React from "react";
import { PersonPortrait } from "./person-preview";

export default function ImageSidebar({ image }: any) {
  const potraitHeights = image.faces.map((face) => face.height);
  return (
    <aside
      className="bg-blueGray-900 shadow-xl h-screen overflow-hidden border-l-2 border-blueGray-800"
      style={{ background: "#0d1323" }}
    >
      <div className="p-6">
        <h2 className="text-coolGray-400 mb-3">Uploaded By</h2>
        <div className="text-orange-600 flex items-center">
          <img src={image.user.image} className="rounded-full w-8 h-8 mr-3" />
          <p className="font-bold">{image.user.name}</p>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-coolGray-400 mb-3">Dimensions</h2>
        <div className="flex items-center">
          <p className="font-bold">
            {image.width}x{image.height}
          </p>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-coolGray-400 mb-3">Size</h2>
        <div className="flex items-center">
          <p className="font-bold">{humanFileSize(image.bytes)}</p>
        </div>
      </div>
      <hr />
      {/* <pre className="overflow-hidden" style={{ whiteSpace: "break-spaces" }}>
        {JSON.stringify(image, null, 2)}
      </pre> */}
      <div>
        <div className="overflow-hidden flex flex-wrap items-center">
          {image.faces?.map((face) => (
            <PersonPortrait
              src={image.url}
              crop={face}
              className="mr-"
              allPortraitHeights={potraitHeights}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
