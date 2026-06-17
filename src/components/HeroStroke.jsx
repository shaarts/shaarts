import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A flowing 3D calligraphic stroke of polished gold leaf, drifting in dark space.
 * Built as a variable-radius tube (thick in the belly, tapered at the ends) lofted
 * along a Catmull-Rom curve — the 3D echo of the qalam stroke that writes the hero.
 */

// The sweep the stroke follows, with gentle depth (z) so it reads as 3D.
const CURVE_POINTS = [
  [-4.4, -0.7, 0.0],
  [-3.0, 1.0, 0.5],
  [-1.5, 0.0, -0.4],
  [-0.1, 1.4, 0.55],
  [1.4, -0.3, -0.45],
  [2.8, 0.9, 0.4],
  [3.9, 0.05, -0.1],
  [4.5, 0.55, 0.2],
];

// Brush-pressure profile: rounded caps, a full belly, a little organic variation.
function radiusAt(t) {
  const belly = Math.sin(Math.PI * t);          // 0 at ends, 1 in middle
  const pressure = 1 + 0.22 * Math.sin(t * Math.PI * 3.0);
  return 0.135 * (0.34 + 0.66 * belly) * pressure;
}

function buildStrokeGeometry() {
  const curve = new THREE.CatmullRomCurve3(
    CURVE_POINTS.map((p) => new THREE.Vector3(...p)),
    false,
    'catmullrom',
    0.5
  );

  const tubular = 260;
  const radial = 22;
  const frames = curve.computeFrenetFrames(tubular, false);
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= tubular; i++) {
    const t = i / tubular;
    const p = curve.getPointAt(t);
    const N = frames.normals[i];
    const B = frames.binormals[i];
    const r = radiusAt(t);

    for (let j = 0; j <= radial; j++) {
      const v = (j / radial) * Math.PI * 2;
      const sin = Math.sin(v);
      const cos = -Math.cos(v);
      const nx = cos * N.x + sin * B.x;
      const ny = cos * N.y + sin * B.y;
      const nz = cos * N.z + sin * B.z;
      positions.push(p.x + r * nx, p.y + r * ny, p.z + r * nz);
      normals.push(nx, ny, nz);
      uvs.push(t, j / radial);
    }
  }

  for (let i = 1; i <= tubular; i++) {
    for (let j = 1; j <= radial; j++) {
      const a = (radial + 1) * (i - 1) + (j - 1);
      const b = (radial + 1) * i + (j - 1);
      const c = (radial + 1) * i + j;
      const d = (radial + 1) * (i - 1) + j;
      indices.push(a, b, d, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.userData.totalIndex = indices.length;
  return geo;
}

function Stroke() {
  const tilt = useRef();   // follows the cursor
  const spin = useRef();   // slow auto-rotation
  const mesh = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  const start = useRef(0);

  const geometry = useMemo(() => buildStrokeGeometry(), []);

  // Reveal: "write" the stroke along its length on mount via drawRange.
  useEffect(() => {
    geometry.setDrawRange(0, 0);
    start.current = performance.now();
  }, [geometry]);

  // Track cursor globally (the canvas itself is pointer-events-none).
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // draw-on reveal
    const total = geometry.userData.totalIndex;
    const elapsed = (performance.now() - start.current) / 1000;
    const p = Math.min(1, elapsed / 2.6);
    const eased = 1 - Math.pow(1 - p, 3);
    geometry.setDrawRange(0, Math.floor(eased * total));

    if (spin.current) {
      spin.current.rotation.y += delta * 0.07;
      spin.current.position.y = Math.sin(t * 0.45) * 0.1;
    }
    if (tilt.current) {
      tilt.current.rotation.y = THREE.MathUtils.lerp(tilt.current.rotation.y, pointer.current.x * 0.45, 0.05);
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, -pointer.current.y * 0.3, 0.05);
    }
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <mesh ref={mesh} geometry={geometry}>
          <meshStandardMaterial
            color="#C9A227"
            metalness={1}
            roughness={0.28}
            emissive="#3a2600"
            emissiveIntensity={0.35}
            envMapIntensity={1.4}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroStroke() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 36 }}
    >
      <ambientLight intensity={0.5} color="#fff3d6" />
      <directionalLight position={[4, 5, 6]} intensity={2.4} color="#ffd87a" />
      <directionalLight position={[-5, -2, -3]} intensity={1.3} color="#3A5BA8" />

      {/* Procedural reflections so the gold reads as metal — no external HDRI. */}
      <Environment resolution={256} environmentIntensity={0.7}>
        <Lightformer form="rect" intensity={3} color="#f5dd9a" position={[0, 3, 2]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#1E3163" position={[-4, -1, 1]} scale={[5, 5, 1]} />
        <Lightformer form="circle" intensity={2} color="#C9A227" position={[3, -2, 2]} scale={3} />
      </Environment>

      <Stroke />
    </Canvas>
  );
}
