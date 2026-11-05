import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "关于 · 阈 THRESHOLD" },
      { name: "description", content: "阈的使命、研究方法、编辑标准、更正政策与独立性原则。" },
      { property: "og:title", content: "关于 · 阈" },
      { property: "og:description", content: "使命、方法与编辑标准。" },
    ],
  }),
  component: About,
});

const blocks = [
  [
    "mission",
    "使命",
    "阈研究技术、产业、资本、社会与文明的长期结构变化。我们的目标不是预测，而是提供理解变化的框架。",
  ],
  [
    "method",
    "研究方法",
    "历史类比、结构访谈、情景分析与产业链拆解。每篇研究都附有方法说明，并标注其局限。",
  ],
  [
    "standards",
    "编辑标准",
    "所有陈述区分为三类：事实（可核实）、分析（基于证据的判断）、假设（待检验的推测）。假设须附证伪条件。",
  ],
  [
    "corrections",
    "更正政策",
    "发现错误后，我们将在原文更新记录中注明更正内容与日期，不做无痕修改。",
  ],
  [
    "independence",
    "独立性与披露",
    "阈不接受影响研究结论的委托。任何可能构成利益关系的资金来源与合作，将在相关研究中逐项披露。",
  ],
];

function About() {
  return (
    <>
      <PageIntro
        no="T"
        eyebrow="About"
        title="关于阈"
        lede="“阈”是变化发生前的那道边界。我们在这里观察。"
      />
      <div className="container-ed">
        {blocks.map(([id, t, d], i) => (
          <section
            key={id}
            id={id}
            className="grid scroll-mt-24 gap-6 border-t border-rule py-12 md:grid-cols-12"
          >
            <p className="meta text-gold md:col-span-2">0{i + 1}</p>
            <h2 className="text-3xl md:col-span-3">{t}</h2>
            <p className="font-serif text-lg leading-loose md:col-span-6">{d}</p>
          </section>
        ))}
      </div>
    </>
  );
}