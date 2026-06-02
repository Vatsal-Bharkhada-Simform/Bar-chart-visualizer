type DataItem = {
    id: number;
    label: string;
    value: number;
}

type DataItemProp = {
	label: string;
	value: number;
};

type ChartContextType = {
	data: DataItem[];
	addDataItem: (data: DataItemProp) => void;
	removeDataItem: (data: DataItem) => void;
};

export type { DataItem, DataItemProp, ChartContextType };
