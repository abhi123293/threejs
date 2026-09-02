"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MineralRing({ scrollProgress })  {
  const containerRef = useRef(null);
  const scrollProgressRef = useRef(0);
  useEffect(() => {
  scrollProgressRef.current = scrollProgress;
}, [scrollProgress]);
  useEffect(() => {

    const container = containerRef.current;

    // =========================
    // SCENE
    // =========================

    const scene = new THREE.Scene();


    // =========================
    // CAMERA
    // =========================

   const aspect =
  container.clientWidth /
  container.clientHeight;

const camera = new THREE.OrthographicCamera(
  -5 * aspect,
  5 * aspect,
  5,
  -5,
  0.1,
  100
);

camera.position.z = 10;
   


    // =========================
    // RENDERER
    // =========================

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    container.appendChild(
      renderer.domElement
    );


    // =========================
    // TICK RING
    // =========================

 const ticks = new THREE.Group();

const tickCount = 90;
const radius = 4.2;

for (let i = 0; i < tickCount; i++) {

  const angle =
    (i / tickCount) * Math.PI * 2;

  const geometry =
    new THREE.BoxGeometry(
      0.1,
      0.25,
      0.2
    );

  const material =
    new THREE.MeshBasicMaterial({
      color: 0xd8d8d8,
    });

  const tick =
    new THREE.Mesh(
      geometry,
      material
    );

  tick.position.x =
    Math.cos(angle) * radius;

  tick.position.y =
    Math.sin(angle) * radius;

  tick.rotation.z = angle;

  ticks.add(tick);
}

scene.add(ticks);

   



    // =========================
    // ANIMATION
    // =========================

  const animate = () => {

  requestAnimationFrame(animate);

  ticks.rotation.z =
    scrollProgressRef.current *
    Math.PI *
    0.5;
// console.log(scrollProgressRef.current);
  renderer.render(
    scene,
    camera
  );
};
    animate();


    // =========================
    // RESIZE
    // =========================

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


    // =========================
    // CLEANUP
    // =========================

    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

      renderer.dispose();

      if (
        renderer.domElement.parentNode ===
        container
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };

  }, []);


  return (
    <div
      ref={containerRef}
      className="mineral-three-ring"
    />
  );
}