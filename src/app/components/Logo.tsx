import React from "react";
import logoImage from "figma:asset/5f66df9afa3896c4263304fcf7385e9d49e8a083.png";

interface LogoProps {
  alt?: string;
  className?: string;
}

export function Logo({ alt = "SymptomMap - Map your health, understand your body", className = "h-20 w-auto" }: LogoProps) {
  return (
    <img
      src={logoImage}
      alt={alt}
      className={className}
    />
  );
}
