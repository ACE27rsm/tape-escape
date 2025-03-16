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
}

export default useMouseEvents;
