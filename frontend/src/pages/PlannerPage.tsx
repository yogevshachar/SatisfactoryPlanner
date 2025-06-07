import React, {useState} from "react";
import {useItems} from "../hooks/useItems";
import {usePlanner} from "../hooks/usePlanner";
import PlannerForm from "../components/PlannerForm";
import type {PlannerPayload} from "../types/factory.types";
import PlannerTabs from "../components/PlannerTabs.tsx";

type Target = {
    item: string;
    rate: number;
};

const PlannerPage: React.FC = () => {
    const {data: items = []} = useItems();

    const plannerMutation = usePlanner();
    const [targetItem, setTargetItem] = useState("");
    const [rate, setRate] = useState(2);
    const [tier, setTier] = useState(4);
    const [realistic, setRealistic] = useState(true);
    const [showResult, setShowResult] = useState(false);

    const handleFormChange = (state: {
        targetItem: string;
        rate: number;
        tier: number;
        realistic: boolean;
    }) => {
        setTargetItem(state.targetItem);
        setRate(state.rate);
        setTier(state.tier);
        setRealistic(state.realistic);
    };
    const handleFormSubmit = (payload: PlannerPayload) => {
        plannerMutation.mutate(payload, {
            onSuccess: () => setShowResult(true),
        });
    };
    return (
        <div className="p-6 space-y-6">
            <PlannerForm
                items={items}
                targetItem={targetItem}
                rate={rate}
                tier={tier}
                realistic={realistic}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
            />


            {showResult && plannerMutation.data && (
                <PlannerTabs
                    data={plannerMutation.data}
                    targets={[{item: targetItem, rate}]}
                    tier={tier}
                />)}
        </div>
    );
};

export default PlannerPage;
