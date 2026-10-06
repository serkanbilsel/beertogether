'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { TranslationType } from '@/lib/translations/en';
import { Beer, Send, Check } from 'lucide-react';

interface PhoneProps {
  t: TranslationType;
}

// 3D Procedural Mesh iPhone 15/16 Pro Max Model with WebGL Physical PBR Materials
function IPhoneModel({ t }: PhoneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recent'>('upcoming');

  // Subtle interactive floating & mouse rotation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.12 + Math.sin(t * 0.5) * 0.05 + (state.pointer.x * 0.2),
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.06 + Math.cos(t * 0.5) * 0.03 - (state.pointer.y * 0.15),
      0.08
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      {/* 1. Main Titanium Metallic Outer Chassis */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.55, 5.15, 0.22]} />
        <meshPhysicalMaterial
          color="#EA580C"
          emissive="#7C2D12"
          emissiveIntensity={0.05}
          metalness={0.92}
          roughness={0.24}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
          reflectivity={0.9}
        />
      </mesh>

      {/* 2. Precision Metallic Chamfer Edge Band */}
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

      {/* 3. Side Buttons - Left (Action + Volume) */}
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

      {/* 4. Side Button - Right (Power Button) */}
      <mesh position={[1.3, 0.6, 0]}>
        <boxGeometry args={[0.04, 0.55, 0.08]} />
        <meshStandardMaterial color="#C2410C" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 5. Back Matte Titanium Glass */}
      <mesh position={[0, 0, -0.115]}>
        <boxGeometry args={[2.5, 5.1, 0.02]} />
        <meshPhysicalMaterial
          color="#C2410C"
          metalness={0.85}
          roughness={0.35}
          clearcoat={0.4}
        />
      </mesh>

      {/* 6. Back 3D Camera Island (Sapphire Plateau) */}
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

        {/* 3 Lenses */}
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

      {/* 7. Front OLED Black Bezel Plane */}
      <mesh position={[0, 0, 0.112]}>
        <planeGeometry args={[2.46, 5.06]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* 8. Interactive HTML Projected Screen (Dribbble Bento UI) */}
      <Html
        transform
        occlude
        position={[0, 0, 0.12]}
        distanceFactor={2.7}
        className="select-none pointer-events-auto"
      >
        <div className="w-[335px] h-[670px] rounded-[42px] bg-[#FDFCFB] text-zinc-900 overflow-hidden flex flex-col font-sans shadow-2xl border border-black/40">
          
          {/* Status Bar + Dynamic Island */}
          <div className="pt-2.5 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-zinc-900 select-none bg-[#FDFCFB]">
            <span className="tracking-tight font-extrabold text-[11px]">20:30</span>
            
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-[#050508] border border-zinc-700 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-900" />
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-zinc-600">5G</span>
              <div className="w-4 h-2 border border-zinc-900 rounded-[2px] p-[0.5px]">
                <div className="h-full w-2.5 bg-zinc-900 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Dribbble Bento UI Body */}
          <div className="flex-1 px-4 py-2 space-y-2.5 overflow-y-auto text-start custom-scrollbar">
            
            {/* Top Bar: "Hello, Serkan" */}
            <div className="flex items-center justify-between pt-0.5">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  İyi Akşamlar 👋
                </p>
                <h2 className="text-lg font-black text-zinc-950 tracking-tight leading-tight">
                  Hello, <span className="text-orange-600">Serkan</span>
                </h2>
              </div>

              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 p-0.5 shadow-sm border border-amber-200">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Profile"
                    className="w-full h-full rounded-[14px] object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-white" />
              </div>
            </div>

            {/* Bento Widgets Row */}
            <div className="grid grid-cols-12 gap-2">
              
              {/* Dark Pill Widget */}
              <div className="col-span-5 rounded-[20px] bg-[#18181B] text-white p-2.5 flex flex-col justify-between shadow-md">
                <div>
                  <div className="inline-flex items-center gap-1 text-[8px] font-bold text-amber-400 uppercase tracking-wider bg-white/10 px-1.5 py-0.5 rounded-full">
                    <Beer className="w-2 h-2" /> Plan
                  </div>
                  <p className="text-[11px] font-black text-white mt-1 leading-tight">
                    Craft Beer
                  </p>
                  <p className="text-[8px] text-zinc-400">Bu Akşam</p>
                </div>

                <div className="pt-1.5 flex items-baseline justify-between border-t border-white/10 mt-1">
                  <span className="text-[11px] font-black text-amber-400">20:30</span>
                  <span className="text-[8px] font-bold text-zinc-400">Moda</span>
                </div>
              </div>

              {/* Weekly Tracker Widget */}
              <div className="col-span-7 rounded-[20px] bg-white border border-zinc-200/80 p-2.5 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold text-zinc-900">
                    Haftalık Buluşmalar
                  </span>
                  <span className="text-[8px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-md">
                    3/4
                  </span>
                </div>

                {/* Day Bars */}
                <div className="flex items-end justify-between gap-1 pt-1.5">
                  {[
                    { day: 'Pt', height: 'h-3.5', active: false },
                    { day: 'Sa', height: 'h-5', active: false },
                    { day: 'Ça', height: 'h-4', active: false },
                    { day: 'Pe', height: 'h-6.5', active: false },
                    { day: 'Cu', height: 'h-9', active: true },
                    { day: 'Ct', height: 'h-7.5', active: false },
                    { day: 'Pz', height: 'h-2.5', active: false },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-0.5 flex-1">
                      <div
                        className={`w-full rounded-full ${
                          item.active
                            ? 'bg-gradient-to-t from-orange-500 to-amber-400 shadow-sm'
                            : 'bg-zinc-100'
                        } ${item.height}`}
                      />
                      <span
                        className={`text-[7px] font-bold ${
                          item.active ? 'text-orange-600' : 'text-zinc-400'
                        }`}
                      >
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Selector */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition-all ${
                  activeTab === 'upcoming'
                    ? 'bg-[#18181B] text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-500'
                }`}
              >
                Buluşmalar (Yaklaşan)
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition-all ${
                  activeTab === 'recent'
                    ? 'bg-[#18181B] text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-500'
                }`}
              >
                Geçmiş Anılar
              </button>
            </div>

            {/* Main Yellow Hero Card */}
            <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#FEF08A] via-[#FDE047] to-[#FACC15] p-3 shadow-md border border-amber-300">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#18181B] text-white text-[8px] font-black uppercase tracking-wider">
                    Kadıköy
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-white text-zinc-900 text-[8px] font-black shadow-sm">
                    ★ 4.9
                  </span>
                </div>

                <div className="flex items-center -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-5 h-5 rounded-full border border-white object-cover shadow"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-5 h-5 rounded-full border border-white object-cover shadow"
                  />
                  <div className="w-5 h-5 rounded-full bg-zinc-900 text-amber-300 font-extrabold text-[7px] flex items-center justify-center border border-white shadow">
                    +4
                  </div>
                </div>
              </div>

              <div className="pt-1.5">
                <p className="text-[9px] font-bold text-zinc-700 leading-none">Today, 20:00 • Cuma</p>
                <h3 className="text-sm font-black text-zinc-950 leading-tight mt-0.5">
                  Craft Beer Night
                </h3>
                <p className="text-[10px] font-extrabold text-zinc-800">
                  The Populist • Belfast Pub
                </p>
              </div>

              {/* Photo */}
              <div className="relative my-1.5 h-24 rounded-xl overflow-hidden shadow-sm border border-white/60">
                <img
                  src="https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=800&auto=format&fit=crop"
                  alt="Friends Drinking Beer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-1.5 left-2 text-white">
                  <p className="text-[9px] font-black leading-none">Mert, Can & 2 Arkadaş</p>
                  <p className="text-[7px] text-amber-300 font-semibold">Masa Ayrıldı • 20:00</p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                <div className="rounded-lg bg-white/95 p-1.5 shadow-sm border border-white/80 flex flex-col justify-between">
                  <span className="text-[8px] font-bold text-zinc-500">Mekan</span>
                  <span className="text-[10px] font-black text-zinc-900 truncate">The Populist</span>
                </div>

                <button
                  onClick={() => setIsJoined(!isJoined)}
                  className={`rounded-lg p-1.5 font-black text-[10px] flex items-center justify-center gap-1 shadow-md transition-all active:scale-95 ${
                    isJoined
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#18181B] text-white hover:bg-black'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Katıldın!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3 h-3 text-amber-400" />
                      <span>Davet Et</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Secondary Item */}
            <div className="rounded-xl bg-white border border-zinc-200/80 p-2 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-xs">
                  🍺
                </div>
                <div>
                  <p className="text-[11px] font-extrabold text-zinc-900 leading-tight">
                    Gelecek Hafta: IPA Tadımı
                  </p>
                  <p className="text-[9px] font-semibold text-zinc-500">
                    Cumartesi, 19:30 • 3 Arkadaş
                  </p>
                </div>
              </div>

              <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                19:30
              </span>
            </div>
          </div>

          {/* Bottom Home Indicator */}
          <div className="pb-1.5 flex justify-center bg-[#FDFCFB]">
            <div className="w-28 h-1 bg-zinc-300 rounded-full" />
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
        <ambientLight intensity={1.2} />
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
