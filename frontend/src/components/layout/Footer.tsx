import Link from 'next/link';
import { ExternalLink, Globe, Link as LinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background/95 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {currentYear} Smart Todo App. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="flex space-x-4">
          {/* Thay thế Github bằng ExternalLink hoặc Globe */}
          <Link href="https://github.com/your-username" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-5 w-5" /> {/* Hoặc Globe */}
              <span className="sr-only">Visit GitHub Profile</span>
            </Button>
          </Link>
          {/* Thay thế Linkedin bằng LinkIcon hoặc ExternalLink */}
          <Link href="https://linkedin.com/in/your-username" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <LinkIcon className="h-5 w-5" /> {/* Hoặc ExternalLink */}
              <span className="sr-only">Visit LinkedIn Profile</span>
            </Button>
          </Link>
          {/* Thay thế Twitter bằng ExternalLink hoặc Globe */}
          <Link href="https://twitter.com/your-username" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" /> {/* Hoặc ExternalLink */}
              <span className="sr-only">Visit X (Twitter) Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}