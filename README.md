# Vanta MCP Server

A server that integrates with the Vanta API to manage and monitor security compliance.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   VANTA_CLIENT_ID=your_client_id
   VANTA_CLIENT_SECRET=your_client_secret
   VANTA_API_URL=https://api.vanta.com
   ```

## Running the Server

Start the server:
```bash
npm start
```

The server will run on port 3000 by default.

## Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate test coverage report:
```bash
npm run test:coverage
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /test-auth` - Test Vanta API authentication

## Environment Variables

- `VANTA_CLIENT_ID` - Your Vanta API client ID
- `VANTA_CLIENT_SECRET` - Your Vanta API client secret
- `VANTA_API_URL` - Vanta API base URL
- `PORT` - Server port (optional, defaults to 3000)