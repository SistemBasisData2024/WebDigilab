CREATE TABLE "matkul" (
  "matkul_id" integer PRIMARY KEY,
  "matkul_name" text,
  "matkul_desc" text
);

CREATE TABLE "course" (
  "course_id" integer PRIMARY KEY,
  "matkul_id" integer,
  "course_name" text,
  "course_desc" text,
  "course_image" text,
  "course_start" timestamp,
  "course_end" timestamp
);

CREATE TABLE "chapter" (
  "chapter_id" integer PRIMARY KEY,
  "course_id" integer,
  "teacher_id" integer,
  "chapter_no" integer,
  "chapter_title" text,
  "chapter_desc" text,
  "chapter_image" text
);

CREATE TABLE "quiz" (
  "quiz_id" integer PRIMARY KEY,
  "chapter_id" integer,
  "quiz_title" text,
  "quiz_desc" text,
  "quiz_image" text,
  "quiz_start" timestamp,
  "quiz_end" timestamp
);

CREATE TABLE "question" (
  "question_id" integer PRIMARY KEY,
  "quiz_id" integer,
  "question_no" integer,
  "question_text" integer,
  "question_image" text,
  "question_answer" text
);

CREATE TABLE "aslab" (
  "aslab_id" integer PRIMARY KEY,
  "aslab_name" text,
  "aslab_npm" text,
  "aslab_profile_picture" text,
  "aslab_bio" text,
  "aslab_email" text,
  "aslab_password" text
);

CREATE TABLE "praktikan" (
  "praktikan_id" integer PRIMARY KEY,
  "praktikan_name" text,
  "praktikan_npm" text,
  "praktikan_profile_picture" text,
  "praktikan_bio" text,
  "praktikan_email" text,
  "praktikan_password" text
);

CREATE TABLE "teacher" (
  "teacher_id" integer PRIMARY KEY,
  "course_id" integer,
  "aslab_id" integer
);

CREATE TABLE "student" (
  "student_id" integer PRIMARY KEY,
  "course_id" integer,
  "praktikan_id" integer
);

CREATE TABLE "score" (
  "score_id" integer PRIMARY KEY,
  "quiz_id" integer,
  "student_id" integer,
  "score_result" integer
);

ALTER TABLE "chapter" ADD FOREIGN KEY ("course_id") REFERENCES "course" ("course_id");

ALTER TABLE "student" ADD FOREIGN KEY ("course_id") REFERENCES "course" ("course_id");

ALTER TABLE "teacher" ADD FOREIGN KEY ("course_id") REFERENCES "course" ("course_id");

ALTER TABLE "course" ADD FOREIGN KEY ("matkul_id") REFERENCES "matkul" ("matkul_id");

ALTER TABLE "quiz" ADD FOREIGN KEY ("chapter_id") REFERENCES "chapter" ("chapter_id");

ALTER TABLE "question" ADD FOREIGN KEY ("quiz_id") REFERENCES "quiz" ("quiz_id");

ALTER TABLE "score" ADD FOREIGN KEY ("quiz_id") REFERENCES "quiz" ("quiz_id");

ALTER TABLE "teacher" ADD FOREIGN KEY ("aslab_id") REFERENCES "aslab" ("aslab_id");

ALTER TABLE "student" ADD FOREIGN KEY ("praktikan_id") REFERENCES "praktikan" ("praktikan_id");

ALTER TABLE "chapter" ADD FOREIGN KEY ("teacher_id") REFERENCES "teacher" ("teacher_id");

ALTER TABLE "score" ADD FOREIGN KEY ("student_id") REFERENCES "student" ("student_id");
