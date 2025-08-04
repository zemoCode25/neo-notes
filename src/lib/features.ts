import { SquarePen } from "lucide-react";
import { NotebookPen } from "lucide-react";
import { Brain } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type TFeature = {
  title: string;
  description: string;
  color: "yellow" | "blue" | "red";
  icon: LucideIcon;
};

export const features: TFeature[] = [
  {
    title: "Smart Notes",
    description:
      "Create, edit, and manage your notes effortlessly with a clean, intuitive interface.",
    color: "blue",
    icon: NotebookPen,
  },
  {
    title: "Quick Labels",
    description:
      "Organize your notes instantly by adding custom labels that appear in the sidebar for fast access.",
    color: "yellow",
    icon: SquarePen,
  },
  {
    title: "AI Assist",
    description:
      "Outline, summarize, or generate content with built-in AI tools designed to boost your writing flow.",
    color: "red",
    icon: Brain,
  },
];
