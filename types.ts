export interface UserConsent {
  hasConsented: boolean;
  allowCloudProcessing: boolean;
  allowDataRetention: boolean;
  allowExport: boolean;
}

export interface UserProfile {
  age: number;
  sex: 'male' | 'female' | 'other';
  medicalHistory: string[];
}

export type UrgencyLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface DiagnosticHint {
  label: string;
  source: 'image' | 'text' | 'audio';
  confidence: number;
}

export interface Recommendations {
  homeCare: string[];
  teleconsult: string[];
  urgentCare: string[];
}

export interface TriageResult {
  id: string;
  timestamp: number;
  urgency: UrgencyLevel;
  confidence: number;
  rationale: string[];
  diagnosticHints: DiagnosticHint[];
  recommendations: Recommendations;
  fhirBundle: string | null; // Base64 or JSON string
}

export interface EmotionResult {
  id: string;
  timestamp: number;
  distressScore: number; // 0.0 to 1.0
  dominantEmotion: string;
  recommendations: string[];
}

export enum AppRoute {
  HOME = '/',
  SYMPTOM = '/symptom',
  EMOTION = '/emotion',
  TRIAGE_RESULT = '/result',
  GROUNDING = '/grounding',
  HISTORY = '/history',
  SETTINGS = '/settings',
}