import {} from "hono";

type Head = {
    title?: string;
};

declare module "hono" {
    interface ContextRenderer {
        (content: string | Promise<string>, props?: { title?: string }): Response;
    }
}