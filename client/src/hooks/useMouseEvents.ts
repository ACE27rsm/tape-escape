import { useEffect } from "react";

function useMouseEvents() {
  /// ? *****************************************
  useEffect(() => {
    function handleMouseClick(e: MouseEvent) {
      console.log("Mouse clicked", e.target);
      //   e.stopPropagation();
      //   e.preventDefault();
    }

    window.addEventListener("click", handleMouseClick, true);

    return () => {
      window.removeEventListener("click", handleMouseClick, true);
    };
  }, []);

  /// ? *****************************************
  useEffect(() => {
    function handleScroll() {
      console.log("scroll");
      //   e.stopPropagation();
      //   e.preventDefault();
    }

    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);
}

export default useMouseEvents;
