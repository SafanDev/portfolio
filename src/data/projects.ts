export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  caption: string;
  orientation?: "wide" | "portrait" | "square";
  presentation?: "standard" | "document" | "spotlight" | "comparison-board";
  title?: string;
  points?: string[];
};

export type Decision = {
  title: string;
  tension: string;
  decision: string;
  why: string;
};

export type Project = {
  slug: "velvet-vogue" | "kickblast-judo" | "etcp" | "enomy-finance";
  title: string;
  shortTitle: string;
  type: string;
  period: string;
  status: string;
  accent: string;
  cover: string;
  cardSummary: string;
  tools: string[];
  links: ProjectLink[];
  role: string;
  team: string;
  hook: string;
  overview: string;
  proof: { value: string; label: string }[];
  storyArc: { label: string; title: string; text: string; href: string }[];
  problem: {
    headline: string;
    paragraphs: string[];
    goal: string;
  };
  discovery: {
    headline: string;
    methods: string[];
    paragraphs: string[];
    media: ProjectMedia[];
  };
  process: {
    headline: string;
    intro: string;
    decisions: Decision[];
    feedback: string;
    media: ProjectMedia[];
    comparison?: {
      before: string;
      after: string;
      beforeAlt: string;
      afterAlt: string;
      beforeLabel: string;
      afterLabel: string;
      caption: string;
    };
  };
  solution: {
    headline: string;
    intro: string;
    features: { title: string; text: string }[];
    workflow: string[];
    media: ProjectMedia[];
    video?: {
      src: string;
      poster: string;
      durationLabel: string;
    };
  };
  validation: {
    headline: string;
    intro: string;
    evidence: string[];
    boundaries: string[];
    futureMeasures: string[];
  };
  reflection: {
    headline: string;
    wentWell: string;
    differently: string;
    learned: string[];
    next: string[];
  };
};

const media = (slug: Project["slug"], file: string) =>
  `/media/projects/${slug}/${file}.webp`;

export const projects: Project[] = [
  {
    slug: "velvet-vogue",
    title: "Velvet Vogue",
    shortTitle: "Velvet Vogue",
    type: "E-commerce Platform",
    period: "February 2026 - March 2026",
    status: "Completed and deployed",
    accent: "#a87312",
    cover: media("velvet-vogue", "cover"),
    cardSummary:
      "A deployed fashion store that connects customer shopping, variant-level stock and day-to-day administration.",
    tools: ["PHP", "MySQL", "JavaScript", "Bootstrap", "GSAP", "PDO"],
    links: [
      { label: "Live website", href: "https://velvetvogue.gamer.gd/" },
      { label: "GitHub", href: "https://github.com/SafanDev/velvetVogue" },
    ],
    role: "Full-stack developer and designer",
    team: "Independent project",
    hook:
      "The storefront was only half the challenge. The real work was keeping every product, variant, image, order and stock update trustworthy behind it.",
    overview:
      "Velvet Vogue is a PHP and MySQL fashion store connecting product discovery, variant-aware shopping, orders, inventory and administration in one system.",
    proof: [
      { value: "12", label: "relational database tables" },
      { value: "100", label: "validated size-colour variants per product" },
      { value: "20", label: "validated product images per submission" },
      { value: "Live", label: "deployed end-to-end workflow" },
    ],
    storyArc: [
      {
        label: "The tension",
        title: "A polished store can still fail behind the scenes.",
        text: "Product variants, stock, images and orders had to stay consistent even when a request failed halfway through.",
        href: "#problem",
      },
      {
        label: "The turning point",
        title: "Treat product creation as one safe operation.",
        text: "Transactions, validation, upload cleanup and unique SKU rules turned a large admin form into a reliable workflow.",
        href: "#process",
      },
      {
        label: "The payoff",
        title: "One system from listing to delivery.",
        text: "The final platform connects catalogue discovery, checkout, tracking, inventory and administration.",
        href: "#solution",
      },
    ],
    problem: {
      headline: "One retail workflow, split across too many moving parts.",
      paragraphs: [
        "Velvet Vogue was built for a fashion retailer needing both a customer storefront and an independent management system. Customers needed clear discovery and ordering, while administrators needed reliable control over products, variants, stock and order progress.",
        "The difficult part was keeping related data trustworthy. One product could contain several sizes, colours, stock values and images, so a failed upload or invalid variant needed to leave no incomplete records behind.",
      ],
      goal:
        "Build one responsive platform that lets customers shop confidently and lets an administrator manage the complete retail flow without manually repairing inconsistent data.",
    },
    discovery: {
      headline: "Start with what shoppers and administrators actually need.",
      methods: ["Questionnaire", "Requirements analysis", "Wireframing"],
      paragraphs: [
        "Questionnaire feedback made discovery speed a priority: shoppers wanted to combine size, colour and price criteria without repeatedly opening separate pages.",
        "I translated the main customer and admin tasks into a relational structure before building the interface. The wireframe focused on page hierarchy and shopping flow first, leaving the visual style for a later pass.",
      ],
      media: [
        {
          src: media("velvet-vogue", "wireframe"),
          alt: "Early Velvet Vogue homepage wireframe",
          title: "Early structure",
          caption: "The wireframe established the page hierarchy, shopping entry points and content order before visual styling.",
          orientation: "portrait",
          presentation: "document",
        },
        {
          src: media("velvet-vogue", "homepage-full"),
          alt: "Complete final Velvet Vogue homepage",
          title: "Final homepage",
          caption: "The completed page turns the same structure into a branded storefront with catalogue, editorial and trust-building sections.",
          orientation: "portrait",
          presentation: "document",
        },
      ],
    },
    process: {
      headline: "Design the experience, then protect the data behind it.",
      intro:
        "The strongest decisions improved catalogue discovery, treated variants as real inventory and made product creation recover safely from failure.",
      decisions: [
        {
          title: "Combined filters instead of isolated searches",
          tension:
            "A user might know the size, colour and price range they want, but separate controls force repeated searches.",
          decision:
            "I implemented multi-criteria filtering so several attributes can work together in one catalogue view.",
          why:
            "It shortens discovery and mirrors how people actually describe clothing: not one attribute at a time, but a combination.",
        },
        {
          title: "Variants as first-class inventory",
          tension:
            "A product-level stock number cannot explain that a black medium is available while a blue medium is sold out.",
          decision:
            "Each size and colour combination receives its own SKU, stock count and optional price adjustment.",
          why:
            "Variant-level records make availability and ordering precise instead of treating every product as one undifferentiated item.",
        },
        {
          title: "All-or-nothing product creation",
          tension:
            "The product, variants and images are written in separate steps. Failure in the middle could leave orphaned data or files.",
          decision:
            "I used database transactions, server-side validation, rollback and uploaded-file cleanup as one controlled workflow.",
          why:
            "The admin either gets a complete product or a clean failure. Partial success is not acceptable for inventory data.",
        },
      ],
      feedback:
        "Testing led to performance work on heavy pages and a combined filter experience for size, colour and price.",
      media: [
        {
          src: media("velvet-vogue", "filters"),
          alt: "Velvet Vogue catalogue with several active filters",
          caption: "Multi-criteria filtering lets shoppers combine attributes instead of restarting the search.",
          orientation: "wide",
        },
        {
          src: media("velvet-vogue", "add-product"),
          alt: "Velvet Vogue administrator add product interface",
          title: "One controlled product-creation workflow",
          caption: "The interface brings product details, media, visibility and the generated size-colour inventory matrix into one deliberate operation.",
          points: [
            "Server-side validation protects every submitted field",
            "Variants receive individual stock and SKU records",
            "Transactions and cleanup prevent partial products",
          ],
          orientation: "portrait",
          presentation: "spotlight",
        },
      ],
    },
    solution: {
      headline: "A complete retail loop, not a collection of disconnected screens.",
      intro:
        "Customer and administrator actions now share the same product, inventory and order data from listing through delivery.",
      features: [
        {
          title: "Fast product discovery",
          text: "Search, categories and combined filters help customers narrow products by the attributes that matter.",
        },
        {
          title: "Variant-aware shopping",
          text: "Product pages expose size, colour, stock and pricing choices before an item reaches the cart.",
        },
        {
          title: "Customer order journey",
          text: "Accounts, cart, checkout, invoices and tracking provide a clear path after product discovery.",
        },
        {
          title: "Operational admin tools",
          text: "Products, variants, inventory, customers, orders, reviews and enquiries are managed from one dashboard.",
        },
        {
          title: "Security controls",
          text: "Prepared PDO statements, CSRF protection, validation, sanitisation, rate limiting and admin access checks protect sensitive actions.",
        },
        {
          title: "Safe failure handling",
          text: "Transactions and cleanup logic prevent incomplete product records and unused uploaded files.",
        },
      ],
      workflow: [
        "Admin creates product",
        "Variants receive stock",
        "Customer select product",
        "Add to cart or checkout",
        "Customer tracks progress",
      ],
      media: [
        {
          src: media("velvet-vogue", "product"),
          alt: "Velvet Vogue product details interface",
          caption: "Product details connect visual merchandising with colour, size, price and stock choices.",
          orientation: "wide",
        },
        {
          src: media("velvet-vogue", "dashboard"),
          alt: "Velvet Vogue administrator dashboard",
          caption: "The dashboard turns the same store data into operational information for administrators.",
          orientation: "wide",
        },
        {
          src: media("velvet-vogue", "order-tracking"),
          alt: "Velvet Vogue customer order tracking interface",
          caption: "Order tracking closes the loop after checkout instead of leaving the customer without status information.",
          orientation: "wide",
        },
        {
          src: media("velvet-vogue", "interaction-gallery"),
          alt: "Velvet Vogue horizontal gallery interaction",
          caption: "A horizontal editorial gallery adds brand character without interrupting the shopping flow.",
          orientation: "wide",
        },
        {
          src: media("velvet-vogue", "interaction-404"),
          alt: "Velvet Vogue custom 404 page with mini game",
          caption: "Even the error state becomes a small brand moment through a coupon-dropping mini game.",
          orientation: "wide",
        },
      ],
      video: {
        src: "/media/projects/velvet-vogue/velvet-vogue-walkthrough.mp4",
        poster: "/media/projects/velvet-vogue/velvet-vogue-walkthrough-poster.webp",
        durationLabel: "1:53",
      },
    },
    validation: {
      headline: "A deployed retail platform connecting customer and administrator workflows.",
      intro:
        "The application was completed, functionally tested and deployed online. Its strongest result is the end-to-end retail workflow and the reliability built around product creation.",
      evidence: [
        "Live deployed customer-facing website",
        "Twelve-table relational data model",
        "Validated submissions supporting up to 100 variants and 20 images",
        "Customer and administrator flows tested across the main tasks",
        "Filtering and performance improved after feedback",
      ],
      boundaries: [
        "No commercial sales, adoption or client-performance figures are claimed.",
        "No sales, conversion, concurrent-user or revenue figures are claimed.",
        "The validated limits describe implemented submission rules, not real production volume.",
      ],
      futureMeasures: [
        "Catalogue filter completion and zero-result rate",
        "Checkout completion and form-error rate",
        "Inventory mismatch and failed-upload recovery rate",
      ],
    },
    reflection: {
      headline: "The biggest lesson: backend reliability is part of the user experience.",
      wentWell:
        "The strongest part of the project is the connection between a custom visual experience and a structured operational backend. Product discovery, inventory and administration operate as one connected workflow.",
      differently:
        "I would begin performance profiling earlier and design automated integration tests around stock changes, checkout and product uploads before the final visual pass.",
      learned: [
        "Model product variants before designing their interface",
        "Treat uploads and database writes as one recovery problem",
        "Use feedback to simplify discovery rather than add decoration",
      ],
      next: [
        "Add automated integration tests for orders and inventory",
        "Introduce real payment and transactional email services",
        "Add accessible analytics for catalogue and checkout behaviour",
      ],
    },
  },
  {
    slug: "kickblast-judo",
    title: "KickBlast Judo",
    shortTitle: "KickBlast",
    type: "Management System",
    period: "September 2025 - October 2025",
    status: "Completed and published on GitHub",
    accent: "#2867d8",
    cover: media("kickblast-judo", "cover"),
    cardSummary:
      "A C# and SQL Server desktop system that centralises club records, calculations, dashboards and printable billing.",
    tools: ["C#", ".NET Framework", "Windows Forms", "SQL Server", "ADO.NET"],
    links: [{ label: "GitHub", href: "https://github.com/SafanDev/kick-blast-judo" }],
    role: "Desktop application developer",
    team: "Independent project",
    hook:
      "The system already stored and calculated the right information. Feedback exposed the missing last mile: the administrator still needed something useful to print and hand over.",
    overview:
      "KickBlast Judo is a C# and SQL Server desktop application connecting eight club-management workflows, automated calculations, dashboard reporting and printable billing.",
    proof: [
      { value: "8", label: "core club workflows centralised" },
      { value: "1", label: "connected SQL Server system" },
      { value: "Auto", label: "fee and payment calculations" },
      { value: "Added", label: "printable report after feedback" },
    ],
    storyArc: [
      {
        label: "The tension",
        title: "The records existed, but the workflow was fragmented.",
        text: "Athletes, coaches, plans, events, fees and payments needed consistent handling in one desktop application.",
        href: "#problem",
      },
      {
        label: "The turning point",
        title: "A calculation is not complete until it becomes usable output.",
        text: "Testing showed that billing information also needed a printable report, not only a value on screen.",
        href: "#process",
      },
      {
        label: "The payoff",
        title: "From login to record, calculation and report.",
        text: "The final application supports day-to-day club administration without jumping between separate files.",
        href: "#solution",
      },
    ],
    problem: {
      headline: "Club administration was a chain of related tasks, not isolated forms.",
      paragraphs: [
        "Athletes, coaches, plans, competitions, private coaching, monthly bills and payments form one connected club workflow rather than isolated records.",
        "The application needed to keep those records consistent, calculate charges correctly and present useful information to the administrator without turning every screen into a dense database table.",
      ],
      goal:
        "Create a login-protected Windows application that centralises the main club workflows, reduces repeated manual calculations and makes important information easy to retrieve.",
    },
    discovery: {
      headline: "Map the administrator's tasks before building the forms.",
      methods: ["Requirements analysis", "Workflow mapping", "Functional testing", "Usability feedback"],
      paragraphs: [
        "I divided the problem into the records the club manages and the calculations that connect them. This made it possible to create focused forms while keeping the data in one SQL Server database.",
        "The early design prioritised direct navigation: the administrator can move from the dashboard into athletes, coaches, plans, competitions or billing without opening unrelated screens.",
      ],
      media: [
        {
          src: media("kickblast-judo", "login"),
          alt: "KickBlast Judo login interface",
          caption: "A focused login screen protects access without creating unnecessary role complexity.",
          orientation: "wide",
        },
        {
          src: media("kickblast-judo", "athlete"),
          alt: "KickBlast Judo athlete management interface",
          caption: "The athlete workflow combines records, search and maintenance in a single desktop view.",
          orientation: "wide",
        },
      ],
    },
    process: {
      headline: "Turn related records into one predictable desktop workflow.",
      intro:
        "The key design work connected database operations, calculation rules and desktop navigation into one predictable system.",
      decisions: [
        {
          title: "One navigation model for eight workflows",
          tension:
            "Separate windows can quickly become difficult to track in a desktop application.",
          decision:
            "I used a consistent sidebar and page structure for athletes, coaches, plans, categories, competitions, coaching, billing and payments.",
          why:
            "Familiar placement reduces the mental reset between tasks and keeps the application feeling like one system.",
        },
        {
          title: "Calculate from stored rules, not copied totals",
          tension:
            "Training and competition charges can be entered inconsistently when each bill is calculated manually.",
          decision:
            "The application calculates training, competition, private coaching and payment totals from the relevant records.",
          why:
            "Central calculation rules improve consistency and make the output easier to review.",
        },
        {
          title: "Add a printable result after testing",
          tension:
            "A correct total on a screen did not solve the administrator's need to keep or hand over a physical record.",
          decision:
            "I added a printable bill/report option after feedback.",
          why:
            "It completed the task in the context where the system would be used, rather than stopping at database correctness.",
        },
      ],
      feedback:
        "Testing confirmed the core flows but revealed a missing final step: billing needed a practical printable output.",
      media: [
        {
          src: media("kickblast-judo", "bill"),
          alt: "KickBlast Judo generated bill",
          title: "Printable billing completes the task",
          caption: "The report turns stored calculations into an output the administrator can review, print and hand over.",
          points: [
            "Uses the same stored fee and payment records",
            "Presents a clear total and payment state",
            "Closes the workflow beyond the on-screen calculation",
          ],
          orientation: "portrait",
          presentation: "spotlight",
        },
      ],
    },
    solution: {
      headline: "A desktop system that follows the administrator's real sequence of work.",
      intro:
        "The final application connects secure access, record management, automated calculations, dashboard monitoring and printable output.",
      features: [
        { title: "Login-protected access", text: "A single authenticated role keeps club records behind a controlled entry point." },
        { title: "Connected CRUD forms", text: "The main records can be added, searched, viewed, updated and deleted through consistent interfaces." },
        { title: "Automated calculations", text: "Training, competition, coaching, fee and payment values are calculated from stored information." },
        { title: "Operational dashboard", text: "Totals, upcoming events, revenue trends and athlete statistics are visible at a glance." },
        { title: "Printable billing", text: "The report option turns stored and calculated information into a usable document." },
        { title: "Relational data layer", text: "ADO.NET connects the Windows Forms application to SQL Server records and queries." },
      ],
      workflow: [
        "Secure login",
        "Manage records",
        "Calculate fees",
        "Review dashboard",
        "Print bill or report",
      ],
      media: [
        {
          src: media("kickblast-judo", "athlete"),
          alt: "KickBlast Judo athlete record management",
          caption: "Record screens keep actions close to the data they affect.",
          orientation: "wide",
        },
        {
          src: media("kickblast-judo", "dashboard"),
          alt: "KickBlast Judo dashboard overview",
          caption: "The dashboard gives a quick operational picture before the administrator opens a detailed workflow.",
          orientation: "wide",
        },

      ],
    },
    validation: {
      headline: "A complete desktop workflow from record entry to printable billing.",
      intro:
        "The application was completed, functionally tested and published on GitHub. Its value is the way related club tasks operate through one data-connected interface.",
      evidence: [
        "Eight core club-management workflows in one application",
        "SQL Server-backed create, read, update, delete and search operations",
        "Automated fee and payment calculations",
        "Dashboard totals and visual summaries",
        "Printable report added after feedback",
      ],
      boundaries: [
        "No claim is made about real club adoption or time saved.",
        "The application uses one authenticated role rather than a multi-role permission system.",
        "The application focuses on a desktop management workflow and does not include cloud deployment.",
      ],
      futureMeasures: [
        "Billing calculation error rate",
        "Time required to locate and update a record",
        "Successful report generation and print completion",
      ],
    },
    reflection: {
      headline: "A feature is finished only when the user's task is finished.",
      wentWell:
        "The application brings related records and calculations into a coherent desktop experience. The dashboard and print flow make the stored data useful beyond basic CRUD operations.",
      differently:
        "I would introduce a clearer service layer between forms and database code, add automated tests for fee calculations and design role permissions before expanding the system.",
      learned: [
        "Map the full task, including the output people need afterward",
        "Keep desktop navigation consistent across many forms",
        "Separate calculation rules from presentation where possible",
      ],
      next: [
        "Add role-based permissions for administrators and coaches",
        "Create automated tests for billing and competition calculations",
        "Export reports to PDF with configurable templates",
      ],
    },
  },
  {
    slug: "etcp",
    title: "ETCP",
    shortTitle: "ETCP",
    type: "Eco-Tourism App",
    period: "March 2026 - April 2026",
    status: "Completed React frontend",
    accent: "#138e62",
    cover: media("etcp", "cover"),
    cardSummary:
      "A 50-screen React frontend where traveller and provider journeys evolved through research, sketches and usability feedback.",
    tools: ["React 19", "JavaScript", "Vite", "Tailwind CSS 4", "Framer Motion", "Pigeon Maps"],
    links: [{ label: "GitHub", href: "https://github.com/SafanDev/eco-traveler-cloud-platform" }],
    role: "Designer and frontend developer",
    team: "Independent project",
    hook:
      "ETCP started as a travel-discovery idea. Feedback exposed the missing piece: finding a place is not the same as being able to plan the trip.",
    overview:
      "ETCP is a 50-screen React frontend connecting eco-travel discovery, trip planning and provider management through separate but consistent mobile journeys.",
    proof: [
      { value: "50", label: "interactive screens" },
      { value: "2", label: "traveller and provider journeys" },
      { value: "3", label: "major changes after feedback" },
      { value: "Solo", label: "design and frontend build" },
    ],
    storyArc: [
      {
        label: "The tension",
        title: "Discovery alone did not help people organise a real trip.",
        text: "The first direction could show destinations, but feedback revealed gaps in navigation, readability and planning.",
        href: "#problem",
      },
      {
        label: "The turning point",
        title: "Feedback changed the product, not only the colours.",
        text: "I improved contrast, rebuilt mobile navigation and introduced the trip planner as a new core flow.",
        href: "#process",
      },
      {
        label: "The payoff",
        title: "A connected journey for both sides of the marketplace.",
        text: "Travellers can discover and plan while providers can manage listings, availability and activity.",
        href: "#solution",
      },
    ],
    problem: {
      headline: "Eco-tourism involves a journey before, during and after discovery.",
      paragraphs: [
        "Travellers need to compare destinations, save choices and organise a trip, while providers need a focused view of listings, availability, bookings and performance.",
        "The product therefore had to feel simple on a phone while still containing two substantial experiences. It also needed to explain its flows without a real backend, payment service or live travel API.",
      ],
      goal:
        "Design and build a convincing mobile-app frontend that connects discovery and trip planning for travellers with service management for providers.",
    },
    discovery: {
      headline: "Move from questions to a journey, not directly to polished screens.",
      methods: ["Questionnaire", "Requirements gathering", "Sketching", "Wireframing", "Usability testing"],
      paragraphs: [
        "Research separated essential journeys from decorative ideas. Discovery, bookings, reviews, profiles and provider management became the foundation.",
        "I began with a hand sketch to explore the mobile hierarchy, then used a wireframe to test the placement of content and navigation before building the visual interface in React.",
      ],
      media: [
        {
          src: media("etcp", "sketch"),
          alt: "Early hand sketch for ETCP mobile screens",
          title: "From journeys to screen structure",
          caption: "The hand-drawn sketch helps to plan layout and flow.",
          orientation: "wide",
          presentation: "comparison-board",
        },
        {
          src: media("etcp", "wireframe"),
          alt: "ETCP low-fidelity mobile wireframe",
          title: "A focused booking flow before visual styling",
          caption: "The wireframe translated the early thinking into a structured screen with clear booking information and a visible primary action.",
          points: [
            "Trip details grouped before price information",
            "Primary confirmation action kept visually distinct",
            "Content order tested before high-fidelity styling",
          ],
          orientation: "portrait",
          presentation: "spotlight",
        },
      ],
    },
    process: {
      headline: "The most useful iteration changed what the product could do.",
      intro:
        "Testing first exposed contrast and reachability issues, then revealed the larger missing workflow: turning destination discovery into a usable trip plan.",
      decisions: [
        {
          title: "Separate traveller and provider journeys",
          tension:
            "Putting discovery and business management in one navigation structure would overwhelm both audiences.",
          decision:
            "I created distinct traveller and provider experiences with shared visual rules but different information priorities.",
          why:
            "Each user sees the tasks relevant to them without losing the sense that both sides belong to one product.",
        },
        {
          title: "State-based navigation across a large screen system",
          tension:
            "Fifty screens become difficult to navigate when every transition behaves like an unrelated page.",
          decision:
            "I built reusable screens with custom navigation state, route history and animated transitions.",
          why:
            "The interface behaves like a mobile application while the reusable screen system keeps navigation manageable across the full experience.",
        },
        {
          title: "Place the main route action within thumb reach",
          tension:
            "The original trip-planner action sat high on the screen and was difficult to reach with one hand.",
          decision:
            "I moved the action to the bottom of the flow and made it visually clearer.",
          why:
            "The revised position follows the user's reading order and improves one-handed mobile use.",
        },
      ],
      feedback:
        "Feedback improved contrast, simplified mobile navigation and introduced the trip planner as a core flow.",
      comparison: {
        before: media("etcp", "map-action-before-v2"),
        after: media("etcp", "map-action-after"),
        beforeAlt: "ETCP map screen before the route action was added",
        afterAlt: "ETCP map screen after the route action was added",
        beforeLabel: "Before",
        afterLabel: "After",
        caption: "Drag the divider to compare how the new current location action integrates with the existing interface.",
      },
      media: [],
    },
    solution: {
      headline: "A mobile product story that connects discovery, planning and service management.",
      intro:
        "The final React frontend connects both sides of the platform through reusable screens and realistic end-to-end journeys.",
      features: [
        { title: "Destination discovery", text: "Search, filters, maps and property details help travellers compare options." },
        { title: "Trip planning", text: "A dedicated planner turns saved places and activities into a usable route." },
        { title: "Traveller activity", text: "Bookings, saved items, reviews and profile screens continue the journey after discovery." },
        { title: "Provider workspace", text: "Listings, availability, bookings, reviews, analytics and payouts are organised for service providers." },
        { title: "Reusable screen system", text: "Shared components and navigation behaviour keep all 50 screens consistent." },
        { title: "Motion with purpose", text: "Transitions support orientation instead of becoming decoration that delays the user." },
      ],
      workflow: [
        "Discover destination",
        "Compare and save",
        "Build a trip",
        "Manage bookings",
        "Provider updates service",
      ],
      media: [
        {
          src: media("etcp", "traveler-home"),
          alt: "ETCP traveller home interface",
          caption: "Discovery begins with a focused traveller view rather than a generic marketplace dashboard.",
          orientation: "portrait",
        },
        {
          src: media("etcp", "trip-planner"),
          alt: "ETCP trip planner interface",
          caption: "The trip planner became a core feature after feedback revealed the gap between browsing and planning.",
          orientation: "portrait",
        },
        {
          src: media("etcp", "provider-dashboard"),
          alt: "ETCP provider dashboard interface",
          caption: "The provider dashboard gives the other side of the product a clear operational home.",
          orientation: "portrait",
        },
        {
          src: media("etcp", "traveler-stats"),
          alt: "ETCP traveller trips and statistics screen",
          caption: "Activity and progress screens keep the experience useful beyond the first booking flow.",
          orientation: "portrait",
        },
      ],
    },
    validation: {
      headline: "A React frontend improved through feedback-led iteration.",
      intro:
        "ETCP was completed as an interactive React frontend and tested through its main mobile interactions. Its strongest outcome is the visible movement from early idea to feedback-led product changes.",
      evidence: [
        "Fifty-screen React frontend",
        "Separate traveller and provider journeys",
        "Sketch and wireframe developed before high-fidelity implementation",
        "Contrast and navigation improved after usability feedback",
        "Trip planner added after feedback identified a missing task",
      ],
      boundaries: [
        "The project does not include a production backend or database.",
        "Bookings, payouts and payments use local interface data rather than live services.",
        "No real adoption, conversion or revenue numbers are claimed.",
      ],
      futureMeasures: [
        "Trip-planner task completion and abandonment",
        "Time needed to find and save a suitable destination",
        "Provider listing-creation completion and error rate",
      ],
    },
    reflection: {
      headline: "The best feedback changed the feature set, not just the finish.",
      wentWell:
        "The project shows the full movement from research and sketching to React implementation and iteration. The traveller and provider experiences remain distinct without feeling like separate products.",
      differently:
        "I would define a smaller test plan earlier, document each usability observation more formally and validate the information architecture with more participants before building all fifty screens.",
      learned: [
        "A polished discovery flow can still miss the user's next task",
        "Mobile reachability matters as much as visual balance",
        "Reusable navigation is essential when screen systems become large",
      ],
      next: [
        "Connect the frontend to a real API and authentication service",
        "Test the trip planner with several realistic itineraries",
        "Add accessible loading, empty and error states for live data",
      ],
    },
  },
  {
    slug: "enomy-finance",
    title: "Enomy Finance",
    shortTitle: "Enomy",
    type: "Finance Website UI/UX",
    period: "December 2025 - January 2026",
    status: "Completed interactive Figma design",
    accent: "#7141d8",
    cover: media("enomy-finance", "cover"),
    cardSummary:
      "An interactive Figma design that makes currency conversion, investment quotes and account activity easier to understand.",
    tools: ["Figma"],
    links: [
      {
        label: "View Figma design",
        href: "https://www.figma.com/design/IUAmQxfeTqMFcCiA4XFfwd/Enomy-Finance?t=tn6axTtPhgn2IXt5-0",
      },
    ],
    role: "UI/UX designer",
    team: "Independent project",
    hook: "In a finance product, clarity is the visual effect.",
    overview:
      "Enomy Finance is a connected Figma experience for currency conversion, investment quotes, dashboards and saved activity, built with reusable components and Auto Layout.",
    proof: [
      { value: "3", label: "customer, staff and admin views" },
      { value: "1", label: "connected interactive flow" },
      { value: "Auto", label: "Layout across core screens" },
      { value: "Solo", label: "research and interface design" },
    ],
    storyArc: [
      {
        label: "The tension",
        title: "Financial information can be correct and still feel uncertain.",
        text: "Rates, fees, inputs and results compete for attention if hierarchy is not designed carefully.",
        href: "#problem",
      },
      {
        label: "The turning point",
        title: "Treat the quote as a conversation, not a long form.",
        text: "Input, explanation and result states were designed as one journey with consistent components.",
        href: "#process",
      },
      {
        label: "The payoff",
        title: "A design system that explains its workflows at a glance.",
        text: "Customer, staff and admin screens share one visual system while presenting different levels of detail.",
        href: "#solution",
      },
    ],
    problem: {
      headline: "People need to understand the consequence of a financial action before they commit.",
      paragraphs: [
        "Currency conversion and investment quotes combine amounts, rates, fees, limits and outcomes. The interface needed to explain those consequences before users committed to an action.",
        "The project also needed to communicate different tasks for customers, staff and administrators without creating three unrelated visual systems.",
      ],
      goal:
        "Create a clear, consistent finance interface that helps users enter information, understand fees and outcomes, revisit previous activity and move confidently between related tasks.",
    },
    discovery: {
      headline: "Find the information people look for before choosing a layout.",
      methods: ["Questionnaire", "Task analysis", "Content hierarchy"],
      paragraphs: [
        "Questionnaire responses prioritised visible rates, clear fees, understandable outcomes and accessible history. Those needs shaped the main journeys.",
        "I did not create a separate wireframe set for this project. Instead, I explored hierarchy directly in Figma and used reusable components and Auto Layout to iterate without losing consistency.",
      ],
      media: [
        {
          src: media("enomy-finance", "homepage"),
          alt: "Complete Enomy Finance homepage design",
          title: "A calm public entry point",
          caption: "The full homepage introduces the service, its three core tools and the trust information needed before a financial task begins.",
          points: [
            "Primary services are visible without dense financial detail",
            "Navigation separates exploration from account actions",
            "Reusable cards establish the visual system early",
          ],
          orientation: "portrait",
          presentation: "spotlight",
        },
        {
          src: media("enomy-finance", "user-dashboard"),
          alt: "Enomy Finance user dashboard",
          title: "Account information at a glance",
          caption: "The dashboard groups balances, activity, performance and next actions around a clear information hierarchy.",
          orientation: "wide",
        },
      ],
    },
    process: {
      headline: "Make every number answer the next question.",
      intro:
        "The main design work was not adding more visual elements. It was deciding which information appears first, what needs explanation and how the same component behaves across customer, staff and admin contexts.",
      decisions: [
        {
          title: "Separate input from outcome without breaking the journey",
          tension:
            "A single long page can overwhelm the user, while separate pages can make the result feel disconnected from the values entered.",
          decision:
            "I designed quote input and result states as a connected sequence with repeated context and clear continuation actions.",
          why:
            "Users can understand where the result came from without carrying every detail in memory.",
        },
        {
          title: "Expose rates and fees before confirmation",
          tension:
            "Hiding financial details until the last step creates uncertainty and makes the interface feel untrustworthy.",
          decision:
            "Key rates, charges and summary values are placed close to the action they affect.",
          why:
            "The interface supports informed decisions rather than asking users to trust a final unexplained number.",
        },
        {
          title: "One component system across three user types",
          tension:
            "Customer, staff and admin screens require different density, but completely different layouts create inconsistency.",
          decision:
            "I reused navigation, cards, tables, form fields, status treatments and spacing rules through Auto Layout components.",
          why:
            "The product stays recognisable while each role receives the level of control it needs.",
        },
      ],
      feedback:
        "Questionnaire input guided the information hierarchy, while formal task-based usability validation remains a clear next step.",
      media: [
        {
          src: media("enomy-finance", "quote-generator"),
          alt: "Enomy Finance investment quote generator",
          title: "Quote inputs",
          caption: "The quote generator groups related inputs and keeps guidance close to the field that needs it.",
          orientation: "portrait",
          presentation: "document",
        },
        {
          src: media("enomy-finance", "quote-results"),
          alt: "Enomy Finance quote result design",
          title: "Structured result",
          caption: "The result state explains projections, fees and next actions through hierarchy rather than one isolated total.",
          orientation: "portrait",
          presentation: "document",
        },
      ],
    },
    solution: {
      headline: "A consistent system for customer decisions and operational oversight.",
      intro:
        "The final design connects public service discovery, customer tools, saved activity, staff workflows and administration through one interface system.",
      features: [
        { title: "Currency conversion", text: "Inputs, exchange rates, fees and results are organised as a clear decision flow." },
        { title: "Investment quotes", text: "Users can enter requirements, review a structured outcome and keep previous quotes accessible." },
        { title: "Account dashboard", text: "Balances, activity and actions are grouped around what the user is likely to need next." },
        { title: "Saved history", text: "Quotes and transactions can be revisited without repeating the original task." },
        { title: "Staff and admin views", text: "Operational screens use denser tables and controls while preserving the same component language." },
        { title: "Interactive Figma flow", text: "Connected screens present the intended journey instead of isolated layouts." },
      ],
      workflow: [
        "Choose service",
        "Enter financial details",
        "Review rates and fees",
        "Confirm or save result",
        "Return through history",
      ],
      media: [
        {
          src: media("enomy-finance", "homepage"),
          alt: "Enomy Finance public homepage",
          title: "Public service experience",
          caption: "The public view introduces services and establishes trust through a restrained hierarchy.",
          orientation: "portrait",
          presentation: "document",
        },
        {
          src: media("enomy-finance", "quote-results"),
          alt: "Enomy Finance investment result",
          title: "Investment result",
          caption: "The result screen connects figures, explanation and next actions in one state.",
          orientation: "portrait",
          presentation: "document",
        },
        {
          src: media("enomy-finance", "saved-history"),
          alt: "Enomy Finance saved quotes and transaction history",
          title: "Saved activity that supports continuation",
          caption: "History screens let users return to previous decisions instead of repeating the original task.",
          points: [
            "Saved quotes keep their key values visible",
            "Search and filters support repeat visits",
            "Actions stay close to the record they affect",
          ],
          orientation: "portrait",
          presentation: "spotlight",
        },
        {
          src: media("enomy-finance", "admin-dashboard"),
          alt: "Enomy Finance administrator dashboard",
          caption: "The admin view increases information density without abandoning the shared visual system.",
          orientation: "wide",
        },
      ],
    },
    validation: {
      headline: "A connected Figma experience and reusable interface system.",
      intro:
        "The interactive design connects customer, staff and admin journeys through one visual system. Coded implementation and formal usability validation remain future work.",
      evidence: [
        "Questionnaire-informed service and information priorities",
        "Connected customer, staff and admin flows",
        "Reusable components and Auto Layout across the core screens",
        "Currency conversion, quote, dashboard and history journeys represented",
      ],
      boundaries: [
        "The work focuses on interaction and interface design; coded implementation remains future work.",
        "No working database, live market data or financial transaction service is claimed.",
        "No usability-test improvement percentages are claimed.",
      ],
      futureMeasures: [
        "Quote completion and comprehension rate",
        "Ability to identify fees and final value without assistance",
        "Time needed to locate a previous quote or transaction",
      ],
    },
    reflection: {
      headline: "Restraint can communicate more confidence than decoration.",
      wentWell:
        "The interface keeps several complex finance journeys within one recognisable system. Auto Layout and components made it possible to explore different roles without losing consistency.",
      differently:
        "I would create low-fidelity flows before visual design and run task-based usability tests with realistic financial examples before expanding the admin screens.",
      learned: [
        "Financial hierarchy should explain consequence, not only value",
        "Reusable components improve both consistency and iteration speed",
        "Interactive design should clearly separate intended flow from implemented functionality",
      ],
      next: [
        "Test quote comprehension with realistic tasks",
        "Design accessible error and verification states",
        "Build the highest-risk journey as a coded component flow",
      ],
    },
  },
];

export const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<Project["slug"], Project>;

export function getNextProject(slug: Project["slug"]) {
  const order: Project["slug"][] = ["velvet-vogue", "etcp", "kickblast-judo", "enomy-finance"];
  const index = order.indexOf(slug);
  const nextSlug = order[(index + 1) % order.length];
  return projectBySlug[nextSlug];
}
