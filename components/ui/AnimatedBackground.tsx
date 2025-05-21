"use client";
import { useEffect, useRef } from "react";

const COLORS = ["#376AD1", "#376AD1", "#376AD1"];

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    const particleCount = 100;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 1, // Smaller particles
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const update = () => {
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x <= 0 || p.x >= canvas.width) p.dx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.dy *= -1;
      });
    };

    const animate = () => {
      draw();
      update();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundColor: "transparent", // Fully transparent
      }}
    />
  );
}
