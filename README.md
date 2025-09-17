# rest-api-nest-js

A RESTful API service built using NestJS and TypeScript.

## Overview

This repository provides a modular and scalable REST API boilerplate using [NestJS](https://nestjs.com/). It is designed for rapid development of robust server-side applications and supports advanced features such as observability and distributed tracing.

---

## Table of Contents

- [Features](#features)
- [Running Locally](#running-locally)
- [Running with Docker](#running-with-docker)
- [Tracing & Observability](#tracing--observability)
  - [Auto Instrumentation](#auto-instrumentation)
  - [Manual Code Instrumentation](#manual-code-instrumentation)
- [License](#license)

---

## Features

- Built with TypeScript and NestJS
- Modular structure for scalability
- RESTful API design
- Ready for Docker containerization
- Tracing and observability support (auto + manual modes)
- MIT License

---

## Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/master-node1/rest-api-nest-js.git
   cd rest-api-nest-js
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
3. **Copy `.env.example` to `.env` and configure values as needed.**

4. **Run the application:**
   ```bash
   npm run start:dev
   ```
   The service will be available at `http://localhost:3000`.

---

## Running with Docker

1. **Build the Docker image:**
   ```bash
   docker build -t rest-api-nest-js .
   ```

2. **Run the container:**
   ```bash
   docker run --env-file .env -p 3000:3000 rest-api-nest-js
   ```

   Or, using docker-compose (if a `docker-compose.yml` file is provided):
   ```bash
   docker-compose up --build
   ```

---

## Tracing & Observability

This service supports distributed tracing for better observability. You can instrument tracing in two ways:

### Auto Instrumentation

- **Setup:** 
  - Use a tracing agent (e.g., OpenTelemetry, Jaeger, or Zipkin) and configure environment variables in `.env` to enable auto instrumentation.
  - Make sure the tracing SDK or agent is installed and initialized before the NestJS app starts.

- **Sample configuration in `.env`:**
  ```
    OTEL_SERVICE_NAME: rest-api-nest-js
    OTEL_RESOURCE_ATTRIBUTES: cx.application.name=rest-api-nest-js,service.namespace=default
    OTEL_LOG_LEVEL: debug
    OTEL_TRACES_EXPORTER: otlp
    OTEL_METRICS_EXPORTER: otlp
    OTEL_EXPORTER_OTLP_ENDPOINT: http://otel-collector:4317   # or your SaaS
    OTEL_EXPORTER_OTLP_PROTOCOL: grpc
    OTEL_EXPORTER_OTLP_HEADERS: Authorization=Bearer 1bXXX5-XXX-5XXX-XXX-7XXXXXXXXX
    OTEL_METRIC_EXPORT_INTERVAL: 60000
    OTEL_METRIC_EXPORT_TIMEOUT: 30000
    OTEL_NODE_ENABLED_INSTRUMENTATIONS: http,express
    OTEL_NODE_RESOURCE_DETECTORS: env,host,os
  ```
- **Behavior:** 
  - HTTP requests, database calls, and common NestJS lifecycle events are automatically traced and exported to your configured backend.

### Manual Code Instrumentation

- **Setup:** 
  - Import tracing libraries (e.g., OpenTelemetry API) in your services or controllers.
  - Use manual span creation to trace critical or custom code sections.

- **Sample usage:**
  ```
    // src/tracing/tracing.service.ts
  ```

---

## License

This project is licensed under the [MIT License](LICENSE).
