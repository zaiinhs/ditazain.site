export const STATIC_CHAT_SUGGESTIONS = [
  "Zainal itu siapa?",
  "Pengalaman kerja Zainal apa saja?",
  "Skill utama Zainal apa?",
  "Project yang pernah dibuat?",
  "Bagaimana cara menghubungi Zainal?",
];

const fallbackReply =
  "Aku adalah chat AI statis untuk menjawab hal-hal tentang Zainal Abidin. Saat ini aku belum terhubung ke model AI/API, jadi coba tanyakan tentang profil, pengalaman kerja, skill, project, CV, komunitas, artikel, atau kontak Zainal.";

const normalize = (value: string) => value.toLowerCase().trim();

const hasAnyKeyword = (value: string, keywords: string[]) =>
  keywords.some((keyword) => value.includes(keyword));

export function getStaticAIReply(question: string) {
  const input = normalize(question);

  if (!input) {
    return "Silakan tulis pertanyaan tentang Zainal Abidin. Contoh: pengalaman kerja, skill utama, project, atau kontak.";
  }

  if (
    hasAnyKeyword(input, [
      "halo",
      "hai",
      "hello",
      "hi",
      "assalamualaikum",
      "pagi",
      "siang",
      "malam",
    ])
  ) {
    return "Halo! Aku bisa bantu menjawab pertanyaan tentang Zainal Abidin, Software Engineer Frontend dari Indonesia. Kamu bisa tanya tentang pengalaman kerja, skill, project, CV, komunitas, atau kontaknya.";
  }

  if (
    hasAnyKeyword(input, [
      "siapa",
      "profil",
      "profile",
      "tentang",
      "about",
      "background",
      "bio",
      "zainal itu",
    ])
  ) {
    return "Zainal Abidin adalah Software Engineer yang fokus di Frontend Development, berbasis di Indonesia. Ia tertarik membangun produk web yang rapi, fungsional, mobile-friendly, dan berdampak. Tech stack utamanya meliputi React, TypeScript, Next.js, dan Tailwind CSS.";
  }

  if (
    hasAnyKeyword(input, [
      "pengalaman",
      "experience",
      "kerja",
      "work",
      "karier",
      "career",
      "company",
      "perusahaan",
      "delman",
      "ninja",
      "freelance",
      "gatherloop",
      "goto",
    ])
  ) {
    return "Pengalaman Zainal berfokus pada Frontend Engineering. Ia pernah/masih berkontribusi di delman.io sebagai Frontend Engineer, PT. Lumbung Mandiri Bersama sebagai Frontend Developer Freelancer, gatherloop.co sebagai volunteer/community lead, Ninja Van sebagai Frontend Engineer Intern, dan program Generasi GIGIH 2.0 dari YABB / GoTo Impact Foundation. Pekerjaannya banyak terkait React, Next.js, TypeScript, UI/UX, integrasi API, optimasi performa, dan komunikasi dengan stakeholder.";
  }

  if (
    hasAnyKeyword(input, [
      "skill",
      "keahlian",
      "kemampuan",
      "tech stack",
      "teknologi",
      "tools",
      "react",
      "typescript",
      "next",
      "frontend",
    ])
  ) {
    return "Skill utama Zainal adalah Frontend Development: React, TypeScript, Next.js, JavaScript, Tailwind CSS, UI/UX implementation, responsive design, integrasi API, Git, dan basic backend integration. Ia juga terbiasa bekerja dengan React Query, Zustand/Redux, Firebase, Chakra UI, Ant Design, Docker, Jira/Bitbucket/GitLab, dan workflow kolaborasi produk.";
  }

  if (
    hasAnyKeyword(input, [
      "project",
      "projek",
      "portfolio",
      "portofolio",
      "aplikasi",
      "spotify",
      "dashboard",
      "task",
      "weather",
      "website",
    ])
  ) {
    return "Beberapa project yang ditampilkan/tercatat: Personal Website berbasis Next.js, React, TypeScript, dan Tailwind CSS; clone aplikasi Spotify API dari program Generasi GIGIH; E-commerce Dashboard; Task Management App; dan Weather Application. Fokus project-nya banyak di web app, dashboard, UI yang responsif, dan pengalaman pengguna.";
  }

  if (
    hasAnyKeyword(input, [
      "komunitas",
      "community",
      "probolinggo",
      "frontend community",
      "tech talk",
      "gatherloop",
    ])
  ) {
    return "Zainal aktif di komunitas teknologi. Di gatherloop.co, ia terlibat sebagai lead untuk membangun Probolinggo Frontend community dengan sekitar 145 anggota dan kegiatan rutin seperti tech talk bulanan untuk sharing knowledge dan motivasi anggota.";
  }

  if (
    hasAnyKeyword(input, [
      "cv",
      "resume",
      "curriculum",
      "riwayat hidup",
      "download",
    ])
  ) {
    return "CV/Resume Zainal bisa dilihat dari tombol 'View Resume' di halaman utama website ini. Dari sana pengunjung dapat melihat ringkasan pengalaman, skill, dan perjalanan profesional Zainal.";
  }

  if (
    hasAnyKeyword(input, [
      "kontak",
      "contact",
      "hubungi",
      "email",
      "linkedin",
      "github",
      "instagram",
      "twitter",
      "x.com",
      "sosial",
      "social",
    ])
  ) {
    return "Kamu bisa menghubungi atau melihat aktivitas Zainal lewat social link di website: X/Twitter @zaiinhs, Instagram @zaiinhs, LinkedIn linkedin.com/in/zaiinhs, dan GitHub github.com/zaiinhs.";
  }

  if (
    hasAnyKeyword(input, [
      "artikel",
      "article",
      "blog",
      "tulisan",
      "read",
      "menulis",
    ])
  ) {
    return "Zainal juga menampilkan artikel/tulisan di website ini. Kamu bisa membuka menu Articles untuk membaca tulisan terbaru tentang teknologi, proses belajar, dan hal-hal yang sedang ia eksplorasi.";
  }

  if (
    hasAnyKeyword(input, [
      "cocok",
      "hire",
      "rekrut",
      "recruit",
      "frontend engineer",
      "developer",
      "kerjasama",
      "kolaborasi",
    ])
  ) {
    return "Zainal cocok untuk kebutuhan Frontend Engineer, terutama untuk produk berbasis React/Next.js/TypeScript yang butuh UI responsif, integrasi API, perhatian ke UX, dan komunikasi aktif dengan tim/stakeholder. Untuk diskusi peluang kerja atau kolaborasi, gunakan link LinkedIn/GitHub/social yang tersedia di website.";
  }

  return fallbackReply;
}
