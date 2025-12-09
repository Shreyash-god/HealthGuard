export const APP_NAME = "HealthGuard";

export const DEFAULT_USER_PROFILE = {
  age: 35,
  sex: 'other',
  medicalHistory: ['none']
};

export const TRIAGE_SYSTEM_PROMPT = `You are HealthGuard's clinical triage assistant. NEVER provide definitive diagnoses. Use evidence to determine urgency (LOW|MEDIUM|HIGH), confidence 0.0-1.0, short 3-bullet rationale, diagnosticHints (label + source + confidence), and recommendations grouped by 'homeCare', 'teleconsult', 'urgentCare'. Provide output as strict JSON with keys: urgency, confidence, rationale[], diagnosticHints[], recommendations{homeCare[],teleconsult[],urgentCare[]}, fhirBundle (null or base64 string).`;

export const MOCK_HISTORY_DATA = [
  {
    id: '1',
    timestamp: Date.now() - 86400000 * 2,
    urgency: 'LOW',
    confidence: 0.9,
    rationale: ['Mild redness observed', 'No pain reported'],
    diagnosticHints: [{ label: 'Dermatitis', source: 'image', confidence: 0.85 }],
    recommendations: { homeCare: ['Apply moisturizer'], teleconsult: [], urgentCare: [] },
    fhirBundle: null
  }
];