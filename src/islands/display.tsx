import type { FC } from "hono/jsx";
import type { Student } from "../db";

const Layout: FC = (props) => {
    return (
        <html>
            <body>{props.children}</body>
        </html>
    );
};

const Display: FC<{ entrys: string }> = (props: { entrys: string }) => {
    return (
        <Layout>
            <ul>
                {JSON.parse(props.entrys).map((entry: Student) => {
                    return <li>{entry.name + " " + entry.student_id}</li>;
                })}
            </ul>
        </Layout>
    );
};

export default Display;
