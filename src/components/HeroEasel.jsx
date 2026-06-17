import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { heroPaint } from './heroPaintState';

/**
 * A framed canvas board and a calligraphy brush, modelled from primitives.
 * As the pinned hero scrolls, the brush travels left-to-right and writes the word
 * "Shaarts" onto the board — the gold lettering is revealed progressively onto a 2D
 * canvas texture and the 3D brush tip tracks the writing edge, in front of the board.
 */

const BOARD_W = 2.5;
const BOARD_H = 2.4;
const BOARD_T = 0.1;
const ART_Z = BOARD_T / 2 + 0.012;
const CW = 1024;
const CH = 984;
const WORD = 'Shaarts';
const FONT = (px) => `italic 600 ${px}px "Fraunces", "Times New Roman", serif`;

function mapToLocal(x, y) {
  return [(x / CW - 0.5) * BOARD_W, (0.5 - y / CH) * BOARD_H];
}

// Parchment ground with vignette + faint paper specks, rendered once.
function buildBaseCanvas() {
  const c = document.createElement('canvas');
  c.width = CW;
  c.height = CH;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ECE4D2';
  ctx.fillRect(0, 0, CW, CH);
  const g = ctx.createRadialGradient(CW / 2, CH / 2, CH * 0.15, CW / 2, CH / 2, CH * 0.72);
  g.addColorStop(0, 'rgba(255,255,255,0.25)');
  g.addColorStop(1, 'rgba(120,100,60,0.2)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, CW, CH);
  for (let i = 0; i < 2400; i++) {
    ctx.fillStyle = `rgba(120,95,55,${Math.random() * 0.05})`;
    ctx.fillRect(Math.random() * CW, Math.random() * CH, 1.4, 1.4);
  }
  return c;
}

// Draw "Shaarts" + an underline swash into the (transparent) text canvas.
function drawWord(textCanvas) {
  const ctx = textCanvas.getContext('2d');
  ctx.clearRect(0, 0, CW, CH);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  let px = 320;
  ctx.font = FONT(px);
  let w = ctx.measureText(WORD).width;
  const maxW = CW * 0.78;
  if (w > maxW) {
    px *= maxW / w;
    ctx.font = FONT(px);
    w = ctx.measureText(WORD).width;
  }
  const x0 = (CW - w) / 2;
  const baseline = CH * 0.52;

  const grad = ctx.createLinearGradient(0, baseline - px * 0.9, 0, baseline + px * 0.25);
  grad.addColorStop(0, '#8a6a18');
  grad.addColorStop(0.45, '#EBCB6B');
  grad.addColorStop(1, '#C9A227');

  // body with soft shadow for a raised, gilded look
  ctx.save();
  ctx.shadowColor = 'rgba(48,32,4,0.55)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 9;
  ctx.fillStyle = grad;
  ctx.fillText(WORD, x0, baseline);
  ctx.restore();

  // highlight pass
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = '#F8E6A8';
  ctx.fillText(WORD, x0 - 2, baseline - 3);
  ctx.restore();

  // underline swash
  const uy = baseline + px * 0.2;
  ctx.save();
  ctx.strokeStyle = '#C9A227';
  ctx.lineCap = 'round';
  ctx.shadowColor = 'rgba(48,32,4,0.4)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 5;
  ctx.beginPath();
  ctx.moveTo(x0 - px * 0.04, uy);
  ctx.quadraticCurveTo(x0 + w * 0.55, uy + px * 0.16, x0 + w + px * 0.14, uy - px * 0.06);
  ctx.lineWidth = px * 0.05;
  ctx.stroke();
  ctx.restore();

  return { x0, w, baseline, px };
}

function paintReveal(ctx, base, textCanvas, m, progress, dabDy = 0) {
  ctx.drawImage(base, 0, 0);
  if (progress <= 0) return;
  const revealW = (m.w + m.px * 0.3) * progress;
  ctx.save();
  ctx.beginPath();
  ctx.rect(m.x0 - m.px * 0.18, 0, revealW + m.px * 0.1, CH);
  ctx.clip();
  ctx.drawImage(textCanvas, 0, 0);
  ctx.restore();
  // fresh gold dab where the brush tip presses
  const ex = m.x0 + m.w * progress;
  const ey = m.baseline - m.px * 0.28 + dabDy;
  ctx.fillStyle = '#F3DA8A';
  ctx.beginPath();
  ctx.arc(ex, ey, Math.max(4, m.px * 0.045), 0, Math.PI * 2);
  ctx.fill();
}

// Hand-writing motion across the word — one up/down bob per letter.
const WRITE_CYCLES = 9;
const BOB_AMP = 0.12; // local units

function Brush() {
  // children extend +Y from the tip apex at the group origin; the group is rotated
  // so the handle leans up / right / FORWARD (+Z) — in front of the canvas.
  return (
    <group rotation={[0.55, -0.18, -0.52]}>
      <mesh rotation={[Math.PI, 0, 0]} position={[0, 0.17, 0]}>
        <coneGeometry args={[0.075, 0.34, 24]} />
        <meshStandardMaterial color="#16120c" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.43, 0]}>
        <cylinderGeometry args={[0.07, 0.072, 0.17, 24]} />
        <meshStandardMaterial color="#C9A227" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.035, 0.058, 1.42, 24]} />
        <meshStandardMaterial color="#6b4a2b" roughness={0.55} metalness={0.05} />
      </mesh>
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#C9A227" metalness={1} roughness={0.35} />
      </mesh>
    </group>
  );
}

function Scene() {
  const root = useRef();
  const tilt = useRef();
  const brush = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  const tDraw = useRef(0);
  const lastPainted = useRef(-1);
  const metrics = useRef(null);

  const { size } = useThree();

  const base = useMemo(() => buildBaseCanvas(), []);
  const textCanvas = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = CW;
    c.height = CH;
    return c;
  }, []);
  const artCanvas = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = CW;
    c.height = CH;
    return c;
  }, []);
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(artCanvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, [artCanvas]);

  // Render the word once, then again when Fraunces has loaded, and start blank.
  useEffect(() => {
    let cancelled = false;
    const render = () => {
      metrics.current = drawWord(textCanvas);
      lastPainted.current = -1; // force a repaint on the next frame
    };
    render();
    const ctx = artCanvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    texture.needsUpdate = true;
    if (document.fonts && document.fonts.load) {
      document.fonts.load('italic 600 320px "Fraunces"').then(() => { if (!cancelled) render(); }).catch(() => {});
    }
    return () => { cancelled = true; };
  }, [textCanvas, artCanvas, base, texture]);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const wide = size.width >= 1024;

    if (root.current) {
      const tx = wide ? 1.5 : 0;
      const ty = wide ? 0 : 1.15;
      const ts = wide ? 1 : 0.6;
      root.current.position.x = THREE.MathUtils.lerp(root.current.position.x, tx, 0.1);
      root.current.position.y = THREE.MathUtils.lerp(root.current.position.y, ty + Math.sin(t * 0.5) * 0.05, 0.1);
      const s = THREE.MathUtils.lerp(root.current.scale.x, ts, 0.1);
      root.current.scale.setScalar(s);
    }
    if (tilt.current) {
      tilt.current.rotation.y = THREE.MathUtils.lerp(tilt.current.rotation.y, pointer.current.x * 0.22 - 0.1, 0.05);
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, -pointer.current.y * 0.14, 0.05);
    }

    tDraw.current = THREE.MathUtils.lerp(tDraw.current, heroPaint.progress, 0.12);
    const m = metrics.current;
    if (!m) return;
    const prog = Math.min(1, Math.max(0, tDraw.current));

    // hand-writing oscillation, advanced by the writing progress
    const phase = prog * Math.PI * WRITE_CYCLES;
    const bob = Math.sin(phase) * BOB_AMP;            // up/down per letter
    const press = (0.5 - 0.5 * Math.cos(phase)) * 0.025; // lifts on the up-stroke

    if (Math.abs(prog - lastPainted.current) > 0.002) {
      lastPainted.current = prog;
      // keep the wet dab under the bobbing tip (local +Y ↔ canvas −y)
      const dabDy = -bob * (CH / BOARD_H);
      paintReveal(artCanvas.getContext('2d'), base, textCanvas, m, prog, dabDy);
      texture.needsUpdate = true;
    }

    if (brush.current) {
      const ex = m.x0 + m.w * prog;
      const ey = m.baseline - m.px * 0.3;
      const [lx, ly] = mapToLocal(ex, ey);
      brush.current.position.x = lx;
      brush.current.position.y = ly + bob + Math.sin(t * 7) * 0.006;
      brush.current.position.z = ART_Z + 0.06 + press;
      brush.current.rotation.z = Math.sin(phase + 0.6) * 0.1;  // slight roll
      brush.current.rotation.x = Math.cos(phase) * 0.05;        // slight pitch
    }
  });

  return (
    <group ref={root}>
      <group ref={tilt}>
        {/* frame */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[BOARD_W + 0.16, BOARD_H + 0.16, 0.06]} />
          <meshStandardMaterial color="#3a2a1c" roughness={0.6} metalness={0.15} />
        </mesh>
        {/* thin gold liner */}
        <mesh position={[0, 0, -0.005]}>
          <boxGeometry args={[BOARD_W + 0.05, BOARD_H + 0.05, 0.06]} />
          <meshStandardMaterial color="#C9A227" metalness={1} roughness={0.35} />
        </mesh>
        {/* board body */}
        <mesh>
          <boxGeometry args={[BOARD_W, BOARD_H, BOARD_T]} />
          <meshStandardMaterial color="#efe7d6" roughness={0.95} />
        </mesh>
        {/* painted art surface */}
        <mesh position={[0, 0, ART_Z]}>
          <planeGeometry args={[BOARD_W, BOARD_H]} />
          <meshStandardMaterial map={texture} roughness={0.9} />
        </mesh>

        <group ref={brush}>
          <Brush />
        </group>
      </group>
    </group>
  );
}

export default function HeroEasel() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.7], fov: 36 }}
    >
      <ambientLight intensity={0.6} color="#fff3d6" />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#ffd87a" />
      <directionalLight position={[-5, -1, -2]} intensity={0.9} color="#3A5BA8" />

      <Environment resolution={256} environmentIntensity={0.65}>
        <Lightformer form="rect" intensity={3} color="#f5dd9a" position={[2, 3, 2]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#1E3163" position={[-4, -1, 1]} scale={[5, 5, 1]} />
        <Lightformer form="circle" intensity={2} color="#C9A227" position={[3, -2, 3]} scale={3} />
      </Environment>

      <Scene />
    </Canvas>
  );
}
