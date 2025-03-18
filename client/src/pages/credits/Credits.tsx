import Footer from "@/layout/footer/Footer";
import NavBar from "@/layout/nav-bar/NavBar";
import React from "react";
import { FaChevronLeft, FaGithub } from "react-icons/fa";
import { PiCowBold } from "react-icons/pi";
import { Link } from "react-router";

const Credits = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center h-[calc(100%-137px)] gap-6 !p-6">
        <div className="w-full flex items-center gap-4 !text-orange-400">
          <FaChevronLeft />
          <Link to="/movies" className="!text-4xl outline-0">
            Back to Movies
          </Link>
        </div>
        <div className="!text-9xl !text-[#8103ff]">CREDITS</div>
        <div className="flex flex-col items-center justify-center">
          <div className="!text-4xl">This project was created by:</div>
          <div className="!text-7xl !text-blue-400">DANIELE SALVATORI</div>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/ACE27rsm"
              target="_blank"
              rel="noreferrer"
              className="!text-6xl"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="!text-4xl">Graphic Design by:</div>
          <div className="!text-7xl !text-pink-600">LUCIA ZAVATTA</div>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.luciazavatta.com"
              target="_blank"
              rel="noreferrer"
              className="!text-6xl"
            >
              <PiCowBold />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Credits;
