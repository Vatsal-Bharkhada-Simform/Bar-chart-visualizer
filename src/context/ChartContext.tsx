import { createContext } from "react";
import type { ChartContextType } from "../types/ChartTypes";

export const ChartContext = createContext<ChartContextType>({
	data: [],
	addDataItem: () => {},
	removeDataItem: () => {},
});
