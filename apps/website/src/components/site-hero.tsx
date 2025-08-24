"use client";
import { Button } from "@ebrai/strive";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ebrai/strive";
import { Zap } from "lucide-react";
import { Icons } from "@/components/icons";
import { MovingLabel } from "@/components/moving-border";

export default function SiteHero() {
  const brands = [
    {
      title: "Tailwind 4",
      logo: Icons.tailwind,
      tooltip: "",
    },
    {
      title: "React 19",
      logo: Icons.react,
      tooltip: "",
    },
    {
      title: "Next.js 15.3",
      logo: Icons.nextjs,
      tooltip: "",
    },
    {
      title: "Radix UI",
      logo: Icons.radixui,
      tooltip: "",
      className: "h-full w-full ms-1",
    },
    {
      title: "Base UI",
      logo: Icons.baseui,
      tooltip: "",
      className: "h-full w-full ms-1",
    },
    {
      title: "shadcn/ui",
      logo: Icons.shadcn,
      tooltip: "",
    },
    {
      title: "Motion",
      logo: Icons.motion,
      tooltip: "",
      className: "size-10 -mt-2",
    },
  ];

  const handleGetStartedClick = () => {};

  const handleBrandClick = (brand: string) => {};

  const handleMovingLabelClick = () => {};

  return (
    <div className="container">
      <div className="flex items-center justify-center py-10 lg:py-2 lg:h-[500px] mb-5">
        <div className="flex items-center flex-col justify-between gap-6">
          <MovingLabel
            borderRadius="1.75rem"
            duration={3500}
            className="bg-card border border-mono/15 text-foreground inline-flex items-center gap-2.5 cursor-pointer"
            containerClassName="w-[295px]"
            onClick={handleMovingLabelClick}
          >
            Design evolution — powered by <strong className="text-blue-600 animate-pulse">Ebrai</strong>
            <Zap className="size-4 text-muted-foreground" />
          </MovingLabel>

          <h1 className="text-2xl lg:text-[48px] font-bold text-center">
            UI Library for React
          </h1>

          <div className="text-center text-l max-w-2xl">
            <strong>Stirve UI</strong> is a modern design system and React
            component library built with <strong>TypeScript</strong>,{" "}
            <strong>Tailwind CSS</strong>, and <strong>Motion</strong>. It helps
            teams ship beautiful, accessible, and production-ready interfaces
            faster—without sacrificing flexibility.
          </div>

          <div className="flex items-center gap-3.5 mb-4 shadow-lg">
            <Button variant="outline" size="lg">
              Get Started - It&apos;s free
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 -ms-3">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                onClick={() => handleBrandClick(brand.title)}
              >
                <Tooltip>
                  <TooltipTrigger className="size-6">
                    {brand.logo({
                      className:
                        "opacity-70" +
                        (brand.className
                          ? ` ${brand.className}`
                          : "w-full h-full"),
                    })}
                  </TooltipTrigger>
                  <TooltipContent>{brand.title}</TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
