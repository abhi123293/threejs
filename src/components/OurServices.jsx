"use client";

import { useRef,useEffect } from "react";
import "../app/css/Ourservices.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurServices() {
    const servicesHeadingRef = useRef(null);
    const servicesLabelRef = useRef(null);
useEffect(() => {

  const heading = servicesHeadingRef.current;

  gsap.fromTo(
    heading,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "none",

      scrollTrigger: {
        trigger: heading,

        start: "80% bottom",
        end: "100% bottom",

        scrub: 2,

    
      },
    }
  );
   const chars = servicesLabelRef.current.querySelectorAll(
    ".services-char"
  );

  gsap.fromTo(
    chars,
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,

      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",

      scrollTrigger: {
        trigger: servicesLabelRef.current,

        start: "80% bottom",
        end: "30% center",

        scrub: 1,

    
      },
    }
  );


  return () => {
    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill();
    });
  };

}, []);

  const services = [
    {
      title: "Operation",
      icon: (
        <svg
          viewBox="0 0 64 64"
          className="service-svg"
        >
          <circle cx="32" cy="32" r="10" />
          <path d="M32 4v8" />
          <path d="M32 52v8" />
          <path d="M4 32h8" />
          <path d="M52 32h8" />
          <path d="M12 12l6 6" />
          <path d="M46 46l6 6" />
          <path d="M52 12l-6 6" />
          <path d="M18 46l-6 6" />
        </svg>
      ),
    },

    {
      title: "Quality Processes",
      icon: (
        <svg
          viewBox="0 0 64 64"
          className="service-svg"
        >
          <path d="M32 5L55 22L32 58L9 22Z" />
          <path d="M9 22h46" />
          <path d="M22 22l10 36" />
          <path d="M42 22L32 58" />
          <path d="M22 22l10-17" />
          <path d="M42 22L32 5" />
        </svg>
      ),
    },

    {
      title: "Security",
      icon: (
        <svg
          viewBox="0 0 64 64"
          className="service-svg"
        >
          <path d="M32 55C27 50 10 40 10 24C10 15 21 11 27 18L32 23L37 18C43 11 54 15 54 24C54 40 37 50 32 55Z" />
          <path d="M17 31h9l3-6 5 12 4-6h9" />
        </svg>
      ),
    },

    {
      title: "Maintenance",
      icon: (
        <svg
          viewBox="0 0 64 64"
          className="service-svg"
        >
          <path d="M21 35h22l6 15H15z" />
          <path d="M25 35l3-18h8l3 18" />
          <path d="M27 17h10" />
        </svg>
      ),
    },

    {
      title: "Administration & resources",
      icon: (
        <svg
          viewBox="0 0 64 64"
          className="service-svg"
        >
          <path d="M7 18h20l5 6h25v28H7z" />
          <path d="M7 18v-5h18l7 7" />
        </svg>
      ),
    },
  ];

  return (
    <section className="services">
<div className="services-heading">

  <span
    ref={servicesLabelRef}
    className="services-label"
  >
    {"SERVICES".split("").map((char, index) => (
      <span
        key={index}
        className="services-char"
      >
        {char}
      </span>
    ))}
  </span>

  <h1>
    OUR SERVICES
  </h1>

</div>
      <div className="services-grid">

        {services.map((service, index) => (

          <div
            className="service-card"
            key={index}
          >

            <div className="service-icon">
              {service.icon}
            </div>

            <h2>
              {service.title}
            </h2>

          </div>

        ))}

      </div>


      <button className="job-button">

        <span>
          JOB OFFERS
        </span>

        <span className="job-arrow">
          ▶
        </span>

      </button>

    </section>
  );
}