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
exports.generateResponse = exports.getEmailContext = void 0;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: "API KEY",
});
const getEmailContext = (emailContent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield openai.chat.completions.create({
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
        if (response.choices &&
            response.choices.length > 0 &&
            response.choices[0].message.content) {
            return response.choices[0].message.content.trim();
        }
        else {
            throw new Error("Invalid response structure from OpenAI API");
        }
    }
    catch (error) {
        console.error("Error retrieving email context:", error);
        throw error;
    }
});
exports.getEmailContext = getEmailContext;
const generateResponse = (context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield openai.chat.completions.create({
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
        if (response.choices &&
            response.choices.length > 0 &&
            response.choices[0].message.content) {
            return response.choices[0].message.content.trim();
        }
        else {
            throw new Error("Invalid response structure from OpenAI API");
        }
    }
    catch (error) {
        console.error("Error generating response:", error);
        throw error;
    }
});
exports.generateResponse = generateResponse;
