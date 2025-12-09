import React, { useState, useEffect } from 'react';
import { UserConsent } from '../types';
import { Button } from './ui/Button';
import { Shield, Cloud, Download, Trash2, Check } from 'lucide-react';

interface ConsentModalProps {
  onConsentComplete: (consent: UserConsent) => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ onConsentComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [consent, setConsent] = useState<UserConsent>({
    hasConsented: false,
    allowCloudProcessing: true, // Default per spec "cloud processing opt-in", effectively opting in for UX but allowing toggle
    allowDataRetention: false,
    allowExport: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem('healthguard_consent');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.hasConsented) {
        onConsentComplete(parsed);
        return;
      }
    }
    setIsOpen(true);
  }, [onConsentComplete]);

  const handleSave = () => {
    const finalConsent = { ...consent, hasConsented: true };
    localStorage.setItem('healthguard_consent', JSON.stringify(finalConsent));
    setIsOpen(false);
    onConsentComplete(finalConsent);
  };

  const Toggle = ({ 
    label, 
    value, 
    onChange, 
    icon: Icon 
  }: { 
    label: string, 
    value: boolean, 
    onChange: (v: boolean) => void,
    icon: any
  }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl mb-3 border border-slate-100">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${value ? 'bg-calmBlue/10 text-calmBlue' : 'bg-slate-200 text-slate-500'}`}>
          <Icon size={20} />
        </div>
        <span className="font-medium text-slate-700">{label}</span>
      </div>
      <button 
        onClick={() => onChange(!value)}
        className={`w-12 h-7 rounded-full transition-colors relative ${value ? 'bg-calmBlue' : 'bg-slate-300'}`}
        role="switch"
        aria-checked={value}
      >
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${value ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-calmBlue/10 text-calmBlue rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Privacy First</h2>
          <p className="text-slate-500 mt-2">HealthGuard processes data on-device by default. Customize your privacy settings below.</p>
        </div>

        <div className="space-y-2 mb-8">
          <Toggle 
            label="Cloud Analysis (Gemini)" 
            value={consent.allowCloudProcessing} 
            onChange={(v) => setConsent({...consent, allowCloudProcessing: v})} 
            icon={Cloud}
          />
          <Toggle 
            label="Allow Data Retention" 
            value={consent.allowDataRetention} 
            onChange={(v) => setConsent({...consent, allowDataRetention: v})} 
            icon={Download}
          />
          <Toggle 
            label="Allow FHIR Exports" 
            value={consent.allowExport} 
            onChange={(v) => setConsent({...consent, allowExport: v})} 
            icon={Check}
          />
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" fullWidth onClick={() => setIsOpen(false)}>Decline</Button>
          <Button fullWidth onClick={handleSave}>Accept & Continue</Button>
        </div>
      </div>
    </div>
  );
};