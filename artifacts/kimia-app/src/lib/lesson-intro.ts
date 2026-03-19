export interface LessonIntro {
  emoji: string;
  title: string;
  subtitle: string;
  theory: string;
  funFact: string;
  funFactIcon: string;
}

export const lessonIntroMap: Record<string, LessonIntro> = {
  l1: {
    emoji: "⚡",
    title: "Logam Alkali",
    subtitle: "Golongan 1 — Si Reaktif!",
    theory:
      "Golongan 1 berisi: Hidrogen (H), Litium (Li), Natrium (Na), Kalium (K), Rubidium (Rb), Sesium (Cs), dan Fransium (Fr). Semuanya memiliki 1 elektron valensi sehingga sangat mudah kehilangan elektron — itulah mengapa mereka sangat reaktif!",
    funFact:
      "Natrium (Na) yang dilempar ke dalam air akan langsung meledak! 💥 Itulah mengapa logam alkali harus disimpan dalam minyak.",
    funFactIcon: "🔥",
  },
  l2: {
    emoji: "🪨",
    title: "Logam Alkali Tanah",
    subtitle: "Golongan 2 — Si Keras!",
    theory:
      "Golongan 2 berisi: Berilium (Be), Magnesium (Mg), Kalsium (Ca), Stronsium (Sr), Barium (Ba), dan Radium (Ra). Mereka memiliki 2 elektron valensi dan lebih stabil dari logam alkali.",
    funFact:
      "Kalsium (Ca) adalah mineral utama pembentuk tulang dan gigimu! 🦷 Tanpa kalsium, tubuhmu tidak bisa berdiri tegak.",
    funFactIcon: "🦴",
  },
  l3: {
    emoji: "✨",
    title: "Gas Mulia",
    subtitle: "Golongan 18 — Si Pendiam!",
    theory:
      "Golongan 18 berisi: Helium (He), Neon (Ne), Argon (Ar), Kripton (Kr), Xenon (Xe), dan Radon (Rn). Mereka memiliki konfigurasi elektron penuh (oktet) sehingga hampir tidak pernah bereaksi dengan unsur lain.",
    funFact:
      "Neon (Ne) yang ada dalam lampu neon tidak pernah 'terbakar' — ia hanya berpendar saat dilewati listrik! 💡",
    funFactIcon: "🌈",
  },
  l4: {
    emoji: "🧪",
    title: "Halogen",
    subtitle: "Golongan 17 — Si Lapar Elektron!",
    theory:
      "Golongan 17 berisi: Fluorin (F), Klorin (Cl), Bromin (Br), Iodin (I), dan Astatin (At). Mereka memiliki 7 elektron valensi dan sangat ingin mendapatkan 1 elektron lagi untuk mencapai konfigurasi stabil.",
    funFact:
      "Fluorin (F) adalah unsur PALING elektronegatif di seluruh tabel periodik! ⚡ Ia bisa bereaksi bahkan dengan gas mulia seperti Xenon.",
    funFactIcon: "💪",
  },
  l5: {
    emoji: "⚙️",
    title: "Logam Transisi",
    subtitle: "Blok-d — Si Serba Bisa!",
    theory:
      "Logam transisi mengisi blok-d di tabel periodik (Golongan 3–12). Mereka dikenal karena memiliki banyak bilangan oksidasi, bisa membentuk senyawa berwarna, dan sering digunakan sebagai katalis dalam industri.",
    funFact:
      "Besi (Fe) adalah unsur paling melimpah di inti Bumi! 🌍 Dan Emas (Au) tidak berkarat karena sangat tidak reaktif.",
    funFactIcon: "🔩",
  },
  l6: {
    emoji: "🌿",
    title: "Unsur Nonlogam",
    subtitle: "Sisi Kanan Tabel — Si Penting!",
    theory:
      "Nonlogam mencakup Karbon (C), Nitrogen (N), Oksigen (O), Fosfor (P), Sulfur (S), Selenium (Se), dan Hidrogen (H). Mereka umumnya bersifat isolator listrik, titik leleh rendah, dan sangat penting untuk kehidupan.",
    funFact:
      "Karbon (C) adalah dasar dari SEMUA kehidupan di Bumi! 🌱 DNA, protein, lemak — semuanya mengandung karbon.",
    funFactIcon: "🧬",
  },
  l7: {
    emoji: "🔀",
    title: "Metaloid",
    subtitle: "Garis Tangga — Si Ambigu!",
    theory:
      "Metaloid adalah unsur yang memiliki sifat di antara logam dan nonlogam. Contohnya: Boron (B), Silikon (Si), Germanium (Ge), Arsen (As), Antimon (Sb), Telurium (Te), dan Polonium (Po).",
    funFact:
      "Silikon (Si) adalah bahan utama chip komputer dan smartphone-mu! 📱 Tanpa silikon, tidak ada teknologi digital.",
    funFactIcon: "💻",
  },
  l8: {
    emoji: "🏆",
    title: "Ujian Akhir",
    subtitle: "Semua Unsur — Ujian Ketajaman!",
    theory:
      "Selamat datang di Ujian Akhir! Di sini kamu akan diuji dengan soal-soal dari semua golongan yang telah kamu pelajari. Gunakan semua pengetahuanmu tentang simbol, nomor atom, sifat, dan kegunaan unsur.",
    funFact:
      "Tabel Periodik modern disusun oleh Dmitri Mendeleev pada tahun 1869! 📜 Ia bahkan memprediksi keberadaan unsur-unsur yang belum ditemukan saat itu.",
    funFactIcon: "🧑‍🔬",
  },
};
