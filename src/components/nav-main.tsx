"use client";
import { TNavLink } from "@/app/types/navlink/navlink";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }: { items: TNavLink[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <Link href={item.url} className="w-full">
                <SidebarMenuButton
                  className="hover:bg-violet-200 text-black active:bg-violet-200 cursor-pointer"
                  tooltip={item?.title}
                >
                  {<item.icon className="w-4 h-4 mr-2" />}
                  <span>{item?.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
