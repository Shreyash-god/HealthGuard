import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Info, Calendar, Download, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { TriageResult as ITriageResult, AppRoute } from '../types';

export const TriageResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result as ITriageResult;

  if (!result) {
    navigate(AppRoute.HOME);
    return null;
  }

  const getUrgencyColor = (u: string) => {
    switch (u) {
      case 'HIGH': return 'bg-dangerRed text-white';
      case 'MEDIUM': return 'bg-orange-500 text-white';
      default: return 'bg-softTeal text-teal-900';
    }
  };

  const getUrgencyIcon = (u: string) => {
      switch(u) {
          case 'HIGH': return <AlertTriangle size={24} />;
          case 'MEDIUM': return <Info size={24} />;
          default: return <CheckCircle size={24} />;
      }
  }

  return (
    <div className="p-6 space-y-6 pb-20">
      <header className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900">Triage Result</h1>
          <span className="text-xs font-mono text-slate-400">ID: {result.id.slice(0,8)}</span>
      </header>

      {/* Urgency Banner */}
      <div className={`p-6 rounded-2xl shadow-lg flex items-center justify-between ${getUrgencyColor(result.urgency)}`}>
        <div>
          <p className="opacity-80 font-medium text-xs tracking-wider uppercase mb-1">Assessed Urgency</p>
          <h2 className="text-3xl font-bold">{result.urgency}</h2>
        </div>
        <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            {getUrgencyIcon(result.urgency)}
        </div>
      </div>

      {/* Rationale */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">AI Rationale</h3>
        <Card className="p-4 bg-white border-l-4 border-calmBlue">
          <ul className="space-y-2">
            {result.rationale.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="text-calmBlue font-bold">•</span>
                {r}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Recommendations</h3>
        
        {result.recommendations.urgentCare.length > 0 && (
          <Card className="p-4 border-red-100 bg-red-50">
            <div className="flex items-center gap-2 mb-2 text-dangerRed font-bold">
              <AlertTriangle size={18} />
              <h4>Urgent Care</h4>
            </div>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              {result.recommendations.urgentCare.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </Card>
        )}

        {result.recommendations.homeCare.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2 text-softTeal font-bold">
              <CheckCircle size={18} />
              <h4>Home Care</h4>
            </div>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              {result.recommendations.homeCare.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </Card>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 pt-2">
         <Button variant="primary" className="text-sm">
            <Calendar size={18} />
            Schedule
         </Button>
         <Button variant="secondary" className="text-sm">
            <Download size={18} />
            FHIR Export
         </Button>
      </div>

      {result.urgency === 'HIGH' && (
          <Button variant="danger" fullWidth className="mt-4 animate-pulse">
              <Phone size={18} />
              Call Emergency Line
          </Button>
      )}
    </div>
  );
};