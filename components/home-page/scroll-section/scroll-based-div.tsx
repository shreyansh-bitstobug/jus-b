import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { syne } from "@/lib/direct-fonts";

const Card = ({ src, categoryName, className }: { src: string; categoryName: string; className?: string }) => {
  return (
    <div
      className={cn(
        "card w-80 h-96 overflow-hidden rounded-lg bg-white  shadow-lg hover:scale-110 transition-transform duration-1000",
        className
      )}
    >
      <Image
        alt=""
        src={src}
        className="object-cover w-80 h-80 border-[30px] border-b-0 border-white"
        width={500}
        height={500}
      />
      <h1 className={cn("text-2xl px-8 font-bold text-left pt-1", syne.className)}>{categoryName}</h1>
    </div>
  );
};

const CardStack = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.3 1", "1.9 1.2"],
  });

  const rotateLeft = useTransform(scrollYProgress, [0, 0.33], [0, -30]);
  const xLeft = useTransform(scrollYProgress, [0, 0.8], ["50%", "-40%"]);

  const rotateRight = useTransform(scrollYProgress, [0, 0.33], [0, 30]);
  const xRight = useTransform(scrollYProgress, [0, 0.8], ["-50%", "40%"]);

  return (
    <>
      <div
        className="lg:hidden relative  w-full content-center lg:min-h-screen md:min-h-[150vh] min-h-[200vh]"
        style={{
          backgroundImage: "url(/assets/back-lines.svg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* For Medium Screens */}
        <div className="lg:hidden flex flex-col items-center gap-6">
          <div className="flex md:flex-row flex-col md:gap-0 gap-10">
            <Card src="/assets/category/holiday-season.png" categoryName="Holiday Season" className=" -rotate-12" />
            <Card
              src="/assets/category/just-jb-partywear.png"
              categoryName="Just-JB Partywear"
              className=" rotate-12"
            />
          </div>
          <Card
            src="/assets/category/just-jb-luxe.png"
            categoryName="Just-JB Luxe"
            className="md:rotate-0 -rotate-12"
          />
        </div>
      </div>

      <div
        className="lg:block hidden relative  w-full content-center lg:min-h-screen md:min-h-[150vh] min-h-[200vh]"
        style={{
          backgroundImage: "url(/assets/back-lines.svg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* For Large Screens */}
        <div className="lg:block hidden">
          {/* First card (stays in place) */}
          <motion.div
            ref={ref}
            className=" absolute top-1/4 right-1/2  translate-x-1/2"
            style={{
              rotate: rotateLeft,
              translateX: xLeft,
            }}
          >
            <Card src="/assets/category/just-jb-partywear.png" categoryName="Just-JB Partywear" />
          </motion.div>

          {/* Second card (moves left and tilts left) */}
          <motion.div ref={ref} className=" absolute top-1/4 right-1/2 translate-x-1/2 z-20">
            <Card src="/assets/category/holiday-season.png" categoryName="Holiday Season" />
          </motion.div>

          {/* Third card (moves right and tilts right) */}
          <motion.div
            ref={ref}
            className="absolute top-1/4  left-1/2 -translate-x-1/2"
            style={{
              rotate: rotateRight,
              translateX: xRight,
            }}
          >
            <Card src="/assets/category/just-jb-luxe.png" categoryName="Just-JB Luxe" />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CardStack;
