import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, Environment } from '@react-three/drei';
import { Phone, Star, Users, Clock, ArrowRight, Play, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

// 3D Foam Bubbles Component
function FoamBubbles({ count = 50 }) {
  const bubbles = useRef([]);
  
  useEffect(() => {
    bubbles.current.forEach((bubble, i) => {
      gsap.to(bubble.position, {
        y: bubble.position.y + 10,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        ease: "none",
        delay: i * 0.1
      });
    });
  }, []);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={el => bubbles.current[i] = el}
          position={[
            (Math.random() - 0.5) * 20,
            Math.random() * -10,
            (Math.random() - 0.5) * 20
          ]}
        >
          <sphereGeometry args={[0.1 + Math.random() * 0.2, 8, 6]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.8}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
      ))}
    </>
  );
}

// 3D Phone with Foam Effect
function Phone3D() {
  const phoneRef = useRef();
  
  useEffect(() => {
    if (phoneRef.current) {
      gsap.to(phoneRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <group ref={phoneRef}>
      {/* Phone Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 3, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[1.4, 2.9, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Foam Coming Out */}
      <group position={[0, 1.6, 0]}>
        <FoamBubbles count={20} />
      </group>
    </group>
  );
}

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('foamPartyCountdown');
    if (saved) {
      const remaining = parseInt(saved) - Math.floor((Date.now() - parseInt(localStorage.getItem('foamPartyStart'))) / 1000);
      return remaining > 0 ? remaining : 600; // 10 minutes = 600 seconds
    }
    return 600;
  });

  useEffect(() => {
    if (!localStorage.getItem('foamPartyStart')) {
      localStorage.setItem('foamPartyStart', Date.now().toString());
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        localStorage.setItem('foamPartyCountdown', newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-6 py-3 rounded-full shadow-2xl border-2 border-white/20"
    >
      <div className="flex items-center space-x-2">
        <Clock className="w-5 h-5 animate-pulse" />
        <span className="font-bold text-lg">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
        <span className="text-sm opacity-80">LEFT TO JOIN!</span>
      </div>
    </motion.div>
  );
}

// Main App Component
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    setShowVideo(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Countdown Timer */}
      <CountdownTimer />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* 3D Background */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Environment preset="sunset" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <Phone3D />
            </Float>
            <FoamBubbles count={100} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
          >
            FOAM PARTY
          </motion.h1>
          
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-4xl font-bold mb-8 text-blue-200"
          >
            Experience the ULTIMATE Beach Foam Extravaganza!
          </motion.h2>

          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed"
          >
            Join thousands of party-goers for the most EPIC foam party on the Gulf Coast! 
            Immerse yourself in a sea of bubbles, dance to the hottest beats, and create 
            memories that will last a lifetime. This is NOT your average beach party!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl px-12 py-4 rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 flex items-center space-x-2"
            >
              <span>JOIN THE FOAM REVOLUTION</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayVideo}
              className="bg-white/20 backdrop-blur-sm text-white font-bold text-xl px-8 py-4 rounded-full border-2 border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
            >
              <Play className="w-6 h-6" />
              <span>WATCH THE MAGIC</span>
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-8 text-blue-200"
          >
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-yellow-400" />
              <span className="font-semibold">10,000+ Party Animals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="font-semibold">4.9/5 Stars</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="font-semibold">100% Guaranteed Fun</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black text-center text-white mb-16"
          >
            Why This Foam Party is LEGENDARY
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "MASSIVE FOAM CANNONS",
                description: "State-of-the-art foam machines that create a foam tsunami you'll never forget!",
                icon: "🌊"
              },
              {
                title: "TOP DJs & LIVE MUSIC",
                description: "World-class DJs spinning the hottest tracks while you dance in the foam!",
                icon: "🎵"
              },
              {
                title: "BEACHFRONT LOCATION",
                description: "Right on the pristine Gulf Coast beaches with stunning sunset views!",
                icon: "🏖️"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-blue-200 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black text-white mb-8"
          >
            ⚠️ LIMITED SPOTS AVAILABLE! ⚠️
          </motion.h2>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-white mb-8"
          >
            Don't miss out on the foam party of the century! 
            Once we hit capacity, you're out of luck!
          </motion.p>

          <motion.button
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-red-600 font-bold text-2xl px-12 py-6 rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300"
          >
            SECURE MY SPOT NOW!
          </motion.button>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-12 right-0 text-white text-4xl hover:text-red-400 transition-colors"
              >
                ×
              </button>
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-1 rounded-2xl">
                <div className="bg-black rounded-xl p-8 text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    🎥 FOAM PARTY HIGHLIGHTS 🎥
                  </h3>
                  <p className="text-blue-200 mb-6">
                    Watch the magic unfold! This is just a taste of what's coming...
                  </p>
                  <div className="bg-gray-800 rounded-lg p-12 text-gray-400">
                    <p className="text-xl">Video Player Placeholder</p>
                    <p className="text-sm mt-2">(Replace with actual video embed)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;