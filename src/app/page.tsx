import Image from "next/image";

const projects = [
  {
    title: "Velvet Vogue",
    type: "Full-stack web app",
    image: "/projects/velvet-vogue/cover.png",
    description:
      "An e-commerce website with product browsing, accounts, cart, checkout, orders, and an admin dashboard.",
    tools: "PHP, MySQL, JavaScript, Bootstrap",
    links: [
      {
        label: "Live site",
        href: "https://vetvetvogue.gamer.gd/",
      },
      {
        label: "GitHub",
        href: "https://github.com/SafanDev/velvetVogue",
      },
    ],
  },
  {
    title: "KickBlast Judo",
    type: "C# desktop app",
    image: "/projects/kickblast-judo/cover.png",
    description:
      "A management system for athletes, coaches, training plans, competitions, fees, and payments.",
    tools: "C#, Windows Forms, SQL Server",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/SafanDev/kick-blast-judo-system",
      },
    ],
  },
  {
    title: "ETCP",
    type: "React prototype",
    image: "/projects/etcp/cover.png",
    description:
      "A mobile-style travel app prototype with destinations, bookings, profiles, search, reviews, and mock payments.",
    tools: "React, JavaScript, CSS",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/SafanDev/eco-traveler-cloud-platform",
      },
    ],
  },
  {
    title: "Enomy Finance",
    type: "UI/UX design",
    image: "/projects/enomy-finance/cover.png",
    description:
      "A finance website design for currency conversion, investment quotes, account history, and user dashboards.",
    tools: "Figma",
    links: [
      {
        label: "View design",
        href: "https://www.figma.com/design/IUAmQxfeTqMFcCiA4XFfwd/Enomy-Finance?t=tn6axTtPhgn2IXt5-0",
      },
    ],
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a href="/" className="site-name" aria-label="Safan home">
          Safan
        </a>

        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Full-Stack Developer</p>

          <h1>I design and build web apps.</h1>

          <p className="hero-description">
            From the interface to the backend, I turn ideas into clean,
            working products.
          </p>

          <div className="hero-actions">
            <a href="#work" className="primary-button">
              View my work
            </a>

            <a
              href="mailto:safan.dev@gmail.com"
              className="secondary-button"
            >
              Email me
            </a>
          </div>

          <p className="availability">
            Sri Lanka · Open to junior roles and internships
          </p>
        </div>

        <div className="hero-proof">
          <div className="proof-heading">
            <p>What I work with</p>

            <span>
              <i aria-hidden="true" />
              Available
            </span>
          </div>

          <div className="proof-list">
            <div className="proof-item">
              <span>01</span>

              <div>
                <p>Frontend</p>
                <strong>React, JavaScript, Tailwind</strong>
              </div>
            </div>

            <div className="proof-item">
              <span>02</span>

              <div>
                <p>Backend</p>
                <strong>PHP, Node.js, MySQL</strong>
              </div>
            </div>

            <div className="proof-item">
              <span>03</span>

              <div>
                <p>Design</p>
                <strong>Figma, UI and UX</strong>
              </div>
            </div>
          </div>

          <a
            href="https://github.com/SafanDev"
            target="_blank"
            rel="noreferrer"
          >
            View GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section id="work">
        <div className="section-heading">
          <p>Selected work</p>
          <h2>Projects I have built and designed.</h2>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 760px) calc(100vw - 24px), (max-width: 1200px) 50vw, 584px"
                  priority={index === 0}
                />
              </div>

              <div className="project-content">
                <div>
                  <p className="project-type">{project.type}</p>

                  <h3>{project.title}</h3>

                  <p className="project-description">
                    {project.description}
                  </p>
                </div>

                <div className="project-footer">
                  <p className="project-tools">{project.tools}</p>

                  <div className="project-links">
                    {project.links.map((link) => (
                      <a
                        href={link.href}
                        key={link.label}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${link.label} for ${project.title}`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about">
        <div className="section-heading">
          <p>About</p>
          <h2>I enjoy turning ideas into working products.</h2>
        </div>

        <div className="about-content">
          <p>
            I&apos;m Safan, a full-stack developer from Sri Lanka. I recently
            completed a BTEC HND in Computing (Software Engineering).
          </p>

          <p>
            I enjoy both frontend and backend development, with a stronger
            interest in building clean and useful user interfaces.
          </p>

          <div className="skills">
            <div>
              <h3>Frontend</h3>
              <p>
                HTML, CSS, JavaScript, React, Bootstrap, Tailwind CSS
              </p>
            </div>

            <div>
              <h3>Backend</h3>
              <p>PHP, C#, Node.js, MySQL</p>
            </div>

            <div>
              <h3>Tools</h3>
              <p>
                Git, GitHub, Figma, VS Code, Visual Studio, XAMPP, Python
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="contact-content">
          <div>
            <p>Contact</p>
            <h2>Have a role or project in mind?</h2>
          </div>

          <div>
            <p>
              I&apos;m open to junior full-stack roles, internships, and
              remote work.
            </p>

            <a href="mailto:safan.dev@gmail.com">
              safan.dev@gmail.com
            </a>

            <a
              href="https://github.com/SafanDev"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <footer>
          <p>Safan</p>
          <p>Sri Lanka</p>
        </footer>
      </section>
    </main>
  );
}