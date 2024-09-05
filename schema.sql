-- npx wrangler d1 execute <db-name> --remote --command "SELECT students.* FROM students"
DROP TABLE IF EXISTS students;

CREATE TABLE IF NOT EXISTS students (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    student_id VARCHAR(255) NOT NULL
);

INSERT INTO students (name, student_id) VALUES 
('Jared Stanbrook','34113043');