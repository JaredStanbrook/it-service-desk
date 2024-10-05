import { useState } from "hono/jsx";
import type { FC } from "hono/jsx";

const ManagerDashboard: FC<{ title: string }> = (props: { title: string }) => {
    const [schedule, setSchedule] = useState<{ [key: string]: string[] }>({
        Monday: ["John Doe", "Jane Smith"],
        Tuesday: ["John Doe"],
        Wednesday: ["Jane Smith"],
        Thursday: ["John Doe"],
        Friday: [],
        Saturday: [],
        Sunday: [],
    });

    const [requests, setRequests] = useState([
        { id: 1, staffName: "John Doe", type: "Shift Change", status: "Pending", day: "Tuesday" },
        {
            id: 2,
            staffName: "Jane Smith",
            type: "Additional Shift",
            status: "Pending",
            day: "Friday",
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();

        try {
            const response = await fetch("/", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Network response was not ok.");

            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-5xl font-semibold text-white text-center p-4">{props.title}</h1>
            <form method="POST" class="dashboard">
                <h2 className="text-3xl font-semibold text-center mb-4">Weekly Schedule</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            {[
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday",
                            ].map((day, idx) => (
                                <th key={idx} className="text-left p-4 font-semibold text-gray-700">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {Object.keys(schedule).map((day, idx) => (
                                <td key={idx} className="p-4 text-gray-900">
                                    <ul>
                                        {schedule[day].length > 0 ? (
                                            schedule[day].map((staff, staffIdx) => (
                                                <li key={staffIdx}>{staff}</li>
                                            ))
                                        ) : (
                                            <li>No Shifts</li>
                                        )}
                                    </ul>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>

                <div className="mt-8">
                    <h2 className="text-3xl font-semibold text-center mb-4">Shift Requests</h2>
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Staff Name
                                </th>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Request Type
                                </th>
                                <th className="text-left p-4 font-semibold text-gray-700">Day</th>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Status
                                </th>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request, idx) => (
                                <tr key={idx} className="border-b border-gray-200">
                                    <td className="p-4">{request.staffName}</td>
                                    <td className="p-4">{request.type}</td>
                                    <td className="p-4">{request.day}</td>
                                    <td className="p-4">{request.status}</td>
                                    <td className="p-4">
                                        <button
                                            className="soft_button bg-green-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleApprove(request.id)}>
                                            Approve
                                        </button>
                                        <button
                                            className="soft_button bg-red-500 text-white px-4 py-2 ml-2 rounded"
                                            onClick={() => handleDeny(request.id)}>
                                            Deny
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
            <div className="container">
                <a href="/view/staff" className="bg-white py-2 px-4 rounded-md">
                    View All Staff
                </a>
                <a href="/view/clockin" className="bg-white py-2 px-4 rounded-md">
                    View All Clock In Logs
                </a>
                <a href="/view/clockreg" className="bg-white py-2 px-4 rounded-md">
                    View All Staff Clock In Status
                </a>
            </div>
        </div>
    );
};

const handleApprove = (id: number) => {
    console.log(`Approve request with id: ${id}`);
    // Logic to approve shift change request
};

const handleDeny = (id: number) => {
    console.log(`Deny request with id: ${id}`);
    // Logic to deny shift change request
};

export default ManagerDashboard;
