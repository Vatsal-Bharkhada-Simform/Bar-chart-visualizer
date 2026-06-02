type DataItem = {
    id: number;
    label: string;
    value: number;
}

type ChartContextType = {
	data: DataItem[];
	addDataItem: (data: DataItem) => void;
	removeDataItem: (data: DataItem) => void;
};

export type { DataItem, ChartContextType };
