import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Video, StopCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { analyzeEmotion } from '../services/geminiService';
import { AppRoute } from '../types';

export const EmotionInput: React.FC = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");

    const toggleRecording = () => {
        if (!isRecording) {
            setIsRecording(true);
            setTimeout(() => {
                setTranscript("I've been feeling really overwhelmed lately, just panicking about small things.");
            }, 2000);
        } else {
            setIsRecording(false);
        }
    }

    const handleAnalyze = async () => {
        // Mock analysis via service
        const result = await analyzeEmotion(transcript);
        // Navigate to a simplified result view (reusing TriageResult structure for simplicity or a modal)
        // For MVP, alert or quick nav
        alert(`Distress Score: ${result.score}\nRecommendation: ${result.advice[0]}`);
        if(result.score > 0.7) navigate(AppRoute.GROUNDING);
        else navigate(AppRoute.HOME);
    };

    return (
        <div className="p-6 space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-slate-900">Emotional Check-in</h1>
                <p className="text-slate-500">Share how you're feeling in a safe space.</p>
            </header>

            <div className="flex flex-col items-center gap-6 py-10">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-100 text-red-500 scale-110 shadow-xl shadow-red-200' : 'bg-slate-100 text-slate-400'}`}>
                    <Mic size={48} />
                </div>
                {isRecording && <div className="text-dangerRed animate-pulse font-medium">Listening...</div>}
                
                {transcript && (
                    <Card className="p-4 w-full bg-slate-50">
                        <p className="text-slate-700 italic">"{transcript}"</p>
                    </Card>
                )}
            </div>

            <div className="space-y-3">
                <Button 
                    variant={isRecording ? "danger" : "primary"} 
                    fullWidth 
                    onClick={toggleRecording}
                >
                    {isRecording ? <><StopCircle size={20}/> Stop Recording</> : <><Mic size={20}/> Start Voice Check</>}
                </Button>
                
                {transcript && !isRecording && (
                    <Button variant="secondary" fullWidth onClick={handleAnalyze}>
                        Analyze Distress
                    </Button>
                )}
            </div>
        </div>
    );
}