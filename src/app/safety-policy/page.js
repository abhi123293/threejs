"use client";

import "../css/safteynew.css";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function Safety() {
  const router = useRouter();
  const transitionRef = useRef(null);

  const handleCardClick = (card, imageURL, route) => {
    // Get clicked card position and size
    const rect = card.getBoundingClientRect();

    // Put the card image on the fullscreen transition element
    gsap.set(transitionRef.current, {
      backgroundImage: `url(${imageURL})`,
    });

    // Calculate how much the transition needs to scale
    // to cover the complete screen
    const scaleX = window.innerWidth / rect.width;
    const scaleY = window.innerHeight / rect.height;

    const scale = Math.max(scaleX, scaleY) * 1.2;

    // Get center of clicked card
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    // Start the fullscreen image from the clicked card
    gsap.set(transitionRef.current, {
      transformOrigin: `${originX}px ${originY}px`,
    });

    // Expand fullscreen transition
    gsap.to(transitionRef.current, {
      scale: 1,
      duration: 1,
      ease: "power3.inOut",
    });

    // Expand clicked card
    gsap.to(card, {
      scale: scale,
      duration: 1,
      ease: "power3.inOut",

      onComplete: () => {
        // Navigate only after animation
        router.push(route);
      },
    });
  };

  return (
    <main className="safety-page">

      <section className="safety-hero">

        <div className="safety-page-overlay"></div>

        <div className="safety-page-content">
          <h1>
            Safety<br />
            policy
          </h1>
        </div>

        {/* Page Transition */}
        <div
          ref={transitionRef}
          className="page-transition"
        ></div>

        {/* Bottom Cards */}
        <div className="safety-page-cards">

          {/* TECHNOLOGY */}
          <div
            className="safety-page-card"
            onClick={(e) =>
              handleCardClick(
                e.currentTarget,
                "/images/your-technology-image.jpg",
                "/technology"
              )
            }
          >
            <img
              src="/images/your-technology-image.jpg"
              alt="Technology"
              className="safety-page-card-image"
            />

            <div className="safety-page-card-label">
              <span>TECHNOLOGY</span>
              <span>→</span>
            </div>
          </div>


          {/* ABOUT US */}
          <div
            className="safety-page-card"
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
              alt="About Us"
              className="safety-page-card-image"
            />

            <div className="safety-page-card-label">
              <span>HOME</span>
              <span>→</span>
            </div>
          </div>

        </div>

      </section>

    </main>
  );
}