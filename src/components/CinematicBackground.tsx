"use client";

import React, { useEffect, useRef } from "react";

export const CinematicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // 40 gentle cinematic warm gold particles (optimized for 60fps with zero GPU lag)
    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.8,
      speedY: -(Math.random() * 0.35 + 0.1),
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.4 + 0.15,
      baseOpacity: Math.random() * 0.4 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.pulseSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.angle) * 0.15;

        // Wrap around viewport edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 106, ${Math.max(0.05, Math.min(0.65, p.opacity))})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden cinematic-bg-container transition-colors duration-500">
      {/* 1. Full-screen Floating Cinematic Particles Canvas (Lightweight, 60fps) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />

      {/* 2. Top Hero Ambient Light Sweep (Hardware accelerated) */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,106,0.35) 0%, rgba(234,179,8,0.2) 40%, transparent 70%)",
          filter: "blur(90px)",
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* 3. Middle Section Ambient Light Sweep */}
      <div
        className="absolute top-1/2 right-1/4 translate-x-1/4 w-[750px] h-[750px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,106,0.3) 0%, rgba(234,179,8,0.15) 45%, transparent 70%)",
          filter: "blur(100px)",
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* 4. Lower Section Ambient Light Sweep */}
      <div
        className="absolute bottom-1/4 left-1/3 -translate-x-1/3 w-[700px] h-[700px] rounded-full opacity-12 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,106,0.25) 0%, rgba(234,179,8,0.1) 45%, transparent 70%)",
          filter: "blur(100px)",
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* 5. Subtle Cinematic Film Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.025] cinematic-grain" />
    </div>
  );
};
