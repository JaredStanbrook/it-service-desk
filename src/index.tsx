import { Hono } from "hono";
import { renderer } from "./renderer";

type Bindings = {
    MY_DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("*", renderer);

app.get("/", (c) => {
    return c.render(<h1>Hello, Cloudflare Pages!</h1>);
});

export default app;
