import React from "react";
import FactoryGraph from "./FactoryGraph";
import type { FactoryGraph as GraphType } from "../types/factory.types";

type Props = {
    data: GraphType;
};

const FactoryGraphContainer: React.FC<Props> = ({ data }) => {
    return (
        <div className="p-4">
            <FactoryGraph graphData={data} />
        </div>
    );
};

export default FactoryGraphContainer;