import { useEffect } from "react";

/// * hooks
import { useAppDispatch } from "./useRedux";

/// * libs
import LoggerClient from "../libs/LoggerClient";

/// * actions
import { UI_BLUE_SCREEN } from "../store/actions";

const logger = new LoggerClient("useWindowEvents", { color: "pink" });

function useWindowEvents() {
  /// y *****************************************
  const dispatch = useAppDispatch();

  /// ? *****************************************
  useEffect(() => {
    function myFunction() {
      let browser = "";
      if (
        (navigator.userAgent.indexOf("Opera") ||
          navigator.userAgent.indexOf("OPR")) != -1
      ) {
        browser = "Opera";
      } else if (navigator.userAgent.indexOf("Edg") != -1) {
        browser = "Edge";
      } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        browser = "Chrome";
      } else if (navigator.userAgent.indexOf("Safari") != -1) {
        browser = "Safari";
      } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        browser = "Firefox";
      } else if (
        navigator.userAgent.indexOf("MSIE") != -1 ||
        //@ts-ignore
        !!document.documentMode == true
      ) {
        //IF IE > 10
        browser = "IE";
      } else {
        browser = "unknown";
      }

      logger.debug("Browser", browser);

      if (
        browser === "IE" ||
        browser === "Opera" ||
        browser === "Firefox" ||
        browser === "unknown"
      ) {
        dispatch(
          UI_BLUE_SCREEN(
            "THIS WEBSITE IS BEST VIEWED IN CHROME OR SAFARI, PLEASE SWITCH BROWSERS"
          )
        );
      } else {
        dispatch(UI_BLUE_SCREEN(""));
      }
    }

    myFunction();
  }, []);

  /// ? *****************************************
  useEffect(() => {
    function handleMouseClick(e: MouseEvent) {
      logger.debug("Mouse clicked", e.target);
    }

    window.addEventListener("click", handleMouseClick, true);

    return () => {
      window.removeEventListener("click", handleMouseClick, true);
    };
  }, []);

  /// ? *****************************************
  useEffect(() => {
    function handleScroll() {
      logger.debug("scroll");
    }

    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  /// ? *****************************************
  useEffect(() => {
    function handleResize() {
      logger.debug("resize");

      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width < 1100 || height < 800) {
        dispatch(UI_BLUE_SCREEN("VIEWPORT TOO SMALL - PLEASE RESIZE WINDOW"));
      } else {
        dispatch(UI_BLUE_SCREEN(""));
      }
    }

    window.addEventListener("resize", handleResize, true);

    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
  }, []);
}

export default useWindowEvents;
