import { GoogleGenerativeAI } from "@google/generative-ai";

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(
  "AIzaSyBP8nEp_HAx_IxVOBiw-yKciLQpLlWBa6A"
);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 300,
};
// Model initialization
const modelId = "gemini-1.5-flash";
const model = configuration.getGenerativeModel({ model: modelId });

// Controller function to handle chat conversation
export const generateResponse = async (word: string): Promise<string> => {
  try {
    const promptEdited =
      'KKhông cảm thán ("Tuyệt vời!..."), không giải thích, chỉ trả về duy nhất JSON bao gồm: word, reading, meaning (vi), examples [jp, vi], synonyms, antonyms (nếu không có thì trả về giá trị null) của từ ' +
      word;
    const parts = [{ text: "input: " + promptEdited }, { text: "output: " }];

    const chat = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    return chat.response.text();
  } catch (err) {
    console.log(err);
    return "Get Detail Error!";
  }
};

interface Example {
  jp: string,
  vi: string,
}

interface DetailWord {
  word: string;
  reading: string;
  meaning: string;
  synonyms: Array<string>;
  antonyms: Array<string>;
  examples: Example[];
}

export const handleResponse = (response: string): DetailWord => {
  let jsonString = response.replace(/```json/g, "");
  jsonString = jsonString.replace(/```/g,"");
  console.log(jsonString);
  
  const data = JSON.parse(jsonString);
  console.log(data);
  return data;
};
