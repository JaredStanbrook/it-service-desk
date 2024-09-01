import { Hono } from "hono";
import { renderer } from "./renderer";
import { basicAuth } from "hono/basic-auth";
import { prettyJSON } from "hono/pretty-json";
import { findAllStudents } from "./db";
import type { Student } from "./db";
import { createStudent } from "./db";
import StudentForm from "./islands/logger";
import Display from "./islands/display";
import { getFormDataValue, getFormDataNumber } from './utils/formData'

type Bindings = {
    DB: D1Database;
    USERNAME: string;
    PASSWORD: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("*", renderer);
app.use(prettyJSON());

app.get(
    "/",
    /*
    async (c, next) => {
        const auth = basicAuth({
            username: "admin", //c.env.USERNAME
            password: "admin", //c.env.PASSWORD
        });
        return auth(c, next);
    },*/
    async (c) => {
        const students = await findAllStudents(c.env.DB);
        //const students = '[{"_id":1,"name":"Jared Stanbrook","student_id":"34113043"},{"_id":2,"name":"Miles Stanbrook","student_id":"34113043"}]';
        return c.render(<Display entrys={JSON.parse(JSON.stringify(students))} />, {
            title: "My Title",
        });
    }
);
app.get(
    "/logg/*",
    basicAuth({
        username: "admin", //c.env.USERNAME
        password: "admin", //c.env.PASSWORD
    })
);
app.get("/log", async (c) => {
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

        return c.redirect("/", 303);
    } catch (error) {
        console.error("Error handling POST request:", error);
        return new Response("Error processing your request", { status: 500 });
    }
});

export default app;
