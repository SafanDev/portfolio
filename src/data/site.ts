export const siteConfig = {
  name: "Safan",
  fullName: "Mohamed Safan",
  role: "Full-Stack Developer",
  location: "Sri Lanka",
  city: "Batticaloa, Sri Lanka",
  email: "safan.dev@gmail.com",
  github: "https://github.com/SafanDev",
  linkedin: "https://www.linkedin.com/in/mohamed-safan-dev",
  cv: "/downloads/Mohamed-Safan-CV.pdf",
} as const;

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export type Skill = {
  name: string;
  icon: string;
  color: string;
  category: "Frontend" | "Backend" | "Database" | "Desktop" | "Tools";
};

export const skills: Skill[] = [
  { name: "React", icon: "react", color: "#61DAFB", category: "Frontend" },
  { name: "Next.js", icon: "nextjs", color: "#FFFFFF", category: "Frontend" },
  { name: "TypeScript", icon: "typescript", color: "#3178C6", category: "Frontend" },
  { name: "JavaScript", icon: "javascript", color: "#F7DF1E", category: "Frontend" },
  { name: "HTML5", icon: "html", color: "#E34F26", category: "Frontend" },
  { name: "CSS3", icon: "css", color: "#1572B6", category: "Frontend" },
  { name: "Tailwind", icon: "tailwind", color: "#06B6D4", category: "Frontend" },
  { name: "Bootstrap", icon: "bootstrap", color: "#7952B3", category: "Frontend" },
  { name: "PHP", icon: "php", color: "#777BB4", category: "Backend" },
  { name: "Node.js", icon: "node", color: "#339933", category: "Backend" },
  { name: "MySQL", icon: "mysql", color: "#4479A1", category: "Database" },
  { name: "SQL Server", icon: "sqlserver", color: "#CC292B", category: "Database" },
  { name: "C#", icon: "csharp", color: "#239120", category: "Desktop" },
  { name: ".NET", icon: "dotnet", color: "#512BD4", category: "Desktop" },
  { name: "WinForms", icon: "windows", color: "#0078D6", category: "Desktop" },
  { name: "ADO.NET", icon: "database", color: "#528BD4", category: "Desktop" },
  { name: "Figma", icon: "figma", color: "#F24E1E", category: "Tools" },
  { name: "Git", icon: "git", color: "#F05032", category: "Tools" },
  { name: "GitHub", icon: "github", color: "#FFFFFF", category: "Tools" },
  { name: "Vite", icon: "vite", color: "#646CFF", category: "Tools" },
];
