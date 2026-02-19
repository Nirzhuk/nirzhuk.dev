'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import MarqueeScene from './MarqueeScene';
import PongGame from './PongGame';

export default function MarqueeWidget() {
  const [mode, setMode] = useState<'marquee' | 'pong'>('marquee');

  return (
    <div
      className="w-full h-[60px] border-y border-terminal/20 cursor-pointer"
      style={{ minHeight: 60 }}
      onClick={() => setMode((m) => (m === 'marquee' ? 'pong' : 'marquee'))}
    >
      <Canvas
        dpr={[1, 2]}
        frameloop="always"
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'low-power',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={100} />
        {mode === 'marquee' ? <MarqueeScene /> : <PongGame />}
      </Canvas>
    </div>
  );
}
