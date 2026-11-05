import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { EDGES, TOPICS, neighbors } from "@/content/data";

type Props = { selected: string; onSelect: (id: string) => void; dark: boolean };
type Labels = MutableRefObject<Record<string, HTMLButtonElement | null>>;

function Network({ selected, onSelect, dark, labels }: Props & { labels: Labels }) {
  const v = useMemo(() => new THREE.Vector3(), []);
  const near = useMemo(() => new Set(neighbors(selected)), [selected]);
  const group = useRef<THREE.Group>(null);
  const reduced = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  useFrame(({ camera, size }, d) => {
    if (!group.current) return;
    if (!reduced) group.current.rotation.y += Math.min(d, 0.05) * 0.04;
    group.current.updateMatrixWorld();
    for (const t of TOPICS) {
      const el = labels.current[t.id];
      if (!el) continue;
      v.set(t.pos[0], t.pos[1] + 0.42, t.pos[2])
        .applyMatrix4(group.current.matrixWorld)
        .project(camera);
      el.style.transform = `translate(-50%, -50%) translate(${((v.x + 1) / 2) * size.width}px, ${((1 - v.y) / 2) * size.height}px)`;
      el.style.visibility = v.z < 1 ? "visible" : "hidden";
    }
  });
  const gold = dark ? "#e2c98d" : "#9a7a3a";
  const base = dark ? "#7f93a6" : "#4b5b6b";
  const lineDim = dark ? "#3b4b5c" : "#b9b2a2";
  const pos = (id: string) => new THREE.Vector3(...TOPICS.find((t) => t.id === id)!.pos);
  return (
    <group ref={group}>
      {EDGES.map(([a, b], i) => {
        const hot = a === selected || b === selected;
        const g = new THREE.BufferGeometry().setFromPoints([pos(a), pos(b)]);
        return (
          <lineSegments key={i} geometry={g}>
            <lineBasicMaterial
              color={hot ? gold : lineDim}
              transparent
              opacity={hot ? 0.95 : 0.5}
            />
          </lineSegments>
        );
      })}
      {TOPICS.map((t) => {
        const isSel = t.id === selected;
        const isNear = near.has(t.id);
        return (
          <group key={t.id} position={t.pos}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelect(t.id);
              }}
              onPointerOver={() => (document.body.style.cursor = "pointer")}
              onPointerOut={() => (document.body.style.cursor = "")}
            >
              <sphereGeometry args={[isSel ? 0.22 : 0.14, 24, 24]} />
              <meshBasicMaterial color={isSel || isNear ? gold : base} />
            </mesh>
            {isSel && (
              <mesh>
                <ringGeometry args={[0.34, 0.37, 48]} />
                <meshBasicMaterial color={gold} side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function AtlasScene(props: Props) {
  const labels: Labels = useRef({});
  const near = new Set(neighbors(props.selected));
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.5, 8.5], fov: 50 }} aria-hidden>
        <Network {...props} labels={labels} />
        <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.5} />
      </Canvas>
      {TOPICS.map((t) => {
        const isSel = t.id === props.selected;
        const isNear = near.has(t.id);
        return (
          <button
            key={t.id}
            ref={(el) => {
              labels.current[t.id] = el;
            }}
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={() => props.onSelect(t.id)}
            style={{ visibility: "hidden" }}
            className={`absolute left-0 top-0 whitespace-nowrap font-serif text-sm transition-opacity ${isSel ? "text-gold opacity-100" : isNear ? "text-foreground opacity-100" : "text-muted-foreground opacity-70"}`}
          >
            {t.zh}
            <span className="ml-1 font-mono text-[9px] tracking-widest opacity-60">{t.en}</span>
          </button>
        );
      })}
    </div>
  );
}