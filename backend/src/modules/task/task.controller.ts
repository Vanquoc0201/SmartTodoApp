import { Controller, Get, Post, Body, Patch, Param, Delete,  Req } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { AiService } from '../ai/ai.service';
import { CreateTaskInsightDto } from './dto/create-insight.dto';
import { TaskDto } from '../habit/dto/task.dto';

@ApiTags('Tasks')
@Controller('Tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService, private readonly aiService : AiService) {}

  @Post("CreateTask")
  @ApiBearerAuth('AccessToken')
  create(@Req() req, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(req.user.id, dto);
  }

  @Get('GetAllTask')
  @ApiBearerAuth('AccessToken')
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get('GetTaskDetail/:id')
  @ApiBearerAuth('AccessToken')
  findOne(@Req() req, @Param('id') id: string) {
    return this.tasksService.findOne(req.user.id, id);
  }

  @Patch('UpdateTask/:id')
  @ApiBearerAuth('AccessToken')
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(req.user.id, id, dto);
  }

  @Delete('DeleteTask/:id')
  @ApiBearerAuth('AccessToken')
  remove(@Req() req, @Param('id') id: string) {
    return this.tasksService.remove(req.user.id, id);
  }

  @Post('Natural')
  @ApiBearerAuth('AccessToken')
  async createFromNatural(@Req() req, @Body() body: {text: string}){
    const parsed = await this.aiService.parseNaturalInput(body.text);
    return this.tasksService.create(req.user.id, parsed)
  }

  @Post(':id/rewrite')
  @ApiBearerAuth('AccessToken')
  async rewriteTask(@Req() req, @Param('id') id: string){
    const task: TaskDto = await this.tasksService.findOne(req.user.id, id);
    const rewritten: CreateTaskInsightDto = await this.aiService.rewriteTasks([task]);
    await this.tasksService.saveInsight(id, req.user.id, rewritten);
    return rewritten;
  }
}
