"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@ebrai/strive";
import { ArrowUpRight } from "lucide-react";
import { docsConfig } from "@/config/docs";
import { MainNavItem } from "@/config/types";

export function MainNav() {
  const pathname = usePathname();

  const handleMenuClick = (item: MainNavItem) => {};

  return (
    <div className="itesm-center justify-center mr-4 hidden md:flex">
      <nav className="flex items-center gap-4 text-sm font-medium xl:gap-6">
        {docsConfig.mainNav.map((item: MainNavItem) => (
          <Link
            key={item.href}
            href={item.href || "#"}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            onClick={() => handleMenuClick(item)}
            className={cn(
              "relative transition-colors hover:text-foreground/80 inline-flex items-center gap-1",
              item.href &&
                (item.href === pathname ||
                  (item.href !== "/" && pathname?.startsWith(item.href)))
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            {item.title}
            {item.external && <ArrowUpRight className="size-3.5 opacity-60" />}
          </Link>
        ))}
      </nav>
    </div>
  );
}
