import React, {useState} from "react";
import {useMachinePlan} from "../hooks/useMachinePlan";
import {useDemand} from "../hooks/useDemand";
import FactoryGraphContainer from "./FactoryGraphContainer";
import type {FactoryGraph} from "../types/factory.types";
import DemandTable from "./DemandTable.tsx";
import MachinePlanTable from "./MachinePlanTable.tsx";

type Target = { item: string; rate: number };

type Props = {
    data: FactoryGraph;
    targets: Target[];
    tier: number;
};

const PlannerTabs: React.FC<Props> = ({data, targets, tier}) => {
    const [activeTab, setActiveTab] = useState<"graph" | "machine" | "demand">("graph");

    const {data: machinePlan, isLoading: loadingMachines, error: errorMachines} = useMachinePlan(
        {targets, tier},
        activeTab === "machine"
    );

    const {data: demand, isLoading: loadingDemand, error: errorDemand} = useDemand(
        {targets},
        activeTab === "demand"
    );

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-center space-x-4">
                <button
                    className={`px-4 py-2 rounded ${activeTab === "graph" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("graph")}
                >
                    Factory Graph
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "machine" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("machine")}
                >
                    Machine Plan
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "demand" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setActiveTab("demand")}
                >
                    Demand
                </button>
            </div>

            <div className="w-full">
                {activeTab === "graph" && <FactoryGraphContainer data={data}/>}

                {activeTab === "machine" && (
                    <>
                        {loadingMachines && <p>Loading machine plan...</p>}
                    {errorMachines && <p className="text-red-500">Error: {String(errorMachines)}</p>}
                        {machinePlan && <MachinePlanTable data={machinePlan} />}

                    </>
                )}

                {activeTab === "demand" && (
                    <>
                        {loadingDemand && <p>Loading demand...</p>}
                        {errorDemand && <p className="text-red-500">Error: {String(errorDemand)}</p>}
                        {demand && (
                            <DemandTable data={demand}/>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PlannerTabs;
