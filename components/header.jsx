import React from "react";
import { Button } from "./ui/button";
import {
  PenBox, LayoutDashboard, FileText, GraduationCap,
  ChevronDown, StarsIcon, Target, Linkedin, Map, Briefcase,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";
import { ThemeToggle } from "./theme-toggle";
import Logo from "./logo";
import { Badge } from "./ui/badge";
import MobileMenu from "./mobile-menu";

const growthTools = [
  {
    href: "/ats-scorer",
    icon: <Target className="h-4 w-4 text-primary" />,
    label: "ATS Resume Scorer",
    desc: "Score your resume instantly",
    badge: "Popular",
  },
  {
    href: "/linkedin-optimizer",
    icon: <Linkedin className="h-4 w-4 text-blue-500" />,
    label: "LinkedIn Optimizer",
    desc: "Get 3x more recruiter views",
    badge: null,
  },
  {
    href: "/career-roadmap",
    icon: <Map className="h-4 w-4 text-purple-500" />,
    label: "Career Roadmap",
    desc: "Month-by-month action plan",
    badge: null,
  },
  {
    href: "/resume",
    icon: <FileText className="h-4 w-4 text-green-500" />,
    label: "Resume Builder",
    desc: "AI-optimized, ATS-ready",
    badge: null,
  },
  {
    href: "/ai-cover-letter",
    icon: <PenBox className="h-4 w-4 text-orange-500" />,
    label: "Cover Letter AI",
    desc: "Tailored in 30 seconds",
    badge: null,
  },
  {
    href: "/interview",
    icon: <GraduationCap className="h-4 w-4 text-yellow-500" />,
    label: "Interview Prep",
    desc: "Real questions from top companies",
    badge: null,
  },
  {
    href: "/jobs",
    icon: <Briefcase className="h-4 w-4 text-pink-500" />,
    label: "Job Board",
    desc: "Live openings across India",
    badge: "Live",
  },
];

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo className="h-14 w-auto" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <Link
            href="/jobs"
            className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5" />
            Jobs
          </Link>
          <Link
            href="/interview"
            className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            Interview Prep
          </Link>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-2">
          <SignedIn>
            {/* Dashboard Link */}
            <Link href="/dashboard" className="hidden lg:flex">
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="hidden lg:flex gap-2 shadow-sm shadow-primary/20">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Tools</span>
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 p-2">
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal mb-1 px-2">
                  AI Career Tools
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="mb-2" />
                {growthTools.map((tool) => (
                  <DropdownMenuItem key={tool.href} asChild className="p-0 focus:bg-transparent">
                    <Link
                      href={tool.href}
                      className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-muted cursor-pointer transition-colors w-full"
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{tool.label}</span>
                          {tool.badge && (
                            <Badge className="text-[10px] h-4 px-1.5 py-0 bg-primary/20 text-primary border-0">
                              {tool.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{tool.desc}</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-2 ring-primary/20",
                  userButtonPopoverCard: "shadow-2xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm" className="hidden lg:flex">
                Sign In
              </Button>
            </SignInButton>
            <Link href="/sign-up" className="hidden lg:flex">
              <Button size="sm" className="shadow-sm shadow-primary/20">
                Get Started Free
              </Button>
            </Link>
          </SignedOut>

          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
