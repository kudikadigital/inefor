"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#") || href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("/#", "").replace("#", "");
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  const isLight = scrolled;

  const linkClass = cn(
    "px-3 py-2 text-sm transition-colors duration-200 rounded-sm flex items-center gap-1.5",
  );

  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/Inefor.consultoria" },
    { icon: Instagram, href: "https://www.instagram.com/inefor_lda/" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/inefor-ltd-796727197",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/channel/UCZYlzvX_eF7tAAmW3NmYC-g",
    },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-(--bg-base)/95 backdrop-blur-md border-b border-(--border-base) shadow-sm"
          : "bg-transparent",
      )}
    >
      {/* ── TOP BAR ─────────────────────────────────────────── */}
      <div
        className={cn(
          "hidden lg:block border-b transition-all duration-500 overflow-hidden",
          scrolled
            ? "max-h-0 opacity-0 border-transparent"
            : "max-h-10 opacity-100 border-white/10",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-5">
              <a
                href="tel:+244944683483"
                className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors"
              >
                <Phone className="w-3 h-3" /> +244 944 683 483
              </a>
              <a
                href="mailto:geral@inefor.ao"
                className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors"
              >
                <Mail className="w-3 h-3" /> geral@inefor.ao
              </a>
            </div>
            <div className="flex items-center gap-1">
              {socials.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-sm hover:bg-white/10"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative h-8 w-28">
              <Image
                src={
                  scrolled && theme === "light"
                    ? "/logo-dark.png"
                    : "/logo-light.png"
                }
                alt="Inefor"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <div
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={cn(
                        linkClass,
                        isLight
                          ? "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated)"
                          : "text-white/80 hover:text-white hover:bg-white/10",
                      )}
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                    </button>

                    {/* Dropdown — pt-1 bridges the gap so mouse doesn't leave */}
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 w-52 z-50 pt-1">
                        <div className="bg-(--bg-card) border border-(--border-base) rounded-lg shadow-xl py-1">
                          {item.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              onClick={(e) => handleNavClick(e, child.href)}
                              className="block px-4 py-2.5 text-sm text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated) transition-colors"
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      linkClass,
                      isLight
                        ? "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated)"
                        : "text-white/80 hover:text-white hover:bg-white/10",
                      item.comingSoon && "opacity-40 pointer-events-none",
                    )}
                  >
                    {item.label}
                    {item.comingSoon && (
                      <span className="text-[10px] text-blue-400 font-medium">
                        em breve
                      </span>
                    )}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="https://wa.me/244944683483"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "text-xs h-8",
                  !scrolled &&
                    "border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50",
                )}
              >
                Falar connosco
              </Button>
            </Link>
            <Link href="/suporte">
              <Button
                size="sm"
                className="text-xs h-8 bg-primary hover:bg-primary-700 text-white border-0"
              >
                Área de Apoio
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className={cn(
                "p-2 rounded-sm transition-colors",
                scrolled
                  ? "text-(--text-secondary) hover:text-(--text-primary)"
                  : "text-white/80 hover:text-white",
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ──────────────────────────────────────── */}
      {isOpen && (
        <div className="lg:hidden bg-(--bg-card)/95 backdrop-blur-md border-t border-(--border-base)">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "block px-3 py-2.5 text-sm rounded-sm transition-colors",
                    item.comingSoon
                      ? "text-(--text-subtle) pointer-events-none"
                      : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated)",
                  )}
                >
                  {item.label}
                  {item.comingSoon && (
                    <span className="ml-2 text-[10px] text-blue-400">
                      em breve
                    </span>
                  )}
                </a>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={(e) => handleNavClick(e, child.href)}
                        className="block px-3 py-2 text-xs text-(--text-muted) hover:text-(--text-secondary) transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-(--border-base) space-y-2">
              <a
                href="tel:+244944683483"
                className="flex items-center gap-2 text-xs text-(--text-muted) hover:text-(--text-primary) transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> +244 944 683 483
              </a>
              <a
                href="mailto:geral@inefor.ao"
                className="flex items-center gap-2 text-xs text-(--text-muted) hover:text-(--text-primary) transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> geral@inefor.ao
              </a>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <Button variant="outline" size="sm">
                Falar connosco
              </Button>
              <Button size="sm" className="bg-primary text-white">
                Área de Apoio
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
