import { useState } from "react";
import type { DataItem } from "../types/ChartTypes";
import { ChartContext } from "./ChartContext";

export default function ChartContextProvider({children}){
    const [data, setData] = useState<DataItem[]>([]);

    function addDataItem(newItem: DataItem){
        newItem.id = data.length === 0 ? 1 : data.at(-1).id+1;
        setData(prev => [...prev, newItem]);
    }

    function removeDataItem(dataItem: DataItem){
        setData(prev => prev.filter(item => item.id !== dataItem.id));
    }

    const ctxValue = {
        data: data,
        addDataItem,
        removeDataItem
    }
    
    return (
        <ChartContext.Provider value={ctxValue}>
            {children}
        </ChartContext.Provider>
    )
}
