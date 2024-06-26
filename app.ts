// app.ts
import express, { Request, Response } from "express";
import {
  getAuthUrl,
  getToken,
  listMessages,
  setCredentials,
} from "./googleOAuth";
import { getEmailContext, generateResponse } from "./openAI";
import { sendEmail } from "./emailService";

const app = express();

app.get("/auth/google", (req: Request, res: Response) => {
  const url = getAuthUrl();
  res.redirect(url);
});

app.get("/auth/google/callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;
  try {
    const tokens = await getToken(code);
    // Handle successful token retrieval
    setCredentials(tokens);
    res.send(tokens);
  } catch (error) {
    // Handle error
    res.status(500).send("Error fetching access token");
  }
});

app.get("/emails", async (req: Request, res: Response) => {
  const messages = await listMessages();
  res.send(messages);
});

app.get("/process-emails", async (req: Request, res: Response) => {
  const messages = await listMessages();
  if (messages) {
    for (const message of messages) {
      const emailContent = message.snippet || "";
      const context = await getEmailContext(emailContent);
      const response = await generateResponse(context);
      await sendEmail(response);
    }
  }
  res.send("Emails processed and responses sent.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
