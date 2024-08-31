import { Hono } from "hono";
import { renderer } from "./renderer";
import { basicAuth } from 'hono/basic-auth'
import { findAllStudents } from "./db";

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

const auth = basicAuth({
  username: 'hono',
  password: 'acoolproject',
})

app.get("*", renderer, auth);

app.get("/", async(c) => {
    const students = await findAllStudents(c.env.DB);
    return c.render(<h1>Hello, Cloudflare Pages! = {JSON.stringify(students)}</h1>);
});

export default app;
