import { Controller, Get, Req } from '@nestjs/common';
import { PlannerService } from './planner.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('Planner')
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Get('Daily-plan')
  @ApiBearerAuth('AccessToken')
  async getDailyPlan(@Req() req) {
    return this.plannerService.generateDailyPlan(req.user.id);
  }
}