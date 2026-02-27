"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Moon, Sun } from "lucide-react";

interface NavigationProps {
  pages: string[];
  activePage: string;
  onNavigate: (page: string) => void;
  theme: string | undefined;
  toggleTheme: () => void;
  onProfileClick: () => void;
}

export function Navigation({ pages, activePage, onNavigate, theme, toggleTheme, onProfileClick }: NavigationProps) {
  return (
    <nav className="h-screen w-64 border-r border-border bg-background flex flex-col px-12 py-10">
      <div className="flex items-center gap-3 mb-14">
        <Avatar className="h-11 w-11 border border-border cursor-pointer" onClick={onProfileClick}>
          <AvatarImage src="/portrait.PNG" alt="Profile" />
          <AvatarFallback className="font-display text-sm">MA</AvatarFallback>
        </Avatar>
        <div className="description flex flex-col items-start">
          <span className="font-display text-base font-medium tracking-tight">Malik Awesu</span>
          <span className="font-display text-xs font-medium text-muted-foreground tracking-tight">Fullstack Developer</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-8">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`block text-xl tracking-wide nav-link ${
                activePage === page ? "nav-link-active font-medium" : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span>{theme === "dark" ? "Light" : "Dark"}</span>
      </button>
    </nav>
  );
}
