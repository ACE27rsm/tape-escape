import { FaGithub } from "react-icons/fa";
import { PiCowBold } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="h-max !p-2 !px-6 flex justify-between items-center !text-sm !font-semibold">
      <div>
        <div className="flex items-center gap-2">
          Author: Daniele Salvatori{" "}
          <a
            href="https://github.com/ACE27rsm"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </div>
        <div className="flex items-center gap-2">
          Graphic Design: Lucia Zavatta{" "}
          <a
            href="https://www.luciazavatta.com"
            target="_blank"
            rel="noreferrer"
          >
            <PiCowBold />
          </a>
        </div>
      </div>
      <div className="!text-[#8103ff] flex items-center gap-2">
        <div className="text-center">
          <div>Powered by TMDB</div>
          <div>Thank you TMDB, thank you so much! ❤️</div>
        </div>
        <div className="!p-2 bg-[#0d253f] rounded-lg">
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="images/logos/tmdb-logo.svg"
              alt="tmdb logo"
              className="!h-6"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
