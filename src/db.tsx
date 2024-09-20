export type Student = {
    name: string;
    student_id: string;
    staff_name: string;
};
export type Feedback = {
    name: string;
    student_id: string;
    staff_name: string;
    description: string;
    rating: number;
    service_date: Date;
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

export const createStudent = async (db: D1Database, obj: Student) => {
    const query = `
      INSERT INTO students (name, student_id,staff_name)
      VALUES (?, ?, ?)`;

    const results = await db
        .prepare(query)
        .bind(obj.name, obj.student_id, obj.staff_name)
        .run();
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
    student_id VARCHAR(255) NOT NULL,
    staff_name VARCHAR(255)
)`;
    const results = await db.prepare(query).run();
    return results;
};
export const findAllFeedback = async (db: D1Database) => {
    const query = `
      SELECT feedback.* 
      FROM feedback
      `;
    const { results } = await db.prepare(query).all();
    const students = results;
    return students;
};
export const findFeedbackByDate = async (db: D1Database, serviceDate: Date) => {
    const formattedDate = serviceDate.toISOString().split('T')[0];
    const query = `
      SELECT feedback.* 
      FROM feedback
      WHERE service_date = ?
    `;
    const { results } = await db.prepare(query).bind(formattedDate).all();
    return results;
};
export const createFeedback = async (db: D1Database, obj: Feedback) => {
    const year = obj.service_date.getFullYear();
    const month = String(obj.service_date.getMonth() + 1).padStart(2, '0');
    const day = String(obj.service_date.getDate()).padStart(2, '0');

    const query = `
      INSERT INTO feedback (name, student_id,staff_name,description,rating,service_date)
      VALUES (?, ?, ?, ?, ?, ?)`;

    const results = await db
        .prepare(query)
        .bind(obj.name, obj.student_id, obj.staff_name, obj.description,obj.rating,`${year}-${month}-${day}`)
        .run();
    const students = results;
    return students;
};
export const dropFeedbackTable = async (db: D1Database) => {
    const query = `DROP TABLE IF EXISTS feedback`;
    const results = await db.prepare(query).run();
    return results;
};
export const seedFeedbackTable = async (db: D1Database) => {
    const query = `CREATE TABLE IF NOT EXISTS feedback (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    student_id VARCHAR(255) NOT NULL,
    staff_name VARCHAR(255),
    description VARCHAR(255),
    rating TINYINT NOT NULL,
    service_date DATE NOT NULL
)`;
    const results = await db.prepare(query).run();
    return results;
};