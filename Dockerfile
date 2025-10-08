FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --production

COPY src/ ./src/

COPY .env* ./

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN chown -R nextjs:nodejs /app

RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

USER nextjs

CMD ["npm", "start"]