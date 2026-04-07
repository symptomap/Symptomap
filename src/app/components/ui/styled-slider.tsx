import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface StyledSliderProps {
  value: number[];
  onValueChange?: (value: number[]) => void;
  max: number;
  step: number;
  className?: string;
  disabled?: boolean;
}

export function StyledSlider({
  value,
  onValueChange,
  max,
  step,
  className = "",
  disabled = false,
}: StyledSliderProps) {
  return (
    <SliderPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      max={max}
      step={step}
      disabled={disabled}
      className={`relative flex w-full touch-none items-center select-none ${className}`}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
    </SliderPrimitive.Root>
  );
}