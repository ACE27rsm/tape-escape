import { useEffect } from "react";

function useWindowEvents() {
  /// ? *****************************************
  useEffect(() => {
    function handleMouseClick(e: MouseEvent) {
      console.log("Mouse clicked", e.target);

      // setTimeout(() => {
      //   const menuElements = document.querySelectorAll(
      //     "[data-scope=menu][data-part=positioner]"
      //   );
      //   console.log(menuElements);

      //   menuElements.forEach((menuElement) => {
      //     menuElement.style.zIndex = -1
      //   });
      // }, 10);
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

export default useWindowEvents;
