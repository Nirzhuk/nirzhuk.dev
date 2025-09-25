'use client';
import { useEffect, useRef } from 'react';

export default function CRTEffects() {
  const scanlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setRandomScanlineDuration = () => {
      // Calculate duration based on viewport height to maintain consistent speed
      const viewportHeight = window.innerHeight;
      const baseDuration = 0.5; // Base duration for 1080px height
      const scaleFactor = viewportHeight / 1080; // Scale based on screen height
      const randomMultiplier = Math.random() * 0.8 + 0.2; // 0.2-1 seconds
      const duration = baseDuration * scaleFactor * randomMultiplier;

      if (scanlineRef.current) {
        scanlineRef.current.style.setProperty('--scanline-duration', duration + 's');
      }
      setTimeout(setRandomScanlineDuration, duration * 1000);
    };

    setRandomScanlineDuration();

    // Recalculate on window resize
    const handleResize = () => {
      setRandomScanlineDuration();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {/* SVG Filters for CRT Distortion */}
      <div
        style={{
          display: 'none',
          position: 'absolute',
          top: '-9999px',
          zIndex: 0,
          visibility: 'hidden',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          id="svg-root"
          width="381"
          height="166"
          style={{ zIndex: -1 }}
        >
          <title id="test-title">filters-dispMap-BE-16</title>
          <desc id="test-desc">Test which verifies the basic facilities of feDisplacementMap.</desc>
          <defs>
            <filter
              id="SphereMapTest"
              filterUnits="objectBoundingBox"
              x="-0.45"
              y="-1.29"
              width="1.6"
              height="3.5"
            >
              <feImage id="mapa" result="Map" xlinkHref="img/sphere_wide_1.png" />
              <feDisplacementMap
                id="despMap"
                in="SourceGraphic"
                in2="Map"
                scale="100"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <filter id="colorfill" style={{ zIndex: 1 }}>
              <feColorMatrix
                id="colorMain"
                type="matrix"
                in="SourceGraphic"
                result="B"
                values="
                  1	0	0	0	0
                  0	1	0	0	0
                  0	0	1	0	0
                  0	0	0	1	0
                "
              >
                <animate
                  id="colA"
                  attributeName="values"
                  begin="0s"
                  dur="3.5s"
                  restart="always"
                  repeatCount="1"
                  values="
                  1	0	0	0	0
                  0	1	0	0	0
                  0	0	1	0	0
                  0	0	0	1	0;
                  1	0	0	0	0
                  0	1	0	0	0
                  0	0	1	0	0
                  0	0	0	1	0
                "
                  fill="freeze"
                />
              </feColorMatrix>
              <feMerge>
                <feMergeNode in="A" />
                <feMergeNode in="B" />
              </feMerge>
            </filter>
            <filter id="secondFill" style={{ zIndex: 0 }}>
              <feColorMatrix
                id="colorSec"
                type="matrix"
                in="SourceGraphic"
                values="
                  0	0	0	0	0
                  0	1	0	0	0
                  0	0	0	0	0
                  0	0	0	1	0 
                "
              />
            </filter>
            <filter id="brightness">
              <feComponentTransfer>
                <feFuncR id="brR" type="linear" slope="1" />
                <feFuncG id="brG" type="linear" slope="1" />
                <feFuncB id="brB" type="linear" slope="1" />
              </feComponentTransfer>
            </filter>
            <filter id="contrast">
              <feComponentTransfer>
                <feFuncR id="conR" type="linear" slope="1" intercept="0" />
                <feFuncG id="conG" type="linear" slope="1" intercept="0" />
                <feFuncB id="conB" type="linear" slope="1" intercept="0" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
