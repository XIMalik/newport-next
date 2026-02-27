"use client";

import { useState, useEffect } from "react";

export interface HygraphProject {
  id: string;
  description: string;
  link: string;
  projectTitle: string;
  techUsed: string;
  type: string;
  image: { url: string }[];
}

const HYGRAPH_URL = "https://eu-west-2.cdn.hygraph.com/content/cm63jbkpe01id07wcjd5qxlgj/master";

const QUERY = `{
  projects {
    id
    description
    link
    projectTitle
    techUsed
    type
    image {
      url
    }
  }
}`;

export function useProjects() {
  const [projects, setProjects] = useState<HygraphProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      try {
        const res = await fetch(HYGRAPH_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: QUERY }),
        });

        if (!res.ok) throw new Error(`Request failed (${res.status})`);

        const json = await res.json();

        if (json.errors) throw new Error(json.errors[0]?.message ?? "GraphQL error");

        if (!cancelled) {
          setProjects(json.data.projects);
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? "Failed to load projects");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchProjects();
    return () => { cancelled = true; };
  }, []);

  return { projects, isLoading, error };
}
