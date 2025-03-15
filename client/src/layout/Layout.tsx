import { ReactNode } from "react";
import NavBar from "./nav-bar/NavBar";
import CRT from "./crt-effects/CRTEffects";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="relative bg-gray-700 min-h-dvh">
        <NavBar />
        <main className="pt-32">{children}</main>
      </main>

      <CRT />
    </>
  );
};

export default Layout;
