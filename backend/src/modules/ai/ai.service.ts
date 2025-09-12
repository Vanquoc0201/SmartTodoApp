import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from 'src/common/constant/app.constant';

function extractJson(content: string): any {
  const cleaned = content
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error('Gemini trả về dữ liệu không phải JSON hợp lệ: ' + cleaned);
  }
}

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
  }

  async parseNaturalInput(text: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
    Bạn là AI parser, luôn trả về JSON hợp lệ.
    Phân tích nội dung sau thành JSON với các field: 
    { "title": string, "deadline": ISO8601, "priority": "LOW"|"MEDIUM"|"HIGH", "description": string }
    Text: "${text}"
    `;

    const res = await model.generateContent(prompt);
    return extractJson(res.response.text());
  }

  // 🟢 Rewrite nhiều task
  async rewriteTasks(tasks: any[]) {
    if (!tasks.length) return [];

    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
    Bạn là AI hỗ trợ viết lại danh sách task để rõ ràng và súc tích hơn.
    Luôn trả về JSON hợp lệ.
    Viết lại toàn bộ danh sách task này thành JSON array. 
    Mỗi task có các field: { "title": string, "description": string }.
    Tasks: ${JSON.stringify(tasks)}
    `;

    const res = await model.generateContent(prompt);
    return extractJson(res.response.text());
  }

  // 🟢 Sinh câu động viên
  async generateMotivation(params: {
    completedTasks: number;
    upcomingTasks: number;
    overdueTasks: number;
  }): Promise<string> {
    const { completedTasks, upcomingTasks, overdueTasks } = params;

    const prompt = `
    Bạn là trợ lý AI giúp động viên người dùng.
    Thông tin:
    - Số task hoàn thành hôm qua: ${completedTasks}
    - Task sắp tới hôm nay: ${upcomingTasks}
    - Task bị quá hạn: ${overdueTasks}

    Viết 1 câu động viên ngắn (1-2 câu, tiếng Việt, vui tươi, khích lệ).
    `;

    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const res = await model.generateContent(prompt);
    return res.response.text().trim() || 'Hôm nay hãy làm việc thật năng suất nhé!';
  }

  // 🟢 Sinh summary ngắn gọn
  async generateSummary(plan: { taskId: string; suggestedStart: Date; suggestedEnd: Date; reason: string }[]): Promise<string> {
    if (!plan.length) {
      return 'Hôm nay bạn không có task nào cần làm. Hãy tận hưởng ngày của mình nhé! 🎉';
    }
    const taskTitles = plan.map(t => `• ${t.reason}`).join('\n');
    return `Hôm nay bạn có ${plan.length} task. Ưu tiên chính: \n${taskTitles}`;
  }
}
