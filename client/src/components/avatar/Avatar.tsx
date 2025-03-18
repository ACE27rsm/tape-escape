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
  const handleNavigate = useCallback((path: string) => {
    dispatch(USER_LOGOUT());
  }, []);

  /// + ***************************************************
  const handleLogOut = useCallback(() => {
    dispatch(USER_LOGOUT());
  }, []);

  /// m ***************************************************
  if (!user) return null;

  return (
    <div>
      <MenuRoot positioning={{ placement: "left-start" }}>
        <MenuTrigger asChild>
          <img
            src={user.avatar}
            alt="avatar"
            className="object-cover w-16 h-16 rounded-full cursor-pointer"
          />
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
            HI, {user.firstName} {user.lastName.toUpperCase()}
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
