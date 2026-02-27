"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProjects, type HygraphProject } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import Image from "next/image";

const FILTERS = ["All", "Frontend", "Backend", "Fullstack"] as const;
type Filter = (typeof FILTERS)[number];

const ProjectTile = ({
  project,
  isActive,
  isMuted,
  onClick,
}: {
  project: HygraphProject;
  isActive: boolean;
  isMuted: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`project-tile text-left ${
      isActive ? "project-tile-active" : isMuted ? "project-tile-inactive" : ""
    }`}
  >
    <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">
      {project.type}
    </span>
    <span className="block font-display text-base font-medium leading-snug">
      {project.projectTitle}
    </span>
  </button>
);

const techList = (tech: string | string[]): string[] => {
  if (Array.isArray(tech)) return tech;
  if (typeof tech === "string") return tech.split(",").map((t) => t.trim());
  return [];
};

const ProjectPreview = ({ project, onImageClick }: { project: HygraphProject; onImageClick: () => void }) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="w-full h-full flex flex-col"
  >
    {project.image?.[0]?.url && (
      <div className="mb-6">
        <div className="w-full aspect-video cursor-pointer relative" onClick={onImageClick}>
          <Image
            src={project.image[0].url}
            alt={project.projectTitle}
            fill
            className="object-cover border border-border hover:opacity-90 transition-opacity"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      </div>
    )}

    <div className="flex-shrink-0 px-6 md:px-10 pb-6 md:pb-10">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <h2 className="font-display text-2xl font-medium">{project.projectTitle}</h2>
        <span className="text-xs uppercase tracking-widest text-primary font-body whitespace-nowrap">
          {project.type}
        </span>
      </div>

      <p className="font-body text-sm leading-relaxed text-muted-foreground mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {techList(project.techUsed).map((tech) => (
          <span
            key={tech}
            className="text-xs font-body px-2.5 py-1 border border-border text-muted-foreground"
          >
            {tech}
          </span>
        ))}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto icon-link"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

export function PortfolioPage() {
  const { projects, isLoading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<HygraphProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.type === activeFilter),
    [projects, activeFilter]
  );

  return (
    <div className="h-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 p-8 lg:p-10 lg:border-r border-border overflow-y-auto">
        <h1 className="section-title mb-6">Portfolio</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs uppercase tracking-widest font-body px-3 py-1.5 border transition-colors duration-200 ${
                activeFilter === f
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        )}

        {error && <p className="font-body text-sm text-destructive">{error}</p>}

        {!isLoading && !error && filteredProjects.length === 0 && (
          <p className="font-body text-sm text-muted-foreground italic">
            No {activeFilter} projects at the moment
          </p>
        )}

        {!isLoading && !error && filteredProjects.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <ProjectTile
                key={project.id}
                project={project}
                isActive={selectedProject?.id === project.id}
                isMuted={selectedProject !== null && selectedProject.id !== project.id}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hidden lg:flex flex-1 flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <ProjectPreview project={selectedProject} onImageClick={() => setImageModalOpen(true)} />
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted-foreground font-body text-md italic p-6 lg:p-10"
            >
              Select a project to view details.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="lg:hidden fixed inset-0 z-50 bg-background overflow-y-auto flex flex-col"
          >
            <div className="flex-1 overflow-y-auto">
              <ProjectPreview project={selectedProject} onImageClick={() => setImageModalOpen(true)} />
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="w-full bg-red-900 text-white font-display text-sm uppercase tracking-widest py-4 border-t border-border"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogPortal>
          <DialogOverlay onClick={() => setImageModalOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-[1400px]">
            {selectedProject?.image?.[0]?.url && (
              <div className="relative w-full aspect-video">
                <Image
                  src={selectedProject.image[0].url}
                  alt={selectedProject.projectTitle}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            )}
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-red-900 text-white font-display text-xs uppercase tracking-widest px-6 py-2"
            >
              Close
            </button>
          </div>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
