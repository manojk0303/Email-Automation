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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const googleOAuth_1 = require("./googleOAuth");
const openAI_1 = require("./openAI");
const emailService_1 = require("./emailService");
const app = (0, express_1.default)();
app.get("/auth/google", (req, res) => {
    const url = (0, googleOAuth_1.getAuthUrl)();
    res.redirect(url);
});
app.get("/auth/google/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        const tokens = yield (0, googleOAuth_1.getToken)(code);
        // Handle successful token retrieval
        (0, googleOAuth_1.setCredentials)(tokens);
        res.send(tokens);
    }
    catch (error) {
        // Handle error
        res.status(500).send("Error fetching access token");
    }
}));
app.get("/emails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield (0, googleOAuth_1.listMessages)();
    res.send(messages);
}));
app.get("/process-emails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield (0, googleOAuth_1.listMessages)();
    if (messages) {
        for (const message of messages) {
            const emailContent = message.snippet || "";
            const context = yield (0, openAI_1.getEmailContext)(emailContent);
            const response = yield (0, openAI_1.generateResponse)(context);
            yield (0, emailService_1.sendEmail)(response);
        }
    }
    res.send("Emails processed and responses sent.");
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
