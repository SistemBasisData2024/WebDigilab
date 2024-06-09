--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aslab; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.aslab (
    aslab_id uuid DEFAULT gen_random_uuid() NOT NULL,
    aslab_name text,
    aslab_npm text,
    aslab_profile_picture text,
    aslab_bio text,
    aslab_email text,
    aslab_password text
);


ALTER TABLE public.aslab OWNER TO neondb_owner;

--
-- Name: chapter; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.chapter (
    chapter_id bigint NOT NULL,
    course_id integer,
    chapter_no integer,
    chapter_title text,
    chapter_link text
);


ALTER TABLE public.chapter OWNER TO neondb_owner;

--
-- Name: chapter_chapter_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.chapter_chapter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chapter_chapter_id_seq OWNER TO neondb_owner;

--
-- Name: chapter_chapter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.chapter_chapter_id_seq OWNED BY public.chapter.chapter_id;


--
-- Name: course; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.course (
    course_id bigint NOT NULL,
    matkul_id integer,
    course_desc text,
    course_image text,
    course_start timestamp without time zone,
    course_end timestamp without time zone,
    course_name text
);


ALTER TABLE public.course OWNER TO neondb_owner;

--
-- Name: course_course_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.course_course_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.course_course_id_seq OWNER TO neondb_owner;

--
-- Name: course_course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.course_course_id_seq OWNED BY public.course.course_id;


--
-- Name: matkul; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.matkul (
    matkul_id bigint NOT NULL,
    matkul_name text,
    matkul_desc text
);


ALTER TABLE public.matkul OWNER TO neondb_owner;

--
-- Name: matkul_matkul_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.matkul_matkul_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.matkul_matkul_id_seq OWNER TO neondb_owner;

--
-- Name: matkul_matkul_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.matkul_matkul_id_seq OWNED BY public.matkul.matkul_id;


--
-- Name: praktikan; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.praktikan (
    praktikan_id uuid DEFAULT gen_random_uuid() NOT NULL,
    praktikan_name text,
    praktikan_npm text,
    praktikan_profile_picture text,
    praktikan_bio text,
    praktikan_email text,
    praktikan_password text
);


ALTER TABLE public.praktikan OWNER TO neondb_owner;

--
-- Name: question; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.question (
    question_id bigint NOT NULL,
    quiz_id integer,
    question_no integer,
    question_text text,
    question_image text,
    question_answer text
);


ALTER TABLE public.question OWNER TO neondb_owner;

--
-- Name: question_question_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.question_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.question_question_id_seq OWNER TO neondb_owner;

--
-- Name: question_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.question_question_id_seq OWNED BY public.question.question_id;


--
-- Name: quiz; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.quiz (
    quiz_id bigint NOT NULL,
    chapter_id integer,
    quiz_title text,
    quiz_desc text,
    quiz_image text,
    quiz_start timestamp without time zone,
    quiz_end timestamp without time zone
);


ALTER TABLE public.quiz OWNER TO neondb_owner;

--
-- Name: quiz_quiz_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.quiz_quiz_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_quiz_id_seq OWNER TO neondb_owner;

--
-- Name: quiz_quiz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.quiz_quiz_id_seq OWNED BY public.quiz.quiz_id;


--
-- Name: score; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.score (
    score_id bigint NOT NULL,
    quiz_id integer,
    student_id integer,
    score_result double precision
);


ALTER TABLE public.score OWNER TO neondb_owner;

--
-- Name: score_score_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.score_score_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.score_score_id_seq OWNER TO neondb_owner;

--
-- Name: score_score_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.score_score_id_seq OWNED BY public.score.score_id;


--
-- Name: student; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.student (
    student_id bigint NOT NULL,
    course_id integer,
    praktikan_id integer
);


ALTER TABLE public.student OWNER TO neondb_owner;

--
-- Name: student_student_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.student_student_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.student_student_id_seq OWNER TO neondb_owner;

--
-- Name: student_student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.student_student_id_seq OWNED BY public.student.student_id;


--
-- Name: subchapter; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.subchapter (
    subchapter_id bigint NOT NULL,
    chapter_id integer,
    subchapter_no integer,
    subchapter_title text,
    subchapter_desc text,
    subchapter_image text
);


ALTER TABLE public.subchapter OWNER TO neondb_owner;

--
-- Name: subchapter_subchapter_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.subchapter_subchapter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subchapter_subchapter_id_seq OWNER TO neondb_owner;

--
-- Name: subchapter_subchapter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.subchapter_subchapter_id_seq OWNED BY public.subchapter.subchapter_id;


--
-- Name: teacher; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.teacher (
    teacher_id bigint NOT NULL,
    course_id integer,
    aslab_id integer
);


ALTER TABLE public.teacher OWNER TO neondb_owner;

--
-- Name: teacher_teacher_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.teacher_teacher_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.teacher_teacher_id_seq OWNER TO neondb_owner;

--
-- Name: teacher_teacher_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.teacher_teacher_id_seq OWNED BY public.teacher.teacher_id;


--
-- Name: chapter chapter_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.chapter ALTER COLUMN chapter_id SET DEFAULT nextval('public.chapter_chapter_id_seq'::regclass);


--
-- Name: course course_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course ALTER COLUMN course_id SET DEFAULT nextval('public.course_course_id_seq'::regclass);


--
-- Name: matkul matkul_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.matkul ALTER COLUMN matkul_id SET DEFAULT nextval('public.matkul_matkul_id_seq'::regclass);


--
-- Name: question question_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.question ALTER COLUMN question_id SET DEFAULT nextval('public.question_question_id_seq'::regclass);


--
-- Name: quiz quiz_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.quiz ALTER COLUMN quiz_id SET DEFAULT nextval('public.quiz_quiz_id_seq'::regclass);


--
-- Name: score score_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.score ALTER COLUMN score_id SET DEFAULT nextval('public.score_score_id_seq'::regclass);


--
-- Name: student student_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.student ALTER COLUMN student_id SET DEFAULT nextval('public.student_student_id_seq'::regclass);


--
-- Name: subchapter subchapter_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subchapter ALTER COLUMN subchapter_id SET DEFAULT nextval('public.subchapter_subchapter_id_seq'::regclass);


--
-- Name: teacher teacher_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.teacher ALTER COLUMN teacher_id SET DEFAULT nextval('public.teacher_teacher_id_seq'::regclass);


--
-- Data for Name: aslab; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.aslab (aslab_id, aslab_name, aslab_npm, aslab_profile_picture, aslab_bio, aslab_email, aslab_password) FROM stdin;
399e4489-50ce-4602-8752-610e8ba413e5	Evandita	12345	\N	\N	nanana@nanana	$2b$10$b44LRthUneZOAKeTxUdlIuuspWDmPfdXQbRwjCPa61/vzYmAwkgPC
9f85a2d0-4cec-44ea-8d6e-a33332253c37	digi	69	\N	\N	digi@digi	$2b$10$rz2GHtJQMd9HdW3pufCjvu5A5.DREl3uLv2yDMe0dJmrmG3PePY2a
bf01380e-6c15-4850-bfc5-efb6db3eda7b	test	69123	http://res.cloudinary.com/darhro5gs/image/upload/v1717602408/avatar_digilab/test%40testavatar.jpg	anjay	test@test	$2b$10$AvHfA4.JomgbmEOfFt9LIu8.9CeMhHyUvfr90HeF2XjPqRt4yihIe
7ae90456-e713-41c4-a3ed-b9b056d378aa	Daffa	2200002200	\N	\N	daf@gmail.com	$2b$10$KppYr1CzwpHbiLQ0pcm7o.NMyT5/esrKjIUreTB.S5KitdbnC5E/q
4bd73530-76e1-4b75-803f-5c92511c46f1	Admin	123	https://picsum.photos/500	This is testing	admin@gmail.com	$2b$10$x7hjfDOR0dWSWAaozPSmluMWOU2t2wL9mdN6pklCPLLv.ks.I/cu6
9a6ab83e-07bd-41cd-b53f-2df89dfd12ca	test2	6969	\N	\N	test2@test	$2b$10$XsaCHBwR7LzeWRoycjvJ1elsKM7b/FWSWS.UYsKGVZMYySL6z03Fm
\.


--
-- Data for Name: chapter; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.chapter (chapter_id, course_id, chapter_no, chapter_title, chapter_link) FROM stdin;
2	3	3	Algoritma	https://drive.google.com/file/d/1l9ZtJ3io_WVmM6qJsBDhhySYVvdZmeIC/preview
1	3	2	Dasar Bahasa C	https://drive.google.com/file/d/1_DkhuwGoYifeWum3VOHUBXjsuJym3j5U/preview
4	3	5	Do-While, For, Switch-Case	https://drive.google.com/file/d/1_qywWTdxSs2pXpxaEcynVECCs_7H_gI1/preview
3	3	4	If Statement & While Loop	https://drive.google.com/file/d/1fkHOaNZsCmJ3wpyf6JvsR7UHAjIjKDmK/preview
6	3	6	Functions	https://drive.google.com/file/d/1WKxQn6xCpNGGOMT4k_JUKpMfy1bfevtw/preview
7	8	10	Quiz	https://docs.google.com/forms/d/e/1FAIpQLSePWW9rF3GnggMLgMa2QDHp43673ljvZS1EFkiSefqVK2mKtg/viewform?embedded=true
12	3	7	Array	https://drive.google.com/file/d/1Kw5FfOPwaszmei0Ngbw-FKU5YLfOx5Lm/preview
11	3	1	Briefing	https://docs.google.com/presentation/d/e/2PACX-1vQHVblFFvWU7QrYMWHhHrVnMosyG5PxPG_JpikilsLkUUuumX06Z56N_xYHhvvfRQ/embed?start=false&loop=false&delayms=3000
14	3	0	Scoresheet ProgDas-2	https://docs.google.com/spreadsheets/d/e/2PACX-1vTf83F6g2dwRSvmGHZN8cmFq8nMQr8iBKiNiUkn53O5_jX6U5u8J2oFlkv53n663lxgExkK86_vaS5H/pubhtml?widget=true&amp;headers=false
13	3	0	Scoresheet ProgDas-1	https://docs.google.com/spreadsheets/d/e/2PACX-1vSmPxxIy9rR6wv-JB2F0BTWXP9cpetHLEIPhmhRSCCK5UKXK65HHNuXrMJM4d6l_99UYmHY6rvcw8eo/pubhtml?widget=true&amp;headers=false
9	3	99	Emas	https://emas2.ui.ac.id
15	3	100	Web Netlab	https://learn.netlabdte.com/
16	3	12	Code Editor	https://www.programiz.com/c-programming/online-compiler/
\.


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.course (course_id, matkul_id, course_desc, course_image, course_start, course_end, course_name) FROM stdin;
2	1	Praktikum Pemrograman Dasar Angkatan 2022	https://picsum.photos/500	\N	\N	ProgDas 2022/2023
3	1	Praktikum Pemrograman Dasar Angkatan 2023	https://picsum.photos/500	\N	\N	ProgDas 2023/2024
1	1	Praktikum Pemrograman Dasar Angkatan 2021	https://picsum.photos/500	\N	\N	ProgDas 2021/2022
4	2	Praktikum Pemrograman Lanjut Angkatan 2021		\N	\N	ProgLan 2021/2022
7	2	Praktikum Pemrograman Lanjut Angkatan 2022		\N	\N	ProgLan 2022/2023
8	2	Praktikum Pemrograman Lanjut Angkatan 2023		\N	\N	ProgLan 2023/2024
\.


--
-- Data for Name: matkul; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.matkul (matkul_id, matkul_name, matkul_desc) FROM stdin;
2	Pemrograman Lanjut	Materi lebih lanjut Pemrogramanan menggunakan bahasa C
1	Pemrograman Dasar	Konsep Dasar Pemrogramanan menggunakan bahasa C
\.


--
-- Data for Name: praktikan; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.praktikan (praktikan_id, praktikan_name, praktikan_npm, praktikan_profile_picture, praktikan_bio, praktikan_email, praktikan_password) FROM stdin;
704550fc-e080-4e15-b04c-6a7fc743f490	Evandita	12345	\N	\N	nanana@nanana	$2b$10$VJFPgG7DhPE/lNubrPiSjOclwsuqAUC5ck8JzG.N9qHee3iMB04EC
21a39553-a600-434f-9ff2-8823b48307da	EvanditaPraktikan	12	\N	\N	adminPraktikan@gmail.com	$2b$10$xB9gYht2YSla/JSrnvw65eajLSJP/Wusuj8RZhnGpARa6DehIeLEG
a4e7dbff-e6b2-4f59-9ed4-580530b8ca39	digiPraktikan	69	\N	\N	digi@digi	$2b$10$voQF6j1Fy4VLXGiu2iBlaeM/dWLcdt87UwK8GiaVCgiKWBRjwvbpm
fad11247-139f-45f0-be2e-4d68388bf3a4	Patuyyy	1234	\N	null	patuy@gmail.com	$2b$10$s5.OxB7V87WEDCrl/sRNyu.g7wOSwiGeMwUZC2rsPhcm58B6Jsf.q
d91b8023-fd41-444f-bcc6-5541157d5e30	ihsan	111111	\N	null	ihsan@gmail.com	$2b$10$PdH5Hessa0aBUrhB0S2/0uvgQzH3vAb8Xwa.qZ52t8lDJnW3bBRKW
77deebd1-15c5-465e-99e5-d10ef056f9a8	test	4444	\N	\N	test@test	$2b$10$9Fc1YcHC29xKBydLEJNWLewEMdp8aTZcVLnBlOvuhVkzR0JG6ZCVe
c6671078-fb95-4db4-b51b-d87c2a62eda4	Admin	123	\N	This is admin in Normal Account	admin@gmail.com	$2b$10$jJxi5rFvmVh.rEO4VK/bTua9wJK5VHmCEHHsn3ZmbgbRTTmMnVENW
4a920b27-0097-4b6e-b983-c8ffdb85d15c	Sihombing Giovano Geraldo	2206059566	\N	mantap	sihombinggiovano@gmail.com	$2b$10$3kluRbmvfpfu8o/BW78yaOSsIgG/YuHcd0xgQ3lzMAR3zR.p59tNC
7d69af5e-040d-4c14-9a01-f34a4bf6fa8a	Raihan Muhammad Ihsan	2206028232	\N	\N	han.ihsan01@gmail.com	$2b$10$7x7QqFRIlS2N.eTwRQ3Ny.Tnggoz49jbL6d5.QWzLRB5jGQ3ozRa.
855a01a1-1dae-41aa-9d79-cf13ad67af33	Daffa	2206829194	\N	\N	daffa@gmail.com	$2b$10$.6SE5FMHvvTXVUcHQz97nuw/z52XHvC5kZgN.jdz7Yg64YziKrMdy
8425ce03-2b37-455d-969a-6299a2a5055d	raihan	220202	http://res.cloudinary.com/darhro5gs/image/upload/v1717918695/avatar_digilab/raihan%40gmail.comavatar.jpg	null	raihan@gmail.com	$2b$10$cNW/wk3H.8aZ8ckB94h90O//8G0RyM5WUUvQbfYfH0Ad6Nzi/ps2C
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.question (question_id, quiz_id, question_no, question_text, question_image, question_answer) FROM stdin;
3	1	1	bisa nomor 1?	bisa gambar?	bisa bang
4	1	2	bisa nomor 2?	bisa gambar?	bisa bang
40	46	1	wow?	wowww.com	wow
41	47	1	d	d	d
42	47	2	a	a	a
43	48	1	why?	https://i.natgeofe.com/n/32211050-a89e-4b3d-9efc-2dc912b02daf/bears-01_3x2.jpg	yes
44	49	1	Kenapa beruang?	https://i.natgeofe.com/n/32211050-a89e-4b3d-9efc-2dc912b02daf/bears-01_3x2.jpg	beruang
45	49	2	kenapa ngga bebek?		bebek
46	52	1	why	https://static.wikia.nocookie.net/kungfupanda/images/2/2e/Oogway-white.png/revision/latest?cb=20160326153345	yes
47	53	1	kamal?	https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Kamal_haasan.jpg/640px-Kamal_haasan.jpg	kamal
\.


--
-- Data for Name: quiz; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.quiz (quiz_id, chapter_id, quiz_title, quiz_desc, quiz_image, quiz_start, quiz_end) FROM stdin;
1	1	Tes Quiz 1	pengecekan qz1	image1.com	\N	\N
46	1	WOWWW	wow	wow	\N	\N
47	1	apakah	apakah	ur	\N	\N
48	1	Title	description	https://i.natgeofe.com/n/32211050-a89e-4b3d-9efc-2dc912b02daf/bears-01_3x2.jpg	\N	\N
49	1	apa gitu	desc	https://i.natgeofe.com/n/32211050-a89e-4b3d-9efc-2dc912b02daf/bears-01_3x2.jpg	\N	\N
50	11	Quiz Briefing	This is your hell	https://i0.wp.com/hyperallergic-newspack.s3.amazonaws.com/uploads/2021/10/An_angel_leading_a_soul_into_hell._Oil_painting_by_a_followe_Wellcome_V0017388.jpeg?fit=1200%2C853&quality=95&ssl=1	\N	\N
51	11	Quiz Briefing	this is your hell	https://i0.wp.com/hyperallergic-newspack.s3.amazonaws.com/uploads/2021/10/An_angel_leading_a_soul_into_hell._Oil_painting_by_a_followe_Wellcome_V0017388.jpeg?fit=1200%2C853&quality=95&ssl=1	\N	\N
52	11	tes again	desc again	https://i.imgflip.com/7l0gng.jpg	\N	\N
53	11	Yes	ys	https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Kamal_haasan.jpg/640px-Kamal_haasan.jpg	\N	\N
\.


--
-- Data for Name: score; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.score (score_id, quiz_id, student_id, score_result) FROM stdin;
1	53	\N	100
2	53	\N	100
3	49	\N	50
4	49	\N	50
5	49	\N	100
6	49	\N	100
7	49	\N	50
8	49	\N	50
9	53	\N	100
10	53	\N	100
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.student (student_id, course_id, praktikan_id) FROM stdin;
\.


--
-- Data for Name: subchapter; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.subchapter (subchapter_id, chapter_id, subchapter_no, subchapter_title, subchapter_desc, subchapter_image) FROM stdin;
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.teacher (teacher_id, course_id, aslab_id) FROM stdin;
\.


--
-- Name: chapter_chapter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.chapter_chapter_id_seq', 16, true);


--
-- Name: course_course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.course_course_id_seq', 9, true);


--
-- Name: matkul_matkul_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.matkul_matkul_id_seq', 2, true);


--
-- Name: question_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.question_question_id_seq', 47, true);


--
-- Name: quiz_quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.quiz_quiz_id_seq', 53, true);


--
-- Name: score_score_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.score_score_id_seq', 10, true);


--
-- Name: student_student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.student_student_id_seq', 1, false);


--
-- Name: subchapter_subchapter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.subchapter_subchapter_id_seq', 1, false);


--
-- Name: teacher_teacher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.teacher_teacher_id_seq', 1, false);


--
-- Name: aslab aslab_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.aslab
    ADD CONSTRAINT aslab_pkey PRIMARY KEY (aslab_id);


--
-- Name: chapter chapter_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.chapter
    ADD CONSTRAINT chapter_pkey PRIMARY KEY (chapter_id);


--
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (course_id);


--
-- Name: matkul matkul_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.matkul
    ADD CONSTRAINT matkul_pkey PRIMARY KEY (matkul_id);


--
-- Name: praktikan praktikan_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.praktikan
    ADD CONSTRAINT praktikan_pkey PRIMARY KEY (praktikan_id);


--
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (question_id);


--
-- Name: quiz quiz_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_pkey PRIMARY KEY (quiz_id);


--
-- Name: score score_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_pkey PRIMARY KEY (score_id);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (student_id);


--
-- Name: subchapter subchapter_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subchapter
    ADD CONSTRAINT subchapter_pkey PRIMARY KEY (subchapter_id);


--
-- Name: teacher teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (teacher_id);


--
-- Name: chapter chapter_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.chapter
    ADD CONSTRAINT chapter_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id);


--
-- Name: course course_matkul_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_matkul_id_fkey FOREIGN KEY (matkul_id) REFERENCES public.matkul(matkul_id);


--
-- Name: question question_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quiz(quiz_id);


--
-- Name: quiz quiz_chapter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_chapter_id_fkey FOREIGN KEY (chapter_id) REFERENCES public.chapter(chapter_id);


--
-- Name: score score_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quiz(quiz_id);


--
-- Name: score score_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(student_id);


--
-- Name: student student_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id);


--
-- Name: subchapter subchapter_chapter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subchapter
    ADD CONSTRAINT subchapter_chapter_id_fkey FOREIGN KEY (chapter_id) REFERENCES public.chapter(chapter_id);


--
-- Name: teacher teacher_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course(course_id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

