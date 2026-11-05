import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DOMAINS, domainOf, EVIDENCE_LABEL, SIGNALS, type Evidence } from "@/content/data";
import { DemoLabel, EvidenceTag, PageIntro } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signals")({
  head: () => ({
    meta: [
      { title: "信号观测站 · 阈 THRESHOLD" },
      {
        name: "description",
        content: "按时间排列的结构变化信号，区分事实、分析与假设并标注置信度。",
      },
      { property: "og:title", content: "信号观测站 · 阈" },
      { property: "og:description", content: "变化的早期记录。" },
    ],
  }),
  component: Signals,
});

function Signals() {
  const [ev, setEv] = useState<Evidence | "all">("all");
  const [dom, setDom] = useState<string>("all");
  const list = SIGNALS.filter(
    (s) => (ev === "all" || s.evidence === ev) && (dom === "all" || s.domain === dom),
  );
  const chip = (on: boolean) =>
    cn(
      "border px-3 py-1.5 text-sm",
      on ? "border-gold text-gold" : "border-rule text-muted-foreground",
    );
  return (
    <>
      <PageIntro
        no="S"
        eyebrow="Signal Observatory"
        title="信号观测站"
        lede="每条信号标注首次观察日期、证据类型与置信度。来源链接均为演示占位。"
      >
        <DemoLabel />
      </PageIntro>
      <div className="container-ed">
        <div className="flex flex-wrap gap-2 border-y border-rule py-5">
          <button
            className={chip(ev === "all")}
            aria-pressed={ev === "all"}
            onClick={() => setEv("all")}
          >
            全部类型
          </button>
          {(Object.keys(EVIDENCE_LABEL) as Evidence[]).map((k) => (
            <button
              key={k}
              className={chip(ev === k)}
              aria-pressed={ev === k}
              onClick={() => setEv(k)}
            >
              {EVIDENCE_LABEL[k]}
            </button>
          ))}
          <span className="mx-2 w-px bg-rule" />
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
        <ol className="relative mt-10 border-l border-rule pl-8">
          {list.map((s) => (
            <li key={s.id} className="relative pb-12">
              <span
                className="absolute -left-[37px] top-1.5 h-2 w-2 rounded-full bg-gold"
                aria-hidden
              />
              <div className="flex flex-wrap items-center gap-4 meta">
                <time>{s.date}</time>
                <span>{s.id}</span>
                <span>{domainOf(s.domain).zh}</span>
                <EvidenceTag type={s.evidence} />
                <span>置信度 · {s.confidence}</span>
              </div>
              <h2 className="mt-3 max-w-3xl text-2xl leading-snug">{s.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-loose text-muted-foreground">
                <span className="text-gold">为何重要 · </span>
                {s.why}
              </p>
              <p className="mt-2 meta">来源：{s.source}</p>
            </li>
          ))}
          {list.length === 0 && (
            <li className="py-10 font-serif text-muted-foreground">暂无符合条件的信号。</li>
          )}
        </ol>
      </div>
    </>
  );
}