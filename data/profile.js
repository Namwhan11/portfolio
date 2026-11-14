// All site content lives here. Components only render it.

export const profile = {
  name: "Athitiya Nanjinda",
  role: "Software Tester",
  email: "athitiya1467@gmail.com",
  github: {
    label: "github.com/Namwhan11",
    url: "https://github.com/Namwhan11",
  },
  year: 2026,
  photo: { src: "/images/profile.jpg", alt: "Portrait of Athitiya Nanjinda" },
};

export const nav = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const intro = {
  title: "Portfolio",
  summary:
    "I'm aiming to become a Software Tester. I'm responsible and detail-oriented, with a background in IT and software development, and I care about software quality.",
  primary: "See my work",
  secondary: "Get in touch",
  runner: {
    command: "npm test",
    lines: [
      "writes test cases & scenarios",
      "unit + API tests (Vitest, Supertest)",
      "e2e tests (Playwright)",
      "runs tests in CI (GitHub Actions)",
    ],
    summary: "4 passed",
  },
};

export const about = {
  title: "About",
  profile:
    "I'm aiming to become a Software Tester. I'm responsible and detail-oriented, with a background in IT and software development, and I care about software quality. I'm eager to learn, open to feedback, and keen to gain real-world testing experience.",
  facts: [
    {
      label: "Education",
      value:
        "Rajabhat Maha Sarakham University — Faculty of Science and Technology, Information Technology, GPA 3.38",
    },
    { label: "Languages", value: "Thai (native), English (basic)" },
    { label: "Training", value: "Writing test cases and test scenarios" },
  ],
};

export const projects = {
  title: "Projects",
  items: [
    {
      name: "Samudngan",
      title: "Samudngan — testing a full-stack web app",
      kind: "Personal project",
      meta: "2026",
      summary:
        "A to-do web app I built to practise the full testing workflow, from unit tests to end-to-end tests running in CI.",
      points: [],
      strategy: [
        {
          label: "Unit",
          tool: "Vitest",
          text: "Input validation rules and React components, with the API mocked.",
        },
        {
          label: "Integration",
          tool: "Supertest + real PostgreSQL",
          text: "Every API endpoint, including sign-up, login, sessions, rate limiting and error responses.",
        },
        {
          label: "End-to-end",
          tool: "Playwright",
          text: "Real user flows in the browser — sign up, add and edit tasks, subtasks, reorder.",
        },
        {
          label: "CI",
          tool: "GitHub Actions",
          text: "All tests run automatically on every pull request.",
        },
      ],
      problems: [
        {
          problem:
            "End-to-end tests failed at random because integration tests cleared the same database.",
          fix: "Gave each test type its own database.",
        },
        {
          problem: "The login rate limiter blocked my own test runs.",
          fix: "Made the limits configurable, with higher limits in the test environment.",
        },
        {
          problem:
            "A checkbox test was flaky because the UI waited for the server.",
          fix: "Updated the UI immediately and synced with the server afterwards (optimistic update).",
        },
        {
          problem: "The task input overflowed the screen on a 390px phone.",
          fix: "Fixed the layout and re-checked it on mobile.",
        },
      ],
      tech: "React, Node.js, Express, PostgreSQL, Nginx, Vitest, Supertest, Playwright, GitHub Actions",
      results: {
        caption:
          "158 automated tests (150 unit + integration, 8 end-to-end), all passing in CI.",
        lines: [
          { count: "150", text: "unit + integration", passed: true },
          { count: "8", text: "e2e", passed: true },
          { count: "CI", text: "on every PR", passed: false },
        ],
      },
      link: { label: "GitHub", url: "https://github.com/Namwhan11/todo-react" },
      images: [
        {
          src: "/images/samudngan.png",
          ratio: "1910 / 897",
          alt: "Screenshot of the Samudngan log-in page",
        },
        {
          src: "/images/samudngan2.png",
          ratio: "1855 / 911",
          alt: "Screenshot of the Samudngan task list after log-in",
        },
      ],
    },
    {
      name: "Electronic Card Queueing System",
      kind: "Thailand Post, Khon Kaen Branch",
      meta: "2025–2026 · IoT / Software Developer",
      points: [
        {
          text: "Smart queue system using IoT and BLE (iBeacon) to cut paper use and speed up service.",
        },
        {
          text: "Gathered requirements from real operations; designed with SDLC and UML.",
        },
        {
          text: "Electronic queue cards with real-time notifications; central dashboard to monitor queue flow.",
        },
        { text: "ESP32-S3 with BLE for low-power hardware communication." },
      ],
      tech: "",
      results: null,
    },
  ],
};

export const skills = {
  title: "Skills",
  groups: [
    {
      label: "Testing",
      items: [
        "Test cases & scenarios",
        "Unit testing (Vitest)",
        "API testing (Postman, Supertest)",
        "End-to-end testing (Playwright)",
        "CI (GitHub Actions)",
      ],
    },
    { label: "Languages", items: ["Java", "JavaScript", "HTML"] },
    {
      label: "Frameworks & runtime",
      items: ["React", "Node.js", "Express", "Tailwind CSS"],
    },
    { label: "Databases", items: ["MySQL", "PostgreSQL"] },
    {
      label: "Design & tools",
      items: ["Figma", "Draw.io", "Git/GitHub", "VS Code"],
    },
  ],
};

export const experience = {
  title: "Experience",
  items: [
    {
      role: "QA Intern",
      org: "Technical Water",
      period: "Nov 2026 – Present",
      points: [
        "Tested the company website and its admin CMS — 114 test cases across public user, admin, security and non-functional checks",
        "Tested a quotation (BOQ) system — 123 automated test cases covering login, user roles, documents, price/VAT calculation, master data and file attachments",
        "Reported 15 bugs with steps to reproduce and screenshots; retested after the developers' fixes and confirmed all 6 website bugs fixed",
        "Wrote a test report and a fix-tracking sheet in Excel for each system",
        "Set up the QA workspace and Playwright test suite for a project management system",
      ],
      tech: "Playwright, TypeScript, Python, Excel, Chrome DevTools",
      strategy: [
        {
          label: "Black-box",
          tool: "manual exploration",
          text: "No spec was available, so I explored each system and wrote test cases from its observed behaviour, split by user role.",
        },
        {
          label: "Automation",
          tool: "Playwright",
          text: "Ran the cases in a real browser with a screenshot and timing for every case as evidence, plus a cross-browser run on Firefox, WebKit and a phone profile.",
        },
        {
          label: "Roles & security",
          tool: "Playwright + API requests",
          text: "Checked that each user role can only do what it is allowed to, in both the UI and the API.",
        },
        {
          label: "Reporting",
          tool: "Excel",
          text: "One report per system — summary, test cases per role, bug report with severity and steps to reproduce, and a fix-tracking sheet updated after each retest.",
        },
      ],
      problemsTitle: "Challenges and how I handled them",
      problems: [
        {
          problem:
            "Testing ran against real data, so a test run must not change or delete anything that was already there.",
          fix: "Blocked write requests inside the test suite where saving was not needed. Where it was, every test record was clearly labelled, settings were saved before the run and restored afterwards, and test records were cleaned up automatically.",
        },
        {
          problem:
            "Re-running a few tests wiped the screenshots from the full run.",
          fix: "Gave reruns their own output folder and merged their results into the report instead of overwriting the full run.",
        },
      ],
    },
    {
      role: "Administrative Intern",
      org: "Office of the President, Rajabhat Maha Sarakham University",
      period: "Nov 2025 – Feb 2026",
      points: [
        "Managed meeting documents and official records",
        "Prepared meeting materials and coordinated meetings",
        "Transcribed recordings into meeting minutes",
        "Scanned and archived digital documents",
        "Supported daily office operations",
      ],
    },
  ],
};

export const contact = {
  title: "Contact",
  text: "A short hello is enough to start.",
  copy: "Copy email",
  copied: "Copied",
  emailLink: "Email",
};
