'use client'
// src/Chip.tsx
import React, { useState } from 'react';

interface ChipProps {
  label: string;
  onRemove: () => void;
}

export const getRandomImage = () => {
  
  const randomImages = [
    'https://placekitten.com/24/24', // Example image URL
    'https://placebear.com/24/24', // Example image URL
    // Add more image URLs as needed
  ];

  return randomImages[Math.floor(Math.random() * randomImages.length)];
};

const Chip: React.FC<ChipProps> = ({ label, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  const chipClassName = `flex items-center p-2 rounded-full m-1 ${
    isHovered ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'
  }`;

  const chipImage = getRandomImage();

  return (
    <div
      className={chipClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={chipImage} alt="Chip" className="w-4 h-4 rounded-full mr-2" />
      {label}
      <span className="ml-2 cursor-pointer" onClick={onRemove}>
        X
      </span>
    </div>
  );
};

export default Chip;
