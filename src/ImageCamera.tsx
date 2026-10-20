import React from "react";
import { Img, interpolate, staticFile } from "remotion";

export const ILLUSTRATION = staticFile("datamodelling.png");
const IMAGE_SIZE = 1254; // source image is 1254 x 1254

export type Rect = { x: number; y: number; w: number; h: number };

type Props = {
  from: Rect;
  to: Rect;
  progress: number; // 0..1
  width: number;
  height: number;
  style?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
};

// Shows a region of the illustration that fills the box, moving from one
// region to another as progress goes from 0 to 1 (a "Ken Burns" camera).
export const ImageCamera: React.FC<Props> = ({ from, to, progress, width, height, style, imageStyle }) => {
  const lerp = (a: number, b: number) => interpolate(progress, [0, 1], [a, b]);
  const r = { x: lerp(from.x, to.x), y: lerp(from.y, to.y), w: lerp(from.w, to.w), h: lerp(from.h, to.h) };

  const scale = Math.max(width / r.w, height / r.h);
  const tx = -r.x * scale + (width - r.w * scale) / 2;
  const ty = -r.y * scale + (height - r.h * scale) / 2;

  return (
    <div style={{ position: "relative", width, height, overflow: "hidden", ...style }}>
      <Img
        src={ILLUSTRATION}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          transformOrigin: "0 0",
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          ...imageStyle,
        }}
      />
    </div>
  );
};
