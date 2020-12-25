import React from "react";
import Link from "next/link";

export function Gallery({ images }: any) {
  console.log(images);
  return images.map((image) => (
    <Link href={`/image/${image.slug}`} key={image.slug}>
      <img
        src={image.url}
        style={{
          maxWidth: "300px",
        }}
        className="max-sm overflow-hidden"
      />
    </Link>
  ));
}
