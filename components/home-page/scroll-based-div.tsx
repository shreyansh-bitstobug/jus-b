import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ScrollBasedDivs() {
  const ref = useRef(null);

  // Track the scroll progress of the target section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.2", "center center", "end start"], // Adjust the scroll tracking points
  });

  // Movement transforms for the two divs
  const moveUp = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const moveDown = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="h-[100vh] overflow-hidden content-center">
      {" "}
      {/* Increase page height for better scroll experience */}
      {/* Section to apply scroll-based animation */}
      <div className="relative h-[80vh] overflow-hidden">
        <div ref={ref} className="sticky top-0 h-full w-full flex justify-center items-center">
          <div className="relative w-full max-w-4xl flex justify-between items-center overflow-hidden">
            {/* Left Div (Moving Up) */}
            <motion.div
              className="w-1/2 h-full bg-neutral-200 flex flex-col justify-center items-center text-white font-bold text-xl"
              style={{ y: moveUp }}
            >
              <div className="h-[80vh] bg-neutral-800">Luxe</div>
              <div className="h-[80vh] bg-neutral-600">Partywear</div>
              <div className="h-[80vh] bg-neutral-800">Collection</div>
            </motion.div>

            {/* Right Div (Moving Down) */}
            <motion.div
              className="w-1/2 h-full flex flex-col-reverse justify-center items-center text-white font-bold text-xl"
              style={{ y: moveDown }}
            >
              <Image
                src="/assets/category/Just-JB Luxe.png"
                alt="Jus-B Partywear Collection"
                width={800}
                height={900}
                className="object-cover h-[80vh] hover:scale-125 transition-all duration-1000"
              />
              <Image
                src="/assets/category/Just-JB Luxe.png"
                alt="Jus-B Luxe Collection"
                width={800}
                height={900}
                className="object-cover h-[80vh] hover:scale-125 transition-all duration-1000"
              />
              <Image
                src="/assets/category/Just-JB Luxe.png"
                alt="Jus-B Luxe Collection"
                width={800}
                height={900}
                className="object-cover h-[80vh] hover:scale-125 transition-all duration-1000"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
