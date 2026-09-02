"use client";
import "../css/our-servicespage.css";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function OurServices() {

  const router = useRouter();

  const transitionRef = useRef(null);
  const handleCardClick = (card, imageURL, route) => {

  const rect = card.getBoundingClientRect();

  gsap.set(transitionRef.current, {
    backgroundImage: `url(${imageURL})`,
  });

  const scaleX = window.innerWidth / rect.width;
  const scaleY = window.innerHeight / rect.height;

  const scale = Math.max(scaleX, scaleY) * 1.2;

  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  gsap.set(transitionRef.current, {
    transformOrigin: `${originX}px ${originY}px`,
  });

  gsap.to(transitionRef.current, {
    scale: 1,
    duration: 1,
    ease: "power3.inOut",
  });

  gsap.to(card, {
    scale: scale,
    duration: 1,
    ease: "power3.inOut",

    onComplete: () => {
      router.push(route);
    },
  });
};
  return (
  <main className="services-page">

    <section className="services-hero">

      {/* Overlay */}
      <div className="services-overlay"></div>

      {/* Page Transition */}
      <div
        ref={transitionRef}
        className="page-transition"
      />

      {/* Heading */}
      <div className="services-content">
        <h1>
          Underground mining
          <br />
          services
        </h1>
      </div>

      {/* Cards Container */}
      <div className="hero-cards">

        {/* TECHNOLOGY CARD */}
        <div
          className="hero-card"
          onClick={(e) =>
            handleCardClick(
              e.currentTarget,
              "/images/your-technology-image.jpg",
              "/technology"
            )
          }
        >
          <img
            className="hero-card-image"
            src="/images/your-technology-image.jpg"
            alt="Technology"
          />

          <div className="hero-card-label">
            <span>TECHNOLOGY</span>
            <span>→</span>
          </div>
        </div>

        {/* SAFETY CARD */}
        <div
          className="hero-card"
          onClick={(e) =>
            handleCardClick(
              e.currentTarget,
              "/images/your-safety-image.jpg",
              "/safety-policy"
            )
          }
        >
          <img
            className="hero-card-image"
            src="/images/your-safety-image.jpg"
            alt="Safety"
          />

          <div className="hero-card-label">
            <span>SAFETY</span>
            <span>→</span>
          </div>
        </div>

      </div>

    </section>

  </main>
);
}