import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateTestCases(requirement) {
  const model = genAI.getGenerativeModel({
    model: "models/gemini-2.5-flash",
  });

const prompt = `
You are a senior QA automation engineer.

Generate COMPLETE test cases covering:
- Positive scenarios
- Negative scenarios
- Edge cases
- Boundary cases

Requirement:
"${requirement}"

Return STRICT JSON ONLY in the following format:

[
  {
    "id": "TC_01",
    "type": "Positive | Negative | Edge | Boundary",
    "scenario": "",
    "steps": [
      ""
    ],
    "expectedResult": ""
  }
]

Rules:
- Do NOT add explanation
- Do NOT add extra text
- JSON must be valid
`;


  const result = await model.generateContent(prompt);
  return result.response.text();
}
