"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Grain } from "@/components/grain";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SakuraNav } from "@/components/sakura/SakuraNav";
import { SakuraFooter } from "@/components/sakura/SakuraFooter";

/**
 * AppShell — picks the page chrome by route so the two design worlds stay
 * isolated:
 *  - "/"           → immersive Sakura theme (dark cinematic, gradients, glass)
 *  - everything else → the flat burgundy/gray instrument theme (dashboard)
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  if (isLanding) {
    return (
      <div className="theme-sakura">
        <SakuraNav />
        <main>{children}</main>
        <SakuraFooter />
      </div>
    );
  }

  return (
    <>
      <Grain />
      <Nav />
      <div className="relative z-10 flex min-h-screen flex-col pt-14">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
