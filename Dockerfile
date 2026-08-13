# Production Dockerfile for OpportunityOS on Google Cloud Run
FROM node:20-slim AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install build dependencies
RUN npm install

# Copy application source
COPY . .

# Build application bundle (Vite SPA + esbuild server.cjs)
ENV NODE_ENV=production
RUN npm run build

# Production runtime stage
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package manifests and install runtime dependencies
COPY package*.json ./
RUN npm install --only=production --ignore-scripts

# Copy built distribution artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Expose default application port
EXPOSE 3000

# Launch compiled CommonJS production server
CMD ["node", "dist/server.cjs"]
