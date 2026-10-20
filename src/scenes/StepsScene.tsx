import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ImageCamera } from "../ImageCamera";
import { colors, fontFamily } from "../theme";
import { SceneFade } from "./SceneFade";

const STEPS = [
  { title: "Understand the data", text: "Sources, fields and business logic", accent: "#a78bfa" },
  { title: "Design the model", text: "Tables, keys and relationships", accent: colors.cyan },
  { title: "Optimise", text: "Data types, aggregations, performance", accent: colors.green },
  { title: "Support analysis", text: "Easy to use in Power BI", accent: colors.orange },
  { title: "Create value", text: "Better reports and decisions", accent: colors.indigo },
];

const STAGGER = 7;
const TAGLINE_DELAY = 50;

export const StepsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  const camera = interpolate(frame, [0, durationInFrames], [0, 1]);
  const headingIn = spring({ frame, fps, config: { damping: 200 } });

  const taglineIn = spring({ frame: frame - TAGLINE_DELAY, fps, config: { damping: 200 } });
  const pulse = (Math.sin(((frame - TAGLINE_DELAY) / fps) * Math.PI * 2) + 1) / 2;
  const glowBlur = interpolate(pulse, [0, 1], [16, 44]);
  const glowAlpha = interpolate(pulse, [0, 1], [0.3, 0.75]);

  return (
    <SceneFade fadeOut={false}>
      {/* Blurred backdrop: the "raw data -> model -> insight" sketch on the desk */}
      <AbsoluteFill style={{ backgroundColor: colors.bgFrom }}>
        <ImageCamera
          from={{ x: 700, y: 620, w: 460, h: 259 }}
          to={{ x: 740, y: 640, w: 400, h: 225 }}
          progress={camera}
          width={width}
          height={height}
          imageStyle={{ filter: "blur(3px) brightness(0.3) saturate(0.8)" }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 40%, transparent 0%, ${colors.bgFrom}cc 75%)` }} />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily, gap: 64 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 76,
            fontWeight: 800,
            color: colors.text,
            opacity: headingIn,
            transform: `translateY(${interpolate(headingIn, [0, 1], [30, 0])}px)`,
          }}
        >
          Five steps to a strong model
        </h2>

        <div style={{ display: "flex", gap: 24 }}>
          {STEPS.map((step, i) => {
            const pop = spring({ frame: frame - (8 + i * STAGGER), fps, config: { damping: 13, stiffness: 140 } });
            return (
              <div
                key={step.title}
                style={{
                  width: 320,
                  padding: "34px 26px",
                  borderRadius: 24,
                  background: "rgba(15, 23, 42, 0.82)",
                  border: `2px solid ${step.accent}66`,
                  boxShadow: `0 18px 50px rgba(0,0,0,0.4), 0 0 30px ${step.accent}22`,
                  opacity: interpolate(pop, [0, 1], [0, 1], { extrapolateRight: "clamp" }),
                  transform: `translateY(${interpolate(pop, [0, 1], [70, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: step.accent,
                    color: colors.bgFrom,
                    fontSize: 34,
                    fontWeight: 800,
                  }}
                >
                  {i + 1}
                </div>
                <h3 style={{ margin: "24px 0 0", fontSize: 34, fontWeight: 800, color: colors.text, lineHeight: 1.15 }}>{step.title}</h3>
                <p style={{ margin: "12px 0 0", fontSize: 25, color: colors.muted, lineHeight: 1.35 }}>{step.text}</p>
              </div>
            );
          })}
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 50,
            fontWeight: 700,
            color: colors.text,
            opacity: taglineIn,
            transform: `scale(${interpolate(taglineIn, [0, 1], [0.9, 1])})`,
            textShadow: `0 0 ${glowBlur}px rgba(242, 200, 17, ${glowAlpha})`,
          }}
        >
          Good data models are the foundation for better decisions.
        </p>
      </AbsoluteFill>
    </SceneFade>
  );
};
