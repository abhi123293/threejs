"use client";

import "../app/css/Navbar.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Navbar() {

  const navRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);


  // -------------------------
  // NAVBAR SCROLL ANIMATION
  // -------------------------

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


      // SCROLL DOWN
      if (
        currentScroll > lastScroll &&
        lastDirection !== "down"
      ) {

        lastDirection = "down";

        gsap.to(navRef.current, {
          y: "-100%",
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });

      }


      // SCROLL UP
      else if (
        currentScroll < lastScroll &&
        lastDirection !== "up"
      ) {

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


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);


  // -------------------------
  // MOBILE MENU
  // -------------------------

  const toggleMenu = () => {

    setMenuOpen((prev) => !prev);

  };


  return (
    <>

      <nav
        className="navbar"
        ref={navRef}
      >

        {/* LOGO */}

        <Link
          href="/"
          className="logo"
        >
          COMINVI
        </Link>


        {/* DESKTOP LINKS */}

        <div className="nav-links">

          <Link href="#About">
            About
          </Link>

          <Link href="/our-services">
            Services
          </Link>

          <Link href="/technology">
            Projects
          </Link>

          <Link href="#contact">
            Contact
          </Link>

        </div>


        {/* MENU BUTTON */}

        <button
          className="menu-btn"
          onClick={toggleMenu}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

      </nav>


      {/* MOBILE MENU */}

      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >

        <Link
          href="#about"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>

        <Link
          href="/our-services"
          onClick={() => setMenuOpen(false)}
        >
          Services
        </Link>

        <Link
          href="/technology"
          onClick={() => setMenuOpen(false)}
        >
          Projects
        </Link>

        <Link
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>

      </div>

    </>
  );
}