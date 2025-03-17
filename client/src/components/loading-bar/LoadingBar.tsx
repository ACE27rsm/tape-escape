import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

/// * utils
import getRandoNumber from "../../utils/getRandoNumber";

/// * hooks
import { useAppDispatch } from "../../hooks/useRedux";

/// * actions
import { Box, Text } from "@chakra-ui/react";
import { UI_STATUS } from "../../store/actions";

/// * components
import LottieAnimation from "../lottie-animation/LottieAnimation";

const LoadingBar = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();
  const [stateProgress, setStateProgress] = useState<number>(0);

  /// ? ***************************************************
  useEffect(() => {
    const ms = getRandoNumber(100, 1000);

    let timeOut = setTimeout(() => {
      console.log("A");
      setStateProgress((prev) => prev + 1);
    }, ms);

    return () => {
      clearTimeout(timeOut);
    };
  }, [stateProgress]);

  /// + ***************************************************
  const handleComplete = useCallback(() => {
    setTimeout(() => dispatch(UI_STATUS("ready")), 1000);
  }, []);

  /// m ***************************************************
  return (
    <Box className="w-full h-full flex justify-center items-center flex-col">
      <Text className="!text-8xl !text-primary" color="#8103ff">
        LOADING
      </Text>
      <div className="flex justify-center gap-2 [&>div]:bg-[white] !mt-5">
        <motion.div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238103ff' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          }}
          className="w-10 h-10 opacity-0"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 0 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238103ff' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          }}
          className="w-10 h-10 opacity-0"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 1 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238103ff' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          }}
          className="w-10 h-10 opacity-0"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 2 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238103ff' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          }}
          className="w-10 h-10 opacity-0"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 3 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238103ff' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          }}
          className="w-10 h-10 opacity-0"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 4 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238103ff' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          }}
          className="w-10 h-10 opacity-0"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 5 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238103ff' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          }}
          className="w-10 h-10 opacity-0"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 6 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238103ff' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          }}
          className="w-10 h-10 opacity-0"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 7 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238103ff' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          }}
          className="w-10 h-10 opacity-0"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 8 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238103ff' stroke-width='7' stroke-dasharray='10%2c 1' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          }}
          className="w-10 h-10 opacity-0"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 9 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
          onAnimationComplete={handleComplete}
        />
      </div>
      <div className="!mt-4 w-56 h-56">
        <LottieAnimation animationPath="/lotties/hourglass.json" loop />
      </div>
    </Box>
  );
};

export default LoadingBar;
