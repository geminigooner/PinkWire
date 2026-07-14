import { GoogleGenAI } from "@google/genai";
console.log("Key:", process.env.GEMINI_API_KEY ? "Set" : "Not Set");
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "dummy", 
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } } 
});
ai.models.generateContent({ model: "gemini-3.5-flash", contents: "test" })
  .then(res => console.log(res.text))
  .catch(err => console.error(err));
