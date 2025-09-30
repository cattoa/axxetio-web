"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type SiteShellProps = {
    children: React.ReactNode;
};

const NAV_ITEMS = [
    { label: "Overview", href: "#overview" },
    { label: "Assets", href: "#assets" },
    { label: "Activity", href: "#activity" },
    { label: "Customers", href: "#customers" },
    { label: "Settings", href: "#settings" },
];

export function SiteShell({ children }: SiteShellProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen]);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-background via-background/95 to-background text-foreground">
            <aside
                className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-foreground/10 bg-white/90 backdrop-blur transition-transform duration-300 ease-in-out dark:border-white/10 dark:bg-slate-950/80 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:border-foreground/5 lg:bg-white/60 lg:dark:border-white/10 lg:dark:bg-slate-900/60`}
            >
                <div className="flex h-16 items-center gap-3 border-b border-foreground/10 px-6 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/axxetio_logo.png"
                            alt="Axxetio logo"
                            width={32}
                            height={32}
                            priority
                        />
                        <span className="text-sm font-semibold tracking-wide uppercase text-foreground/80">
                            Axxetio
                        </span>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                    <ul className="space-y-2 text-sm font-medium text-foreground/80">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="flex items-center justify-between rounded-lg px-3 py-2 transition hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>{item.label}</span>
                                    <span className="text-xs text-foreground/40">›</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="border-t border-foreground/10 px-6 py-4 text-xs text-foreground/50 dark:border-white/10">
                    <p className="font-medium text-foreground/70">Need help?</p>
                    <p>support@axxetio.local</p>
                </div>
            </aside>

            {isMenuOpen && (
                <button
                    type="button"
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close navigation panel"
                />
            )}

            <header className="fixed inset-x-0 top-0 z-40 border-b border-foreground/10 bg-white/80 px-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-white/80 text-foreground shadow-sm transition hover:border-foreground/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-white/20"
                            aria-label="Toggle navigation menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Toggle navigation menu</span>
                            <span className="flex flex-col items-center justify-center gap-1.5">
                                <span className="block h-0.5 w-5 rounded bg-current" />
                                <span className="block h-0.5 w-5 rounded bg-current" />
                                <span className="block h-0.5 w-5 rounded bg-current" />
                            </span>
                        </button>
                        <div className="flex items-center gap-2">
                            <Image
                                src="/axxetio_logo.png"
                                alt="Axxetio logo"
                                width={36}
                                height={36}
                            />
                            <div className="hidden sm:flex sm:flex-col">
                                <span className="text-sm font-semibold leading-none">Axxetio Ops</span>
                                <span className="text-xs text-foreground/60">Intelligent asset visibility</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden items-center gap-4 text-sm font-medium text-foreground/70 sm:flex">
                        {NAV_ITEMS.slice(0, 3).map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="rounded-full px-3 py-1 transition hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>

            <main className="relative z-10 min-h-screen pt-20 transition-[padding] duration-300 ease-in-out lg:pl-64">
                {children}
            </main>
        </div>
    );
}
