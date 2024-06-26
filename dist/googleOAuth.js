"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMessages = exports.setCredentials = exports.getToken = exports.getAuthUrl = void 0;
// googleOAuth.ts
const googleapis_1 = require("googleapis");
const SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
];
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";
const CLIENT_ID = "CLIENT_ID";
const CLIENT_SECRET = "CLIENT_SECRET_";
const oauth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const getAuthUrl = () => {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
};
exports.getAuthUrl = getAuthUrl;
const getToken = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokens } = yield oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        return tokens;
    }
    catch (error) {
        console.error("Error fetching access token:", error);
        throw error;
    }
});
exports.getToken = getToken;
const setCredentials = (tokens) => {
    oauth2Client.setCredentials(tokens);
};
exports.setCredentials = setCredentials;
const listMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    const gmail = googleapis_1.google.gmail({ version: "v1", auth: oauth2Client });
    const res = yield gmail.users.messages.list({ userId: "me" });
    return res.data.messages;
});
exports.listMessages = listMessages;
