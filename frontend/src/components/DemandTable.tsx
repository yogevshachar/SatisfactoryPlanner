import React from "react";
import type {DemandEntry} from "../types/factory.types";


const DemandTable: React.FC<{ data: DemandEntry[] }> = ({data}) => {
    console.log(data);
    return (
        <div className="overflow-x-auto bg-white shadow rounded p-4">
            <table className="min-w-full table-auto border">
                <thead>
                <tr className="bg-gray-100">
                    <th className="text-left px-4 py-2">Item</th>
                    <th className="text-left px-4 py-2">Required Rate (/min)</th>
                </tr>
                </thead>
                <tbody>

                {data.map((entry, index) => (
                    <tr key={index} className="border-t">
                        <td className="px-4 py-2">{entry.item}</td>
                        <td className="px-4 py-2">{entry.rate.toFixed(2)}/min</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DemandTable;