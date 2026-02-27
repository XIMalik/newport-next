"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { PortfolioPage } from "@/components/pages/portfolio-page";
import { ContactPage } from "@/components/pages/contact-page";
import { ResumePage } from "@/components/pages/resume-page";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import { Moon, Sun, Share2 } from "lucide-react";

const pages = ["Portfolio", "About", "Contact"] as const;
type Page = (typeof pages)[number];

const pageComponents: Record<Page, React.FC> = {
  Portfolio: PortfolioPage,
  Contact: ContactPage,
  About: ResumePage,
};

export function PortfolioClient() {
  const [activePage, setActivePage] = useState<Page>("Portfolio");
  const [direction, setDirection] = useState(1);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleNavigate = (page: Page) => {
    const currentIndex = pages.indexOf(activePage);
    const nextIndex = pages.indexOf(page);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActivePage(page);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const ActiveComponent = pageComponents[activePage];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6 overflow-x-auto">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => handleNavigate(page)}
                className={`nav-link text-sm tracking-wide whitespace-nowrap ${
                  activePage === page ? "nav-link-active" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <Avatar className="h-10 w-10 border border-border cursor-pointer flex-shrink-0" onClick={() => setProfileModalOpen(true)}>
            <AvatarImage src="/portrait.PNG" alt="Profile" />
            <AvatarFallback className="font-display text-sm">MA</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="hidden lg:block">
        <Navigation
          pages={pages as unknown as string[]}
          activePage={activePage}
          onNavigate={(p) => handleNavigate(p as Page)}
          theme={theme}
          toggleTheme={toggleTheme}
          onProfileClick={() => setProfileModalOpen(true)}
        />
      </div>

      <div className="flex-1 h-screen overflow-hidden relative mt-14 lg:mt-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activePage}
            custom={direction}
            initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? "-50%" : "50%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 overflow-y-auto"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogPortal>
          <DialogOverlay className="backdrop-blur-sm" onClick={() => setProfileModalOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background border border-border p-8 max-w-sm w-[90vw] h-[500px]">
            <div className="flex flex-col h-full items-center justify-between">
              <div className="flex flex-col items-center text-center flex-1 justify-center">
                <Avatar className="h-24 w-24 border border-border mb-4">
                  <AvatarImage src="/portrait.PNG" alt="Profile" />
                  <AvatarFallback className="font-display text-2xl">MA</AvatarFallback>
                </Avatar>
                <h2 className="font-display text-2xl font-medium mb-1">Malik Awesu</h2>
                <p className="font-display text-sm text-muted-foreground mb-3">Software Developer</p>
                <p className="font-body text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  I build scalable web applications with clean architecture and thoughtful user experiences, blending performance with elegant design.
                </p>
              </div>
              <div className="w-full text-center">
                <div className="space-y-2 mb-6">
                  <p className="font-body text-sm">abdulmalikawesu@gmail.com</p>
                  <p className="font-body text-sm">+2347071163065</p>
                </div>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={async () => {
                      const url = window.location.origin;
                      if (navigator.share) {
                        await navigator.share({ title: "Malik Awesu — Portfolio", url });
                      } else {
                        await navigator.clipboard.writeText(url);
                        alert("Link copied to clipboard!");
                      }
                    }}
                    className="flex-1 border border-border text-foreground font-display text-xs uppercase tracking-widest py-2 flex items-center justify-center gap-2 hover:bg-accent transition-colors"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </button>
                  <button
                    onClick={() => setProfileModalOpen(false)}
                    className="flex-1 bg-destructive text-destructive-foreground font-display text-xs uppercase tracking-widest py-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogPortal>
      </Dialog>

      <button
        onClick={toggleTheme}
        className="lg:hidden fixed bottom-6 right-6 z-50 h-11 w-11 flex items-center justify-center rounded-full border border-border bg-background opacity-50 hover:opacity-100 transition-opacity duration-200 shadow-lg"
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? <Sun className="h-4 w-4 text-foreground" /> : <Moon className="h-4 w-4 text-foreground" />}
      </button>
    </div>
  );
}
