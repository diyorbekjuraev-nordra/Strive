import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { StriveProvider } from "@ebrai/strive";
import { Suspense } from "react";
import "@ebrai/strive/styles";
import "./globals.css";
import { META_THEME_COLORS, siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    'Tailwind',
    'Tailwind CSS',
    'Next.js',
    'React',
    'Radix UI',
    'Tanstack Table',
    'React Templates',
    'Next.js Templates',
    'React Components',
    'Motion',
    'Headless Components',
    'Accordion',
    'Alert',
    'Alert Dialog',
    'Aspect Ratio',
    'Avatar',
    'Badge',
    'Breadcrumb',
    'Button',
    'Calendar',
    'Card',
    'Chart',
    'Checkbox',
    'Collapsible',
    'Command',
    'Context Menu',
    'Data Grid',
    'Data Grid Table',
    'Data Grid Drag & Drop',
    'Dialog',
    'Drawer',
    'Dropdown Menu',
    'Form',
    'Hover Card',
    'Input',
    'Input OTP',
    'KBD',
    'Label',
    'List',
    'Menubar',
    'Navigation Menu',
    'Nested Menu',
    'Pagination',
    'Popover',
    'Progress',
    'Radio Group',
    'Resizable',
    'Scroll Area',
    'Scrollspy',
    'React Select',
    'Separator',
    'Scrollspy',
    'Sheet',
    'Skeleton',
    'Slider',
    'Sonner',
    'Spinners',
    'Switch',
    'Table',
    'Tabs',
    'Textarea',
    'Toggle',
    'Toggle Group',
    'Tooltip',
  ],
  authors: [
    {
      name: 'reui',
      url: 'https://reui.io',
    },
  ],
  creator: '@reui_io',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['https://reui.io/brand/logo-default.png'],
    creator: '@reui_io',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen text-base text-foreground bg-background antialiased bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(102,51,238,1)_100%)] ${inter.variable}`}
      >
        <StriveProvider>
          <Suspense>{children}</Suspense>
        </StriveProvider>
      </body>
    </html>
  );
}
