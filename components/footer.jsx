import React from "react";
import Link from "next/link";
import { Linkedin, Twitter, Github, Mail, Sparkles } from "lucide-react";
import Logo from "./logo";

const footerLinks = {
  Tools: [
    { label: "ATS Resume Scorer", href: "/ats-scorer" },
    { label: "LinkedIn Optimizer", href: "/linkedin-optimizer" },
    { label: "Career Roadmap", href: "/career-roadmap" },
    { label: "Resume Builder", href: "/resume" },
    { label: "Cover Letter AI", href: "/ai-cover-letter" },
    { label: "Interview Prep", href: "/interview" },
  ],
  Platform: [
    { label: "Industry Dashboard", href: "/dashboard" },
    { label: "Job Board", href: "/jobs" },
    { label: "Onboarding", href: "/onboarding" },
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
  { icon: <Twitter className="w-4 h-4" />, href: "#", label: "Twitter" },
  { icon: <Github className="w-4 h-4" />, href: "#", label: "GitHub" },
  { icon: <Mail className="w-4 h-4" />, href: "mailto:support@genzai.in", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Logo className="h-12 w-auto" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The AI-powered career platform for the next generation of professionals. Stop applying blindly. Start landing offers.
            </p>
            <div className="flex items-center gap-1 text-xs text-primary font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by Google Gemini AI
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="font-bold text-sm mb-4 uppercase tracking-wider text-foreground">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 GENzAI Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with ❤️ for ambitious Gen Z professionals across India
          </p>
        </div>
      </div>
    </footer>
  );
}
