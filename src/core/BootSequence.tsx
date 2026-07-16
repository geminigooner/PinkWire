import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesktopStore } from '../store/useDesktopStore';
import { useAuthStore } from '../store/useAuthStore';

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);
  const { setHasBooted } = useDesktopStore();

  useEffect(() => {
    // BIOS sequence timings
    const timers = [
      setTimeout(() => setStage(1), 500),   // Memory check
      setTimeout(() => setStage(2), 1500),  // Loading OS
      setTimeout(() => setStage(3), 2500),  // PinkWire Logo
      setTimeout(() => {
        setHasBooted(true);
        onComplete();
      }, 4500) // Finish
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete, setHasBooted]);

  return (
    <div className="fixed top-0 left-0 w-full h-[100dvh] bg-black text-green-500 font-mono text-sm p-8 z-[100] flex flex-col">
      <AnimatePresence>
        {stage >= 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            PinkWire OS BIOS v1.0.4<br/>
            Copyright (C) 2026, PinkWire Systems Inc.
          </motion.div>
        )}
        
        {stage >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            CPU: Quantized Neural Processor @ 4.2 GHz<br/>
            Memory Test: 655360K OK<br/>
            <br/>
            Initializing Plug and Play Cards...<br/>
            PNP Init Completed<br/>
            <br/>
            Detecting Primary Master ... PinkWire SSD 2TB<br/>
            Detecting Primary Slave  ... None
          </motion.div>
        )}

        {stage >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            Booting from Hard Disk...<br/>
            Starting PinkWire OS...
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage >= 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black z-10"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.5)]">
                <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent animate-spin" />
              </div>
              <h1 className="text-4xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 tracking-tight">
                PinkWire OS
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
