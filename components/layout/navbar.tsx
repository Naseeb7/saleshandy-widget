"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/submit", label: "Submit" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/widget", label: "Widget" },
] as const;

function isActiveRoute(pathname: string, href: string): boolean {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-default bg-surface/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          className="flex shrink-0 items-center gap-2 rounded-control text-sm font-semibold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          href="/"
        >
          <span className="flex size-8 items-center justify-center rounded-control bg-primary text-sm font-bold text-primary-foreground">
            S
          </span>
          <span className="hidden sm:inline">Saleshandy</span>
        </Link>

        <nav aria-label="Main navigation" className="min-w-0">
          <ul className="flex items-center gap-1 overflow-x-auto">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-10 items-center rounded-control px-3 py-2 text-sm font-medium text-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 hover:bg-surface-muted hover:text-text-primary",
                      isActive && "bg-secondary text-secondary-foreground",
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
