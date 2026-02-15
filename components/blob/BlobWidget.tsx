'use client';

import { Canvas } from '@react-three/fiber';
import BlobScene from './BlobScene';

export default function BlobWidget() {
  return (
    <div className="w-[200px] h-[200px] rounded-xl overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          premultipliedAlpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
      >
        <BlobScene />
      </Canvas>
    </div>
  );
}
