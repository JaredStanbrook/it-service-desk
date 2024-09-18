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
                    <label class="floating-label">Full Name *</label>
                </div>
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
                    <label class="floating-label">Student ID *</label>
                </div>
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
                    <label class="floating-label">Staff Name</label>
                </div>
                <div class="container">
                    <label class="label">Date of Interaction *</label>
                    <input
                        type="date"
                        name="service_date"
                        id="service_date"
                        required
                        autocomplete="off"
                        className="input"
                    />
                </div>
                <div class="container">
                    <label class="label">How satisfied are you with our service? *</label>
                    <div class="emoji-options">
                        <input type="radio" id="very-sad" name="rating" value="1" />
                        <label for="very-sad" class="emoji-label">
                            😞
                        </label>

                        <input type="radio" id="sad" name="rating" value="2" />
                        <label for="sad" class="emoji-label">
                            🙁
                        </label>

                        <input type="radio" id="neutral" name="rating" value="3" />
                        <label for="neutral" class="emoji-label">
                            😐
                        </label>

                        <input type="radio" id="happy" name="rating" value="4" required />
                        <label for="happy" class="emoji-label">
                            🙂
                        </label>

                        <input type="radio" id="very-happy" name="rating" value="5" />
                        <label for="very-happy" class="emoji-label">
                            😄
                        </label>
                    </div>
                </div>
                <div className="container">
                    <label class="label">Please provide additional comments or suggestions for improvement!</label>
                    <textarea
                        name="description"
                        id="description"
                        rows={6}
                        value={feedback.description || ""}
                        autocomplete="off"
                        className="input"
                        //onChange={handleChange}
                        placeholder="Type Here..."
                    />
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
                <a href="/all/feedback" className="bg-white py-2 px-4 rounded-md">
                    View All
                </a>
            </div>
        </div>
    );
};

export default FeedbackForm;
