"use client";

import React, { useEffect, useRef } from "react";

export const CinematicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 85 gentle cinematic warm dust particles floating across the viewport
    const particles = Array.from({ length: 85 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.8,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.55 + 0.2,
      baseOpacity: Math.random() * 0.55 + 0.2,
      pulseSpeed: Math.random() * 0.025 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.pulseSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.angle) * 0.22;

        // Wrap around viewport edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 106, ${Math.max(0.08, p.opacity)})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(234, 179, 8, 0.45)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0B0B0B]">
      {/* 1. Full-screen Floating Cinematic Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90"
      />

      {/* 2. Top Hero Ambient Light Sweep */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-[#C9A86A]/15 to-[#EAB308]/20 rounded-full blur-[160px] animate-pulse" />

      {/* 3. Middle Section (Featured Project & Selected Work) Ambient Light Sweep */}
      <div className="absolute top-1/2 right-1/4 translate-x-1/4 w-[850px] h-[850px] bg-gradient-to-br from-[#C9A86A]/15 to-[#EAB308]/15 rounded-full blur-[170px] animate-[pulse_6s_ease-in-out_infinite]" />

      {/* 4. Lower Section (Capabilities, Process, About, Contact) Ambient Light Sweep */}
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/3 w-[850px] h-[850px] bg-gradient-to-t from-[#C9A86A]/12 to-[#EAB308]/10 rounded-full blur-[180px] animate-[pulse_8s_ease-in-out_infinite]" />

      {/* 5. Subtle Cinematic Film Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] cinematic-grain" />
    </div>
  );
};
