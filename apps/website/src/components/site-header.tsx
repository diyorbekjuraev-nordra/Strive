import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@ebrai/strive";
import { cn } from "@ebrai/strive";
import { CommandMenu } from "@/components/command-menu";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { useTheme } from "next-themes";

export function SiteHeader() {
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-sm supports-backdrop-filter:bg-background/60 dark:border-border">
      <div
        className={cn(
          "flex h-16 items-center justify-between gap-4 container",
          pathname.includes("blocks") ? "container-fluid" : "container"
        )}
      >
        <MobileNav />

        <div className="hidden md:flex items-center gap-3.5">
          <Link
            href="/"
            className="mr-10 flex items-center gap-2 font-bold text-2xl"
          >
            <h1 className="text-3xl font-extrabold tracking-tight space-x-0.5">
              <span className="text-blue-600">Strive</span>
              <span className="text-gray-900 dark:text-white">UI</span>
            </h1>
          </Link>
          <MainNav />
        </div>

        <div className="flex items-center gap-3 justify-end">
          <div className="hidden md:block">
            <CommandMenu />
          </div>

          <nav className="flex items-center gap-1">
            <ThemeSwitcher
              value={theme as "light" | "dark" | "system"}
              onChange={setTheme}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
