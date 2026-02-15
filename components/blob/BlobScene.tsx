'use client';

import { OrthographicCamera } from '@react-three/drei';
import BlobPoints from './BlobPoints';

export default function BlobScene() {
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={85} />
      <BlobPoints />
    </>
  );
}
