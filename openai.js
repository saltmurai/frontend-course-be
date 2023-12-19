const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
require("dotenv").config();

const client = new OpenAIClient(
  "https://boomco.openai.azure.com/",
  new AzureKeyCredential(process.env.OPENAI_API_KEY)
);

async function translate(content) {
  const response = await client.getChatCompletions(
    "boomco",
    [
      {
        role: "system",
        content: "Assistant is a large language model trained by OpenAI.",
      },
      {
        role: "user",
        content: `Transalte the following: "${content}" to Vietnamese. Parapharse it for ease of understanding.`,
      },
    ],
    {
      maxTokens: 500,
      temperature: 0.9,
    }
  );
  return response.choices[0].message.content;
}

exports.translate = translate;
