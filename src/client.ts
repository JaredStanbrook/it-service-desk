import { Hono } from "hono";
import { html } from "hono/html";

type Bindings = {
    MY_DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/:username", (c) => {
    const { username } = c.req.param();
    return c.html(
        html`
            <html>
                <head>
                    {import.meta.env.PROD ? (
                    <script type="module" src="/static/client.js"></script>
                    ) : (
                    <script type="module" src="/src/client.ts"></script>
                    )}
                </head>
                <body>
                    <h1>Hello</h1>
                </body>
            </html>
        `
    );
});

export default app;
