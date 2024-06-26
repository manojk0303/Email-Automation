// googleOAuth.ts
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
];
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";
const CLIENT_ID =
  "CLIENT_ID";
const CLIENT_SECRET = "CLIENT_SECRET_";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
};

export const getToken = async (code: string) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
};

export const setCredentials = (tokens: any) => {
  oauth2Client.setCredentials(tokens);
};

export const listMessages = async () => {
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });
  const res = await gmail.users.messages.list({ userId: "me" });
  return res.data.messages;
};
