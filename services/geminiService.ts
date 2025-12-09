import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TRIAGE_SYSTEM_PROMPT } from '../constants';
import { TriageResult, UserProfile } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the response schema matching the PDF requirements exactly
const triageSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    urgency: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH"] },
    confidence: { type: Type.NUMBER },
    rationale: { type: Type.ARRAY, items: { type: Type.STRING } },
    diagnosticHints: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          source: { type: Type.STRING, enum: ["image", "text", "audio"] },
          confidence: { type: Type.NUMBER }
        }
      }
    },
    recommendations: {
      type: Type.OBJECT,
      properties: {
        homeCare: { type: Type.ARRAY, items: { type: Type.STRING } },
        teleconsult: { type: Type.ARRAY, items: { type: Type.STRING } },
        urgentCare: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    fhirBundle: { type: Type.STRING, nullable: true }
  },
  required: ["urgency", "confidence", "rationale", "diagnosticHints", "recommendations"]
};

export const analyzeSymptom = async (
  text: string,
  imageBase64: string | null,
  userProfile: UserProfile
): Promise<TriageResult> => {
  try {
    const parts: any[] = [];
    
    // Construct UserEvidence JSON structure for the prompt context
    const userEvidence = {
      user_text: text,
      user_profile: userProfile,
      // Note: In a real implementation, we would pass image labels from a smaller model here
      // For this implementation, we pass the raw image to Gemini to reason about directly.
      timestamp: new Date().toISOString()
    };

    parts.push({
      text: `UserEvidence: ${JSON.stringify(userEvidence)}`
    });

    if (imageBase64) {
        // Strip prefix if present (e.g., data:image/jpeg;base64,)
        const base64Data = imageBase64.split(',')[1] || imageBase64;
        parts.push({
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64Data
            }
        });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using Pro for reasoning as requested
      contents: {
        role: 'user',
        parts: parts
      },
      config: {
        systemInstruction: TRIAGE_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: triageSchema,
        temperature: 0.2, // Low temperature for consistent clinical reasoning
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("Empty response from AI");

    const parsed = JSON.parse(resultText);
    
    // Augment with local ID and timestamp
    return {
      ...parsed,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const analyzeEmotion = async (text: string): Promise<{score: number, label: string, advice: string[]}> => {
     // Simplified emotion check using Gemini Flash for speed
     const prompt = `Analyze the emotional distress in this text: "${text}". Return JSON: { "score": 0.0-1.0, "label": "emotion_name", "advice": ["tip1", "tip2"] }`;
     
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json'
        }
     });

     return JSON.parse(response.text || '{}');
}