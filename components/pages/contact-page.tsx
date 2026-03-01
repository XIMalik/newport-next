"use client";

import { Github, Linkedin, Mail, Phone, Twitter, Instagram, Download, MessageCircle } from "lucide-react";

const contacts = [
  {
    type: "Email",
    icon: Mail,
    href: "mailto:abdulmalikawesu@gmail.com",
  },
  {
    type: "Phone",
    icon: Phone,
    href: "tel:+2347071163065",
  },
  {
    type: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/2347071163065",
  },
  {
    type: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/malikawesu",
  },
  {
    type: "GitHub",
    icon: Github,
    href: "https://github.com/ximalik",
  },
];

export function ContactPage() {
  return (
    <div className="h-full overflow-y-auto p-8 lg:p-10 pb-24 lg:pb-10">
      <div className="max-w-2xl">
        <h1 className="section-title mb-6">Let&apos;s talk</h1>
        <p className="font-body text-base text-muted-foreground leading-relaxed mb-12">
          I&apos;m always open to discussing new projects, opportunities, or
          collaborations. Feel free to reach out through any of the channels
          below.
        </p>

        <div className="flex flex-wrap gap-3 mb-12">
          {contacts.map((contact) => (
            <a
              key={contact.type}
              href={contact.href}
              target={contact.type !== "Email" && contact.type !== "Phone" && contact.type !== "WhatsApp" ? "_blank" : undefined}
              rel={contact.type !== "Email" && contact.type !== "Phone" && contact.type !== "WhatsApp" ? "noopener noreferrer" : undefined}
              className="text-sm font-body px-3 py-1 border border-border text-muted-foreground hover:border-primary transition-colors duration-200 flex items-center gap-2"
            >
              <contact.icon className="h-4 w-4" />
              {contact.type}
            </a>
          ))}
        </div>

        <div className="border-t border-border pt-8">
          <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
For a closer look at my experience and the technical tools I’ve worked with, feel free to download my resume.          </p>
          <a
            href="/AbdulmalikAwesu.pdf"
            download
            className="download-btn inline-flex"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
