import { FastMCP } from "fastmcp";
import { z } from "zod";
import axios from 'axios';
import { listDocuments, listControls } from './tools/vanta.js';

const server = new FastMCP({
  name: "Vante MCP",
  version: "1.0.0",
});

// Add listDocuments tool
server.addTool({
  name: "listDocuments",
  description: "List documents from Vanta",
  parameters: z.object({
    pageSize: z.string().optional().default("100"),
  }),
  execute: async (args) => {
    const data = {
      client_id: process.env.VANTA_CLIENT_ID,
      client_secret: process.env.VANTA_CLIENT_SECRET,
      scope: "vanta-api.all:read vanta-api.all:write",
      grant_type: "client_credentials"
    };

    try {
      const tokenResponse = await axios.post('https://api.vanta.com/oauth/token', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const accessToken = tokenResponse.data.access_token;
      return await listDocuments(accessToken, pageSize);
    } catch (error) {
      console.error('Error:', error);
      throw new Error(`Failed to list documents: ${error.message}`);
    }
  },
});

// Add listControls tool
server.addTool({
  name: "listControls",
  description: "List controls from Vanta",
  parameters: z.object({
    pageSize: z.string().optional().default("100"),
  }),
  execute: async (args) => {
    const data = {
      client_id: process.env.VANTA_CLIENT_ID,
      client_secret: process.env.VANTA_CLIENT_SECRET,
      scope: "vanta-api.all:read vanta-api.all:write",
      grant_type: "client_credentials"
    };

    try {
      const tokenResponse = await axios.post('https://api.vanta.com/oauth/token', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const accessToken = tokenResponse.data.access_token;
      return await listControls(accessToken, args.pageSize);
    } catch (error) {
      console.error('Error:', error);
      throw new Error(`Failed to list controls: ${error.message}`);
    }
  },
});

server.start({
  transportType: "stdio"
});