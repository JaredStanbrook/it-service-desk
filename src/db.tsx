export type Student = {
    name: string;
    student_id: string;
};

export const findAllStudents = async (db: D1Database) => {
    const query = `
      SELECT students.* 
      FROM students
      `;
    const { results } = await db.prepare(query).all();
    const students = results;
    return students;
};

export const createStudent = async (db: D1Database, student: Student) => {
    const query = `
      INSERT INTO students (name, student_id)
      VALUES (?, ?)`;

    const results = await db.prepare(query).bind(student.name, student.student_id).run();
    const students = results;
    return students;
};
export const dropStudentTable = async (db: D1Database) => {
    const query = `DROP TABLE IF EXISTS students`;
    const results = await db.prepare(query).run();
    return results;
};
export const seedStudentTable = async (db: D1Database) => {
    const query = `CREATE TABLE IF NOT EXISTS students (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    student_id VARCHAR(255) NOT NULL
)`;
    const results = await db.prepare(query).run();
    return results;
};
