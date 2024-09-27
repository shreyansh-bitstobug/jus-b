import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const HorizontalCarousel = () => {
  return (
    <div className="py-6 md:py-12 lg:py-16">
      <div className="space-y-4 flex flex-col items-center">
        <h1 className="font-bold  md:text-5xl text-3xl  text-center">Checkout our Latest Collection</h1>{" "}
        <p className="text-center md:text-lg text-neutral-600 max-w-[800px] p-4">
          Jus-B by JB&apos;s latest collection is designed to make every woman shine at any event. Have something casual
          or partywear or luxurious, we have got you covered.
        </p>
      </div>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: { url: string; title: string; id: number } }) => {
  return (
    <div key={card.id} className="group relative h-[600px] w-screen max-w-4xl overflow-hidden bg-neutral-200">
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div></div>
      {/* <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-4xl font-black uppercase text-penn-red backdrop-blur-lg">
          {card.title}
        </p>
      </div> */}
    </div>
  );
};

export default HorizontalCarousel;

const cards = [
  {
    url: "/assets/category/just-jb-partywear.png",
    title: "Just-B Partywear",
    id: 1,
  },
  {
    url: "/assets/category/just-jb-luxe.png",
    title: "Just-JB Luxe",
    id: 2,
  },
  {
    url: "/assets/category/holiday-season.png",
    title: "Holiday Season",
    id: 3,
  },
  {
    url: "/assets/category/view-all.png",
    title: "View All",
    id: 4,
  },
];
