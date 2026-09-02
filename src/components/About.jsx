"use client";
import "../app/css/About.css";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MiningScene from "./MiningScene";

gsap.registerPlugin(ScrollTrigger);
export default function About() {
const sectionRef = useRef(null);
const labelRef = useRef(null);
const titleRef = useRef(null);
const textRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 100%",
        end: "top 10%",
        scrub: 2,
      
        // markers:true,
      },
    });

    tl.fromTo(
      labelRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "none",
      }
    );

    tl.fromTo(
      titleRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "none",
      }
      
    );

    tl.fromTo(
      textRef.current,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "none",
      },
      "-=0.4"
    );

  }, sectionRef);

  return () => ctx.revert();
}, []);
    


  return (
    <section ref={sectionRef} id ="about" className="about">
      <p   ref={labelRef} className="about-label">
  01 — ABOUT COMINVI
</p>
<MiningScene />

      <h2 ref={titleRef}>
        BUILT FOR
        <br />
        THE UNDERGROUND.
      </h2>

      <p ref={textRef} className="about-text">
        We provide innovative solutions for underground mining
        and help build safer and more efficient operations.
      </p>
    </section>
  );
}