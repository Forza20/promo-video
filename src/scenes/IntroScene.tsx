import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ImageCamera } from "../ImageCamera";
import { colors, fontFamily } from "../theme";
import { SceneFade } from "./SceneFade";

const SUBTITLE_DELAY = 18;

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  // Slow push-in on the person at the desk
  const camera = interpolate(frame, [0, durationInFrames], [0, 1], { easing: Easing.inOut(Easing.quad) });

  const titleSpring = spring({ frame: frame - 6, fps, config: { damping: 200, mass: 0.8 } });
  const titleScale = interpolate(titleSpring, [0, 1], [0.85, 1]);

  const subtitleSpring = spring({ frame: frame - SUBTITLE_DELAY, fps, config: { damping: 200 } });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [50, 0]);

  return (
    <SceneFade fadeIn={false}>
      <AbsoluteFill style={{ backgroundColor: colors.bgFrom }}>
        <ImageCamera
          from={{ x: 0, y: 180, w: 900, h: 506 }}
          to={{ x: 40, y: 205, w: 780, h: 439 }}
          progress={camera}
          width={width}
          height={height}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(to top, ${colors.bgFrom}f2 0%, ${colors.bgFrom}b3 30%, transparent 58%)`,
        }}
      />
      <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 120px 110px", fontFamily }}>
        <p
          style={{
            margin: 0,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: colors.yellow,
            opacity: titleSpring,
          }}
        >
          Power BI · Data modelling
        </p>
        <h1
          style={{
            margin: "14px 0 0",
            fontSize: 118,
            fontWeight: 800,
            lineHeight: 1.05,
            color: colors.text,
            opacity: titleSpring,
            transform: `scale(${titleScale})`,
            transformOrigin: "left bottom",
          }}
        >
          From raw data to value
        </h1>
        <p
          style={{
            margin: "22px 0 0",
            fontSize: 48,
            fontWeight: 500,
            color: colors.muted,
            opacity: subtitleSpring,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          It all starts with a solid data model
        </p>
      </AbsoluteFill>
    </SceneFade>
  );
};
