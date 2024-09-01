import { jsxRenderer } from "hono/jsx-renderer";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import "./style.css";

export const renderer = jsxRenderer(({ children, title }) => {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                {import.meta.env.PROD ? (
                    <>
                    <link href="/static/style.css" rel="stylesheet" />
                    <script type='module' src='/static/script.js'></script>
                    </>
                ) : (
                    <>
                    <link href="/src/style.css" rel="stylesheet" />
                    <script type='module' src='/src/script.js'></script>
                    </>
                )}
                <title>{title}</title>
            </head>
            <Nav />
            <body>
                <canvas id="wavesCanvas"></canvas>
                {children}
            </body>
            <Footer />
        </html>
    );
});
