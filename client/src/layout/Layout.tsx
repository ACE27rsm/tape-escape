import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/// * hooks
import { useAppSelector } from "../hooks/useRedux";

import NavBar from "./nav-bar/NavBar";
import CRT from "./crt-effects/CRTEffects";
import Login from "@/components/login/Login";

/// * hooks
import useMouseEvents from "../hooks/useMouseEvents";

/// * components
import LayoutIntro from "./Layout.Intro";
import LayoutDesign from "./Layout.Design";
import LayoutMonitor from "./Layout.Monitor";

gsap.registerPlugin(useGSAP);

const Layout = ({ children }: { children: ReactNode }) => {
  /// y ***************************************************
  const container = useRef<HTMLElement>(null);
  const uiStatus = useAppSelector((state) => state.ui.status);
  useMouseEvents();

  /// ? ***************************************************
  useGSAP(
    () => {
      // gsap code here...
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
    },
    { scope: container }
  );

  /// m ***************************************************
  return (
    <>
      <main
        ref={container}
        className="h-[800px] min-h-dvh flex justify-center items-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(0deg, rgba(193,68,204,1) 0%, rgba(79,20,84,1) 79%, rgba(5,0,0,1) 100%)",
        }}
      >
        <div
          className="absolute w-[92vw] max-w-[1500px] min-w-[1000px] h-[90vh] !min-h-[600px] max-h-[800px] !py-8 !px-4 rounded-xl"
          style={{
            transform:
              "perspective(1000px) rotateY(0deg) rotateX(10deg) translateX(0px) translateY(-2.5vh)",
            transformStyle: "preserve-3d",
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(175,164,164,1) 12%, rgba(5,0,0,1) 100%)",
          }}
        >
          <LayoutDesign>
            <LayoutMonitor>
              {uiStatus === "intro" && <LayoutIntro />}
              {uiStatus === "login" && <Login />}
            </LayoutMonitor>
          </LayoutDesign>
        </div>
      </main>
    </>
  );
};

export default Layout;
