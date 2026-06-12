'use client';

import React, { useEffect, useRef } from 'react';

interface WaterShaderBackgroundProps {
  theme?: 'argentina' | 'brazil' | 'england' | 'france' | 'spain' | 'portugal';
}

export default function WaterShaderBackground({ theme = 'argentina' }: WaterShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source with dynamic color uniforms
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec3 u_space_indigo;
      uniform vec3 u_navy_blue;
      uniform vec3 u_secondary_accent;
      uniform vec3 u_core_accent;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        
        // Correct coords for aspect ratio symmetry
        vec2 uv_correct = uv;
        uv_correct.x *= aspect;
        
        vec2 mouse_correct = u_mouse;
        mouse_correct.x *= aspect;

        // Extremely slow multi-frequency fluid noise strings
        float speed = u_time * 0.08;
        
        float wave1 = sin(uv_correct.y * 2.8 + speed * 0.9) * 0.4;
        float wave2 = cos(uv_correct.x * 2.2 - speed * 0.7) * 0.4;
        float wave3 = sin((uv_correct.x + uv_correct.y) * 3.5 + speed * 1.3) * 0.2;
        
        float wave = wave1 + wave2 + wave3;

        // Super premium interactive water ripple highlight near mouse
        float dist = distance(uv_correct, mouse_correct);
        float ripple = sin(dist * 18.0 - u_time * 0.4) * exp(-dist * 4.0);
        ripple = ripple * 0.08; // extremely elegant and soft, not flashy

        // Apply distortions to UV lookup for high-fidelity glass-refraction feel
        vec2 displaced_uv = uv + vec2(wave * 0.025 + ripple * 0.5, wave * 0.015 - ripple * 0.4);

        // Core Elegant Palette: dynamic uniforms
        vec3 space_indigo = u_space_indigo;
        vec3 navy_blue = u_navy_blue;
        vec3 albiceleste = u_secondary_accent;
        vec3 pure_white = vec3(0.96, 0.97, 0.99);     // Pristine White
        vec3 gold_crest = u_core_accent;

        // Create fluid gradient layers
        float mix_val1 = smoothstep(0.1, 0.9, displaced_uv.y + displaced_uv.x * 0.35 + wave * 0.1);
        vec3 core_bg = mix(space_indigo, navy_blue, mix_val1);

        float mix_val2 = smoothstep(0.35, 1.05, displaced_uv.y * 1.15 - displaced_uv.x * 0.2 + wave * 0.15);
        vec3 with_sky = mix(core_bg, albiceleste, mix_val2 * 0.68);

        // Slow shining glossy highlights (simulating liquid silk threads)
        float gloss = smoothstep(0.97, 1.0, 1.0 - abs(wave));
        vec3 final_color = mix(with_sky, pure_white, gloss * 0.14);

        // Delicate warm ambient lighting representing national glory
        float gold_spot = smoothstep(0.65, 0.0, distance(uv, vec2(0.85, 0.15))) * 0.05;
        final_color += gold_crest * gold_spot;

        // Soft, organic light feedback under cursor
        float cursor_backlight = smoothstep(0.38, 0.0, dist) * 0.06;
        final_color += albiceleste * cursor_backlight;

        gl_FragColor = vec4(final_color, 1.0);
      }
    `;

    // Helper to compile shaders
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    // Link Program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering viewport)
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uSpaceIndigoLoc = gl.getUniformLocation(program, 'u_space_indigo');
    const uNavyBlueLoc = gl.getUniformLocation(program, 'u_navy_blue');
    const uSecondaryAccentLoc = gl.getUniformLocation(program, 'u_secondary_accent');
    const uCoreAccentLoc = gl.getUniformLocation(program, 'u_core_accent');

    // Theme color palettes dictionary
    const targets: Record<string, { spaceIndigo: number[], navyBlue: number[], secondaryAccent: number[], coreAccent: number[] }> = {
      argentina: {
        spaceIndigo: [0.012, 0.024, 0.043],
        navyBlue: [0.047, 0.102, 0.176],
        secondaryAccent: [0.455, 0.675, 0.875],
        coreAccent: [0.85, 0.69, 0.22]
      },
      brazil: {
        spaceIndigo: [0.0, 0.07, 0.02],
        navyBlue: [0.082, 0.501, 0.239],
        secondaryAccent: [0.917, 0.701, 0.031],
        coreAccent: [0.113, 0.305, 0.847]
      },
      england: {
        spaceIndigo: [0.01, 0.02, 0.05],
        navyBlue: [0.04, 0.1, 0.19],
        secondaryAccent: [0.95, 0.95, 0.95],
        coreAccent: [0.6, 0.1, 0.1]
      },
      france: {
        spaceIndigo: [0.01, 0.03, 0.1],
        navyBlue: [0.12, 0.23, 0.54],
        secondaryAccent: [0.98, 0.98, 0.98],
        coreAccent: [0.86, 0.15, 0.15]
      },
      spain: {
        spaceIndigo: [0.08, 0.01, 0.02],
        navyBlue: [0.73, 0.11, 0.11],
        secondaryAccent: [0.96, 0.62, 0.04],
        coreAccent: [0.11, 0.31, 0.85]
      },
      portugal: {
        spaceIndigo: [0.06, 0.01, 0.02],
        navyBlue: [0.6, 0.11, 0.11],
        secondaryAccent: [0.08, 0.5, 0.24],
        coreAccent: [0.92, 0.7, 0.03]
      }
    };

    // Instantiate current smooth state
    const firstActive = themeRef.current || 'argentina';
    const currentColors = {
      spaceIndigo: [...targets[firstActive].spaceIndigo],
      navyBlue: [...targets[firstActive].navyBlue],
      secondaryAccent: [...targets[firstActive].secondaryAccent],
      coreAccent: [...targets[firstActive].coreAccent]
    };

    // Handle resizing beautifully
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to 0-1
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = 1.0 - (e.clientY / window.innerHeight); // Flip Y for WebGL coords
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.targetX = e.touches[0].clientX / window.innerWidth;
        mouseRef.current.targetY = 1.0 - (e.touches[0].clientY / window.innerHeight);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Render loop
    let animationId: number;
    const startTime = performance.now();

    const render = () => {
      const elapsedSeconds = (performance.now() - startTime) / 1000;

      // Soft lerping interpolation for pristine, smooth cursor lag (premium feeling)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Dynamic Color Interpolation
      const activeTargets = targets[themeRef.current || 'argentina'];
      const lerp = (curr: number, target: number, speed = 0.03) => curr + (target - curr) * speed;

      currentColors.spaceIndigo[0] = lerp(currentColors.spaceIndigo[0], activeTargets.spaceIndigo[0]);
      currentColors.spaceIndigo[1] = lerp(currentColors.spaceIndigo[1], activeTargets.spaceIndigo[1]);
      currentColors.spaceIndigo[2] = lerp(currentColors.spaceIndigo[2], activeTargets.spaceIndigo[2]);

      currentColors.navyBlue[0] = lerp(currentColors.navyBlue[0], activeTargets.navyBlue[0]);
      currentColors.navyBlue[1] = lerp(currentColors.navyBlue[1], activeTargets.navyBlue[1]);
      currentColors.navyBlue[2] = lerp(currentColors.navyBlue[2], activeTargets.navyBlue[2]);

      currentColors.secondaryAccent[0] = lerp(currentColors.secondaryAccent[0], activeTargets.secondaryAccent[0]);
      currentColors.secondaryAccent[1] = lerp(currentColors.secondaryAccent[1], activeTargets.secondaryAccent[1]);
      currentColors.secondaryAccent[2] = lerp(currentColors.secondaryAccent[2], activeTargets.secondaryAccent[2]);

      currentColors.coreAccent[0] = lerp(currentColors.coreAccent[0], activeTargets.coreAccent[0]);
      currentColors.coreAccent[1] = lerp(currentColors.coreAccent[1], activeTargets.coreAccent[1]);
      currentColors.coreAccent[2] = lerp(currentColors.coreAccent[2], activeTargets.coreAccent[2]);

      gl.useProgram(program);

      // Set uniforms
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, elapsedSeconds);
      gl.uniform2f(uMouseLoc, mouse.x, mouse.y);
      gl.uniform3fv(uSpaceIndigoLoc, currentColors.spaceIndigo);
      gl.uniform3fv(uNavyBlueLoc, currentColors.navyBlue);
      gl.uniform3fv(uSecondaryAccentLoc, currentColors.secondaryAccent);
      gl.uniform3fv(uCoreAccentLoc, currentColors.coreAccent);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationId = requestAnimationFrame(render);
    };

    render();

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(vertexBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none object-cover z-0"
      style={{ opacity: 0.9 }}
      id="water-shader-backdrop-canvas"
    />
  );
}
