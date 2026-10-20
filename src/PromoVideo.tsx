import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { ModelScene } from "./scenes/ModelScene";
import { StepsScene } from "./scenes/StepsScene";
import { colors } from "./theme";

export const PROMO_FPS = 30;

// Scene lengths in frames (30 fps): 3 s + 4 s + 3 s = 10 s
export const SCENES = {
  intro: 90,
  model: 120,
  steps: 90,
} as const;

export const PROMO_DURATION = SCENES.intro + SCENES.model + SCENES.steps;

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgFrom }}>
      <Series>
        <Series.Sequence durationInFrames={SCENES.intro} name="Intro">
          <IntroScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.model} name="Data model">
          <ModelScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.steps} name="Five steps">
          <StepsScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
