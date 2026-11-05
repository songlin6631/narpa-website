import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DemoLabel, PageIntro } from "@/components/site/ui";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "会员 · 阈 THRESHOLD" },
      { name: "description", content: "免费阅读与未来付费研究产品的说明，以及候补名单。" },
      { property: "og:title", content: "会员 · 阈" },
      { property: "og:description", content: "免费阅读将始终保留。" },
    ],
  }),
  component: Membership,
});

function Waitlist() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <Dialog onOpenChange={(o) => !o && setDone(false)}>
      <DialogTrigger className="border border-gold px-6 py-3 font-serif text-gold transition-colors hover:bg-gold hover:text-background">
        加入候补名单
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="font-serif text-2xl">候补名单</DialogTitle>
        <DialogDescription>
          演示功能：信息仅保存在当前页面状态中，不会提交到任何服务器。
        </DialogDescription>
        {done ? (
          <p role="status" className="font-serif text-gold">
            已记录（演示）。感谢您的关注。
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
            className="space-y-4"
          >
            <label className="block text-sm">
              邮箱
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border-b border-rule bg-transparent py-2 outline-none focus:border-gold"
              />
            </label>
            <button type="submit" className="font-serif text-gold link-ed">
              提交 →
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Membership() {
  return (
    <>
      <PageIntro
        no="M"
        eyebrow="Membership"
        title="阅读，始终免费。"
        lede="付费研究产品仍在规划中，尚未开放购买。我们不展示订阅人数，也不提供结算。"
      >
        <DemoLabel>规划阶段</DemoLabel>
      </PageIntro>
      <div className="container-ed grid gap-px bg-rule md:grid-cols-2">
        <section className="bg-background p-10">
          <p className="meta">现在 · 免费</p>
          <h2 className="mt-3 text-3xl">公共阅读</h2>
          <ul className="mt-6 space-y-3 text-muted-foreground">
            <li>— 全部长篇研究与简报</li>
            <li>— 信号观测站</li>
            <li>— 双周研究通讯</li>
          </ul>
        </section>
        <section className="bg-background p-10">
          <p className="meta text-gold">未来 · 规划中</p>
          <h2 className="mt-3 text-3xl">研究产品</h2>
          <ul className="mt-6 space-y-3 text-muted-foreground">
            <li>— 专题数据档案与方法附录</li>
            <li>— 季度闭门研讨（形式待定）</li>
            <li>— 定价与上线时间尚未确定</li>
          </ul>
          <div className="mt-8">
            <Waitlist />
          </div>
        </section>
      </div>
    </>
  );
}