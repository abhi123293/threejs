"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../app/css/minerals.css";
import MineralRing from "./MineralRing";


gsap.registerPlugin(ScrollTrigger);

export default function Minerals() {
    const [activeMineral, setActiveMineral] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

const imageRef = useRef(null);
const sectionRef = useRef(null);
    const minerals = [
  {
    name: "Gold",
    symbol: "AU [#79]",
    image: "/images/gold-rock.png",
  },
  {
    name: "Silver",
    symbol: "AG [#47]",
    image: "/images/silver-rock.png",
  },
  {
    name: "Lead",
    symbol: "PB [#82]",
    image: "/images/lead-rock.png",
  },
  {
    name: "Copper",
    symbol: "CU [#29]",
    image: "/images/copper-rock.png",
  },
  {
    name: "Zinc",
    symbol: "ZN [#30]",
    image: "/images/zinc-rock.png",
  },
];
useEffect(() => {

  const section = sectionRef.current;

  const trigger = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "+=3000",
    pin: true,
    scrub: true,

    onUpdate: (self) => {

      const index = Math.min(
        Math.floor(
          self.progress * minerals.length
        ),
        minerals.length - 1
      );

      setActiveMineral(index);
      setScrollProgress(self.progress);
    },
  });

  return () => {
    trigger.kill();
  };

}, []);
  return (
    <section ref={sectionRef}className="minerals">
      <div className="minerals-label">
        <span className="section-label">
          MINERALS
        </span>
      </div>

      <div className="minerals-content">

        <div className="minerals-list">

          <span>MINERALS WE EXTRACT</span>

          {minerals.map((mineral, index) => (
  <h2
    key={mineral.name}
    className={
      activeMineral === index ? "active" : ""
    }
  >
    {mineral.name}
  </h2>
))}

        </div>

        <div className="mineral-center">
          <MineralRing
  scrollProgress={scrollProgress}
/>

          <div className="mineral-ring">
            
            <img
  ref={imageRef}
  src={minerals[activeMineral].image}
  alt={minerals[activeMineral].name}
/>
          </div>
        </div>

        <div className="mineral-info">
         <span>
  {minerals[activeMineral].symbol}
</span>
        </div>

      </div>

    </section>
  );
}