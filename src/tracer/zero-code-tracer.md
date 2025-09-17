# Zero-Code Auto-Instrumentation for `rest-api-nest-js`

Zero-code instrumentation allows enabling OpenTelemetry (OTel) **without changing application code**.  
It is injected into Node.js at runtime using the `--require` flag and configured via environment variables.  

---

## How It Works
- `NODE_OPTIONS` loads `@opentelemetry/auto-instrumentations-node/register` **before the NestJS app starts**.  
- All instrumentation logic is handled by the OTel SDK.  
- Exporters, resources, and instrumentations are configured entirely through **environment variables**.  

---

## Docker Compose Example
```yaml
rest-api-nest-js:
  build:
    context: ./
    dockerfile: Dockerfile
  ports:
    - "9014"
  environment:
    ENV: local
    DB_HOST: mariadb
    DB_PORT: 3306
    KAFKA_HOST: kafka
    KAFKA_PORT: 9092
    REDIS_HOST: redis
    REDIS_PORT: 6379

    # OpenTelemetry configs
    OTEL_LOG_LEVEL: debug
    OTEL_TRACES_EXPORTER: otlp
    OTEL_METRICS_EXPORTER: otlp
    OTEL_EXPORTER_OTLP_PROTOCOL: grpc
    OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: grpc
    OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: grpc
    OTEL_EXPORTER_OTLP_ENDPOINT: https://test:443
    OTEL_EXPORTER_OTLP_HEADERS: Authorization=Bearer <token>
    OTEL_SERVICE_NAME: rest-api-nest-js
    OTEL_RESOURCE_ATTRIBUTES: cx.application.name=rest-api-nest-js,service.namespace=default
    OTEL_METRIC_EXPORT_INTERVAL: 60000
    OTEL_METRIC_EXPORT_TIMEOUT: 30000
    OTEL_NODE_ENABLED_INSTRUMENTATIONS: http,express
    OTEL_NODE_RESOURCE_DETECTORS: env,host,os

    # Required for zero-code instrumentation
    NODE_OPTIONS: --require @opentelemetry/auto-instrumentations-node/register

---

## Pros

- ✅ Zero code changes needed

- ✅ Quick to enable in any environment

- ✅ Good for local/dev testing

## Cons

- ❌ Limited flexibility

- ❌ Cannot add custom spans or samplers

- ❌ Harder to integrate advanced exporters
