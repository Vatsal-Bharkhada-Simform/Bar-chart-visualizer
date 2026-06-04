type DataItem = {
	id: string;
	label: string;
	value: number;
};

type DataItemProp = {
	label: string;
	value: number;
};

type ChartContextType = {
    data: DataItem[];
	addDataItem: (data: DataItemProp) => void;
	removeDataItem: (data: DataItem) => void;
};

type CandleData = {
    height: number;
    id: string;
    label: string;
    value: number;
    color: string;
};

export type { DataItem, DataItemProp, ChartContextType, CandleData };
