'use client';

import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const TERMINAL_GREEN = '#10fb88';
const GLITCH_CHARS = '▓░█▒╬╠╣╗╝╚╔║─┼┤├┬┴▀▄■□▪▫●○◘◙';

// --- Texture creation ---

function createTextCanvas(text: string, color: string, fontSize: number) {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const scaledFontSize = fontSize * dpr;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const font = `bold ${scaledFontSize}px "Space Mono", "Courier New", monospace`;
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const width = Math.ceil(metrics.width) + 40;
  const height = Math.ceil(scaledFontSize * 2.2);

  canvas.width = width;
  canvas.height = height;

  return { canvas, ctx, font, width, height, scaledFontSize };
}

function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  color: string,
  font: string,
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height);
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.imageSmoothingEnabled = false;
  ctx.fillText(text, 10, height / 2);
}

function scrambleText(text: string, intensity: number): string {
  return text
    .split('')
    .map(ch => {
      if (ch === ' ' || Math.random() > intensity) return ch;
      return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    })
    .join('');
}

// --- Chromatic aberration shader ---

const chromaticVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const chromaticFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  uniform vec2 uOffset;
  uniform float uRgbSplit;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv + uOffset;

    float r = texture2D(uTexture, uv + vec2(uRgbSplit, 0.0)).a;
    float g = texture2D(uTexture, uv).a;
    float b = texture2D(uTexture, uv - vec2(uRgbSplit, 0.0)).a;

    // Sample the original color
    vec4 texColor = texture2D(uTexture, uv);

    // When no split, use original. When split, tint the channels.
    vec3 splitColor = vec3(r * 0.9, g, b * 0.7);
    vec3 finalColor = mix(texColor.rgb, splitColor, step(0.001, uRgbSplit));

    float alpha = max(max(r, g), b);
    alpha = mix(texColor.a, alpha, step(0.001, uRgbSplit));

    gl_FragColor = vec4(finalColor, alpha * uOpacity);
  }
`;

// --- Scanline + noise overlay shader ---

const overlayVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const overlayFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simple hash noise
  float hash(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
  }

  void main() {
    // Scanlines
    float scanY = gl_FragCoord.y;
    float scanline = smoothstep(0.4, 0.5, fract(scanY / 3.0)) * 0.08;

    // Noise grain
    vec2 noiseUv = gl_FragCoord.xy + uTime * 1000.0;
    float noise = hash(noiseUv) * 0.04;

    float alpha = scanline + noise;
    gl_FragColor = vec4(0.063, 0.984, 0.533, alpha * 0.5);
  }
`;

// --- Components ---

interface ScrollingRowProps {
  text: string;
  y: number;
  speed: number;
  color: string;
  height: number;
  opacity: number;
}

function ScrollingRow({ text, y, speed, color, height, opacity }: ScrollingRowProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offsetRef = useRef(0);
  const glitchRef = useRef({
    active: false,
    timer: Math.random() * 5 + 3,
    duration: 0,
    shiftX: 0,
    rgbSplit: 0,
  });

  const baseText = text;
  const separator = '   >>>   ';
  const fullText = baseText + separator + baseText + separator;

  const {
    canvas,
    ctx,
    font,
    width: cw,
    height: ch,
  } = useMemo(() => createTextCanvas(fullText, color, 96), [fullText, color]);

  const texture = useMemo(() => {
    drawText(ctx, fullText, color, font, cw, ch);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.anisotropy = 4;
    tex.generateMipmaps = true;
    return tex;
  }, [canvas, ctx, fullText, color, font, cw, ch]);

  const aspect = cw / ch;
  const planeWidth = height * aspect;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uOpacity: { value: opacity },
      uOffset: { value: new THREE.Vector2(0, 0) },
      uRgbSplit: { value: 0 },
    }),
    [texture, opacity]
  );

  const redrawTexture = useCallback(
    (displayText: string) => {
      drawText(ctx, displayText, color, font, cw, ch);
      texture.needsUpdate = true;
    },
    [ctx, color, font, cw, ch, texture]
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    const mat = mesh.material as THREE.ShaderMaterial;
    const g = glitchRef.current;

    // Scroll via UV offset
    offsetRef.current += (speed * delta) / planeWidth;
    if (offsetRef.current >= 0.5) {
      offsetRef.current -= 0.5;
    }
    mat.uniforms.uOffset.value.x = offsetRef.current;

    // Glitch timer
    g.timer -= delta;
    if (g.timer <= 0 && !g.active) {
      g.active = true;
      g.duration = Math.random() * 0.12 + 0.04;
      g.shiftX = (Math.random() - 0.5) * 0.05;
      g.rgbSplit = (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1);

      const scrambled = scrambleText(fullText, 0.15);
      redrawTexture(scrambled);
    }

    if (g.active) {
      g.duration -= delta;

      mesh.position.x = g.shiftX;
      mat.uniforms.uRgbSplit.value = g.rgbSplit;
      mat.uniforms.uOpacity.value = Math.random() > 0.4 ? opacity : opacity * 0.35;

      if (g.duration <= 0) {
        g.active = false;
        g.timer = Math.random() * 6 + 3;
        mesh.position.x = 0;
        mat.uniforms.uRgbSplit.value = 0;
        mat.uniforms.uOpacity.value = opacity;

        redrawTexture(fullText);
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, y, 0]}>
      <planeGeometry args={[planeWidth * 0.5, height]} />
      <shaderMaterial
        vertexShader={chromaticVertexShader}
        fragmentShader={chromaticFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

const ROWS = [
  {
    text: '> Working right now on NetHaven coming soon in March   Learning Solidity, Rust & ThreeJS   Maybe you should click on me',
    speed: 1.0,
    color: TERMINAL_GREEN,
    y: 0,
    height: 0.35,
    opacity: 0.9,
  },
];

// --- Scanline + Noise overlay ---

function ScanlineNoiseOverlay() {
  const { viewport } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
    }),
    [viewport.width, viewport.height]
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh position={[0, 0, 0.5]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={overlayVertexShader}
        fragmentShader={overlayFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

// --- Fade overlay ---

function createFadeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 4;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createLinearGradient(0, 0, 512, 0);
  gradient.addColorStop(0, 'rgba(255,255,255,0)');
  gradient.addColorStop(0.25, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.75, 'rgba(255,255,255,1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 4);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function FadeOverlay() {
  const { viewport } = useThree();
  const texture = useMemo(() => createFadeTexture(), []);

  return (
    <mesh position={[0, 0, 2]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        toneMapped={false}
        blending={THREE.CustomBlending}
        blendSrc={THREE.ZeroFactor}
        blendDst={THREE.SrcAlphaFactor}
        blendSrcAlpha={THREE.ZeroFactor}
        blendDstAlpha={THREE.SrcAlphaFactor}
      />
    </mesh>
  );
}

// --- Main scene ---

export default function MarqueeScene() {
  return (
    <>
      {ROWS.map((row, i) => (
        <ScrollingRow key={i} {...row} y={0} />
      ))}
      <ScanlineNoiseOverlay />
      <FadeOverlay />
    </>
  );
}
