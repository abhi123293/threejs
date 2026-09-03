"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MiningCrystal() {

  const containerRef = useRef(null);

  useEffect(() => {

    const container = containerRef.current;

    if (!container) return;

    // -------------------------
    // SCENE
    // -------------------------

    const scene = new THREE.Scene();


    // -------------------------
    // CAMERA
    // -------------------------

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 7);


    // -------------------------
    // RENDERER
    // -------------------------

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


    // -------------------------
    // LIGHT
    // -------------------------

    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      1.5
    );

    scene.add(ambientLight);


    const directionalLight = new THREE.DirectionalLight(
      0xffffff,
      3
    );

    directionalLight.position.set(
      3,
      5,
      4
    );

    scene.add(directionalLight);


    // -------------------------
    // CRYSTAL
    // -------------------------
const crystalGroup = new THREE.Group();

scene.add(crystalGroup);


const crystalMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x7dd3fc,
    metalness: 0.7,
    roughness: 0.2,
  });


const createCrystal = (
  height,
  radius,
  x,
  y,
  z,
  rotation
) => {

  const geometry =
    new THREE.ConeGeometry(
      radius,
      height,
      6
    );

  const crystal =
    new THREE.Mesh(
      geometry,
      crystalMaterial
    );

  crystal.position.set(
    x,
    y,
    z
  );

  crystal.rotation.y =
    rotation;

  crystalGroup.add(crystal);
};

createCrystal(3.2, 1.1, 0, 0, 0, 0);

createCrystal(2.4, 0.8, -1.3, -0.3, 0.2, 0.4);

createCrystal(2.6, 0.85, 1.3, -0.3, 0.1, -0.3);

createCrystal(1.8, 0.65, -2, -0.6, 0, 0.2);

createCrystal(2, 0.7, 2, -0.6, 0.1, -0.4);


const baseGeometry =
  new THREE.CylinderGeometry(
    2.7,
    3.2,
    0.5,
    8
  );

const baseMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.4,
    roughness: 0.8,
  });

const base =
  new THREE.Mesh(
    baseGeometry,
    baseMaterial
  );

base.position.y = -1.6;

crystalGroup.add(base);
    // -------------------------
    // ANIMATION
    // -------------------------

    const animate = () => {

      requestAnimationFrame(animate);

     crystalGroup.rotation.y += 0.004;
crystalGroup.rotation.x += 0.001;

      renderer.render(
        scene,
        camera
      );
    };

    animate();


    // -------------------------
    // RESIZE
    // -------------------------

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


    // -------------------------
    // CLEANUP
    // -------------------------

    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

      renderer.dispose();

     crystalGroup.traverse((child) => {

  if (child.isMesh) {

    child.geometry.dispose();

  }

});

crystalMaterial.dispose();

baseGeometry.dispose();
baseMaterial.dispose();
      container.removeChild(
        renderer.domElement
      );
    };

  }, []);

  return (
    <div
      ref={containerRef}
      className="mining-crystal"
    />
  );
}