import React from "react";
import { Composition } from "remotion";
import { PromoVideo, PROMO_DURATION, PROMO_FPS } from "./PromoVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PromoVideo"
      component={PromoVideo}
      durationInFrames={PROMO_DURATION}
      fps={PROMO_FPS}
      width={1920}
      height={1080}
    />
  );
};
