// "use client";

// import { useEffect, useState } from "react";

// const generateDots = (count: number) =>
//   Array.from({ length: count }, () => ({
//     top: Math.random() * 100,
//     left: Math.random() * 100,
//     size: Math.random() * 2 + 1,
//     duration: Math.random() * 10 + 5,
//     delay: Math.random() * 10,
//   }));

// const AnimatedBackground = () => {
//   const [dots, setDots] = useState<any[]>([]); // Empty on server

//   useEffect(() => {
//     setDots(generateDots(80)); // Client-only random logic

//     const interval = setInterval(() => {
//       setDots(generateDots(80));
//     }, 20000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="absolute inset-0 -z-10 overflow-hidden text-black dark:text-white">
//       {dots.map((dot, index) => (
//         <div
//           key={index}
//           className="absolute rounded-full animate-float bg-current"
//           style={{
//             top: `${dot.top}%`,
//             left: `${dot.left}%`,
//             width: `${dot.size}px`,
//             height: `${dot.size}px`,
//             animationDuration: `${dot.duration}s`,
//             animationDelay: `${dot.delay}s`,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default AnimatedBackground;
"use client";
import { useEffect, useRef } from "react";

const COLORS_LIGHT = ["#d7f3fe", "#a3e7fc", "#cfe8ff"];
const COLORS_DARK = ["#fbfcca", "#d7f3fe", "#ffd0a7"];

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    const particleCount = 100;
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? COLORS_DARK
      : COLORS_LIGHT;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 2,
      color: colorScheme[Math.floor(Math.random() * colorScheme.length)],
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const update = () => {
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        // bounce off edges
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
      style={{ backgroundColor: "transparent" }}
    />
  );
}
