import { Hono } from "hono";
import { renderer } from "./renderer";
import { basicAuth } from "hono/basic-auth";
import { prettyJSON } from "hono/pretty-json";
import { DateTime } from "luxon";

import {
    getFormDataValue,
    getFormDataNumber,
    getFormDataDate,
    getFormDataBool,
} from "./utils/formData";
import { getCurrentTime } from "./utils/utils";
import type { Log } from "./db";
import type { Feedback } from "./db";
import type { Staff } from "./db";
import type { StaffClock } from "./db";
import type { ClockReg } from "./db";
import { createLog, findAllLog, seedLogTable, dropLogTable } from "./db";
import {
    createFeedback,
    findAllFeedback,
    findFeedbackByDate,
    seedFeedbackTable,
    dropFeedbackTable,
    flushFeedbackTable,
} from "./db";
import { createStaff, findAllStaff, findStaffById, seedStaffTable, dropStaffTable } from "./db";
import {
    createStaffClock,
    findAllStaffClock,
    findStaffClockByStaffId,
    seedStaffClockTable,
    dropStaffClockTable,
} from "./db";
import {
    createClockReg,
    updateClockReg,
    findAllClockReg,
    findLatestClockRegByStaffId,
    seedClockRegTable,
    dropClockRegTable,
} from "./db";
import LogForm from "./islands/logform";
import FeedbackForm from "./islands/feedbackform";
import ClockingForm from "./islands/clockingform";
import StaffForm from "./islands/staffform";
import ManagerForm from "./islands/managerform";
import Display from "./islands/display";

type Bindings = {
    DB: D1Database;
    USERNAME: string;
    PASSWORD: string;
};

const app = new Hono<{ Bindings: Bindings; strict: false }>();

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
    const students = await findAllLog(c.env.DB);
    return c.render(<Display entrys={JSON.stringify(students)} title={"All Logs"} />, {
        title: "All Logs",
    });
});
app.get("/view/feedback/:id?", async (c) => {
    const { id } = c.req.param(); // Get the optional `id` parameter
    const timezone = "Australia/Perth";
    // If `id` is provided, try to convert it to a Date object; otherwise, use the current date
    let date: Date;
    if (id) {
        console.log(id);
        if (id.toLowerCase() == "today") {
            date = DateTime.now().setZone(timezone).toJSDate(); // Default to the current date if `id` today
        } else {
            // Convert the `id` (assumed to be a date string) to a Date object
            date = DateTime.fromISO(id, { zone: timezone }).toJSDate();
            // Check if the conversion to Date was invalid (NaN), and if so, set it to the current date
            if (isNaN(date.getTime())) {
                return c.text("Invalid date format", 400); // Return a 400 Bad Request for invalid dates
            }
        }
    } else {
        const feedback = await findAllFeedback(c.env.DB);
        return c.render(<Display entrys={JSON.stringify(feedback)} title={"All Feedback"} />, {
            title: "All Feedback",
        });
    }
    const feedback = await findFeedbackByDate(c.env.DB, date); // Call your function with the date object
    return c.render(<Display entrys={JSON.stringify(feedback)} title={"Today's Feedback"} />, {
        title: "Today's Feedback",
    });
});
app.get("/view/staff", async (c) => {
    const staff = await findAllStaff(c.env.DB);
    return c.render(<Display entrys={JSON.stringify(staff)} title={"All Staff"} />, {
        title: "All Staff",
    });
});
app.get("/view/clockreg", async (c) => {
    const staff = await findAllClockReg(c.env.DB);
    return c.render(<Display entrys={JSON.stringify(staff)} title={"All Staff"} />, {
        title: "All Staff",
    });
});
app.get("/view/clockin", async (c) => {
    const staff = await findAllStaffClock(c.env.DB);
    return c.render(<Display entrys={JSON.stringify(staff)} title={"All Staff"} />, {
        title: "All Staff",
    });
});
app.get("/log", async (c) => {
    return c.render(<LogForm title={"Log Form"} />, {
        title: "It Service Desk!!",
    });
});
app.get("/feedback", async (c) => {
    return c.render(<FeedbackForm title={"FeedbackForm"} />, {
        title: "We Love Feedback!!",
    });
});
app.get("/clockin", async (c) => {
    return c.render(<ClockingForm />, {
        title: "We Love Working here!!",
    });
});
app.get("/manager", async (c) => {
    return c.render(<ManagerForm title={"!With great power comes great responsibility!"} />, {
        title: "Overseer",
    });
});
app.get("/staff/:id?", async (c) => {
    const id = c.req.param("id");
    if (id) {
        return c.json({ error: "ID isn't missing" }, 400);
    } else {
        return c.render(<StaffForm title={"Staff Form"} />, {
            title: "We Love Working our Staff!!",
        });
    }
});
app.get("/clockreg/:id?", async (c) => {
    const id = c.req.param("id");

    if (!id) {
        return c.render(<StaffForm title={"Staff Form"} />, {
            title: "We Love Working our Staff!!",
        });
    }

    const clockstate: ClockReg | null = await findLatestClockRegByStaffId(c.env.DB, id);
    if (clockstate) {
        return c.json({ clockstate });
    } else {
        return c.json({ error: "ID not found" }, 400);
    }
});
app.post("/log", async (c) => {
    try {
        const formData = await c.req.formData();

        const logData: Log = {
            name: getFormDataValue(formData, "name"),
            student_id: getFormDataValue(formData, "student_id"),
            staff_name: getFormDataValue(formData, "staff_name"),
        };

        console.log(logData);
        await createLog(c.env.DB, logData);

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
app.post("/staff", async (c) => {
    try {
        const formData = await c.req.formData();

        const staffData: Staff = {
            name: getFormDataValue(formData, "name"),
            staff_id: getFormDataValue(formData, "staff_id"),
        };

        await createStaff(c.env.DB, staffData);

        return c.redirect("/staff", 303);
    } catch (error) {
        console.error("Error handling POST request:", error);
        return new Response("Staff already exists!", { status: 409 });
    }
});
app.post("/clockin", async (c) => {
    try {
        const timezone = "Australia/Perth";

        const formData = await c.req.formData();
        const clockinData: ClockReg = {
            staff_id: getFormDataValue(formData, "staff_id"),
            clocked_in: getFormDataBool(formData, "clocked_in"),
            date: DateTime.now().setZone(timezone).toJSDate(),
            time: getCurrentTime(),
        };

        const clockstate: ClockReg | null = await findLatestClockRegByStaffId(
            c.env.DB,
            clockinData.staff_id
        );
        if (!clockstate) {
            try {
                await createClockReg(c.env.DB, clockinData);
            } catch (error) {
                return new Response("Staff not found!", { status: 404 });
            }
            return new Response("Staff found!", { status: 200 });
        }
        if (!clockinData.clocked_in) {
            // Staff has clocked out
            if (clockstate && clockstate.clocked_in) {
                // If Staff was clocked in!!
                // Parse date and time from clockstate to Date objects
                const lastClockInTime = new Date(`${clockstate.date}T${clockstate.time}`);
                const currentTime = new Date();

                // Calculate the time difference in milliseconds
                const timeDifference = currentTime.getTime() - lastClockInTime.getTime();

                // Minimum time difference: 30 minutes (30 * 60 * 1000 milliseconds) or 1 day (24 * 60 * 60 * 1000 milliseconds)
                const minClock = 0.01 * 60 * 1000; // 30 minutes in milliseconds

                if (timeDifference >= minClock) {
                    // Only update if time difference is valid
                    const staffclockData: StaffClock = {
                        staff_id: getFormDataValue(formData, "staff_id"),
                        start_date: clockstate?.date ?? DateTime.now().setZone(timezone).toJSDate(),
                        end_date: new Date(),
                        start_time: clockstate?.time ?? "00:00:00",
                        end_time: getCurrentTime(),
                    };
                    await createStaffClock(c.env.DB, staffclockData);
                    await updateClockReg(c.env.DB, clockinData);
                    return new Response("Thanks for coming!", { status: 200 });
                    //
                } else {
                    // Handle case where the time difference is insufficient
                    return new Response("You need to work longer then that buddy!", {
                        status: 400,
                    });
                }
            }
        } else {
            await updateClockReg(c.env.DB, clockinData);
            return new Response("Updated staff entry!", { status: 200 });
        }
        //return c.redirect("/clockin", 303);
    } catch (error) {
        console.error("Error handling POST request:", error);
        return new Response("Error processing your request", { status: 500 });
    }
});
app.get("/reset/log", async (c) => {
    await dropLogTable(c.env.DB);
    await seedLogTable(c.env.DB);
    return c.redirect("/log", 303);
});
app.get("/reset/feedback", async (c) => {
    await dropFeedbackTable(c.env.DB);
    await seedFeedbackTable(c.env.DB);
    return c.redirect("/feedback", 303);
});
app.get("/reset/staff", async (c) => {
    await dropStaffTable(c.env.DB);
    await seedStaffTable(c.env.DB);
    return c.redirect("/staff", 303);
});
app.get("/reset/staffclock", async (c) => {
    await dropStaffClockTable(c.env.DB);
    await seedStaffClockTable(c.env.DB);
    return c.redirect("/clockin", 303);
});
app.get("/reset/clockreg", async (c) => {
    await dropClockRegTable(c.env.DB);
    await seedClockRegTable(c.env.DB);
    return c.redirect("/clockin", 303);
});
app.get("/flush/feedback", async (c) => {
    await flushFeedbackTable(c.env.DB);
    return c.redirect("/feedback", 303);
});
export default app;
