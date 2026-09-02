"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MiningScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 10);


    // Renderer
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

    container.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      2
    );

    scene.add(ambientLight);

    // Temporary object
const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load(
  "/images/about-mine.png",
  () => {
    resizePlane();
  }
);

const geometry = new THREE.PlaneGeometry(
  2,
  2,
  50,
  50,
);

const material = new THREE.MeshBasicMaterial({
  map: texture,
});

const mine = new THREE.Mesh(
  geometry,
  material
);

scene.add(mine);

const resizePlane = () => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const aspect = width / height;

  const fov =
    camera.fov * (Math.PI / 180);

  const visibleHeight =
    2 *
    Math.tan(fov / 2) *
    camera.position.z;

  const visibleWidth =
    visibleHeight * aspect;

  const imageAspect =
    texture.image.width /
    texture.image.height;

  let scaleX;
  let scaleY;

  if (aspect > imageAspect) {
    scaleX = visibleWidth / 2;
    scaleY = scaleX / imageAspect;
  } else {
    scaleY = visibleHeight / 2;
    scaleX = scaleY * imageAspect;
  }

  mine.scale.set(
    scaleX * 1.05,
    scaleY * 1.05,
    1
  );
};
scene.add(mine);
let scrollVelocity = 0;
const scrollTrigger=ScrollTrigger.create({
  trigger: container,

  start: "top bottom",
  end: "bottom top",

  onUpdate: (self) => {
    scrollVelocity = self.getVelocity();
  },
});

// const imageAnimation = gsap.to(mine.rotation, {
//   y: 0.08,

//   ease: "none",

//   scrollTrigger: {
//     trigger: container,
//     start: "top bottom",
//     end: "bottom top",
//     scrub: 2,
//   },
// });
const timer = new THREE.Timer();

let animationId;
    // Animation
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      // 
      timer.update();

const time = timer.getElapsed();

         scrollVelocity *= 0.96;
        const position = geometry.attributes.position;

 for (let i = 0;i < position.count;i++) 
  {
     const x = position.getX(i);
     const y = position.getY(i);

//     const velocity =Math.min(Math.abs(scrollVelocity) / 1500,1);
//     const distance = Math.sqrt(x * x + y * y);

// const strength = Math.max(0,1 - distance / 1.5);

// const wave =Math.sin(x * 3 + y * 2  + time * 0.1) *0.05*strength * velocity;

//  position.setZ(i,wave);
// const velocity = Math.min(Math.abs(scrollVelocity) / 500,1);
const velocity = Math.max(-1,Math.min(scrollVelocity / 500, 1));

const distance = Math.sqrt(x * x + y * y);

const strength = Math.max(0,1 - distance / 1.5);

const wave =Math.sin(x * 3 +y * 2 + time * 0.1 + scrollVelocity * 0.002) *0.12 *strength *velocity;

position.setZ(i, wave);

}

  position.needsUpdate = true;
      
      renderer.render(
        scene,
        camera
      );
    };
    

    animate();
   

    // Resize
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
        resizePlane();
    };
  

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      cancelAnimationFrame(animationId);

  scrollTrigger.kill();
      window.removeEventListener(
        "resize",
        handleResize
      );
      
//       cameraAnimation.kill();
// imageAnimation.kill();

      geometry.dispose();
      material.dispose();
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
      className="mining-scene"
    />
  );
}