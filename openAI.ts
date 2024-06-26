import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "API KEY",
});

export const getEmailContext = async (emailContent: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Classify the following email content: ${emailContent}`,
        },
      ],
      max_tokens: 100,
    });

    // Check if choices array exists and has at least one element
    if (
      response.choices &&
      response.choices.length > 0 &&
      response.choices[0].message.content
    ) {
      return response.choices[0].message.content.trim();
    } else {
      throw new Error("Invalid response structure from OpenAI API");
    }
  } catch (error) {
    console.error("Error retrieving email context:", error);
    throw error;
  }
};

export const generateResponse = async (context: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Generate a response for the following email context: ${context}`,
        },
      ],
      max_tokens: 150,
    });

    // Check if choices array exists and has at least one element
    if (
      response.choices &&
      response.choices.length > 0 &&
      response.choices[0].message.content
    ) {
      return response.choices[0].message.content.trim();
    } else {
      throw new Error("Invalid response structure from OpenAI API");
    }
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};
