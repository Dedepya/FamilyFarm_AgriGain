# Backend Proxy for Gemini API

This Express server acts as a secure proxy for Gemini API requests, so your API key is never exposed to the frontend or users.

## Setup

1. Copy `.env.example` to `.env` and add your real Gemini API key:
   ```sh
   cp .env.example .env
   # Edit .env and set GEMINI_API_KEY=your_real_key
   ```
2. Install dependencies:
   ```sh
   npm install express axios cors dotenv
   ```
3. Start the server:
   ```sh
   node index.js
   ```

## Usage
- Make POST requests to `/api/gemini` with `{ prompt: "your prompt" }` in the body.
- The server will forward the request to Gemini API and return the response.

## Security
- Never commit your real `.env` file.
- Only deploy this backend to trusted environments.
