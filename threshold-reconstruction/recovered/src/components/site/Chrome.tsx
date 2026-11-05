import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Subscribe } from "./ui";

export const NAV = [
  { to: "/", zh: "首页", en: "Home" },
  { to: "/research", zh: "研究中心", en: "Research" },
  { to: "/topics", zh: "产业图谱", en: "Atlas" },
  { to: "/signals", zh: "信号观测", en: "Signals" },
  { to: "/about", zh: "关于阈", en: "About" },
] as const;

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  const overHero = path === "/" && !scrolled && !open;
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-500",
        overHero
          ? "border-b border-transparent"
          : "border-b border-rule bg-background/85 backdrop-blur-md",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-background focus:px-3 focus:py-2"
      >
        跳到正文
      </a>
      <div className="container-ed flex h-16 items-center justify-between">
        <Link
          to="/"
          className={cn("flex items-baseline gap-3", overHero && "text-hero")}
          aria-label="阈 THRESHOLD 首页"
        >
          <svg
            viewBox="0 0 24 28"
            className="h-6 w-5 shrink-0 self-center text-gold"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M3 27V11a9 9 0 0 1 18 0v16" />
            <path d="M7.5 27V12a4.5 4.5 0 0 1 9 0v15" />
            <path d="M1 27h22" />
          </svg>
          <span className="font-serif text-2xl">阈</span>
          <span className="font-display text-sm tracking-[0.35em]">THRESHOLD</span>
        </Link>
        <nav aria-label="主导航" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={cn(
                    "font-serif text-[15px] link-ed pb-1",
                    overHero ? "text-hero" : "text-foreground/85",
                  )}
                  activeProps={{ className: "text-gold" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.zh}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={cn("grid h-9 w-9 place-items-center lg:hidden", overHero && "text-hero")}
            aria-expanded={open}
            aria-controls="mnav"
            aria-label={open ? "关闭菜单" : "打开菜单"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mnav"
          aria-label="移动导航"
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-rule bg-background lg:hidden"
        >
          <ul className="container-ed py-8">
            {NAV.map((n, i) => (
              <li key={n.to} className="border-b border-rule">
                <Link
                  to={n.to}
                  className="flex items-baseline justify-between py-5"
                  activeProps={{ className: "text-gold" }}
                >
                  <span className="font-serif text-3xl">{n.zh}</span>
                  <span className="meta">
                    0{i + 1} · {n.en}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="container-ed grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-6xl">阈</p>
          <p className="mt-4 font-display text-sm tracking-[0.35em] text-muted-foreground">
            THRESHOLD · INDEPENDENT RESEARCH
          </p>
          <p className="mt-8 max-w-sm font-serif text-lg leading-relaxed">
            在变化发生之前，看见结构。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-3">
          <ul className="space-y-3 text-sm">
            {NAV.slice(0, 3).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link-ed">
                  {n.zh}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-3 text-sm">
            {NAV.slice(3).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link-ed">
                  {n.zh}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <Subscribe compact />
        </div>
      </div>
      <div className="container-ed flex flex-wrap justify-between gap-4 border-t border-rule py-6 meta">
        <span>© 2026 阈 THRESHOLD · 本站为演示站点，所有内容与数据均为示例</span>
        <span>
          <Link to="/about" hash="corrections" className="link-ed">
            更正政策
          </Link>{" "}
          ·{" "}
          <Link to="/about" hash="independence" className="link-ed">
            独立性声明
          </Link>
        </span>
      </div>
    </footer>
  );
}