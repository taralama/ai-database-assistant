import dotenv from "dotenv";
import Groq from "groq-sdk";
import { SQL_GENERATOR_PROMPT } from "../propmts/sql-generator.prompt";
import { getDatabaseSchema } from "../helper/databaseSchema";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const connectLLM = async (prompt: string) => {
    const chatCompletion = await generateSql(prompt);
    // Print the completion returned by the LLM.
    return chatCompletion.choices[0]?.message?.content || "";
};

export async function generateSql(prompt: string) {
    const databaseSchema = getDatabaseSchema();
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: SQL_GENERATOR_PROMPT,
            },
            {
                role: "user",
                content: `
                DATABASE SCHEMA
                ${databaseSchema}

                QUESTION
                ${prompt}`,
            },
        ],

        model: "openai/gpt-oss-20b",
    });
}

// ...existing code...

export async function answerFromRows(question: string, rows: unknown[]) {
    if (rows.length === 0) {
        return "I couldn't find any matching records.";
    }

    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
            {
                role: "system",
                content:
                    "Answer the user's question in clear, natural language using only the database results provided. " +
                    "Do not invent facts or calculate values that are not supported by the results. " +
                    "If the results do not answer the question, say so.",
            },
            {
                role: "user",
                content: `QUESTION\n${question}\n\nDATABASE RESULTS (JSON)\n${JSON.stringify(rows)}`,
            },
        ],
    });

    return (
        completion.choices[0]?.message?.content?.trim() ||
        "I couldn't format the database results."
    );
}

// ...existing code...
