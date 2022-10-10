INSERT INTO usertype (user_type_id, user_type_name) VALUES
(1, 'Admin'),
(2, 'User'),
(3, 'Manager');

INSERT INTO staff (staff_id, staff_fname, staff_lname, dept, email, user_type) VALUES
(1, 'Sally', 'Loh', 'HR and Admin' ,'sally.loh@allinone.com', 1),
(2, 'Dylan', 'Lim', 'IT' ,'dylan.lim@allinone.com', 2),
(3, 'Amelia', 'Tan', 'Operations' ,'amelia.tan@allinone.com', 2),
(4, 'Eric', 'Loh', 'Operations' ,'eric.loh@allinone.com', 3),
(5, 'Emma', 'Lee', 'Operations' ,'emma.lee@allinone.com', 2),
(6, 'Derek', 'Tan', 'Sales' ,'derek.tan@allinone.com', 3),
(7, 'David', 'Yap', 'Finance' ,'david.yap@allinone.com', 3),
(8, 'Peter', 'Yap', 'IT' ,'peter.yap@allinone.com', 3);

INSERT INTO course (course_id, course_name, course_desc, course_status, course_type) VALUES
('C1', 'Course 1', 'Course 1 is on....' ,'Active', 'Internal'),
('C2', 'Course 2', 'Course 2 is on....' ,'Retired', 'Internal'),
('C3', 'Course 3', 'Course 3 is on....' ,'Active', 'External'),
('C4', 'Course 4', 'Course 4 is on....' ,'Active', 'External'),
('C5', 'Course 5', 'Course 5 is on....' ,'Active', 'External'),
('C6', 'Course 6', 'Course 6 is on....' ,'Active', 'Internal'),
('C7', 'Course 7', 'Course 7 is on....' ,'Retired', 'External'),
('C8', 'Course 8', 'Course 8 is on....' ,'Retired', 'Internal');

INSERT INTO registration (reg_id, course_id, staff_id, reg_status, completion_status) VALUES
(1, 'C1', 1,'Registered', 'Completed'),
(2, 'C2', 1,'Rejected', 'Not completed'),
(3, 'C6', 1,'Registered', 'Not completed'),
(4, 'C1', 7,'Registered', 'Completed'),
(5, 'C8', 3,'Waitlist', 'Not completed'),
(6, 'C3', 5,'Registered', 'Completed'),
(7, 'C3', 3,'Registered', 'Completed'),
(8, 'C4', 8,'Registered', 'Completed');

INSERT INTO jobrole (role_name, role_desc, role_status) VALUES
('r1', 'role 1....','Active'),
('r2', 'role 2....','Active'),
('r6', 'role 3....','Active'),
('r1', 'role 4....','Active'),
('r8', 'role 5....','Active'),
('r3', 'role 6....','Deleted'),
('r3', 'role 7....','Deleted'),
('r4', 'role 8....','Deleted');

INSERT INTO skill (skill_name, skill_desc, skill_status) VALUES
('skill 1', 'skill 1....', 'Active'),
('skill 2', 'skill 2....', 'Active'),
('skill 3', 'skill 3....', 'Active'),
('skill 4', 'skill 4....', 'Active'),
('skill 5', 'skill 5....', 'Active'),
('skill 6', 'skill 6....', 'Deleted'),
('skill 7', 'skill 7....', 'Deleted'),
('skill 8', 'skill 8....', 'Deleted');

INSERT INTO roleskill (role_id, skill_id) VALUES
(1, 1),
(1, 7),
(1, 4),
(2, 1),
(2, 6),
(2, 2),
(2, 8),
(3, 4),
(4, 5),
(5, 1),
(5, 2),
(5, 4),
(5, 5),
(5, 7),
(6, 3),
(6, 6),
(7, 3),
(7, 4),
(8, 2),
(8, 4);

INSERT INTO courseskill (course_id, skill_id) VALUES
('C1', 1),
('C1', 2),
('C1', 3),
('C2', 4),
('C2', 5),
('C2', 6),
('C2', 7),
('C3', 5),
('C4', 3),
('C5', 1),
('C5', 2),
('C5', 4),
('C5', 5),
('C5', 7),
('C6', 3),
('C6', 6),
('C7', 3),
('C7', 4),
('C8', 2),
('C8', 4);

INSERT INTO journey (staff_id, role_id) VALUES
(1, 5),
(8, 2),
(1, 7),
(4, 6),
(3, 1),
(7, 4),
(7, 3),
(2, 4);

INSERT INTO journeycourse (journey_id, course_id) VALUES
(1, 'C1'),
(1, 'C5'),
(2, 'C2'),
(3, 'C6'),
(4, 'C1'),
(4, 'C2'),
(5, 'C8'),
(6, 'C3'),
(6, 'C7'),
(7, 'C3'),
(8, 'C1'),
(8, 'C4');
