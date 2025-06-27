"use client";
import { TNavLink } from "@/app/types/navlink/navlink";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }: { items: TNavLink[] }) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <Link href={item.url} className="w-full">
                <SidebarMenuButton
                  className={`hover:bg-violet-200 text-black active:bg-violet-200 cursor-pointer ${
                    pathname === item.url
                      ? "bg-violet-300 text-black"
                      : "text-gray-600"
                  }`}
                  tooltip={item?.title}
                >
                  {<item.icon className="w-4 h-4" />}
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
