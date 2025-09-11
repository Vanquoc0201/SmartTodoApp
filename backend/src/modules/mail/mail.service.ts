import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { SENDER_EMAIL, SENDER_PASSWORD } from 'src/common/constant/app.constant';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
});

@Injectable()
export class MailService {
  async sendDailyReminder(user : any, tasks: any[], aiSummary: string, aiMotivation: string) {
    const tasksHtml = tasks.map(
      (task, index) => `<li>${index + 1}. ${task.title} - ${task.description || ''}</li>`
    ).join('');

    const htmlBody = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #333333; text-align: center;">Hello ${user.name},</h2>
        <p style="color: #555555; font-size: 16px;">Đây là nhắc nhở <strong>Task hôm nay</strong> của bạn:</p>
        
        <ul style="list-style-type: none; padding: 0;">
            ${tasks.map((task, index) => `
            <li style="background-color: #f0f8ff; margin-bottom: 10px; padding: 15px; border-left: 5px solid #4CAF50; border-radius: 5px;">
                <strong>${index + 1}. ${task.title}</strong><br/>
                <span style="color: #666666; font-size: 14px;">${task.description || ''}</span>
            </li>
            `).join('')}
        </ul>

        <div style="margin-top: 20px; padding: 15px; background-color: #e8f5e9; border-left: 5px solid #81C784; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #2E7D32;">AI Summary:</h3>
            <p style="color: #555555; font-size: 15px;">${aiSummary}</p>
        </div>

        <div style="margin-top: 15px; padding: 15px; background-color: #fff3e0; border-left: 5px solid #FFA726; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #EF6C00;">AI Motivation:</h3>
            <p style="color: #555555; font-size: 15px;">${aiMotivation}</p>
        </div>

        <p style="text-align: center; margin-top: 30px; font-size: 16px; color: #333333;">
            Chúc bạn một ngày làm việc hiệu quả! 💪
        </p>

        <div style="text-align: center; margin-top: 20px;">
            <a href="https://your-smart-todo-app.com" style="background-color: #4CAF50; color: #ffffff; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">Xem Todo của bạn</a>
        </div>
        </div>
    </div>
    `;


    try {
      const info = await transporter.sendMail({
        from: SENDER_EMAIL,
        to: user.email,
        subject: `Daily Reminder: Your Smart Todo Update for ${new Date().toLocaleDateString()}`,
        html: htmlBody,
      });
      console.log('Email sent:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending daily reminder:', error);
      throw error;
    }
  }
}
