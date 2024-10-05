export type Log = {
    name: string;
    student_id: string;
    staff_name: string;
};
export type Staff = {
    name: string;
    staff_id: string;
};
export type ClockReg = {
    staff_id: string;
    clocked_in: boolean;
    date: Date;
    time?: string;
};
export type Feedback = {
    name: string;
    student_id: string;
    staff_name: string;
    description: string;
    rating: number;
    service_date: Date;
};
export type StaffClock = {
    staff_id: string;
    start_date: Date;
    end_date: Date;
    start_time: string; // Time in format "HH:MM"
    end_time: string; // Time in format "HH:MM"
};

function formatDate(date: Date | string): string {
    // Check if the input is already in 'yyyy-mm-dd' format
    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date; // Return the string as is if it's in the correct format
    }

    // Handle the case where the input is a Date object
    if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        // Return the formatted date as 'yyyy-mm-dd'
        return `${year}-${month}-${day}`;
    }

    // Return a default value if the input is not valid
    return "0000-00-00";
}
// Logs Queries!!
export const findAllLog = async (db: D1Database) => {
    const query = `
      SELECT log.* 
      FROM log
      `;
    const { results } = await db.prepare(query).all();
    return results;
};

export const createLog = async (db: D1Database, obj: Log) => {
    const query = `
      INSERT INTO log (name, student_id,staff_name)
      VALUES (?, ?, ?)`;

    const results = await db.prepare(query).bind(obj.name, obj.student_id, obj.staff_name).run();
    return results;
};
export const dropLogTable = async (db: D1Database) => {
    const query = `DROP TABLE IF EXISTS log`;
    const results = await db.prepare(query).run();
    return results;
};
export const seedLogTable = async (db: D1Database) => {
    const query = `CREATE TABLE IF NOT EXISTS log (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    student_id VARCHAR(255) NOT NULL,
    staff_name VARCHAR(255)
)`;
    const results = await db.prepare(query).run();
    return results;
};

// Feedback Queries!!
export const findAllFeedback = async (db: D1Database) => {
    const query = `
      SELECT feedback.* 
      FROM feedback
      `;
    const { results } = await db.prepare(query).all();
    return results;
};
export const findFeedbackByDate = async (db: D1Database, serviceDate: Date) => {
    const formattedDate = serviceDate.toISOString().split("T")[0];
    const query = `
      SELECT feedback.* 
      FROM feedback
      WHERE service_date = ?
    `;
    const { results } = await db.prepare(query).bind(formattedDate).all();
    return results;
};
export const createFeedback = async (db: D1Database, obj: Feedback) => {
    const query = `
      INSERT INTO feedback (name, student_id,staff_name,description,rating,service_date)
      VALUES (?, ?, ?, ?, ?, ?)`;

    const results = await db
        .prepare(query)
        .bind(
            obj.name,
            obj.student_id,
            obj.staff_name,
            obj.description,
            obj.rating,
            formatDate(obj.service_date)
        )
        .run();
    return results;
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

// Staff Queries!!
export const findAllStaff = async (db: D1Database) => {
    const query = `
      SELECT staff.* 
      FROM staff
      `;
    const { results } = await db.prepare(query).all();
    return results;
};
export const findStaffById = async (db: D1Database, id: string) => {
    const query = `
      SELECT staff.* 
      FROM staff
      WHERE staff_id = ?
    `;
    const { results } = await db.prepare(query).bind(id).all();
    return results;
};
export const createStaff = async (db: D1Database, obj: Staff) => {
    const query = `
      INSERT INTO staff (name, staff_id)
      VALUES (?, ?)`;

    const results = await db.prepare(query).bind(obj.name, obj.staff_id).run();
    return results;
};
export const dropStaffTable = async (db: D1Database) => {
    const query = `DROP TABLE IF EXISTS staff`;
    const results = await db.prepare(query).run();
    return results;
};
export const seedStaffTable = async (db: D1Database) => {
    const query = `CREATE TABLE IF NOT EXISTS staff (
    staff_id VARCHAR(8) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)`;
    const results = await db.prepare(query).run();
    return results;
};

// Queries for StaffClock
export const findAllStaffClock = async (db: D1Database) => {
    const query = `
      SELECT staffclock.* 
      FROM staffclock
      `;
    const { results } = await db.prepare(query).all();
    return results;
};
export const findStaffClockByStaffId = async (db: D1Database, id: string) => {
    const query = `
      SELECT staffclock.* 
      FROM staffclock
      WHERE staff_id = ?
    `;
    const { results } = await db.prepare(query).bind(id).all();
    return results;
};
export const createStaffClock = async (db: D1Database, obj: StaffClock) => {
    const query = `
      INSERT INTO staffclock (staff_id, start_date, end_date, start_time, end_time)
      VALUES (?, ?, ?, ?, ?)`;

    const results = await db
        .prepare(query)
        .bind(
            obj.staff_id,
            formatDate(obj.start_date),
            formatDate(obj.end_date),
            obj.start_time,
            obj.end_time
        )
        .run();
    return results;
};

export const dropStaffClockTable = async (db: D1Database) => {
    const query = `DROP TABLE IF EXISTS staffclock`;
    const results = await db.prepare(query).run();
    return results;
};

export const seedStaffClockTable = async (db: D1Database) => {
    const query = `CREATE TABLE IF NOT EXISTS staffclock (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    staff_id VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    start_time TIME, 
    end_time TIME,
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE CASCADE
)`;
    const results = await db.prepare(query).run();
    return results;
};

// Queries for Clock Register
export const findAllClockReg = async (db: D1Database) => {
    const query = `
      SELECT clockreg.* 
      FROM clockreg
      `;
    const { results } = await db.prepare(query).all();
    return results;
};
export const findLatestClockRegByStaffId = async (
    db: D1Database,
    id: string
): Promise<ClockReg | null> => {
    const query = `
      SELECT clockreg.* 
      FROM clockreg
      WHERE staff_id = ?
      ORDER BY date DESC, time DESC
      LIMIT 1;
    `;

    const results = await db.prepare(query).bind(id).first();
    return results as ClockReg || null;
};
export const createClockReg = async (db: D1Database, obj: ClockReg) => {
    const query = `
      INSERT INTO clockreg (staff_id, clocked_in, date, time)
      VALUES (?, ?, ?, ?)`;

    const results = await db
        .prepare(query)
        .bind(obj.staff_id, obj.clocked_in, formatDate(obj.date), obj.time)
        .run();

    return results;
};
export const updateClockReg = async (db: D1Database, obj: ClockReg) => {
    const query = `
      UPDATE clockreg
      SET clocked_in = ?, date = ?, time = ?
      WHERE staff_id = ?`;

    const results = await db
        .prepare(query)
        .bind(obj.clocked_in, formatDate(obj.date), obj.time, obj.staff_id) // Bind the parameters
        .run();

    return results;
};

export const dropClockRegTable = async (db: D1Database) => {
    const query = `DROP TABLE IF EXISTS clockreg`;
    const results = await db.prepare(query).run();
    return results;
};

export const seedClockRegTable = async (db: D1Database) => {
    const query = `CREATE TABLE IF NOT EXISTS clockreg (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    staff_id VARCHAR(255) NOT NULL,
    clocked_in BOOLEAN DEFAULT FALSE,
    date DATE,
    time TIME,
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE CASCADE
)`;
    const results = await db.prepare(query).run();
    return results;
};
