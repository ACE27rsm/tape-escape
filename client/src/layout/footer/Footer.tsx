import { Box } from "@chakra-ui/react";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="h-max !p-2 !px-6 flex justify-between items-center !text-[#8103ff] !text-sm !font-semibold ">
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
        <div>Graphic Design: Lucia Zavatta </div>
      </div>
      <div>Powerd by TMDB</div>
    </div>
  );
};

export default Footer;
