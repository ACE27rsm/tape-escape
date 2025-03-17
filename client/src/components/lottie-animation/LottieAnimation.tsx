"use client";

import React, { useEffect, useRef, useState } from "react";
import type { LottiePlayer } from "lottie-web";

const Animation_Fireworks = ({
  animationPath,
  className,
  loop = false,
  autoplay = true,
}: {
  animationPath: string;
  className?: string;
  loop?: boolean | number;
  autoplay?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop,
        autoplay: true,

        // path to your animation file, place it inside public folder
        path: animationPath,
      });

      return () => animation.destroy();
    }
  }, [lottie, animationPath, loop]);

  return <div ref={ref} className={className || ""} />;
};

export default Animation_Fireworks;
