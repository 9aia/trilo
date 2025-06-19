"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { internal, success } from "~/utils/solid";

export async function restorePhoto() {
  if(!process.env.GEMINI_API_KEY) {
    return internal('GEMINI_API_KEY is not set');
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const contents = `You are a photo restoration expert. Restore the photo based on the prompt:
  
    Restore this old, faded, and damaged photo. Remove scratches, fix discoloration, enhance sharpness and clarity, and make it look as close as possible to a clean, high-quality original. Preserve the original style and facial features.
  `;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp-image-generation",
    generationConfig: {
      // @ts-ignore
      responseModalities: ['Text', 'Image']
    },
  });

  try {
    const response = await model.generateContent(contents);
    const parts = response.response?.candidates?.[0].content?.parts;

    if (!parts)
      return internal('No parts found in response');

    let imageData;

    for (const part of parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        imageData = part.inlineData.data;
      }
    }

    if (!imageData)
      return internal('No image data found');
    
    const buffer = Buffer.from(imageData, 'base64');

    return success(new Response(buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    }));
  } catch (error) {
    const message = (error as any).message
    console.error(message);
    return internal('Error generating content', error);
  }
}
