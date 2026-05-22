"use client";

import React, { useState, useEffect } from "react";
import { 
  Menu, X, LayoutDashboard, Briefcase, GraduationCap, 
  StarsIcon, ChevronDown, Target, Linkedin, Map, 
  FileText, PenBox, ArrowRight, Sparkles
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

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
    desc: "Get 3x recruiter views",
    badge: null,
  },
  {
    href: "/career-roadmap",
    icon: <Map className="h-4 w-4 text-purple-500" />,
    label: "Career Roadmap",
    desc: "Month-by-month plan",
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
    desc: "Questions from top companies",
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

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(true);
  const pathname = usePathname();

  // Close menu on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="h-10 w-10 text-muted-foreground hover:text-foreground"
        aria-label="Open navigation menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[380px] bg-background border-l border-white/10 p-6 shadow-2xl flex flex-col h-full overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <StarsIcon className="h-5 w-5 text-primary animate-pulse" />
                  <span className="font-bold text-lg gradient-title">GENzAI Menu</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-4 py-6 flex-1">
                {/* General Links */}
                <div className="flex flex-col gap-2">
                  <Link
                    href="/jobs"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Briefcase className="h-5 w-5 text-pink-400" />
                    <span>Live Job Board</span>
                  </Link>

                  <Link
                    href="/interview"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors font-medium text-muted-foreground hover:text-foreground"
                  >
                    <GraduationCap className="h-5 w-5 text-yellow-400" />
                    <span>Interview Preparation</span>
                  </Link>

                  <SignedIn>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors font-medium text-muted-foreground hover:text-foreground"
                    >
                      <LayoutDashboard className="h-5 w-5 text-violet-400" />
                      <span>Dashboard</span>
                    </Link>
                  </SignedIn>
                </div>

                {/* Collapsible AI Growth Tools */}
                <div className="border-t border-white/5 pt-4">
                  <button
                    onClick={() => setToolsOpen(!toolsOpen)}
                    className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      AI Career Tools
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {toolsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-1 mt-2 pl-2"
                      >
                        {growthTools.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors w-full"
                          >
                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              {tool.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-medium text-foreground">{tool.label}</span>
                                {tool.badge && (
                                  <Badge className="text-[9px] h-3.5 px-1 bg-primary/20 text-primary border-0 font-bold shrink-0">
                                    {tool.badge}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-[11px] text-muted-foreground truncate">{tool.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Drawer Footer (Sign In / Signed Out / CTAs) */}
              <div className="border-t border-white/5 pt-4 mt-auto">
                <SignedOut>
                  <div className="flex flex-col gap-3">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full h-11 font-semibold">
                        Sign In
                      </Button>
                    </SignInButton>
                    <Link href="/sign-up" className="w-full">
                      <Button className="w-full h-11 font-bold shadow-sm shadow-primary/20 gap-2">
                        Get Started Free
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </SignedOut>

                <SignedIn>
                  <div className="flex flex-col gap-2">
                    <Link href="/dashboard" className="w-full">
                      <Button className="w-full h-11 font-bold shadow-sm shadow-primary/20 gap-2">
                        Go to Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </SignedIn>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
