"use client";

import { useState, useEffect } from "react";
import MainSearch from "../components/navbar/MainSearch";
import Image from "next/image";
const images = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
];

const HeroSearch = () => {
  const [index, setIndex] = useState(0);

  // Auto image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Images */}
      {images.map((img, i) => (
        <Image
  key={i}
  src={img}
  alt={`hero ${i}`}
  fill
  className={`object-cover transition-opacity duration-1000 ${
    i === index ? "opacity-100" : "opacity-0"
  }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 text-center">
          Find your perfect stay
        </h1>

        <div className="w-full max-w-3xl">
          <MainSearch />
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;