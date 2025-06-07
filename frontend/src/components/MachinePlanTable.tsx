import React from "react";

type MachinePlanEntry = {
    item: string;
    machine: string;
    count: number;
    rate: number;
};

type Props = {
    data: MachinePlanEntry[];
};

const MachinePlanTable: React.FC<Props> = ({ data }) => {
    return (
        <div className="overflow-x-auto bg-white shadow rounded p-4">
            <table className="min-w-full table-auto border">
                <thead>
                <tr className="bg-gray-100">
                    <th className="text-left px-4 py-2">Machine</th>
                    <th className="text-left px-4 py-2">Item</th>
                    <th className="text-left px-4 py-2">Count</th>
                    <th className="text-left px-4 py-2">Rate</th>
                </tr>
                </thead>
                <tbody>
                {data.map((entry, idx) => (
                    <tr key={idx} className="border-t">
                        <td className="px-4 py-2">{entry.machine}</td>
                        <td className="px-4 py-2">{entry.item}</td>
                        <td className="px-4 py-2">{entry.count.toFixed(2)}</td>
                        <td className="px-4 py-2">{entry.rate.toFixed(2)}/min</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MachinePlanTable;
