const projects = [
  {
    title: "Velvet Vogue",
    type: "Full-stack web app",
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
    title: "ENOMY Finance",
    type: "UI/UX design",
    description:
      "A finance website design for currency conversion and related financial services.",
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
      <header>
        <a href="/" aria-label="Safan home">
          Safan
        </a>

        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section>
        <p>Full-Stack Developer</p>

        <h1>I build web apps that look good and work well.</h1>

        <p>
          I&apos;m Safan, a developer from Sri Lanka. I enjoy turning ideas
          into clean, working products.
        </p>

        <div>
          <a href="#work">View my work</a>
          <a href="mailto:safan.dev@gmail.com">Email me</a>
        </div>

        <p>Open to junior roles and internships.</p>
      </section>

      <section id="work">
        <div className="section-heading">
          <p>Selected work</p>
          <h2>Projects I have built and designed.</h2>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div>
                <p className="project-type">{project.type}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>

              <div>
                <p className="project-tools">{project.tools}</p>

                <div className="project-links">
                  {project.links.map((link) => (
                    <a
                      href={link.href}
                      key={link.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
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
      I enjoy both frontend and backend development, with a stronger interest
      in building clean and useful user interfaces.
    </p>

    <div className="skills">
      <div>
        <h3>Frontend</h3>
        <p>HTML, CSS, JavaScript, React, Bootstrap, Tailwind CSS</p>
      </div>

      <div>
        <h3>Backend</h3>
        <p>PHP, C#, Node.js, MySQL</p>
      </div>

      <div>
        <h3>Tools</h3>
        <p>Git, GitHub, Figma, VS Code, Visual Studio, XAMPP, Python</p>
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
        I&apos;m open to junior full-stack roles, internships, and remote work.
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