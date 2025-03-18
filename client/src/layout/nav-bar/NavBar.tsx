import Avatar from "../../components/avatar/Avatar";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center !p-2 !px-8">
      <div className="flex items-center gap-4">
        <img src="images/logos/te-logo.svg" alt="logo" className="!h-10" />
        <div className="flex flex-col gap-1 justify-center !mt-4">
          <h1 className="!text-3xl leading-4">TAPE ESCAPE</h1>
          <h2 className="text-xs leading-4">rent your favorite movie</h2>
        </div>
      </div>
      <Avatar />
    </div>
  );
};

export default NavBar;
