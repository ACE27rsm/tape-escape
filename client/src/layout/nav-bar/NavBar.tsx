import Avatar from "../../components/avatar/Avatar";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center !p-2 !px-8">
      <div className="flex items-center gap-4">
        <img src="images/logos/te-logo.svg" alt="logo" className="!h-10" />
        <div>
          <h1 className="!text-3xl text-[#8103ff] leading-4">TAPE ESCAPE</h1>
          <h2 className="text-xs leading-4">rent your favorite movie</h2>
        </div>
      </div>
      <Avatar />
    </div>
  );
};

export default NavBar;
