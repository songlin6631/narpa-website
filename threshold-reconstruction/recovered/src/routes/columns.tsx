import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES, COLUMNS } from "@/content/data";
import { PageIntro } from "@/components/site/ui";

export const Route = createFileRoute("/columns")({
  head: () => ({
    meta: [
      { title: "栏目 · 阈 THRESHOLD" },
      { name: "description", content: "阈·深读、阈·信号、阈·观察、阈·专题四个编辑栏目。" },
      { property: "og:title", content: "栏目 · 阈" },
      { property: "og:description", content: "四种节奏，四种阅读方式。" },
    ],
  }),
  component: Columns,
});

const covers = [
  "M10 90 A40 40 0 1 1 90 90",
  "M0 50 L100 50 M50 0 L50 100",
  "M20 20 L80 80 M80 20 L20 80",
  "M50 10 L90 90 L10 90 Z",
];

function Columns() {
  return (
    <>
      <PageIntro
        no="C"
        eyebrow="Columns"
        title="栏目"
        lede="四种节奏，对应四种阅读方式：深读、信号、观察与专题。"
      />
      <div className="container-ed grid gap-px bg-rule md:grid-cols-2">
        {COLUMNS.map((c, i) => {
          const items = ARTICLES.filter((a) => a.column === c.name);
          return (
            <section key={c.key} className="bg-background p-8 md:p-12">
              <svg
                viewBox="0 0 100 100"
                className="h-28 w-28 stroke-gold"
                fill="none"
                strokeWidth="0.8"
                aria-hidden
              >
                <circle cx="50" cy="50" r="46" className="stroke-rule" />
                <path d={covers[i]} />
              </svg>
              <p className="mt-8 meta">
                0{i + 1} · {c.en} · {c.cadence}
              </p>
              <h2 className="mt-3 text-4xl">{c.name}</h2>
              <p className="mt-4 max-w-md leading-loose text-muted-foreground">{c.desc}</p>
              <ul className="mt-6">
                {items.map((a) => (
                  <li key={a.slug} className="border-t border-rule py-3">
                    <Link
                      to="/research/$slug"
                      params={{ slug: a.slug }}
                      className="font-serif link-ed"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {c.key === "信号" && (
                <Link to="/signals" className="mt-4 inline-block text-gold link-ed">
                  进入信号观测站 →
                </Link>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}