import type { FC } from "hono/jsx";

const Layout: FC = (props) => {
    return (
        <html>
            <body>{props.children}</body>
        </html>
    );
};

const Display: FC<{ entrys: string, title: string }> = (props: { entrys: string, title: string }) => {
    const data = JSON.parse(props.entrys);
    // Determine the table headers dynamically based on the keys of the first entry
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <>
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center mb-8">{props.title}</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                {headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className="text-left p-4 font-semibold text-gray-700">
                                        {header.replace(/_/g, " ").toUpperCase()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((entry: Record<string, any>, rowIndex: number) => (
                                <tr key={rowIndex} className="border-b border-gray-200">
                                    {headers.map((header, colIndex) => (
                                        <td key={colIndex} className="p-4 text-gray-900">
                                            {entry[header]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="container">
                    <a href="/" className="bg-white py-2 px-4 rounded-md" onclick="history.go(-1)">
                        Home
                    </a>
                </div>
            </div>
        </>
    );
};

export default Display;
