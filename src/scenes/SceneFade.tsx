import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FADE_FRAMES } from "../theme";

type Props = {
  children: React.ReactNode;
  fadeIn?: boolean;
  fadeOut?: boolean;
};

// Fades a scene in at its start and out at its end, so cuts feel smooth.
export const SceneFade: React.FC<Props> = ({ children, fadeIn = true, fadeOut = true }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacityIn = fadeIn
    ? interpolate(frame, [0, FADE_FRAMES], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const opacityOut = fadeOut
    ? interpolate(frame, [durationInFrames - FADE_FRAMES, durationInFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return <AbsoluteFill style={{ opacity: Math.min(opacityIn, opacityOut) }}>{children}</AbsoluteFill>;
};
