// Hero.tsx
import React from "react";

interface HeroProps {
  id: string | number;
  image: string;
  title: string;
  description: string;
}

const Hero: React.FC<HeroProps> = ({ id, image, title, description }) => {
  return (
    <div
      className="hero-section bg-cover bg-center bg-no-repeat py-16 px-4 md:px-8 lg:px-16 flex items-center justify-center"
      style={{ height: "75vh", backgroundImage: `url(${image})` }}
    >
      <div className="hero-overlay bg-[rgba(9,24,49,.4)] absolute top-0 left-0 w-full h-full"></div>
      <div className="text-center md:w-2/4 sm:w-1/2 relative z-10">
        <h1 className="text-5xl font-bold mb-4">
          #{id} {title} Details
        </h1>
        <p className="text-xl mb-8">{description}</p>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-lg transition duration-300">
          Discover More
        </button>
      </div>
    </div>
  );
};

export default Hero;
