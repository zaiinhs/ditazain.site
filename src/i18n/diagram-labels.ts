import type { Locale } from "./index";

// Only visible labels inside Mermaid examples are translated. Diagram syntax,
// node identifiers, and other source-code examples are left unchanged.
const labels: Record<string, Partial<Record<Locale, Record<string, string>>>> = {
  "data-roles-explained": {
    en: {
      "Dapur Data": "Data Kitchen", "Koki Utama": "Head Chef", "Ahli Rasa": "Recipe Creator",
      "Pelayan": "Server", "Data Mentah": "Raw Data", "Bahan Baku": "Ingredients",
      "Pengguna": "User", "Tamu Restauran": "Restaurant Guest", "Analisa": "Analysis",
      "Visualisasi": "Visualization", "Laporan": "Report", "Keputusan": "Decision",
      "Apa yang": "What", "terjadi?": "happened?", "Menggunakan": "Using",
      "data masa lalu": "past data", "akan terjadi?": "might happen?", "Memprediksi": "Predicting",
      "masa depan": "the future", "Butuh Insight": "Needs Insights", "Assign Task": "Assign Task",
      "Belajar": "Learn", "Pilih": "Choose", "Jurusan": "a path", "Suka Visual": "Likes Charts",
      "Suka Sistem": "Likes Systems", "Suka ML": "Likes ML", "Peran-Peran": "Roles",
    },
    jv: {
      "Dapur Data": "Pawon Data", "Koki Utama": "Juru Masak", "Ahli Rasa": "Ahli Rasa",
      "Pelayan": "Pelayan", "Data Mentah": "Data Mentah", "Bahan Baku": "Bahan Mentah",
      "Pengguna": "Pangguna", "Tamu Restauran": "Tamu Restoran", "Analisa": "Analisis",
      "Visualisasi": "Visualisasi", "Laporan": "Laporan", "Keputusan": "Keputusan",
      "Apa yang": "Apa sing", "terjadi?": "kelakon?", "Menggunakan": "Nggunakake",
      "data masa lalu": "data biyen", "akan terjadi?": "bakal kelakon?", "Memprediksi": "Ngira",
      "masa depan": "masa ngarep", "Butuh Insight": "Butuh Insight", "Belajar": "Sinau",
      "Pilih": "Pilih", "Jurusan": "Dalan", "Suka Visual": "Seneng Grafik",
      "Suka Sistem": "Seneng Sistem", "Suka ML": "Seneng ML",
    },
  },
  "deploy-like-a-pro": {
    en: {
      "Login Server": "Log In to Server", "Upload File": "Upload Files", "Selesai": "Done",
      "Push Kode": "Push Code", "Build Process": "Build Process", "App Version Baru": "New App Version",
      "App Version Lama": "Old App Version", "App Baru": "New App", "App Lama": "Old App",
      "Aplikasi": "Application", "Sudah Online!": "Now Online!", "Import Repository": "Import Repository",
      "Pilih Framework": "Choose Framework", "Klik Deploy": "Click Deploy", "Beli VPS": "Rent a VPS",
      "Install Docker": "Install Docker", "Buat docker-compose.yml": "Create docker-compose.yml",
      "dengan Certbot": "with Certbot", "Deploy Selesai!": "Deployment Complete!",
    },
    jv: {
      "Login Server": "Login Server", "Upload File": "Unggah File", "Selesai": "Rampung",
      "Push Kode": "Push Kode", "App Version Baru": "Versi Aplikasi Anyar",
      "App Version Lama": "Versi Aplikasi Lawas", "App Baru": "Aplikasi Anyar",
      "App Lama": "Aplikasi Lawas", "Sudah Online!": "Wis Online!",
      "Pilih Framework": "Pilih Framework", "Klik Deploy": "Klik Deploy", "Beli VPS": "Sewa VPS",
      "Install Docker": "Pasang Docker", "Buat docker-compose.yml": "Gawe docker-compose.yml",
      "dengan Certbot": "nganggo Certbot", "Deploy Selesai!": "Deployment Rampung!",
    },
  },
};

export function translateDiagram(block: string, slug: string, locale: Locale): string {
  if (!block.startsWith("```mermaid")) return block;
  const words = labels[slug]?.[locale];
  if (!words) return block;
  return Object.entries(words)
    .sort(([a], [b]) => b.length - a.length)
    .reduce((diagram, [original, translated]) => diagram.replaceAll(original, translated), block);
}
