import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ARTICLES, DOMAINS, type DomainKey } from "@/content/data";
import { ArticleRow, DemoLabel, PageIntro } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/research/")({
  head: () => ({
    meta: [
      { title: "研究中心 · 阈 THRESHOLD" },
      { name: "description", content: "阈的研究报告、长文、简报与访谈档案，可按领域与形式筛选。" },
      { property: "og:title", content: "研究中心 · 阈" },
      { property: "og:description", content: "按领域、形式检索阈的研究出版物。" },
    ],
  }),
  component: Research,
});

const FORMATS = ["全部", "报告", "长文", "简报", "访谈"] as const;

function Research() {
  const [q, setQ] = useState("");
  const [dom, setDom] = useState<DomainKey | "all">("all");
  const [fmt, setFmt] = useState<(typeof FORMATS)[number]>("全部");
  const list = useMemo(
    () =>
      ARTICLES.filter(
        (a) =>
          (dom === "all" || a.domain === dom) &&
          (fmt === "全部" || a.format === fmt) &&
          (!q ||
            (a.title + a.subtitle + a.abstract + a.issue).toLowerCase().includes(q.toLowerCase())),
      ),
    [q, dom, fmt],
  );
  const chip = (on: boolean) =>
    cn(
      "border px-3 py-1.5 text-sm transition-colors",
      on ? "border-gold text-gold" : "border-rule text-muted-foreground hover:text-foreground",
    );
  return (
    <>
      <PageIntro
        no="R"
        eyebrow="Research Center"
        title="研究中心"
        lede="每篇出版物均标注编号、方法与来源说明。当前收录内容为编辑演示。"
      >
        <DemoLabel />
      </PageIntro>
      <div className="container-ed">
        <div className="grid gap-6 border-y border-rule py-6 md:grid-cols-12">
          <label className="md:col-span-4">
            <span className="sr-only">搜索</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索标题、摘要或编号…"
              className="w-full border-b border-rule bg-transparent py-2 font-serif outline-none focus:border-gold"
            />
          </label>
          <div
            className="flex flex-wrap gap-2 md:col-span-8 md:justify-end"
            role="group"
            aria-label="领域"
          >
            <button
              className={chip(dom === "all")}
              aria-pressed={dom === "all"}
              onClick={() => setDom("all")}
            >
              全部领域
            </button>
            {DOMAINS.map((d) => (
              <button
                key={d.key}
                className={chip(dom === d.key)}
                aria-pressed={dom === d.key}
                onClick={() => setDom(d.key)}
              >
                {d.zh}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 md:col-span-12" role="group" aria-label="形式">
            {FORMATS.map((f) => (
              <button
                key={f}
                className={chip(fmt === f)}
                aria-pressed={fmt === f}
                onClick={() => setFmt(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <p className="meta mt-6" role="status">
          共 {list.length} 篇
        </p>
        <div className="mt-4">
          {list.map((a, i) => (
            <ArticleRow key={a.slug} a={a} index={i} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-20 text-center font-serif text-muted-foreground">
            没有符合条件的出版物。
          </p>
        )}
      </div>
    </>
  );
}