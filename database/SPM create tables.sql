CREATE DATABASE IF NOT EXISTS spm DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE spm;

CREATE TABLE usertype (
    user_type_id INT NOT NULL PRIMARY KEY,
    user_type_name VARCHAR(20) NOT NULL
);

CREATE TABLE staff (
    staff_id INT NOT NULL PRIMARY KEY,
    staff_fname VARCHAR(50) NOT NULL,
    staff_lname VARCHAR(50) NOT NULL,
    dept VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    user_type INT,
    CONSTRAINT staff_fk FOREIGN KEY (user_type)
        REFERENCES usertype (user_type_id)
);

CREATE TABLE course (
    course_id VARCHAR(20) NOT NULL PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL,
    course_desc VARCHAR(255),
    course_status VARCHAR(15),
    course_type VARCHAR(10)
);

CREATE TABLE registration (
    reg_id INT NOT NULL PRIMARY KEY,
    course_id VARCHAR(20) NOT NULL,
    staff_id INT NOT NULL,
    reg_status VARCHAR(20) NOT NULL,
    completion_status VARCHAR(20) NOT NULL,
    CONSTRAINT registration_fk1 FOREIGN KEY (course_id)
        REFERENCES course (course_id),
    CONSTRAINT registration_fk2 FOREIGN KEY (staff_id)
        REFERENCES staff (staff_id)
);

CREATE TABLE jobrole (
    role_id INT NOT NULL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    role_desc VARCHAR(255) NOT NULL,
    role_responsibilities VARCHAR(255) NOT NULL,
    role_status VARCHAR(15) NOT NULL
);

CREATE TABLE skill (
    skill_id INT NOT NULL PRIMARY KEY,
    skill_name VARCHAR(20) NOT NULL,
    skill_desc VARCHAR(255) NOT NULL,
    skill_status VARCHAR(15) NOT NULL
);

CREATE TABLE roleskill (
    role_id INT NOT NULL,
    skill_id INT NOT NULL,
    CONSTRAINT roleskill_pk PRIMARY KEY (role_id , skill_id),
    CONSTRAINT roleskill_fk1 FOREIGN KEY (role_id)
        REFERENCES jobrole (role_id),
    CONSTRAINT roleskill_fk2 FOREIGN KEY (skill_id)
        REFERENCES skill (skill_id)
);

CREATE TABLE courseskill (
    course_id VARCHAR(20) NOT NULL,
    skill_id INT NOT NULL,
    CONSTRAINT courseskill_pk PRIMARY KEY (course_id , skill_id),
    CONSTRAINT courseskill_fk1 FOREIGN KEY (course_id)
        REFERENCES course (course_id),
    CONSTRAINT courseskill_fk2 FOREIGN KEY (skill_id)
        REFERENCES skill (skill_id)
);

CREATE TABLE journey (
    journey_id INT NOT NULL PRIMARY KEY,
    staff_id INT NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT journey_fk1 FOREIGN KEY (staff_id)
        REFERENCES staff (staff_id),
    CONSTRAINT journey_fk2 FOREIGN KEY (role_id)
        REFERENCES jobrole (role_id)
);

CREATE TABLE journeycourse (
    journey_id INT NOT NULL,
    course_id VARCHAR(20) NOT NULL,
    CONSTRAINT journeycourse_pk PRIMARY KEY (journey_id , course_id),
    CONSTRAINT journeycourse_fk1 FOREIGN KEY (journey_id)
        REFERENCES journey (journey_id),
    CONSTRAINT journeycourse_fk2 FOREIGN KEY (course_id)
        REFERENCES course (course_id)
);

