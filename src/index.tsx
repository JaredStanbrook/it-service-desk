import { Hono } from "hono";
import { renderer } from "./renderer";
import { basicAuth } from "hono/basic-auth";
import { prettyJSON } from "hono/pretty-json";
import { findAllStudents } from "./db";
import StudentForm from "./islands/logger";
import Display from "./islands/display";

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
        //const students = await findAllStudents(c.env.DB);
        const students =
            '[{"_id":1,"name":"Jared Stanbrook","student_id":"34113043"},{"_id":2,"name":"Miles Stanbrook","student_id":"34113043"}]';
        /*console.log(JSON.parse(students));
        students.map((entry: string) => {
            console.log(entry);
        });
        */
        return c.render(<Display entrys={JSON.parse(JSON.stringify(students))} />, {
            title: "My Title",
        });
    }
);
app.get(
    "/log/*",
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

export default app;
