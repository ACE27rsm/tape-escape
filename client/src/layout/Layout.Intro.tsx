import React, { useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/// * components
import { Button } from "../components/ui/button";

/// * actions
import { UI_STATUS } from "../store/actions";

/// * hooks
import { useAppDispatch } from "../hooks/useRedux";

const LayoutIntro = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();

  /// ? ***************************************************
  useGSAP(() => {
    const tl = gsap.timeline();

    const logoAnimation = function () {
      tl.to("#logo", { opacity: 0, duration: 0.01 }, ">0.2");
      tl.to("#logo", { opacity: 1, duration: 0.01 }, ">0.3");
      tl.to("#broken-logo", { opacity: 1, duration: 0.1 }, ">1");
      tl.to("#broken-logo", { opacity: 0, duration: 0.1 }, ">0.1");
      tl.to("#broken-logo", { opacity: 1, duration: 0.1 }, ">1.5");
      tl.to("#broken-logo", { opacity: 0, duration: 0.1 }, ">1");
      tl.to("#logo", { opacity: 0, duration: 0.01 }, ">0.2");
      tl.to(
        "#logo",
        { opacity: 1, duration: 0.01, onComplete: () => logoAnimation() },
        ">0.01"
      );
    };

    logoAnimation();
  }, {});

  /// + ***************************************************
  const handleStartLogin = useCallback(() => {
    dispatch(UI_STATUS("login"));
  }, []);

  /// m ***************************************************
  return (
    <>
      <img
        id="logo"
        src="/images/glitch-bg_TAPE-ESCAPE_v2.jpg"
        alt="logo"
        className="absolute top-0 left-0 w-full !h-full object-cover"
      />
      <img
        id="broken-logo"
        src="/images/glitch-bg_TAPE-ESCAPE.jpg"
        alt="logo"
        className="absolute top-0 left-0 w-full !h-full object-cover opacity-0"
      />

      <div className="w-full h-full flex justify-center items-end">
        <Button onClick={handleStartLogin}>LOGIN</Button>
      </div>
    </>
  );
};

export default LayoutIntro;
