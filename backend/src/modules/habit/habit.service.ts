import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HabitService {
    constructor(private readonly prisma : PrismaService){}
    async analyzeTasks(tasks : any[]){
        if(!tasks || tasks.length === 0) return { message: 'No tasks to analyze' };
        const total = tasks.length;
        const completedTasks = tasks.filter(t => t.status === 'COMPLETED');
        const percentCompleted = (completedTasks.length / total) * 100;

        const hoursCount: Record<number, number> = {};
        completedTasks.forEach(task => {
            if (task.completed_at) {
                const hour = new Date(task.completed_at).getHours();
                hoursCount[hour] = (hoursCount[hour] || 0) + 1;
            }
        });
        let mostActiveHour : number | null = null ;
        let maxHourCount = 0;
        for (const hour in hoursCount) {
            if (hoursCount[hour] > maxHourCount) {
                maxHourCount = hoursCount[hour];
                mostActiveHour = parseInt(hour);
            }
        }
        const daysCount: Record<number, number> = {};
        completedTasks.forEach(task => {
            if (task.completed_at) {
                const day = new Date(task.completed_at).getDay();
                daysCount[day] = (daysCount[day] || 0) + 1;
            }
        });
        let mostActiveDay: number | null = null;
        let maxDayCount = 0;
        for (const day in daysCount) {
            if (daysCount[day] > maxDayCount) {
                maxDayCount = daysCount[day];
                mostActiveDay = parseInt(day);
            }
        }
         return {
            totalTasks: total,
            completedTasks: completedTasks.length,
            percentCompleted,
            mostActiveHour,
            mostActiveDay,
            tasksPerHour: hoursCount,
            tasksPerDay: daysCount,
        };
    }
    async updateUserHabit(userId : string, data : any){
        return this.prisma.habits.upsert({
            where: { user_id: userId },
            update: {
                most_active_hour_of_day: data.mostActiveHour,
                most_active_day_of_week: data.mostActiveDay,
                completion_rate: data.percentCompleted,
                last_analyzed_at: new Date(),
            },
            create: {
                user_id: userId,
                most_active_hour_of_day: data.mostActiveHour,
                most_active_day_of_week: data.mostActiveDay,
                completion_rate: data.percentCompleted,
            },
        });
    }
}
