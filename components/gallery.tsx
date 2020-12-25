import React from "react";
import Link from "next/link";
import Masonry from "react-masonry-component";
import Image from "next/image";

const THUMBNAIL_WIDTH = 300;

export function Gallery({ images }: any) {
  console.log(images);
  return (
    <Masonry
      className={"my-gallery-class"} // default ''
      elementType={"ul"} // default 'div'
      options={{
        gutter: 10,
      }} // default {}
      disableImagesLoaded={false} // default false
      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      // imagesLoadedOptions={imagesLoadedOptions} // default {}
    >
      {images.map((image) => (
        <Link href={`/image/${image.slug}`} key={image.slug}>
          <Image
            width={THUMBNAIL_WIDTH}
            height={(THUMBNAIL_WIDTH / image.width) * image.height}
            src={image.url}
            objectPosition="contain"
            className="max-sm object-contain overflow-hidden mr-4 mb-4 hover:rounded animate"
          />
        </Link>
      ))}
    </Masonry>
  );
}
