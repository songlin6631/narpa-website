import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES, DOMAINS, SIGNALS } from "@/content/data";
import { ArticleRow, DemoLabel, EvidenceTag, SectionHead, Subscribe } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "阈 THRESHOLD · 在变化发生之前，看见结构" },
      {
        name: "description",
        content: "独立研究机构，研究技术、产业、资本、社会与文明的长期结构变化。",
      },
      { property: "og:title", content: "阈 THRESHOLD · 独立研究" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "在变化发生之前，看见结构。" },
    ],
  }),
  component: Home,
});

function Hero() {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-ink"
      aria-label="阈 · 首页主视觉"
    >
      <img
        src="/images/threshold-hero-scene.svg"
        alt=""
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-[center_35%]"
      />
      <div className="pointer-events-none absolute inset-0 hero-scrim" aria-hidden />
      <div className="container-ed relative flex min-h-[100svh] flex-col justify-end pb-20 pt-32 md:justify-center md:pb-24">
        <p className="eyebrow text-hero-gold animate-fade-up">INDEPENDENT RESEARCH INSTITUTE</p>
        <h1 className="animate-fade-up mt-6 text-[2.6rem] leading-[1.2] text-hero sm:text-6xl md:text-7xl">
          <span className="block whitespace-nowrap">在变化发生之前，</span>
          <span className="block whitespace-nowrap text-hero-gold">看见结构。</span>
        </h1>
        <div className="animate-fade-up mt-8 max-w-md space-y-2 leading-loose text-hero-muted">
          <p>研究技术、产业与资本的深层变化。</p>
          <p>在信息抵达共识之前，理解正在形成的未来。</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4 font-serif">
          <Link
            to="/research"
            className="border border-gold bg-gold px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90"
          >
            进入研究中心 →
          </Link>
          <Link
            to="/about"
            className="border border-hero-line px-6 py-3 text-hero transition-colors hover:border-gold"
          >
            理解「阈」
          </Link>
        </div>
      </div>
    </section>
  );
}

const FOCUS = [
  {
    no: "01",
    zh: "产业全景 · AI基础设施",
    desc: "算力、能源与数据中心的结构性重组。",
    img: "/images/card-1.svg",
    to: "/research" as const,
  },
  {
    no: "02",
    zh: "企业档案",
    desc: "以长期视角记录关键企业的战略与边界。",
    img: "/images/card-2.svg",
    to: "/topics" as const,
  },
  {
    no: "03",
    zh: "产业信号",
    desc: "变化的早期迹象，标注证据层级与置信度。",
    img: "/images/card-3.svg",
    to: "/signals" as const,
  },
];

function Focus() {
  return (
    <section>
      <div className="grid gap-6 border-t border-rule pt-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="eyebrow text-gold">RESEARCH FOCUS</p>
          <h2 className="mt-3 text-3xl md:text-4xl">核心研究领域</h2>
        </div>
        <p className="self-end text-sm leading-relaxed text-muted-foreground md:col-span-4">
          从基础设施到企业与信号，三条入口通向同一个问题：结构如何改变。
        </p>
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {FOCUS.map((f) => (
          <li key={f.no}>
            <Link
              to={f.to}
              className="group flex h-full flex-col border border-rule bg-card transition-colors hover:border-gold"
            >
              <img
                src={f.img}
                alt=""
                width={768}
                height={480}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <p className="meta text-gold">{f.no}</p>
                <h3 className="mt-2 text-xl">{f.zh}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
                <span className="mt-5 font-serif text-gold">进入 →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Home() {
  const featured = ARTICLES.filter((a) => a.featured);
  return (
    <>
      <Hero />
      <div className="container-ed space-y-32 pt-24">
        <Focus />
        <section className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">
            <span className="text-gold">00</span> — 定位
          </p>
          <p className="font-serif text-2xl leading-relaxed md:col-span-8 md:text-3xl">
            我们不追逐新闻，而是追踪规则的变化。周期改变数量，结构改变规则——阈关注的是后者。
          </p>
        </section>
        <section>
          <SectionHead no="01" eyebrow="研究领域" title="五个领域，一个问题：结构如何改变。" />
          <ol className="mt-10 grid md:grid-cols-5">
            {DOMAINS.map((d) => (
              <li
                key={d.key}
                className="border-t border-rule py-6 md:border-t-0 md:border-l md:px-5"
              >
                <p className="meta text-gold">{d.no}</p>
                <h3 className="mt-3 text-2xl">{d.zh}</h3>
                <p className="font-display text-sm italic text-muted-foreground">{d.en}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              </li>
            ))}
          </ol>
        </section>
        <section>
          <SectionHead no="02" eyebrow="精选研究" title="长篇研究" aside={<DemoLabel />} />
          <div className="mt-8">
            {featured.concat(ARTICLES.slice(2, 4)).map((a, i) => (
              <ArticleRow key={a.slug} a={a} index={i} />
            ))}
          </div>
        </section>
        <section>
          <SectionHead
            no="03"
            eyebrow="最新信号"
            title="变化的早期记录"
            aside={
              <Link to="/signals" className="link-ed text-gold">
                全部信号 →
              </Link>
            }
          />
          <ul className="mt-8 grid gap-px bg-rule md:grid-cols-3">
            {SIGNALS.slice(0, 3).map((s) => (
              <li key={s.id} className="bg-background p-6">
                <div className="flex justify-between meta">
                  <span>{s.id}</span>
                  <EvidenceTag type={s.evidence} />
                </div>
                <p className="mt-4 font-serif text-lg leading-snug">{s.title}</p>
                <p className="mt-3 text-sm text-muted-foreground">{s.why}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <SectionHead no="04" eyebrow="三种能力" title="观察 · 解释 · 连接" />
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              ["观察", "Observe", "记录变化的早期迹象，并标注证据层级与置信度。"],
              ["解释", "Interpret", "以框架而非结论回应变化，明确区分事实、分析与假设。"],
              ["连接", "Connect", "把分散的领域放进同一张图谱，看见它们之间的传导关系。"],
            ].map(([z, e, d]) => (
              <div key={z}>
                <p className="font-serif text-5xl">{z}</p>
                <p className="mt-1 font-display italic text-gold">{e}</p>
                <p className="mt-5 text-sm leading-loose text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="border border-rule p-8 md:p-14">
          <p className="eyebrow">
            季度专题 · 2026 Q4 <DemoLabel className="ml-3" />
          </p>
          <h2 className="mt-6 text-4xl md:text-5xl">当算力成为基础设施</h2>
          <p className="mt-6 max-w-2xl leading-loose text-muted-foreground">
            本季度专题围绕算力的“基础设施化”展开：能源、选址、折旧与治理。
          </p>
          <Link
            to="/research/$slug"
            params={{ slug: "compute-as-infrastructure" }}
            className="mt-8 inline-block font-serif text-gold link-ed"
          >
            阅读专题主报告 →
          </Link>
        </section>
        <section className="grid gap-10 md:grid-cols-2">
          <h2 className="text-4xl">每两周，一封关于结构的信。</h2>
          <Subscribe />
        </section>
      </div>
    </>
  );
}