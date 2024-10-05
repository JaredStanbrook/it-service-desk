import { useState } from "hono/jsx";
import type { FC } from "hono/jsx";
import type { Staff } from "../db";

const StaffForm: FC<{ title: string }> = (props: { title: string }) => {
    const [staff, setStaff] = useState<Partial<Staff>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Submitting staff:", staff);
        const formData = new FormData();

        try {
            const response = await fetch("/staff", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Network response was not ok.");

            const result = await response.json();
            console.log("Success:", result);
            setStaff({});
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-5xl font-semibold text-white text-center p-4">{props.title}</h1>
            <form onSubmit={handleSubmit} method="POST">
                <div>
                    <div className="container">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={staff.name}
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
                            name="staff_id"
                            id="staff_id"
                            value={staff.staff_id}
                            required
                            autocomplete="off"
                            className="input"
                        />
                        <label class="floating-label">Staff ID *</label>
                    </div>
                </div>
                <div class="container">
                    <button
                        class="soft_button"
                        type="submit"
                        disabled={isLoading}
                        className={`${isLoading ? "bg-indigo-400" : ""}`}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
            <div className="container">
                <a
                    href="/"
                    className="bg-white py-2 px-4 rounded-md">
                    Home
                </a>
                <a
                    href="/view/staff"
                    className="bg-white py-2 px-4 rounded-md">
                    View All Staff
                </a>
            </div>
        </div>
    );
};

export default StaffForm;
