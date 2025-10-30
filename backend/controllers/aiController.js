import { OpenAI } from "openai/client.js";
import dotenv from "dotenv";

dotenv.config();

const openai=new openai({apikey:process.env.OPENAI_API_KEY});

export const getAdvice =async(req,res)=>{
    try{
        const prompt=`You are an AI Education Advisor. User question: "${question}" Provide a personalized learning path, recommended courses, and steps to acvieve the goal.`;

        const completion=await openai.chat.complitions.create({
            model:"gpt-4o-mini",
            message:[{role:"user",content:prompt}],
        });

        res.json({answer:completion.choices[0].message.content});
    } catch(error){
        res.status(500).json({error:"Failed to get advice from AI."});
        console.error("AI Advice Error:",error);
    }
}