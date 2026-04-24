export type CourseRow = {
  id: number;
  name: string;
  teacher: string;
  faculty: string;
  year_label: string;
  semester: string;
  period: string;
  credits: number;
  summary: string;
  official_note: string;
  syllabus_url: string;
  rating: number;
  recommend: number;
  clarity: number;
  easiness: number;
  assignments: number;
  difficulty: number;
  attendance: number;
  tags: string[];
  created_at: string;
};

export type ReviewRow = {
  id: number;
  course_id: number;
  author: string;
  recommend: number;
  clarity: number;
  assignments: number;
  difficulty: number;
  attendance: number;
  body: string;
  status: "published" | "pending" | "hidden";
  created_at: string;
};