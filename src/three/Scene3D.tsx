import { Suspense, useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, AdaptiveDpr } from "@react-three/drei"
import * as THREE from "three"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

function Blob({ scroll }: { scroll: { current: number } }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.12
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.1
    // steigt beim Scrollen sanft aus dem Bild
    ref.current.position.y = Math.sin(t * 0.5) * 0.2 + scroll.current * 9
    const s = Math.max(0.2, 1 - scroll.current * 0.8)
    ref.current.scale.setScalar(s)
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.7, 14]} />
      <MeshDistortMaterial
        color="#4d6bff"
        emissive="#d9b36c"
        emissiveIntensity={0.14}
        roughness={0.12}
        metalness={0.9}
        distort={0.35}
        speed={1.6}
      />
    </mesh>
  )
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 22
      a[i * 3 + 1] = (Math.random() - 0.5) * 26
      a[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return a
  }, [count])
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })
  if (count === 0) return null
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#8fb0ff" transparent opacity={0.65} sizeAttenuation />
    </points>
  )
}

function Rig({ scroll }: { scroll: { current: number } }) {
  useFrame((state) => {
    const p = scroll.current
    const cam = state.camera
    const px = state.pointer.x
    const py = state.pointer.y
    cam.position.x += (px * 1.2 - cam.position.x) * 0.04
    cam.position.y += (-py * 0.8 + p * 1.5 - cam.position.y) * 0.04
    cam.position.z = 6
    cam.lookAt(0, p * 2, 0)
  })
  return null
}

export default function Scene3D() {
  const scroll = useRef(0)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      scroll.current = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true }}
        frameloop={reduce ? "demand" : "always"}
      >
        <color attach="background" args={["#0a0f1c"]} />
        <fog attach="fog" args={["#0a0f1c", 7, 16]} />
        <ambientLight intensity={0.55} />
        <pointLight position={[6, 5, 5]} intensity={45} color="#4d6bff" />
        <pointLight position={[-6, -3, 2]} intensity={28} color="#d9b36c" />
        <Suspense fallback={null}>
          <Blob scroll={scroll} />
          <Particles count={reduce ? 0 : 130} />
        </Suspense>
        <Rig scroll={scroll} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
