export interface Article {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export const articles: Article[] = [
  {
    title: "Building Modern Web Applications with Next.js",
    description:
      "A comprehensive guide to building scalable web applications using Next.js 14, React Server Components, and TypeScript.",
    date: "2024-01-20",
    readTime: "5 min read",
    tags: ["Next.js", "React", "TypeScript"],
    slug: "building-modern-web-applications",
  },
  {
    title: "Understanding Microservices Architecture",
    description:
      "Deep dive into microservices architecture, its benefits, challenges, and best practices for implementing it in modern applications.",
    date: "2024-01-18",
    readTime: "8 min read",
    tags: ["Architecture", "Microservices", "System Design"],
    slug: "understanding-microservices",
  },
  {
    title: "Clean Code Principles for JavaScript Developers",
    description:
      "Learn essential clean code practices and principles to write maintainable and scalable JavaScript code.",
    date: "2024-01-15",
    readTime: "6 min read",
    tags: ["JavaScript", "Clean Code", "Best Practices"],
    slug: "clean-code-principles",
  },
  {
    title: "Getting Started with Docker and Containerization",
    description:
      "A beginner's guide to Docker containers, images, and basic containerization concepts for modern development.",
    date: "2024-01-12",
    readTime: "7 min read",
    tags: ["Docker", "DevOps", "Containers"],
    slug: "docker-containerization",
  },
  {
    title: "Advanced TypeScript Design Patterns",
    description:
      "Explore advanced TypeScript patterns and techniques to write more robust and type-safe applications.",
    date: "2024-01-10",
    readTime: "10 min read",
    tags: ["TypeScript", "Design Patterns", "Advanced"],
    slug: "typescript-design-patterns",
  },
  {
    title: "CI/CD Best Practices with GitHub Actions",
    description:
      "Learn how to set up efficient CI/CD pipelines using GitHub Actions for your development workflow.",
    date: "2024-01-08",
    readTime: "6 min read",
    tags: ["CI/CD", "GitHub", "DevOps"],
    slug: "github-actions-cicd",
  },
  {
    title: "State Management in React: A Complete Guide",
    description:
      "Compare different state management solutions in React and learn when to use each approach.",
    date: "2024-01-05",
    readTime: "9 min read",
    tags: ["React", "State Management", "Frontend"],
    slug: "react-state-management",
  },
  {
    title: "API Security Best Practices",
    description:
      "Essential security practices and techniques to protect your APIs from common vulnerabilities and attacks.",
    date: "2024-01-03",
    readTime: "7 min read",
    tags: ["Security", "API", "Backend"],
    slug: "api-security-practices",
  },
  {
    title: "Performance Optimization in Web Applications",
    description:
      "Practical techniques and strategies to improve the performance of your web applications.",
    date: "2024-01-01",
    readTime: "8 min read",
    tags: ["Performance", "Web", "Optimization"],
    slug: "web-performance-optimization",
  },
  {
    title: "Introduction to System Design",
    description:
      "Learn fundamental concepts and approaches to design large-scale distributed systems.",
    date: "2023-12-28",
    readTime: "12 min read",
    tags: ["System Design", "Architecture", "Backend"],
    slug: "system-design-intro",
  },
]; 