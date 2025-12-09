import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Activity, Wind, Clock, User } from 'lucide-react';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const NavItem = ({ icon: Icon, route, label }: { icon: any, route: string, label: string }) => {
    const isActive = location.pathname === route;
    return (
      <button 
        onClick={() => navigate(route)}
        className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${isActive ? 'text-calmBlue' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-[10px] mt-1 font-medium">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-200 px-4 pb-safe pt-2">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          <NavItem icon={Home} route={AppRoute.HOME} label="Home" />
          <NavItem icon={Activity} route={AppRoute.SYMPTOM} label="Triage" />
          <NavItem icon={Wind} route={AppRoute.GROUNDING} label="Breathe" />
          <NavItem icon={Clock} route={AppRoute.HISTORY} label="History" />
          <NavItem icon={User} route={AppRoute.SETTINGS} label="Profile" />
        </div>
      </nav>
    </div>
  );
};