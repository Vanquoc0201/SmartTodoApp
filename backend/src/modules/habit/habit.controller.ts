import { Controller, Get, Req } from '@nestjs/common';
import { HabitService } from './habit.service';
import { TaskService } from '../task/task.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HabitAnalysisDto } from './dto/habit-analysis.dto';
import { TaskDto } from './dto/task.dto';
@ApiTags('Habit')
@Controller('Habit')
export class HabitController {
  constructor(
    private readonly habitService: HabitService,
    private readonly taskService: TaskService,
  ) {}

  @Get('analyze')
  @ApiBearerAuth('AccessToken')
  @ApiOkResponse({ type: HabitAnalysisDto })
  async analyze(@Req() req): Promise<HabitAnalysisDto> {
    const tasks: TaskDto[] = await this.taskService.findAll(req.user.id);
    const analysis = await this.habitService.analyzeTasks(tasks);
    await this.habitService.updateUserHabit(req.user.id, analysis);
    return analysis;
  }
}
