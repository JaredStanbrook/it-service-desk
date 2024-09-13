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
                            name="description"
                            id="description"
                            value={feedback.description}
                            required
                            autocomplete="off"
                            className="input"
                        />
                        <label class="label">Description</label>
                    </div>
                </div>
                <div>
                    <label class="label">Rating</label>
                    <div class="container">
                        <input
                            type="range"
                            id="rating"
                            value={feedback.rating}
                            required
                            autocomplete="off"
                            className="input"
                            min="1"
                            max="5"
                        />
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
        </div>
    );
};

export default FeedbackForm;
