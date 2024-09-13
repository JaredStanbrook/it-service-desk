-- npx wrangler d1 execute <db-name> --remote --command "SELECT students.* FROM students"
-- npx wrangler d1 execute it-service-desk-db --remote --file ./schema.sql

-- DROP TABLE IF EXISTS students;

-- CREATE TABLE IF NOT EXISTS students (
--     _id INTEGER PRIMARY KEY AUTOINCREMENT,
--     name VARCHAR(255) NOT NULL,
--     student_id VARCHAR(255) NOT NULL,
--     staff_name VARCHAR(255)
-- );

-- ALTER TABLE students
-- ADD staff_name VARCHAR(255);

-- INSERT INTO students (name, student_id) VALUES 
-- ('Jared Stanbrook','34113043');