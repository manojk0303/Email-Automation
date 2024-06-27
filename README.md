## Email-Automation

### Overview

This project is a backend tool designed to interact with Google Gmail and Outlook email accounts. It uses OAuth for authentication, OpenAI for understanding email contexts and generating responses, and BullMQ for task scheduling. The primary functionalities include:

1. Connecting to Gmail and Outlook using OAuth.
2. Reading and parsing incoming emails.
3. Understanding the context of emails using OpenAI.
4. Categorizing emails based on their content.
5. Generating and sending appropriate automated responses.

### Prerequisites

To run this project, you will need:

- Node.js (v14 or later)
- npm (v6 or later)
- Google API credentials for OAuth
- OpenAI API key
- Outlook API credentials for OAuth

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Install dependencies:**

```sh
npm install
```
3. **Set up environment variables:**

Create a .env file in the root directory and add the following variables:

env
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

OUTLOOK_CLIENT_ID=your-outlook-client-id
OUTLOOK_CLIENT_SECRET=your-outlook-client-secret
OUTLOOK_REDIRECT_URI=http://localhost:3000/auth/outlook/callback

OPENAI_API_KEY=your-openai-api-key
```

### Usage

**Start the server:**
```sh
npm start
```
**OAuth Authentication:**

- Visit [http://localhost:3000/auth/google](http://localhost:3000/auth/google) to authenticate with Google.
- Visit [http://localhost:3000/auth/outlook](http://localhost:3000/auth/outlook) to authenticate with Outlook.

**API Endpoints:**

- **GET /emails:** List all emails.
- **GET /process-emails:** Process emails, understand their context, and send automated responses.

### Testing the Tool

1. **Connect email accounts:**

   Use the provided endpoints to connect both Google and Outlook email accounts via OAuth.

2. **Send test emails:**

   Send emails to the connected accounts from another account.

3. **Process and categorize emails:**

   Use the `/process-emails` endpoint to read incoming emails, categorize them based on the context, and send appropriate responses.

### Additional Notes

- **Error Handling:** Ensure to handle errors gracefully and log them for debugging purposes.
- **Security:** Do not expose sensitive information such as API keys in your code.

### License

This project is licensed under the MIT License.

