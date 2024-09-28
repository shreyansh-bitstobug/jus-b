import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import "./scroll.css";
import { products } from "@/public/assets/data";

// const HorizontalCarousel = () => {
//   return (
//     <div className="py-6 md:py-12 lg:py-16">
//       <div className="space-y-4 flex flex-col items-center">
//         <h1 className="font-bold  md:text-5xl text-3xl  text-center">Checkout our Latest Collection</h1>{" "}
//         <p className="text-center md:text-lg text-neutral-600 max-w-[800px] p-4">
//           Jus-B by JB&apos;s latest collection is designed to make every woman shine at any event. Have something casual
//           or partywear or luxurious, we have got you covered.
//         </p>
//       </div>
//       <HorizontalScrollCarousel />
//     </div>
//   );
// };

// const HorizontalScrollCarousel = () => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//   });

//   const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

//   return (
//     <section ref={targetRef} className="relative h-[300vh]">
//       <div className="sticky top-0 flex h-screen items-center overflow-hidden">
//         <motion.div style={{ x }} className="flex gap-4">
//           {cards.map((card) => {
//             return <Card card={card} key={card.id} />;
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

const HorizontalCarousel = () => {
  return (
    <main>
      <div className="collage">
        <div className="photo-block">
          <div className="photo-grid">
            {products.map((product) =>
              product.image.map((imag, index) => (
                <div key={index} className="photo">
                  <img src={imag} alt="" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HorizontalCarousel;
