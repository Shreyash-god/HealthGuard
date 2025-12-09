import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Play, Pause } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Grounding: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("Ready?");
  // Use a ref to track phase for smoother state updates if needed, 
  // but state is fine for this simple timer.

  useEffect(() => {
    let interval: any;
    if (isActive) {
      let phase = 0;
      const cycle = () => {
        switch(phase % 3) {
            case 0: setText("Breathe In"); break;
            case 1: setText("Hold"); break;
            case 2: setText("Breathe Out"); break;
        }
        phase++;
      };
      cycle();
      interval = setInterval(cycle, 4000); // 4s In, 4s Hold, 4s Out = 12s Cycle
    } else {
        setText("Ready?");
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white p-6 relative overflow-hidden">
        {/* Custom style for 12s animation to match 4-4-4 cycle */}
        <style>{`
          @keyframes breathe-custom {
            0% { transform: scale(1); opacity: 0.5; }
            33% { transform: scale(1.5); opacity: 0.8; }
            66% { transform: scale(1.5); opacity: 0.8; }
            100% { transform: scale(1); opacity: 0.5; }
          }
          .animate-breathe-custom {
            animation: breathe-custom 12s infinite ease-in-out;
          }
        `}</style>
        
        {/* Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 z-0"></div>
        
        <header className="relative z-10 flex justify-between items-center">
            <h1 className="text-xl font-bold">Grounding</h1>
            <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full">
                <X size={20} />
            </button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
            <div className={`relative flex items-center justify-center w-64 h-64 transition-all duration-1000 ${isActive ? 'scale-110' : 'scale-100'}`}>
                {isActive && (
                    <div className="absolute inset-0 bg-softTeal/20 rounded-full blur-3xl animate-breathe-custom"></div>
                )}
                <div className={`w-48 h-48 border-4 border-softTeal rounded-full flex items-center justify-center relative transition-all duration-[4000ms] ease-in-out ${isActive && text === 'Breathe In' ? 'scale-125' : 'scale-100'}`}>
                    <span className="text-2xl font-light tracking-widest uppercase text-center animate-pulse">{text}</span>
                </div>
            </div>
        </div>

        <div className="relative z-10 pb-10">
            <Button 
                onClick={() => setIsActive(!isActive)}
                fullWidth
                className={isActive ? "bg-white/10 hover:bg-white/20 text-white" : "bg-softTeal hover:bg-teal-400 text-teal-950"}
            >
                {isActive ? <><Pause size={20} /> Pause Session</> : <><Play size={20} /> Start Exercise</>}
            </Button>
        </div>
    </div>
  );
};