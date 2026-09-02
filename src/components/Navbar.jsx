"use client";
import "../app/css/Navbar.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {

  const navRef = useRef(null);

  useEffect(() => {
  let lastScroll = window.scrollY;
  let lastDirection = null;
    gsap.fromTo(
      navRef.current,
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      }
    );
    const handleScroll = () => {
    const currentScroll = window.scrollY;

    // Scrolling DOWN
    if (currentScroll > lastScroll && lastDirection !== "down") {

      lastDirection = "down";

      gsap.to(navRef.current, {
       
         y: -100,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });

    }
 else if (currentScroll < lastScroll && lastDirection !== "up") {

      lastDirection = "up";

      gsap.to(navRef.current, {
         y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

    }

    lastScroll = currentScroll;
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };

  }, []);

  return (
    <nav className="navbar" ref={navRef}>

      <div className="logo">
        COMINVI
      </div>

      <div className="nav-links">
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Projects</a>
        <a href="#">Contact</a>
      </div>

      <button className="menu-btn">
        Menu
      </button>

    </nav>
  );
}