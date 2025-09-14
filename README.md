# 🚀 Smart Todo App - Smart Task Management with AI
---

## 🚀 Project Setup & Usage

### How to install and run your project:

✍️ This project consists of a Next.js frontend and a NestJS backend. Please follow the instructions below to set up and run both parts.

**Project Structure:**
SmartTodoApp/
├── backend/
└── frontend/

**Requirements:**

*   Node.js (v18 or higher)
*   npm or Yarn
*   A Supabase account (for PostgreSQL Database)
*   A Google Gemini API Key
*   An API Key for an email service (e.g., SendGrid, Resend, or a Gmail App Password)

#### **1. Backend Setup (`backend/`)**

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in the root of the `backend` directory and populate it with your credentials:
    ```env
    # Server
    PORT=3000  # Cổng chạy server, ví dụ 3000

    # Database (Supabase / PostgreSQL)
    DATABASE_URL="postgresql://postgres:<YOUR_SUPABASE_PASSWORD>@db.<YOUR_SUPABASE_REF>.supabase.co:5432/postgres"

    # JWT Authentication
    ACCESS_TOKEN_SECRET="<YOUR_SUPER_SECRET_KEY_FOR_ACCESS_TOKEN>"       # Chuỗi dài, ngẫu nhiên
    ACCESS_TOKEN_EXPIRES="15m"                                          # Ví dụ: 15m, 1h
    REFRESH_TOKEN_SECRET="<YOUR_SUPER_SECRET_KEY_FOR_REFRESH_TOKEN>"     # Chuỗi dài, ngẫu nhiên
    REFRESH_TOKEN_EXPIRES="7d"                                          # Ví dụ: 7d, 30d

    # OpenAI / Gemini API
    OPENAI_API_KEY="<YOUR_OPENAI_API_KEY>"
    GEMINI_API_KEY="<YOUR_GOOGLE_GEMINI_API_KEY>"

    # Email Configuration (Nodemailer)
    SENDER_EMAIL="your_email@example.com"     # Email gửi mail
    SENDER_PASSWORD="<YOUR_EMAIL_APP_PASSWORD_OR_API_KEY>" # Nếu Gmail, sử dụng App Password

    ```
4.  **Update Prisma Schema & Run Migrations:**
    Copy the complete Database Schema from the "Database Schema" section of this README into your `prisma/schema.prisma` file. Then, run the following commands:
    ```bash
    npx prisma migrate dev 
    npx prisma generate
    ```
5.  **Start the Backend Server:**
    ```bash
    npm run start:dev
    ```
    The backend will typically run on `http://localhost:3069` (or your configured port). The Swagger UI will be available at `http://localhost:3069/api-docs`.

#### **2. Frontend Setup (`frontend/`)**

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```
    Ensure you have installed libraries like `lucide-react`, `sonner`, `react-hook-form`, `@hookform/resolvers`, `zod`, `date-fns`.
3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of the `smart-todo-frontend` directory and add:
    ```env
    # Domain của backend (URL backend đã deploy)
    NEXT_PUBLIC_DOMAIN="<YOUR_BACKEND_URL>"

    # Tên các module của ứng dụng
    NEXT_PUBLIC_MODULEAUTH="Auth"
    NEXT_PUBLIC_MODULEUSER="User"
    NEXT_PUBLIC_MODULETASK="Tasks"

    # URL base của API
    NEXT_PUBLIC_API_BASE_URL="<YOUR_BACKEND_API_URL>"  
    # Ví dụ khi chạy local: "http://localhost:3001/api"
    # Ví dụ khi deploy: "https://be-smarttodoapp.onrender.com/api"

    ```
4.  **Start the Frontend Development Server:**
    ```bash
    npm run dev
    ```
    The frontend will typically run on `http://localhost:3000`.

---

### 🔗 Deployed Web URL or APK file

✍️ **[Paste your Frontend deployment link here, e.g., on Vercel]**

---

### 🎥 Demo Video

Demo video link (≤ 2 minutes):
📌 Video Upload Guideline: when uploading your demo video to YouTube, please set the visibility to Unlisted.
“Unlisted” videos can only be viewed by users who have the link.
The video will not appear in search results or on your channel.
Share the link in your README so mentors can access it.

✍️ **[Paste your YouTube Unlisted video link here]**

---

## 💻 Project Introduction

### a. Overview

✍️ The **Smart Todo App** is an advanced personal task management tool that goes beyond traditional Todo applications. It not only helps users create and track daily tasks but is also powerfully augmented by cutting-edge **Smart Features** and **AI-Core** capabilities.

**Objective:** To deliver an intelligent, personalized task management experience that saves users time, optimizes their schedules, and boosts productivity. The application acts as a proactive personal assistant, offering support without requiring constant user interaction.

### b. Key Features & Function Manual

✍️ The Smart Todo App offers a comprehensive set of features, with a strong focus on AI integration to streamline the workflow:

1.  **CRUD Task Management:**
    *   **Create / Edit / Delete / Mark Complete:** Flexible management of tasks.
    *   **Detailed Task Management:** Add deadlines, priority levels (High, Medium, Low), categorize tasks with tags, and estimate task durations.

2.  **Authentication & User Profile:**
    *   **Register / Login:** Secure user authentication via email and password, ensuring data synchronization across devices.
    *   **User Profile Management:** Allows users to update their personal information.

3.  **Smart Feature: Natural Input:**
    *   **Natural Language Task Creation:** Users can simply type a task description in natural language (e.g., "Write a marketing project report by next Friday, high priority."), and the AI system will automatically parse and extract the `title`, `deadline`, `priority`, `description`, and `tags` to create the task. This significantly reduces manual data entry.

4.  **AI-Core Features:**
    *   **Proactive AI Planner:** More than just suggestions, the AI will automatically analyze incomplete tasks from previous days/weeks, seamlessly integrating them into the next day's/week's schedule and reorganizing them optimally based on priority, deadlines, and the user's working habits.
    *   **Task Rewriting:** The AI suggests improved titles and descriptions for tasks, making them clearer, more concise, and actionable, thereby helping users execute tasks more effectively.
    *   **Personalized Motivation:** After user interaction (e.g., completing a task), the AI generates short, positive, and personalized motivational messages based on individual progress and recent achievements.
    *   **Habit Insight:** Analyzes historical task completion data to identify the user's "golden hours" and "most productive days." The AI then suggests optimal times for setting new tasks, maximizing efficiency.

5.  **Daily Email Reminder (Bonus “Wow Factor”):**
    *   **Automated Daily Emails:** An email is sent to the user every morning, summarizing incomplete tasks from the previous day and important upcoming tasks, coupled with an AI-generated overall summary of their workload and personalized AI motivation.
    *   **Personalized Assistant via Email:** Users receive continuous value and reminders without needing to open the app, transforming the Smart Todo App into a truly proactive personal assistant.

### c. Unique Features (What’s special about this app?)

✍️ The Smart Todo App distinctly differentiates itself from conventional Todo apps and calendars through the following key aspects:

*   **Effortless Natural Language Input:** The `Natural Input` interface allows users to simply write natural sentences, and the app intelligently understands and saves tasks with all relevant details, significantly minimizing manual effort.
*   **AI-Core in Action:** Our AI extends beyond mere analysis; it proactively enhances task descriptions (`Task Rewriting`), recommends optimal execution order (`Proactive AI Planner`), and delivers personalized encouragement (`Personalized Motivation`).
*   **Actionable Habit Insight & Smart Prioritization:** The application doesn't just display data; it learns from user behavior to suggest concrete improvements in scheduling and task prioritization, genuinely boosting productivity.
*   **Daily Email Reminder as a "Personal Assistant":** This feature is a significant "Wow Factor," providing a personalized, AI-enhanced "status report" directly via email, ensuring users receive continuous value without needing to actively engage with the app.
*   **Lightweight, Deployable, and Differentiated:** The project is designed for rapid development in a hackathon environment, focusing on core differentiation through AI rather than just basic CRUD functionalities with a fancy UI.

### d. Technology Stack and Implementation Methods

✍️ We have selected a modern and robust technology stack to ensure performance and scalability:

*   **Frontend:** `Next.js` (App Router) + `React.js` + `TailwindCSS`.
    *   `Shadcn UI`: For building beautiful and highly customizable UI components.
    *   `react-hook-form` & `Zod`: For robust form management and validation.
    *   `Axios`: For efficient API calls to the Backend.
    *   `Sonner`: For stylish and informative toast notifications.
    *   `lucide-react`: A modern icon library.
*   **Backend:** `NestJS` (Node.js) + `Prisma ORM`.
    *   `Prisma Client`: For safe and efficient database interactions.
    *   `Passport.js` & `JWT`: For user authentication.
    *   `class-validator` & `class-transformer`: For DTO validation.
*   **Database:** `Supabase` (PostgreSQL).
*   **AI-Core / AI-lite API:** `Google Gemini API` (gemini-1.5-flash) - utilized for Natural Input, Task Rewriting, Motivation, and Summary generation.
*   **Email Service:** `Nodemailer` - for sending the Daily Email Reminders.
*   **Scheduler:** `NestJS Cron` (planned for implementation) - for scheduling daily email reminders and periodic habit analysis.
*   **Deployment (Planned):**
    *   **Frontend:** `Vercel`.
    *   **Backend:** `Render` / `Fly.io`.
    *   **Database:** `Supabase Cloud`.

### e. Service Architecture & Database structure (when used)

✍️ **Service Architecture:**
Frontend (Next.js) ↔ Backend API (NestJS) ↔ Supabase DB
↔ Google Gemini API
↔ Email Service (Nodemailer)
The Frontend communicates with the Backend via RESTful APIs. The Backend acts as the central orchestrator, handling business logic, interacting with the database, invoking the Google Gemini API for AI features, and sending emails through Nodemailer.
🧠 Reflection
a. If you had more time, what would you expand?
✍️ Given more time, we would expand the project in the following directions to enhance its value and user experience:
Mobile App Development: Develop native mobile applications (React Native / Flutter) to provide a seamless task management experience on smartphones.
Team Collaboration Features: Integrate functionalities such as task sharing, assignment management between team members, and an in-app chat for enhanced teamwork.
Gamification: Incorporate game-like elements such as badges, reward points for task completion, or leaderboards to boost user motivation and engagement.
Advanced AI Planner: Elevate the AI Planner's capabilities to automatically generate detailed weekly/monthly schedules, potentially suggesting optimal timetables for specific projects or long-term goals.
AI Task Breakdowns: When a large task is entered, the AI could automatically suggest smaller, manageable sub-tasks to simplify execution and tracking.
b. If you integrate AI APIs more for your app, what would you do?
✍️ With the vast potential of AI, we would further integrate AI APIs to transform the Smart Todo App into a hyper-intelligent personal assistant:
Advanced AI Task Suggestion: Based on completed tasks, habits, and the user's overall goals, the AI would proactively suggest new tasks or related activities to optimize work progress or learning.
AI Chat Assistant: Enable users to interact with the application through a natural language chat interface to manage tasks, ask questions, and receive dynamic reminders (e.g., "Hey AI, remind me about the meeting at 2 PM" or "Tell me the 3 most important tasks for today").
AI Optimization for Workload Balancing: Analyze the user's current workload, anticipate potential overload, and suggest ways to balance tasks to prevent stress and maintain sustainable productivity.
AI Contextual Reminders: Implement smarter reminders that are not just time-based but also context-aware (e.g., "Remind me to buy milk when I leave the office" - integrating with location services).
Sentiment Analysis & Proactive Support: Analyze user sentiment through their task interactions or notes. If signs of stress or procrastination are detected, the AI could offer tailored advice or suggestions.