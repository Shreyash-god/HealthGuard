import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, X, Loader2, Square } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AppRoute, UserProfile } from '../types';
import { DEFAULT_USER_PROFILE } from '../constants';
import { analyzeSymptom } from '../services/geminiService';

export const SymptomInput: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simple media recording logic
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const stopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
          // Simulate transcription completion
          setDescription(prev => {
              const newText = "My throat feels very sore and I have a mild fever.";
              return prev ? `${prev} ${newText}` : newText;
          });
      }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.start();
        setIsRecording(true);
        // Auto-stop simulation after 3s
        setTimeout(() => {
             if (mediaRecorderRef.current?.state === 'recording') {
                 stopRecording();
             }
        }, 3000);
      } catch (err) {
        console.error("Mic error", err);
        alert("Microphone access denied");
      }
    }
  };

  const handleSubmit = async () => {
    if (!description && !image) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeSymptom(description, image, DEFAULT_USER_PROFILE as UserProfile);
      // Pass result via state location to next page
      navigate(AppRoute.TRIAGE_RESULT, { state: { result } });
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
      return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-calmBlue rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="text-calmBlue animate-pulse" size={32}/>
                </div>
              </div>
              <div>
                  <h2 className="text-xl font-bold text-slate-900">Analyzing Symptoms</h2>
                  <p className="text-slate-500 mt-2">HealthGuard is processing your inputs securely with Gemini...</p>
              </div>
          </div>
      );
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <header className="mb-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
            <X size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">New Assessment</h1>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto pb-4">
        {/* Image Capture */}
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Visual Evidence (Optional)</label>
            <div 
                onClick={() => !image && fileInputRef.current?.click()}
                className={`relative h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden ${image ? 'border-transparent' : 'border-slate-300 hover:border-calmBlue hover:bg-blue-50 cursor-pointer'}`}
            >
                {image ? (
                    <>
                        <img src={image} alt="Symptom" className="w-full h-full object-cover" />
                        <button 
                            onClick={(e) => { e.stopPropagation(); setImage(null); }}
                            className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full backdrop-blur-md"
                        >
                            <X size={16} />
                        </button>
                    </>
                ) : (
                    <>
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-2">
                            <Camera size={24} />
                        </div>
                        <p className="text-sm text-slate-500 font-medium">Tap to take photo</p>
                    </>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>
        </div>

        {/* Voice & Text */}
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Describe Symptoms</label>
            <div className="relative">
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what you feel (e.g., sharp pain in left knee)..."
                    className="w-full h-32 p-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-calmBlue focus:outline-none resize-none text-slate-700"
                />
                <button 
                    onClick={toggleRecording}
                    className={`absolute bottom-3 right-3 p-2 rounded-full transition-all ${isRecording ? 'bg-dangerRed text-white animate-pulse' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                    {isRecording ? <Square size={20} fill="currentColor" /> : <Mic size={20} />}
                </button>
            </div>
            {isRecording && <p className="text-xs text-dangerRed font-medium animate-pulse ml-1">Recording... (Listening)</p>}
        </div>
      </div>

      <div className="pt-4">
        <Button 
            fullWidth 
            onClick={handleSubmit} 
            disabled={(!description && !image) || isRecording}
        >
            Start Triage
        </Button>
      </div>
    </div>
  );
};