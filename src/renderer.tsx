import { jsxRenderer } from "hono/jsx-renderer";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

export const renderer = jsxRenderer(({ children, title }) => {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                {import.meta.env.PROD ? (
                    <link href="/static/style.css" rel="stylesheet" />
                ) : (
                    <link href="/static/style.css" rel="stylesheet" />
                )}
                <title>{title}</title>
            </head>
            <Nav />
            <body>{children}</body>
            <Footer />
        </html>
    );
});
