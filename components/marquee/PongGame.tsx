'use client';

import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const TERMINAL_GREEN = '#10fb88';
const PADDLE_WIDTH = 0.03;
const PADDLE_HEIGHT = 0.15;
const BALL_SIZE = 0.025;
const BALL_SPEED_INITIAL = 1.5;
const BALL_SPEED_INCREMENT = 0.12;
const AI_LERP = 0.03;
const WIN_SCORE = 3;

function createScoreTexture(leftScore: number, rightScore: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 256, 64);
  ctx.font = 'bold 40px "Space Mono", "Courier New", monospace';
  ctx.fillStyle = TERMINAL_GREEN;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${leftScore}   ${rightScore}`, 128, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function createLabelTexture(text: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 256, 32);
  ctx.font = '10px "Space Mono", "Courier New", monospace';
  ctx.fillStyle = TERMINAL_GREEN;
  ctx.globalAlpha = 0.4;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 16);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export default function PongGame() {
  const { viewport } = useThree();
  const halfW = viewport.width / 2;
  const halfH = viewport.height / 2;

  const paddleLeftRef = useRef<THREE.Mesh>(null);
  const paddleRightRef = useRef<THREE.Mesh>(null);
  const ballRef = useRef<THREE.Mesh>(null);
  const scoreRef = useRef<THREE.Mesh>(null);

  const state = useRef({
    ballX: 0,
    ballY: 0,
    ballVx: BALL_SPEED_INITIAL,
    ballVy: BALL_SPEED_INITIAL * 0.6,
    leftY: 0,
    rightY: 0,
    leftScore: 0,
    rightScore: 0,
    speed: BALL_SPEED_INITIAL,
    frozen: false,
    frozenTimer: 0,
  });

  const scoreTexture = useMemo(() => createScoreTexture(0, 0), []);
  const labelTexture = useMemo(() => createLabelTexture('CLICK TO EXIT'), []);

  const updateScoreDisplay = useCallback(
    (text: string) => {
      const canvas = scoreTexture.image as HTMLCanvasElement;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, 256, 64);
      ctx.font = 'bold 40px "Space Mono", "Courier New", monospace';
      ctx.fillStyle = TERMINAL_GREEN;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 128, 32);
      scoreTexture.needsUpdate = true;
    },
    [scoreTexture]
  );

  const updateScore = useCallback(() => {
    const s = state.current;
    updateScoreDisplay(`${s.leftScore}   ${s.rightScore}`);
  }, [updateScoreDisplay]);

  const resetBall = useCallback(
    (direction: 1 | -1) => {
      const s = state.current;
      s.ballX = 0;
      s.ballY = 0;
      s.speed = BALL_SPEED_INITIAL;
      s.ballVx = s.speed * direction;
      s.ballVy = (Math.random() - 0.5) * s.speed;
    },
    []
  );

  const paddleX = halfW - 0.08;

  useFrame(({ pointer }, delta) => {
    const s = state.current;
    const dt = Math.min(delta, 0.05);

    // Handle frozen win state
    if (s.frozen) {
      s.frozenTimer -= dt;
      if (s.frozenTimer <= 0) {
        s.frozen = false;
        s.leftScore = 0;
        s.rightScore = 0;
        updateScore();
        resetBall(1);
      }
      // Still update paddle positions but don't move ball
      if (paddleLeftRef.current) paddleLeftRef.current.position.y = s.leftY;
      if (paddleRightRef.current) paddleRightRef.current.position.y = s.rightY;
      return;
    }

    // Player paddle follows mouse Y
    const targetY = pointer.y * halfH;
    s.leftY = THREE.MathUtils.lerp(s.leftY, targetY, 0.25);
    s.leftY = THREE.MathUtils.clamp(s.leftY, -halfH + PADDLE_HEIGHT / 2, halfH - PADDLE_HEIGHT / 2);

    // AI paddle — only reacts when ball is heading toward it
    const aiTarget = s.ballVx > 0 ? s.ballY : 0;
    s.rightY = THREE.MathUtils.lerp(s.rightY, aiTarget, AI_LERP);
    s.rightY = THREE.MathUtils.clamp(
      s.rightY,
      -halfH + PADDLE_HEIGHT / 2,
      halfH - PADDLE_HEIGHT / 2
    );

    // Ball movement
    s.ballX += s.ballVx * dt;
    s.ballY += s.ballVy * dt;

    // Top/bottom wall bounce
    if (s.ballY > halfH - BALL_SIZE / 2) {
      s.ballY = halfH - BALL_SIZE / 2;
      s.ballVy = -Math.abs(s.ballVy);
    }
    if (s.ballY < -halfH + BALL_SIZE / 2) {
      s.ballY = -halfH + BALL_SIZE / 2;
      s.ballVy = Math.abs(s.ballVy);
    }

    // Left paddle collision
    if (
      s.ballVx < 0 &&
      s.ballX - BALL_SIZE / 2 <= -paddleX + PADDLE_WIDTH / 2 &&
      s.ballX - BALL_SIZE / 2 >= -paddleX - PADDLE_WIDTH / 2 &&
      s.ballY >= s.leftY - PADDLE_HEIGHT / 2 &&
      s.ballY <= s.leftY + PADDLE_HEIGHT / 2
    ) {
      s.ballX = -paddleX + PADDLE_WIDTH / 2 + BALL_SIZE / 2;
      s.speed += BALL_SPEED_INCREMENT;
      const hitPos = (s.ballY - s.leftY) / (PADDLE_HEIGHT / 2);
      s.ballVx = s.speed;
      s.ballVy = hitPos * s.speed * 0.7;
    }

    // Right paddle collision
    if (
      s.ballVx > 0 &&
      s.ballX + BALL_SIZE / 2 >= paddleX - PADDLE_WIDTH / 2 &&
      s.ballX + BALL_SIZE / 2 <= paddleX + PADDLE_WIDTH / 2 &&
      s.ballY >= s.rightY - PADDLE_HEIGHT / 2 &&
      s.ballY <= s.rightY + PADDLE_HEIGHT / 2
    ) {
      s.ballX = paddleX - PADDLE_WIDTH / 2 - BALL_SIZE / 2;
      s.speed += BALL_SPEED_INCREMENT;
      const hitPos = (s.ballY - s.rightY) / (PADDLE_HEIGHT / 2);
      s.ballVx = -s.speed;
      s.ballVy = hitPos * s.speed * 0.7;
    }

    // Score
    if (s.ballX < -halfW) {
      s.rightScore++;
      updateScore();
      if (s.rightScore >= WIN_SCORE) {
        s.frozen = true;
        s.frozenTimer = 2;
        s.ballVx = 0;
        s.ballVy = 0;
        updateScoreDisplay('YOU LOSE');
      } else {
        resetBall(1);
      }
    }
    if (s.ballX > halfW) {
      s.leftScore++;
      updateScore();
      if (s.leftScore >= WIN_SCORE) {
        s.frozen = true;
        s.frozenTimer = 2;
        s.ballVx = 0;
        s.ballVy = 0;
        updateScoreDisplay('YOU WIN');
      } else {
        resetBall(-1);
      }
    }

    // Update mesh positions
    if (paddleLeftRef.current) paddleLeftRef.current.position.y = s.leftY;
    if (paddleRightRef.current) paddleRightRef.current.position.y = s.rightY;
    if (ballRef.current) {
      ballRef.current.position.x = s.ballX;
      ballRef.current.position.y = s.ballY;
    }
  });

  // Dashed center line segments
  const dashCount = 8;
  const dashHeight = (viewport.height / dashCount) * 0.4;
  const dashGap = viewport.height / dashCount;

  return (
    <>
      {/* Left paddle */}
      <mesh ref={paddleLeftRef} position={[-paddleX, 0, 0]}>
        <planeGeometry args={[PADDLE_WIDTH, PADDLE_HEIGHT]} />
        <meshBasicMaterial color={TERMINAL_GREEN} transparent opacity={0.9} />
      </mesh>

      {/* Right paddle */}
      <mesh ref={paddleRightRef} position={[paddleX, 0, 0]}>
        <planeGeometry args={[PADDLE_WIDTH, PADDLE_HEIGHT]} />
        <meshBasicMaterial color={TERMINAL_GREEN} transparent opacity={0.9} />
      </mesh>

      {/* Ball */}
      <mesh ref={ballRef} position={[0, 0, 0]}>
        <planeGeometry args={[BALL_SIZE, BALL_SIZE]} />
        <meshBasicMaterial color={TERMINAL_GREEN} transparent opacity={1} />
      </mesh>

      {/* Top wall */}
      <mesh position={[0, halfH, 0]}>
        <planeGeometry args={[viewport.width, 0.005]} />
        <meshBasicMaterial color={TERMINAL_GREEN} transparent opacity={0.4} />
      </mesh>

      {/* Bottom wall */}
      <mesh position={[0, -halfH, 0]}>
        <planeGeometry args={[viewport.width, 0.005]} />
        <meshBasicMaterial color={TERMINAL_GREEN} transparent opacity={0.4} />
      </mesh>

      {/* Dashed center line */}
      {Array.from({ length: dashCount }).map((_, i) => (
        <mesh key={i} position={[0, -halfH + dashGap * (i + 0.5), 0]}>
          <planeGeometry args={[0.005, dashHeight]} />
          <meshBasicMaterial color={TERMINAL_GREEN} transparent opacity={0.2} />
        </mesh>
      ))}

      {/* Score display */}
      <mesh ref={scoreRef} position={[0, halfH - 0.06, 1]}>
        <planeGeometry args={[0.5, 0.12]} />
        <meshBasicMaterial map={scoreTexture} transparent depthWrite={false} toneMapped={false} />
      </mesh>

      {/* Click to exit label */}
      <mesh position={[0, -halfH + 0.03, 1]}>
        <planeGeometry args={[0.4, 0.05]} />
        <meshBasicMaterial map={labelTexture} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </>
  );
}
