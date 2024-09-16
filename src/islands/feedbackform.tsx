import { useState } from "hono/jsx";
import type { FC } from "hono/jsx";
import type { Feedback } from "../db";

const FeedbackForm: FC = () => {
    const [feedback, setFeedback] = useState<Partial<Feedback>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Submitting feedback:", feedback);
        const formData = new FormData();

        try {
            const response = await fetch("/create", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Network response was not ok.");

            const result = await response.json();
            console.log("Success:", result);
            setFeedback({});
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
                            value={feedback.name}
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
                            value={feedback.student_id}
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
                            value={feedback.staff_name}
                            required
                            autocomplete="off"
                            className="input"
                        />
                        <label class="label">Staff Name</label>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <textarea
                            name="description"
                            id="description"
                            rows={6}
                            value={feedback.description || ""}
                            required
                            autocomplete="off"
                            className="input"
                            //onChange={handleChange}
                            placeholder="Describe your experience in detail"
                        />
                    </div>
                </div>
                <div>
                    <div className="container">
                        <label className="label">Rating (1-5)</label>

                        <select
                            name="rating"
                            id="rating"
                            value={feedback.rating || ""}
                            //onChange={handleChange}
                            required
                            autocomplete="off"
                            className="input">
                            <option value="" selected disabled hidden>
                                Select a rating
                            </option>
                            <option value="1">1 - Very Poor</option>
                            <option value="2">2 - Poor</option>
                            <option value="3">3 - Average</option>
                            <option value="4">4 - Good</option>
                            <option value="5">5 - Excellent</option>
                        </select>
                    </div>
                </div>
                <div class="container">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading ? "bg-indigo-400" : ""}`}>
                        {isLoading ? "Submitting..." : "Send"}
                    </button>
                </div>
            </form>
            <div className="container">
                <a href="/log" className="bg-white py-2 px-4 rounded-md">
                    Go to Logger
                </a>
            </div>
            <div className="container">
                <a href="/all" className="bg-white py-2 px-4 rounded-md">
                    View All
                </a>
            </div>
        </div>
    );
};

export default FeedbackForm;
