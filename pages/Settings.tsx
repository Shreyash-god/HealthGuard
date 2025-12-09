import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all consent and data?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400">
            <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-900">Profile & Settings</h1>
      </header>

      <div className="space-y-4">
          <Card className="p-4">
              <h3 className="font-bold text-slate-900 mb-2">User Profile</h3>
              <div className="space-y-2 text-sm text-slate-600">
                  <p>Age: 35</p>
                  <p>Sex: Other</p>
                  <p className="text-xs text-slate-400">Stored locally on device</p>
              </div>
          </Card>

          <Card className="p-4">
              <h3 className="font-bold text-slate-900 mb-2">Data & Privacy</h3>
              <p className="text-sm text-slate-500 mb-4">
                  Manage your data retention and cloud processing preferences.
              </p>
              <Button variant="danger" fullWidth onClick={handleReset} className="flex items-center justify-center gap-2">
                  <Trash2 size={18} />
                  Reset App Data
              </Button>
          </Card>
      </div>
      
      <div className="text-center mt-8">
          <p className="text-xs text-slate-400">HealthGuard v1.0.0</p>
      </div>
    </div>
  );
};