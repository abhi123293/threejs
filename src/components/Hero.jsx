// components/Hero.jsx

"use client";
import "../app/css/Hero.css";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const router = useRouter();
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bottomRef = useRef(null);
  const transitionRef = useRef(null);
const handleCardClick = (card, route) => {
   const rect = card.getBoundingClientRect();
   const image = card.querySelector(".hero-card-image");

const imageURL = image?.src;

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

  useEffect(() => {
     window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
    const section = sectionRef.current;
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const frameCount =15;
    const startFrame=6;

    const images = [];
    const frameObject = {
      frame: 0,
    };

    let imagesLoaded = 0;
    let animationReady = false;

    const loadImages = () => {
    for (let i = 0; i < frameCount; i++) {
  const actualFrame = i + startFrame;

  const img = new Image();

  img.src = `/images/trucks/ezgif-frame-${String(actualFrame).padStart(3, "0")}.png`;

  img.onload = () => {
    imagesLoaded++;

//      if (imagesLoaded === 1) {
//     renderFrame(0);
//   }
  if (images[0]?.complete) {
    renderFrame(0);
  }
    if (imagesLoaded === frameCount) {
      animationReady = true;

      resizeCanvas();
      renderFrame(0);

      ScrollTrigger.refresh();
    }
  };

  img.onerror = () => {
    console.error(`Failed to load frame ${actualFrame}`);
  };

  images.push(img);
}
    };


   const resizeCanvas = () => {
  const dpr = Math.min(
    window.devicePixelRatio || 1,
    2
  );

  const width = hero.clientWidth;
  const height = hero.clientHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

  if (animationReady) {
    renderFrame(
      Math.round(frameObject.frame)
    );
  }
};

  const renderFrame = (index) => {
  const image = images[index];

  if (!image || !image.complete) return;

  const canvasWidth = hero.clientWidth;
  const canvasHeight = hero.clientHeight;

  // Clear canvas
  ctx.clearRect(
    0,
    0,
    canvasWidth,
    canvasHeight
  );

  // Original image dimensions
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;

  // Crop the black borders
  const cropX = 100;
  const cropY = 0;
  const cropWidth = imageWidth - 200;
  const cropHeight = imageHeight;

  // Ratio of cropped image
  const imageRatio =
    cropWidth / cropHeight;

  const canvasRatio =
    canvasWidth / canvasHeight;

  let width;
  let height;
  let x;
  let y;

  // Make cropped image COVER the canvas
 if (imageRatio > canvasRatio) {
  height = canvasHeight;
  width = height * imageRatio;

  x = (canvasWidth - width) / 2;
  y = 0;
} else {
  width = canvasWidth;
  height = width / imageRatio;

  x = 0;
  y = (canvasHeight - height) / 2;
}

  // Draw only the cropped part
  ctx.drawImage(
    image,

    // SOURCE — crop from original image
    cropX,
    cropY,
    cropWidth,
    cropHeight,

    // DESTINATION — draw onto canvas
    x,
    y,
    width,
    height
  );
};

    loadImages();
    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    const animation = gsap.to(frameObject, {
      frame: frameCount - 1,

      ease: "none",
scrollTrigger: {
  trigger: section,
  start: "top top",
  end: "bottom top",
  scrub: 2,
  pin: hero,
  anticipatePin: 1,
  invalidateOnRefresh: true,
},

      onUpdate: () => {
        if (!animationReady) return;

        renderFrame(
          Math.round(frameObject.frame)
        );
      },
    });

    const intro = gsap.timeline();

    intro.fromTo(
      subtitleRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      }
    );

    intro.fromTo(
      titleRef.current,
      {
        y: 120,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
      },
      "-=0.5"
    );

    intro.fromTo(
      bottomRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.6"
    );
   const scrollTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: "top top",
    end: "bottom top",
    scrub: 2,
  },
});

scrollTimeline
  .to(subtitleRef.current, {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "none",
  })
  .to(
    titleRef.current,
    {
      y: -250,
      opacity: 0,
      duration: 1,
      ease: "none",
    },
    "<"
  )
  .to(
    bottomRef.current,
    {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "none",
    },
    "<"
  );
    

    return () => {
      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      animation.kill();

      ScrollTrigger.getAll().forEach(
        (trigger) => trigger.kill()
      );

      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-scroll-section">
      <div ref={heroRef} className="hero">
        <canvas ref={canvasRef} className="hero-canvas"
        />

        <div className="hero-overlay" />

 <div
    ref={transitionRef}
    className="page-transition"
  />

        <div className="hero-content">
          <p ref={subtitleRef}>
            UNDERGROUND MINING
          </p>

          <h1 ref={titleRef}> WE GO
            <br />
            DEEPER.</h1> </div>

        <div ref={bottomRef}className="hero-bottom">
          <span>MEXICO</span>

          <span>SCROLL ↓ </span>
        </div>
        <div className="hero-cards">

  <div
  className="hero-card"onClick={(e) =>handleCardClick(e.currentTarget,"/our-services")}>
   <img className="hero-card-image"
    src="/images/your-service-image.jpg"
  alt="Our Services"
/>

    <div className="hero-card-label">
      <span>OUR SERVICES</span>
      <span>→</span>
    </div>
  </div>


 <div className="hero-card" onClick={(e) => handleCardClick(e.currentTarget,"/technology")}>

   <img className="hero-card-image"
  src="/images/your-technology-image.jpg"
  alt="Technology"/>

    <div className="hero-card-label">
      <span>TECHNOLOGY</span>
      <span>→</span>
    </div>
  </div>

</div>
      </div>
    </section>
  );
}