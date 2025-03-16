/// * utils
import cn from "../../utils/cn";
import { useEffect, useState } from "react";

/// * hooks
import { UI_STATUS } from "../../store/actions";

/// * hooks
import { useAppDispatch } from "../../hooks/useRedux";

/// * components
import Input from "../ui/input";
import { Button } from "../ui/button";

const Login = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();
  const [sateLastAction, setStateLastAction] = useState<number>(Date.now());

  /// ? ***************************************************
  useEffect(() => {
    let timeOut = setTimeout(() => {
      dispatch(UI_STATUS("intro"));
    }, 10_000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [sateLastAction]);

  /// m ***************************************************
  return (
    <div
      className={cn([
        "w-full h-full",
        "flex justify-center items-center flex-col gap-4",
        "!text-5xl",
      ])}
    >
      <div className="text-center">LOGIN</div>

      <Input
        label="username"
        InputProps={{ placeholder: "insert username..." }}
      />

      <Input
        label="username"
        InputProps={{ placeholder: "insert password..", type: "password" }}
      />

      <Button onClick={() => console.log("CLICKKKK")}>LOGIN</Button>
    </div>
  );
};

export default Login;
