import React from "react";
import { PersonPortrait } from "./person-preview";
import { FaceContext, ImageContext } from "@/models/contexts";
import { CascadeChildren } from "./animations/cascade-children";
import { AnimatePresence, motion } from "framer-motion";
import { useToggle } from "react-use";
import { FaExpand, FaCompress, FaUserSecret } from "react-icons/fa";
import { RiEdit2Line, RiSpyLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import { fetcher } from "@/lib/shared";
import useSWR from "swr";
// import type { ImageResponse } from "@/pages/api/image/[slug]";
import ReactModal from "react-modal";
import { PredictionResponse } from "@/pages/api/image/face/[slug]";
import {
  AppearanceDataFragment,
  FaceDataFragment,
  ImageDataFragment,
  MimeType,
} from "@/lib/__generated__/graphql";

type FaceProps = React.HTMLProps<HTMLDivElement> & {
  image: ImageDataFragment;
  appearance?: AppearanceDataFragment;
  face: FaceDataFragment;
  forceActive: boolean;
};

function Face({ appearance, face, style, forceActive }: FaceProps) {
  const { face: activeFace } = React.useContext(FaceContext);
  const motionId = appearance
    ? `appearance:${appearance.id}`
    : `face:${face.id}`;
  const active = activeFace === motionId;
  return (
    <AnimatePresence>
      {(active || forceActive) && (
        <motion.div
          className="absolute z-2 rounded border-2"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            ...style,
            border: "2px solid rgba(26, 42, 56, 0.8)",
          }}
        >
          <div className="w-full h-full absolute">
            <p
              className="absolute top-full w-full text-xs p-1"
              style={{
                background: "rgba(46, 42, 56, 0.8)",
                minWidth: "80px",
              }}
            >
              {appearance ? (
                appearance.person.name
              ) : (
                <i className="text-blueGray-500">Unknown</i>
              )}
              <div className="text-xs text-blueGray-400">
                {(face.score * 100).toFixed(2)}%
              </div>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ImageDisplay() {
  const image = React.useContext(ImageContext);
  const imageRef = React.useRef<HTMLImageElement | null>();
  const parentRef = React.useRef<HTMLDivElement | null>();
  const { face: activeFace } = React.useContext(FaceContext);
  const [expanded, toggleExpanded] = useToggle(false);
  const defaults = {
    x: 0,
    y: 0,
    height: 0,
    left: 0,
    right: 0,
    width: 1200,
    bottom: 0,
    top: 0,
    toJSON() {},
  };
  const [active, setActive] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const { data: facePredictions = [] } = useSWR<PredictionResponse>(
    `/api/image/face/${image?.slug}`,
    fetcher,
    { refreshInterval: 0 }
  );
  React.useEffect(() => {
    checkSize();
  }, [expanded]);
  console.log("predictions", facePredictions);
  const [parentSize, setParentSize] = React.useState<DOMRect>(defaults);
  const [imageSize, setImageSize] = React.useState<DOMRect>(defaults);
  function checkSize() {
    const a = parentRef.current?.getBoundingClientRect();
    const b = imageRef.current?.getBoundingClientRect();
    if (a) {
      setParentSize(a);
    }
    if (b) {
      setImageSize(b);
    }
  }

  React.useEffect(() => {
    // seems to be necessary for refs to initialize properly first
    setTimeout(() => {
      checkSize();
    }, 50);
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  React.useEffect(() => {
    if (loaded) {
      checkSize();
    }
  }, [loaded]);
  if (!image) {
    return null;
  }
  const shouldBeExpandable =
    image.height &&
    image.width &&
    image.height > 1200 &&
    image.height / image.width > 1.2;

  function renderFaces(
    faces: FaceDataFragment[],
    appearance?: AppearanceDataFragment
  ) {
    return faces.map((face) => (
      <Face
        forceActive={active}
        appearance={appearance}
        face={face}
        image={image!}
        style={{
          left: (face.x * imageSize.width) / (image?.width ?? 1),
          top: (face.y * imageSize.height) / (image?.height ?? 1),
          width: (face.width * imageSize.width) / (image?.width ?? 1),
          height: (face.height * imageSize.height) / (image?.height ?? 1),
          pointerEvents: "none",
        }}
      />
    ));
  }

  const {
    width: parentWidth,
    height: parentHeight,
  } = parentRef.current?.getBoundingClientRect() ?? { width: 700, height: 800 };

  const MAX_WIDTH = 1200;
  const imageMaxHeight = !expanded
    ? "70vh"
    : image!.height! <= 800
    ? image!.height
    : "100%";

  return (
    <div
      className="flex flex-1 flex-col lg:min-w-image md:min-w-sm"
      style={{
        maxWidth: MAX_WIDTH,
        flexBasis: MAX_WIDTH,
        // width: "100%", // Math.max(MIN_WIDTH, Math.min(image.width, MAX_WIDTH)),
      }}
    >
      <div
        className="relative rounded"
        ref={(r) => (parentRef.current = r)}
        style={{
          maxHeight: imageMaxHeight!,
        }}
      >
        {image.mimetype !== MimeType.Gif && (
          <img
            src={image.rawUrl}
            style={{
              // ...(image.width! < 1000 ? { filter: "blur(2px)" } : {}),
              boxShadow: "inset 0 0 30px 15px #212121",
              zIndex: -1,
              // WebkitMaskImage:
              //   "linear-gradient(to top, transparent 2%, black 95%)",
            }}
            className="absolute w-full opacity-[0.04] max-h-full object-cover object-center"
          />
        )}
        {shouldBeExpandable && (
          <div
            className="absolute right-full height-full mr-2 xl:block hidden rounded cursor-pointer"
            title="Toggle expanded view"
            onClick={(e) => toggleExpanded()}
          >
            <div className="sticky top-0 p-1 bg-theme-alt">
              {expanded ? <FaCompress /> : <FaExpand />}
            </div>
          </div>
        )}
        <div
          className="left-0 right-0 absolute mx-auto pointer-events-none top-0"
          style={{
            maxWidth: image!.width! <= 1200 ? image.width! : "100%",
            width: imageRef.current?.width,
            maxHeight: imageMaxHeight!,
          }}
        >
          {renderFaces(image.unknownFaces)}
          {image.appearances.flatMap((appearance, i) =>
            renderFaces(appearance.faces, appearance)
          )}
        </div>
        <img
          ref={(input) => {
            imageRef.current = input;
            // onLoad replacement for SSR
            if (!input) {
              return;
            }
            const img = input;

            const updateFunc = () => {
              setLoaded(true);
            };
            img.onload = updateFunc;
            img.onerror = () => {
              updateFunc();
              img.onerror = null;
            };
            if (img.complete) {
              updateFunc();
            }
          }}
          src={image.rawUrl}
          onMouseEnter={(_) => setActive(true)}
          onMouseLeave={(_) => setActive(false)}
          {...(loaded ? {} : { width: image.width })}
          height={image.height!}
          style={{
            flexBasis: image.width! <= 1200 ? image.width! : "100%",
            maxHeight: image.height! <= 800 ? image.height! : "100%",
          }}
          className="flex object-contain overflow-hidden m-auto rounded"
        />
      </div>

      <section className="mt-6">
        {/* <h2 className="text-lg font-semibold mb-3 mt-3">
            Appearing in this Image
          </h2> */}
        <CascadeChildren className="grid faces-grid flex-row gap-4">
          {image.unknownFaces?.map((face) => {
            return <PersonPortrait src={image.rawUrl} face={face} />;
          })}
          {image.appearances?.map((appearance) => {
            const [face] = appearance.faces;
            return (
              <PersonPortrait
                src={image.rawUrl}
                appearance={appearance}
                face={face}
                prediction={
                  face &&
                  facePredictions?.find((f) => f.face === face.id)?.matches[0]
                }
              />
            );
          })}
        </CascadeChildren>
      </section>
    </div>
  );
}
