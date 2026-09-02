"use client";

import { useRef,useEffect } from "react";
import "../app/css/safety-policy.css";
import SafetyImage from "./SafetyImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function SafetyPolicy() {

  const sectionRef = useRef(null);
const headingRef = useRef(null);
const buttonRef = useRef(null);

//   useEffect(() => {
//   const section = sectionRef.current;
//   const heading = headingRef.current;
//   const button = buttonRef.current;

//   const getDistance = () => {
//     const headingRect = heading.getBoundingClientRect();
//     const buttonRect = button.getBoundingClientRect();

//     return buttonRect.top - headingRect.bottom;
//   };

//   const animation = gsap.to(heading, {
//     y: getDistance(),

//     ease: "none",

//     scrollTrigger: {
//       trigger: section,
//       start: "top top",
//       end: "+=400",
//       scrub: true,
//       markers: true,
//     },
//   });

//   return () => {
//     animation.kill();
//   };
// }, []);


useEffect(() => {
  const section = sectionRef.current;
  const heading = headingRef.current;
  const button = buttonRef.current;

  const animation = gsap.to(heading, {
    y: 110,

    ease: "none",

    scrollTrigger: {
      trigger: section,
      start: "top 20%",
      end: "top -20%",
      scrub: true,
      // markers: true,
    },
  });

  // READ MORE hover bounce
  // READ MORE click / touch bounce
const handleClick = () => {
  gsap.fromTo(
    button,
    {
      y: 0,
    },
    {
      y: -10,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    }
  );
};

button.addEventListener("click", handleClick);

  return () => {
    animation.kill();

   button.removeEventListener("click", handleClick);
  };
}, []);

  return (
    <section
      ref={sectionRef}
      className="safety-policy"
    >

      {/* LEFT IMAGE */}
      <div  className="safety-image">
        <SafetyImage />
      </div>


      {/* RIGHT CONTENT */}
      <div className="safety-content">

        <h2 ref={headingRef} >
          To this end, we are committed to
          providing our collaborators with a
          safe and healthy workplace.
        </h2>

       <button ref={buttonRef} className="read-more-btn">
  <span className="read-more-text">READ MORE</span>

  <span className="read-more-arrow">
    <span>▶</span>
  </span>
</button>

      </div>

    </section>
  );
}