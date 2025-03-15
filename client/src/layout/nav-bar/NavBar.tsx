import { ColorModeToggle } from "@/components/ui/color-mode-toggle";
import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <Box
      as="header"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100dvw",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          padding: 10,
          width: "80vw",
        }}
        className="rounded-lgshadow-lg"
      >
        <Box style={{ display: "flex", gap: 20 }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about-us">About Us</NavLink>
        </Box>

        <ColorModeToggle />
      </Box>
    </Box>
  );
};

export default NavBar;
