export const STATIC_CHAT_SUGGESTIONS = [
  "Zainal itu siapa?",
  "Apa fokus Data Engineering Zainal?",
  "Pengalaman kerja Zainal apa saja?",
  "Skill utama Zainal apa?",
  "Bagaimana cara menghubungi Zainal?",
];

const fallbackReply =
  "Aku adalah chat AI statis untuk menjawab hal-hal tentang Zainal Abidin. Saat ini aku belum terhubung ke model AI/API, jadi coba tanyakan tentang profil, fokus Data Engineering, pengalaman kerja, skill, project, CV, komunitas, artikel, atau kontak Zainal.";

const normalize = (value: string) => value.toLowerCase().trim();

const hasAnyKeyword = (value: string, keywords: string[]) =>
  keywords.some((keyword) => value.includes(keyword));

export function getStaticAIReply(question: string) {
  const input = normalize(question);

  if (!input) {
    return "Silakan tulis pertanyaan tentang Zainal Abidin. Contoh: fokus Data Engineering, pengalaman kerja, skill utama, project, atau kontak.";
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
    return "Halo! Aku bisa bantu menjawab pertanyaan tentang Zainal Abidin, Software Engineer & Data Engineer dari Indonesia. Kamu bisa tanya tentang fokus Data Engineering, pengalaman kerja, skill, project, CV, komunitas, atau kontaknya.";
  }

  // Data Engineering focus — diletakkan sebelum 'skill' agar lebih spesifik
  if (
    hasAnyKeyword(input, [
      "data engineer",
      "data engineering",
      "etl",
      "elt",
      "pipeline",
      "sql",
      "python",
      "transform",
      "data warehouse",
      "dbt",
      "airflow",
      "bigquery",
    ])
  ) {
    return "Fokus utama Zainal saat ini adalah Data Engineering. Ia membangun data pipeline (ingestion, transformation, delivery) menggunakan SQL dan Python, melakukan data modeling, serta menjaga kualitas dan keandalan data. Tools yang biasa dipakai: SQL, Python, dbt, Airflow, PostgreSQL, dan BigQuery. Lihat halaman 'Data' di website ini untuk contoh query SQL, snippet ETL Python, dan diagram pipeline-nya.";
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
    return "Zainal Abidin adalah Software Engineer & Data Engineer berbasis di Indonesia. Saat ini ia bekerja sebagai Technical Product Specialist di Indivara Group. Ia berawal dari Frontend Engineering (React, TypeScript, Next.js) dan kini fokus ke Data Engineering: SQL, Python, dan transformasi data untuk membangun dataset yang bersih dan andal.";
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
      "indivara",
      "delman",
      "ninja",
      "freelance",
      "gatherloop",
      "goto",
    ])
  ) {
    return "Saat ini (sejak Jan 2026) Zainal adalah Technical Product Specialist di Indivara Group. Sebelumnya ia Frontend Engineer di Delman (PT. Delman Data Teknologi) hingga Desember 2025, Frontend Developer freelance di PT. Lumbung Mandiri Bersama, community lead di gatherloop.co, Frontend Engineer Intern di Ninja Van, dan alumni program Generasi GIGIH 2.0 (YABB / GoTo Impact Foundation). Pengalamannya mencakup React/Next.js/TypeScript, integrasi API, optimasi performa, hingga data pipeline dengan SQL & Python.";
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
    return "Skill Zainal mencakup dua sisi. Data Engineering: SQL, Python, ETL/ELT, dbt, Airflow, data modeling, PostgreSQL, BigQuery. Software Engineering: TypeScript, JavaScript, React, Next.js, Node.js, Tailwind CSS, integrasi API, dan Git/Docker. Ia terbiasa bekerja lintas peran — membangun fitur produk sekaligus infrastruktur data di belakangnya.";
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
    return "Beberapa project Zainal: Personal Website (Next.js, React, TypeScript, Tailwind), data pipeline & transformasi data dengan SQL/Python, clone aplikasi Spotify API dari program Generasi GIGIH, serta berbagai web app dan dashboard. Buka menu Projects dan Data di website ini untuk detailnya.";
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
    return "Zainal aktif di komunitas teknologi. Di gatherloop.co ia menjadi lead untuk membangun Probolinggo Frontend community dengan 145+ anggota, dengan kegiatan rutin seperti tech talk bulanan untuk berbagi ilmu dan memotivasi anggota.";
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
    return "CV/Resume Zainal bisa dilihat dari tombol 'View Resume' di halaman utama website ini, lengkap dengan opsi download. Dari sana pengunjung dapat melihat ringkasan pengalaman, skill, dan perjalanan profesionalnya.";
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
    return "Kamu bisa menghubungi Zainal lewat: LinkedIn linkedin.com/in/zaiinhs, GitHub github.com/zaiinhs, X/Twitter @zaiinhs, Instagram @zaiinhs, atau email lewat tombol kontak di website.";
  }

  if (
    hasAnyKeyword(input, ["artikel", "article", "blog", "tulisan", "read", "menulis"])
  ) {
    return "Zainal menulis artikel di website ini. Buka menu Articles untuk membaca tulisannya, termasuk pembahasan tentang peran Data Analyst/Engineer/Scientist, web development, dan topik teknologi lain.";
  }

  if (
    hasAnyKeyword(input, [
      "cocok",
      "hire",
      "rekrut",
      "recruit",
      "data engineer",
      "developer",
      "kerjasama",
      "kolaborasi",
    ])
  ) {
    return "Zainal cocok untuk peran Data Engineer maupun Software Engineer — terutama yang membutuhkan SQL, Python, transformasi data, dan pembangunan produk berbasis React/Next.js/TypeScript. Untuk diskusi peluang kerja atau kolaborasi, hubungi lewat LinkedIn/GitHub/email yang tersedia di website.";
  }

  return fallbackReply;
}
