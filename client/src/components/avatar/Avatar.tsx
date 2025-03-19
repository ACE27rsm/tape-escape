import { Box } from "@chakra-ui/react";
import { useCallback } from "react";
import { Link } from "react-router";

/// * hooks
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

/// * components
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";

/// * actions
import { USER_LOGOUT } from "../../store/actions";

const Avatar = () => {
  /// y ***************************************************
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  /// + ***************************************************
  const handleLogOut = useCallback(() => {
    dispatch(USER_LOGOUT());
  }, []);

  /// m ***************************************************
  if (!user.username) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="!text-4xl !text-[#8103ff]">
        HI, {user.firstName} {user.lastName.toUpperCase()}
      </div>
      <MenuRoot positioning={{ placement: "left-start" }}>
        <MenuTrigger asChild>
          <div
            className="!border-4 !border-pink-500"
            style={{
              clipPath:
                "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)",
            }}
          >
            <img
              src={user.avatar}
              alt="avatar"
              className="object-cover w-16 !h-14 cursor-pointer"
            />
          </div>
        </MenuTrigger>

        <MenuContent
          zIndex={0}
          className="!bg-pink-500"
          style={{
            transform:
              "perspective(400px) rotateY(10deg) rotateX(40deg) translateX(0px) translateY(10px)",
            transformStyle: "preserve-3d",
          }}
        >
          <Box>
            {user.firstName} {user.lastName.toUpperCase()}
          </Box>
          <MenuItem value="rent-history">
            <Link className="outline-0" to="/rent-history">
              Rent History
            </Link>
          </MenuItem>
          <MenuItem value="credits">
            <Link className="outline-0" to="/credits">
              Credits
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogOut} value="logout" color={"blue.500"}>
            Log Out
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </div>
  );
};

export default Avatar;
