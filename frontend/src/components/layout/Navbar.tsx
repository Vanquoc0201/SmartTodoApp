'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Lightbulb, Settings, User, LogOut, Menu } from 'lucide-react';

import { ModeToggle } from '@/components/theme/modetoggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth-context';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 md:flex">
          <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
            <Lightbulb className="h-6 w-6 text-primary" />
            <span>Smart Todo App</span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
          {isLoggedIn ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-foreground ${
                    pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`transition-colors hover:text-foreground ${
                  pathname === '/login' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`transition-colors hover:text-foreground ${
                  pathname === '/register' ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                Register
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4 md:space-x-6 ml-auto">
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <ModeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-3/4">
              <Link href="/" className="mb-6 flex items-center space-x-2 text-lg font-bold">
                <Lightbulb className="h-6 w-6 text-primary" />
                <span>Smart Todo App</span>
              </Link>
              <nav className="flex flex-col gap-4 py-6 text-sm font-medium">
                {isLoggedIn ? (
                  <>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                          pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                        }`}
                        onClick={() => {}}
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                        pathname === '/login' ? 'text-foreground' : 'text-foreground/60'
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                        pathname === '/register' ? 'text-foreground' : 'text-foreground/60'
                      }`}
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}