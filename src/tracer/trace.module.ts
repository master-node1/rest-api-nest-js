// src/tracing/tracing.module.ts
import { Module } from '@nestjs/common';
import { TracingService } from './trace.service';

@Module({
  providers: [TracingService],
  exports: [TracingService],
})
export class TracingModule {}
