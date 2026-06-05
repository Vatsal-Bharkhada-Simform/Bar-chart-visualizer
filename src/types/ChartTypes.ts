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

interface ToolTipState {
	visible: boolean;
	x: number;
	y: number;
	candleData: CandleData | null;
}

export type { DataItem, DataItemProp, ChartContextType, CandleData, ToolTipState };
