/// * utils
import cn from "../../utils/cn";
import { FormEvent, useCallback, useEffect, useState } from "react";

/// * hooks
import { UI_STATUS, USER_LOGIN } from "../../store/actions";

/// * hooks
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

/// * components
import Input from "../ui/input";
import { Button } from "../ui/button";

const Login = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();
  const [sateLastAction, setStateLastAction] = useState<number>(Date.now());
  const [stateUsername, setStateUsername] = useState<string>("");
  const [statePassword, setStatePassword] = useState<string>("");
  const loginError = useAppSelector((state) => state.user.error);

  /// ? ***************************************************
  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (Date.now() - sateLastAction > 30_000) {
        dispatch(UI_STATUS("intro"));
      }
    }, 1_000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [sateLastAction]);

  /// + ***************************************************
  const handleLogin = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      console.log("AAA", { username: stateUsername, password: statePassword });
      dispatch(
        USER_LOGIN({ username: stateUsername, password: statePassword })
      );
    },
    [stateUsername, statePassword]
  );

  /// + ***************************************************
  const handleChange = useCallback(
    (type: "username" | "password", value: string) => {
      if (type === "username") {
        setStateUsername(value);
      } else {
        setStatePassword(value);
      }

      setStateLastAction(Date.now());
    },
    []
  );

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

      <form onSubmit={(e) => handleLogin(e)}>
        <Input
          label="username"
          InputProps={{ placeholder: "insert username..." }}
          value={stateUsername}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        <Input
          label="password"
          InputProps={{ placeholder: "insert password..", type: "password" }}
          value={statePassword}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <Button type="submit">LOGIN</Button>
      </form>

      {loginError && (
        <div className="text-red-500 !text-lg  max-w-64 text-center">
          {loginError}
        </div>
      )}
    </div>
  );
};

export default Login;
