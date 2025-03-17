import LayoutScreenLayerBlueScreen from "./Layout.ScreenLayer.BlueScreen";

const LayoutScreenLayer = () => {
  return (
    <main className="fixed top-0 left-0 w-dvw h-[800px] min-h-dvh flex justify-center items-center overflow-hidden !z-[50000] pointer-events-none">
      <div
        className="absolute w-[92vw] max-w-[1500px] min-w-[1000px] h-[90vh] !min-h-[600px] max-h-[800px] !py-8 !px-4 rounded-xl"
        style={{
          transform:
            "perspective(1000px) rotateY(0deg) rotateX(10deg) translateX(0px) translateY(-2.5vh)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="w-full h-full relative">
          <div className="!rounded-4xl overflow-hidden h-full relative !border-black-500 !border-r-8 !border-t-8 !border-l-8 opacity-100">
            <div className="absolute w-full h-full top-0 left-0 bg-[#66ff00] pointer-events-none !z-5000 opacity-20"></div>
            <div
              className="absolute w-full h-full top-0 left-0 pointer-events-none opacity-55"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(175,164,164,0) 86%, rgba(55,55,55,1) 100%)",
              }}
            ></div>
          </div>
        </div>
      </div>

      <LayoutScreenLayerBlueScreen />
    </main>
  );
};

export default LayoutScreenLayer;
