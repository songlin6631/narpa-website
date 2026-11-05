import { ClientOnly, createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { articleBySlug, neighbors, TOPIC_ARTICLES, TOPICS } from "@/content/data";
import { DemoLabel, PageIntro } from "@/components/site/ui";
import { cn } from "@/lib/utils";

const AtlasScene = lazy(() => import("@/components/three/AtlasScene"));

export const Route = createFileRoute("/topics")({
  head: () => ({
    meta: [
      { title: "产业图谱 · 阈 THRESHOLD" },
      {
        name: "description",
        content: "人工智能、半导体、算力、能源、机器人、制造、资本、劳动与社会之间的关系图谱。",
      },
      { property: "og:title", content: "产业图谱 · 阈" },
      { property: "og:description", content: "一张可交互的结构关系图谱。" },
    ],
  }),
  component: Atlas,
});

function Atlas() {
  const [sel, setSel] = useState("ai");
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const u = () => setDark(document.documentElement.classList.contains("dark"));
    u();
    window.addEventListener("thr-theme", u);
    return () => window.removeEventListener("thr-theme", u);
  }, []);
  const t = TOPICS.find((x) => x.id === sel)!;
  const near = neighbors(sel);
  return (
    <>
      <PageIntro
        no="A"
        eyebrow="Industry Atlas"
        title="产业图谱"
        lede="点击节点或使用右侧列表，查看主题之间的传导关系。拖动可旋转视角。"
      >
        <DemoLabel>关系为编辑判断 · 示例</DemoLabel>
      </PageIntro>
      <div className="container-ed grid gap-8 lg:grid-cols-12">
        <div className="relative h-[460px] border border-rule md:h-[600px] lg:col-span-8">
          <ClientOnly fallback={null}>
            <Suspense fallback={<p className="p-6 meta">加载图谱…</p>}>
              <AtlasScene selected={sel} onSelect={setSel} dark={dark} />
            </Suspense>
          </ClientOnly>
        </div>
        <aside className="lg:col-span-4" aria-live="polite">
          <p className="eyebrow">已选节点</p>
          <h2 className="mt-3 text-4xl">{t.zh}</h2>
          <p className="font-display italic text-gold">{t.en}</p>
          <p className="mt-5 leading-loose text-muted-foreground">{t.desc}</p>
          <p className="eyebrow mt-8">关联主题</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {near.map((n) => (
              <button
                key={n}
                onClick={() => setSel(n)}
                className="border border-gold/60 px-3 py-1 text-sm text-gold"
              >
                {TOPICS.find((x) => x.id === n)!.zh}
              </button>
            ))}
          </div>
          <p className="eyebrow mt-8">相关研究</p>
          <ul className="mt-3">
            {(TOPIC_ARTICLES[sel] ?? []).map((s) => {
              const a = articleBySlug(s)!;
              return (
                <li key={s} className="border-t border-rule py-3">
                  <Link to="/research/$slug" params={{ slug: s }} className="font-serif link-ed">
                    {a.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
      <section className="container-ed mt-16">
        <h2 className="eyebrow">全部节点（列表视图）</h2>
        <ul className="mt-4 grid gap-px bg-rule sm:grid-cols-3">
          {TOPICS.map((x) => (
            <li key={x.id} className="bg-background">
              <button
                onClick={() => setSel(x.id)}
                aria-pressed={sel === x.id}
                className={cn("w-full p-4 text-left", sel === x.id && "text-gold")}
              >
                <span className="font-serif text-lg">{x.zh}</span>{" "}
                <span className="meta">{x.en}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}