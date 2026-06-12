'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface ThreeDBallProps {
  src: string;
  alt: string;
  isTeamContentActive: boolean;
}

export default function ThreeDBall({ src, alt, isTeamContentActive }: ThreeDBallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State to track if mouse is hovering
  const [isHovered, setIsHovered] = useState(false);
  
  // Reference values for lerp targets (mouse values map from -1 to 1)
  const mouseCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Get real container size
    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup - Perspective matches human depth perception
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 450;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 2, 2));
    renderer.setSize(width, height);

    // 4. Load the image texture with standard sRGB color spectrum
    const textureLoader = new THREE.TextureLoader();
    let mesh: THREE.Mesh | null = null;
    let texture: THREE.Texture | null = null;

    textureLoader.load(src, (loadedTexture) => {
      texture = loadedTexture;
      texture.colorSpace = THREE.SRGBColorSpace;
      
      // Determine the geometry size relative to canvas
      const size = Math.min(width, height) * 0.95;
      const geometry = new THREE.PlaneGeometry(size, size);
      
      // Basic material keeps the custom pre-shaded PNG design pure and vibrant
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    // 5. Smooth animation frame loop using lerp physics
    let animationId: number;
    let currentX = 0;
    let currentY = 0;
    let currentScale = 1;
    let autoRotation = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (mesh) {
        // Soft ambient spin
        autoRotation += 0.0006;
        
        // Target scales and rotation based on interaction
        const targetRotX = -mouseCoords.current.y * 0.38; // Max pitch angle
        const targetRotY = mouseCoords.current.x * 0.38;  // Max yaw angle
        const targetScale = isHovered ? 1.04 : 1.0;

        // Inertial slide physics (Lerping)
        currentX += (targetRotY - currentX) * 0.05; // ultra-soft interpolation
        currentY += (targetRotX - currentY) * 0.05;
        currentScale += (targetScale - currentScale) * 0.08;

        mesh.rotation.y = currentX;
        mesh.rotation.x = currentY;
        mesh.rotation.z = autoRotation; // Continuous slow rotation overlay

        // Soft position offset (2.5D parallax)
        mesh.position.x += (mouseCoords.current.x * 20 - mesh.position.x) * 0.05;
        mesh.position.y += (-mouseCoords.current.y * 20 - mesh.position.y) * 0.05;

        mesh.scale.set(currentScale, currentScale, currentScale);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Interactive Mouse Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
      mouseCoords.current.x = x * 2; // scale to -1 to 1
      mouseCoords.current.y = y * 2;
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseCoords.current.x = 0;
      mouseCoords.current.y = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 7. Handle container resizing
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth || 300;
      height = containerRef.current.clientHeight || 300;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Re-scale the mesh relative to new container sizes
      if (mesh) {
        mesh.geometry.dispose();
        const size = Math.min(width, height) * 0.95;
        mesh.geometry = new THREE.PlaneGeometry(size, size);
      }
    };

    window.addEventListener('resize', handleResize);

    // 8. Strict Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);

      if (mesh) {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      }
      if (texture) {
        texture.dispose();
      }
      renderer.dispose();
    };
  }, [src, isHovered]);

  return (
    <div 
      ref={containerRef}
      className="w-[280px] h-[280px] xs:w-[320px] xs:h-[320px] sm:w-[420px] sm:h-[420px] md:w-[680px] md:h-[680px] lg:w-[850px] lg:h-[850px] max-w-none hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center relative pointer-events-auto cursor-pointer"
      style={{ touchAction: 'none' }}
      title={alt}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block filter drop-shadow-[0_45px_95px_rgba(0,0,0,0.98)]" 
      />
    </div>
  );
}
