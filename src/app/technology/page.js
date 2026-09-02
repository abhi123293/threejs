"use client";

import "../../app/css/technology.css";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function Technology() {
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
    <main className="technology-page">

      <section className="technology-hero">

        <div className="technology-page-overlay"></div>

        <div className="technology-page-content">
          <h1>
            Technology
          </h1>
        </div>

        {/* Page Transition */}
        <div
          ref={transitionRef}
          className="technology-page-transition"
        ></div>

        {/* Bottom Cards */}
        <div className="technology-page-cards">

          {/* SAFETY */}
          <div
            className="technology-page-card"
            onClick={(e) =>
              handleCardClick(
                e.currentTarget,
                "/images/your-safety-image.jpg",
                "/safety-policy"
              )
            }
          >
            <img
              src="/images/your-safety-image.jpg"
              alt="Safety"
              className="technology-page-card-image"
            />

            <div className="technology-page-card-label">
              <span>SAFETY</span>
              <span>→</span>
            </div>
          </div>


          {/* HOME */}
          <div
            className="technology-page-card"
            onClick={(e) =>
              handleCardClick(
                e.currentTarget,
                "/images/about.png",
                "/"
              )
            }
          >
            <img
              src="/images/about.png"
              alt="Home"
              className="technology-page-card-image"
            />

            <div className="technology-page-card-label">
              <span>HOME</span>
              <span>→</span>
            </div>
          </div>

        </div>

      </section>

    </main>
  );
}