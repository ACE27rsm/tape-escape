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
        dispatch(UI_BLUE_SCREEN(true));
      } else {
        dispatch(UI_BLUE_SCREEN(false));
      }
    }

    window.addEventListener("resize", handleResize, true);

    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
  }, []);
}

export default useWindowEvents;
