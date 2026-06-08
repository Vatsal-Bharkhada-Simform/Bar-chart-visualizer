import { createContext } from "react";
import type { ChartContextType } from "../types/ChartTypes";

export const ChartContext = createContext<ChartContextType>({
	data: [],
    editData: null,
    setEditData: () => {},
	addDataItem: () => {},
	removeDataItem: () => {},
	updateDataItem: () => {},
});
