import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("BODY:", body);

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing");
    }

    if (!body.prompt) {
      throw new Error("Prompt is empty");
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "models/gemini-flash-latest"
    });

    const result = await model.generateContent(body.prompt);

    return Response.json({
      reply: result.response.text()
    });
  } catch (err: any) {
    console.error("API ERROR:", err.message);

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
