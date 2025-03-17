import React from "react";

/// * hooks
import { useAppSelector } from "@/hooks/useRedux";

const LayoutScreenLayerBlueScreen = () => {
  /// y ***************************************************
  const isBlueScreen = useAppSelector((state) => state.ui.blueScreen);

  if (!isBlueScreen) return null;

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-800 !z=[10000] bios !text-white !p-4 !overflow-auto">
        <p>
          A problem has been detected and windows has been shut down to prevent
          damage to your computer.
          <br />
          <br />
          UNMOUNTABLE_BOOT_VOLUME
          <br />
          <br />
          If this is the first time you've seen this stop error screen, restart
          your computer. If this screen appears again, follow these steps:
          <br />
          <br />
          Check to be sure you have adequate disk space. If a driver is
          identified in the stop message, disable the driver or check with the
          manufacturer for driver updates. Try changing video adapters.
          <br />
          <br />
          if problem continues, disable or remove any newly installed hardware
          or software. Disable BIOS memory options such as caching or shadowing.
          If you need to use safe mode to remove or disable components, restart
          your computer, press F8 to select advanced startup options, and then
          select safe mode.
          <br />
          <br />
          technical information:
          <br />
          <br />
          *** STOP: 0x0000007E (0xC0000005, 0xF748E0BF, 0xF78DA208, 0xF78D9F08)
        </p>
      </div>
    </div>
  );
};

export default LayoutScreenLayerBlueScreen;
