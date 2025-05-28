"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let stars: THREE.Points;
    let animationId: number;

    const starCount = 10000;

    const init = () => {
      // Scene
      scene = new THREE.Scene(); // Camera

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 800; // Renderer

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      } // Star Geometry

      const starGeometry = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i++) {
        starPositions[i] = (Math.random() - 0.5) * 2000;
      }
      starGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(starPositions, 3)
      ); // Star Material

      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        transparent: true,
      }); // Points

      stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate); // Rotation

      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0002; // Move stars downward

      const positions = stars.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.05;
        if (positions[i + 1] < -1000) {
          positions[i + 1] = 1000;
        }
      }
      stars.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }; // Initialize and animate

    init();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
}
