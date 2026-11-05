import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteFooter, SiteHeader } from "@/components/site/Chrome";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404 · 越过边界</p>
        <h1 className="mt-4 text-4xl">此页不在图谱之内</h1>
        <p className="mt-4 text-sm text-muted-foreground">您访问的页面不存在或已被移动。</p>
        <Link to="/" className="mt-8 inline-block font-serif text-gold link-ed">
          返回首页 →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl">页面未能加载</h1>
        <p className="mt-2 text-sm text-muted-foreground">出现了一个错误，请重试或返回首页。</p>
        <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="font-serif text-gold link-ed"
          >
            重试
          </button>
          <a href="/" className="font-serif link-ed">
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}

const themeScript = `try{var t=localStorage.getItem('thr-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "阈 THRESHOLD · 独立研究机构" },
      {
        name: "description",
        content: "阈是一家研究技术、产业、资本、社会与文明长期结构变化的独立研究机构。",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0f1626" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preload", as: "image", href: "/images/threshold-hero-scene.svg" },
    ],
    scripts: [{ children: themeScript }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}