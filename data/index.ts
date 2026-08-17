import type {
  Course,
  Training,
  Event,
  ScheduledCourse,
  NavItem,
  Service,
} from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  {
    label: "Formações",
    href: "/solucoes",
    children: [
      {
        label: "Cursos Tech",
        href: "/cursos?area=tech",
      },
      {
        label: "Cursos Admin",
        href: "/cursos?area=admin",
      },
      {
        label: "Treinamentos",
        href: "/treinamentos",
      },
    ],
  },
  // {
  //   label: "Eventos",
  //   href: "/eventos",
  // },
  {
    label: "Serviços",
    href: "/servicos",
  },
  // {
  //   label: "EAD",
  //   href: "/ead",
  //   comingSoon: true,
  // },
  // {
  //   label: "Loja",
  //   href: "/loja",
  //   comingSoon: true,
  // },
  { label: "Contacto", href: "/contacto" },
];

export const courses: Course[]= [
  {
    id: "cisco-ccna",
    title: "Cisco CCNA",
    description: "Formação completa em redes de computadores com foco em certificação Cisco CCNA. Aprenda roteamento, switching, segurança e troubleshooting.",
    duration: "160 horas",
    schedule: "Sábados das 9h às 17h",
    area: "tech" as const,
    badge: "Destaque",
    price: "350.000 Kz",
    image: "/all/01.jpg",
    syllabus: [
      "Fundamentos de Redes",
      "Switching e VLANs",
      "Roteamento estático e dinâmico",
      "Serviços de rede (DHCP, DNS, NAT)",
      "Segurança de redes",
      "Automação e programabilidade",
    ],
    prerequisites: [
      "Conhecimentos básicos de informática",
      "Disponibilidade para 16 semanas",
    ],
    objectives: [
      "Configurar switches e roteadores Cisco",
      "Implementar VLANs e inter-VLAN routing",
      "Configurar protocolos de roteamento OSPF",
      "Aplicar segurança básica em dispositivos de rede",
    ],
    targetAudience: [
      "Profissionais de TI",
      "Estudantes de redes",
      "Técnicos de suporte",
      "Administradores de rede iniciantes",
    ],
  },
  {
    id: "linux-admin",
    title: "Linux Administration",
    description: "Curso prático de administração de sistemas Linux. Domine a linha de comando, serviços, segurança e servidores.",
    duration: "80 horas",
    schedule: "Quintas das 18h às 22h",
    area: "tech" as const,
    badge: "",
    price: "250.000 Kz",
    image: "/all/01.jpg",
    syllabus: [
      "Instalação e configuração do Linux",
      "Comandos essenciais do terminal",
      "Gerenciamento de usuários e permissões",
      "Serviços e processos",
      "Redes e segurança básica",
    ],
    prerequisites: [
      "Conhecimentos básicos de informática",
      "Computador com 8GB RAM mínimo",
    ],
    objectives: [
      "Administrar servidores Linux",
      "Automatizar tarefas com scripts",
      "Configurar serviços essenciais",
    ],
    targetAudience: [
      "Administradores de sistemas",
      "Desenvolvedores",
      "Profissionais de DevOps",
    ],
  },
  {
    id: "fibra-optica",
    title: "Testes e Emendas de Fibra Óptica",
    description: "Formação técnica em fibra óptica com foco em instalação, emendas, testes e certificação de redes ópticas.",
    duration: "60 horas",
    schedule: "Terças e Quintas das 19h às 22h",
    area: "tech" as const,
    badge: "",
    price: "280.000 Kz",
    image: "/all/01.jpg",
    syllabus: [
      "Princípios da fibra óptica",
      "Tipos de conectores e fusão",
      "Técnicas de emenda",
      "Testes com OTDR e fontes ópticas",
      "Certificação de enlaces",
    ],
    prerequisites: [
      "Conhecimentos básicos de telecomunicações",
    ],
    objectives: [
      "Realizar emendas de fibra óptica",
      "Interpretar medições de OTDR",
      "Certificar enlaces ópticos",
    ],
    targetAudience: [
      "Técnicos de telecom",
      "Instaladores de redes",
      "Profissionais de infraestrutura",
    ],
  },
  {
    id: "cabling",
    title: "Cabeamento Estruturado",
    description: "Curso completo de cabeamento estruturado seguindo padrões internacionais. Projeto, instalação e certificação de redes.",
    duration: "40 horas",
    schedule: "Sábados das 8h às 12h",
    area: "tech" as const,
    badge: "",
    price: "220.000 Kz",
    image: "/all/01.jpg",
    syllabus: [
      "Normas e padrões",
      "Tipos de cabos e conectores",
      "Infraestrutura de telecomunicações",
      "Testes e certificação",
      "Documentação de projetos",
    ],
    prerequisites: [],
    objectives: [
      "Projetar infraestrutura de cabeamento",
      "Instalar e certificar redes",
    ],
    targetAudience: [
      "Profissionais de redes",
      "Engenheiros civis",
      "Arquitetos",
    ],
  },
  {
    id: "seguranca-redes",
    title: "Segurança de Redes",
    description: "Formação em segurança de redes com foco em firewalls, IDS/IPS, VPNs e políticas de segurança.",
    duration: "100 horas",
    schedule: "Segundas e Quartas das 19h às 22h",
    area: "tech" as const,
    badge: "Destaque",
    price: "320.000 Kz",
    image: "/all/01.jpg",
    syllabus: [
      "Fundamentos de segurança",
      "Firewalls e políticas",
      "IDS/IPS",
      "VPNs e criptografia",
      "Análise de logs",
    ],
    prerequisites: [
      "Conhecimentos básicos de redes",
      "Curso CCNA recomendado",
    ],
    objectives: [
      "Implementar políticas de segurança",
      "Configurar firewalls",
      "Monitorar incidentes",
    ],
    targetAudience: [
      "Profissionais de segurança",
      "Administradores de rede",
    ],
  },
  {
    id: "microsoft-office",
    title: "Microsoft Office Avançado",
    description: "Domine as ferramentas do pacote Office: Excel avançado, PowerPoint profissional, Word e Outlook.",
    duration: "60 horas",
    schedule: "Terças e Quintas das 18h às 21h",
    area: "admin" as const,
    badge: "",
    price: "180.000 Kz",
    image: "/all/01.jpg",
    syllabus: [
      "Excel: fórmulas, tabelas dinâmicas, macros",
      "PowerPoint: apresentações profissionais",
      "Word: formatação e automação",
      "Outlook: gestão de emails",
    ],
    prerequisites: [
      "Conhecimentos básicos de informática",
    ],
    objectives: [
      "Criar planilhas complexas",
      "Produzir apresentações profissionais",
      "Automatizar tarefas",
    ],
    targetAudience: [
      "Profissionais administrativos",
      "Gestores",
      "Assistentes",
    ],
  },
  {
    id: "gestao-projetos",
    title: "Gestão de Projetos",
    description: "Metodologias ágeis e tradicionais para gestão de projetos. Prepare-se para certificação PMP.",
    duration: "80 horas",
    schedule: "Sábados das 9h às 13h",
    area: "admin" as const,
    badge: "",
    price: "300.000 Kz",
    image: "/all/trainings/eng.jpg",
    syllabus: [
      "Fundamentos de gestão de projetos",
      "Ciclo de vida do projeto",
      "Áreas de conhecimento PMBOK",
      "Ferramentas ágeis (Scrum, Kanban)",
      "Soft skills do gestor",
    ],
    prerequisites: [
      "Experiência profissional desejável",
    ],
    objectives: [
      "Gerenciar projetos com metodologias ágeis",
      "Preparar documentos de projeto",
    ],
    targetAudience: [
      "Gestores e líderes",
      "Coordenadores",
      "Empreendedores",
    ],
  },
  {
    id: "recursos-humanos",
    title: "Gestão de Recursos Humanos",
    description: "Formação completa em RH: recrutamento, seleção, treinamento, gestão de pessoas e legislação trabalhista.",
    duration: "60 horas",
    schedule: "Quartas das 18h às 22h",
    area: "admin" as const,
    badge: "",
    price: "250.000 Kz",
    image: "/all/01.jpg",
    syllabus: [
      "Gestão de pessoas",
      "Recrutamento e seleção",
      "Treinamento e desenvolvimento",
      "Legislação trabalhista",
      "Avaliação de desempenho",
    ],
    prerequisites: [],
    objectives: [
      "Gerir processos de RH",
      "Aplicar legislação trabalhista",
    ],
    targetAudience: [
      "Profissionais de RH",
      "Gestores de equipe",
      "Empreendedores",
    ],
  },
  {
    id: "contabilidade",
    title: "Contabilidade e Finanças",
    description: "Fundamentos de contabilidade, análise financeira, fluxo de caixa e gestão orçamentária para empresas.",
    duration: "80 horas",
    schedule: "Segundas das 18h às 22h",
    area: "admin" as const,
    badge: "",
    price: "280.000 Kz",
    image: "/all/01.jpg",
    syllabus: [
      "Princípios contábeis",
      "Demonstrações financeiras",
      "Análise de balanços",
      "Gestão de fluxo de caixa",
      "Planejamento tributário",
    ],
    prerequisites: [
      "Conhecimentos básicos de matemática",
    ],
    objectives: [
      "Interpretar demonstrações financeiras",
      "Gerir fluxo de caixa",
      "Planejar orçamentos",
    ],
    targetAudience: [
      "Profissionais de finanças",
      "Gestores empresariais",
      "Contadores",
    ],
  },
];

// export const scheduledCourses = [
//   {
//     id: 1,
//     courseId: "cisco-ccna",
//     courseTitle: "Cisco CCNA",
//     area: "tech" as const,
//     startDate: "15 de Abril, 2025",
//     schedule: "Segundas e Quartas | 19h - 22h",
//     spots: 15,
//     modality: "Presencial",
//     instructor: "Dionísio Noque",
//     price: "350.000 Kz",
//   },
//   {
//     id: 2,
//     courseId: "linux-admin",
//     courseTitle: "Linux Administration",
//     area: "tech" as const,
//     startDate: "16 de Abril, 2025",
//     schedule: "Terças e Quintas | 18h - 21h",
//     spots: 8,
//     modality: "Online",
//     instructor: "Aires Luís",
//     price: "250.000 Kz",
//   },
//   {
//     id: 3,
//     courseId: "fibra-optica",
//     courseTitle: "Testes e Emendas de Fibra Óptica",
//     area: "tech" as const,
//     startDate: "17 de Abril, 2025",
//     schedule: "Quintas | 8h - 17h",
//     spots: 10,
//     modality: "Presencial",
//     instructor: "Francisco Milonga",
//     price: "280.000 Kz",
//   },
//   {
//     id: 4,
//     courseId: "gestao-projetos",
//     courseTitle: "Gestão de Projetos",
//     area: "admin" as const,
//     startDate: "18 de Abril, 2025",
//     schedule: "Sextas | 18h - 22h",
//     spots: 20,
//     modality: "Presencial",
//     instructor: "Carlos Fama",
//     price: "300.000 Kz",
//   },
//   {
//     id: 5,
//     courseId: "microsoft-office",
//     courseTitle: "Microsoft Office Avançado",
//     area: "admin" as const,
//     startDate: "19 de Abril, 2025",
//     schedule: "Sábados | 8h - 12h",
//     spots: 12,
//     modality: "Online",
//     instructor: "Amilton Sebastião",
//     price: "180.000 Kz",
//   },
//   {
//     id: 6,
//     courseId: "seguranca-redes",
//     courseTitle: "Segurança de Redes",
//     area: "tech" as const,
//     startDate: "22 de Abril, 2025",
//     schedule: "Terças e Quintas | 19h - 22h",
//     spots: 5,
//     modality: "Presencial",
//     instructor: "Elsio Baía",
//     price: "320.000 Kz",
//   },
// ];

export const trainings: Training[] = [
  {
    id: "estagio",
    title: "Estágio Supervisionado",
    acronym: "ES",
    description:
      "Programa de inserção profissional com acompanhamento técnico e avaliação contínua em ambiente real de trabalho.",
    duration: "3–6 meses",
    color: "blue",
    image: "/all/trainings/es.jpg",
  },
  {
    id: "ccna",
    title: "Cisco Certified Network Associate",
    acronym: "CCNA",
    description:
      "Certificação oficial Cisco para profissionais de redes. Formação intensiva com lab prático e exame oficial.",
    duration: "120h",
    certifier: "Cisco",
    color: "indigo",
    image: "/all/trainings/ccna.jpeg",
  },
  {
    id: "cgpe",
    title: "Curso de Gestão de Projecto para Engenheiros",
    acronym: "CGPE",
    description:
      "Formação em gestão de projetos com foco em metodologias ágeis e tradicionais para profissionais de engenharia.",
    duration: "80h",
    color: "slate",
    image: "/all/trainings/eng.jpg",
  },
  {
    id: "noc",
    title: "Network Operations Center",
    acronym: "NOC",
    description:
      "Formação especializada para operadores de centro de operações de rede, monitorização 24/7 e gestão de incidentes.",
    duration: "60h",
    color: "blue",
    image: "/all/trainings/eng.jpg",
  },
  {
    id: "helpdesk",
    title: "Help-Desk & Suporte TI",
    acronym: "HD",
    description:
      "Capacitação para suporte técnico de nível 1 e 2, atendimento, ITIL e ferramentas de ticketing.",
    duration: "40h",
    color: "indigo",
    image: "/all/trainings/hd.jpg",
  },
];

export const events: Event[] = [
   {
    id: "bminfo",
    title: "Business Minds Summit",
    description: "O maior evento de negócios e empreendedorismo de Angola. Networking com líderes empresariais, palestras inspiradoras e workshops práticos.",
    date: "15 de Abril, 2025",
    time: "09:00 - 18:00",
    location: "Centro de Convenções Talatona, Luanda",
    type: "conference",
    registrationOpen: true,
    spots: 500,
    price: "50.000 Kz",
  },
  {
    id: "wcp",
    title: "Workshop de Cabeamento Profissional",
    description: "Workshop prático sobre cabeamento estruturado, normas ANSI/TIA e instalação de infraestrutura de telecomunicações.",
    date: "22 de Abril, 2025",
    time: "08:00 - 17:00",
    location: "Sede do Inefor, Luanda",
    type: "workshop",
    registrationOpen: true,
    spots: 50,
    price: "75.000 Kz",
  },
  {
    id: "inoc",
    title: "Inefor NOC Challenge",
    description: "Competição de operação de redes NOC. Desafie suas habilidades em monitoramento e troubleshooting de redes.",
    date: "10 de Maio, 2025",
    time: "09:00 - 18:00",
    location: "Online",
    type: "seminar",
    registrationOpen: true,
    spots: 100,
    price: "Gratuito",
  },
  {
    id: "tech-forum",
    title: "Fórum de Tecnologia Angola",
    description: "Discussão sobre as tendências tecnológicas para 2025. Inteligência Artificial, 5G, Cloud Computing e muito mais.",
    date: "05 de Junho, 2025",
    time: "09:00 - 17:00",
    location: "Centro de Convenções Talatona, Luanda",
    type: "conference",
    registrationOpen: false,
    spots: 300,
    price: "35.000 Kz",
  },
];

export const scheduledCourses: ScheduledCourse[] = [
  {
    id: "s1",
    courseTitle: "Cisco CCNA",
    startDate: "07 Abril 2025",
    schedule: "Seg–Sex | 17h–19h30",
    spots: 8,
    area: "tech",
    modality: "Presencial",
    price: "350.000 Kz",
  },
  {
    id: "s2",
    courseTitle: "Administração Linux",
    startDate: "14 Abril 2025",
    schedule: "Sáb | 8h–13h",
    spots: 12,
    area: "tech",
    modality: "Online",
    price: "250.000 Kz",
  },
  {
    id: "s3",
    courseTitle: "Microsoft Office Avançado",
    startDate: "05 Abril 2025",
    schedule: "Sáb | 8h–13h",
    spots: 15,
    area: "admin",
    modality: "Online",
    price: "180.000 Kz",
  },
  {
    id: "s4",
    courseTitle: "Gestão de Projetos",
    startDate: "28 Abril 2025",
    schedule: "Seg–Sex | 17h–19h30",
    spots: 10,
    area: "admin",
    modality: "Presencial",
    price: "300.000 Kz",
  },
  {
    id: "s5",
    courseTitle: "Instalação de Fibra Óptica",
    startDate: "21 Abril 2025",
    schedule: "Seg–Sex | 8h–11h",
    spots: 6,
    area: "tech",
    modality: "Presencial",
    price: "280.000 Kz",
  },
];

export const services: Service[] = [
  {
    id: "formacao-empresarial",
    number: "01",
    title: "Formação Empresarial",
    desc: "Programas in-company desenhados à medida das necessidades da sua empresa, ministrados nas instalações do cliente ou do Inefor.",
    longDesc: "Desenhamos programas de formação totalmente adaptados à realidade da sua empresa — desde o diagnóstico das necessidades de capacitação até à execução e avaliação de resultados. As sessões podem decorrer nas suas instalações ou nos nossos centros, com horários compatíveis com a operação do negócio.",
    features: ["Conteúdo personalizado", "Horários flexíveis", "Certificação reconhecida"],
    deliverables: [
      "Diagnóstico de necessidades formativas",
      "Plano curricular à medida",
      "Formadores certificados na área",
      "Certificado de conclusão para os colaboradores",
    ],
    price: "Sob consulta",
    bar: "from-blue-400 to-blue-600",
    glow: "bg-blue-500",
    dot: "bg-blue-400",
  },
  {
    id: "consultoria-rh",
    number: "02",
    title: "Consultoria em RH",
    desc: "Assessoria em gestão de recursos humanos, avaliação de desempenho, recrutamento e desenvolvimento de equipas.",
    longDesc: "Apoiamos a sua empresa na estruturação e maturação da função de Recursos Humanos, desde processos de recrutamento e seleção até modelos de avaliação de desempenho e planos de desenvolvimento de lideranças, adaptados à dimensão e cultura da organização.",
    features: ["Recrutamento e seleção", "Avaliação de desempenho", "Desenvolvimento de lideranças"],
    deliverables: [
      "Diagnóstico organizacional de RH",
      "Desenho de processos de recrutamento",
      "Modelo de avaliação de desempenho",
      "Plano de desenvolvimento de lideranças",
    ],
    price: "Sob consulta",
    bar: "from-emerald-400 to-emerald-600",
    glow: "bg-emerald-500",
    dot: "bg-emerald-400",
  },
  {
    id: "implementacao-redes",
    number: "03",
    title: "Implementação de Redes",
    desc: "Projectos de infra-estrutura de rede, cabeamento estruturado, fibra óptica e configuração de equipamentos Cisco.",
    longDesc: "Executamos projectos completos de infra-estrutura de rede para empresas e instituições — do levantamento de requisitos ao cabeamento estruturado, instalação de fibra óptica e configuração de equipamentos Cisco, garantindo desempenho e segurança para a operação.",
    features: ["Cabeamento estruturado", "Fibra óptica", "Configuração Cisco"],
    deliverables: [
      "Levantamento técnico e projecto de rede",
      "Instalação de cabeamento estruturado",
      "Instalação e testes de fibra óptica",
      "Configuração e documentação de equipamentos",
    ],
    price: "Sob consulta",
    bar: "from-violet-400 to-violet-600",
    glow: "bg-violet-500",
    dot: "bg-violet-400",
  },
  {
    id: "suporte-tecnico",
    number: "04",
    title: "Suporte Técnico",
    desc: "Serviços de help-desk, manutenção de sistemas, suporte a infra-estruturas de TI para empresas.",
    longDesc: "Garantimos a continuidade operacional da sua infra-estrutura de TI através de serviços de help-desk, manutenção preventiva e suporte remoto ou presencial, com planos ajustados à criticidade dos seus sistemas.",
    features: ["Help-desk 24/7", "Manutenção preventiva", "Suporte remoto"],
    deliverables: [
      "Atendimento help-desk 24/7",
      "Plano de manutenção preventiva",
      "Suporte remoto e presencial",
      "Relatórios periódicos de desempenho",
    ],
    price: "Sob consulta",
    bar: "from-amber-400 to-amber-600",
    glow: "bg-amber-500",
    dot: "bg-amber-400",
  },
  {
    id: "parcerias-institucionais",
    number: "05",
    title: "Parcerias Institucionais",
    desc: "Acordos de cooperação com empresas e instituições para formação contínua dos colaboradores.",
    longDesc: "Estabelecemos acordos de cooperação de médio e longo prazo com empresas e instituições, criando planos de formação contínua para os colaboradores, com condições e certificações preferenciais para os parceiros.",
    features: ["Programas de capacitação", "Descontos exclusivos", "Certificações conjuntas"],
    deliverables: [
      "Protocolo de cooperação institucional",
      "Plano de formação contínua",
      "Condições preferenciais para colaboradores",
      "Certificações conjuntas Inefor-parceiro",
    ],
    price: "Sob consulta",
    bar: "from-indigo-400 to-indigo-600",
    glow: "bg-indigo-500",
    dot: "bg-indigo-400",
  },
  {
    id: "consultoria-gestao",
    number: "06",
    title: "Consultoria de Gestão",
    desc: "Assessoria empresarial em optimização de processos, planeamento estratégico e produtividade organizacional.",
    longDesc: "Apoiamos a gestão da sua empresa na optimização de processos internos, definição de planeamento estratégico e melhoria da produtividade organizacional, com metodologias adaptadas à realidade angolana.",
    features: ["Planeamento estratégico", "Optimização de processos", "Gestão de projetos"],
    deliverables: [
      "Diagnóstico de processos actuais",
      "Plano estratégico de médio prazo",
      "Redesenho de processos críticos",
      "Acompanhamento de indicadores de gestão",
    ],
    price: "Sob consulta",
    bar: "from-rose-400 to-rose-600",
    glow: "bg-rose-500",
    dot: "bg-rose-400",
  },
];

// Categorias de cursos para página empresarial
export const corporateCourses = {
  telecomunicacoes: {
    title: "Redes e Sistemas de Telecomunicações",
    courses: [
      "Dimensionamento de Redes Móveis Celulares",
      "Redes LTE",
      "Planejamento de Redes LTE",
      "Redes 5G",
      "Comunicação Por Satélite VSAT",
      "Propagação de Ondas Electromagnéticas",
      "Projecto de Antenas",
      "Introdução a Modulação Digital",
      "Técnicas de Modulação Digital",
      "Sistemas de Redes de Telecomunicações",
      "Infraestrutura de Telecomunicações",
      "Instrumentação e medidas electrónica para Telecomunicações",
      "Aterramento e Proteção elétrica Para Sistemas de Telecomunicações"
    ]
  },
  computacao: {
    title: "Computação",
    courses: [
      "Programação WEB – Módulo I (HTML+CSS+JAVASCRIPT)",
      "Programação WEB – Módulo II (PHP com Laravel)",
      "Programação WEB – Módulo III (Nodejs, reactjs e mongodb)",
      "Base de dados MySQL",
      "Windows Server 2016",
      "Administrador LINUX",
      "Desenvolvimento Mobile para Android",
      "Desenvolvimento Mobile para IOS",
      "Designer e Multimedia"
    ]
  },
  segurancaEletronica: {
    title: "Segurança Electrónica",
    courses: [
      "CCTV – Modulo I (Montagem e Instalação de câmeras de segurança)",
      "CCTV com Fibra Óptica – Módulo II"
    ]
  },
  redesDados: {
    title: "Redes de Dados",
    courses: [
      "Redes de Computadores",
      "Fundamentos de rede (IP)",
      "Hardware (Reparação de Computador e Impressora)",
      "VoIP – Voz sobre IP"
    ]
  },
  electronica: {
    title: "Electrónica e Microelectrónica",
    courses: [
      "Electrónica Analógica",
      "Electrónica Digital",
      "Reparação e Manutenção de Telefone e Tablets",
      "Microcontroladores",
      "Arduino",
      "IoT – (Internet das Coisas)"
    ]
  },
  ciscoHuawei: {
    title: "Cisco e Huawei",
    courses: [
      "CCNA Modulo 1",
      "CCNA Modulo 2",
      "CCNA Modulo 3",
      "CCNP Módulo 1",
      "CCNP Módulo 2",
      "HCNA Modulo 1",
      "HCNA Modulo 2"
    ]
  },
  gestaoNegocios: {
    title: "Gestão e Negócios",
    courses: [
      "Contabilidade Júnior",
      "Contabilidade Sénior, Fiscalidade e Primavera",
      "Empreendedorismo Módulo I",
      "Empreendedorismo Módulo II",
      "Gestão de Mídias Sociais",
      "Gestão de Projectos",
      "Gestão Empresarial",
      "Gestão de Marketing e Técnicas de Vendas",
      "Marketing Digital",
      "Gestão de Recursos Humanos",
      "Gestão de Finanças",
      "Educação Financeira",
      "Operador de Caixa (Software XD)",
      "Secretariado Executivo",
      "Higiene, segurança e saúde no trabalho"
    ]
  }
};

// Cursos técnicos por categoria (para página de cursos)
export const technicalCoursesByCategory = {
  comunicacoesOpticas: {
    id: "comunicacoes-opticas",
    title: "Comunicações Ópticas",
    icon: "Fiber",
    courses: [
      "Testes e Emendas de Fibras Ópticas",
      "Redes de Fibras Ópticas-FTTX",
      "GPON-FiberHome",
      "Supervisor de Fibra Óptica",
      "Redes de Transporte (Backbone e Backhaul Óptica)",
      "DWDM"
    ]
  },
  comunicacoesMoveis: {
    id: "comunicacoes-moveis",
    title: "Comunicações Móveis",
    icon: "Smartphone",
    courses: [
      "Dimensionamento de Redes Móveis Celulares",
      "Redes 5G",
      "Redes de Computador"
    ]
  },
  segurancaEletronica: {
    id: "seguranca-eletronica",
    title: "Segurança Eletrónica",
    icon: "Shield",
    courses: [
      "CCTV - Módulo I (Montagem e Instalação de Câmeras)",
      "CCTV com Fibra Óptica - Módulo II",
      "VoIP"
    ]
  },
  microEletronica: {
    id: "micro-eletronica",
    title: "Micro-Eletrónica",
    icon: "Cpu",
    courses: [
      "Manutenção e Reparação de Hardware",
      "Manutenção e Reparação de Telefones e Tablets"
    ]
  },
  programacaoWeb: {
    id: "programacao-web",
    title: "Programação WEB, Design Gráfico e Base de dados",
    icon: "Code",
    courses: [
      "Programação Web-Módulo I (HTML+CSS+JavaScript)",
      "Design Gráfico"
    ]
  }
};

export const homeStats = [
  { value: "2018", label: "Fundado em" },
  { value: "500+", label: "Formados" },
  { value: "30+", label: "Cursos activos" },
  { value: "5+", label: "Eventos anuais" },
];

export const aboutStats = [
  { value: "500+", label: "Profissionais Formados" },
  { value: "8+", label: "Áreas de Formação" },
  { value: "5+", label: "Parcerias Estratégicas" },
  { value: "10+", label: "Eventos Realizados" },
];

export const cursosStats = [
  { value: "30+", label: "Cursos Disponíveis" },
  { value: "15+", label: "Instrutores Especializados" },
  { value: "1000+", label: "Alunos Matriculados" },
  { value: "95%", label: "Taxa de Aprovação" },
];

export const successStory = {
  title: "História de Sucesso",
  content: [
    "O INEFOR que é um centro de Formação qualificado e com formadores Capacitados atenciosos, compreensíveis e conhecedores da matéria.",
    "Eu particularmente conheci o centro a partir de um grupo do WhatsApp da universidade. E foi uma época em que o centro tinha apenas as formações online. Numa primeira fase temia fazer a formação, pois tinha a ideia do alto custo da internet para o acesso da mesma. Portanto, fui surpreendidade em gastar apenas 1000 kz de internet, utilizando os serviços de net ao dia. Claro que exigiu de mim um rigor no uso exclusivo da internet para a formação e também devido a ferramenta utilizada pela instituição.",
    "Fruto da experiência que tive com a primeira formação em redes 5G, abro parenteses para dizer que faço parte dos primeiros formandos de um curso de 5G, ministrado em Angola. Fiz outras formações como Teste e emendas de fibras ópticas, dimensionamento de redes Móveis celulares. E o que tenho a dizer sobre o Inefor é que realmente é um centro de excelência, que prima pela qualidade da formação e foca no saber fazer com os cursos práticos.",
    "Aprendi muito de Telecomunicações no INEFOR, principalmente em questões práticas, coisa que não tive a oportunidade de faze-lo na Universidade e outros centros de formação.",
  ],
  author: {
    name: "Potenciana Massaki",
    role: "Engenheira de Electrónica e Telecomunicação",
  },
  videoUrl: "https://youtu.be/LKlRrDYBDi4",
  imageUrl: "/assets/backgrounds/success-story.jpg",
};

export const instructors = [
  {
    id: "aires-luis",
    name: "Aires Luís",
    role: "Formador",
    image: "/assets/formadores/aires.jpg",
    bio: [
      "Aires João Sati Luís, filho de João Luís e Maria Sati, nasceu aos 07 de Julho de 1995. É natural de Cacuaco, província de Luanda.",
      "Técnico Médio de Energia e Instalações Eléctricas pelo Instituto Médio Politecnico do Sambizanga 4.036 (IMPS) na Área de Electricidade, Electrónica e Telecomunicações, Bacharel em Engenharia de Telecomunicações pelo Instituto Superior de Tecnologia de Informação e Comunicação (ISUTIC) em Luanda.",
      "É professor no Instituto Médio Privado de Saúde Albino (IMPSA), na cadeira de Física. Instrutor no INEFOR-Consultores no curso Testes e Emendas de fibras Ópticas é igualmente Colaborador no CFITEL.",
    ],
  },
  {
    id: "amilton-sebastiao",
    name: "Amilton Sebastião",
    role: "Formador",
    image: "/assets/formadores/amilton.jpg",
    bio: [
      "Especialista em redes e telecomunicações com vasta experiência em formação profissional.",
    ],
  },
  {
    id: "carlos-fama",
    name: "Carlos Fama",
    role: "Formador",
    image: "/assets/formadores/carlosfama.png",
    bio: [
      "Instrutor especializado em tecnologias de informação e comunicação.",
    ],
  },
  {
    id: "dionisio-noque",
    name: "Dionísio Noque",
    role: "CEO & Fundador",
    image: "/assets/formadores/dfn.jpg",
    bio: [
      "Fundador e CEO do INEFOR, é um jovem visionário que acredita na formação como veiculo para mudança de qualquer sociedade.",
      "Mestre e Engenheiro em Telecomunicações pelo INATEL/Brasil. Professor no ITEL, ISUTIC, e ISTA.",
    ],
  },
  {
    id: "domingos-henriques",
    name: "Domingos Henriques",
    role: "Formador",
    image: "/assets/formadores/dh.jpg",
    bio: [
      "Founder Menttouring e Co-Founder Kudika Digital, Especialista em Software, Professor Universitário  Analista Programador e como Hobby Design...",
    ],
  },
  {
    id: "elsio-baia",
    name: "Elsio Baía",
    role: "Formador",
    image: "/assets/formadores/elsio.jpg",
    bio: ["Gestor de Projectos especialista em FTTH e GPON."],
  },
  {
    id: "francisco-milonga",
    name: "Francisco Milonga",
    role: "Formador",
    image: "/assets/formadores/francisco_milonga.jpg",
    bio: [
      "Engenheiro em Electrónica e Telecomunicações, especialista em comunicações ópticas.",
    ],
  },
  {
    id: "historia-caferico",
    name: "História Caferico",
    role: "Formador",
    image: "/assets/formadores/historia.jpg",
    bio: ["Especialista em energia e instalações eléctricas."],
  },
];

export const partners = [
  {
    id: "angotec",
    name: "Angotec Pro",
    logo: "/assets/parceiros/Prceiro_Angotec Pro.jpeg",
    website: "#",
  },
  {
    id: "nzita-cecilia",
    name: "Nzita Cecilia",
    logo: "/assets/parceiros/Parceiro_Nzita Cecilia.jpeg",
    website: "#",
  },
];
