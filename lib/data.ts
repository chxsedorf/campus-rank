export type Review = {
  id: number;
  author: string;
  date: string;
  text: string;
};

export type Course = {
  id: number;
  name: string;
  teacher: string;
  faculty: string;
  year: string;
  semester: string;
  period: string;
  credits: number;
  summary: string;
  officialNote: string;
  syllabusUrl: string;
  rating: number;
  recommend: number;
  clarity: number;
  easiness: number;
  assignments: number;
  difficulty: number;
  attendance: number;
  tags: string[];
  reviews: Review[];
};

export const courses: Course[] = [];