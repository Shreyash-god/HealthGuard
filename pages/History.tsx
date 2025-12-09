import React from 'react';
import { MOCK_HISTORY_DATA } from '../constants';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export const History: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="p-6">
            <header className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-slate-900">History</h1>
            </header>

            <div className="space-y-4">
                {MOCK_HISTORY_DATA.map((item) => (
                    <Card key={item.id} className="p-4 flex justify-between items-center">
                        <div>
                            <div className="text-xs text-slate-400 font-mono mb-1">
                                {new Date(item.timestamp).toLocaleDateString()}
                            </div>
                            <h3 className="font-bold text-slate-800">Symptom Check</h3>
                            <p className="text-sm text-slate-500 truncate w-48">{item.rationale[0]}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${item.urgency === 'LOW' ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'}`}>
                            {item.urgency}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}