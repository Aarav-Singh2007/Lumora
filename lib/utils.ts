
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";
// import { subjectsColors, voices } from "../constants";
// import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// export const getSubjectColor = (subject: string) => {
//   return subjectsColors[subject as keyof typeof subjectsColors];
// };

// // export const configureAssistant = (voice: string, style: string) => {
// export const configureAssistant = (
//   voice: string,
//   style: string,
//   language: string = "en"
// ) => {
//   // Safely get voice ID with fallback
//   let voiceId = "sarah"; // default fallback
  
//   try {
//     // Check if voices exists and has the voice property
//     if (voices && typeof voices === 'object') {
//       // Try to get the voice ID - adjust this based on your actual voices structure
//       const voiceObj = voices[voice as keyof typeof voices];
      
//       if (typeof voiceObj === 'string') {
//         // If voices[voice] is directly a string ID
//         voiceId = voiceObj;
//       } else if (voiceObj && typeof voiceObj === 'object') {
//         // If voices[voice] is an object with style properties
//         const styleVoice = voiceObj[style as keyof typeof voiceObj];
//         voiceId = styleVoice || voiceObj.casual || "sarah";
//       }
//     }
//   } catch (error) {
//     console.error("Error configuring voice:", error);
//   }

//   const vapiAssistant: CreateAssistantDTO = {
//     name: "Companion",
//     firstMessage: `Hello, let's start the session. Today we'll be talking about {{topic}}.`,
   
//     transcriber: {
//       provider: "deepgram",
//       model: "nova-3",
//       language:language as any,
//     },
//     voice: {
//       provider: "11labs",
//       voiceId: voiceId,
//       stability: 0.4,
//       similarityBoost: 0.8,
//       speed: 1.0,
//       style: 0.5,
//       useSpeakerBoost: true,
//     },
//     model: {
//       provider: "openai",
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.
  
// Tutor Guidelines:
// Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
// Keep the conversation flowing smoothly while maintaining control.
// From time to time make sure that the student is following you and understands you.
// Break down the topic into smaller parts and teach the student one part at a time.
// Keep your style of conversation {{ style }}.
// Keep your responses short, like in a real voice conversation.
// Do not include any special characters in your responses - this is a voice conversation.`,
//         },
//       ],
//     },
    
//   };
  
//   return vapiAssistant;
// };
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "../constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (
  voice: string,
  style: string,
  language: string = "en"
) => {
  // Safely get voice ID with fallback
  let voiceId = "sarah"; // default fallback

  try {
    if (voices && typeof voices === 'object') {
      const voiceObj = voices[voice as keyof typeof voices];

      if (typeof voiceObj === 'string') {
        voiceId = voiceObj;
      } else if (voiceObj && typeof voiceObj === 'object') {
        const styleVoice = voiceObj[style as keyof typeof voiceObj];
        voiceId = styleVoice || voiceObj.casual || "sarah";
      }
    }
  } catch (error) {
    console.error("Error configuring voice:", error);
  }

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage: `Hello, let's start the session. Today we'll be talking about {{topic}}.`,
    // transcriber: {
    //   provider: "deepgram",
    //   model: "nova-3",
    //   language: language as CreateAssistantDTO['transcriber']['language'], // 👈 type assertion to bypass union error
    // },
    transcriber: {
  provider: "deepgram",
  model: "nova-3",
  language, // ✅ no cast needed
} as Extract<CreateAssistantDTO["transcriber"], { provider: "deepgram" }>,
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1.0,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.
  
Tutor Guidelines:
Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
Keep the conversation flowing smoothly while maintaining control.
From time to time make sure that the student is following you and understands you.
Break down the topic into smaller parts and teach the student one part at a time.
Keep your style of conversation {{ style }}.
Keep your responses short, like in a real voice conversation.
Do not include any special characters in your responses - this is a voice conversation.`,
        },
      ],
    },
  };

  return vapiAssistant;
};