import { Hono } from "hono";
import { renderer } from "./renderer";
import { basicAuth } from "hono/basic-auth";
import { prettyJSON } from "hono/pretty-json";
import { findAllStudents, seedStudentTable, dropStudentTable} from "./db";
import { findAllFeedback, seedFeedbackTable, dropFeedbackTable} from "./db";
import type { Student } from "./db";
import type { Feedback } from "./db";
import { createStudent } from "./db";
import { createFeedback } from "./db";
import StudentForm from "./islands/studentform";
import FeedbackForm from "./islands/feedbackform";
import Display from "./islands/display";
import { getFormDataValue, getFormDataNumber, getFormDataDate} from "./utils/formData";

type Bindings = {
    DB: D1Database;
    USERNAME: string;
    PASSWORD: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(prettyJSON());
app.use(renderer);

app.get("/", (c) => {
    return c.redirect("/log");
});
app.get(
    "/all/*",
    basicAuth({
        username: "admin", //c.env.USERNAME
        password: "admin", //c.env.PASSWORD
    })
);
app.get(
    "/reset/*",
    basicAuth({
        username: "reset", //c.env.USERNAME
        password: "reset", //c.env.PASSWORD
    })
);
app.get("/all", async (c) => {
    const students = await findAllStudents(c.env.DB);
    return c.render(<Display entrys={JSON.stringify(students)} />, {
        title: "All Entrys",
    });
});
app.get("/all/feedback", async (c) => {
    const feedback = await findAllFeedback(c.env.DB);
    return c.render(<Display entrys={JSON.stringify(feedback)} />, {
        title: "All Feedback",
    });
});
app.get("/log", async (c) => {
    return c.render(<StudentForm />, {
        title: "Logger!!",
    });
});
app.get("/feedback", async (c) => {
    return c.render(<FeedbackForm />, {
        title: "Feedback!!",
    });
});
app.post("/log", async (c) => {
    try {
        const formData = await c.req.formData();

        const studentData: Student = {
            name: getFormDataValue(formData, "name"),
            student_id: getFormDataValue(formData, "student_id"),
            staff_name: getFormDataValue(formData, "staff_name"),
        };

        console.log(studentData);
        await createStudent(c.env.DB, studentData);

        return c.redirect("/log", 303);
    } catch (error) {
        console.error("Error handling POST request:", error);
        return new Response("Error processing your request", { status: 500 });
    }
});
app.post("/feedback", async (c) => {
    try {
        const formData = await c.req.formData();

        const feedbackData: Feedback = {
            name: getFormDataValue(formData, "name"),
            student_id: getFormDataValue(formData, "student_id"),
            staff_name: getFormDataValue(formData, "staff_name"),
            description: getFormDataValue(formData, "description"),
            rating: getFormDataNumber(formData, "rating"),
            service_date: getFormDataDate(formData, "service_date"),
        };

        await createFeedback(c.env.DB, feedbackData);

        return c.redirect("/feedback", 303);
    } catch (error) {
        console.error("Error handling POST request:", error);
        return new Response("Error processing your request", { status: 500 });
    }
});
app.get("/reset", async (c) => {
    await dropStudentTable(c.env.DB);
    await seedStudentTable(c.env.DB);
    return c.redirect("/", 303);
});
app.get("/reset/feedback", async (c) => {
    await dropFeedbackTable(c.env.DB);
    await seedFeedbackTable(c.env.DB);
    return c.redirect("/", 303);
});
export default app;
