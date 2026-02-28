"use client";

import { Code2, Server, Cloud } from "lucide-react";

const stackCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "HTML/CSS", "Redux", "Vue.js"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Redis", "Express"],
  },
  {
    title: "Deployment",
    icon: Cloud,
    skills: ["AWS", "Docker", "Kubernetes", "Vercel", "CI/CD", "GitHub Actions", "Nginx", "Linux"],
  },
];

export function ResumePage() {
  return (
    <div className="h-full overflow-y-auto p-8 lg:p-10">
      <div className="max-w-2xl">
        <section className="mb-14">
          <h1 className="section-title mb-12">About Me</h1>
          <div className="space-y-5">
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              I&apos;m a fullstack software developer, and I do my best to turn ideas into
              digital products. I always aim to blend clean design with solid engineering to create web applications that exceed user expectations.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Over the years, I&apos;ve worked across the full stack, helping meet user needs and wants. From logic to
              interfaces, I focus on writing clean, maintainable
              code that stands the test of time, and performs to impress.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold uppercase tracking-widest mb-4">
            My Stack
          </h2>
          <div className="section-divider mb-8" />

          <div className="space-y-8">
            {stackCategories.map((category) => (
              <div key={category.title}>
                <div className="flex items-center gap-2 mb-3">
                  <category.icon className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-base font-medium">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm font-body px-3 py-1 border border-border text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
