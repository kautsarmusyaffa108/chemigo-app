export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: string;
  group: number | null;
  period: number;
  electronConfig?: string;
  funFact?: string;
}

export interface Question {
  id: string;
  lessonId: string;
  type: "multiple_choice" | "symbol_guess" | "name_guess" | "fill_blank" | "match_pairs";
  question: string;
  hint?: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  element?: Element | null;
  difficulty: "easy" | "medium" | "hard";
  xpReward: number;
}

export const elements: Element[] = [
  { atomicNumber: 1, symbol: "H", name: "Hidrogen", atomicMass: 1.008, category: "nonlogam", group: 1, period: 1, electronConfig: "1s¹", funFact: "Unsur paling melimpah di alam semesta!" },
  { atomicNumber: 2, symbol: "He", name: "Helium", atomicMass: 4.003, category: "gas mulia", group: 18, period: 1, electronConfig: "1s²", funFact: "Gas pertama yang ditemukan di Matahari sebelum di Bumi." },
  { atomicNumber: 3, symbol: "Li", name: "Litium", atomicMass: 6.941, category: "logam alkali", group: 1, period: 2, electronConfig: "[He] 2s¹", funFact: "Digunakan dalam baterai smartphone!" },
  { atomicNumber: 4, symbol: "Be", name: "Berilium", atomicMass: 9.012, category: "logam alkali tanah", group: 2, period: 2, electronConfig: "[He] 2s²", funFact: "Logam ringan yang digunakan dalam pesawat luar angkasa." },
  { atomicNumber: 5, symbol: "B", name: "Boron", atomicMass: 10.811, category: "metaloid", group: 13, period: 2, electronConfig: "[He] 2s² 2p¹", funFact: "Digunakan dalam pembuatan kaca Pyrex." },
  { atomicNumber: 6, symbol: "C", name: "Karbon", atomicMass: 12.011, category: "nonlogam", group: 14, period: 2, electronConfig: "[He] 2s² 2p²", funFact: "Dasar dari semua kehidupan organik di Bumi!" },
  { atomicNumber: 7, symbol: "N", name: "Nitrogen", atomicMass: 14.007, category: "nonlogam", group: 15, period: 2, electronConfig: "[He] 2s² 2p³", funFact: "78% atmosfer Bumi terdiri dari Nitrogen." },
  { atomicNumber: 8, symbol: "O", name: "Oksigen", atomicMass: 15.999, category: "nonlogam", group: 16, period: 2, electronConfig: "[He] 2s² 2p⁴", funFact: "Kita menghirup oksigen setiap saat untuk bertahan hidup!" },
  { atomicNumber: 9, symbol: "F", name: "Fluorin", atomicMass: 18.998, category: "halogen", group: 17, period: 2, electronConfig: "[He] 2s² 2p⁵", funFact: "Unsur paling elektronegatif di tabel periodik!" },
  { atomicNumber: 10, symbol: "Ne", name: "Neon", atomicMass: 20.180, category: "gas mulia", group: 18, period: 2, electronConfig: "[He] 2s² 2p⁶", funFact: "Gas yang membuat lampu neon bersinar merah-oranye." },
  { atomicNumber: 11, symbol: "Na", name: "Natrium", atomicMass: 22.990, category: "logam alkali", group: 1, period: 3, electronConfig: "[Ne] 3s¹", funFact: "Komponen utama garam dapur (NaCl)!" },
  { atomicNumber: 12, symbol: "Mg", name: "Magnesium", atomicMass: 24.305, category: "logam alkali tanah", group: 2, period: 3, electronConfig: "[Ne] 3s²", funFact: "Penting untuk pertumbuhan tanaman - ada dalam klorofil!" },
  { atomicNumber: 13, symbol: "Al", name: "Aluminium", atomicMass: 26.982, category: "logam pasca transisi", group: 13, period: 3, electronConfig: "[Ne] 3s² 3p¹", funFact: "Logam paling melimpah di kerak Bumi." },
  { atomicNumber: 14, symbol: "Si", name: "Silikon", atomicMass: 28.086, category: "metaloid", group: 14, period: 3, electronConfig: "[Ne] 3s² 3p²", funFact: "Bahan dasar chip komputer dan panel surya!" },
  { atomicNumber: 15, symbol: "P", name: "Fosfor", atomicMass: 30.974, category: "nonlogam", group: 15, period: 3, electronConfig: "[Ne] 3s² 3p³", funFact: "Ditemukan dalam DNA dan tulang kita." },
  { atomicNumber: 16, symbol: "S", name: "Sulfur", atomicMass: 32.065, category: "nonlogam", group: 16, period: 3, electronConfig: "[Ne] 3s² 3p⁴", funFact: "Bau telur busuk berasal dari senyawa sulfur!" },
  { atomicNumber: 17, symbol: "Cl", name: "Klorin", atomicMass: 35.453, category: "halogen", group: 17, period: 3, electronConfig: "[Ne] 3s² 3p⁵", funFact: "Digunakan untuk mensterilkan air minum." },
  { atomicNumber: 18, symbol: "Ar", name: "Argon", atomicMass: 39.948, category: "gas mulia", group: 18, period: 3, electronConfig: "[Ne] 3s² 3p⁶", funFact: "Gas yang mengisi bola lampu pijar untuk mencegah oksidasi." },
  { atomicNumber: 19, symbol: "K", name: "Kalium", atomicMass: 39.098, category: "logam alkali", group: 1, period: 4, electronConfig: "[Ar] 4s¹", funFact: "Penting untuk fungsi saraf dan otot kita!" },
  { atomicNumber: 20, symbol: "Ca", name: "Kalsium", atomicMass: 40.078, category: "logam alkali tanah", group: 2, period: 4, electronConfig: "[Ar] 4s²", funFact: "Mineral utama pembentuk tulang dan gigi!" },
  { atomicNumber: 26, symbol: "Fe", name: "Besi", atomicMass: 55.845, category: "logam transisi", group: 8, period: 4, electronConfig: "[Ar] 3d⁶ 4s²", funFact: "Unsur paling melimpah di inti Bumi!" },
  { atomicNumber: 29, symbol: "Cu", name: "Tembaga", atomicMass: 63.546, category: "logam transisi", group: 11, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s¹", funFact: "Logam pertama yang digunakan manusia - 10.000 tahun lalu!" },
  { atomicNumber: 30, symbol: "Zn", name: "Seng", atomicMass: 65.38, category: "logam transisi", group: 12, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s²", funFact: "Penting untuk sistem imun tubuh kita." },
  { atomicNumber: 35, symbol: "Br", name: "Bromin", atomicMass: 79.904, category: "halogen", group: 17, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁵", funFact: "Satu dari hanya dua unsur yang cair pada suhu ruang!" },
  { atomicNumber: 36, symbol: "Kr", name: "Kripton", atomicMass: 83.798, category: "gas mulia", group: 18, period: 4, electronConfig: "[Ar] 3d¹⁰ 4s² 4p⁶", funFact: "Superman lemah terhadap Kryptonite, yang terinspirasi dari unsur ini!" },
  { atomicNumber: 47, symbol: "Ag", name: "Perak", atomicMass: 107.868, category: "logam transisi", group: 11, period: 5, electronConfig: "[Kr] 4d¹⁰ 5s¹", funFact: "Konduktor listrik terbaik dari semua unsur!" },
  { atomicNumber: 79, symbol: "Au", name: "Emas", atomicMass: 196.967, category: "logam transisi", group: 11, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", funFact: "Logam yang tidak berkarat atau teroksidasi." },
  { atomicNumber: 80, symbol: "Hg", name: "Merkuri", atomicMass: 200.592, category: "logam transisi", group: 12, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", funFact: "Satu-satunya logam yang cair pada suhu ruang!" },
  { atomicNumber: 82, symbol: "Pb", name: "Timbal", atomicMass: 207.2, category: "logam pasca transisi", group: 14, period: 6, electronConfig: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", funFact: "Digunakan oleh Romawi kuno untuk pipa air." },
  { atomicNumber: 53, symbol: "I", name: "Iodin", atomicMass: 126.904, category: "halogen", group: 17, period: 5, electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁵", funFact: "Penting untuk fungsi tiroid kita." },
  { atomicNumber: 54, symbol: "Xe", name: "Xenon", atomicMass: 131.293, category: "gas mulia", group: 18, period: 5, electronConfig: "[Kr] 4d¹⁰ 5s² 5p⁶", funFact: "Digunakan dalam lampu mobil xenon yang terang." },
];

const lessons: Record<string, Question[]> = {
  "lesson-1": [
    {
      id: "l1-q1", lessonId: "lesson-1", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Hidrogen?",
      options: ["H", "He", "Ho", "Hy"],
      correctAnswer: "H",
      explanation: "Hidrogen memiliki simbol 'H' dari bahasa Latin 'Hydrogenium'. Ini adalah unsur pertama dalam tabel periodik!",
      element: elements[0],
    },
    {
      id: "l1-q2", lessonId: "lesson-1", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Berapa nomor atom Hidrogen?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "1",
      explanation: "Hidrogen memiliki 1 proton dalam intinya, sehingga nomor atomnya adalah 1. Ini membuatnya unsur paling sederhana!",
      element: elements[0],
    },
    {
      id: "l1-q3", lessonId: "lesson-1", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Hidrogen terletak di golongan berapa dalam tabel periodik?",
      options: ["Golongan 1", "Golongan 2", "Golongan 17", "Golongan 18"],
      correctAnswer: "Golongan 1",
      explanation: "Hidrogen berada di Golongan 1 (IA), bersama logam alkali, meskipun Hidrogen sendiri bukan logam.",
      element: elements[0],
    },
    {
      id: "l1-q4", lessonId: "lesson-1", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Litium?",
      options: ["L", "Li", "Lt", "Lm"],
      correctAnswer: "Li",
      explanation: "Litium memiliki simbol 'Li' dari bahasa Latin 'Lithium'. Digunakan dalam baterai smartphone modern!",
      element: elements[2],
    },
    {
      id: "l1-q5", lessonId: "lesson-1", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Unsur mana yang memiliki nomor atom 11?",
      options: ["Magnesium", "Natrium", "Kalium", "Aluminium"],
      correctAnswer: "Natrium",
      explanation: "Natrium (Na) memiliki nomor atom 11. Komponen utama garam dapur yang kita gunakan sehari-hari!",
      element: elements[10],
    },
    {
      id: "l1-q6", lessonId: "lesson-1", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Apa yang membuat logam alkali istimewa?",
      options: ["Sangat keras dan padat", "Sangat reaktif, bereaksi dengan air", "Tidak dapat bereaksi dengan unsur lain", "Selalu berbentuk gas"],
      correctAnswer: "Sangat reaktif, bereaksi dengan air",
      explanation: "Logam alkali (Golongan 1) sangat reaktif karena memiliki 1 elektron valensi yang mudah dilepaskan. Mereka bereaksi hebat dengan air!",
    },
    {
      id: "l1-q7", lessonId: "lesson-1", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Simbol kimia Natrium adalah 'Na'. Dari bahasa apa simbol ini berasal?",
      options: ["Inggris", "Jerman", "Latin", "Yunani"],
      correctAnswer: "Latin",
      explanation: "Simbol 'Na' berasal dari kata Latin 'Natrium'. Banyak simbol unsur berasal dari nama Latin atau Yunani kuno.",
      element: elements[10],
    },
    {
      id: "l1-q8", lessonId: "lesson-1", type: "multiple_choice", difficulty: "hard", xpReward: 20,
      question: "Konfigurasi elektron Kalium (K) adalah...",
      options: ["[Ar] 4s¹", "[Ne] 3s¹", "[Ar] 3d¹ 4s¹", "[Kr] 5s¹"],
      correctAnswer: "[Ar] 4s¹",
      explanation: "Kalium (K, nomor atom 19) memiliki konfigurasi elektron [Ar] 4s¹, artinya elektron terakhirnya berada di orbital 4s.",
      element: elements[18],
    },
  ],
  "lesson-2": [
    {
      id: "l2-q1", lessonId: "lesson-2", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Unsur mana yang termasuk logam alkali tanah?",
      options: ["Natrium (Na)", "Kalsium (Ca)", "Argon (Ar)", "Klorin (Cl)"],
      correctAnswer: "Kalsium (Ca)",
      explanation: "Kalsium (Ca) adalah logam alkali tanah (Golongan 2). Mineral penting untuk tulang dan gigi yang kuat!",
      element: elements[19],
    },
    {
      id: "l2-q2", lessonId: "lesson-2", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Kalsium?",
      options: ["K", "Ca", "C", "Cm"],
      correctAnswer: "Ca",
      explanation: "Simbol Kalsium adalah 'Ca' dari kata Latin 'Calcium'. Mineral paling banyak dalam tubuh manusia!",
      element: elements[19],
    },
    {
      id: "l2-q3", lessonId: "lesson-2", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Magnesium?",
      options: ["Ma", "Mn", "Mg", "Mc"],
      correctAnswer: "Mg",
      explanation: "Magnesium memiliki simbol 'Mg'. Unsur yang ada di klorofil dan membuat tanaman bisa berfotosintesis!",
      element: elements[11],
    },
    {
      id: "l2-q4", lessonId: "lesson-2", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Logam alkali tanah berada di golongan berapa?",
      options: ["Golongan 1", "Golongan 2", "Golongan 17", "Golongan 18"],
      correctAnswer: "Golongan 2",
      explanation: "Logam alkali tanah berada di Golongan 2 (IIA). Mereka memiliki 2 elektron valensi dan lebih sedikit reaktif dibanding logam alkali.",
    },
    {
      id: "l2-q5", lessonId: "lesson-2", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Berapa nomor atom Berilium (Be)?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "4",
      explanation: "Berilium (Be) memiliki nomor atom 4. Logam ringan yang digunakan dalam industri kedirgantaraan!",
      element: elements[3],
    },
    {
      id: "l2-q6", lessonId: "lesson-2", type: "multiple_choice", difficulty: "hard", xpReward: 20,
      question: "Manakah sifat umum logam alkali tanah?",
      options: ["Memiliki 1 elektron valensi", "Memiliki 2 elektron valensi", "Tidak bereaksi dengan air", "Selalu berwujud gas"],
      correctAnswer: "Memiliki 2 elektron valensi",
      explanation: "Logam alkali tanah memiliki 2 elektron valensi dalam orbital s. Ini menyebabkan mereka cenderung membentuk ion 2+.",
    },
  ],
  "lesson-3": [
    {
      id: "l3-q1", lessonId: "lesson-3", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Gas mulia berada di golongan berapa?",
      options: ["Golongan 1", "Golongan 2", "Golongan 17", "Golongan 18"],
      correctAnswer: "Golongan 18",
      explanation: "Gas mulia berada di Golongan 18 (VIIIA) - kolom paling kanan tabel periodik. Mereka sangat stabil dan jarang bereaksi!",
    },
    {
      id: "l3-q2", lessonId: "lesson-3", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Helium?",
      options: ["H", "He", "Hm", "Hl"],
      correctAnswer: "He",
      explanation: "Helium memiliki simbol 'He'. Gas paling ringan setelah Hidrogen, digunakan untuk mengisi balon!",
      element: elements[1],
    },
    {
      id: "l3-q3", lessonId: "lesson-3", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Gas mulia mana yang digunakan dalam lampu neon?",
      options: ["Helium", "Neon", "Argon", "Kripton"],
      correctAnswer: "Neon",
      explanation: "Neon (Ne) menghasilkan cahaya merah-oranye yang khas ketika dialiri listrik. Makanya disebut 'lampu neon'!",
      element: elements[9],
    },
    {
      id: "l3-q4", lessonId: "lesson-3", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Mengapa gas mulia sangat stabil dan jarang bereaksi?",
      options: ["Karena memiliki 1 elektron valensi", "Karena memiliki konfigurasi elektron yang penuh/oktet", "Karena sangat berat", "Karena berwujud gas"],
      correctAnswer: "Karena memiliki konfigurasi elektron yang penuh/oktet",
      explanation: "Gas mulia memiliki konfigurasi elektron yang penuh (oktet, kecuali He yang duplet). Ini membuat mereka sangat stabil dan tidak perlu berikatan dengan atom lain.",
    },
    {
      id: "l3-q5", lessonId: "lesson-3", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Apa simbol kimia untuk Argon?",
      options: ["A", "Ag", "Ar", "An"],
      correctAnswer: "Ar",
      explanation: "Argon memiliki simbol 'Ar'. Gas ini mengisi sekitar 1% atmosfer Bumi dan digunakan dalam bola lampu untuk mencegah oksidasi!",
      element: elements[17],
    },
    {
      id: "l3-q6", lessonId: "lesson-3", type: "multiple_choice", difficulty: "hard", xpReward: 20,
      question: "Gas mulia mana yang pertama kali ditemukan di Matahari?",
      options: ["Neon", "Argon", "Helium", "Kripton"],
      correctAnswer: "Helium",
      explanation: "Helium pertama kali terdeteksi di Matahari pada tahun 1868 melalui spektroskopi, sebelum akhirnya ditemukan di Bumi pada 1895!",
      element: elements[1],
    },
  ],
  "lesson-4": [
    {
      id: "l4-q1", lessonId: "lesson-4", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Halogen berada di golongan berapa?",
      options: ["Golongan 15", "Golongan 16", "Golongan 17", "Golongan 18"],
      correctAnswer: "Golongan 17",
      explanation: "Halogen berada di Golongan 17 (VIIA). Mereka memiliki 7 elektron valensi dan sangat reaktif!",
    },
    {
      id: "l4-q2", lessonId: "lesson-4", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Fluorin?",
      options: ["F", "Fl", "Fr", "Fe"],
      correctAnswer: "F",
      explanation: "Fluorin memiliki simbol 'F'. Ini adalah unsur paling elektronegatif - paling kuat menarik elektron dari semua unsur!",
      element: elements[8],
    },
    {
      id: "l4-q3", lessonId: "lesson-4", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Klorin?",
      options: ["C", "Cl", "Ch", "Cn"],
      correctAnswer: "Cl",
      explanation: "Klorin memiliki simbol 'Cl'. Digunakan untuk mensterilkan air minum dan kolam renang!",
      element: elements[16],
    },
    {
      id: "l4-q4", lessonId: "lesson-4", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Halogen mana yang merupakan cairan berwarna coklat kemerahan pada suhu ruang?",
      options: ["Fluorin", "Klorin", "Bromin", "Iodin"],
      correctAnswer: "Bromin",
      explanation: "Bromin (Br) adalah satu dari hanya dua unsur yang berwujud cair pada suhu ruang (satunya lagi adalah Merkuri)!",
      element: elements[23],
    },
    {
      id: "l4-q5", lessonId: "lesson-4", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Halogen mana yang penting untuk fungsi kelenjar tiroid?",
      options: ["Fluorin", "Klorin", "Bromin", "Iodin"],
      correctAnswer: "Iodin",
      explanation: "Iodin (I) diperlukan oleh kelenjar tiroid untuk memproduksi hormon tiroid. Kekurangan iodin bisa menyebabkan gondok!",
      element: elements[29],
    },
  ],
  "lesson-5": [
    {
      id: "l5-q1", lessonId: "lesson-5", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Besi?",
      options: ["B", "Bs", "Fe", "Fr"],
      correctAnswer: "Fe",
      explanation: "Besi memiliki simbol 'Fe' dari kata Latin 'Ferrum'. Unsur paling melimpah di inti Bumi!",
      element: elements[20],
    },
    {
      id: "l5-q2", lessonId: "lesson-5", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Tembaga?",
      options: ["T", "Tb", "Co", "Cu"],
      correctAnswer: "Cu",
      explanation: "Tembaga memiliki simbol 'Cu' dari kata Latin 'Cuprum'. Salah satu logam pertama yang digunakan manusia!",
      element: elements[21],
    },
    {
      id: "l5-q3", lessonId: "lesson-5", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Emas?",
      options: ["E", "Em", "Go", "Au"],
      correctAnswer: "Au",
      explanation: "Emas memiliki simbol 'Au' dari kata Latin 'Aurum'. Logam mulia yang tidak berkarat atau teroksidasi!",
      element: elements[26],
    },
    {
      id: "l5-q4", lessonId: "lesson-5", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Logam mana yang CAIR pada suhu ruang?",
      options: ["Besi (Fe)", "Tembaga (Cu)", "Merkuri (Hg)", "Perak (Ag)"],
      correctAnswer: "Merkuri (Hg)",
      explanation: "Merkuri (Hg) adalah satu-satunya logam yang berwujud cair pada suhu ruang. Simbol Hg berasal dari 'Hydrargyrum' (air perak)!",
      element: elements[27],
    },
    {
      id: "l5-q5", lessonId: "lesson-5", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Apa simbol kimia untuk Perak?",
      options: ["P", "Pr", "Ag", "Si"],
      correctAnswer: "Ag",
      explanation: "Perak memiliki simbol 'Ag' dari kata Latin 'Argentum'. Konduktor listrik terbaik dari semua unsur!",
      element: elements[25],
    },
    {
      id: "l5-q6", lessonId: "lesson-5", type: "multiple_choice", difficulty: "hard", xpReward: 20,
      question: "Logam transisi berada di blok mana dalam tabel periodik?",
      options: ["Blok s", "Blok p", "Blok d", "Blok f"],
      correctAnswer: "Blok d",
      explanation: "Logam transisi berada di blok d, yaitu Golongan 3-12. Mereka memiliki orbital d yang terisi sebagian.",
    },
  ],
  "lesson-6": [
    {
      id: "l6-q1", lessonId: "lesson-6", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Oksigen?",
      options: ["O", "Ok", "Ox", "Om"],
      correctAnswer: "O",
      explanation: "Oksigen memiliki simbol 'O'. Kita membutuhkan oksigen untuk bernapas dan bertahan hidup!",
      element: elements[7],
    },
    {
      id: "l6-q2", lessonId: "lesson-6", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Gas apa yang paling banyak dalam atmosfer Bumi?",
      options: ["Oksigen", "Karbon Dioksida", "Nitrogen", "Argon"],
      correctAnswer: "Nitrogen",
      explanation: "Nitrogen (N₂) membentuk sekitar 78% atmosfer Bumi. Oksigen hanya sekitar 21%!",
      element: elements[6],
    },
    {
      id: "l6-q3", lessonId: "lesson-6", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Apa simbol kimia untuk Karbon?",
      options: ["Ca", "C", "Cb", "Cr"],
      correctAnswer: "C",
      explanation: "Karbon memiliki simbol 'C'. Unsur dasar semua kehidupan organik! Intan dan grafit keduanya terbuat dari karbon murni.",
      element: elements[5],
    },
    {
      id: "l6-q4", lessonId: "lesson-6", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Nonlogam mana yang berbau seperti telur busuk?",
      options: ["Oksigen", "Nitrogen", "Sulfur", "Karbon"],
      correctAnswer: "Sulfur",
      explanation: "Senyawa sulfur (seperti H₂S) memiliki bau yang sangat menyengat seperti telur busuk. Sulfur sendiri tidak berbau.",
      element: elements[15],
    },
  ],
  "lesson-7": [
    {
      id: "l7-q1", lessonId: "lesson-7", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa itu metaloid?",
      options: ["Logam cair", "Unsur dengan sifat antara logam dan nonlogam", "Gas mulia", "Logam berat"],
      correctAnswer: "Unsur dengan sifat antara logam dan nonlogam",
      explanation: "Metaloid (atau semi-logam) memiliki sifat di antara logam dan nonlogam. Mereka sering digunakan sebagai semikonduktor!",
    },
    {
      id: "l7-q2", lessonId: "lesson-7", type: "multiple_choice", difficulty: "easy", xpReward: 10,
      question: "Apa simbol kimia untuk Silikon?",
      options: ["S", "Si", "Sl", "Sc"],
      correctAnswer: "Si",
      explanation: "Silikon memiliki simbol 'Si'. Bahan dasar chip komputer dan panel surya - tulang punggung era digital!",
      element: elements[13],
    },
    {
      id: "l7-q3", lessonId: "lesson-7", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Metaloid mana yang merupakan bahan utama chip komputer?",
      options: ["Boron", "Silikon", "Germanium", "Arsen"],
      correctAnswer: "Silikon",
      explanation: "Silikon (Si) adalah semikonduktor yang menjadi bahan dasar chip (IC) di hampir semua perangkat elektronik. Makanya ada 'Silicon Valley'!",
      element: elements[13],
    },
    {
      id: "l7-q4", lessonId: "lesson-7", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Apa simbol kimia untuk Boron?",
      options: ["Bo", "Br", "B", "Bn"],
      correctAnswer: "B",
      explanation: "Boron memiliki simbol 'B'. Digunakan dalam pembuatan kaca tahan panas (Pyrex) dan juga dalam reaktor nuklir!",
      element: elements[4],
    },
  ],
  "lesson-8": [
    {
      id: "l8-q1", lessonId: "lesson-8", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Berapa jumlah total unsur dalam tabel periodik modern?",
      options: ["92", "100", "118", "120"],
      correctAnswer: "118",
      explanation: "Tabel periodik modern memiliki 118 unsur yang telah diakui secara resmi. Unsur terakhir (118, Oganesson) dikonfirmasi pada 2002.",
    },
    {
      id: "l8-q2", lessonId: "lesson-8", type: "multiple_choice", difficulty: "medium", xpReward: 15,
      question: "Siapa yang pertama kali menyusun tabel periodik?",
      options: ["Albert Einstein", "Marie Curie", "Dmitri Mendeleev", "Isaac Newton"],
      correctAnswer: "Dmitri Mendeleev",
      explanation: "Dmitri Mendeleev, ilmuwan Rusia, menyusun tabel periodik pertama pada tahun 1869. Ia bahkan meramalkan unsur-unsur yang belum ditemukan saat itu!",
    },
    {
      id: "l8-q3", lessonId: "lesson-8", type: "multiple_choice", difficulty: "hard", xpReward: 20,
      question: "Apa yang dimaksud dengan 'periode' dalam tabel periodik?",
      options: ["Kolom vertikal", "Baris horizontal", "Kelompok unsur sejenis", "Golongan unsur"],
      correctAnswer: "Baris horizontal",
      explanation: "Periode adalah baris horizontal dalam tabel periodik. Unsur dalam satu periode memiliki jumlah kulit elektron yang sama.",
    },
    {
      id: "l8-q4", lessonId: "lesson-8", type: "multiple_choice", difficulty: "hard", xpReward: 20,
      question: "Unsur dengan nomor atom tertinggi yang terjadi secara alami adalah...",
      options: ["Uranium (92)", "Plutonium (94)", "Radium (88)", "Thorium (90)"],
      correctAnswer: "Uranium (92)",
      explanation: "Uranium (U, nomor atom 92) adalah unsur alam dengan nomor atom tertinggi. Unsur dengan nomor atom lebih tinggi dibuat secara sintetis di laboratorium.",
    },
    {
      id: "l8-q5", lessonId: "lesson-8", type: "multiple_choice", difficulty: "hard", xpReward: 20,
      question: "Unsur apa yang paling melimpah di kerak Bumi?",
      options: ["Silikon", "Aluminium", "Oksigen", "Besi"],
      correctAnswer: "Oksigen",
      explanation: "Oksigen adalah unsur paling melimpah di kerak Bumi, membentuk sekitar 46% massanya. Silikon adalah kedua (~28%).",
    },
  ],
};

export function getQuestionsForLesson(lessonId: string, difficulty?: string): Question[] {
  const lessonQuestions = lessons[lessonId] || [];
  if (difficulty) {
    return lessonQuestions.filter(q => q.difficulty === difficulty);
  }
  return lessonQuestions;
}

export const allElements = elements;
