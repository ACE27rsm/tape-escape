import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback } from "react";
import { useNavigate } from "react-router";

/// * components
import { Button } from "../ui/button";

const Intro = () => {
  /// y ***************************************************
  const navigate = useNavigate();

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
    navigate("/movies");
  }, []);

  /// m ***************************************************
  return (
    <>
      <img
        id="logo"
        src="/images/tape-escape.jpg"
        alt="logo"
        className="absolute top-0 left-0 w-full !h-full object-cover"
      />
      <img
        id="broken-logo"
        src="/images/tape-escape-glitch.jpg"
        alt="logo"
        className="absolute top-0 left-0 w-full !h-full object-cover opacity-0"
      />

      <div className="w-full h-full flex justify-center items-end">
        <Button onClick={handleStartLogin}>START</Button>
      </div>
    </>
  );
};

export default Intro;
