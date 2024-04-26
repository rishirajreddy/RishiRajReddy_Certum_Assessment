--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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

--
-- Name: enum_Appointments_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Appointments_status" AS ENUM (
    'SCHEDULED',
    'COMPLETED',
    'CANCELLED'
);


ALTER TYPE public."enum_Appointments_status" OWNER TO postgres;

--
-- Name: enum_Doctors_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Doctors_type" AS ENUM (
    'IN_CLINIC',
    'ONLINE'
);


ALTER TYPE public."enum_Doctors_type" OWNER TO postgres;

--
-- Name: enum_Users_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_gender" AS ENUM (
    'MALE',
    'FEMALE',
    'OTHERS'
);


ALTER TYPE public."enum_Users_gender" OWNER TO postgres;

--
-- Name: enum_Users_user_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_user_type" AS ENUM (
    'PATIENT',
    'DOCTOR'
);


ALTER TYPE public."enum_Users_user_type" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Abhas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Abhas" (
    id integer NOT NULL,
    abha_address character varying(255),
    abha_number character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "PatientId" integer
);


ALTER TABLE public."Abhas" OWNER TO postgres;

--
-- Name: Abhas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Abhas_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Abhas_id_seq" OWNER TO postgres;

--
-- Name: Abhas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Abhas_id_seq" OWNED BY public."Abhas".id;


--
-- Name: Appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Appointments" (
    id integer NOT NULL,
    appointment_date timestamp with time zone,
    status public."enum_Appointments_status",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "PatientId" integer,
    "DoctorId" integer
);


ALTER TABLE public."Appointments" OWNER TO postgres;

--
-- Name: Appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Appointments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Appointments_id_seq" OWNER TO postgres;

--
-- Name: Appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Appointments_id_seq" OWNED BY public."Appointments".id;


--
-- Name: Doctors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Doctors" (
    id integer NOT NULL,
    speciality character varying(255),
    type public."enum_Doctors_type",
    availability_start time without time zone,
    availability_end time without time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserID" integer
);


ALTER TABLE public."Doctors" OWNER TO postgres;

--
-- Name: Doctors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Doctors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Doctors_id_seq" OWNER TO postgres;

--
-- Name: Doctors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Doctors_id_seq" OWNED BY public."Doctors".id;


--
-- Name: Patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Patients" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserID" integer
);


ALTER TABLE public."Patients" OWNER TO postgres;

--
-- Name: Patients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Patients_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Patients_id_seq" OWNER TO postgres;

--
-- Name: Patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Patients_id_seq" OWNED BY public."Patients".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    user_type public."enum_Users_user_type",
    phone character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    pincode character varying(255),
    dob date,
    gender public."enum_Users_gender",
    otp character varying(255),
    otp_expiration timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Abhas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Abhas" ALTER COLUMN id SET DEFAULT nextval('public."Abhas_id_seq"'::regclass);


--
-- Name: Appointments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Appointments" ALTER COLUMN id SET DEFAULT nextval('public."Appointments_id_seq"'::regclass);


--
-- Name: Doctors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Doctors" ALTER COLUMN id SET DEFAULT nextval('public."Doctors_id_seq"'::regclass);


--
-- Name: Patients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Patients" ALTER COLUMN id SET DEFAULT nextval('public."Patients_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Abhas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Abhas" (id, abha_address, abha_number, "createdAt", "updatedAt", "PatientId") FROM stdin;
3	6277272772772@abha	983237982379823	2024-04-26 11:18:16.08+05:30	2024-04-26 11:18:16.08+05:30	1
4	6277272772772@abdm	99999999991234	2024-04-26 11:42:02.033+05:30	2024-04-26 11:42:02.033+05:30	2
\.


--
-- Data for Name: Appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Appointments" (id, appointment_date, status, "createdAt", "updatedAt", "PatientId", "DoctorId") FROM stdin;
1	2024-04-28 10:00:00+05:30	SCHEDULED	2024-04-26 10:43:14.056+05:30	2024-04-26 10:43:14.056+05:30	1	1
2	2024-04-28 10:00:00+05:30	SCHEDULED	2024-04-26 10:44:05.621+05:30	2024-04-26 10:44:05.621+05:30	1	2
\.


--
-- Data for Name: Doctors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Doctors" (id, speciality, type, availability_start, availability_end, "createdAt", "updatedAt", "UserID") FROM stdin;
1	Cardiac	IN_CLINIC	\N	\N	2024-04-26 10:42:53.993+05:30	2024-04-26 10:42:53.993+05:30	2
2	Cardiac	IN_CLINIC	\N	\N	2024-04-26 10:43:55.548+05:30	2024-04-26 10:43:55.548+05:30	3
3	Cardiac	IN_CLINIC	\N	\N	2024-04-26 11:32:05.842+05:30	2024-04-26 11:32:05.842+05:30	5
\.


--
-- Data for Name: Patients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Patients" (id, "createdAt", "updatedAt", "UserID") FROM stdin;
1	2024-04-26 10:42:48.184+05:30	2024-04-26 10:42:48.184+05:30	1
2	2024-04-26 11:31:32.235+05:30	2024-04-26 11:31:32.235+05:30	4
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, user_type, phone, first_name, last_name, pincode, dob, gender, otp, otp_expiration, "createdAt", "updatedAt") FROM stdin;
2	DOCTOR	9999999999	Rishi	Raj	530026	2000-04-10	MALE	534520	2024-04-26 10:47:53.983+05:30	2024-04-26 10:42:53.985+05:30	2024-04-26 10:42:53.999+05:30
1	PATIENT	6295612299	Rishi	Raj	530026	2000-04-10	MALE	\N	\N	2024-04-26 10:42:48.165+05:30	2024-04-26 10:43:05.012+05:30
3	DOCTOR	9832447008	Rishi	Raj	530026	2000-04-10	MALE	937303	2024-04-26 11:36:22.477+05:30	2024-04-26 10:43:55.542+05:30	2024-04-26 11:31:22.478+05:30
5	DOCTOR	9832447018	Rishi	Raj	530026	2000-04-10	MALE	389277	2024-04-26 11:37:05.83+05:30	2024-04-26 11:32:05.833+05:30	2024-04-26 11:32:05.85+05:30
4	PATIENT	9832447009	Rishi	Raj	530026	2000-04-10	MALE	\N	\N	2024-04-26 11:31:32.22+05:30	2024-04-26 11:40:25.557+05:30
\.


--
-- Name: Abhas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Abhas_id_seq"', 4, true);


--
-- Name: Appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Appointments_id_seq"', 2, true);


--
-- Name: Doctors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Doctors_id_seq"', 3, true);


--
-- Name: Patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Patients_id_seq"', 2, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 5, true);


--
-- Name: Abhas Abhas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Abhas"
    ADD CONSTRAINT "Abhas_pkey" PRIMARY KEY (id);


--
-- Name: Appointments Appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Appointments"
    ADD CONSTRAINT "Appointments_pkey" PRIMARY KEY (id);


--
-- Name: Doctors Doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Doctors"
    ADD CONSTRAINT "Doctors_pkey" PRIMARY KEY (id);


--
-- Name: Patients Patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Patients"
    ADD CONSTRAINT "Patients_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_phone_key" UNIQUE (phone);


--
-- Name: Users Users_phone_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_phone_key1" UNIQUE (phone);


--
-- Name: Users Users_phone_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_phone_key2" UNIQUE (phone);


--
-- Name: Users Users_phone_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_phone_key3" UNIQUE (phone);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: doctors_speciality; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX doctors_speciality ON public."Doctors" USING btree (speciality);


--
-- Name: Abhas Abhas_PatientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Abhas"
    ADD CONSTRAINT "Abhas_PatientId_fkey" FOREIGN KEY ("PatientId") REFERENCES public."Patients"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Appointments Appointments_DoctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Appointments"
    ADD CONSTRAINT "Appointments_DoctorId_fkey" FOREIGN KEY ("DoctorId") REFERENCES public."Doctors"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Appointments Appointments_PatientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Appointments"
    ADD CONSTRAINT "Appointments_PatientId_fkey" FOREIGN KEY ("PatientId") REFERENCES public."Patients"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Doctors Doctors_UserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Doctors"
    ADD CONSTRAINT "Doctors_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Patients Patients_UserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Patients"
    ADD CONSTRAINT "Patients_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

