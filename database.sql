CREATE DATABASE therapy_db;

\c therapy_db

CREATE TABLE therapists (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  therapist_id INTEGER REFERENCES therapists(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  therapist_id INTEGER REFERENCES therapists(id),
  notes TEXT,
  ai_summary TEXT,
  session_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  shared_with_patient BOOLEAN DEFAULT false
);