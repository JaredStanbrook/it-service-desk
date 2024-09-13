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
    const array = JSON.parse(props.entrys);
    return (
        <Layout>
            <div className="container">
                <ul>
                    {array.map((entry: Student) => {
                        return <li>{entry.name + " " + entry.student_id + " - " + entry.staff_name}</li>;
                    })}
                </ul>
            </div>
        </Layout>
    );
};

export default Display;
