import { DialogContent, DialogPositioner, DialogRoot } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { CloseButton } from "../ui/close-button";

/// * hooks
import useFetch from "../../hooks/useFetch";

/// * utils
import getRandoNumber from "../../utils/getRandoNumber";

/// * types
import { IUser } from "../../../../types";

/// * components
import { Button } from "../ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const LoginUsers = ({ onSelect }: { onSelect: (user: IUser) => void }) => {
  /// ? ***************************************************
  const { data } = useFetch("/user/test-users");
  const [stateUserModalOpen, setStateUserModalOpen] = useState(false);

  /// + ***************************************************
  const handelLogin = useCallback(
    (user: IUser) => {
      onSelect(user);
      setStateUserModalOpen(false);
    },
    [onSelect]
  );

  /// o ***************************************************
  const userToLogin = useMemo(() => {
    if (data) {
      const index = getRandoNumber(0, data.length);
      return data[index];
    }
  }, [data]);

  console.log(data);

  if (!userToLogin) {
    return null;
  }

  return (
    <div className="">
      <Button
        className="!bg-green-500 hover:!bg-green-600"
        onClick={() => setStateUserModalOpen(true)}
      >
        Need Help To LogIn???
      </Button>

      <DialogRoot placement="center" open={stateUserModalOpen}>
        <DialogPositioner
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "fixed",
          }}
        >
          <DialogContent
            className="!bg-pink-500 !rounded-lg !shadow-lg"
            style={{
              transform:
                "perspective(400px) rotateY(0deg) rotateX(5deg) translateX(0px) translateY(5px)",
              transformStyle: "preserve-3d",
            }}
          >
            <DialogHeader>
              <DialogTitle>NEED HELP TO LOGING??</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <p className="!text-xl">
                Log In as a test user to rent a movie. <br /> You will be able
                to rent a movie for free.
              </p>

              <div className="flex items-center gap-2 !mt-4">
                <div
                  className="!border-4 !border-white"
                  style={{
                    clipPath:
                      "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)",
                  }}
                >
                  <img
                    src={userToLogin.avatar}
                    alt="avatar"
                    className="object-cover w-16 !h-16 cursor-pointer"
                  />
                </div>

                <div>
                  <div>Log In as:</div>
                  <div className="!text-2xl !text-white">
                    {userToLogin.firstName} {userToLogin.lastName}{" "}
                  </div>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => handelLogin(userToLogin)}>LOG IN</Button>
            </DialogFooter>
            <DialogCloseTrigger asChild>
              <CloseButton
                onClick={() => setStateUserModalOpen(false)}
                className="!translate-z-96 !bg-red-500"
                size="sm"
              />
            </DialogCloseTrigger>
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </div>
  );
};

export default LoginUsers;
