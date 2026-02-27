"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export function ContactPage() {
  return (
    <div className="h-full overflow-y-auto p-8 lg:p-10">
      <div className="max-w-md w-full">
        <h1 className="section-title mb-6">Contact</h1>
        <p className="font-body text-base text-muted-foreground leading-relaxed mb-12">
          I&apos;m always open to discussing new projects, opportunities, or
          collaborations. Feel free to reach out through any of the channels
          below.
        </p>

        <div className="space-y-6">
          <a
            href="mailto:hello@example.com"
            className="flex items-center gap-4 icon-link group"
          >
            <Mail className="h-5 w-5" />
            <span className="font-body text-base group-hover:text-primary transition-colors duration-300">
              hello@example.com
            </span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 icon-link group"
          >
            <Linkedin className="h-5 w-5" />
            <span className="font-body text-base group-hover:text-primary transition-colors duration-300">
              LinkedIn
            </span>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 icon-link group"
          >
            <Github className="h-5 w-5" />
            <span className="font-body text-base group-hover:text-primary transition-colors duration-300">
              GitHub
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
