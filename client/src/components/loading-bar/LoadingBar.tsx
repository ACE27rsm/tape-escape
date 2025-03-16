import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

/// * utils
import getRandoNumber from "../../utils/getRandoNumber";

/// * hooks
import { useAppDispatch } from "../../hooks/useRedux";

/// * actions
import { Box, Text } from "@chakra-ui/react";
import { UI_STATUS } from "../../store/actions";

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
    setTimeout(() => dispatch(UI_STATUS("intro")), 1000);
  }, []);

  /// m ***************************************************
  return (
    <Box className="w-full h-full flex justify-center items-center flex-col">
      <Text className="!text-8xl !text-primary" color="pink.focusRing">
        LOADING
      </Text>
      <div className="w-96 flex justify-center gap-4 [&>div]:bg-[#ff00ea] !mt-5">
        <motion.div
          className="w-10 h-10 opacity-0 rounded-full"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 0 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="w-10 h-10 opacity-0 rounded-full"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 1 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="w-10 h-10 opacity-0 rounded-full"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 2 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="w-10 h-10 opacity-0 rounded-full"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 3 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="w-10 h-10 opacity-0 rounded-full"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 4 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="w-10 h-10 opacity-0 rounded-full"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 5 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="w-10 h-10 opacity-0 rounded-full"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 6 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="w-10 h-10 opacity-0 rounded-full"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 7 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="w-10 h-10 opacity-0 rounded-full"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate={stateProgress > 8 ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="w-10 h-10 opacity-0 rounded-full"
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
    </Box>
  );
};

export default LoadingBar;
