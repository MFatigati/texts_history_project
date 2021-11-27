CREATE DATABASE texts_project;

CREATE TABLE people (
  id serial UNIQUE NOT NULL,
  latinized_name text NOT NULL,
  arabic_name text,
  birth_year integer CHECK (birth_year > -1000 AND birth_year < 2000),
  death_year integer CHECK (birth_year > -1000 AND birth_year < 2000)
);

INSERT INTO
  people (
    latinized_name,
    arabic_name,
    birth_year,
    death_year
  )
VALUES
  ('Avicenna', 'Ibn Sina', 980, 1097),
  ('Aristotle', NULL, -384, -322),
  ('Averroes', 'Ibn Rushd', 1126, 1198);

CREATE TYPE location_type AS ENUM ('city', 'country', 'region', 'island', 'kingdom');

CREATE TABLE locations (
  id serial UNIQUE NOT NULL,
  location_name text NOT NULL,
  location_type location_type
);

INSERT INTO
  locations (location_name, location_type)
VALUES
  ('Bukhara', 'city'),
  ('Gurgan', 'city'),
  ('Ray', 'city'),
  ('Hamadan', 'city'),
  ('Isfahan', 'city'),
  ('Marrakesh', 'city'),
  ('Seville', 'city'),
  ('Cordoba', 'city'),
  ('Stagira', 'city'),
  ('Athens', 'city'),
  ('Lesbos', 'island'),
  ('Macedon', 'kingdom');

-- people and locations have a M:M relationship, so a join table is necessary
CREATE TABLE people_locations (
  id serial UNIQUE NOT NULL,
  person_id integer REFERENCES people (id),
  location_id integer REFERENCES locations (id),
  arrival_year integer,
  departure_year integer
)

INSERT INTO
  people_locations (person_id, location_id)
VALUES
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (2, 9),
  (2, 10),
  (2, 11),
  (2, 12),
  (3, 6),
  (3, 7),
  (3, 8);

SELECT location_name FROM locations
  JOIN people_locations ON locations.id = people_locations.location_id
  JOIN people ON people_locations.person_id = people.id
  WHERE people.latinized_name = 'Averroes';

CREATE TABLE texts (
  id serial UNIQUE NOT NULL,
  text_title_english text NOT NULL,
  standard_reference_title text NOT NULL,
  original_language text NOT NULL,
  completion_date integer
);

INSERT into texts (text_title_english, standard_reference_title, original_language, completion_date)
VALUES
('On the Soul', 'De Anima', 'Greek', -350),
('Commentary on Aristotle''s De Anima', 'Commentary on Aristotle''s De Anima', 'Arabic', NULL),
('Healing: Psychology', 'Al-Shifa: Kitab Al-Nafs', 'Arabic', 1020);

-- people and texts have a M:M relationship, so a join table is necessary
CREATE TABLE people_texts (
  id serial UNIQUE NOT NULL,
  person_id integer REFERENCES people (id),
  text_id integer REFERENCES texts (id)
);

INSERT INTO people_texts (person_id, text_id)
  VALUES
    (1, 3),
    (2, 1),
    (3, 2);

SELECT people.latinized_name, texts.text_title_english FROM people
  JOIN people_texts ON people.id = people_texts.person_id
  JOIN texts ON texts.id = people_texts.text_id;

CREATE TABLE translations (
  id serial UNIQUE NOT NULL,
  translation_name text NOT NULL,
  text_translated_id integer NOT NULL REFERENCES texts (id),
  translator_id integer REFERENCES people (id)
);