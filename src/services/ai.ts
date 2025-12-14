
export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

const MOCK_RESPONSES: Record<string, string> = {
    default: "I'm here to help! Ask me anything about this step.",
    motor: "The motor consists of a stator and a rotor. The interaction between their magnetic fields produces force.",
    wiring: "In household wiring, the Phase (Live) wire carries the current, and the Neutral wire provides the return path. Always ensure the switch is on the Phase wire.",
    safety: "Safety first! Always ensure the power source is disconnected before touching any bare wires.",
    stator: "The stator is the stationary part. It usually holds the field coils or permanent magnets.",
    rotor: "The rotor is the moving part. It connects to the output shaft to do mechanical work.",
};

export const generateAIResponse = async (
    query: string,
    context: string,
    history: ChatMessage[]
): Promise<string> => {
    // 1. Check for Real API Key
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (apiKey) {
        try {
            // Simple fetch implementation for Gemini JSON API (Conceptual)
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: `Context: ${context}\n\nUser Question: ${query}\n\nAnswer as a helpful vocational tutor.` }]
                        }
                    ]
                })
            });

            const data = await response.json();
            if (data.candidates && data.candidates.length > 0) {
                return data.candidates[0].content.parts[0].text;
            }
        } catch (error) {
            console.error("AI API Error, falling back to mock:", error);
        }
    }

    // 2. Mock Logic (Fallback)
    // Simple keyword matching for demo purposes
    const lowerQuery = query.toLowerCase();

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    if (lowerQuery.includes('stator')) return MOCK_RESPONSES.stator;
    if (lowerQuery.includes('rotor')) return MOCK_RESPONSES.rotor;
    if (lowerQuery.includes('wire') || lowerQuery.includes('phase')) return MOCK_RESPONSES.wiring;
    if (lowerQuery.includes('safe') || lowerQuery.includes('shock')) return MOCK_RESPONSES.safety;
    if (context.includes('Motor')) return MOCK_RESPONSES.motor;

    return `That's a great question about "${query}". Based on the current step: ${context}, make sure you align the components correctly. Need a specific hint?`;
};
