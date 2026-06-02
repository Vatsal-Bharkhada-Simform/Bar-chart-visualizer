import { useState } from "react";
import type { DataItem, DataItemProp } from "../types/ChartTypes";
import { ChartContext } from "./ChartContext";

export default function ChartContextProvider({children}){
    const [data, setData] = useState<DataItem[]>([]);

    console.log(data);

    function addDataItem(newItem: DataItemProp){
        const dataItem: DataItem = {
            ...newItem,
            id: data.length === 0 ? 1 : data.at(-1).id+1
        }
        setData(prev => [...prev, dataItem]);
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
