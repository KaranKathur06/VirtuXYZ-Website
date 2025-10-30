'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function Building({ position, height, color }: { position: [number, number, number], height: number, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
      {/* Building top glow */}
      <pointLight position={[0, height / 2, 0]} color={color} intensity={1} distance={5} />
    </mesh>
  )
}

function CityGrid() {
  const buildings = []
  const colors = ['#00d4ff', '#a855f7', '#ec4899', '#00f0ff']
  
  // Generate city grid
  for (let x = -10; x <= 10; x += 2) {
    for (let z = -10; z <= 10; z += 2) {
      if (Math.abs(x) < 3 && Math.abs(z) < 3) continue // Leave center empty
      
      const height = Math.random() * 4 + 2
      const color = colors[Math.floor(Math.random() * colors.length)]
      buildings.push(
        <Building 
          key={`${x}-${z}`}
          position={[x, height / 2, z]} 
          height={height}
          color={color}
        />
      )
    }
  }
  
  return <>{buildings}</>
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <CityGrid />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#0a0e27"
          metalness={0.9}
          roughness={0.1}
          emissive="#00d4ff"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Ambient particles */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[0, 10, 0]} color="#00d4ff" intensity={2} distance={30} />
      <pointLight position={[-10, 5, -10]} color="#a855f7" intensity={1.5} distance={25} />
      <pointLight position={[10, 5, 10]} color="#ec4899" intensity={1.5} distance={25} />
    </group>
  )
}

export default function CityScene3D() {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 8, 15]} fov={60} />
        <Scene />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
