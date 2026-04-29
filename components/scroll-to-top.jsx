"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      size="icon"
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full shadow-lg opacity-90 hover:opacity-100 transition-all"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
