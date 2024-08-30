import { Hono } from "hono";
import { renderer } from "./renderer";
import { findAllStudents } from "./db";

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("*", renderer);

app.get("/", async(c) => {
    const students = await findAllStudents(c.env.DB);
    return c.render(<h1>Hello, Cloudflare Pages! = {JSON.stringify(students)}</h1>);
});

export default app;
