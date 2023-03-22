FROM node:16 AS test-stage

WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN CI=true npm run test

FROM test-stage as build-stage
WORKDIR /usr/src/app
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
RUN npm run build
# RUN npm install -g serve
# CMD [ "serve", "build" ]

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
EXPOSE 80