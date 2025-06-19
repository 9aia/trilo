"use server";

import { internal, success } from "~/utils/solid";

// export async function restorePhoto() {


//   try {
//     const response = await model.generateContent(contents);
//     const parts = response.response?.candidates?.[0].content?.parts;

//     if (!parts)
//       return internal('No parts found in response');

//     let imageData;

//     for (const part of parts) {
//       if (part.text) {
//         console.log(part.text);
//       } else if (part.inlineData) {
//         imageData = part.inlineData.data;
//       }
//     }

//     if (!imageData)
//       return internal('No image data found');
    
//     const buffer = Buffer.from(imageData, 'base64');

//     return success(new Response(buffer, {
//       headers: {
//         'Content-Type': 'image/jpeg',
//       },
//     }));
//   } catch (error) {
//     const message = (error as any).message
//     console.error(message);
//     return internal('Error generating content', error);
//   }
// }

import {
  GoogleGenAI,
} from '@google/genai';

export async function restorePhoto(base64Image: string) {
  if(!process.env.GEMINI_API_KEY) {
    return internal('GEMINI_API_KEY is not set');
  }

  if(!process.env.GEMINI_MODEL) {
    return internal('GEMINI_MODEL is not set')
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseModalities: [
        'IMAGE',
        'TEXT',
    ],
    responseMimeType: 'text/plain',
  };
  const prompt = `You are a photo restoration expert. Restore the photo based on the prompt:
  
    Restore this old, faded, and damaged photo. Remove scratches, fix discoloration, enhance sharpness and clarity, and make it look as close as possible to a clean, high-quality original. Preserve the original style and facial features.
  `
  const model = process.env.GEMINI_MODEL;
  const contents = [
    {
      role: 'user',
      parts: [
        {
          inlineData: {
            mimeType: `image/jpeg`,
            data: base64Image,
          },
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  console.log('Generating content...');

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  for await (const chunk of response) {
    console.log('Chunk:', chunk);
    if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
      continue;
    }
    if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
      const inlineData = chunk.candidates[0].content.parts[0].inlineData;
      const buffer = Buffer.from(inlineData.data || '', 'base64');
      return success(new Response(buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
        },
      }));
    }
    else {
      console.log(chunk.text);
    }
  }

  return internal('No image data found');
}
