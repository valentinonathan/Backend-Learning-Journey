--
-- PostgreSQL database dump
--

\restrict PbzkfPMCYZp7KaNeQrej2D9Kk4dweJakjyGsaKVqT7bHHUMhc9MJ7VjBmeid41c

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-07 19:55:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 220 (class 1259 OID 16395)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    name character varying(255),
    is_completed boolean,
    users_username character varying(255)
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16394)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tasks ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16402)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    username character varying(255) NOT NULL,
    password character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 5015 (class 0 OID 16395)
-- Dependencies: 220
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, name, is_completed, users_username) FROM stdin;
6	Random task	f	Random
4	Another task	f	Valentino
7	Test name	t	Valentino
\.


--
-- TOC entry 5016 (class 0 OID 16402)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (username, password) FROM stdin;
Valentino	12345
Random	12345
\.


--
-- TOC entry 5022 (class 0 OID 0)
-- Dependencies: 219
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 7, true);


--
-- TOC entry 4863 (class 2606 OID 16427)
-- Name: users pk_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_username PRIMARY KEY (username);


--
-- TOC entry 4861 (class 2606 OID 16400)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 4865 (class 2606 OID 16424)
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- TOC entry 4866 (class 2606 OID 16446)
-- Name: tasks fk_users_username; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_users_username FOREIGN KEY (users_username) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-06-07 19:55:40

--
-- PostgreSQL database dump complete
--

\unrestrict PbzkfPMCYZp7KaNeQrej2D9Kk4dweJakjyGsaKVqT7bHHUMhc9MJ7VjBmeid41c

