import * as THREE from 'three';

export const PRIMARY_GREEN = new THREE.Color('#51e018');
export const TERMINAL_GREEN = new THREE.Color('#10fb88');

export const MAX_RIPPLES = 8;

export interface RippleEvent {
  center: THREE.Vector3;
  startTime: number;
  active: boolean;
}

export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uRippleCenters[${MAX_RIPPLES}];
  uniform float uRippleStartTimes[${MAX_RIPPLES}];
  uniform float uRippleActive[${MAX_RIPPLES}];
  
  varying float vHeight;
  varying float vDistance;

  // Simplex 3D Noise
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float ripple(vec3 p, vec3 center, float t, float startTime, float isActive) {
    if (isActive < 0.5) return 0.0;
    
    float dt = max(t - startTime, 0.0);
    float d = distance(p, center);
    
    float speed = 2.0;
    float freq = 8.0;
    float decayDist = 1.5;
    float decayTime = 1.2;
    
    float phase = (d * freq) - (dt * speed);
    float env = exp(-decayDist * d) * exp(-decayTime * dt);
    
    return sin(phase) * env * 0.15;
  }

  void main() {
    vec3 pos = position;
    vec3 norm = normalize(position);
    
    // Base noise displacement (organic morphing)
    float n1 = snoise(pos * 1.2 + uTime * 0.35);
    float n2 = snoise(pos * 2.4 - uTime * 0.2);
    float baseNoise = n1 * 0.7 + n2 * 0.3;
    
    // Ripple contributions
    float rippleSum = 0.0;
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      rippleSum += ripple(norm, uRippleCenters[i], uTime, uRippleStartTimes[i], uRippleActive[i]);
    }
    
    // Total height
    float height = baseNoise * 0.12 + rippleSum;
    vHeight = height * 2.0 + 0.5; // Normalize to 0-1 range roughly
    
    // Displace along normal
    pos = pos + norm * height;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Point size with perspective - reduced for better visibility
    float baseSize = 2.0;
    gl_PointSize = baseSize * (100.0 / -mvPosition.z);
    gl_PointSize *= (0.8 + vHeight * 0.4);
    gl_PointSize = clamp(gl_PointSize, 1.0, 8.0);
    
    vDistance = -mvPosition.z;
  }
`;

export const fragmentShader = /* glsl */ `
  uniform vec3 uPrimaryColor;
  uniform vec3 uTerminalColor;
  
  varying float vHeight;
  varying float vDistance;

  void main() {
    // Circular dot mask
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    // Soft edge
    float alpha = 1.0 - smoothstep(0.2, 0.5, dist);
    
    // Color based on height (intensity)
    float t = clamp(vHeight, 0.0, 1.0);
    vec3 color = mix(uTerminalColor, uPrimaryColor, t);
    
    // Adjust brightness
    color *= (0.6 + 0.4 * t);
    
    gl_FragColor = vec4(color, alpha * 0.6);
  }
`;

export function createBlobUniforms() {
  return {
    uTime: { value: 0 },
    uPrimaryColor: { value: PRIMARY_GREEN },
    uTerminalColor: { value: TERMINAL_GREEN },
    uRippleCenters: {
      value: Array(MAX_RIPPLES)
        .fill(null)
        .map(() => new THREE.Vector3()),
    },
    uRippleStartTimes: { value: new Float32Array(MAX_RIPPLES) },
    uRippleActive: { value: new Float32Array(MAX_RIPPLES) },
  };
}
