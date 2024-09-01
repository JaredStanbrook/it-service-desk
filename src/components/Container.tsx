import { jsxRenderer } from "hono/jsx-renderer";

export const Container = jsxRenderer(({ children, title }) => {
    return <div>{children}</div>;
});
