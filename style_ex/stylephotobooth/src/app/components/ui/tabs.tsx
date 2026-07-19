"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-12 w-fit items-center justify-center rounded-full p-1.5 flex backdrop-blur-md border border-white/40",
        className,
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(240, 230, 255, 0.5) 50%, rgba(255, 240, 250, 0.6) 100%)',
        boxShadow: '0 4px 16px rgba(180, 120, 220, 0.15), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)'
      }}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-600 data-[state=active]:text-gray-700 data-[state=active]:border-white/50 data-[state=active]:shadow-lg",
        className,
      )}
      style={{
        ...((props as any)['data-state'] === 'active' ? {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 240, 255, 0.9) 100%)',
          boxShadow: '0 4px 12px rgba(147, 51, 234, 0.2), 0 2px 6px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1)'
        } : {})
      }}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };