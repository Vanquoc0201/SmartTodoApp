import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [AiService,],
  exports: [AiService],
})
export class AiModule {}
