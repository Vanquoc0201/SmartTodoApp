import { Controller, Get, Req } from '@nestjs/common';
import { HabitService } from './habit.service';
import { TaskService } from '../task/task.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('habit')
export class HabitController {
    constructor(private readonly habitService : HabitService, private readonly taskService: TaskService){}
    @Get('Analyze')
    @ApiBearerAuth('AccessToken')
    async analyze(@Req() req){
        const tasks = await this.taskService.findAll(req.user.id);
        const analysis = await this.habitService.analyzeTasks(tasks);
        await this.habitService.updateUserHabit(req.user.id, analysis);
        return analysis;
    }
}
