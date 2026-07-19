"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "./utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
        style={{
          background: 'linear-gradient(90deg, rgba(216, 180, 254, 0.2) 0%, rgba(192, 132, 252, 0.2) 100%)',
        }}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
          style={{
            background: 'linear-gradient(90deg, #d8b4fe 0%, #c084fc 100%)',
          }}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-5 shrink-0 rounded-full shadow-lg transition-all duration-150 hover:scale-125 active:scale-110 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f3e8ff 100%)',
            border: '3px solid #a855f7',
            boxShadow: '0 2px 8px rgba(168, 85, 247, 0.3), 0 0 0 0px rgba(168, 85, 247, 0.2)',
          }}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
