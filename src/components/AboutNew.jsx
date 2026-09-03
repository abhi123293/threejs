"use client";

import "../app/css/AboutNew.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MiningCrystal from "./MiningCrystal";

gsap.registerPlugin(ScrollTrigger);

export default function AboutNew() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
  const card = cardRef.current;

  if (!card) return;

  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX =
    ((y - centerY) / centerY) * -8;

  const rotateY =
    ((x - centerX) / centerX) * 8;

  gsap.to(card, {
    rotateX,
    rotateY,
    translateZ: 20,
    duration: 0.4,
    ease: "power3.out",
  });
};

const handleMouseLeave = () => {
  const card = cardRef.current;

  if (!card) return;

  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
    duration: 0.8,
    ease: "power3.out",
  });
};

useEffect(() => {

  const ctx = gsap.context(() => {

    // TITLE
    gsap.fromTo(
      titleRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,

        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
       
        },
      }
    );


    // DESCRIPTION
    gsap.fromTo(
      textRef.current,
      {
        y: 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,

        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
       
        },
      }
    );


    // CONTACT CARD
    gsap.fromTo(
      cardRef.current,
      {
        y: 200,
        rotateX: 30,
        rotateY: -25,
        scale: 0.75,
        opacity: 0,
      },
      {
        y: 0,
        rotateX: 0,
        rotateY: 5,
        scale: 1,
        opacity: 1,

        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "top 35%",
          scrub: 1.5,
       
        },
      }
    );

  }, sectionRef);

  return () => ctx.revert();

}, []);

  return (
    <section ref={sectionRef} className="about-new">

      <div className="about-new-label">
        ABOUT US
      </div>

      <div ref={titleRef} className="about-new-title">
        <h2>
          We build
          <br />
          underground
          <br />
          possibilities.
        </h2>
      </div>

      <div ref={textRef} className="about-new-description">
        <p>
          We combine underground mining expertise,
          engineering knowledge and innovative
          technology to deliver safer and more
          efficient mining operations.
        </p>

        <p>
          Our focus is simple — build strong
          partnerships and create reliable solutions
          for the future of underground mining.
        </p>
      </div>
      <MiningCrystal />

     <div
  className="about-new-contact-wrapper"
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>

        <div
          ref={cardRef}
          className="about-new-contact-card"
        >

          <div className="contact-card-top">
            <span>GET IN TOUCH</span>
            <span>01</span>
          </div>

          <div className="contact-card-title">
            <h3>
              Let's work
              <br />
              together.
            </h3>
          </div>

          <div className="contact-card-details">

            <div className="contact-item">
              <span>EMAIL</span>
              <p>info@cominvi.com</p>
            </div>

            <div className="contact-item">
              <span>PHONE</span>
              <p>+52 492 925 0000</p>
            </div>

            <div className="contact-item">
              <span>LOCATION</span>
              <p>Mexico</p>
            </div>

          </div>

          <div className="contact-card-bottom">
            <span>CONTACT US</span>
            <span className="contact-arrow">↗</span>
          </div>

        </div>

      </div>

      <div className="about-new-bg-text">
        COMINVI
      </div>

    </section>
  );
}