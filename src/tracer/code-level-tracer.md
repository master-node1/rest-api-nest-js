
---

## 📄 `code-level-instrumentation.md`

```markdown
# Code-Level Auto-Instrumentation for `rest-api-nest-js`

Code-level instrumentation provides **fine-grained control** over how OpenTelemetry (OTel) is configured in our NestJS service.  

Unlike zero-code, this approach **requires a small bootstrap file** in the project.

---

## How It Works
- A custom bootstrap file (`tracing.ts` or `tracing.js`) configures:
  - Exporters (Traces & Metrics)
  - Resource attributes
  - Samplers (e.g., CoralogixTransactionSampler)
  - Auto-instrumentations  
- This file is required **before NestJS starts**.  

---

## Example: `tracing.ts`

```typescript
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { AlwaysOnSampler } from '@opentelemetry/sdk-trace-base';
import { CoralogixTransactionSampler } from '@coralogix/opentelemetry';

const traceExporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT + '/v1/traces',
  headers: {
    Authorization: process.env.OTEL_EXPORTER_OTLP_HEADERS,
  },
  timeoutMillis: 15000,
});

const metricExporter = new OTLPMetricExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT + '/v1/metrics',
  headers: {
    Authorization: process.env.OTEL_EXPORTER_OTLP_HEADERS,
  },
  timeoutMillis: 15000,
});

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'rest-api-nest-js',
    'service.namespace': 'default',
  }),
  traceExporter,
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricExporter,
  }),
  sampler: new CoralogixTransactionSampler(new AlwaysOnSampler()),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false }, // Disabled due to high memory usage
    }),
  ],
});

sdk.start()
  .then(() => console.log('OpenTelemetry initialized'))
  .catch((error) => console.error('Error initializing OpenTelemetry', error));

process.on('SIGTERM', () => {
  sdk.shutdown().finally(() => process.exit(0));
});
