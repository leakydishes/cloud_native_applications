# Stage1: UI Build
FROM node:16-slim AS ui-build
WORKDIR /usr/src
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

# Stage2: API Build
FROM node:16-slim AS api-build
WORKDIR /usr/src
COPY backend/ ./backend/
RUN cd backend && npm install && ENVIRONMENT=production npm run build
RUN ls

# Stage3: Packagign the app
FROM node:16-slim
WORKDIR /root/
COPY --from=ui-build /usr/src/frontend/build ./ui/build
COPY --from=api-build /usr/src/backend/dist .
RUN ls

EXPOSE 80

CMD ["node", "api.bundle.js"]