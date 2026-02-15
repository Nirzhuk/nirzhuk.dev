'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GRID_SIZE = 32;
const SPACING = 0.09;

const vertexShader = /* glsl */ `
  uniform float uTime;
  
  attribute float aIndex;
  attribute vec2 aGridPos;
  
  varying float vAlpha;
  varying vec2 vGridPos;
  varying float vHeight;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec3 pos = position;
    
    // Distance from center for circular mask
    float dist = length(aGridPos);
    
    // Flowing wave pattern - travels across the surface
    float wave1 = sin(aGridPos.x * 4.0 - uTime * 2.0 + aGridPos.y * 2.0);
    float wave2 = sin(aGridPos.y * 4.0 - uTime * 1.5 - aGridPos.x * 2.0);
    float wave3 = sin((aGridPos.x + aGridPos.y) * 3.0 - uTime * 2.5);
    
    // Combine waves
    float flowingWave = (wave1 + wave2 + wave3) / 3.0;
    
    // Radial waves from center
    float radialWave = sin(dist * 10.0 - uTime * 3.0);
    
    // Subtle noise for organic feel
    float noise = snoise(aGridPos * 2.5 + uTime * 0.2);
    
    // Height map: dominant flowing waves with radial accent
    float height = flowingWave * 0.25 + radialWave * 0.15 + noise * 0.1;
    
    // Fade at edges
    float edgeFade = 1.0 - smoothstep(0.6, 1.0, dist);
    height *= edgeFade;
    
    // Apply height to Z position
    pos.z += height;
    
    // Circular falloff - points outside radius fade out
    float radius = 0.9;
    float circleMask = 1.0 - smoothstep(radius * 0.6, radius, dist);
    
    vAlpha = circleMask;
    vGridPos = aGridPos;
    vHeight = height;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Point size varies with height
    float sizeVariation = 1.0 + height * 3.0;
    gl_PointSize = (6.0 * circleMask + 2.0) * sizeVariation;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorLow;
  uniform vec3 uColorMid;
  uniform vec3 uColorHigh;
  
  varying float vAlpha;
  varying vec2 vGridPos;
  varying float vHeight;

  void main() {
    if (vAlpha < 0.01) discard;
    
    // Circular dot shape
    vec2 coord = gl_PointCoord - 0.5;
    float dist = length(coord);
    
    if (dist > 0.5) discard;
    
    // Height-based color mapping
    float normalizedHeight = (vHeight + 0.3) / 0.6; // Normalize to 0-1 range
    normalizedHeight = clamp(normalizedHeight, 0.0, 1.0);
    
    vec3 color;
    if (normalizedHeight < 0.5) {
      // Low to mid range
      color = mix(uColorLow, uColorMid, normalizedHeight * 2.0);
    } else {
      // Mid to high range
      color = mix(uColorMid, uColorHigh, (normalizedHeight - 0.5) * 2.0);
    }
    
    // Add subtle shimmer
    float shimmer = sin(uTime * 3.0 + vHeight * 10.0) * 0.1 + 0.9;
    color *= shimmer;
    
    // Circular edge softness
    float edgeFade = 1.0 - smoothstep(0.3, 0.5, dist);
    
    gl_FragColor = vec4(color, vAlpha * 0.85 * edgeFade);
  }
`;

export default function BlobPoints() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, uniforms } = useMemo(() => {
    const positions: number[] = [];
    const indices: number[] = [];
    const gridPositions: number[] = [];

    let idx = 0;
    const halfGrid = GRID_SIZE / 2;

    for (let x = -halfGrid; x <= halfGrid; x++) {
      for (let y = -halfGrid; y <= halfGrid; y++) {
        const px = x * SPACING;
        const py = y * SPACING;

        // Normalized grid position for shader
        const gx = x / halfGrid;
        const gy = y / halfGrid;

        positions.push(px, py, 0);
        gridPositions.push(gx, gy);
        indices.push(idx++);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('aIndex', new THREE.Float32BufferAttribute(indices, 1));
    geo.setAttribute('aGridPos', new THREE.Float32BufferAttribute(gridPositions, 2));

    const unis = {
      uTime: { value: 0 },
      uColorLow: { value: new THREE.Color('#0aa44a') }, // Dark green (low points)
      uColorMid: { value: new THREE.Color('#14cf46') }, // Terminal green (mid)
      uColorHigh: { value: new THREE.Color('#22fd26') }, // Bright green (high points)
    };

    return { geometry: geo, uniforms: unis };
  }, []);

  useFrame(state => {
    if (!materialRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
