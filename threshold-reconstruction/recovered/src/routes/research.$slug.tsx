import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ARTICLES, articleBySlug, domainOf } from "@/content/data";
import { ArticleRow, DemoLabel, EvidenceTag } from "@/components/site/ui";

export const Route = createFileRoute("/research/$slug")({
  loader: ({ params }) => {
    const a = articleBySlug(params.slug);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} · 阈 THRESHOLD` },
          { name: "description", content: loaderData.abstract },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.abstract },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "未找到 · 阈" }, { name: "robots", content: "noindex" }],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const a = Route.useLoaderData();
  const d = domainOf(a.domain);
  const max = Math.max(...a.chart.values);
  return (
    <article>
      <header className="container-ed pt-36 md:pt-44">
        <Link to="/research" className="meta link-ed">
          ← 研究中心
        </Link>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 meta">
          <span className="text-gold">{a.issue}</span>
          <span>{a.column}</span>
          <span>{d.zh}</span>
          <span>{a.format}</span>
          <DemoLabel>编辑演示 · 非已核实事实</DemoLabel>
        </div>
        <h1 className="mt-6 max-w-4xl text-4xl leading-tight md:text-6xl">{a.title}</h1>
        <p className="mt-5 max-w-3xl font-serif text-xl text-muted-foreground">{a.subtitle}</p>
        <div className="mt-8 flex gap-6 border-y border-rule py-4 meta">
          <span>{a.author}</span>
          <span>{a.date}</span>
          <span>{a.readMin} 分钟阅读</span>
        </div>
      </header>
      <div className="container-ed mt-14 grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <nav aria-label="目录" className="lg:sticky lg:top-24">
            <p className="eyebrow">目录</p>
            <ol className="mt-4 space-y-3 text-sm">
              {a.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="link-ed">
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#method" className="link-ed">
                  方法与来源
                </a>
              </li>
              <li>
                <a href="#log" className="link-ed">
                  更新记录
                </a>
              </li>
            </ol>
            <div className="mt-8 space-y-2 text-xs text-muted-foreground">
              <p className="flex gap-2">
                <EvidenceTag type="fact" />
                可核实的陈述
              </p>
              <p className="flex gap-2">
                <EvidenceTag type="analysis" />
                基于证据的判断
              </p>
              <p className="flex gap-2">
                <EvidenceTag type="hypothesis" />
                待检验的推测
              </p>
            </div>
          </nav>
        </aside>
        <div className="prose-ed lg:col-span-7">
          <p className="border-l-2 border-gold pl-5 text-muted-foreground">{a.abstract}</p>
          {a.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="mt-14 scroll-mt-24">
              <h2 className="mb-6 flex items-center gap-3 text-2xl">
                {s.title}
                {s.evidence && <EvidenceTag type={s.evidence} />}
              </h2>
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {s.quote && (
                <blockquote className="my-10 border-y border-rule py-8 text-center font-serif text-2xl leading-relaxed text-gold md:text-3xl">
                  “{s.quote}”
                </blockquote>
              )}
              {i === 0 && (
                <figure className="my-10 border border-rule p-6">
                  <figcaption className="flex justify-between gap-4 meta">
                    <span>{a.chart.label}</span>
                    <span>{a.chart.unit}</span>
                  </figcaption>
                  <svg
                    viewBox="0 0 300 120"
                    className="mt-4 w-full"
                    role="img"
                    aria-label={a.chart.label}
                  >
                    {a.chart.values.map((v, k) => (
                      <g key={k}>
                        <rect
                          x={k * 50 + 12}
                          y={100 - (v / max) * 85}
                          width={26}
                          height={(v / max) * 85}
                          className="fill-gold"
                          opacity={0.35 + k * 0.1}
                        />
                        <text
                          x={k * 50 + 25}
                          y={115}
                          textAnchor="middle"
                          className="fill-muted-foreground"
                          fontSize="7"
                        >
                          {a.chart.axis[k]}
                        </text>
                      </g>
                    ))}
                  </svg>
                </figure>
              )}
            </section>
          ))}
          <section
            id="method"
            className="mt-16 scroll-mt-24 border-t border-rule pt-8 font-sans text-sm leading-loose"
          >
            <h2 className="mb-4 font-serif text-xl">方法与来源</h2>
            <p>{a.methodology}</p>
            <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
              {a.sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </section>
          <section id="log" className="mt-10 scroll-mt-24 font-sans text-sm">
            <h2 className="mb-4 font-serif text-xl">更新记录</h2>
            <ul>
              {a.updates.map((u) => (
                <li key={u.date} className="flex gap-6 border-t border-rule py-2">
                  <span className="meta">{u.date}</span>
                  {u.note}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <section className="container-ed mt-24">
        <p className="eyebrow mb-4">相关研究</p>
        {ARTICLES.filter(
          (x) => x.slug !== a.slug && (x.domain === a.domain || x.column === a.column),
        )
          .slice(0, 3)
          .map((x) => (
            <ArticleRow key={x.slug} a={x} />
          ))}
      </section>
    </article>
  );
}