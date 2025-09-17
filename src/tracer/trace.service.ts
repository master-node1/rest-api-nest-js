// src/tracing/tracing.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { CoralogixTransactionSampler } from '@coralogix/opentelemetry';
import { AlwaysOnSampler } from '@opentelemetry/sdk-trace-base';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

@Injectable()
export class TracingService implements OnModuleInit, OnModuleDestroy {
  private sdk: NodeSDK;

  async onModuleInit() {
    // diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

    const serviceName = 'nest js rest api';

    const exportMetricConfig = {
      timeoutMillis: 15000,
      url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/metrics`,
      headers: {
        Authorization: `Bearer ${process.env.OTEL_EXPORTER_OTLP_TOKEN}`,
      },
    };
    const metricExporter = new OTLPMetricExporter(exportMetricConfig);

    const exportTraceConfig = {
      timeoutMillis: 15000,
      url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`,
      headers: {
        Authorization: `Bearer ${process.env.OTEL_EXPORTER_OTLP_TOKEN}`,
      },
    };
    const traceExporter = new OTLPTraceExporter(exportTraceConfig);

    const resource = resourceFromAttributes({
      [ATTR_SERVICE_NAME]: serviceName,
      'cx.application.name': 'dazn-cape-stage-us-east-1-stage',
      'cx.subsystem.name': serviceName,
    });

    this.sdk = new NodeSDK({
      resource,
      traceExporter,
      metricReader: new PeriodicExportingMetricReader({
        exporter: metricExporter,
      }),
      sampler: new CoralogixTransactionSampler(new AlwaysOnSampler()),
      instrumentations: [
        getNodeAutoInstrumentations({
          '@opentelemetry/instrumentation-fs': { enabled: false },
        }),
      ],
    });

    await this.sdk.start();
    console.log('Tracing and metrics initialized');
  }

  async onModuleDestroy() {
    if (this.sdk) {
      await this.sdk.shutdown();
      console.log('Tracing and metrics terminated successfully');
    }
  }
}
