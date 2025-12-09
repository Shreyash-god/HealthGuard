import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ConsentModal } from './components/ConsentModal';
import { Home } from './pages/Home';
import { SymptomInput } from './pages/SymptomInput';
import { EmotionInput } from './pages/EmotionInput';
import { TriageResult } from './pages/TriageResult';
import { Grounding } from './pages/Grounding';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { AppRoute, UserConsent } from './types';

const App: React.FC = () => {
  const [consent, setConsent] = useState<UserConsent | null>(null);

  const handleConsent = (c: UserConsent) => {
    setConsent(c);
  };

  return (
    <HashRouter>
      <ConsentModal onConsentComplete={handleConsent} />
      
      {/* 
        Ideally we block rendering until consent is true, 
        but for the demo structure we allow the router to mount behind the modal 
      */}
      
      <Layout>
        <Routes>
          <Route path={AppRoute.HOME} element={<Home />} />
          <Route path={AppRoute.SYMPTOM} element={<SymptomInput />} />
          <Route path={AppRoute.EMOTION} element={<EmotionInput />} />
          <Route path={AppRoute.TRIAGE_RESULT} element={<TriageResult />} />
          <Route path={AppRoute.GROUNDING} element={<Grounding />} />
          <Route path={AppRoute.HISTORY} element={<History />} />
          <Route path={AppRoute.SETTINGS} element={<Settings />} />
          <Route path="*" element={<Navigate to={AppRoute.HOME} replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;