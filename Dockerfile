# Build stage
FROM node:20-slim AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY .api/ ./.api/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Production stage
FROM node:20-slim

# Create non-root user
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs

# Create app directory
WORKDIR /usr/src/app

# Copy from builder
COPY --from=builder /usr/src/app .

# Set ownership
RUN chown -R nodejs:nodejs /usr/src/app

# Switch to non-root user
USER nodejs

# Set environment variables
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the MCP server
CMD [ "node", "src/mcp-server.js" ] 