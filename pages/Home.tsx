import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Heart, ChevronRight, Bell, Wind, Clock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { AppRoute } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center mt-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good Morning,</h1>
          <p className="text-slate-500">How are you feeling today?</p>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm text-slate-600 border border-slate-100">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card 
          onClick={() => navigate(AppRoute.SYMPTOM)}
          className="p-6 bg-blue-50/50 border-blue-100 flex flex-col items-center text-center gap-4 hover:border-calmBlue/50 transition-colors"
        >
          <div className="w-16 h-16 bg-calmBlue rounded-2xl flex items-center justify-center text-white shadow-blue-200 shadow-lg">
            <Activity size={32} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Symptom<br/>Check</h3>
            <p className="text-xs text-slate-500 mt-1">Physical triage</p>
          </div>
        </Card>

        <Card 
          onClick={() => navigate(AppRoute.EMOTION)}
          className="p-6 bg-teal-50/50 border-teal-100 flex flex-col items-center text-center gap-4 hover:border-softTeal/50 transition-colors"
        >
          <div className="w-16 h-16 bg-softTeal rounded-2xl flex items-center justify-center text-white shadow-teal-200 shadow-lg">
            <Heart size={32} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Emotional<br/>Support</h3>
            <p className="text-xs text-slate-500 mt-1">Distress help</p>
          </div>
        </Card>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Access</h2>
        <Card className="divide-y divide-slate-100">
          <button 
            onClick={() => navigate(AppRoute.GROUNDING)}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Wind size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-slate-900">Breathing Exercise</h4>
                <p className="text-xs text-slate-500">Calm your mind in 2 mins</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </button>
          
          <button 
            onClick={() => navigate(AppRoute.HISTORY)}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Clock size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-slate-900">Recent History</h4>
                <p className="text-xs text-slate-500">View past assessments</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </button>
        </Card>
      </div>
    </div>
  );
};