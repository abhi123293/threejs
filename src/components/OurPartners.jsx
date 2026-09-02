"use client";

import { useEffect, useRef } from "react";
import "../app/css/our-partners.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import * as THREE from "three";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

export default function OurPartners() {
  const threeRef = useRef(null);

  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const partnersRef = useRef(null);

 useEffect(() => {
  const text = textRef.current;

  if (!text) return;

  gsap.set(text, {
    y: 100,
    opacity: 0,
  });

  const trigger = ScrollTrigger.create({
    trigger: text,

    start: "top 80%",
    end: "top 20%",

   

    onEnter: () => {
      gsap.to(text, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      });
    },

    onLeaveBack: () => {
      gsap.to(text, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    },
  });

  ScrollTrigger.refresh();

  return () => {
    trigger.kill();
  };
}, []);
useEffect(() => {
  const container = threeRef.current;

  if (!container) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    2000
  );

  camera.position.z = 900;

  const renderer = new CSS3DRenderer();

  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.pointerEvents = "none";

  container.appendChild(renderer.domElement);


  const names = [
    "Silver Crest",
    "Trafigura",
    "Agnico Eagle",
    "Aura Mineral Inc.",
    "Capstone",
    "Coeur Mining",
    "Endeavour Silver",
    "Penoles",
    "Fresnillo",
  ];


  const objects = [];


  names.forEach((name, index) => {

    const element = document.createElement("div");

    element.className = "partner-3d-name";

    element.innerText = name;


    const object = new CSS3DObject(element);


    object.position.x = 0;

    object.position.y =
      (index - 4) * 100;

    object.position.z = 0;


    scene.add(object);

    objects.push(object);
  });


  let animationId;

 const animate = () => {

  objects.forEach((object) => {

    // Automatic vertical movement
    object.position.y += 0.35;

    // Loop
    if (object.position.y > 500) {
      object.position.y = -500;
    }


    // Distance from center
    const distance =
      Math.abs(object.position.y);


    // -------------------------
    // 3D DEPTH
    // -------------------------

    const depth =
      THREE.MathUtils.mapLinear(
        Math.min(distance, 400),
        0,
        400,
        80,
        -80
      );

    object.position.z = depth;


    // -------------------------
    // SLIGHT CURVE
    // -------------------------

   const time = performance.now() * 0.0005;

object.position.x =80;
 


    // -------------------------
    // SLIGHT ROTATION
    // -------------------------

    object.rotation.z =
      (object.position.y / 500) * 0.025;


    // -------------------------
    // SCALE
    // -------------------------

    const scale =
      THREE.MathUtils.mapLinear(
        Math.min(distance, 400),
        0,
        400,
        1,
        0.72
      );

    object.scale.set(
      scale,
      scale,
      scale
    );


    // -------------------------
    // BRIGHTNESS
    // -------------------------

    const opacity =
      THREE.MathUtils.mapLinear(
        Math.min(distance, 400),
        0,
        400,
        1,
        0.4
      );

    object.element.style.opacity =
      opacity;
  });


  renderer.render(
    scene,
    camera
  );

  animationId =
    requestAnimationFrame(animate);
};


  animate();


  const handleResize = () => {

    const width =
      container.clientWidth;

    const height =
      container.clientHeight;


    camera.aspect =
      width / height;

    camera.updateProjectionMatrix();


    renderer.setSize(
      width,
      height
    );
  };


  window.addEventListener(
    "resize",
    handleResize
  );


  return () => {

    cancelAnimationFrame(
      animationId
    );

    window.removeEventListener(
      "resize",
      handleResize
    );

    renderer.domElement.remove();
  };

}, []);

  return (
    <section
      ref={sectionRef}
      className="our-partners"
    >

      {/* LABEL */}

      <div className="partners-label">
        <strong>OUR PARTNERS</strong>
      </div>


      {/* INTRO */}

      <div className="partners-intro">

        <h1 ref={textRef}>
          Leading mining companies trust CoMinVi
          to carry out their underground operations
          with safety, precision, and proven results.
        </h1>

      </div>


      {/* PARTNERS */}

      <div
        ref={partnersRef}
        className="partners-list"
      >
        <div
  ref={threeRef}
  className="partners-three"
/>

        {/* <div className="partner">
          Silver Crest
        </div>

        <div className="partner">
          Trafigura
        </div>

        <div className="partner">
          Agnico Eagle
        </div>

        <div className="partner">
          Aura Mineral Inc.
        </div>

        <div className="partner">
          Capstone
        </div>

        <div className="partner">
          Coeur Mining
        </div>

        <div className="partner">
          Endeavour Silver
        </div>

        <div className="partner">
          Penoles
        </div>

        <div className="partner">
          Fresnillo
        </div> */}

      </div>

    </section>
  );
}