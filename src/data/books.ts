import lion from "@/assets/book-cover-lion.jpg";
import space from "@/assets/book-cover-space.jpg";
import dino from "@/assets/book-cover-dino.jpg";
import ocean from "@/assets/book-cover-ocean.jpg";
import princess from "@/assets/book-cover-princess.jpg";
import robots from "@/assets/book-cover-robots.jpg";

export type BookTag =
  | "Most Favourite"
  | "Frequently Rented"
  | "Most Popular"
  | "Popular"
  | "New"
  | "Staff Favourite"
  | "STEM"
  | "Fantasy"
  | "Adventure"
  | "Animals";

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  available: boolean;
  deposit: number; // refundable
  rentPerWeek: number;
  ageGroup: string;
  tags: BookTag[];
  description: string;
}

export const books: Book[] = [
  {
    id: "lion-001",
    title: "Leo the Brave Lion",
    author: "M. Hart",
    cover: lion,
    available: true,
    deposit: 300,
    rentPerWeek: 40,
    ageGroup: "3–6",
    tags: ["Animals", "Most Favourite"],
    description:
      "A heartwarming tale about courage and kindness in the jungle. Perfect bedtime read with vivid illustrations.",
  },
  {
    id: "space-002",
    title: "Stars Above Our Roof",
    author: "R. Mehta",
    cover: space,
    available: false,
    deposit: 300,
    rentPerWeek: 50,
    ageGroup: "6–9",
    tags: ["STEM", "Popular", "Adventure"],
    description:
      "Journey through the galaxy with two friends learning constellations, rockets and the wonder of space.",
  },
  {
    id: "dino-003",
    title: "Dino Day Out",
    author: "K. Sinha",
    cover: dino,
    available: true,
    deposit: 250,
    rentPerWeek: 40,
    ageGroup: "4–7",
    tags: ["Adventure", "Staff Favourite"],
    description:
      "A playful romp with friendly dinosaurs discovering teamwork and curiosity in a colorful valley.",
  },
  {
    id: "ocean-004",
    title: "Ocean Friends",
    author: "A. Kapoor",
    cover: ocean,
    available: true,
    deposit: 250,
    rentPerWeek: 40,
    ageGroup: "3–6",
    tags: ["Animals", "Popular"],
    description:
      "Meet dolphins, turtles and tiny seahorses while learning about caring for our blue planet.",
  },
  {
    id: "princess-005",
    title: "The Kind Princess",
    author: "S. Rao",
    cover: princess,
    available: false,
    deposit: 300,
    rentPerWeek: 50,
    ageGroup: "5–8",
    tags: ["Fantasy", "Most Favourite"],
    description:
      "Gentle story of empathy and friendship with a dash of magic and sparkling castles.",
  },
  {
    id: "robots-006",
    title: "Robo Workshop",
    author: "T. Iyer",
    cover: robots,
    available: true,
    deposit: 300,
    rentPerWeek: 50,
    ageGroup: "7–10",
    tags: ["STEM", "New"],
    description:
      "Build, tinker and learn simple circuits with two curious kids and their helpful robot buddies.",
  },
];
