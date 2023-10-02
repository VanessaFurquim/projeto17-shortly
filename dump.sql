--
-- PostgreSQL database dump
--

-- Dumped from database version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)

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
-- Name: authenticationSessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."authenticationSessions" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: authenticationSessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."authenticationSessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: authenticationSessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."authenticationSessions_id_seq" OWNED BY public."authenticationSessions".id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: authenticationSessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."authenticationSessions" ALTER COLUMN id SET DEFAULT nextval('public."authenticationSessions_id_seq"'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: authenticationSessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."authenticationSessions" VALUES (1, 1, '207be7a3-e29e-4d1a-b9b5-d876f375e35d', '2023-09-30 01:12:20.496171');
INSERT INTO public."authenticationSessions" VALUES (2, 3, 'aa35d75a-4b64-42f9-accb-462ecdc36cb1', '2023-09-30 01:24:47.343049');
INSERT INTO public."authenticationSessions" VALUES (3, 2, 'b4c0a018-8cfe-44ea-948b-0638791b4aba', '2023-10-01 20:20:19.540565');
INSERT INTO public."authenticationSessions" VALUES (4, 7, '47897d77-4813-4d78-87c4-c6cff2dfb435', '2023-10-01 22:39:21.729186');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (3, 'https://live.com.br', 'n1MkWhRiKEVQF6XBc3Uce', 7, 1, '2023-09-30 05:22:54.659405');
INSERT INTO public.urls VALUES (5, 'https://dogs.com.br', 'gpSJklaJfx2g7Y3H8u-6f', 2, 1, '2023-09-30 19:19:51.068779');
INSERT INTO public.urls VALUES (6, 'https://cats.com.br', '5O_nrrBsubk4Uea-s4jNR', 1, 3, '2023-09-30 19:21:07.10889');
INSERT INTO public.urls VALUES (7, 'https://future.com.br', 'AGjTY1kum4Bxs5jbi19aa', 1, 3, '2023-09-30 19:21:24.232133');
INSERT INTO public.urls VALUES (8, 'https://money.com.br', 'UPrcbA_c-75V6QE_-K_6n', 1, 3, '2023-09-30 19:21:30.844569');
INSERT INTO public.urls VALUES (4, 'https://love.com.br', 'uEuKjYveyxld57sSSqkZl', 4, 3, '2023-09-30 05:22:59.429693');
INSERT INTO public.urls VALUES (12, 'https://success.com.br', 'DQLWvXKYsva8dGCS5A324', 0, 2, '2023-10-01 20:23:33.276921');
INSERT INTO public.urls VALUES (9, 'https://happy.com.br', 'c3IOiP68VO6N8vAxluxGd', 0, 2, '2023-10-01 20:21:46.344047');
INSERT INTO public.urls VALUES (10, 'https://curious.com.br', 'QQ2kRwApdwd9Tf-2zuqty', 0, 2, '2023-10-01 20:22:02.387832');
INSERT INTO public.urls VALUES (11, 'https://loved.com.br', 'COzF4vqFQMR6L0gj5R9hI', 0, 2, '2023-10-01 20:22:09.527245');
INSERT INTO public.urls VALUES (13, 'http://success.com.br', 'MEJaiyuKLmYwd7W3MwXob', 0, 2, '2023-10-02 00:29:32.359236');
INSERT INTO public.urls VALUES (14, 'http://realistic-bomber.br', 'a7UoiCOuOwy-Frzn_Ux2h', 0, 2, '2023-10-02 00:30:17.221688');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Livia', 'livia@driven.com.br', '$2b$12$amZKlzDKgs1zMZtQLJl6JePlldQHiBunrX6K.FqAsxrSx5YIKxL5W', '2023-09-30 01:11:58.071553');
INSERT INTO public.users VALUES (2, 'Lucas', 'lucas@driven.com.br', '$2b$12$3PXKUKxDCFHj4B/xTMRHIOGIDtTJxbNINq1/XMtMvYR0nOWrLTrMe', '2023-09-30 01:12:10.717853');
INSERT INTO public.users VALUES (3, 'Diego', 'diego@driven.com.br', '$2b$12$UuW.hTlGp3g10FKlUFKpGuv/LYp42hoyO0OMcnMn6EpDy1iQRgOoC', '2023-09-30 01:24:37.532742');
INSERT INTO public.users VALUES (4, 'Vanessa', 'vanessa@driven.com.br', '$2b$12$a4sgbpGfgwt9aAMCnypvSOYaxqZn2Y9jhoeC6yr670d0dN7fez6PC', '2023-10-01 22:35:14.253915');
INSERT INTO public.users VALUES (5, 'Silvia', 'silvia@driven.com.br', '$2b$12$Q.XavSe/gKvK1Rypx2ZdDudJbxu5VBbIkzIiXE8oLu.gVpCdLMl/e', '2023-10-01 22:35:23.443776');
INSERT INTO public.users VALUES (6, 'Helena', 'helena@driven.com.br', '$2b$12$2MVpyVWeAJwEMH9kiJVV4.B/KPSEXQ/peAfpSonnDjhOtdeY3LFs.', '2023-10-01 22:35:31.24765');
INSERT INTO public.users VALUES (7, 'Nissu', 'nissu@driven.com.br', '$2b$12$Wn7oKkIc2lMoFmiT0ILxpOnDgMeESqoy8yAiGQTSz3h69p7PjinGe', '2023-10-01 22:35:40.183628');
INSERT INTO public.users VALUES (9, 'Pati', 'pati@driven.com.br', '$2b$12$1p7mru10ISlaawasKcW3pOhVll15ZDvXkaEYPY.Q8P26XjuQCeXOO', '2023-10-01 22:37:25.349051');
INSERT INTO public.users VALUES (10, 'MLau', 'mlau@driven.com.br', '$2b$12$rT412m4SIvm0g8KknfZp8eFdKpsNFBfagm1c3z0nElKuykMWlolaq', '2023-10-01 22:37:33.950178');
INSERT INTO public.users VALUES (11, 'Estevao', 'estevao@driven.com.br', '$2b$12$OmpUNtWFzYrJyB/83z9uzOTaITHYAD0osgA5gcYq4ZGlQNDuxnYSS', '2023-10-01 22:37:51.353043');
INSERT INTO public.users VALUES (12, 'Gabriela', 'gabi@driven.com.br', '$2b$12$19yO9LibrdqTyKNb9RKi0.vUs6lGAlRKjpU/xpHC7IeiFXJfzjdMm', '2023-10-01 22:37:58.311867');
INSERT INTO public.users VALUES (8, 'Nilson', 'nilson@driven.com.br', '$2b$12$unbvkIynxX8gdDpAHrkb3e5QgT1Q8cpHbrxNTTRrUhn8mvpbQJKbW', '2023-10-01 22:35:51.382538');


--
-- Name: authenticationSessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."authenticationSessions_id_seq"', 4, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 14, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: authenticationSessions authenticationSessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."authenticationSessions"
    ADD CONSTRAINT "authenticationSessions_pkey" PRIMARY KEY (id);


--
-- Name: authenticationSessions authenticationSessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."authenticationSessions"
    ADD CONSTRAINT "authenticationSessions_token_key" UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: urls urls_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: authenticationSessions authenticationSessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."authenticationSessions"
    ADD CONSTRAINT "authenticationSessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

