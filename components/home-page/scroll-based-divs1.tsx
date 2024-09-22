import Image from "next/image";

export default function ScrollBasedDivs1() {
  return (
    <div className="features-right-section">
      <div className="features-right-section-container">
        <Image
          src="/assets/category/Just-JB Luxe.png"
          loading="lazy"
          width={800}
          height={900}
          alt=""
          sizes="(max-width: 479px) 94vw, (max-width: 767px) 46vw, (max-width: 1439px) 47vw, 647px"
          className="feature-image"
        />
      </div>
      <div className="features-right-section-container">
        <Image
          src="/assets/category/Just-JB Luxe.png"
          loading="lazy"
          alt=""
          width={800}
          height={900}
          sizes="(max-width: 479px) 94vw, (max-width: 767px) 46vw, (max-width: 1439px) 47vw, 647px"
          className="feature-image"
        />
      </div>
    </div>
  );
}
