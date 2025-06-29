"use client";
import Link from "next/link";
import { LabelContext } from "@/contexts/LabelContextProvider";
import { useContext } from "react";
import { Tag } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain() {
  const { labels } = useContext(LabelContext);
  const pathname = usePathname();

  console.log(labels, "labels in NavMain");

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <Link href={`/dashboard`} className="w-full">
            <SidebarMenuButton
              className={`hover:bg-violet-200 text-black active:bg-violet-200 cursor-pointer ${
                pathname === "/dashboard" ? "bg-violet-200" : ""
              }`}
              tooltip={"Dashboard"}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{"Dashboard"}</span>
            </SidebarMenuButton>
          </Link>
          {labels?.map((label) => (
            <SidebarMenuItem key={label.id}>
              <Link href={`/label/${label.id}`} className="w-full">
                <SidebarMenuButton
                  className={`hover:bg-violet-200 text-black active:bg-violet-200 cursor-pointer ${
                    pathname === `/label/${label.id}` ? "bg-violet-200" : ""
                  }`}
                  tooltip={label?.label_name}
                >
                  {<Tag className="w-4 h-4" />}
                  <span>{label?.label_name}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
