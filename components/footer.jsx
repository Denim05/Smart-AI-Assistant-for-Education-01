import React from "react";
import Link from "next/link";
import { Linkedin, Twitter, Github, Mail, Sparkles, ArrowRight } from "lucide-react";
import Logo from "./logo";
import { Badge } from "./ui/badge";

const footerLinks = {
  "AI Tools": [
    { label: "ATS Resume Scorer", href: "/ats-scorer", badge: "Popular" },
    { label: "LinkedIn Optimizer", href: "/linkedin-optimizer" },
    { label: "Career Roadmap", href: "/career-roadmap" },
    { label: "Resume Builder", href: "/resume" },
    { label: "Cover Letter AI", href: "/ai-cover-letter" },
    { label: "Interview Prep", href: "/interview" },
  ],
  Platform: [
    { label: "Industry Dashboard", href: "/dashboard" },
    { label: "Live Job Board", href: "/jobs", badge: "Live" },
    { label: "Onboarding Quiz", href: "/onboarding" },
  ],
  Company: [
    { label: "About GENzAI", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Contact Us", href: "mailto:support@genzai.in" },
  ],
};

const socialLinks = [
  { icon: <Linkedin className="w-4 h-4" />, href: "#", label: "LinkedIn" },
  { icon: <Twitter className="w-4 h-4" />, href: "#", label: "Twitter/X" },
  { icon: <Github className="w-4 h-4" />, href: "#", label: "GitHub" },
  { icon: <Mail className="w-4 h-4" />, href: "mailto:support@genzai.in", label: "Email" },
];

const techStack = ["Google Gemini AI", "Next.js 15", "Clerk Auth", "Prisma", "Inngest"];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-muted/10 relative overflow-hidden">
      {/* Subtle orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]
        rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <Logo className="h-12 w-auto" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The AI-powered career platform for the next generation of professionals.
              Stop applying blindly. Start landing offers.
            </p>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-primary/20
                    bg-primary/5 text-primary/80 uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by Google Gemini AI
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center
                    text-muted-foreground hover:text-primary hover:border-primary/40
                    hover:bg-primary/10 transition-all duration-200 backdrop-blur-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="font-black text-sm mb-5 uppercase tracking-widest text-foreground">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label} className="flex items-center gap-2">
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      {link.label}
                    </Link>
                    {link.badge && (
                      <Badge className="text-[9px] h-4 px-1.5 py-0 bg-primary/15 text-primary border-0 font-bold">
                        {link.badge}
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-14 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 GENzAI Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with ❤️ for ambitious Gen Z professionals across India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
