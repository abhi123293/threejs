// "use client";

// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import gsap from "gsap";
// gsap.registerPlugin(ScrollTrigger);

// export default function TruckScene() {
    
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;

//     // Scene
//     const scene = new THREE.Scene();

//     // Camera
//     const camera = new THREE.OrthographicCamera(
//       -1,
//       1,
//       1,
//       -1,
//       0.1,
//       10
//     );

//     camera.position.z = 5;

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//     });

//     renderer.setPixelRatio(
//       Math.min(window.devicePixelRatio, 2)
//     );

//     renderer.setSize(
//       container.clientWidth,
//       container.clientHeight
//     );

//     container.appendChild(renderer.domElement);

//     // Load truck PNG
//     const textureLoader = new THREE.TextureLoader();

//     const truckTexture = textureLoader.load(
//       "/images/mining.png"
//     );

//     const material = new THREE.MeshBasicMaterial({
//       map: truckTexture,
//       transparent: true,
//     });

//     const geometry = new THREE.PlaneGeometry(1.8, 1);

//     const truck = new THREE.Mesh(
//       geometry,
//       material
//     );

//     scene.add(truck);
//     const truckAnimation = {
//   x: -0.7,
//   y: -0.2,
//   rotation: 0,
//   scale: 1,
// };

// gsap.to(truckAnimation, {
//   x: 0.8,
//   y: 0.15,
//   rotation: -0.08,
//   scale: 1.15,

//   scrollTrigger: {
//     trigger: ".hero",
//     start: "top top",
//     end: "bottom top",
//     scrub: 1,
//   },

//   ease: "none",
// });

//     // Initial position
//     truck.position.x = -0.7;
//     truck.position.y = -0.2;

//     // Animation
//     const animate = () => {
//       requestAnimationFrame(animate);
//  truck.position.x = truckAnimation.x;
//   truck.position.y = truckAnimation.y;
//     truck.rotation.z = truckAnimation.rotation;
//   truck.scale.set(
//     truckAnimation.scale,
//     truckAnimation.scale,
//     truckAnimation.scale
//   );
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Resize
//     const handleResize = () => {
//       renderer.setSize(
//         container.clientWidth,
//         container.clientHeight
//       );
//     };

//     window.addEventListener(
//       "resize",
//       handleResize
//     );

//     return () => {
//       window.removeEventListener(
//         "resize",
//         handleResize
//       );

//       geometry.dispose();
//       material.dispose();
//       truckTexture.dispose();

//       renderer.dispose();

//       container.removeChild(
//         renderer.domElement
//       );
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="truck-scene"
//     />
//   );
// }