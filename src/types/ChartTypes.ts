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
	editData: DataItem | null;
	setEditData: React.Dispatch<React.SetStateAction<DataItem | null>>;
	addDataItem: (data: DataItemProp) => void;
	removeDataItem: (data: DataItem) => void;
	updateDataItem: (data: DataItem) => void;
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

type LabelType = {
    labelX: string;
    labelY: string;
}

export type { DataItem, DataItemProp, ChartContextType, CandleData, ToolTipState, LabelType };
