import { Hono } from "hono";
import { renderer } from "./renderer";
import { basicAuth } from "hono/basic-auth";
import { prettyJSON } from "hono/pretty-json";
import { findAllStudents, seedStudentTable, dropStudentTable } from "./db";
import type { Student } from "./db";
import { createStudent } from "./db";
import StudentForm from "./islands/logger";
import Display from "./islands/display";
import { getFormDataValue, getFormDataNumber } from "./utils/formData";

type Bindings = {
    DB: D1Database;
    USERNAME: string;
    PASSWORD: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(prettyJSON());
app.use(renderer);

app.get("/", (c) => {
    return c.redirect("/log");
});
app.get(
    "/all/*",
    basicAuth({
        username: "admin", //c.env.USERNAME
        password: "admin", //c.env.PASSWORD
    })
);
app.get(
    "/reset/*",
    basicAuth({
        username: "reset", //c.env.USERNAME
        password: "reset", //c.env.PASSWORD
    })
);
app.get("/all", async (c) => {
    const students = await findAllStudents(c.env.DB);
    return c.render(<Display entrys={JSON.stringify(students)} />, {
        title: "My Title",
    });
});
app.get("/log", async (c) => {
    return c.render(<StudentForm />, {
        title: "Logger!!",
    });
});
app.get("/feedback", async (c) => {
    return c.render(<StudentForm />, {
        title: "Logger!!",
    });
});
app.post("/log", async (c) => {
    try {
        const formData = await c.req.formData();

        const studentData: Student = {
            name: getFormDataValue(formData, "name"),
            student_id: getFormDataValue(formData, "student_id"),
        };

        console.log(studentData);
        await createStudent(c.env.DB, studentData);

        return c.redirect("/log", 303);
    } catch (error) {
        console.error("Error handling POST request:", error);
        return new Response("Error processing your request", { status: 500 });
    }
});
app.get("/reset", async (c) => {
    await dropStudentTable(c.env.DB);
    await seedStudentTable(c.env.DB);
    return c.redirect("/", 303);
});
export default app;
