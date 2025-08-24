"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
// import { SiteSubscribe } from "@/components/site-subscribe";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <div
      vaul-drawer-wrapper="true"
      className="relative flex min-h-screen flex-col bg-background bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:22px_24px] mask-radial-[ellipse_125%_125%_at_50%_0%] mask-from-black mask-from-35% mask-to-transparent mask-to-110%"
    >
      <div className="border-border/40 dark:border-border">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        {/* {pathname &&
          !pathname.startsWith("/docs") &&
          !pathname.startsWith("/blocks") && <SiteSubscribe />} */}
      </div>
    </div>
  );
}
