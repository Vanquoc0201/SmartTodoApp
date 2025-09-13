'use client';

import Link from 'next/link';
import { Lightbulb, Workflow, Brain, TrendingUp, MailCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-context'; 

export default function HomePage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, isLoading, router]);
  if (isLoading || isLoggedIn) {
    return (
      <div className="flex min-h-[calc(100vh-theme(spacing.16))] items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center p-4 md:p-8 lg:p-12">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center bg-gradient-to-br from-primary-foreground to-background rounded-lg shadow-xl mb-20 px-4">
        <div className="max-w-4xl z-10 space-y-6">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold tracking-wide text-primary rounded-full">
            NAVER AI Hackathon 2025 Submission
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
            Smart Todo App: <br /> Quản lý công việc thông minh với <span className="text-primary">AI-Core</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Vượt xa Todo thông thường. Ứng dụng cá nhân của bạn được hỗ trợ bởi AI để tối ưu lịch trình, cải thiện năng suất, và nhận nhắc việc tự động.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Bắt đầu ngay
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg font-semibold hover:bg-accent transition-all duration-300">
                Tìm hiểu thêm
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-dot-grid opacity-10" aria-hidden="true"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full max-w-6xl py-20 md:py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Tính năng độc đáo của Smart Todo App
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          Khám phá cách AI và các tính năng thông minh giúp bạn làm việc hiệu quả hơn mỗi ngày.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col items-center p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <Lightbulb className="h-12 w-12 text-primary mb-4 mx-auto" />
              <CardTitle className="text-2xl font-bold">Natural Input</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Gõ task bằng ngôn ngữ tự nhiên và để AI tự động phân tích tiêu đề, deadline, độ ưu tiên. Tiết kiệm thời gian nhập liệu.
              </CardDescription>
            </CardContent>
            <Badge className="mt-auto bg-primary-foreground text-primary hover:bg-primary/10">Smart Feature</Badge>
          </Card>

          <Card className="flex flex-col items-center p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <Workflow className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
              <CardTitle className="text-2xl font-bold">AI Planner Chủ động</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                AI không chỉ gợi ý mà còn tự động sắp xếp lại các task chưa hoàn thành từ hôm trước vào lịch trình mới, tối ưu hóa theo thói quen và deadline của bạn.
              </CardDescription>
            </CardContent>
            <Badge className="mt-auto bg-blue-100 text-blue-800 hover:bg-blue-100/80">AI-Core</Badge>
          </Card>

          <Card className="flex flex-col items-center p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 text-green-500 mb-4 mx-auto" />
              <CardTitle className="text-2xl font-bold">Habit Insight</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Phân tích dữ liệu hoàn thành task để tìm ra giờ và ngày làm việc hiệu quả nhất của bạn, đưa ra gợi ý giúp bạn đặt task vào thời điểm tối ưu.
              </CardDescription>
            </CardContent>
            <Badge className="mt-auto bg-green-100 text-green-800 hover:bg-green-100/80">AI-Core</Badge>
          </Card>

          <Card className="flex flex-col items-center p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 text-purple-500 mb-4 mx-auto" />
              <CardTitle className="text-2xl font-bold">Motivation & Rewriting</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Nhận những lời động viên cá nhân hóa từ AI và các đề xuất viết lại task để chúng rõ ràng, dễ hành động hơn, thúc đẩy bạn hoàn thành mục tiêu.
              </CardDescription>
            </CardContent>
            <Badge className="mt-auto bg-purple-100 text-purple-800 hover:bg-purple-100/80">AI-Core</Badge>
          </Card>

          <Card className="flex flex-col items-center p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <MailCheck className="h-12 w-12 text-yellow-500 mb-4 mx-auto" />
              <CardTitle className="text-2xl font-bold">Daily Email Reminder</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Nhận tóm tắt task chưa hoàn thành và động lực từ AI trực tiếp qua email mỗi sáng mà không cần mở ứng dụng. Trợ lý cá nhân của bạn luôn sẵn sàng.
              </CardDescription>
            </CardContent>
            <Badge className="mt-auto bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80">Bonus Feature</Badge>
          </Card>

           <Card className="flex flex-col items-center justify-center p-6 text-center bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-full lg:col-span-1">
            <CardHeader className="p-0 mb-4 text-center">
              <CardTitle className="text-3xl font-bold">Sẵn sàng trải nghiệm?</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mb-6">
              <CardDescription className="text-lg text-primary-foreground/90">
                Hãy biến cách bạn quản lý công việc trở nên thông minh hơn.
              </CardDescription>
            </CardContent>
            <Link href="/register" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="px-8 py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                Đăng ký ngay
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Separator className="my-16 w-full max-w-md" />

      <section className="w-full max-w-3xl text-center py-20 md:py-24">
        <p className="text-xl md:text-2xl italic text-muted-foreground">
          &quot;Smart Todo App đã thay đổi cách tôi làm việc. AI Planner thực sự là một cứu cánh để tôi không bao giờ bỏ lỡ deadline.&quot;
        </p>
        <p className="mt-4 text-lg font-semibold text-foreground">
          — Một người dùng hài lòng
        </p>
      </section>
    </div>
  );
}