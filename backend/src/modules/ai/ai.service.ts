import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from 'src/common/constant/app.constant';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  }

  async parseNaturalInput(text: string) {
        const res = await this.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
            { role: 'system', content: 'Bạn là AI parser, luôn trả về JSON hợp lệ.' },
            { role: 'user', content: `Phân tích nội dung sau thành JSON với các field: title, deadline (ISO8601), priority (LOW|MEDIUM|HIGH), description. Text: "${text}"` }
            ],
            response_format: { type: 'json_object' },
        });

        const content = res.choices[0].message?.content;
        if (!content) {
            throw new Error('AI không trả về dữ liệu hợp lệ');
        }
        return JSON.parse(content);
    }


  async rewriteTask(task: any) {
    const res = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Bạn là AI hỗ trợ viết lại task để rõ ràng và súc tích hơn.' },
        { role: 'user', content: `Viết lại task này: ${JSON.stringify(task)}` }
      ]
    });
    const content = res.choices[0].message?.content;
    if (!content) throw new Error('AI không trả về dữ liệu hợp lệ');
    return JSON.parse(content);
  }
}

