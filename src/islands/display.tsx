import type { FC } from "hono/jsx";

const Layout: FC = (props) => {
    return (
        <html>
            <body>{props.children}</body>
        </html>
    );
};

const Display: FC<{ entrys: string }> = (props: { entrys: string }) => {
    console.log(props.entrys);

    return (
        <Layout>
            <ul>
                {JSON.parse(props.entrys).map((entry: string) => {
                    console.log(entry.name);
                    return <li>{entry.name}</li>;
                })}
            </ul>
        </Layout>
    );
};

export default Display;
