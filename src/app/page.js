/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "./Components/Home/Hero";
import About from "./Components/Home/About";
import Services from "./Components/Home/Services";
import Gallery from "./Components/Home/Gallery";
import Testimonials from "./Components/Home/Testimonials";
import Contact from "./Components/Home/Contact";

export default function Home() {
  return (
    <div className="bg-gray-950 text-gray-100 overflow-x-hidden font-sans">
      {/* Hero Carousel */}
     <Hero/>

      {/* About Section */}
    <About/>

      {/* Services Section */}
      <Services/>

      {/* Gallery Section */}
      <Gallery/>

      {/* Testimonials */}
    <Testimonials/>

      {/* Contact */}
     <Contact/>
    </div>
  );
}