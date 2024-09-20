import { Hono } from "hono";
import { renderer } from "./renderer";
import { basicAuth } from "hono/basic-auth";
import { prettyJSON } from "hono/pretty-json";
import { findAllStudents, seedStudentTable, dropStudentTable } from "./db";
import { findAllFeedback, findFeedbackByDate, seedFeedbackTable, dropFeedbackTable } from "./db";
import type { Student } from "./db";
import type { Feedback } from "./db";
import { createStudent } from "./db";
import { createFeedback } from "./db";
import StudentForm from "./islands/studentform";
import FeedbackForm from "./islands/feedbackform";
import Display from "./islands/display";
import { getFormDataValue, getFormDataNumber, getFormDataDate } from "./utils/formData";

type Bindings = {
    DB: D1Database;
    USERNAME: string;
    PASSWORD: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(prettyJSON());
app.use(renderer);

app.get("/", (c) => {
    return c.redirect("/feedback");
});
app.get(
    "/view/*",
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
app.get("/view/logs", async (c) => {
    const students = await findAllStudents(c.env.DB);
    return c.render(<Display entrys={JSON.stringify(students)} />, {
        title: "All Entrys",
    });
});
app.get("/view/feedback/", (c) => {
    return c.redirect("/view/feedback");
});
app.get("/view/feedback/:id?", async (c) => {
    const { id } = c.req.param(); // Get the optional `id` parameter

    // If `id` is provided, try to convert it to a Date object; otherwise, use the current date
    let date: Date;
    if (id) {
        console.log(id);
        if (id.toLowerCase() == "today") {
            date = new Date(); // Default to the current date if `id` today
        } else {
            // Convert the `id` (assumed to be a date string) to a Date object
            date = new Date(id);
            // Check if the conversion to Date was invalid (NaN), and if so, set it to the current date
            if (isNaN(date.getTime())) {
                return c.text("Invalid date format", 400); // Return a 400 Bad Request for invalid dates
            }
        }
    } else {
        const feedback = await findAllFeedback(c.env.DB);
        return c.render(<Display entrys={JSON.stringify(feedback)} />, {
            title: "All Feedback",
        });
    }
    const feedback = await findFeedbackByDate(c.env.DB, date); // Call your function with the date object
    return c.render(<Display entrys={JSON.stringify(feedback)} />, {
        title: "Today's Feedback",
    });
});
app.get("/log", async (c) => {
    return c.render(<StudentForm />, {
        title: "It Service Desk!!",
    });
});
app.get("/feedback", async (c) => {
    return c.render(<FeedbackForm />, {
        title: "We Love Feedback!!",
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
