"use client";
import "../app/css/Services.css";

import { useRef,useState, useEffect   } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const services = [
  {
    number: "01",
    title: "Engineering",
    icon: "▣",
    description:
      "We provide engineering solutions for complex underground mining operations.",
       image: "/images/engineering.jpg",
  },
  {
    number: "02",
    title: "Ground Support & Fortification",
    icon: "⚒",
    description:
      "We stabilize underground workings using anchors, mesh, shotcrete, and steel frames to secure fractured or high-risk ground.",
      image: "/images/ground-support.jpg",
  },
  {
    number: "03",
    title: "Development",
    icon: "✧",
    description:
      "We develop efficient underground infrastructure and access systems.",
       image: "/images/development.jpg",
  },
  {
    number: "04",
    title: "Production",
    icon: "⚙",
    description:
      "We deliver reliable underground production through efficient mining operations.",
       image: "/images/production.jpg",
  },
  {
    number: "05",
    title: "Hauling",
    icon: "▦",
    description:
      "We transport blasted ore and waste using scooptrams, low-profile trucks, and efficient underground logistics systems.",
  },
  {
    number: "06",
    title: "Exploration",
    icon: "◇",
    image: "/images/mining-crystals.jpg",
  },
];


export default function Services() {
  const headingRef = useRef(null);
  const previewRef = useRef(null);
  const [activeImage, setActiveImage] = useState(
  "/images/mining-crystals.jpg"
);
useEffect(() => {

  const heading = headingRef.current;

  if (!heading) return;

  const chars = heading.querySelectorAll(".service-heading-char");

  const animation = gsap.fromTo(
    chars,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,

      stagger: 0.02,

      ease: "power3.out",

      scrollTrigger: {
        trigger: heading,

        start: "80% bottom",
        end: "30% center",

        scrub: 2,

      
      },
    }
  );

  return () => {
    animation.kill();
  };

}, []);
  // const handleMouseEnter = (card,image) => {
  //   gsap.to(card, {
  //     scale: 0.98,
  //     duration: 0.4,
  //     ease: "power3.out",
  //   });
  //   if(image)
  //   {
  //     setActiveImage(image)
  //   }
  // };
  const handleMouseEnter = (card, image) => {
  gsap.to(card, {
    scale: 0.98,
    duration: 0.4,
    ease: "power3.out",
  });

  if (!image) return;

  gsap.to(previewRef.current, {
    opacity: 0,
    scale: 1.08,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      setActiveImage(image);

      gsap.fromTo(
        previewRef.current,
        {
          opacity: 0,
          scale: 1.08,
          rotation: 2,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    },
  });
};

  const handleMouseLeave = (card) => {
    gsap.to(card, {
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section className="services">

      <div className="services-header">

       

        <span className="section-label">
          OUR SERVICES
        </span>

        <h2 ref={headingRef}>

         {"Leveraging our deep geological insight and engineering prowess, we partner with clients to transform raw opportunity into operational excellence."
    .split("")
    .map((char, index) => (
      <span
        key={index}
        className="service-heading-char"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
        </h2>

      </div>

      <div className="services-grid">

       {services.slice(0, 5).map((service) => (

  <div
    key={service.number}
    className="service-card"
    onMouseEnter={(e) =>
      handleMouseEnter(e.currentTarget,service.image )
    }
    onMouseLeave={(e) =>
      handleMouseLeave(e.currentTarget)
    }
  >
    {service.image && (
  <div className="mobile-service-image">
    <img
      src={service.image}
      alt={service.title}
    />
  </div>
)}

    <div className="service-icon">
      {service.icon}
    </div>

    <div className="service-content">

      <h3>
        {service.title}
      </h3>

      <p>
        {service.description}
      </p>

    </div>

  </div>

))}
        <div className="service-preview">
    <img
     ref={previewRef}
      src={activeImage}
      alt="Mining service"
    />
  </div>
        

      </div>
      

    </section>
  );
}