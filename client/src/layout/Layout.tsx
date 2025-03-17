import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useEffect, useRef } from "react";

/// * hooks
import { useAppSelector } from "../hooks/useRedux";

import Login from "@/components/login/Login";

/// * hooks
import useMouseEvents from "../hooks/useMouseEvents";

/// * components
import LoadingBar from "@/components/loading-bar/LoadingBar";
import Startup from "@/components/startup/Startup";
import Intro from "../components/intro/Intro";
import LayoutDesign from "./Layout.Design";
import LayoutMonitor from "./Layout.Monitor";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router";

gsap.registerPlugin(useGSAP);

const Layout = ({ children }: { children: ReactNode }) => {
  /// y ***************************************************
  const container = useRef<HTMLElement>(null);
  const uiStatus = useAppSelector((state) => state.ui.status);
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => !!state.user.username);
  useMouseEvents();

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
                className="overflow-y-auto h-full !p-10 relative"
                bg={
                  uiStatus === "init"
                    ? "gray.800"
                    : uiStatus === "loading"
                      ? "gray.500"
                      : "yellow.500"
                }
              >
                {uiStatus === "init" && <Startup />}
                {uiStatus === "loading" && <LoadingBar />}
                {uiStatus === "ready" && children}
              </Box>
            </LayoutMonitor>
          </LayoutDesign>
        </div>
      </main>
    </>
  );
};

export default Layout;
