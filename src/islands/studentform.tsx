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
                        <label class="label">Fullname</label>
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
                        <label class="label">Student ID</label>
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
                        <label class="label">Staff Name</label>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`${isLoading ? "bg-indigo-400" : ""}`}>
                    {isLoading ? "Submitting..." : "Add Student"}
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
