"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconListDetails,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { Tag } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useEffect } from "react";
import { useState } from "react";

// actions
import { retriveAllLabels } from "@/app/api/label/actions/label-actions";

// Types
import { TLabel } from "@/app/types/label/label";
import { TNavLink } from "@/app/types/navlink/navlink";

import { ScrollArea } from "./ui/scroll-area";

import NeonotesLogo from "./utils/neonotes-logo";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [labels, setLabels] = useState<TNavLink[]>([
    {
      id: Number(
        Date.now().toString() +
          Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")
      ),
      title: "Dashboard",
      url: "/dashboard",
      icon: Tag,
    },
  ]);

  async function fetchLabels() {
    try {
      const labels = await retriveAllLabels();
      return labels.labels;
    } catch (error) {
      console.error("Error fetching labels:", error);
      return [];
    }
  }

  useEffect(() => {
    async function loadLabels() {
      const labelsData = await fetchLabels();
      setLabels((prevLabels) => [
        ...prevLabels,
        ...labelsData.map((label: TLabel) => ({
          id: label.id,
          title: label.label_name,
          url: `/label/${label.id}`,
          icon: Tag,
        })),
      ]);
    }
    loadLabels();
  }, []);

  console.log(labels);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-violet-100 rounded-t-md border-x-1 border-t-1">
        <SidebarMenu className="px-2 pt-2">
          <SidebarMenuItem>
            <NeonotesLogo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-violet-100 border-x-1">
        <ScrollArea className="h-full flex flex-col">
          <NavMain items={labels} />
        </ScrollArea>
        <NavSecondary items={data.navSecondary} className="!mt-auto" />
      </SidebarContent>
      <SidebarFooter className="bg-violet-100 rounded-b-md border-x-1 border-b-1 hover:bg-violet-200">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
