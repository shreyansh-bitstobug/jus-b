import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { syne } from "@/lib/direct-fonts";
import _ from "lodash";
import Link from "next/link";

const Card = ({
  src,
  categoryName,
  className,
}: {
  src: string;
  categoryName: string;
  className?: string;
}) => {
  return (
    <Link href={`/shop/${_.kebabCase(categoryName)}`}>
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
        <h1
          className={cn(
            "text-2xl px-8 font-bold text-left pt-1",
            syne.className
          )}
        >
          {categoryName}
        </h1>
      </div>
    </Link>
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
            <Card
              src="https://firebasestorage.googleapis.com/v0/b/jus-b-ff33a.appspot.com/o/media%2FWhatsApp-Image-2024-06-03-at-9.27.25-PM.jpeg?alt=media&token=04142cb0-5aa2-422c-9368-d8ed816ba900"
              categoryName="Holiday Season"
              className=" -rotate-12"
            />
            <Card
              src="/assets/banner/partywear.jpeg"
              categoryName="Jus-B Partywear"
              className=" rotate-12"
            />
          </div>
          <Card
            src="https://firebasestorage.googleapis.com/v0/b/jus-b-ff33a.appspot.com/o/category%2Fjus-b-luxe.png?alt=media"
            categoryName="Jus-B Luxe"
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
            <Card
              src="/assets/banner/partywear.jpeg"
              categoryName="Jus-B Partywear"
            />
          </motion.div>

          {/* Second card (moves left and tilts left) */}
          <motion.div
            ref={ref}
            className=" absolute top-1/4 right-1/2 translate-x-1/2 z-20"
          >
            <Card
              src="/assets/banner/winterwear.jpeg"
              categoryName="Winter Wear"
            />
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
            <Card
              src="https://firebasestorage.googleapis.com/v0/b/jus-b-ff33a.appspot.com/o/category%2Fjus-b-luxe.png?alt=media"
              categoryName="Jus-B Luxe"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CardStack;
