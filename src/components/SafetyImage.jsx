"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function SafetyImage() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    useEffect(() => {

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const aspect = container.clientWidth/container.clientHeight;
       const camera = new THREE.OrthographicCamera(-aspect, aspect, 1,-1,0.1,100);
       camera.position.z = 5;
       const renderer = new THREE.WebGLRenderer({antialias: true,alpha: true,});
       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
       renderer.setSize(container.clientWidth,container.clientHeight);
       container.appendChild(renderer.domElement);
       const textureLoader =new THREE.TextureLoader();
const texture = textureLoader.load("/images/safety-worker.jpg");
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.MeshBasicMaterial({map: texture,});
const image =new THREE.Mesh( geometry,material);
imageRef.current = image;

scene.add(image);
const imageAnimation = gsap.to(
  image.position,
  {
    y: -1.0,

    ease: "none",

    scrollTrigger: {
      trigger: container,

      start: "top bottom",
      end: "bottom top",

      scrub: 1,
    },
  }
);

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene,camera);


};
  animate();

const handleResize = () => {
    const width =container.clientWidth;

const height =container.clientHeight;
const aspect = width / height;
camera.left = -aspect;
camera.right = aspect;
camera.updateProjectionMatrix();
renderer.setSize(width,height);


};
window.addEventListener(
      "resize",
      handleResize
    );



  return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );
      imageAnimation.kill();
      geometry.dispose();
      material.dispose();
      texture.dispose();

      renderer.dispose();  
      if (renderer.domElement.parentNode ===container) {
        container.removeChild(renderer.domElement);
        

    }
    
};
    },[]);
  return (
    <div
      ref={containerRef}
      className="safety-three-image"
    />
  );

}