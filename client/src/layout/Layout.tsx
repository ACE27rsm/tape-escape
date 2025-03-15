import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import NavBar from "./nav-bar/NavBar";
import CRT from "./crt-effects/CRTEffects";

gsap.registerPlugin(useGSAP);

const Layout = ({ children }: { children: ReactNode }) => {
  const container = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      // gsap code here...
      const tl = gsap.timeline();

      const logoAnimation = function () {
        tl.to("#broken-logo", { opacity: 1, duration: 0.1 }, ">1");
        tl.to("#broken-logo", { opacity: 0, duration: 0.1 }, ">0.1");
        tl.to("#broken-logo", { opacity: 1, duration: 0.1 }, ">1.5");
        tl.to("#broken-logo", { opacity: 0, duration: 0.1 }, ">1");
        tl.to("#logo", { opacity: 0, duration: 0.1 }, ">0.2");
        tl.to(
          "#logo",
          { opacity: 1, duration: 0.1, onComplete: () => logoAnimation() },
          ">0.01"
        );
      };

      logoAnimation();
    },
    { scope: container }
  ); // <-- scope is for selector text (optional)
  return (
    <>
      <main
        ref={container}
        className="h-[800px] min-h-dvh flex justify-center items-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(0deg, rgba(193,68,204,1) 0%, rgba(79,20,84,1) 79%, rgba(5,0,0,1) 100%)",
        }}
      >
        <div
          className="absolute w-[92vw] max-w-[1500px] min-w-[1000px] h-[90vh] !min-h-[600px] max-h-[800px] !py-8 !px-4 rounded-xl"
          style={{
            transform:
              "perspective(1000px) rotateY(0deg) rotateX(10deg) translateX(0px) translateY(-2.5vh)",
            transformStyle: "preserve-3d",
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(175,164,164,1) 12%, rgba(5,0,0,1) 100%)",
          }}
        >
          <div className="!text-9xl  !rounded-4xl overflow-hidden h-full relative !border-black-500 !border-r-8 !border-t-8 !border-l-8">
            <div
              className="overflow-y-auto h-full !p-10"
              style={{
                backgroundImage: "url('/images/glitch-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="min-h-full w-full text-5xl text-amber-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
                nam in esse quas natus animi eius deleniti architecto quam harum
                nihil voluptates odio, delectus numquam ipsam et itaque
                quibusdam quia! Debitis mollitia, quae velit corrupti laborum
                dicta libero sunt provident ex aliquam natus dolores tempore
                quis unde quia exercitationem est suscipit tenetur culpa
                delectus. Nobis rem sint facere corrupti expedita. Nulla
                dignissimos optio cumque autem suscipit alias voluptate magni
                enim. Sapiente aut neque autem beatae id impedit provident nisi
                aliquam vel vitae, adipisci assumenda voluptatem repellendus cum
                excepturi molestias nulla. Rem voluptatem eligendi quasi dolores
                consectetur, minus numquam? Eum totam, cupiditate libero
                molestias quo repellat eius sequi eveniet dolore eligendi cumque
                tenetur. Assumenda officia ullam doloremque quidem incidunt?
                Itaque, nihil! Consequatur excepturi commodi aliquam, ducimus
                fuga doloribus dicta eius atque culpa deserunt animi distinctio
                iste explicabo quaerat veritatis vitae, minima vel maiores alias
                nobis ipsam ad ex, laborum ratione? Quod? Corporis fugiat
                laborum iure maxime, ratione voluptatem suscipit reprehenderit
                asperiores velit voluptatum. Explicabo sequi iure repellat!
                Impedit omnis provident ullam enim, sapiente hic. Quasi iure
                dicta repellendus, necessitatibus odit voluptatum. Commodi
                maiores harum eligendi vero modi delectus beatae, ea architecto,
                provident deserunt minus dolores quam impedit! Sequi dolores
                maiores quam labore, voluptas illo asperiores iure laboriosam
                officiis deserunt hic quidem. Cum eos officiis ab aut aliquam
                maiores optio, quod adipisci earum fugit quam exercitationem
                sequi omnis corporis atque vel tempora voluptatibus quos!
                Ducimus perferendis minima non dolores molestias, voluptatem
                rem. Tempore itaque quaerat eveniet? Commodi architecto cumque
                nisi totam aliquid eaque assumenda ullam cupiditate, ab,
                corrupti voluptatum ut a blanditiis nobis dolorem reprehenderit
                unde natus error ipsum enim consectetur. Nam. Nisi architecto
                quam magni reprehenderit in vel repudiandae aut eaque sit
                tenetur consequuntur, minima voluptates autem? Quia illum est
                sequi corporis odio obcaecati commodi? Tempora minima neque odio
                voluptate eveniet.
              </div>
            </div>
            {/* 
            <img
              id="logo"
              src="/images/glitch-bg_TAPE-ESCAPE_v2.jpg"
              alt="logo"
              className="absolute top-0 left-0 w-full !h-full object-cover"
            />
            <img
              id="broken-logo"
              src="/images/glitch-bg_TAPE-ESCAPE.jpg"
              alt="logo"
              className="absolute top-0 left-0 w-full !h-full object-cover opacity-0"
            /> */}

            {/* <img
              src="/images/glitch-bg.jpg"
              alt="logo"
              className="absolute top-0 left-0 w-full !h-full object-cover opacity-40 pointer-events-none"
            /> */}

            <div className="absolute w-full h-full top-0 left-0 bg-[#66ff0044] pointer-events-none"></div>
            <div
              className="absolute w-full h-full top-0 left-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(175,164,164,0) 86%, rgba(55,55,55,1) 100%)",
              }}
            ></div>
          </div>
        </div>
      </main>
      {/* <CRT /> */}

      {/* <div className="fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center">
        <img
          alt="background"
          className="w-dvw min-h-[500px] max-h-dvh object-contain"
          src="/images/test.svg"
        />
      </div> */}
    </>
  );
};

export default Layout;
