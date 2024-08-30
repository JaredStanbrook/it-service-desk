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
