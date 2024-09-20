import { useState } from "hono/jsx";
import type { FC } from "hono/jsx";
import type { Student } from "../db";

const StudentForm: FC = () => {
    const [student, setStudent] = useState<Partial<Student>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Submitting student:", student);
        const formData = new FormData();

        try {
            const response = await fetch("/create", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Network response was not ok.");

            const result = await response.json();
            console.log("Success:", result);
            setStudent({});
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-5xl font-semibold text-white text-center p-4">Welcome</h1>
            <form onSubmit={handleSubmit} method="POST">
                <div>
                    <div className="container">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={student.name}
                            required
                            autocomplete="off"
                            className="input"
                        />
                        <label class="floating-label">Full Name *</label>
                    </div>
                </div>
                <div>
                    <div class="container">
                        <input
                            type="text"
                            name="student_id"
                            id="student_id"
                            value={student.student_id}
                            required
                            autocomplete="off"
                            className="input"
                        />
                        <label class="floating-label">Student ID *</label>
                    </div>
                </div>
                <div>
                    <div class="container">
                        <input
                            type="text"
                            name="staff_name"
                            id="staff_name"
                            value={student.staff_name}
                            required
                            autocomplete="off"
                            className="input"
                        />
                        <label class="floating-label">Staff Name *</label>
                    </div>
                </div>
                <div class="container">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading ? "bg-indigo-400" : ""}`}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
            <div className="container">
                <a
                    href="/feedback"
                    className="bg-white py-2 px-4 rounded-md">
                    Go to Feedback
                </a>
                <a
                    href="/view/logs"
                    className="bg-white py-2 px-4 rounded-md">
                    View All
                </a>
            </div>
        </div>
    );
};

export default StudentForm;
