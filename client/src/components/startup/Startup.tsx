import { animate, motion, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/// * hooks
import { useAppDispatch } from "../../hooks/useRedux";

/// * actions
import { UI_STATUS } from "../../store/actions";

const Startup = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();
  const [stateReady, setStateReady] = useState(false);

  const memoryRef = useRef<HTMLSpanElement>(null);
  const memoryValue = useSpring(0);

  const [statePnPReady, setStatePnPReady] = useState(false);

  const [stateIDEMaster, setStateIDEMaster] = useState(false);
  const IDEMasterRef = useRef<HTMLSpanElement>(null);

  const [stateIDESlave, setStateIDESlave] = useState(false);

  const [stateIDEMasterSecondary, setStateIDEMasterSecondary] = useState(false);
  const IDEMasterSecondaryRef = useRef<HTMLSpanElement>(null);

  const [stateIDESlaveSecondary, setStateIDESlaveSecondary] = useState(false);
  const IDESlaveSecondaryRef = useRef<HTMLSpanElement>(null);

  const [stateFloppy, setStateFloppy] = useState(false);

  /// ? ***************************************************
  useEffect(() => {
    const timeoute = setTimeout(() => {
      setStateReady(true);
    }, 1000);
    return () => {
      clearTimeout(timeoute);
    };
  }, []);

  /// ? ***************************************************
  useEffect(() => {
    const element = memoryRef.current;

    if (!element) return;
    if (!stateReady) return;

    let control = animate(memoryValue, 65528, {
      onUpdate: (value) => {
        element.textContent = value.toFixed(0);
      },
      type: "tween",
      duration: 1.5,
      onComplete: () => {
        element.textContent = "65536 OK";
        setStatePnPReady(true);
      },
    });

    return () => {
      control.stop();
    };
  }, [memoryRef, stateReady]);

  /// ? ***************************************************
  useEffect(() => {
    const element = IDEMasterRef.current;

    if (!element) return;
    if (!stateIDESlave) return;

    const timeout = setTimeout(() => {
      element.textContent = "WDC WD3200AAJS-00RYA0 12.01B 500GB";
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [IDEMasterRef, stateIDESlave]);

  /// ? ***************************************************
  useEffect(() => {
    const element = IDEMasterSecondaryRef.current;

    if (!element) return;
    if (!stateIDESlaveSecondary) return;

    const timeout = setTimeout(() => {
      element.textContent = "ST9500325AS 0002SDM1";
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [IDEMasterSecondaryRef, stateIDESlaveSecondary]);

  /// ? ***************************************************
  useEffect(() => {
    const element = IDESlaveSecondaryRef.current;

    if (!element) return;
    if (!stateFloppy) return;

    const timeout = setTimeout(() => {
      element.textContent = "LITE-ON DVD SOHD-16P9S FS09";
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [IDESlaveSecondaryRef, stateFloppy]);

  /// m ***************************************************
  const handleComplete = useCallback(() => {
    setTimeout(() => {
      dispatch(UI_STATUS("loading"));
    }, 1000);
  }, []);

  /// m ***************************************************
  if (!stateReady) return null;

  /// m ***************************************************
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="bios flex max-w-[1000px] w-full h-max">
        <div className="grow flex  flex-col">
          <div className="flex items-center gap-1 !mt-16">
            <img src="/images/award-logo.png" alt="epa" className="w-10" />
            <p>
              Award Modular BIOS v4.506 an Energy Start Ally <br />
              Copyright (C) 1984-94, Award Software, Inc.
            </p>
          </div>

          <p className="!mt-8">
            ACPI BIOS Revision 1001 <br />
          </p>

          <p className="!mt-8">
            Intel(R) Pentium(R) PRO-MMX CPU at 133MHz <br />
            Memory Test: <span ref={memoryRef}></span>
          </p>

          <motion.p
            className="!mt-8"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            initial="hidden"
            transition={{ duration: 0.01, delay: 1.5 }}
            animate={statePnPReady ? "visible" : "hidden"}
            onAnimationComplete={() => {
              setStateIDEMaster(true);
            }}
          >
            Award Plug and Play BIOS Extension v1.0A <br />
            Inizialize Plug and Play Cards... PNP Init Completed
          </motion.p>
        </div>
        <img src="/images/epa.png" alt="epa" className="!h-[70%]" />
      </div>

      <div className="bios max-w-[1000px] w-full whitespace-pre">
        <motion.p
          className="!mt-8 w-full"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          initial="hidden"
          transition={{ duration: 0.01, delay: 0.5 }}
          animate={stateIDEMaster ? "visible" : "hidden"}
          onAnimationComplete={() => {
            setStateIDESlave(true);
          }}
        >
          Detecting IDE Primary Master{"  "}...{" "}
          <span ref={IDEMasterRef}>
            [Press <span style={{ color: "white" }}>F4</span> to skip]
          </span>
        </motion.p>
      </div>

      <div className="bios max-w-[1000px] w-full whitespace-pre">
        <motion.p
          className="w-full !mt-1"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          initial="hidden"
          transition={{ duration: 0.01, delay: 0.5 }}
          animate={stateIDESlave ? "visible" : "hidden"}
          onAnimationComplete={() => {
            setStateIDEMasterSecondary(true);
          }}
        >
          Detecting IDE Primary Slave{"   "}... None
        </motion.p>
      </div>

      <div className="bios max-w-[1000px] w-full">
        <motion.p
          className="w-full !mt-1"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          initial="hidden"
          transition={{ duration: 0.01, delay: 0 }}
          animate={stateIDEMasterSecondary ? "visible" : "hidden"}
          onAnimationComplete={() => {
            setStateIDESlaveSecondary(true);
          }}
        >
          Detecting IDE Secondary Master...{" "}
          <span ref={IDEMasterSecondaryRef}>
            [Press <span style={{ color: "white" }}>F4</span> to skip]
          </span>
        </motion.p>
      </div>

      <div className="bios max-w-[1000px] w-full">
        <motion.p
          className="w-full !mt-1"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          initial="hidden"
          transition={{ duration: 0.01, delay: 1.5 }}
          animate={stateIDESlaveSecondary ? "visible" : "hidden"}
          onAnimationComplete={() => {
            setStateFloppy(true);
          }}
        >
          Detecting IDE Secondary Slave ...{" "}
          <span ref={IDESlaveSecondaryRef}>
            [Press <span style={{ color: "white" }}>F4</span> to skip]
          </span>
        </motion.p>
      </div>

      <div className="bios max-w-[1000px] w-full !mt-16">
        <motion.p
          className="w-full !mt-1"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          initial="hidden"
          transition={{ duration: 0.01, delay: 0.5 }}
          animate={stateFloppy ? "visible" : "hidden"}
          onAnimationComplete={handleComplete}
        >
          Floppy disk(s) fail (40)
        </motion.p>
      </div>
    </div>
  );
};

export default Startup;
