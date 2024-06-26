// emailService.ts
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID =
  "CLIENT_ID";
const CLIENT_SECRET = "CLIENT_SECRET_";

const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export const sendEmail = async (emailContent: string) => {
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });
  const message = `From: "me"\r\nTo: "recipient@example.com"\r\nSubject: Response\r\n\r\n${emailContent}`;
  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });
};
