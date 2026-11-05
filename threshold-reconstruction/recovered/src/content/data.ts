// 全部为演示内容 / 示例数据（editorial demo）。不代表已核实的现实事实。

export type DomainKey = "technology" | "industry" | "capital" | "society" | "global";

export const DOMAINS: { key: DomainKey; zh: string; en: string; no: string; desc: string }[] = [
  {
    key: "technology",
    zh: "技术",
    en: "Technology",
    no: "01",
    desc: "通用技术的扩散路径、成本曲线与工程约束，以及它们如何改写其他领域的可能性边界。",
  },
  {
    key: "industry",
    zh: "产业",
    en: "Industry",
    no: "02",
    desc: "产业链的分工、迁移与重组：谁在承接新的生产函数，谁的护城河正在失效。",
  },
  {
    key: "capital",
    zh: "资本",
    en: "Capital",
    no: "03",
    desc: "资本如何定价长期不确定性，以及资本周期与技术周期之间的错位。",
  },
  {
    key: "society",
    zh: "社会",
    en: "Society",
    no: "04",
    desc: "劳动、教育、城市与代际结构如何吸收技术冲击，又如何反过来塑造技术的方向。",
  },
  {
    key: "global",
    zh: "全球",
    en: "Global",
    no: "05",
    desc: "国家能力、供应链地理与制度竞争：结构性变化在世界范围内的不均匀分布。",
  },
];

export type Evidence = "fact" | "analysis" | "hypothesis";
export const EVIDENCE_LABEL: Record<Evidence, string> = {
  fact: "事实",
  analysis: "分析",
  hypothesis: "假设",
};

export type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  quote?: string;
  evidence?: Evidence;
};

export type Article = {
  slug: string;
  issue: string;
  title: string;
  subtitle: string;
  domain: DomainKey;
  format: "报告" | "长文" | "简报" | "访谈";
  date: string;
  readMin: number;
  author: string;
  column: string;
  featured?: boolean;
  abstract: string;
  methodology: string;
  sources: string[];
  sections: Section[];
  chart: { label: string; values: number[]; unit: string; axis: string[] };
  updates: { date: string; note: string }[];
};

const genericSources = [
  "【来源占位】一手资料：公开年报、监管文件（待编辑部核实后补充具体条目）",
  "【来源占位】行业访谈纪要（受访者匿名，访谈日期待补充）",
  "【来源占位】学术文献与工作论文（引用格式待定稿）",
];

export const ARTICLES: Article[] = [
  {
    slug: "compute-as-infrastructure",
    issue: "THR-R-2026-014",
    title: "算力成为基础设施之后",
    subtitle: "从“采购设备”到“规划电网”：一种生产要素的身份转变",
    domain: "technology",
    format: "报告",
    date: "2026-10-18",
    readMin: 38,
    author: "阈 研究部",
    column: "阈·深读",
    featured: true,
    abstract:
      "当一种资源从可选的工具变为默认的前提，它的定价方式、治理方式与地理分布都会随之改变。本文讨论算力在这一身份转变中可能面对的三个结构性约束：能源、选址与折旧。",
    methodology:
      "本文采用历史类比（电力、铁路、电信三次基础设施化过程）与结构访谈相结合的方法。示例数据为编辑部构造的示意值，仅用于说明分析框架，不代表任何实际统计。",
    sources: genericSources,
    sections: [
      {
        id: "s1",
        title: "一、身份的转变",
        evidence: "analysis",
        paragraphs: [
          "历史上，一种技术成为“基础设施”的标志，往往不是它变得更先进，而是它变得更无聊——人们不再讨论它本身，而是讨论在它之上能做什么。电力、铁路与通信网络都经历过这一过程。",
          "我们认为，算力正在进入类似的阶段。讨论的重心正在从单一芯片的性能，转向供电、冷却、选址与长期运营的系统问题。这一判断属于分析，而非对任何具体市场数据的陈述。",
        ],
        quote: "一种技术成为基础设施的标志，是它变得无聊。",
      },
      {
        id: "s2",
        title: "二、能源约束：第一道门槛",
        evidence: "hypothesis",
        paragraphs: [
          "如果算力需求的增长持续快于电网扩容的速度，那么决定算力布局的将不再是土地与人才，而是可获得的稳定电力。这是一个假设，其成立依赖于需求曲线的形态，而后者目前仍存在显著不确定性。",
          "在这一假设下，能源富集但远离传统产业中心的地区，可能获得新的区位意义。",
        ],
      },
      {
        id: "s3",
        title: "三、折旧与资本的耐心",
        evidence: "analysis",
        paragraphs: [
          "基础设施的经济学建立在长折旧周期之上，而计算硬件的技术迭代周期相对较短。两者的错位意味着资本需要新的方式来定价“过时风险”。",
          "这一错位或许会推动更多的模块化设计、租赁模式与二级市场，但其具体形态仍有待观察。",
        ],
      },
      {
        id: "s4",
        title: "四、待观察的问题",
        evidence: "hypothesis",
        paragraphs: [
          "我们列出三个将在后续研究中持续追踪的问题：电力获取是否成为算力项目的首要审批变量；算力是否会出现类似电价的区域化定价；以及公共部门在其中扮演的角色边界。",
        ],
      },
    ],
    chart: {
      label: "示意：三类基础设施的“扩散—常态化”阶段（示例数据）",
      values: [12, 28, 47, 66, 80, 88],
      unit: "指数",
      axis: ["T0", "T1", "T2", "T3", "T4", "T5"],
    },
    updates: [
      { date: "2026-10-18", note: "首次发布（演示）" },
      { date: "2026-10-25", note: "补充方法说明段落（演示）" },
    ],
  },
  {
    slug: "robotics-labor-threshold",
    issue: "THR-R-2026-012",
    title: "机器人与劳动的临界点",
    subtitle: "替代、补充还是重新定义岗位？三种情景的比较",
    domain: "society",
    format: "长文",
    date: "2026-10-06",
    readMin: 24,
    author: "阈 社会结构组",
    column: "阈·深读",
    featured: true,
    abstract:
      "讨论机器人技术进入制造与服务场景时，劳动结构可能经历的三种情景，并提出判断情景切换的观察指标框架。",
    methodology: "情景分析法。三种情景为分析框架，不构成预测。图表数据为示例数据。",
    sources: genericSources,
    sections: [
      {
        id: "s1",
        title: "一、为什么是“临界点”",
        evidence: "analysis",
        paragraphs: [
          "技术对劳动的影响很少是线性的。在成本、可靠性与组织适配跨过某个阈值之前，变化往往缓慢而分散；跨过之后，则可能在短时间内集中显现。",
          "本文关注的不是“会不会替代”，而是“在什么条件下，变化的速度会改变”。",
        ],
        quote: "问题不是会不会，而是在什么条件下，速度会改变。",
      },
      {
        id: "s2",
        title: "二、三种情景",
        evidence: "hypothesis",
        paragraphs: [
          "情景甲：替代主导，主要发生在高度标准化的工位。情景乙：补充主导，机器人承担危险与重复环节，人转向调度与质检。情景丙：岗位重新定义，新的职业类别出现。",
          "三者并非互斥，不同行业可能同时处于不同情景。",
        ],
      },
      {
        id: "s3",
        title: "三、观察指标",
        evidence: "analysis",
        paragraphs: [
          "我们建议持续观察：单位部署成本、平均无故障时间、培训周期与组织流程改造成本。这些指标的变化方向，比任何单一预测数字更有参考价值。",
        ],
      },
    ],
    chart: {
      label: "示意：三种情景下岗位结构的变化（示例数据）",
      values: [40, 35, 25, 30, 42, 28],
      unit: "%",
      axis: ["甲·前", "甲·后", "乙·前", "乙·后", "丙·前", "丙·后"],
    },
    updates: [{ date: "2026-10-06", note: "首次发布（演示）" }],
  },
  {
    slug: "semiconductor-geography",
    issue: "THR-R-2026-011",
    title: "半导体的新地理",
    subtitle: "供应链“冗余化”的成本由谁承担",
    domain: "global",
    format: "报告",
    date: "2026-09-22",
    readMin: 31,
    author: "阈 全球研究组",
    column: "阈·专题",
    abstract: "效率优先的全球分工正在让位于韧性优先的区域布局。本文讨论这一转变的成本分配问题。",
    methodology: "制度比较与产业链拆解。不使用任何未经核实的产能数据。",
    sources: genericSources,
    sections: [
      {
        id: "s1",
        title: "一、从效率到韧性",
        evidence: "analysis",
        paragraphs: [
          "过去数十年的产业分工以效率为核心目标。如今，越来越多的政策讨论将韧性置于同等甚至更高的位置。",
          "韧性并非免费。冗余的产能、重复的认证与分散的人才，都意味着更高的系统成本。",
        ],
        quote: "韧性并非免费，它只是换了一种方式记账。",
      },
      {
        id: "s2",
        title: "二、成本的分配",
        evidence: "hypothesis",
        paragraphs: [
          "这些成本最终由谁承担——终端消费者、企业利润、还是公共财政——将在很大程度上决定这一转变能走多远。",
        ],
      },
    ],
    chart: {
      label: "示意：效率与韧性权重的此消彼长（示例数据）",
      values: [85, 78, 70, 60, 55, 50],
      unit: "权重",
      axis: ["P1", "P2", "P3", "P4", "P5", "P6"],
    },
    updates: [{ date: "2026-09-22", note: "首次发布（演示）" }],
  },
  {
    slug: "patient-capital",
    issue: "THR-R-2026-009",
    title: "耐心资本的稀缺",
    subtitle: "长周期技术与短周期资金之间的结构性错配",
    domain: "capital",
    format: "长文",
    date: "2026-09-08",
    readMin: 19,
    author: "阈 资本研究组",
    column: "阈·观察",
    abstract: "硬科技的研发周期往往长于主流基金的存续期。本文讨论这一错配的后果与可能的制度回应。",
    methodology: "文献综述与结构访谈。观点为分析判断。",
    sources: genericSources,
    sections: [
      {
        id: "s1",
        title: "一、时间的错配",
        evidence: "analysis",
        paragraphs: [
          "一项基础材料或能源技术从实验室走向规模化，可能需要十年以上。而大多数风险资本的设计逻辑，是在更短的周期内实现退出。",
          "这种错配并不意味着某一方“错了”，而是两种合理逻辑之间的结构性张力。",
        ],
        quote: "两种合理逻辑之间，也会有结构性的张力。",
      },
      {
        id: "s2",
        title: "二、制度回应",
        evidence: "hypothesis",
        paragraphs: [
          "长期基金、产业资本、公共引导资金与新型债务工具，可能在不同阶段承担不同角色。具体组合仍需逐案分析。",
        ],
      },
    ],
    chart: {
      label: "示意：研发周期与资金周期的对比（示例数据）",
      values: [10, 7, 12, 6, 15, 8],
      unit: "年",
      axis: ["材料", "基金A", "能源", "基金B", "生物", "基金C"],
    },
    updates: [{ date: "2026-09-08", note: "首次发布（演示）" }],
  },
  {
    slug: "energy-transition-grid",
    issue: "THR-B-2026-021",
    title: "电网是新的边界",
    subtitle: "能源转型中被低估的系统工程",
    domain: "industry",
    format: "简报",
    date: "2026-08-27",
    readMin: 9,
    author: "阈 产业研究组",
    column: "阈·信号",
    abstract: "发电侧的变化常被讨论，输配电侧的约束却较少被关注。本简报梳理这一被低估的环节。",
    methodology: "简报形式，基于公开政策文本的结构梳理。",
    sources: genericSources,
    sections: [
      {
        id: "s1",
        title: "要点",
        evidence: "analysis",
        paragraphs: [
          "当发电变得更分散、更波动，电网就需要更强的调度、储能与跨区输送能力。",
          "电网投资的周期长、审批复杂，可能成为整个转型的节奏决定因素。",
        ],
        quote: "电网，可能是整个转型的节拍器。",
      },
    ],
    chart: {
      label: "示意：发电侧与电网侧投入节奏（示例数据）",
      values: [30, 18, 45, 22, 60, 30],
      unit: "指数",
      axis: ["发电1", "电网1", "发电2", "电网2", "发电3", "电网3"],
    },
    updates: [{ date: "2026-08-27", note: "首次发布（演示）" }],
  },
  {
    slug: "manufacturing-software-defined",
    issue: "THR-R-2026-007",
    title: "软件定义的制造",
    subtitle: "当生产线可以像代码一样被更新",
    domain: "industry",
    format: "报告",
    date: "2026-08-10",
    readMin: 27,
    author: "阈 产业研究组",
    column: "阈·深读",
    abstract: "讨论制造业中软件比重上升对组织结构、供应商关系与技能需求的影响。",
    methodology: "案例拆解（匿名化）与框架分析。",
    sources: genericSources,
    sections: [
      {
        id: "s1",
        title: "一、可更新的产线",
        evidence: "analysis",
        paragraphs: [
          "传统产线的调整依赖物理改造；软件比重上升后，部分调整可以通过参数与程序完成。",
          "这改变了制造企业与设备供应商之间的权力关系。",
        ],
        quote: "产线开始像代码一样被版本化。",
      },
      {
        id: "s2",
        title: "二、技能的迁移",
        evidence: "hypothesis",
        paragraphs: ["一线岗位的技能需求可能从操作转向诊断与调参，这对职业教育体系提出新的要求。"],
      },
    ],
    chart: {
      label: "示意：产线调整方式构成（示例数据）",
      values: [70, 30, 55, 45, 40, 60],
      unit: "%",
      axis: ["物理·早", "软件·早", "物理·中", "软件·中", "物理·近", "软件·近"],
    },
    updates: [{ date: "2026-08-10", note: "首次发布（演示）" }],
  },
  {
    slug: "interview-on-long-cycles",
    issue: "THR-I-2026-003",
    title: "关于长周期的一次对谈",
    subtitle: "如何在噪音中辨认结构",
    domain: "society",
    format: "访谈",
    date: "2026-07-19",
    readMin: 14,
    author: "阈 编辑部",
    column: "阈·观察",
    abstract:
      "一次关于研究方法的内部对谈：如何区分周期与结构、趋势与噪音。（演示内容，对谈者为虚构角色）",
    methodology: "对谈整理稿。对谈者为演示用虚构角色。",
    sources: genericSources,
    sections: [
      {
        id: "s1",
        title: "周期与结构",
        evidence: "analysis",
        paragraphs: [
          "问：如何判断一个变化是周期性的还是结构性的？",
          "答：一个粗略的标准是，看它是否改变了参与者的激励。周期改变的是数量，结构改变的是规则。",
        ],
        quote: "周期改变数量，结构改变规则。",
      },
    ],
    chart: {
      label: "示意：信号与噪音（示例数据）",
      values: [20, 50, 30, 60, 40, 70],
      unit: "强度",
      axis: ["1", "2", "3", "4", "5", "6"],
    },
    updates: [{ date: "2026-07-19", note: "首次发布（演示）" }],
  },
  {
    slug: "ai-diffusion-curve",
    issue: "THR-R-2026-005",
    title: "通用技术的扩散曲线",
    subtitle: "人工智能会更像电力，还是更像互联网？",
    domain: "technology",
    format: "长文",
    date: "2026-07-02",
    readMin: 22,
    author: "阈 研究部",
    column: "阈·专题",
    abstract: "通过比较电力与互联网两种扩散路径，讨论人工智能在组织层面的采纳可能呈现的形态。",
    methodology: "历史类比。类比的局限性在正文中逐一说明。",
    sources: genericSources,
    sections: [
      {
        id: "s1",
        title: "一、两条路径",
        evidence: "analysis",
        paragraphs: [
          "电力的生产率效应，需要工厂布局的整体重组才能释放；互联网则更多通过新的中介平台扩散。",
          "人工智能可能同时具有两种特征。",
        ],
        quote: "技术的效应，往往要等组织重写一遍之后才显现。",
      },
      {
        id: "s2",
        title: "二、组织的滞后",
        evidence: "hypothesis",
        paragraphs: ["如果组织重构是关键瓶颈，那么生产率的显著提升可能会滞后于技术能力本身。"],
      },
    ],
    chart: {
      label: "示意：两种扩散路径（示例数据）",
      values: [5, 15, 35, 60, 78, 90],
      unit: "采纳度",
      axis: ["Y1", "Y3", "Y5", "Y7", "Y9", "Y11"],
    },
    updates: [{ date: "2026-07-02", note: "首次发布（演示）" }],
  },
];

export const domainOf = (k: DomainKey) => DOMAINS.find((d) => d.key === k)!;

export type Signal = {
  id: string;
  date: string;
  title: string;
  domain: DomainKey;
  evidence: Evidence;
  confidence: "高" | "中" | "低";
  why: string;
  source: string;
};

export const SIGNALS: Signal[] = [
  {
    id: "SIG-0412",
    date: "2026-10-30",
    title: "多地将电力接入条件列为数据中心项目的前置审查要件",
    domain: "technology",
    evidence: "fact",
    confidence: "中",
    why: "若成为普遍做法，算力布局的首要变量将由土地转向电力。",
    source: "演示来源占位 · 待核实",
  },
  {
    id: "SIG-0411",
    date: "2026-10-27",
    title: "制造企业招聘中“设备调参”类岗位描述增多",
    domain: "society",
    evidence: "analysis",
    confidence: "低",
    why: "可能是技能结构迁移的早期迹象，但样本有限。",
    source: "演示来源占位 · 招聘平台抽样",
  },
  {
    id: "SIG-0409",
    date: "2026-10-21",
    title: "长期限产业基金的设立讨论升温",
    domain: "capital",
    evidence: "analysis",
    confidence: "中",
    why: "与“耐心资本稀缺”的判断相关，值得持续追踪其实际落地。",
    source: "演示来源占位 · 公开讨论汇总",
  },
  {
    id: "SIG-0406",
    date: "2026-10-14",
    title: "区域性芯片封测产能规划出现“重复建设”争议",
    domain: "global",
    evidence: "fact",
    confidence: "中",
    why: "反映韧性与效率之间的成本分配张力。",
    source: "演示来源占位 · 待核实",
  },
  {
    id: "SIG-0402",
    date: "2026-10-03",
    title: "人形机器人可能在三年内进入规模化仓储场景",
    domain: "industry",
    evidence: "hypothesis",
    confidence: "低",
    why: "这是一个需检验的假设，我们列出证伪条件：单位成本与可靠性指标。",
    source: "编辑部假设 · 无外部来源",
  },
  {
    id: "SIG-0398",
    date: "2026-09-26",
    title: "储能项目的调度规则在多地进入修订期",
    domain: "industry",
    evidence: "fact",
    confidence: "高",
    why: "规则层面的变化往往比装机数字更能说明结构变化。",
    source: "演示来源占位 · 政策文本",
  },
  {
    id: "SIG-0391",
    date: "2026-09-12",
    title: "高校新增交叉学科方向集中于计算与材料",
    domain: "society",
    evidence: "analysis",
    confidence: "中",
    why: "人才供给结构的变化有较长滞后，是长期信号。",
    source: "演示来源占位 · 待核实",
  },
  {
    id: "SIG-0385",
    date: "2026-08-30",
    title: "算力租赁或将出现区域化定价",
    domain: "capital",
    evidence: "hypothesis",
    confidence: "低",
    why: "若成立，算力将呈现类似电价的地理结构。",
    source: "编辑部假设 · 无外部来源",
  },
  {
    id: "SIG-0379",
    date: "2026-08-18",
    title: "跨境技术标准合作出现新的区域性框架讨论",
    domain: "global",
    evidence: "analysis",
    confidence: "中",
    why: "标准是长期结构的“隐形基础设施”。",
    source: "演示来源占位 · 待核实",
  },
];

export const COLUMNS = [
  {
    key: "深读",
    name: "阈·深读",
    en: "Deep Reading",
    desc: "长篇研究报告。每篇围绕一个结构性问题，给出框架、证据层级与待观察的问题。",
    cadence: "每月一至两篇",
    tone: "gold",
  },
  {
    key: "信号",
    name: "阈·信号",
    en: "Signals",
    desc: "短小的变化记录。区分事实、分析与假设，标注置信度与首次观察日期。",
    cadence: "每周更新",
    tone: "teal",
  },
  {
    key: "观察",
    name: "阈·观察",
    en: "Observations",
    desc: "随笔、对谈与方法札记。记录研究过程中的疑问与修正。",
    cadence: "不定期",
    tone: "ivory",
  },
  {
    key: "专题",
    name: "阈·专题",
    en: "Dossiers",
    desc: "季度专题。围绕一个主题，汇集报告、信号与数据，形成可持续更新的档案。",
    cadence: "每季度一期",
    tone: "slate",
  },
] as const;

export type TopicNode = {
  id: string;
  zh: string;
  en: string;
  pos: [number, number, number];
  desc: string;
  domain: DomainKey;
};

export const TOPICS: TopicNode[] = [
  {
    id: "ai",
    zh: "人工智能",
    en: "AI",
    pos: [0, 0.6, 0],
    domain: "technology",
    desc: "作为通用技术，人工智能的影响取决于组织重构的速度，而不只是模型能力本身。",
  },
  {
    id: "semi",
    zh: "半导体",
    en: "Semiconductors",
    pos: [-2.4, 1.4, -0.8],
    domain: "global",
    desc: "高度全球化分工的产业，正在经历从效率优先到韧性优先的地理重组。",
  },
  {
    id: "compute",
    zh: "算力",
    en: "Computing",
    pos: [-1.2, -1.2, 1],
    domain: "technology",
    desc: "正在从可采购的设备，转变为需要规划的基础设施。",
  },
  {
    id: "energy",
    zh: "能源",
    en: "Energy",
    pos: [-3, -1.6, -1.2],
    domain: "industry",
    desc: "算力与制造的共同约束。电网能力可能成为转型的节奏决定因素。",
  },
  {
    id: "robotics",
    zh: "机器人",
    en: "Robotics",
    pos: [2.3, 1.2, 0.6],
    domain: "industry",
    desc: "在成本与可靠性跨过阈值后，可能集中改变制造与仓储的劳动结构。",
  },
  {
    id: "mfg",
    zh: "制造",
    en: "Manufacturing",
    pos: [2.8, -1.1, -0.6],
    domain: "industry",
    desc: "软件比重上升，产线开始像代码一样被版本化与更新。",
  },
  {
    id: "capital",
    zh: "资本",
    en: "Capital",
    pos: [0.4, 2.4, -1.6],
    domain: "capital",
    desc: "长周期技术需要耐心资本，而资金周期与技术周期之间存在结构性错配。",
  },
  {
    id: "labor",
    zh: "劳动",
    en: "Labor",
    pos: [1.2, -2.4, 1.2],
    domain: "society",
    desc: "技能需求从操作转向诊断与调度，职业教育体系面临再设计。",
  },
  {
    id: "society",
    zh: "社会",
    en: "Society",
    pos: [-0.2, -0.4, 2.6],
    domain: "society",
    desc: "城市、教育与代际结构，决定社会吸收技术冲击的方式与速度。",
  },
];

export const EDGES: [string, string][] = [
  ["ai", "compute"],
  ["ai", "semi"],
  ["ai", "robotics"],
  ["ai", "labor"],
  ["ai", "capital"],
  ["compute", "energy"],
  ["compute", "semi"],
  ["semi", "capital"],
  ["energy", "mfg"],
  ["robotics", "mfg"],
  ["robotics", "labor"],
  ["mfg", "labor"],
  ["labor", "society"],
  ["society", "ai"],
  ["capital", "robotics"],
  ["energy", "society"],
];

export const TOPIC_ARTICLES: Record<string, string[]> = {
  ai: ["ai-diffusion-curve", "compute-as-infrastructure"],
  semi: ["semiconductor-geography"],
  compute: ["compute-as-infrastructure"],
  energy: ["energy-transition-grid", "compute-as-infrastructure"],
  robotics: ["robotics-labor-threshold"],
  mfg: ["manufacturing-software-defined"],
  capital: ["patient-capital"],
  labor: ["robotics-labor-threshold", "manufacturing-software-defined"],
  society: ["interview-on-long-cycles", "robotics-labor-threshold"],
};

export const neighbors = (id: string) =>
  EDGES.filter((e) => e.includes(id)).map((e) => (e[0] === id ? e[1] : e[0]));

export const articleBySlug = (s: string) => ARTICLES.find((a) => a.slug === s);