"use client";

import "../app/css/technology.css";
import { useState,useRef,useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Technology() {
    const [activeCard, setActiveCard] = useState(null);
    const servicesTitleRef = useRef(null);
    const technologyTitleRef = useRef(null);

     useEffect(() => {

   const title = servicesTitleRef.current;
   const title2 = technologyTitleRef.current;
   const technologyChars = title2.querySelectorAll(".technology-char");
  

    

if (!title) return;

const machinesChars =
  title.querySelectorAll(".machines-char");

if (!machinesChars.length) return;

    const animation = gsap.fromTo(
      machinesChars,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,

        ease: "power3.out",
        stagger: 0.04,

        scrollTrigger: {
          trigger: title,

          start: "80% bottom",
          end: "30% center",

          scrub: 2,

      
        },
      }
    );
     const technologyAnimation = gsap.fromTo(
    technologyChars,
    {
      opacity: 0,
    },
    {
      opacity: 1,

      ease: "none",
      stagger: 0.02,

      scrollTrigger: {
        trigger: title2,

        start: "80% bottom",
        end: "30% center",

        scrub: 1,
      },
    }
  );
    

    return () => {
      animation.kill();
      
    technologyAnimation.kill();
    };

  }, []);

  return (
    <section className="technology">

      {/* =========================
          INTRO
      ========================= */}

      <div className="technology-intro">

        <div className="technology-label">

          <span>TECHNOLOGY</span>
        </div>

        <h1 ref={technologyTitleRef}>

  {"Our underground fleet features more than 360 specialized machines across key mining categories. Every unit is selected for durability, safety, and adaptability in confined, high-stakes environments.".split("").map((char, index) => (

    <span
      key={index}
      className="technology-char"
    >
      {char === " " ? "\u00A0" : char}
    </span>

  ))}

</h1>

      </div>


      {/* =========================
          BIG NUMBER
      ========================= */}

      <div className="technology-number">

        <h2  ref={servicesTitleRef} className="services-title">
          {"OUR 360".split("").map((char, index) => (
    <span
      key={index}
      className="machines-char"
    >
      {char === " " ? "\u00A0" : char}
    </span>
      ))}
          <br />

           {"machines".split("").map((char, index) => (
    <span
      key={index}
      className="machines-char"
    >
      {char}
    </span>
  ))}
        </h2>

        <span>
          FOR UNDERGROUND PERFORMANCE
        </span>

      </div>


      {/* =========================
          MACHINE CARDS
      ========================= */}

      <div className="machine-grid">

        <div
  className={`machine-card ${
    activeCard !== null && activeCard !== 0
      ? "dimmed"
      : ""
  }`}
  onMouseEnter={() => setActiveCard(0)}
  onMouseLeave={() => setActiveCard(null)}
>

  <div className="machine-image">

    <img
      src="/images/machine-1.png"
      alt="Motor Grader"
    />

    <div className="machine-description">
      Precision machines used to level and shape
      underground or surface roads, ramps, and
      working platforms, improving safety,
      drainage, and haulage efficiency.
    </div>

  </div>

  <h3>Motor Grader</h3>

</div>

        <div
  className={`machine-card ${
    activeCard !== null && activeCard !== 1
      ? "dimmed"
      : ""
  }`}
  onMouseEnter={() => setActiveCard(1)}
  onMouseLeave={() => setActiveCard(null)}
>

  <div className="machine-image">

    <img
      src="/images/machine-2.png"
      alt="Telehandler"
    />

    <div className="machine-description">
      Versatile material-handling units with
      extendable booms designed to lift, move,
      and position heavy components in
      restricted spaces. Commonly used for
      assembly, maintenance, and logistics support.
    </div>

  </div>

  <h3>Telehandler</h3>

</div>


       <div
  className={`machine-card ${
    activeCard !== null && activeCard !== 2
      ? "dimmed"
      : ""
  }`}
  onMouseEnter={() => setActiveCard(2)}
  onMouseLeave={() => setActiveCard(null)}
>

  <div className="machine-image">

    <img
      src="/images/machine-3.png"
      alt="Compactor"
    />

    <div className="machine-description">
      Heavy-duty compacting machines designed
      to provide stable and durable underground
      working surfaces.
    </div>

  </div>

  <h3>Compactor</h3>

</div>

      </div>

    </section>
  );
}