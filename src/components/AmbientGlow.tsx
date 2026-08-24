"use client";

import { useEffect, useState } from "react";

export function AmbientGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth >= 992);
      
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 992);
      };

      const handleMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      className="fixed pointer-events-none z-10 w-[500px] h-[500px] rounded-full transition-transform duration-100 ease-out"
      style={{
        transform: `translate(${position.x - 250}px, ${position.y - 250}px)`,
        background: "radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, transparent 70%)",
      }}
    />
  );
}
