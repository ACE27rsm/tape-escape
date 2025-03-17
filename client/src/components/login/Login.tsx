/// * utils
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import cn from "../../utils/cn";

/// * hooks
import { USER_LOGIN } from "../../store/actions";

/// * hooks
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

/// * components
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Login = () => {
  /// y ***************************************************
  const dispatch = useAppDispatch();
  const [sateLastAction, setStateLastAction] = useState<number>(Date.now());
  const [stateUsername, setStateUsername] = useState<string>("");
  const [statePassword, setStatePassword] = useState<string>("");
  const loginError = useAppSelector((state) => state.user.error);
  const navigate = useNavigate();

  /// ? ***************************************************
  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (Date.now() - sateLastAction > 10_000) {
        navigate("/");
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
      <div className="text-center !text-9xl">LOGIN</div>

      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col gap-4 w-[500px]"
      >
        <Input
          label="username"
          InputProps={{ placeholder: "insert username..." }}
          classeNames={{
            label: ["!text-2xl"],
          }}
          value={stateUsername}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        <Input
          label="password"
          InputProps={{ placeholder: "insert password..", type: "password" }}
          classeNames={{
            label: ["!text-2xl"],
          }}
          value={statePassword}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <Button type="submit">START</Button>
      </form>

      {loginError && (
        <div className="text-red-500 !text-lg  max-w-96 text-center">
          {loginError}
        </div>
      )}
    </div>
  );
};

export default Login;
