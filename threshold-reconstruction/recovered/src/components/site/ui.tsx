import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { domainOf, EVIDENCE_LABEL, type Article, type Evidence } from "@/content/data";

export function DemoLabel({
  className,
  children = "演示内容 / 示例数据",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-dashed border-border px-2 py-0.5 font-mono text-[10px] tracking-widest text-muted-foreground",
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
      {children}
    </span>
  );
}

const evClass: Record<Evidence, string> = {
  fact: "border-fact text-fact",
  analysis: "border-analysis text-analysis",
  hypothesis: "border-hypothesis text-hypothesis border-dashed",
};
export function EvidenceTag({ type }: { type: Evidence }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-1.5 py-px font-mono text-[10px] tracking-widest",
        evClass[type],
      )}
    >
      {EVIDENCE_LABEL[type]}
    </span>
  );
}

export function SectionHead({
  no,
  eyebrow,
  title,
  aside,
}: {
  no: string;
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="grid gap-6 border-t border-rule pt-6 md:grid-cols-12">
      <div className="md:col-span-3">
        <p className="eyebrow">
          <span className="text-gold">{no}</span> — {eyebrow}
        </p>
      </div>
      <h2 className="text-3xl leading-tight md:col-span-6 md:text-4xl">{title}</h2>
      {aside && (
        <div className="text-sm leading-relaxed text-muted-foreground md:col-span-3">{aside}</div>
      )}
    </div>
  );
}

export function PageIntro({
  no,
  eyebrow,
  title,
  lede,
  children,
}: {
  no: string;
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="container-ed pt-36 pb-14 md:pt-44">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="eyebrow animate-fade-up">
          <span className="text-gold">{no}</span> · {eyebrow}
        </p>
        {children}
      </div>
      <div className="rule-gold mt-5 mb-10" />
      <div className="grid gap-8 md:grid-cols-12">
        <h1 className="animate-fade-up text-5xl leading-[1.1] md:col-span-7 md:text-7xl">
          {title}
        </h1>
        <p className="animate-fade-up self-end text-base leading-loose text-muted-foreground md:col-span-4 md:col-start-9">
          {lede}
        </p>
      </div>
    </header>
  );
}

export function ArticleRow({ a, index }: { a: Article; index?: number }) {
  const d = domainOf(a.domain);
  return (
    <Link
      to="/research/$slug"
      params={{ slug: a.slug }}
      className="group grid gap-3 border-t border-rule py-7 transition-colors hover:bg-muted/40 md:grid-cols-12 md:gap-6 md:px-2"
    >
      <div className="meta md:col-span-2">
        {index !== undefined && (
          <span className="mr-3 text-gold">{String(index + 1).padStart(2, "0")}</span>
        )}
        {a.issue}
      </div>
      <div className="md:col-span-6">
        <h3 className="text-xl leading-snug transition-colors group-hover:text-gold md:text-2xl">
          {a.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.subtitle}</p>
      </div>
      <div className="meta flex flex-wrap gap-x-4 gap-y-1 md:col-span-4 md:justify-end">
        <span>
          {d.zh} / {d.en}
        </span>
        <span>{a.format}</span>
        <span>{a.date}</span>
        <span>{a.readMin} 分钟</span>
      </div>
    </Link>
  );
}

export function Subscribe({ compact }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState("error");
        setState("done");
      }}
      className={cn("w-full", compact ? "max-w-md" : "max-w-xl")}
      noValidate
    >
      <label htmlFor={compact ? "sub-c" : "sub"} className="eyebrow">
        订阅《阈》研究通讯
      </label>
      <div className="mt-3 flex border-b border-foreground/40 focus-within:border-gold">
        <input
          id={compact ? "sub-c" : "sub"}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setState("idle");
          }}
          placeholder="your@email.com"
          className="min-w-0 flex-1 bg-transparent py-3 font-mono text-sm outline-none placeholder:text-muted-foreground/60"
          aria-invalid={state === "error"}
          aria-describedby="sub-status"
        />
        <button type="submit" className="px-2 font-serif text-sm text-gold link-ed">
          订阅 →
        </button>
      </div>
      <p
        id="sub-status"
        role="status"
        className="mt-2 min-h-5 font-mono text-[11px] text-muted-foreground"
      >
        {state === "error" && <span className="text-destructive">请输入有效的邮箱地址。</span>}
        {state === "done" && <>已记录（演示：仅保存在本页状态中，未实际发送）。</>}
        {state === "idle" && <>每两周一封。演示站点，不会实际发送邮件。</>}
      </p>
    </form>
  );
}