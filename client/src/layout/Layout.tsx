import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useEffect, useRef } from "react";

/// * hooks
import { useAppSelector } from "../hooks/useRedux";

/// * hooks
import useMouseEvents from "../hooks/useMouseEvents";

/// * components
import LoadingBar from "@/components/loading-bar/LoadingBar";
import Startup from "@/components/startup/Startup";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import LayoutDesign from "./Layout.Design";
import LayoutMonitor from "./Layout.Monitor";
import getRandomNumber from "@/utils/getRandoNumber";

gsap.registerPlugin(useGSAP);

const Layout = ({ children }: { children: ReactNode }) => {
  /// y ***************************************************
  const container = useRef<HTMLElement>(null);
  const uiStatus = useAppSelector((state) => state.ui.status);
  const navigate = useNavigate();
  useMouseEvents();

  /// ? ***************************************************
  useGSAP(() => {
    function skewY() {
      const tl = gsap.timeline();
      tl.to("#layout-wrapper", {
        skewType: "simple",
        skewY: 10,
        duration: 0.001,
      });
      tl.to(
        "#layout-wrapper",
        { skewX: 0, skewY: 0, duration: 0.001 },
        "+=0.1"
      );
    }
    function skewX() {
      const tl = gsap.timeline();
      tl.to("#layout-wrapper", {
        skewType: "simple",
        skewX: 30,
        duration: 0.001,
      });
      tl.to(
        "#layout-wrapper",
        { skewX: 0, skewY: 0, duration: 0.001 },
        "+=0.1"
      );
    }

    function skew() {
      const ms = getRandomNumber(2000, 5000);

      const skewAnimation = getRandomNumber(0, 1) > 0.5 ? skewX : skewY;

      setTimeout(() => {
        skewAnimation();
        setTimeout(() => {
          skew();
        }, ms);
      }, ms);
    }

    skew();
  }, {});

  /// ? ***************************************************
  useEffect(() => {
    navigate("/");
  }, []);

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
              <Box
                id="layout-wrapper"
                className="h-full w-full !translate-z-96"
                bg={
                  uiStatus === "init"
                    ? "gray.800"
                    : uiStatus === "loading"
                      ? "gray.500"
                      : "yellow.500"
                }
              >
                <div className="relative w-full h-full overflow-y-auto !translate-z-96">
                  {uiStatus === "init" && <Startup />}
                  {uiStatus === "loading" && <LoadingBar />}
                  {uiStatus === "ready" && children}
                </div>
              </Box>
            </LayoutMonitor>
          </LayoutDesign>
        </div>
      </main>
    </>
  );
};

export default Layout;
