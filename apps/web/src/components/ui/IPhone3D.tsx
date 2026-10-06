'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { TranslationType } from '@/lib/translations/en';
import {
  Beer,
  MapPin,
  Calendar,
  Heart,
  ArrowRight,
  Home,
  Grid,
  Bookmark,
  Bell,
  Settings,
  Sparkles,
  Users,
  Check,
  Send,
  Clock,
} from 'lucide-react';

interface PhoneProps {
  t: TranslationType;
}

// 3D Procedural Mesh iPhone with WebGL Physical PBR Materials
function IPhoneModel({ t }: PhoneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [activeNav, setActiveNav] = useState<'home' | 'grid' | 'saved' | 'bell' | 'settings'>('home');

  // Smooth floating and mouse tracking
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.08 + Math.sin(time * 0.5) * 0.04 + (state.pointer.x * 0.18),
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.04 + Math.cos(time * 0.5) * 0.02 - (state.pointer.y * 0.12),
      0.08
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      {/* 1. Main Metallic Titanium Outer Chassis */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.55, 5.15, 0.22]} />
        <meshPhysicalMaterial
          color="#EA580C"
          emissive="#7C2D12"
          emissiveIntensity={0.04}
          metalness={0.92}
          roughness={0.24}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
          reflectivity={0.9}
        />
      </mesh>

      {/* 2. Metallic Chamfer Edge Highlight */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.57, 5.17, 0.18]} />
        <meshPhysicalMaterial
          color="#F97316"
          metalness={0.96}
          roughness={0.18}
          clearcoat={0.8}
          reflectivity={1}
        />
      </mesh>

      {/* 3. Side Buttons */}
      <mesh position={[-1.3, 1.2, 0]}>
        <boxGeometry args={[0.04, 0.25, 0.08]} />
        <meshStandardMaterial color="#C2410C" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-1.3, 0.7, 0]}>
        <boxGeometry args={[0.04, 0.42, 0.08]} />
        <meshStandardMaterial color="#C2410C" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-1.3, 0.15, 0]}>
        <boxGeometry args={[0.04, 0.42, 0.08]} />
        <meshStandardMaterial color="#C2410C" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[1.3, 0.6, 0]}>
        <boxGeometry args={[0.04, 0.55, 0.08]} />
        <meshStandardMaterial color="#C2410C" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 4. Back Matte Titanium Glass */}
      <mesh position={[0, 0, -0.115]}>
        <boxGeometry args={[2.5, 5.1, 0.02]} />
        <meshPhysicalMaterial
          color="#C2410C"
          metalness={0.85}
          roughness={0.35}
          clearcoat={0.4}
        />
      </mesh>

      {/* 5. Back 3D Camera Island */}
      <group position={[-0.6, 1.6, -0.16]}>
        <mesh>
          <boxGeometry args={[1.05, 1.05, 0.08]} />
          <meshPhysicalMaterial
            color="#9A3412"
            metalness={0.88}
            roughness={0.2}
            clearcoat={0.9}
            transparent
            opacity={0.95}
          />
        </mesh>
        <mesh position={[-0.24, 0.24, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
          <meshStandardMaterial color="#09090B" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[-0.24, -0.24, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
          <meshStandardMaterial color="#09090B" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0.24, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.08, 32]} />
          <meshStandardMaterial color="#09090B" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* 6. Front OLED Bezel Plane */}
      <mesh position={[0, 0, 0.112]}>
        <planeGeometry args={[2.46, 5.06]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* 7. Projected Screen UI (Exact Reference Layout Match) */}
      <Html
        transform
        occlude
        position={[0, 0, 0.12]}
        distanceFactor={2.7}
        className="select-none pointer-events-auto"
      >
        <div className="w-[340px] h-[680px] rounded-[44px] bg-[#F4F6F9] text-zinc-900 overflow-hidden flex flex-col font-sans shadow-2xl border border-black/30 justify-between">
          
          {/* Top Status Bar + Dynamic Island */}
          <div className="pt-2 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-zinc-900 select-none bg-[#F4F6F9]">
            <span className="tracking-tight font-extrabold text-[11px]">20:00</span>
            
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-[#050508] border border-zinc-700 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-900" />
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-zinc-500">5G</span>
              <div className="w-4 h-2 border border-zinc-900 rounded-[2px] p-[0.5px]">
                <div className="h-full w-2.5 bg-zinc-900 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Main App Content Area */}
          <div className="flex-1 px-4 py-2 space-y-3 overflow-y-auto text-start custom-scrollbar">
            
            {/* 1. Header Bar: Brand Logo + "Hello, Serkan 👋" + Profile Avatar (Referans Görsel Birebir) */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-white border border-zinc-200/80 shadow-sm flex items-center justify-center">
                  <div className="w-6 h-6 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-xs shadow-sm">
                    🍻
                  </div>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-zinc-900 leading-none">
                    Hello, <span className="text-zinc-950 font-black">Serkan</span> 👋
                  </p>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-amber-100 p-0.5 shadow-sm border border-amber-200">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Fred Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* 2. Screen Heading + Action Icon (Referans Görsel: Dashboard + Calendar Icon) */}
            <div className="flex items-center justify-between pt-1">
              <h2 className="text-2xl font-black text-zinc-950 tracking-tight">
                Dashboard
              </h2>
              <button className="w-9 h-9 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-sm hover:bg-black transition-colors">
                <Calendar className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* 3. Top Bento Row (Referans Görseldeki 2 Eşit Kutu: Calories / Weight) */}
            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Box 1 (Left - Orange/Amber Flame Style) */}
              <div className="rounded-[24px] bg-white border border-zinc-200/70 p-3.5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-600">
                    <Beer className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                    Bu Akşam
                  </span>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-black text-zinc-900">Buluşmalar</p>
                  <p className="text-[9px] text-zinc-400 font-medium">Haftalık Plan</p>
                  <p className="text-base font-black text-zinc-950 mt-1">
                    3/4 <span className="text-[10px] font-semibold text-zinc-400">Dolu</span>
                  </p>
                </div>
              </div>

              {/* Box 2 (Right - Soft Sage/Olive Location Style) */}
              <div className="rounded-[24px] bg-white border border-zinc-200/70 p-3.5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                    350m
                  </span>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-black text-zinc-900">Mekan</p>
                  <p className="text-[9px] text-zinc-400 font-medium truncate">The Populist • Kadıköy</p>
                  <p className="text-base font-black text-zinc-950 mt-1">
                    Masa 12
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Large Focus Hero Card (Referans Görseldeki Kalp / Nabız Dalgalı Ana Kart) */}
            <div className="relative rounded-[28px] bg-white border border-zinc-200/70 p-4 shadow-sm overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Heart className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-zinc-900 leading-none">Cuma Buluşması</p>
                    <p className="text-[9px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Onaylandı
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3 text-zinc-500" />
                  <span>20:00</span>
                </div>
              </div>

              {/* Card Center Visual (Friends Drinking Beer Clinking Glasses) */}
              <div className="relative my-3 h-28 rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
                <img
                  src="https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=800&auto=format&fit=crop"
                  alt="Beer Meetup"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                
                {/* Audio Wave / Heartrate style craft tags */}
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-amber-300 bg-black/60 px-1.5 py-0.5 rounded">
                      Craft IPA & Draft
                    </span>
                    <p className="text-xs font-black leading-tight mt-0.5">The Populist • Moda</p>
                  </div>

                  {/* Overlapping friends */}
                  <div className="flex items-center -space-x-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                      alt="Friend"
                      className="w-5 h-5 rounded-full border border-white object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"
                      alt="Friend"
                      className="w-5 h-5 rounded-full border border-white object-cover"
                    />
                    <div className="w-5 h-5 rounded-full bg-orange-500 text-white font-extrabold text-[8px] flex items-center justify-center border border-white">
                      +2
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics & Circular Action Button (Referans Görsel Birebir: 88 bpm + Ok Butonu) */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-orange-600">
                    <Sparkles className="w-3 h-3" />
                    <span>Masada Yerin Ayrıldı</span>
                  </div>
                  <p className="text-sm font-black text-zinc-950">
                    4 Arkadaş <span className="text-[10px] font-medium text-zinc-400">Katılıyor</span>
                  </p>
                </div>

                <button
                  onClick={() => setIsJoined(!isJoined)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${
                    isJoined
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-950 hover:bg-black text-white shadow-zinc-950/20'
                  }`}
                >
                  {isJoined ? (
                    <Check className="w-5 h-5 text-white stroke-[3]" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-amber-400 stroke-[2.5]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 5. Iconic Floating Dark Capsule Navigation Dock (Referans Görseldeki Alt Dock Birebir) */}
          <div className="p-3 bg-[#F4F6F9]">
            <div className="w-full h-14 rounded-full bg-[#18181B] px-4 flex items-center justify-between shadow-xl shadow-black/25">
              
              {/* Nav 1: Home (Active Blue/Amber Circle) */}
              <button
                onClick={() => setActiveNav('home')}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  activeNav === 'home'
                    ? 'bg-gradient-to-tr from-orange-500 to-amber-400 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4" />
              </button>

              {/* Nav 2: Grid */}
              <button
                onClick={() => setActiveNav('grid')}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  activeNav === 'grid'
                    ? 'bg-gradient-to-tr from-orange-500 to-amber-400 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>

              {/* Nav 3: Saved / Bookmark */}
              <button
                onClick={() => setActiveNav('saved')}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  activeNav === 'saved'
                    ? 'bg-gradient-to-tr from-orange-500 to-amber-400 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>

              {/* Nav 4: Notifications */}
              <button
                onClick={() => setActiveNav('bell')}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  activeNav === 'bell'
                    ? 'bg-gradient-to-tr from-orange-500 to-amber-400 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Bell className="w-4 h-4" />
              </button>

              {/* Nav 5: Settings */}
              <button
                onClick={() => setActiveNav('settings')}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  activeNav === 'settings'
                    ? 'bg-gradient-to-tr from-orange-500 to-amber-400 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

export const IPhone3D: React.FC<{ t: TranslationType; theme?: 'light' | 'dark' }> = ({ t }) => {
  return (
    <div className="relative w-full h-[660px] sm:h-[720px] mx-auto flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[5, 8, 5]} intensity={2.2} castShadow />
        <directionalLight position={[-5, -2, -2]} intensity={0.8} color="#FF8C42" />
        <pointLight position={[0, 4, 3]} intensity={1.5} color="#FFE4D6" />

        <PresentationControls
          global={false}
          cursor={true}
          snap={true}
          speed={1.5}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-0.2, 0.2]}
          azimuth={[-0.35, 0.35]}
        >
          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
            <IPhoneModel t={t} />
          </Float>
        </PresentationControls>

        <ContactShadows
          position={[0, -3.2, 0]}
          opacity={0.65}
          scale={8}
          blur={2.5}
          far={4}
          color="#000000"
        />
      </Canvas>
    </div>
  );
};
